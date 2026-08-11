/**
 * Chat sessions — the branch-shaped unit a chat client opens, closes, and
 * runs in parallel (docs/vcs-and-sessions.md).
 *
 * A session records a transcript plus a *file view*: a base commit (the
 * auto-snapshot of main taken at creation) and, in `staged` mode, an
 * overlay `{path → hash | null}` over that base. Overlay blobs live as
 * ordinary content-addressed FS versions under the session's shadow prefix,
 * so "stage to main" is a read-by-hash + write per touched path — no
 * content format of its own.
 *
 *   svc#chat#sessions / <id>                     session record
 *   svc#chat#session#<id> / <seq10>#<messageId>  one transcript message
 *   .services/chat/sessions/<id>/files/<path>    staged shadow content (FS,
 *                                                unversioned — it IS file
 *                                                content, hash-addressed)
 *
 * Transcripts are one record per message (specs/record-store, "Transcripts
 * append as per-message records"): appends write only the new/replaced rows,
 * never a full-transcript rewrite; reads reassemble by ordered key listing.
 *
 * `auto` mode sessions write straight through to the live tree (exactly the
 * pre-session behaviour); their base commit still answers "what changed
 * since this chat started".
 */

import { getFsStore, listAll, normalizeFsPath, type FsEntry, type FsFile } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  deleteSvcScope,
  listSvcKeys,
  listSvcRecords,
  parseSeqKey,
  readSvcRecord,
  seqKey,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import {
  buildSnapshot,
  commitTree,
  diffSnapshots,
  MAIN_REF,
  readCommit,
  readRef,
  readSnapshot,
  visibleEntries,
  type VcsCommit,
  type VcsSnapshot,
} from "./store.js";

/** Shadow content keeps its FS home — it is staged file content by nature. */
const SESSIONS_PREFIX = ".services/chat/sessions";

const SESSIONS_SCOPE = svcScope("chat", "sessions");

function messagesScope(id: string): string {
  return svcScope("chat", "session", id);
}

export type SessionMode = "auto" | "staged";
export type SessionStatus = "open" | "merged" | "closed";

export interface ChatSessionRecord {
  id: string;
  title: string;
  status: SessionStatus;
  mode: SessionMode;
  /** Base commit — what this session's file view is layered on. */
  base: string;
  /** Staged edits: path → shadow content hash, null = deleted. */
  overlay: Record<string, string | null>;
  /**
   * Paths an `auto` session wrote (or deleted) on the live tree — used by
   * `changeSummary` to filter `diff(base, main)` (tech-plan D4). Absent on
   * legacy records; changeSummary then falls back to the full diff.
   */
  touchedPaths?: string[];
  /** Opaque client layout state (open tabs, active path). */
  tabs?: unknown;
  messageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  /** The main-branch commit a merged session landed as. */
  mergeCommit?: string;
}

export interface SessionChangeSummary {
  added: string[];
  modified: string[];
  removed: string[];
  /**
   * True when an auto session had no touched-path set and the summary is the
   * full `diff(base, main)` (may include concurrent foreign edits).
   */
  includesOtherActivity?: boolean;
}

function shadowPath(id: string, path: string): string {
  return `${SESSIONS_PREFIX}/${id}/files/${path}`;
}

const SESSION_ID_RE = /^[0-9a-f-]{8,64}$/u;

export function sessionId(value: unknown): string {
  if (typeof value !== "string" || !SESSION_ID_RE.test(value)) {
    throw new ServiceError("id must be a session id", 400);
  }
  return value;
}

async function save(workspaceId: string, record: ChatSessionRecord): Promise<void> {
  await writeSvcRecord(workspaceId, SESSIONS_SCOPE, record.id, record, record.createdBy);
}

export async function readSession(
  workspaceId: string,
  id: string,
): Promise<ChatSessionRecord | undefined> {
  return readSvcRecord<ChatSessionRecord>(workspaceId, SESSIONS_SCOPE, id);
}

export async function requireSession(
  workspaceId: string,
  id: string,
): Promise<ChatSessionRecord> {
  const session = await readSession(workspaceId, id);
  if (!session) throw new ServiceError(`Unknown session: ${id}`, 404);
  return session;
}

export async function createSession(
  workspaceId: string,
  userId: string,
  options: { title?: string; mode?: SessionMode },
): Promise<ChatSessionRecord> {
  const mode: SessionMode = options.mode === "staged" ? "staged" : "auto";
  // The base is exactly what the user is looking at: reuse the main head if
  // it matches the current tree, append an auto-snapshot commit otherwise.
  const { commit } = await commitTree(workspaceId, {
    message: "Auto snapshot",
    author: userId,
  });
  const now = new Date().toISOString();
  const record: ChatSessionRecord = {
    id: crypto.randomUUID(),
    title: options.title?.trim() || "New chat",
    status: "open",
    mode,
    base: commit.id,
    overlay: {},
    ...(mode === "auto" ? { touchedPaths: [] } : {}),
    messageCount: 0,
    createdBy: userId,
    createdAt: now,
    updatedAt: now,
  };
  await save(workspaceId, record);
  return record;
}

export async function listSessions(
  workspaceId: string,
  status?: SessionStatus,
): Promise<ChatSessionRecord[]> {
  const entries = await listSvcRecords<ChatSessionRecord>(workspaceId, SESSIONS_SCOPE);
  return entries
    .map((entry) => entry.value)
    .filter((record) => !status || record.status === status)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function updateSession(
  workspaceId: string,
  id: string,
  patch: { title?: string; mode?: SessionMode; tabs?: unknown },
): Promise<ChatSessionRecord> {
  const session = await requireSession(workspaceId, id);
  if (patch.mode !== undefined && session.status !== "open") {
    throw new ServiceError("Only open sessions can change mode", 400);
  }
  if (patch.mode === "auto" && Object.keys(session.overlay).length > 0) {
    throw new ServiceError(
      "Session has staged changes — stage or discard them before switching to auto",
      400,
    );
  }
  const next: ChatSessionRecord = {
    ...session,
    ...(patch.title !== undefined ? { title: patch.title.trim() || session.title } : {}),
    ...(patch.mode !== undefined ? { mode: patch.mode } : {}),
    ...(patch.tabs !== undefined ? { tabs: patch.tabs } : {}),
    updatedAt: new Date().toISOString(),
  };
  await save(workspaceId, next);
  return next;
}

// ---------------------------------------------------------------------------
// Transcript
// ---------------------------------------------------------------------------

/**
 * Reassemble the transcript by ordered key listing: keys are
 * `<seq10>#<messageId>`, so lexical order is transcript order.
 */
export async function readMessages(workspaceId: string, id: string): Promise<unknown[]> {
  const entries = await listSvcRecords<unknown>(workspaceId, messagesScope(id));
  return entries.map((entry) => entry.value);
}

/**
 * Append transcript messages — one record per message, so the write cost is
 * O(messages appended), never a full-transcript rewrite. Messages carry
 * client ids (`useChat` message ids); an incoming id that already exists
 * replaces the stored message *at its original position* (its seq key), so
 * clients can re-send the tail of the transcript idempotently.
 */
export async function appendMessages(
  workspaceId: string,
  id: string,
  messages: unknown[],
): Promise<ChatSessionRecord> {
  const session = await requireSession(workspaceId, id);
  const scope = messagesScope(id);
  // One key listing (no content reads) recovers id → seq for the upsert.
  const keys = await listSvcKeys(workspaceId, scope);
  const keyById = new Map<string, string>();
  let nextSeq = 0;
  for (const key of keys) {
    const parsed = parseSeqKey(key);
    if (!parsed) continue;
    if (parsed.id) keyById.set(parsed.id, key);
    if (parsed.seq >= nextSeq) nextSeq = parsed.seq + 1;
  }
  let count = keys.length;
  for (const raw of messages) {
    const message = raw as { id?: string };
    const messageId =
      message && typeof message.id === "string" && message.id ? message.id : undefined;
    const existingKey = messageId ? keyById.get(messageId) : undefined;
    if (existingKey !== undefined) {
      // Idempotent re-send: replace in place, position preserved.
      await writeSvcRecord(workspaceId, scope, existingKey, message, session.createdBy);
      continue;
    }
    const key = seqKey(nextSeq, messageId ?? crypto.randomUUID());
    nextSeq += 1;
    count += 1;
    if (messageId) keyById.set(messageId, key);
    await writeSvcRecord(workspaceId, scope, key, message, session.createdBy);
  }
  const next: ChatSessionRecord = {
    ...session,
    messageCount: count,
    updatedAt: new Date().toISOString(),
  };
  await save(workspaceId, next);
  return next;
}

// ---------------------------------------------------------------------------
// The overlay — session-scoped FS resolution (staged mode)
// ---------------------------------------------------------------------------

async function baseSnapshot(
  workspaceId: string,
  session: ChatSessionRecord,
): Promise<VcsSnapshot> {
  const commit = await readCommit(workspaceId, session.base);
  const snapshot = commit ? await readSnapshot(workspaceId, commit.snapshot) : undefined;
  if (!snapshot) throw new ServiceError(`Base snapshot missing for session ${session.id}`, 500);
  return snapshot;
}

/** Overlay-over-base listing for a staged session. */
export async function sessionList(
  workspaceId: string,
  session: ChatSessionRecord,
  prefix = "",
): Promise<FsEntry[]> {
  if (session.mode !== "staged") {
    throw new ServiceError("Session listing applies to staged sessions", 400);
  }
  const snapshot = await baseSnapshot(workspaceId, session);
  const store = getFsStore();
  const inPrefix = (path: string): boolean =>
    !prefix || path === prefix || path.startsWith(`${prefix}/`);

  const shadowRoot = `${SESSIONS_PREFIX}/${session.id}/files`;
  const shadowEntries = await listAll(store, workspaceId, shadowRoot).catch(() => []);
  const shadowByPath = new Map(
    shadowEntries.map((entry) => [entry.path.slice(shadowRoot.length + 1), entry]),
  );

  const result: FsEntry[] = [];
  const seen = new Set<string>();
  for (const entry of snapshot.entries) {
    if (!inPrefix(entry.path)) continue;
    seen.add(entry.path);
    const staged = session.overlay[entry.path];
    if (staged === null) continue; // Deleted in this session.
    if (typeof staged === "string") {
      const shadow = shadowByPath.get(entry.path);
      result.push({
        path: entry.path,
        hash: staged,
        mimeType: shadow?.mimeType ?? entry.mimeType,
        size: shadow?.size ?? entry.size,
        updatedAt: shadow?.updatedAt ?? session.updatedAt,
      });
      continue;
    }
    result.push({ ...entry, updatedAt: session.createdAt });
  }
  for (const [path, staged] of Object.entries(session.overlay)) {
    if (staged === null || seen.has(path) || !inPrefix(path)) continue;
    const shadow = shadowByPath.get(path);
    result.push({
      path,
      hash: staged,
      mimeType: shadow?.mimeType ?? "text/plain",
      size: shadow?.size ?? 0,
      updatedAt: shadow?.updatedAt ?? session.updatedAt,
    });
  }
  return result.sort((a, b) => a.path.localeCompare(b.path));
}

/** Overlay-over-base read for a staged session. */
export async function sessionRead(
  workspaceId: string,
  session: ChatSessionRecord,
  path: string,
): Promise<FsFile | undefined> {
  const store = getFsStore();
  const staged = session.overlay[path];
  if (staged === null) return undefined;
  if (typeof staged === "string") {
    const file = await store.read(workspaceId, shadowPath(session.id, path), staged);
    return file ? { ...file, path } : undefined;
  }
  const snapshot = await baseSnapshot(workspaceId, session);
  const entry = snapshot.entries.find((candidate) => candidate.path === path);
  if (!entry) return undefined;
  return store.read(workspaceId, path, entry.hash);
}

/** Staged write: shadow blob + overlay pointer; the live tree is untouched. */
export async function sessionWrite(
  workspaceId: string,
  session: ChatSessionRecord,
  path: string,
  content: string,
  mimeType?: string,
): Promise<{ path: string; hash: string; mimeType: string; size: number; updatedAt: string }> {
  const file = await getFsStore().write(
    workspaceId,
    shadowPath(session.id, path),
    content,
    mimeType,
  );
  session.overlay[path] = file.hash;
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
  const { content: _content, ...meta } = file;
  return { ...meta, path };
}

/**
 * Record that an `auto` session touched a live-tree path (write or delete).
 * Callers on the FS/tool write path should invoke this after a successful
 * mutation when `?session=` names an open auto session (tech-plan D4).
 */
export async function recordSessionTouch(
  workspaceId: string,
  sessionId: string,
  path: string,
): Promise<void> {
  const session = await requireSession(workspaceId, sessionId);
  if (session.status !== "open" || session.mode !== "auto") return;
  const normalized = normalizeFsPath(path);
  if (!normalized) return;
  const touched = new Set(session.touchedPaths ?? []);
  if (touched.has(normalized)) return;
  touched.add(normalized);
  session.touchedPaths = [...touched].sort();
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
}

/** Staged delete: overlay tombstones for the path (or subtree). */
export async function sessionDelete(
  workspaceId: string,
  session: ChatSessionRecord,
  path: string,
  recursive = false,
): Promise<string[]> {
  const snapshot = await baseSnapshot(workspaceId, session);
  const targets = new Set<string>();
  const matches = (candidate: string): boolean =>
    candidate === path || (recursive && candidate.startsWith(`${path}/`));
  for (const entry of snapshot.entries) if (matches(entry.path)) targets.add(entry.path);
  for (const staged of Object.keys(session.overlay)) if (matches(staged)) targets.add(staged);
  const removed: string[] = [];
  for (const target of targets) {
    if (session.overlay[target] === null) continue;
    session.overlay[target] = null;
    removed.push(target);
  }
  if (removed.length === 0) throw new ServiceError(`Not found: ${path}`, 404);
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
  return removed.sort();
}

/**
 * Hard-delete a session: the record, the transcript, and any staged shadow
 * content — everything under `.services/chat/sessions/<id>`. Any status may
 * be deleted; unapplied staged changes die with it (the caller confirms).
 */
export async function deleteSession(workspaceId: string, id: string): Promise<void> {
  await requireSession(workspaceId, id);
  // Message records, staged shadow content, then the session record itself.
  await deleteSvcScope(workspaceId, messagesScope(id));
  await getFsStore().removePrefix(workspaceId, `${SESSIONS_PREFIX}/${id}`);
  await deleteSvcRecord(workspaceId, SESSIONS_SCOPE, id);
}

/**
 * Drop overlay entries — the "keep the workspace version" conflict
 * resolution: the draft simply stops claiming those paths, so a later apply
 * leaves them exactly as the workspace has them.
 */
export async function discardChanges(
  workspaceId: string,
  id: string,
  paths: string[],
): Promise<string[]> {
  const session = await requireSession(workspaceId, id);
  if (session.status !== "open") throw new ServiceError("Session is not open", 400);
  const dropped: string[] = [];
  for (const raw of paths) {
    const path = normalizeFsPath(raw);
    if (path && path in session.overlay) {
      delete session.overlay[path];
      dropped.push(path);
    }
  }
  if (dropped.length === 0) throw new ServiceError("No matching staged changes", 404);
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
  return dropped.sort();
}

// ---------------------------------------------------------------------------
// Summaries, sync, close
// ---------------------------------------------------------------------------

export async function changeSummary(
  workspaceId: string,
  session: ChatSessionRecord,
): Promise<SessionChangeSummary> {
  // Staged: overlay walk (unchanged). Auto: diff(base, main) filtered to
  // session-touched paths, with full-diff fallback when the set is absent
  // (tech-plan D4).
  if (session.mode === "auto") {
    return autoChangeSummary(workspaceId, session);
  }
  const snapshot = await baseSnapshot(workspaceId, session).catch(() => undefined);
  const baseHashes = new Map(
    (snapshot?.entries ?? []).map((entry) => [entry.path, entry.hash]),
  );
  const summary: SessionChangeSummary = { added: [], modified: [], removed: [] };
  for (const [path, staged] of Object.entries(session.overlay)) {
    const before = baseHashes.get(path);
    if (staged === null) {
      if (before !== undefined) summary.removed.push(path);
    } else if (before === undefined) summary.added.push(path);
    else if (before !== staged) summary.modified.push(path);
  }
  summary.added.sort();
  summary.modified.sort();
  summary.removed.sort();
  return summary;
}

async function autoChangeSummary(
  workspaceId: string,
  session: ChatSessionRecord,
): Promise<SessionChangeSummary> {
  const baseCommit = await readCommit(workspaceId, session.base);
  const baseSnap = baseCommit
    ? await readSnapshot(workspaceId, baseCommit.snapshot)
    : undefined;
  // Ephemeral live-tree snapshot — do not advance main just to answer
  // "what changed" (tech-plan D4).
  const live = buildSnapshot(await visibleEntries(workspaceId));
  const diff = diffSnapshots(baseSnap, live);
  const touched = session.touchedPaths;
  const includesOtherActivity = touched === undefined;
  const allow = (path: string): boolean =>
    includesOtherActivity || (touched?.includes(path) ?? false);
  return {
    added: diff.added.map((e) => e.path).filter(allow).sort(),
    modified: diff.modified.map((e) => e.path).filter(allow).sort(),
    removed: diff.removed.map((e) => e.path).filter(allow).sort(),
    ...(includesOtherActivity ? { includesOtherActivity: true } : {}),
  };
}

export interface SessionConflict {
  path: string;
  /** This session's staged hash (null = staged delete). */
  ours: string | null;
  /** The hash now on main (undefined = deleted on main). */
  theirs?: string;
}

/**
 * Rebase the session's base onto the current main head. The overlay is
 * preserved; paths where main moved *and* the session staged something are
 * reported as conflicts (path granularity — the caller picks a side by
 * re-staging or dropping its overlay entry).
 */
export async function syncSession(
  workspaceId: string,
  id: string,
  userId: string,
): Promise<{ session: ChatSessionRecord; conflicts: SessionConflict[] }> {
  const session = await requireSession(workspaceId, id);
  if (session.status !== "open") throw new ServiceError("Session is not open", 400);
  const oldBase = await baseSnapshot(workspaceId, session);
  const { commit } = await commitTree(workspaceId, {
    message: "Auto snapshot",
    author: userId,
  });
  if (commit.id === session.base) return { session, conflicts: [] };
  const newBase = await readSnapshot(workspaceId, commit.snapshot);
  if (!newBase) throw new ServiceError("Snapshot missing for main head", 500);

  const oldHashes = new Map(oldBase.entries.map((entry) => [entry.path, entry.hash]));
  const newHashes = new Map(newBase.entries.map((entry) => [entry.path, entry.hash]));
  const conflicts: SessionConflict[] = [];
  for (const [path, staged] of Object.entries(session.overlay)) {
    const before = oldHashes.get(path);
    const now = newHashes.get(path);
    const mainMoved = before !== now;
    if (mainMoved && staged !== now) {
      conflicts.push({ path, ours: staged, ...(now !== undefined ? { theirs: now } : {}) });
    }
  }

  session.base = commit.id;
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
  return { session, conflicts };
}

/**
 * One-call merge completion — the native function notification choices
 * invoke (docs/vcs-and-sessions.md "Notifications"). Syncs the draft onto
 * the current main head, resolves every conflicted path by strategy
 * ("keep-draft": the overlay wins; "keep-workspace": the draft drops its
 * claim), then optionally applies the draft as a merge commit.
 */
export async function resolveSessionMerge(
  workspaceId: string,
  id: string,
  userId: string,
  options: { strategy: "keep-draft" | "keep-workspace"; apply?: boolean; message?: string },
): Promise<{ session: ChatSessionRecord; commit?: VcsCommit; resolved: string[] }> {
  const { conflicts } = await syncSession(workspaceId, id, userId);
  const resolved = conflicts.map((conflict) => conflict.path).sort();
  if (options.strategy === "keep-workspace" && resolved.length > 0) {
    await discardChanges(workspaceId, id, resolved);
  }
  if (options.apply === false) {
    return { session: await requireSession(workspaceId, id), resolved };
  }
  const session = await requireSession(workspaceId, id);
  const closed = await closeSession(workspaceId, id, userId, {
    stage: true,
    message:
      options.message?.trim() ||
      `Merge: ${session.title} (${
        options.strategy === "keep-draft" ? "kept the draft's versions" : "kept the workspace versions"
      })`,
  });
  return { ...closed, resolved };
}

/**
 * Close a session. `stage: true` applies the overlay to the live tree and
 * commits main as a merge node (parents `[mainHead, sessionHead]` when the
 * session has its own line; single parent otherwise — tech-plan D2);
 * otherwise the session is archived untouched — the overlay stays readable
 * for peeking.
 */
export async function closeSession(
  workspaceId: string,
  id: string,
  userId: string,
  options: { stage?: boolean; message?: string },
): Promise<{ session: ChatSessionRecord; commit?: VcsCommit }> {
  const session = await requireSession(workspaceId, id);
  if (session.status !== "open") throw new ServiceError("Session is not open", 400);

  if (!options.stage) {
    session.status = "closed";
    session.updatedAt = new Date().toISOString();
    await save(workspaceId, session);
    return { session };
  }

  const store = getFsStore();
  const hadOverlay = Object.keys(session.overlay).length > 0;
  for (const [path, staged] of Object.entries(session.overlay)) {
    const normalized = normalizeFsPath(path);
    if (!normalized) continue;
    if (staged === null) {
      await store.remove(workspaceId, normalized).catch(() => undefined);
      continue;
    }
    const shadow = await store.read(workspaceId, shadowPath(session.id, normalized), staged);
    if (!shadow) throw new ServiceError(`Staged content missing for ${normalized}`, 500);
    await store.write(workspaceId, normalized, shadow.content, shadow.mimeType);
  }

  const mainBefore = await readRef(workspaceId, MAIN_REF);
  const mainHead = mainBefore?.commit;

  // Build the session line when the overlay contributed anything: a commit
  // on `session/<id>` parented at the session base, then a two-parent merge
  // onto main. Empty overlay → single-parent main commit (no session commits).
  let parents: string[] | undefined;
  if (hadOverlay) {
    const sessionRef = `session/${session.id}`;
    const { commit: sessionCommit } = await commitTree(workspaceId, {
      message: `Session: ${session.title}`,
      author: userId,
      sessionId: session.id,
      ref: sessionRef,
      parents: [session.base],
    });
    parents = mainHead ? [mainHead, sessionCommit.id] : [sessionCommit.id];
  }

  const { commit } = await commitTree(workspaceId, {
    message: options.message?.trim() || `Merge session: ${session.title}`,
    author: userId,
    sessionId: session.id,
    ...(parents ? { parents } : {}),
  });
  session.status = "merged";
  session.mergeCommit = commit.id;
  session.updatedAt = new Date().toISOString();
  await save(workspaceId, session);
  return { session, commit };
}
