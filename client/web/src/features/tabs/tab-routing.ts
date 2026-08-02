// ---------------------------------------------------------------------------
// Apps tabs
//
// An app or a workflow opens in the main pane, as a tab, not in an overlay —
// the same `openTabs` map / `activeTabPath` machinery that carries workspace
// file previews, keyed by a pseudo-path that can never collide with a real
// workspace path (no workspace path contains "://"). One machinery means one
// set of open/close/persist/restore rules, and a reload brings back the app
// you were looking at exactly like it brings back a file.
//
// A workflow's *script* is still a plain file tab (TailorFlow renders it);
// these keys address the panel's selection, not a file.
// ---------------------------------------------------------------------------

import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { NATIVE_TAB_PREFIX, parseNativeTabPath } from "@/lib/native-surfaces";

export const APP_TAB_PREFIX = "app://";
export const WORKFLOW_TAB_PREFIX = "workflow://";

export const isAppsTabPath = (path: string) =>
  path.startsWith(APP_TAB_PREFIX) || path.startsWith(WORKFLOW_TAB_PREFIX);

/** Any pseudo-path tab (apps panel selections, native surfaces) — no file
 *  behind it, so loaders and FS watchers must leave it alone. */
export const isVirtualTabPath = (path: string) =>
  isAppsTabPath(path) || path.startsWith(NATIVE_TAB_PREFIX);

/** Pseudo-path for a panel selection: `app://<name>`, `workflow://[<app>/]<name>`. */
export function appsTabPath(selection: AppsSelection): string {
  if (selection.kind === "app") return `${APP_TAB_PREFIX}${selection.name}`;
  const scope = selection.app ? `${selection.app}/` : "";
  return `${WORKFLOW_TAB_PREFIX}${scope}${selection.name}`;
}

/** Inverse of {@link appsTabPath}; null for ordinary workspace file tabs. */
export function parseAppsTabPath(path: string): AppsSelection | null {
  if (path.startsWith(APP_TAB_PREFIX)) {
    const name = path.slice(APP_TAB_PREFIX.length);
    return name ? { kind: "app", name } : null;
  }
  if (path.startsWith(WORKFLOW_TAB_PREFIX)) {
    const rest = path.slice(WORKFLOW_TAB_PREFIX.length);
    if (!rest) return null;
    const slash = rest.indexOf("/");
    if (slash === -1) return { kind: "workflow", name: rest };
    return { kind: "workflow", app: rest.slice(0, slash), name: rest.slice(slash + 1) };
  }
  return null;
}

/** One entry in the preview tab strip. Apps tabs carry no content of their
 *  own — their key is the panel selection — so they sit at `loading: false`. */
export interface OpenTab {
  code: string;
  loading: boolean;
  error: string | null;
  stale?: boolean;
}

/** Tab strip label: the file name, the app/workflow name, or the surface title. */
export function tabLabel(path: string): string {
  const surface = parseNativeTabPath(path);
  if (surface) return surface.title;
  const selection = parseAppsTabPath(path);
  if (selection) return selection.name;
  return path.split("/").pop() ?? path;
}
