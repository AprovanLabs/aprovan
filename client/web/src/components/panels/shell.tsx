/**
 * Shared chrome for native-surface panels (docs/native-surfaces.md in the
 * registry repo). Every workspace viewer — Data, Agents, Webhooks,
 * Notifications, Sessions, Interfaces, Sync, Sandboxes, Activity — renders
 * inside the same shell so adding the next surface is a registry entry, not a
 * UX negotiation.
 *
 * Panels are self-contained: they fetch through `invokeNamespaceTool`,
 * own their loading/error/empty states, and never reach into page state.
 */

import { useSharedAppsCatalog } from "@aprovan/ui/apps-store";
import { AlertCircle, Loader2, RefreshCw, type LucideIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { invokeAppsTool } from "@/lib/tools";

/** Narrow a panel to one app (the app inspector's contextual tabs). */
export interface AppScope {
  name: string;
  title?: string;
}

export interface NativePanelProps {
  scope?: AppScope;
}

/**
 * Optional host callbacks a panel can reach for without the generic
 * `invokeNamespaceTool` plumbing knowing about them — e.g. Sessions opening
 * a chat in the page that's actually hosting it, or a changed file. Panels
 * are otherwise self-contained (see the module doc above), so this is
 * deliberately a short, additive list: only what a panel cannot do on its
 * own via its namespace tools.
 *
 * The host (ChatPage) provides these via `PanelHostProvider`; panels read
 * them with `usePanelHostActions()` and must treat every field as optional
 * — a panel rendered without a provider (or in a host that doesn't support
 * an action) just falls back to its own behavior.
 */
export interface PanelHostActions {
  /** Switch the chat this window is showing to this session id. */
  onOpenSession?: (id: string) => void;
  /** Open a workspace file (e.g. in the preview pane). */
  onOpenFile?: (path: string) => void;
  /** Open the credentials native surface, optionally prefilling a provider. */
  onOpenCredentials?: (provider?: string) => void;
}

const PanelHostContext = createContext<PanelHostActions>({});

export function PanelHostProvider({
  actions,
  children,
}: {
  actions: PanelHostActions;
  children: ReactNode;
}) {
  return <PanelHostContext.Provider value={actions}>{children}</PanelHostContext.Provider>;
}

export function usePanelHostActions(): PanelHostActions {
  return useContext(PanelHostContext);
}

/**
 * The workspace/app scope picker for panels whose data can narrow to one app
 * (Notifications, Activity, Sandboxes, Data). One hook, rendered once in the
 * panel's header `actions`, so every panel gets the identical control.
 *
 * - `scope` is what the panel should filter by: the explicit `scope` prop
 *   when the panel is an app inspector tab, otherwise whichever app the user
 *   picked here (or `undefined` for the workspace-level default).
 * - `scopeFilter` is the control itself — `null` when an explicit scope is
 *   set (the inspector already says which app this is) or when the workspace
 *   has no apps to pick from.
 *
 * The app list comes from the shared apps catalog when a provider is above
 * (ChatPage wraps the whole tab area in one); without a provider it falls
 * back to a one-shot `apps.list`. The builtin Personal app is skipped — it
 * is not an installed app and stamps nothing as its source.
 */
export function useScopeFilter(explicit?: AppScope): {
  scope: AppScope | undefined;
  scopeFilter: ReactNode;
} {
  const shared = useSharedAppsCatalog();
  const [fetched, setFetched] = useState<AppScope[]>([]);
  const [selected, setSelected] = useState("");

  const needsFetch = !explicit && shared === null;
  useEffect(() => {
    if (!needsFetch) return;
    let alive = true;
    invokeAppsTool("list", {})
      .then((result) => {
        if (!alive) return;
        const raw = (result as { apps?: unknown })?.apps;
        const list = Array.isArray(raw) ? raw : [];
        setFetched(
          list
            .filter(
              (entry): entry is { name: string; title?: string; builtin?: boolean } =>
                typeof (entry as { name?: unknown })?.name === "string",
            )
            .filter((entry) => entry.builtin !== true)
            .map((entry) => ({
              name: entry.name,
              ...(typeof entry.title === "string" ? { title: entry.title } : {}),
            })),
        );
      })
      .catch(() => {
        // No apps namespace (or it errored): the picker just doesn't render.
      });
    return () => {
      alive = false;
    };
  }, [needsFetch]);

  const apps: AppScope[] = shared
    ? shared.apps
        .filter((app) => app.builtin !== true)
        .map((app) => ({ name: app.name, ...(app.title ? { title: app.title } : {}) }))
    : fetched;

  if (explicit) return { scope: explicit, scopeFilter: null };

  const selectedApp = apps.find((app) => app.name === selected);
  return {
    scope: selectedApp,
    scopeFilter:
      apps.length === 0 ? null : (
        <select
          value={selectedApp ? selected : ""}
          onChange={(event) => setSelected(event.target.value)}
          title="Show workspace items or one app's"
          className="h-6 max-w-[10rem] rounded border bg-background px-1 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Workspace</option>
          {apps.map((app) => (
            <option key={app.name} value={app.name}>
              {app.title ?? app.name}
            </option>
          ))}
        </select>
      ),
  };
}

/** Standard pane chrome: icon + title + description, actions, refresh. */
export function PanelShell({
  icon: Icon,
  title,
  description,
  actions,
  onRefresh,
  refreshing,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b px-3 py-1.5 shrink-0">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-sm font-medium">{title}</span>
        {description && (
          <span className="hidden sm:inline truncate text-xs text-muted-foreground">
            {description}
          </span>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          {actions}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Refresh"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
    </div>
  );
}

/** Underline tab strip (same look as the registry panels'). */
export function PanelTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: ReadonlyArray<{ id: T; label: string; badge?: number }>;
  active: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b px-2 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`-mb-px flex items-center gap-1.5 border-b-2 px-2.5 py-1.5 text-xs font-medium ${
            active === tab.id
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="rounded-full bg-muted px-1.5 text-[10px] tabular-nums">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function PanelLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function PanelError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-4 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/** Error state with an explicit retry action (ux.md credentials/admin panels). */
export function PanelErrorWithRetry({
  message,
  onRetry,
  retrying,
}: {
  message: string;
  onRetry: () => void;
  retrying?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <PanelError message={message} />
      <Button disabled={retrying} onClick={onRetry} size="sm" variant="outline">
        {retrying ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        Retry
      </Button>
    </div>
  );
}

export function PanelEmpty({ children }: { children: ReactNode }) {
  return <div className="p-4 text-sm text-muted-foreground">{children}</div>;
}

/**
 * Tiny data-loading hook: load on mount (and when `key` changes), expose
 * refresh. Keeps every panel's fetch discipline identical.
 */
export function usePanelData<T>(
  load: () => Promise<T>,
  key = "",
): {
  data: T | undefined;
  error: string | null;
  loading: boolean;
  refresh: () => void;
} {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const requestRef = useRef(0);
  const loadRef = useRef(load);
  loadRef.current = load;

  const run = useCallback(() => {
    const id = ++requestRef.current;
    setLoading(true);
    loadRef
      .current()
      .then((result) => {
        if (requestRef.current !== id) return;
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (requestRef.current !== id) return;
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (requestRef.current === id) setLoading(false);
      });
  }, []);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, error, loading, refresh: run };
}

/** "2m ago" style relative timestamps for run/delivery rows. */
export function relativeTime(iso: string | undefined): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
