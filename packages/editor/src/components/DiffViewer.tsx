import { MergeView, unifiedMergeView } from "@codemirror/merge";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

/** One side of a before/after diff. Content is host-fetched; this never loads. */
export type DiffPane = {
  /** Plain-language label (time/author) — never a hash. */
  label: string;
  /** Text content when ready. Omit / null when missing, loading, or non-text. */
  content?: string | null;
  /**
   * Display state. Defaults to `ready` when `content` is a string, else
   * `missing` (added/removed file).
   */
  status?: "ready" | "loading" | "missing" | "error" | "binary" | "oversize";
  /** For binary/oversize copy: "This file can't be shown as text — N KB changed". */
  sizeKb?: number;
  /** Error message when status is `error`. */
  error?: string;
  /** Per-side retry when status is `error`. */
  onRetry?: () => void;
};

export type DiffViewerMode = "unified" | "split" | "auto";

export interface DiffViewerProps {
  before: DiffPane;
  after: DiffPane;
  /** Explicit mode, or `auto` (default) — split on wide viewports, unified when narrow. */
  mode?: DiffViewerMode;
  /** Viewport width (px) below which `auto` uses unified. Default 768. */
  narrowBreakpoint?: number;
  onOpenFile?: () => void;
  className?: string;
  /** Optional actions rendered next to the mode toggle (e.g. host chrome). */
  headerExtra?: ReactNode;
}

function resolveStatus(pane: DiffPane): NonNullable<DiffPane["status"]> {
  if (pane.status) return pane.status;
  return typeof pane.content === "string" ? "ready" : "missing";
}

function nonTextMessage(pane: DiffPane): string {
  const n = pane.sizeKb;
  if (typeof n === "number" && Number.isFinite(n)) {
    return `This file can't be shown as text — ${n} KB changed`;
  }
  return "This file can't be shown as text";
}

function PaneMessage({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded border border-dashed border-border bg-muted/30 px-3 py-6 text-sm text-muted-foreground">
      <p>{children}</p>
      {action}
    </div>
  );
}

function SkeletonPanes({ split }: { split: boolean }) {
  const pane = (
    <div className="space-y-2 rounded border bg-muted/20 p-3" aria-hidden>
      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-3 w-full animate-pulse rounded bg-muted" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
    </div>
  );
  return (
    <div className={cn("gap-2", split ? "grid grid-cols-2" : "flex flex-col")}>
      {pane}
      {split ? pane : null}
    </div>
  );
}

const editorTheme = EditorView.theme({
  "&": { backgroundColor: "transparent", fontSize: "0.875rem", height: "100%" },
  ".cm-scroller": { overflow: "auto" },
  ".cm-content": {
    fontFamily: "var(--font-mono, ui-monospace, monospace)",
  },
  ".cm-gutters": { backgroundColor: "transparent" },
  "&.cm-focused": { outline: "none" },
});

const readOnlyExt = [
  basicSetup,
  EditorView.editable.of(false),
  EditorState.readOnly.of(true),
  editorTheme,
];

/**
 * Renders before/after file content with `@codemirror/merge`.
 * Host supplies content and plain-language labels; this component does not fetch.
 */
export function DiffViewer({
  before,
  after,
  mode = "auto",
  narrowBreakpoint = 768,
  onOpenFile,
  className,
  headerExtra,
}: DiffViewerProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const mergeRef = useRef<MergeView | null>(null);
  const unifiedRef = useRef<EditorView | null>(null);

  const [narrow, setNarrow] = useState(false);
  const [modeOverride, setModeOverride] = useState<"unified" | "split" | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${narrowBreakpoint - 1}px)`);
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [narrowBreakpoint]);

  const resolvedMode: "unified" | "split" =
    modeOverride ??
    (mode === "auto" ? (narrow ? "unified" : "split") : mode === "unified" ? "unified" : "split");

  const beforeStatus = resolveStatus(before);
  const afterStatus = resolveStatus(after);
  const bothReady = beforeStatus === "ready" && afterStatus === "ready";
  const eitherLoading =
    beforeStatus === "loading" || afterStatus === "loading";

  // Mount / rebuild merge editors when ready content + mode change.
  useEffect(() => {
    const parent = hostRef.current;
    if (!parent || !bothReady) {
      mergeRef.current?.destroy();
      mergeRef.current = null;
      unifiedRef.current?.destroy();
      unifiedRef.current = null;
      return;
    }

    const aDoc = before.content ?? "";
    const bDoc = after.content ?? "";

    mergeRef.current?.destroy();
    mergeRef.current = null;
    unifiedRef.current?.destroy();
    unifiedRef.current = null;
    parent.replaceChildren();

    if (resolvedMode === "split") {
      mergeRef.current = new MergeView({
        a: { doc: aDoc, extensions: readOnlyExt },
        b: { doc: bDoc, extensions: readOnlyExt },
        parent,
      });
    } else {
      unifiedRef.current = new EditorView({
        parent,
        doc: bDoc,
        extensions: [
          ...readOnlyExt,
          unifiedMergeView({
            original: aDoc,
            mergeControls: false,
          }),
        ],
      });
    }

    return () => {
      mergeRef.current?.destroy();
      mergeRef.current = null;
      unifiedRef.current?.destroy();
      unifiedRef.current = null;
    };
    // content identity: re-run when text or mode changes
  }, [
    bothReady,
    resolvedMode,
    before.content,
    after.content,
  ]);

  const showAdded = beforeStatus === "missing" && afterStatus === "ready";
  const showRemoved = afterStatus === "missing" && beforeStatus === "ready";

  function renderSideState(pane: DiffPane, status: NonNullable<DiffPane["status"]>) {
    if (status === "loading") {
      return (
        <PaneMessage>
          Loading…
        </PaneMessage>
      );
    }
    if (status === "error") {
      return (
        <PaneMessage
          action={
            pane.onRetry ? (
              <button
                type="button"
                onClick={pane.onRetry}
                className="inline-flex items-center rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium hover:bg-accent"
              >
                Retry
              </button>
            ) : null
          }
        >
          {pane.error ?? "Couldn't load this version."}
        </PaneMessage>
      );
    }
    if (status === "binary" || status === "oversize") {
      return <PaneMessage>{nonTextMessage(pane)}</PaneMessage>;
    }
    if (status === "missing") {
      return <PaneMessage>No content on this side.</PaneMessage>;
    }
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="inline-flex rounded-md border border-input p-0.5 text-xs"
          role="group"
          aria-label="Diff layout"
        >
          <button
            type="button"
            className={cn(
              "rounded px-2 py-1",
              resolvedMode === "split"
                ? "bg-muted font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setModeOverride("split")}
          >
            Split
          </button>
          <button
            type="button"
            className={cn(
              "rounded px-2 py-1",
              resolvedMode === "unified"
                ? "bg-muted font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setModeOverride("unified")}
          >
            Unified
          </button>
        </div>
        {onOpenFile ? (
          <button
            type="button"
            onClick={onOpenFile}
            className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Open file
          </button>
        ) : null}
        {headerExtra}
      </div>

      <div
        className={cn(
          "gap-2 text-xs text-muted-foreground",
          resolvedMode === "split" ? "grid grid-cols-2" : "flex flex-col",
        )}
      >
        <div className="truncate font-medium text-foreground" title={before.label}>
          {before.label}
        </div>
        {resolvedMode === "split" ? (
          <div className="truncate font-medium text-foreground" title={after.label}>
            {after.label}
          </div>
        ) : (
          <div className="truncate" title={after.label}>
            → {after.label}
          </div>
        )}
      </div>

      {eitherLoading && !bothReady ? (
        <SkeletonPanes split={resolvedMode === "split"} />
      ) : bothReady ? (
        <div
          ref={hostRef}
          className="min-h-[12rem] overflow-hidden rounded border [&_.cm-mergeView]:h-full [&_.cm-editor]:h-full"
        />
      ) : showAdded ? (
        <div className="space-y-2">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">New file</p>
          <pre className="max-h-80 overflow-auto rounded border bg-muted/20 p-3 font-mono text-xs whitespace-pre-wrap">
            {after.content}
          </pre>
        </div>
      ) : showRemoved ? (
        <div className="space-y-2">
          <p className="text-xs text-red-600 dark:text-red-400">Removed file</p>
          <pre className="max-h-80 overflow-auto rounded border bg-muted/20 p-3 font-mono text-xs whitespace-pre-wrap line-through opacity-80">
            {before.content}
          </pre>
        </div>
      ) : (
        <div
          className={cn(
            "gap-2",
            resolvedMode === "split" ? "grid grid-cols-2" : "flex flex-col",
          )}
        >
          {renderSideState(before, beforeStatus)}
          {renderSideState(after, afterStatus)}
        </div>
      )}
    </div>
  );
}
