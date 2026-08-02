import { describe, it, expect, beforeEach } from "vitest";
import { withSpan, withSpanSync, configureTelemetry } from "../telemetry.js";

beforeEach(async () => {
  // Reset to noop/disabled state before each test
  await configureTelemetry({ enabled: false });
});

describe("withSpan (telemetry disabled)", () => {
  it("executes fn and returns its result when telemetry is disabled", async () => {
    const result = await withSpan({ provider: "github", operation: "repos.list" }, async () => 42);
    expect(result).toBe(42);
  });

  it("propagates errors from fn when telemetry is disabled", async () => {
    await expect(
      withSpan({ provider: "github", operation: "repos.list" }, async () => {
        throw new Error("API error");
      }),
    ).rejects.toThrow("API error");
  });

  it("passes a noop span object to fn", async () => {
    let spanReceived: unknown;
    await withSpan({ provider: "p", operation: "op" }, async (span) => {
      spanReceived = span;
    });
    expect(spanReceived).toBeDefined();
    // Noop span should not throw when methods are called
    expect(() => {
      const s = spanReceived as { setAttribute: (...args: unknown[]) => unknown; end: () => void };
      s.setAttribute("key", "val");
      s.end();
    }).not.toThrow();
  });
});

describe("withSpanSync (telemetry disabled)", () => {
  it("executes fn and returns its result", () => {
    const result = withSpanSync({ provider: "github", operation: "list" }, () => "sync-result");
    expect(result).toBe("sync-result");
  });

  it("propagates errors from fn", () => {
    expect(() =>
      withSpanSync({ provider: "p", operation: "op" }, () => {
        throw new Error("sync error");
      }),
    ).toThrow("sync error");
  });
});

describe("configureTelemetry", () => {
  it("accepts exporter and enabled options without throwing", async () => {
    await expect(configureTelemetry({ enabled: false, exporter: "noop" })).resolves.toBeUndefined();
    await expect(configureTelemetry({ enabled: false, exporter: "console" })).resolves.toBeUndefined();
  });

  it("disables telemetry when enabled is false", async () => {
    await configureTelemetry({ enabled: false, exporter: "console" });
    // withSpan should still work (using noop span)
    const result = await withSpan({ provider: "x", operation: "y" }, async () => "works");
    expect(result).toBe("works");
  });
});
