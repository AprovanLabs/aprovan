/**
 * Presence namespace handler — socket-memory rosters for `presence:<path>`.
 *
 * Spec: openspec/changes/presence-realtime/specs/file-presence.
 * State is never persisted; disconnect clears focus.
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

/** Per-connection focus within a workspace. */
interface ConnFocus {
  path: string;
  lastActive: string;
}

/** User membership on a path: one roster entry, many connections. */
interface UserMembership {
  connIds: Set<string>;
  lastActive: string;
}

function topicKey(workspaceId: string, path: string): string {
  return `${workspaceId}\0${path}`;
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
  /** conn.id → focus (scoped by that conn's workspaceId). */
  const focusByConn = new Map<string, ConnFocus>();
  /** `${workspaceId}\0${path}` → userId → membership. */
  const members = new Map<string, Map<string, UserMembership>>();

  function roster(workspaceId: string, path: string): PresencePeer[] {
    const byUser = members.get(topicKey(workspaceId, path));
    if (!byUser) return [];
    const peers: PresencePeer[] = [];
    for (const [userId, membership] of byUser) {
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

  function clearFocus(conn: Conn): void {
    const current = focusByConn.get(conn.id);
    if (!current) return;
    focusByConn.delete(conn.id);

    const key = topicKey(conn.workspaceId, current.path);
    const byUser = members.get(key);
    if (!byUser) return;
    const membership = byUser.get(conn.userId);
    if (!membership) return;

    membership.connIds.delete(conn.id);
    if (membership.connIds.size > 0) return;

    byUser.delete(conn.userId);
    if (byUser.size === 0) members.delete(key);

    emit(conn.workspaceId, current.path, "leave", {
      userId: conn.userId,
      path: current.path,
      lastActive: current.lastActive,
    });
  }

  function setFocus(conn: Conn, path: string): void {
    const now = new Date().toISOString();
    const current = focusByConn.get(conn.id);

    if (current?.path === path) {
      // Same path: refresh lastActive and emit update.
      current.lastActive = now;
      const membership = members.get(topicKey(conn.workspaceId, path))?.get(conn.userId);
      if (membership) membership.lastActive = now;
      emit(conn.workspaceId, path, "update", {
        userId: conn.userId,
        path,
        lastActive: now,
      });
      return;
    }

    // Leave old path first so the user is never present in both.
    if (current) clearFocus(conn);

    focusByConn.set(conn.id, { path, lastActive: now });

    const key = topicKey(conn.workspaceId, path);
    let byUser = members.get(key);
    if (!byUser) {
      byUser = new Map();
      members.set(key, byUser);
    }
    let membership = byUser.get(conn.userId);
    if (!membership) {
      membership = { connIds: new Set(), lastActive: now };
      byUser.set(conn.userId, membership);
      membership.connIds.add(conn.id);
      emit(conn.workspaceId, path, "join", {
        userId: conn.userId,
        path,
        lastActive: now,
      });
      return;
    }

    membership.connIds.add(conn.id);
    membership.lastActive = now;
    emit(conn.workspaceId, path, "update", {
      userId: conn.userId,
      path,
      lastActive: now,
    });
  }

  return {
    namespace: "presence",

    onSubscribe(conn, topic) {
      const path = pathFromTopic(topic);
      // Readiness shim (Stream 1 task 1.7): wraps the still-synchronous
      // presence logic to satisfy the broker's async onSubscribe contract.
      // Zero behavior change, no store reads. Stream 2 (tasks 2.1-2.2)
      // replaces this wholesale with the real store-backed implementation —
      // do not build on top of it.
      return Promise.resolve({ body: { peers: roster(conn.workspaceId, path) } });
    },

    onPublish(conn, topic, body) {
      const path = pathFromTopic(topic);
      const parsed = presencePublishSchema.safeParse(body);
      if (!parsed.success) {
        throw new Error("presence body must be {action:\"focus\"|\"blur\"}");
      }
      if (parsed.data.action === "focus") {
        setFocus(conn, path);
      } else {
        // Blur clears this connection's focus (exclusive focus model).
        clearFocus(conn);
      }
    },

    onDisconnect(conn) {
      clearFocus(conn);
    },
  };
}
