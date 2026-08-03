import { useCallback, useState } from "react";
import type { VirtualProject } from "@aprovan/patchwork-compiler";
import {
  createSingleWorkspaceFileProject,
  loadWorkspaceDirectoryProject,
  loadWorkspaceFileProject,
  setActiveVfsSession,
} from "@/lib/workspace-vfs";
import type { ChatSessionInfo } from "@/lib/chat-sessions";

/** "1" = closing the editor keeps its changes as a draft instead of applying. */
export const EDIT_KEEP_DRAFT_KEY = "patchwork:edit-keep-draft";

export function toProjectRelativePath(projectId: string, path: string): string {
  const normalizedProjectId = projectId.replace(/^\/+|\/+$/g, "");
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  if (!normalizedProjectId) return normalizedPath;
  const prefix = `${normalizedProjectId}/`;
  if (normalizedPath.startsWith(prefix)) {
    return normalizedPath.slice(prefix.length);
  }
  return normalizedPath;
}

export interface EditSessionState {
  project: VirtualProject;
  initialTreePath?: string;
  initialActiveFile?: string;
  /** Workspace path of the opened file — telemetry/logs attribution. */
  workspacePath?: string;
}

/**
 * EditModal session open/close. Opening a file never mints a chat session —
 * staged drafts are created lazily on first save via write-policy hooks.
 */
export function useEditDraft(args: {
  activeSessionRef: React.MutableRefObject<ChatSessionInfo | null>;
  refreshSessions: () => void;
  setSessionNotice: (notice: string | null) => void;
  refreshWorkspace: () => Promise<void>;
  setWorkspaceActivePath: (path: string) => void;
  closeSidebar: () => void;
}) {
  const { activeSessionRef, setWorkspaceActivePath, closeSidebar } = args;
  // refreshSessions / setSessionNotice / refreshWorkspace retained on the
  // args shape for call-site stability; draft apply/conflict lives in hooks.

  const [editSession, setEditSession] = useState<EditSessionState | null>(null);
  const [keepEditDrafts, setKeepEditDrafts] = useState<boolean>(
    () => localStorage.getItem(EDIT_KEEP_DRAFT_KEY) === "1",
  );

  const handleKeepEditDraftsChange = useCallback((keep: boolean) => {
    setKeepEditDrafts(keep);
    try {
      if (keep) localStorage.setItem(EDIT_KEEP_DRAFT_KEY, "1");
      else localStorage.removeItem(EDIT_KEEP_DRAFT_KEY);
    } catch {
      // Preference persistence is best-effort.
    }
  }, []);

  /** Close the modal and restore VFS scope to the active chat (if any). */
  const closeEditSession = useCallback(() => {
    setEditSession(null);
    const active = activeSessionRef.current;
    setActiveVfsSession(
      active ? { id: active.id, staged: active.mode === "staged" } : null,
    );
  }, [activeSessionRef]);

  const openSharedEditSession = useCallback(
    async (session: {
      projectId: string;
      entryFile: string;
      filePath?: string;
      initialCode: string;
      initialProject: VirtualProject;
    }) => {
      const { projectId, filePath, entryFile, initialCode, initialProject } = session;
      const directoryProject = await loadWorkspaceDirectoryProject(projectId);
      const filePathKey = filePath ?? `${projectId}/${entryFile}`;

      if (directoryProject) {
        const relativePath = toProjectRelativePath(projectId, filePathKey);
        setWorkspaceActivePath(filePathKey);
        setEditSession({
          project: directoryProject,
          initialTreePath: relativePath,
          initialActiveFile: relativePath,
          workspacePath: filePathKey,
        });
        return;
      }

      const fallbackFilePath = filePathKey;
      const fallbackProject = filePath
        ? createSingleWorkspaceFileProject(filePath, initialCode)
        : initialProject;
      setWorkspaceActivePath(fallbackFilePath);
      setEditSession({
        project: fallbackProject,
        initialTreePath: fallbackProject.entry,
        initialActiveFile: fallbackProject.entry,
        workspacePath: fallbackFilePath,
      });
    },
    [setWorkspaceActivePath],
  );

  const openWorkspaceSession = useCallback(
    async (path: string, isDir: boolean) => {
      const project = isDir
        ? await loadWorkspaceDirectoryProject(path)
        : await loadWorkspaceFileProject(path);
      if (!project) return;

      setWorkspaceActivePath(path);
      closeSidebar();
      setEditSession({
        project,
        initialTreePath: project.entry,
        initialActiveFile: project.entry,
        workspacePath: isDir ? `${path}/${project.entry}` : path,
      });
    },
    [setWorkspaceActivePath, closeSidebar],
  );

  return {
    editSession,
    setEditSession,
    keepEditDrafts,
    handleKeepEditDraftsChange,
    closeEditSession,
    openSharedEditSession,
    openWorkspaceSession,
  };
}
