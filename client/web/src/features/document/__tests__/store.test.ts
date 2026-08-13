/**
 * DocumentStore: apply sync/awareness frames; reconnect is fresh subscribe/sync only.
 */

import { getContentText } from "@aprovan/editor";
import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import { afterEach, describe, expect, it } from "vitest";
import * as awarenessProtocol from "y-protocols/awareness";
import * as syncProtocol from "y-protocols/sync";
import * as Y from "yjs";
import type { RealtimeClient, RealtimeState } from "@/lib/realtime";
import {
  DocumentStore,
  docTopic,
  type DocAwarenessFrame,
  type DocSyncFrame,
} from "../store";

function encodeB64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

function decodeB64(data: string): Uint8Array {
  const binary = atob(data);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
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

/** Server-side reply to a client sync publish (mirrors doc-namespace onPublish). */
function serverReplyToClientSync(
  serverDoc: Y.Doc,
  clientFrame: DocSyncFrame,
): DocSyncFrame | null {
  const decoder = decoding.createDecoder(decodeB64(clientFrame.data));
  const encoder = encoding.createEncoder();
  syncProtocol.readSyncMessage(decoder, encoder, serverDoc, "test");
  if (encoding.length(encoder) === 0) return null;
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

type MockClient = RealtimeClient & {
  publishes: Array<{ topic: string; body: unknown }>;
  triggerSnapshot: (topic: string, body: unknown) => void;
  triggerEvent: (topic: string, body: unknown) => void;
  setState: (s: RealtimeState) => void;
};

function createMockClient(initial: RealtimeState = "open"): MockClient {
  let state: RealtimeState = initial;
  const stateListeners = new Set<(s: RealtimeState) => void>();
  const subs = new Map<
    string,
    { onEvent: (body: unknown) => void; onSnapshot?: (body: unknown) => void }
  >();
  const publishes: Array<{ topic: string; body: unknown }> = [];

  const client: MockClient = {
    publishes,
    get state() {
      return state;
    },
    setState(next) {
      if (state === next) return;
      state = next;
      for (const cb of stateListeners) cb(state);
    },
    triggerSnapshot(topic, body) {
      subs.get(topic)?.onSnapshot?.(body);
    },
    triggerEvent(topic, body) {
      subs.get(topic)?.onEvent(body);
    },
    subscribe(topic, onEvent, onSnapshot) {
      subs.set(topic, { onEvent, onSnapshot });
      return () => {
        subs.delete(topic);
      };
    },
    publish(topic, body) {
      publishes.push({ topic, body });
    },
    onStateChange(cb) {
      stateListeners.add(cb);
      return () => stateListeners.delete(cb);
    },
    close() {
      state = "closed";
      for (const cb of stateListeners) cb(state);
    },
  };
  return client;
}

/** Drive subscribed SyncStep1 + server replies to the client's handshake publishes. */
function completeHandshake(
  mock: MockClient,
  serverDoc: Y.Doc,
  topic: string,
): void {
  mock.publishes.length = 0;
  mock.triggerSnapshot(topic, syncStep1(serverDoc));
  // Client published SyncStep2 then SyncStep1 — reply to each like the server.
  const frames = mock.publishes.map((p) => p.body as DocSyncFrame);
  for (const frame of frames) {
    const reply = serverReplyToClientSync(serverDoc, frame);
    if (reply) mock.triggerEvent(topic, reply);
  }
}

const PATH = "notes/plan.md";
const TOPIC = docTopic(PATH);

describe("DocumentStore", () => {
  let store: DocumentStore;
  let mock: MockClient;

  afterEach(() => {
    store?.release(PATH);
  });

  it("mounts a local Y.Doc when the realtime client fails to start", () => {
    store = new DocumentStore({
      createClient: () => {
        throw new Error("realtime unavailable");
      },
    });
    store.acquire(PATH);
    expect(store.getDoc(PATH)).not.toBeNull();
    expect(store.getAwareness(PATH)).not.toBeNull();
    expect(store.isSynced(PATH)).toBe(false);
  });

  it("applies an incoming sync frame and updates the local Y.Doc", () => {
    mock = createMockClient("open");
    store = new DocumentStore({ createClient: () => mock });
    store.acquire(PATH);

    const serverDoc = new Y.Doc();
    getContentText(serverDoc).insert(0, "hello from server");
    completeHandshake(mock, serverDoc, TOPIC);

    const local = store.getDoc(PATH)!;
    expect(getContentText(local).toString()).toBe("hello from server");
    expect(store.isSynced(PATH)).toBe(true);

    // Subsequent Update frame merges forward.
    serverDoc.transact(() => {
      getContentText(serverDoc).insert(getContentText(serverDoc).length, "!");
    });
    const update = Y.encodeStateAsUpdate(serverDoc, Y.encodeStateVector(local));
    mock.triggerEvent(TOPIC, syncUpdate(update));
    expect(getContentText(local).toString()).toBe("hello from server!");
  });

  it("awareness join/leave deltas update the exposed peer list", () => {
    mock = createMockClient("open");
    store = new DocumentStore({ createClient: () => mock });
    store.acquire(PATH);

    completeHandshake(mock, new Y.Doc(), TOPIC);
    expect(store.getPeers(PATH)).toEqual([]);

    const remoteDoc = new Y.Doc();
    const remoteAwareness = new awarenessProtocol.Awareness(remoteDoc);
    remoteAwareness.setLocalStateField("user", {
      name: "Alex",
      color: "#336699",
    });

    mock.triggerEvent(
      TOPIC,
      awarenessFrame(remoteAwareness, [remoteAwareness.clientID]),
    );
    expect(store.getPeers(PATH)).toEqual([
      expect.objectContaining({ name: "Alex", color: "#336699" }),
    ]);

    awarenessProtocol.removeAwarenessStates(
      remoteAwareness,
      [remoteAwareness.clientID],
      "test",
    );
    mock.triggerEvent(
      TOPIC,
      awarenessFrame(remoteAwareness, [remoteAwareness.clientID]),
    );
    expect(store.getPeers(PATH)).toEqual([]);
  });

  it("reconnect-after-drop resyncs with a fresh subscribe/sync only (no missed-event replay)", () => {
    mock = createMockClient("open");
    store = new DocumentStore({ createClient: () => mock });
    store.acquire(PATH);

    const serverDoc = new Y.Doc();
    getContentText(serverDoc).insert(0, "v1");
    completeHandshake(mock, serverDoc, TOPIC);

    mock.publishes.length = 0;
    mock.setState("closed");
    expect(store.isReconnecting()).toBe(true);
    expect(store.getPeers(PATH)).toEqual([]);

    // Missed while down — never delivered as individual events.
    serverDoc.transact(() => {
      getContentText(serverDoc).delete(0, getContentText(serverDoc).length);
      getContentText(serverDoc).insert(0, "v2-after-drop");
    });

    mock.setState("open");
    completeHandshake(mock, serverDoc, TOPIC);

    const syncPublishes = mock.publishes.filter(
      (p) => (p.body as DocSyncFrame)?.kind === "sync",
    );
    // Fresh handshake only: SyncStep2 + SyncStep1 (stream 3 separate publishes).
    expect(syncPublishes.length).toBe(2);
    expect(getContentText(store.getDoc(PATH)!).toString()).toBe(
      "v2-after-drop",
    );
    expect(store.isReconnecting()).toBe(false);
  });
});
