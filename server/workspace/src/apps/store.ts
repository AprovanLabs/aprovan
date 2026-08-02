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
 * Everything the app stores lives under the primary prefix at
 * `<paths[0]>/data/<user>` ({@link appDataDir}) and is never served. The
 * owning workspace is the app's "account": its credentials execute the app's
 * workflows, its FS stores the app's data, and its members administer the
 * bundle. Consumers are any authenticated users — membership NOT required —
 * mediated exclusively through the app surface (allow-listed tools, per-user
 * data partitions, per-user rate limits).
 *
 * Manifests are stored in the record store under `svc#apps` in the owner
 * workspace tenant. Workspace-level sharing of paths *outside* an app's
 * declared prefixes is declared in the `svc#workspace` config record (see
 * WorkspaceConfig).
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

const APPS_SCOPE = svcScope("apps");
const WORKSPACE_SCOPE = svcScope("workspace");
const WORKSPACE_CONFIG_KEY = "config";

/**
 * Entrypoint file names tried, in order, when a publish points at a folder
 * instead of a file. A folder with exactly one `*.tsx` also resolves; any
 * other ambiguity is a 400 rather than a guess.
 */
export const ENTRY_CANDIDATES = ["index.tsx", "index.ts", "widget.tsx"];

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

/**
 * Where an app user's data physically lands.
 *
 * - `"owner"` (default): the publishing workspace stores every user's
 *   partition (`<paths[0]>/data/<userSub>`) and its credentials execute —
 *   a hosted service.
 * - `"workspace"`: the app is a template. A caller installs it
 *   (`apps.install`) into their OWN workspace, data lands under
 *   `<installPrefix>/data`, and execution uses the caller's credentials —
 *   a self-deployed app, carrying no publisher liability.
 */
export type AppDataScope = "owner" | "workspace";

export interface AppManifest {
  name: string;
  title?: string;
  description?: string;
  /**
   * Workspace VFS path of the UI entrypoint (e.g. "apps/liift4/widget.tsx").
   * Absolute within the workspace — not relative to a folder.
   */
  entry: string;
  /**
   * Workspace path prefixes this app publishes. `paths[0]` (always the
   * entry's folder) is the app's primary root: its data partition and its
   * app-relative vfs paths hang off it. Additional prefixes let an app ship
   * shared code/assets (e.g. "lib/charts") without copying them.
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
  /** Where this app's user data lives (default "owner"). */
  dataScope?: AppDataScope;
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
  const path = typeof value === "string" ? normalizeFsPath(value) : null;
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
 * decided from these two fields alone.
 */
export interface AppPaths {
  name: string;
  paths: string[];
  /**
   * Owner-hosted apps partition per app user under the app folder;
   * workspace-scoped installs already sit in the user's own workspace, so
   * their data root has nothing to partition against (see {@link appDataDir}).
   */
  dataScope?: AppDataScope;
}

/** The app's primary prefix: where its data and app-relative paths live. */
export function appRoot(app: AppPaths): string {
  const root = app.paths?.[0];
  if (!root) throw new ServiceError(`App ${app.name} has no published paths`, 400);
  return root;
}

/** The per-app data partition root — served to nobody, ever. */
export function appDataRoot(app: AppPaths): string {
  return `${appRoot(app)}/data`;
}

/**
 * The data folder a session's writes land in: per-(app, user) inside the
 * app's primary prefix for owner-hosted apps, and the install prefix's own
 * `data/` for a workspace-scoped install (the workspace *is* the user).
 */
export function appDataDir(app: AppPaths, userId: string): string {
  const root = appDataRoot(app);
  return app.dataScope === "workspace" ? root : `${root}/${userId}`;
}

const underPrefix = (path: string, prefix: string): boolean =>
  path === prefix || path.startsWith(`${prefix}/`);

// ---------------------------------------------------------------------------
// File-plane hiding — the data-partition prefixes a workspace *listing*
// should never surface (see docs/app-data.md, "The file plane forgets app
// data"). Now that `keyvalue` routes through the record store
// (services.ts/records.ts), nothing new lands under these prefixes, but
// existing per-user data written before the migration is still readable at
// its exact path for backward compatibility — only *listings* (vfs.list, the
// chat file tree at GET /fs) hide it, so a workspace member can no longer
// browse another user's partition by prefix, but neither surface 404s on a
// path it already knows.
//
// `.personal/data` mirrors apps/personal.ts's PERSONAL_PREFIX literally
// rather than importing it: personal.ts imports `listApps` from this module,
// so importing back would recreate the very module-cycle service-kernel.ts's
// header warns about.
// ---------------------------------------------------------------------------

const PERSONAL_DATA_PREFIX = ".personal/data";
const HIDDEN_PREFIX_CACHE_TTL_MS = 30_000;
const hiddenPrefixCache = new Map<string, { prefixes: string[]; expiresAt: number }>();

/**
 * Every data-partition prefix hidden from workspace listings: each published
 * app's `<paths[0]>/data` plus Personal's own `.personal/data`. Cached briefly
 * per workspace — defense-in-depth hiding can afford to lag a publish by a
 * few seconds, and every listing call would otherwise re-read every manifest.
 */
export async function hiddenDataPrefixes(workspaceId: string): Promise<string[]> {
  const now = Date.now();
  const cached = hiddenPrefixCache.get(workspaceId);
  if (cached && cached.expiresAt > now) return cached.prefixes;

  const manifests = await listApps(workspaceId).catch(() => []);
  const prefixes = [PERSONAL_DATA_PREFIX, ...manifests.map((manifest) => appDataRoot(manifest))];
  hiddenPrefixCache.set(workspaceId, { prefixes, expiresAt: now + HIDDEN_PREFIX_CACHE_TTL_MS });
  return prefixes;
}

/** Does `path` fall under one of the workspace's hidden data prefixes? */
export function isHiddenDataPath(path: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => underPrefix(path, prefix));
}

/** Reset the hidden-prefix cache (tests only — publishing an app mid-test
 * would otherwise read a stale prefix list). */
export function resetHiddenDataPrefixCache(): void {
  hiddenPrefixCache.clear();
}

// ---------------------------------------------------------------------------
// Per-user partition authorization — hiding grown into enforcement
// (specs per-user-data; tech-plan data-auth-model D1/D2).
//
// REPO CONVENTION: every exact-path FS entry point (tool plane, HTTP plane,
// any future route or verb) MUST call `assertPartitionAccess` (or the pure
// `partitionAccess`) before touching the store. The store itself carries no
// principal (WS-5 replaces the backends), so this guard above `IFsStore` is
// the single place partition policy lives.
// ---------------------------------------------------------------------------

export type PartitionAccess = "open" | "own" | "foreign";

/**
 * Pure partition rule: is `path` inside a per-user data partition, and whose?
 * The owner is the first path segment after the hidden data prefix
 * (`.personal/data/<sub>/…`, `<appRoot>/data/<sub>/…`). A path that IS a
 * hidden prefix (the partition container itself) belongs to nobody and is
 * "open" — enforcement is per-owner, not per-container.
 */
export function partitionAccess(
  path: string,
  callerSub: string,
  hiddenPrefixes: readonly string[],
): PartitionAccess {
  for (const prefix of hiddenPrefixes) {
    if (!underPrefix(path, prefix)) continue;
    if (path === prefix) return "open";
    const owner = path.slice(prefix.length + 1).split("/", 1)[0];
    return owner === callerSub ? "own" : "foreign";
  }
  return "open";
}

/**
 * Throws `ServiceError("Not found: <path>", 404)` when `path` sits inside
 * another user's data partition — deny-as-404, byte-identical to a
 * nonexistent path, so foreign partitions are unprobeable (D2). Owners pass;
 * paths outside every partition pass.
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
 * Resolve an app-relative path (as an app session or the live site addresses
 * it) to its absolute workspace path under the app's primary prefix.
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
 * Is `path` publishable over HTTP? Declared prefixes minus the data
 * partition — per-user app data is co-located with the code but never
 * leaves through the live site or `__project__`.
 */
export function appPathServable(app: AppPaths, path: string): boolean {
  return appPathAllowed(app, path) && !underPrefix(path, appDataRoot(app));
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

export async function saveApp(workspaceId: string, manifest: AppManifest): Promise<void> {
  await writeSvcRecord(workspaceId, APPS_SCOPE, manifest.name, manifest, manifest.createdBy);
  // The hidden-prefix cache now feeds *enforcement* (partitionAccess), not
  // just listing cosmetics — a publish must be visible to the very next
  // guard check in this process, not after the TTL.
  hiddenPrefixCache.delete(workspaceId);
}

/**
 * Read a manifest, *resolving* its path binding rather than trusting whatever
 * shape is on disk. Manifests written before apps declared `entry`/`paths`
 * only name a folder, so resolve that once and rewrite in place — a published
 * app should never 404 on a stale shape, and this is the only place that has
 * to know the old one.
 */
export async function readApp(
  workspaceId: string,
  name: string,
): Promise<AppManifest | undefined> {
  const stored = await readSvcRecord<AppManifest & { dir?: string }>(
    workspaceId,
    APPS_SCOPE,
    name,
  );
  if (!stored) return undefined;
  if (stored.entry && stored.paths?.length) return stored;

  const entry = await resolveAppEntry(workspaceId, stored.entry ?? stored.dir);
  const { dir: _legacy, ...rest } = stored;
  const bound: AppManifest = { ...rest, entry, paths: [pathDir(entry)] };
  await saveApp(workspaceId, bound);
  return bound;
}

export async function listApps(workspaceId: string): Promise<AppManifest[]> {
  const entries = await listSvcRecords<AppManifest>(workspaceId, APPS_SCOPE);
  // Re-resolve through readApp so legacy folder-shaped manifests rebind.
  const manifests = await Promise.all(entries.map((entry) => readApp(workspaceId, entry.key)));
  return manifests.filter((m): m is AppManifest => Boolean(m));
}

export interface RemoveAppOptions {
  /** Also delete the app's primary prefix (UI, data partitions, everything). */
  purgeData?: boolean;
}

export async function removeApp(
  workspaceId: string,
  name: string,
  options: RemoveAppOptions = {},
): Promise<boolean> {
  const manifest = await readApp(workspaceId, name);
  const removed = await deleteSvcRecord(workspaceId, APPS_SCOPE, name);
  hiddenPrefixCache.delete(workspaceId);
  // Only the primary prefix is purged: secondary prefixes are shared library
  // paths this app doesn't own.
  if (options.purgeData && manifest) {
    await getFsStore().removePrefix(workspaceId, appRoot(manifest));
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
 * its own turf (read and write); everything else must be shared explicitly
 * in `.services/workspace.json`.
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
