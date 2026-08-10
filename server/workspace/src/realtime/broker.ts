/**
 * In-process realtime broker: per-workspace connection/subscription maps and
 * namespace dispatch. Single Fargate task — no cross-node fan-out.
 *
 * Delivery semantics (spec "No ordering or exactly-once assumptions"): the
 * broker guarantees neither cross-topic nor cross-publisher ordering within a
 * topic, nor exactly-once delivery. An event MAY be dropped (slow-client
 * backpressure, disconnect) or observed after a newer event from a different
 * publisher. Handlers and clients MUST therefore be able to reconcile their
 * state from a fresh subscribe snapshot alone — the `subscribed` body is the
 * recovery mechanism, not event replay.
 */

import {
  parseTopic,
  RESERVED_NAMESPACES,
  type ClientMessage,
  type ErrorCode,
  type ServerMessage,
  type Topic,
} from "./protocol.js";
import { createNamespaceStoreFactory, type NamespaceStore, type NamespaceStoreFactory } from "./store.js";

export interface Conn {
  id: string;
  userId: string;
  workspaceId: string;
  send(msg: ServerMessage): void;
}

export interface NamespaceHandler {
  namespace: string;
  /** Awaited; reject → subscription rollback + {code:"bad-topic"}. */
  onSubscribe(conn: Conn, topic: Topic): Promise<{ body?: unknown }>;
  /** Awaited; reject → {code:"bad-body"}. */
  onPublish(conn: Conn, topic: Topic, body: unknown): void | Promise<void>;
  /** Fire-and-forget; errors swallowed. */
  onDisconnect(conn: Conn): void | Promise<void>;
  /**
   * Invariant 7: evaluated per (event, subscriber) inside every fan-out path,
   * after workspace scoping. Absent = allow. Must be answerable synchronously
   * (cache slow auth data in the namespace store).
   */
  authorize?(conn: Conn, topic: Topic): boolean;
}

export interface RealtimeBroker {
  registerNamespace(handler: NamespaceHandler): void;
  addConnection(conn: Conn): void;
  removeConnection(conn: Conn): void;
  handleClientMessage(conn: Conn, msg: ClientMessage): Promise<void>;
  /** Fan-out an event to all subscribers of `topic` in `workspaceId`, excluding `except`. */
  publishToTopic(
    workspaceId: string,
    topic: Topic,
    body: unknown,
    opts?: { except?: Conn },
  ): void;
  /** Broker-owned ephemeral state, scoped (workspaceId, namespace). */
  storeFor(workspaceId: string, namespace: string): NamespaceStore;
}

interface WorkspaceState {
  connections: Map<string, Conn>;
  /** topic → set of connection ids */
  subscriptions: Map<string, Set<string>>;
  /** connection id → set of topics */
  connTopics: Map<string, Set<string>>;
}

export function createBroker(opts?: {
  storeFactory?: NamespaceStoreFactory;
}): RealtimeBroker {
  const handlers = new Map<string, NamespaceHandler>();
  const workspaces = new Map<string, WorkspaceState>();
  const storeFactory = opts?.storeFactory ?? createNamespaceStoreFactory();

  function wsState(workspaceId: string): WorkspaceState {
    let state = workspaces.get(workspaceId);
    if (!state) {
      state = {
        connections: new Map(),
        subscriptions: new Map(),
        connTopics: new Map(),
      };
      workspaces.set(workspaceId, state);
    }
    return state;
  }

  function dropEmptyWorkspace(workspaceId: string, state: WorkspaceState): void {
    if (state.connections.size === 0 && state.subscriptions.size === 0) {
      workspaces.delete(workspaceId);
      storeFactory.dropWorkspace(workspaceId);
    }
  }

  function sendError(conn: Conn, code: ErrorCode, message: string, topic?: Topic): void {
    conn.send({ type: "error", code, message, ...(topic ? { topic } : {}) });
  }

  function resolveHandler(conn: Conn, topic: Topic): NamespaceHandler | null {
    const parsed = parseTopic(topic);
    if (!parsed) {
      sendError(conn, "bad-message", "invalid topic", topic);
      return null;
    }
    if (RESERVED_NAMESPACES.has(parsed.namespace)) {
      sendError(
        conn,
        "reserved-namespace",
        `namespace "${parsed.namespace}" is reserved`,
        topic,
      );
      return null;
    }
    const handler = handlers.get(parsed.namespace);
    if (!handler) {
      sendError(
        conn,
        "unknown-namespace",
        `unknown namespace "${parsed.namespace}"`,
        topic,
      );
      return null;
    }
    return handler;
  }

  return {
    registerNamespace(handler) {
      handlers.set(handler.namespace, handler);
    },

    addConnection(conn) {
      const state = wsState(conn.workspaceId);
      state.connections.set(conn.id, conn);
      state.connTopics.set(conn.id, new Set());
    },

    removeConnection(conn) {
      const state = workspaces.get(conn.workspaceId);
      if (!state) return;

      const topics = state.connTopics.get(conn.id);
      if (topics) {
        for (const topic of topics) {
          const subs = state.subscriptions.get(topic);
          if (!subs) continue;
          subs.delete(conn.id);
          if (subs.size === 0) state.subscriptions.delete(topic);
        }
      }
      state.connTopics.delete(conn.id);
      state.connections.delete(conn.id);

      for (const handler of handlers.values()) {
        try {
          Promise.resolve(handler.onDisconnect(conn)).catch(() => {
            // Handler errors on disconnect must not block other handlers.
          });
        } catch {
          // Synchronous throw must not block other handlers either.
        }
      }

      dropEmptyWorkspace(conn.workspaceId, state);
    },

    async handleClientMessage(conn, msg) {
      const state = wsState(conn.workspaceId);

      if (msg.type === "unsubscribe") {
        const topics = state.connTopics.get(conn.id);
        if (!topics?.has(msg.topic)) return;
        topics.delete(msg.topic);
        const subs = state.subscriptions.get(msg.topic);
        if (subs) {
          subs.delete(conn.id);
          if (subs.size === 0) state.subscriptions.delete(msg.topic);
        }
        return;
      }

      const handler = resolveHandler(conn, msg.topic);
      if (!handler) return;

      if (msg.type === "subscribe") {
        const topics = state.connTopics.get(conn.id) ?? new Set<string>();
        state.connTopics.set(conn.id, topics);
        const already = topics.has(msg.topic);
        if (!already) {
          topics.add(msg.topic);
          let subs = state.subscriptions.get(msg.topic);
          if (!subs) {
            subs = new Set();
            state.subscriptions.set(msg.topic, subs);
          }
          subs.add(conn.id);
        }
        try {
          const result = await handler.onSubscribe(conn, msg.topic);
          conn.send({
            type: "subscribed",
            topic: msg.topic,
            ...(result.body !== undefined ? { body: result.body } : {}),
          });
        } catch (err) {
          if (!already) {
            topics.delete(msg.topic);
            const subs = state.subscriptions.get(msg.topic);
            if (subs) {
              subs.delete(conn.id);
              if (subs.size === 0) state.subscriptions.delete(msg.topic);
            }
          }
          const message = err instanceof Error ? err.message : "subscribe failed";
          sendError(conn, "bad-topic", message, msg.topic);
        }
        return;
      }

      try {
        await handler.onPublish(conn, msg.topic, msg.body);
      } catch (err) {
        const message = err instanceof Error ? err.message : "publish failed";
        sendError(conn, "bad-body", message, msg.topic);
      }
    },

    publishToTopic(workspaceId, topic, body, opts) {
      const state = workspaces.get(workspaceId);
      if (!state) return;
      const subs = state.subscriptions.get(topic);
      if (!subs) return;
      const parsed = parseTopic(topic);
      const handler = parsed ? handlers.get(parsed.namespace) : undefined;
      const event: ServerMessage = { type: "event", topic, body };
      for (const connId of subs) {
        if (opts?.except && connId === opts.except.id) continue;
        const conn = state.connections.get(connId);
        if (!conn) continue;
        if (handler?.authorize && !handler.authorize(conn, topic)) continue;
        conn.send(event);
      }
    },

    storeFor(workspaceId, namespace) {
      return storeFactory.storeFor(workspaceId, namespace);
    },
  };
}
