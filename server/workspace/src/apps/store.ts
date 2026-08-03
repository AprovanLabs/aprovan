/**
 * App manifests — published bundles of workflows, a UI, a tool allow-list,
 * roles, and rate limits, owned by a workspace.
 *
 * An app binds *explicit workspace paths* to a deployed endpoint rather than
 * relying on a folder convention: `entry` is the workspace VFS path of the UI
 * entrypoint (e.g. `apps/liift4/widget.tsx`) and `paths` are the workspace
 * prefixes the app publishes (default `[dirname(entry)]`, plus any shared
 * library prefixes). Those prefixes are the single source of truth for BOTH
 * what the live site serves AND what an app session may read/write — one
 * prefix rule, two consumers (see {@link appPathAllowed}).
 *
 * Per-user app data lives under `.apps/<appId>/data/<user>` ({@link appDataDir});
 * each member's private space is `.users/<user>` ({@link userSpaceDir}). Both
 * are enforced structurally by the partition guard — no manifest listing.
 * Manifests are stored under `svc#apps / <appId>`; `(workspaceId, name)` is a
 * mutable alias only (see apps/identity.ts).
 *
 * The UI `entry` is an ordinary FS file, so its content is version history for
 * free (the FS store content-versions every write). The helpers at the bottom
 * of this file surface that history for the `apps.versions/version/restore`
 * ops — the versioned artifact is the manifest's `entry`.
 */

import { getFsStore, listAll, normalizeFsPath, type FsEntry, type FsFile } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import {
  dropAlias,
  dropAppLocation,
  indexAppLocation,
  setAlias,
  type AppId,
} from "./identity.js";

const APPS_SCOPE = svcScope("apps");
const WORKSPACE_SCOPE = svcScope("workspace");
const WORKSPACE_CONFIG_KEY = "config";

/**
 * Entrypoint file names tried, in order, when a publish points at a folder
 * instead of a file. A folder with exactly one `*.tsx` also resolves; any
 * other ambiguity is a 400 rather than a guess.
 */
export const ENTRY_CANDIDATES = ["index.tsx", "index.ts", "widget.tsx"];

/** File-plane root for per-app per-user partitions (`.apps/<id>/data/<sub>/…`). */
export const APP_DATA_ROOT = ".apps";

/** File-plane root for each member's private space (`.users/<sub>/…`). */
export const USER_SPACE_ROOT = ".users";

/** Structural roots the partition guard + snapshots hide — no manifest listing. */
export const STRUCTURAL_HIDDEN_ROOTS = [APP_DATA_ROOT, USER_SPACE_ROOT] as const;

export interface AppRoles {
  /** Cognito subs with the app's admin role. */
  admins?: string[];
  /**
   * Which authenticated users may use the app: "any" (any Aprovan account,
   * the default) or "listed" (only subs present in `users`).
   */
  access?: "any" | "listed";
  users?: string[];
}

export interface AppRateLimit {
  /** Requests per second per user (default 5). */
  rps?: number;
  /** Burst capacity per user (default 10). */
  burst?: number;
  /** Calls per user per UTC day (default 1000); durable across instances. */
  daily?: number;
}

export interface AppManifest {
  /** Durable ULID identity — storage key for this manifest. */
  appId: AppId;
  /** Current mutable alias (display / live URL); the alias index is authoritative. */
  name: string;
  /** Set when this app was forked from another. */
  originAppId?: AppId;
  title?: string;
  description?: string;
  /**
   * Workspace VFS path of the UI entrypoint (e.g. "apps/liift4/widget.tsx").
   * Absolute within the workspace — not relative to a folder.
   */
  entry: string;
  /**
   * Workspace path prefixes this app publishes. Authored source only — data
   * partitions hang off {@link APP_DATA_ROOT}, not these paths.
   */
  paths: string[];
  /**
   * Who can open the live app page (aprovan.com/apps/<workspace>/<name>):
   * "public" — anyone, no Aprovan account needed to view the page;
   * "private" — a signed-in Aprovan account passing the role model.
   * Defaults to "private". Tool/workflow calls always require a valid
   * account regardless of visibility.
   */
  visibility?: "public" | "private";
  /**
   * The app's **export list**: workflow names (registered in the owner
   * workspace) published under the app's namespace. An exported workflow is
   * callable as `POST /tools/app/<workflow>` and as
   * `POST /workflows/<workflow>/run`; a workflow not exported by any app is
   * workspace-internal.
   */
  workflows?: string[];
  /**
   * Interface-contract requirements fulfilled at install by binding a tenant
   * Profile (see apps/capabilities.ts `requires`).
   */
  requires?: AppRequirement[];
  /**
   * Channel → release id. The live page serves `channels.live`'s pinned
   * content when set (see apps/releases.ts); `?channel=preview` serves
   * `channels.preview` to the app's admins.
   */
  channels?: Record<string, string>;
  /**
   * Tool allow-list for app callers: exact `namespace.procedure` entries or
   * `namespace.*` wildcards. Everything not listed is denied for app
   * sessions — this is the blast-radius boundary for published apps.
   */
  allowedTools: string[];
  roles?: AppRoles;
  rateLimit?: AppRateLimit;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/** One interface-contract requirement declared on a manifest. */
export interface AppRequirement {
  contract: string;
  profileName?: string;
  optional?: boolean;
}

/**
 * Workspace-level configuration (the `svc#workspace` record). `shares`
 * exposes workspace paths outside an app's declared prefixes to app
 * sessions — apps always have automatic access to their own prefixes, so
 * this is only for deliberately shared data.
 */
export interface WorkspaceShare {
  /** Workspace path prefix being exposed (e.g. "shared/recipes"). */
  prefix: string;
  /** App names granted access, or "*" for every published app. */
  apps: string[] | "*";
  /** "read" (default) or "readwrite". */
  mode?: "read" | "readwrite";
}

export interface WorkspaceConfig {
  shares?: WorkspaceShare[];
}

const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

export function appName(value: unknown): string {
  if (typeof value !== "string" || !NAME_RE.test(value)) {
    throw new ServiceError(`app name must match ${NAME_RE}`, 400);
  }
  return value;
}

/**
 * A workspace VFS path, normalized without leading/trailing slashes. Throws
 * on traversal and on `.services/**` (service state is reachable only through
 * its tool namespaces).
 */
export function workspacePath(value: unknown, label = "path"): string {
  const path = typeof value !== "string" ? null : normalizeFsPath(value);
  if (!path) {
    throw new ServiceError(`${label} must be a workspace path (e.g. apps/liift4/widget.tsx)`, 400);
  }
  if (path === ".services" || path.startsWith(".services/")) {
    throw new ServiceError(`${label} cannot live under .services/`, 400);
  }
  return path;
}

/** The folder holding `path` (throws when it has none — apps need a root). */
export function pathDir(path: string, label = "entry"): string {
  const cut = path.lastIndexOf("/");
  if (cut <= 0) {
    throw new ServiceError(`${label} must live in a workspace folder, not at the root: ${path}`, 400);
  }
  return path.slice(0, cut);
}

/**
 * The path binding of a published app — a manifest, or the app-session scope
 * derived from one (see ServiceContext.appScope). Everything path-related is
 * decided from these fields alone. `id` is the ULID used for partition roots
 * (appId for origin-hosted use, installId once installs mint their own).
 */
export interface AppPaths {
  id: string;
  name: string;
  paths: string[];
}

/** The app's primary authored-source prefix. */
export function appRoot(app: AppPaths): string {
  const root = app.paths?.[0];
  if (!root) throw new ServiceError(`App ${app.name} has no published paths`, 400);
  return root;
}

/** Per-app data partition container: `.apps/<id>/data`. */
export function appDataRoot(id: string): string {
  return `${APP_DATA_ROOT}/${id}/data`;
}

/**
 * The data folder a session's writes land in: `.apps/<id>/data/<userSub>`.
 * `<id>` is the app ULID (origin-hosted) or install ULID (installed).
 */
export function appDataDir(id: string, userSub: string): string {
  return `${appDataRoot(id)}/${userSub}`;
}

/** A member's private file-plane space: `.users/<userSub>`. */
export function userSpaceDir(userSub: string): string {
  return `${USER_SPACE_ROOT}/${userSub}`;
}

const underPrefix = (path: string, prefix: string): boolean =>
  path === prefix || path.startsWith(`${prefix}/`);

// ---------------------------------------------------------------------------
// File-plane hiding — structural roots `.apps` / `.users`. No manifest
// listing: the guard matches path shape alone (tech-plan D3).
// ---------------------------------------------------------------------------

/**
 * Structural roots hidden from snapshots and fed into the partition guard.
 * Signature kept async for callers; `workspaceId` is unused (no cache / list).
 */
export async function hiddenDataPrefixes(_workspaceId?: string): Promise<string[]> {
  return [...STRUCTURAL_HIDDEN_ROOTS];
}

/** Does `path` fall under one of the structural hidden roots? */
export function isHiddenDataPath(path: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => underPrefix(path, prefix));
}

/** No-op: structural roots need no cache (tests still call this). */
export function resetHiddenDataPrefixCache(): void {
  // intentionally empty
}

// ---------------------------------------------------------------------------
// Per-user partition authorization — hiding grown into enforcement
// (specs per-user-space; tech-plan D3).
// ---------------------------------------------------------------------------

export type PartitionAccess = "open" | "own" | "foreign";

/**
 * Pure partition rule over the two structural roots:
 *   `.apps/<id>/data/<sub>/…`  — owner is `<sub>`
 *   `.users/<sub>/…`           — owner is `<sub>`
 * Partition containers (`.apps`, `.apps/<id>`, `.apps/<id>/data`, `.users`)
 * belong to nobody ("open"). `hiddenPrefixes` is retained for call-site
 * compatibility; matching is structural and ignores the list contents.
 */
export function partitionAccess(
  path: string,
  callerSub: string,
  _hiddenPrefixes?: readonly string[],
): PartitionAccess {
  if (underPrefix(path, APP_DATA_ROOT)) {
    if (path === APP_DATA_ROOT) return "open";
    const parts = path.slice(APP_DATA_ROOT.length + 1).split("/");
    // Expect <id>/data/<sub>/… — shorter paths are containers, not partitions.
    if (parts.length < 3 || parts[1] !== "data") return "open";
    const owner = parts[2]!;
    return owner === callerSub ? "own" : "foreign";
  }
  if (underPrefix(path, USER_SPACE_ROOT)) {
    if (path === USER_SPACE_ROOT) return "open";
    const owner = path.slice(USER_SPACE_ROOT.length + 1).split("/", 1)[0]!;
    return owner === callerSub ? "own" : "foreign";
  }
  return "open";
}

/**
 * Throws `ServiceError("Not found: <path>", 404)` when `path` sits inside
 * another user's data partition — deny-as-404.
 */
export async function assertPartitionAccess(
  workspaceId: string,
  callerSub: string,
  path: string,
): Promise<void> {
  const hidden = await hiddenDataPrefixes(workspaceId);
  if (partitionAccess(path, callerSub, hidden) === "foreign") {
    throw new ServiceError(`Not found: ${path}`, 404);
  }
}

/**
 * Resolve an app-relative path to its absolute workspace path under the
 * app's primary authored prefix.
 */
export function resolveAppPath(app: AppPaths, relative: string): string {
  return workspacePath(`${appRoot(app)}/${relative}`, "path");
}

/**
 * Does `path` belong to this app? The one place prefix authz is decided —
 * used by the live site (what it may serve) and by app sessions (what their
 * vfs/keyvalue calls may touch). Anything outside needs a workspace share.
 */
export function appPathAllowed(app: AppPaths, path: string): boolean {
  return (app.paths ?? []).some((prefix) => underPrefix(path, prefix));
}

/**
 * Is `path` publishable over HTTP? Declared prefixes minus the ID-keyed data
 * partition — per-user app data is never served through the live site.
 */
export function appPathServable(app: AppPaths, path: string): boolean {
  return appPathAllowed(app, path) && !underPrefix(path, appDataRoot(app.id));
}

/**
 * Resolve the UI entrypoint for a publish that points at `target`: a file
 * path is taken as-is (after an existence check), a folder is resolved
 * against {@link ENTRY_CANDIDATES} and then a lone `*.tsx`.
 */
export async function resolveAppEntry(workspaceId: string, target: unknown): Promise<string> {
  const path = workspacePath(target, "entry");
  const store = getFsStore();
  if (await store.read(workspaceId, path)) return path;

  const prefix = `${path}/`;
  const names = (await listAll(store, workspaceId, path))
    .map((entry) => entry.path)
    .filter((entry) => entry.startsWith(prefix))
    .map((entry) => entry.slice(prefix.length))
    .filter((name) => !name.includes("/"));

  const conventional = ENTRY_CANDIDATES.find((candidate) => names.includes(candidate));
  if (conventional) return prefix + conventional;
  const widgets = names.filter((name) => name.endsWith(".tsx"));
  if (widgets.length === 1) return prefix + widgets[0]!;

  throw new ServiceError(
    widgets.length > 1
      ? `Ambiguous app entrypoint in ${path} — name one explicitly (candidates: ${widgets.join(", ")})`
      : `App entrypoint not found: ${path} is not a file and holds none of ${ENTRY_CANDIDATES.join(", ")}`,
    400,
  );
}

/** Persist a manifest by appId and refresh its name→appId alias. */
export async function saveApp(workspaceId: string, manifest: AppManifest): Promise<void> {
  await writeSvcRecord(workspaceId, APPS_SCOPE, manifest.appId, manifest, manifest.createdBy);
  await setAlias(workspaceId, manifest.name, manifest.appId);
  await indexAppLocation(workspaceId, manifest.appId, manifest.name);
  const { syncDirectoryEntry } = await import("./directory.js");
  await syncDirectoryEntry(workspaceId, manifest);
}

/** Read a manifest by durable appId. No name-keyed or legacy-shape rebinding. */
export async function readApp(
  workspaceId: string,
  appId: string,
): Promise<AppManifest | undefined> {
  return readSvcRecord<AppManifest>(workspaceId, APPS_SCOPE, appId);
}

export async function listApps(workspaceId: string): Promise<AppManifest[]> {
  const entries = await listSvcRecords<AppManifest>(workspaceId, APPS_SCOPE);
  return entries.map((entry) => entry.value).filter((m): m is AppManifest => Boolean(m?.appId));
}

export interface RemoveAppOptions {
  /** Also delete the app's ID-keyed data root (`.apps/<appId>`). */
  purgeData?: boolean;
}

export async function removeApp(
  workspaceId: string,
  appId: string,
  options: RemoveAppOptions = {},
): Promise<boolean> {
  const manifest = await readApp(workspaceId, appId);
  const removed = await deleteSvcRecord(workspaceId, APPS_SCOPE, appId);
  if (manifest) {
    await dropAlias(workspaceId, manifest.name);
    await dropAppLocation(manifest.appId);
    const { dropDirectoryEntry } = await import("./directory.js");
    await dropDirectoryEntry(manifest.appId);
  }
  if (options.purgeData && manifest) {
    await getFsStore().removePrefix(workspaceId, `${APP_DATA_ROOT}/${manifest.appId}`);
  }
  return removed;
}

// ---------------------------------------------------------------------------
// Entrypoint version history — thin wrappers over the FS store's per-file
// versioning, keyed on a manifest's `entry`.
// ---------------------------------------------------------------------------

/** Every stored version of an app's UI entrypoint, newest (live) first. */
export async function listEntryVersions(
  workspaceId: string,
  entry: string,
): Promise<FsEntry[]> {
  return getFsStore().listVersions(workspaceId, entry);
}

/** One pinned version of an app's UI entrypoint by content hash. */
export async function readEntryVersion(
  workspaceId: string,
  entry: string,
  hash: string,
): Promise<FsFile | undefined> {
  return getFsStore().read(workspaceId, entry, hash);
}

/**
 * Restore a past entrypoint version by re-writing its content as the new
 * latest. Append-only: history is preserved and the old content simply becomes
 * live again. Returns the new latest file, or undefined when `hash` is unknown.
 */
export async function restoreEntryVersion(
  workspaceId: string,
  entry: string,
  hash: string,
): Promise<FsFile | undefined> {
  const version = await getFsStore().read(workspaceId, entry, hash);
  if (!version) return undefined;
  return getFsStore().write(workspaceId, entry, version.content, version.mimeType);
}

export async function readWorkspaceConfig(workspaceId: string): Promise<WorkspaceConfig> {
  const config = await readSvcRecord<WorkspaceConfig>(
    workspaceId,
    WORKSPACE_SCOPE,
    WORKSPACE_CONFIG_KEY,
  ).catch(() => undefined);
  return config && typeof config === "object" ? config : {};
}

export async function writeWorkspaceConfig(
  workspaceId: string,
  config: WorkspaceConfig,
): Promise<void> {
  await writeSvcRecord(workspaceId, WORKSPACE_SCOPE, WORKSPACE_CONFIG_KEY, config);
}

/**
 * Is `path` (workspace-relative) shared with `app` at the requested access
 * level by the workspace config?
 */
export function shareAllows(
  config: WorkspaceConfig,
  app: string,
  path: string,
  write: boolean,
): boolean {
  for (const share of config.shares ?? []) {
    const prefix = share.prefix.replace(/^\/+|\/+$/g, "");
    if (path !== prefix && !path.startsWith(`${prefix}/`)) continue;
    if (share.apps !== "*" && !share.apps.includes(app)) continue;
    if (write && (share.mode ?? "read") !== "readwrite") continue;
    return true;
  }
  return false;
}

/**
 * May an app session touch this workspace path? Its declared prefixes are
 * its own turf (read and write); everything else must be shared explicitly.
 */
export function appFsAllowed(
  app: AppPaths,
  config: WorkspaceConfig,
  path: string,
  write: boolean,
): boolean {
  return appPathAllowed(app, path) || shareAllows(config, app.name, path, write);
}

/** Does the allow-list permit `namespace.procedure`? */
export function toolAllowed(manifest: AppManifest, namespace: string, procedure: string): boolean {
  const exact = `${namespace}.${procedure}`;
  return manifest.allowedTools.some(
    (entry) => entry === exact || entry === `${namespace}.*`,
  );
}

/** Resolve the caller's role within the app; null when access is denied. */
export function callerRole(manifest: AppManifest, sub: string): "admin" | "user" | null {
  const roles = manifest.roles ?? {};
  if (roles.admins?.includes(sub)) return "admin";
  if ((roles.access ?? "any") === "listed") {
    return roles.users?.includes(sub) ? "user" : null;
  }
  return "user";
}
