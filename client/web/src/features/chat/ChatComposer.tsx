import { MarkdownEditor } from "@aprovan/editor";
import { useEffect, useMemo, useState } from "react";
import { fileLabel, formatMentionToken } from "./chat-file-context";

const MENTION_QUERY_RE = /@([^`\s]*)$/;

/**
 * Chat composer with a lightweight `@` file-mention popover (no TipTap Mention
 * plugin). Inserts `@\`path\`` tokens the send path can parse.
 */
export function ChatComposer({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  workspacePaths,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  workspacePaths: string[];
}) {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);

  useEffect(() => {
    const match = value.match(MENTION_QUERY_RE);
    setMentionQuery(match ? match[1] : null);
  }, [value]);

  const filePaths = useMemo(
    () => workspacePaths.filter((path) => !path.endsWith("/")),
    [workspacePaths]
  );

  const mentionOptions = useMemo(() => {
    if (mentionQuery === null) return [];
    const query = mentionQuery.toLowerCase();
    return filePaths
      .filter((path) => path.toLowerCase().includes(query))
      .slice(0, 12);
  }, [mentionQuery, filePaths]);

  const insertMention = (path: string) => {
    onChange(value.replace(MENTION_QUERY_RE, `${formatMentionToken(path)} `));
    setMentionQuery(null);
  };

  return (
    <div className="relative flex-1 min-w-0">
      {mentionQuery !== null && mentionOptions.length > 0 && (
        <div
          className="absolute bottom-full left-0 z-50 mb-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md"
          role="listbox"
          aria-label="File mentions"
        >
          {mentionOptions.map((path) => (
            <button
              key={path}
              type="button"
              role="option"
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-muted"
              onMouseDown={(event) => {
                event.preventDefault();
                insertMention(path);
              }}
            >
              <span className="shrink-0 font-medium">{fileLabel(path)}</span>
              <span className="truncate font-mono text-muted-foreground">{path}</span>
            </button>
          ))}
        </div>
      )}
      <MarkdownEditor
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
