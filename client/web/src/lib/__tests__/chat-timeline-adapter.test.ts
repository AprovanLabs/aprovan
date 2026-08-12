/**
 * ChatTimelineAdapter — T4 reconciliation, reconnect states, over-cap send,
 * fire-and-forget typing (stream 7).
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  appTopic,
  createChatTimelineAdapter,
  type ChatRecordsClient,
  type ChatRealtimeClient,
  type RealtimeSocketState,
} from "@/features/messaging/adapter";
import { StorageCapError } from "@/features/messaging/errors";
import type { ChatRealtimeEvent, Message } from "@/features/messaging/schema";
import { messageKey } from "@/features/messaging/schema";

const INSTALL = "01INSTALL0000000000000000";
const CHANNEL = "01CHANNEL000000000000000";

function msg(
  id: string,
  body: string,
  extras: Partial<Message> = {},
): Message {
  return {
    id,
    channelId: CHANNEL,
    author: "alice",
    body,
    createdAt: "2026-08-12T12:00:00.000Z",
    ...extras,
  };
}

function memoryRecords(seed: Message[] = []): ChatRecordsClient {
  const store = new Map<string, unknown>();
  for (const m of seed) {
    store.set(messageKey(m.channelId, m.id), m);
  }
  return {
    async list(prefix) {
      return [...store.keys()].filter((k) => k.startsWith(prefix)).sort();
    },
    async get(key) {
      return store.has(key) ? store.get(key)! : null;
    },
  };
}

type FakeRealtime = ChatRealtimeClient & {
  setState(s: RealtimeSocketState): void;
  pushEvent(body: unknown): void;
  pushSnapshot(body: unknown): void;
  publishes: Array<{ topic: string; body: unknown }>;
};

function fakeRealtime(
  initial: RealtimeSocketState = "open",
): FakeRealtime {
  let state: RealtimeSocketState = initial;
  const stateListeners = new Set<(s: RealtimeSocketState) => void>();
  const subs = new Set<{
    onEvent: (body: unknown) => void;
    onSnapshot?: (body: unknown) => void;
  }>();
  const publishes: Array<{ topic: string; body: unknown }> = [];

  return {
    publishes,
    get state() {
      return state;
    },
    setState(s) {
      state = s;
      for (const cb of stateListeners) cb(s);
    },
    onStateChange(cb) {
      stateListeners.add(cb);
      return () => stateListeners.delete(cb);
    },
    subscribe(_topic, onEvent, onSnapshot) {
      const entry = { onEvent, onSnapshot };
      subs.add(entry);
      return () => subs.delete(entry);
    },
    publish(topic, body) {
      publishes.push({ topic, body });
    },
    pushEvent(body) {
      for (const s of subs) s.onEvent(body);
    },
    pushSnapshot(body) {
      for (const s of subs) s.onSnapshot?.(body);
    },
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("ChatTimelineAdapter", () => {
  it("hint-triggers-refetch: message events reconcile from records, not the hint", async () => {
    const m1 = msg("01MSG00000000000000000001", "hello");
    const m2 = msg("01MSG00000000000000000002", "world");
    const backing = new Map<string, unknown>([
      [messageKey(m1.channelId, m1.id), m1],
    ]);
    const mutableRecords: ChatRecordsClient = {
      async list(prefix) {
        return [...backing.keys()].filter((k) => k.startsWith(prefix)).sort();
      },
      async get(key) {
        return backing.get(key) ?? null;
      },
    };

    const rt = fakeRealtime("open");
    const listSpy = vi.fn(mutableRecords.list.bind(mutableRecords));
    const getSpy = vi.fn(mutableRecords.get.bind(mutableRecords));
    const adapter = createChatTimelineAdapter({
      installId: INSTALL,
      records: { list: listSpy, get: getSpy },
      realtime: rt,
      reconcileLimit: 50,
    });
    adapter.start();

    const seen: ChatRealtimeEvent[] = [];
    adapter.onEvent((e) => seen.push(e));

    const before = await adapter.fetchWindow(CHANNEL, { limit: 50 });
    expect(before.map((m) => m.id)).toEqual([m1.id]);
    listSpy.mockClear();
    getSpy.mockClear();

    // Canonical store advances; hint must not be trusted as the body.
    backing.set(messageKey(m2.channelId, m2.id), m2);
    rt.pushEvent({
      kind: "message",
      channelId: CHANNEL,
      recordId: m2.id,
      seq: 2,
      hint: { author: "alice", preview: "FORGED — do not trust" },
    });

    await vi.waitFor(() => {
      expect(seen.some((e) => e.kind === "message")).toBe(true);
    });

    const after = await adapter.fetchWindow(CHANNEL, { limit: 50 });
    expect(after.map((m) => m.body)).toEqual(["hello", "world"]);
    expect(after.some((m) => m.body.includes("FORGED"))).toBe(false);
    expect(listSpy).toHaveBeenCalled();

    adapter.dispose();
  });

  it("reconnect state transitions: closed → reconnecting → reconciling → live", async () => {
    const rt = fakeRealtime("closed");
    const adapter = createChatTimelineAdapter({
      installId: INSTALL,
      records: memoryRecords(),
      realtime: rt,
    });
    adapter.start();
    expect(adapter.connectionState()).toBe("reconnecting");

    rt.setState("open");
    // onStateChange sets reconciling then microtask → live
    expect(adapter.connectionState()).toBe("reconciling");
    await Promise.resolve();
    await Promise.resolve();
    expect(adapter.connectionState()).toBe("live");

    rt.pushSnapshot({
      channels: [],
      presence: [{ sub: "bob", lastActive: "2026-08-12T12:00:00.000Z" }],
      instanceId: "01INSTANCE00000000000000",
    });
    expect(adapter.presence().roster).toEqual([
      { sub: "bob", lastActive: "2026-08-12T12:00:00.000Z" },
    ]);
    expect(adapter.instanceId()).toBe("01INSTANCE00000000000000");

    rt.setState("closed");
    expect(adapter.connectionState()).toBe("reconnecting");

    adapter.dispose();
  });

  it("send failure surfaces the over-cap error distinguishably", async () => {
    const rt = fakeRealtime("open");
    const adapter = createChatTimelineAdapter({
      installId: INSTALL,
      records: memoryRecords(),
      realtime: rt,
      sendMessage: async () => {
        throw new StorageCapError();
      },
    });
    adapter.start();

    await expect(adapter.send(CHANNEL, "too big")).rejects.toSatisfy(
      (err: unknown) =>
        err instanceof StorageCapError &&
        err.code === "storage_cap" &&
        err.message.includes("storage cap"),
    );

    adapter.dispose();
  });

  it("typing signal is fire-and-forget (never blocks / never throws to composer)", async () => {
    const rt = fakeRealtime("open");
    const adapter = createChatTimelineAdapter({
      installId: INSTALL,
      records: memoryRecords(),
      realtime: {
        ...rt,
        publish() {
          throw new Error("broker unavailable");
        },
      },
    });
    adapter.start();

    expect(() => adapter.signalTyping(CHANNEL)).not.toThrow();

    // Even a slow publish path must not be awaited by the adapter.
    let publishStarted = false;
    let publishFinished = false;
    const slowRt = fakeRealtime("open");
    const slowAdapter = createChatTimelineAdapter({
      installId: INSTALL,
      records: memoryRecords(),
      realtime: {
        ...slowRt,
        publish() {
          publishStarted = true;
          // Intentionally not returning a promise the adapter could await.
          void Promise.resolve().then(() => {
            publishFinished = true;
          });
        },
      },
    });
    slowAdapter.start();
    slowAdapter.signalTyping(CHANNEL);
    expect(publishStarted).toBe(true);
    expect(publishFinished).toBe(false);

    slowAdapter.dispose();
    adapter.dispose();
  });

  it("appTopic matches CF-1 grammar app:<installId>", () => {
    expect(appTopic(INSTALL)).toBe(`app:${INSTALL}`);
  });
});
