/**
 * Native key-value — `@utdk/keyvalue` over an injectable record backend.
 * Absence is explicit (`found: false`), distinguishable from a stored empty
 * value.
 */

import {
  DEFAULT_LIST_LIMIT,
  KeyValueError,
  ttlUnsupported,
  validateKey,
  validateListArgs,
  validateSetArgs,
  type KeyValueClient,
  type KeyValueDeleteArgs,
  type KeyValueDeleteResult,
  type KeyValueGetArgs,
  type KeyValueGetResult,
  type KeyValueListArgs,
  type KeyValueListResult,
  type KeyValueSetArgs,
  type KeyValueSetResult,
} from "@utdk/keyvalue";

export interface NativeKeyValueEntry {
  value: unknown;
  updatedAt: string;
  expiresAt?: string;
}

export interface NativeKeyValueBackend {
  get(key: string): Promise<NativeKeyValueEntry | undefined>;
  set(key: string, value: unknown, ttlSeconds?: number): Promise<NativeKeyValueEntry>;
  delete(key: string): Promise<boolean>;
  list(args: { prefix?: string; cursor?: string; limit: number }): Promise<{
    keys: Array<{ key: string; updatedAt?: string; expiresAt?: string }>;
    cursor?: string;
  }>;
  /** When false, `ttl_seconds` raises 501. Default true for memory backend. */
  supportsTtl?: boolean;
}

export interface NativeKeyValueOptions {
  backend: NativeKeyValueBackend;
  providerLabel?: string;
}

export function createNativeKeyValue(options: NativeKeyValueOptions): KeyValueClient {
  const { backend, providerLabel = "aprovan" } = options;
  return {
    async get(args: KeyValueGetArgs): Promise<KeyValueGetResult> {
      const key = validateKey(args.key);
      const hit = await backend.get(key);
      if (!hit) return { key, value: undefined, found: false };
      return {
        key,
        value: hit.value,
        found: true,
        updatedAt: hit.updatedAt,
        ...(hit.expiresAt !== undefined ? { expiresAt: hit.expiresAt } : {}),
      };
    },

    async set(args: KeyValueSetArgs): Promise<KeyValueSetResult> {
      validateSetArgs(args);
      if (args.ttl_seconds !== undefined && backend.supportsTtl === false) {
        throw ttlUnsupported(providerLabel);
      }
      const entry = await backend.set(args.key, args.value, args.ttl_seconds);
      return {
        key: args.key,
        updatedAt: entry.updatedAt,
        ...(entry.expiresAt !== undefined ? { expiresAt: entry.expiresAt } : {}),
      };
    },

    async delete(args: KeyValueDeleteArgs): Promise<KeyValueDeleteResult> {
      const key = validateKey(args.key);
      const deleted = await backend.delete(key);
      return { key, deleted };
    },

    async list(args: KeyValueListArgs = {}): Promise<KeyValueListResult> {
      validateListArgs(args);
      return backend.list({
        ...(args.prefix !== undefined ? { prefix: args.prefix } : {}),
        ...(args.cursor !== undefined ? { cursor: args.cursor } : {}),
        limit: args.limit ?? DEFAULT_LIST_LIMIT,
      });
    },
  };
}

export function createMemoryKeyValueBackend(): NativeKeyValueBackend {
  const rows = new Map<string, NativeKeyValueEntry>();
  return {
    supportsTtl: true,
    async get(key) {
      const hit = rows.get(key);
      if (!hit) return undefined;
      if (hit.expiresAt && Date.parse(hit.expiresAt) <= Date.now()) {
        rows.delete(key);
        return undefined;
      }
      return hit;
    },
    async set(key, value, ttlSeconds) {
      const updatedAt = new Date().toISOString();
      const entry: NativeKeyValueEntry = {
        value,
        updatedAt,
        ...(ttlSeconds !== undefined
          ? { expiresAt: new Date(Date.now() + ttlSeconds * 1000).toISOString() }
          : {}),
      };
      rows.set(key, entry);
      return entry;
    },
    async delete(key) {
      return rows.delete(key);
    },
    async list({ prefix = "", cursor, limit }) {
      const keys = [...rows.keys()]
        .filter((key) => key.startsWith(prefix))
        .sort();
      let start = 0;
      if (cursor) {
        const idx = keys.indexOf(cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const page = keys.slice(start, start + limit).map((key) => {
        const entry = rows.get(key)!;
        return {
          key,
          updatedAt: entry.updatedAt,
          ...(entry.expiresAt !== undefined ? { expiresAt: entry.expiresAt } : {}),
        };
      });
      const next = start + limit < keys.length ? page[page.length - 1]?.key : undefined;
      return { keys: page, ...(next ? { cursor: next } : {}) };
    },
  };
}

// Re-export for callers that need the error type without pulling @utdk/keyvalue.
export { KeyValueError };
