/**
 * ChatTimelineAdapter — the only module that talks to records.* / realtime.
 *
 * Realtime payloads are hints (T4): message events trigger a canonical
 * re-fetch via fetchWindow/fetchOlder. connectionState surfaces
 * live | reconnecting | reconciling per F5 disconnect/resubscribe.
 */

import {
  isStorageCapError,
  toStorageCapError,
  StorageCapError,
} from "./errors";
import {
  messageKeyPrefix,
  parseChannel,
  parseChatRealtimeEvent,
  parseMessage,
  type Channel,
  type ChatRealtimeEvent,
  type ConnectionState,
  type InstancePresence,
  type Message,
  type Unsubscribe,
} from "./schema";

export type { ConnectionState, InstancePresence, Unsubscribe };

/** Tech-plan ChatTimelineAdapter surface. */
export interface ChatTimelineAdapter {
  fetchWindow(
    channelId: string,
    opts: { before?: string; limit: number },
  ): Promise<Message[]>;
  fetchOlder(
    channelId: string,
    beforeId: string,
    limit: number,
  ): Promise<Message[]>;
  send(channelId: string, body: string, parentId?: string): Promise<Message>;
  onEvent(cb: (e: ChatRealtimeEvent) => void): Unsubscribe;
  connectionState(): ConnectionState;
  presence(): InstancePresence;
  signalTyping(channelId: string): void;
}

/** Record-store bridge (keyvalue / F2 shared partition). */
export type ChatRecordsClient = {
  list(prefix: string): Promise<string[]>;
  get(key: string): Promise<unknown | null>;
};

export type RealtimeSocketState = "connecting" | "open" | "closed";

/** Realtime broker bridge (topic `app:<installId>`). */
export type ChatRealtimeClient = {
  subscribe(
    topic: string,
    onEvent: (body: unknown) => void,
    onSnapshot?: (body: unknown) => void,
  ): Unsubscribe;
  publish(topic: string, body: unknown): void;
  readonly state: RealtimeSocketState;
  onStateChange(cb: (s: RealtimeSocketState) => void): Unsubscribe;
};

export type CreateChatTimelineAdapterOptions = {
  installId: string;
  /** Known at construct time, or filled from subscribe snapshot (D6). */
  instanceId?: string;
  records: ChatRecordsClient;
  realtime: ChatRealtimeClient;
  /**
   * Optional send override (tests). Default publishes `{action:"message"}`
   * then reconciles the canonical row from records via the hint's recordId.
   */
  sendMessage?: (
    channelId: string,
    body: string,
    parentId?: string,
  ) => Promise<Message>;
  /** Default window size for post-hint reconcile. */
  reconcileLimit?: number;
  /** How long send waits for its own fan-out hint before failing. */
  sendTimeoutMs?: number;
};

export type ChatTimelineAdapterHandle = ChatTimelineAdapter & {
  /** Begin subscribe + presence; call once when mounting an instance view. */
  start(): void;
  dispose(): void;
  listChannels(): Promise<Channel[]>;
  /** Channels from the last subscribe snapshot / membership refresh. */
  cachedChannels(): Channel[];
  instanceId(): string | undefined;
};

const DEFAULT_RECONCILE_LIMIT = 50;
const DEFAULT_SEND_TIMEOUT_MS = 8_000;

export function appTopic(installId: string): string {
  return `app:${installId}`;
}

export function createChatTimelineAdapter(
  opts: CreateChatTimelineAdapterOptions,
): ChatTimelineAdapterHandle {
  const topic = appTopic(opts.installId);
  const reconcileLimit = opts.reconcileLimit ?? DEFAULT_RECONCILE_LIMIT;
  const sendTimeoutMs = opts.sendTimeoutMs ?? DEFAULT_SEND_TIMEOUT_MS;

  let instanceId = opts.instanceId;
  let connState: ConnectionState =
    opts.realtime.state === "open" ? "live" : "reconnecting";
  let presence: InstancePresence = { roster: [] };
  let channels: Channel[] = [];
  let started = false;
  let disposed = false;

  const eventListeners = new Set<(e: ChatRealtimeEvent) => void>();
  const unsubs: Unsubscribe[] = [];

  /** Channels currently reconciling (dedupe concurrent hint refetches). */
  const reconcileInFlight = new Map<string, Promise<Message[]>>();

  function setConnState(next: ConnectionState): void {
    if (connState === next) return;
    connState = next;
  }

  function emit(event: ChatRealtimeEvent): void {
    for (const cb of eventListeners) {
      try {
        cb(event);
      } catch {
        // Listener errors must not break the adapter.
      }
    }
  }

  async function loadWindow(
    channelId: string,
    windowOpts: { before?: string; limit: number },
  ): Promise<Message[]> {
    const prefix = messageKeyPrefix(channelId);
    const keys = await opts.records.list(prefix);
    // Keys are `msg#<channelId>#<messageId>`; ULID messageId sorts chronologically.
    const sorted = [...keys].sort();
    let slice = sorted;
    if (windowOpts.before) {
      const beforeKey = `${prefix}${windowOpts.before}`;
      slice = sorted.filter((k) => k < beforeKey);
    }
    const limit = Math.max(0, windowOpts.limit);
    const windowKeys = limit === 0 ? [] : slice.slice(-limit);

    const out: Message[] = [];
    for (const key of windowKeys) {
      const raw = await opts.records.get(key);
      const msg = parseMessage(raw);
      if (msg && msg.channelId === channelId) out.push(msg);
    }
    return out;
  }

  async function reconcileChannel(channelId: string): Promise<Message[]> {
    const existing = reconcileInFlight.get(channelId);
    if (existing) return existing;

    const prev = connState;
    if (prev === "live") setConnState("reconciling");

    const run = loadWindow(channelId, { limit: reconcileLimit }).finally(() => {
      reconcileInFlight.delete(channelId);
      if (connState === "reconciling" && opts.realtime.state === "open") {
        setConnState("live");
      }
    });
    reconcileInFlight.set(channelId, run);
    return run;
  }

  async function handleEvent(body: unknown): Promise<void> {
    const event = parseChatRealtimeEvent(body);
    if (!event) return;

    if (event.kind === "presence") {
      presence = { roster: event.roster };
      emit(event);
      return;
    }

    if (event.kind === "typing") {
      emit(event);
      return;
    }

    if (event.kind === "channel-membership") {
      // Refresh channel list from records; never trust the hint payload.
      channels = await listChannelsFromRecords();
      emit(event);
      return;
    }

    // message hint → canonical re-fetch (T4); do not use hint as truth.
    await reconcileChannel(event.channelId);
    emit(event);
  }

  async function listChannelsFromRecords(): Promise<Channel[]> {
    const keys = await opts.records.list("ch#");
    const out: Channel[] = [];
    for (const key of keys) {
      const raw = await opts.records.get(key);
      const ch = parseChannel(raw);
      if (ch) out.push(ch);
    }
    out.sort(
      (a, b) =>
        a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
    );
    return out;
  }

  function applySnapshot(body: unknown): void {
    if (!body || typeof body !== "object") return;
    const snap = body as Record<string, unknown>;
    if (typeof snap.instanceId === "string") {
      instanceId = snap.instanceId;
    }
    if (Array.isArray(snap.presence)) {
      const roster: Array<{ sub: string; lastActive: string }> = [];
      for (const row of snap.presence) {
        if (!row || typeof row !== "object") continue;
        const r = row as Record<string, unknown>;
        if (typeof r.sub === "string" && typeof r.lastActive === "string") {
          roster.push({ sub: r.sub, lastActive: r.lastActive });
        }
      }
      presence = { roster };
      emit({ kind: "presence", roster });
    }
    if (Array.isArray(snap.channels)) {
      const next: Channel[] = [];
      for (const row of snap.channels) {
        const ch = parseChannel(row);
        if (ch) next.push(ch);
      }
      channels = next;
    }
  }

  async function defaultSend(
    channelId: string,
    body: string,
    parentId?: string,
  ): Promise<Message> {
    const publishBody: Record<string, unknown> = {
      action: "message",
      channelId,
      body,
    };
    if (parentId) publishBody.parentId = parentId;
    if (instanceId) publishBody.instanceId = instanceId;

    const prior = await loadWindow(channelId, { limit: reconcileLimit });
    const priorIds = new Set(prior.map((m) => m.id));

    opts.realtime.publish(topic, publishBody);

    const deadline = Date.now() + sendTimeoutMs;
    while (Date.now() < deadline) {
      if (disposed) throw new Error("adapter disposed");
      // Brief yield — hint-driven reconcile may already have run.
      await new Promise((r) => setTimeout(r, 40));
      const window = await loadWindow(channelId, { limit: reconcileLimit });
      const fresh = window.filter((m) => !priorIds.has(m.id));
      const match = [...fresh]
        .reverse()
        .find(
          (m) =>
            m.body === body &&
            m.channelId === channelId &&
            (parentId ? m.parentId === parentId : !m.parentId),
        );
      if (match) return match;
    }
    throw new Error("Send timed out waiting for canonical record");
  }

  const adapter: ChatTimelineAdapterHandle = {
    async fetchWindow(channelId, windowOpts) {
      return loadWindow(channelId, windowOpts);
    },

    async fetchOlder(channelId, beforeId, limit) {
      return loadWindow(channelId, { before: beforeId, limit });
    },

    async send(channelId, body, parentId) {
      try {
        const sendFn = opts.sendMessage ?? defaultSend;
        return await sendFn(channelId, body, parentId);
      } catch (err) {
        if (isStorageCapError(err)) throw toStorageCapError(err);
        throw err;
      }
    },

    onEvent(cb) {
      eventListeners.add(cb);
      return () => {
        eventListeners.delete(cb);
      };
    },

    connectionState() {
      return connState;
    },

    presence() {
      return presence;
    },

    signalTyping(channelId) {
      // Fire-and-forget, droppable — never await, never throw to the composer.
      try {
        opts.realtime.publish(topic, { action: "typing", channelId });
      } catch {
        // Dropped.
      }
    },

    start() {
      if (started || disposed) return;
      started = true;

      unsubs.push(
        opts.realtime.onStateChange((state) => {
          if (disposed) return;
          if (state === "open") {
            setConnState("reconciling");
            // Resubscribe is handled inside RealtimeClient; snapshot applies
            // channels/presence. Flip to live once open settles.
            queueMicrotask(() => {
              if (!disposed && opts.realtime.state === "open") {
                setConnState("live");
              }
            });
          } else {
            setConnState("reconnecting");
          }
        }),
      );

      unsubs.push(
        opts.realtime.subscribe(
          topic,
          (body) => {
            void handleEvent(body);
          },
          (snap) => {
            applySnapshot(snap);
            if (opts.realtime.state === "open") setConnState("live");
          },
        ),
      );

      // Announce presence (ephemeral).
      try {
        opts.realtime.publish(topic, { action: "presence" });
      } catch {
        // ignore
      }

      if (opts.realtime.state === "open") setConnState("live");
      else setConnState("reconnecting");
    },

    dispose() {
      disposed = true;
      for (const u of unsubs.splice(0)) u();
      eventListeners.clear();
      reconcileInFlight.clear();
    },

    async listChannels() {
      channels = await listChannelsFromRecords();
      return channels;
    },

    cachedChannels() {
      return channels;
    },

    instanceId() {
      return instanceId;
    },
  };

  return adapter;
}

export { StorageCapError };
