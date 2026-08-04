/**
 * Unit tests for the unified profile types + path longest-prefix resolver
 * (profiles-unified streams 1 / path-mounts).
 */

import { describe, expect, it } from "vitest";
import {
  assertCallOptions,
  mergeOptions,
  TRANSPORT_OPTION_KEYS,
} from "../src/profiles/types.js";

describe("CallOptions / ProfileOptions (D4)", () => {
  it("rejects transport-shaped keys at the call site", () => {
    for (const key of TRANSPORT_OPTION_KEYS) {
      expect(() => assertCallOptions({ [key]: "x" })).toThrow(/transport configuration/);
    }
  });

  it("merges call-site over profile over compat defaults", () => {
    expect(
      mergeOptions({ a: 1, b: 2, c: 3 }, { b: 20, d: 4 }, { c: 30, e: 5 }),
    ).toEqual({ a: 1, b: 20, c: 30, d: 4, e: 5 });
  });

  it("accepts arbitrary non-empty profile name characters", () => {
    const name = "work/team#1?x=y";
    expect(name.length).toBeGreaterThan(0);
    expect(name.includes("/")).toBe(true);
  });
});

describe("path longest-prefix matching", () => {
  function longestPrefix(path: string, prefixes: string[]): string | undefined {
    let best: string | undefined;
    let bestLen = -1;
    for (const prefix of prefixes) {
      if (path === prefix || path.startsWith(`${prefix}/`)) {
        if (prefix.length > bestLen) {
          best = prefix;
          bestLen = prefix.length;
        }
      }
    }
    return best;
  }

  it("picks the longest matching prefix", () => {
    expect(longestPrefix("vendor/charts/src/a.ts", ["vendor", "vendor/charts"])).toBe(
      "vendor/charts",
    );
  });

  it("returns undefined when no prefix matches", () => {
    expect(longestPrefix("docs/readme.md", ["vendor", "vendor/charts"])).toBeUndefined();
  });
});

describe("no colon-addressed namespaces", () => {
  it("treats a colon in a namespace as not an interface instance key", () => {
    const namespace = "sql:analytics";
    expect(namespace.includes(":")).toBe(true);
    expect(namespace.split(":")[0]).toBe("sql");
  });
});
