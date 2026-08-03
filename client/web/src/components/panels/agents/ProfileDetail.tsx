import { ArrowLeft, Pencil } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArmedButton, relativeTime } from "../shell";
import type { AgentProfile, ExecutionRow } from "./types";
import { isTerminalStatus } from "./types";
import { LiveDot, formatDuration, promptPreview } from "./utils";

function ConfigRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-3">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="min-w-0 text-xs">{children}</div>
    </div>
  );
}

export function ProfileDetail({
  agent,
  recentRuns,
  onBack,
  onEdit,
  onDelete,
}: {
  agent: AgentProfile;
  recentRuns: ExecutionRow[];
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const display = agent.title?.trim() || agent.name;
  const tools = agent.grants?.tools ?? [];
  const paths = agent.grants?.paths ?? [];
  const mounts = agent.mounts ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onBack}>
          <ArrowLeft className="mr-1 h-3 w-3" />
          All agents
        </Button>
        <div className="ml-auto flex gap-1">
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onEdit}>
            <Pencil className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <ArmedButton
            label="Delete"
            armedLabel="Confirm delete?"
            onConfirm={onDelete}
          />
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold">{display}</h2>
        {agent.title?.trim() && (
          <div className="font-mono text-xs text-muted-foreground">{agent.name}</div>
        )}
      </div>

      <div className="space-y-2.5 rounded-md border bg-card p-3">
        <ConfigRow label="Model">
          {agent.llm ? (
            <Badge variant="secondary" className="px-1.5 py-0 font-mono text-[10px]">
              {agent.llm}
            </Badge>
          ) : (
            <span className="text-muted-foreground">Not set</span>
          )}
          {agent.llmCandidates?.length ? (
            <span className="ml-1 text-muted-foreground">
              candidates: {agent.llmCandidates.join(", ")}
            </span>
          ) : null}
        </ConfigRow>
        {(agent.policy?.effort ||
          agent.policy?.maxCostUsd !== undefined ||
          agent.policy?.deadlineMs !== undefined) && (
          <ConfigRow label="Limits">
            <span className="text-muted-foreground">
              {[
                agent.policy?.effort && `effort ${agent.policy.effort}`,
                agent.policy?.maxCostUsd !== undefined &&
                  `max $${agent.policy.maxCostUsd}/MTok`,
                agent.policy?.deadlineMs !== undefined &&
                  `deadline ${formatDuration(agent.policy.deadlineMs)}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </ConfigRow>
        )}
        {agent.model && (
          <ConfigRow label="Model pin">
            <span className="font-mono">{agent.model}</span>
          </ConfigRow>
        )}
        <ConfigRow label="Instructions">
          {agent.prompt ? (
            <p className="whitespace-pre-wrap text-muted-foreground">
              {promptPreview(agent.prompt, 400) || agent.prompt}
            </p>
          ) : (
            <span className="italic text-muted-foreground">None</span>
          )}
        </ConfigRow>
        <ConfigRow label="Access">
          {tools.length || paths.length ? (
            <div className="flex flex-wrap gap-1">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {tool}
                </span>
              ))}
              {paths.map((path) => (
                <span
                  key={path.prefix}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {path.prefix} ({path.access})
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Full access — no grants configured</span>
          )}
        </ConfigRow>
        <ConfigRow label="Files">
          {mounts.length ? (
            <div className="flex flex-wrap gap-1">
              {mounts.map((mount) => (
                <span
                  key={`${mount.path}:${mount.source}`}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {mount.path} ← {mount.source ?? "scratch"} ({mount.mode})
                </span>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">No mounts</span>
          )}
        </ConfigRow>
        <ConfigRow label="Updated">
          <span className="text-muted-foreground">{relativeTime(agent.updatedAt)}</span>
        </ConfigRow>
      </div>

      <div>
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">
          Recent executions
        </div>
        {recentRuns.length === 0 ? (
          <div className="rounded-md border border-dashed px-3 py-4 text-xs text-muted-foreground">
            No runs for this agent yet.
          </div>
        ) : (
          <div className="divide-y rounded-md border">
            {recentRuns.slice(0, 8).map((row) => {
              const live = !isTerminalStatus(row.status);
              return (
                <div
                  key={`${row.kind}:${row.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs"
                >
                  {live ? (
                    <LiveDot />
                  ) : (
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        row.status === "succeeded"
                          ? "bg-emerald-500"
                          : row.status === "failed"
                            ? "bg-red-500"
                            : "bg-muted-foreground"
                      }`}
                    />
                  )}
                  <span className="truncate font-medium">
                    {row.workflow ?? (row.kind === "sandbox" ? "Sandbox run" : "Agent run")}
                  </span>
                  <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
                    {relativeTime(row.startedAt)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
