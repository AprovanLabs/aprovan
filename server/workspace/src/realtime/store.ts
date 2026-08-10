/**
 * Broker-owned ephemeral state store — the interface namespace handlers use
 * instead of holding per-connection/per-user state in module closures (spec
 * "Namespace handlers hold no state").
 *
 * Ephemeral: never persisted, and dropped for a workspace when the broker
 * drops that workspace's connection state.
 */

export interface NamespaceStore {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<boolean>;
  /** Entries whose key starts with prefix, unordered. */
  list<T>(prefix: string): Promise<Array<[string, T]>>;
}

export interface NamespaceStoreFactory {
  storeFor(workspaceId: string, namespace: string): NamespaceStore;
  /** Drop all stores for a workspace (broker calls on workspace drop). */
  dropWorkspace(workspaceId: string): void;
}

function storeKey(workspaceId: string, namespace: string): string {
  return `${workspaceId}\0${namespace}`;
}

function createInProcessNamespaceStore(): NamespaceStore {
  const data = new Map<string, unknown>();
  return {
    async get<T>(key: string): Promise<T | undefined> {
      return data.get(key) as T | undefined;
    },
    async set<T>(key: string, value: T): Promise<void> {
      data.set(key, value);
    },
    async delete(key: string): Promise<boolean> {
      return data.delete(key);
    },
    async list<T>(prefix: string): Promise<Array<[string, T]>> {
      const entries: Array<[string, T]> = [];
      for (const [key, value] of data) {
        if (key.startsWith(prefix)) entries.push([key, value as T]);
      }
      return entries;
    },
  };
}

function createInProcessNamespaceStoreFactory(): NamespaceStoreFactory {
  const stores = new Map<string, NamespaceStore>();

  return {
    storeFor(workspaceId, namespace) {
      const key = storeKey(workspaceId, namespace);
      let store = stores.get(key);
      if (!store) {
        store = createInProcessNamespaceStore();
        stores.set(key, store);
      }
      return store;
    },
    dropWorkspace(workspaceId) {
      const prefix = `${workspaceId}\0`;
      for (const key of stores.keys()) {
        if (key.startsWith(prefix)) stores.delete(key);
      }
    },
  };
}

/**
 * Selection seam only, not a live per-workspace dispatch: always constructs
 * the in-process backend (D16). `resolveLocusDispatch` (runtime/config.ts)
 * needs a `WorkspaceLocusKind`, and turning a `workspaceId` into one is an
 * async `getWorkspace` read — this factory is synchronous and SHALL NOT
 * perform that lookup. Real per-locus dispatch (a `local`-locus workspace
 * keeps the in-process backend; a cloud-locus workspace would resolve
 * through a distributed backend here) is deferred to whichever change adds
 * that backend (tech-plan D3).
 */
export function createNamespaceStoreFactory(): NamespaceStoreFactory {
  return createInProcessNamespaceStoreFactory();
}
