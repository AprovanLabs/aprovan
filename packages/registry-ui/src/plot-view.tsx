/**
 * PlotView — the ggplot-grade half of the viz runtime.
 *
 * Renders an Observable Plot figure from a JSON spec, so workflow scripts
 * (which can only return data) get real grammar-of-graphics output: axes,
 * legends, color scales, faceting — not just the built-in bar/line SVG.
 *
 * Spec shape (a JSON projection of Plot's API):
 *
 *   {
 *     plot: {
 *       marks: [
 *         { type: "lineY", data: [{ week, commits, repo }, …],
 *           x: "week", y: "commits", stroke: "repo" },
 *         { type: "dot", data: […], x: "week", y: "commits", fill: "repo" }
 *       ],
 *       title?, width?, height?,
 *       x?: { label?, grid?, … }, y?: { … },
 *       color?: { legend?: true, scheme?, … },
 *       facet?: { data, x?, y? }
 *     }
 *   }
 *
 * `type` names a whitelisted Plot mark constructor; every other key on the
 * mark object passes through as channels/options. Everything outside
 * `marks` passes through as top-level Plot options.
 */

import * as Plot from "@observablehq/plot";
import * as React from "react";

export interface PlotMarkSpec {
  type: string;
  data?: unknown[];
  [channel: string]: unknown;
}

export interface PlotSpec {
  marks: PlotMarkSpec[];
  title?: string;
  [option: string]: unknown;
}

type MarkFactory = (data?: unknown[], options?: Record<string, unknown>) => unknown;

/** Whitelisted mark constructors — the useful, data-driven subset. */
const MARKS: Record<string, MarkFactory> = {
  areaX: Plot.areaX as MarkFactory,
  areaY: Plot.areaY as MarkFactory,
  barX: Plot.barX as MarkFactory,
  barY: Plot.barY as MarkFactory,
  boxX: Plot.boxX as MarkFactory,
  boxY: Plot.boxY as MarkFactory,
  cell: Plot.cell as MarkFactory,
  dot: Plot.dot as MarkFactory,
  line: Plot.line as MarkFactory,
  lineX: Plot.lineX as MarkFactory,
  lineY: Plot.lineY as MarkFactory,
  rectX: Plot.rectX as MarkFactory,
  rectY: Plot.rectY as MarkFactory,
  ruleX: Plot.ruleX as MarkFactory,
  ruleY: Plot.ruleY as MarkFactory,
  text: Plot.text as MarkFactory,
  tickX: Plot.tickX as MarkFactory,
  tickY: Plot.tickY as MarkFactory,
};

export function isPlotSpec(value: unknown): value is { plot: PlotSpec } {
  if (typeof value !== "object" || value === null) return false;
  const plot = (value as { plot?: unknown }).plot;
  if (typeof plot !== "object" || plot === null) return false;
  const marks = (plot as PlotSpec).marks;
  return (
    Array.isArray(marks) &&
    marks.length > 0 &&
    marks.every(
      (mark) =>
        typeof mark === "object" &&
        mark !== null &&
        typeof (mark as PlotMarkSpec).type === "string" &&
        (mark as PlotMarkSpec).type in MARKS,
    )
  );
}

function buildFigure(spec: PlotSpec): (SVGSVGElement | HTMLElement) & { remove(): void } {
  const { marks, title, ...options } = spec;
  const built = marks.map((mark) => {
    const { type, data, ...channels } = mark;
    const factory = MARKS[type];
    if (!factory) throw new Error(`Unknown plot mark: ${type}`);
    return factory(data, channels);
  });
  return Plot.plot({
    ...options,
    ...(title ? { title } : {}),
    marks: built,
  } as Plot.PlotOptions);
}

export function PlotView({ spec }: { spec: PlotSpec }): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    try {
      const figure = buildFigure(spec);
      container.replaceChildren(figure);
      setError(null);
      return () => figure.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return;
    }
  }, [spec]);

  if (error) {
    return <p className="text-xs text-destructive">Plot failed: {error}</p>;
  }
  return (
    <div
      className="tailor-plot max-w-full overflow-x-auto rounded-lg border bg-white p-3 text-neutral-900 [&_figure]:m-0"
      ref={containerRef}
    />
  );
}

export default PlotView;
