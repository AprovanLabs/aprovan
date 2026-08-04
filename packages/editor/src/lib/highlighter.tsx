/**
 * Shared Shiki highlighter for editable and read-only code surfaces.
 *
 * Stream 2 consolidation: one tokenizer for the product editor and the
 * registry site (replacing the ~120-line regex tokenizer).
 */

import DOMPurify from "dompurify";
import { useEffect, useMemo, useState } from "react";
import {
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki";
import { useIsDark } from "./useIsDark";

let highlighterPromise: Promise<Highlighter> | null = null;

const COMMON_LANGUAGES: BundledLanguage[] = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "json",
  "html",
  "css",
  "markdown",
  "yaml",
  "python",
  "bash",
  "sql",
];

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: COMMON_LANGUAGES,
    });
  }
  return highlighterPromise;
}

/** Map common file extensions / language names to Shiki identifiers. */
export function normalizeLanguage(lang: string | null | undefined): BundledLanguage {
  if (!lang) return "typescript";
  const normalized = lang.toLowerCase();
  const mapping: Record<string, BundledLanguage> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    html: "html",
    css: "css",
    md: "markdown",
    markdown: "markdown",
    yml: "yaml",
    yaml: "yaml",
    py: "python",
    python: "python",
    sh: "bash",
    bash: "bash",
    sql: "sql",
    typescript: "typescript",
    javascript: "javascript",
  };
  return mapping[normalized] || "typescript";
}

export function highlightToHtml(
  highlighter: Highlighter,
  code: string,
  language: string | null | undefined,
  theme: "github-light" | "github-dark",
): string | null {
  try {
    const raw = highlighter.codeToHtml(code, {
      lang: normalizeLanguage(language),
      theme,
    });
    return DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: ["pre", "code", "span", "div"],
      ALLOWED_ATTR: ["class", "style"],
    });
  } catch {
    return null;
  }
}

const HIGHLIGHT_CLASS =
  "highlighted-code font-mono text-xs leading-relaxed whitespace-pre-wrap break-words [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:whitespace-pre-wrap [&_code]:!bg-transparent [&_code]:whitespace-pre-wrap [&_code]:break-words";

export interface HighlightedCodeProps {
  code: string;
  language?: string | null;
  className?: string;
  /** Force a theme; defaults to the document dark-mode preference. */
  theme?: "github-light" | "github-dark";
}

/** Read-only highlighted code (HTML via Shiki). Safe for streaming partial content. */
export function HighlightedCode({
  code,
  language = "typescript",
  className,
  theme,
}: HighlightedCodeProps) {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const isDark = useIsDark();
  const shikiTheme = theme ?? (isDark ? "github-dark" : "github-light");

  useEffect(() => {
    let mounted = true;
    getHighlighter().then((h) => {
      if (mounted) setHighlighter(h);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const highlightedHtml = useMemo(() => {
    if (!highlighter) return null;
    return highlightToHtml(highlighter, code, language, shikiTheme);
  }, [highlighter, code, language, shikiTheme]);

  if (highlightedHtml) {
    return (
      <div
        className={className ? `${HIGHLIGHT_CLASS} ${className}` : HIGHLIGHT_CLASS}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    );
  }

  return (
    <pre className="text-xs font-mono whitespace-pre-wrap break-words m-0 leading-relaxed text-foreground">
      <code>{code}</code>
    </pre>
  );
}
