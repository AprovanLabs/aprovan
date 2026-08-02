import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { GATEWAY_BASE } from "@/lib/gateway";
import { publishNotification } from "@/lib/notifications";
import {
  heartbeatPresence,
  syncChatSession,
  type ChatSessionInfo,
  type PresencePeer,
} from "@/lib/chat-sessions";
import {
  startLiveWorkspaceSync,
  subscribeToSyncState,
  type WorkspaceSyncState,
} from "@/lib/workspace-vfs";

/**
 * Background sync loops around the active session: draft auto-sync with
 * conflict notifications, the presence heartbeat, live workspace file sync,
 * and the sync-state chip subscription.
 */
export function useDraftSync(args: {
  activeSession: ChatSessionInfo | null;
  setActiveSession: Dispatch<SetStateAction<ChatSessionInfo | null>>;
  /** The edit window settles its own draft on close — auto-sync pauses while it's open. */
  editSessionOpen: boolean;
  setPeers: (peers: PresencePeer[]) => void;
  setSyncState: (state: WorkspaceSyncState) => void;
}) {
  const { activeSession, setActiveSession, editSessionOpen, setPeers, setSyncState } = args;

  // Draft auto-sync: while a draft chat is open (and the editor isn't), keep
  // its base current with the workspace. Conflicts never interrupt — they
  // become a notification whose Review opens the merge dialog.
  const notifiedConflictsRef = useRef<string>("");
  useEffect(() => {
    if (!activeSession || activeSession.mode !== "staged" || activeSession.status !== "open")
      return;
    if (editSessionOpen) return; // The edit window settles its own draft on close.
    const id = activeSession.id;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      syncChatSession(id)
        .then(({ session, conflicts }) => {
          setActiveSession((prev) => (prev && prev.id === session.id ? session : prev));
          if (conflicts.length === 0) {
            notifiedConflictsRef.current = "";
            return;
          }
          const signature = conflicts.map((c) => c.path).sort().join("|");
          if (notifiedConflictsRef.current === signature) return;
          notifiedConflictsRef.current = signature;
          publishNotification({
            category: "decision",
            title: "Some files changed in two places",
            body: `Your workspace and the draft “${session.title}” both changed ${
              conflicts.length === 1 ? "a file" : `${conflicts.length} files`
            }.`,
            widget: {
              path: "builtin:merge-conflict",
              data: {
                sessionTitle: session.title,
                conflicts: conflicts.map((c) => ({ path: c.path })),
              },
            },
            choices: [
              {
                label: "Keep the draft's versions",
                description: "The draft's files replace the workspace's and everything applies",
                call: {
                  namespace: "sessions",
                  procedure: "resolve",
                  args: { id, strategy: "keep-draft" },
                },
              },
              {
                label: "Keep the workspace versions",
                description: "The draft lets the conflicted files go and the rest applies",
                call: {
                  namespace: "sessions",
                  procedure: "resolve",
                  args: { id, strategy: "keep-workspace" },
                },
              },
            ],
            link: { kind: "open-merge", sessionId: id },
          });
        })
        .catch(() => {});
    }, 20_000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id, activeSession?.mode, activeSession?.status, editSessionOpen]);

  // Presence: heartbeat this window every 10s (while visible) and surface
  // who else is here — the backend-facilitated half of live collaboration.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    let cancelled = false;
    const beat = (): void => {
      if (document.visibilityState !== "visible") return;
      heartbeatPresence({
        sessionId: activeSession?.id,
        title: activeSession?.title,
        mode: activeSession?.mode,
      })
        .then((live) => {
          if (!cancelled) setPeers(live);
        })
        .catch(() => {});
    };
    beat();
    const timer = setInterval(beat, 10_000);
    document.addEventListener("visibilitychange", beat);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", beat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession?.id, activeSession?.title, activeSession?.mode]);

  // Live file sync: poll the gateway listing and fire the ordinary watchers
  // when anything changed anywhere — other windows and collaborators show up
  // without a reload.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    return startLiveWorkspaceSync();
  }, []);

  // The chip's sync signal — "Synced" / "Syncing…" / "Offline".
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => subscribeToSyncState(setSyncState), []);
}
