/**
 * Presentational atoms shared by every Apps/Workflows surface: badges, status
 * dots, the copy chip, the two-click delete, and the tiny async helpers the
 * detail panes lean on.
 *
 * These are deliberately dumb — no transport, no domain knowledge beyond the
 * shapes in `./wire` — so the sidebar variant and the full master/detail panel
 * are visually the same component set at two densities.
 */

import * as React from "react";
import type { AppSummary, RunStatus, WorkflowSummary } from "./wire";

export const SMALL_BUTTON =
  "rounded-md border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

/**
 * Borderless square icon affordance, sized and toned to match the chat
 * sidebar's own icon buttons (the file tree's refresh sits right above ours),
 * so the two explorers read as one column rather than two widgets.
 */
export const ICON_BUTTON =
  "shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50";

export const TINY_BUTTON =
  "rounded border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export const BADGE =
  "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[0.65rem] font-medium leading-4";

export const FIELD =
  "w-full rounded-md border bg-transparent px-2 py-1 font-mono text-xs outline-none focus-visible:border-ring";

export const LABEL =
  "block text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground";

// ---------------------------------------------------------------------------
// Class merging
// ---------------------------------------------------------------------------

/**
 * Utilities whose *value* varies but whose CSS property does not, so a host's
 * token must replace ours rather than race it. Longest prefix first — `min-h`
 * has to win over `h`. Everything not listed is compared whole, which is the
 * safe default: unrelated tokens simply never collide.
 */
const CONFLICT_PREFIXES = [
  "min-h",
  "max-h",
  "min-w",
  "max-w",
  "h",
  "w",
  "overflow-x",
  "overflow-y",
  "overflow",
  "grid-cols",
  "grid-rows",
  "gap-x",
  "gap-y",
  "gap",
  "basis",
  "grow",
  "shrink",
  "flex",
  "px",
  "py",
  "pt",
  "pb",
  "pl",
  "pr",
  "p",
  "mx",
  "my",
  "mt",
  "mb",
  "ml",
  "mr",
  "m",
];

const DISPLAY_TOKENS = new Set([
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "contents",
  "hidden",
]);

const FLEX_DIRECTION = /^flex-(row|row-reverse|col|col-reverse)$/;

/** The CSS "slot" a Tailwind token occupies, variants included. */
function conflictKey(token: string): string {
  const cut = token.lastIndexOf(":");
  const variants = cut === -1 ? "" : token.slice(0, cut + 1);
  const base = (cut === -1 ? token : token.slice(cut + 1)).replace(/^!/, "");
  if (DISPLAY_TOKENS.has(base)) return `${variants}@display`;
  if (FLEX_DIRECTION.test(base)) return `${variants}@flex-direction`;
  for (const prefix of CONFLICT_PREFIXES) {
    if (base === prefix || base.startsWith(`${prefix}-`)) return `${variants}@${prefix}`;
  }
  return `${variants}${base}`;
}

/**
 * Concatenate our own classes with a host's `className`, dropping ours wherever
 * the host set the same property.
 *
 * Why not plain interpolation: Tailwind resolves conflicts by stylesheet order,
 * not by order in the attribute, so `"md:max-h-[70vh]" + "h-full"` is a coin
 * flip rather than an override. Why not `tailwind-merge`: one dependency, one
 * more version to keep in step with Tailwind, for the handful of layout
 * properties a host ever needs to take over. This is that handful.
 */
export function mergeClasses(base: string, override?: string | undefined): string {
  const extra = (override ?? "").split(/\s+/).filter(Boolean);
  if (extra.length === 0) return base;
  const taken = new Set(extra.map(conflictKey));
  const kept = base
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !taken.has(conflictKey(token)));
  return [...kept, ...extra].join(" ");
}

export function formatWhen(iso: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDuration(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

/** Coarse "how long ago" — the runs strip has no room for a full timestamp,
 *  and a relative label is what a picker of recent runs actually needs. */
export function formatRelativeTime(iso: string): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return iso;
  const diffMs = Date.now() - then;
  const abs = Math.abs(diffMs);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (abs < 45_000) return "just now";
  if (abs < 90 * minute) return `${Math.max(1, Math.round(abs / minute))}m ago`;
  if (abs < 36 * hour) return `${Math.round(abs / hour)}h ago`;
  return `${Math.round(abs / day)}d ago`;
}

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------

export function TriggerBadges({
  workflow,
  compact,
}: {
  workflow: WorkflowSummary;
  compact?: boolean;
}) {
  const { cron, webhook, events } = workflow.triggers;
  const bare = !cron && !webhook && !events?.length;
  if (compact) {
    // The sidebar has no room for expressions — one letter per edge.
    const marks = [
      cron ? { key: "cron", text: "⏱", title: `cron ${cron}` } : null,
      webhook ? { key: "hook", text: "⇥", title: "webhook" } : null,
      events?.length ? { key: "events", text: "◈", title: `on ${events.join(", ")}` } : null,
    ].filter((mark): mark is { key: string; text: string; title: string } => mark !== null);
    if (marks.length === 0) return null;
    return (
      <span className="flex shrink-0 items-center gap-0.5 text-[0.65rem] text-muted-foreground">
        {marks.map((mark) => (
          <span key={mark.key} title={mark.title}>
            {mark.text}
          </span>
        ))}
      </span>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {cron && (
        <span className={`${BADGE} border-sky-300 text-sky-700 dark:border-sky-800 dark:text-sky-400`}>
          cron <code className="font-mono">{cron}</code>
        </span>
      )}
      {webhook && (
        <span
          className={`${BADGE} border-violet-300 text-violet-700 dark:border-violet-800 dark:text-violet-400`}
        >
          webhook
        </span>
      )}
      {events?.map((channel) => (
        <span
          className={`${BADGE} border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400`}
          key={channel}
        >
          on <code className="font-mono">{channel}</code>
        </span>
      ))}
      {bare && <span className={`${BADGE} border-border text-muted-foreground`}>manual</span>}
    </span>
  );
}

export function VisibilityBadge({ app }: { app: AppSummary }) {
  return (
    <span
      className={`${BADGE} ${
        app.visibility === "public"
          ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
          : "border-border text-muted-foreground"
      }`}
      title={
        app.visibility === "public"
          ? "Anyone can open the live page"
          : "An Aprovan account passing the role model is required"
      }
    >
      {app.visibility}
    </span>
  );
}

/** Where this app's users' data physically lands — the spec's `dataScope`. */
export function DataScopeBadge({ app }: { app: AppSummary }) {
  const scope = app.dataScope ?? "owner";
  return (
    <span
      className={`${BADGE} ${
        scope === "workspace"
          ? "border-amber-300 text-amber-700 dark:border-amber-900 dark:text-amber-400"
          : "border-border text-muted-foreground"
      }`}
      title={
        scope === "workspace"
          ? "Self-hosted: user data lives in the caller's own workspace, on the caller's credentials"
          : "Owner-hosted: user data lives in the publishing workspace, on the publisher's credentials"
      }
    >
      {scope === "workspace" ? "self-hosted" : "owner-hosted"}
    </span>
  );
}

/** The release/channel pin the live page is serving, when the gateway says. */
export function ReleaseChip({ app }: { app: AppSummary }) {
  const channel = app.channel ?? app.release?.channel;
  const release = app.release?.id;
  if (!channel && !release) return null;
  return (
    <span className={`${BADGE} border-border text-muted-foreground`} title="Live channel pin">
      {channel ?? "live"}
      {release && <code className="font-mono">{release.slice(0, 8)}</code>}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Structured form controls
//
// The Access tab used to communicate everything as prose and bare textareas.
// These atoms replace that: a segmented control for two-or-three-way choices,
// a tag-style list editor for line-oriented values (allow-list entries, user
// subs), and a stat tile for numbers that deserve to be scanned, not read.
// ---------------------------------------------------------------------------

/** Two-to-four mutually exclusive options as a compact button group. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: ReadonlyArray<{ value: T; label: string; hint?: string }>;
  value: T;
  onChange: (next: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="inline-flex overflow-hidden rounded-md border"
      role="radiogroup"
    >
      {options.map((option, index) => (
        <button
          aria-checked={option.value === value}
          className={`px-2.5 py-1 text-xs transition-colors ${
            index > 0 ? "border-l" : ""
          } ${
            option.value === value
              ? "bg-primary font-medium text-primary-foreground"
              : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          title={option.hint}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Tag-style editor for a list of short strings: chips with an inline input.
 * Enter / comma / paste-with-newlines add; backspace on an empty input (or a
 * chip's ×) removes. Replaces "one per line" textareas, which read as a blob.
 */
export function TagsInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  ariaLabel?: string;
}) {
  const [draft, setDraft] = React.useState("");

  const commit = (text: string) => {
    const parts = text
      .split(/[\n,]+/)
      .map((part) => part.trim())
      .filter(Boolean)
      .filter((part) => !value.includes(part));
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  };

  return (
    <div className="flex min-h-[1.9rem] flex-wrap items-center gap-1 rounded-md border bg-transparent px-1.5 py-1 focus-within:border-ring">
      {value.map((tag) => (
        <span
          className="inline-flex items-center gap-1 rounded border bg-muted/40 px-1.5 py-0.5 font-mono text-[0.7rem]"
          key={tag}
        >
          {tag}
          <button
            aria-label={`Remove ${tag}`}
            className="text-muted-foreground hover:text-foreground"
            onClick={() => onChange(value.filter((entry) => entry !== tag))}
            type="button"
          >
            ×
          </button>
        </span>
      ))}
      <input
        aria-label={ariaLabel}
        className="min-w-[8rem] flex-1 bg-transparent px-1 py-0.5 font-mono text-xs outline-none placeholder:text-muted-foreground/70"
        onBlur={() => {
          if (draft.trim()) commit(draft);
        }}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            commit(draft);
          } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
            onChange(value.slice(0, -1));
          }
        }}
        onPaste={(event) => {
          const text = event.clipboardData.getData("text");
          if (/[\n,]/.test(text)) {
            event.preventDefault();
            commit(draft + text);
          }
        }}
        placeholder={value.length === 0 ? placeholder : undefined}
        spellCheck={false}
        value={draft}
      />
    </div>
  );
}

/** One number worth scanning: a compact labelled tile for the rate-limit row. */
export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-md border px-2 py-1" title={hint}>
      <div className="text-sm font-semibold leading-5 tabular-nums">{value}</div>
      <div className="text-[0.62rem] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

/** Identity chip: initial avatar + shortened id, full value on hover. */
export function UserChip({ id }: { id: string }) {
  const short = id.length > 14 ? `${id.slice(0, 12)}…` : id;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border py-0.5 pl-0.5 pr-2"
      title={id}
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-[0.6rem] font-semibold uppercase text-muted-foreground">
        {id.slice(0, 1)}
      </span>
      <code className="font-mono text-[0.68rem]">{short}</code>
    </span>
  );
}

/**
 * Lucide's `database`, inlined (same rationale as {@link RefreshIcon}): the
 * data-location callout needs an icon and the icon set is the host's
 * dependency, not this package's.
 */
export function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

/**
 * Lucide's `refresh-cw`, inlined.
 *
 * The chat sidebar draws this exact glyph next to the file tree and we have to
 * match it, but `lucide-react` is the host app's dependency, not this
 * package's — a shared component library should not drag an icon set into
 * every consumer's bundle for one 24×24 path. So the path lives here (lucide
 * is ISC-licensed) and the icon stays a plain SVG.
 */
export function RefreshIcon({ spinning }: { spinning?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-3 w-3 ${spinning ? "animate-spin" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

/**
 * Reload the catalog. The full panel has room for a word; the sidebar sits
 * beside an icon-only file tree, so it gets the icon.
 */
export function RefreshButton({
  onRefresh,
  refreshing,
  compact,
}: {
  onRefresh: () => void;
  refreshing?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <button
        aria-label="Refresh apps and workflows"
        className={ICON_BUTTON}
        onClick={onRefresh}
        title="Refresh"
        type="button"
      >
        <RefreshIcon spinning={refreshing} />
      </button>
    );
  }
  return (
    <button className={SMALL_BUTTON} onClick={onRefresh} type="button">
      Refresh
    </button>
  );
}

export function StatusDot({ status }: { status: RunStatus }) {
  const color =
    status === "succeeded"
      ? "bg-emerald-500"
      : status === "failed"
        ? "bg-red-500"
        : "bg-amber-400 animate-pulse";
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${color}`} />;
}

/** Inline copy-to-clipboard affordance with a transient "copied" state. */
export function CopyChip({ text, label = "copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <button
      className={TINY_BUTTON}
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => setCopied(true));
      }}
      title={`Copy ${text}`}
      type="button"
    >
      {copied ? "copied" : label}
    </button>
  );
}

/**
 * Two-click destructive button: first click arms it ("Confirm delete?"),
 * second click within 4s fires; it disarms on timeout.
 */
export function ConfirmButton({
  onConfirm,
  busy,
  label,
  armedLabel,
  busyLabel,
  tone = "danger",
  className,
}: {
  onConfirm: () => void;
  busy?: boolean;
  label: string;
  armedLabel?: string;
  busyLabel?: string;
  tone?: "danger" | "caution";
  className?: string;
}) {
  const [armed, setArmed] = React.useState(false);
  React.useEffect(() => {
    if (!armed) return;
    const timeout = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timeout);
  }, [armed]);
  const armedClass =
    tone === "danger"
      ? "rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70"
      : "rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-950/70";
  const restClass =
    tone === "danger"
      ? `${SMALL_BUTTON} hover:border-red-300 hover:text-red-700 dark:hover:border-red-900 dark:hover:text-red-400`
      : SMALL_BUTTON;
  return (
    <button
      className={`${armed ? armedClass : restClass} ${className ?? ""}`}
      disabled={busy}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
      title={armed ? "Click again to confirm" : label}
      type="button"
    >
      {busy ? (busyLabel ?? "Working…") : armed ? (armedLabel ?? `Confirm ${label.toLowerCase()}?`) : label}
    </button>
  );
}

export function ConfirmDeleteButton({
  onConfirm,
  busy,
  label = "Delete",
}: {
  onConfirm: () => void;
  busy?: boolean;
  label?: string;
}) {
  return (
    <ConfirmButton
      armedLabel="Confirm delete?"
      busy={busy}
      busyLabel="Deleting…"
      label={label}
      onConfirm={onConfirm}
    />
  );
}

// ---------------------------------------------------------------------------
// Layout atoms
// ---------------------------------------------------------------------------

export function SectionHeading({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <h4
      className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground"
      title={hint}
    >
      {children}
    </h4>
  );
}

export function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
      <span className={LABEL}>{label}</span>
      <span className="min-w-0 break-words text-xs">{children}</span>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

/**
 * The friendly, non-dev-jargon empty state for "no workflows here yet" —
 * used wherever a panel would otherwise point someone at a tool-call syntax
 * they have no way to run. One line of plain copy, plus an action:
 *
 *  - `onCreateWorkflow` present → a button that hands control back to the
 *    host (the registry opens its chat pane, patchwork opens its own).
 *  - `createWorkflowHref` present (and no callback) → a plain link, for a
 *    host that only has a URL to open (the registry's `/chat/` page).
 *  - neither → the quiet line alone, no action, no jargon.
 */
export function CreateWorkflowEmpty({
  children,
  onCreateWorkflow,
  createWorkflowHref,
  appName,
}: {
  /** The line of copy — defaults to a generic "no workflows yet". */
  children?: React.ReactNode;
  onCreateWorkflow?: ((appName?: string) => void) | undefined;
  createWorkflowHref?: string | undefined;
  /** Passed to `onCreateWorkflow` so a host can pre-fill "for this app". */
  appName?: string | undefined;
}) {
  return (
    <div className="space-y-1.5">
      <Empty>{children ?? "No workflows yet."}</Empty>
      {onCreateWorkflow ? (
        <button
          className={SMALL_BUTTON}
          onClick={() => onCreateWorkflow(appName)}
          type="button"
        >
          Create a workflow in chat
        </button>
      ) : (
        createWorkflowHref && (
          <a className={SMALL_BUTTON} href={createWorkflowHref} rel="noreferrer" target="_blank">
            Create a workflow in chat
          </a>
        )
      )}
    </div>
  );
}

export function ErrorLine({ error }: { error?: string | null }) {
  if (!error) return null;
  return <p className="text-xs text-red-600 dark:text-red-400">{error}</p>;
}

/** Tab strip used by both detail panes. */
export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: ReadonlyArray<{ id: T; label: string; badge?: number }>;
  active: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b">
      {tabs.map((tab) => (
        <button
          className={`-mb-px border-b-2 px-2.5 py-1.5 text-xs transition-colors ${
            tab.id === active
              ? "border-primary font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="ml-1 text-[0.65rem] text-muted-foreground">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Async helpers
// ---------------------------------------------------------------------------

/**
 * Run an async loader when `enabled` flips true, once, with a manual
 * `reload`. Deliberately minimal: the panels never need cancellation beyond
 * "ignore a stale resolve", and adding a query library for six call sites
 * would be the wrong trade.
 */
export function useLoader<T>(
  load: () => Promise<T>,
  enabled = true,
  /** Refetch when this changes — the app name, the trace id, whatever the
   * loader is really keyed by. Identity of `load` is deliberately ignored. */
  key = "",
): {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
  set: (value: T) => void;
} {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [nonce, setNonce] = React.useState(0);
  const loadRef = React.useRef(load);
  loadRef.current = load;

  React.useEffect(() => {
    if (!enabled) return;
    let active = true;
    setLoading(true);
    loadRef
      .current()
      .then((value) => {
        if (!active) return;
        setData(value);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Request failed");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [enabled, nonce, key]);

  return {
    data,
    error,
    loading,
    reload: React.useCallback(() => setNonce((n) => n + 1), []),
    set: setData,
  };
}
