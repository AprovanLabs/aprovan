/**
 * Workspace change journal — the source of `/fs/changes` answers.
 *
 * Every FS mutation (write, remove, removePrefix, completeUpload — including
 * staged-session shadow writes) is recorded here by the route/service layer
 * that performs it (see routes/fs.ts), not by the store backends themselves:
 * the journal has no idea whether SQLite, DynamoDB, or DSQL did the work, it
 * only knows a path changed.
 *
 * One monotonic cursor per workspace, shared across every scope (the live
 * tree and every staged session): a mutation always advances it, regardless
 * of who can see the result. Visibility is filtered at read time by `scope`
 * — "" for the live tree (visible to every reader), a staged-session id for
 * that session's shadow writes (visible only to readers polling that same
 * session). This is what lets `GET /fs/changes?since=&session=<id>` answer
 * correctly without maintaining a separate cursor space per session.
 *
 * The journal is an in-memory ring (bounded per workspace) — restart or
 * overflow loses history, which is fine: the contract degrades to "one full
 * listing, once", the same cost as today's steady-state poll (see spec
 * "Overflowed token falls back to full listing").
 */

export type ChangeKind = "update" | "delete";

/** One entry in a `/fs/changes` response. */
export interface FsChange {
  path: string;
  kind: ChangeKind;
}

interface JournalEntry extends FsChange {
  cursor: number;
  /** "" = visible to every reader (the live tree); a session id scopes the
   *  entry to that staged session's poll only. */
  scope: string;
}

interface WorkspaceJournal {
  /** Highest cursor value ever issued for this workspace — never resets on
   *  ring eviction, only on process restart (a fresh Map entry). */
  cursor: number;
  /** Oldest-first ring, capped at RING_CAPACITY. */
  entries: JournalEntry[];
}

/** "at least 1,000 entries per workspace" per the change-feed spec. */
export const RING_CAPACITY = 1000;

const journals = new Map<string, WorkspaceJournal>();

function getJournal(workspaceId: string): WorkspaceJournal {
  let journal = journals.get(workspaceId);
  if (!journal) {
    journal = { cursor: 0, entries: [] };
    journals.set(workspaceId, journal);
  }
  return journal;
}

/**
 * Record a mutation. Call this from the FS service layer after a write
 * succeeds — never speculatively, and never for `.services/**` paths (the
 * caller passes the session-relative path for staged shadow writes, which is
 * never a service path, so the invisibility rule falls out automatically).
 */
export function recordChange(
  workspaceId: string,
  scope: string,
  path: string,
  kind: ChangeKind,
): void {
  const journal = getJournal(workspaceId);
  journal.cursor += 1;
  journal.entries.push({ path, kind, cursor: journal.cursor, scope });
  if (journal.entries.length > RING_CAPACITY) {
    journal.entries.splice(0, journal.entries.length - RING_CAPACITY);
  }
}

/** The workspace's current cursor — served as the `/fs/changes` ETag. Pure
 *  in-memory read: the 304 fast path never touches this beyond calling it. */
export function currentCursor(workspaceId: string): number {
  return journals.get(workspaceId)?.cursor ?? 0;
}

export interface ChangesResult {
  cursor: number;
  reset: boolean;
  changes: FsChange[];
}

/**
 * Compute the delta since `since` for `scope` ("" = the live tree). Returns
 * `reset: true` (empty `changes`; the caller fills in a full listing) when
 * the journal cannot answer: `since` is undefined, refers to a cursor value
 * higher than the current one (journal reset by a restart), or falls before
 * the oldest entry still retained in the ring (evicted by overflow).
 */
export function changesSince(
  workspaceId: string,
  scope: string,
  since: number | undefined,
): ChangesResult {
  const journal = getJournal(workspaceId);
  const cursor = journal.cursor;
  if (since === undefined || Number.isNaN(since) || since < 0 || since > cursor) {
    return { cursor, reset: true, changes: [] };
  }
  const oldestRetained = journal.entries[0]?.cursor ?? cursor + 1;
  if (since < oldestRetained - 1) {
    return { cursor, reset: true, changes: [] };
  }
  const changes = journal.entries
    .filter((entry) => entry.cursor > since && (entry.scope === "" || entry.scope === scope))
    .map((entry) => ({ path: entry.path, kind: entry.kind }));
  return { cursor, reset: false, changes };
}

/** Test hook: drop every workspace's journal. */
export function resetChangeJournal(): void {
  journals.clear();
}
