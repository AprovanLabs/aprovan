import { MobileDrawer, WorkspaceTree } from "@aprovan/patchwork-editor";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { useMemo } from "react";
import { SidebarApps } from "@/components/SidebarApps";
import {
  fromDisplayPath,
  hasPrivateEntries,
  resolvePrivateRoot,
  toDisplayPath,
  PRIVATE_SECTION_LABEL,
} from "@/lib/private-partition";

/**
 * The workspace explorer column: file tree + the Workspace/Apps sub-explorer,
 * wrapped in the same off-canvas drawer recipe the full-view editor's file
 * tree uses — hidden by default behind the header's toggle below md, a static
 * column at md+.
 *
 * The caller's own private partition (`.personal/data/<self>` — the gateway
 * only ever lists the caller's own; see lib/private-partition.ts) renders as
 * a top-level **Private** section. Translation is display-only and happens
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
  activeAppsSelection,
  openAppsTab,
  createWorkflowInChat,
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
  activeAppsSelection: AppsSelection | null;
  openAppsTab: (selection: AppsSelection | null) => void;
  createWorkflowInChat: (appName?: string) => void;
  activeSurfaceId: string | null;
  openNativeTab: (surfaceId: string) => void;
}) {
  // Feature-detected: null on gateways that never list the partition — the
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
  // Empty-partition hint: the section has nothing to render as a tree node,
  // so say why it exists (visible only to you) instead of showing nothing.
  const showEmptyPrivateHint = privateRoot !== null && !hasPrivateEntries(displayFiles);

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
            onRefresh={() => void refreshWorkspace()}
            refreshing={workspaceLoading}
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
      {/* Second explorer: the Workspace section — native surfaces
          first, then the Apps sub-group of workflows they export. It
          owns its own height (drag handle + collapse, persisted) so the
          tree above it keeps the remainder instead of the two lists
          fighting for one scroll. */}
      <SidebarApps
        selection={activeAppsSelection}
        onSelectionChange={openAppsTab}
        onOpenScript={(path) => {
          setSidebarOpen(false);
          openWorkspacePreview(path);
        }}
        onCreateWorkflow={createWorkflowInChat}
        activeSurfaceId={activeSurfaceId}
        onSelectSurface={openNativeTab}
      />
    </MobileDrawer>
  );
}
