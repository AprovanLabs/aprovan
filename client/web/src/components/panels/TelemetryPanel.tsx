/**
 * TelemetryPanel ("Activity") — native surface over the gateway `telemetry`
 * namespace (3-day window).
 *
 * Traces list newest-first with status/source filter chips; expanding a row
 * lazy-loads its events via `telemetry.query({ traceId })`. When scoped to an
 * app — the app inspector's contextual tab, or the header's workspace/app
 * picker (`useScopeFilter`) — every call carries `app`. No auto-refresh —
 * the shell button is it.
 */

import { Activity, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  PanelEmpty,
  PanelError,
  PanelLoading,
  PanelShell,
  relativeTime,
  type NativePanelProps,
  usePanelData,
  useScopeFilter,
} from "./shell";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { invokeNamespaceTool } from "@/lib/tools";

type SourceType = "tool" | "workflow" | "widget" | "app" | "chat";

interface TraceSource {
  type: SourceType;
  path?: string;
  app?: string;
  runId?: string;
  sessionId?: string;
}

interface TraceRow {
  traceId: string;
  name: string;
  source: TraceSource;
  startedAt: string;
  spans: number;
  logs: number;
  errors: number;
  status: "ok" | "error";
}

interface TelemetryEvent {
  id: string;
  kind: "span" | "log";
  traceId?: string;
  name?: string;
  message?: string;
  level?: string;
  status?: string;
  durationMs?: number;
  at: string;
  error?: { message: string; stack?: string };
  source: TraceSource;
  attributes?: Record<string, unknown>;
}

const invokeTelemetry = invokeNamespaceTool("telemetry");
const SOURCE_FILTERS: ReadonlyArray<"all" | SourceType> = ["all", "tool", "workflow", "widget", "app"];

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  children: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-2 py-0.5 text-[11px] ${
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/** One event row inside an expanded trace. */
function EventRow({ event }: { event: TelemetryEvent }) {
  return (
    <div className="border-t px-2 py-1.5 text-xs first:border-t-0">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
          {event.kind === "span"
            ? event.durationMs !== undefined
              ? `span · ${event.durationMs}ms`
              : "span"
            : `log${event.level ? ` · ${event.level}` : ""}`}
        </Badge>
        <span className="min-w-0 truncate">{event.message ?? event.name ?? event.id}</span>
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
          {relativeTime(event.at)}
        </span>
      </div>
      {event.error && (
        <div className="mt-1">
          <span className="text-destructive">{event.error.message}</span>
          {event.error.stack && (
            <Collapsible>
              <CollapsibleTrigger className="block text-[11px] text-muted-foreground hover:text-foreground">
                stack trace
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2 text-[11px] text-muted-foreground">
                  {event.error.stack}
                </pre>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      )}
    </div>
  );
}

function TraceCard({
  trace,
  expanded,
  onToggle,
  events,
  eventsLoading,
  eventsError,
}: {
  trace: TraceRow;
  expanded: boolean;
  onToggle: () => void;
  events: TelemetryEvent[] | undefined;
  eventsLoading: boolean;
  eventsError: string | undefined;
}) {
  return (
    <div className="rounded-md border bg-card text-sm">
      <button onClick={onToggle} className="flex w-full items-center gap-2 px-2.5 py-2 text-left">
        <ChevronRight
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${
            expanded ? "rotate-90" : ""
          }`}
        />
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            trace.status === "ok" ? "bg-emerald-500" : "bg-destructive"
          }`}
        />
        <span className="min-w-0 truncate font-mono text-xs">{trace.name}</span>
        <Badge variant="secondary" className="shrink-0 px-1.5 py-0 text-[10px]">
          {trace.source.type}
        </Badge>
        {trace.source.path && (
          <span className="hidden min-w-0 truncate text-[11px] text-muted-foreground sm:inline">
            {trace.source.path}
          </span>
        )}
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
          {trace.spans} spans · {trace.logs} logs
          {trace.errors > 0 && <span className="text-destructive"> · {trace.errors} errors</span>}
          {" · "}
          {relativeTime(trace.startedAt)}
        </span>
      </button>
      {expanded && (
        <div className="border-t bg-muted/30">
          {eventsError ? (
            <div className="px-2 py-1.5 text-xs text-destructive">{eventsError}</div>
          ) : eventsLoading || !events ? (
            <div className="px-2 py-1.5 text-xs text-muted-foreground">Loading events…</div>
          ) : events.length === 0 ? (
            <div className="px-2 py-1.5 text-xs text-muted-foreground">No events recorded.</div>
          ) : (
            events.map((event) => <EventRow key={event.id} event={event} />)
          )}
        </div>
      )}
    </div>
  );
}

export function TelemetryPanel({ scope: explicitScope }: NativePanelProps) {
  const { scope, scopeFilter } = useScopeFilter(explicitScope);
  const [statusFilter, setStatusFilter] = useState<"all" | "error">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | SourceType>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [events, setEvents] = useState<Record<string, TelemetryEvent[]>>({});
  const [eventsLoading, setEventsLoading] = useState<string | null>(null);
  const [eventsError, setEventsError] = useState<Record<string, string>>({});

  const { data, error, loading, refresh } = usePanelData(async () => {
    const args: Record<string, unknown> = { limit: 100 };
    if (statusFilter === "error") args.status = "error";
    if (sourceFilter !== "all") args.source = sourceFilter;
    if (scope) args.app = scope.name;
    return (await invokeTelemetry("traces", args)) as { traces: TraceRow[] };
  }, `${statusFilter}:${sourceFilter}:${scope?.name ?? ""}`);

  const traces = [...(data?.traces ?? [])].sort(
    (a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt),
  );

  const toggle = (traceId: string) => {
    if (expanded === traceId) {
      setExpanded(null);
      return;
    }
    setExpanded(traceId);
    if (events[traceId] || eventsLoading === traceId) return;
    setEventsLoading(traceId);
    const args: Record<string, unknown> = { traceId };
    if (scope) args.app = scope.name;
    invokeTelemetry("query", args)
      .then((result) => {
        const list = (result as { events: TelemetryEvent[] }).events ?? [];
        setEvents((prev) => ({ ...prev, [traceId]: list }));
      })
      .catch((err) => {
        setEventsError((prev) => ({
          ...prev,
          [traceId]: err instanceof Error ? err.message : String(err),
        }));
      })
      .finally(() => setEventsLoading((current) => (current === traceId ? null : current)));
  };

  return (
    <PanelShell
      icon={Activity}
      title="Activity"
      description="Service calls, widget logs and workflow runs from the last 3 days"
      actions={scopeFilter}
      onRefresh={refresh}
      refreshing={loading}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b px-3 py-2">
        <FilterChip active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
          All
        </FilterChip>
        <FilterChip active={statusFilter === "error"} onClick={() => setStatusFilter("error")}>
          Errors
        </FilterChip>
        <span className="mx-1 h-3 w-px bg-border" />
        {SOURCE_FILTERS.map((source) => (
          <FilterChip
            key={source}
            active={sourceFilter === source}
            onClick={() => setSourceFilter(source)}
          >
            {source === "all" ? "All" : source}
          </FilterChip>
        ))}
        {explicitScope && (
          <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {explicitScope.title ?? explicitScope.name}
          </span>
        )}
      </div>
      {error ? (
        <PanelError message={error} />
      ) : loading && !data ? (
        <PanelLoading />
      ) : traces.length === 0 ? (
        <PanelEmpty>
          {scope
            ? `Nothing recorded for ${scope.title ?? scope.name} in the last 3 days.`
            : "Nothing recorded in the last 3 days. Service calls, widget logs and workflow runs land here automatically."}
        </PanelEmpty>
      ) : (
        <div className="flex flex-col gap-1.5 p-3">
          {traces.map((trace) => (
            <TraceCard
              key={trace.traceId}
              trace={trace}
              expanded={expanded === trace.traceId}
              onToggle={() => toggle(trace.traceId)}
              events={events[trace.traceId]}
              eventsLoading={eventsLoading === trace.traceId}
              eventsError={eventsError[trace.traceId]}
            />
          ))}
        </div>
      )}
    </PanelShell>
  );
}
