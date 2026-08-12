/**
 * Thin composer (T7): plain textarea, Enter sends, Shift+Enter newline,
 * typing signal on keystroke. No rich text / no buzz composer (D24).
 */

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ComposerProps = {
  disabled?: boolean;
  /** Inline send error (e.g. over-cap); message stays in the textarea. */
  error?: string | null;
  onSend: (body: string) => Promise<void> | void;
  onTyping?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export function Composer({
  disabled = false,
  error = null,
  onSend,
  onTyping,
  placeholder = "Message…",
  autoFocus = false,
  className,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const submit = async () => {
    const body = value.trim();
    if (!body || disabled || sending) return;
    setSending(true);
    try {
      await onSend(body);
      setValue("");
    } finally {
      setSending(false);
      taRef.current?.focus();
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5 border-t bg-background p-3", className)}>
      {error ? (
        <p
          className="text-xs text-destructive"
          data-testid="composer-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <div className="flex items-end gap-2">
        <textarea
          ref={taRef}
          data-testid="chat-composer"
          className={cn(
            "min-h-[40px] max-h-40 flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          value={value}
          disabled={disabled || sending}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={1}
          onChange={(e) => {
            setValue(e.target.value);
            onTyping?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          disabled={disabled || sending || !value.trim()}
          onClick={() => void submit()}
          data-testid="chat-composer-send"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
