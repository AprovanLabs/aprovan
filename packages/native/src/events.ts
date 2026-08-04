/**
 * Native events — `@utdk/events` over an injectable append-only backend.
 * Field names match the contract (`channel`, `type`, `timestamp`), not the
 * older first-party `{ id, ts, userId, payload }` shape.
 */

import {
  DEFAULT_LIST_LIMIT,
  validateEmitArgs,
  validateListArgs,
  type EventRecord,
  type EventsClient,
  type EventsEmitArgs,
  type EventsEmitResult,
  type EventsListArgs,
  type EventsListResult,
} from "@utdk/events";

export interface NativeEventsBackend {
  emit(args: { channel: string; type: string; payload?: unknown }): Promise<EventsEmitResult>;
  list(args: {
    channel: string;
    after?: string;
    cursor?: string;
    limit: number;
  }): Promise<EventsListResult>;
}

export interface NativeEventsOptions {
  backend: NativeEventsBackend;
}

export function createNativeEvents(options: NativeEventsOptions): EventsClient {
  const { backend } = options;
  return {
    async emit(args: EventsEmitArgs): Promise<EventsEmitResult> {
      validateEmitArgs(args);
      return backend.emit({
        channel: args.channel,
        type: args.type,
        ...(args.payload !== undefined ? { payload: args.payload } : {}),
      });
    },

    async list(args: EventsListArgs): Promise<EventsListResult> {
      validateListArgs(args);
      return backend.list({
        channel: args.channel,
        ...(args.after !== undefined ? { after: args.after } : {}),
        ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
        limit: args.limit ?? DEFAULT_LIST_LIMIT,
      });
    },
  };
}

export function createMemoryEventsBackend(): NativeEventsBackend {
  const channels = new Map<string, EventRecord[]>();
  return {
    async emit({ channel, type, payload }) {
      const list = channels.get(channel) ?? [];
      const id = `${String(list.length).padStart(8, "0")}-${crypto.randomUUID().slice(0, 8)}`;
      const timestamp = new Date().toISOString();
      const record: EventRecord = {
        id,
        channel,
        type,
        timestamp,
        ...(payload !== undefined ? { payload } : {}),
      };
      list.push(record);
      channels.set(channel, list);
      return { id, channel, timestamp };
    },
    async list({ channel, after, cursor, limit }) {
      const all = channels.get(channel) ?? [];
      let start = 0;
      if (after) {
        const idx = all.findIndex((event) => event.id === after);
        start = idx >= 0 ? idx + 1 : all.length;
      } else if (cursor) {
        const idx = all.findIndex((event) => event.id === cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const events = all.slice(start, start + limit);
      const next =
        start + limit < all.length ? events[events.length - 1]?.id : undefined;
      return { channel, events, ...(next ? { cursor: next } : {}) };
    },
  };
}
