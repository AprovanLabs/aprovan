/**
 * Unified editable / read-only code surface.
 *
 * Union of behaviours from the two prior implementations (Stream 2):
 * - Product CodeBlockView: Tab→2-space indent + caret restore, auto-resize
 * - Registry CodeEditor: scroll synchronisation for bounded overflow
 * Both: transparent textarea over highlighted layer, trailing newline on
 * the highlight overlay so height stays in sync while typing.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Highlighter } from "shiki";
import {
  getHighlighter,
  highlightToHtml,
  normalizeLanguage,
} from "../../lib/highlighter";
import { useIsDark } from "../../lib/useIsDark";
import { cn } from "../../lib/utils";

export interface CodeBlockViewProps {
  /** Source text. Prefer this; `value` is accepted as an alias (registry hosts). */
  content?: string;
  /** Alias for `content` (registry CodeEditor API). */
  value?: string;
  language?: string | null;
  editable?: boolean;
  onChange?: (content: string) => void;
  className?: string;
  /**
   * When set, use a bounded box with internal scroll + scroll sync
   * (registry playground fallback). When omitted, auto-resize the
   * textarea and scroll the outer container (product default).
   */
  minHeightClass?: string;
  ariaLabel?: string;
  /** Hide the language label chrome (useful for embedded registry surfaces). */
  hideHeader?: boolean;
}

const SHARED_TEXT =
  "font-mono text-xs leading-relaxed whitespace-pre-wrap break-words";
const HIGHLIGHT_LAYER =
  "highlighted-code font-mono text-xs leading-relaxed whitespace-pre-wrap break-words [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:whitespace-pre-wrap [&_code]:!bg-transparent [&_code]:whitespace-pre-wrap [&_code]:break-words";

export function CodeBlockView({
  content: contentProp,
  value,
  language = null,
  editable = false,
  onChange,
  className,
  minHeightClass,
  ariaLabel = "Code editor",
  hideHeader = false,
}: CodeBlockViewProps) {
  const content = contentProp ?? value ?? "";
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const isDark = useIsDark();
  const shikiTheme = isDark ? "github-dark" : "github-light";
  // Registry hosts pass minHeightClass and expect an editable bounded surface.
  const bounded = Boolean(minHeightClass);
  const isEditable = editable || bounded;

  useEffect(() => {
    let mounted = true;
    getHighlighter().then((h) => {
      if (mounted) setHighlighter(h);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-resize (product path). Bounded mode relies on CSS min-height + overflow.
  useEffect(() => {
    if (bounded || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [content, bounded]);

  const syncScroll = useCallback((target: HTMLTextAreaElement) => {
    const highlight = highlightRef.current;
    if (!highlight) return;
    highlight.scrollTop = target.scrollTop;
    highlight.scrollLeft = target.scrollLeft;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
      if (bounded) syncScroll(e.target);
    },
    [onChange, bounded, syncScroll],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange?.(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    },
    [onChange],
  );

  const langLabel = language || "text";
  const shikiLang = useMemo(() => normalizeLanguage(language), [language]);

  // Trailing newline keeps the overlay height in sync while typing.
  const highlightSource = content.endsWith("\n") ? content : `${content}\n`;

  const highlightedHtml = useMemo(() => {
    if (!highlighter) return null;
    return highlightToHtml(highlighter, highlightSource, shikiLang, shikiTheme);
  }, [highlighter, highlightSource, shikiLang, shikiTheme]);

  const highlightNode = highlightedHtml ? (
    <div
      className={HIGHLIGHT_LAYER}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  ) : (
    <pre className={cn(SHARED_TEXT, "m-0 text-foreground")}>
      <code>{highlightSource}</code>
    </pre>
  );

  if (!isEditable) {
    return (
      <div className={cn("h-full flex flex-col bg-card", className)}>
        {!hideHeader && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border text-xs">
            <span className="font-mono text-muted-foreground">{langLabel}</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          {highlightNode}
        </div>
      </div>
    );
  }

  if (bounded) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border border-input bg-transparent focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          minHeightClass,
          className,
        )}
      >
        <div
          ref={highlightRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 overflow-auto p-3",
            SHARED_TEXT,
          )}
        >
          {highlightNode}
        </div>
        <textarea
          ref={textareaRef}
          aria-label={ariaLabel}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={(e) => syncScroll(e.currentTarget)}
          className={cn(
            "relative size-full resize-none bg-transparent text-transparent caret-foreground outline-none selection:bg-primary/20 p-3",
            SHARED_TEXT,
            minHeightClass,
          )}
          spellCheck={false}
          style={{ tabSize: 2, caretColor: "var(--foreground)" }}
        />
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col bg-card", className)}>
      {!hideHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border text-xs">
          <span className="font-mono text-muted-foreground">{langLabel}</span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="relative min-h-full">
          <div
            ref={highlightRef}
            className="absolute top-0 left-0 right-0 pointer-events-none p-4"
            aria-hidden="true"
          >
            {highlightNode}
          </div>
          <textarea
            ref={textareaRef}
            aria-label={ariaLabel}
            value={content}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="relative w-full min-h-full font-mono text-xs leading-relaxed bg-transparent border-none outline-none resize-none p-4 text-transparent whitespace-pre-wrap break-words"
            spellCheck={false}
            style={{
              tabSize: 2,
              caretColor: "var(--foreground)",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Alias for hosts that previously imported a `CodeEditor` surface (value/onChange API). */
export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  minHeightClass?: string;
  ariaLabel?: string;
  language?: string | null;
}

export function CodeEditor({
  value,
  onChange,
  className,
  minHeightClass = "min-h-[22rem]",
  ariaLabel = "Code editor",
  language = "typescript",
}: CodeEditorProps) {
  return (
    <CodeBlockView
      content={value}
      onChange={onChange}
      language={language}
      editable
      className={className}
      minHeightClass={minHeightClass}
      ariaLabel={ariaLabel}
      hideHeader
    />
  );
}
