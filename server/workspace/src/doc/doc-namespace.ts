/**
 * `doc` realtime namespace — Yjs sync + awareness over base64-in-JSON frames (D1).
 *
 * Topic: `doc:<vfs path>`. Modeled on `presence.ts`'s NamespaceHandler shape.
 * Join re-checks tenant-scoped file access; applied updates arm quiesce timers.
 */

import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import * as awarenessProtocol from "y-protocols/awareness";
import * as syncProtocol from "y-protocols/sync";
import * as Y from "yjs";
import { z } from "zod";
import { assertPartitionAccess } from "../apps/store.js";
import { normalizeFsPath } from "../fs-store.js";
import { assertPathGranted } from "../grants.js";
import type { Conn, NamespaceHandler, RealtimeBroker } from "../realtime/broker.js";
import { parseTopic, type Topic } from "../realtime/protocol.js";
import { appendUpdate } from "./persistence.js";
import { armQuiesceTimers, noteDocActivity } from "./quiesce.js";
import {
  getOrLoadDoc,
  hasLiveDoc,
  releaseDoc,
  type LiveDoc,
} from "./registry.js";

/** base64(y-protocols sync-protocol bytes) */
export type DocSyncFrame = { kind: "sync"; data: string };
/** base64(encodeAwarenessUpdate(...)) */
export type DocAwarenessFrame = { kind: "awareness"; data: string };
export type DocBody = DocSyncFrame | DocAwarenessFrame;

const docBodySchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("sync"), data: z.string() }),
  z.object({ kind: z.literal("awareness"), data: z.string() }),
]);

function encodeB64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function decodeB64(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data, "base64"));
}

/** Reject non-canonical VFS paths (same rule as presence). */
export function assertCanonicalDocPath(rest: string): string {
  const canonical = normalizeFsPath(rest);
  if (canonical === null || canonical !== rest) {
    throw new Error("non-canonical doc path");
  }
  return rest;
}

function pathFromTopic(topic: Topic): string {
  const parsed = parseTopic(topic);
  if (!parsed || parsed.namespace !== "doc") {
    throw new Error("invalid doc topic");
  }
  return assertCanonicalDocPath(parsed.rest);
}

function docTopic(path: string): Topic {
  return `doc:${path}` as Topic;
}

/**
 * Refuse anonymous joins; re-check tenant-scoped read access (same choke
 * points as `vfs.read` in services.ts). Throws → broker `bad-topic`.
 */
async function assertDocJoinAllowed(conn: Conn, path: string): Promise<void> {
  if (!conn.userId || conn.userId === "anonymous") {
    throw new Error("anonymous doc join refused");
  }
  // Human WS conns carry no agent grants (undefined → no-op), matching vfs.read.
  assertPathGranted(undefined, path, false);
  await assertPartitionAccess(conn.workspaceId, conn.userId, path);
}

function syncStep1Frame(doc: Y.Doc): DocSyncFrame {
  const encoder = encoding.createEncoder();
  syncProtocol.writeSyncStep1(encoder, doc);
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

function awarenessSnapshotFrame(
  awareness: awarenessProtocol.Awareness,
): DocAwarenessFrame | null {
  const clients = Array.from(awareness.getStates().keys());
  if (clients.length === 0) return null;
  const bytes = awarenessProtocol.encodeAwarenessUpdate(awareness, clients);
  return { kind: "awareness", data: encodeB64(bytes) };
}

/** Decode clientIDs carried by an awareness update (for disconnect cleanup). */
function clientIdsInAwarenessUpdate(update: Uint8Array): number[] {
  const decoder = decoding.createDecoder(update);
  const len = decoding.readVarUint(decoder);
  const ids: number[] = [];
  for (let i = 0; i < len; i++) {
    const clientID = decoding.readVarUint(decoder);
    decoding.readVarUint(decoder); // clock
    decoding.readVarString(decoder); // state JSON
    ids.push(clientID);
  }
  return ids;
}

export function createDocHandler(broker: RealtimeBroker): NamespaceHandler {
  /** conn.id → path → awareness clientIDs published by this connection. */
  const connAwareness = new Map<string, Map<string, Set<number>>>();
  /** Keys scheduled for zero-participant release (cancelled on re-join). */
  const pendingRelease = new Set<string>();

  function trackPath(connId: string, path: string): Set<number> {
    let byPath = connAwareness.get(connId);
    if (!byPath) {
      byPath = new Map();
      connAwareness.set(connId, byPath);
    }
    let clients = byPath.get(path);
    if (!clients) {
      clients = new Set();
      byPath.set(path, clients);
    }
    return clients;
  }

  function scheduleRelease(live: LiveDoc, workspaceId: string, path: string): void {
    pendingRelease.add(live.key);
    queueMicrotask(() => {
      void (async () => {
        if (!pendingRelease.has(live.key)) return;
        pendingRelease.delete(live.key);
        if (!hasLiveDoc(workspaceId, path)) return;
        const current = await getOrLoadDoc(workspaceId, path);
        if (current.participants.size > 0) return;
        await releaseDoc(current.key);
      })();
    });
  }

  async function leavePath(conn: Conn, path: string): Promise<void> {
    if (!hasLiveDoc(conn.workspaceId, path)) {
      connAwareness.get(conn.id)?.delete(path);
      return;
    }
    const live = await getOrLoadDoc(conn.workspaceId, path);
    const clients = connAwareness.get(conn.id)?.get(path);
    connAwareness.get(conn.id)?.delete(path);
    if (connAwareness.get(conn.id)?.size === 0) connAwareness.delete(conn.id);

    if (clients && clients.size > 0) {
      const removed = Array.from(clients);
      awarenessProtocol.removeAwarenessStates(live.awareness, removed, conn);
      const update = awarenessProtocol.encodeAwarenessUpdate(
        live.awareness,
        removed,
      );
      broker.publishToTopic(conn.workspaceId, docTopic(path), {
        kind: "awareness",
        data: encodeB64(update),
      } satisfies DocAwarenessFrame);
    }

    live.participants.delete(conn.id);
    if (live.participants.size === 0) {
      scheduleRelease(live, conn.workspaceId, path);
    }
  }

  return {
    namespace: "doc",

    async onSubscribe(conn, topic) {
      const path = pathFromTopic(topic);
      // Auth before load — revoked / anonymous callers must not pin a LiveDoc.
      await assertDocJoinAllowed(conn, path);

      const live = await getOrLoadDoc(conn.workspaceId, path);
      pendingRelease.delete(live.key);
      live.participants.add(conn.id);
      trackPath(conn.id, path);
      armQuiesceTimers(live, conn.workspaceId, path);

      const body = syncStep1Frame(live.doc);

      // Awareness snapshot rides a second `event` after `subscribed` (tech-plan).
      // setTimeout(0) — not queueMicrotask — so it runs after the broker's
      // await-continuation sends `subscribed` (both would race as microtasks).
      const awareness = awarenessSnapshotFrame(live.awareness);
      if (awareness) {
        setTimeout(() => {
          conn.send({ type: "event", topic, body: awareness });
        }, 0);
      }

      return { body };
    },

    async onPublish(conn, topic, body) {
      const path = pathFromTopic(topic);
      const parsed = docBodySchema.safeParse(body);
      if (!parsed.success) {
        throw new Error('doc body must be {kind:"sync"|"awareness", data:string}');
      }
      if (!hasLiveDoc(conn.workspaceId, path)) {
        throw new Error("no live doc for topic");
      }
      const live = await getOrLoadDoc(conn.workspaceId, path);
      if (!live.participants.has(conn.id)) {
        throw new Error("not subscribed to doc topic");
      }

      if (parsed.data.kind === "awareness") {
        const update = decodeB64(parsed.data.data);
        for (const id of clientIdsInAwarenessUpdate(update)) {
          trackPath(conn.id, path).add(id);
        }
        awarenessProtocol.applyAwarenessUpdate(live.awareness, update, conn);
        broker.publishToTopic(conn.workspaceId, topic, parsed.data, { except: conn });
        return;
      }

      const updateBytes = decodeB64(parsed.data.data);
      const decoder = decoding.createDecoder(updateBytes);
      const encoder = encoding.createEncoder();
      const collected: Uint8Array[] = [];
      const onUpdate = (update: Uint8Array, origin: unknown) => {
        if (origin === conn) collected.push(update);
      };
      live.doc.on("update", onUpdate);
      let messageType: number;
      try {
        messageType = syncProtocol.readSyncMessage(decoder, encoder, live.doc, conn);
      } finally {
        live.doc.off("update", onUpdate);
      }

      // Reply SyncStep2 (and any follow-up) only to the publisher.
      if (encoding.length(encoder) > 0) {
        const reply: DocSyncFrame = {
          kind: "sync",
          data: encodeB64(encoding.toUint8Array(encoder)),
        };
        conn.send({ type: "event", topic, body: reply });
      }

      if (
        messageType === syncProtocol.messageYjsSyncStep2 ||
        messageType === syncProtocol.messageYjsUpdate
      ) {
        if (collected.length > 0) {
          await appendUpdate(conn.workspaceId, path, collected);
          noteDocActivity(live, conn.workspaceId, path);
        }
        broker.publishToTopic(conn.workspaceId, topic, parsed.data, { except: conn });
      }
    },

    onDisconnect(conn) {
      const byPath = connAwareness.get(conn.id);
      if (!byPath || byPath.size === 0) return;
      const paths = Array.from(byPath.keys());
      for (const path of paths) {
        void leavePath(conn, path);
      }
    },
  };
}
