/**
 * SyncPanel — native surface over the gateway `sync` namespace.
 *
 * Each sync is a source → transform → sink pipeline; the card renders that
 * lineage literally (chips joined by arrows) so a glance answers "what feeds
 * what". Registration happens via chat (`sync.register`); here you run a
 * pipeline on demand, read last-run health, and delete with a guarded click.
 */

import { ArrowRight, GitCompareArrows, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  relativeTime,
  type NativePanelProps,
  usePanelData,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invokeNamespaceTool } from "@/lib/tools";

interface SyncPipeline {
  name: string;
  description?: string;
  source: { tool: string; args?: Record<string, unknown> };
  transform?: string;
  sink: { path?: string; format?: string; tool?: string; args?: Record<string, unknown> };
  schedule?: string;
  createdAt: string;
  updatedAt: string;
  lastRun?: {
    at: string;
    status: "succeeded" | "failed";
    records?: number;
    error?: string;
    durationMs?: number;
  };
}

const invokeSync = invokeNamespaceTool("sync");

/** Two-click destructive confirm: first click arms for 3s. */
function ConfirmDeleteButton({ onConfirm, disabled }: { onConfirm: () => void; disabled?: boolean }) {
  const [arming, setArming] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  return (
    <Button
      variant={arming ? "destructive" : "ghost"}
      size="sm"
      disabled={disabled}
      className="h-7 px-2 text-xs"
      onClick={() => {
        if (arming) {
          window.clearTimeout(timer.current);
          setArming(false);
          onConfirm();
          return;
        }
        setArming(true);
        timer.current = window.setTimeout(() => setArming(false), 3000);
      }}
    >
      {arming ? "Confirm delete?" : "Delete"}
    </Button>
  );
}

function StageChip({ label, title }: { label: string; title?: string }) {
  return (
    <span
      title={title}
      className="max-w-[16rem] truncate rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px]"
    >
      {label}
    </span>
  );
}

/** source → transform? → sink, chips joined by arrows. */
function LineageRow({ sync }: { sync: SyncPipeline }) {
  const transformName = sync.transform?.split("/").pop() ?? "";
  const sinkLabel = sync.sink.path ?? sync.sink.tool ?? "sink";
  const sinkTitle = sync.sink.path
    ? sync.sink.format
      ? `${sync.sink.path} (${sync.sink.format})`
      : sync.sink.path
    : sync.sink.tool;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <StageChip label={sync.source.tool} title={sync.source.tool} />
      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
      {sync.transform && (
        <>
          <StageChip label={transformName} title={sync.transform} />
          <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        </>
      )}
      <StageChip label={sinkLabel} title={sinkTitle} />
    </div>
  );
}

function SyncCard({ sync, onChanged }: { sync: SyncPipeline; onChanged: () => void }) {
  const [running, setRunning] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const lastRun = sync.lastRun;

  const act = (operation: "run" | "delete", setBusy: (busy: boolean) => void) => {
    setBusy(true);
    setActionError(null);
    invokeSync(operation, { name: sync.name })
      .then(onChanged)
      .catch((err) => setActionError(err instanceof Error ? err.message : String(err)))
      .finally(() => setBusy(false));
  };

  return (
    <div className="rounded-md border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-semibold">{sync.name}</span>
        {sync.schedule && (
          <Badge variant="outline" className="px-1.5 py-0 font-mono text-[10px]">
            {sync.schedule}
          </Badge>
        )}
      </div>
      {sync.description && (
        <p className="mt-1 text-xs text-muted-foreground">{sync.description}</p>
      )}

      <LineageRow sync={sync} />

      {lastRun && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              lastRun.status === "succeeded" ? "bg-emerald-500" : "bg-destructive"
            }`}
          />
          <span>
            {lastRun.records !== undefined && `${lastRun.records} records · `}
            {lastRun.durationMs !== undefined && `${lastRun.durationMs}ms · `}
            {relativeTime(lastRun.at)}
          </span>
        </div>
      )}
      {lastRun?.error && <div className="mt-1 text-xs text-destructive">{lastRun.error}</div>}
      {actionError && <div className="mt-1 text-xs text-destructive">{actionError}</div>}

      <div className="mt-2 flex items-center gap-2 border-t pt-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={running || deleting}
          onClick={() => act("run", setRunning)}
        >
          {running && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
          {running ? "Running…" : "Run now"}
        </Button>
        <ConfirmDeleteButton onConfirm={() => act("delete", setDeleting)} disabled={running || deleting} />
      </div>
    </div>
  );
}

export function SyncPanel({ scope: _scope }: NativePanelProps) {
  const { data, error, loading, refresh } = usePanelData(
    async () => (await invokeSync("list", {})) as { syncs: SyncPipeline[] },
  );
  const syncs = data?.syncs ?? [];

  return (
    <PanelShell
      icon={GitCompareArrows}
      title="Sync"
      description="Pipelines that move data between services and your workspace"
      onRefresh={refresh}
      refreshing={loading}
    >
      {error ? (
        <PanelError message={error} />
      ) : loading && !data ? (
        <PanelLoading />
      ) : syncs.length === 0 ? (
        <PanelEmpty>
          No sync pipelines yet. Ask in chat to set one up — pick a source, an optional
          transform, and where the data should land.
        </PanelEmpty>
      ) : (
        <div className="flex flex-col gap-2 p-3">
          {syncs.map((sync) => (
            <SyncCard key={sync.name} sync={sync} onChanged={refresh} />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
