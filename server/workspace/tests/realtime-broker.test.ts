/**
 * Broker⇄namespace-handler contract — covers
 * openspec/changes/iw9-f5-broker-spec/specs/realtime-broker/spec.md.
 */

import { describe, expect, it } from "vitest";
import { createBroker, type Conn, type NamespaceHandler } from "../src/realtime/broker.js";
import type { ServerMessage, Topic } from "../src/realtime/protocol.js";

function fakeConn(overrides: Partial<Conn> = {}): Conn & { sent: ServerMessage[] } {
  const sent: ServerMessage[] = [];
  return {
    id: "conn-1",
    userId: "user-1",
    workspaceId: "ws-1",
    send(msg) {
      sent.push(msg);
    },
    sent,
    ...overrides,
  };
}

describe("realtime broker — async subscribe contract", () => {
  it("delivers a subscribed body resolved from an awaited store read", async () => {
    const broker = createBroker();
    const handler: NamespaceHandler = {
      namespace: "chat",
      async onSubscribe(conn) {
        const store = broker.storeFor(conn.workspaceId, "chat");
        await store.set("seen", true);
        const seen = await store.get<boolean>("seen");
        return { body: { seen } };
      },
      onPublish() {},
      onDisconnect() {},
    };
    broker.registerNamespace(handler);

    const conn = fakeConn();
    broker.addConnection(conn);
    await broker.handleClientMessage(conn, { type: "subscribe", topic: "chat:general" as Topic });

    expect(conn.sent).toEqual([
      { type: "subscribed", topic: "chat:general", body: { seen: true } },
    ]);
  });

  it("rolls back subscription state when onSubscribe rejects", async () => {
    const broker = createBroker();
    const handler: NamespaceHandler = {
      namespace: "chat",
      async onSubscribe() {
        throw new Error("nope");
      },
      onPublish() {},
      onDisconnect() {},
    };
    broker.registerNamespace(handler);

    const conn = fakeConn();
    broker.addConnection(conn);
    await broker.handleClientMessage(conn, { type: "subscribe", topic: "chat:general" as Topic });

    expect(conn.sent).toEqual([
      { type: "error", code: "bad-topic", message: "nope", topic: "chat:general" },
    ]);

    // No residual subscription: a publish to the topic delivers nothing.
    broker.publishToTopic(conn.workspaceId, "chat:general" as Topic, { hello: true });
    expect(conn.sent).toHaveLength(1);
  });

  it("sends bad-body when onPublish rejects", async () => {
    const broker = createBroker();
    const handler: NamespaceHandler = {
      namespace: "chat",
      async onSubscribe() {
        return {};
      },
      async onPublish() {
        throw new Error("invalid body");
      },
      onDisconnect() {},
    };
    broker.registerNamespace(handler);

    const conn = fakeConn();
    broker.addConnection(conn);
    await broker.handleClientMessage(conn, { type: "subscribe", topic: "chat:general" as Topic });
    conn.sent.length = 0;

    await broker.handleClientMessage(conn, {
      type: "publish",
      topic: "chat:general" as Topic,
      body: { bad: true },
    });

    expect(conn.sent).toEqual([
      { type: "error", code: "bad-body", message: "invalid body", topic: "chat:general" },
    ]);
  });
});

describe("realtime broker — storeFor", () => {
  it("scopes entries per workspace so neither can read or clobber the other's", async () => {
    const broker = createBroker();
    const storeA = broker.storeFor("ws-a", "chat");
    const storeB = broker.storeFor("ws-b", "chat");

    await storeA.set("key", "a-value");
    await storeB.set("key", "b-value");

    expect(await storeA.get("key")).toBe("a-value");
    expect(await storeB.get("key")).toBe("b-value");
    expect(await storeA.list("key")).toEqual([["key", "a-value"]]);
  });

  it("drops a workspace's store when its workspace state is dropped", async () => {
    const broker = createBroker();
    const conn = fakeConn({ workspaceId: "ws-drop" });
    broker.addConnection(conn);

    const store = broker.storeFor("ws-drop", "chat");
    await store.set("key", "value");

    broker.removeConnection(conn);

    const storeAfterDrop = broker.storeFor("ws-drop", "chat");
    expect(await storeAfterDrop.get("key")).toBeUndefined();
  });
});

describe("realtime broker — fan-out authorization (invariant 7)", () => {
  it("filters one subscriber via authorize while others still receive, and a stale subscription confers nothing once authorize flips", async () => {
    const broker = createBroker();
    let allowUser2 = true;
    const handler: NamespaceHandler = {
      namespace: "chat",
      async onSubscribe() {
        return {};
      },
      onPublish() {},
      onDisconnect() {},
      authorize(conn) {
        if (conn.userId === "user-2") return allowUser2;
        return true;
      },
    };
    broker.registerNamespace(handler);

    const conn1 = fakeConn({ id: "c1", userId: "user-1" });
    const conn2 = fakeConn({ id: "c2", userId: "user-2" });
    broker.addConnection(conn1);
    broker.addConnection(conn2);
    await broker.handleClientMessage(conn1, { type: "subscribe", topic: "chat:general" as Topic });
    await broker.handleClientMessage(conn2, { type: "subscribe", topic: "chat:general" as Topic });
    conn1.sent.length = 0;
    conn2.sent.length = 0;

    // Both subscribers are currently authorized: both receive the event.
    broker.publishToTopic("ws-1", "chat:general" as Topic, { text: "hi" });
    expect(conn1.sent).toEqual([{ type: "event", topic: "chat:general", body: { text: "hi" } }]);
    expect(conn2.sent).toEqual([{ type: "event", topic: "chat:general", body: { text: "hi" } }]);

    // Stale-subscription-confers-nothing: flip authorize to reject conn2
    // without it ever unsubscribing — the next publish must deliver to conn1
    // only, and the rejection is not surfaced to conn2 as an error frame.
    allowUser2 = false;
    conn1.sent.length = 0;
    conn2.sent.length = 0;
    broker.publishToTopic("ws-1", "chat:general" as Topic, { text: "later" });
    expect(conn1.sent).toEqual([{ type: "event", topic: "chat:general", body: { text: "later" } }]);
    expect(conn2.sent).toEqual([]);
  });
});
