/**
 * Agents pane — named agent profiles and their executions.
 *
 * Data ownership lives here (`usePanelData`, merge/normalize, poll timers,
 * dispatch). Child modules are presentation-only.
 */

import { Bot, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { invokeNamespaceTool } from "@/lib/tools";
import {
  PanelEmpty,
  PanelErrorWithRetry,
  PanelLoading,
  PanelShell,
  PanelTabs,
  usePanelData,
  type NativePanelProps,
} from "../shell";
import { emptyDraft, toDraft } from "./draft";
import { Executions } from "./Executions";
import { buildSavePayload } from "./payload";
import { ProfileDetail } from "./ProfileDetail";
import { ProfileEditor } from "./ProfileEditor";
import { ProfileList } from "./ProfileList";
import type { AgentProfile, AgentRun, Draft, SandboxRunSummary } from "./types";
import { isTerminalStatus, POLL_INTERVAL_MS } from "./types";
import { mergeExecutionRows } from "./utils";

interface InterfacesListing {
  interfaces: Array<{ id: string }>;
  instances: Array<{ namespace: string; interface: string; name: string | null }>;
}

function llmBindingIds(listing: InterfacesListing): string[] {
  const fromInstances = listing.instances
    .filter((instance) => instance.interface === "llm")
    .map((instance) => instance.namespace);
  const hasDefault = listing.interfaces.some((def) => def.id === "llm");
  const ids = hasDefault ? ["llm", ...fromInstances] : fromInstances;
  return [...new Set(ids.filter(Boolean))];
}

export function AgentsPanel({ scope }: NativePanelProps) {
  void scope; // Agents are workspace-level: an app scope never narrows them.
  const agents = useMemo(() => invokeNamespaceTool("agents"), []);
  const sandboxes = useMemo(() => invokeNamespaceTool("sandboxes"), []);
  const interfaces = useMemo(() => invokeNamespaceTool("interfaces"), []);

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

  const { data: llmBindings = [] } = usePanelData(async () => {
    try {
      const listing = (await interfaces("list", {})) as InterfacesListing;
      return llmBindingIds(listing);
    } catch {
      return [] as string[];
    }
  });

  const [tab, setTab] = useState<"profiles" | "executions">("profiles");
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [editor, setEditor] = useState<{ draft: Draft; editing: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const agentsByName = useMemo(
    () => new Map((data?.agents ?? []).map((a) => [a.name, a])),
    [data?.agents],
  );
  const sandboxRunsById = useMemo(
    () => new Map((data?.sandboxRuns ?? []).map((r) => [r.id, r])),
    [data?.sandboxRuns],
  );

  const rows = useMemo(
    () => mergeExecutionRows(data?.runs ?? [], data?.sandboxRuns ?? []),
    [data?.runs, data?.sandboxRuns],
  );

  const hasNonTerminal = rows.some((r) => !isTerminalStatus(r.status));
  const inProgressCount = rows.filter((r) => !isTerminalStatus(r.status)).length;

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
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (tab !== "executions" || inProgressCount === 0) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [tab, inProgressCount]);

  const selected = selectedName ? agentsByName.get(selectedName) : undefined;

  const handleSave = async (draft: Draft) => {
    const payload = buildSavePayload(draft, Boolean(editor?.editing));
    setSaving(true);
    setSaveError(null);
    try {
      await agents(editor?.editing ? "update" : "create", payload);
      setEditor(null);
      if (editor?.editing) {
        setSelectedName(draft.name.trim());
      }
      refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await agents("delete", { name });
      setSelectedName(null);
      refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    }
  };

  const openNew = () => {
    setSaveError(null);
    setSelectedName(null);
    setEditor({ draft: emptyDraft, editing: false });
  };

  const showNewAction = tab === "profiles" && !editor;

  return (
    <PanelShell
      icon={Bot}
      title="Agents"
      description="Reusable AI workers with their own model, instructions, and permissions"
      onRefresh={refresh}
      refreshing={loading}
      actions={
        showNewAction ? (
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={openNew}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            New agent
          </Button>
        ) : undefined
      }
    >
      <PanelTabs
        tabs={[
          { id: "profiles" as const, label: "Profiles" },
          { id: "executions" as const, label: "Executions", badge: rows.length },
        ]}
        active={tab}
        onChange={(next) => {
          setTab(next);
          if (next === "executions") setEditor(null);
        }}
      />
      {loading && !data ? (
        <PanelLoading label="Loading agents…" />
      ) : error ? (
        <PanelErrorWithRetry
          message="Couldn't load agents. Retry, or check your connection."
          onRetry={refresh}
        />
      ) : tab === "profiles" ? (
        <div className="space-y-3 p-3">
          {editor ? (
            <ProfileEditor
              key={editor.editing ? editor.draft.name : "__new__"}
              initial={editor.draft}
              editing={editor.editing}
              saving={saving}
              error={saveError}
              llmBindings={llmBindings}
              onSave={handleSave}
              onCancel={() => {
                setEditor(null);
                setSaveError(null);
              }}
            />
          ) : selected ? (
            <ProfileDetail
              agent={selected}
              recentRuns={rows.filter((r) => r.agent === selected.name)}
              onBack={() => setSelectedName(null)}
              onEdit={() => {
                setSaveError(null);
                setEditor({ draft: toDraft(selected), editing: true });
              }}
              onDelete={() => handleDelete(selected.name)}
            />
          ) : data?.agents.length === 0 ? (
            <div className="space-y-3">
              <PanelEmpty>
                Agents are reusable AI workers with their own model, instructions, and
                permissions. Create your first agent to get started.
              </PanelEmpty>
              <Button size="sm" variant="outline" className="h-8" onClick={openNew}>
                <Plus className="mr-1 h-3.5 w-3.5" />
                New agent
              </Button>
            </div>
          ) : (
            <ProfileList agents={data?.agents ?? []} onSelect={setSelectedName} />
          )}
          {saveError && !editor && (
            <div className="text-xs text-destructive">{saveError}</div>
          )}
        </div>
      ) : (
        <div className="p-3">
          <Executions
            rows={rows}
            agentsByName={agentsByName}
            sandboxRunsById={sandboxRunsById}
            agentFilter={agentFilter}
            onAgentFilter={setAgentFilter}
            expandedId={expandedId}
            onExpandedId={setExpandedId}
            now={now}
            invoke={agents}
          />
        </div>
      )}
    </PanelShell>
  );
}
