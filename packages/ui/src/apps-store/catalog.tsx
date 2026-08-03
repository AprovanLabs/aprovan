/**
 * The apps catalog store: one loader for gateway namespaces, grouped the way
 * every Apps surface renders it. Pure data plane — presentation (the grouped
 * list, rows, detail panes) lives in `@aprovan/registry-ui`; hosts and that
 * package both consume this store so two surfaces on one page share one load,
 * one cache and one `refresh()`.
 *
 * Groups: published apps (Your apps), installations, and unbundled workflows
 * under "Your flows (private)". There is no synthesized Personal app — an
 * empty workspace yields an empty app list.
 *
 * Loading is deduplicated by {@link AppsCatalogProvider}: a page that mounts
 * two surfaces (chat mounts the sidebar explorer and the full panel) otherwise
 * runs `apps.list` + `workflows.list` once per surface and refreshes them
 * independently.
 */

import * as React from "react";
import { LastRunProvider } from "./last-runs";
import {
  attempt,
  normalizeApp,
  normalizeDirectory,
  normalizeInstalls,
  normalizeWorkflow,
  unwrapList,
  type AppSummary,
  type DirectoryEntry,
  type InstallSummary,
  type ToolsInvoke,
  type WorkflowRunSummary,
  type WorkflowSummary,
} from "./wire";

/** What the detail pane is showing. */
export type AppsSelection =
  | { kind: "app"; name: string; appId?: string }
  | { kind: "install"; installId: string }
  | { kind: "directory" }
  | { kind: "workflow"; name: string; app?: string };

/** Unbundled workflows live under this group id (private to the caller). */
export const PRIVATE_FLOWS_GROUP_ID = "__flows__";

/**
 * @deprecated The "Workspace" pseudo-group is gone — unbundled workflows live
 * under {@link PRIVATE_FLOWS_GROUP_ID}. Kept so persisted selections and
 * expansion sets from older hosts still resolve.
 */
export const WORKSPACE_GROUP_ID = "__workspace__";

export interface CatalogGroup {
  id: string;
  kind: "app" | "install" | "flows" | "workspace";
  label: string;
  app?: AppSummary;
  install?: InstallSummary;
  workflows: WorkflowSummary[];
}

export interface AppsCatalog {
  apps: AppSummary[];
  installs: InstallSummary[];
  directory: DirectoryEntry[];
  workflows: WorkflowSummary[];
  groups: CatalogGroup[];
  appByName: Map<string, AppSummary>;
  appById: Map<string, AppSummary>;
  installById: Map<string, InstallSummary>;
  workflowByName: Map<string, WorkflowSummary>;
  /** Last runs the gateway inlined on `list`, ready to seed the run cache. */
  lastRunSeed: Map<string, WorkflowRunSummary | null>;
  loading: boolean;
  error: string | null;
  /** The gateway has no `apps` namespace — render workflows only, no error. */
  appsUnavailable: boolean;
  refresh: () => void;
}

/**
 * The catalog one {@link AppsCatalogProvider} owns, shared by every surface
 * beneath it. `null` means "no provider" — each hook then loads its own.
 */
const AppsCatalogContext = React.createContext<AppsCatalog | null>(null);

/** Resolve one app's export rows against the registry, marking dangling ones. */
function exportRows(
  app: AppSummary,
  workflowByName: Map<string, WorkflowSummary>,
  bundled: Set<string>,
): WorkflowSummary[] {
  // The gateway inlines each export on `apps.list`; when it does, that is the
  // richer record (it carries `procedure` and `lastRun`). Fall back to the
  // registration from `workflows.list`, then to a stub, so an export that
  // lost its registration still shows as dangling rather than vanishing.
  const inlined = new Map((app.exports ?? []).map((w) => [w.name, w]));
  const rows: WorkflowSummary[] = [];
  for (const name of app.workflows ?? []) {
    bundled.add(name);
    const workflow = inlined.get(name) ?? workflowByName.get(name);
    rows.push(
      workflow
        ? { ...workflowByName.get(name), ...workflow, apps: [...(workflow.apps ?? []), app.name] }
        : { name, scriptPath: "", triggers: {}, apps: [app.name] },
    );
  }
  return rows;
}

/** Load both namespaces and group them. The engine behind `useAppsCatalog`. */
function useCatalogLoader({
  invoke,
  invokeApps,
  enabled,
}: {
  invoke: ToolsInvoke | undefined;
  invokeApps?: ToolsInvoke | undefined;
  enabled: boolean;
}): AppsCatalog {
  const [apps, setApps] = React.useState<AppSummary[]>([]);
  const [installs, setInstalls] = React.useState<InstallSummary[]>([]);
  const [directory, setDirectory] = React.useState<DirectoryEntry[]>([]);
  const [workflows, setWorkflows] = React.useState<WorkflowSummary[]>([]);
  const [loading, setLoading] = React.useState(enabled);
  const [error, setError] = React.useState<string | null>(null);
  const [appsUnavailable, setAppsUnavailable] = React.useState(!invokeApps);
  const [nonce, setNonce] = React.useState(0);

  React.useEffect(() => {
    if (!enabled || !invoke) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    void (async () => {
      const [workflowResult, appResult, installResult, directoryResult] = await Promise.all([
        attempt(() => invoke("list", {})),
        invokeApps ? attempt(() => invokeApps("list", {})) : Promise.resolve(null),
        invokeApps ? attempt(() => invokeApps("installed", {})) : Promise.resolve(null),
        invokeApps ? attempt(() => invokeApps("directory", {})) : Promise.resolve(null),
      ]);
      if (!alive) return;

      if (workflowResult.ok) {
        setWorkflows(
          unwrapList(workflowResult.value, "workflows")
            .map(normalizeWorkflow)
            .filter((workflow): workflow is WorkflowSummary => workflow !== null),
        );
        setError(null);
      } else {
        setWorkflows([]);
        setError(workflowResult.missing ? null : (workflowResult.error ?? "Failed to load workflows"));
      }

      if (!appResult) {
        setApps([]);
        setInstalls([]);
        setDirectory([]);
        setAppsUnavailable(true);
      } else if (appResult.ok) {
        setApps(
          unwrapList(appResult.value, "apps")
            .map(normalizeApp)
            .filter((app): app is AppSummary => app !== null),
        );
        setAppsUnavailable(false);
        setInstalls(
          installResult?.ok ? normalizeInstalls(installResult.value) : [],
        );
        setDirectory(
          directoryResult?.ok ? normalizeDirectory(directoryResult.value) : [],
        );
      } else {
        // A missing/erroring apps namespace degrades to workflows-only rather
        // than blanking the panel.
        setApps([]);
        setInstalls([]);
        setDirectory([]);
        setAppsUnavailable(true);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [enabled, invoke, invokeApps, nonce]);

  return React.useMemo(() => {
    const workflowByName = new Map(workflows.map((workflow) => [workflow.name, workflow]));
    const bundled = new Set<string>();

    const groups: CatalogGroup[] = apps
      .slice()
      .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
      .map((app) => ({
        id: app.appId ?? app.name,
        kind: "app" as const,
        label: app.title ?? app.name,
        app,
        workflows: exportRows(app, workflowByName, bundled),
      }));

    for (const install of installs) {
      groups.push({
        id: install.installId,
        kind: "install",
        label: install.title ?? install.name ?? install.installId,
        install,
        workflows: [],
      });
    }

    // Unbundled workflows — private to the caller — close the list. No
    // synthesized app card: an empty workspace yields an empty list.
    const unbundled = workflows.filter((workflow) => {
      if (bundled.has(workflow.name)) return false;
      // Prefer export annotations when present; otherwise treat as private.
      if (workflow.exportedBy && workflow.exportedBy.length > 0) return false;
      if (workflow.apps && workflow.apps.length > 0) return false;
      return true;
    });
    if (unbundled.length > 0) {
      groups.push({
        id: PRIVATE_FLOWS_GROUP_ID,
        kind: "flows",
        label: "Your flows (private)",
        workflows: unbundled,
      });
    }

    const appByName = new Map(apps.map((app) => [app.name, app]));
    const appById = new Map(
      apps.filter((app) => app.appId).map((app) => [app.appId as string, app]),
    );
    const installById = new Map(installs.map((install) => [install.installId, install]));

    const lastRunSeed = new Map<string, WorkflowRunSummary | null>();
    for (const workflow of workflows) {
      if (workflow.lastRun) lastRunSeed.set(workflow.name, workflow.lastRun);
    }

    return {
      apps,
      installs,
      directory,
      workflows,
      groups,
      appByName,
      appById,
      installById,
      workflowByName,
      lastRunSeed,
      loading,
      error,
      appsUnavailable,
      refresh: () => setNonce((n) => n + 1),
    };
  }, [apps, installs, directory, workflows, loading, error, appsUnavailable]);
}

export interface AppsCatalogProviderProps {
  /** Gateway `workflows` tool namespace (POST /tools/workflows/:operation). */
  invoke: ToolsInvoke;
  /** Gateway `apps` tool namespace; omit and the tree shows private flows only. */
  invokeApps?: ToolsInvoke | undefined;
  children: React.ReactNode;
}

/**
 * One catalog for a whole page.
 *
 * A host that mounts two Apps surfaces at once — chat renders the sidebar
 * explorer *and* the full panel in a tab — otherwise runs `apps.list` +
 * `workflows.list` twice on mount and, worse, refreshing in one surface leaves
 * the other stale. Wrap both in this and they share one load, one cache and
 * one `refresh()`. It carries a {@link LastRunProvider} too, so the run dots
 * are fetched once rather than once per surface.
 *
 * Entirely optional: `useAppsCatalog` falls back to its own fetch with no
 * provider above it, which is what every single-surface host already does.
 */
export function AppsCatalogProvider({
  invoke,
  invokeApps,
  children,
}: AppsCatalogProviderProps) {
  const catalog = useCatalogLoader({ invoke, invokeApps, enabled: true });
  return (
    <AppsCatalogContext.Provider value={catalog}>
      <LastRunProvider invoke={invoke} seed={catalog.lastRunSeed}>
        {children}
      </LastRunProvider>
    </AppsCatalogContext.Provider>
  );
}

/** The shared catalog, when a provider is above — used to skip a second one. */
export function useSharedAppsCatalog(): AppsCatalog | null {
  return React.useContext(AppsCatalogContext);
}

/**
 * The catalog for one surface: the shared one from {@link AppsCatalogProvider}
 * when there is one, otherwise a load of its own. Either side may fail
 * independently — no apps still gives you an empty list (plus private flows
 * when present), and no workflows still gives you the app directory.
 */
export function useAppsCatalog(options?: {
  invoke?: ToolsInvoke | undefined;
  invokeApps?: ToolsInvoke | undefined;
}): AppsCatalog {
  const shared = React.useContext(AppsCatalogContext);
  // Called unconditionally (hook rules) but inert when a provider answered.
  const own = useCatalogLoader({
    invoke: options?.invoke,
    invokeApps: options?.invokeApps,
    enabled: shared === null && options?.invoke !== undefined,
  });
  return shared ?? own;
}
