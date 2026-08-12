/**
 * Client-wide live-doc store: one RealtimeClient, per-path Y.Doc + Awareness
 * over `doc:<path>` (D1 base64-in-JSON frames). Reconnect resyncs via a fresh
 * subscribe handshake — no incremental replay of missed events.
 */

import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import * as awarenessProtocol from "y-protocols/awareness";
import * as syncProtocol from "y-protocols/sync";
import * as Y from "yjs";
import { GATEWAY_BASE } from "@/lib/gateway";
import {
  createRealtimeClient,
  type RealtimeClient,
  type RealtimeState,
} from "@/lib/realtime";

/** base64(y-protocols sync-protocol bytes) */
export type DocSyncFrame = { kind: "sync"; data: string };
/** base64(encodeAwarenessUpdate(...)) */
export type DocAwarenessFrame = { kind: "awareness"; data: string };
export type DocBody = DocSyncFrame | DocAwarenessFrame;

export type DocPeer = {
  clientId: number;
  name: string;
  color: string;
  /** When set, presence cluster renders a bot glyph. */
  agent?: boolean;
};

const REMOTE_ORIGIN = "remote";
const EMPTY_PEERS: DocPeer[] = [];

export function docTopic(path: string): string {
  return `doc:${path}`;
}

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
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

function isDocBody(body: unknown): body is DocBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    (b.kind === "sync" || b.kind === "awareness") && typeof b.data === "string"
  );
}

function syncStep1Frame(doc: Y.Doc): DocSyncFrame {
  const encoder = encoding.createEncoder();
  syncProtocol.writeSyncStep1(encoder, doc);
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

function syncUpdateFrame(update: Uint8Array): DocSyncFrame {
  const encoder = encoding.createEncoder();
  syncProtocol.writeUpdate(encoder, update);
  return { kind: "sync", data: encodeB64(encoding.toUint8Array(encoder)) };
}

type AwarenessUser = {
  name?: string;
  color?: string;
  agent?: boolean;
  userId?: string;
};

function peersFromAwareness(awareness: awarenessProtocol.Awareness): DocPeer[] {
  const self = awareness.clientID;
  const byKey = new Map<string, DocPeer>();
  for (const [clientId, state] of awareness.getStates()) {
    if (clientId === self) continue;
    const user = (state as { user?: AwarenessUser } | undefined)?.user;
    const name =
      typeof user?.name === "string" && user.name.length > 0
        ? user.name
        : `Peer ${clientId}`;
    const key =
      typeof user?.userId === "string" && user.userId.length > 0
        ? user.userId
        : name;
    if (byKey.has(key)) continue;
    byKey.set(key, {
      clientId,
      name,
      color:
        typeof user?.color === "string" && user.color.length > 0
          ? user.color
          : `hsl(${(clientId * 47) % 360} 45% 42%)`,
      agent: Boolean(user?.agent),
    });
  }
  return byKey.size > 0 ? Array.from(byKey.values()) : EMPTY_PEERS;
}

type LiveSession = {
  path: string;
  doc: Y.Doc;
  awareness: awarenessProtocol.Awareness;
  unsubRealtime: () => void;
  offUpdate: () => void;
  offAwareness: () => void;
  peers: DocPeer[];
  synced: boolean;
};

export type DocumentStoreOptions = {
  /** Injectable realtime client factory (tests). */
  createClient?: () => RealtimeClient;
};

export class DocumentStore {
  private client: RealtimeClient | null = null;
  private sessions = new Map<string, LiveSession>();
  private refCounts = new Map<string, number>();
  private listeners = new Set<() => void>();
  private socketState: RealtimeState = "closed";
  private readonly createClient: () => RealtimeClient;

  constructor(options: DocumentStoreOptions = {}) {
    this.createClient = options.createClient ?? (() => createRealtimeClient());
  }

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };

  getSocketState(): RealtimeState {
    return this.socketState;
  }

  /** True while any session is open and the socket is not `open`. */
  isReconnecting(): boolean {
    return this.sessions.size > 0 && this.socketState !== "open";
  }

  getDoc(path: string): Y.Doc | null {
    return this.sessions.get(path)?.doc ?? null;
  }

  getAwareness(path: string): awarenessProtocol.Awareness | null {
    return this.sessions.get(path)?.awareness ?? null;
  }

  getPeers(path: string): DocPeer[] {
    return this.sessions.get(path)?.peers ?? EMPTY_PEERS;
  }

  isSynced(path: string): boolean {
    return this.sessions.get(path)?.synced ?? false;
  }

  /** Retain a live session for `path` (ref-counted). */
  acquire(path: string): void {
    const next = (this.refCounts.get(path) ?? 0) + 1;
    this.refCounts.set(path, next);
    if (next === 1) this.startSession(path);
  }

  /** Release a retain; tears down when the last retain drops. */
  release(path: string): void {
    const cur = this.refCounts.get(path) ?? 0;
    if (cur <= 1) {
      this.refCounts.delete(path);
      this.stopSession(path);
      return;
    }
    this.refCounts.set(path, cur - 1);
  }

  private emit(): void {
    for (const cb of this.listeners) cb();
  }

  private ensureClient(): void {
    if (this.client || !GATEWAY_BASE) return;
    this.client = this.createClient();
    this.socketState = this.client.state;
    this.client.onStateChange((state) => {
      this.socketState = state;
      if (state === "closed") {
        for (const session of this.sessions.values()) {
          this.clearRemoteAwareness(session);
          session.synced = false;
        }
        this.emit();
        return;
      }
      // `open`: RealtimeClient resubscribes live topics; each session's
      // onSnapshot runs a fresh SyncStep1 handshake (no missed-event replay).
      this.emit();
    });
  }

  private startSession(path: string): void {
    this.ensureClient();
    if (!this.client || this.sessions.has(path)) return;

    const doc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(doc);
    const topic = docTopic(path);

    const onDocUpdate = (update: Uint8Array, origin: unknown) => {
      if (origin === REMOTE_ORIGIN) return;
      if (this.socketState !== "open" || !this.client) return;
      this.client.publish(topic, syncUpdateFrame(update));
    };
    doc.on("update", onDocUpdate);

    const onAwarenessChange = (
      {
        added,
        updated,
        removed,
      }: { added: number[]; updated: number[]; removed: number[] },
      origin: unknown,
    ) => {
      if (origin === REMOTE_ORIGIN) {
        this.refreshPeers(path);
        return;
      }
      const changed = added.concat(updated, removed);
      if (changed.length === 0) return;
      if (this.socketState === "open" && this.client) {
        const bytes = awarenessProtocol.encodeAwarenessUpdate(
          awareness,
          changed,
        );
        this.client.publish(topic, {
          kind: "awareness",
          data: encodeB64(bytes),
        } satisfies DocAwarenessFrame);
      }
      this.refreshPeers(path);
    };
    awareness.on("update", onAwarenessChange);

    const unsubRealtime = this.client.subscribe(
      topic,
      (body) => this.onEvent(path, body),
      (body) => this.onSnapshot(path, body),
    );

    this.sessions.set(path, {
      path,
      doc,
      awareness,
      unsubRealtime,
      offUpdate: () => doc.off("update", onDocUpdate),
      offAwareness: () => awareness.off("update", onAwarenessChange),
      peers: EMPTY_PEERS,
      synced: false,
    });
    this.emit();
  }

  private stopSession(path: string): void {
    const session = this.sessions.get(path);
    if (!session) return;
    this.sessions.delete(path);
    session.unsubRealtime();
    session.offUpdate();
    session.offAwareness();
    // Null local awareness before destroy so peers see a leave.
    awarenessProtocol.removeAwarenessStates(
      session.awareness,
      [session.awareness.clientID],
      "local",
    );
    session.awareness.destroy();
    session.doc.destroy();
    this.emit();
  }

  private clearRemoteAwareness(session: LiveSession): void {
    const remote = Array.from(session.awareness.getStates().keys()).filter(
      (id) => id !== session.awareness.clientID,
    );
    if (remote.length > 0) {
      awarenessProtocol.removeAwarenessStates(
        session.awareness,
        remote,
        REMOTE_ORIGIN,
      );
    }
    session.peers = EMPTY_PEERS;
  }

  private refreshPeers(path: string): void {
    const session = this.sessions.get(path);
    if (!session) return;
    session.peers = peersFromAwareness(session.awareness);
    this.emit();
  }

  /**
   * Apply a sync frame to the local doc; return a reply frame when the
   * sync protocol wrote one (SyncStep2 for an incoming SyncStep1).
   */
  applySyncFrame(path: string, frame: DocSyncFrame): DocSyncFrame | null {
    const session = this.sessions.get(path);
    if (!session) return null;
    const decoder = decoding.createDecoder(decodeB64(frame.data));
    const encoder = encoding.createEncoder();
    syncProtocol.readSyncMessage(
      decoder,
      encoder,
      session.doc,
      REMOTE_ORIGIN,
    );
    if (encoding.length(encoder) === 0) return null;
    return {
      kind: "sync",
      data: encodeB64(encoding.toUint8Array(encoder)),
    };
  }

  /** Apply an awareness frame (tests + event path). */
  applyAwarenessFrame(path: string, frame: DocAwarenessFrame): void {
    const session = this.sessions.get(path);
    if (!session) return;
    awarenessProtocol.applyAwarenessUpdate(
      session.awareness,
      decodeB64(frame.data),
      REMOTE_ORIGIN,
    );
    this.refreshPeers(path);
  }

  private onSnapshot(path: string, body: unknown): void {
    if (!isDocBody(body) || body.kind !== "sync") return;
    const session = this.sessions.get(path);
    if (!session || !this.client) return;

    // Handshake: apply server SyncStep1 → publish SyncStep2, then SyncStep1
    // as separate publishes (stream 3: one readSyncMessage per frame).
    const step2 = this.applySyncFrame(path, body);
    if (step2) this.client.publish(docTopic(path), step2);
    this.client.publish(docTopic(path), syncStep1Frame(session.doc));
    session.synced = true;
    this.emit();
  }

  private onEvent(path: string, body: unknown): void {
    if (!isDocBody(body)) return;
    if (body.kind === "awareness") {
      this.applyAwarenessFrame(path, body);
      return;
    }
    const reply = this.applySyncFrame(path, body);
    if (reply && this.client && this.socketState === "open") {
      this.client.publish(docTopic(path), reply);
    }
  }
}

export const documentStore = new DocumentStore();
