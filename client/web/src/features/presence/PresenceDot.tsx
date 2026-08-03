import { useSyncExternalStore } from "react";
import { presenceStore } from "./store";
import { memberDisplayName } from "./names";
import { useFilePresence } from "./useFilePresence";

/**
 * 6px presence dot for dense tree rows. Renders nothing with zero peers /
 * disconnected socket.
 */
export function PresenceDot({ path }: { path: string }) {
  const peers = useFilePresence(path);
  if (peers.length === 0) return null;

  const title = peers.map((p) => memberDisplayName(p.userId)).join(", ");

  return (
    <span
      className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
      title={title}
      aria-label={title}
    />
  );
}

/** Tooltip string for a path's peers (for non-React tree decorations). */
export function presenceTooltipForPath(path: string): string | null {
  return presenceStore.getTitleMap().get(path) ?? null;
}

export function usePresenceTitleMap(): Map<string, string> {
  return useSyncExternalStore(
    presenceStore.subscribe,
    () => presenceStore.getTitleMap(),
    () => presenceStore.getTitleMap(),
  );
}
