/**
 * Shared node chrome for the flow graph — arg chips, branch buttons and the
 * run-overlay badge, so StepNode and ParallelNode stay presentational shells.
 */

import type { ArgChip, RunOverlay } from "./node-types";

const argRelationCls: Record<"local" | "outer" | "input", string> = {
  local: "text-tailor-var-text border-tailor-var-border bg-tailor-var-bg",
  outer: "text-tailor-var-outer-text border-tailor-var-outer-border bg-tailor-var-outer-bg",
  input: "text-tailor-var-input-text border-tailor-var-input-border bg-tailor-var-input-bg",
};

export const branchCls =
  "text-tailor-block-text border-tailor-block-border bg-tailor-block-bg";

export function ArgBadge({ chip }: { chip: ArgChip }) {
  const base =
    "inline-flex gap-1 items-center rounded border px-1.5 py-0.5 font-mono text-[0.7rem]";
  const relCls = chip.relation
    ? argRelationCls[chip.relation]
    : "border-tailor-chip-border bg-tailor-chip-bg text-foreground";

  let badge: React.ReactNode = null;
  if (chip.relation === "local" && chip.stepIndex != null) {
    badge = (
      <em className="not-italic text-muted-foreground text-[0.62rem]">← step {chip.stepIndex}</em>
    );
  } else if (chip.relation === "input") {
    badge = (
      <em className="not-italic text-[0.62rem]">
        {chip.inputValue != null && chip.inputValue !== ""
          ? JSON.stringify(chip.inputValue)
          : "← input"}
      </em>
    );
  } else if (chip.relation === "outer") {
    badge = <em className="not-italic text-[0.62rem]">← outer</em>;
  }

  return (
    <span className={`${base} ${relCls}`}>
      {chip.text}
      {badge}
    </span>
  );
}

export function BranchButtons({
  nested,
  onOpen,
}: {
  nested: Array<{ label: "then" | "catch" | "finally"; count: number }>;
  onOpen: (label: "then" | "catch" | "finally") => void;
}) {
  return (
    <>
      {nested.map((branch) => (
        <button
          className={`rounded border px-1.5 py-0.5 text-[0.62rem] font-bold tracking-wider uppercase cursor-pointer ${branchCls}`}
          key={branch.label}
          onClick={() => onOpen(branch.label)}
          type="button"
        >
          {branch.label} · {branch.count}
        </button>
      ))}
    </>
  );
}

function formatDuration(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

/**
 * What the overlaid run did here. "skipped" is deliberately loud-ish rather
 * than absent — a step the run never reached is information, not noise.
 */
export function RunBadge({ run }: { run: RunOverlay }) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[0.58rem] font-bold tracking-wider uppercase";
  if (run.status === "skipped") {
    return (
      <span className={`${base} border-dashed border-tailor-skip text-tailor-skip`}>
        not reached
      </span>
    );
  }
  const ok = run.status === "ok";
  return (
    <span
      className={`${base} ${
        ok
          ? "border-tailor-ok bg-tailor-ok-bg text-tailor-ok"
          : "border-tailor-fail bg-tailor-fail-bg text-tailor-fail"
      }`}
      title={run.error}
    >
      {ok ? "ok" : "failed"} · {formatDuration(run.durationMs)}
    </span>
  );
}

/** Border/ring treatment that carries run status and hover linking. */
export function nodeShellCls(run: RunOverlay | undefined, highlighted: boolean, active: boolean) {
  const status =
    run?.status === "failed"
      ? "border-l-tailor-fail"
      : run?.status === "ok"
        ? "border-l-tailor-ok"
        : run?.status === "skipped"
          ? "border-l-tailor-skip opacity-60"
          : "border-l-tailor-accent";
  const ring = highlighted
    ? "ring-2 ring-tailor-accent ring-offset-1 ring-offset-background"
    : active
      ? "ring-1 ring-inset ring-tailor-accent"
      : "";
  return `${status} ${ring}`;
}
