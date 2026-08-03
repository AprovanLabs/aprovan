/**
 * Protocol-level e2e for ux.md "See who's in your file":
 * two users, tab-switch focus, blur, disconnect leave, reserved namespaces.
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
import type { ServerMessage } from "../src/realtime/protocol.js";
import {
  attachRealtime,
  REALTIME_PATH,
  REALTIME_SUBPROTOCOL,
  type RealtimeHandle,
} from "../src/realtime/socket.js";
import { getRecordStore } from "../src/records.js";

const PATH = REALTIME_PATH;
const PLAN = "notes/plan.md";
const OTHER = "notes/other.md";
const PLAN_TOPIC = `presence:${PLAN}`;
const OTHER_TOPIC = `presence:${OTHER}`;

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

function openWs(port: number, token: string): Promise<WebSocket> {
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

function isEvent(
  m: ServerMessage,
  topic: string,
  kind: string,
  userId?: string,
): boolean {
  if (m.type !== "event" || m.topic !== topic) return false;
  const body = m.body as { kind?: string; peer?: { userId?: string } };
  if (body.kind !== kind) return false;
  if (userId !== undefined && body.peer?.userId !== userId) return false;
  return true;
}

async function subscribe(
  ws: WebSocket,
  topic: string,
): Promise<{ peers: PresencePeer[] }> {
  ws.send(JSON.stringify({ type: "subscribe", topic }));
  const msg = await nextMessage(ws);
  expect(msg).toMatchObject({ type: "subscribed", topic });
  if (msg.type !== "subscribed") throw new Error("expected subscribed");
  return msg.body as { peers: PresencePeer[] };
}

function focus(ws: WebSocket, topic: string): void {
  ws.send(JSON.stringify({ type: "publish", topic, body: { action: "focus" } }));
}

function blur(ws: WebSocket, topic: string): void {
  ws.send(JSON.stringify({ type: "publish", topic, body: { action: "blur" } }));
}

describe("realtime-e2e — See who's in your file", () => {
  let dataDir: string;
  let server: HttpServer;
  let port: number;
  let handle: RealtimeHandle;

  beforeAll(() => {
    dataDir = mkdtempSync(join(tmpdir(), "gateway-realtime-e2e-"));
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
        return null;
      },
    });
  });

  afterEach(async () => {
    handle?.close();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it("two users: snapshot → join → atomic move → blur → disconnect leave", async () => {
    const wsA = await openWs(port, "a");
    const wsB = await openWs(port, "b");

    // Both open plan.md + other.md as tabs (subscribe interest without focus).
    const aPlanSnap = await subscribe(wsA, PLAN_TOPIC);
    expect(aPlanSnap.peers).toEqual([]);
    await subscribe(wsA, OTHER_TOPIC);
    const bPlanSnap = await subscribe(wsB, PLAN_TOPIC);
    expect(bPlanSnap.peers).toEqual([]);
    await subscribe(wsB, OTHER_TOPIC);

    const eventsA = collectEvents(wsA);
    const eventsB = collectEvents(wsB);

    // Both make plan.md the active tab → mutual joins (client filters self for chips).
    focus(wsA, PLAN_TOPIC);
    focus(wsB, PLAN_TOPIC);

    const aSeesBJoin = await waitForEvent(eventsA, (m) =>
      isEvent(m, PLAN_TOPIC, "join", "user-b"),
    );
    expect(aSeesBJoin).toMatchObject({
      body: { kind: "join", peer: { userId: "user-b", path: PLAN } },
    });

    const bSeesAJoin = await waitForEvent(eventsB, (m) =>
      isEvent(m, PLAN_TOPIC, "join", "user-a"),
    );
    expect(bSeesAJoin).toMatchObject({
      body: { kind: "join", peer: { userId: "user-a", path: PLAN } },
    });

    // Snapshot after both focused includes both users.
    wsA.send(JSON.stringify({ type: "unsubscribe", topic: PLAN_TOPIC }));
    const midSnap = await subscribe(wsA, PLAN_TOPIC);
    expect(midSnap.peers.map((p) => p.userId).sort()).toEqual(["user-a", "user-b"]);
    eventsA.length = 0;
    eventsB.length = 0;

    // B switches active tab to other.md — atomic leave on plan, join on other.
    focus(wsB, OTHER_TOPIC);

    const leavePlan = await waitForEvent(eventsA, (m) =>
      isEvent(m, PLAN_TOPIC, "leave", "user-b"),
    );
    const joinOther = await waitForEvent(eventsA, (m) =>
      isEvent(m, OTHER_TOPIC, "join", "user-b"),
    );
    expect(leavePlan).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b", path: PLAN } },
    });
    expect(joinOther).toMatchObject({
      body: { kind: "join", peer: { userId: "user-b", path: OTHER } },
    });

    // Ordered leave-before-join on A's single connection watching both topics.
    const kinds = eventsA
      .filter((m) => m.type === "event")
      .map((m) => ({
        topic: m.topic,
        kind: (m.body as { kind: string }).kind,
        userId: (m.body as { peer: { userId: string } }).peer.userId,
      }))
      .filter((k) => k.userId === "user-b");
    const leaveIdx = kinds.findIndex((k) => k.topic === PLAN_TOPIC && k.kind === "leave");
    const joinIdx = kinds.findIndex((k) => k.topic === OTHER_TOPIC && k.kind === "join");
    expect(leaveIdx).toBeGreaterThanOrEqual(0);
    expect(joinIdx).toBeGreaterThan(leaveIdx);

    eventsA.length = 0;

    // B hides the window → blur clears presence everywhere.
    blur(wsB, OTHER_TOPIC);
    const blurLeave = await waitForEvent(eventsA, (m) =>
      isEvent(m, OTHER_TOPIC, "leave", "user-b"),
    );
    expect(blurLeave).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b", path: OTHER } },
    });

    // B re-focuses other.md (window restored), then disconnects — leave on close.
    eventsA.length = 0;
    focus(wsB, OTHER_TOPIC);
    await waitForEvent(eventsA, (m) => isEvent(m, OTHER_TOPIC, "join", "user-b"));
    eventsA.length = 0;

    wsB.close();
    const disconnectLeave = await waitForEvent(eventsA, (m) =>
      isEvent(m, OTHER_TOPIC, "leave", "user-b"),
    );
    expect(disconnectLeave).toMatchObject({
      body: { kind: "leave", peer: { userId: "user-b", path: OTHER } },
    });

    // Socket-memory only — no presence: record rows.
    const keys = await getRecordStore().list("ws-a", "ws", "presence:");
    expect(keys).toEqual([]);

    wsA.close();
  });

  it("reserved namespaces doc: and fs: return reserved-namespace", async () => {
    const ws = await openWs(port, "a");

    ws.send(JSON.stringify({ type: "subscribe", topic: "doc:notes/plan.md" }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "reserved-namespace",
    });

    ws.send(JSON.stringify({ type: "subscribe", topic: "fs:changes" }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "reserved-namespace",
    });

    ws.send(JSON.stringify({ type: "publish", topic: "doc:notes/plan.md", body: {} }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "reserved-namespace",
    });

    ws.send(JSON.stringify({ type: "publish", topic: "fs:changes", body: {} }));
    expect(await nextMessage(ws)).toMatchObject({
      type: "error",
      code: "reserved-namespace",
    });

    // Presence still works on the same connection after reserved errors.
    const snap = await subscribe(ws, PLAN_TOPIC);
    expect(snap.peers).toEqual([]);
    ws.close();
  });
});
