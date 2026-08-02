/**
 * Mounting the workspace into a sandbox, and getting the changes back.
 *
 * The whole algorithm is two `{path → sha256}` manifests and a set
 * difference, and it is cheap for the same reason the VCS layer was cheap:
 * both sides already content-address. `vfs.list` returns per-file hashes
 * without reading a body, and the sandbox driver's `listFiles` does too — so
 * finding what changed in a 4,000-file checkout costs two listings and zero
 * file reads. Only the bodies that actually differ ever cross the wire.
 *
 *   materialize   workspace listing → base manifest → write bodies in
 *   manifest      driver listing    → live manifest
 *   diff          base ⊖ live       → added / modified / removed
 *   commit        read changed bodies → route each path to its destination
 *
 * Commit routing is the part worth stating plainly, because it is the whole
 * point of the feature (docs/sandboxes.md):
 *
 *   | mount                             | destination                    |
 *   | --------------------------------- | ------------------------------ |
 *   | tracked, staged session           | the session's overlay          |
 *   | tracked, under an external mount  | write-through to that mount    |
 *   | tracked, native                   | the FS store, then a commit    |
 *   | untracked (`source: null`)        | nowhere — scratch space        |
 *
 * One routing table over the mount list, not two code paths through the
 * service.
 */

import { getFsStore } from "../fs-store.js";
import { assertPathGranted, type CapabilityGrants } from "../grants.js";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { sessionDelete, sessionWrite, type ChatSessionRecord } from "../vcs/chat-sessions.js";
import { mountDelete, mountFor, mountWrite, readMounts } from "../vcs/mounts.js";
import { visibleEntries } from "../vcs/store.js";
import type { RepoMountRef, SandboxMount, SandboxRecord } from "./store.js";

/** One dispatch into the bound sandbox driver. */
export type SandboxCall = (op: string, args: Record<string, unknown>) => Promise<unknown>;

/** Bodies larger than this are not carried in or out of a sandbox. */
const MAX_FILE_BYTES = 2_000_000;

/** Guard against materializing a whole workspace into a box by accident. */
const MAX_MOUNT_FILES = 5_000;

interface DriverFileEntry {
  path: string;
  hash: string;
  size: number;
}

export interface MountDiff {
  added: string[];
  modified: string[];
  removed: string[];
}

export const EMPTY_DIFF: MountDiff = { added: [], modified: [], removed: [] };

export function diffTotal(diff: MountDiff): number {
  return diff.added.length + diff.modified.length + diff.removed.length;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const MOUNT_PATH_RE = /^[\w][\w.-]*(\/[\w][\w.-]*)*$/u;

/**
 * Normalize a driver-reported path to mount-relative. Hosts disagree about
 * whether a listing echoes the requested prefix, an absolute path, or a bare
 * relative one, so accept all three rather than making every provider
 * normalize identically.
 */
export function mountRelative(mount: SandboxMount, workdir: string, raw: string): string | null {
  let path = raw.replace(/\\/gu, "/");
  const absolutePrefix = `${workdir.replace(/\/+$/u, "")}/`;
  if (path.startsWith(absolutePrefix)) path = path.slice(absolutePrefix.length);
  path = path.replace(/^\.\//u, "").replace(/^\/+/u, "");
  if (path === mount.path) return null;
  if (path.startsWith(`${mount.path}/`)) path = path.slice(mount.path.length + 1);
  if (!path || path.split("/").some((segment) => segment === "." || segment === "..")) {
    return null;
  }
  return path;
}

/** `<mount.path>/<rel>` — where the file lives inside the sandbox. */
export const sandboxPathFor = (mount: SandboxMount, rel: string): string =>
  `${mount.path}/${rel}`;

/** `<mount.source>/<rel>` — where the file lives in the workspace. */
export function workspacePathFor(mount: SandboxMount, rel: string): string {
  if (!mount.source) {
    throw new ServiceError(`Mount ${mount.path} is scratch space and has no workspace path`, 400);
  }
  return `${mount.source}/${rel}`;
}

// ---------------------------------------------------------------------------
// Declaring mounts
// ---------------------------------------------------------------------------

/** `github:owner/repo`, `github:owner/repo#ref`, `github:owner/repo#ref/sub/path`. */
const REPO_SOURCE_RE = /^github:([\w.-]+\/[\w.-]+)(?:#([^/\s]+)(?:\/(.+))?)?$/u;

/** Is this mount source a repo reference rather than a workspace prefix? */
export function isRepoSource(source: string): boolean {
  return source.startsWith("github:");
}

/**
 * Parse a `github:` mount source. The segment right after `#` is the ref and
 * everything after its first `/` is a subdirectory — which means a ref that
 * itself contains slashes (`feature/x`) cannot ride the shorthand; such refs
 * are rare enough that keeping the syntax unambiguous wins.
 */
export function parseRepoSource(source: string): RepoMountRef {
  const match = REPO_SOURCE_RE.exec(source);
  if (!match) {
    throw new ServiceError(
      `Invalid repo mount source: ${JSON.stringify(source)} — expected "github:owner/repo", ` +
        '"github:owner/repo#ref", or "github:owner/repo#ref/sub/path"',
      400,
    );
  }
  const [, repo, ref, path] = match;
  if (path && (path.includes("..") || path.startsWith("/"))) {
    throw new ServiceError(`Invalid repo mount path: ${path}`, 400);
  }
  return {
    provider: "github",
    repo: repo!,
    ...(ref ? { ref } : {}),
    ...(path ? { path: path.replace(/\/+$/u, "") } : {}),
  };
}

/**
 * Validate a caller's mount declarations.
 *
 * Mounting is checked against the caller's *path* grants, not a new
 * permission axis: an agent with `{prefix: "docs/", access: "rw"}` cannot
 * mount `apps/`, and a `ro` grant cannot produce an `rw` mount. That reuse is
 * deliberate — a sandbox is a place the caller's reach is exercised, never a
 * place it is widened.
 */
export function parseMounts(raw: unknown, grants: CapabilityGrants | undefined): SandboxMount[] {
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw)) {
    throw new ServiceError("mounts must be an array of { path, source?, mode? }", 400);
  }
  const now = new Date().toISOString();
  const mounts: SandboxMount[] = [];
  for (const entry of raw as Array<Record<string, unknown>>) {
    if (!entry || typeof entry !== "object") {
      throw new ServiceError("each mount must be { path, source?, mode? }", 400);
    }
    const path = typeof entry["path"] === "string" ? entry["path"].replace(/^\/+|\/+$/gu, "") : "";
    if (!MOUNT_PATH_RE.test(path)) {
      throw new ServiceError(
        `mount.path must be a relative directory name (got ${JSON.stringify(entry["path"])})`,
        400,
      );
    }
    const rawSource = entry["source"];
    const trimmed = typeof rawSource === "string" ? rawSource.trim() : "";
    const mode = entry["mode"] === "ro" ? "ro" : "rw";
    if (mounts.some((existing) => existing.path === path)) {
      throw new ServiceError(`Duplicate mount path: ${path}`, 400);
    }

    // A repo source is external content, not workspace reach: path grants
    // bound the workspace VFS and say nothing about repositories, so the
    // boundary here is the workspace's own GitHub credential (or a public
    // repo). Repo mounts are never tracked — their changes leave through git
    // (branch, commit, push), not through a workspace commit.
    if (trimmed && isRepoSource(trimmed)) {
      const repo = parseRepoSource(trimmed);
      mounts.push({
        path,
        source: trimmed,
        kind: "repo",
        repo,
        mode,
        track: false,
        base: {},
        syncedAt: now,
      });
      continue;
    }

    const source = trimmed ? trimmed.replace(/^\/+|\/+$/gu, "") : null;
    if (source && (source.includes("..") || source.startsWith(".services"))) {
      throw new ServiceError(`Invalid mount source: ${source}`, 400);
    }
    if (source) {
      // Read access is required to materialize; write access is required to
      // ever commit back. Check both up front so a sandbox cannot be created
      // that is guaranteed to fail at commit time.
      assertPathGranted(grants, source, false);
      if (mode === "rw") assertPathGranted(grants, source, true);
    }
    mounts.push({
      path,
      source,
      kind: "vfs",
      mode,
      // A scratch mount is untracked by construction; a sourced read-only
      // mount is materialized but never committed back.
      track: source !== null && mode === "rw",
      base: {},
      syncedAt: now,
    });
  }
  return mounts;
}

// ---------------------------------------------------------------------------
// Manifests
// ---------------------------------------------------------------------------

/** `{rel → hash}` for a mount's workspace source, right now. */
export async function workspaceManifest(
  workspaceId: string,
  mount: SandboxMount,
): Promise<Record<string, string>> {
  if (!mount.source) return {};
  const entries = await visibleEntries(workspaceId, mount.source);
  const manifest: Record<string, string> = {};
  for (const entry of entries) {
    const rel =
      entry.path === mount.source ? "" : entry.path.slice(mount.source.length + 1);
    if (rel) manifest[rel] = entry.hash;
  }
  return manifest;
}

/** `{rel → hash}` for a mount as it currently stands inside the sandbox. */
export async function sandboxManifest(
  record: SandboxRecord,
  mount: SandboxMount,
  call: SandboxCall,
  timeoutMs?: number,
): Promise<Record<string, string>> {
  const entries = (await call("listFiles", {
    id: record.externalId,
    path: mount.path,
    ...(timeoutMs ? { timeoutMs } : {}),
  })) as DriverFileEntry[] | undefined;
  const manifest: Record<string, string> = {};
  for (const entry of entries ?? []) {
    if (!entry || typeof entry.path !== "string") continue;
    const rel = mountRelative(mount, record.workdir, entry.path);
    if (rel) manifest[rel] = String(entry.hash ?? "");
  }
  return manifest;
}

export function diffManifests(
  base: Record<string, string>,
  live: Record<string, string>,
): MountDiff {
  const added: string[] = [];
  const modified: string[] = [];
  const removed: string[] = [];
  for (const [path, hash] of Object.entries(live)) {
    const before = base[path];
    if (before === undefined) added.push(path);
    else if (before !== hash) modified.push(path);
  }
  for (const path of Object.keys(base)) {
    if (live[path] === undefined) removed.push(path);
  }
  return { added: added.sort(), modified: modified.sort(), removed: removed.sort() };
}

// ---------------------------------------------------------------------------
// Workspace → sandbox
// ---------------------------------------------------------------------------

/**
 * Write a mount's workspace content into the sandbox and record what was
 * handed over. The resulting `base` is the other side of every later diff, so
 * it is written from the same listing that produced the bodies — not
 * re-derived afterwards, which would silently absorb a concurrent edit.
 */
/** Is this a repo-backed mount? (Absent `kind` means a pre-field vfs mount.) */
export const isRepoMount = (mount: SandboxMount): boolean => mount.kind === "repo";

export async function materializeMount(
  ctx: ServiceContext,
  record: SandboxRecord,
  mount: SandboxMount,
  call: SandboxCall,
): Promise<{ files: number; bytes: number }> {
  if (isRepoMount(mount)) {
    // Routed in the service (repo-mounts.ts); reaching here is a wiring bug.
    throw new ServiceError(`Mount ${mount.path} is repo-backed — not a workspace mount`, 500);
  }
  if (!mount.source) {
    mount.base = {};
    mount.syncedAt = new Date().toISOString();
    return { files: 0, bytes: 0 };
  }
  const store = getFsStore();
  const manifest = await workspaceManifest(ctx.workspaceId, mount);
  const paths = Object.keys(manifest);
  if (paths.length > MAX_MOUNT_FILES) {
    throw new ServiceError(
      `${mount.source} has ${paths.length} files — a sandbox mount is capped at ${MAX_MOUNT_FILES}. Mount a narrower prefix.`,
      400,
    );
  }

  const base: Record<string, string> = {};
  let bytes = 0;
  for (const rel of paths) {
    const workspacePath = workspacePathFor(mount, rel);
    const file = await store.read(ctx.workspaceId, workspacePath).catch(() => undefined);
    if (!file) continue;
    if (file.size > MAX_FILE_BYTES) {
      throw new ServiceError(
        `${workspacePath} is ${file.size} bytes — over the ${MAX_FILE_BYTES}-byte sandbox file limit`,
        413,
      );
    }
    await call("writeFile", {
      id: record.externalId,
      path: sandboxPathFor(mount, rel),
      content: file.content,
    });
    base[rel] = file.hash;
    bytes += file.size;
  }
  mount.base = base;
  mount.syncedAt = new Date().toISOString();
  return { files: Object.keys(base).length, bytes };
}

// ---------------------------------------------------------------------------
// Sandbox → workspace
// ---------------------------------------------------------------------------

export interface MountCommitResult {
  mount: string;
  source: string | null;
  written: string[];
  removed: string[];
  /** Paths the workspace also changed since the sandbox was given its copy. */
  conflicts: string[];
  skipped: string[];
}

export interface CommitTarget {
  /** Staged session receiving the writes, when the sandbox is bound to one. */
  session?: ChatSessionRecord;
}

/**
 * Route one mount's changes into the workspace.
 *
 * A path the *workspace* also changed since materialization is reported as a
 * conflict and left alone rather than clobbered — the same base/theirs/ours
 * comparison sessions already make, at the same path granularity, so the
 * existing conflict vocabulary and notification widget apply unchanged.
 */
export async function commitMount(
  ctx: ServiceContext,
  record: SandboxRecord,
  mount: SandboxMount,
  call: SandboxCall,
  target: CommitTarget,
): Promise<MountCommitResult> {
  const result: MountCommitResult = {
    mount: mount.path,
    source: mount.source,
    written: [],
    removed: [],
    conflicts: [],
    skipped: [],
  };
  if (!mount.track || !mount.source) return result;

  const live = await sandboxManifest(record, mount, call);
  const diff = diffManifests(mount.base, live);
  if (diffTotal(diff) === 0) return result;

  // What the workspace looks like now — the third leg of the comparison.
  const current = await workspaceManifest(ctx.workspaceId, mount);
  const externalMounts = await readMounts(ctx.workspaceId).catch(() => []);
  const store = getFsStore();

  const movedInWorkspace = (rel: string): boolean => {
    const wasGiven = mount.base[rel];
    const isNow = current[rel];
    return (wasGiven ?? null) !== (isNow ?? null);
  };

  for (const rel of [...diff.added, ...diff.modified]) {
    const workspacePath = workspacePathFor(mount, rel);
    assertPathGranted(ctx.grants, workspacePath, true);
    if (movedInWorkspace(rel) && current[rel] !== live[rel]) {
      result.conflicts.push(workspacePath);
      continue;
    }
    const file = (await call("readFile", {
      id: record.externalId,
      path: sandboxPathFor(mount, rel),
    })) as { content?: string; encoding?: string } | undefined;
    if (!file || typeof file.content !== "string" || file.encoding === "base64") {
      // Binary bodies would have to round-trip through base64 in the FS
      // store, which stores text. Report rather than corrupt.
      result.skipped.push(workspacePath);
      continue;
    }
    if (file.content.length > MAX_FILE_BYTES) {
      result.skipped.push(workspacePath);
      continue;
    }
    if (target.session) {
      await sessionWrite(ctx.workspaceId, target.session, workspacePath, file.content);
    } else if (mountFor(externalMounts, workspacePath)) {
      await mountWrite(ctx.workspaceId, workspacePath, file.content);
    } else {
      await store.write(ctx.workspaceId, workspacePath, file.content);
    }
    result.written.push(workspacePath);
  }

  for (const rel of diff.removed) {
    const workspacePath = workspacePathFor(mount, rel);
    assertPathGranted(ctx.grants, workspacePath, true);
    if (movedInWorkspace(rel)) {
      result.conflicts.push(workspacePath);
      continue;
    }
    if (target.session) {
      await sessionDelete(ctx.workspaceId, target.session, workspacePath).catch(() => []);
    } else if (mountFor(externalMounts, workspacePath)) {
      await mountDelete(ctx.workspaceId, workspacePath);
    } else {
      await store.remove(ctx.workspaceId, workspacePath);
    }
    result.removed.push(workspacePath);
  }

  // The sandbox's live state is the new base for everything that landed;
  // conflicted and skipped paths keep their old base so the next commit
  // still sees them as changed.
  const settled = new Set([...result.written, ...result.removed]);
  const nextBase = { ...mount.base };
  for (const rel of Object.keys(live)) {
    if (settled.has(workspacePathFor(mount, rel))) nextBase[rel] = live[rel]!;
  }
  for (const rel of diff.removed) {
    if (settled.has(workspacePathFor(mount, rel))) delete nextBase[rel];
  }
  mount.base = nextBase;
  mount.syncedAt = new Date().toISOString();
  return result;
}
