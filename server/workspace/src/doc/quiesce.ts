/**
 * Idle / max-interval materialization of a live Y.Doc to plain Markdown (D5).
 *
 * Writes go through `getFsStore().write` — no chat session, no VCS commit.
 * Manual save + commit is stream 8 (`forceMaterializeAndCommit`).
 */

import * as Y from "yjs";
import { getFsStore } from "../fs-store.js";
import { appendUpdate, compactIfDue, DOC_COMPACT } from "./persistence.js";
import type { LiveDoc } from "./registry.js";

/** Mutable thresholds — tests override fields (same pattern as `DOC_COMPACT`). */
export const DOC_QUIESCE = {
  IDLE_MS: 5_000,
  MAX_INTERVAL_MS: 30_000,
};

/** Default idle threshold (tech-plan name). Prefer mutating `DOC_QUIESCE.IDLE_MS`. */
export const DOC_QUIESCE_IDLE_MS = 5_000;
/** Default max-interval (tech-plan name). Prefer mutating `DOC_QUIESCE.MAX_INTERVAL_MS`. */
export const DOC_QUIESCE_MAX_INTERVAL_MS = 30_000;

/**
 * Plain Markdown write of `doc.getText("content")` — no session, no commit (D5).
 */
export async function materialize(
  workspaceId: string,
  path: string,
  doc: Y.Doc,
): Promise<void> {
  await getFsStore().write(workspaceId, path, doc.getText("content").toString());
}

/**
 * Align durable snapshot `fileHash` with the post-materialize FS hash so the
 * next cold load does not treat the quiesced write as an external restore
 * (stream 2 note). Forces a compact via a full-state log entry.
 */
export async function flushDurableAfterMaterialize(
  workspaceId: string,
  path: string,
  doc: Y.Doc,
): Promise<void> {
  await appendUpdate(workspaceId, path, Y.encodeStateAsUpdate(doc));
  const prev = DOC_COMPACT.SIZE_BYTES;
  DOC_COMPACT.SIZE_BYTES = 0;
  try {
    await compactIfDue(workspaceId, path);
  } finally {
    DOC_COMPACT.SIZE_BYTES = prev;
  }
}

export async function materializeAndFlush(
  workspaceId: string,
  path: string,
  doc: Y.Doc,
): Promise<void> {
  if (doc.isDestroyed) return;
  await materialize(workspaceId, path, doc);
  await flushDurableAfterMaterialize(workspaceId, path, doc);
}

export function clearQuiesceTimers(live: LiveDoc): void {
  if (live.idleTimer) {
    clearTimeout(live.idleTimer);
    live.idleTimer = undefined;
  }
  if (live.maxIntervalTimer) {
    clearTimeout(live.maxIntervalTimer);
    live.maxIntervalTimer = undefined;
  }
}

function armIdle(live: LiveDoc, workspaceId: string, path: string): void {
  if (live.idleTimer) clearTimeout(live.idleTimer);
  live.idleTimer = setTimeout(() => {
    live.idleTimer = undefined;
    void materializeAndFlush(workspaceId, path, live.doc).catch(() => {
      // Quiesce must not throw into the timer; next activity re-arms.
    });
  }, DOC_QUIESCE.IDLE_MS);
  live.idleTimer.unref?.();
}

function armMaxInterval(live: LiveDoc, workspaceId: string, path: string): void {
  if (live.maxIntervalTimer) return;
  live.maxIntervalTimer = setTimeout(() => {
    live.maxIntervalTimer = undefined;
    void (async () => {
      try {
        await materializeAndFlush(workspaceId, path, live.doc);
      } catch {
        // ignore
      } finally {
        if (!live.doc.isDestroyed) {
          armMaxInterval(live, workspaceId, path);
        }
      }
    })();
  }, DOC_QUIESCE.MAX_INTERVAL_MS);
  live.maxIntervalTimer.unref?.();
}

/** Start the hard max-interval timer (idempotent). Called on join. */
export function armQuiesceTimers(
  live: LiveDoc,
  workspaceId: string,
  path: string,
): void {
  armMaxInterval(live, workspaceId, path);
}

/** Reset idle timer and ensure max-interval is armed — call on every applied update. */
export function noteDocActivity(
  live: LiveDoc,
  workspaceId: string,
  path: string,
): void {
  armIdle(live, workspaceId, path);
  armMaxInterval(live, workspaceId, path);
}
