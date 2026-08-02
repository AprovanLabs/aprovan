/**
 * Span ↔ step correlation — the bridge between a persisted run's trace and
 * the statically analysed flow graph.
 *
 * A gateway span records `namespace.procedure`; a FlowStep records
 * `object.method`. Matching those alone is ambiguous (the same call can appear
 * at several steps, and a loop can hit one step many times), so spans are
 * consumed in execution order against the steps in source order:
 *
 *   1. forward scan from the cursor for the next unconsumed matching step —
 *      the normal straight-line case;
 *   2. failing that, a scan from the start, so re-entrant calls (loops,
 *      retries, repeated helpers) land back on the step they came from;
 *   3. failing that, the span is *unmatched* and stays visible as such.
 *
 * Steps that no span ever claimed come back as "skipped". Neither failure
 * mode is hidden: unmatched spans and never-executed steps are both reported
 * and rendered distinctly.
 */

import type { FlowAnalysis, FlowStep } from "./types";

/** Structural subset of the gateway's WorkflowRun span record. */
export interface TraceSpan {
  namespace: string;
  procedure: string;
  startedAt: string;
  durationMs: number;
  ok: boolean;
  error?: string;
}

export type StepStatus = "ok" | "failed" | "skipped";

export interface StepOutcome {
  status: StepStatus;
  /** Span ids (index into the run's span list, as RunView labels them). */
  spanIds: string[];
  /** Summed duration across every execution of this step. */
  durationMs: number;
  /** First error seen at this step. */
  error?: string;
}

export interface RunCorrelation {
  /** FlowStep.id → what the run did there. */
  steps: Map<number, StepOutcome>;
  /** Span id → the FlowStep.id it was attributed to. */
  spanStep: Map<string, number>;
  /** Spans that matched no step in the script. */
  unmatchedSpanIds: string[];
}

export const EMPTY_CORRELATION: RunCorrelation = {
  steps: new Map(),
  spanStep: new Map(),
  unmatchedSpanIds: [],
};

/**
 * Every step that issues a call, in source order. `Promise.all` itself makes
 * no call — its lanes do — so it is skipped here and its outcome derived from
 * its lanes afterwards.
 */
function flattenCallSteps(steps: FlowStep[], out: FlowStep[] = []): FlowStep[] {
  for (const step of steps) {
    if (step.parallel) flattenCallSteps(step.calls, out);
    else out.push(step);
    for (const block of step.nested) flattenCallSteps(block.steps, out);
  }
  return out;
}

function signatureMatches(step: FlowStep, span: TraceSpan, objectQualified: boolean): boolean {
  if (step.method !== span.procedure) return false;
  return objectQualified ? step.object === span.namespace : true;
}

function record(
  outcomes: Map<number, StepOutcome>,
  step: FlowStep,
  span: TraceSpan,
  spanId: string,
): void {
  const existing = outcomes.get(step.id);
  if (!existing) {
    outcomes.set(step.id, {
      status: span.ok ? "ok" : "failed",
      spanIds: [spanId],
      durationMs: span.durationMs,
      error: span.error,
    });
    return;
  }
  existing.spanIds.push(spanId);
  existing.durationMs += span.durationMs;
  // A single failure across repeats is what a reader needs to see.
  if (!span.ok) {
    existing.status = "failed";
    existing.error ??= span.error;
  }
}

export function correlateRun(analysis: FlowAnalysis, spans: TraceSpan[]): RunCorrelation {
  const callSteps = flattenCallSteps(analysis.steps);
  const outcomes = new Map<number, StepOutcome>();
  const spanStep = new Map<string, number>();
  const unmatchedSpanIds: string[] = [];
  const consumed = new Set<number>();
  let cursor = 0;

  for (const [index, span] of spans.entries()) {
    const spanId = `${index}`;

    // Object-qualified first (github.repos.get → github.get); the local
    // binding name is normally the namespace, but a script can alias or
    // destructure it, so fall back to the procedure name alone.
    let hit = -1;
    for (const qualified of [true, false]) {
      for (let i = cursor; i < callSteps.length; i += 1) {
        const step = callSteps[i];
        if (!step || consumed.has(i)) continue;
        if (signatureMatches(step, span, qualified)) {
          hit = i;
          break;
        }
      }
      if (hit >= 0) break;
      for (let i = 0; i < cursor; i += 1) {
        const step = callSteps[i];
        if (step && signatureMatches(step, span, qualified)) {
          hit = i;
          break;
        }
      }
      if (hit >= 0) break;
    }

    if (hit < 0) {
      unmatchedSpanIds.push(spanId);
      continue;
    }

    const step = callSteps[hit];
    if (!step) continue;
    if (hit >= cursor) {
      consumed.add(hit);
      cursor = hit + 1;
    }
    record(outcomes, step, span, spanId);
    spanStep.set(spanId, step.id);
  }

  for (const step of callSteps) {
    if (!outcomes.has(step.id)) {
      outcomes.set(step.id, { status: "skipped", spanIds: [], durationMs: 0 });
    }
  }

  // Roll lane outcomes up onto their Promise.all node.
  const rollUp = (steps: FlowStep[]) => {
    for (const step of steps) {
      if (step.parallel) {
        rollUp(step.calls);
        const lanes = step.calls.map((call) => outcomes.get(call.id)).filter(Boolean) as StepOutcome[];
        const failed = lanes.find((lane) => lane.status === "failed");
        outcomes.set(step.id, {
          status: failed ? "failed" : lanes.some((lane) => lane.status === "ok") ? "ok" : "skipped",
          spanIds: lanes.flatMap((lane) => lane.spanIds),
          durationMs: Math.max(0, ...lanes.map((lane) => lane.durationMs)),
          error: failed?.error,
        });
      }
      for (const block of step.nested) rollUp(block.steps);
    }
  };
  rollUp(analysis.steps);

  return { steps: outcomes, spanStep, unmatchedSpanIds };
}
