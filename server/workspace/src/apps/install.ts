/**
 * Install records — ULID-keyed `AppInstallation` under `svc#installs / <installId>`.
 *
 * Install-as-copy (IW-9 B D8): the origin archive (`app.yaml` + app root) is
 * copied into the installer's `apps/<slug>` at install time, pinned to
 * `{tag?, commit}`, with F2's `hosting: "managed" | "hosted"`. Serving reads
 * only the local copy — never the origin at request time. Updates are an
 * explicit re-copy (`updateCheck` / `applyUpdate`).
 *
 * Legacy channel/release pin helpers and optional `editing`/`prefix`/
 * `resolvedRelease` fields remain so `apps/service.ts` typechecks until
 * stream 6 rewires procedures; new installs set the copy-model fields.
 */

import { createHash } from "node:crypto";
import { parse as parseYaml } from "yaml";
import {
  confirmInstallCeiling,
  declareAppAlwaysAsk,
  proposeInstallCeiling,
  saveInstallCard,
  type CapabilityCard,
} from "../capability-cards.js";
import { getFsStore, listAll } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { readCommit, readSnapshot } from "../vcs/store.js";
import { mintInstallId, type AppId, type InstallId } from "./identity.js";
import {
  DEFAULT_CHANNEL,
  resolveRelease,
  resolveReleaseTag,
  type ResolvedRelease,
} from "./release-tags.js";
import { assertRootAvailable } from "./roots.js";
import {
  APP_DATA_ROOT,
  workspacePath,
  type AppManifest,
  type AppPaths,
  type AppRequirement,
} from "./store.js";

const INSTALLS_SCOPE = svcScope("installs");

/** F2 hosting bucket (user-facing). Re-exported shape matches instances.ts. */
export type HostingMode = "hosted" | "managed";

/** F4 declaration flavors (collapsed to {@link HostingMode} at install pick). */
export type HostModeDecl = "managed" | "creator-hosted" | "publisher-hosted";

/** Canonical install pin — commit always present (iw9-a tag when available). */
export type CommitPin = {
  tag?: string;
  commit: string;
  /**
   * Unused on commit pins. Optional so legacy `!isChannelPin(pin) → pin.release`
   * narrowing in service.ts still typechecks until stream 6 rewires update.
   */
  release?: string;
};

/** @deprecated Legacy channel/release pin — retained for service.ts until stream 6. */
export type LegacyInstallPin = { channel: string } | { release: string };

export type InstallPin = CommitPin | LegacyInstallPin;

export interface AppInstallation {
  installId: InstallId;
  originAppId: AppId;
  originWorkspaceId: string;
  /**
   * Copy-model pin (`{tag?, commit}`) or legacy channel/release until
   * stream 6/7 migrate existing records.
   */
  pin: InstallPin;
  /**
   * F2 hosting mode — IMMUTABLE at creation (IW-9 invariant 10; enforced in
   * {@link saveInstall}). Absent on pre-F2 stored records ⇒ read as
   * "managed" (TD4). No mode-flip migration exists or will.
   */
  hosting: HostingMode;
  /** Set when `hosting === "hosted"` — which workspace hosts the data. */
  hostingWorkspaceId?: string;
  /**
   * Local materialization root (`apps/<slug>`). Always set for copy installs;
   * optional on pre-migration records.
   */
  root?: string;
  /**
   * Remapped serving manifest for the local copy. Absent on legacy
   * serve-from-origin installs.
   */
  manifest?: AppManifest;
  /** Fingerprint of installed archive bytes — local-edits guard for updates. */
  contentFingerprint?: string;
  /**
   * @deprecated Use `pin.commit` / `pin.tag`. Retained until stream 6/7.
   */
  resolvedRelease?: string | null;
  /** contract → profileId */
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  /**
   * @deprecated Every install is a materialized copy. Retained until stream 6.
   */
  editing?: boolean;
  /**
   * @deprecated Prefer `root`. Retained until stream 6/7 migration.
   */
  prefix?: string;
  installedBy: string;
  installedAt: string;
  updatedAt: string;
}

/** Default install prefix: the app's own folder in the caller's workspace. */
export function defaultInstallPrefix(name: string): string {
  return `apps/${name}`;
}

export function installPrefix(value: unknown, name: string): string {
  if (value === undefined || value === null || value === "") {
    return defaultInstallPrefix(name);
  }
  return workspacePath(value, "prefix");
}

export function isChannelPin(pin: InstallPin): pin is { channel: string } {
  return "channel" in pin;
}

export function isCommitPin(pin: InstallPin): pin is CommitPin {
  return "commit" in pin && typeof (pin as CommitPin).commit === "string";
}

export async function readInstall(
  workspaceId: string,
  installId: string,
): Promise<AppInstallation | undefined> {
  return readSvcRecord<AppInstallation>(workspaceId, INSTALLS_SCOPE, installId).catch(
    () => undefined,
  );
}

export async function requireInstall(
  workspaceId: string,
  installId: string,
): Promise<AppInstallation> {
  const install = await readInstall(workspaceId, installId);
  if (!install) throw new ServiceError(`Unknown install: ${installId}`, 404);
  return install;
}

/**
 * Persist an install. Rejects flips of `hostingWorkspaceId` (400) and of
 * `hosting` (409 per the F2 TD4 frozen contract — the mode is immutable at
 * creation; absent field on pre-F2 records reads as "managed"). No mode-flip
 * migration exists or will (IW-9 invariant 10).
 */
export async function saveInstall(
  workspaceId: string,
  install: AppInstallation,
): Promise<void> {
  const existing = await readInstall(workspaceId, install.installId);
  if (existing) {
    if ((existing.hostingWorkspaceId ?? undefined) !== (install.hostingWorkspaceId ?? undefined)) {
      throw new ServiceError(
        "hostingWorkspaceId is immutable at creation",
        400,
      );
    }
    const prevHosting = existing.hosting ?? "managed";
    const nextHosting = install.hosting ?? "managed";
    if (prevHosting !== nextHosting) {
      throw new ServiceError(
        `Hosting mode is immutable at creation (was "${prevHosting}")`,
        409,
      );
    }
  }
  await writeSvcRecord(workspaceId, INSTALLS_SCOPE, install.installId, install, install.installedBy);
}

export async function removeInstall(
  workspaceId: string,
  installId: string,
): Promise<boolean> {
  return deleteSvcRecord(workspaceId, INSTALLS_SCOPE, installId);
}

export async function listInstalls(workspaceId: string): Promise<AppInstallation[]> {
  const entries = await listSvcRecords<AppInstallation>(workspaceId, INSTALLS_SCOPE);
  return entries.map((entry) => entry.value);
}

/** Find an install of `originAppId` in this workspace (first match). */
export async function findInstallByOrigin(
  workspaceId: string,
  originAppId: string,
): Promise<AppInstallation | undefined> {
  const installs = await listInstalls(workspaceId);
  return installs.find((install) => install.originAppId === originAppId);
}

/**
 * Path binding for an installed session: partitions use installId; authored
 * paths use the local copy root when present, else legacy editing prefix,
 * else the origin manifest paths (pre-migration).
 */
export function installedScope(
  manifest: AppManifest,
  install: AppInstallation,
): AppPaths {
  const root = installRoot(install);
  const paths = root ? [root] : manifest.paths;
  return { id: install.installId, name: manifest.name, paths, ...(root ? { root } : {}) };
}

/** Local materialization root when the install has been copied. */
export function installRoot(install: AppInstallation): string | undefined {
  return install.root ?? install.prefix;
}

/**
 * Serving manifest for an install: local remapped snapshot when present,
 * otherwise the caller-supplied fallback (legacy path only).
 */
export function installServingManifest(
  install: AppInstallation,
  fallback?: AppManifest,
): AppManifest | undefined {
  if (install.manifest) return install.manifest;
  const root = installRoot(install);
  if (fallback && root) {
    return remapManifestToRoot(fallback, root, install.originAppId);
  }
  return fallback;
}

export function parseInstallPin(raw: unknown): InstallPin {
  if (raw === undefined || raw === null || raw === "") {
    return { channel: DEFAULT_CHANNEL };
  }
  if (typeof raw === "string") {
    return { channel: raw };
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    const value = raw as Record<string, unknown>;
    if (typeof value["commit"] === "string" && value["commit"]) {
      const pin: CommitPin = { commit: value["commit"] };
      if (typeof value["tag"] === "string" && value["tag"]) pin.tag = value["tag"];
      return pin;
    }
    if (typeof value["release"] === "string" && value["release"]) {
      return { release: value["release"] };
    }
    if (typeof value["channel"] === "string" && value["channel"]) {
      return { channel: value["channel"] };
    }
  }
  throw new ServiceError("pin must be {commit}, {channel}, or {release}", 400);
}

/**
 * Resolve a legacy pin against the origin: channel → current channel release;
 * release/tag pin → that release id (must exist).
 */
export async function resolvePinRelease(
  originWorkspaceId: string,
  manifest: AppManifest,
  pin: InstallPin,
): Promise<ResolvedRelease | undefined> {
  if (isCommitPin(pin)) {
    if (pin.tag) {
      return resolveRelease(originWorkspaceId, manifest.appId, pin.tag);
    }
    if (pin.commit) {
      const commit = await readCommit(originWorkspaceId, pin.commit);
      if (!commit) return undefined;
      return {
        releaseId: pin.tag ?? pin.commit,
        commitId: commit.id,
        snapshotId: commit.snapshot,
        createdAt: commit.createdAt,
      };
    }
    return undefined;
  }
  if (isChannelPin(pin)) {
    return resolveRelease(originWorkspaceId, manifest.appId, pin.channel);
  }
  return resolveRelease(originWorkspaceId, manifest.appId, pin.release);
}

/** @deprecated No-op retained so older tests that imported the cache reset still compile. */
export function resetReleaseCache(): void {}

export interface BindingResolution {
  bindings: Record<string, string>;
  /** Contracts that could not be fulfilled (non-optional). */
  missing: string[];
}

/**
 * Resolve profile bindings for each requirement: explicit map entry, else
 * requirement.profileName, else the contract's tenant `default` profile.
 */
export async function resolveBindings(
  requires: readonly AppRequirement[] | undefined,
  explicit: Record<string, string> | undefined,
  resolveProfile: (contract: string, profileName: string) => Promise<string | undefined>,
): Promise<BindingResolution> {
  const bindings: Record<string, string> = {};
  const missing: string[] = [];
  for (const req of requires ?? []) {
    const fromExplicit = explicit?.[req.contract];
    let profileId: string | undefined;
    if (fromExplicit) {
      // Prefer resolve-by-name; fall back to treating the value as a raw id.
      profileId =
        (await resolveProfile(req.contract, fromExplicit)) ?? fromExplicit;
    } else {
      const named = req.profileName ?? "default";
      profileId = await resolveProfile(req.contract, named);
    }
    if (profileId) {
      bindings[req.contract] = profileId;
      continue;
    }
    if (!req.optional) missing.push(req.contract);
  }
  return { bindings, missing };
}

export function bindingMissingError(contracts: string[]): ServiceError {
  return new ServiceError(
    `Unfulfilled requirement${contracts.length === 1 ? "" : "s"}: ${contracts.join(", ")}. ` +
      `Create a profile for ${contracts.length === 1 ? "this contract" : "these contracts"} ` +
      `(POST /profiles with targetKind "interface") or pass bindings naming an existing profile.`,
    400,
  );
}

export function mintNewInstall(input: {
  originAppId: AppId;
  originWorkspaceId: string;
  pin: InstallPin;
  resolvedRelease?: string | null;
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  prefix?: string;
  root?: string;
  hosting?: HostingMode;
  hostingWorkspaceId?: string;
  manifest?: AppManifest;
  contentFingerprint?: string;
  installedBy: string;
}): AppInstallation {
  const now = new Date().toISOString();
  return {
    installId: mintInstallId(),
    originAppId: input.originAppId,
    originWorkspaceId: input.originWorkspaceId,
    pin: input.pin,
    hosting: input.hosting ?? "managed",
    ...(input.hostingWorkspaceId ? { hostingWorkspaceId: input.hostingWorkspaceId } : {}),
    ...(input.root ? { root: input.root } : {}),
    ...(input.manifest ? { manifest: input.manifest } : {}),
    ...(input.contentFingerprint ? { contentFingerprint: input.contentFingerprint } : {}),
    resolvedRelease: input.resolvedRelease ?? null,
    bindings: input.bindings,
    config: input.config,
    editing: false,
    ...(input.prefix ? { prefix: input.prefix } : {}),
    installedBy: input.installedBy,
    installedAt: now,
    updatedAt: now,
  };
}

/**
 * Copy authored files from an origin workspace path tree into `destRoot` in
 * the installing workspace. Shared by {@link materializeFork},
 * {@link installAsCopy}, and stream 7's migration (preserve this helper).
 */
export async function copyArchivePaths(
  installWorkspaceId: string,
  originWorkspaceId: string,
  originPaths: readonly string[],
  destRoot: string,
  options?: { entry?: string; entryHash?: string },
): Promise<void> {
  const store = getFsStore();
  for (const pathPrefix of originPaths) {
    const entries = await listAll(store, originWorkspaceId, pathPrefix);
    for (const entry of entries) {
      const relative =
        entry.path === pathPrefix
          ? ""
          : entry.path.slice(pathPrefix.length).replace(/^\//, "");
      const dest = relative ? `${destRoot}/${relative}` : destRoot;
      const hash =
        options?.entry && entry.path === options.entry && options.entryHash
          ? options.entryHash
          : undefined;
      const file = await store.read(originWorkspaceId, entry.path, hash);
      if (!file) continue;
      await store.write(installWorkspaceId, dest, file.content, file.mimeType);
    }
  }
}

/**
 * Copy a release commit's snapshot into `destRoot`. Prefer this over live-tree
 * {@link copyArchivePaths} when a commit pin is known.
 */
export async function materializeCommit(
  installWorkspaceId: string,
  originWorkspaceId: string,
  commitId: string,
  destRoot: string,
): Promise<void> {
  const commit = await readCommit(originWorkspaceId, commitId);
  if (!commit) throw new ServiceError(`Unknown commit: ${commitId}`, 404);
  const snapshot = await readSnapshot(originWorkspaceId, commit.snapshot);
  if (!snapshot) throw new ServiceError(`Snapshot missing for commit ${commitId}`, 404);

  const store = getFsStore();
  const originRoot = snapshot.prefix;
  for (const entry of snapshot.entries) {
    const relative =
      !originRoot || entry.path === originRoot
        ? originRoot
          ? ""
          : entry.path
        : entry.path.startsWith(`${originRoot}/`)
          ? entry.path.slice(originRoot.length + 1)
          : entry.path;
    const dest = relative ? `${destRoot}/${relative}` : destRoot;
    const file = await store.read(originWorkspaceId, entry.path, entry.hash);
    if (!file) continue;
    await store.write(installWorkspaceId, dest, file.content, file.mimeType);
  }
}

/**
 * Copy the pinned release's authored files from the origin workspace into
 * `prefix` in the installing workspace. Tag-backed: materializes the release
 * commit snapshot (stream 7 migration + service.ts editing path).
 */
export async function materializeFork(
  installWorkspaceId: string,
  originWorkspaceId: string,
  release: ResolvedRelease,
  prefix: string,
): Promise<void> {
  await materializeCommit(
    installWorkspaceId,
    originWorkspaceId,
    release.commitId,
    prefix,
  );
}

/** Remap an origin entry path under a materialization prefix. */
export function remapEntry(entry: string, originPaths: string[], prefix: string): string {
  const root = originPaths[0] ?? "";
  if (root && (entry === root || entry.startsWith(`${root}/`))) {
    const relative = entry === root ? "" : entry.slice(root.length + 1);
    return relative ? `${prefix}/${relative}` : prefix;
  }
  const base = entry.includes("/") ? entry.slice(entry.lastIndexOf("/") + 1) : entry;
  return `${prefix}/${base}`;
}

export function remapManifestToRoot(
  origin: AppManifest,
  root: string,
  originAppId: AppId,
): AppManifest {
  const originPaths = origin.paths?.length ? origin.paths : origin.root ? [origin.root] : [];
  return {
    ...origin,
    root,
    paths: [root],
    entry: remapEntry(origin.entry, originPaths, root),
    originAppId,
  };
}

export async function purgeInstallData(
  workspaceId: string,
  installId: string,
): Promise<void> {
  await getFsStore().removePrefix(workspaceId, `${APP_DATA_ROOT}/${installId}`);
}

// ---------------------------------------------------------------------------
// Hosting-mode pick (F4 3-way → F2 2-way)
// ---------------------------------------------------------------------------

export function declaredHostModes(manifest: AppManifest): HostModeDecl[] {
  const fromDeclared = manifest.declared?.hostModes;
  if (fromDeclared && fromDeclared.length > 0) return [...fromDeclared];
  return ["managed"];
}

export function hostingBuckets(modes: readonly HostModeDecl[]): Set<HostingMode> {
  const buckets = new Set<HostingMode>();
  for (const mode of modes) {
    if (mode === "managed") buckets.add("managed");
    else buckets.add("hosted");
  }
  return buckets;
}

export interface ResolvedHosting {
  hosting: HostingMode;
  hostingWorkspaceId?: string;
}

/**
 * Resolve the install-time hosting pick. Single declared bucket skips the
 * prompt; multi-bucket requires an explicit `managed` | `hosted` (400 with
 * options otherwise). Rejects a bucket the app did not declare any flavor of.
 */
export function resolveHostingChoice(input: {
  manifest: AppManifest;
  requested?: HostingMode | string | null;
  originWorkspaceId: string;
  installerWorkspaceId: string;
}): ResolvedHosting {
  const modes = declaredHostModes(input.manifest);
  const buckets = hostingBuckets(modes);
  const options = [...buckets].sort();
  const raw = input.requested;
  const requested =
    raw === "managed" || raw === "hosted"
      ? raw
      : raw === undefined || raw === null || raw === ""
        ? undefined
        : (() => {
            throw new ServiceError(
              `hosting must be "managed" or "hosted" (options: ${options.join(", ")})`,
              400,
            );
          })();

  if (requested && !buckets.has(requested)) {
    throw new ServiceError(
      `Hosting mode "${requested}" is not declared by this app (declared: ${modes.join(", ")})`,
      400,
    );
  }

  if (buckets.size === 1) {
    const hosting = options[0]!;
    return finalizeHosting(hosting, modes, input.originWorkspaceId, input.installerWorkspaceId);
  }

  if (!requested) {
    throw new ServiceError(
      `Hosting mode required when the app declares multiple options: ${options.join(", ")}`,
      400,
    );
  }
  return finalizeHosting(requested, modes, input.originWorkspaceId, input.installerWorkspaceId);
}

function finalizeHosting(
  hosting: HostingMode,
  modes: readonly HostModeDecl[],
  originWorkspaceId: string,
  installerWorkspaceId: string,
): ResolvedHosting {
  if (hosting === "managed") return { hosting: "managed" };
  const hasPublisher = modes.includes("publisher-hosted");
  const hasCreator = modes.includes("creator-hosted");
  // Displayed fact: which hosted flavor was declared. Both → publisher wins
  // as the default host identity (secondary picker is stream 9 UI).
  const hostingWorkspaceId =
    hasPublisher && !hasCreator
      ? originWorkspaceId
      : hasCreator && !hasPublisher
        ? installerWorkspaceId
        : originWorkspaceId;
  return { hosting: "hosted", hostingWorkspaceId };
}

// ---------------------------------------------------------------------------
// Pin resolution (release-as-tag when present; else VCS head / release floor)
// ---------------------------------------------------------------------------

/**
 * Resolve `{tag?, commit}` for an install/update via release-as-tag.
 */
export async function resolveCommitPin(
  originWorkspaceId: string,
  manifest: AppManifest,
  legacyPin?: InstallPin,
): Promise<CommitPin> {
  const tag =
    legacyPin && isCommitPin(legacyPin)
      ? legacyPin.tag
      : legacyPin && !isChannelPin(legacyPin)
        ? legacyPin.release
        : legacyPin && isChannelPin(legacyPin)
          ? legacyPin.channel
          : undefined;

  try {
    if (legacyPin && isChannelPin(legacyPin)) {
      const resolved = await resolveRelease(
        originWorkspaceId,
        manifest.appId,
        legacyPin.channel,
      );
      if (resolved) return { tag: resolved.releaseId, commit: resolved.commitId };
    }
    return await resolveReleaseTag(originWorkspaceId, manifest.appId, tag);
  } catch (err) {
    if (legacyPin && isCommitPin(legacyPin) && legacyPin.commit) {
      return { commit: legacyPin.commit, ...(legacyPin.tag ? { tag: legacyPin.tag } : {}) };
    }
    // No release yet — fingerprint the app root as a commit floor.
    const root = manifest.root ?? manifest.paths[0] ?? `apps/${manifest.name}`;
    const fp = await fingerprintRoot(originWorkspaceId, root);
    if (err instanceof ServiceError && err.status === 404) {
      return { commit: fp, ...(tag ? { tag } : {}) };
    }
    return { commit: fp };
  }
}

export async function resolveOriginHeadPin(
  originWorkspaceId: string,
  manifest: AppManifest,
): Promise<CommitPin | undefined> {
  try {
    return await resolveCommitPin(originWorkspaceId, manifest, { channel: DEFAULT_CHANNEL });
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Content fingerprint + local-edits guard
// ---------------------------------------------------------------------------

export async function fingerprintRoot(
  workspaceId: string,
  root: string,
): Promise<string> {
  const store = getFsStore();
  const entries = await listAll(store, workspaceId, root);
  const lines: string[] = [];
  for (const entry of entries.sort((a, b) => a.path.localeCompare(b.path))) {
    const file = await store.read(workspaceId, entry.path);
    if (!file) continue;
    lines.push(`${entry.path}:${file.hash ?? createHash("sha256").update(file.content).digest("hex")}`);
  }
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}

export async function installHasLocalEdits(
  workspaceId: string,
  install: AppInstallation,
): Promise<boolean> {
  const root = installRoot(install);
  if (!root || !install.contentFingerprint) return false;
  const current = await fingerprintRoot(workspaceId, root);
  return current !== install.contentFingerprint;
}

// ---------------------------------------------------------------------------
// Install-as-copy + update-check / apply-update
// ---------------------------------------------------------------------------

export interface InstallAsCopyInput {
  originWorkspaceId: string;
  manifest: AppManifest;
  installerWorkspaceId: string;
  installedBy: string;
  /** Target slug under apps/<slug>; defaults to manifest slug/name. */
  slug?: string;
  /** Explicit hosting pick when the app declares multiple buckets. */
  hosting?: HostingMode | string;
  bindings?: Record<string, string>;
  config?: Record<string, unknown>;
  /** Optional legacy pin hint for resolving the commit/tag. */
  pin?: InstallPin;
}

/**
 * Copy the origin archive into `apps/<slug>`, pin `{tag?, commit}`, record
 * hosting, and return the install. Slug collision → 400 naming the conflict.
 */
export async function installAsCopy(input: InstallAsCopyInput): Promise<AppInstallation> {
  const slug =
    (typeof input.slug === "string" && input.slug.trim()) ||
    input.manifest.slug ||
    input.manifest.name;
  const root = workspacePath(`apps/${slug}`, "root");

  const hosting = resolveHostingChoice({
    manifest: input.manifest,
    requested: input.hosting,
    originWorkspaceId: input.originWorkspaceId,
    installerWorkspaceId: input.installerWorkspaceId,
  });

  try {
    await assertRootAvailable(input.installerWorkspaceId, root);
  } catch (err) {
    if (err instanceof ServiceError && err.status === 409) {
      throw new ServiceError(
        `Slug "${slug}" conflicts with an existing app root — choose an explicit slug (${err.message})`,
        400,
      );
    }
    throw err;
  }
  for (const other of await listInstalls(input.installerWorkspaceId)) {
    const otherRoot = installRoot(other);
    if (otherRoot === root) {
      throw new ServiceError(
        `Slug "${slug}" conflicts with existing install ${other.installId} at "${otherRoot}"`,
        400,
      );
    }
  }

  const pin = isCommitPin(input.pin ?? { channel: DEFAULT_CHANNEL })
    ? (input.pin as CommitPin)
    : await resolveCommitPin(input.originWorkspaceId, input.manifest, input.pin);

  const release = await resolvePinRelease(
    input.originWorkspaceId,
    input.manifest,
    input.pin && !isCommitPin(input.pin)
      ? input.pin
      : pin.tag
        ? { release: pin.tag }
        : pin.commit
          ? pin
          : { channel: DEFAULT_CHANNEL },
  );

  const originPaths =
    input.manifest.paths?.length > 0
      ? input.manifest.paths
      : input.manifest.root
        ? [input.manifest.root]
        : [`apps/${input.manifest.name}`];

  if (release) {
    await materializeFork(
      input.installerWorkspaceId,
      input.originWorkspaceId,
      release,
      root,
    );
  } else if (pin.commit) {
    try {
      await materializeCommit(
        input.installerWorkspaceId,
        input.originWorkspaceId,
        pin.commit,
        root,
      );
    } catch {
      await copyArchivePaths(
        input.installerWorkspaceId,
        input.originWorkspaceId,
        originPaths,
        root,
      );
    }
  } else {
    await copyArchivePaths(
      input.installerWorkspaceId,
      input.originWorkspaceId,
      originPaths,
      root,
    );
  }

  // Remap origin manifest into the local copy root.
  const serving = remapManifestToRoot(
    input.manifest,
    root,
    input.manifest.appId,
  );

  const fingerprint = await fingerprintRoot(input.installerWorkspaceId, root);

  const install = mintNewInstall({
    originAppId: input.manifest.appId,
    originWorkspaceId: input.originWorkspaceId,
    pin,
    resolvedRelease: pin.tag ?? release?.releaseId ?? null,
    bindings: input.bindings ?? {},
    config: input.config ?? {},
    root,
    prefix: root,
    hosting: hosting.hosting,
    hostingWorkspaceId: hosting.hostingWorkspaceId,
    manifest: serving,
    contentFingerprint: fingerprint,
    installedBy: input.installedBy,
  });

  await saveInstall(input.installerWorkspaceId, install);
  return install;
}

export interface UpdateCheckResult {
  current: CommitPin;
  available?: CommitPin;
  originAvailable: boolean;
  /** Human hint when a newer pin exists, e.g. "v(N) available". */
  message?: string;
}

/** Compare the install pin against the origin's current release/commit. */
export async function updateCheck(
  installWorkspaceId: string,
  installId: string,
): Promise<UpdateCheckResult> {
  const install = await requireInstall(installWorkspaceId, installId);
  const current: CommitPin = isCommitPin(install.pin)
    ? install.pin
    : {
        commit: install.resolvedRelease ?? "unknown",
        ...(install.resolvedRelease ? { tag: install.resolvedRelease } : {}),
      };

  const originManifest = await import("./store.js").then((m) =>
    m.readApp(install.originWorkspaceId, install.originAppId).catch(() => undefined),
  );
  if (!originManifest) {
    return {
      current,
      originAvailable: false,
      message: "Origin unavailable",
    };
  }

  const available = await resolveCommitPin(install.originWorkspaceId, originManifest);
  const changed =
    available.commit !== current.commit || (available.tag ?? "") !== (current.tag ?? "");
  return {
    current,
    available: changed ? available : undefined,
    originAvailable: true,
    ...(changed
      ? {
          message: available.tag
            ? `v(${available.tag}) available`
            : `commit ${available.commit.slice(0, 8)} available`,
        }
      : {}),
  };
}

export interface ApplyUpdateResult {
  install: AppInstallation;
  from: CommitPin;
  to: CommitPin;
}

/**
 * Explicit re-copy of the origin archive onto the install root. Requires
 * `confirmOverwrite` when the local copy has edits since the last fingerprint.
 */
export async function applyUpdate(
  installWorkspaceId: string,
  installId: string,
  options?: { confirmOverwrite?: boolean },
): Promise<ApplyUpdateResult> {
  const install = await requireInstall(installWorkspaceId, installId);
  const root = installRoot(install);
  if (!root) {
    throw new ServiceError("Install has no local copy root to update", 400);
  }

  const originManifest = await import("./store.js").then((m) =>
    m.readApp(install.originWorkspaceId, install.originAppId).catch(() => undefined),
  );
  if (!originManifest) {
    throw new ServiceError(
      `Origin unavailable: app ${install.originAppId} in workspace ${install.originWorkspaceId} is gone`,
      404,
    );
  }

  if (await installHasLocalEdits(installWorkspaceId, install)) {
    if (options?.confirmOverwrite !== true) {
      throw new ServiceError(
        "Installation has local edits; pass confirmOverwrite=true to overwrite the copy from the origin",
        409,
      );
    }
  }

  const from: CommitPin = isCommitPin(install.pin)
    ? install.pin
    : {
        commit: install.resolvedRelease ?? "unknown",
        ...(install.resolvedRelease ? { tag: install.resolvedRelease } : {}),
      };
  const to = await resolveCommitPin(install.originWorkspaceId, originManifest);
  const release = await resolvePinRelease(
    install.originWorkspaceId,
    originManifest,
    to.tag ? { release: to.tag } : { channel: DEFAULT_CHANNEL },
  );

  // Clear previous archive files under the root, then re-copy.
  await getFsStore().removePrefix(installWorkspaceId, root);
  if (release) {
    await materializeFork(
      installWorkspaceId,
      install.originWorkspaceId,
      release,
      root,
    );
  } else {
    const originPaths =
      originManifest.paths?.length > 0
        ? originManifest.paths
        : originManifest.root
          ? [originManifest.root]
          : [`apps/${originManifest.name}`];
    await copyArchivePaths(
      installWorkspaceId,
      install.originWorkspaceId,
      originPaths,
      root,
    );
  }

  const serving = remapManifestToRoot(
    originManifest,
    root,
    install.originAppId,
  );
  const fingerprint = await fingerprintRoot(installWorkspaceId, root);
  const next: AppInstallation = {
    ...install,
    pin: to,
    resolvedRelease: to.tag ?? release?.releaseId ?? install.resolvedRelease ?? null,
    manifest: serving,
    contentFingerprint: fingerprint,
    updatedAt: new Date().toISOString(),
  };
  await saveInstall(installWorkspaceId, next);
  return { install: next, from, to };
}

// ---------------------------------------------------------------------------
// Install ceiling card (iw9-c stream 10) — static scan vs app.yaml
// ---------------------------------------------------------------------------

/**
 * Peek `alwaysAsk` from raw app.yaml without going through AppYamlSchema
 * (strict schema does not yet list the field — stream 10 stores it via
 * {@link declareAppAlwaysAsk}).
 */
export function extractAlwaysAskFromYaml(content: string): string[] {
  try {
    const raw = parseYaml(content);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
    const value = (raw as Record<string, unknown>)["alwaysAsk"];
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

/**
 * Build + persist an install ceiling card from archive sources and the
 * manifest's capability declaration. Does not install or write grants.
 */
export async function proposeInstallCeilingCard(input: {
  workspaceId: string;
  invokerId: string;
  sources: string[];
  declaredCapabilities: string[];
  appYamlContent?: string;
  appId?: string;
}): Promise<CapabilityCard> {
  const card = proposeInstallCeiling({
    workspaceId: input.workspaceId,
    invokerId: input.invokerId,
    sources: input.sources,
    declaredCapabilities: input.declaredCapabilities,
  });
  await saveInstallCard(card);
  if (input.appId && input.appYamlContent) {
    const alwaysAsk = extractAlwaysAskFromYaml(input.appYamlContent);
    if (alwaysAsk.length > 0) {
      await declareAppAlwaysAsk(input.workspaceId, input.appId, alwaysAsk);
    }
  }
  return card;
}

/**
 * Confirm the install ceiling: capability-level grants only. Rejects when
 * the card is blocked by undeclared use.
 */
export async function confirmInstallCeilingCard(
  workspaceId: string,
  cardId: string,
  reviewerId: string,
  subject?: { kind: "user" | "group" | "app-install"; id: string },
): Promise<CapabilityCard> {
  return confirmInstallCeiling(workspaceId, cardId, reviewerId, subject);
}
