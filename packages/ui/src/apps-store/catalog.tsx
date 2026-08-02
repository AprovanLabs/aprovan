/**
 * The apps catalog store: one loader for both gateway namespaces, grouped the
 * way every Apps surface renders it. Pure data plane — presentation (the
 * grouped list, rows, detail panes) lives in `@aprovan/registry-ui`; hosts and
 * that package both consume this store so two surfaces on one page share one
 * load, one cache and one `refresh()`.
 *
 * Shape follows docs/apps-and-workflows.md — each app is a group whose
 * children are the workflows it exports, and **every workflow belongs to an
 * app**: the ones nothing exports belong to the implicit Personal app. The
 * gateway synthesizes Personal in `apps.list` (`builtin: true`); when it
 * doesn't (an older gateway), the catalog synthesizes the identical group
 * client-side from the unbundled workflows, so the tree reads the same either
 * way. There is no "Workspace" pseudo-group anymore.
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
  isPersonalApp,
  normalizeApp,
  normalizeWorkflow,
  synthesizePersonalApp,
  unwrapList,
  PERSONAL_APP_NAME,
  type AppSummary,
  type ToolsInvoke,
  type WorkflowRunSummary,
  type WorkflowSummary,
} from "./wire";

/** What the detail pane is showing. */
export type AppsSelection =
  | { kind: "app"; name: string }
  | { kind: "workflow"; name: string; app?: string };

/** The Personal group's id — the builtin app's own name. */
export const PERSONAL_GROUP_ID = PERSONAL_APP_NAME;

/**
 * @deprecated The "Workspace" pseudo-group is gone — unbundled workflows live
 * under the Personal app ({@link PERSONAL_GROUP_ID}). Kept so persisted
 * selections and expansion sets from older hosts still resolve.
 */
export const WORKSPACE_GROUP_ID = "__workspace__";

export interface CatalogGroup {
  id: string;
  /** `"workspace"` no longer occurs; kept in the union for older consumers. */
  kind: "app" | "workspace";
  label: string;
  app?: AppSummary;
  workflows: WorkflowSummary[];
}

export interface AppsCatalog {
  apps: AppSummary[];
  workflows: WorkflowSummary[];
  groups: CatalogGroup[];
  appByName: Map<string, AppSummary>;
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
      const [workflowResult, appResult] = await Promise.all([
        attempt(() => invoke("list", {})),
        invokeApps ? attempt(() => invokeApps("list", {})) : Promise.resolve(null),
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
        setAppsUnavailable(true);
      } else if (appResult.ok) {
        setApps(
          unwrapList(appResult.value, "apps")
            .map(normalizeApp)
            .filter((app): app is AppSummary => app !== null),
        );
        setAppsUnavailable(false);
      } else {
        // A missing/erroring apps namespace degrades to workflows-only rather
        // than blanking the panel.
        setApps([]);
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

    // The gateway's Personal app, when it sends one — synthesized locally
    // otherwise, so older gateways render the identical tree.
    const personalFromGateway = apps.find(isPersonalApp);
    const published = apps.filter((app) => !isPersonalApp(app));

    const groups: CatalogGroup[] = published
      .slice()
      .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
      .map((app) => ({
        id: app.name,
        kind: "app" as const,
        label: app.title ?? app.name,
        app,
        workflows: exportRows(app, workflowByName, bundled),
      }));

    // Personal always closes the list, whether the gateway sent it or not: a
    // stable anatomy (published apps, then your own) reads better than a group
    // that moves with the alphabet. Its rows are the gateway's exports plus
    // any registered workflow no group has claimed — belt and braces, so a
    // gateway whose Personal listing lags the registry drops nothing.
    const personalApp: AppSummary = personalFromGateway
      ? { ...personalFromGateway, builtin: true }
      : synthesizePersonalApp();
    const personalRows = personalFromGateway
      ? exportRows(personalFromGateway, workflowByName, bundled)
      : [];
    const unbundled = workflows.filter((workflow) => !bundled.has(workflow.name));
    groups.push({
      id: personalApp.name,
      kind: "app",
      label: personalApp.title ?? "Personal",
      app: personalApp,
      workflows: [...personalRows, ...unbundled],
    });

    const appByName = new Map(apps.map((app) => [app.name, app]));
    appByName.set(personalApp.name, personalApp);

    const lastRunSeed = new Map<string, WorkflowRunSummary | null>();
    for (const workflow of workflows) {
      if (workflow.lastRun) lastRunSeed.set(workflow.name, workflow.lastRun);
    }

    return {
      apps,
      workflows,
      groups,
      appByName,
      workflowByName,
      lastRunSeed,
      loading,
      error,
      appsUnavailable,
      refresh: () => setNonce((n) => n + 1),
    };
  }, [apps, workflows, loading, error, appsUnavailable]);
}

export interface AppsCatalogProviderProps {
  /** Gateway `workflows` tool namespace (POST /tools/workflows/:operation). */
  invoke: ToolsInvoke;
  /** Gateway `apps` tool namespace; omit and the tree degrades to Personal alone. */
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
 * independently — no apps still gives you the Personal group, and no
 * workflows still gives you the app directory.
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
