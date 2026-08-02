/**
 * System record scopes — the reserved `svc#<subsystem>` namespace platform
 * subsystems store their accumulated state under (specs/record-store, "The
 * record rule covers platform subsystems"; tech-plan D3).
 *
 * "Files are authored; records are accumulated" now covers the platform's own
 * state: chat sessions and transcripts, VCS refs/commits/snapshots, mounts,
 * registrations, runs, jobs, cursors, and settings all live in the record
 * store under `svc#...` scopes instead of `.services/**` VFS files. The
 * `svc#` prefix is disjoint from the caller-reachable scopes (`ws`,
 * `app#<name>#u#<sub>`), and {@link assertCallerScope} is the shared guard
 * the keyvalue/records service surfaces use to keep it that way.
 *
 * Everything here is a thin convenience over {@link getRecordStore} — one
 * scope-builder plus JSON document helpers, so each subsystem's store module
 * reads like its FS-backed predecessor.
 */

import { getRecordStore } from "./records.js";
import { ServiceError } from "./service-kernel.js";

export const SVC_SCOPE_PREFIX = "svc#";

/** Attribution for platform-internal writes with no acting user in scope. */
export const SVC_SYSTEM_USER = "system";

/** Is `scope` inside the reserved system namespace? */
export function isSystemScope(scope: string): boolean {
  return scope.startsWith(SVC_SCOPE_PREFIX);
}

/** Build a system scope: `svcScope("chat", "session", id)` → `svc#chat#session#<id>`. */
export function svcScope(subsystem: string, ...qualifiers: string[]): string {
  return [SVC_SCOPE_PREFIX + subsystem, ...qualifiers].join("#");
}

/**
 * Reject caller-supplied scopes that address the reserved namespace. Called
 * by every service surface that turns caller input into a record scope — app
 * sessions and workspace callers remain confined to `ws`/`app#...`.
 */
export function assertCallerScope(scope: string, label = "scope"): void {
  if (isSystemScope(scope)) {
    throw new ServiceError(`${label} must not address the reserved svc# namespace`, 403);
  }
}

// ---------------------------------------------------------------------------
// JSON document helpers
// ---------------------------------------------------------------------------

/** Read one JSON document; undefined when absent. */
export async function readSvcRecord<T>(
  workspaceId: string,
  scope: string,
  key: string,
): Promise<T | undefined> {
  const hit = await getRecordStore().get(workspaceId, scope, key);
  return hit === undefined ? undefined : (hit.value as T);
}

/** Write one JSON document. */
export async function writeSvcRecord(
  workspaceId: string,
  scope: string,
  key: string,
  value: unknown,
  updatedBy: string = SVC_SYSTEM_USER,
): Promise<void> {
  await getRecordStore().set(workspaceId, scope, key, value, updatedBy);
}

/** Delete one document. Returns whether anything was deleted. */
export async function deleteSvcRecord(
  workspaceId: string,
  scope: string,
  key: string,
): Promise<boolean> {
  return getRecordStore().delete(workspaceId, scope, key);
}

/** Keys under `scope` starting with `prefix`, lexically ordered. */
export async function listSvcKeys(
  workspaceId: string,
  scope: string,
  prefix = "",
): Promise<string[]> {
  return getRecordStore().list(workspaceId, scope, prefix);
}

/** Every document under `scope` (key-ordered). */
export async function listSvcRecords<T>(
  workspaceId: string,
  scope: string,
  prefix = "",
): Promise<Array<{ key: string; value: T }>> {
  const store = getRecordStore();
  const keys = await store.list(workspaceId, scope, prefix);
  const entries: Array<{ key: string; value: T }> = [];
  for (const key of keys) {
    const hit = await store.get(workspaceId, scope, key);
    if (hit !== undefined) entries.push({ key, value: hit.value as T });
  }
  return entries;
}

/** Delete every document under `scope` (with `prefix`). Returns the count. */
export async function deleteSvcScope(
  workspaceId: string,
  scope: string,
  prefix = "",
): Promise<number> {
  const store = getRecordStore();
  const keys = await store.list(workspaceId, scope, prefix);
  let removed = 0;
  for (const key of keys) {
    if (await store.delete(workspaceId, scope, key)) removed += 1;
  }
  return removed;
}

// ---------------------------------------------------------------------------
// Sequence keys — transcript/event-log ordering
// ---------------------------------------------------------------------------

const SEQ_WIDTH = 10;

/**
 * `seq10#<id>` — a zero-padded ordinal so lexical key order is append order,
 * suffixed with the client id so idempotent re-sends can find their row.
 */
export function seqKey(seq: number, id: string): string {
  return `${String(seq).padStart(SEQ_WIDTH, "0")}#${id}`;
}

/** Split a {@link seqKey} back into its ordinal and id. */
export function parseSeqKey(key: string): { seq: number; id: string } | undefined {
  const cut = key.indexOf("#");
  if (cut !== SEQ_WIDTH) return undefined;
  const seq = Number(key.slice(0, cut));
  if (!Number.isInteger(seq)) return undefined;
  return { seq, id: key.slice(cut + 1) };
}
