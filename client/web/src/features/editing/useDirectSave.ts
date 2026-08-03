import { useCallback, useEffect, useRef, useState } from "react";
import {
  subscribeToSyncState,
  writeFile,
  type WorkspaceSyncState,
} from "@/lib/workspace-vfs";
import { invalidateStagedPrefixes } from "./write-policy";

export type SaveState =
  | { kind: "saved" }
  | { kind: "edited" } // debounce pending
  | { kind: "saving" }
  | { kind: "error"; message: string; retry: () => void }
  | { kind: "offline" }; // journaled, will flush

const DEBOUNCE_MS = 1000;

/**
 * Debounced write-through to `syncedBackend` for direct-policy paths.
 * Cmd/Ctrl+S callers use `flush()`. Offline writes journal via the VFS.
 */
export function useDirectSave(path: string): {
  state: SaveState;
  onChange(content: string): void;
  flush(): Promise<void>;
} {
  const [state, setState] = useState<SaveState>({ kind: "saved" });
  const pendingContentRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathRef = useRef(path);
  pathRef.current = path;
  const writingRef = useRef(false);
  const syncRef = useRef<WorkspaceSyncState>({ pending: 0, online: true });

  useEffect(() => {
    return subscribeToSyncState((sync) => {
      syncRef.current = sync;
      if (!sync.online && pendingContentRef.current !== null) {
        setState({ kind: "offline" });
      }
    });
  }, []);

  // Drop pending debounce when the path changes.
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    pendingContentRef.current = null;
    setState({ kind: "saved" });
  }, [path]);

  const writeNow = useCallback(async (content: string): Promise<void> => {
    if (writingRef.current) {
      pendingContentRef.current = content;
      return;
    }
    writingRef.current = true;
    setState({ kind: "saving" });
    try {
      await writeFile(pathRef.current, content);
      pendingContentRef.current = null;
      if (!syncRef.current.online || syncRef.current.pending > 0) {
        setState({ kind: "offline" });
      } else {
        setState({ kind: "saved" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      if (/\b403\b/.test(message) || /forbidden/i.test(message)) {
        invalidateStagedPrefixes();
      }
      const retry = () => {
        void writeNow(content);
      };
      setState({ kind: "error", message, retry });
    } finally {
      writingRef.current = false;
      // A change arrived while we were writing — schedule another pass.
      if (pendingContentRef.current !== null && pendingContentRef.current !== content) {
        const next = pendingContentRef.current;
        timerRef.current = setTimeout(() => {
          void writeNow(next);
        }, DEBOUNCE_MS);
      }
    }
  }, []);

  const onChange = useCallback(
    (content: string) => {
      pendingContentRef.current = content;
      setState(syncRef.current.online ? { kind: "edited" } : { kind: "offline" });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const pending = pendingContentRef.current;
        if (pending === null) return;
        void writeNow(pending);
      }, DEBOUNCE_MS);
    },
    [writeNow],
  );

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const pending = pendingContentRef.current;
    if (pending === null) return;
    await writeNow(pending);
  }, [writeNow]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        void flush();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flush]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { state, onChange, flush };
}
