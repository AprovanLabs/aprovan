/**
 * @utdk/events — the shared events contract for UTDK event-stream providers.
 *
 * Append-only channels with two operations, `emit` and `list`, mirroring the
 * workspace core service so the native implementation registers unchanged
 * while a Redis Streams, SNS, or Ably backend is one thin provider module.
 *
 * Semantics that hold across every implementation:
 *
 *   - channels are append-only; delivery is at-least-once; there are NO
 *     delivery semantics in the contract (subscriptions/webhooks are
 *     product-plane, not vendor-swappable);
 *   - event ids are provider-assigned, unique per channel, and
 *     lexicographically ordered within the channel — `after` cursors ride
 *     on that ordering;
 *   - channel names match {@link CHANNEL_RE} (dots are fine here: a channel
 *     is not provider identity);
 *   - an unknown channel lists as empty, not 404 — emit-then-list must not
 *     race channel creation;
 *   - `after` (exclusive event id) and `cursor` (opaque page token) are
 *     mutually exclusive (400 if both).
 */

/** Serialized payload cap: 256 KiB of JSON. */
export const MAX_PAYLOAD_BYTES = 262_144;

export const DEFAULT_LIST_LIMIT = 100;
export const MAX_LIST_LIMIT = 1_000;

/** Channel names; dots fine here — a channel is not provider identity. */
export const CHANNEL_RE = /^[a-z0-9][a-z0-9._-]{0,127}$/;

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class EventsError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "EventsError";
    this.status = status;
  }
}

export interface EventRecord {
  /**
   * Provider-assigned, unique per channel, lexicographically ordered within
   * the channel.
   */
  id: string;
  channel: string;
  /** Caller-defined, e.g. "form.submitted". */
  type: string;
  /** JSON-serializable, ≤ MAX_PAYLOAD_BYTES serialized. */
  payload?: unknown;
  /** ISO-8601, provider clock. */
  timestamp: string;
}

export interface EventsEmitArgs {
  channel: string;
  type: string;
  payload?: unknown;
}

export interface EventsEmitResult {
  id: string;
  channel: string;
  timestamp: string;
}

export interface EventsListArgs {
  channel: string;
  /** Exclusive event id to resume after. Mutually exclusive with cursor. */
  after?: string;
  /** Opaque continuation token from a previous page. */
  cursor?: string;
  limit?: number;
}

export interface EventsListResult {
  channel: string;
  /** Oldest first. An unknown channel is an empty list, not a 404. */
  events: EventRecord[];
  /** Opaque; absent ⇒ end of listing. */
  cursor?: string;
}

export interface EventsClient {
  emit(args: EventsEmitArgs): Promise<EventsEmitResult>;
  list(args: EventsListArgs): Promise<EventsListResult>;
}

/** Options every events provider client factory accepts. */
export interface EventsClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName: string,
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new EventsError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

const utf8Bytes = (value: string): number => new TextEncoder().encode(value).length;

/** Validated channel name per CHANNEL_RE; 400 otherwise. */
export function validateChannel(raw: unknown): string {
  if (typeof raw !== "string" || !CHANNEL_RE.test(raw)) {
    throw new EventsError(
      `channel must match ${CHANNEL_RE} (lowercase alphanumeric start, then [a-z0-9._-], max 128 chars)`,
      400,
    );
  }
  return raw;
}

export function validateEmitArgs(args: EventsEmitArgs): void {
  validateChannel(args.channel);
  if (typeof args.type !== "string" || args.type.trim() === "") {
    throw new EventsError("type must be a non-empty string (e.g. \"form.submitted\")", 400);
  }
  if (args.payload !== undefined) {
    let serialized: string | undefined;
    try {
      serialized = JSON.stringify(args.payload);
    } catch {
      throw new EventsError("payload must be JSON-serializable", 400);
    }
    if (serialized === undefined) {
      throw new EventsError("payload must be JSON-serializable", 400);
    }
    if (utf8Bytes(serialized) > MAX_PAYLOAD_BYTES) {
      throw new EventsError(`payload exceeds ${MAX_PAYLOAD_BYTES} bytes serialized`, 400);
    }
  }
}

export function validateListArgs(args: EventsListArgs): void {
  validateChannel(args.channel);
  if (args.after !== undefined && args.cursor !== undefined) {
    throw new EventsError("after and cursor are mutually exclusive — pass one or the other", 400);
  }
  if (args.after !== undefined && (typeof args.after !== "string" || args.after === "")) {
    throw new EventsError("after must be a non-empty event id", 400);
  }
  if (args.cursor !== undefined && (typeof args.cursor !== "string" || args.cursor === "")) {
    throw new EventsError("cursor must be a non-empty string", 400);
  }
  if (args.limit !== undefined) {
    if (!Number.isInteger(args.limit) || args.limit <= 0 || args.limit > MAX_LIST_LIMIT) {
      throw new EventsError(`limit must be an integer between 1 and ${MAX_LIST_LIMIT}`, 400);
    }
  }
}

/**
 * Tool-discovery entries for an events provider — the static `tools` export
 * the gateway's `GET /tools` prefers. Two entries.
 */
export function eventsToolEntries(
  provider: string,
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const channel = {
    type: "string",
    description: "Channel name (append-only stream; created implicitly on first emit)",
  };
  return [
    {
      name: `${provider}.emit`,
      description:
        `Append one event to a channel. payload is any JSON-serializable value (≤ ${MAX_PAYLOAD_BYTES} bytes serialized); ` +
        "returns { id, channel, timestamp } with a provider-assigned, channel-ordered id.",
      inputSchema: {
        type: "object",
        properties: {
          channel,
          type: { type: "string", description: 'Caller-defined event type, e.g. "form.submitted"' },
          payload: { description: "JSON-serializable event payload" },
        },
        required: ["channel", "type"],
      },
    },
    {
      name: `${provider}.list`,
      description:
        "List a channel's events oldest-first. after (exclusive event id) and cursor (opaque page token) are " +
        "mutually exclusive; an unknown channel returns an empty list, not an error.",
      inputSchema: {
        type: "object",
        properties: {
          channel,
          after: { type: "string", description: "Exclusive event id to resume after" },
          cursor: { type: "string", description: "Continuation token from a previous page" },
          limit: { type: "number", description: `Page size (default ${DEFAULT_LIST_LIMIT})` },
        },
        required: ["channel"],
      },
    },
  ];
}
