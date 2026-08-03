/**
 * AppsPanel — the shared surface for Apps and Workflows, rendered identically
 * by the registry web app (`/registry/apps`) and by patchwork chat.
 *
 * Why this replaces the flat WorkflowsPanel: an app is a *bundle* — pages plus
 * an export list of workflows plus an allow-list, a data scope and an auth
 * boundary — and a workspace accumulates far more of both than a single flat
 * list can carry. So the panel is master/detail. The master column groups by
 * app, all the way down: every workflow belongs to one, and the ones nothing
 * exports belong to the workspace's implicit **Personal** app (a first-class
 * group, not a "Workspace" catch-all — there is no such thing anymore). It
 * filters, and it renders a capped window with a "show more" tail so hundreds
 * of entries stay usable without a virtualiser dependency. The detail column
 * is the app (Overview / Workflows / Access / Releases / Versions) or the
 * workflow (the TailorFlow graph, run form, run history, trace, and the
 * cascade tree when the run fanned out).
 *
 * Transport-agnostic, exactly like the panel it replaces: the host supplies
 * `invoke(operation, args)` for the gateway's `workflows` namespace and
 * `invokeApps(operation, args)` for `apps` (POST /tools/<namespace>/<op>).
 * Nothing here fetches. Everything here is defensive about the response: the
 * gateway grows `capabilities`, `channels`, `releases`, `promote`, `rollback`
 * and `tree` on its own schedule, and a procedure that isn't there yet makes
 * its section go quiet rather than breaking the panel.
 *
 * Compact mode: `variant="sidebar"` (or the {@link AppsExplorer} alias)
 * renders only the grouped list, collapsible per app, sized for a 288px chat
 * sidebar, with counts, last-run status dots, an inline run and an "Open"
 * affordance per row. It is the *same component and state* as the full
 * panel's master column — not a fork — so the two surfaces can never drift.
 *
 * What the host owns, because a shared panel cannot guess it:
 *
 * - **Height.** `fill` switches `variant="full"` from the standalone page's
 *   `70vh` cap to filling a pane the host already sized. A `className` the
 *   host passes wins over the panel's own layout classes (see `mergeClasses`).
 * - **Expansion.** Groups open by size rather than by variant, and
 *   `expandedGroups` / `onExpandedGroupsChange` let a host persist the state.
 * - **One catalog per page.** Two surfaces mounted at once (chat has both)
 *   share a single load and a single `refresh` under {@link AppsCatalogProvider}.
 * - **Deletion.** `onSelectionRemoved` separates "the user deselected" from
 *   "the thing is gone", which is the difference between keeping a tab and
 *   closing it.
 */

import * as React from "react";
import { AppDetail, type AppDetailTab } from "./apps/app-detail";
import {
  AppsList,
  PERSONAL_GROUP_ID,
  useAppsCatalog,
  useSharedAppsCatalog,
  type AppsCatalog,
  type AppsSelection,
  type CatalogGroup,
} from "./apps/catalog";
import { LastRunProvider } from "./apps/last-runs";
import { CreateWorkflowEmpty, Empty, mergeClasses, RefreshButton } from "./apps/ui";
import { WorkflowDetail as WorkflowDetailView } from "./apps/workflow-detail";
import type { AppSummary, ToolsInvoke, WorkflowSummary } from "./apps/wire";

export type { AppDetailTab } from "./apps/app-detail";
export {
  PERSONAL_GROUP_ID,
  /** @deprecated see {@link PERSONAL_GROUP_ID} — the "Workspace" pseudo-group is gone. */
  WORKSPACE_GROUP_ID,
  type AppsSelection,
  type CatalogGroup,
} from "./apps/catalog";
export type {
  AppChannel,
  AppRateLimit,
  AppRelease,
  AppRoles,
  AppSummary,
  CapabilityModel,
  CapabilityReach,
  DataScope,
  FileVersion,
  RunStatus,
  TraceRunNode,
  WorkflowRunSummary,
  WorkflowRunTrace,
  WorkflowSummary,
  WorkflowTriggers,
} from "./apps/wire";
export { NATIVE_APP_NAMESPACES, deriveCapabilities } from "./apps/wire";

/** One tool namespace's dispatch: POST /tools/<namespace>/<operation>. */
export type AppsInvoke = ToolsInvoke;

export interface AppsPanelProps {
  /**
   * Transport for the gateway's `workflows` tool namespace
   * (POST /tools/workflows/:operation). Required — workflows are the unit of
   * execution on every surface.
   */
  invoke: AppsInvoke;
  /**
   * Transport for the gateway's `apps` tool namespace
   * (POST /tools/apps/:operation). Omit it (or point it at a gateway with no
   * `apps` namespace) and the panel degrades to the Personal group alone.
   */
  invokeApps?: AppsInvoke;
  /**
   * Transport for the gateway's `registry` tool namespace
   * (POST /tools/registry/:operation). Used only by the Access tab's
   * provider search when adding a credential grant (`registry.providers`,
   * falling back to `registry.search`); omit it and that step becomes a
   * plain text field.
   */
  invokeRegistry?: AppsInvoke;
  /**
   * Read a workflow's script from the workspace. With it, a selected workflow
   * renders as the flow graph with its run painted on; without it the same
   * run form renders standalone.
   */
  loadScript?: (path: string) => Promise<string | null>;
  /** Open a workflow's script in the host's editor. */
  onOpenScript?: (path: string) => void;
  /**
   * Open an app in the host's own way — the registry navigates to its app
   * page, chat opens the live app. Without it, rows link to `liveUrl`.
   */
  onOpenApp?: (app: AppSummary) => void;
  /**
   * Every "no workflows here yet" empty state — the list's own zero-state,
   * an app group with nothing exported, the Workflows tab — renders a
   * "Create a workflow in chat" action instead of dev-facing tool-call copy
   * when this is supplied. Receives the app name when the empty state is
   * scoped to one (the Workflows tab, an app group), `undefined` for the
   * catalog-wide zero-state.
   */
  onCreateWorkflow?: (appName?: string) => void;
  /**
   * Plain-link fallback for the same empty states when the host has a URL
   * but no in-app affordance to open chat with (the registry web app passes
   * `https://aprovan.com/chat/`). Ignored when `onCreateWorkflow` is set —
   * that one wins. Omit both and the empty states fall back to one quiet
   * line with no action.
   */
  createWorkflowHref?: string;
  /** `"full"` is master/detail; `"sidebar"` is the grouped list alone. */
  variant?: "full" | "sidebar";
  /** Controlled selection. Omit for internal state. */
  selection?: AppsSelection | null;
  /** Fired on every selection change, in both controlled and uncontrolled use. */
  onSelectionChange?: (selection: AppsSelection | null) => void;
  /**
   * The selected entity was **deleted** — not deselected.
   *
   * `onSelectionChange(null)` alone cannot say which happened, and a host with
   * a tab strip needs to: a cleared selection keeps the tab, a deleted
   * workflow has to close it or the tab points at nothing. Receives the
   * selection that just stopped existing. When it is omitted the panel falls
   * back to `onSelectionChange(null)`, so existing hosts are unaffected.
   */
  onSelectionRemoved?: (removed: AppsSelection) => void;
  /** Selection to start on, when uncontrolled. */
  initialSelection?: AppsSelection | null;
  /** Rows rendered before the "show more" tail (default 60). */
  pageSize?: number;
  /**
   * Force every group's starting state. Omit for the size-aware default: a
   * list short enough to fit starts open, a long one starts collapsed.
   */
  defaultExpanded?: boolean;
  /** Controlled group expansion — the ids of the open groups. */
  expandedGroups?: string[];
  /** Fired with the next full set on each toggle; persist it to survive reloads. */
  onExpandedGroupsChange?: (ids: string[]) => void;
  /**
   * Fill the container instead of capping at `70vh` (`variant="full"` only).
   *
   * Default `false` keeps the standalone page layout, where the panel sits in
   * a scrolling document and a cap is what stops it running off the screen.
   * Pass `true` inside a host pane that already owns its height: the two
   * columns then stretch and scroll independently.
   */
  fill?: boolean;
  /**
   * Replaces the built-in refresh control at the end of the search row. The
   * default is a text button in `full` and an icon button in `sidebar`.
   */
  actions?: React.ReactNode;
  /** Heading above the list; pass `null` to render no heading. */
  title?: string | null;
  className?: string;
}

/** Resolve the selected workflow against the catalog, group included. */
function findWorkflow(
  catalog: AppsCatalog,
  selection: AppsSelection | null,
): { workflow: WorkflowSummary; group: CatalogGroup | undefined } | null {
  if (selection?.kind !== "workflow") return null;
  // Legacy selections persisted before the Personal app existed carry no
  // `app` at all (the old "Workspace" pseudo-group). `WORKSPACE_GROUP_ID`
  // never matches a real group anymore, so the second `find` below — any
  // group holding a workflow of this name — is what actually resolves them;
  // this is just the fast path for everything created since.
  const groupId = selection.app ?? PERSONAL_GROUP_ID;
  const group =
    catalog.groups.find((candidate) => candidate.id === groupId) ??
    catalog.groups.find((candidate) =>
      candidate.workflows.some((workflow) => workflow.name === selection.name),
    );
  const workflow =
    group?.workflows.find((candidate) => candidate.name === selection.name) ??
    catalog.workflowByName.get(selection.name);
  if (!workflow) return null;
  return { workflow, group };
}

export function AppsPanel({
  invoke,
  invokeApps,
  invokeRegistry,
  loadScript,
  onOpenScript,
  onOpenApp,
  onCreateWorkflow,
  createWorkflowHref,
  variant = "full",
  selection: controlledSelection,
  onSelectionChange,
  onSelectionRemoved,
  initialSelection = null,
  pageSize,
  defaultExpanded,
  expandedGroups,
  onExpandedGroupsChange,
  fill = false,
  actions,
  title = "Apps",
  className,
}: AppsPanelProps) {
  // A shared catalog (and its shared last-run cache) makes both surfaces on a
  // page load once; without a provider this is the panel's own fetch.
  const shared = useSharedAppsCatalog();
  const catalog = useAppsCatalog({ invoke, invokeApps });
  const [internalSelection, setInternalSelection] = React.useState<AppsSelection | null>(
    initialSelection,
  );
  const selection = controlledSelection !== undefined ? controlledSelection : internalSelection;

  const select = React.useCallback(
    (next: AppsSelection | null) => {
      if (controlledSelection === undefined) setInternalSelection(next);
      onSelectionChange?.(next);
    },
    [controlledSelection, onSelectionChange],
  );

  /** The selected entity was deleted: refresh, clear, and say so distinctly. */
  const removed = React.useCallback(
    (gone: AppsSelection) => {
      catalog.refresh();
      if (controlledSelection === undefined) setInternalSelection(null);
      if (onSelectionRemoved) onSelectionRemoved(gone);
      else onSelectionChange?.(null);
    },
    [catalog, controlledSelection, onSelectionChange, onSelectionRemoved],
  );

  const list = (
    <AppsList
      actions={
        actions ?? (
          <RefreshButton
            compact={variant === "sidebar"}
            onRefresh={catalog.refresh}
            refreshing={catalog.loading}
          />
        )
      }
      catalog={catalog}
      // In a flex column the list is a flex *item*: without this it sizes to
      // its content and its own scroll area never engages.
      className={variant === "sidebar" || fill ? "min-h-0 flex-1" : undefined}
      createWorkflowHref={createWorkflowHref}
      invoke={invoke}
      onCreateWorkflow={onCreateWorkflow}
      onOpenApp={onOpenApp}
      onOpenScript={onOpenScript}
      onSelect={select}
      pageSize={pageSize ?? (variant === "sidebar" ? 40 : 60)}
      selection={selection}
      variant={variant}
      {...(defaultExpanded !== undefined ? { defaultExpanded } : {})}
      {...(expandedGroups !== undefined ? { expandedGroups } : {})}
      {...(onExpandedGroupsChange ? { onExpandedGroupsChange } : {})}
    />
  );

  // One LastRunProvider per tree: the shared catalog already carries one, and
  // nesting a second would shadow it and re-fetch every dot.
  const withRuns = (children: React.ReactNode) =>
    shared ? (
      <>{children}</>
    ) : (
      <LastRunProvider invoke={invoke} seed={catalog.lastRunSeed}>
        {children}
      </LastRunProvider>
    );

  if (variant === "sidebar") {
    return withRuns(
      <div className={mergeClasses("flex min-h-0 flex-col gap-1.5", className)}>
        {title !== null && (
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </h3>
        )}
        {list}
      </div>,
    );
  }

  const selectedApp =
    selection?.kind === "app" ? catalog.appByName.get(selection.name) : undefined;
  const selectedWorkflow = findWorkflow(catalog, selection);

  return withRuns(
    <div
      className={mergeClasses(
        `flex min-h-0 flex-col gap-2 ${fill ? "flex-1" : ""}`,
        className,
      )}
    >
      {title !== null && (
        <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
      )}
      {/* `fill` hands the height to the host pane: the grid row is pinned to
          the available space (`minmax(0,1fr)`, so it cannot grow to its
          content) and each column scrolls on its own. Without it the columns
          scroll at natural height — the host owns any viewport bound. */}
      <div
        className={`grid min-h-0 gap-4 md:grid-cols-[minmax(15rem,22rem)_1fr] ${
          fill ? "flex-1 grid-rows-[minmax(0,1fr)]" : ""
        }`}
      >
        <div
          className={`min-h-0 md:border-r md:pr-3 ${
            fill ? "flex flex-col overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {list}
        </div>
        <div
          className={`min-w-0 ${
            fill ? "min-h-0 overflow-y-auto" : "overflow-y-auto"
          }`}
        >
          {selectedApp && invokeApps ? (
            <AppDetail
              app={selectedApp}
              createWorkflowHref={createWorkflowHref}
              invoke={invoke}
              invokeApps={invokeApps}
              invokeRegistry={invokeRegistry}
              key={selectedApp.name}
              // An edit reloads the catalog and keeps the app selected; only a
              // delete clears it, and that goes down the `removed` path.
              onChanged={() => catalog.refresh()}
              onCreateWorkflow={onCreateWorkflow}
              onOpenApp={onOpenApp}
              onRemoved={() => removed({ kind: "app", name: selectedApp.name })}
              onSelectWorkflow={(name) =>
                select({ kind: "workflow", name, app: selectedApp.name })
              }
              workflows={
                catalog.groups.find((group) => group.id === selectedApp.name)?.workflows ?? []
              }
            />
          ) : selectedWorkflow ? (
            <WorkflowDetailView
              header={
                // Every group is a real app now — Personal included — so this
                // always has a label and a place to go back to.
                selectedWorkflow.group ? (
                  <button
                    className="text-[0.7rem] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                    onClick={() => select({ kind: "app", name: selectedWorkflow.group?.id ?? "" })}
                    type="button"
                  >
                    ‹ {selectedWorkflow.group.label}
                  </button>
                ) : (
                  <span className="text-[0.7rem] text-muted-foreground">Personal</span>
                )
              }
              fill={fill}
              invoke={invoke}
              key={selectedWorkflow.workflow.name}
              loadScript={loadScript}
              onChanged={() => catalog.refresh()}
              onOpenScript={onOpenScript}
              onRemoved={() =>
                removed({
                  kind: "workflow",
                  name: selectedWorkflow.workflow.name,
                  ...(selectedWorkflow.group?.kind === "app"
                    ? { app: selectedWorkflow.group.id }
                    : {}),
                })
              }
              workflow={selectedWorkflow.workflow}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-6">
              {catalog.apps.length === 0 && catalog.workflows.length === 0 ? (
                // Nothing to select yet — "pick something from the list"
                // makes no sense when the list has nothing in it either.
                <CreateWorkflowEmpty createWorkflowHref={createWorkflowHref} onCreateWorkflow={onCreateWorkflow}>
                  Nothing here yet.
                </CreateWorkflowEmpty>
              ) : (
                <Empty>
                  Select an app to see its pages, exports, access and releases — or a workflow to
                  run it and read its trace.
                </Empty>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
  );
}

/**
 * The compact surface: the grouped list alone, sized for a 288px sidebar.
 * Same component, same state — `variant="sidebar"` with a friendlier name for
 * the host that only wants the explorer. `fill` is a master/detail concern, so
 * it is not part of this signature.
 */
export type AppsExplorerProps = Omit<AppsPanelProps, "variant" | "fill">;

export function AppsExplorer(props: AppsExplorerProps) {
  return <AppsPanel {...props} variant="sidebar" />;
}

export { AppsCatalogProvider, AppsList, useAppsCatalog } from "./apps/catalog";
export type { AppsCatalogProviderProps } from "./apps/catalog";
export { AppDetail } from "./apps/app-detail";
/**
 * The standalone mount: resolves a workflow by *name* (`workflows.get`,
 * falling back to a `workflows.list` scan) so a host that only has a name in
 * hand — chat's widget preview pane, most obviously — can render exactly one
 * workflow's run form, graph and trace with no catalog and no `AppsPanel`
 * around it. `AppsPanel`'s own master/detail view keeps using the
 * catalog-fed, `WorkflowSummary`-in-hand version internally (see
 * `WorkflowDetailProps` below) — same underlying pane either way.
 */
export {
  StandaloneWorkflowDetail as WorkflowDetail,
  type StandaloneWorkflowDetailProps as WorkflowDetailProps,
} from "./apps/workflow-detail";
/** The catalog-fed pane `WorkflowDetail` used to be — still exported under
 * its own name for a host that already has a `WorkflowSummary` in hand. */
export { WorkflowDetail as WorkflowDetailView } from "./apps/workflow-detail";
export { LastRunProvider, useLastRun } from "./apps/last-runs";
export type { AppsCatalog } from "./apps/catalog";
export type { AppDetailProps } from "./apps/app-detail";
export type { AppsListProps } from "./apps/catalog";
export type { WorkflowDetailProps as WorkflowDetailViewProps } from "./apps/workflow-detail";
