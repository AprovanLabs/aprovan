/**
 * unified-code-editor acceptance: write policies.
 * direct / staged / read-only resolution from prefix sets.
 */
import { describe, expect, it } from "vitest";
import {
  normalizePolicyPath,
  resolveWritePolicy,
  type StagedPrefixSets,
} from "./write-policy-resolve";

function sets(partial: Partial<StagedPrefixSets>): StagedPrefixSets {
  return {
    appPrefixes: [],
    mounts: [],
    loadedAt: Date.now(),
    ...partial,
  };
}

describe("unified-code-editor: write policies", () => {
  it("resolves plain workspace paths as direct", () => {
    expect(resolveWritePolicy("notes/todo.md", sets({}))).toBe("direct");
    expect(resolveWritePolicy("/widgets/main.tsx", sets({}))).toBe("direct");
  });

  it("resolves app source prefixes as staged", () => {
    const s = sets({ appPrefixes: ["apps/demo"] });
    expect(resolveWritePolicy("apps/demo/index.tsx", s)).toBe("staged");
    expect(resolveWritePolicy("apps/demo/lib/util.ts", s)).toBe("staged");
    expect(resolveWritePolicy("apps/other/index.tsx", s)).toBe("direct");
  });

  it("resolves non-writable mounts as read-only", () => {
    const s = sets({
      mounts: [{ prefix: "repos/upstream", writable: false }],
    });
    expect(resolveWritePolicy("repos/upstream/README.md", s)).toBe("readonly");
    expect(resolveWritePolicy("repos/upstream/src/a.ts", s)).toBe("readonly");
  });

  it("resolves writable mounts as staged", () => {
    const s = sets({
      mounts: [{ prefix: "repos/mine", writable: true }],
    });
    expect(resolveWritePolicy("repos/mine/file.ts", s)).toBe("staged");
  });

  it("prefers the longest matching prefix", () => {
    const s = sets({
      appPrefixes: ["apps", "apps/demo"],
      mounts: [{ prefix: "apps/demo/vendor", writable: false }],
    });
    expect(resolveWritePolicy("apps/demo/vendor/x.ts", s)).toBe("readonly");
    expect(resolveWritePolicy("apps/demo/index.tsx", s)).toBe("staged");
  });

  it("normalizes leading/trailing slashes before matching", () => {
    expect(normalizePolicyPath("/a/b/")).toBe("a/b");
    const s = sets({ appPrefixes: ["apps/demo"] });
    expect(resolveWritePolicy("/apps/demo/index.tsx/", s)).toBe("staged");
  });

  it("does not invent staged routes on a cold cache", () => {
    const cold: StagedPrefixSets = {
      appPrefixes: ["apps/demo"],
      mounts: [],
      loadedAt: 0,
    };
    // Cold cache still matches known prefixes if present, but loadedAt===0
    // with empty prefixes yields direct (fail-open for unsaved workspace).
    expect(resolveWritePolicy("notes/a.md", { ...cold, appPrefixes: [] })).toBe(
      "direct",
    );
  });
});
