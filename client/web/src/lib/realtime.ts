/**
 * RealtimeClient — transport + protocol client for `/api/gateway/ws`.
 *
 * Mirrors the server envelope types locally (tech-plan Open Question 1).
 * No presence semantics here — that lives in `features/presence/` (stream 4).
 */

import { getAccessTokenSync } from "./auth";
import { GATEWAY_BASE } from "./gateway";

export type Topic = `${string}:${string}`;

export type ClientMessage =
  | { type: "subscribe"; topic: Topic }
  | { type: "unsubscribe"; topic: Topic }
  | { type: "publish"; topic: Topic; body: unknown };

export type ServerMessage =
  | { type: "subscribed"; topic: Topic; body?: unknown }
  | { type: "event"; topic: Topic; body: unknown }
  | {
      type: "error";
      code:
        | "bad-message"
        | "unknown-namespace"
        | "reserved-namespace"
        | "bad-topic"
        | "bad-body";
      message: string;
      topic?: Topic;
    };

export type RealtimeState = "connecting" | "open" | "closed";

export interface RealtimeClient {
  subscribe(
    topic: string,
    onEvent: (body: unknown) => void,
    onSnapshot?: (body: unknown) => void,
  ): () => void;
  publish(topic: string, body: unknown): void;
  readonly state: RealtimeState;
  onStateChange(cb: (s: RealtimeState) => void): () => void;
  /** Tear down the socket and stop reconnecting. */
  close(): void;
}

interface LiveSub {
  onEvent: (body: unknown) => void;
  onSnapshot?: (body: unknown) => void;
}

const SUBPROTOCOL = "aprovan.v1";
const MIN_BACKOFF_MS = 1_000;
const MAX_BACKOFF_MS = 30_000;

/** Derive `wss…/api/gateway/ws` (or relative-host) from GATEWAY_BASE. */
export function realtimeUrlFromGatewayBase(
  base: string = GATEWAY_BASE,
  loc: Pick<Location, "protocol" | "host"> = typeof location !== "undefined"
    ? location
    : { protocol: "http:", host: "localhost" },
): string {
  const trimmed = base.replace(/\/$/, "");
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return `${trimmed.replace(/^http/, "ws")}/ws`;
  }
  const proto = loc.protocol === "https:" ? "wss:" : "ws:";
  return `${proto}//${loc.host}${trimmed}/ws`;
}

function jitteredBackoff(attempt: number): number {
  const exp = Math.min(MAX_BACKOFF_MS, MIN_BACKOFF_MS * 2 ** attempt);
  return Math.floor(exp * (0.5 + Math.random() * 0.5));
}

export interface CreateRealtimeClientOptions {
  url?: string;
  getToken?: () => string | null | undefined;
  /** Injectable WebSocket ctor for tests. */
  WebSocketImpl?: typeof WebSocket;
}

export function createRealtimeClient(
  options: CreateRealtimeClientOptions = {},
): RealtimeClient {
  const url = options.url ?? realtimeUrlFromGatewayBase();
  const getToken = options.getToken ?? getAccessTokenSync;
  const WS = options.WebSocketImpl ?? WebSocket;

  const subscriptions = new Map<string, Set<LiveSub>>();
  const stateListeners = new Set<(s: RealtimeState) => void>();

  let state: RealtimeState = "closed";
  let socket: WebSocket | null = null;
  let attempt = 0;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  let stopped = false;

  function setState(next: RealtimeState): void {
    if (state === next) return;
    state = next;
    for (const cb of stateListeners) cb(state);
  }

  function send(msg: ClientMessage): void {
    if (socket?.readyState === WS.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  }

  function resubscribeAll(): void {
    for (const topic of subscriptions.keys()) {
      send({ type: "subscribe", topic: topic as Topic });
    }
  }

  function handleServerMessage(msg: ServerMessage): void {
    if (msg.type === "subscribed") {
      const set = subscriptions.get(msg.topic);
      if (!set) return;
      for (const sub of set) {
        sub.onSnapshot?.(msg.body);
      }
      return;
    }
    if (msg.type === "event") {
      const set = subscriptions.get(msg.topic);
      if (!set) return;
      for (const sub of set) {
        sub.onEvent(msg.body);
      }
    }
  }

  function scheduleReconnect(): void {
    if (stopped || reconnectTimer !== undefined) return;
    const delay = jitteredBackoff(attempt);
    attempt += 1;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined;
      connect();
    }, delay);
  }

  function connect(): void {
    if (stopped) return;
    if (socket && (socket.readyState === WS.OPEN || socket.readyState === WS.CONNECTING)) {
      return;
    }

    setState("connecting");
    const token = getToken() ?? "";
    const protocols = token
      ? [SUBPROTOCOL, `bearer.${token}`]
      : [SUBPROTOCOL];

    let ws: WebSocket;
    try {
      ws = new WS(url, protocols);
    } catch {
      setState("closed");
      scheduleReconnect();
      return;
    }
    socket = ws;

    ws.addEventListener("open", () => {
      attempt = 0;
      setState("open");
      resubscribeAll();
    });

    ws.addEventListener("message", (ev) => {
      if (typeof ev.data !== "string") return;
      let parsed: unknown;
      try {
        parsed = JSON.parse(ev.data);
      } catch {
        return;
      }
      if (
        parsed &&
        typeof parsed === "object" &&
        "type" in parsed &&
        (parsed as { type: string }).type
      ) {
        handleServerMessage(parsed as ServerMessage);
      }
    });

    ws.addEventListener("close", () => {
      if (socket === ws) socket = null;
      setState("closed");
      if (!stopped) scheduleReconnect();
    });

    ws.addEventListener("error", () => {
      // close follows; reconnect scheduled there
    });
  }

  // Kick off immediately.
  connect();

  return {
    get state() {
      return state;
    },

    subscribe(topic, onEvent, onSnapshot) {
      const entry: LiveSub = { onEvent, onSnapshot };
      let set = subscriptions.get(topic);
      if (!set) {
        set = new Set();
        subscriptions.set(topic, set);
      }
      const first = set.size === 0;
      set.add(entry);
      if (first) {
        send({ type: "subscribe", topic: topic as Topic });
      }
      return () => {
        const cur = subscriptions.get(topic);
        if (!cur) return;
        cur.delete(entry);
        if (cur.size === 0) {
          subscriptions.delete(topic);
          send({ type: "unsubscribe", topic: topic as Topic });
        }
      };
    },

    publish(topic, body) {
      if (state !== "open") return;
      send({ type: "publish", topic: topic as Topic, body });
    },

    onStateChange(cb) {
      stateListeners.add(cb);
      return () => {
        stateListeners.delete(cb);
      };
    },

    close() {
      stopped = true;
      if (reconnectTimer !== undefined) {
        clearTimeout(reconnectTimer);
        reconnectTimer = undefined;
      }
      socket?.close();
      socket = null;
      setState("closed");
    },
  };
}
