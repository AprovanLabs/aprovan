import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { invokeNamespaceTool } from "@/lib/tools";
import { PanelEmpty, relativeTime } from "../shell";
import type {
  AgentProfile,
  AgentRunDetail,
  AgentTurn,
  ExecutionRow,
  SandboxRunSummary,
} from "./types";
import { isTerminalStatus, POLL_INTERVAL_MS } from "./types";
import {
  Expandable,
  LiveDot,
  formatDuration,
  jsonPreview,
  statusDot,
} from "./utils";

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
 * Workflow-attributed runs 404 here — explained inline in plain language.
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
        This run was recorded by a workflow — open its trace for step detail.
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
          {row.workflow ?? (row.kind === "sandbox" ? "sandbox run" : "agent run")}
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

export function Executions({
  rows,
  agentsByName,
  sandboxRunsById,
  agentFilter,
  onAgentFilter,
  expandedId,
  onExpandedId,
  now,
  invoke,
}: {
  rows: ExecutionRow[];
  agentsByName: Map<string, AgentProfile>;
  sandboxRunsById: Map<string, SandboxRunSummary>;
  agentFilter: string | null;
  onAgentFilter: (name: string | null) => void;
  expandedId: string | null;
  onExpandedId: (id: string | null) => void;
  now: number;
  invoke: ReturnType<typeof invokeNamespaceTool>;
}) {
  const runAgents = [...new Set(rows.map((r) => r.agent).filter((a): a is string => !!a))];
  const visibleRows = agentFilter ? rows.filter((r) => r.agent === agentFilter) : rows;
  const inProgressRows = visibleRows.filter((r) => !isTerminalStatus(r.status));
  const completedRows = visibleRows.filter((r) => isTerminalStatus(r.status));

  return (
    <div>
      {runAgents.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          <button
            onClick={() => onAgentFilter(null)}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${
              agentFilter === null ? "bg-muted font-medium" : "text-muted-foreground"
            }`}
          >
            All agents
          </button>
          {runAgents.map((name) => (
            <button
              key={name}
              onClick={() => onAgentFilter(name)}
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
          Runs appear here when a workflow or agent starts working.
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
                    onToggle={() => onExpandedId(expandedId === row.id ? null : row.id)}
                    now={now}
                    agentProfile={row.agent ? agentsByName.get(row.agent) : undefined}
                    sandboxRun={sandboxRunsById.get(row.id)}
                    invoke={invoke}
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
                    onToggle={() => onExpandedId(expandedId === row.id ? null : row.id)}
                    now={now}
                    agentProfile={row.agent ? agentsByName.get(row.agent) : undefined}
                    sandboxRun={sandboxRunsById.get(row.id)}
                    invoke={invoke}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
