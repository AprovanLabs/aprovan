/**
 * Hook: retain a `doc:<path>` session and expose Y.Doc / awareness / reconnect
 * for CollabMarkdownEditor (and stream 8's DraftBanner).
 */

import { type CollabUserInfo } from "@aprovan/editor";
import { useEffect, useMemo } from "react";
import { useSyncExternalStore } from "react";
import type { Awareness } from "y-protocols/awareness";
import type * as Y from "yjs";
import { hueFromUserId, memberDisplayName } from "@/features/presence/names";
import { currentUserSub } from "@/lib/notifications";
import { documentStore, type DocPeer } from "./store";

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
};

function defaultUserInfo(): CollabUserInfo {
  const id = currentUserSub() ?? "local";
  const hue = hueFromUserId(id);
  return {
    name: memberDisplayName(id),
    color: `hsl(${hue} 45% 42%)`,
  };
}

/**
 * Retain a live doc session for `path`. Wire `doc` + `awareness` + `userInfo`
 * into CollabMarkdownEditor; use `reconnecting` for the UX badge.
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

  return {
    path,
    doc,
    awareness,
    peers,
    synced,
    reconnecting,
    userInfo: resolvedUser,
  };
}
