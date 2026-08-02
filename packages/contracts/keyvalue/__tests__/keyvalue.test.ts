import { describe, expect, it } from "vitest";
import {
  DEFAULT_LIST_LIMIT,
  KeyValueError,
  MAX_KEY_BYTES,
  MAX_LIST_LIMIT,
  MAX_VALUE_BYTES,
  keyvalueToolEntries,
  secretFromHeaders,
  ttlUnsupported,
  validateKey,
  validateListArgs,
  validateSetArgs,
} from "../index.js";

const statusOf = (fn: () => void): number => {
  try {
    fn();
  } catch (error) {
    if (error instanceof KeyValueError) return error.status;
    throw error;
  }
  throw new Error("expected a KeyValueError");
};

describe("KeyValueError", () => {
  it("carries an HTTP-ish status, defaulting to 400", () => {
    expect(new KeyValueError("nope").status).toBe(400);
    expect(new KeyValueError("later", 501).status).toBe(501);
    expect(new KeyValueError("nope").name).toBe("KeyValueError");
  });
});

describe("validateKey", () => {
  it("returns a valid key unchanged", () => {
    expect(validateKey("user:42")).toBe("user:42");
  });

  it("rejects non-strings and empty strings with 400", () => {
    expect(statusOf(() => validateKey(""))).toBe(400);
    expect(statusOf(() => validateKey(42))).toBe(400);
    expect(statusOf(() => validateKey(undefined))).toBe(400);
  });

  it("rejects keys over MAX_KEY_BYTES with 400 (UTF-8 measured)", () => {
    expect(validateKey("k".repeat(MAX_KEY_BYTES))).toHaveLength(MAX_KEY_BYTES);
    expect(statusOf(() => validateKey("k".repeat(MAX_KEY_BYTES + 1)))).toBe(400);
    // 3-byte UTF-8 chars: 342 chars * 3 = 1026 bytes > 1024
    expect(statusOf(() => validateKey("€".repeat(342)))).toBe(400);
  });
});

describe("validateSetArgs", () => {
  it("accepts any JSON-serializable value within the size cap", () => {
    expect(() => validateSetArgs({ key: "a", value: { nested: [1, "two", null] } })).not.toThrow();
    expect(() => validateSetArgs({ key: "a", value: null })).not.toThrow();
  });

  it("rejects unserializable and undefined values with 400", () => {
    expect(statusOf(() => validateSetArgs({ key: "a", value: undefined }))).toBe(400);
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(statusOf(() => validateSetArgs({ key: "a", value: cyclic }))).toBe(400);
  });

  it("rejects values over MAX_VALUE_BYTES serialized with 400", () => {
    expect(statusOf(() => validateSetArgs({ key: "a", value: "x".repeat(MAX_VALUE_BYTES) }))).toBe(400);
    expect(() => validateSetArgs({ key: "a", value: "x".repeat(MAX_VALUE_BYTES - 2) })).not.toThrow();
  });

  it("rejects a non-positive or non-numeric ttl_seconds with 400", () => {
    expect(statusOf(() => validateSetArgs({ key: "a", value: 1, ttl_seconds: 0 }))).toBe(400);
    expect(statusOf(() => validateSetArgs({ key: "a", value: 1, ttl_seconds: -5 }))).toBe(400);
    expect(
      statusOf(() => validateSetArgs({ key: "a", value: 1, ttl_seconds: "1h" as unknown as number })),
    ).toBe(400);
    expect(() => validateSetArgs({ key: "a", value: 1, ttl_seconds: 60 })).not.toThrow();
  });
});

describe("validateListArgs", () => {
  it("accepts empty args and valid paging", () => {
    expect(() => validateListArgs()).not.toThrow();
    expect(() => validateListArgs({ prefix: "user:", cursor: "abc", limit: DEFAULT_LIST_LIMIT })).not.toThrow();
  });

  it("rejects a limit outside 1..MAX_LIST_LIMIT with 400", () => {
    expect(statusOf(() => validateListArgs({ limit: 0 }))).toBe(400);
    expect(statusOf(() => validateListArgs({ limit: MAX_LIST_LIMIT + 1 }))).toBe(400);
    expect(statusOf(() => validateListArgs({ limit: 1.5 }))).toBe(400);
  });

  it("rejects an empty cursor with 400", () => {
    expect(statusOf(() => validateListArgs({ cursor: "" }))).toBe(400);
  });
});

describe("ttlUnsupported", () => {
  it("is the documented 501 naming the provider", () => {
    const error = ttlUnsupported("valkey");
    expect(error.status).toBe(501);
    expect(error.message).toBe("ttl not supported by valkey");
  });
});

describe("secretFromHeaders", () => {
  it("extracts the bearer secret case-insensitively", () => {
    expect(secretFromHeaders({ Authorization: "Bearer s3cret" }, "valkey", "server token")).toBe("s3cret");
    expect(secretFromHeaders({ authorization: "bearer s3cret" }, "valkey", "server token")).toBe("s3cret");
  });

  it("throws 400 naming the provider when absent", () => {
    expect(statusOf(() => secretFromHeaders(undefined, "valkey", "server token"))).toBe(400);
  });
});

describe("keyvalueToolEntries", () => {
  it("exposes exactly the four contract operations under the provider prefix", () => {
    const entries = keyvalueToolEntries("valkey");
    expect(entries.map((entry) => entry.name)).toEqual([
      "valkey.get",
      "valkey.set",
      "valkey.delete",
      "valkey.list",
    ]);
    for (const entry of entries) {
      expect(entry.description).toBeTruthy();
      expect(entry.inputSchema).toMatchObject({ type: "object" });
    }
  });

  it("requires key on get/set/delete and nothing on list", () => {
    const entries = keyvalueToolEntries("kv");
    const byName = Object.fromEntries(entries.map((entry) => [entry.name, entry.inputSchema]));
    expect(byName["kv.get"]?.required).toEqual(["key"]);
    expect(byName["kv.set"]?.required).toEqual(["key", "value"]);
    expect(byName["kv.delete"]?.required).toEqual(["key"]);
    expect(byName["kv.list"]?.required).toBeUndefined();
  });
});
