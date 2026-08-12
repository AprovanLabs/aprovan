/**
 * `doc` realtime namespace — collab join/sync/awareness/release scenarios.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import * as awarenessProtocol from "y-protocols/awareness";
import * as syncProtocol from "y-protocols/sync";
import * as Y from "yjs";
import {
  createDocHandler,
  type DocAwarenessFrame,
  type DocSyncFrame,
} from "../src/doc/doc-namespace.js";
import { docKey, getOrLoadDoc, hasLiveDoc, releaseDoc } from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import { createBroker, type Conn } from "../src/realtime/broker.js";
import type { ServerMessage, Topic } from "../src/realtime/protocol.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const WS = "ws-doc-ns";
const PATH = "notes/collab.md";
const TOPIC = `doc:${PATH}` as Topic;

let dataDir: string;

function fakeConn(
  overrides: Partial<Conn> = {},
): Conn & { sent: ServerMessage[] } {
  const sent: ServerMessage[] = [];
  return {
    id: "conn-1",
    userId: "user-1",
    workspaceId: WS,
    send(msg) {
      sent.push(msg);
    },
    sent,
    ...overrides,
  };
}

function encodeB64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function decodeB64(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data, "base64"));
}

function syncStep1(doc: Y.Doc): DocSyncFrame {
  const encoder = encoding.createEncoder();
  syncProtocol.writeSyncStep1(encoder, doc);
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

function syncUpdate(update: Uint8Array): DocSyncFrame {
  const encoder = encoding.createEncoder();
  syncProtocol.writeUpdate(encoder, update);
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

function awarenessFrame(
  awareness: awarenessProtocol.Awareness,
  clients: number[],
): DocAwarenessFrame {
  return {
    kind: "awareness",
    data: encodeB64(awarenessProtocol.encodeAwarenessUpdate(awareness, clients)),
  };
}

function clientSyncStep2Reply(clientDoc: Y.Doc, serverStep1: DocSyncFrame): DocSyncFrame {
  const decoder = decoding.createDecoder(decodeB64(serverStep1.data));
  const encoder = encoding.createEncoder();
  syncProtocol.readSyncMessage(decoder, encoder, clientDoc, "test");
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

function applySyncEvents(clientDoc: Y.Doc, messages: ServerMessage[]): void {
  for (const msg of messages) {
    if (msg.type !== "event") continue;
    const body = msg.body as DocSyncFrame | DocAwarenessFrame;
    if (body.kind !== "sync") continue;
    const d = decoding.createDecoder(decodeB64(body.data));
    const e = encoding.createEncoder();
    syncProtocol.readSyncMessage(d, e, clientDoc, "test");
  }
}

async function completeHandshake(
  broker: ReturnType<typeof createBroker>,
  conn: Conn & { sent: ServerMessage[] },
  clientDoc: Y.Doc,
  subscribed: DocSyncFrame,
): Promise<void> {
  conn.sent.length = 0;
  await broker.handleClientMessage(conn, {
    type: "publish",
    topic: TOPIC,
    body: clientSyncStep2Reply(clientDoc, subscribed),
  });
  applySyncEvents(clientDoc, conn.sent);
  conn.sent.length = 0;
  await broker.handleClientMessage(conn, {
    type: "publish",
    topic: TOPIC,
    body: syncStep1(clientDoc),
  });
  applySyncEvents(clientDoc, conn.sent);
  conn.sent.length = 0;
}

function flushMicrotasks(): Promise<void> {
  return new Promise((resolve) => queueMicrotask(resolve));
}

function flushMacrotasks(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function subscribedSync(sent: ServerMessage[]): DocSyncFrame {
  const msg = sent.find((m) => m.type === "subscribed");
  expect(msg).toBeDefined();
  expect(msg!.body).toMatchObject({ kind: "sync" });
  return msg!.body as DocSyncFrame;
}

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-namespace-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await getFsStore().write(WS, PATH, "# draft\n");
});

afterEach(async () => {
  const key = docKey(WS, PATH);
  if (hasLiveDoc(WS, PATH)) await releaseDoc(key);
});

describe("doc namespace", () => {
  it("concurrent joiners share one LiveDoc", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const a = fakeConn({ id: "a", userId: "ua" });
    const b = fakeConn({ id: "b", userId: "ub" });
    broker.addConnection(a);
    broker.addConnection(b);

    await Promise.all([
      broker.handleClientMessage(a, { type: "subscribe", topic: TOPIC }),
      broker.handleClientMessage(b, { type: "subscribe", topic: TOPIC }),
    ]);

    expect(hasLiveDoc(WS, PATH)).toBe(true);
    const live = await getOrLoadDoc(WS, PATH);
    expect(live.participants.has("a")).toBe(true);
    expect(live.participants.has("b")).toBe(true);
    expect(live.participants.size).toBe(2);

    const bodyA = subscribedSync(a.sent);
    const bodyB = subscribedSync(b.sent);
    const clientA = new Y.Doc();
    const clientB = new Y.Doc();
    await completeHandshake(broker, a, clientA, bodyA);
    await completeHandshake(broker, b, clientB, bodyB);

    expect(clientA.getText("content").toString()).toBe("# draft\n");
    expect(clientB.getText("content").toString()).toBe("# draft\n");

    let editUpdate: Uint8Array | null = null;
    const onUp = (u: Uint8Array) => {
      editUpdate = u;
    };
    clientA.on("update", onUp);
    clientA.getText("content").insert(0, "X");
    clientA.off("update", onUp);
    expect(editUpdate).not.toBeNull();

    await broker.handleClientMessage(a, {
      type: "publish",
      topic: TOPIC,
      body: syncUpdate(editUpdate!),
    });

    const fanout = b.sent.find((m) => m.type === "event");
    expect(fanout).toBeDefined();
    applySyncEvents(clientB, [fanout!]);
    expect(clientB.getText("content").toString()).toBe("X# draft\n");
    expect(live.doc.getText("content").toString()).toBe("X# draft\n");
  });

  it("doc identity survives reconnect while peers remain", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const keeper = fakeConn({ id: "keeper", userId: "uk" });
    const leaver = fakeConn({ id: "leaver", userId: "ul" });
    broker.addConnection(keeper);
    broker.addConnection(leaver);

    await broker.handleClientMessage(keeper, { type: "subscribe", topic: TOPIC });
    await broker.handleClientMessage(leaver, { type: "subscribe", topic: TOPIC });

    const liveBefore = await getOrLoadDoc(WS, PATH);
    liveBefore.doc.getText("content").insert(0, "live-");
    const contentBefore = liveBefore.doc.getText("content").toString();

    broker.removeConnection(leaver);
    await flushMicrotasks();

    expect(hasLiveDoc(WS, PATH)).toBe(true);
    expect(liveBefore.participants.has("keeper")).toBe(true);

    const rejoiner = fakeConn({ id: "leaver", userId: "ul" });
    broker.addConnection(rejoiner);
    await broker.handleClientMessage(rejoiner, { type: "subscribe", topic: TOPIC });

    const liveAfter = await getOrLoadDoc(WS, PATH);
    expect(liveAfter).toBe(liveBefore);
    expect(liveAfter.doc.getText("content").toString()).toBe(contentBefore);

    const step1 = subscribedSync(rejoiner.sent);
    const client = new Y.Doc();
    await completeHandshake(broker, rejoiner, client, step1);
    expect(client.getText("content").toString()).toBe(contentBefore);
  });

  it("awareness join/update/leave deltas fan out; departure clears presence", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const a = fakeConn({ id: "a", userId: "ua" });
    const b = fakeConn({ id: "b", userId: "ub" });
    broker.addConnection(a);
    broker.addConnection(b);
    await broker.handleClientMessage(a, { type: "subscribe", topic: TOPIC });
    await broker.handleClientMessage(b, { type: "subscribe", topic: TOPIC });
    a.sent.length = 0;
    b.sent.length = 0;

    const sideA = new Y.Doc();
    const awA = new awarenessProtocol.Awareness(sideA);
    awA.setLocalState({
      user: { name: "Ada", color: "#f00" },
      cursor: { anchor: 1, head: 1 },
    });
    await broker.handleClientMessage(a, {
      type: "publish",
      topic: TOPIC,
      body: awarenessFrame(awA, [sideA.clientID]),
    });

    expect(b.sent).toHaveLength(1);
    expect(b.sent[0]).toMatchObject({ type: "event", topic: TOPIC });
    expect((b.sent[0]!.body as DocAwarenessFrame).kind).toBe("awareness");

    const live = await getOrLoadDoc(WS, PATH);
    expect(live.awareness.getStates().get(sideA.clientID)).toMatchObject({
      user: { name: "Ada" },
    });

    b.sent.length = 0;
    awA.setLocalState({
      user: { name: "Ada", color: "#f00" },
      cursor: { anchor: 5, head: 8 },
    });
    await broker.handleClientMessage(a, {
      type: "publish",
      topic: TOPIC,
      body: awarenessFrame(awA, [sideA.clientID]),
    });
    expect(b.sent).toHaveLength(1);
    expect(live.awareness.getStates().get(sideA.clientID)).toMatchObject({
      cursor: { anchor: 5, head: 8 },
    });

    b.sent.length = 0;
    broker.removeConnection(a);
    await flushMicrotasks();

    expect(live.awareness.getStates().has(sideA.clientID)).toBe(false);
    expect(b.sent.some((m) => m.type === "event")).toBe(true);
    const leaveBody = b.sent.find((m) => m.type === "event")!.body as DocAwarenessFrame;
    expect(leaveBody.kind).toBe("awareness");
  });

  it("last leave releases the doc; subsequent join reconstructs content", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const a = fakeConn({ id: "solo", userId: "ua" });
    broker.addConnection(a);
    await broker.handleClientMessage(a, { type: "subscribe", topic: TOPIC });

    const live = await getOrLoadDoc(WS, PATH);
    expect(hasLiveDoc(WS, PATH)).toBe(true);

    const client = new Y.Doc();
    await completeHandshake(broker, a, client, subscribedSync(a.sent));

    let editUpdate: Uint8Array | null = null;
    const onUp = (u: Uint8Array) => {
      editUpdate = u;
    };
    client.on("update", onUp);
    client.getText("content").insert(0, "kept-");
    client.off("update", onUp);
    expect(editUpdate).not.toBeNull();
    await broker.handleClientMessage(a, {
      type: "publish",
      topic: TOPIC,
      body: syncUpdate(editUpdate!),
    });

    const expected = live.doc.getText("content").toString();
    expect(expected.startsWith("kept-")).toBe(true);

    broker.removeConnection(a);
    await flushMicrotasks();
    await flushMicrotasks();
    await new Promise((r) => setTimeout(r, 20));

    expect(hasLiveDoc(WS, PATH)).toBe(false);

    const b = fakeConn({ id: "next", userId: "ub" });
    broker.addConnection(b);
    await broker.handleClientMessage(b, { type: "subscribe", topic: TOPIC });

    expect(hasLiveDoc(WS, PATH)).toBe(true);
    const reloaded = await getOrLoadDoc(WS, PATH);
    expect(reloaded.doc.getText("content").toString()).toBe(expected);
  });

  it("subscribed body is SyncStep1; awareness snapshot follows as event when peers present", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const a = fakeConn({ id: "a", userId: "ua" });
    broker.addConnection(a);
    await broker.handleClientMessage(a, { type: "subscribe", topic: TOPIC });

    const side = new Y.Doc();
    const aw = new awarenessProtocol.Awareness(side);
    aw.setLocalState({ user: { name: "Ada" } });
    await broker.handleClientMessage(a, {
      type: "publish",
      topic: TOPIC,
      body: awarenessFrame(aw, [side.clientID]),
    });

    const b = fakeConn({ id: "b", userId: "ub" });
    broker.addConnection(b);
    await broker.handleClientMessage(b, { type: "subscribe", topic: TOPIC });
    await flushMacrotasks();

    const syncBody = subscribedSync(b.sent);
    const msgType = decoding.readVarUint(decoding.createDecoder(decodeB64(syncBody.data)));
    expect(msgType).toBe(syncProtocol.messageYjsSyncStep1);

    const awarenessEvent = b.sent.find(
      (m) => m.type === "event" && (m.body as DocAwarenessFrame).kind === "awareness",
    );
    expect(awarenessEvent).toBeDefined();
  });

  it("anonymous join is refused", async () => {
    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    const anon = fakeConn({ id: "anon", userId: "" });
    broker.addConnection(anon);
    await broker.handleClientMessage(anon, { type: "subscribe", topic: TOPIC });

    expect(anon.sent.some((m) => m.type === "error" && m.code === "bad-topic")).toBe(
      true,
    );
    expect(anon.sent.some((m) => m.type === "subscribed")).toBe(false);
    expect(hasLiveDoc(WS, PATH)).toBe(false);

    const labeled = fakeConn({ id: "anon2", userId: "anonymous" });
    broker.addConnection(labeled);
    await broker.handleClientMessage(labeled, { type: "subscribe", topic: TOPIC });
    expect(
      labeled.sent.some((m) => m.type === "error" && m.code === "bad-topic"),
    ).toBe(true);
    expect(hasLiveDoc(WS, PATH)).toBe(false);
  });

  it("access revocation is honored at join for foreign partitions", async () => {
    const foreignPath = ".users/alice/private.md";
    const foreignTopic = `doc:${foreignPath}` as Topic;
    await getFsStore().write(WS, foreignPath, "# private\n");

    const broker = createBroker();
    broker.registerNamespace(createDocHandler(broker));

    // Owner can join.
    const alice = fakeConn({ id: "alice-conn", userId: "alice" });
    broker.addConnection(alice);
    await broker.handleClientMessage(alice, {
      type: "subscribe",
      topic: foreignTopic,
    });
    expect(alice.sent.some((m) => m.type === "subscribed")).toBe(true);
    expect(hasLiveDoc(WS, foreignPath)).toBe(true);

    // Bob has no share — join refused regardless of knowing the topic.
    const bob = fakeConn({ id: "bob-conn", userId: "bob" });
    broker.addConnection(bob);
    await broker.handleClientMessage(bob, {
      type: "subscribe",
      topic: foreignTopic,
    });
    expect(bob.sent.some((m) => m.type === "error" && m.code === "bad-topic")).toBe(
      true,
    );
    expect(bob.sent.some((m) => m.type === "subscribed")).toBe(false);

    broker.removeConnection(alice);
    await flushMicrotasks();
    await flushMicrotasks();
    await new Promise((r) => setTimeout(r, 20));
    if (hasLiveDoc(WS, foreignPath)) {
      await releaseDoc(docKey(WS, foreignPath));
    }
  });
});
