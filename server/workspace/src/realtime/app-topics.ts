/**
 * CF-1 — App-scoped realtime handler (namespace `app`, topic `app:<installId>`).
 *
 * Subscribe snapshots, sync fan-out `authorize?` via stream 1's `canReadChannel`
 * (membership cache), message hints, priority channel-membership events, and
 * ephemeral presence/typing. Presence/typing never write the record store
 * or VFS (invariant 7).
 *
 * Topic keys route; authorization is re-applied at delivery.
 */

import { z } from "zod";
import { canReadChannel } from "../apps/chat/authz.js";
import {
  listChannels,
  postMessage,
  type ChatScope,
} from "../apps/chat/service.js";
import type { Channel } from "../apps/chat/schema.js";
import {
  assertInstanceAccess,
  listInstances,
} from "../apps/instances.js";
import type { Conn, NamespaceHandler, RealtimeBroker } from "./broker.js";
import type { NamespaceStore } from "./store.js";
import { parseTopic, type Topic } from "./protocol.js";

export type ChatRealtimeEvent =
  | {
      kind: "message";
      channelId: string;
      recordId: string;
      seq: number;
      hint?: { author: string; preview: string };
    }
  | { kind: "channel-membership"; channelId: string }
  | { kind: "presence"; roster: Array<{ sub: string; lastActive: string }> }
  | { kind: "typing"; channelId: string; sub: string };

type ConnAuth = {
  installId: string;
  instanceId: string;
  /** Channels this connection may receive events for (sync authorize cache). */
  channelIds: Set<string>;
};

type StoredFocus = { installId: string; lastActive: string };
type StoredMember = { connIds: string[]; lastActive: string };

/** Set around `publishToTopic` so sync `authorize` can see the event channel. */
type PendingFanout = { channelId?: string };

const publishSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("message"),
    channelId: z.string().min(1),
    body: z.string(),
    parentId: z.string().min(1).optional(),
    instanceId: z.string().min(1).optional(),
  }),
  z.object({
    action: z.literal("typing"),
    channelId: z.string().min(1),
  }),
  z.object({
    action: z.literal("presence"),
  }),
  z.object({
    action: z.literal("channel-membership"),
    channelId: z.string().min(1),
  }),
]);

const focusKey = (connId: string) => `focus:${connId}`;
const memberKey = (installId: string, userId: string) => `member:${installId}\0${userId}`;
const memberPrefix = (installId: string) => `member:${installId}\0`;
const authKey = (connId: string) => `auth:${connId}`;
const seqKey = (installId: string) => `seq:${installId}`;
const typingKey = (installId: string, channelId: string, userId: string) =>
  `typing:${installId}\0${channelId}\0${userId}`;

export function appTopic(installId: string): Topic {
  return `app:${installId}` as Topic;
}

function installIdFromTopic(topic: Topic): string {
  const parsed = parseTopic(topic);
  if (!parsed || parsed.namespace !== "app" || !parsed.rest) {
    throw new Error("invalid app topic");
  }
  return parsed.rest;
}

/**
 * Resolve the instance for an install the caller can access.
 * Topic grammar is install-scoped only (CF-1); take the first accessible
 * instance (managed installs are typically one).
 */
async function resolveAccessibleInstance(
  workspaceId: string,
  installId: string,
  userId: string,
): Promise<{ instanceId: string }> {
  const instances = await listInstances(workspaceId, installId);
  // Prefer newest when an install has multiple instances (topic is install-scoped).
  const newestFirst = [...instances].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt) || b.instanceId.localeCompare(a.instanceId),
  );
  for (const inst of newestFirst) {
    try {
      await assertInstanceAccess(workspaceId, installId, inst.instanceId, userId);
      return { instanceId: inst.instanceId };
    } catch {
      // try next
    }
  }
  throw new Error(`Not found: instance for install ${installId}`);
}

function chatScope(conn: Conn, installId: string, instanceId: string): ChatScope {
  return {
    workspaceId: conn.workspaceId,
    installId,
    instanceId,
    userId: conn.userId,
  };
}

export type AppTopicsHandler = NamespaceHandler & {
  /**
   * Test-only: overwrite the sync readable-channel set (stale-subscription
   * flip without a records round-trip). Production revocation refreshes via
   * `{action:"channel-membership"}` → `canReadChannel`.
   */
  setReadableChannelsForTest(connId: string, channelIds: Iterable<string>): void;
};

export function createAppTopicsHandler(broker: RealtimeBroker): AppTopicsHandler {
  /**
   * Sync membership snapshot for `authorize?` (F5 D4). NamespaceStore is
   * async-only, so the delivery path cannot await it — mirror into this map
   * and invalidate on channel-membership (briefs/deviations.md D2).
   */
  const authByConn = new Map<string, ConnAuth>();
  /** Live connections by id — needed to refresh auth after membership events. */
  const connsById = new Map<string, Conn>();
  let pending: PendingFanout | null = null;

  function ns(workspaceId: string): NamespaceStore {
    return broker.storeFor(workspaceId, "app");
  }

  function fanout(
    workspaceId: string,
    topic: Topic,
    body: ChatRealtimeEvent,
    channelId?: string,
  ): void {
    pending = { channelId };
    try {
      broker.publishToTopic(workspaceId, topic, body);
    } finally {
      pending = null;
    }
  }

  async function loadRoster(
    workspaceId: string,
    installId: string,
  ): Promise<Array<{ sub: string; lastActive: string }>> {
    const entries = await ns(workspaceId).list<StoredMember>(memberPrefix(installId));
    const out: Array<{ sub: string; lastActive: string }> = [];
    for (const [key, value] of entries) {
      const sub = key.slice(memberPrefix(installId).length);
      out.push({ sub, lastActive: value.lastActive });
    }
    return out;
  }

  async function buildReadableChannels(
    scope: ChatScope,
    channels: Channel[],
  ): Promise<Set<string>> {
    const readable = new Set<string>();
    for (const ch of channels) {
      const ok = await canReadChannel(scope.userId, scope.installId, ch.id, {
        workspaceId: scope.workspaceId,
        instanceId: scope.instanceId,
      });
      if (ok) readable.add(ch.id);
    }
    return readable;
  }

  async function cacheAuth(
    conn: Conn,
    installId: string,
    instanceId: string,
    channelIds: Set<string>,
  ): Promise<void> {
    authByConn.set(conn.id, { installId, instanceId, channelIds });
    await ns(conn.workspaceId).set(authKey(conn.id), {
      installId,
      instanceId,
      channelIds: [...channelIds],
    });
  }

  async function refreshAuth(conn: Conn): Promise<void> {
    const current = authByConn.get(conn.id);
    if (!current) return;
    const scope = chatScope(conn, current.installId, current.instanceId);
    const channels = await listChannels(scope);
    const channelIds = await buildReadableChannels(scope, channels);
    await cacheAuth(conn, current.installId, current.instanceId, channelIds);
  }

  async function refreshAuthForInstall(
    workspaceId: string,
    installId: string,
  ): Promise<void> {
    const refreshes: Promise<void>[] = [];
    for (const [connId, auth] of authByConn) {
      if (auth.installId !== installId) continue;
      const conn = connsById.get(connId);
      if (!conn || conn.workspaceId !== workspaceId) continue;
      refreshes.push(refreshAuth(conn));
    }
    await Promise.all(refreshes);
  }

  async function emitPresence(workspaceId: string, installId: string): Promise<void> {
    fanout(workspaceId, appTopic(installId), {
      kind: "presence",
      roster: await loadRoster(workspaceId, installId),
    });
  }

  async function setPresence(conn: Conn, installId: string): Promise<void> {
    const now = new Date().toISOString();
    const store = ns(conn.workspaceId);
    const prev = await store.get<StoredFocus>(focusKey(conn.id));
    if (prev && prev.installId !== installId) {
      await clearPresence(conn);
    }

    await store.set(focusKey(conn.id), { installId, lastActive: now });

    const key = memberKey(installId, conn.userId);
    const existing = await store.get<StoredMember>(key);
    if (!existing) {
      await store.set(key, { connIds: [conn.id], lastActive: now });
      await emitPresence(conn.workspaceId, installId);
      return;
    }

    const connIds = existing.connIds.includes(conn.id)
      ? existing.connIds
      : [...existing.connIds, conn.id];
    await store.set(key, { connIds, lastActive: now });
    await emitPresence(conn.workspaceId, installId);
  }

  async function clearPresence(conn: Conn): Promise<void> {
    const store = ns(conn.workspaceId);
    const focus = await store.get<StoredFocus>(focusKey(conn.id));
    if (!focus) return;
    await store.delete(focusKey(conn.id));

    const key = memberKey(focus.installId, conn.userId);
    const membership = await store.get<StoredMember>(key);
    if (!membership) return;

    const connIds = membership.connIds.filter((id) => id !== conn.id);
    if (connIds.length > 0) {
      await store.set(key, { connIds, lastActive: membership.lastActive });
      return;
    }

    await store.delete(key);
    await emitPresence(conn.workspaceId, focus.installId);
  }

  async function setTyping(conn: Conn, installId: string, channelId: string): Promise<void> {
    const auth = authByConn.get(conn.id);
    if (!auth || !auth.channelIds.has(channelId)) {
      throw new Error(`Not found: channel ${channelId}`);
    }
    await ns(conn.workspaceId).set(typingKey(installId, channelId, conn.userId), {
      channelId,
      sub: conn.userId,
      expiresAt: Date.now() + 4_000,
    });
    fanout(
      conn.workspaceId,
      appTopic(installId),
      { kind: "typing", channelId, sub: conn.userId },
      channelId,
    );
  }

  const handler: AppTopicsHandler = {
    namespace: "app",

    async onSubscribe(conn, topic) {
      const installId = installIdFromTopic(topic);
      const { instanceId } = await resolveAccessibleInstance(
        conn.workspaceId,
        installId,
        conn.userId,
      );
      await assertInstanceAccess(conn.workspaceId, installId, instanceId, conn.userId);

      connsById.set(conn.id, conn);
      const scope = chatScope(conn, installId, instanceId);
      const channels = await listChannels(scope);
      const channelIds = await buildReadableChannels(scope, channels);
      await cacheAuth(conn, installId, instanceId, channelIds);
      await setPresence(conn, installId);

      return {
        body: {
          channels,
          presence: await loadRoster(conn.workspaceId, installId),
          instanceId,
        },
      };
    },

    async onPublish(conn, topic, body) {
      const installId = installIdFromTopic(topic);
      const auth = authByConn.get(conn.id);
      if (!auth || auth.installId !== installId) {
        throw new Error(`Not found: instance for install ${installId}`);
      }
      connsById.set(conn.id, conn);

      const parsed = publishSchema.safeParse(body);
      if (!parsed.success) {
        throw new Error(
          'app body must be {action:"message"|"typing"|"presence"|"channel-membership", ...}',
        );
      }

      const action = parsed.data;
      if (action.action === "message") {
        const instanceId = action.instanceId ?? auth.instanceId;
        const scope = chatScope(conn, installId, instanceId);
        const message = await postMessage(scope, {
          channelId: action.channelId,
          body: action.body,
          parentId: action.parentId,
        });
        const store = ns(conn.workspaceId);
        const prev = (await store.get<number>(seqKey(installId))) ?? 0;
        const seq = prev + 1;
        await store.set(seqKey(installId), seq);
        fanout(
          conn.workspaceId,
          topic,
          {
            kind: "message",
            channelId: message.channelId,
            recordId: message.id,
            seq,
            hint: {
              author: message.author,
              preview: message.body.slice(0, 120),
            },
          },
          message.channelId,
        );
        return;
      }

      if (action.action === "typing") {
        await setTyping(conn, installId, action.channelId);
        return;
      }

      if (action.action === "presence") {
        await setPresence(conn, installId);
        return;
      }

      // channel-membership — control/priority class; refresh caches then fan out.
      await refreshAuthForInstall(conn.workspaceId, installId);
      fanout(
        conn.workspaceId,
        topic,
        { kind: "channel-membership", channelId: action.channelId },
        action.channelId,
      );
    },

    async onDisconnect(conn) {
      await clearPresence(conn);
      authByConn.delete(conn.id);
      connsById.delete(conn.id);
      await ns(conn.workspaceId).delete(authKey(conn.id));
    },

    authorize(conn, topic) {
      let installId: string;
      try {
        installId = installIdFromTopic(topic);
      } catch {
        return false;
      }
      const auth = authByConn.get(conn.id);
      if (!auth || auth.installId !== installId) return false;

      const channelId = pending?.channelId;
      // Instance-level events (presence roster) — any subscribed participant.
      if (!channelId) return true;
      return auth.channelIds.has(channelId);
    },

    setReadableChannelsForTest(connId, channelIds) {
      const auth = authByConn.get(connId);
      if (!auth) return;
      auth.channelIds = new Set(channelIds);
    },
  };

  return handler;
}
