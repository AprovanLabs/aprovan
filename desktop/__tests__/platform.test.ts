import { describe, expect, it } from "vitest";
import {
  MIN_DARWIN_MAJOR,
  evaluatePlatformFloor,
} from "../src/platform.js";

describe("platform floor", () => {
  it("accepts macOS 14+ Apple Silicon", () => {
    expect(
      evaluatePlatformFloor({
        platform: "darwin",
        arch: "arm64",
        release: `${MIN_DARWIN_MAJOR}.0.0`,
      }),
    ).toEqual({ ok: true });

    expect(
      evaluatePlatformFloor({
        platform: "darwin",
        arch: "arm64",
        release: "24.1.0",
      }),
    ).toEqual({ ok: true });
  });

  it("refuses Intel Macs in plain language", () => {
    const result = evaluatePlatformFloor({
      platform: "darwin",
      arch: "x64",
      release: "23.6.0",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/Apple Silicon/i);
      expect(result.message).toMatch(/Intel/i);
    }
  });

  it("refuses macOS below 14 in plain language", () => {
    const result = evaluatePlatformFloor({
      platform: "darwin",
      arch: "arm64",
      release: "22.6.0",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/macOS 14/i);
      expect(result.message).toMatch(/older version/i);
    }
  });

  it("refuses non-macOS platforms", () => {
    const result = evaluatePlatformFloor({
      platform: "linux",
      arch: "arm64",
      release: "6.8.0",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/macOS 14/i);
      expect(result.message).toMatch(/not running macOS/i);
    }
  });
});
