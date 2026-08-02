import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chat } from "@ai-sdk/react";
import type { ChatTransport, UIMessage } from "ai";
import { GATEWAY_BASE } from "@/lib/gateway";
import { runChatCompletionJob } from "@/lib/llm";
import type { NotificationAction } from "@/lib/notifications";
import { resetStore, setActiveVfsSession } from "@/lib/workspace-vfs";
import {
  changedFileCount,
  closeChatSession,
  createChatSession,
  deleteChatSession,
  fetchSessionMessages,
  getChatSession,
  listChatSessions,
  loadActiveSessionId,
  saveActiveSessionId,
  sessionWindowUrl,
  syncChatSession,
  updateChatSession,
  type ChatSessionInfo,
  type PresencePeer,
  type SessionMode,
} from "@/lib/chat-sessions";
import type { WorkspaceSyncState } from "@/lib/workspace-vfs";

// -------------------------------------------------------------------------
// Chat sessions (docs/vcs-and-sessions.md): each chat is a session — a
// persisted transcript plus a file view (base commit + optional staged
// overlay). The `Chat` instance is rebuilt per session; `useChat` follows
// whichever one is active, so switching sessions swaps the whole
// transcript without remounting the page.
// -------------------------------------------------------------------------

export function useSessionOrchestration(args: {
  transport: ChatTransport<UIMessage>;
  activeWorkspaceId: string | null;
  refreshWorkspace: () => Promise<void>;
  openWorkspacePreview: (path: string) => void;
  /** Seeds the chat composer (notification "debug workflow" action). */
  setInput: (value: string) => void;
  chatProviderRef: React.MutableRefObject<string>;
  chatModelRef: React.MutableRefObject<string>;
}) {
  const {
    transport,
    activeWorkspaceId,
    refreshWorkspace,
    openWorkspacePreview,
    setInput,
    chatProviderRef,
    chatModelRef,
  } = args;

  const [sessions, setSessions] = useState<ChatSessionInfo[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSessionInfo | null>(null);
  // Read inside callbacks that must see the current session without
  // re-arming (edit-draft flow, notification actions).
  const activeSessionRef = useRef<ChatSessionInfo | null>(null);
  activeSessionRef.current = activeSession;
  const [sessionChat, setSessionChat] = useState<Chat<UIMessage> | null>(null);
  const [sessionBusy, setSessionBusy] = useState(false);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);
  const [peers, setPeers] = useState<PresencePeer[]>([]);
  const [syncState, setSyncState] = useState<WorkspaceSyncState>({ pending: 0, online: true });
  // Sessions that were only ever lazily created but never chatted in don't
  // clutter history; guards double-creation while the first send is in flight
  // and one-shot naming per session.
  const pendingCreateRef = useRef(false);
  const namedSessionsRef = useRef<Set<string>>(new Set());
  // Files changed in two places — the plain-language resolution dialog.
  // `finalize: "apply"` continues into apply-to-workspace once resolved.
  const [mergeState, setMergeState] = useState<{
    conflicts: string[];
    finalize: "apply" | "none";
  } | null>(null);
  // How many transcript messages the gateway already has (append is an
  // upsert by message id, so overshooting is harmless).
  const lastPersistedCountRef = useRef(0);
  const bootChat = useMemo(() => new Chat<UIMessage>({ transport }), [transport]);

  const applySession = useCallback((session: ChatSessionInfo | null) => {
    setActiveSession(session);
    // Staged sessions (open for editing, closed for peeking) scope every FS
    // operation to the session overlay; auto sessions leave the VFS alone.
    setActiveVfsSession(
      session ? { id: session.id, staged: session.mode === "staged" } : null
    );
  }, []);

  const refreshSessions = useCallback(() => {
    listChatSessions()
      .then(setSessions)
      .catch(() => {
        // Sessions namespace unavailable (older gateway) — chat still works,
        // just unpersisted.
      });
  }, []);

  const openSession = useCallback(
    async (idOrInfo: string | ChatSessionInfo) => {
      const info =
        typeof idOrInfo === "string" ? await getChatSession(idOrInfo) : idOrInfo;
      const stored = (await fetchSessionMessages(info.id)) as UIMessage[];
      lastPersistedCountRef.current = stored.length;
      setSessionChat(new Chat<UIMessage>({ id: info.id, messages: stored, transport }));
      applySession(info);
      saveActiveSessionId(activeWorkspaceId, info.id);
      setSessionNotice(null);
    },
    [transport, applySession, activeWorkspaceId]
  );

  /**
   * The default resting place: no session record at all. The user is simply
   * in their workspace — changes sync directly, the chip shows sync status,
   * and a session record only comes into existence when they actually send
   * a message (see handleSubmit). Drafts are the explicit exception.
   */
  const enterMainState = useCallback(() => {
    setActiveSession(null);
    setActiveVfsSession(null);
    saveActiveSessionId(activeWorkspaceId, null);
    lastPersistedCountRef.current = 0;
    setSessionChat(new Chat<UIMessage>({ transport }));
  }, [transport, activeWorkspaceId]);

  const startSession = useCallback(
    async (mode: SessionMode) => {
      const created = await createChatSession({ mode });
      lastPersistedCountRef.current = 0;
      setSessionChat(new Chat<UIMessage>({ id: created.id, transport }));
      applySession(created);
      saveActiveSessionId(activeWorkspaceId, created.id);
      setSessionNotice(null);
      refreshSessions();
      return created;
    },
    [transport, applySession, activeWorkspaceId, refreshSessions]
  );

  /** Wrap a session mutation with the busy flag + error surfacing. */
  const runSessionAction = useCallback((action: () => Promise<void>) => {
    setSessionBusy(true);
    void action()
      .catch((err) => {
        setSessionNotice(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setSessionBusy(false));
  }, []);

  // Boot (and workspace switch): restore the remembered session — URL
  // `?session=` first for parallel windows — otherwise land in the main
  // state. No record is created until the user actually chats.
  useEffect(() => {
    if (!GATEWAY_BASE) return;
    let cancelled = false;
    void (async () => {
      try {
        const all = await listChatSessions();
        if (cancelled) return;
        setSessions(all);
        const storedId = loadActiveSessionId(activeWorkspaceId);
        const candidate = storedId ? all.find((s) => s.id === storedId) : undefined;
        if (candidate) await openSession(candidate);
        else enterMainState();
      } catch {
        // Sessions unavailable — leave the ephemeral chat in place.
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkspaceId]);

  const handleNewSession = useCallback(
    (mode: SessionMode) => {
      // A plain new chat is just the main state — no record until a message
      // is sent. Drafts are the explicit, record-backed exception.
      if (mode === "auto") {
        enterMainState();
        setSessionNotice(null);
        return;
      }
      runSessionAction(async () => void (await startSession(mode)));
    },
    [runSessionAction, startSession, enterMainState]
  );

  const handleSwitchSession = useCallback(
    (id: string) =>
      runSessionAction(async () => {
        await openSession(id);
      }),
    [runSessionAction, openSession]
  );

  /** Finish an apply: put the draft's changes into the workspace. */
  const finalizeApply = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        setMergeState(null);
        await closeChatSession(activeSession.id, { stage: true });
        setSessionNotice("Applied to your workspace.");
        enterMainState();
        refreshSessions();
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, startSession]
  );

  // Apply = refresh from the workspace first; if any file changed in both
  // places, the merge dialog asks one plain question per file before the
  // apply continues.
  const handleApplySession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const { session, conflicts } = await syncChatSession(activeSession.id);
        applySession(session);
        if (conflicts.length > 0) {
          setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "apply" });
          return;
        }
        await closeChatSession(session.id, { stage: true });
        setSessionNotice("Applied to your workspace.");
        enterMainState();
        refreshSessions();
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession, startSession]
  );

  const handleDiscardSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        await closeChatSession(activeSession.id);
        enterMainState();
        refreshSessions();
      }),
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleResetSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (activeSession && activeSession.status === "open") {
          await closeChatSession(activeSession.id);
        }
        enterMainState();
        refreshSessions();
      }),
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleDeleteSession = useCallback(
    (id: string) => {
      if (
        !window.confirm(
          "Delete this chat? Its conversation and any unapplied changes are gone for good."
        )
      )
        return;
      runSessionAction(async () => {
        await deleteChatSession(id);
        if (activeSession?.id === id) enterMainState();
        refreshSessions();
      });
    },
    [runSessionAction, activeSession, enterMainState, refreshSessions]
  );

  const handleSyncSession = useCallback(
    () =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const { session, conflicts } = await syncChatSession(activeSession.id);
        applySession(session);
        if (conflicts.length > 0) {
          setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "none" });
        } else {
          setSessionNotice("Up to date with your workspace.");
        }
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession]
  );

  // Merge-dialog completion: resolutions are already written into the draft;
  // either continue the apply or just refresh the summary.
  const handleMergeResolved = useCallback(() => {
    const finalize = mergeState?.finalize;
    setMergeState(null);
    if (finalize === "apply") {
      void finalizeApply();
    } else if (activeSession) {
      getChatSession(activeSession.id)
        .then((updated) => applySession(updated))
        .catch(() => {});
      setSessionNotice("Sorted — the draft now has your chosen versions.");
    }
  }, [mergeState, finalizeApply, activeSession, applySession]);

  /** Provider-bound completion runner for the merge dialog's AI combine. */
  const runMergeCompletion = useCallback(
    (messages: Parameters<typeof runChatCompletionJob>[1]["messages"]) =>
      runChatCompletionJob(chatProviderRef.current, {
        messages,
        ...(chatModelRef.current ? { model: chatModelRef.current } : {}),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSessionModeChange = useCallback(
    (mode: SessionMode) =>
      runSessionAction(async () => {
        if (!activeSession) return;
        const updated = await updateChatSession(activeSession.id, { mode });
        applySession(updated);
        resetStore();
        void refreshWorkspace();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, activeSession, applySession]
  );

  const handleOpenSessionWindow = useCallback(() => {
    if (activeSession) window.open(sessionWindowUrl(activeSession.id), "_blank");
  }, [activeSession]);

  /** Drawer "Review" buttons land here with a typed, client-known action. */
  const handleNotificationAction = useCallback(
    (action: NotificationAction) => {
      if (action.kind === "open-file") {
        void openWorkspacePreview(action.path);
        return;
      }
      if (action.kind === "debug-workflow") {
        // Seed the composer with a debugging prompt that points the agent at
        // the run's telemetry — one Send away from an AI investigation.
        setInput(
          `The workflow "${action.workflow}" failed (run ${action.runId}). ` +
            `Investigate with telemetry.query ${JSON.stringify({ runId: action.runId })} ` +
            `and workflows.trace ${JSON.stringify({ run: action.runId })}, explain the root cause` +
            (action.scriptPath ? `, and propose a fix to ${action.scriptPath}.` : "."),
        );
        return;
      }
      if (action.kind === "open-merge") {
        runSessionAction(async () => {
          if (activeSessionRef.current?.id !== action.sessionId) {
            await openSession(action.sessionId);
          }
          const { session, conflicts } = await syncChatSession(action.sessionId);
          applySession(session);
          if (conflicts.length > 0) {
            setMergeState({ conflicts: conflicts.map((c) => c.path), finalize: "none" });
          } else {
            setSessionNotice("Already sorted — no files need a decision.");
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [runSessionAction, openSession, applySession]
  );

  // History shows what the user actually did: chats with messages, plus
  // drafts that are open or still hold unapplied changes. Lazily-created
  // records that never got a message stay invisible.
  const visibleSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.messageCount > 0 ||
          (session.mode === "staged" &&
            (session.status === "open" || changedFileCount(session) > 0))
      ),
    [sessions]
  );

  // Closed/merged sessions are a peek surface: transcript and (for staged
  // sessions) their file view stay readable, but the conversation is over.
  const sessionReadOnly = activeSession !== null && activeSession.status !== "open";

  /** Workspace switch: drop the old workspace's session scope. */
  const resetForWorkspaceSwitch = useCallback(() => {
    // Chat-session state re-initializes via the boot effect once
    // activeWorkspaceId lands.
    setSessions([]);
    setActiveSession(null);
    setSessionChat(null);
    setActiveVfsSession(null);
  }, []);

  return {
    sessions,
    visibleSessions,
    activeSession,
    setActiveSession,
    activeSessionRef,
    sessionChat,
    bootChat,
    sessionBusy,
    sessionNotice,
    setSessionNotice,
    peers,
    setPeers,
    syncState,
    setSyncState,
    mergeState,
    setMergeState,
    pendingCreateRef,
    namedSessionsRef,
    lastPersistedCountRef,
    sessionReadOnly,
    applySession,
    refreshSessions,
    openSession,
    enterMainState,
    startSession,
    runSessionAction,
    handleNewSession,
    handleSwitchSession,
    handleApplySession,
    handleDiscardSession,
    handleResetSession,
    handleDeleteSession,
    handleSyncSession,
    handleMergeResolved,
    runMergeCompletion,
    handleSessionModeChange,
    handleOpenSessionWindow,
    handleNotificationAction,
    resetForWorkspaceSwitch,
  };
}
