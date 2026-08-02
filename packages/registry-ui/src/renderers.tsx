/**
 * Renderer registry — one answer to "how should this file or result render?"
 * shared by every surface (chat, registry playground, workflows panel).
 *
 * Hosts render through `resolveRenderer` instead of hand-rolled if-chains:
 * workflow scripts get the TailorFlow graph, SQL results get a data table,
 * chart specs get the built-in viz runtime, and anything else falls back to
 * pretty-printed JSON. Hosts can `registerRenderer` their own (e.g. the
 * chat's widget compiler or Markdown pipeline) — highest match score wins.
 *
 * Hosts that can do more than show the content (execute a workflow, supply a
 * recorded run) pass those abilities down through
 * {@link RendererCapabilitiesProvider}; renderers read them with
 * {@link useRendererCapabilities} and must stay correct without them.
 *
 * ## Viz runtime
 *
 * Two structured shapes render natively, so workflow scripts can *return
 * visualizations* without any UI code:
 *
 *   - Tabular:  `{ columns: [{ name }...], rows: [[..]] }` — the shape
 *     `sql.query` returns — renders as a table (capped, with truncation note).
 *   - Chart:    `{ chart: { type: "bar" | "line", title?, labels?,
 *     series: [{ label?, values: number[] }...] } }` — renders as an SVG
 *     chart, no charting dependency.
 */

import React from "react";
import type { WorkflowRunLike } from "./run-view";

// ---------------------------------------------------------------------------
// Host capabilities
//
// Renderers are pure functions of their input by default. A host that can do
// more — execute the thing it is rendering, hand over a recorded run —
// declares it here instead of the renderer reaching for a global. Every
// capability is optional and every renderer must degrade to a preview
// without it.
// ---------------------------------------------------------------------------

export interface WorkflowRunCapability {
  /** Execute the rendered workflow with this input; resolves with the run. */
  run: (input: unknown) => Promise<WorkflowRunLike | void>;
  /** Run whose outcome should overlay the rendered flow, when host-selected. */
  activeRun?: WorkflowRunLike | null;
  /** Stable key for remembering the last manual input (the workflow name). */
  storageKey?: string;
}

export interface RendererCapabilities {
  workflowRun?: WorkflowRunCapability;
}

const CapabilitiesContext = React.createContext<RendererCapabilities>({});

/** Grant capabilities to every renderer beneath this boundary. */
export function RendererCapabilitiesProvider({
  value,
  children,
}: {
  value: RendererCapabilities;
  children: React.ReactNode;
}): React.ReactElement {
  return <CapabilitiesContext.Provider value={value}>{children}</CapabilitiesContext.Provider>;
}

export function useRendererCapabilities(): RendererCapabilities {
  return React.useContext(CapabilitiesContext);
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export interface RenderInput {
  /** File path, when rendering a workspace file. */
  path?: string;
  /** File source text. */
  content?: string;
  /** Structured value, when rendering a run/tool result. */
  data?: unknown;
}

export interface RendererDef {
  id: string;
  label: string;
  /** Match score for the input; highest wins, values <= 0 never match. */
  match: (input: RenderInput) => number;
  Component: React.ComponentType<{ input: RenderInput }>;
}

const renderers: RendererDef[] = [];

export function registerRenderer(def: RendererDef): void {
  const existing = renderers.findIndex((entry) => entry.id === def.id);
  if (existing >= 0) renderers.splice(existing, 1);
  renderers.push(def);
}

export function listRenderers(): RendererDef[] {
  return [...renderers];
}

export function resolveRenderer(input: RenderInput): RendererDef | undefined {
  let best: RendererDef | undefined;
  let bestScore = 0;
  for (const def of renderers) {
    const score = def.match(input);
    if (score > bestScore) {
      best = def;
      bestScore = score;
    }
  }
  return best;
}

/** Render an input through the registry; null when nothing matches. */
export function RenderedView({ input }: { input: RenderInput }): React.ReactElement | null {
  const def = resolveRenderer(input);
  if (!def) return null;
  const Component = def.Component;
  return <Component input={input} />;
}

// ---------------------------------------------------------------------------
// Workflow scripts
// ---------------------------------------------------------------------------

/**
 * A workflow script is plain js/ts under a `workflows/` folder, or source
 * whose shape gives it away (top-level namespace awaits, no JSX/exports).
 * The TailorFlow renderer for these registers from `./tailor`, so hosts that
 * never render flow graphs don't pull the graph machinery in.
 */
export function isWorkflowScript(path: string | undefined, source?: string): boolean {
  if (path && /(^|\/)workflows\/[^/]+\.(js|ts)$/u.test(path)) return true;
  if (path && !/\.(js|ts)$/u.test(path)) return false;
  if (!source) return false;
  if (/^\s*(import\s|export\s)/mu.test(source)) return false;
  if (/<[A-Z][A-Za-z]*[\s/>]/u.test(source)) return false;
  return /\bawait\s+[a-zA-Z_$][\w$]*\.[\w$.]+\(/u.test(source);
}

// ---------------------------------------------------------------------------
// JSON tree
// ---------------------------------------------------------------------------

function JsonNode({
  name,
  value,
  depth,
}: {
  name?: string;
  value: unknown;
  depth: number;
}): React.ReactElement {
  const label = name !== undefined && (
    <span className="text-sky-700 dark:text-sky-400">{name}: </span>
  );
  if (value === null || typeof value !== "object") {
    const text = typeof value === "string" ? JSON.stringify(value) : String(value);
    const tone =
      typeof value === "string"
        ? "text-emerald-700 dark:text-emerald-400"
        : typeof value === "number"
          ? "text-amber-700 dark:text-amber-400"
          : "text-purple-700 dark:text-purple-400";
    return (
      <div className="pl-4">
        {label}
        <span className={`${tone} break-all`}>{text}</span>
      </div>
    );
  }
  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value as Record<string, unknown>);
  const preview = Array.isArray(value) ? `[${value.length}]` : `{${entries.length}}`;
  if (entries.length === 0) {
    return (
      <div className="pl-4">
        {label}
        <span className="text-muted-foreground">{Array.isArray(value) ? "[]" : "{}"}</span>
      </div>
    );
  }
  return (
    <details className="pl-4" open={depth < 2}>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="mr-1 inline-block w-2 text-muted-foreground">›</span>
        {label}
        <span className="text-muted-foreground">{preview}</span>
      </summary>
      {entries.map(([key, item]) => (
        <JsonNode key={key} depth={depth + 1} name={key} value={item} />
      ))}
    </details>
  );
}

/** Collapsible JSON tree — the default viewer for .json files and results. */
export function JsonView({ value }: { value: unknown }): React.ReactElement {
  return (
    <div className="max-h-96 overflow-auto rounded-lg border bg-muted/30 p-2 pl-0 font-mono text-xs leading-relaxed">
      <JsonNode depth={0} value={value} />
    </div>
  );
}

registerRenderer({
  id: "json-file",
  label: "JSON",
  match: (input) => {
    if (!input.path?.endsWith(".json") || input.content === undefined) return 0;
    try {
      JSON.parse(input.content);
      return 70;
    } catch {
      return 0;
    }
  },
  Component: ({ input }) => <JsonView value={JSON.parse(input.content ?? "null")} />,
});

// ---------------------------------------------------------------------------
// Tabular results (sql.query shape)
// ---------------------------------------------------------------------------

export interface TabularData {
  columns: Array<{ name: string; type?: string }>;
  rows: unknown[][];
  rowCount?: number;
  truncated?: boolean;
}

export function asTabularData(value: unknown): TabularData | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const candidate = value as Partial<TabularData>;
  if (
    !Array.isArray(candidate.columns) ||
    !Array.isArray(candidate.rows) ||
    candidate.columns.length === 0 ||
    !candidate.columns.every(
      (column) => typeof column === "object" && column !== null && typeof column.name === "string",
    ) ||
    !candidate.rows.every((row) => Array.isArray(row))
  ) {
    return undefined;
  }
  return candidate as TabularData;
}

const TABLE_ROW_CAP = 200;

export function DataTable({ data }: { data: TabularData }): React.ReactElement {
  const rows = data.rows.slice(0, TABLE_ROW_CAP);
  const total = data.rowCount ?? data.rows.length;
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-80 overflow-auto rounded-lg border">
        <table className="w-full border-collapse text-xs">
          <thead className="sticky top-0 bg-muted/80 backdrop-blur">
            <tr>
              {data.columns.map((column) => (
                <th
                  key={column.name}
                  className="border-b px-2 py-1.5 text-left font-medium"
                  title={column.type}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-muted/20">
                {data.columns.map((_, columnIndex) => (
                  <td key={columnIndex} className="border-b px-2 py-1 font-mono">
                    {formatCell(row[columnIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[0.65rem] text-muted-foreground">
        {total} row{total === 1 ? "" : "s"}
        {(data.truncated || data.rows.length > TABLE_ROW_CAP) &&
          ` · showing first ${rows.length}`}
      </p>
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

registerRenderer({
  id: "tabular",
  label: "Table",
  match: (input) => (asTabularData(input.data) ? 80 : 0),
  Component: ({ input }) => <DataTable data={asTabularData(input.data)!} />,
});

// ---------------------------------------------------------------------------
// Chart specs → SVG (the viz runtime)
// ---------------------------------------------------------------------------

export interface ChartSpec {
  type: "bar" | "line";
  title?: string;
  labels?: string[];
  series: Array<{ label?: string; values: number[] }>;
}

export function asChartSpec(value: unknown): ChartSpec | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const chart = (value as { chart?: unknown }).chart;
  if (typeof chart !== "object" || chart === null) return undefined;
  const spec = chart as Partial<ChartSpec>;
  if (spec.type !== "bar" && spec.type !== "line") return undefined;
  if (
    !Array.isArray(spec.series) ||
    spec.series.length === 0 ||
    !spec.series.every(
      (series) =>
        typeof series === "object" &&
        series !== null &&
        Array.isArray(series.values) &&
        series.values.every((v) => typeof v === "number" && Number.isFinite(v)),
    )
  ) {
    return undefined;
  }
  return spec as ChartSpec;
}

const CHART_W = 560;
const CHART_H = 220;
const PAD = { top: 12, right: 12, bottom: 24, left: 40 };
const SERIES_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];

export function Chart({ spec }: { spec: ChartSpec }): React.ReactElement {
  const pointCount = Math.max(...spec.series.map((series) => series.values.length), 1);
  const values = spec.series.flatMap((series) => series.values);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const innerW = CHART_W - PAD.left - PAD.right;
  const innerH = CHART_H - PAD.top - PAD.bottom;
  const y = (value: number) => PAD.top + innerH - ((value - min) / range) * innerH;
  const zeroY = y(Math.max(min, 0));

  const ticks = [min, min + range / 2, max];

  return (
    <div className="flex flex-col gap-1">
      {spec.title && <p className="text-xs font-medium">{spec.title}</p>}
      <svg
        className="max-w-full rounded-lg border bg-background"
        role="img"
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              stroke="currentColor"
              strokeOpacity={0.12}
              x1={PAD.left}
              x2={CHART_W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
            />
            <text
              fill="currentColor"
              fillOpacity={0.5}
              fontSize={9}
              textAnchor="end"
              x={PAD.left - 4}
              y={y(tick) + 3}
            >
              {Math.abs(tick) >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick.toFixed(tick % 1 ? 1 : 0)}
            </text>
          </g>
        ))}
        {spec.series.map((series, seriesIndex) => {
          const color = SERIES_COLORS[seriesIndex % SERIES_COLORS.length];
          if (spec.type === "line") {
            const step = pointCount > 1 ? innerW / (pointCount - 1) : 0;
            const path = series.values
              .map(
                (value, index) =>
                  `${index === 0 ? "M" : "L"}${(PAD.left + index * step).toFixed(1)},${y(value).toFixed(1)}`,
              )
              .join(" ");
            return (
              <path
                key={seriesIndex}
                d={path}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            );
          }
          const groupW = innerW / pointCount;
          const barW = Math.max((groupW * 0.7) / spec.series.length, 2);
          return (
            <g key={seriesIndex}>
              {series.values.map((value, index) => {
                const x =
                  PAD.left + index * groupW + groupW * 0.15 + seriesIndex * barW;
                const top = Math.min(y(value), zeroY);
                const height = Math.abs(y(value) - zeroY) || 1;
                return (
                  <rect
                    key={index}
                    fill={color}
                    fillOpacity={0.85}
                    height={height}
                    rx={1.5}
                    width={barW}
                    x={x}
                    y={top}
                  />
                );
              })}
            </g>
          );
        })}
        {(spec.labels ?? []).slice(0, pointCount).map((label, index) => {
          const groupW = innerW / pointCount;
          const x =
            spec.type === "line" && pointCount > 1
              ? PAD.left + index * (innerW / (pointCount - 1))
              : PAD.left + index * groupW + groupW / 2;
          return (
            <text
              key={index}
              fill="currentColor"
              fillOpacity={0.6}
              fontSize={9}
              textAnchor="middle"
              x={x}
              y={CHART_H - 8}
            >
              {label.length > 10 ? `${label.slice(0, 9)}…` : label}
            </text>
          );
        })}
      </svg>
      {spec.series.some((series) => series.label) && (
        <div className="flex flex-wrap gap-3">
          {spec.series.map((series, index) => (
            <span key={index} className="flex items-center gap-1 text-[0.65rem] text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-sm"
                style={{ background: SERIES_COLORS[index % SERIES_COLORS.length] }}
              />
              {series.label ?? `Series ${index + 1}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

registerRenderer({
  id: "chart",
  label: "Chart",
  match: (input) => (asChartSpec(input.data) ? 90 : 0),
  Component: ({ input }) => <Chart spec={asChartSpec(input.data)!} />,
});

// ---------------------------------------------------------------------------
// Grammar-of-graphics plots (Observable Plot) — the ggplot-grade runtime.
// Lazy-loaded: the Plot bundle only downloads when a `{ plot }` result
// actually renders. Spec shape and mark whitelist live in ./plot-view.
// ---------------------------------------------------------------------------

const LazyPlotView = React.lazy(() => import("./plot-view"));

/** Structural pre-check without loading the Plot bundle. */
function looksLikePlotSpec(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const plot = (value as { plot?: unknown }).plot;
  if (typeof plot !== "object" || plot === null) return false;
  const marks = (plot as { marks?: unknown }).marks;
  return (
    Array.isArray(marks) &&
    marks.length > 0 &&
    marks.every(
      (mark) =>
        typeof mark === "object" &&
        mark !== null &&
        typeof (mark as { type?: unknown }).type === "string",
    )
  );
}

registerRenderer({
  id: "plot",
  label: "Plot",
  match: (input) => (looksLikePlotSpec(input.data) ? 95 : 0),
  Component: ({ input }) => (
    <React.Suspense
      fallback={<p className="text-xs text-muted-foreground">Loading plot renderer…</p>}
    >
      <LazyPlotView spec={(input.data as { plot: import("./plot-view").PlotSpec }).plot} />
    </React.Suspense>
  ),
});
