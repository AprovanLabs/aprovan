/**
 * Apps launcher data: `apps.list` rows with icon + reconcile metadata that
 * the shared catalog's `normalizeApp` currently drops. Independent of Files /
 * Workspace so a list failure never blocks the rest of the sidebar.
 */

import { useCallback, useEffect, useState } from "react";
import { invokeAppsTool } from "@/lib/tools";

export interface LauncherApp {
  name: string;
  appId?: string;
  /** Vanity slug when present; otherwise `name` — input to appIconFallback. */
  slug: string;
  title: string;
  /** Custom icon from app.yaml when the gateway projects it. */
  icon?: string;
  root?: string;
  /** True when last reconcile reported an error (last-good state still usable). */
  reconcileError: boolean;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseLauncherApp(raw: unknown): LauncherApp | null {
  const record = asRecord(raw);
  const name = asString(record?.name);
  if (!record || !name) return null;

  const slug = asString(record.slug) ?? name;
  const title = asString(record.title) ?? name;
  const appId = asString(record.appId) ?? asString(record.app_id) ?? asString(record.id);
  const root =
    asString(record.root) ??
    (Array.isArray(record.paths) && typeof record.paths[0] === "string"
      ? record.paths[0]
      : undefined);

  // Prefer a top-level projection; fall back to last-reconciled declared yaml.
  const declared = asRecord(record.declared);
  const icon = asString(record.icon) ?? asString(declared?.icon);

  const reconcile = asRecord(record.reconcile);
  const reconcileError = reconcile?.status === "error";

  return {
    name,
    ...(appId ? { appId } : {}),
    slug,
    title,
    ...(icon ? { icon } : {}),
    ...(root ? { root } : {}),
    reconcileError,
  };
}

export function useAppsLauncher(): {
  apps: LauncherApp[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
} {
  const [apps, setApps] = useState<LauncherApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    void invokeAppsTool("list", {})
      .then((result) => {
        if (!alive) return;
        const raw = asRecord(result)?.apps;
        const list = Array.isArray(raw) ? raw : [];
        const parsed = list
          .map(parseLauncherApp)
          .filter((app): app is LauncherApp => app !== null)
          .sort((a, b) => a.title.localeCompare(b.title));
        setApps(parsed);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        setApps([]);
        setError(err instanceof Error ? err.message : "Failed to load apps");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [nonce]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  return { apps, loading, error, refresh };
}
