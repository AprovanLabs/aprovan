import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { resolvePatchesInText } from "@aprovan/editor";
import {
  AlertCircle,
  Check,
  FileDiff,
  Loader2,
  MessageSquare,
  Pin,
  PinOff,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import type { UIMessage } from "ai";
import { ChangeList } from "@/components/ChangeList";
import { MergeDialog } from "@/components/MergeDialog";
import { ProviderModelControls } from "@/components/ProviderPicker";
import {
  SpeechSettingsButton,
  useSelectedSttModel,
} from "@/components/SpeechSettings";
import { SessionBar } from "@/components/SessionBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { publishConflictNotification } from "@/features/sessions/conflict-notify";
import {
  changedFileCount,
  getChatSession,
  relativeTime,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import { fetchLlmModels } from "@/lib/llm";
import { invokeNamespaceTool } from "@/lib/tools";
import type { useSessionOrchestration } from "@/features/sessions/useSessionOrchestration";
import { Badge } from "@/components/ui/badge";
import { ChatComposer } from "./ChatComposer";
import { fileLabel } from "./chat-file-context";
import { APROVAN_LOGO, MessageBubble } from "./MessageParts";
import type { useChatProviders } from "./useChatSubmit";
import { useVoiceCapture } from "./useVoiceCapture";
import {
  VoiceCaptureControls,
  VoiceDestinationBanner,
  VoiceStatusBanners,
} from "./VoiceComposerControls";

// ---------------------------------------------------------------------------
// Chat side-dock layout
//
// With a content tab open, chat is an opt-in right-side panel (bottom sheet
// on mobile). Width is drag-resizable and persisted. Without a content tab,
// chat fills the main column as the workspace-wide conversation surface.
// ---------------------------------------------------------------------------

const CHAT_PANEL_KEY = "patchwork:chat-panel-v2";
const DEFAULT_CHAT_SPLIT_WIDTH = 400;
const MIN_CHAT_WIDTH = 280;
/** Pixels of the file pane that must survive any drag. */
const MIN_PREVIEW_WIDTH = 280;

export interface ChatPanelLayout {
  open: boolean;
  splitWidth: number;
}

function loadChatPanelLayout(): ChatPanelLayout {
  try {
    const raw = localStorage.getItem(CHAT_PANEL_KEY);
    if (!raw) {
      // Migrate the old bottom-dock key once if present.
      const legacy = localStorage.getItem("patchwork:chat-panel");
      if (legacy) {
        const parsed = JSON.parse(legacy) as { expanded?: boolean; splitHeight?: number };
        return {
          open: parsed.expanded === true,
          splitWidth: DEFAULT_CHAT_SPLIT_WIDTH,
        };
      }
      return { open: false, splitWidth: DEFAULT_CHAT_SPLIT_WIDTH };
    }
    const parsed = JSON.parse(raw) as Partial<ChatPanelLayout>;
    return {
      open: parsed.open === true,
      splitWidth:
        typeof parsed.splitWidth === "number" && parsed.splitWidth >= MIN_CHAT_WIDTH
          ? parsed.splitWidth
          : DEFAULT_CHAT_SPLIT_WIDTH,
    };
  } catch {
    return { open: false, splitWidth: DEFAULT_CHAT_SPLIT_WIDTH };
  }
}

export function saveChatPanelLayout(layout: ChatPanelLayout) {
  try {
    localStorage.setItem(CHAT_PANEL_KEY, JSON.stringify(layout));
  } catch {
    // Private-mode / quota: the layout is a nicety, never a failure mode.
  }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

/**
 * Side-dock open/width state + horizontal drag. `getSplitRowWidth` must
 * measure the full content+chat row (from ChatPage's `splitRowRef`), not the
 * dock's own width-constrained wrapper.
 */
export function useChatPanelLayout(getSplitRowWidth: () => number) {
  const [chatPanel, setChatPanel] = useState<ChatPanelLayout>(() => loadChatPanelLayout());
  const [chatDragging, setChatDragging] = useState(false);
  const chatDockRef = useRef<HTMLDivElement>(null);
  const chatWidthRef = useRef(chatPanel.splitWidth);
  chatWidthRef.current = chatPanel.splitWidth;

  const openChat = useCallback(() => {
    setChatPanel((prev) => {
      if (prev.open) return prev;
      const next = { ...prev, open: true };
      saveChatPanelLayout(next);
      return next;
    });
  }, []);

  const closeChat = useCallback(() => {
    setChatPanel((prev) => {
      if (!prev.open) return prev;
      const next = { ...prev, open: false };
      saveChatPanelLayout(next);
      return next;
    });
  }, []);

  const toggleChatOpen = useCallback(() => {
    setChatPanel((prev) => {
      const next = { ...prev, open: !prev.open };
      saveChatPanelLayout(next);
      return next;
    });
  }, []);

  /** Upper bound for the chat dock: whatever leaves the file pane usable. */
  const maxChatWidth = useCallback(() => {
    return Math.max(MIN_CHAT_WIDTH, getSplitRowWidth() - MIN_PREVIEW_WIDTH);
  }, [getSplitRowWidth]);

  const resizeChatBy = useCallback(
    (delta: number) => {
      setChatPanel((prev) => {
        const next = {
          ...prev,
          splitWidth: clamp(prev.splitWidth + delta, MIN_CHAT_WIDTH, maxChatWidth()),
        };
        saveChatPanelLayout(next);
        return next;
      });
    },
    [maxChatWidth]
  );

  const startChatDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!chatPanel.open) return;
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = chatWidthRef.current;
      const max = maxChatWidth();
      setChatDragging(true);

      // Dragging left grows the chat dock (anchored to the right).
      const onMove = (moveEvent: PointerEvent) => {
        setChatPanel((prev) => ({
          ...prev,
          splitWidth: clamp(startWidth + (startX - moveEvent.clientX), MIN_CHAT_WIDTH, max),
        }));
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        setChatDragging(false);
        saveChatPanelLayout({ open: true, splitWidth: chatWidthRef.current });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [chatPanel.open, maxChatWidth]
  );

  return {
    chatPanel,
    setChatPanel,
    chatDragging,
    chatDockRef,
    openChat,
    closeChat,
    toggleChatOpen,
    resizeChatBy,
    startChatDrag,
  };
}

export type ChatDockLayoutApi = ReturnType<typeof useChatPanelLayout>;

/** Proposed / recent changes review block for draft and auto chats. */
function ProposedChangesReview({
  session,
  busy,
  onApply,
  onDismiss,
  onOpenFile,
  onUndoChanges,
}: {
  session: ChatSessionInfo;
  busy: boolean;
  onApply: () => void;
  onDismiss: () => void;
  onOpenFile: (path: string) => void;
  onUndoChanges?: () => void;
}) {
  const count = changedFileCount(session);
  if (session.status !== "open" || count === 0 || !session.changes) return null;

  const isDraft = session.mode === "staged";
  const includesOther = session.changes.includesOtherActivity === true;

  return (
    <div
      className={`shrink-0 border-b px-3 py-2 space-y-2 ${
        isDraft ? "bg-violet-500/5" : "bg-muted/20"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-xs font-medium ${
          isDraft
            ? "text-violet-800 dark:text-violet-300"
            : "text-muted-foreground"
        }`}
      >
        <FileDiff className="h-3.5 w-3.5 shrink-0" />
        <span>
          {isDraft ? "Proposed changes" : "Changed"} — {count} file
          {count === 1 ? "" : "s"}
        </span>
        <span className="ml-auto flex items-center gap-1">
          {isDraft ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs"
                disabled={busy}
                onClick={onDismiss}
                title="Drop these proposed changes"
              >
                Dismiss
              </Button>
              <Button
                size="sm"
                className="h-6 px-2 text-xs gap-1"
                disabled={busy}
                onClick={onApply}
                title="Apply proposed changes to your workspace"
              >
                <Check className="h-3 w-3" /> Apply
              </Button>
            </>
          ) : (
            onUndoChanges && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs gap-1"
                disabled={busy}
                onClick={onUndoChanges}
                title="Put these files back the way they were when this chat started"
              >
                <RotateCcw className="h-3 w-3" /> Undo these changes
              </Button>
            )
          )}
        </span>
      </div>
      {includesOther && (
        <p className="text-[11px] text-muted-foreground">
          All changes since this chat started (may include other activity)
        </p>
      )}
      <div className="max-h-28 overflow-y-auto">
        <ChangeList changes={session.changes} onOpen={onOpenFile} collapseAfter={8} />
      </div>
    </div>
  );
}

/**
 * The chat dock: session bar, merge dialog, message list, and composer.
 * Side panel when a file pane is open; full-height conversation otherwise.
 */
export function ChatDock({
  hasContentTab,
  layout,
  filePath,
  onClose,
  session,
  providers,
  messages,
  status,
  error,
  compilerError,
  input,
  setInput,
  handleSubmit,
  openWorkspacePreview,
  onOpenCredentials,
  workspacePaths,
  pinnedPaths,
  onTogglePin,
  onUnpin,
  isPinned,
}: {
  hasContentTab: boolean;
  layout: ChatDockLayoutApi;
  /** Active workspace file the dock is scoped to, if any. */
  filePath?: string | null;
  workspacePaths: string[];
  pinnedPaths: string[];
  onTogglePin: (path: string) => void;
  onUnpin: (path: string) => void;
  isPinned: (path: string) => boolean;
  onClose?: () => void;
  session: ReturnType<typeof useSessionOrchestration>;
  providers: ReturnType<typeof useChatProviders>;
  messages: UIMessage[];
  status: string;
  error: Error | undefined;
  compilerError: string | null;
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  openWorkspacePreview: (path: string) => void;
  onOpenCredentials?: (provider?: string) => void;
}) {
  const { chatDragging, chatDockRef, resizeChatBy, startChatDrag } = layout;
  const scrollRef = useRef<HTMLDivElement>(null);
  const notifiedConflictRef = useRef<string | null>(null);
  const inputBeforeVoiceRef = useRef("");
  const { selectedModel, setSelectedModel } = useSelectedSttModel();

  const isLoading = status === "submitted" || status === "streaming";
  const sideMode = hasContentTab;

  const voice = useVoiceCapture({
    model: selectedModel,
    disabled: isLoading || session.sessionReadOnly,
    onPartial: (text) => {
      setInput(text);
    },
    onFinal: (text) => {
      setInput(text);
    },
    onDiscard: () => {
      setInput(inputBeforeVoiceRef.current);
    },
  });

  const voiceStartRef = useRef(voice.start);
  voiceStartRef.current = voice.start;

  const startVoice = useCallback(async () => {
    inputBeforeVoiceRef.current = input;
    await voiceStartRef.current();
  }, [input]);

  // Fold diff-based widget edits: `patch` fences are applied against the
  // sources accumulated across the conversation and rewritten into full
  // files, so rendering (and the editor) never sees a diff.
  const resolvedMessages = useMemo(() => {
    const sources = new Map<string, string>();
    return messages.map((message) => {
      if (message.role !== "assistant" || !message.parts) return message;
      return {
        ...message,
        parts: message.parts.map((part) =>
          part.type === "text" ? { ...part, text: resolvePatchesInText(part.text, sources) } : part
        ),
      } as typeof message;
    });
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Proposal-apply conflicts → single notification helper (origin chat-proposal).
  useEffect(() => {
    const merge = session.mergeState;
    const active = session.activeSession;
    if (!merge || merge.finalize !== "apply" || !active || merge.conflicts.length === 0) {
      return;
    }
    const key = `${active.id}:${merge.conflicts.join("\0")}`;
    if (notifiedConflictRef.current === key) return;
    notifiedConflictRef.current = key;
    publishConflictNotification({
      sessionId: active.id,
      sessionTitle: active.title,
      conflicts: merge.conflicts.map((path) => ({ path })),
      origin: "chat-proposal",
    });
  }, [session.mergeState, session.activeSession]);

  const handleApplyProposal = useCallback(() => {
    session.handleApplySession();
  }, [session]);

  const handleUndoChanges = useCallback(() => {
    const active = session.activeSession;
    if (!active?.changes || active.mode !== "auto") return;
    const paths = [
      ...active.changes.added,
      ...active.changes.modified,
      ...active.changes.removed,
    ];
    if (paths.length === 0) return;
    const when = relativeTime(active.baseAt ?? active.createdAt) || "when this chat started";
    if (
      !window.confirm(
        `Puts these ${paths.length} file${paths.length === 1 ? "" : "s"} back the way they were ${when}. This adds to history; nothing is lost.`,
      )
    ) {
      return;
    }
    session.runSessionAction(async () => {
      const invokeVcs = invokeNamespaceTool("vcs");
      for (const path of paths) {
        await invokeVcs("restore", { commit: active.base, path });
      }
      const updated = await getChatSession(active.id);
      session.applySession(updated);
      session.refreshSessions();
      session.setSessionNotice(
        `Restored ${paths.length} file${paths.length === 1 ? "" : "s"} to how they were ${when}.`,
      );
    });
  }, [session]);

  const composerPlaceholder = filePath
    ? `Ask about ${fileLabel(filePath)}…`
    : "Type a message... (Shift+Enter for new line)";

  return (
    <div
      ref={chatDockRef}
      className={
        sideMode
          ? "relative h-full min-h-0 flex flex-col bg-background"
          : "flex-1 min-h-0 flex flex-col"
      }
    >
      {sideMode && (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize chat"
          tabIndex={0}
          onPointerDown={startChatDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") resizeChatBy(16);
            else if (event.key === "ArrowRight") resizeChatBy(-16);
            else return;
            event.preventDefault();
          }}
          className={`absolute left-0 top-0 bottom-0 w-1 -translate-x-1/2 z-10 cursor-col-resize hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none ${
            chatDragging ? "bg-primary/60" : ""
          }`}
        />
      )}

      {sideMode && (
        <div className="shrink-0 border-b">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs">
            <MessageSquare
              className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            {filePath && (
              <span className="truncate font-mono font-medium" title={filePath}>
                {fileLabel(filePath)}
              </span>
            )}
            {filePath && (
              <button
                type="button"
                onClick={() => onTogglePin(filePath)}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title={
                  isPinned(filePath)
                    ? "Unpin from chat context"
                    : "Pin file for chat context"
                }
                aria-label={
                  isPinned(filePath) ? "Unpin from chat context" : "Pin for chat context"
                }
              >
                {isPinned(filePath) ? (
                  <PinOff className="h-3.5 w-3.5" />
                ) : (
                  <Pin className="h-3.5 w-3.5" />
                )}
              </button>
            )}
            {isLoading && (
              <span className="flex items-center gap-1 text-primary">
                <Loader2 className="h-3 w-3 animate-spin" />
                Generating…
              </span>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {pinnedPaths.length > 0 && (
            <div className="flex flex-wrap gap-1 px-3 pb-1.5">
              {pinnedPaths.map((path) => (
                <Badge
                  key={path}
                  variant="secondary"
                  className="text-[10px] gap-1 max-w-full"
                >
                  <span className="truncate font-mono" title={path}>
                    {fileLabel(path)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUnpin(path)}
                    className="shrink-0 hover:opacity-70"
                    title="Unpin"
                    aria-label={`Unpin ${path}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Branch chip: which session this chat is, which version of
          the files it sees, and what it changed. */}
      <SessionBar
        session={session.activeSession}
        sessions={session.visibleSessions}
        syncState={session.syncState}
        busy={session.sessionBusy}
        onNew={session.handleNewSession}
        onSwitch={session.handleSwitchSession}
        onModeChange={session.handleSessionModeChange}
        onApply={handleApplyProposal}
        onArchive={session.handleDiscardSession}
        onReset={session.handleResetSession}
        onSync={session.handleSyncSession}
        onDelete={session.handleDeleteSession}
        onOpenWindow={session.handleOpenSessionWindow}
        onOpenFile={(path) => void openWorkspacePreview(path)}
        onRefreshSessions={session.refreshSessions}
        onUndoChanges={handleUndoChanges}
      />

      {session.activeSession && (
        <ProposedChangesReview
          session={session.activeSession}
          busy={session.sessionBusy}
          onApply={handleApplyProposal}
          onDismiss={session.handleDiscardSession}
          onOpenFile={(path) => void openWorkspacePreview(path)}
          onUndoChanges={handleUndoChanges}
        />
      )}

      {session.mergeState && session.activeSession && (
        <MergeDialog
          open
          sessionId={session.activeSession.id}
          conflicts={session.mergeState.conflicts}
          finalizeLabel={
            session.mergeState.finalize === "apply"
              ? "Use these choices and apply"
              : "Use these choices"
          }
          applyOnConfirm={session.mergeState.finalize === "apply"}
          busy={session.sessionBusy}
          runCompletion={session.runMergeCompletion}
          onCancel={() => session.setMergeState(null)}
          onResolved={session.handleMergeResolved}
        />
      )}
      {session.sessionNotice && (
        <div className="shrink-0 px-3 py-1.5 bg-violet-500/10 text-violet-800 dark:text-violet-300 text-xs flex items-center gap-2">
          <span className="flex-1">{session.sessionNotice}</span>
          <button
            type="button"
            className="shrink-0 hover:opacity-70"
            onClick={() => session.setSessionNotice(null)}
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
        <div className="mx-auto w-full max-w-3xl p-3 sm:p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <img
                src={APROVAN_LOGO}
                alt=""
                className="h-12 w-12 mx-auto mb-4 opacity-50 rounded-full"
              />
              <p>{filePath ? `Ask about this file…` : "Start a conversation"}</p>
            </div>
          ) : (
            resolvedMessages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
          )}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 shrink-0">
                <img src={APROVAN_LOGO} alt="" className="rounded-full" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="h-5" />
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {error && (
        <div className="shrink-0 px-4 py-2 bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error.message}
        </div>
      )}

      {compilerError && (
        <div className="shrink-0 px-4 py-2 bg-destructive/10 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Widget previews unavailable — {compilerError}</span>
        </div>
      )}

      <div className="shrink-0 border-t p-2.5 sm:p-4">
        <div className="mx-auto w-full max-w-3xl space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <ProviderModelControls
              providers={providers.llmProviders}
              active={providers.chatProvider}
              onSelectProvider={providers.handleProviderChange}
              model={providers.chatModel}
              onSelectModel={providers.handleModelChange}
              loadModels={fetchLlmModels}
            />
            <SpeechSettingsButton
              selectedModel={selectedModel}
              onSelectedModelChange={setSelectedModel}
            />
          </div>

          <VoiceDestinationBanner voice={voice} />
          <VoiceStatusBanners voice={voice} />

          {!providers.providerConnected && (
            <div className="px-3 py-2 text-xs rounded-md border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>
                Chat requires an LLM provider credential. {providers.chatProviderLabel} is not
                connected to this workspace —{" "}
                {onOpenCredentials ? (
                  <button
                    type="button"
                    onClick={() => onOpenCredentials(providers.chatProvider)}
                    className="underline hover:no-underline font-medium"
                  >
                    add a credential
                  </button>
                ) : (
                  <span className="font-medium">add a credential</span>
                )}{" "}
                or switch providers above.
              </span>
            </div>
          )}

          {session.sessionReadOnly && (
            <div className="px-3 py-2 text-xs rounded-md border bg-muted/50 text-muted-foreground flex items-center gap-2">
              <span className="flex-1">
                This chat was{" "}
                {session.activeSession?.status === "merged"
                  ? "applied to your workspace"
                  : "archived"}{" "}
                — you're looking at a snapshot of it. Start a new chat to
                continue.
              </span>
              <Button
                size="sm"
                variant="secondary"
                className="h-6 px-2 text-xs"
                onClick={() => session.handleNewSession(session.activeSession?.mode ?? "auto")}
              >
                New chat
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <ChatComposer
              value={input}
              onChange={setInput}
              workspacePaths={workspacePaths}
              onSubmit={() => {
                if (
                  !isLoading &&
                  voice.status !== "listening" &&
                  input.trim() &&
                  providers.providerConnected &&
                  !session.sessionReadOnly
                ) {
                  handleSubmit();
                }
              }}
              placeholder={
                voice.status === "listening"
                  ? "Listening… speak, then stop"
                  : composerPlaceholder
              }
              disabled={
                isLoading ||
                session.sessionReadOnly ||
                voice.status === "listening"
              }
            />
            <VoiceCaptureControls
              voice={{ ...voice, start: startVoice }}
              disabled={isLoading || session.sessionReadOnly}
            />
            <Button
              type="submit"
              disabled={
                isLoading ||
                voice.status === "listening" ||
                !input.trim() ||
                !providers.providerConnected ||
                session.sessionReadOnly
              }
              className="shrink-0"
              title={
                providers.providerConnected
                  ? undefined
                  : `${providers.chatProviderLabel} is not connected — add a credential first`
              }
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
