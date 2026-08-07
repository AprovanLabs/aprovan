import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { KeyObject } from "node:crypto";
import type { BundleInfo } from "./bridge.js";
import {
  loadEd25519PublicKey,
  parseManifest,
  sha256Hex,
  verifyManifestSignature,
  type BundleManifest,
} from "./bundle-crypto.js";

const execFileAsync = promisify(execFile);

/** Max consecutive failed boots before automatic rollback to `previous`. */
export const MAX_FAILED_BOOTS = 2;

import { DEFAULT_SHELL_UPDATE_PATH } from "./shell-updater.js";

export { DEFAULT_SHELL_UPDATE_PATH };

export type BundlePendingState = NonNullable<BundleInfo["pending"]>["state"];

export type BundleMeta = {
  version: string;
  sha256: string;
  activatedAt: string;
};

export type BootState = {
  /** Active version that still needs a renderer-ready signal. */
  awaitingReadyVersion?: string;
  consecutiveFailures: number;
};

export type BundleFailureRecord = {
  at: string;
  reason: string;
  version?: string;
  detail?: string;
};

export type ApplyOk = {
  ok: true;
  version: string;
  previousVersion?: string;
};

export type ApplyErr = {
  ok: false;
  reason:
    | "signature"
    | "hash"
    | "minShell"
    | "fetch"
    | "extract"
    | "interrupted"
    | "invalid-manifest";
  message: string;
  /** Present when reason is `minShell`. */
  requiredShell?: string;
  shellUpdatePath?: string;
};

export type ApplyResult = ApplyOk | ApplyErr;

export type BundleManagerOptions = {
  bundlesDir: string;
  /** Running shell semver (compared to manifest `minShell`). */
  shellVersion: string;
  /** Pinned Ed25519 public key (PEM or KeyObject). */
  publicKey: string | Buffer | KeyObject;
  /** Where to send the user when a bundle needs a newer shell. */
  shellUpdatePath?: string;
  fetch?: typeof globalThis.fetch;
  /** Override archive extraction (tests). Default: `tar -xf`. */
  extractArchive?: (archivePath: string, destDir: string) => Promise<void>;
  /** Synthetic active entry when no OTA symlink exists yet. */
  seed?: { version: string; sha256: string; activatedAt?: string };
  now?: () => Date;
};

type InternalPending = {
  version: string;
  state: BundlePendingState;
};

const META_FILE = ".aprovan-bundle.json";
const BOOT_STATE_FILE = "boot-state.json";
const FAILURES_FILE = "failures.jsonl";

/**
 * Fetches, verifies, stages, activates, and rolls back renderer OTA bundles
 * under Application Support `bundles/` (tech-plan D3).
 */
export class BundleManager {
  readonly bundlesDir: string;
  readonly shellVersion: string;
  readonly shellUpdatePath: string;
  private readonly publicKey: KeyObject;
  private readonly fetchImpl: typeof globalThis.fetch;
  private readonly extractArchive: (
    archivePath: string,
    destDir: string,
  ) => Promise<void>;
  private readonly seed: BundleMeta;
  private readonly now: () => Date;
  private pending: InternalPending | undefined;
  private lastFailure: BundleFailureRecord | undefined;

  constructor(options: BundleManagerOptions) {
    this.bundlesDir = path.resolve(options.bundlesDir);
    this.shellVersion = options.shellVersion;
    this.shellUpdatePath = options.shellUpdatePath ?? DEFAULT_SHELL_UPDATE_PATH;
    this.publicKey =
      typeof options.publicKey === "object" &&
      options.publicKey !== null &&
      "type" in options.publicKey
        ? (options.publicKey as KeyObject)
        : loadEd25519PublicKey(options.publicKey as string | Buffer);
    this.fetchImpl = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.extractArchive = options.extractArchive ?? defaultExtractTar;
    this.now = options.now ?? (() => new Date());
    this.seed = {
      version: options.seed?.version ?? "0.0.0-seed",
      sha256: options.seed?.sha256 ?? "0".repeat(64),
      activatedAt: options.seed?.activatedAt ?? new Date(0).toISOString(),
    };
    fs.mkdirSync(this.bundlesDir, { recursive: true });
  }

  getBundleInfo(): BundleInfo {
    const activeLink = this.readLink("active");
    const previousLink = this.readLink("previous");

    const active = activeLink
      ? (this.readMeta(activeLink) ?? {
          version: activeLink,
          sha256: "0".repeat(64),
          activatedAt: this.now().toISOString(),
        })
      : this.seed;

    const info: BundleInfo = {
      active: {
        version: active.version,
        sha256: active.sha256,
        activatedAt: active.activatedAt,
      },
    };

    if (previousLink) {
      const prev = this.readMeta(previousLink);
      info.previous = {
        version: previousLink,
        sha256: prev?.sha256 ?? "0".repeat(64),
      };
    }

    if (this.pending) {
      info.pending = { ...this.pending };
    }

    return info;
  }

  getLastFailure(): BundleFailureRecord | undefined {
    return this.lastFailure;
  }

  /**
   * Fetch a manifest URL, verify signature / minShell / content hash, stage,
   * and activate atomically. Failures leave `active` untouched.
   */
  async checkAndApply(manifestUrl: string): Promise<ApplyResult> {
    let manifest: BundleManifest;
    try {
      const res = await this.fetchImpl(manifestUrl);
      if (!res.ok) {
        return this.fail("fetch", `Manifest fetch failed: HTTP ${res.status}`);
      }
      manifest = parseManifest(await res.json());
    } catch (err) {
      return this.fail(
        "invalid-manifest",
        err instanceof Error ? err.message : String(err),
      );
    }
    return this.applyManifest(manifest);
  }

  async applyManifest(manifest: BundleManifest): Promise<ApplyResult> {
    this.pending = { version: manifest.version, state: "downloading" };

    if (!verifyManifestSignature(manifest, this.publicKey)) {
      this.clearPending();
      return this.fail(
        "signature",
        "Manifest signature verification failed",
        manifest.version,
      );
    }

    if (compareSemver(manifest.minShell, this.shellVersion) > 0) {
      this.clearPending();
      const message = `Bundle ${manifest.version} requires shell ${manifest.minShell} (running ${this.shellVersion}). Update the shell: ${this.shellUpdatePath}`;
      this.recordFailure({
        reason: "minShell",
        version: manifest.version,
        detail: message,
      });
      return {
        ok: false,
        reason: "minShell",
        message,
        requiredShell: manifest.minShell,
        shellUpdatePath: this.shellUpdatePath,
      };
    }

    this.pending = { version: manifest.version, state: "verifying" };

    let archiveBytes: Uint8Array;
    try {
      const res = await this.fetchImpl(manifest.url);
      if (!res.ok) {
        this.clearPending();
        return this.fail(
          "fetch",
          `Bundle fetch failed: HTTP ${res.status}`,
          manifest.version,
        );
      }
      archiveBytes = new Uint8Array(await res.arrayBuffer());
    } catch (err) {
      this.clearPending();
      return this.fail(
        "fetch",
        err instanceof Error ? err.message : String(err),
        manifest.version,
      );
    }

    const actualHash = sha256Hex(archiveBytes);
    if (actualHash !== manifest.sha256.toLowerCase()) {
      this.clearPending();
      return this.fail(
        "hash",
        `Content hash mismatch: expected ${manifest.sha256}, got ${actualHash}`,
        manifest.version,
      );
    }

    this.pending = { version: manifest.version, state: "staged" };

    const stagingDir = path.join(
      this.bundlesDir,
      `.staging-${safeSegment(manifest.version)}`,
    );
    const versionDir = path.join(this.bundlesDir, manifest.version);

    try {
      fs.rmSync(stagingDir, { recursive: true, force: true });
      fs.mkdirSync(stagingDir, { recursive: true });

      const archivePath = path.join(
        os.tmpdir(),
        `aprovan-bundle-${safeSegment(manifest.version)}-${process.pid}.tar`,
      );
      try {
        fs.writeFileSync(archivePath, archiveBytes);
        await this.extractArchive(archivePath, stagingDir);
      } finally {
        fs.rmSync(archivePath, { force: true });
      }

      const activatedAt = this.now().toISOString();
      const meta: BundleMeta = {
        version: manifest.version,
        sha256: manifest.sha256.toLowerCase(),
        activatedAt,
      };
      fs.writeFileSync(
        path.join(stagingDir, META_FILE),
        `${JSON.stringify(meta, null, 2)}\n`,
        "utf8",
      );

      // Promote staging → version dir, then rename-swap symlinks.
      fs.rmSync(versionDir, { recursive: true, force: true });
      fs.renameSync(stagingDir, versionDir);

      const previousVersion = this.readLink("active") ?? undefined;
      this.swapActive(manifest.version);

      this.writeBootState({
        awaitingReadyVersion: manifest.version,
        consecutiveFailures: 0,
      });

      this.clearPending();
      return { ok: true, version: manifest.version, previousVersion };
    } catch (err) {
      fs.rmSync(stagingDir, { recursive: true, force: true });
      // Leave a half-written version dir if rename failed mid-way.
      if (!fs.existsSync(path.join(versionDir, META_FILE))) {
        fs.rmSync(versionDir, { recursive: true, force: true });
      }
      this.clearPending();
      const interrupted =
        err instanceof Error &&
        (err.message.includes("interrupted") ||
          (err as NodeJS.ErrnoException).code === "ABORT_ERR");
      return this.fail(
        interrupted ? "interrupted" : "extract",
        err instanceof Error ? err.message : String(err),
        manifest.version,
      );
    }
  }

  /**
   * Called on every launch before showing the window. If a newly activated
   * bundle never reported ready, count a failed boot; after
   * {@link MAX_FAILED_BOOTS} consecutive failures, roll back to `previous`.
   */
  handleLaunch(): { rolledBack: boolean; toVersion?: string } {
    const state = this.readBootState();
    if (!state.awaitingReadyVersion) {
      return { rolledBack: false };
    }

    const active = this.readLink("active");
    if (active !== state.awaitingReadyVersion) {
      this.writeBootState({ consecutiveFailures: 0 });
      return { rolledBack: false };
    }

    const failures = state.consecutiveFailures + 1;
    if (failures >= MAX_FAILED_BOOTS) {
      const toVersion = this.rollback("boot-failure");
      this.writeBootState({ consecutiveFailures: 0 });
      return { rolledBack: toVersion !== undefined, toVersion };
    }

    this.writeBootState({
      awaitingReadyVersion: state.awaitingReadyVersion,
      consecutiveFailures: failures,
    });
    return { rolledBack: false };
  }

  /**
   * Renderer readiness over the IPC bridge — clears the failed-boot counter
   * for the current active bundle.
   */
  reportRendererReady(): void {
    const active = this.readLink("active");
    const state = this.readBootState();
    if (
      active &&
      state.awaitingReadyVersion &&
      state.awaitingReadyVersion === active
    ) {
      this.writeBootState({ consecutiveFailures: 0 });
      return;
    }
    if (state.awaitingReadyVersion || state.consecutiveFailures > 0) {
      this.writeBootState({ consecutiveFailures: 0 });
    }
  }

  /**
   * Re-point `active` at `previous`. Does not touch `gateway-data/`.
   * Returns the version that became active, or undefined if no previous.
   */
  rollback(reason = "manual"): string | undefined {
    const previous = this.readLink("previous");
    if (!previous) {
      this.recordFailure({
        reason: "rollback",
        detail: `Rollback requested (${reason}) but no previous bundle`,
      });
      return undefined;
    }
    const current = this.readLink("active");
    this.atomicSymlink("active", previous);
    if (current && current !== previous) {
      this.atomicSymlink("previous", current);
    }
    this.recordFailure({
      reason: "rollback",
      version: current,
      detail: `Rolled back to ${previous} (${reason})`,
    });
    return previous;
  }

  /** Discard any leftover `.staging-*` directories (e.g. after a crash). */
  discardPartialStaging(): string[] {
    const removed: string[] = [];
    for (const name of fs.readdirSync(this.bundlesDir)) {
      if (!name.startsWith(".staging-")) continue;
      const full = path.join(this.bundlesDir, name);
      fs.rmSync(full, { recursive: true, force: true });
      removed.push(full);
    }
    return removed;
  }

  // ── internals ──────────────────────────────────────────────────────────

  private swapActive(version: string): void {
    const current = this.readLink("active");
    if (current && current !== version) {
      this.atomicSymlink("previous", current);
    }
    this.atomicSymlink("active", version);
  }

  private atomicSymlink(linkName: "active" | "previous", target: string): void {
    const linkPath = path.join(this.bundlesDir, linkName);
    const tmpPath = path.join(this.bundlesDir, `${linkName}.new`);
    fs.rmSync(tmpPath, { force: true });
    fs.symlinkSync(target, tmpPath);
    fs.renameSync(tmpPath, linkPath);
  }

  private readLink(name: "active" | "previous"): string | undefined {
    const linkPath = path.join(this.bundlesDir, name);
    try {
      return fs.readlinkSync(linkPath);
    } catch {
      return undefined;
    }
  }

  private readMeta(version: string): BundleMeta | undefined {
    const metaPath = path.join(this.bundlesDir, version, META_FILE);
    try {
      const raw = JSON.parse(fs.readFileSync(metaPath, "utf8")) as BundleMeta;
      if (
        typeof raw.version === "string" &&
        typeof raw.sha256 === "string" &&
        typeof raw.activatedAt === "string"
      ) {
        return raw;
      }
    } catch {
      // missing or corrupt
    }
    return undefined;
  }

  private bootStatePath(): string {
    return path.join(this.bundlesDir, BOOT_STATE_FILE);
  }

  private readBootState(): BootState {
    try {
      const raw = JSON.parse(
        fs.readFileSync(this.bootStatePath(), "utf8"),
      ) as BootState;
      return {
        awaitingReadyVersion:
          typeof raw.awaitingReadyVersion === "string"
            ? raw.awaitingReadyVersion
            : undefined,
        consecutiveFailures:
          typeof raw.consecutiveFailures === "number"
            ? raw.consecutiveFailures
            : 0,
      };
    } catch {
      return { consecutiveFailures: 0 };
    }
  }

  private writeBootState(state: BootState): void {
    fs.writeFileSync(
      this.bootStatePath(),
      `${JSON.stringify(state, null, 2)}\n`,
      "utf8",
    );
  }

  private clearPending(): void {
    this.pending = undefined;
  }

  private fail(
    reason: ApplyErr["reason"],
    message: string,
    version?: string,
  ): ApplyErr {
    this.recordFailure({ reason, version, detail: message });
    return { ok: false, reason, message };
  }

  private recordFailure(
    entry: Omit<BundleFailureRecord, "at"> & { at?: string },
  ): void {
    const record: BundleFailureRecord = {
      at: entry.at ?? this.now().toISOString(),
      reason: entry.reason,
      version: entry.version,
      detail: entry.detail,
    };
    this.lastFailure = record;
    try {
      fs.appendFileSync(
        path.join(this.bundlesDir, FAILURES_FILE),
        `${JSON.stringify(record)}\n`,
        "utf8",
      );
    } catch {
      // best-effort audit log
    }
  }
}

async function defaultExtractTar(
  archivePath: string,
  destDir: string,
): Promise<void> {
  await execFileAsync("tar", ["-xf", archivePath, "-C", destDir], {
    maxBuffer: 32 * 1024 * 1024,
  });
}

function safeSegment(version: string): string {
  return version.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

/**
 * Compare dotted semver-ish strings (major.minor.patch). Pre-release /
 * build metadata are ignored. Returns <0 if a<b, 0 if equal, >0 if a>b.
 */
export function compareSemver(a: string, b: string): number {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i]! - pb[i]!;
  }
  return 0;
}

function parseSemver(v: string): [number, number, number] {
  const core = v.trim().replace(/^v/i, "").split("-")[0]?.split("+")[0] ?? "0";
  const parts = core.split(".").map((p) => {
    const n = Number.parseInt(p, 10);
    return Number.isFinite(n) ? n : 0;
  });
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

export {
  loadEd25519PublicKey,
  parseManifest,
  sha256Hex,
  verifyManifestSignature,
  manifestSigningPayload,
  type BundleManifest,
} from "./bundle-crypto.js";
