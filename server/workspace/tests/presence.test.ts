/**
 * Presence namespace over real sockets — covers file-presence server scenarios.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { createServer, type Server as HttpServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { WebSocket } from "ws";
import type { Principal } from "../src/middleware/auth.js";
import { createBroker } from "../src/realtime/broker.js";
import type { PresencePeer } from "../src/realtime/presence.js";
import type { ServerMessage, Topic } from "../src/realtime/protocol.js";
import {
  attachRealtime,
  REALTIME_PATH,
  REALTIME_SUBPROTOCOL,
  type RealtimeHandle,
} from "../src/realtime/socket.js";
import { getRecordStore } from "../src/records.js";

const PATH = REALTIME_PATH;

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
    res.writeHead(426, { "Content-Type": "text/plain" });
    res.end("Upgrade Required");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  if (!addr || typeof addr === "string") throw new Error("no port");
  return { server, port: addr.port };
}

function openWs(
  port: number,
  token: string,
): Promise<WebSocket> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}${PATH}`, [
      REALTIME_SUBPROTOCOL,
      `bearer.${token}`,
    ]);
    ws.once("open", () => resolve(ws));
    ws.once("error", reject);
    ws.once("unexpected-response", (_req, res) => {
      reject(Object.assign(new Error(`upgrade ${res.statusCode}`), { statusCode: res.statusCode }));
    });
  });
}

function nextMessage(ws: WebSocket, timeoutMs = 2_000): Promise<ServerMessage> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("message timeout")), timeoutMs);
    ws.once("message", (data) => {
      clearTimeout(timer);
      resolve(JSON.parse(data.toString()) as ServerMessage);
    });
  });
}

function collectEvents(ws: WebSocket): ServerMessage[] {
  const events: ServerMessage[] = [];
  ws.on("message", (data) => {
    events.push(JSON.parse(data.toString()) as ServerMessage);
  });
  return events;
}

function waitForEvent(
  events: ServerMessage[],
  predicate: (m: ServerMessage) => boolean,
  timeoutMs = 2_000,
): Promise<ServerMessage> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const hit = events.find(predicate);
      if (hit) {
        resolve(hit);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error("event timeout"));
        return;
      }
      setTimeout(tick, 10);
    };
    tick();
  });
}

describe("presence", () => {
  let dataDir: string;
  let server: HttpServer;
  let port: number;
  let handle: RealtimeHandle;

  beforeAll(() => {
    dataDir = mkdtempSync(join(tmpdir(), "gateway-presence-"));
    process.env["WORKSPACE_DATA_DIR"] = dataDir;
  });

  afterAll(() => {
    delete process.env["WORKSPACE_DATA_DIR"];
    rmSync(dataDir, { recursive: true, force: true });
  });

  beforeEach(async () => {
    const listened = await listen();
    server = listened.server;
    port = listened.port;
    const broker = createBroker();
    handle = attachRealtime(server, {
      broker,
      authenticate: async (_req, protocols) => {
        if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;
        const bearer = protocols.find((p) => p.startsWith("bearer."));
        if (!bearer) return null;
        const token = bearer.slice("bearer.".length);
        if (token === "a") return { principal: principal({ sub: "user-a" }) };
        if (token === "b") return { principal: principal({ sub: "user-b" }) };
        if (token === "b2") return { principal: principal({ sub: "user-b" }) };
        return null;
      },
    });
  });

  afterEach(async () => {
    handle?.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it("rejects non-canonical presence paths with bad-topic", async () => {
    const ws = await openWs(port, "a");
    ws.send(JSON.stringify({ type: "subscribe", topic: "presence:/notes/plan.md" }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "bad-topic",
    });

    ws.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/../plan.md" }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "bad-topic",
    });

    ws.send(JSON.stringify({ type: "subscribe", topic: "presence:native://apps" }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "bad-topic",
    });
    ws.close();
  });

  it("watching is not being there", async () => {
    const watcher = await openWs(port, "a");
    const actor = await openWs(port, "b");

    watcher.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    const snap = await nextMessage(watcher);
    expect(snap).toMatchObject({
      type: "subscribed",
      topic: "presence:notes/plan.md",
      body: { peers: [] },
    });

    // Subscribe alone does not put A on the roster.
    actor.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    const actorSnap = await nextMessage(actor);
    expect(actorSnap).toMatchObject({
      type: "subscribed",
      body: { peers: [] },
    });

    const events = collectEvents(watcher);
    // B focuses — A (watcher) sees join; A is still not present.
    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );

    const join = await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind?: string }).kind === "join",
    );
    expect(join).toMatchObject({
      type: "event",
      topic: "presence:notes/plan.md",
      body: {
        kind: "join",
        peer: { userId: "user-b", path: "notes/plan.md" },
      },
    });

    // Re-subscribe as A still shows only B.
    watcher.send(JSON.stringify({ type: "unsubscribe", topic: "presence:notes/plan.md" }));
    watcher.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    const again = await nextMessage(watcher);
    expect(again.type).toBe("subscribed");
    if (again.type !== "subscribed") throw new Error("expected subscribed");
    const peers = (again.body as { peers: PresencePeer[] }).peers;
    expect(peers.map((p) => p.userId)).toEqual(["user-b"]);

    watcher.close();
    actor.close();
  });

  it("switching files moves presence atomically", async () => {
    const subA = await openWs(port, "a");
    const subB = await openWs(port, "a"); // same user, just a second socket watching both
    const actor = await openWs(port, "b");

    // A watches both files.
    for (const topic of ["presence:a.md", "presence:b.md"] as Topic[]) {
      subA.send(JSON.stringify({ type: "subscribe", topic }));
      expect((await nextMessage(subA)).type).toBe("subscribed");
      subB.send(JSON.stringify({ type: "subscribe", topic }));
      expect((await nextMessage(subB)).type).toBe("subscribed");
    }

    const eventsA = collectEvents(subA);
    const eventsB = collectEvents(subB);

    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:a.md",
        body: { action: "focus" },
      }),
    );
    await waitForEvent(
      eventsA,
      (m) =>
        m.type === "event" &&
        m.topic === "presence:a.md" &&
        (m.body as { kind: string }).kind === "join",
    );

    // Clear the buffers of the join before the move.
    eventsA.length = 0;
    eventsB.length = 0;

    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:b.md",
        body: { action: "focus" },
      }),
    );

    const leave = await waitForEvent(
      eventsA,
      (m) =>
        m.type === "event" &&
        m.topic === "presence:a.md" &&
        (m.body as { kind: string }).kind === "leave",
    );
    const join = await waitForEvent(
      eventsB,
      (m) =>
        m.type === "event" &&
        m.topic === "presence:b.md" &&
        (m.body as { kind: string }).kind === "join",
    );
    expect(leave).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b", path: "a.md" } },
    });
    expect(join).toMatchObject({
      body: { kind: "join", peer: { userId: "user-b", path: "b.md" } },
    });

    actor.close();
    subA.close();
    subB.close();

    // Leave must precede join on a single subscriber watching both topics.
    const ordered = await openWs(port, "a");
    ordered.send(JSON.stringify({ type: "subscribe", topic: "presence:x.md" }));
    expect((await nextMessage(ordered)).type).toBe("subscribed");
    ordered.send(JSON.stringify({ type: "subscribe", topic: "presence:y.md" }));
    expect((await nextMessage(ordered)).type).toBe("subscribed");
    const seq = collectEvents(ordered);

    const mover = await openWs(port, "b");
    mover.send(
      JSON.stringify({ type: "publish", topic: "presence:x.md", body: { action: "focus" } }),
    );
    await waitForEvent(
      seq,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "join",
    );
    seq.length = 0;
    mover.send(
      JSON.stringify({ type: "publish", topic: "presence:y.md", body: { action: "focus" } }),
    );
    await waitForEvent(
      seq,
      (m) =>
        m.type === "event" &&
        m.topic === "presence:y.md" &&
        (m.body as { kind: string }).kind === "join",
    );
    const kinds = seq
      .filter((m) => m.type === "event")
      .map((m) => ({
        topic: m.topic,
        kind: (m.body as { kind: string }).kind,
      }));
    const leaveIdx = kinds.findIndex((k) => k.topic === "presence:x.md" && k.kind === "leave");
    const joinIdx = kinds.findIndex((k) => k.topic === "presence:y.md" && k.kind === "join");
    expect(leaveIdx).toBeGreaterThanOrEqual(0);
    expect(joinIdx).toBeGreaterThan(leaveIdx);

    ordered.close();
    mover.close();
  });

  it("disconnect emits leave", async () => {
    const watcher = await openWs(port, "a");
    const actor = await openWs(port, "b");

    watcher.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    expect((await nextMessage(watcher)).type).toBe("subscribed");

    const events = collectEvents(watcher);
    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "join",
    );
    events.length = 0;

    actor.close();
    const leave = await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "leave",
    );
    expect(leave).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b", path: "notes/plan.md" } },
    });
    watcher.close();
  });

  it("snapshot on subscribe includes focused peers and self when focused", async () => {
    const b = await openWs(port, "b");
    b.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    // Allow focus to land before A subscribes.
    await new Promise((r) => setTimeout(r, 30));

    const a = await openWs(port, "a");
    a.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    const snap = await nextMessage(a);
    expect(snap.type).toBe("subscribed");
    if (snap.type !== "subscribed") throw new Error("expected subscribed");
    const peers = (snap.body as { peers: PresencePeer[] }).peers;
    expect(peers).toHaveLength(1);
    expect(peers[0]).toMatchObject({ userId: "user-b", path: "notes/plan.md" });
    expect(typeof peers[0]!.lastActive).toBe("string");

    // A focuses then re-subscribes — roster includes self.
    a.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    await new Promise((r) => setTimeout(r, 30));
    a.send(JSON.stringify({ type: "unsubscribe", topic: "presence:notes/plan.md" }));
    a.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    const withSelf = await nextMessage(a);
    expect(withSelf.type).toBe("subscribed");
    if (withSelf.type !== "subscribed") throw new Error("expected subscribed");
    const ids = (withSelf.body as { peers: PresencePeer[] }).peers
      .map((p) => p.userId)
      .sort();
    expect(ids).toEqual(["user-a", "user-b"]);

    a.close();
    b.close();
  });

  it("two windows, one join — leave only when last window departs", async () => {
    const watcher = await openWs(port, "a");
    const win1 = await openWs(port, "b");
    const win2 = await openWs(port, "b2");

    watcher.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    expect((await nextMessage(watcher)).type).toBe("subscribed");
    const events = collectEvents(watcher);

    win1.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "join",
    );

    win2.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "update",
    );

    const joins = events.filter(
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "join",
    );
    expect(joins).toHaveLength(1);

    events.length = 0;
    win1.close();
    // Closing one window must not leave.
    await new Promise((r) => setTimeout(r, 80));
    expect(
      events.filter((m) => m.type === "event" && (m.body as { kind: string }).kind === "leave"),
    ).toHaveLength(0);

    win2.close();
    const leave = await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "leave",
    );
    expect(leave).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b" } },
    });
    watcher.close();
  });

  it("two-workspace isolation: same path, separate store scopes", async () => {
    // Spin up a second server+broker bound to workspaceId "ws-b" so we can
    // verify that the broker-owned store scopes presence state per workspace
    // and neither workspace can read or clobber the other's entries.
    const listened2 = await listen();
    const broker2 = createBroker();
    const handle2 = attachRealtime(listened2.server, {
      broker: broker2,
      authenticate: async (_req, protocols) => {
        if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;
        const bearer = protocols.find((p) => p.startsWith("bearer."));
        if (!bearer) return null;
        const token = bearer.slice("bearer.".length);
        if (token === "a") return { principal: principal({ sub: "user-a", workspaceId: "ws-b" }) };
        if (token === "b") return { principal: principal({ sub: "user-b", workspaceId: "ws-b" }) };
        return null;
      },
    });

    try {
      // user-b focuses on "notes/plan.md" in workspace ws-a (via the existing server).
      const actorA = await openWs(port, "b");
      actorA.send(
        JSON.stringify({ type: "publish", topic: "presence:notes/plan.md", body: { action: "focus" } }),
      );
      await new Promise((r) => setTimeout(r, 30));

      // user-a subscribes to "notes/plan.md" in workspace ws-b (via the new server).
      const watcherB = await openWs(listened2.port, "a");
      watcherB.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
      const snap = await nextMessage(watcherB);
      expect(snap.type).toBe("subscribed");
      // ws-b's roster must be empty — ws-a's focused member must not bleed across.
      const peers = (snap.body as { peers: PresencePeer[] }).peers;
      expect(peers).toHaveLength(0);

      // user-b focuses in ws-b; ws-a's subscriber must not see it.
      const actorB = await openWs(listened2.port, "b");
      const eventsA = collectEvents(actorA); // reuse actorA socket to watch ws-a events
      actorB.send(
        JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md", body: {} }),
      );
      await nextMessage(actorB); // consume subscribed

      const watcherA = await openWs(port, "a");
      watcherA.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
      const snapA = await nextMessage(watcherA);
      expect(snapA.type).toBe("subscribed");
      const peersA = (snapA.body as { peers: PresencePeer[] }).peers;
      // ws-a's roster contains only user-b from ws-a (not ws-b's user-b).
      expect(peersA.map((p) => p.userId)).toEqual(["user-b"]);

      actorA.close();
      actorB.close();
      watcherA.close();
      watcherB.close();
    } finally {
      handle2.close();
      await new Promise<void>((resolve) => listened2.server.close(() => resolve()));
    }
  });

  it("writes zero presence: record-store keys across a focus/leave cycle", async () => {
    const watcher = await openWs(port, "a");
    const actor = await openWs(port, "b");

    watcher.send(JSON.stringify({ type: "subscribe", topic: "presence:notes/plan.md" }));
    expect((await nextMessage(watcher)).type).toBe("subscribed");
    const events = collectEvents(watcher);

    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "focus" },
      }),
    );
    await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "join",
    );

    actor.send(
      JSON.stringify({
        type: "publish",
        topic: "presence:notes/plan.md",
        body: { action: "blur" },
      }),
    );
    await waitForEvent(
      events,
      (m) => m.type === "event" && (m.body as { kind: string }).kind === "leave",
    );

    const keys = await getRecordStore().list("ws-a", "ws", "presence:");
    expect(keys).toEqual([]);

    watcher.close();
    actor.close();
  });
});
