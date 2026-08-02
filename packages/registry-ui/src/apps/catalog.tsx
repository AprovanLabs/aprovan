/**
 * The rendered list: the grouped catalog from `@aprovan/ui/apps-store`, drawn
 * as rows.
 *
 * The catalog *store* — loading, grouping, Personal-app synthesis — moved to
 * `@aprovan/ui/apps-store` (2026-07-24) so it's shared with any host that
 * renders an Apps surface. What stays here is presentation: `AppsList`, its
 * rows, and the size-aware expand/collapse behaviour, all re-exported under
 * their original names so nothing importing `./catalog` (or
 * `@aprovan/registry-ui/apps-panel`) had to change.
 *
 * There is no "Workspace" pseudo-group anymore. Every workflow belongs to an
 * app — the ones nothing exports belong to the implicit **Personal** app,
 * which the store either reads from the gateway (`builtin: true`) or
 * synthesizes client-side. This list renders it like any other app group,
 * just with quieter chrome: no visibility badge, no release chip, a "builtin"
 * tone on the label instead of a public/private pill. `AppsList` is the *same
 * component and the same state* at both densities — the chat sidebar passes
 * `variant="sidebar"` for a 288px column, the registry passes `variant="full"`
 * for the master column of the master/detail panel. Which groups start open
 * follows the *row count*, not the variant ({@link SMALL_LIST_ROWS}), and a
 * host may control it outright.
 */

import * as React from "react";
import {
  CreateWorkflowEmpty,
  Empty,
  ErrorLine,
  mergeClasses,
  SMALL_BUTTON,
  StatusDot,
  TINY_BUTTON,
  VisibilityBadge,
} from "./ui";
import { useLastRun, useRecordRun } from "./last-runs";
import { attempt, normalizeRunTrace, type AppSummary, type ToolsInvoke, type WorkflowSummary } from "./wire";

export {
  AppsCatalogProvider,
  PERSONAL_GROUP_ID,
  useAppsCatalog,
  useSharedAppsCatalog,
  /** @deprecated the "Workspace" pseudo-group is gone; kept for older persisted state. */
  WORKSPACE_GROUP_ID,
  type AppsCatalog,
  type AppsCatalogProviderProps,
  type AppsSelection,
  type CatalogGroup,
} from "@aprovan/ui/apps-store";
import {
  PERSONAL_GROUP_ID,
  type AppsCatalog,
  type AppsSelection,
  type CatalogGroup,
} from "@aprovan/ui/apps-store";

// ---------------------------------------------------------------------------
// Rows
// ---------------------------------------------------------------------------

function matches(query: string, ...fields: Array<string | undefined>): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  return fields.some((field) => field?.toLowerCase().includes(needle));
}

/** Run a workflow from a list row, without leaving the list. */
function InlineRunButton({
  invoke,
  name,
  compact,
  onRan,
}: {
  invoke: ToolsInvoke;
  name: string;
  compact?: boolean;
  onRan?: () => void;
}) {
  const [running, setRunning] = React.useState(false);
  const record = useRecordRun();
  return (
    <button
      className={`${compact ? TINY_BUTTON : SMALL_BUTTON} shrink-0 disabled:opacity-50`}
      disabled={running}
      onClick={(event) => {
        event.stopPropagation();
        setRunning(true);
        void attempt(() => invoke("run", { name })).then((result) => {
          setRunning(false);
          const run = result.ok ? normalizeRunTrace(result.value) : null;
          if (run) record(name, run);
          onRan?.();
        });
      }}
      title={`Run ${name} with no input`}
      type="button"
    >
      {running ? "…" : "run"}
    </button>
  );
}

/**
 * One row: the last-run status dot and the name, nothing else. Trigger
 * information (cron, webhook, events) used to render here as one-glyph marks;
 * it now lives only in the workflow's own detail pane, where there's room to
 * say what it means instead of making the list guess at an icon.
 */
function WorkflowRow({
  workflow,
  selected,
  variant,
  invoke,
  onSelect,
  onOpenScript,
}: {
  workflow: WorkflowSummary;
  selected: boolean;
  variant: "full" | "sidebar";
  invoke: ToolsInvoke;
  onSelect: () => void;
  onOpenScript?: ((path: string) => void) | undefined;
}) {
  const lastRun = useLastRun(workflow.name);
  const compact = variant === "sidebar";
  return (
    <div
      className={`group flex items-center gap-1.5 rounded px-2 py-1 transition-colors ${
        selected ? "bg-muted" : "hover:bg-muted/60"
      }`}
    >
      <button
        className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
        onClick={onSelect}
        type="button"
      >
        {lastRun ? (
          <StatusDot status={lastRun.status} />
        ) : (
          <span className="inline-block h-2 w-2 shrink-0 rounded-full border border-border" />
        )}
        <span className="truncate text-xs">{workflow.name}</span>
      </button>
      <span className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <InlineRunButton compact={compact} invoke={invoke} name={workflow.name} />
        {onOpenScript && workflow.scriptPath && (
          <button
            className={compact ? TINY_BUTTON : SMALL_BUTTON}
            onClick={(event) => {
              event.stopPropagation();
              onOpenScript(workflow.scriptPath);
            }}
            title={workflow.scriptPath}
            type="button"
          >
            open
          </button>
        )}
      </span>
    </div>
  );
}

/**
 * One consistent, explorer-like interaction model in both variants:
 *
 *  - the **row** selects. An app row opens the app detail (and, via the
 *    list's select path, expands the group if it was collapsed — selecting
 *    never collapses).
 *  - the **chevron** toggles expansion alone, never touching the selection —
 *    and is hidden entirely on a group with no workflows, since there is
 *    nothing to reveal.
 *
 * Badges stay off the row in both densities (a count plus a "public" marker
 * at most) — data scope and release pins belong to the detail pane, not a
 * master list that has to scan. The builtin Personal app gets none of that:
 * no visibility badge (it's never public), quieter label tone instead.
 */
function GroupHeader({
  group,
  expanded,
  selected,
  variant,
  onToggle,
  onSelect,
  onOpenApp,
}: {
  group: CatalogGroup;
  expanded: boolean;
  selected: boolean;
  variant: "full" | "sidebar";
  onToggle: () => void;
  onSelect: () => void;
  onOpenApp?: ((app: AppSummary) => void) | undefined;
}) {
  const app = group.app;
  const compact = variant === "sidebar";
  const builtin = app?.builtin === true;
  const hasWorkflows = group.workflows.length > 0;
  return (
    <div
      className={`group flex items-center gap-1 rounded px-1 py-1 transition-colors ${
        selected ? "bg-muted" : "hover:bg-muted/60"
      }`}
    >
      {hasWorkflows ? (
        <button
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${group.label}` : `Expand ${group.label}`}
          className="shrink-0 rounded px-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          title={expanded ? "Collapse" : "Expand"}
          type="button"
        >
          <span className={`inline-block transition-transform ${expanded ? "rotate-90" : ""}`}>›</span>
        </button>
      ) : (
        // No chevron when there's nothing to reveal — a fixed-width spacer so
        // the label still lines up with groups that have one.
        <span aria-hidden="true" className="inline-block w-[1.375rem] shrink-0" />
      )}
      <button
        className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
        onClick={app ? onSelect : onToggle}
        type="button"
      >
        <span
          className={`truncate text-xs font-medium ${builtin ? "text-muted-foreground" : ""}`}
        >
          {group.label}
        </span>
        <span className="shrink-0 text-[0.65rem] tabular-nums text-muted-foreground">
          {group.workflows.length}
        </span>
        {builtin ? (
          <span className="shrink-0 rounded-full border border-dashed px-1.5 py-px text-[0.6rem] text-muted-foreground">
            personal
          </span>
        ) : (
          app && !compact && app.visibility === "public" && <VisibilityBadge app={app} />
        )}
      </button>
      {app && (app.liveUrl || onOpenApp) && (
        <span className="shrink-0 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          {onOpenApp ? (
            <button
              className={compact ? TINY_BUTTON : SMALL_BUTTON}
              onClick={(event) => {
                event.stopPropagation();
                onOpenApp(app);
              }}
              title={`Open ${app.name}`}
              type="button"
            >
              open
            </button>
          ) : (
            <a
              className={compact ? TINY_BUTTON : SMALL_BUTTON}
              href={app.liveUrl}
              onClick={(event) => event.stopPropagation()}
              rel="noreferrer"
              target="_blank"
            >
              open
            </a>
          )}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// The list
// ---------------------------------------------------------------------------

export interface AppsListProps {
  catalog: AppsCatalog;
  selection: AppsSelection | null;
  onSelect: (selection: AppsSelection) => void;
  invoke: ToolsInvoke;
  variant?: "full" | "sidebar";
  onOpenApp?: ((app: AppSummary) => void) | undefined;
  onOpenScript?: ((path: string) => void) | undefined;
  /** Rows rendered before the "show more" tail (default 60). */
  pageSize?: number;
  /**
   * Force the starting state of every group. Omit for the size-aware default
   * described on {@link SMALL_LIST_ROWS}.
   */
  defaultExpanded?: boolean;
  /** Controlled expansion: the ids of the groups that are open. */
  expandedGroups?: string[];
  /** Fired with the full next set on every toggle — persist it to survive a reload. */
  onExpandedGroupsChange?: (ids: string[]) => void;
  /** Rendered at the right of the search row — e.g. a refresh button. */
  actions?: React.ReactNode;
  /**
   * Wired into the top-level "nothing here yet" empty state (a real gateway
   * with zero apps and zero workflows — rare, but a fresh workspace hits it
   * on first load). See {@link AppsPanelProps.onCreateWorkflow}.
   */
  onCreateWorkflow?: ((appName?: string) => void) | undefined;
  /** Plain-link fallback for the same empty state when there's no callback. */
  createWorkflowHref?: string | undefined;
  className?: string;
}

/**
 * A list at or under this many rendered rows starts fully expanded, whatever
 * the variant.
 *
 * The old rule was "expand in the full panel, collapse in the sidebar", and it
 * made the common case look broken: a workspace with one app and two workflows
 * rendered as a single collapsed header — a chat sidebar pane that reads as
 * empty. Depth only pays for itself once there is depth to hide, so the
 * default follows the *content*, not the surface: expand when everything fits,
 * collapse only when the list is genuinely long.
 */
export const SMALL_LIST_ROWS = 12;

export function AppsList({
  catalog,
  selection,
  onSelect,
  invoke,
  variant = "full",
  onOpenApp,
  onOpenScript,
  pageSize = 60,
  defaultExpanded,
  expandedGroups,
  onExpandedGroupsChange,
  actions,
  onCreateWorkflow,
  createWorkflowHref,
  className,
}: AppsListProps) {
  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(pageSize);
  // `null` = untouched, so the size-aware default still applies; a host that
  // passes `expandedGroups` owns this outright.
  const [internalExpanded, setInternalExpanded] = React.useState<string[] | null>(null);
  const controlled = expandedGroups !== undefined;
  const expandedList = controlled ? expandedGroups : internalExpanded;

  const groups = catalog.groups;
  const expandByDefault = React.useMemo(() => {
    if (defaultExpanded !== undefined) return defaultExpanded;
    if (groups.length <= 1) return true;
    const rows = groups.reduce((total, group) => total + 1 + group.workflows.length, 0);
    return rows <= SMALL_LIST_ROWS;
  }, [defaultExpanded, groups]);

  React.useEffect(() => setVisible(pageSize), [query, pageSize]);

  const filtered = React.useMemo(() => {
    if (!query) return catalog.groups;
    return catalog.groups
      .map((group) => {
        const groupHit = matches(query, group.label, group.id, group.app?.description);
        const workflows = group.workflows.filter((workflow) =>
          matches(query, workflow.name, workflow.description, workflow.scriptPath),
        );
        if (!groupHit && workflows.length === 0) return null;
        return { ...group, workflows: groupHit ? group.workflows : workflows };
      })
      .filter((group): group is CatalogGroup => group !== null);
  }, [catalog.groups, query]);

  const isExpanded = React.useCallback(
    (group: CatalogGroup) => {
      if (query) return true;
      if (group.workflows.length === 0) return false;
      // An explicit set — the user's, or the host's — always wins, so a
      // chevron-collapse sticks even while something inside is selected.
      // Before any toggle materialises one, the group holding the selection
      // opens itself so the selected row is never invisible.
      if (expandedList !== null) return expandedList.includes(group.id);
      if (selection?.kind === "workflow" && selection.app === group.id) return true;
      if (selection?.kind === "workflow" && group.id === PERSONAL_GROUP_ID && !selection.app) {
        return true;
      }
      if (selection?.kind === "app" && selection.name === group.id) return true;
      return expandByDefault;
    },
    [expandByDefault, expandedList, query, selection],
  );

  /** The current set as a concrete array, materialising the default. */
  const materialise = React.useCallback(
    () => expandedList ?? (expandByDefault ? groups.map((group) => group.id) : ([] as string[])),
    [expandedList, expandByDefault, groups],
  );

  const applyExpanded = React.useCallback(
    (next: string[]) => {
      if (!controlled) setInternalExpanded(next);
      onExpandedGroupsChange?.(next);
    },
    [controlled, onExpandedGroupsChange],
  );

  // The first toggle materialises the default into a concrete set, so "open
  // everything, then close one" behaves the way it looks.
  const toggle = (id: string) => {
    const base = materialise();
    applyExpanded(
      base.includes(id) ? base.filter((candidate) => candidate !== id) : [...base, id],
    );
  };

  /**
   * Selecting must reveal, never hide: clicking an app row (or landing on a
   * selection made elsewhere — the detail pane, a host tab) expands the group
   * if it was collapsed and leaves it alone otherwise. Collapsing stays the
   * chevron's job alone.
   */
  const ensureExpanded = React.useCallback(
    (id: string) => {
      const base = materialise();
      if (!base.includes(id)) applyExpanded([...base, id]);
    },
    [materialise, applyExpanded],
  );

  // External selection changes (host tab sync, app-detail → workflow) reveal
  // their group too. Keyed on the selection identity so a later chevron
  // collapse of the same group is respected rather than fought.
  const lastRevealed = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!selection) {
      lastRevealed.current = null;
      return;
    }
    const key =
      selection.kind === "app"
        ? `a:${selection.name}`
        : `w:${selection.app ?? ""}:${selection.name}`;
    if (lastRevealed.current === key) return;
    lastRevealed.current = key;
    ensureExpanded(selection.kind === "app" ? selection.name : (selection.app ?? PERSONAL_GROUP_ID));
  }, [selection, ensureExpanded]);

  // Flatten to rows first so the cap counts *rendered rows*, not groups —
  // one app with 400 workflows is exactly as expensive as 400 apps.
  type Row =
    | { key: string; kind: "group"; group: CatalogGroup }
    | { key: string; kind: "workflow"; group: CatalogGroup; workflow: WorkflowSummary };
  const rows: Row[] = [];
  for (const group of filtered) {
    rows.push({ key: `g:${group.id}`, kind: "group", group });
    // A group with nothing to reveal renders as a plain selectable row — no
    // chevron (GroupHeader already omits it), no expansion, and no inline
    // "no workflows" placeholder either: the detail pane says that, with an
    // action, once the row is opened (see CreateWorkflowEmpty).
    if (group.workflows.length === 0) continue;
    if (!isExpanded(group)) continue;
    for (const workflow of group.workflows) {
      rows.push({ key: `w:${group.id}:${workflow.name}`, kind: "workflow", group, workflow });
    }
  }
  const shown = rows.slice(0, visible);
  const hidden = rows.length - shown.length;

  const compact = variant === "sidebar";

  return (
    <div className={mergeClasses("flex min-h-0 flex-col gap-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <input
          className="min-w-0 flex-1 rounded-md border bg-transparent px-2 py-1 text-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps and workflows"
          spellCheck={false}
          value={query}
        />
        {actions}
      </div>

      <ErrorLine error={catalog.error} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {catalog.loading && rows.length === 0 ? (
          <Empty>Loading…</Empty>
        ) : rows.length === 0 ? (
          query ? (
            <Empty>Nothing matches that.</Empty>
          ) : (
            <CreateWorkflowEmpty createWorkflowHref={createWorkflowHref} onCreateWorkflow={onCreateWorkflow}>
              No apps or workflows yet.
            </CreateWorkflowEmpty>
          )
        ) : (
          <div className="space-y-0.5">
            {shown.map((row) =>
              row.kind === "group" ? (
                <GroupHeader
                  expanded={isExpanded(row.group)}
                  group={row.group}
                  key={row.key}
                  onOpenApp={onOpenApp}
                  onSelect={() => {
                    if (!row.group.app) return;
                    // Row click = select + reveal. The reveal is one-way; the
                    // chevron is the only thing that collapses.
                    onSelect({ kind: "app", name: row.group.app.name });
                    ensureExpanded(row.group.id);
                  }}
                  onToggle={() => toggle(row.group.id)}
                  selected={selection?.kind === "app" && selection.name === row.group.id}
                  variant={variant}
                />
              ) : (
                <div className={compact ? "pl-3" : "pl-5"} key={row.key}>
                  <WorkflowRow
                    invoke={invoke}
                    onOpenScript={onOpenScript}
                    onSelect={() =>
                      onSelect({
                        kind: "workflow",
                        name: row.workflow.name,
                        ...(row.group.kind === "app" ? { app: row.group.id } : {}),
                      })
                    }
                    selected={
                      selection?.kind === "workflow" && selection.name === row.workflow.name
                    }
                    variant={variant}
                    workflow={row.workflow}
                  />
                </div>
              ),
            )}
            {hidden > 0 && (
              <button
                className={`mt-1 w-full ${SMALL_BUTTON}`}
                onClick={() => setVisible((count) => count + pageSize)}
                type="button"
              >
                Show {Math.min(hidden, pageSize)} more ({hidden} hidden)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
