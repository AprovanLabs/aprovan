/**
 * Apps launcher — primary sidebar entry for workspace apps. Row click opens
 * the app pane; the section header is the sole path into `native://apps`
 * management. Loading / empty / error states per iw9-b ux.md Sidebar.
 */

import { AlertTriangle, Plus, RefreshCw, Settings2 } from "lucide-react";
import { AppIconTile, AppIconTileSkeleton } from "./AppIconTile";
import { useAppsLauncher, type LauncherApp } from "./useAppsLauncher";

export function AppsLauncher({
  activeAppKey,
  onOpenApp,
  onOpenManagement,
}: {
  /** Active app tab key (`appId ?? name`) for highlight. */
  activeAppKey: string | null;
  onOpenApp: (app: LauncherApp) => void;
  onOpenManagement: () => void;
}) {
  const { apps, loading, error, refresh } = useAppsLauncher();

  return (
    <section className="shrink-0 border-t">
      <div className="flex w-full items-center gap-1 px-2 py-1.5">
        <button
          type="button"
          onClick={onOpenManagement}
          className="flex min-w-0 flex-1 items-center gap-1.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
          title="Manage apps"
        >
          <span>Apps</span>
        </button>
        <button
          type="button"
          onClick={onOpenManagement}
          className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          title="Manage apps"
        >
          <Settings2 className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-0.5 px-2 pb-2">
        {loading ? (
          <>
            <LauncherRowSkeleton />
            <LauncherRowSkeleton />
            <LauncherRowSkeleton />
          </>
        ) : error ? (
          <button
            type="button"
            onClick={refresh}
            className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-xs text-destructive hover:bg-muted/60"
            title="Retry loading apps"
          >
            <RefreshCw className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Couldn&apos;t load apps — retry</span>
          </button>
        ) : apps.length === 0 ? (
          <div className="space-y-0.5">
            <div className="px-2 py-1 text-xs text-muted-foreground">No apps yet</div>
            <button
              type="button"
              onClick={onOpenManagement}
              className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              title="Create or install an app"
            >
              <Plus className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Create or install</span>
            </button>
          </div>
        ) : (
          apps.map((app) => {
            const key = app.appId ?? app.name;
            const active = activeAppKey === key || activeAppKey === app.name;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onOpenApp(app)}
                title={app.reconcileError ? `${app.title} — app.yaml needs attention` : app.title}
                className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors ${
                  active ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <AppIconTile slug={app.slug} icon={app.icon} appRoot={app.root} />
                <span className="min-w-0 flex-1 truncate text-xs">{app.title}</span>
                {app.reconcileError ? (
                  <AlertTriangle
                    className="h-3 w-3 shrink-0 text-amber-500"
                    aria-label="Reconcile error"
                  />
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}

function LauncherRowSkeleton() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1" aria-hidden>
      <AppIconTileSkeleton />
      <div className="h-3 flex-1 rounded bg-muted animate-pulse" />
    </div>
  );
}
