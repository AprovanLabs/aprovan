/**
 * Presentational message timeline — scroll anchoring + virtua virtualization.
 *
 * Hook wiring follows block/buzz `MessageTimeline` / `TimelineMessageList`
 * (Apache-2.0). Upstream's full component transitively pulls Nostr-coupled row
 * UI (D24 forbids adopting that); see README for the dated divergence. The
 * upstream source is preserved at `upstream/MessageTimeline.tsx.source`.
 */

import * as React from "react";
import { VList } from "virtua";
import type { VListHandle } from "virtua";

import type { TimelineMessage } from "./types";
import { useAnchoredScroll } from "./useAnchoredScroll";
import { useLoadOlderOnScroll } from "./useLoadOlderOnScroll";
import { useTimelineRetention } from "./useTimelineRetention";
import { useVirtualizedBottomSettle } from "./useVirtualizedBottomSettle";

export type MessageTimelineHandle = {
  scrollToBottomOnNextUpdate: () => void;
  settleAtBottom: () => boolean;
};

export type MessageTimelineProps = {
  channelId?: string | null;
  messages: TimelineMessage[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  fetchOlder?: () => Promise<void>;
  hasOlderMessages?: boolean;
  historyExhausted?: boolean;
  isFetchingOlder?: boolean;
  /** Optional external ref to the scroll container. */
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  /** True when the timeline has the composer overlay below it. */
  hasComposerOverlay?: boolean;
  /** Stable context rendered above the timeline, including when it is empty. */
  pinnedIntro?: React.ReactNode;
  targetMessageId?: string | null;
  onTargetReached?: (messageId: string) => void;
  splitThreadPanelOpen?: boolean;
  firstUnreadMessageId?: string | null;
  unreadCount?: number;
  /**
   * Host-provided row renderer (Chat styling lives outside this vendor module).
   * Defaults to a minimal author/body row when omitted.
   */
  renderMessage?: (
    message: TimelineMessage,
    state: { highlighted: boolean },
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const EMPTY_MESSAGES: TimelineMessage[] = [];

function defaultRenderMessage(
  message: TimelineMessage,
  state: { highlighted: boolean },
) {
  return (
    <div
      data-message-id={message.id}
      data-highlighted={state.highlighted ? "true" : undefined}
      style={{
        padding: "8px 12px",
        background: state.highlighted ? "rgba(255, 220, 100, 0.25)" : undefined,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {message.author}
        {message.time ? ` · ${message.time}` : null}
      </div>
      <div>{message.body}</div>
    </div>
  );
}

const MessageTimelineBase = React.forwardRef<
  MessageTimelineHandle,
  MessageTimelineProps
>(function MessageTimeline(
  {
    channelId,
    messages,
    isLoading = false,
    emptyTitle = "No messages yet",
    emptyDescription = "Send the first message to start the thread.",
    fetchOlder,
    hasOlderMessages = true,
    isFetchingOlder = false,
    scrollContainerRef: externalScrollRef,
    hasComposerOverlay = true,
    pinnedIntro,
    targetMessageId = null,
    onTargetReached,
    splitThreadPanelOpen = false,
    firstUnreadMessageId = null,
    unreadCount = 0,
    renderMessage = defaultRenderMessage,
    className,
    style,
  },
  ref,
) {
  const internalScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = externalScrollRef ?? internalScrollRef;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const topSentinelRef = React.useRef<HTMLDivElement>(null);
  const hostRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<VListHandle>(null);
  const itemsLengthRef = React.useRef(0);
  const [virtualizerScrollParent, setVirtualizerScrollParent] =
    React.useState<HTMLDivElement | null>(null);

  const activeScrollContainerRef = React.useMemo(
    () => ({
      get current() {
        return virtualizerScrollParent ?? scrollContainerRef.current;
      },
    }),
    [scrollContainerRef, virtualizerScrollParent],
  );

  const renderedMessages =
    messages.length === 0 && isLoading ? EMPTY_MESSAGES : messages;
  itemsLengthRef.current = renderedMessages.length;

  const keys = React.useMemo(
    () => renderedMessages.map((message) => message.renderKey ?? message.id),
    [renderedMessages],
  );
  const previousKeysRef = React.useRef<readonly string[]>([]);
  const isPrepend =
    previousKeysRef.current.length > 0 &&
    keys.length > previousKeysRef.current.length &&
    keys[keys.length - 1] ===
      previousKeysRef.current[previousKeysRef.current.length - 1] &&
    keys[0] !== previousKeysRef.current[0];
  previousKeysRef.current = keys;

  const { cancel: cancelBottomSettle, settle: settleVirtualizedBottom } =
    useVirtualizedBottomSettle(hostRef, listRef, itemsLengthRef);
  const { retainedIndices, onScrollEnd } = useTimelineRetention(
    keys,
    listRef,
    isPrepend,
  );

  const {
    highlightedMessageId,
    isAtBottom,
    newMessageCount,
    onScroll,
    scrollToBottom,
    scrollToBottomOnNextUpdate,
    scrollToMessage,
    settleAtBottomAfterLayout,
    onVirtualizerAtBottomStateChange,
  } = useAnchoredScroll({
    channelId,
    contentRef,
    isLoading,
    messages: renderedMessages,
    onTargetReached,
    scrollContainerRef: activeScrollContainerRef,
    splitPanelOpen: splitThreadPanelOpen,
    targetMessageId,
    virtualCancelBottomIntent: cancelBottomSettle,
    virtualScrollToMessage: (messageId, options) => {
      const index = renderedMessages.findIndex(
        (message) => message.id === messageId,
      );
      if (index < 0) return false;
      listRef.current?.scrollToIndex(index, {
        align: "center",
        smooth: options?.behavior === "smooth",
      });
      return true;
    },
    virtualScrollToBottom: (behavior) => {
      const lastIndex = renderedMessages.length - 1;
      if (lastIndex < 0) return;
      listRef.current?.scrollToIndex(lastIndex, {
        align: "end",
        smooth: behavior === "smooth",
      });
    },
    virtualSettleAtBottom: settleVirtualizedBottom,
    virtualizerOwnsPrependAnchoring: true,
  });

  useLoadOlderOnScroll({
    fetchOlder,
    hasOlderMessages,
    isLoading: isLoading || isFetchingOlder,
    scrollContainerRef: activeScrollContainerRef,
    sentinelRef: topSentinelRef,
  });

  React.useLayoutEffect(() => {
    const scroller = hostRef.current?.firstElementChild;
    if (scroller instanceof HTMLDivElement) {
      setVirtualizerScrollParent(scroller);
    }
  }, [channelId]);

  React.useImperativeHandle(
    ref,
    () => ({
      scrollToBottomOnNextUpdate,
      settleAtBottom: () => {
        settleVirtualizedBottom();
        return settleAtBottomAfterLayout();
      },
    }),
    [
      scrollToBottomOnNextUpdate,
      settleAtBottomAfterLayout,
      settleVirtualizedBottom,
    ],
  );

  const showEmpty =
    !isLoading && renderedMessages.length === 0 && pinnedIntro == null;

  return (
    <div
      className={className}
      data-testid="message-timeline"
      style={{
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        minHeight: 0,
        minWidth: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {unreadCount > 0 && firstUnreadMessageId ? (
        <button
          type="button"
          data-testid="message-unread-pill"
          onClick={() => {
            scrollToMessage(firstUnreadMessageId, { highlight: true });
          }}
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          {unreadCount} unread
        </button>
      ) : null}

      {!isAtBottom && newMessageCount > 0 ? (
        <button
          type="button"
          data-testid="message-new-pill"
          onClick={() => scrollToBottom("smooth")}
          style={{
            position: "absolute",
            bottom: hasComposerOverlay ? 72 : 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          {newMessageCount} new
        </button>
      ) : null}

      <div
        ref={hostRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {pinnedIntro}
        {showEmpty ? (
          <div
            data-testid="message-timeline-empty"
            style={{ padding: 24, textAlign: "center", opacity: 0.7 }}
          >
            <div>{emptyTitle}</div>
            <div style={{ fontSize: 13 }}>{emptyDescription}</div>
          </div>
        ) : (
          <>
            <div ref={topSentinelRef} aria-hidden style={{ height: 1 }} />
            <div ref={contentRef} style={{ display: "contents" }} />
            <VList
              ref={listRef}
              style={{ height: "100%" }}
              shift={isPrepend}
              keepMounted={retainedIndices}
              onScroll={(offset) => {
                onScroll();
                const list = listRef.current;
                if (!list) return;
                const atBottom =
                  offset + list.viewportSize >= list.scrollSize - 32;
                onVirtualizerAtBottomStateChange(atBottom);
              }}
              onScrollEnd={onScrollEnd}
            >
              {renderedMessages.map((message) => (
                <div key={message.renderKey ?? message.id}>
                  {renderMessage(message, {
                    highlighted:
                      highlightedMessageId === message.id ||
                      Boolean(message.highlighted),
                  })}
                </div>
              ))}
            </VList>
          </>
        )}
      </div>
    </div>
  );
});

export const MessageTimeline = React.memo(MessageTimelineBase);
