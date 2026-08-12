/**
 * Hook: retain a `doc:<path>` session and expose Y.Doc / awareness / reconnect
 * for CollabMarkdownEditor + DraftBanner (staged conflict draft polling).
 */

import { getContentText, type CollabUserInfo } from "@aprovan/editor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSyncExternalStore } from "react";
import type { Awareness } from "y-protocols/awareness";
import type * as Y from "yjs";
import {
  closeChatSession,
  listChatSessions,
  type ChatSessionInfo,
} from "@/lib/chat-sessions";
import { commitVersion } from "@/lib/vfs-commits";
import { hueFromUserId, memberDisplayName } from "@/features/presence/names";
import { currentUserSub } from "@/lib/notifications";
import { documentStore, type DocPeer } from "./store";

/** How often to re-check open staged sessions for this path. */
export const DRAFT_POLL_MS = 4_000;

export type DocumentSession = {
  path: string;
  doc: Y.Doc | null;
  awareness: Awareness | null;
  peers: DocPeer[];
  /** True after at least one subscribe sync handshake completed. */
  synced: boolean;
  /** Socket down while this session is retained — show "Reconnecting…". */
  reconnecting: boolean;
  userInfo: CollabUserInfo;
  /**
   * Open staged chat session that touches this path (agent conflict draft),
   * or null when none. Polled via `sessions.list`.
   */
  draftSession: ChatSessionInfo | null;
  /** Re-poll staged sessions for this path. */
  refreshDraft: () => Promise<void>;
  /**
   * Discard the conflict draft without mutating the live doc (close without
   * stage). Clears `draftSession` when done.
   */
  discardDraft: () => Promise<void>;
};

function defaultUserInfo(): CollabUserInfo {
  const id = currentUserSub() ?? "local";
  const hue = hueFromUserId(id);
  return {
    name: memberDisplayName(id),
    color: `hsl(${hue} 45% 42%)`,
  };
}

/** True when the session's change summary includes `path`. */
export function sessionTouchesPath(
  session: ChatSessionInfo,
  path: string,
): boolean {
  const changes = session.changes;
  if (!changes) return false;
  return (
    changes.added.includes(path) ||
    changes.modified.includes(path) ||
    changes.removed.includes(path)
  );
}

/** First open staged session that touches `path`, or null. */
export function pickDraftForPath(
  sessions: ChatSessionInfo[],
  path: string,
): ChatSessionInfo | null {
  for (const session of sessions) {
    if (
      session.status === "open" &&
      session.mode === "staged" &&
      sessionTouchesPath(session, path)
    ) {
      return session;
    }
  }
  return null;
}

/**
 * Replace live `Y.Text("content")` in one transaction so remotes see a
 * normal live edit (ux.md conflict resolve).
 */
export function applyLiveContent(doc: Y.Doc, content: string): void {
  const ytext = getContentText(doc);
  const current = ytext.toString();
  if (current === content) return;
  doc.transact(() => {
    const len = ytext.length;
    if (len > 0) ytext.delete(0, len);
    if (content.length > 0) ytext.insert(0, content);
  }, "document-resolve");
}

/**
 * Manual save commit after live resolution (tech-plan
 * `forceMaterializeAndCommit`). Client half: `vcs.commit` with `Save: ${path}`.
 * FS materialize is already done by `sessions.resolve` apply (`store.write`)
 * and/or quiesce after the Yjs transaction syncs.
 */
export async function forceMaterializeAndCommit(path: string): Promise<void> {
  await commitVersion(`Save: ${path}`);
}

export async function fetchDraftForPath(
  path: string,
): Promise<ChatSessionInfo | null> {
  const sessions = await listChatSessions("open");
  return pickDraftForPath(sessions, path);
}

/**
 * Retain a live doc session for `path`. Wire `doc` + `awareness` + `userInfo`
 * into CollabMarkdownEditor; use `reconnecting` for the UX badge; use
 * `draftSession` for DraftBanner.
 */
export function useDocumentSession(
  path: string,
  userInfo?: CollabUserInfo,
): DocumentSession {
  const resolvedUser = useMemo(
    () => userInfo ?? defaultUserInfo(),
    [userInfo],
  );

  useEffect(() => {
    documentStore.acquire(path);
    return () => documentStore.release(path);
  }, [path]);

  // Stable getSnapshot refs (Object.is) — do not allocate a new object each call.
  const doc = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getDoc(path),
    (): Y.Doc | null => null,
  );
  const awareness = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getAwareness(path),
    (): Awareness | null => null,
  );
  const peers = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.getPeers(path),
    (): DocPeer[] => [],
  );
  const synced = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.isSynced(path),
    () => false,
  );
  const reconnecting = useSyncExternalStore(
    documentStore.subscribe,
    () => documentStore.isReconnecting(),
    () => false,
  );

  const [draftSession, setDraftSession] = useState<ChatSessionInfo | null>(
    null,
  );

  const refreshDraft = useCallback(async () => {
    try {
      setDraftSession(await fetchDraftForPath(path));
    } catch {
      setDraftSession(null);
    }
  }, [path]);

  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      void fetchDraftForPath(path)
        .then((next) => {
          if (!cancelled) setDraftSession(next);
        })
        .catch(() => {
          if (!cancelled) setDraftSession(null);
        });
    };
    tick();
    const id = setInterval(tick, DRAFT_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [path]);

  const discardDraft = useCallback(async () => {
    const id = draftSession?.id;
    if (!id) return;
    // Close without stage — overlay discarded, live tree untouched.
    await closeChatSession(id);
    setDraftSession(null);
  }, [draftSession?.id]);

  return {
    path,
    doc,
    awareness,
    peers,
    synced,
    reconnecting,
    userInfo: resolvedUser,
    draftSession,
    refreshDraft,
    discardDraft,
  };
}
