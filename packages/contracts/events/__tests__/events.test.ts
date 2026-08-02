import { describe, expect, it } from "vitest";
import {
  CHANNEL_RE,
  EventsError,
  MAX_LIST_LIMIT,
  MAX_PAYLOAD_BYTES,
  eventsToolEntries,
  secretFromHeaders,
  validateChannel,
  validateEmitArgs,
  validateListArgs,
} from "../index.js";

const statusOf = (fn: () => void): number => {
  try {
    fn();
  } catch (error) {
    if (error instanceof EventsError) return error.status;
    throw error;
  }
  throw new Error("expected an EventsError");
};

describe("EventsError", () => {
  it("carries an HTTP-ish status, defaulting to 400", () => {
    expect(new EventsError("nope").status).toBe(400);
    expect(new EventsError("later", 501).status).toBe(501);
    expect(new EventsError("nope").name).toBe("EventsError");
  });
});

describe("validateChannel", () => {
  it("accepts channel names with dots, dashes, underscores", () => {
    expect(validateChannel("orders")).toBe("orders");
    expect(validateChannel("form.submitted-events_v2")).toBe("form.submitted-events_v2");
  });

  it("rejects invalid channels with 400", () => {
    expect(statusOf(() => validateChannel(""))).toBe(400);
    expect(statusOf(() => validateChannel(".starts-with-dot"))).toBe(400);
    expect(statusOf(() => validateChannel("Has-Upper"))).toBe(400);
    expect(statusOf(() => validateChannel("a".repeat(129)))).toBe(400);
    expect(statusOf(() => validateChannel(42))).toBe(400);
    expect(CHANNEL_RE.test("a".repeat(128))).toBe(true);
  });
});

describe("validateEmitArgs", () => {
  it("accepts a payload within the size cap, or none at all", () => {
    expect(() => validateEmitArgs({ channel: "orders", type: "order.created" })).not.toThrow();
    expect(() =>
      validateEmitArgs({ channel: "orders", type: "order.created", payload: { id: 7 } }),
    ).not.toThrow();
  });

  it("rejects a missing or empty type with 400", () => {
    expect(statusOf(() => validateEmitArgs({ channel: "orders", type: "" }))).toBe(400);
    expect(statusOf(() => validateEmitArgs({ channel: "orders", type: "  " }))).toBe(400);
  });

  it("rejects unserializable and oversized payloads with 400", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(statusOf(() => validateEmitArgs({ channel: "c", type: "t", payload: cyclic }))).toBe(400);
    expect(
      statusOf(() => validateEmitArgs({ channel: "c", type: "t", payload: "x".repeat(MAX_PAYLOAD_BYTES) })),
    ).toBe(400);
  });
});

describe("validateListArgs", () => {
  it("accepts after XOR cursor", () => {
    expect(() => validateListArgs({ channel: "orders" })).not.toThrow();
    expect(() => validateListArgs({ channel: "orders", after: "0001" })).not.toThrow();
    expect(() => validateListArgs({ channel: "orders", cursor: "opaque" })).not.toThrow();
  });

  it("rejects after AND cursor together with 400", () => {
    expect(statusOf(() => validateListArgs({ channel: "orders", after: "0001", cursor: "opaque" }))).toBe(400);
  });

  it("rejects a limit outside 1..MAX_LIST_LIMIT with 400", () => {
    expect(statusOf(() => validateListArgs({ channel: "orders", limit: 0 }))).toBe(400);
    expect(statusOf(() => validateListArgs({ channel: "orders", limit: MAX_LIST_LIMIT + 1 }))).toBe(400);
  });
});

describe("secretFromHeaders", () => {
  it("extracts the bearer secret and 400s when absent", () => {
    expect(secretFromHeaders({ Authorization: "Bearer tok" }, "ably", "API key")).toBe("tok");
    expect(statusOf(() => secretFromHeaders({}, "ably", "API key"))).toBe(400);
  });
});

describe("eventsToolEntries", () => {
  it("exposes exactly emit and list under the provider prefix", () => {
    const entries = eventsToolEntries("ably");
    expect(entries.map((entry) => entry.name)).toEqual(["ably.emit", "ably.list"]);
    for (const entry of entries) {
      expect(entry.description).toBeTruthy();
      expect(entry.inputSchema).toMatchObject({ type: "object" });
    }
  });

  it("requires channel+type on emit and channel on list", () => {
    const entries = eventsToolEntries("sns");
    const byName = Object.fromEntries(entries.map((entry) => [entry.name, entry.inputSchema]));
    expect(byName["sns.emit"]?.required).toEqual(["channel", "type"]);
    expect(byName["sns.list"]?.required).toEqual(["channel"]);
  });
});
