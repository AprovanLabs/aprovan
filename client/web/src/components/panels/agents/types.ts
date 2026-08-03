/** Shared types for the Agents pane. */

export interface PathGrant {
  prefix: string;
  access: "ro" | "rw";
}

export interface AgentGrants {
  tools?: string[];
  paths?: PathGrant[];
}

export interface AgentMount {
  path: string;
  source: string | null;
  mode: "ro" | "rw";
}

export interface AgentPolicy {
  effort?: string;
  maxCostUsd?: number;
  deadlineMs?: number;
}

export interface AgentProfile {
  name: string;
  title?: string;
  llm?: string;
  llmCandidates?: string[];
  policy?: AgentPolicy;
  provider?: string;
  model?: string;
  prompt?: string;
  grants?: AgentGrants;
  mounts?: AgentMount[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Native `agents.run` loops report the full contract (queued through
 * suspended); workflow-attributed runs only ever land on running,
 * succeeded or failed. Kept as one broad union — the panel treats anything
 * outside the terminal three as "in progress" (see `isTerminalStatus`).
 */
export type AgentRunStatus =
  | "queued"
  | "running"
  | "awaiting_tools"
  | "suspended"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface AgentRun {
  id: string;
  workflow?: string;
  agent: string;
  status: AgentRunStatus;
  trigger: string;
  startedAt: string;
  durationMs?: number;
  error?: string;
  traceId?: string;
}

/** `sandboxes.runs` — scheduled sandbox work, merged into the same list. */
export interface SandboxRunSummary {
  id: string;
  image: string;
  workflow: string;
  agent?: string;
  sandboxId?: string;
  hostId?: string;
  sessionId?: string;
  workflowRunId?: string;
  status: "pending" | "claimed" | "running" | "succeeded" | "failed" | "cancelled";
  error?: string;
  requires?: { tools: string[] };
  createdAt: string;
  claimedAt?: string;
  finishedAt?: string;
}

/** One tool call inside a turn — `agents.getRun` detail. */
export interface AgentToolCall {
  id: string;
  name: string;
  arguments?: unknown;
  result?: unknown;
  error?: string;
  durationMs?: number;
}

export interface AgentTurn {
  index: number;
  at: string;
  kind: "assistant" | "tool" | "thinking";
  text?: string;
  toolCalls?: AgentToolCall[];
}

export interface AgentUsage {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
  turns?: number;
  toolCalls?: number;
  costUsd?: number;
}

/** Full record from `agents.getRun { id }` — native runs only. */
export interface AgentRunDetail {
  id: string;
  status: AgentRunStatus;
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  output?: string;
  truncated?: boolean;
  turns?: AgentTurn[];
  usage?: AgentUsage;
  stopReason?: string;
  error?: { message: string; code?: string };
  effortApplied?: string;
  agent?: string;
}

/** One row in the merged Executions list — an agent run or a sandbox run. */
export interface ExecutionRow {
  kind: "agent" | "sandbox";
  id: string;
  workflow?: string;
  agent?: string;
  status: string;
  trigger: string;
  startedAt: string;
  durationMs?: number;
  error?: string;
  sandboxId?: string;
}

/** Editor draft — grants/mounts as editable row lists. */
export interface Draft {
  name: string;
  title: string;
  llm: string;
  llmCandidates: string;
  effort: string;
  maxCostUsd: string;
  deadlineMs: string;
  provider: string;
  model: string;
  prompt: string;
  tools: string[];
  paths: PathGrant[];
  mounts: Array<{ path: string; source: string; mode: "ro" | "rw" }>;
}

export const EFFORTS = ["", "minimal", "low", "medium", "high", "max"] as const;

/** How often to re-poll while at least one execution is non-terminal. */
export const POLL_INTERVAL_MS = 4000;

/** Everything outside these three is still doing something. */
export const TERMINAL_STATUSES = new Set(["succeeded", "failed", "cancelled"]);

export function isTerminalStatus(status: string): boolean {
  return TERMINAL_STATUSES.has(status);
}
