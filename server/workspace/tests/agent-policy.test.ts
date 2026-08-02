/**
 * The model-policy selector (src/agents/policy.ts) — a pure function over
 * candidate metadata, tested without a workspace. The rules under test are
 * the documented three: cost cap filters on *declared* cost, effort maps to
 * tier (deadline forces fast), nearest tier wins with ties rounding down.
 */

import { describe, expect, it } from "vitest";
import {
  parseLlmTier,
  selectLlmInstance,
  tierForEffort,
  type LlmCandidateMeta,
} from "../src/agents/policy.js";

const fast: LlmCandidateMeta = { instance: "llm:fast", tier: "fast", costPerMTokUsd: 1 };
const balanced: LlmCandidateMeta = { instance: "llm:mid", tier: "balanced", costPerMTokUsd: 5 };
const deep: LlmCandidateMeta = { instance: "llm:deep", tier: "deep", costPerMTokUsd: 15 };

describe("tierForEffort", () => {
  it("buckets the five-step ordinal onto three tiers", () => {
    expect(tierForEffort("minimal")).toBe("fast");
    expect(tierForEffort("low")).toBe("fast");
    expect(tierForEffort("medium")).toBe("balanced");
    expect(tierForEffort("high")).toBe("deep");
    expect(tierForEffort("max")).toBe("deep");
  });

  it("defaults an unstated effort to the middle of the scale", () => {
    expect(tierForEffort(undefined)).toBe("balanced");
  });
});

describe("parseLlmTier", () => {
  it("accepts only the three tiers; binding options are user input", () => {
    expect(parseLlmTier("fast")).toBe("fast");
    expect(parseLlmTier("deep")).toBe("deep");
    expect(parseLlmTier("cheap")).toBeUndefined();
    expect(parseLlmTier(3)).toBeUndefined();
  });
});

describe("selectLlmInstance", () => {
  it("picks the tier the effort asks for", () => {
    expect(selectLlmInstance([fast, balanced, deep], { effort: "low" })).toBe("llm:fast");
    expect(selectLlmInstance([fast, balanced, deep], { effort: "medium" })).toBe("llm:mid");
    expect(selectLlmInstance([fast, balanced, deep], { effort: "max" })).toBe("llm:deep");
  });

  it("snaps onto the nearest tier when the wanted one is missing", () => {
    expect(selectLlmInstance([fast, deep], { effort: "medium" })).toBe("llm:fast");
    expect(selectLlmInstance([balanced], { effort: "max" })).toBe("llm:mid");
  });

  it("rounds a tie down — medium never silently buys the deep model", () => {
    // fast and deep are equidistant from balanced; the cheaper one wins,
    // the nearestEffort rule applied to tiers.
    expect(selectLlmInstance([deep, fast], { effort: "medium" })).toBe("llm:fast");
  });

  it("treats a deadline as a speed request, whatever the effort says", () => {
    expect(selectLlmInstance([fast, deep], { effort: "max", deadlineMs: 5_000 })).toBe(
      "llm:fast",
    );
  });

  it("excludes candidates whose declared cost exceeds the cap", () => {
    // deep (15 $/MTok) is over the cap, so high effort settles for fast.
    expect(selectLlmInstance([fast, deep], { effort: "high", maxCostUsd: 5 })).toBe("llm:fast");
  });

  it("lets an undeclared cost pass the cap — silence is not 'too expensive'", () => {
    const unpriced: LlmCandidateMeta = { instance: "llm:mystery", tier: "deep" };
    expect(selectLlmInstance([unpriced], { effort: "high", maxCostUsd: 1 })).toBe("llm:mystery");
  });

  it("returns undefined when the cap excluded everything (caller falls back)", () => {
    expect(selectLlmInstance([deep], { maxCostUsd: 5 })).toBeUndefined();
    expect(selectLlmInstance([], {})).toBeUndefined();
  });

  it("counts an untiered candidate as balanced and breaks ties by declaration order", () => {
    const untiered: LlmCandidateMeta = { instance: "llm:plain" };
    expect(selectLlmInstance([untiered], { effort: "medium" })).toBe("llm:plain");
    const first: LlmCandidateMeta = { instance: "llm:a", tier: "fast" };
    const second: LlmCandidateMeta = { instance: "llm:b", tier: "fast" };
    expect(selectLlmInstance([first, second], { effort: "low" })).toBe("llm:a");
  });
});
