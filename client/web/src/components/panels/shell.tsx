/**
 * Shared chrome for native-surface panels (docs/native-surfaces.md in the
 * registry repo). Every workspace viewer — Data, Agents, Webhooks, Sync,
 * Activity — renders inside the same shell so adding surface #7 is a
 * registry entry, not a UX negotiation.
 *
 * Panels are self-contained: they fetch through `invokeNamespaceTool`,
 * own their loading/error/empty states, and never reach into page state.
 */

import { AlertCircle, Loader2, RefreshCw, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Narrow a panel to one app (the app inspector's contextual tabs). */
export interface AppScope {
  name: string;
  title?: string;
}

export interface NativePanelProps {
  scope?: AppScope;
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
      <div className="flex items-center gap-2 border-b px-3 py-2 shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">{title}</span>
        {description && (
          <span className="hidden sm:inline truncate text-xs text-muted-foreground">
            {description}
          </span>
        )}
        <div className="ml-auto flex items-center gap-1">
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
