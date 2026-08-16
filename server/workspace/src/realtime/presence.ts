/**
 * Presence namespace handler — broker-store-backed rosters for `presence:<path>`.
 *
 * Spec: openspec/changes/presence-realtime/specs/file-presence.
 * State is never persisted; disconnect clears focus.
 * All handler state lives in broker.storeFor(workspaceId, "presence") — no
 * closure maps (spec "Namespace handlers hold no state").
 */

import { z } from "zod";
import { normalizeFsPath } from "../fs-store.js";
import type { Conn, NamespaceHandler, RealtimeBroker } from "./broker.js";
import { parseTopic, type Topic } from "./protocol.js";

export type PresencePeer = {
  userId: string;
  path: string;
  lastActive: string;
};

type PresenceDelta = {
  kind: "join" | "leave" | "update";
  peer: PresencePeer;
};

const presencePublishSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("focus") }),
  z.object({ action: z.literal("blur") }),
]);

/** Per-connection focus entry in the store (`focus:<connId>`). */
interface StoredFocus {
  path: string;
  lastActive: string;
}

/** User membership on a path in the store (`member:<path>\0<userId>`). */
interface StoredMembership {
  connIds: string[];
  lastActive: string;
}

/**
 * Reject paths that aren't already in the VFS canonical relative form
 * (tech-plan open question 2 — reject, don't normalize).
 */
export function assertCanonicalPresencePath(rest: string): string {
  const canonical = normalizeFsPath(rest);
  if (canonical === null || canonical !== rest) {
    throw new Error("non-canonical presence path");
  }
  return rest;
}

function pathFromTopic(topic: Topic): string {
  const parsed = parseTopic(topic);
  if (!parsed || parsed.namespace !== "presence") {
    throw new Error("invalid presence topic");
  }
  return assertCanonicalPresencePath(parsed.rest);
}

function presenceTopic(path: string): Topic {
  return `presence:${path}` as Topic;
}

export function createPresenceHandler(broker: RealtimeBroker): NamespaceHandler {
  function store(workspaceId: string) {
    return broker.storeFor(workspaceId, "presence");
  }

  async function roster(workspaceId: string, path: string): Promise<PresencePeer[]> {
    const st = store(workspaceId);
    // Roster = all member entries for this path (prefix = "member:<path>\0").
    const entries = await st.list<StoredMembership>(`member:${path}\0`);
    const peers: PresencePeer[] = [];
    for (const [key, membership] of entries) {
      // key = "member:<path>\0<userId>"
      const userId = key.slice(`member:${path}\0`.length);
      peers.push({ userId, path, lastActive: membership.lastActive });
    }
    return peers;
  }

  function emit(
    workspaceId: string,
    path: string,
    kind: PresenceDelta["kind"],
    peer: PresencePeer,
  ): void {
    const body: PresenceDelta = { kind, peer };
    broker.publishToTopic(workspaceId, presenceTopic(path), body);
  }

  async function clearFocus(conn: Conn): Promise<void> {
    const st = store(conn.workspaceId);
    const current = await st.get<StoredFocus>(`focus:${conn.id}`);
    if (!current) return;
    await st.delete(`focus:${conn.id}`);

    const memberKey = `member:${current.path}\0${conn.userId}`;
    const membership = await st.get<StoredMembership>(memberKey);
    if (!membership) return;

    const connIds = membership.connIds.filter((id) => id !== conn.id);
    if (connIds.length > 0) {
      // Other connections still hold focus for this user on this path — update.
      await st.set<StoredMembership>(memberKey, { ...membership, connIds });
      return;
    }

    // Last connection gone — user leaves the path.
    await st.delete(memberKey);
    emit(conn.workspaceId, current.path, "leave", {
      userId: conn.userId,
      path: current.path,
      lastActive: current.lastActive,
    });
  }

  async function setFocus(conn: Conn, path: string): Promise<void> {
    const st = store(conn.workspaceId);
    const now = new Date().toISOString();
    const current = await st.get<StoredFocus>(`focus:${conn.id}`);

    if (current?.path === path) {
      // Same path: refresh lastActive and emit update.
      await st.set<StoredFocus>(`focus:${conn.id}`, { path, lastActive: now });
      const memberKey = `member:${path}\0${conn.userId}`;
      const membership = await st.get<StoredMembership>(memberKey);
      if (membership) {
        await st.set<StoredMembership>(memberKey, { ...membership, lastActive: now });
      }
      emit(conn.workspaceId, path, "update", {
        userId: conn.userId,
        path,
        lastActive: now,
      });
      return;
    }

    // Leave old path first so the user is never present in both.
    if (current) await clearFocus(conn);

    await st.set<StoredFocus>(`focus:${conn.id}`, { path, lastActive: now });

    const memberKey = `member:${path}\0${conn.userId}`;
    const membership = await st.get<StoredMembership>(memberKey);
    if (!membership) {
      // First connection for this user on this path — join.
      await st.set<StoredMembership>(memberKey, { connIds: [conn.id], lastActive: now });
      emit(conn.workspaceId, path, "join", {
        userId: conn.userId,
        path,
        lastActive: now,
      });
      return;
    }

    // Additional connection for an already-present user — update.
    await st.set<StoredMembership>(memberKey, {
      connIds: [...membership.connIds, conn.id],
      lastActive: now,
    });
    emit(conn.workspaceId, path, "update", {
      userId: conn.userId,
      path,
      lastActive: now,
    });
  }

  return {
    namespace: "presence",

    async onSubscribe(conn, topic) {
      const path = pathFromTopic(topic);
      return { body: { peers: await roster(conn.workspaceId, path) } };
    },

    async onPublish(conn, topic, body) {
      const path = pathFromTopic(topic);
      const parsed = presencePublishSchema.safeParse(body);
      if (!parsed.success) {
        throw new Error("presence body must be {action:\"focus\"|\"blur\"}");
      }
      if (parsed.data.action === "focus") {
        await setFocus(conn, path);
      } else {
        // Blur clears this connection's focus (exclusive focus model).
        await clearFocus(conn);
      }
    },

    async onDisconnect(conn) {
      await clearFocus(conn);
    },
  };
}
