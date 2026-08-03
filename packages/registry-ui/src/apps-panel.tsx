/**
 * AppsPanel — the shared surface for Apps and Workflows, rendered identically
 * by the registry web app (`/registry/apps`) and by patchwork chat.
 *
 * Master/detail (`variant="full"`): list + detail side by side. Pane mode
 * (`variant="pane"`): in-pane list ↔ detail navigation for the native Apps
 * surface — opens on the grouped list (Your apps / Installed / Your flows /
 * Directory), selecting an entry navigates to detail with a back affordance.
 * Sidebar mode (`variant="sidebar"` / {@link AppsExplorer}): list alone.
 *
 * Transport-agnostic: the host supplies `invoke` / `invokeApps` /
 * `invokeRegistry`. Nothing here fetches beyond the shared catalog loader.
 * Procedures that aren't on the gateway yet make their section go quiet.
 */

import * as React from "react";
import { AppDetail, type AppDetailTab } from "./apps/app-detail";
import {
  AppsList,
  PRIVATE_FLOWS_GROUP_ID,
  useAppsCatalog,
  useSharedAppsCatalog,
  type AppsCatalog,
  type AppsSelection,
  type CatalogGroup,
} from "./apps/catalog";
import { DirectoryList, InstallSheet, type ProfileOption } from "./apps/directory";
import { LastRunProvider } from "./apps/last-runs";
import { CreateWorkflowEmpty, Empty, mergeClasses, RefreshButton, SMALL_BUTTON } from "./apps/ui";
import { WorkflowDetail as WorkflowDetailView } from "./apps/workflow-detail";
import type {
  AppSummary,
  DirectoryEntry,
  InstallSummary,
  ToolsInvoke,
  WorkflowSummary,
} from "./apps/wire";

export type { AppDetailTab } from "./apps/app-detail";
export {
  PRIVATE_FLOWS_GROUP_ID,
  /** @deprecated see {@link PRIVATE_FLOWS_GROUP_ID} — the "Workspace" pseudo-group is gone. */
  WORKSPACE_GROUP_ID,
  type AppsSelection,
  type CatalogGroup,
} from "./apps/catalog";
export type {
  AppChannel,
  AppPin,
  AppRateLimit,
  AppRelease,
  AppRequirement,
  AppRoles,
  AppSummary,
  CapabilityModel,
  CapabilityReach,
  DataScope,
  DirectoryEntry,
  FileVersion,
  InstallSummary,
  RunStatus,
  TraceRunNode,
  WorkflowRunSummary,
  WorkflowRunTrace,
  WorkflowSummary,
  WorkflowTriggers,
} from "./apps/wire";
export {
  NATIVE_APP_NAMESPACES,
  deriveCapabilities,
  installBindingsReady,
} from "./apps/wire";
export { DirectoryList, InstallSheet } from "./apps/directory";
export type { ProfileOption } from "./apps/directory";

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
   * (POST /tools/apps/:operation). Omit it and the panel shows private flows
   * only when the workflows namespace answers.
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
   * Every "no workflows here yet" empty state renders a "Create a workflow in
   * chat" action when this is supplied.
   */
  onCreateWorkflow?: (appName?: string) => void;
  /** Prefill an `apps.publish` chat prompt for sharing a private flow. */
  onPublishFlow?: (workflowName: string) => void;
  /** Open Credentials/Profiles when install bindings need a new profile. */
  onCreateProfile?: (contract: string) => void;
  /** Profiles offered in the install sheet (contract → options). */
  profiles?: ProfileOption[];
  /**
   * Plain-link fallback for empty states when the host has a URL but no
   * in-app affordance. Ignored when `onCreateWorkflow` is set.
   */
  createWorkflowHref?: string;
  /**
   * `"full"` is master/detail; `"sidebar"` is the grouped list alone;
   * `"pane"` is in-pane list↔detail for the native Apps surface.
   */
  variant?: "full" | "sidebar" | "pane";
  /** Controlled selection. Omit for internal state. */
  selection?: AppsSelection | null;
  /** Fired on every selection change, in both controlled and uncontrolled use. */
  onSelectionChange?: (selection: AppsSelection | null) => void;
  /**
   * The selected entity was **deleted** — not deselected.
   */
  onSelectionRemoved?: (removed: AppsSelection) => void;
  /** Selection to start on, when uncontrolled. */
  initialSelection?: AppsSelection | null;
  /** Rows rendered before the "show more" tail (default 60). */
  pageSize?: number;
  /**
   * Force every group's starting state. Omit for the size-aware default.
   */
  defaultExpanded?: boolean;
  /** Controlled group expansion — the ids of the open groups. */
  expandedGroups?: string[];
  /** Fired with the next full set on each toggle. */
  onExpandedGroupsChange?: (ids: string[]) => void;
  /**
   * Fill the container instead of capping at `70vh` (`variant="full"` / `"pane"`).
   */
  fill?: boolean;
  /**
   * Replaces the built-in refresh control at the end of the search row.
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
  const groupId = selection.app ?? PRIVATE_FLOWS_GROUP_ID;
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

function resolveApp(catalog: AppsCatalog, selection: AppsSelection | null): AppSummary | undefined {
  if (selection?.kind !== "app") return undefined;
  if (selection.appId) {
    const byId = catalog.appById.get(selection.appId);
    if (byId) return byId;
  }
  return catalog.appByName.get(selection.name);
}

function resolveInstall(
  catalog: AppsCatalog,
  selection: AppsSelection | null,
): InstallSummary | undefined {
  if (selection?.kind !== "install") return undefined;
  return catalog.installById.get(selection.installId);
}

function appFromInstall(catalog: AppsCatalog, install: InstallSummary): AppSummary {
  const origin =
    catalog.appById.get(install.originAppId) ??
    (install.name ? catalog.appByName.get(install.name) : undefined);
  if (origin) return origin;
  return {
    name: install.name ?? install.originAppId,
    appId: install.originAppId,
    title: install.title,
    description: install.description,
    visibility: "private",
    liveUrl: install.liveUrl,
    permalink: install.permalink,
    requires: install.requires,
  };
}

export function AppsPanel({
  invoke,
  invokeApps,
  invokeRegistry,
  loadScript,
  onOpenScript,
  onOpenApp,
  onCreateWorkflow,
  onPublishFlow,
  onCreateProfile,
  profiles,
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
  const shared = useSharedAppsCatalog();
  const catalog = useAppsCatalog({ invoke, invokeApps });
  const [internalSelection, setInternalSelection] = React.useState<AppsSelection | null>(
    initialSelection,
  );
  const selection = controlledSelection !== undefined ? controlledSelection : internalSelection;
  const [installTarget, setInstallTarget] = React.useState<DirectoryEntry | null>(null);

  const select = React.useCallback(
    (next: AppsSelection | null) => {
      if (controlledSelection === undefined) setInternalSelection(next);
      onSelectionChange?.(next);
    },
    [controlledSelection, onSelectionChange],
  );

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
      className={variant === "sidebar" || fill || variant === "pane" ? "min-h-0 flex-1" : undefined}
      createWorkflowHref={createWorkflowHref}
      invoke={invoke}
      onCreateWorkflow={onCreateWorkflow}
      onOpenApp={onOpenApp}
      onOpenScript={onOpenScript}
      onSelect={select}
      pageSize={pageSize ?? (variant === "sidebar" ? 40 : 60)}
      selection={selection}
      variant={variant === "pane" ? "pane" : variant}
      {...(defaultExpanded !== undefined ? { defaultExpanded } : {})}
      {...(expandedGroups !== undefined ? { expandedGroups } : {})}
      {...(onExpandedGroupsChange ? { onExpandedGroupsChange } : {})}
    />
  );

  const directorySection = invokeApps ? (
    <div className="space-y-1.5 border-t pt-2">
      <div className="flex items-center gap-2">
        <h4 className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          Directory
        </h4>
        {selection?.kind !== "directory" && (
          <button
            className={SMALL_BUTTON}
            onClick={() => select({ kind: "directory" })}
            type="button"
          >
            Browse
          </button>
        )}
      </div>
      {(variant === "pane" ? selection?.kind === "directory" : true) && (
        <DirectoryList
          entries={catalog.directory}
          loading={catalog.loading}
          onInstall={(entry) => setInstallTarget(entry)}
        />
      )}
    </div>
  ) : null;

  const withRuns = (children: React.ReactNode) =>
    shared ? (
      <>{children}</>
    ) : (
      <LastRunProvider invoke={invoke} seed={catalog.lastRunSeed}>
        {children}
      </LastRunProvider>
    );

  const detail = (() => {
    const selectedInstall = resolveInstall(catalog, selection);
    const selectedApp = selectedInstall
      ? appFromInstall(catalog, selectedInstall)
      : resolveApp(catalog, selection);
    const selectedWorkflow = findWorkflow(catalog, selection);
    const back = variant === "pane" ? () => select(null) : undefined;

    if (selection?.kind === "directory") {
      if (variant !== "pane") return null;
      return (
        <div className="space-y-2">
          <button
            className="text-[0.7rem] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            onClick={() => select(null)}
            type="button"
          >
            ‹ Apps
          </button>
          <h3 className="text-sm font-medium">Directory</h3>
          <DirectoryList
            entries={catalog.directory}
            loading={catalog.loading}
            onInstall={(entry) => setInstallTarget(entry)}
          />
        </div>
      );
    }

    if (selectedApp && invokeApps) {
      return (
        <AppDetail
          app={selectedApp}
          createWorkflowHref={createWorkflowHref}
          install={selectedInstall}
          invoke={invoke}
          invokeApps={invokeApps}
          invokeRegistry={invokeRegistry}
          key={selectedInstall?.installId ?? selectedApp.appId ?? selectedApp.name}
          onBack={back}
          onChanged={() => catalog.refresh()}
          onCreateWorkflow={onCreateWorkflow}
          onOpenApp={onOpenApp}
          onRemoved={() =>
            removed(
              selectedInstall
                ? { kind: "install", installId: selectedInstall.installId }
                : {
                    kind: "app",
                    name: selectedApp.name,
                    ...(selectedApp.appId ? { appId: selectedApp.appId } : {}),
                  },
            )
          }
          onSelectWorkflow={(name) =>
            select({ kind: "workflow", name, app: selectedApp.appId ?? selectedApp.name })
          }
          workflows={
            catalog.groups.find(
              (group) =>
                group.id === (selectedApp.appId ?? selectedApp.name) ||
                group.app?.name === selectedApp.name,
            )?.workflows ?? []
          }
        />
      );
    }

    if (selectedWorkflow) {
      return (
        <WorkflowDetailView
          header={
            selectedWorkflow.group ? (
              <button
                className="text-[0.7rem] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                onClick={() =>
                  selectedWorkflow.group?.kind === "flows" || !selectedWorkflow.group?.app
                    ? select(null)
                    : select({
                        kind: "app",
                        name: selectedWorkflow.group.app.name,
                        ...(selectedWorkflow.group.app.appId
                          ? { appId: selectedWorkflow.group.app.appId }
                          : {}),
                      })
                }
                type="button"
              >
                ‹ {selectedWorkflow.group.label}
              </button>
            ) : back ? (
              <button
                className="text-[0.7rem] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                onClick={back}
                type="button"
              >
                ‹ Apps
              </button>
            ) : (
              <span className="text-[0.7rem] text-muted-foreground">Your flows</span>
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
              ...(selectedWorkflow.group?.kind === "app" && selectedWorkflow.group.app
                ? { app: selectedWorkflow.group.app.name }
                : {}),
            })
          }
          workflow={selectedWorkflow.workflow}
        />
      );
    }

    if (variant === "pane") return null;

    return (
      <div className="rounded-lg border border-dashed p-6">
        {catalog.apps.length === 0 &&
        catalog.installs.length === 0 &&
        catalog.workflows.length === 0 ? (
          <CreateWorkflowEmpty createWorkflowHref={createWorkflowHref} onCreateWorkflow={onCreateWorkflow}>
            No apps yet.
          </CreateWorkflowEmpty>
        ) : (
          <Empty>
            Select an app to see its pages, exports, access and releases — or a workflow to run it
            and read its trace.
          </Empty>
        )}
      </div>
    );
  })();

  const sheet = installTarget && invokeApps && (
    <InstallSheet
      entry={installTarget}
      invokeApps={invokeApps}
      onClose={() => setInstallTarget(null)}
      onCreateProfile={onCreateProfile}
      onInstalled={(installId) => {
        catalog.refresh();
        if (installId) select({ kind: "install", installId });
        setInstallTarget(null);
      }}
      open={Boolean(installTarget)}
      profiles={profiles}
    />
  );

  // Private-flows publish CTA (pane/full list footer when flows group exists).
  const flowsGroup = catalog.groups.find((g) => g.kind === "flows");
  const publishHint =
    onPublishFlow && flowsGroup && flowsGroup.workflows.length > 0 ? (
      <p className="px-1 text-[0.65rem] text-muted-foreground">
        To share a flow,{" "}
        <button
          className="underline-offset-2 hover:underline"
          onClick={() => onPublishFlow(flowsGroup.workflows[0]?.name ?? "")}
          type="button"
        >
          publish an app that exports it
        </button>
        .
      </p>
    ) : null;

  if (variant === "sidebar") {
    return withRuns(
      <div className={mergeClasses("flex min-h-0 flex-col gap-1.5", className)}>
        {title !== null && (
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </h3>
        )}
        {list}
        {sheet}
      </div>,
    );
  }

  if (variant === "pane") {
    const showingDetail = selection !== null && selection.kind !== "directory"
      ? Boolean(detail)
      : selection?.kind === "directory";
    return withRuns(
      <div
        className={mergeClasses(
          `flex min-h-0 flex-col gap-2 ${fill ? "flex-1" : ""}`,
          className,
        )}
      >
        {title !== null && !showingDetail && (
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </h3>
        )}
        {showingDetail ? (
          <div className={`min-w-0 ${fill ? "min-h-0 flex-1 overflow-y-auto" : ""}`}>{detail}</div>
        ) : (
          <div className={`flex min-h-0 flex-col gap-2 ${fill ? "flex-1" : ""}`}>
            {list}
            {publishHint}
            {directorySection}
          </div>
        )}
        {sheet}
      </div>,
    );
  }

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
          {publishHint}
          {directorySection}
        </div>
        <div className={`min-w-0 ${fill ? "min-h-0 overflow-y-auto" : "overflow-y-auto"}`}>
          {detail}
        </div>
      </div>
      {sheet}
    </div>,
  );
}

/**
 * The compact surface: the grouped list alone, sized for a 288px sidebar.
 */
export type AppsExplorerProps = Omit<AppsPanelProps, "variant" | "fill">;

export function AppsExplorer(props: AppsExplorerProps) {
  return <AppsPanel {...props} variant="sidebar" />;
}

export { AppsCatalogProvider, AppsList, useAppsCatalog } from "./apps/catalog";
export type { AppsCatalogProviderProps } from "./apps/catalog";
export { AppDetail } from "./apps/app-detail";
export {
  StandaloneWorkflowDetail as WorkflowDetail,
  type StandaloneWorkflowDetailProps as WorkflowDetailProps,
} from "./apps/workflow-detail";
export { WorkflowDetail as WorkflowDetailView } from "./apps/workflow-detail";
export { LastRunProvider, useLastRun } from "./apps/last-runs";
export type { AppsCatalog } from "./apps/catalog";
export type { AppDetailProps } from "./apps/app-detail";
export type { AppsListProps } from "./apps/catalog";
export type { WorkflowDetailProps as WorkflowDetailViewProps } from "./apps/workflow-detail";
