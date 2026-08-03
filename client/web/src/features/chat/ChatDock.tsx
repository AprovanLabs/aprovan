import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarkdownEditor, resolvePatchesInText } from "@aprovan/patchwork-editor";
import { AlertCircle, ChevronDown, ChevronUp, Loader2, Send, X } from "lucide-react";
import type { UIMessage } from "ai";
import { MergeDialog } from "@/components/MergeDialog";
import { ProviderModelControls } from "@/components/ProviderPicker";
import { SessionBar } from "@/components/SessionBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchLlmModels } from "@/lib/llm";
import type { useSessionOrchestration } from "@/features/sessions/useSessionOrchestration";
import { APROVAN_LOGO, MessageBubble } from "./MessageParts";
import type { useChatProviders } from "./useChatSubmit";

// ---------------------------------------------------------------------------
// Chat/preview split layout
//
// While a tab has content on screen (open, not collapsed), the preview gets
// the room by default — the chat below it shrinks to a strip (composer +
// an "Expand chat" toggle). Expanding switches to a fixed-height chat dock
// with a drag handle. Closing
// or collapsing every tab always hands the chat its full height back,
// independent of this persisted preference — see `hasContentTab` at the call
// site.
// ---------------------------------------------------------------------------

const CHAT_PANEL_KEY = "patchwork:chat-panel";
const DEFAULT_CHAT_SPLIT_HEIGHT = 320;
const MIN_CHAT_HEIGHT = 160;
/** Pixels of preview that must survive any drag. */
const MIN_PREVIEW_HEIGHT = 160;

export interface ChatPanelLayout {
  expanded: boolean;
  splitHeight: number;
}

function loadChatPanelLayout(): ChatPanelLayout {
  try {
    const raw = localStorage.getItem(CHAT_PANEL_KEY);
    if (!raw) return { expanded: false, splitHeight: DEFAULT_CHAT_SPLIT_HEIGHT };
    const parsed = JSON.parse(raw) as Partial<ChatPanelLayout>;
    return {
      expanded: parsed.expanded === true,
      splitHeight:
        typeof parsed.splitHeight === "number" && parsed.splitHeight >= MIN_CHAT_HEIGHT
          ? parsed.splitHeight
          : DEFAULT_CHAT_SPLIT_HEIGHT,
    };
  } catch {
    return { expanded: false, splitHeight: DEFAULT_CHAT_SPLIT_HEIGHT };
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
 * Chat/preview split state + drag mechanics. `chatDockRef` is the chat
 * dock's own element (drag-handle target); its parent is the shared column
 * both it and the preview live in, used to bound how far the drag can grow
 * the chat.
 */
export function useChatPanelLayout() {
  const [chatPanel, setChatPanel] = useState<ChatPanelLayout>(() => loadChatPanelLayout());
  const [chatDragging, setChatDragging] = useState(false);
  const chatDockRef = useRef<HTMLDivElement>(null);
  const chatHeightRef = useRef(chatPanel.splitHeight);
  chatHeightRef.current = chatPanel.splitHeight;

  const toggleChatExpanded = useCallback(() => {
    setChatPanel((prev) => {
      const next = { ...prev, expanded: !prev.expanded };
      saveChatPanelLayout(next);
      return next;
    });
  }, []);

  /** Upper bound for the chat dock: whatever leaves the preview usably tall. */
  const maxChatHeight = useCallback(() => {
    const column = chatDockRef.current?.parentElement;
    return Math.max(MIN_CHAT_HEIGHT, (column?.clientHeight ?? 640) - MIN_PREVIEW_HEIGHT);
  }, []);

  const resizeChatBy = useCallback(
    (delta: number) => {
      setChatPanel((prev) => {
        const next = {
          ...prev,
          splitHeight: clamp(prev.splitHeight + delta, MIN_CHAT_HEIGHT, maxChatHeight()),
        };
        saveChatPanelLayout(next);
        return next;
      });
    },
    [maxChatHeight]
  );

  const startChatDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!chatPanel.expanded) return;
      event.preventDefault();
      const startY = event.clientY;
      const startHeight = chatHeightRef.current;
      const max = maxChatHeight();
      setChatDragging(true);

      // Dragging up grows the chat dock (it's anchored to the bottom); the
      // preview keeps the remainder.
      const onMove = (moveEvent: PointerEvent) => {
        setChatPanel((prev) => ({
          ...prev,
          splitHeight: clamp(startHeight + (startY - moveEvent.clientY), MIN_CHAT_HEIGHT, max),
        }));
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        setChatDragging(false);
        // One write at the end of the gesture, not one per pointer move.
        saveChatPanelLayout({ expanded: true, splitHeight: chatHeightRef.current });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [chatPanel.expanded, maxChatHeight]
  );

  return {
    chatPanel,
    setChatPanel,
    chatDragging,
    chatDockRef,
    toggleChatExpanded,
    resizeChatBy,
    startChatDrag,
  };
}

export type ChatDockLayoutApi = ReturnType<typeof useChatPanelLayout>;

/**
 * The chat dock: session bar, merge dialog, message list, and composer.
 * Full height when there's no content tab to share the screen with;
 * otherwise a compact strip or a fixed-height, drag-resizable dock.
 */
export function ChatDock({
  hasContentTab,
  layout,
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
  keepEditDrafts,
  onKeepEditDraftsChange,
  onOpenCredentials,
}: {
  hasContentTab: boolean;
  layout: ChatDockLayoutApi;
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
  keepEditDrafts: boolean;
  onKeepEditDraftsChange: (keep: boolean) => void;
  onOpenCredentials?: (provider?: string) => void;
}) {
  const { chatPanel, chatDragging, chatDockRef, toggleChatExpanded, resizeChatBy, startChatDrag } =
    layout;
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

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

  return (
    <div
      ref={chatDockRef}
      className={
        hasContentTab ? "shrink-0 flex flex-col border-t" : "flex-1 min-h-0 flex flex-col"
      }
      style={hasContentTab && chatPanel.expanded ? { height: chatPanel.splitHeight } : undefined}
    >
      {hasContentTab && (
        <>
          {/* Drag handle — only live once expanded; there's
              nothing to resize while the dock is just a strip. */}
          <div
            role="separator"
            aria-orientation="horizontal"
            aria-label="Resize chat"
            tabIndex={chatPanel.expanded ? 0 : -1}
            onPointerDown={startChatDrag}
            onKeyDown={(event) => {
              if (!chatPanel.expanded) return;
              if (event.key === "ArrowUp") resizeChatBy(16);
              else if (event.key === "ArrowDown") resizeChatBy(-16);
              else return;
              event.preventDefault();
            }}
            className={`h-1 shrink-0 transition-colors ${
              chatPanel.expanded
                ? `cursor-row-resize hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none ${
                    chatDragging ? "bg-primary/60" : ""
                  }`
                : "pointer-events-none"
            }`}
          />
          <button
            type="button"
            onClick={toggleChatExpanded}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 border-b"
            title={chatPanel.expanded ? "Collapse chat" : "Expand chat"}
          >
            {chatPanel.expanded ? (
              <ChevronDown className="h-3 w-3 shrink-0" />
            ) : (
              <ChevronUp className="h-3 w-3 shrink-0" />
            )}
            <span className="font-medium">Chat</span>
            {isLoading ? (
              <span className="flex items-center gap-1 text-primary">
                <Loader2 className="h-3 w-3 animate-spin" />
                Generating…
              </span>
            ) : (
              !chatPanel.expanded &&
              messages.length > 0 && (
                <span>
                  {messages.length} message{messages.length === 1 ? "" : "s"}
                </span>
              )
            )}
            <span className="ml-auto">{chatPanel.expanded ? "Collapse" : "Expand"}</span>
          </button>
        </>
      )}

      {/* Branch chip: which session this chat is, which version of
          the files it sees, and what it changed. */}
      <SessionBar
        session={session.activeSession}
        sessions={session.visibleSessions}
        peers={session.peers}
        syncState={session.syncState}
        busy={session.sessionBusy}
        onNew={session.handleNewSession}
        onSwitch={session.handleSwitchSession}
        onModeChange={session.handleSessionModeChange}
        onApply={session.handleApplySession}
        onArchive={session.handleDiscardSession}
        onReset={session.handleResetSession}
        onSync={session.handleSyncSession}
        onDelete={session.handleDeleteSession}
        onOpenWindow={session.handleOpenSessionWindow}
        onOpenFile={(path) => void openWorkspacePreview(path)}
        onRefreshSessions={session.refreshSessions}
        keepEditDrafts={keepEditDrafts}
        onKeepEditDraftsChange={onKeepEditDraftsChange}
      />
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

      {(!hasContentTab || chatPanel.expanded) && (
        <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
          <div className="mx-auto w-full max-w-3xl p-3 sm:p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <img
                  src={APROVAN_LOGO}
                  alt=""
                  className="h-12 w-12 mx-auto mb-4 opacity-50 rounded-full"
                />
                <p>Start a conversation</p>
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
      )}

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

      {/* Composer tracks the message column's measure so the two read
          as one thread even when the preview pane is wide. A collapsed
          strip hides the whole composer — sending auto-expands anyway,
          so a hidden input costs nothing and the strip stays a strip. */}
      {(!hasContentTab || chatPanel.expanded) && (
        <div className="shrink-0 border-t p-2.5 sm:p-4">
          <div className="mx-auto w-full max-w-3xl space-y-2">
            <div className="flex items-center">
              <ProviderModelControls
                providers={providers.llmProviders}
                active={providers.chatProvider}
                onSelectProvider={providers.handleProviderChange}
                model={providers.chatModel}
                onSelectModel={providers.handleModelChange}
                loadModels={fetchLlmModels}
              />
            </div>

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
              <MarkdownEditor
                value={input}
                onChange={setInput}
                onSubmit={() => {
                  if (
                    !isLoading &&
                    input.trim() &&
                    providers.providerConnected &&
                    !session.sessionReadOnly
                  ) {
                    handleSubmit();
                  }
                }}
                placeholder="Type a message... (Shift+Enter for new line)"
                disabled={isLoading || session.sessionReadOnly}
              />
              <Button
                type="submit"
                disabled={
                  isLoading ||
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
      )}
    </div>
  );
}
