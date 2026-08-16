/**
 * Socket backpressure — covers every scenario in
 * openspec/changes/iw9-f5-broker-spec/specs/realtime-socket/spec.md
 * (all four ADDED requirements: Bounded outbound queue, Priority control
 * channel, Batch flush, Slow-client disconnect).
 *
 * Tests drive OutboundChannel directly through the exported class and a
 * lightweight WsLike mock, so they run synchronously without a real socket.
 * The full-stack slow-client scenario additionally exercises the real
 * attachRealtime path to confirm the 1013 close code reaches the client and
 * broker.removeConnection is called exactly like any other disconnect.
 */

import { createServer, type Server as HttpServer } from "node:http";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { WebSocket } from "ws";
import { createBroker, type NamespaceHandler } from "../src/realtime/broker.js";
import {
  attachRealtime,
  OutboundChannel,
  REALTIME_PATH,
  REALTIME_SUBPROTOCOL,
  type RealtimeHandle,
  type WsLike,
} from "../src/realtime/socket.js";
import type { ServerMessage } from "../src/realtime/protocol.js";
import type { Principal } from "../src/middleware/auth.js";

// ---------------------------------------------------------------------------
// Mock WebSocket
// ---------------------------------------------------------------------------

interface MockWs extends WsLike {
  sent: string[];       // JSON strings written via send()
  closed: Array<{ code: number; reason: string }>;
}

function makeMockWs(bufferedAmount = 0, open = true): MockWs {
  return {
    readyState: open ? 1 /* OPEN */ : 3 /* CLOSED */,
    OPEN: 1,
    bufferedAmount,
    sent: [],
    closed: [],
    send(data: string) { this.sent.push(data); },
    close(code: number, reason: string) {
      this.closed.push({ code, reason });
      this.readyState = 3;
    },
  };
}

function parseSent(ws: MockWs): ServerMessage[] {
  return ws.sent.map((s) => JSON.parse(s) as ServerMessage);
}

// ---------------------------------------------------------------------------
// Helpers for real-socket tests
// ---------------------------------------------------------------------------

function principal(overrides: Partial<Principal> = {}): Principal {
  return {
    sub: "user-a",
    workspaceId: "ws-a",
    role: "member",
    groupIds: [],
    ...overrides,
  };
}

async function listen(): Promise<{ server: HttpServer; port: number }> {
  const server = createServer((_req, res) => {
    res.writeHead(426);
    res.end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  if (!addr || typeof addr === "string") throw new Error("no port");
  return { server, port: addr.port };
}

function openWs(port: number): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `ws://127.0.0.1:${port}${REALTIME_PATH}`,
      [REALTIME_SUBPROTOCOL, "bearer.test-token"],
    );
    ws.once("open", () => resolve(ws));
    ws.once("error", reject);
    ws.once("unexpected-response", (_req, res) => {
      reject(Object.assign(new Error(`upgrade ${res.statusCode}`), { statusCode: res.statusCode }));
    });
  });
}

function waitClose(ws: WebSocket, timeoutMs = 3_000): Promise<{ code: number }> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("close timeout")), timeoutMs);
    ws.once("close", (code) => { clearTimeout(timer); resolve({ code }); });
  });
}

function collectMessages(ws: WebSocket): ServerMessage[] {
  const msgs: ServerMessage[] = [];
  ws.on("message", (data) => {
    msgs.push(JSON.parse(data.toString()) as ServerMessage);
  });
  return msgs;
}

// ---------------------------------------------------------------------------
// Unit tests via OutboundChannel mock
// ---------------------------------------------------------------------------

describe("OutboundChannel (unit)", () => {
  describe("Bounded outbound queue — full queue drops oldest events", () => {
    it("drops the oldest event when queue is at capacity, admits the newest", () => {
      // Scenario: full queue drops oldest events.
      // WHEN a connection's outbound queue is at capacity and a new event is enqueued
      // THEN the oldest queued event frame is dropped, the new event is enqueued,
      //      and the connection open state is unaffected.
      const ws = makeMockWs();
      // Queue limit = 3; flush interval very long so events stay queued.
      const ch = new OutboundChannel(ws, 3, 1 << 20, 3, 3_600_000);
      try {
        const ev = (n: number): ServerMessage => ({
          type: "event",
          topic: "relay:x",
          body: { n },
        });

        ch.send(ev(1)); // queue: [1]
        ch.send(ev(2)); // queue: [1,2]
        ch.send(ev(3)); // queue: [1,2,3] — full
        ch.send(ev(4)); // oldest (1) dropped; queue: [2,3,4]

        // Nothing flushed yet (long timer).
        expect(ws.sent).toHaveLength(0);
        // Connection still open.
        expect(ws.readyState).toBe(ws.OPEN);

        // Flush with healthy buffer.
        ws.bufferedAmount = 0;
        ch.flushNow();

        const frames = parseSent(ws);
        expect(frames).toHaveLength(3);
        expect(frames.map((f) => (f as { body: { n: number } }).body.n)).toEqual([2, 3, 4]);
      } finally {
        ch.destroy();
      }
    });

    it("keeps the connection open after a drop event", () => {
      const ws = makeMockWs();
      const ch = new OutboundChannel(ws, 1, 1 << 20, 3, 3_600_000);
      try {
        ch.send({ type: "event", topic: "relay:x", body: "first" });
        ch.send({ type: "event", topic: "relay:x", body: "second" }); // drops "first"

        expect(ws.closed).toHaveLength(0);
        expect(ws.readyState).toBe(ws.OPEN);
      } finally {
        ch.destroy();
      }
    });
  });

  describe("Priority control channel — control frame passes a saturated queue", () => {
    it("delivers subscribed immediately while event queue is full", () => {
      // Scenario: control frame passes a saturated queue.
      // WHEN a connection's event queue is full and the connection completes a new subscribe
      // THEN the subscribed frame is delivered without waiting behind or being dropped.
      const ws = makeMockWs();
      const ch = new OutboundChannel(ws, 2, 1 << 20, 3, 3_600_000);
      try {
        // Fill the event queue.
        ch.send({ type: "event", topic: "relay:t", body: 1 });
        ch.send({ type: "event", topic: "relay:t", body: 2 });

        // No flush yet — events are queued, nothing sent.
        expect(ws.sent).toHaveLength(0);

        // Send a control frame (subscribed) — must arrive immediately.
        ch.send({ type: "subscribed", topic: "relay:t" });

        expect(ws.sent).toHaveLength(1);
        expect(JSON.parse(ws.sent[0]!)).toMatchObject({ type: "subscribed", topic: "relay:t" });
      } finally {
        ch.destroy();
      }
    });

    it("delivers error frame immediately without queueing", () => {
      const ws = makeMockWs();
      const ch = new OutboundChannel(ws, 1, 1 << 20, 3, 3_600_000);
      try {
        ch.send({ type: "event", topic: "relay:t", body: 1 });   // queued
        ch.send({ type: "error", code: "bad-message", message: "oops" }); // priority

        expect(ws.sent).toHaveLength(1);
        expect(JSON.parse(ws.sent[0]!)).toMatchObject({ type: "error", code: "bad-message" });
      } finally {
        ch.destroy();
      }
    });
  });

  describe("Batch flush of queued events — burst coalesced into batched writes", () => {
    it("flushes multiple events in enqueue order in a single flush", () => {
      // Scenario: burst coalesced into batched writes.
      // WHEN many events are published within one flush interval
      // THEN they are written in enqueue order in one or few flushes.
      const ws = makeMockWs(0);
      const ch = new OutboundChannel(ws, 10, 1 << 20, 3, 3_600_000);
      try {
        for (let i = 0; i < 5; i++) {
          ch.send({ type: "event", topic: "relay:t", body: { i } });
        }
        // All 5 queued; no writes yet.
        expect(ws.sent).toHaveLength(0);

        ch.flushNow();

        const frames = parseSent(ws);
        expect(frames).toHaveLength(5);
        // Verify enqueue order preserved.
        expect(frames.map((f) => (f as { body: { i: number } }).body.i)).toEqual([0, 1, 2, 3, 4]);
      } finally {
        ch.destroy();
      }
    });

    it("holds the queue while bufferedAmount exceeds high-water mark", () => {
      const ws = makeMockWs(2 << 20 /* 2 MiB */);
      const ch = new OutboundChannel(ws, 10, 1 << 20 /* 1 MiB HWM */, 3, 3_600_000);
      try {
        ch.send({ type: "event", topic: "relay:t", body: "x" });
        ch.flushNow(); // buffer full — should hold
        expect(ws.sent).toHaveLength(0);

        // Simulate buffer draining.
        ws.bufferedAmount = 0;
        ch.flushNow();
        expect(ws.sent).toHaveLength(1);
      } finally {
        ch.destroy();
      }
    });
  });

  describe("Slow-client disconnect", () => {
    it("closes with 1013 after N consecutive full-buffer flush attempts", () => {
      // Scenario: persistently slow client is disconnected.
      // WHEN a connection's outbound buffer remains full across N consecutive flush attempts
      // THEN the server closes it with code 1013.
      const ws = makeMockWs(2 << 20 /* always over HWM */);
      const N = 3;
      const ch = new OutboundChannel(ws, 10, 1 << 20, N, 3_600_000);
      try {
        ch.send({ type: "event", topic: "relay:t", body: "x" }); // something to flush

        ch.flushNow(); // consecutive = 1 (< N)
        expect(ws.closed).toHaveLength(0);

        ch.flushNow(); // consecutive = 2 (< N)
        expect(ws.closed).toHaveLength(0);

        ch.flushNow(); // consecutive = 3 = N → close
        expect(ws.closed).toHaveLength(1);
        expect(ws.closed[0]).toMatchObject({ code: 1013 });
      } finally {
        ch.destroy();
      }
    });

    it("resets the counter when buffer drains before N", () => {
      // Scenario: recovered client stays connected.
      // WHEN a connection's buffer fills, then drains before N consecutive flushes occur
      // THEN the counter resets and the connection remains open.
      const ws = makeMockWs(2 << 20);
      const N = 3;
      const ch = new OutboundChannel(ws, 10, 1 << 20, N, 3_600_000);
      try {
        ch.send({ type: "event", topic: "relay:t", body: "x" });

        ch.flushNow(); // consecutive = 1
        ch.flushNow(); // consecutive = 2 — still below N

        // Buffer drains before reaching N.
        ws.bufferedAmount = 0;
        ch.flushNow(); // drains queue; consecutive resets to 0

        // Connection still open.
        expect(ws.closed).toHaveLength(0);
        expect(ws.readyState).toBe(ws.OPEN);

        // Verify counter actually reset: 2 more full-buffer flushes should NOT close.
        ws.bufferedAmount = 2 << 20;
        ch.send({ type: "event", topic: "relay:t", body: "y" });
        ch.flushNow(); // consecutive = 1
        ch.flushNow(); // consecutive = 2 — still below N
        expect(ws.closed).toHaveLength(0);
      } finally {
        ch.destroy();
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Integration tests via real WebSocket + attachRealtime
// ---------------------------------------------------------------------------

describe("realtime-backpressure (integration)", () => {
  let server: HttpServer;
  let port: number;
  let handle: RealtimeHandle;

  afterEach(async () => {
    handle?.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(async () => {
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    const listened = await listen();
    server = listened.server;
    port = listened.port;
  });

  it("slow-client disconnect: 1013 close code observed by the client; broker notifies disconnect exactly as for any other close", async () => {
    // WHEN a connection's outbound buffer remains full across N consecutive flush attempts
    // THEN the server closes it with code 1013 and namespace handlers observe the disconnect
    //      as a normal close.
    //
    // Achieved by setting sendHighWaterMark: -1 so every flush attempt counts as
    // "buffer full" (ws.bufferedAmount >= 0 > -1 is always true), and using
    // maxFullBufferFlushes: 2 + a fast flushIntervalMs.

    const disconnected: string[] = [];
    const broker = createBroker();
    const trackHandler: NamespaceHandler = {
      namespace: "relay",
      onSubscribe() { return Promise.resolve({}); },
      onPublish() {},
      onDisconnect(conn) { disconnected.push(conn.id); },
    };
    broker.registerNamespace(trackHandler);

    handle = attachRealtime(server, {
      broker,
      authenticate: async (_req, protocols) => {
        if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;
        return { principal: principal() };
      },
      // sendHighWaterMark: -1 → ws.bufferedAmount (≥0) > -1 is always true.
      sendHighWaterMark: -1,
      maxFullBufferFlushes: 2,
      flushIntervalMs: 20,
      outboundQueueLimit: 256,
    });

    const ws = await openWs(port);

    // Subscribe so there is something to flush (subscribe goes on priority path;
    // wait for it before we start checking close).
    ws.send(JSON.stringify({ type: "subscribe", topic: "relay:t" }));
    await new Promise<void>((resolve) => {
      ws.once("message", () => resolve());
    });

    // Enqueue an event frame so the flusher has something to flush (an empty
    // queue resets the counter; we need at least one queued event per flush).
    // We keep re-enqueuing via a publisher so each flush sees something queued.
    const enqueueInterval = setInterval(() => {
      broker.publishToTopic("ws-a", "relay:t", { x: 1 });
    }, 5);

    const { code } = await waitClose(ws, 3_000);
    clearInterval(enqueueInterval);

    expect(code).toBe(1013);

    // Broker should have called onDisconnect exactly once.
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    expect(disconnected).toHaveLength(1);
  });
});
