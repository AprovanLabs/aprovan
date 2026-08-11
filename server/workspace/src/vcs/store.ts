/**
 * VCS over the workspace FS — the Git-shaped layer described in
 * docs/vcs-and-sessions.md.
 *
 * The FS already content-addresses every write (`(path, sha256)` version
 * rows, shared blobs), so this module only adds the cheap parts, stored as
 * records (accumulated state — specs/record-store; tech-plan D3):
 *
 *   snapshot  svc#vcs#snapshots / <id>   {path → hash} manifest, scoped to
 *                                        an optional subtree `prefix`
 *   commit    svc#vcs#commits   / <id>   snapshot + parents + message
 *   ref       svc#vcs#refs      / <name> named pointer (main, session/<id>,
 *                                        app/<id>, …) — any ref matching
 *                                        `REF_RE` may be committed to and
 *                                        advanced independently
 *
 * Identities are sha256 of canonical forms, so snapshots and commits are
 * idempotent to re-write. Snapshot identity incorporates the scope prefix
 * (non-empty prefixes only — see `snapshotId`), so identical subtree content
 * under different scopes never collides on one snapshot record. Large
 * snapshot manifests ride the record store's existing >350KB S3 spill.
 * Snapshots always exclude `.services/**` and the hidden app-data
 * partitions — what a member can see is what gets versioned, regardless of
 * scope.
 *
 * Ref advances are read-modify-write without CAS: workspaces are effectively
 * single-writer today, and the worst case is a lost auto-snapshot pointer,
 * never lost content (every version row survives). A commit to a ref with no
 * existing record becomes a root commit (`parents: []`) rather than
 * implicitly inheriting another ref's history — seeding a new ref from an
 * existing commit is the caller's job.
 *
 * Known v1 limitation: `remove()` on the FS deletes all version rows for a
 * path, so a hard delete makes that path's older snapshot entries listable
 * but not readable. Restores and reads of live paths are unaffected.
 */

import { createHash } from "node:crypto";
import { hiddenDataPrefixes, isHiddenDataPath } from "../apps/store.js";
import { getFsStore, isServicePath, listAll, type FsEntry } from "../fs-store.js";
import {
  collectMountLineage,
  type MountLineageEntry,
  type MountProvenance,
} from "./mounts.js";
import { ServiceError } from "../service-kernel.js";
import {
  listSvcKeys,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

const SNAPSHOTS_SCOPE = svcScope("vcs", "snapshots");
const COMMITS_SCOPE = svcScope("vcs", "commits");
const REFS_SCOPE = svcScope("vcs", "refs");

export const MAIN_REF = "main";

/** Ref names: `main`, `session/<id>`, or other simple segmented names. */
const REF_RE = /^[a-z][a-z0-9-]*(\/[A-Za-z0-9_-]+)*$/u;

export interface SnapshotEntry {
  path: string;
  hash: string;
  mimeType: string;
  size: number;
}

export interface VcsSnapshot {
  id: string;
  /** Subtree this snapshot covers ("" = whole visible workspace). */
  prefix: string;
  entries: SnapshotEntry[];
  /**
   * Mount lineage at snapshot time (specs/mount-lineage) — deterministic
   * (no timestamps), sorted by prefix, and part of the canonical snapshot
   * identity: two snapshots with identical native entries but different
   * mount tokens are different snapshots. Absent on pre-lineage snapshots
   * and on workspaces without mounts (wire format is additive).
   */
  mounts?: MountLineageEntry[];
}

export interface CommitStats {
  added: number;
  modified: number;
  removed: number;
}

export interface VcsCommit {
  id: string;
  snapshot: string;
  prefix: string;
  parents: string[];
  message: string;
  author: string;
  /** Chat session this commit came from (merge commits carry it). */
  sessionId?: string;
  createdAt: string;
  /** Change counts vs the first parent (all-added for root commits). */
  stats: CommitStats;
  /**
   * Per-mount provenance records captured when this commit was created
   * (specs/mount-lineage): source locator, fetch origin, and the timestamped
   * `retrievedAt` — the half of lineage that may NOT live in the snapshot
   * (timestamps would break snapshot dedupe). Absent on pre-lineage commits.
   */
  provenance?: MountProvenance[];
}

export interface VcsRef {
  name: string;
  commit: string;
  updatedAt: string;
  updatedBy: string;
}

export interface VcsDiff {
  added: Array<{ path: string; hash: string }>;
  modified: Array<{ path: string; from: string; to: string }>;
  removed: Array<{ path: string; hash: string }>;
}

export function refName(value: unknown, fallback = MAIN_REF): string {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string" || !REF_RE.test(value)) {
    throw new ServiceError(`ref must match ${REF_RE}`, 400);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Snapshots
// ---------------------------------------------------------------------------

/**
 * The current visible tree: latest version of every file a member can see
 * (no `.services/**`, no app/personal data partitions).
 */
export async function visibleEntries(
  workspaceId: string,
  prefix = "",
): Promise<FsEntry[]> {
  const entries = await listAll(getFsStore(), workspaceId, prefix);
  const hidden = await hiddenDataPrefixes(workspaceId);
  return entries.filter(
    (entry) => !isServicePath(entry.path) && !isHiddenDataPath(entry.path, hidden),
  );
}

/**
 * Identity: sha256 over the sorted `<hash> <path>` lines, plus one
 * `mount <configHash> <token> <prefix>` line per mount lineage entry, plus a
 * final `prefix <prefix>` line iff the scope prefix is non-empty —
 * deterministic content only, so a moved mount changes snapshot identity
 * (specs/mount-lineage "Upstream movement changes snapshot identity"), a
 * scoped commit never collides with a whole-workspace or differently-scoped
 * one covering identical content (tech-plan D1), and a mountless,
 * unscoped snapshot hashes exactly as before this change.
 */
function snapshotId(
  entries: SnapshotEntry[],
  mounts?: MountLineageEntry[],
  prefix = "",
): string {
  const lines = entries.map((entry) => `${entry.hash} ${entry.path}`);
  for (const mount of mounts ?? []) {
    lines.push(`mount ${mount.configHash} ${mount.versionToken ?? "-"} ${mount.prefix}`);
  }
  if (prefix !== "") lines.push(`prefix ${prefix}`);
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}

export function buildSnapshot(
  entries: FsEntry[],
  prefix = "",
  mounts?: MountLineageEntry[],
): VcsSnapshot {
  const sorted = [...entries]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(({ path, hash, mimeType, size }) => ({ path, hash, mimeType, size }));
  const sortedMounts = mounts?.length
    ? [...mounts].sort((a, b) => a.prefix.localeCompare(b.prefix))
    : undefined;
  return {
    id: snapshotId(sorted, sortedMounts, prefix),
    prefix,
    entries: sorted,
    ...(sortedMounts ? { mounts: sortedMounts } : {}),
  };
}

/**
 * Persist a snapshot. Content-identified (`id` is a hash of the entries), so
 * re-saving an identical tree overwrites the same record idempotently.
 */
export async function saveSnapshot(
  workspaceId: string,
  snapshot: VcsSnapshot,
): Promise<void> {
  await writeSvcRecord(workspaceId, SNAPSHOTS_SCOPE, snapshot.id, snapshot);
}

export async function readSnapshot(
  workspaceId: string,
  id: string,
): Promise<VcsSnapshot | undefined> {
  return readSvcRecord<VcsSnapshot>(workspaceId, SNAPSHOTS_SCOPE, id);
}

export function diffSnapshots(
  from: VcsSnapshot | undefined,
  to: VcsSnapshot,
): VcsDiff {
  const before = new Map((from?.entries ?? []).map((entry) => [entry.path, entry.hash]));
  const added: VcsDiff["added"] = [];
  const modified: VcsDiff["modified"] = [];
  const removed: VcsDiff["removed"] = [];
  const seen = new Set<string>();
  for (const entry of to.entries) {
    seen.add(entry.path);
    const prior = before.get(entry.path);
    if (prior === undefined) added.push({ path: entry.path, hash: entry.hash });
    else if (prior !== entry.hash) modified.push({ path: entry.path, from: prior, to: entry.hash });
  }
  for (const [path, hash] of before) {
    if (!seen.has(path)) removed.push({ path, hash });
  }
  return { added, modified, removed };
}

// ---------------------------------------------------------------------------
// Commits
// ---------------------------------------------------------------------------

export async function readCommit(
  workspaceId: string,
  id: string,
): Promise<VcsCommit | undefined> {
  if (!id) return undefined;
  return readSvcRecord<VcsCommit>(workspaceId, COMMITS_SCOPE, id);
}

async function writeCommit(workspaceId: string, commit: VcsCommit): Promise<void> {
  await writeSvcRecord(workspaceId, COMMITS_SCOPE, commit.id, commit, commit.author);
}

/**
 * Create + persist a commit for an already-saved snapshot. Stats are
 * computed against the first parent's snapshot.
 */
export async function createCommit(
  workspaceId: string,
  options: {
    snapshot: VcsSnapshot;
    parents: string[];
    message: string;
    author: string;
    sessionId?: string;
    /** Mount provenance captured alongside the snapshot's lineage entries. */
    provenance?: MountProvenance[];
  },
): Promise<VcsCommit> {
  const parentCommit = options.parents[0]
    ? await readCommit(workspaceId, options.parents[0])
    : undefined;
  const parentSnapshot = parentCommit
    ? await readSnapshot(workspaceId, parentCommit.snapshot)
    : undefined;
  const diff = diffSnapshots(parentSnapshot, options.snapshot);

  const body = {
    snapshot: options.snapshot.id,
    prefix: options.snapshot.prefix,
    parents: options.parents,
    message: options.message,
    author: options.author,
    ...(options.sessionId ? { sessionId: options.sessionId } : {}),
    createdAt: new Date().toISOString(),
    stats: {
      added: diff.added.length,
      modified: diff.modified.length,
      removed: diff.removed.length,
    },
    ...(options.provenance?.length ? { provenance: options.provenance } : {}),
  };
  const id = createHash("sha256").update(JSON.stringify(body)).digest("hex");
  const commit: VcsCommit = { id, ...body };
  await writeCommit(workspaceId, commit);
  return commit;
}

/** Walk first parents from a commit, newest first. */
export async function logCommits(
  workspaceId: string,
  fromCommitId: string,
  limit = 50,
): Promise<VcsCommit[]> {
  const commits: VcsCommit[] = [];
  let cursor: string | undefined = fromCommitId;
  while (cursor && commits.length < limit) {
    const commit: VcsCommit | undefined = await readCommit(workspaceId, cursor);
    if (!commit) break;
    commits.push(commit);
    cursor = commit.parents[0];
  }
  return commits;
}

// ---------------------------------------------------------------------------
// Refs
// ---------------------------------------------------------------------------

export async function readRef(
  workspaceId: string,
  name: string,
): Promise<VcsRef | undefined> {
  return readSvcRecord<VcsRef>(workspaceId, REFS_SCOPE, name);
}

export async function writeRef(
  workspaceId: string,
  name: string,
  commit: string,
  updatedBy: string,
): Promise<VcsRef> {
  const ref: VcsRef = { name, commit, updatedAt: new Date().toISOString(), updatedBy };
  await writeSvcRecord(workspaceId, REFS_SCOPE, name, ref, updatedBy);
  return ref;
}

/**
 * List refs, optionally restricted to names that equal `prefix` or start with
 * `prefix/` (tech-plan D1 — tag/channel discovery).
 */
export async function listRefs(workspaceId: string, prefix?: string): Promise<VcsRef[]> {
  const entries = await listSvcRecords<VcsRef>(workspaceId, REFS_SCOPE);
  const refs = entries.map((entry) => entry.value);
  const filtered =
    prefix === undefined || prefix === ""
      ? refs
      : refs.filter((ref) => ref.name === prefix || ref.name.startsWith(`${prefix}/`));
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

/** Immutable tag ref: `tag/app/<appId>/<releaseId>` (tech-plan D1). */
export async function writeTag(
  workspaceId: string,
  name: string,
  commit: string,
  updatedBy = "system",
): Promise<VcsRef> {
  const refKey = refName(name);
  if (!refKey.startsWith("tag/")) {
    throw new ServiceError(`tag ref must start with tag/: ${name}`, 400);
  }
  const existing = await readRef(workspaceId, refKey);
  if (existing) {
    throw new ServiceError(`tag already exists: ${refKey}`, 409);
  }
  return writeRef(workspaceId, refKey, commit, updatedBy);
}

/** Movable channel ref: `channel/app/<appId>/<channel>` (tech-plan D1). */
export async function moveChannel(
  workspaceId: string,
  name: string,
  commit: string,
  updatedBy = "system",
): Promise<VcsRef> {
  const refKey = refName(name);
  if (!refKey.startsWith("channel/")) {
    throw new ServiceError(`channel ref must start with channel/: ${name}`, 400);
  }
  return writeRef(workspaceId, refKey, commit, updatedBy);
}

/** Canonical tag ref name for an app release. */
export function tagRefName(appId: string, releaseId: string): string {
  return `tag/app/${appId}/${releaseId}`;
}

/** Canonical channel ref name for an app channel. */
export function channelRefName(appId: string, channel: string): string {
  return `channel/app/${appId}/${channel}`;
}

/** App-scope commit ref. */
export function appRefName(appId: string): string {
  return `app/${appId}`;
}

function pathUnderPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`);
}

/** Keep only mount lineage/provenance whose mount prefix falls under `scope`. */
export function filterLineageToPrefix(
  lineage: { entries: MountLineageEntry[]; provenance: MountProvenance[] },
  scope: string,
): { entries: MountLineageEntry[]; provenance: MountProvenance[] } {
  if (!scope) return lineage;
  return {
    entries: lineage.entries.filter((entry) => pathUnderPrefix(entry.prefix, scope)),
    provenance: lineage.provenance.filter((entry) => pathUnderPrefix(entry.prefix, scope)),
  };
}

/** A commit id (full or unambiguous prefix ≥ 8 chars) or a ref name. */
export async function resolveCommitish(
  workspaceId: string,
  value: string,
): Promise<VcsCommit> {
  const direct = await readCommit(workspaceId, value);
  if (direct) return direct;
  if (REF_RE.test(value)) {
    const ref = await readRef(workspaceId, value);
    if (ref) {
      const head = await readCommit(workspaceId, ref.commit);
      if (head) return head;
    }
  }
  if (/^[0-9a-f]{8,63}$/u.test(value)) {
    const matches = await listSvcKeys(workspaceId, COMMITS_SCOPE, value);
    if (matches.length === 1) {
      const commit = await readCommit(workspaceId, matches[0]!);
      if (commit) return commit;
    }
    if (matches.length > 1) {
      throw new ServiceError(`Ambiguous commit prefix: ${value}`, 400);
    }
  }
  throw new ServiceError(`Unknown commit or ref: ${value}`, 404);
}

// ---------------------------------------------------------------------------
// High-level operations
// ---------------------------------------------------------------------------

/**
 * Snapshot the visible tree at `prefix` (default: whole workspace) and
 * advance `ref` (default: `main`) — unless the ref's head already matches,
 * in which case the existing head comes back untouched. Used both by
 * explicit `vfs.commit` and as the auto-snapshot a session takes at
 * creation, so a session's base is always exactly what the user was looking
 * at. A ref with no existing record starts a root commit (`parents: []`)
 * rather than implicitly inheriting another ref's history.
 */
export async function commitTree(
  workspaceId: string,
  options: {
    message: string;
    author: string;
    sessionId?: string;
    /** Subtree scope; "" (default) = whole visible workspace. */
    prefix?: string;
    /** Ref to read and advance; defaults to "main". Validated via refName(). */
    ref?: string;
    /**
     * Parent override (tech-plan D2). Default remains `[head]` (or `[]` for a
     * new ref). Used by session merge commits: `[mainHead, sessionHead]`.
     */
    parents?: string[];
  },
): Promise<{ commit: VcsCommit; created: boolean }> {
  const prefix = options.prefix ?? "";
  const refKey = refName(options.ref);
  // Mount lineage rides every snapshot: tokens go INTO the snapshot (and
  // its identity — the unchanged-head comparison below therefore covers
  // "native entries AND mount tokens" for free), provenance onto the commit.
  // App-scoped commits keep only mounts under the commit prefix (spec
  // "Foreign mounts excluded"); workspace commits keep full lineage.
  const rawLineage = await collectMountLineage(workspaceId);
  const lineage = filterLineageToPrefix(rawLineage, prefix);
  const snapshot = buildSnapshot(await visibleEntries(workspaceId, prefix), prefix, lineage.entries);
  const ref = await readRef(workspaceId, refKey);
  const head = ref ? await readCommit(workspaceId, ref.commit) : undefined;
  const parents =
    options.parents !== undefined ? options.parents : head ? [head.id] : [];
  // Short-circuit only when the tree is unchanged *and* parents would match
  // the existing head — a parents override (merge commit) must always create.
  if (
    head &&
    head.snapshot === snapshot.id &&
    options.parents === undefined
  ) {
    return { commit: head, created: false };
  }
  await saveSnapshot(workspaceId, snapshot);
  const commit = await createCommit(workspaceId, {
    snapshot,
    parents,
    message: options.message,
    author: options.author,
    sessionId: options.sessionId,
    provenance: lineage.provenance,
  });
  await writeRef(workspaceId, refKey, commit.id, options.author);
  return { commit, created: true };
}

/**
 * Non-destructive restore: re-write the snapshot's content as the new
 * latest for every entry under `path`/`prefix` (or the whole snapshot).
 * Files that exist now but not in the snapshot are left alone.
 */
export async function restoreCommit(
  workspaceId: string,
  commit: VcsCommit,
  filter?: { path?: string; prefix?: string },
): Promise<{ restored: string[]; missing: string[] }> {
  const snapshot = await readSnapshot(workspaceId, commit.snapshot);
  if (!snapshot) throw new ServiceError(`Snapshot missing for commit ${commit.id}`, 404);
  const store = getFsStore();
  const within = (path: string): boolean => {
    if (filter?.path) return path === filter.path;
    if (filter?.prefix) {
      return path === filter.prefix || path.startsWith(`${filter.prefix}/`);
    }
    return true;
  };
  const restored: string[] = [];
  const missing: string[] = [];
  for (const entry of snapshot.entries) {
    if (!within(entry.path)) continue;
    const current = await store.read(workspaceId, entry.path).catch(() => undefined);
    if (current && current.hash === entry.hash) continue; // Already this content.
    const pinned = await store.read(workspaceId, entry.path, entry.hash).catch(() => undefined);
    if (!pinned) {
      missing.push(entry.path); // Hard-deleted path — history gone (v1 limitation).
      continue;
    }
    await store.write(workspaceId, entry.path, pinned.content, pinned.mimeType);
    restored.push(entry.path);
  }
  return { restored, missing };
}
