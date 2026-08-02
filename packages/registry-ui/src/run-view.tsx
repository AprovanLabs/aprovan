/**
 * RunView — the shared span/log/result view over one script execution,
 * rendered identically for live sandbox runs (registry playground, homepage
 * demo) and persisted workflow runs (WorkflowsPanel traces).
 *
 * The component is purely presentational over a neutral {@link RunViewModel};
 * two adapters produce that shape:
 *
 *  - {@link runViewFromRuntimeEvents} — folds a `@aprovan/runtime` event
 *    stream (`call:start` / `call:retry` / `call:end` / `log` / `script:end`)
 *    into the model. Hosts accumulate events with {@link reduceRunEvent} and
 *    re-run the adapter each render, so streaming runs stay live.
 *  - {@link runViewFromWorkflowRun} — maps a persisted gateway WorkflowRun
 *    record (spans/logs/result) into the model.
 */

import * as React from "react";
import { JsonView, resolveRenderer } from "./renderers";

// ---------------------------------------------------------------------------
// Neutral model
// ---------------------------------------------------------------------------

export interface RunViewSpan {
  id: string;
  /** Display name, e.g. `github.repos.get`. */
  label: string;
  /** Epoch ms. */
  startedAt: number;
  /** Undefined while the call is still in flight. */
  durationMs?: number;
  /** Undefined while the call is still in flight. */
  ok?: boolean;
  error?: string;
  retries?: number;
  /** Call arguments, when the source records them (live runs). */
  input?: unknown;
  /** Call result, when the source records it (live runs). */
  output?: unknown;
  /**
   * Annotation from whoever built the model — e.g. the flow renderer marking
   * a span it could not attribute to any step in the script.
   */
  note?: string;
}

export interface RunViewLog {
  /** Epoch ms, when known. */
  ts?: number;
  level: string;
  line: string;
}

export type RunViewStatus = "running" | "succeeded" | "failed";

export interface RunViewModel {
  status: RunViewStatus;
  spans: RunViewSpan[];
  logs: RunViewLog[];
  result?: unknown;
  error?: string;
  /** Epoch ms — anchors the timing bars. */
  startedAt?: number;
  endedAt?: number;
}

// ---------------------------------------------------------------------------
// Adapter 1: live runtime event streams
// ---------------------------------------------------------------------------

/**
 * Structural stand-in for `@aprovan/runtime`'s `RuntimeEvent` union so this
 * shared package needs no runtime dependency; real events are assignable.
 */
export type RunViewRuntimeEvent =
  | {
      type: "call:start";
      callId: string;
      provider: string;
      operation: string;
      args: Record<string, unknown>;
      ts: number;
    }
  | { type: "call:retry"; callId: string; ts: number }
  | {
      type: "call:end";
      callId: string;
      ok: boolean;
      result?: unknown;
      error?: string;
      ts: number;
    }
  | { type: "log"; level: string; message: string; ts: number }
  | { type: "script:start"; ts: number }
  | { type: "script:end"; ok: boolean; result?: unknown; error?: string; ts: number };

/** Host-side accumulator for a streaming sandbox run. */
export interface RunState {
  events: RunViewRuntimeEvent[];
  running: boolean;
  startTs?: number;
  endTs?: number;
  result?: unknown;
  error?: string;
}

export const INITIAL_RUN: RunState = { events: [], running: false };

/** Fold a runtime event into run state (used by hosts via setState). */
export function reduceRunEvent(
  previous: RunState,
  event: RunViewRuntimeEvent,
): RunState {
  const next: RunState = { ...previous, events: [...previous.events, event] };
  if (event.type === "script:end") {
    next.running = false;
    next.endTs = event.ts;
    if (event.ok) next.result = event.result;
    else next.error = event.error;
  }
  return next;
}

/** Project accumulated runtime events into the neutral run-view model. */
export function runViewFromRuntimeEvents(run: RunState): RunViewModel {
  const spans = new Map<string, RunViewSpan>();
  const logs: RunViewLog[] = [];
  for (const event of run.events) {
    if (event.type === "call:start") {
      spans.set(event.callId, {
        id: event.callId,
        label: `${event.provider}.${event.operation}`,
        startedAt: event.ts,
        retries: 0,
        input: event.args,
      });
    } else if (event.type === "call:retry") {
      const span = spans.get(event.callId);
      if (span) span.retries = (span.retries ?? 0) + 1;
    } else if (event.type === "call:end") {
      const span = spans.get(event.callId);
      if (span) {
        span.durationMs = event.ts - span.startedAt;
        span.ok = event.ok;
        span.output = event.result;
        span.error = event.error;
      }
    } else if (event.type === "log") {
      logs.push({ ts: event.ts, level: event.level, line: event.message });
    }
  }
  return {
    status: run.running ? "running" : run.error ? "failed" : "succeeded",
    spans: [...spans.values()],
    logs,
    result: run.result,
    error: run.error,
    startedAt: run.startTs,
    endedAt: run.endTs,
  };
}

// ---------------------------------------------------------------------------
// Adapter 2: persisted workflow run records
// ---------------------------------------------------------------------------

/** Structural subset of the gateway's WorkflowRun record. */
export interface WorkflowRunLike {
  status: "running" | "succeeded" | "failed";
  startedAt: string;
  durationMs?: number;
  result?: unknown;
  error?: string;
  logs: Array<{ level: string; message: string; ts: string }>;
  spans: Array<{
    namespace: string;
    procedure: string;
    startedAt: string;
    durationMs: number;
    ok: boolean;
    error?: string;
  }>;
}

function epoch(iso: string): number {
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? 0 : ms;
}

/** Project a persisted workflow run record into the neutral run-view model. */
export function runViewFromWorkflowRun(run: WorkflowRunLike): RunViewModel {
  const startedAt = epoch(run.startedAt);
  return {
    status: run.status,
    spans: run.spans.map((span, index) => ({
      id: `${index}`,
      label: `${span.namespace}.${span.procedure}`,
      startedAt: epoch(span.startedAt),
      durationMs: span.durationMs,
      ok: span.ok,
      error: span.error,
    })),
    logs: run.logs.map((log) => ({
      ts: epoch(log.ts),
      level: log.level,
      line: log.message,
    })),
    result: run.result,
    error: run.error,
    startedAt,
    endedAt: run.durationMs !== undefined ? startedAt + run.durationMs : undefined,
  };
}

// ---------------------------------------------------------------------------
// Presentation
// ---------------------------------------------------------------------------

function formatDuration(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

function formatJson(value: unknown): string {
  const text = JSON.stringify(value, null, 2) ?? "undefined";
  return text.length > 4000 ? `${text.slice(0, 4000)}\n…` : text;
}

/**
 * Run results render through the renderer registry — SQL results become
 * tables, chart specs become charts — with the collapsible JSON tree as the
 * fallback for structured values and a plain block for primitives.
 */
function ResultView({ result }: { result: unknown }) {
  const rendered = resolveRenderer({ data: result });
  if (rendered) {
    const Component = rendered.Component;
    return <Component input={{ data: result }} />;
  }
  if (typeof result === "object" && result !== null) {
    return <JsonView value={result} />;
  }
  return (
    <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
      {formatJson(result)}
    </pre>
  );
}

function SpanRow({
  span,
  timelineStart,
  timelineEnd,
  timelineSpanMs,
  highlighted,
  focused,
  onHover,
  onSelect,
}: {
  span: RunViewSpan;
  timelineStart: number;
  timelineEnd: number;
  timelineSpanMs: number;
  highlighted?: boolean;
  focused?: boolean;
  onHover?: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const rowRef = React.useRef<HTMLDivElement | null>(null);

  // Selecting the corresponding node in a linked view scrolls this row in.
  React.useEffect(() => {
    if (focused) rowRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [focused]);

  const offsetPct = ((span.startedAt - timelineStart) / timelineSpanMs) * 100;
  const durationMs = span.durationMs ?? Math.max(timelineEnd - span.startedAt, 0);
  const widthPct = Math.max((durationMs / timelineSpanMs) * 100, 1.5);
  const status = span.ok === undefined ? "running" : span.ok ? "ok" : "error";
  const expandable = span.input !== undefined || span.output !== undefined;
  const retries = span.retries ?? 0;

  const linked = onHover !== undefined || onSelect !== undefined;

  return (
    <div
      className={`flex flex-col gap-0.5 rounded-sm px-1 -mx-1 transition-colors ${
        highlighted ? "bg-muted" : ""
      }`}
      onMouseEnter={() => onHover?.(span.id)}
      onMouseLeave={() => onHover?.(null)}
      ref={rowRef}
    >
      <button
        className={`flex items-baseline justify-between gap-3 text-left ${expandable || linked ? "" : "cursor-default"}`}
        onClick={() => {
          onSelect?.(span.id);
          if (expandable) setExpanded((previous) => !previous);
        }}
        type="button"
      >
        <span className="flex min-w-0 items-center gap-1 font-mono text-xs">
          {expandable && (
            <span
              className={`shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
            >
              ›
            </span>
          )}
          <span className="min-w-0 truncate">
            {span.label}
            {retries > 0 && (
              <span className="ml-1.5 text-muted-foreground">
                ↻ {retries} {retries === 1 ? "retry" : "retries"}
              </span>
            )}
            {span.note && (
              <span className="ml-1.5 rounded border border-dashed px-1 text-[0.6rem] text-muted-foreground">
                {span.note}
              </span>
            )}
          </span>
        </span>
        <span
          className={`shrink-0 font-mono text-[0.65rem] ${
            status === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-muted-foreground"
          }`}
        >
          {status === "running" ? "…" : formatDuration(durationMs)}
        </span>
      </button>
      <div className="h-2 w-full overflow-hidden rounded-sm bg-muted/50">
        <div
          className={`h-full rounded-sm transition-[width] ${
            status === "ok"
              ? "bg-emerald-500/70"
              : status === "error"
                ? "bg-red-500/70"
                : "animate-pulse bg-amber-400/70"
          }`}
          style={{ marginLeft: `${offsetPct}%`, width: `${widthPct}%` }}
        />
      </div>
      {expanded && (
        <div className="my-1 grid gap-2 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="mb-1 text-[0.65rem] font-medium uppercase text-muted-foreground">
              Input
            </p>
            <pre className="max-h-48 overflow-auto break-words rounded-lg border bg-muted/30 p-2 font-mono text-xs leading-relaxed">
              {formatJson(span.input)}
            </pre>
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-[0.65rem] font-medium uppercase text-muted-foreground">
              {status === "error" ? "Error" : "Output"}
            </p>
            <pre
              className={`max-h-48 overflow-auto break-words rounded-lg border bg-muted/30 p-2 font-mono text-xs leading-relaxed ${
                status === "error" ? "text-red-600 dark:text-red-400" : ""
              }`}
            >
              {status === "running"
                ? "…"
                : status === "error"
                  ? (span.error ?? "unknown error")
                  : formatJson(span.output)}
            </pre>
          </div>
        </div>
      )}
      {!expanded && span.error && (
        <p className="text-xs text-red-600 dark:text-red-400">{span.error}</p>
      )}
    </div>
  );
}

export interface RunViewProps {
  model: RunViewModel;
  /** Shown before anything has run. */
  emptyHint?: string;
  /**
   * Cross-highlighting hooks for hosts that render the same run somewhere
   * else too (the flow graph links spans ↔ steps through these).
   */
  highlightedSpanIds?: ReadonlySet<string>;
  /** Span to scroll into view — set when the linked view selects a node. */
  focusSpanId?: string | null;
  onSpanHover?: (id: string | null) => void;
  onSpanSelect?: (id: string) => void;
  className?: string;
}

export function RunView({
  model,
  emptyHint,
  highlightedSpanIds,
  focusSpanId,
  onSpanHover,
  onSpanSelect,
  className,
}: RunViewProps) {
  const running = model.status === "running";

  // Re-render while running so live timing bars grow in real time.
  const [, forceTick] = React.useReducer((tick: number) => tick + 1, 0);
  React.useEffect(() => {
    if (!running) return;
    const interval = setInterval(forceTick, 200);
    return () => clearInterval(interval);
  }, [running]);

  const empty =
    !running &&
    model.startedAt === undefined &&
    model.spans.length === 0 &&
    model.logs.length === 0;
  if (empty) {
    return (
      <p className="text-sm text-muted-foreground">
        {emptyHint ?? "Run the script to watch it execute."}
      </p>
    );
  }

  const spanStarts = model.spans.map((span) => span.startedAt);
  const spanEnds = model.spans.map((span) => span.startedAt + (span.durationMs ?? 0));
  const timelineStart = model.startedAt ?? (spanStarts.length ? Math.min(...spanStarts) : 0);
  const timelineEnd =
    model.endedAt ??
    (running ? Date.now() : spanEnds.length ? Math.max(...spanEnds) : timelineStart);
  const timelineSpanMs = Math.max(timelineEnd - timelineStart, 1);

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""}`}>
      <div className="flex flex-col gap-1.5">
        {model.spans.map((span) => (
          <SpanRow
            focused={focusSpanId === span.id}
            highlighted={highlightedSpanIds?.has(span.id)}
            key={span.id}
            onHover={onSpanHover}
            onSelect={onSpanSelect}
            span={span}
            timelineEnd={timelineEnd}
            timelineSpanMs={timelineSpanMs}
            timelineStart={timelineStart}
          />
        ))}
        {model.spans.length === 0 && running && (
          <p className="text-xs text-muted-foreground">No gateway calls yet…</p>
        )}
      </div>

      {model.logs.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground">Console</p>
          <pre className="max-h-48 overflow-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
            {model.logs
              .map(
                (log) =>
                  `${log.ts !== undefined ? `${new Date(log.ts).toLocaleTimeString()} ` : ""}[${log.level}] ${log.line}`,
              )
              .join("\n")}
          </pre>
        </div>
      )}

      {!running && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-medium ${
                model.status === "failed"
                  ? "border-red-300 text-red-700 dark:border-red-900 dark:text-red-400"
                  : "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
              }`}
            >
              {model.status === "failed" ? "error" : "done"}
            </span>
            {model.endedAt !== undefined && model.startedAt !== undefined && (
              <span className="text-xs text-muted-foreground">
                {formatDuration(model.endedAt - model.startedAt)} · {model.spans.length}{" "}
                call{model.spans.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
          {model.error !== undefined ? (
            <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-red-600 dark:text-red-400">
              {model.error}
            </pre>
          ) : (
            model.result !== undefined &&
            model.result !== null && <ResultView result={model.result} />
          )}
        </div>
      )}
    </div>
  );
}
