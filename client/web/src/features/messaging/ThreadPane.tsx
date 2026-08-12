/**
 * One-level thread pane — opens on demand; no reply-to-reply affordance.
 */

import { X } from "lucide-react";
import { useMemo } from "react";
import {
  MessageTimeline,
  type TimelineMessage,
} from "@/vendor/buzz-timeline";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Message } from "./schema";
import { renderChatMessage } from "./messageRow";
import { Composer } from "./Composer";

export type ThreadPaneProps = {
  root: Message;
  replies: Message[];
  onClose: () => void;
  onSendReply: (body: string) => Promise<void> | void;
  onTyping?: () => void;
  sendError?: string | null;
  composerDisabled?: boolean;
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

function toThreadTimeline(root: Message, replies: Message[]): TimelineMessage[] {
  const rows = [root, ...replies];
  return rows.map((m) => ({
    id: m.id,
    createdAt: Date.parse(m.createdAt) || 0,
    author: m.author,
    isAgent: Boolean(m.agent),
    personaDisplayName: m.agent?.profile,
    time: formatTime(m.createdAt),
    body: m.body,
    parentId: m.parentId ?? null,
    depth: m.parentId ? 1 : 0,
  }));
}

export function ThreadPane({
  root,
  replies,
  onClose,
  onSendReply,
  onTyping,
  sendError = null,
  composerDisabled = false,
  className,
}: ThreadPaneProps) {
  const messages = useMemo(
    () => toThreadTimeline(root, replies),
    [root, replies],
  );

  return (
    <aside
      className={cn(
        "flex h-full w-80 shrink-0 flex-col border-l bg-background",
        className,
      )}
      data-testid="thread-pane"
      aria-label="Thread"
    >
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-sm font-medium">Thread</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
          aria-label="Close thread"
          data-testid="thread-pane-close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <MessageTimeline
        channelId={`thread:${root.id}`}
        messages={messages}
        emptyTitle="No replies yet"
        emptyDescription="Reply to continue the thread."
        hasComposerOverlay
        renderMessage={(message, state) =>
          renderChatMessage(message, state, { hideReply: true })
        }
      />
      <Composer
        error={sendError}
        disabled={composerDisabled}
        onSend={onSendReply}
        onTyping={onTyping}
        placeholder="Reply…"
      />
    </aside>
  );
}
