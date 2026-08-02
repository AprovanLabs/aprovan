import { useCallback, useRef, useState } from "react";
import type { VirtualProject } from "@aprovan/patchwork-compiler";
import { GATEWAY_BASE } from "@/lib/gateway";
import { publishNotification } from "@/lib/notifications";
import {
  closeChatSession,
  createChatSession,
  deleteChatSession,
  syncChatSession,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import {
  createSingleWorkspaceFileProject,
  loadWorkspaceDirectoryProject,
  loadWorkspaceFileProject,
  resetStore,
  setActiveVfsSession,
} from "@/lib/workspace-vfs";

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

// -------------------------------------------------------------------------
// Editor ↔ VCS: the edit window works in a draft by default. Saves land in
// the draft's overlay; the workspace only changes when the editor closes
// with saved work (applied as one commit), or later if the user keeps it
// as a draft. Nothing saved → the draft is deleted after EditModal's own
// unsaved-changes confirm. When the active chat is already an open draft,
// that draft simply owns the edits — no extra machinery.
// -------------------------------------------------------------------------

export function useEditDraft(args: {
  activeSessionRef: React.MutableRefObject<ChatSessionInfo | null>;
  refreshSessions: () => void;
  setSessionNotice: (notice: string | null) => void;
  refreshWorkspace: () => Promise<void>;
  setWorkspaceActivePath: (path: string) => void;
  closeSidebar: () => void;
}) {
  const {
    activeSessionRef,
    refreshSessions,
    setSessionNotice,
    refreshWorkspace,
    setWorkspaceActivePath,
    closeSidebar,
  } = args;

  const [editSession, setEditSession] = useState<EditSessionState | null>(null);
  // The editor window's VCS scope: every editor save lands in this draft
  // instead of the workspace; closing the editor decides its fate (apply,
  // keep as draft, or delete when nothing was ever saved). Null while the
  // active chat is itself a draft — that draft owns the edits.
  const [editDraft, setEditDraft] = useState<ChatSessionInfo | null>(null);
  const editDraftSavedRef = useRef(false);
  // Read inside the editor-draft callbacks; activeSessionRef (owned by the
  // session orchestration hook) stays current the same way.
  const editDraftRef = useRef<ChatSessionInfo | null>(null);
  editDraftRef.current = editDraft;
  const [keepEditDrafts, setKeepEditDrafts] = useState<boolean>(
    () => localStorage.getItem(EDIT_KEEP_DRAFT_KEY) === "1"
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

  const beginEditDraft = useCallback(
    async (label: string) => {
      if (!GATEWAY_BASE) return;
      const active = activeSessionRef.current;
      if (active && active.mode === "staged" && active.status === "open") return;
      try {
        const draft = await createChatSession({
          mode: "staged",
          title: `Edit: ${label}`.slice(0, 60),
        });
        editDraftSavedRef.current = false;
        setEditDraft(draft);
        setActiveVfsSession({ id: draft.id, staged: true });
      } catch {
        // No draft support (old gateway / offline) — edits write through,
        // exactly the pre-draft behaviour.
      }
    },
    [activeSessionRef]
  );

  const finishEditDraft = useCallback(async () => {
    const draft = editDraftRef.current;
    setEditDraft(null);
    // Back to the chat's own scope whatever happens next.
    const active = activeSessionRef.current;
    setActiveVfsSession(
      active ? { id: active.id, staged: active.mode === "staged" } : null
    );
    if (!draft) return;
    try {
      if (!editDraftSavedRef.current) {
        // Never saved — the draft is an empty husk (EditModal already
        // confirmed any unsaved buffer with the user).
        await deleteChatSession(draft.id);
        refreshSessions();
        return;
      }
      if (localStorage.getItem(EDIT_KEEP_DRAFT_KEY) === "1") {
        setSessionNotice(`Saved as a draft — open Chats to apply “${draft.title}”.`);
        publishNotification({
          category: "warning",
          title: `Editor changes kept as a draft`,
          body: `“${draft.title}” holds your saved editor work — apply it from Chats when ready.`,
          link: { kind: "open-merge", sessionId: draft.id },
        });
        refreshSessions();
        return;
      }
      // Apply, but never clobber: if the workspace moved under the edited
      // files, keep the draft for review instead of guessing.
      const { conflicts } = await syncChatSession(draft.id);
      if (conflicts.length > 0) {
        setSessionNotice(
          `Your workspace changed while you were editing — “${draft.title}” is kept as a draft so you can review before applying (open Chats).`
        );
        publishNotification({
          category: "decision",
          title: "Editor changes need a decision",
          body: `Your workspace changed while you were editing — “${draft.title}” is kept as a draft.`,
          widget: {
            path: "builtin:merge-conflict",
            data: { sessionTitle: draft.title, conflicts: conflicts.map((c) => ({ path: c.path })) },
          },
          choices: [
            {
              label: "Keep the draft's versions",
              description: "The editor's files replace the workspace's and everything applies",
              call: {
                namespace: "sessions",
                procedure: "resolve",
                args: { id: draft.id, strategy: "keep-draft" },
              },
            },
            {
              label: "Keep the workspace versions",
              description: "The draft lets the conflicted files go and the rest applies",
              call: {
                namespace: "sessions",
                procedure: "resolve",
                args: { id: draft.id, strategy: "keep-workspace" },
              },
            },
          ],
          link: { kind: "open-merge", sessionId: draft.id },
        });
        refreshSessions();
        return;
      }
      await closeChatSession(draft.id, { stage: true, message: draft.title });
      setSessionNotice("Applied to your workspace.");
      publishNotification({
        category: "activity",
        title: "Editor changes applied to your workspace",
        body: `“${draft.title}” was applied as one change set.`,
      });
      refreshSessions();
      resetStore();
      void refreshWorkspace();
    } catch {
      setSessionNotice(
        "Couldn't finish the editor draft — it's kept in Chats with your saved changes."
      );
      refreshSessions();
    }
  }, [activeSessionRef, refreshSessions, setSessionNotice, refreshWorkspace]);

  const openSharedEditSession = useCallback(
    async (session: {
      projectId: string;
      entryFile: string;
      filePath?: string;
      initialCode: string;
      initialProject: VirtualProject;
    }) => {
      const { projectId, filePath, entryFile, initialCode, initialProject } = session;
      await beginEditDraft(projectId || entryFile);
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
    [beginEditDraft, setWorkspaceActivePath]
  );

  const openWorkspaceSession = useCallback(
    async (path: string, isDir: boolean) => {
      await beginEditDraft(path);
      const project = isDir
        ? await loadWorkspaceDirectoryProject(path)
        : await loadWorkspaceFileProject(path);
      if (!project) {
        void finishEditDraft();
        return;
      }

      setWorkspaceActivePath(path);
      closeSidebar();
      setEditSession({
        project,
        initialTreePath: project.entry,
        initialActiveFile: project.entry,
        workspacePath: isDir ? `${path}/${project.entry}` : path,
      });
    },
    [beginEditDraft, finishEditDraft, setWorkspaceActivePath, closeSidebar]
  );

  return {
    editSession,
    setEditSession,
    editDraftSavedRef,
    keepEditDrafts,
    handleKeepEditDraftsChange,
    beginEditDraft,
    finishEditDraft,
    openSharedEditSession,
    openWorkspaceSession,
  };
}
