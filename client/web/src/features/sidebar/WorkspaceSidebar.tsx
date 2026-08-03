import { MobileDrawer, WorkspaceTree } from "@aprovan/patchwork-editor";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { usePresenceTitleMap } from "@/features/presence";
import {
  fromDisplayPath,
  hasPrivateEntries,
  resolvePrivateRoot,
  toDisplayPath,
  PRIVATE_SECTION_LABEL,
} from "@/lib/private-partition";
import { NATIVE_SURFACES } from "@/lib/native-surfaces";


const WORKSPACE_PANE_KEY = "patchwork:workspace-pane";

function loadWorkspacePaneLayout(): { collapsed: boolean } {
  try {
    const raw = localStorage.getItem(WORKSPACE_PANE_KEY);
    if (!raw) return { collapsed: false };
    const parsed = JSON.parse(raw) as { collapsed?: unknown };
    return { collapsed: parsed.collapsed === true };
  } catch {
    return { collapsed: false };
  }
}

function saveWorkspacePaneLayout(layout: { collapsed: boolean }): void {
  try {
    localStorage.setItem(WORKSPACE_PANE_KEY, JSON.stringify(layout));
  } catch {
    // ignore quota / private mode
  }
}

/**
 * The workspace explorer column: file tree + plain Workspace surface rows,
 * wrapped in the same off-canvas drawer recipe the full-view editor's file
 * tree uses — hidden by default behind the header's toggle below md, a static
 * column at md+.
 *
 * The caller's own private space (`.users/<self>` — the gateway only ever
 * lists the caller's own; see lib/private-partition.ts) renders as a
 * top-level **Private** section. Translation is display-only and happens
 * entirely at this seam: the tree sees `Private/...` paths, every callback
 * translates back to the raw workspace path before it leaves the sidebar,
 * so tabs, URLs, and the FS routes keep working on raw paths.
 */
export function WorkspaceSidebar({
  sidebarOpen,
  setSidebarOpen,
  workspaceFiles,
  workspaceActivePath,
  setWorkspaceActivePath,
  workspaceLoading,
  workspaceError,
  openWorkspacePreview,
  openWorkspaceSession,
  pinnedPaths,
  togglePin,
  deleteWorkspaceEntry,
  createWorkspaceFile,
  refreshWorkspace,
  expandWorkspaceDirectory,
  activeSurfaceId,
  openNativeTab,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  workspaceFiles: string[];
  workspaceActivePath: string;
  setWorkspaceActivePath: (path: string) => void;
  workspaceLoading: boolean;
  workspaceError: string | null;
  openWorkspacePreview: (path: string) => void;
  openWorkspaceSession: (path: string, isDir: boolean) => Promise<void>;
  pinnedPaths: Map<string, boolean>;
  togglePin: (path: string, isDir: boolean) => void;
  deleteWorkspaceEntry: (path: string, isDir: boolean) => void;
  createWorkspaceFile: (rawPath: string) => string | void;
  refreshWorkspace: () => Promise<void>;
  expandWorkspaceDirectory?: (path: string) => void;
  activeSurfaceId: string | null;
  openNativeTab: (surfaceId: string) => void;
}) {
  // Feature-detected: null on gateways that never list the space — the
  // Private section then simply doesn't exist and no path is rewritten.
  const privateRoot = useMemo(() => resolvePrivateRoot(workspaceFiles), [workspaceFiles]);
  const displayFiles = useMemo(
    () => workspaceFiles.map((path) => toDisplayPath(path, privateRoot)),
    [workspaceFiles, privateRoot],
  );
  const displayPins = useMemo(() => {
    if (!privateRoot) return pinnedPaths;
    return new Map(
      [...pinnedPaths].map(([path, isDir]) => [toDisplayPath(path, privateRoot), isDir] as const),
    );
  }, [pinnedPaths, privateRoot]);
  const raw = (displayPath: string) => fromDisplayPath(displayPath, privateRoot);
  // Empty-space hint: the section has nothing to render as a tree node,
  // so say why it exists (visible only to you) instead of showing nothing.
  const showEmptyPrivateHint = privateRoot !== null && !hasPrivateEntries(displayFiles);
  // Raw workspace paths → display paths for the tree's text decoration slot
  // (pierre trees can't host the React PresenceDot inside the shadow host).
  const rawPresenceTitles = usePresenceTitleMap();
  const presenceTitles = useMemo(() => {
    if (rawPresenceTitles.size === 0) return undefined;
    const mapped = new Map<string, string>();
    for (const [path, title] of rawPresenceTitles) {
      mapped.set(toDisplayPath(path, privateRoot), title);
    }
    return mapped;
  }, [rawPresenceTitles, privateRoot]);

  return (
    <MobileDrawer
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      className="border-r bg-background md:bg-muted/20"
    >
      {workspaceError ? (
        <div className="p-3 text-xs text-destructive">{workspaceError}</div>
      ) : (
        <>
          <WorkspaceTree
            paths={displayFiles}
            activePath={toDisplayPath(workspaceActivePath, privateRoot)}
            onSelectFile={(path) => openWorkspacePreview(raw(path))}
            onSelectDirectory={(path) => setWorkspaceActivePath(raw(path))}
            onOpenInEditor={(path, isDir) => openWorkspaceSession(raw(path), isDir)}
            openInEditorTitle="Edit"
            pinnedPaths={displayPins}
            onTogglePin={(path, isDir) => togglePin(raw(path), isDir)}
            onDeletePath={(path, isDir) => deleteWorkspaceEntry(raw(path), isDir)}
            onCreateFile={(path) => createWorkspaceFile(raw(path))}
            onExpandDirectory={
              expandWorkspaceDirectory
                ? (path) => expandWorkspaceDirectory(raw(path))
                : undefined
            }
            onRefresh={() => void refreshWorkspace()}
            refreshing={workspaceLoading}
            presenceTitles={presenceTitles}
            title="Files"
            className="flex-1 min-h-0"
          />
          {showEmptyPrivateHint && (
            <div className="shrink-0 border-t px-3 py-1.5 text-[0.7rem] text-muted-foreground">
              <span className="font-medium">{PRIVATE_SECTION_LABEL}</span> — files here are
              visible only to you. Create one at{" "}
              <code className="font-mono">{PRIVATE_SECTION_LABEL}/&lt;name&gt;</code>.
            </div>
          )}
        </>
      )}
      <WorkspaceSurfaces activeSurfaceId={activeSurfaceId} onSelect={openNativeTab} />
    </MobileDrawer>
  );
}

/**
 * Workspace section: one row per native surface (Apps, Data, Agents, …),
 * each opening a `native://` content tab. Collapsible to its header; the
 * collapsed flag persists across reloads.
 */
function WorkspaceSurfaces({
  activeSurfaceId,
  onSelect,
}: {
  activeSurfaceId: string | null;
  onSelect: (surfaceId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(() => loadWorkspacePaneLayout().collapsed);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev: boolean) => {
      const next = !prev;
      saveWorkspacePaneLayout({ collapsed: next });
      return next;
    });
  }, []);

  return (
    <section className="shrink-0 border-t">
      <button
        type="button"
        onClick={toggleCollapsed}
        className="flex w-full items-center gap-1.5 px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
        title={collapsed ? "Expand workspace" : "Collapse workspace"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronDown className="h-3 w-3 shrink-0" />
        )}
        <span>Workspace</span>
      </button>
      {!collapsed && (
        <div className="space-y-0.5 px-2 pb-2">
          {NATIVE_SURFACES.map((surface) => (
            <button
              key={surface.id}
              type="button"
              onClick={() => onSelect(surface.id)}
              title={surface.description}
              className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left transition-colors ${
                surface.id === activeSurfaceId ? "bg-muted" : "hover:bg-muted/60"
              }`}
            >
              <surface.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate text-xs">{surface.title}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
