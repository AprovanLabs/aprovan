import { useSyncExternalStore } from "react";
import { presenceStore } from "./store";
import type { FilePeer } from "./types";

/** Peers focused on `path`, excluding self. Empty when the socket is down. */
export function useFilePresence(path: string): FilePeer[] {
  return useSyncExternalStore(
    presenceStore.subscribe,
    () => presenceStore.getPeers(path),
    () => [],
  );
}

/** True while the realtime socket is open (presence UI may render). */
export function usePresenceConnected(): boolean {
  return useSyncExternalStore(
    presenceStore.subscribe,
    () => presenceStore.isConnected(),
    () => false,
  );
}
