/**
 * Model policy — pick an `llm` instance from a profile's candidates by
 * cost/speed (docs/agent-interface.md).
 *
 * This is *selection*, not enforcement: the policy decides which bound
 * instance a run thinks with before the first token is spent. What each
 * candidate costs and how it should be classed is workspace configuration —
 * an instance's binding `options` may carry `tier` and `costPerMTokUsd`, and
 * both flow through `resolveInterfaceForWorkspace().options` like any other
 * binding option (`model` on `llm`, `image` on `sandbox`). A vendor never
 * declares them; the workspace that bound the instance did.
 *
 * The selector is a pure function so the rules can be unit-tested without a
 * workspace: the `agents` service resolves each candidate's binding into an
 * {@link LlmCandidateMeta} and hands the list here.
 */

import type { AgentEffort } from "@utdk/agent";

/**
 * Three speed classes, cheapest first. An ordinal for the same reason the
 * contract's effort is one: vendors agree on no unit, and a workspace
 * labelling `llm:fast` as `fast` is bucketing whatever it knows about the
 * binding — latency, price, model family — into a knob the policy can order.
 */
export type LlmTier = "fast" | "balanced" | "deep";

const TIER_ORDER: readonly LlmTier[] = ["fast", "balanced", "deep"];

/** One candidate instance, as resolved from its binding options. */
export interface LlmCandidateMeta {
  /** The instance namespace (`llm:fast`, `llm:deep`) or bare interface id. */
  instance: string;
  /** Structured pin when candidates come from agent profiles. */
  pin?: { interface: string; profile?: string };
  /** The binding's `options.tier`; an undeclared candidate counts as balanced. */
  tier?: LlmTier;
  /** The binding's `options.costPerMTokUsd` — declared $/1M tokens. */
  costPerMTokUsd?: number;
}

/** The profile's `policy` field: how a run should trade cost against depth. */
export interface AgentModelPolicy {
  effort?: AgentEffort;
  /** Excludes candidates whose *declared* cost exceeds it. */
  maxCostUsd?: number;
  /** A deadline is a speed request: it caps the desired tier to `fast`. */
  deadlineMs?: number;
}

export function parseLlmTier(value: unknown): LlmTier | undefined {
  return value === "fast" || value === "balanced" || value === "deep" ? value : undefined;
}

/**
 * Effort → tier. The two scales measure the same thing at different
 * resolutions, so the mapping is the obvious bucketing: the bottom two effort
 * steps want the cheap model, the top two want the deep one, and the middle
 * of one scale is the middle of the other.
 */
export function tierForEffort(effort: AgentEffort | undefined): LlmTier {
  switch (effort) {
    case "minimal":
    case "low":
      return "fast";
    case "high":
    case "max":
      return "deep";
    default:
      return "balanced";
  }
}

/**
 * Pick one instance. The rules, in order:
 *
 *   1. **Cost cap** — `maxCostUsd` excludes candidates whose declared
 *      `costPerMTokUsd` exceeds it. A candidate with no declared cost passes:
 *      the cap can only act on what a binding admits to, and treating silence
 *      as "too expensive" would make an unannotated binding unusable the day
 *      someone sets a cap.
 *   2. **Desired tier** — from `effort` via {@link tierForEffort}; a
 *      `deadlineMs` overrides it to `fast`, because a deadline is a speed
 *      request whatever the effort says.
 *   3. **Nearest tier wins, ties round down** — the same rule as
 *      `nearestEffort`: on a two-tier candidate list the middle of the scale
 *      must not silently become the most expensive setting. Declaration order
 *      breaks remaining ties, so the profile's preference is the tiebreaker.
 *
 * Returns `undefined` when the cost cap excluded everything; the caller falls
 * back to `profile.llm`, then the default `llm` instance.
 */
export function selectLlmInstance(
  candidates: readonly LlmCandidateMeta[],
  policy: AgentModelPolicy,
): string | undefined {
  const affordable = candidates.filter(
    (candidate) =>
      policy.maxCostUsd === undefined ||
      candidate.costPerMTokUsd === undefined ||
      candidate.costPerMTokUsd <= policy.maxCostUsd,
  );
  if (affordable.length === 0) return undefined;

  const desired = policy.deadlineMs !== undefined ? "fast" : tierForEffort(policy.effort);
  const target = TIER_ORDER.indexOf(desired);

  let best: LlmCandidateMeta | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  let bestTierIndex = Number.POSITIVE_INFINITY;
  for (const candidate of affordable) {
    const tierIndex = TIER_ORDER.indexOf(candidate.tier ?? "balanced");
    const distance = Math.abs(tierIndex - target);
    // `<` on both comparisons, scanning in declaration order: a strictly
    // closer tier wins; on a tied distance the *lower* tier wins; a tie on
    // both keeps the earlier candidate.
    if (distance < bestDistance || (distance === bestDistance && tierIndex < bestTierIndex)) {
      best = candidate;
      bestDistance = distance;
      bestTierIndex = tierIndex;
    }
  }
  return best?.instance;
}
