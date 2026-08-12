/**
 * Timeline pane — wraps vendored MessageTimeline (styling only, no fork).
 */

import { useCallback, useMemo, useState } from "react";
import {
  MessageTimeline,
  type TimelineMessage,
} from "@/vendor/buzz-timeline";
import { cn } from "@/lib/utils";
import type { Message } from "./schema";
import { renderChatMessage } from "./messageRow";

export type TimelinePaneProps = {
  channelId: string | null;
  messages: Message[];
  loading?: boolean;
  connectionPill?: "reconnecting" | "reconciling" | null;
  fetchOlder?: () => Promise<void>;
  hasOlderMessages?: boolean;
  isFetchingOlder?: boolean;
  onOpenThread?: (messageId: string) => void;
  className?: string;
};

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function toTimelineMessages(messages: Message[]): TimelineMessage[] {
  return messages
    .filter((m) => !m.parentId)
    .map((m) => ({
      id: m.id,
      createdAt: Date.parse(m.createdAt) || 0,
      author: m.author,
      isAgent: Boolean(m.agent),
      personaDisplayName: m.agent?.profile,
      time: formatTime(m.createdAt),
      body: m.body,
      parentId: m.parentId ?? null,
      depth: 0,
    }));
}

export function TimelinePane({
  channelId,
  messages,
  loading = false,
  connectionPill = null,
  fetchOlder,
  hasOlderMessages = true,
  isFetchingOlder = false,
  onOpenThread,
  className,
}: TimelinePaneProps) {
  const timelineMessages = useMemo(
    () => toTimelineMessages(messages),
    [messages],
  );
  const [fetching, setFetching] = useState(false);

  const onFetchOlder = useCallback(async () => {
    if (!fetchOlder || fetching) return;
    setFetching(true);
    try {
      await fetchOlder();
    } finally {
      setFetching(false);
    }
  }, [fetchOlder, fetching]);

  return (
    <div
      className={cn("relative flex min-h-0 min-w-0 flex-1 flex-col", className)}
      data-testid="timeline-pane"
    >
      {connectionPill ? (
        <div
          className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2"
          data-testid={`connection-pill-${connectionPill}`}
        >
          <span
            className={cn(
              "rounded-full border bg-background/95 px-3 py-1 text-xs shadow-sm",
              connectionPill === "reconciling" && "animate-pulse",
            )}
          >
            {connectionPill === "reconnecting"
              ? "Reconnecting…"
              : "Updating…"}
          </span>
        </div>
      ) : null}

      <MessageTimeline
        channelId={channelId}
        messages={timelineMessages}
        isLoading={loading}
        emptyTitle="No messages yet"
        emptyDescription="Send the first message to start the conversation."
        fetchOlder={fetchOlder ? onFetchOlder : undefined}
        hasOlderMessages={hasOlderMessages}
        isFetchingOlder={isFetchingOlder || fetching}
        renderMessage={(message, state) =>
          renderChatMessage(message, state, { onOpenThread })
        }
      />
    </div>
  );
}
