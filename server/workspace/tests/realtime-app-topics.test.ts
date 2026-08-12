/**
 * CF-1 app-topics handler — subscribe snapshot, invariant-7 fan-out filter,
 * presence/typing (no records/vfs writes), priority channel-membership.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ulid } from "ulid";
import { canReadChannel } from "../src/apps/chat/authz.js";
import { createChannel, type ChatScope } from "../src/apps/chat/service.js";
import { createInstance, type HostingMode } from "../src/apps/instances.js";
import { putMembership } from "../src/memberships.js";
import {
  appTopic,
  createAppTopicsHandler,
  type ChatRealtimeEvent,
} from "../src/realtime/app-topics.js";
import { createBroker, type Conn } from "../src/realtime/broker.js";
import type { ServerMessage } from "../src/realtime/protocol.js";
import * as recordsMod from "../src/records.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-chat-rt";
const ALICE = "alice";
const BOB = "bob";
const GUEST = "guest-user";
const OUTSIDER = "outsider";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-chat-realtime-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
});

async function seedInstall(installId: string, hosting: HostingMode): Promise<void> {
  await writeSvcRecord(WS, svcScope("installs"), installId, {
    installId,
    originAppId: ulid(),
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: ALICE,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hosting,
  });
}

async function seedManaged(): Promise<{
  installId: string;
  instanceId: string;
  alice: ChatScope;
  bob: ChatScope;
}> {
  const installId = ulid();
  await seedInstall(installId, "managed");
  const instance = await createInstance({
    workspaceId: WS,
    appId: installId,
    createdBy: ALICE,
    participants: [ALICE, BOB],
  });
  const base = { workspaceId: WS, installId, instanceId: instance.instanceId };
  return {
    installId,
    instanceId: instance.instanceId,
    alice: { ...base, userId: ALICE },
    bob: { ...base, userId: BOB },
  };
}

async function seedHostedWithGuest(): Promise<{
  installId: string;
  instanceId: string;
  alice: ChatScope;
  guest: ChatScope;
}> {
  const installId = ulid();
  await seedInstall(installId, "hosted");
  const instance = await createInstance({
    workspaceId: WS,
    appId: installId,
    createdBy: ALICE,
    participants: [ALICE, GUEST],
  });
  const base = { workspaceId: WS, installId, instanceId: instance.instanceId };
  return {
    installId,
    instanceId: instance.instanceId,
    alice: { ...base, userId: ALICE },
    guest: { ...base, userId: GUEST },
  };
}

function fakeConn(overrides: Partial<Conn> = {}): Conn & { sent: ServerMessage[] } {
  const sent: ServerMessage[] = [];
  return {
    id: "conn-1",
    userId: ALICE,
    workspaceId: WS,
    send(msg) {
      sent.push(msg);
    },
    sent,
    ...overrides,
  };
}

describe("realtime app-topics", () => {
  it("subscribe returns channel + presence snapshot for a participant", async () => {
    const { alice, installId } = await seedManaged();
    const pub = await createChannel(alice, { name: "general", kind: "public" });

    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const conn = fakeConn({ id: "c-alice", userId: ALICE });
    broker.addConnection(conn);
    await broker.handleClientMessage(conn, {
      type: "subscribe",
      topic: appTopic(installId),
    });

    const subscribed = conn.sent.find((m) => m.type === "subscribed");
    expect(subscribed).toMatchObject({ type: "subscribed", topic: appTopic(installId) });
    const body = (
      subscribed as { body: { channels: unknown[]; presence: unknown[]; instanceId: string } }
    ).body;
    expect(body.instanceId).toBe(alice.instanceId);
    expect(body.channels).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: pub.id, name: "general" })]),
    );
    expect(body.presence).toEqual(
      expect.arrayContaining([expect.objectContaining({ sub: ALICE })]),
    );
  });

  it("rejects non-participant subscribe with bad-topic (404-equivalent)", async () => {
    const { installId } = await seedManaged();
    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const conn = fakeConn({ id: "c-out", userId: OUTSIDER });
    broker.addConnection(conn);
    await broker.handleClientMessage(conn, {
      type: "subscribe",
      topic: appTopic(installId),
    });

    expect(conn.sent).toEqual([
      expect.objectContaining({
        type: "error",
        code: "bad-topic",
        topic: appTopic(installId),
      }),
    ]);
  });

  it("guest never receives events for a restricted channel they cannot read", async () => {
    const { alice, installId } = await seedHostedWithGuest();
    const restricted = await createChannel(alice, {
      name: "private",
      kind: "restricted",
      members: [ALICE],
    });
    const open = await createChannel(alice, { name: "lobby", kind: "public" });

    expect(
      await canReadChannel(GUEST, installId, restricted.id, {
        workspaceId: WS,
        instanceId: alice.instanceId,
      }),
    ).toBe(false);
    expect(
      await canReadChannel(GUEST, installId, open.id, {
        workspaceId: WS,
        instanceId: alice.instanceId,
      }),
    ).toBe(true);

    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const aliceConn = fakeConn({ id: "c-alice", userId: ALICE });
    const guestConn = fakeConn({ id: "c-guest", userId: GUEST });
    broker.addConnection(aliceConn);
    broker.addConnection(guestConn);

    const topic = appTopic(installId);
    await broker.handleClientMessage(aliceConn, { type: "subscribe", topic });
    await broker.handleClientMessage(guestConn, { type: "subscribe", topic });
    aliceConn.sent.length = 0;
    guestConn.sent.length = 0;

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: { action: "message", channelId: restricted.id, body: "secret" },
    });

    expect(guestConn.sent.filter((m) => m.type === "event")).toEqual([]);
    expect(
      aliceConn.sent.some(
        (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "message",
      ),
    ).toBe(true);
  });

  it("revocation at fan-out: flipping readable channels mid-stream blocks delivery", async () => {
    const { alice, installId } = await seedManaged();
    const channel = await createChannel(alice, {
      name: "shared",
      kind: "restricted",
      members: [ALICE, BOB],
    });

    const broker = createBroker();
    const handler = createAppTopicsHandler(broker);
    broker.registerNamespace(handler);

    const aliceConn = fakeConn({ id: "c-alice", userId: ALICE });
    const bobConn = fakeConn({ id: "c-bob", userId: BOB });
    broker.addConnection(aliceConn);
    broker.addConnection(bobConn);

    const topic = appTopic(installId);
    await broker.handleClientMessage(aliceConn, { type: "subscribe", topic });
    await broker.handleClientMessage(bobConn, { type: "subscribe", topic });
    aliceConn.sent.length = 0;
    bobConn.sent.length = 0;

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: { action: "message", channelId: channel.id, body: "before" },
    });
    expect(bobConn.sent.some((m) => m.type === "event")).toBe(true);

    // Stale-subscription-confers-nothing: flip canReadChannel-equivalent cache
    // without reconnect (mirrors iw9-f5 authorize flip).
    handler.setReadableChannelsForTest(bobConn.id, []);
    aliceConn.sent.length = 0;
    bobConn.sent.length = 0;

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: { action: "message", channelId: channel.id, body: "after-revoke" },
    });

    expect(
      aliceConn.sent.some(
        (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "message",
      ),
    ).toBe(true);
    expect(bobConn.sent.filter((m) => m.type === "event")).toEqual([]);
  });

  it("typing/presence round-trip with zero records.*/vfs.* writes", async () => {
    const { alice, installId } = await seedManaged();
    const channel = await createChannel(alice, { name: "general", kind: "public" });

    const setSpy = vi.spyOn(recordsMod.getRecordStore(), "set");

    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const aliceConn = fakeConn({ id: "c-alice", userId: ALICE });
    const bobConn = fakeConn({ id: "c-bob", userId: BOB });
    broker.addConnection(aliceConn);
    broker.addConnection(bobConn);

    const topic = appTopic(installId);
    await broker.handleClientMessage(aliceConn, { type: "subscribe", topic });
    await broker.handleClientMessage(bobConn, { type: "subscribe", topic });
    setSpy.mockClear();
    aliceConn.sent.length = 0;
    bobConn.sent.length = 0;

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: { action: "typing", channelId: channel.id },
    });

    expect(
      bobConn.sent.find(
        (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "typing",
      ),
    ).toMatchObject({
      type: "event",
      body: { kind: "typing", channelId: channel.id, sub: ALICE },
    });

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: { action: "presence" },
    });
    expect(
      bobConn.sent.some(
        (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "presence",
      ),
    ).toBe(true);

    expect(setSpy).not.toHaveBeenCalled();
    setSpy.mockRestore();

    // Broker fire-and-forgets onDisconnect (async clearPresence); wait for it.
    broker.removeConnection(aliceConn);
    await vi.waitFor(async () => {
      expect(await broker.storeFor(WS, "app").get(`focus:${aliceConn.id}`)).toBeUndefined();
    });
  });

  it("channel-membership delivers on the priority path when the event queue is saturated", async () => {
    const { alice, installId } = await seedManaged();
    const channel = await createChannel(alice, { name: "general", kind: "public" });

    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const delivered: ServerMessage[] = [];
    const dropped: ServerMessage[] = [];
    const eventQueue: ServerMessage[] = [];
    const queueDepth = 2;

    const conn: Conn & { delivered: ServerMessage[]; dropped: ServerMessage[] } = {
      id: "c-prio",
      userId: ALICE,
      workspaceId: WS,
      delivered,
      dropped,
      send(msg) {
        if (msg.type !== "event") {
          delivered.push(msg);
          return;
        }
        const body = msg.body as ChatRealtimeEvent;
        if (body?.kind === "channel-membership") {
          delivered.push(msg);
          return;
        }
        if (eventQueue.length >= queueDepth) {
          const old = eventQueue.shift();
          if (old) dropped.push(old);
        }
        eventQueue.push(msg);
      },
    };

    broker.addConnection(conn);
    const topic = appTopic(installId);
    await broker.handleClientMessage(conn, { type: "subscribe", topic });
    delivered.length = 0;
    dropped.length = 0;
    eventQueue.length = 0;

    for (let i = 0; i < 5; i++) {
      await broker.handleClientMessage(conn, {
        type: "publish",
        topic,
        body: { action: "typing", channelId: channel.id },
      });
    }
    expect(eventQueue.length).toBe(queueDepth);
    expect(dropped.length).toBeGreaterThan(0);

    await broker.handleClientMessage(conn, {
      type: "publish",
      topic,
      body: { action: "channel-membership", channelId: channel.id },
    });

    expect(
      delivered.some(
        (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "channel-membership",
      ),
    ).toBe(true);
  });

  it("message publish fans out a hint (not the body) with matching record id", async () => {
    const { alice, installId } = await seedManaged();
    const channel = await createChannel(alice, { name: "general", kind: "public" });

    const broker = createBroker();
    broker.registerNamespace(createAppTopicsHandler(broker));

    const aliceConn = fakeConn({ id: "c-alice", userId: ALICE });
    const bobConn = fakeConn({ id: "c-bob", userId: BOB });
    broker.addConnection(aliceConn);
    broker.addConnection(bobConn);

    const topic = appTopic(installId);
    await broker.handleClientMessage(aliceConn, { type: "subscribe", topic });
    await broker.handleClientMessage(bobConn, { type: "subscribe", topic });
    bobConn.sent.length = 0;

    await broker.handleClientMessage(aliceConn, {
      type: "publish",
      topic,
      body: {
        action: "message",
        channelId: channel.id,
        body: "hello from alice — full body stays in records",
      },
    });

    const event = bobConn.sent.find(
      (m) => m.type === "event" && (m.body as ChatRealtimeEvent).kind === "message",
    ) as { body: Extract<ChatRealtimeEvent, { kind: "message" }> };
    expect(event).toBeTruthy();
    expect(event.body).toMatchObject({
      kind: "message",
      channelId: channel.id,
      hint: { author: ALICE },
    });
    expect(event.body).not.toHaveProperty("body");
    expect(event.body.recordId).toMatch(/^[0-9A-HJKMNP-TV-Z]{26}$/i);
  });
});
