import { useEffect, useSyncExternalStore } from "react";
import { mountsStore } from "./store";
import type { VfsMountRecord } from "./types";

/** Live mounts list; triggers an initial fetch when the store is cold. */
export function useMounts(): {
  mounts: readonly VfsMountRecord[];
  loaded: boolean;
  refresh: (force?: boolean) => Promise<VfsMountRecord[]>;
} {
  const mounts = useSyncExternalStore(
    mountsStore.subscribe,
    () => mountsStore.getSnapshot(),
    () => mountsStore.getSnapshot(),
  );
  const loaded = useSyncExternalStore(
    mountsStore.subscribe,
    () => mountsStore.isLoaded(),
    () => mountsStore.isLoaded(),
  );

  useEffect(() => {
    if (!loaded) void mountsStore.refresh().catch(() => undefined);
  }, [loaded]);

  return {
    mounts,
    loaded,
    refresh: (force) => mountsStore.refresh(force),
  };
}

/**
 * Path → "Mounted — read-only" titles for {@link WorkspaceTree}'s `mountTitles`
 * prop. Updates when mounts are added/removed via the store.
 */
export function useMountTreeTitles(): ReadonlyMap<string, string> {
  useMounts();
  return useSyncExternalStore(
    mountsStore.subscribe,
    () => mountsStore.getTitleMap(),
    () => mountsStore.getTitleMap(),
  );
}
