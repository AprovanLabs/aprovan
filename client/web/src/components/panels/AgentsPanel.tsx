/**
 * AgentsPanel — named agent profiles and their executions ("Agents").
 *
 * A profile binds an LLM interface instance (or a cost/speed policy over
 * candidates), a system prompt, optional VFS mounts, and capability grants.
 * Workflows run under a profile via `workflows.run { name, agent }`; the
 * profile's own loop is `agents.run`. Both land in the Executions tab.
 */

import { Bot, Pencil, Plus, Trash2, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
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

interface AgentRun {
  id: string;
  workflow?: string;
  agent: string;
  status: "running" | "succeeded" | "failed" | "cancelled";
  trigger: string;
  startedAt: string;
  durationMs?: number;
  error?: string;
  traceId?: string;
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
  cancelled: "bg-muted-foreground",
};

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

export function AgentsPanel({ scope }: NativePanelProps) {
  void scope; // Agents are workspace-level: an app scope never narrows them.
  const agents = useMemo(() => invokeNamespaceTool("agents"), []);

  const { data, error, loading, refresh } = usePanelData(async () => {
    const [profiles, runs] = await Promise.all([
      agents("list", {}) as Promise<{ agents: AgentProfile[] }>,
      agents("runs", { limit: 100 }) as Promise<{ runs: AgentRun[] }>,
    ]);
    return { agents: profiles.agents ?? [], runs: runs.runs ?? [] };
  });

  const [tab, setTab] = useState<"profiles" | "executions">("profiles");
  const [editor, setEditor] = useState<{ draft: Draft; editing: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteArmed, setDeleteArmed] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const armTimer = useRef(0);

  const runs = useMemo(
    () =>
      [...(data?.runs ?? [])].sort(
        (a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt),
      ),
    [data?.runs],
  );
  const runAgents = useMemo(() => [...new Set(runs.map((r) => r.agent))], [runs]);
  const visibleRuns = agentFilter ? runs.filter((r) => r.agent === agentFilter) : runs;

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
          { id: "executions" as const, label: "Executions", badge: data?.runs.length },
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
          {visibleRuns.length === 0 ? (
            <PanelEmpty>
              No executions yet. Runs appear when a workflow uses an agent or when
              agents.run finishes a loop.
            </PanelEmpty>
          ) : (
            <div className="divide-y rounded-md border">
              {visibleRuns.map((run) => (
                <div key={run.id} className="flex items-center gap-2 px-3 py-1.5 text-xs">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${statusDot[run.status] ?? "bg-muted-foreground"}`}
                  />
                  <span className="truncate font-mono font-medium">
                    {run.workflow ?? "agents.run"}
                  </span>
                  <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                    {run.agent}
                  </Badge>
                  <span className="shrink-0 text-muted-foreground">{run.trigger}</span>
                  <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
                    {run.durationMs !== undefined && `${formatDuration(run.durationMs)} · `}
                    {relativeTime(run.startedAt)}
                  </span>
                  {run.status === "failed" && run.error && (
                    <span className="max-w-[16rem] truncate text-destructive" title={run.error}>
                      {run.error}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PanelShell>
  );
}
