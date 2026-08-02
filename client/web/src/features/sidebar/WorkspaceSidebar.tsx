import { MobileDrawer, WorkspaceTree } from "@aprovan/patchwork-editor";
import type { AppsSelection } from "@aprovan/registry-ui/apps-panel";
import { SidebarApps } from "@/components/SidebarApps";

/**
 * The workspace explorer column: file tree + the Workspace/Apps sub-explorer,
 * wrapped in the same off-canvas drawer recipe the full-view editor's file
 * tree uses — hidden by default behind the header's toggle below md, a static
 * column at md+.
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
  return (
    <MobileDrawer
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      className="border-r bg-background md:bg-muted/20"
    >
      {workspaceError ? (
        <div className="p-3 text-xs text-destructive">{workspaceError}</div>
      ) : (
        <WorkspaceTree
          paths={workspaceFiles}
          activePath={workspaceActivePath}
          onSelectFile={openWorkspacePreview}
          onSelectDirectory={setWorkspaceActivePath}
          onOpenInEditor={openWorkspaceSession}
          openInEditorTitle="Edit"
          pinnedPaths={pinnedPaths}
          onTogglePin={togglePin}
          onDeletePath={deleteWorkspaceEntry}
          onCreateFile={createWorkspaceFile}
          onRefresh={() => void refreshWorkspace()}
          refreshing={workspaceLoading}
          title="Files"
          className="flex-1 min-h-0"
        />
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
