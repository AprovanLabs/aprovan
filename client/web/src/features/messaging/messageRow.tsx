/**
 * Message row chrome for vendored MessageTimeline (host renderMessage).
 */

import type { TimelineMessage } from "@/vendor/buzz-timeline";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function renderChatMessage(
  message: TimelineMessage,
  state: { highlighted: boolean },
  opts?: {
    onOpenThread?: (messageId: string) => void;
    /** When true, hide the "Reply" affordance (thread pane — one level only). */
    hideReply?: boolean;
  },
) {
  const isAgent = Boolean(message.isAgent);
  return (
    <div
      data-message-id={message.id}
      data-testid={`chat-message-${message.id}`}
      data-highlighted={state.highlighted ? "true" : undefined}
      className={cn(
        "group px-3 py-2 text-sm",
        state.highlighted && "bg-amber-500/10",
      )}
    >
      <div className="mb-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{message.author}</span>
        {isAgent ? (
          <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
            {message.personaDisplayName ?? "chat/summarize"}
          </Badge>
        ) : null}
        {message.time ? <span>{message.time}</span> : null}
      </div>
      <div className="whitespace-pre-wrap break-words">{message.body}</div>
      {!opts?.hideReply && !message.parentId && opts?.onOpenThread ? (
        <button
          type="button"
          className="mt-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
          data-testid={`chat-message-reply-${message.id}`}
          onClick={() => opts.onOpenThread?.(message.id)}
        >
          Reply
        </button>
      ) : null}
    </div>
  );
}
