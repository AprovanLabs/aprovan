import { useState } from "react";
import type { AgentRun, ExecutionRow, SandboxRunSummary } from "./types";

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.round((ms % 60_000) / 1000)}s`;
}

export const statusDot: Record<string, string> = {
  succeeded: "bg-emerald-500",
  failed: "bg-red-500",
  running: "bg-amber-500",
  queued: "bg-amber-500",
  awaiting_tools: "bg-amber-500",
  suspended: "bg-amber-500",
  pending: "bg-amber-500",
  claimed: "bg-amber-500",
  cancelled: "bg-muted-foreground",
};

export function normalizeAgentRun(run: AgentRun, sandboxId?: string): ExecutionRow {
  return {
    kind: "agent",
    id: run.id,
    workflow: run.workflow,
    agent: run.agent,
    status: run.status,
    trigger: run.trigger,
    startedAt: run.startedAt,
    durationMs: run.durationMs,
    error: run.error,
    sandboxId,
  };
}

export function normalizeSandboxRun(run: SandboxRunSummary): ExecutionRow {
  const startedAt = run.claimedAt ?? run.createdAt;
  const durationMs =
    run.finishedAt && run.claimedAt
      ? Date.parse(run.finishedAt) - Date.parse(run.claimedAt)
      : undefined;
  return {
    kind: "sandbox",
    id: run.id,
    workflow: run.workflow,
    agent: run.agent,
    status: run.status,
    trigger: "sandbox",
    startedAt,
    durationMs,
    error: run.error,
    sandboxId: run.sandboxId,
  };
}

/** Merge agent runs with sandbox runs; fold sandbox badges onto matching workflow runs. */
export function mergeExecutionRows(
  agentRuns: AgentRun[],
  sandboxRuns: SandboxRunSummary[],
): ExecutionRow[] {
  const agentRunIds = new Set(agentRuns.map((r) => r.id));
  const sandboxByWorkflowRunId = new Map(
    sandboxRuns
      .filter((r): r is SandboxRunSummary & { workflowRunId: string } => !!r.workflowRunId)
      .map((r) => [r.workflowRunId, r]),
  );
  const combined: ExecutionRow[] = [
    ...agentRuns.map((run) =>
      normalizeAgentRun(run, sandboxByWorkflowRunId.get(run.id)?.sandboxId),
    ),
    ...sandboxRuns
      .filter((run) => !run.workflowRunId || !agentRunIds.has(run.workflowRunId))
      .map(normalizeSandboxRun),
  ];
  return combined.sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
}

/** Best-effort JSON preview, truncated — tool args/results can be huge. */
export function jsonPreview(value: unknown, limit = 160): string {
  if (value === undefined) return "";
  let text: string;
  try {
    text = typeof value === "string" ? value : JSON.stringify(value);
  } catch {
    text = String(value);
  }
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
}

/** A pulsing dot for "this is happening right now". */
export function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
    </span>
  );
}

/** Long text (assistant turns, run output) truncated with a show-more toggle. */
export function Expandable({ text, limit = 280 }: { text: string; limit?: number }) {
  const [open, setOpen] = useState(false);
  if (text.length <= limit) {
    return <p className="whitespace-pre-wrap text-xs">{text}</p>;
  }
  return (
    <div>
      <p className="whitespace-pre-wrap text-xs">{open ? text : `${text.slice(0, limit)}…`}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-[11px] text-muted-foreground underline hover:text-foreground"
      >
        {open ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

export function promptPreview(prompt: string | undefined, limit = 80): string {
  if (!prompt) return "";
  const oneLine = prompt.replace(/\s+/gu, " ").trim();
  return oneLine.length > limit ? `${oneLine.slice(0, limit)}…` : oneLine;
}

export const fieldLabel = "text-xs font-medium text-muted-foreground";
export const textareaClass =
  "w-full min-h-[100px] rounded-md border bg-background p-2 text-sm " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
