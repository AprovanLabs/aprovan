/**
 * AgentsPanel — named agent profiles and their executions ("Agents").
 *
 * A profile binds an LLM interface instance (or a cost/speed policy over
 * candidates), a system prompt, optional VFS mounts, and capability grants.
 * Workflows run under a profile via `workflows.run { name, agent }`; the
 * profile's own loop is `agents.run`. Both land in the Executions tab.
 */

import { Bot, ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  PanelTabs,
  relativeTime,
  usePanelData,
  type NativePanelProps,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { invokeNamespaceTool } from "@/lib/tools";

interface PathGrant {
  prefix: string;
  access: "ro" | "rw";
}

interface AgentGrants {
  tools?: string[];
  paths?: PathGrant[];
}

interface AgentMount {
  path: string;
  source: string | null;
  mode: "ro" | "rw";
}

interface AgentPolicy {
  effort?: string;
  maxCostUsd?: number;
  deadlineMs?: number;
}

interface AgentProfile {
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
type AgentRunStatus =
  | "queued"
  | "running"
  | "awaiting_tools"
  | "suspended"
  | "succeeded"
  | "failed"
  | "cancelled";

interface AgentRun {
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
interface SandboxRunSummary {
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
interface AgentToolCall {
  id: string;
  name: string;
  arguments?: unknown;
  result?: unknown;
  error?: string;
  durationMs?: number;
}

interface AgentTurn {
  index: number;
  at: string;
  kind: "assistant" | "tool" | "thinking";
  text?: string;
  toolCalls?: AgentToolCall[];
}

interface AgentUsage {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
  turns?: number;
  toolCalls?: number;
  costUsd?: number;
}

/** Full record from `agents.getRun { id }` — native runs only. */
interface AgentRunDetail {
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
interface ExecutionRow {
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
interface Draft {
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

const emptyDraft: Draft = {
  name: "",
  title: "",
  llm: "llm",
  llmCandidates: "",
  effort: "",
  maxCostUsd: "",
  deadlineMs: "",
  provider: "",
  model: "",
  prompt: "",
  tools: [],
  paths: [],
  mounts: [],
};

function toDraft(agent: AgentProfile): Draft {
  return {
    name: agent.name,
    title: agent.title ?? "",
    llm: agent.llm ?? "llm",
    llmCandidates: (agent.llmCandidates ?? []).join(", "),
    effort: agent.policy?.effort ?? "",
    maxCostUsd:
      agent.policy?.maxCostUsd !== undefined ? String(agent.policy.maxCostUsd) : "",
    deadlineMs:
      agent.policy?.deadlineMs !== undefined ? String(agent.policy.deadlineMs) : "",
    provider: agent.provider ?? "",
    model: agent.model ?? "",
    prompt: agent.prompt ?? "",
    tools: agent.grants?.tools ? [...agent.grants.tools] : [],
    paths: agent.grants?.paths ? agent.grants.paths.map((p) => ({ ...p })) : [],
    mounts: (agent.mounts ?? []).map((m) => ({
      path: m.path,
      source: m.source ?? "",
      mode: m.mode,
    })),
  };
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60_000)}m ${Math.round((ms % 60_000) / 1000)}s`;
}

const statusDot: Record<string, string> = {
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

/** Everything outside these three is still doing something. */
const TERMINAL_STATUSES = new Set(["succeeded", "failed", "cancelled"]);
function isTerminalStatus(status: string): boolean {
  return TERMINAL_STATUSES.has(status);
}

/** How often to re-poll while at least one execution is non-terminal. */
const POLL_INTERVAL_MS = 4000;

function normalizeAgentRun(run: AgentRun, sandboxId?: string): ExecutionRow {
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

function normalizeSandboxRun(run: SandboxRunSummary): ExecutionRow {
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

/** Best-effort JSON preview, truncated — tool args/results can be huge. */
function jsonPreview(value: unknown, limit = 160): string {
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
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
    </span>
  );
}

/** Long text (assistant turns, run output) truncated with a show-more toggle. */
function Expandable({ text, limit = 280 }: { text: string; limit?: number }) {
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

const EFFORTS = ["", "minimal", "low", "medium", "high", "max"] as const;

const fieldLabel = "text-xs font-medium text-muted-foreground";
const textareaClass =
  "w-full min-h-[100px] rounded-md border bg-background p-2 text-sm " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Inline create/edit form for a profile, including the grants editor. */
function AgentEditor({
  initial,
  editing,
  saving,
  error,
  onSave,
  onCancel,
}: {
  initial: Draft;
  editing: boolean;
  saving: boolean;
  error: string | null;
  onSave: (draft: Draft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(initial);
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div className="space-y-3 rounded-md border bg-card p-3">
      <div className="text-sm font-semibold">{editing ? `Edit ${draft.name}` : "New agent"}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <div className={fieldLabel}>Name</div>
          <Input
            value={draft.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="reviewer"
            disabled={editing}
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Title</div>
          <Input
            value={draft.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="Code reviewer"
            className="h-8 text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>LLM profile</div>
          <Input
            value={draft.llm}
            onChange={(e) => set({ llm: e.target.value })}
            placeholder="llm or llm:fast"
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Candidates</div>
          <Input
            value={draft.llmCandidates}
            onChange={(e) => set({ llmCandidates: e.target.value })}
            placeholder="llm:fast, llm:deep"
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Effort</div>
          <select
            value={draft.effort}
            onChange={(e) => set({ effort: e.target.value })}
            className="h-8 w-full rounded-md border bg-background px-2 font-mono text-xs"
          >
            {EFFORTS.map((effort) => (
              <option key={effort || "none"} value={effort}>
                {effort || "—"}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Max $/MTok</div>
          <Input
            value={draft.maxCostUsd}
            onChange={(e) => set({ maxCostUsd: e.target.value })}
            placeholder="5"
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Deadline (ms)</div>
          <Input
            value={draft.deadlineMs}
            onChange={(e) => set({ deadlineMs: e.target.value })}
            placeholder="30000"
            className="h-8 font-mono text-xs"
          />
        </label>
        <label className="space-y-1">
          <div className={fieldLabel}>Model pin (optional)</div>
          <Input
            value={draft.model}
            onChange={(e) => set({ model: e.target.value })}
            placeholder="overrides binding default"
            className="h-8 font-mono text-xs"
          />
        </label>
      </div>
      <label className="block space-y-1">
        <div className={fieldLabel}>Prompt</div>
        <textarea
          value={draft.prompt}
          onChange={(e) => set({ prompt: e.target.value })}
          placeholder="System prompt for this agent…"
          className={textareaClass}
        />
      </label>
      <div className="space-y-1">
        <div className={fieldLabel}>Tool patterns</div>
        {draft.tools.map((tool, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Input
              value={tool}
              onChange={(e) =>
                set({ tools: draft.tools.map((t, i) => (i === index ? e.target.value : t)) })
              }
              placeholder="keyvalue.* / github.repos.* / *"
              className="h-8 font-mono text-xs"
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => set({ tools: draft.tools.filter((_, i) => i !== index) })}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={() => set({ tools: [...draft.tools, ""] })}
        >
          <Plus className="mr-1 h-3 w-3" />
          Add tool pattern
        </Button>
      </div>
      <div className="space-y-1">
        <div className={fieldLabel}>Path grants</div>
        {draft.paths.map((path, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Input
              value={path.prefix}
              onChange={(e) =>
                set({
                  paths: draft.paths.map((p, i) =>
                    i === index ? { ...p, prefix: e.target.value } : p,
                  ),
                })
              }
              placeholder="notes/"
              className="h-8 font-mono text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-12 shrink-0 font-mono text-xs"
              onClick={() =>
                set({
                  paths: draft.paths.map((p, i) =>
                    i === index ? { ...p, access: p.access === "rw" ? "ro" : "rw" } : p,
                  ),
                })
              }
            >
              {path.access}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => set({ paths: draft.paths.filter((_, i) => i !== index) })}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={() => set({ paths: [...draft.paths, { prefix: "", access: "ro" }] })}
        >
          <Plus className="mr-1 h-3 w-3" />
          Add path grant
        </Button>
      </div>
      <div className="space-y-1">
        <div className={fieldLabel}>Mounts</div>
        {draft.mounts.map((mount, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Input
              value={mount.path}
              onChange={(e) =>
                set({
                  mounts: draft.mounts.map((m, i) =>
                    i === index ? { ...m, path: e.target.value } : m,
                  ),
                })
              }
              placeholder="skills"
              className="h-8 w-24 font-mono text-xs"
            />
            <Input
              value={mount.source}
              onChange={(e) =>
                set({
                  mounts: draft.mounts.map((m, i) =>
                    i === index ? { ...m, source: e.target.value } : m,
                  ),
                })
              }
              placeholder="skills/"
              className="h-8 flex-1 font-mono text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-12 shrink-0 font-mono text-xs"
              onClick={() =>
                set({
                  mounts: draft.mounts.map((m, i) =>
                    i === index ? { ...m, mode: m.mode === "rw" ? "ro" : "rw" } : m,
                  ),
                })
              }
            >
              {mount.mode}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => set({ mounts: draft.mounts.filter((_, i) => i !== index) })}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs"
          onClick={() =>
            set({ mounts: [...draft.mounts, { path: "", source: "", mode: "ro" }] })
          }
        >
          <Plus className="mr-1 h-3 w-3" />
          Add mount
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        LLM profile comes from Interfaces. Candidates + effort pick by cost/speed.
        Mounts inject workspace files into the run. Grants only narrow.
      </p>
      {error && <div className="text-xs text-destructive">{error}</div>}
      <div className="flex gap-2">
        <Button size="sm" className="h-8" onClick={() => onSave(draft)} disabled={saving}>
          Save
        </Button>
        <Button size="sm" variant="ghost" className="h-8" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

/** One assistant/tool/thinking turn inside a run's detail view. */
function TurnView({ turn }: { turn: AgentTurn }) {
  return (
    <div className="rounded border bg-card p-2">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        <span>{turn.kind}</span>
        <span className="font-normal normal-case">· {relativeTime(turn.at)}</span>
      </div>
      {turn.text && (
        <div className="mt-1">
          <Expandable text={turn.text} />
        </div>
      )}
      {turn.toolCalls?.map((call) => (
        <div key={call.id} className="mt-1.5 rounded bg-muted/40 p-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-medium">{call.name}</span>
            <span
              className={`ml-auto shrink-0 text-[10px] font-medium ${
                call.error ? "text-destructive" : "text-emerald-500"
              }`}
            >
              {call.error ? "error" : "ok"}
            </span>
            {call.durationMs !== undefined && (
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {formatDuration(call.durationMs)}
              </span>
            )}
          </div>
          {call.arguments !== undefined && (
            <code
              className="mt-0.5 block truncate text-[10px] text-muted-foreground"
              title={jsonPreview(call.arguments, 4000)}
            >
              {jsonPreview(call.arguments)}
            </code>
          )}
          {call.error && <div className="mt-0.5 text-[10px] text-destructive">{call.error}</div>}
        </div>
      ))}
    </div>
  );
}

/**
 * Drill-down for an agent-kind execution row: fetches `agents.getRun`,
 * re-fetching on the same poll cadence while the run is non-terminal.
 * Workflow-attributed runs 404 here (the native runtime owns `getRun`, not
 * the workflow tracer) — that is reported inline rather than blanking the
 * row, since the summary line is still accurate.
 */
function AgentRunDetailView({
  runId,
  initialNonTerminal,
  agentProfile,
  invoke,
}: {
  runId: string;
  initialNonTerminal: boolean;
  agentProfile: AgentProfile | undefined;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const [detail, setDetail] = useState<AgentRunDetail | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = useCallback(() => {
    invoke("getRun", { id: runId })
      .then((result) => {
        setDetail(result as AgentRunDetail);
        setDetailError(null);
      })
      .catch((err: unknown) => setDetailError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [invoke, runId]);

  useEffect(() => {
    setLoading(true);
    fetchDetail();
  }, [fetchDetail]);

  const nonTerminal = detail ? !isTerminalStatus(detail.status) : initialNonTerminal;
  useEffect(() => {
    if (!nonTerminal) return;
    const id = window.setInterval(fetchDetail, POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [nonTerminal, fetchDetail]);

  if (loading && !detail) {
    return <div className="text-xs text-muted-foreground">Loading run…</div>;
  }
  if (detailError && !detail) {
    return (
      <div className="text-xs text-muted-foreground">
        Could not load run detail ({detailError}). Workflow-attributed runs don&apos;t carry
        native turn detail — check the workflow&apos;s own trace instead.
      </div>
    );
  }
  if (!detail) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span>started {relativeTime(detail.startedAt)}</span>
        {detail.finishedAt && <span>finished {relativeTime(detail.finishedAt)}</span>}
        <span className="tabular-nums">
          {nonTerminal
            ? `running ${formatDuration(Date.now() - Date.parse(detail.startedAt))}`
            : detail.durationMs !== undefined
              ? formatDuration(detail.durationMs)
              : null}
        </span>
        {detail.stopReason && (
          <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
            {detail.stopReason}
          </Badge>
        )}
      </div>
      {detail.error && <div className="text-xs text-destructive">{detail.error.message}</div>}

      {agentProfile && (
        <div className="rounded border bg-card p-2">
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Agent config
          </div>
          <div className="flex flex-wrap gap-1">
            {agentProfile.llm && (
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                {agentProfile.llm}
              </Badge>
            )}
            {agentProfile.model && (
              <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                {agentProfile.model}
              </Badge>
            )}
            {agentProfile.policy?.effort && (
              <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                effort:{agentProfile.policy.effort}
              </Badge>
            )}
            {agentProfile.grants?.tools?.map((tool) => (
              <span key={tool} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                {tool}
              </span>
            ))}
            {agentProfile.grants?.paths?.map((path) => (
              <span
                key={path.prefix}
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
              >
                {path.prefix} ({path.access})
              </span>
            ))}
            {agentProfile.mounts?.map((mount) => (
              <span
                key={`${mount.path}:${mount.source}`}
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
              >
                {mount.path} ← {mount.source ?? "scratch"} ({mount.mode})
              </span>
            ))}
          </div>
        </div>
      )}
      {detail.effortApplied && (
        <div className="text-[11px] text-muted-foreground">{detail.effortApplied}</div>
      )}

      {detail.turns?.length ? (
        <div className="space-y-1.5">
          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Turns
          </div>
          {detail.turns.map((turn) => (
            <TurnView key={turn.index} turn={turn} />
          ))}
        </div>
      ) : null}

      {detail.output && (
        <div>
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Output
          </div>
          <Expandable text={detail.output} />
        </div>
      )}

      {detail.usage && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          {detail.usage.inputTokens !== undefined && <span>in {detail.usage.inputTokens}tok</span>}
          {detail.usage.outputTokens !== undefined && (
            <span>out {detail.usage.outputTokens}tok</span>
          )}
          {detail.usage.totalTokens !== undefined && (
            <span>total {detail.usage.totalTokens}tok</span>
          )}
          {detail.usage.toolCalls !== undefined && <span>{detail.usage.toolCalls} tool calls</span>}
          {detail.usage.costUsd !== undefined && <span>${detail.usage.costUsd.toFixed(4)}</span>}
        </div>
      )}
    </div>
  );
}

/** Drill-down for a sandbox-kind row — everything's already in the summary. */
function SandboxRunDetailView({ run }: { run: SandboxRunSummary }) {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground">
        <span>queued {relativeTime(run.createdAt)}</span>
        {run.claimedAt && <span>claimed {relativeTime(run.claimedAt)}</span>}
        {run.finishedAt && <span>finished {relativeTime(run.finishedAt)}</span>}
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
          {run.image.replace(/^@aprovan\/sandbox-image-/u, "")}
        </Badge>
        {run.hostId && (
          <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px]">
            host:{run.hostId}
          </Badge>
        )}
        {run.sandboxId && (
          <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px]">
            box:{run.sandboxId}
          </Badge>
        )}
        {run.sessionId && (
          <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px]">
            session:{run.sessionId}
          </Badge>
        )}
        {run.workflowRunId && (
          <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px]">
            run:{run.workflowRunId.slice(0, 8)}
          </Badge>
        )}
      </div>
      {run.requires?.tools.length ? (
        <div className="text-muted-foreground">requires: {run.requires.tools.join(", ")}</div>
      ) : null}
      {run.error && <div className="text-destructive">{run.error}</div>}
    </div>
  );
}

/** One executions-list row: summary line + optional inline drill-down. */
function RunRow({
  row,
  expanded,
  onToggle,
  now,
  agentProfile,
  sandboxRun,
  invoke,
}: {
  row: ExecutionRow;
  expanded: boolean;
  onToggle: () => void;
  now: number;
  agentProfile: AgentProfile | undefined;
  sandboxRun: SandboxRunSummary | undefined;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const nonTerminal = !isTerminalStatus(row.status);
  const elapsed = nonTerminal ? now - Date.parse(row.startedAt) : row.durationMs;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-xs hover:bg-muted/50"
      >
        <ChevronRight
          className={`h-3 w-3 shrink-0 text-muted-foreground transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
        />
        {nonTerminal ? (
          <LiveDot />
        ) : (
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${statusDot[row.status] ?? "bg-muted-foreground"}`}
          />
        )}
        <span className="truncate font-mono font-medium">
          {row.workflow ?? (row.kind === "sandbox" ? "sandbox run" : "agents.run")}
        </span>
        {row.agent && (
          <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
            {row.agent}
          </Badge>
        )}
        {row.kind === "sandbox" && (
          <Badge variant="outline" className="shrink-0 text-[10px]">
            sandbox
          </Badge>
        )}
        {row.sandboxId && (
          <Badge
            variant="outline"
            className="shrink-0 font-mono text-[10px]"
            title={`Sandbox ${row.sandboxId}`}
          >
            box:{row.sandboxId.slice(0, 8)}
          </Badge>
        )}
        <span className="shrink-0 text-muted-foreground">{row.trigger}</span>
        <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
          {elapsed !== undefined && `${formatDuration(elapsed)} · `}
          {relativeTime(row.startedAt)}
        </span>
        {row.status === "failed" && row.error && (
          <span className="max-w-[16rem] truncate text-destructive" title={row.error}>
            {row.error}
          </span>
        )}
      </div>
      {expanded && (
        <div className="border-t bg-muted/20 px-3 py-2">
          {row.kind === "agent" ? (
            <AgentRunDetailView
              runId={row.id}
              initialNonTerminal={nonTerminal}
              agentProfile={agentProfile}
              invoke={invoke}
            />
          ) : sandboxRun ? (
            <SandboxRunDetailView run={sandboxRun} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export function AgentsPanel({ scope }: NativePanelProps) {
  void scope; // Agents are workspace-level: an app scope never narrows them.
  const agents = useMemo(() => invokeNamespaceTool("agents"), []);
  const sandboxes = useMemo(() => invokeNamespaceTool("sandboxes"), []);

  const { data, error, loading, refresh } = usePanelData(async () => {
    const [profiles, runs, sandboxRuns] = await Promise.all([
      agents("list", {}) as Promise<{ agents: AgentProfile[] }>,
      agents("runs", { limit: 100 }) as Promise<{ runs: AgentRun[] }>,
      // Sandboxes might not be registered at all in this workspace — a
      // failure here narrows the executions list, it must not blank it.
      (sandboxes("runs", { limit: 100 }) as Promise<{ runs: SandboxRunSummary[] }>).catch(
        () => ({ runs: [] as SandboxRunSummary[] }),
      ),
    ]);
    return {
      agents: profiles.agents ?? [],
      runs: runs.runs ?? [],
      sandboxRuns: sandboxRuns.runs ?? [],
    };
  });

  const [tab, setTab] = useState<"profiles" | "executions">("profiles");
  const [editor, setEditor] = useState<{ draft: Draft; editing: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteArmed, setDeleteArmed] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const armTimer = useRef(0);

  const agentsByName = useMemo(
    () => new Map((data?.agents ?? []).map((a) => [a.name, a])),
    [data?.agents],
  );
  const sandboxRunsById = useMemo(
    () => new Map((data?.sandboxRuns ?? []).map((r) => [r.id, r])),
    [data?.sandboxRuns],
  );

  /**
   * Merge agent-attributed executions with scheduled sandbox runs into one
   * list. A sandbox run whose workflow already shows up as an agent run
   * (matched by `workflowRunId`) is folded into that row as a sandbox
   * badge instead of duplicated — the rest (queued/claimed, not yet tied
   * to a workflow run) show up as their own "sandbox" rows.
   */
  const rows = useMemo(() => {
    const agentRuns = data?.runs ?? [];
    const sandboxRuns = data?.sandboxRuns ?? [];
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
  }, [data?.runs, data?.sandboxRuns]);

  const runAgents = useMemo(
    () => [...new Set(rows.map((r) => r.agent).filter((a): a is string => !!a))],
    [rows],
  );
  const visibleRows = agentFilter ? rows.filter((r) => r.agent === agentFilter) : rows;
  const inProgressRows = visibleRows.filter((r) => !isTerminalStatus(r.status));
  const completedRows = visibleRows.filter((r) => isTerminalStatus(r.status));
  const hasNonTerminal = rows.some((r) => !isTerminalStatus(r.status));

  // Auto-poll the executions list while something is still running and this
  // tab is on screen; a background browser tab skips ticks rather than
  // burning gateway calls nobody's watching.
  useEffect(() => {
    if (tab !== "executions" || !hasNonTerminal) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      refresh();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [tab, hasNonTerminal, refresh]);

  // Re-render once a second so "elapsed" on in-progress rows keeps ticking
  // between polls, without waiting on a network round trip to move at all.
  const [, forceTick] = useState(0);
  useEffect(() => {
    if (tab !== "executions" || inProgressRows.length === 0) return;
    const id = window.setInterval(() => forceTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [tab, inProgressRows.length]);

  const handleSave = async (draft: Draft) => {
    const tools = draft.tools.map((t) => t.trim()).filter(Boolean);
    const paths = draft.paths
      .map((p) => ({ ...p, prefix: p.prefix.trim() }))
      .filter((p) => p.prefix);
    const grants =
      tools.length || paths.length
        ? { ...(tools.length ? { tools } : {}), ...(paths.length ? { paths } : {}) }
        : editor?.editing
          ? null // Clear grants on update when every row was removed.
          : undefined;
    const candidates = draft.llmCandidates
      .split(/[,\s]+/u)
      .map((s) => s.trim())
      .filter(Boolean);
    const mounts = draft.mounts
      .map((m) => ({
        path: m.path.trim(),
        source: m.source.trim() || null,
        mode: m.mode,
      }))
      .filter((m) => m.path);
    const maxCostUsd = Number(draft.maxCostUsd);
    const deadlineMs = Number(draft.deadlineMs);
    const policy =
      draft.effort ||
      (Number.isFinite(maxCostUsd) && maxCostUsd > 0) ||
      (Number.isFinite(deadlineMs) && deadlineMs > 0)
        ? {
            ...(draft.effort ? { effort: draft.effort } : {}),
            ...(Number.isFinite(maxCostUsd) && maxCostUsd > 0 ? { maxCostUsd } : {}),
            ...(Number.isFinite(deadlineMs) && deadlineMs > 0 ? { deadlineMs } : {}),
          }
        : editor?.editing
          ? null
          : undefined;
    const payload: Record<string, unknown> = {
      name: draft.name.trim(),
      title: draft.title.trim() || undefined,
      llm: draft.llm.trim() || undefined,
      llmCandidates: candidates.length
        ? candidates
        : editor?.editing
          ? null
          : undefined,
      policy,
      provider: draft.provider.trim() || undefined,
      model: draft.model.trim() || undefined,
      prompt: draft.prompt || undefined,
      grants,
      mounts: mounts.length ? mounts : editor?.editing ? null : undefined,
    };
    setSaving(true);
    setSaveError(null);
    try {
      await agents(editor?.editing ? "update" : "create", payload);
      setEditor(null);
      refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (deleteArmed !== name) {
      setDeleteArmed(name);
      window.clearTimeout(armTimer.current);
      armTimer.current = window.setTimeout(() => setDeleteArmed(null), 3000);
      return;
    }
    window.clearTimeout(armTimer.current);
    setDeleteArmed(null);
    try {
      await agents("delete", { name });
      refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <PanelShell
      icon={Bot}
      title="Agents"
      description="Profiles with an LLM, permissions, and optional mounts — for workflows and agents.run"
      onRefresh={refresh}
      refreshing={loading}
    >
      <PanelTabs
        tabs={[
          { id: "profiles" as const, label: "Profiles" },
          { id: "executions" as const, label: "Executions", badge: rows.length },
        ]}
        active={tab}
        onChange={setTab}
      />
      {loading && !data ? (
        <PanelLoading label="Loading agents…" />
      ) : error ? (
        <PanelError message={error} />
      ) : tab === "profiles" ? (
        <div className="space-y-2 p-3">
          {!editor && (
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => {
                setSaveError(null);
                setEditor({ draft: emptyDraft, editing: false });
              }}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              New agent
            </Button>
          )}
          {editor && (
            <AgentEditor
              key={editor.editing ? editor.draft.name : "__new__"}
              initial={editor.draft}
              editing={editor.editing}
              saving={saving}
              error={saveError}
              onSave={handleSave}
              onCancel={() => setEditor(null)}
            />
          )}
          {data?.agents.length === 0 && !editor ? (
            <PanelEmpty>
              No agents yet. Create a profile to give workflows and agents.run a model,
              permissions, and optional file mounts.
            </PanelEmpty>
          ) : (
            data?.agents.map((agent) => (
              <div key={agent.name} className="space-y-1.5 rounded-md border bg-card p-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">{agent.name}</span>
                  {agent.title && (
                    <span className="truncate text-xs text-muted-foreground">{agent.title}</span>
                  )}
                  <div className="ml-auto flex shrink-0 gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={() => {
                        setSaveError(null);
                        setEditor({ draft: toDraft(agent), editing: true });
                      }}
                    >
                      <Pencil className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant={deleteArmed === agent.name ? "destructive" : "ghost"}
                      className="h-7 px-2 text-xs"
                      onClick={() => handleDelete(agent.name)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      {deleteArmed === agent.name ? "Confirm delete?" : "Delete"}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {agent.llm && <Badge variant="secondary">{agent.llm}</Badge>}
                  {agent.llmCandidates?.map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                  {agent.policy?.effort && (
                    <Badge variant="outline">effort:{agent.policy.effort}</Badge>
                  )}
                  {agent.model && <Badge variant="outline">{agent.model}</Badge>}
                </div>
                {agent.prompt && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">{agent.prompt}</p>
                )}
                {agent.mounts?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {agent.mounts.map((mount) => (
                      <span
                        key={`${mount.path}:${mount.source}`}
                        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                      >
                        {mount.path} ← {mount.source ?? "scratch"} ({mount.mode})
                      </span>
                    ))}
                  </div>
                ) : null}
                {(agent.grants?.tools?.length || agent.grants?.paths?.length) ? (
                  <div className="flex flex-wrap gap-1">
                    {agent.grants?.tools?.map((tool) => (
                      <span key={tool} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                        {tool}
                      </span>
                    ))}
                    {agent.grants?.paths?.map((path) => (
                      <span
                        key={path.prefix}
                        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                      >
                        {path.prefix} ({path.access})
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] text-muted-foreground">
                    No grants — full runner surface.
                  </div>
                )}
              </div>
            ))
          )}
          <p className="pt-1 text-xs text-muted-foreground">
            Bind LLM profiles in Interfaces, then pick one here. Workflows and agents.run
            both apply the profile&apos;s grants.
          </p>
        </div>
      ) : (
        <div className="p-3">
          {runAgents.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              <button
                onClick={() => setAgentFilter(null)}
                className={`rounded-full border px-2 py-0.5 text-[10px] ${
                  agentFilter === null ? "bg-muted font-medium" : "text-muted-foreground"
                }`}
              >
                All agents
              </button>
              {runAgents.map((name) => (
                <button
                  key={name}
                  onClick={() => setAgentFilter(name)}
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                    agentFilter === name ? "bg-muted font-medium" : "text-muted-foreground"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
          {visibleRows.length === 0 ? (
            <PanelEmpty>
              No executions yet. Runs appear when a workflow uses an agent, when agents.run
              finishes a loop, or when a sandbox picks up scheduled work.
            </PanelEmpty>
          ) : (
            <div className="space-y-3">
              {inProgressRows.length > 0 && (
                <div>
                  <div className="mb-1 flex items-center gap-1.5 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    <LiveDot />
                    In progress ({inProgressRows.length})
                  </div>
                  <div className="divide-y rounded-md border">
                    {inProgressRows.map((row) => (
                      <RunRow
                        key={`${row.kind}:${row.id}`}
                        row={row}
                        expanded={expandedId === row.id}
                        onToggle={() => setExpandedId((id) => (id === row.id ? null : row.id))}
                        now={Date.now()}
                        agentProfile={row.agent ? agentsByName.get(row.agent) : undefined}
                        sandboxRun={sandboxRunsById.get(row.id)}
                        invoke={agents}
                      />
                    ))}
                  </div>
                </div>
              )}
              {completedRows.length > 0 && (
                <div>
                  {inProgressRows.length > 0 && (
                    <div className="mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      History
                    </div>
                  )}
                  <div className="divide-y rounded-md border">
                    {completedRows.map((row) => (
                      <RunRow
                        key={`${row.kind}:${row.id}`}
                        row={row}
                        expanded={expandedId === row.id}
                        onToggle={() => setExpandedId((id) => (id === row.id ? null : row.id))}
                        now={Date.now()}
                        agentProfile={row.agent ? agentsByName.get(row.agent) : undefined}
                        sandboxRun={sandboxRunsById.get(row.id)}
                        invoke={agents}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </PanelShell>
  );
}
