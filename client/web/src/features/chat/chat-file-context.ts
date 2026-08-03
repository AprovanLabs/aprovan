import { useCallback, useMemo, useState } from "react";

export const CHAT_CONTEXT_PINS_KEY = "patchwork:chat-context-pins";

/** Mention token in the composer: `@\`workspace/path\`` (parseable on send). */
export const MENTION_TOKEN_RE = /@`([^`]+)`/g;

export function fileLabel(path: string): string {
  const parts = path.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || path;
}

export function formatMentionToken(path: string): string {
  return `@\`${path}\``;
}

export function parseMentionPaths(text: string): string[] {
  const paths: string[] = [];
  for (const match of text.matchAll(MENTION_TOKEN_RE)) {
    if (match[1]) paths.push(match[1]);
  }
  return paths;
}

export function buildContextFiles(args: {
  pinnedPaths: string[];
  text: string;
  activePath?: string | null;
}): string[] {
  const set = new Set<string>();
  for (const path of args.pinnedPaths) set.add(path);
  for (const path of parseMentionPaths(args.text)) set.add(path);
  if (args.activePath) set.add(args.activePath);
  return [...set].sort();
}

/** Text fallback when the server chat schema does not yet consume `contextFiles`. */
export function formatContextFilesPrefix(contextFiles: string[]): string {
  if (contextFiles.length === 0) return "";
  return `Context files: ${contextFiles.join(", ")}\n\n`;
}

export function loadChatContextPins(): string[] {
  try {
    const raw = localStorage.getItem(CHAT_CONTEXT_PINS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((path): path is string => typeof path === "string");
  } catch {
    return [];
  }
}

export function saveChatContextPins(paths: string[]): void {
  try {
    localStorage.setItem(CHAT_CONTEXT_PINS_KEY, JSON.stringify(paths));
  } catch {
    // Private-mode / quota: pins are a nicety, never a failure mode.
  }
}

/** Chat-scoped file pins (separate from sidebar tree pins). */
export function useChatFileContext(activePath?: string | null) {
  const [pinnedPaths, setPinnedPaths] = useState<string[]>(() => loadChatContextPins());

  const togglePin = useCallback((path: string) => {
    setPinnedPaths((prev) => {
      const next = prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path];
      saveChatContextPins(next);
      return next;
    });
  }, []);

  const unpin = useCallback((path: string) => {
    setPinnedPaths((prev) => {
      if (!prev.includes(path)) return prev;
      const next = prev.filter((p) => p !== path);
      saveChatContextPins(next);
      return next;
    });
  }, []);

  const isPinned = useCallback(
    (path: string) => pinnedPaths.includes(path),
    [pinnedPaths]
  );

  /** Pinned paths plus the active tab path for header display. */
  const displayPaths = useMemo(() => {
    const set = new Set(pinnedPaths);
    if (activePath) set.add(activePath);
    return [...set].sort();
  }, [pinnedPaths, activePath]);

  return {
    pinnedPaths,
    displayPaths,
    togglePin,
    unpin,
    isPinned,
  };
}
