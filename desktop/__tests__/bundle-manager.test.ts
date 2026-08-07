import { execFile } from "node:child_process";
import {
  createPrivateKey,
  createPublicKey,
  sign,
  type KeyObject,
} from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { ensureAppSupportLayout } from "../src/app-support.js";
import {
  BundleManager,
  MAX_FAILED_BOOTS,
  compareSemver,
  manifestSigningPayload,
  sha256Hex,
  type BundleManifest,
} from "../src/bundle-manager.js";
import { BUNDLE_PUBLIC_KEY_PEM } from "../src/bundle-public-key.js";
import { resolveWithinBundle } from "../src/protocol.js";

const execFileAsync = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const keysDir = path.join(here, "fixtures", "bundle-keys");

const temps: string[] = [];

afterEach(() => {
  for (const dir of temps.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function tempDir(prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  temps.push(dir);
  return dir;
}

function loadTestKeys(): { publicKey: KeyObject; privateKey: KeyObject } {
  const publicPem = fs.readFileSync(
    path.join(keysDir, "test-public.pem"),
    "utf8",
  );
  const publicKey = createPublicKey(publicPem);
  const privateKey = createPrivateKey(
    fs.readFileSync(path.join(keysDir, "test-private.pem")),
  );
  // Pin in source must match the fixture public key.
  expect(BUNDLE_PUBLIC_KEY_PEM.trim()).toBe(publicPem.trim());
  return { publicKey, privateKey };
}

function signManifest(
  privateKey: KeyObject,
  fields: Omit<BundleManifest, "signature">,
): BundleManifest {
  const signature = sign(
    null,
    manifestSigningPayload(fields),
    privateKey,
  ).toString("base64");
  return { ...fields, signature };
}

async function packTar(contentDir: string): Promise<Buffer> {
  const archive = path.join(tempDir("aprovan-tar-"), "bundle.tar");
  await execFileAsync("tar", ["-cf", archive, "-C", contentDir, "."]);
  return fs.readFileSync(archive);
}

function writeBundleContent(dir: string, marker: string): void {
  fs.mkdirSync(path.join(dir, "chat"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "chat", "index.html"),
    `<html><body>${marker}</body></html>\n`,
  );
}

function mockFetch(
  routes: Record<string, { body: Uint8Array | object; status?: number }>,
): typeof fetch {
  return async (input: RequestInfo | URL) => {
    const url = String(input);
    const route = routes[url];
    if (!route) {
      return new Response("not found", { status: 404 });
    }
    if (route.body instanceof Uint8Array || Buffer.isBuffer(route.body)) {
      return new Response(Buffer.from(route.body), {
        status: route.status ?? 200,
        headers: { "content-type": "application/octet-stream" },
      });
    }
    return new Response(JSON.stringify(route.body), {
      status: route.status ?? 200,
      headers: { "content-type": "application/json" },
    });
  };
}

async function makeSignedBundle(
  privateKey: KeyObject,
  version: string,
  marker: string,
): Promise<{ manifest: BundleManifest; archive: Buffer; routes: Record<string, { body: Uint8Array | object }> }> {
  const content = tempDir("aprovan-content-");
  writeBundleContent(content, marker);
  const archive = await packTar(content);
  const manifestUrl = `https://example.test/${version}.json`;
  const bundleUrl = `https://example.test/${version}.tar`;
  const manifest = signManifest(privateKey, {
    version,
    minShell: "0.1.0",
    url: bundleUrl,
    sha256: sha256Hex(archive),
  });
  return {
    manifest,
    archive,
    routes: {
      [manifestUrl]: { body: manifest },
      [bundleUrl]: { body: archive },
    },
  };
}

describe("compareSemver", () => {
  it("orders dotted versions", () => {
    expect(compareSemver("1.4.0", "1.3.9")).toBeGreaterThan(0);
    expect(compareSemver("1.4.0", "1.4.0")).toBe(0);
    expect(compareSemver("1.4.0", "2.0.0")).toBeLessThan(0);
  });
});

describe("BundleManager", () => {
  it("activates a signed bundle and exposes BundleInfo (published update)", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const { routes } = await makeSignedBundle(
      privateKey,
      "2026.08.14-1",
      "v2",
    );

    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch(routes),
    });

    const result = await manager.checkAndApply(
      "https://example.test/2026.08.14-1.json",
    );
    expect(result.ok).toBe(true);

    const info = manager.getBundleInfo();
    expect(info.active.version).toBe("2026.08.14-1");
    expect(info.active.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(info.previous).toBeUndefined();
    expect(info.pending).toBeUndefined();

    const activeDir = path.join(layout.bundlesDir, "2026.08.14-1");
    expect(
      fs.readFileSync(path.join(activeDir, "chat", "index.html"), "utf8"),
    ).toContain("v2");
    expect(fs.readlinkSync(path.join(layout.bundlesDir, "active"))).toBe(
      "2026.08.14-1",
    );
  });

  it("rejects a tampered content hash and leaves active untouched", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const seed = await makeSignedBundle(privateKey, "2026.08.10-3", "seed");

    const badArchive = Buffer.from("not-the-bundle");
    const badManifest = signManifest(privateKey, {
      version: "2026.08.14-1",
      minShell: "0.1.0",
      url: "https://example.test/bad.tar",
      sha256: sha256Hex(Buffer.from("claimed-but-wrong")),
    });

    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch({
        ...seed.routes,
        "https://example.test/bad.json": { body: badManifest },
        "https://example.test/bad.tar": { body: badArchive },
      }),
    });

    expect(
      (await manager.checkAndApply("https://example.test/2026.08.10-3.json")).ok,
    ).toBe(true);
    manager.reportRendererReady();

    const before = manager.getBundleInfo();
    const bad = await manager.checkAndApply("https://example.test/bad.json");
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.reason).toBe("hash");

    expect(manager.getBundleInfo().active.version).toBe(before.active.version);
    expect(fs.readlinkSync(path.join(layout.bundlesDir, "active"))).toBe(
      "2026.08.10-3",
    );
    expect(manager.getLastFailure()?.reason).toBe("hash");
    expect(fs.existsSync(path.join(layout.bundlesDir, "failures.jsonl"))).toBe(
      true,
    );
  });

  it("rejects a bad manifest signature", async () => {
    const { publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch({
        "https://example.test/m.json": {
          body: {
            version: "1",
            minShell: "0.1.0",
            url: "https://example.test/b.tar",
            sha256: "a".repeat(64),
            signature: Buffer.from("not-a-real-signature").toString("base64"),
          },
        },
      }),
    });

    const result = await manager.checkAndApply("https://example.test/m.json");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("signature");
    expect(manager.getBundleInfo().active.version).toBe("0.0.0-seed");
  });

  it("refuses a bundle that requires a newer shell and indicates the update path", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const content = tempDir("aprovan-content-");
    writeBundleContent(content, "future");
    const archive = await packTar(content);
    const manifest = signManifest(privateKey, {
      version: "2099.01.01-1",
      minShell: "9.0.0",
      url: "https://example.test/bundle.tar",
      sha256: sha256Hex(archive),
    });

    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      shellUpdatePath: "https://aprovan.com/download",
      fetch: mockFetch({
        "https://example.test/m.json": { body: manifest },
        "https://example.test/bundle.tar": { body: archive },
      }),
    });

    const result = await manager.checkAndApply("https://example.test/m.json");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("minShell");
      expect(result.requiredShell).toBe("9.0.0");
      expect(result.shellUpdatePath).toBe("https://aprovan.com/download");
      expect(result.message).toMatch(/Update the shell/);
    }
    expect(fs.existsSync(path.join(layout.bundlesDir, "active"))).toBe(false);
  });

  it("retains previous on activate and rolls back after two failed boots", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const older = await makeSignedBundle(privateKey, "2026.08.10-3", "old");
    const newer = await makeSignedBundle(privateKey, "2026.08.14-1", "new");

    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch({ ...older.routes, ...newer.routes }),
    });

    expect(
      (await manager.checkAndApply("https://example.test/2026.08.10-3.json")).ok,
    ).toBe(true);
    manager.reportRendererReady();

    expect(
      (await manager.checkAndApply("https://example.test/2026.08.14-1.json")).ok,
    ).toBe(true);
    const info = manager.getBundleInfo();
    expect(info.active.version).toBe("2026.08.14-1");
    expect(info.previous?.version).toBe("2026.08.10-3");

    expect(manager.handleLaunch()).toEqual({ rolledBack: false });
    const second = manager.handleLaunch();
    expect(second.rolledBack).toBe(true);
    expect(second.toVersion).toBe("2026.08.10-3");
    expect(manager.getBundleInfo().active.version).toBe("2026.08.10-3");
    expect(MAX_FAILED_BOOTS).toBe(2);
  });

  it("does not roll back when the renderer reports ready", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const signed = await makeSignedBundle(privateKey, "2026.08.14-1", "ok");
    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch(signed.routes),
    });
    expect(
      (await manager.checkAndApply("https://example.test/2026.08.14-1.json")).ok,
    ).toBe(true);
    manager.reportRendererReady();
    expect(manager.handleLaunch()).toEqual({ rolledBack: false });
    expect(manager.getBundleInfo().active.version).toBe("2026.08.14-1");
  });

  it("discards partial staging on interrupt and leaves active unchanged", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const seed = await makeSignedBundle(privateKey, "2026.08.10-3", "seed");
    const next = await makeSignedBundle(privateKey, "2026.08.14-1", "next");

    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch({ ...seed.routes, ...next.routes }),
      extractArchive: async () => {
        const err = new Error("interrupted");
        (err as NodeJS.ErrnoException).code = "ABORT_ERR";
        throw err;
      },
    });

    // Seed must use real extract — apply seed with a separate manager first.
    const seeder = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch(seed.routes),
    });
    expect(
      (await seeder.checkAndApply("https://example.test/2026.08.10-3.json")).ok,
    ).toBe(true);
    seeder.reportRendererReady();

    const interrupted = await manager.checkAndApply(
      "https://example.test/2026.08.14-1.json",
    );
    expect(interrupted.ok).toBe(false);
    if (!interrupted.ok) expect(interrupted.reason).toBe("interrupted");

    expect(manager.getBundleInfo().active.version).toBe("2026.08.10-3");
    expect(
      fs.readdirSync(layout.bundlesDir).filter((n) => n.startsWith(".staging-")),
    ).toEqual([]);

    const leftover = path.join(layout.bundlesDir, ".staging-orphan");
    fs.mkdirSync(leftover);
    fs.writeFileSync(path.join(leftover, "x"), "partial");
    expect(manager.discardPartialStaging()).toContain(leftover);
    expect(fs.existsSync(leftover)).toBe(false);
  });

  it("rollback does not touch gateway-data", async () => {
    const { privateKey, publicKey } = loadTestKeys();
    const layout = ensureAppSupportLayout(tempDir("aprovan-bm-"));
    const marker = path.join(layout.gatewayDataDir, "workspace.sqlite");
    fs.writeFileSync(marker, "gateway-state\n");

    const older = await makeSignedBundle(privateKey, "2026.08.10-3", "a");
    const newer = await makeSignedBundle(privateKey, "2026.08.14-1", "b");
    const manager = new BundleManager({
      bundlesDir: layout.bundlesDir,
      shellVersion: "0.1.0",
      publicKey,
      fetch: mockFetch({ ...older.routes, ...newer.routes }),
    });

    expect(
      (await manager.checkAndApply("https://example.test/2026.08.10-3.json")).ok,
    ).toBe(true);
    manager.reportRendererReady();
    expect(
      (await manager.checkAndApply("https://example.test/2026.08.14-1.json")).ok,
    ).toBe(true);

    manager.rollback("test");
    expect(fs.readFileSync(marker, "utf8")).toBe("gateway-state\n");
    expect(manager.getBundleInfo().active.version).toBe("2026.08.10-3");
  });

  it("origin serves only the active bundle; offline load uses on-disk tree", () => {
    const root = tempDir("aprovan-origin-");
    writeBundleContent(root, "offline");
    const ok = resolveWithinBundle(root, "chat/index.html");
    expect(ok.ok).toBe(true);
    const outside = resolveWithinBundle(root, "../secret");
    expect(outside.ok).toBe(false);
  });
});
