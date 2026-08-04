/**
 * Regression: every platform operation either declares an output schema or
 * is marked passthrough (platform-namespace-plugins / "No silent unknowns").
 */

import { describe, expect, it } from "vitest";
import { PASSTHROUGH_OPS } from "../src/platform-output-schemas.js";
import { platformToolEntries } from "../src/platform-plugins.js";
import "../src/services.js";

describe("platform output schemas", () => {
  it("every platform operation declares an output schema or is marked passthrough", () => {
    const entries = platformToolEntries();
    expect(entries.length).toBeGreaterThan(50);
    for (const entry of entries) {
      const hasSchema = entry.outputSchema !== undefined && entry.outputSchema !== null;
      const isPassthrough = entry.passthrough === true;
      expect(
        hasSchema || isPassthrough,
        `${entry.name} must declare outputSchema or passthrough`,
      ).toBe(true);
    }
  });

  it("marks the seven driver-passthrough operations", () => {
    expect([...PASSTHROUGH_OPS].sort()).toEqual(
      [
        "agents.cancelRun",
        "agents.getRun",
        "agents.run",
        "sandboxes.exec",
        "sandboxes.expose",
        "sandboxes.read",
        "sandboxes.write",
      ].sort(),
    );
    const entries = platformToolEntries();
    for (const name of PASSTHROUGH_OPS) {
      const entry = entries.find((e) => e.name === name);
      expect(entry, name).toBeDefined();
      expect(entry!.passthrough, name).toBe(true);
      expect(entry!.outputSchema, `${name} advisory schema`).toBeDefined();
    }
  });

  it("splits apps.data into one operation per result shape", () => {
    const ops = new Set(platformToolEntries().map((e) => e.operation));
    expect(ops.has("dataUsers")).toBe(true);
    expect(ops.has("dataKeys")).toBe(true);
    expect(ops.has("dataGet")).toBe(true);
    expect(ops.has("dataRead")).toBe(true);
    expect(ops.has("data")).toBe(false);
  });
});
