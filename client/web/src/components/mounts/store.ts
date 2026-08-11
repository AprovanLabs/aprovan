/**
 * Shared mounts list cache so the management panel and file-tree badge stay
 * in sync after add/remove without a full page reload.
 */

import { addMount as apiAdd, listMounts as apiList, removeMount as apiRemove } from "./api";
import { buildMountTitleMap } from "./format";
import type { MountDraft, VfsMountRecord } from "./types";

type Listener = () => void;

let mounts: VfsMountRecord[] = [];
let titleMap = new Map<string, string>();
let loaded = false;
let loadPromise: Promise<VfsMountRecord[]> | null = null;
const listeners = new Set<Listener>();

function publish(): void {
  titleMap = buildMountTitleMap(mounts);
  for (const listener of listeners) listener();
}

function setMounts(next: VfsMountRecord[]): void {
  mounts = next;
  loaded = true;
  publish();
}

export const mountsStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): readonly VfsMountRecord[] {
    return mounts;
  },

  getTitleMap(): ReadonlyMap<string, string> {
    return titleMap;
  },

  isLoaded(): boolean {
    return loaded;
  },

  async refresh(force = false): Promise<VfsMountRecord[]> {
    if (!force && loadPromise) return loadPromise;
    if (!force && loaded) return mounts;

    loadPromise = (async () => {
      const listed = await apiList();
      setMounts(listed);
      return listed;
    })();

    try {
      return await loadPromise;
    } finally {
      loadPromise = null;
    }
  },

  async add(draft: MountDraft): Promise<VfsMountRecord> {
    const created = await apiAdd(draft);
    setMounts([...mounts.filter((m) => m.prefix !== created.prefix), created]);
    return created;
  },

  async remove(prefix: string): Promise<boolean> {
    const removed = await apiRemove(prefix);
    if (removed) {
      setMounts(mounts.filter((m) => m.prefix !== prefix));
    }
    return removed;
  },
};
