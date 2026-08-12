/**
 * Process-local live-doc registry — one `Y.Doc` + Awareness per
 * `(workspaceId, path)`, not layered on iw9-f5's NamespaceStore (tech-plan D2).
 */

import * as awarenessProtocol from "y-protocols/awareness";
import * as Y from "yjs";
import { loadDurable } from "./persistence.js";
import {
  clearQuiesceTimers,
  materializeAndFlush,
} from "./quiesce.js";

export interface LiveDoc {
  key: string;
  doc: Y.Doc;
  awareness: awarenessProtocol.Awareness;
  participants: Set<string>;
  idleTimer?: NodeJS.Timeout;
  maxIntervalTimer?: NodeJS.Timeout;
}

/** Mirrors `presence.ts` topicKey: `${workspaceId}\0${path}`. */
export function docKey(workspaceId: string, path: string): string {
  return `${workspaceId}\0${path}`;
}

const liveDocs = new Map<string, LiveDoc>();

/** In-flight loads so concurrent joins share one durable reconstruction. */
const loading = new Map<string, Promise<LiveDoc>>();

export function hasLiveDoc(workspaceId: string, path: string): boolean {
  return liveDocs.has(docKey(workspaceId, path));
}

export async function getOrLoadDoc(
  workspaceId: string,
  path: string,
): Promise<LiveDoc> {
  const key = docKey(workspaceId, path);
  const existing = liveDocs.get(key);
  if (existing) return existing;

  const pending = loading.get(key);
  if (pending) return pending;

  const promise = (async (): Promise<LiveDoc> => {
    const doc = await loadDurable(workspaceId, path);
    const live: LiveDoc = {
      key,
      doc,
      awareness: new awarenessProtocol.Awareness(doc),
      participants: new Set(),
    };
    liveDocs.set(key, live);
    return live;
  })();

  loading.set(key, promise);
  try {
    return await promise;
  } finally {
    loading.delete(key);
  }
}

function parseDocKey(key: string): { workspaceId: string; path: string } {
  const sep = key.indexOf("\0");
  if (sep < 0) throw new Error(`invalid doc key: ${key}`);
  return { workspaceId: key.slice(0, sep), path: key.slice(sep + 1) };
}

/**
 * Quiesce-materialize + durable flush, then drop the live replica from the map
 * (tech-plan `releaseDoc`; stream 4).
 */
export async function releaseDoc(key: string): Promise<void> {
  const live = liveDocs.get(key);
  if (!live) return;
  clearQuiesceTimers(live);
  const { workspaceId, path } = parseDocKey(key);
  try {
    await materializeAndFlush(workspaceId, path, live.doc);
  } catch {
    // Still tear down the in-memory replica if materialize fails.
  }
  live.awareness.destroy();
  live.doc.destroy();
  liveDocs.delete(key);
}
