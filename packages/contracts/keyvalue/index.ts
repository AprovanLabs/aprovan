/**
 * @utdk/keyvalue — the shared key-value contract for UTDK storage providers.
 *
 * Mirrors the workspace core service surface (get/set/delete/list) so the
 * native records-backed implementation registers unchanged, while a
 * Valkey/Redis, Cloudflare KV, or DynamoDB backend is one thin provider
 * module speaking the same four operations.
 *
 * Semantics that hold across every implementation:
 *
 *   - keys are flat strings; namespacing/tenancy is the *host's* job (the
 *     executor scopes keys per workspace/profile) — the contract never sees
 *     a hierarchy;
 *   - values are any JSON-serializable payload, capped at
 *     {@link MAX_VALUE_BYTES} once serialized;
 *   - a missing key is NOT an error: `get` reports `found: false` — status
 *     codes are for malformed requests and backend failures;
 *   - `delete` is idempotent (`deleted: false` for a key that wasn't there);
 *   - `list` returns keys only, never values, lexicographically ordered,
 *     with an opaque cursor (absent ⇒ end);
 *   - backends without native TTL reject `ttl_seconds` with a 501 rather
 *     than silently keeping the value forever.
 */

/** Serialized value cap: 256 KiB of JSON. */
export const MAX_VALUE_BYTES = 262_144;

/** Key length cap, in UTF-8 bytes. */
export const MAX_KEY_BYTES = 1_024;

export const DEFAULT_LIST_LIMIT = 100;
export const MAX_LIST_LIMIT = 1_000;

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class KeyValueError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "KeyValueError";
    this.status = status;
  }
}

export interface KeyValueGetArgs {
  key: string;
}

export interface KeyValueGetResult {
  key: string;
  /** Undefined when `found` is false. */
  value: unknown;
  /** A missing key is NOT an error — it reports here. */
  found: boolean;
  updatedAt?: string;
  expiresAt?: string;
}

export interface KeyValueSetArgs {
  key: string;
  /** Any JSON-serializable value; serialized size ≤ MAX_VALUE_BYTES else 400. */
  value: unknown;
  /**
   * Absent ⇒ no expiry. Backends without native TTL reject this with a 501
   * KeyValueError ("ttl not supported by <provider>").
   */
  ttl_seconds?: number;
}

export interface KeyValueSetResult {
  key: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface KeyValueDeleteArgs {
  key: string;
}

/** Idempotent: deleting an absent key reports `deleted: false`, not an error. */
export interface KeyValueDeleteResult {
  key: string;
  deleted: boolean;
}

export interface KeyValueListArgs {
  prefix?: string;
  /** Opaque continuation token from a previous page. */
  cursor?: string;
  limit?: number;
}

export interface KeyValueListResult {
  /** Keys only, never values; lexicographic by key. */
  keys: Array<{ key: string; updatedAt?: string; expiresAt?: string }>;
  /** Opaque; absent ⇒ end of listing. */
  cursor?: string;
}

export interface KeyValueClient {
  get(args: KeyValueGetArgs): Promise<KeyValueGetResult>;
  set(args: KeyValueSetArgs): Promise<KeyValueSetResult>;
  delete(args: KeyValueDeleteArgs): Promise<KeyValueDeleteResult>;
  list(args?: KeyValueListArgs): Promise<KeyValueListResult>;
}

/** Options every key-value provider client factory accepts. */
export interface KeyValueClientOptions {
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
    throw new KeyValueError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

const utf8Bytes = (value: string): number => new TextEncoder().encode(value).length;

/** Validated key: non-empty string, ≤ MAX_KEY_BYTES UTF-8 bytes; 400 otherwise. */
export function validateKey(raw: unknown): string {
  if (typeof raw !== "string" || raw === "") {
    throw new KeyValueError("key must be a non-empty string", 400);
  }
  if (utf8Bytes(raw) > MAX_KEY_BYTES) {
    throw new KeyValueError(`key exceeds ${MAX_KEY_BYTES} bytes`, 400);
  }
  return raw;
}

export function validateSetArgs(args: KeyValueSetArgs): void {
  validateKey(args.key);
  let serialized: string | undefined;
  try {
    serialized = JSON.stringify(args.value);
  } catch {
    throw new KeyValueError("value must be JSON-serializable", 400);
  }
  if (serialized === undefined) {
    throw new KeyValueError("value must be JSON-serializable", 400);
  }
  if (utf8Bytes(serialized) > MAX_VALUE_BYTES) {
    throw new KeyValueError(`value exceeds ${MAX_VALUE_BYTES} bytes serialized`, 400);
  }
  if (args.ttl_seconds !== undefined) {
    if (
      typeof args.ttl_seconds !== "number" ||
      !Number.isFinite(args.ttl_seconds) ||
      args.ttl_seconds <= 0
    ) {
      throw new KeyValueError("ttl_seconds must be a positive number", 400);
    }
  }
}

export function validateListArgs(args: KeyValueListArgs = {}): void {
  if (args.prefix !== undefined && typeof args.prefix !== "string") {
    throw new KeyValueError("prefix must be a string", 400);
  }
  if (args.cursor !== undefined && (typeof args.cursor !== "string" || args.cursor === "")) {
    throw new KeyValueError("cursor must be a non-empty string", 400);
  }
  if (args.limit !== undefined) {
    if (!Number.isInteger(args.limit) || args.limit <= 0 || args.limit > MAX_LIST_LIMIT) {
      throw new KeyValueError(`limit must be an integer between 1 and ${MAX_LIST_LIMIT}`, 400);
    }
  }
}

/** The 501 a backend without native TTL raises when `ttl_seconds` arrives. */
export function ttlUnsupported(provider: string): KeyValueError {
  return new KeyValueError(`ttl not supported by ${provider}`, 501);
}

/**
 * Tool-discovery entries for a key-value provider — the static `tools`
 * export the gateway's `GET /tools` prefers. Four entries.
 */
export function keyvalueToolEntries(
  provider: string,
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const key = { type: "string", description: "Key to address (flat string; host scopes tenancy)" };
  return [
    {
      name: `${provider}.get`,
      description:
        "Read one key. Returns { key, value, found, updatedAt?, expiresAt? }; a missing key is found:false, not an error.",
      inputSchema: { type: "object", properties: { key }, required: ["key"] },
    },
    {
      name: `${provider}.set`,
      description:
        `Write one key. value is any JSON-serializable payload (≤ ${MAX_VALUE_BYTES} bytes serialized); ` +
        "ttl_seconds sets an expiry where the backend supports it (501 otherwise).",
      inputSchema: {
        type: "object",
        properties: {
          key,
          value: { description: "JSON-serializable value" },
          ttl_seconds: { type: "number", description: "Optional expiry in seconds" },
        },
        required: ["key", "value"],
      },
    },
    {
      name: `${provider}.delete`,
      description: "Delete one key. Idempotent: returns { key, deleted } with deleted:false for an absent key.",
      inputSchema: { type: "object", properties: { key }, required: ["key"] },
    },
    {
      name: `${provider}.list`,
      description:
        `List keys (never values), lexicographic, up to limit (default ${DEFAULT_LIST_LIMIT}, max ${MAX_LIST_LIMIT}), ` +
        "with an opaque cursor for continuation.",
      inputSchema: {
        type: "object",
        properties: {
          prefix: { type: "string", description: "Only keys starting with this prefix" },
          cursor: { type: "string", description: "Continuation token from a previous page" },
          limit: { type: "number", description: `Page size (default ${DEFAULT_LIST_LIMIT})` },
        },
      },
    },
  ];
}
