/**
 * Install records — ULID-keyed `AppInstallation` under `svc#installs / <installId>`.
 *
 * An installation is a reference + pin (never a manifest copy). Default
 * installs serve the origin's pinned release content; `editing: true`
 * materializes a local fork. Profile bindings live install-side and are
 * mirrored as registry-server grants when available.
 */

import { getFsStore, listAll } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { mintInstallId, type AppId, type InstallId } from "./identity.js";
import { DEFAULT_CHANNEL, readRelease, type AppRelease } from "./releases.js";
import {
  APP_DATA_ROOT,
  workspacePath,
  type AppManifest,
  type AppPaths,
  type AppRequirement,
} from "./store.js";

const INSTALLS_SCOPE = svcScope("installs");

export type InstallPin = { channel: string } | { release: string };

export interface AppInstallation {
  installId: InstallId;
  originAppId: AppId;
  originWorkspaceId: string;
  pin: InstallPin;
  /** Last-resolved release id (update moves it). */
  resolvedRelease: string | null;
  /** contract → profileId */
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  /** false ⇒ serve from origin release; true ⇒ local fork under prefix. */
  editing: boolean;
  /** Set when editing materialized a fork. */
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

export async function saveInstall(
  workspaceId: string,
  install: AppInstallation,
): Promise<void> {
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
 * paths use the install prefix when editing, else the origin manifest paths.
 */
export function installedScope(
  manifest: AppManifest,
  install: AppInstallation,
): AppPaths {
  const paths =
    install.editing && install.prefix ? [install.prefix] : manifest.paths;
  return { id: install.installId, name: manifest.name, paths };
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
    if (typeof value["release"] === "string" && value["release"]) {
      return { release: value["release"] };
    }
    if (typeof value["channel"] === "string" && value["channel"]) {
      return { channel: value["channel"] };
    }
  }
  throw new ServiceError("pin must be {channel} or {release}", 400);
}

/**
 * Resolve a pin against the origin: channel → current channel release;
 * release pin → that release id (must exist).
 */
export async function resolvePinRelease(
  originWorkspaceId: string,
  manifest: AppManifest,
  pin: InstallPin,
): Promise<AppRelease | undefined> {
  if (isChannelPin(pin)) {
    const releaseId = manifest.channels?.[pin.channel];
    if (!releaseId) return undefined;
    return readRelease(originWorkspaceId, manifest.appId, releaseId);
  }
  return readRelease(originWorkspaceId, manifest.appId, pin.release);
}

/** Immutable release cache keyed by (originWorkspaceId, releaseId). */
const releaseCache = new Map<string, AppRelease>();

export async function cachedOriginRelease(
  originWorkspaceId: string,
  originAppId: string,
  releaseId: string | null | undefined,
): Promise<AppRelease | undefined> {
  if (!releaseId) return undefined;
  const key = `${originWorkspaceId}/${releaseId}`;
  const hit = releaseCache.get(key);
  if (hit) return hit;
  const release = await readRelease(originWorkspaceId, originAppId, releaseId);
  if (release) releaseCache.set(key, release);
  return release;
}

/** Tests: drop the release lookup cache. */
export function resetReleaseCache(): void {
  releaseCache.clear();
}

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
  resolvedRelease: string | null;
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  prefix?: string;
  installedBy: string;
}): AppInstallation {
  const now = new Date().toISOString();
  return {
    installId: mintInstallId(),
    originAppId: input.originAppId,
    originWorkspaceId: input.originWorkspaceId,
    pin: input.pin,
    resolvedRelease: input.resolvedRelease,
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
 * Copy the pinned release's authored files from the origin workspace into
 * `prefix` in the installing workspace.
 */
export async function materializeFork(
  installWorkspaceId: string,
  originWorkspaceId: string,
  release: AppRelease,
  prefix: string,
): Promise<void> {
  const store = getFsStore();
  const manifest = release.manifest;
  for (const pathPrefix of manifest.paths) {
    const entries = await listAll(store, originWorkspaceId, pathPrefix);
    for (const entry of entries) {
      const relative =
        entry.path === pathPrefix
          ? ""
          : entry.path.slice(pathPrefix.length).replace(/^\//, "");
      const dest = relative ? `${prefix}/${relative}` : prefix;
      const hash =
        entry.path === release.entry && release.entryHash ? release.entryHash : undefined;
      const file = await store.read(originWorkspaceId, entry.path, hash);
      if (!file) continue;
      await store.write(installWorkspaceId, dest, file.content, file.mimeType);
    }
  }
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

export async function purgeInstallData(
  workspaceId: string,
  installId: string,
): Promise<void> {
  await getFsStore().removePrefix(workspaceId, `${APP_DATA_ROOT}/${installId}`);
}
