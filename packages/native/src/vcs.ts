/**
 * Native version-control — workspace commit store (commit / log / show /
 * diff / branches / restore), the surface the tech plan moves off `vfs`.
 *
 * Note: this is intentionally *not* the frozen `@utdk/vcs` Git-hosting
 * client (repos / pullRequests / …). Rebinding the `vcs` interface to a
 * hosting provider that speaks that contract is a follow-on concern for
 * streams 5–8; stream 3 implements the workspace store ops the split needs.
 */

export const NATIVE_VCS_OPERATIONS = [
  "commit",
  "log",
  "show",
  "diff",
  "branches",
  "restore",
] as const;

export type NativeVcsOperation = (typeof NATIVE_VCS_OPERATIONS)[number];

export interface NativeVcsCommit {
  id: string;
  message?: string;
  createdAt: string;
  parents: string[];
  snapshot: string;
  author?: string;
}

export interface NativeVcsDiff {
  added: string[];
  modified: string[];
  removed: string[];
}

export interface NativeVcsBackend {
  /** Stage a working-tree write (tests / gateway wiring). */
  stage?(path: string, contentHash: string): void;
  commit(args: { message?: string; author?: string }): Promise<{ commit: NativeVcsCommit; created: boolean }>;
  log(args: { limit?: number }): Promise<{ commits: NativeVcsCommit[] }>;
  show(args: { commit: string }): Promise<{
    commit: NativeVcsCommit;
    files: string[];
    changes: NativeVcsDiff;
  }>;
  diff(args: { from: string; to: string }): Promise<NativeVcsDiff & { from: string; to: string }>;
  branches(): Promise<{ branches: Array<{ name: string; commit: string }> }>;
  restore(args: {
    commit: string;
    path?: string;
    prefix?: string;
  }): Promise<{ commit: string; restored: string[] }>;
}

export interface NativeVcsClient {
  commit: NativeVcsBackend["commit"];
  log: NativeVcsBackend["log"];
  show: NativeVcsBackend["show"];
  diff: NativeVcsBackend["diff"];
  branches: NativeVcsBackend["branches"];
  restore: NativeVcsBackend["restore"];
}

export interface NativeVcsOptions {
  backend: NativeVcsBackend;
}

export function createNativeVcs(options: NativeVcsOptions): NativeVcsClient {
  const { backend } = options;
  return {
    commit: (args) => backend.commit(args),
    log: (args) => backend.log(args),
    show: (args) => backend.show(args),
    diff: (args) => backend.diff(args),
    branches: () => backend.branches(),
    restore: (args) => backend.restore(args),
  };
}

/** In-memory linear commit store for conformance tests. */
export function createMemoryVcsBackend(): NativeVcsBackend {
  const commits: NativeVcsCommit[] = [];
  const snapshots = new Map<string, Map<string, string>>();
  let head: string | undefined;
  const tree = new Map<string, string>();

  const snapshotId = (): string => `snap-${crypto.randomUUID().slice(0, 8)}`;
  const commitId = (): string => `cmt-${crypto.randomUUID().slice(0, 12)}`;

  const resolve = (commitish: string): NativeVcsCommit => {
    if (commitish === "main" || commitish === "HEAD") {
      if (!head) throw Object.assign(new Error("no commits yet"), { status: 404 });
      return commits.find((c) => c.id === head)!;
    }
    const hit = commits.find((c) => c.id === commitish || c.id.startsWith(commitish));
    if (!hit) throw Object.assign(new Error(`unknown commit: ${commitish}`), { status: 404 });
    return hit;
  };

  const diffMaps = (from: Map<string, string>, to: Map<string, string>): NativeVcsDiff => {
    const added: string[] = [];
    const modified: string[] = [];
    const removed: string[] = [];
    for (const [path, hash] of to) {
      const before = from.get(path);
      if (before === undefined) added.push(path);
      else if (before !== hash) modified.push(path);
    }
    for (const path of from.keys()) {
      if (!to.has(path)) removed.push(path);
    }
    added.sort();
    modified.sort();
    removed.sort();
    return { added, modified, removed };
  };

  return {
    stage(path, contentHash) {
      tree.set(path, contentHash);
    },

    async commit({ message, author }) {
      const parent = head ? snapshots.get(resolve(head).snapshot)! : new Map();
      const changes = diffMaps(parent, tree);
      if (changes.added.length + changes.modified.length + changes.removed.length === 0 && head) {
        return { commit: resolve(head), created: false };
      }
      const snap = snapshotId();
      snapshots.set(snap, new Map(tree));
      const commit: NativeVcsCommit = {
        id: commitId(),
        ...(message !== undefined ? { message } : {}),
        createdAt: new Date().toISOString(),
        parents: head ? [head] : [],
        snapshot: snap,
        ...(author !== undefined ? { author } : {}),
      };
      commits.unshift(commit);
      head = commit.id;
      return { commit, created: true };
    },

    async log({ limit = 50 } = {}) {
      return { commits: commits.slice(0, limit) };
    },

    async show({ commit: commitish }) {
      const commit = resolve(commitish);
      const snap = snapshots.get(commit.snapshot) ?? new Map();
      const parentSnap =
        commit.parents[0] !== undefined
          ? snapshots.get(resolve(commit.parents[0]).snapshot) ?? new Map()
          : new Map();
      return {
        commit,
        files: [...snap.keys()].sort(),
        changes: diffMaps(parentSnap, snap),
      };
    },

    async diff({ from, to }) {
      const a = resolve(from);
      const b = resolve(to);
      const fromSnap = snapshots.get(a.snapshot) ?? new Map();
      const toSnap = snapshots.get(b.snapshot) ?? new Map();
      return { from: a.id, to: b.id, ...diffMaps(fromSnap, toSnap) };
    },

    async branches() {
      return {
        branches: head ? [{ name: "main", commit: head }] : [],
      };
    },

    async restore({ commit: commitish, path, prefix }) {
      const commit = resolve(commitish);
      const snap = snapshots.get(commit.snapshot) ?? new Map();
      const restored: string[] = [];
      for (const [filePath, hash] of snap) {
        if (path && filePath !== path) continue;
        if (prefix && !filePath.startsWith(prefix)) continue;
        tree.set(filePath, hash);
        restored.push(filePath);
      }
      restored.sort();
      return { commit: commit.id, restored };
    },
  };
}
