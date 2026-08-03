import { useCallback, useEffect, useRef, useState } from "react";
import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { publishNotification, resetNotifications } from "@/lib/notifications";
import {
  deleteWorkspacePath,
  listWorkspacePaths,
  listWorkspacePathsUnderPrefix,
  mergeWorkspacePaths,
  probeWorkspacePaths,
  resetStore,
  subscribeToWorkspaceChanges,
  wasRecentLocalWrite,
  writeFile,
} from "@/lib/workspace-vfs";

/**
 * The slice of page behavior other features must be able to reach from inside
 * the explorer's mount-time subscriptions. Late-bound through a ref (the same
 * pattern the pre-extraction page used with `openTabsRef`/`reloadStaleTabRef`)
 * because the tab/session hooks are wired after this one.
 */
export interface ExplorerPageBridge {
  isTabOpen(path: string): boolean;
  reloadStaleTab(path: string, options?: { external?: boolean }): void;
  pruneTabsToExisting(existing: Set<string>): void;
  openWorkspacePreview(path: string): void;
  /** Workspace switch: reset state owned by other features (tabs, sessions, edit modal). */
  resetForWorkspaceSwitch(): void;
}

/**
 * Owns the workspace explorer's data: file listing, active path, pins,
 * load/error state, the active workspace id, and the workspace-change
 * subscription that keeps open tabs honest.
 */
export function useWorkspaceExplorer(args: {
  bridgeRef: React.RefObject<ExplorerPageBridge | null>;
}) {
  const { bridgeRef } = args;
  const [workspaceFiles, setWorkspaceFiles] = useState<string[]>([]);
  const [workspaceActivePath, setWorkspaceActivePath] = useState("");
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [lazyTree, setLazyTree] = useState(false);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(() =>
    localStorage.getItem(ACTIVE_WORKSPACE_KEY)
  );
  // Deduplicate listWorkspacePaths() calls when multiple files change in the same poll batch.
  const pendingTreeRefreshRef = useRef(false);
  const lazyTreeRef = useRef(false);
  const loadedPrefixesRef = useRef(new Set<string>());

  const [pinnedPaths, setPinnedPaths] = useState<Map<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem("patchwork:pinned-paths");
      if (!stored) return new Map();
      const parsed = JSON.parse(stored) as Array<[string, boolean]> | string[];
      if (parsed.length > 0 && Array.isArray(parsed[0])) {
        return new Map(parsed as Array<[string, boolean]>);
      }
      return new Map((parsed as string[]).map((p) => [p, false]));
    } catch {
      return new Map();
    }
  });

  const togglePin = useCallback((path: string, isDir: boolean) => {
    setPinnedPaths((prev) => {
      const next = new Map(prev);
      if (next.has(path)) next.delete(path);
      else next.set(path, isDir);
      localStorage.setItem("patchwork:pinned-paths", JSON.stringify(Array.from(next)));
      return next;
    });
  }, []);

  const deleteWorkspaceEntry = useCallback((path: string, isDir: boolean) => {
    // Watchers fire per removed path, which closes any open tabs and
    // refreshes the tree — no extra bookkeeping here.
    void deleteWorkspacePath(path, { recursive: isDir }).catch((err) => {
      setWorkspaceError(err instanceof Error ? err.message : "Delete failed");
    });
  }, []);

  const loadWorkspaceListing = useCallback(async () => {
    const probe = await probeWorkspacePaths();
    lazyTreeRef.current = probe.lazy;
    setLazyTree(probe.lazy);
    loadedPrefixesRef.current = new Set([""]);
    if (probe.lazy) {
      setWorkspaceFiles(probe.paths);
      return;
    }
    setWorkspaceFiles(await listWorkspacePaths());
  }, []);

  const refreshWorkspace = useCallback(async () => {
    setWorkspaceLoading(true);
    setWorkspaceError(null);
    try {
      await loadWorkspaceListing();
    } catch (err) {
      setWorkspaceError(err instanceof Error ? err.message : "Failed to load workspace");
    } finally {
      setWorkspaceLoading(false);
    }
  }, [loadWorkspaceListing]);

  const expandWorkspaceDirectory = useCallback((prefix: string) => {
    if (!lazyTreeRef.current) return;
    const normalized = prefix.replace(/^\/+|\/+$/g, "");
    if (loadedPrefixesRef.current.has(normalized)) return;
    loadedPrefixesRef.current.add(normalized);
    void listWorkspacePathsUnderPrefix(normalized)
      .then((paths) => {
        setWorkspaceFiles((prev) => mergeWorkspacePaths(prev, paths));
      })
      .catch(() => {
        loadedPrefixesRef.current.delete(normalized);
      });
  }, []);

  useEffect(() => {
    return subscribeToWorkspaceChanges((event, changedPath) => {
      // A file changed under an open tab. Tabs are preview surfaces (real
      // editing happens in the edit window, isolated in its own draft), so
      // auto-sync from the workspace instead of blocking on a banner — and
      // say so, unless this window made the change itself.
      if (changedPath) {
        const isOpen = bridgeRef.current?.isTabOpen(changedPath) ?? false;
        if (isOpen && !wasRecentLocalWrite(changedPath)) {
          publishNotification({
            category: "activity",
            title: `Updated ${changedPath.split("/").pop()} with outside changes`,
            body: `${changedPath} was changed by another chat, window, or workflow — the open preview refreshed automatically.`,
            link: { kind: "open-file", path: changedPath },
            localOnly: true,
          });
          bridgeRef.current?.reloadStaleTab(changedPath, { external: true });
        }
      }

      if (lazyTreeRef.current) {
        if (event === "delete" && changedPath) {
          setWorkspaceFiles((prev) =>
            prev.filter(
              (path) => path !== changedPath && !path.startsWith(`${changedPath}/`),
            ),
          );
        } else if (event === "update" && changedPath) {
          setWorkspaceFiles((prev) =>
            prev.includes(changedPath) ? prev : mergeWorkspacePaths(prev, [changedPath]),
          );
        }
        return;
      }

      // Debounce the full tree refresh — all files from a single poll batch
      // fire callbacks synchronously, so only the first one triggers a fetch.
      if (pendingTreeRefreshRef.current) return;
      pendingTreeRefreshRef.current = true;
      listWorkspacePaths()
        .then((allPaths) => {
          pendingTreeRefreshRef.current = false;
          setWorkspaceFiles(allPaths);
          const existing = new Set(allPaths);
          bridgeRef.current?.pruneTabsToExisting(existing);
        })
        .catch(() => {
          pendingTreeRefreshRef.current = false;
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Seed the tree on mount and whenever the active workspace switches.
  useEffect(() => {
    setWorkspaceLoading(true);
    setWorkspaceError(null);

    loadWorkspaceListing()
      .catch((err) => {
        setWorkspaceError(err instanceof Error ? err.message : "Failed to load workspace");
      })
      .finally(() => setWorkspaceLoading(false));
  }, [activeWorkspaceId, loadWorkspaceListing]);

  // "New file" from the sidebar tree: validate synchronously (so the inline
  // input can show the message without an extra round trip) and fire the
  // actual write async — same optimistic-close, banner-on-failure pattern as
  // `deleteWorkspaceEntry` above. A successful write's watcher already
  // refreshes `workspaceFiles`; this additionally opens the new file as a tab.
  const createWorkspaceFile = useCallback(
    (rawPath: string): string | void => {
      // Collapse doubled slashes too — a directory-seeded prefix plus a
      // typed leading slash (or the tree's own trailing-slash directory
      // paths) can otherwise produce "dir//file.ts".
      const path = rawPath.replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
      if (!path) return "Enter a file name";
      if (workspaceFiles.includes(path)) return "A file already exists at this path";
      void writeFile(path, "")
        .then(() => bridgeRef.current?.openWorkspacePreview(path))
        .catch((err) => {
          setWorkspaceError(err instanceof Error ? err.message : "Failed to create file");
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [workspaceFiles]
  );

  const handleWorkspaceSwitch = useCallback(
    (newWorkspaceId: string) => {
      localStorage.setItem(ACTIVE_WORKSPACE_KEY, newWorkspaceId);
      setActiveWorkspaceId(newWorkspaceId);
      setPinnedPaths(new Map());
      // Tabs, edit modal, and chat-session state re-initialize via their own
      // hooks once activeWorkspaceId lands; drop the old workspace's scope now.
      bridgeRef.current?.resetForWorkspaceSwitch();
      resetNotifications();
      resetStore();
      void refreshWorkspace();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshWorkspace]
  );

  const handleWorkspaceLoad = useCallback(
    (serverActiveId: string | null) => {
      if (!serverActiveId) return;
      const storedId = localStorage.getItem(ACTIVE_WORKSPACE_KEY);
      if (serverActiveId === storedId) return;
      // Server and localStorage disagree — trust the server
      localStorage.setItem(ACTIVE_WORKSPACE_KEY, serverActiveId);
      setActiveWorkspaceId(serverActiveId);
      setPinnedPaths(new Map());
      bridgeRef.current?.resetForWorkspaceSwitch();
      resetNotifications();
      resetStore();
      void refreshWorkspace();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshWorkspace]
  );

  return {
    workspaceFiles,
    workspaceActivePath,
    setWorkspaceActivePath,
    workspaceLoading,
    workspaceError,
    lazyTree,
    activeWorkspaceId,
    refreshWorkspace,
    expandWorkspaceDirectory,
    deleteWorkspaceEntry,
    createWorkspaceFile,
    pinnedPaths,
    togglePin,
    handleWorkspaceSwitch,
    handleWorkspaceLoad,
  };
}
