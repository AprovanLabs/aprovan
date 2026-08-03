import { useCallback, useRef, useState } from "react";
import {
  changedFileCount,
  closeChatSession,
  createChatSession,
  deleteChatSession,
  syncChatSession,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import { setActiveVfsSession, writeFile } from "@/lib/workspace-vfs";
import { publishConflictNotification } from "@/features/sessions/conflict-notify";

export type DraftState =
  | { kind: "none" } // no saves yet
  | { kind: "active"; session: ChatSessionInfo; changedFiles: number }
  | { kind: "error"; message: string; retry: () => void };

/**
 * Lazy staged-session draft: no session on mount; first `save()` creates it,
 * scopes VFS, then writes. Draft-creation failure never write-throughs.
 */
export function useLazyDraft(target: { path: string; label: string }): {
  state: DraftState;
  /** Creates the draft on first call, scopes VFS to it, then writes. */
  save(path: string, content: string): Promise<void>;
  apply(): Promise<{ conflicts: string[] }>; // [] ⇒ applied & closed
  discard(): Promise<void>;
} {
  const [state, setState] = useState<DraftState>({ kind: "none" });
  const sessionRef = useRef<ChatSessionInfo | null>(null);
  const targetRef = useRef(target);
  targetRef.current = target;
  const creatingRef = useRef(false);

  const activate = useCallback((session: ChatSessionInfo) => {
    sessionRef.current = session;
    setActiveVfsSession({ id: session.id, staged: true });
    setState({
      kind: "active",
      session,
      changedFiles: changedFileCount(session),
    });
  }, []);

  const save = useCallback(
    async (path: string, content: string) => {
      let session = sessionRef.current;
      if (!session) {
        if (creatingRef.current) {
          throw new Error("Draft creation already in progress");
        }
        creatingRef.current = true;
        try {
          session = await createChatSession({
            mode: "staged",
            title: `Edit: ${targetRef.current.label}`.slice(0, 60),
          });
          activate(session);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Couldn't create a draft session";
          const retry = () => {
            void save(path, content);
          };
          setState({ kind: "error", message, retry });
          // Never write through to a staged target without a draft.
          return;
        } finally {
          creatingRef.current = false;
        }
      }

      try {
        await writeFile(path, content);
        // Refresh change count from the last known session shape; a full
        // sync is the apply path's job.
        setState({
          kind: "active",
          session,
          changedFiles: Math.max(1, changedFileCount(session)),
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Save failed";
        const retry = () => {
          void save(path, content);
        };
        setState({ kind: "error", message, retry });
      }
    },
    [activate],
  );

  const apply = useCallback(async (): Promise<{ conflicts: string[] }> => {
    const draft = sessionRef.current;
    if (!draft) return { conflicts: [] };

    try {
      const { session, conflicts } = await syncChatSession(draft.id);
      if (conflicts.length > 0) {
        activate(session);
        publishConflictNotification({
          sessionId: draft.id,
          sessionTitle: draft.title,
          conflicts: conflicts.map((c) => ({ path: c.path })),
          origin: "draft-apply",
        });
        return { conflicts: conflicts.map((c) => c.path) };
      }
      await closeChatSession(draft.id, { stage: true, message: draft.title });
      sessionRef.current = null;
      setActiveVfsSession(null);
      setState({ kind: "none" });
      return { conflicts: [] };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Couldn't apply draft";
      setState({
        kind: "error",
        message,
        retry: () => {
          void apply();
        },
      });
      return { conflicts: [] };
    }
  }, [activate]);

  const discard = useCallback(async () => {
    const draft = sessionRef.current;
    sessionRef.current = null;
    setActiveVfsSession(null);
    setState({ kind: "none" });
    if (!draft) return;
    try {
      await deleteChatSession(draft.id);
    } catch {
      // Best-effort delete; local state is already cleared.
    }
  }, []);

  return { state, save, apply, discard };
}
