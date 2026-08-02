import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { nativeTabPath, parseNativeTabPath } from "@/lib/native-surfaces";
import { loadWorkspaceFileProject } from "@/lib/workspace-vfs";
import {
  appsTabPath,
  isVirtualTabPath,
  parseAppsTabPath,
  type OpenTab,
} from "./tab-routing";

export const TABS_KEY_PREFIX = "patchwork:open-tabs";
export const ACTIVE_WORKSPACE_KEY = "patchwork:active-workspace";

function getTabsStorageKey(workspaceId: string | null): string {
  return workspaceId ? `${TABS_KEY_PREFIX}:${workspaceId}` : TABS_KEY_PREFIX;
}

function loadPersistedTabState(workspaceId: string | null): {
  paths: string[];
  activePath: string | null;
} {
  try {
    const raw = localStorage.getItem(getTabsStorageKey(workspaceId));
    if (!raw) return { paths: [], activePath: null };
    const parsed = JSON.parse(raw);
    return {
      paths: Array.isArray(parsed.paths) ? parsed.paths : [],
      activePath: typeof parsed.activePath === "string" ? parsed.activePath : null,
    };
  } catch {
    return { paths: [], activePath: null };
  }
}

function persistTabState(paths: string[], activePath: string | null, workspaceId: string | null) {
  localStorage.setItem(getTabsStorageKey(workspaceId), JSON.stringify({ paths, activePath }));
}

/**
 * Owns the preview tab strip's state: the `openTabs` map, the active tab,
 * collapse state, localStorage persistence (scoped by workspace), and every
 * open/close/re-key/reload action. Pure move from ChatPage — bodies unchanged,
 * with the two cross-feature touches (sidebar close, workspace tree selection)
 * injected as callbacks.
 */
export function useTabs(args: {
  activeWorkspaceId: string | null;
  /** Keeps the sidebar tree's selection in sync when a real file tab activates. */
  onWorkspacePathActivated: (path: string) => void;
  closeSidebar: () => void;
}) {
  const { activeWorkspaceId, onWorkspacePathActivated, closeSidebar } = args;

  const [openTabs, setOpenTabs] = useState<Map<string, OpenTab>>(() => {
    const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
    const { paths } = loadPersistedTabState(wsId);
    // Apps tabs have no file to fetch — they restore ready, so the loader
    // effect below leaves them alone.
    return new Map(paths.map((p) => [p, { code: "", loading: !isVirtualTabPath(p), error: null }]));
  });
  const [activeTabPath, setActiveTabPath] = useState<string | null>(() => {
    const wsId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
    const { paths, activePath } = loadPersistedTabState(wsId);
    if (activePath && paths.includes(activePath)) return activePath;
    return paths[0] ?? null;
  });
  const [previewCollapsed, setPreviewCollapsed] = useState(false);
  // Read inside the workspace-change subscription (armed once on mount).
  const openTabsRef = useRef<Map<string, OpenTab>>(new Map());
  openTabsRef.current = openTabs;
  const tabRequestRefs = useRef<Map<string, number>>(new Map());

  // Load content for tabs restored from localStorage
  useEffect(() => {
    openTabs.forEach((tab, path) => {
      if (!tab.loading) return;
      const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
      tabRequestRefs.current.set(path, requestId);
      loadWorkspaceFileProject(path)
        .then((project) => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          if (!project) {
            setOpenTabs((prev) => {
              const next = new Map(prev);
              next.delete(path);
              return next;
            });
            return;
          }
          const file = project.files.get(project.entry);
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, { code: file?.content ?? "", loading: false, error: null });
            return next;
          });
        })
        .catch(() => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.delete(path);
            return next;
          });
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist open tabs to localStorage (scoped by active workspace)
  useEffect(() => {
    persistTabState([...openTabs.keys()], activeTabPath, activeWorkspaceId);
  }, [openTabs, activeTabPath, activeWorkspaceId]);

  // Fix activeTabPath when its tab is removed
  useEffect(() => {
    if (activeTabPath !== null && !openTabs.has(activeTabPath)) {
      setActiveTabPath([...openTabs.keys()][0] ?? null);
    }
  }, [openTabs, activeTabPath]);

  const openWorkspacePreview = useCallback(
    (path: string) => {
      onWorkspacePathActivated(path);
      setActiveTabPath(path);
      setPreviewCollapsed(false);
      closeSidebar();

      // If tab already open, just activate it
      setOpenTabs((prev) => {
        if (prev.has(path)) return prev;
        const next = new Map(prev);
        next.set(path, { code: "", loading: true, error: null });
        return next;
      });

      const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
      tabRequestRefs.current.set(path, requestId);

      void loadWorkspaceFileProject(path)
        .then((project) => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          if (!project) {
            setOpenTabs((prev) => {
              const next = new Map(prev);
              next.set(path, { code: "", loading: false, error: "Failed to load file preview" });
              return next;
            });
            return;
          }
          const file = project.files.get(project.entry);
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, { code: file?.content ?? "", loading: false, error: null });
            return next;
          });
        })
        .catch((err) => {
          if (tabRequestRefs.current.get(path) !== requestId) return;
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, {
              code: "",
              loading: false,
              error: err instanceof Error ? err.message : "Failed to load file preview",
            });
            return next;
          });
        });
    },
    [onWorkspacePathActivated, closeSidebar]
  );

  // Picking an app or a workflow opens it in the main pane. The tab holds no
  // content of its own — its key *is* the panel's selection — so it lands
  // ready and never enters the loading path above.
  const openAppsTab = useCallback(
    (selection: AppsSelection | null) => {
      if (!selection) return;
      const path = appsTabPath(selection);
      setOpenTabs((prev) => {
        if (prev.has(path)) return prev;
        const next = new Map(prev);
        next.set(path, { code: "", loading: false, error: null });
        return next;
      });
      setActiveTabPath(path);
      setPreviewCollapsed(false);
      closeSidebar();
    },
    [closeSidebar]
  );

  /** Native surfaces open exactly like apps tabs: a pseudo-path content tab. */
  const openNativeTab = useCallback(
    (surfaceId: string) => {
      const path = nativeTabPath(surfaceId);
      setOpenTabs((prev) => {
        if (prev.has(path)) return prev;
        const next = new Map(prev);
        next.set(path, { code: "", loading: false, error: null });
        return next;
      });
      setActiveTabPath(path);
      setPreviewCollapsed(false);
      closeSidebar();
    },
    [closeSidebar]
  );

  // Navigating inside the open panel (app → one of its workflows, breadcrumb
  // back) re-keys the tab in place rather than piling up tabs: the tab and the
  // panel are the same view, so its label follows the selection.
  const retitleAppsTab = useCallback((from: string, selection: AppsSelection | null) => {
    if (!selection) return;
    const to = appsTabPath(selection);
    if (to === from) return;
    setOpenTabs((prev) => {
      if (!prev.has(from)) return prev;
      if (prev.has(to)) {
        const next = new Map(prev);
        next.delete(from);
        return next;
      }
      // Rebuild to keep the tab in its strip position.
      const next = new Map<string, OpenTab>();
      for (const [key, tab] of prev) next.set(key === from ? to : key, tab);
      return next;
    });
    setActiveTabPath((current) => (current === from ? to : current));
  }, []);

  const closeTab = useCallback(
    (path: string) => {
      setOpenTabs((prev) => {
        const next = new Map(prev);
        next.delete(path);
        return next;
      });
      setActiveTabPath((prev) => {
        if (prev !== path) return prev;
        // Activate an adjacent tab
        const paths = [...openTabs.keys()];
        const idx = paths.indexOf(path);
        if (paths.length <= 1) return null;
        return paths[idx > 0 ? idx - 1 : idx + 1] ?? null;
      });
    },
    [openTabs]
  );

  const closeAllTabs = useCallback(() => {
    setOpenTabs(new Map());
    setActiveTabPath(null);
  }, []);

  const reloadStaleTab = useCallback((path: string) => {
    setOpenTabs((prev) => {
      const next = new Map(prev);
      next.set(path, { code: "", loading: true, error: null, stale: false });
      return next;
    });

    const requestId = (tabRequestRefs.current.get(path) ?? 0) + 1;
    tabRequestRefs.current.set(path, requestId);

    void loadWorkspaceFileProject(path)
      .then((project) => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        if (!project) {
          setOpenTabs((prev) => {
            const next = new Map(prev);
            next.set(path, {
              code: "",
              loading: false,
              error: "Failed to reload file",
              stale: false,
            });
            return next;
          });
          return;
        }
        const file = project.files.get(project.entry);
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, { code: file?.content ?? "", loading: false, error: null, stale: false });
          return next;
        });
      })
      .catch(() => {
        if (tabRequestRefs.current.get(path) !== requestId) return;
        setOpenTabs((prev) => {
          const next = new Map(prev);
          next.set(path, {
            code: "",
            loading: false,
            error: "Failed to reload file",
            stale: false,
          });
          return next;
        });
      });
  }, []);

  /** Tab-strip click: activate, sync the tree selection for real files, uncollapse. */
  const selectTab = useCallback(
    (path: string) => {
      setActiveTabPath(path);
      // Virtual tabs are not workspace paths — leave
      // the file tree's selection where the user left it.
      if (!isVirtualTabPath(path)) onWorkspacePathActivated(path);
      setPreviewCollapsed(false);
    },
    [onWorkspacePathActivated]
  );

  /** Workspace switch: drop every tab (they belong to the old workspace). */
  const resetTabs = useCallback(() => {
    setOpenTabs(new Map());
    setActiveTabPath(null);
  }, []);

  const isTabOpen = useCallback((path: string) => openTabsRef.current.has(path), []);

  /** Close tabs whose file vanished from the workspace listing. */
  const pruneTabsToExisting = useCallback((existing: Set<string>) => {
    setOpenTabs((prev) => {
      let changed = false;
      const next = new Map(prev);
      for (const path of next.keys()) {
        // Apps tabs address a panel selection, not a workspace path —
        // a file listing can never justify closing one.
        if (isVirtualTabPath(path)) continue;
        if (!existing.has(path)) {
          next.delete(path);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  // The active tab expressed as a panel selection (null for file tabs), so
  // the sidebar explorer highlights whatever the main pane is showing.
  const activeAppsSelection = useMemo(
    () => (activeTabPath ? parseAppsTabPath(activeTabPath) : null),
    [activeTabPath]
  );

  // Same idea for native surfaces: the sidebar's Workspace group highlights
  // the surface whose `native://` tab is showing.
  const activeSurfaceId = useMemo(
    () => (activeTabPath ? (parseNativeTabPath(activeTabPath)?.id ?? null) : null),
    [activeTabPath]
  );

  // A tab is genuinely occupying the screen — not just an empty tab strip —
  // only when one is open and the preview isn't collapsed to its tab bar.
  // Only then does the chat need to give up room to it.
  const hasContentTab = openTabs.size > 0 && !previewCollapsed;

  return {
    openTabs,
    setOpenTabs,
    activeTabPath,
    previewCollapsed,
    setPreviewCollapsed,
    hasContentTab,
    activeAppsSelection,
    activeSurfaceId,
    openWorkspacePreview,
    openAppsTab,
    openNativeTab,
    retitleAppsTab,
    closeTab,
    closeAllTabs,
    reloadStaleTab,
    selectTab,
    resetTabs,
    isTabOpen,
    pruneTabsToExisting,
  };
}
