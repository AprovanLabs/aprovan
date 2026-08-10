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
  added: Array<{ path: string; hash: string }>;
  modified: Array<{ path: string; from: string; to: string }>;
  removed: Array<{ path: string; hash: string }>;
}

export interface NativeVcsBackend {
  /** Stage a working-tree write (tests / gateway wiring). */
  stage?(path: string, contentHash: string): void;
  commit(args: {
    message?: string;
    author?: string;
    prefix?: string;
    ref?: string;
  }): Promise<{ commit: NativeVcsCommit; created: boolean }>;
  log(args: { limit?: number; ref?: string }): Promise<{ commits: NativeVcsCommit[] }>;
  show(args: { commit: string }): Promise<{
    commit: NativeVcsCommit;
    files: string[];
    changes: NativeVcsDiff;
  }>;
  diff(args: { from: string; to: string; prefix?: string }): Promise<NativeVcsDiff & { from: string; to: string }>;
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
  /** Ref name -> head commit id. Default ref is "main". */
  const refs = new Map<string, string>();
  const tree = new Map<string, string>();

  const snapshotId = (): string => `snap-${crypto.randomUUID().slice(0, 8)}`;
  const commitId = (): string => `cmt-${crypto.randomUUID().slice(0, 12)}`;

  const resolve = (commitish: string): NativeVcsCommit => {
    const refTarget = commitish === "HEAD" ? refs.get("main") : refs.get(commitish);
    if (refTarget !== undefined) return commits.find((c) => c.id === refTarget)!;
    const hit = commits.find((c) => c.id === commitish || c.id.startsWith(commitish));
    if (!hit) {
      if (commitish === "main" || commitish === "HEAD") {
        throw Object.assign(new Error("no commits yet"), { status: 404 });
      }
      throw Object.assign(new Error(`unknown commit: ${commitish}`), { status: 404 });
    }
    return hit;
  };

  const inPrefix = (path: string, prefix: string): boolean => path === prefix || path.startsWith(`${prefix}/`);

  const filterByPrefix = (map: Map<string, string>, prefix?: string): Map<string, string> => {
    if (!prefix) return map;
    const out = new Map<string, string>();
    for (const [path, hash] of map) {
      if (inPrefix(path, prefix)) out.set(path, hash);
    }
    return out;
  };

  const diffMaps = (from: Map<string, string>, to: Map<string, string>): NativeVcsDiff => {
    const added: Array<{ path: string; hash: string }> = [];
    const modified: Array<{ path: string; from: string; to: string }> = [];
    const removed: Array<{ path: string; hash: string }> = [];
    for (const [path, hash] of to) {
      const before = from.get(path);
      if (before === undefined) added.push({ path, hash });
      else if (before !== hash) modified.push({ path, from: before, to: hash });
    }
    for (const [path, hash] of from) {
      if (!to.has(path)) removed.push({ path, hash });
    }
    const byPath = (a: { path: string }, b: { path: string }): number => a.path.localeCompare(b.path);
    added.sort(byPath);
    modified.sort(byPath);
    removed.sort(byPath);
    return { added, modified, removed };
  };

  const filterDiff = (diff: NativeVcsDiff, prefix?: string): NativeVcsDiff => {
    if (!prefix) return diff;
    return {
      added: diff.added.filter((e) => inPrefix(e.path, prefix)),
      modified: diff.modified.filter((e) => inPrefix(e.path, prefix)),
      removed: diff.removed.filter((e) => inPrefix(e.path, prefix)),
    };
  };

  return {
    stage(path, contentHash) {
      tree.set(path, contentHash);
    },

    async commit({ message, author, prefix, ref }) {
      const refName = ref ?? "main";
      const headId = refs.get(refName);
      const parentSnap = headId ? snapshots.get(resolve(headId).snapshot)! : new Map();
      const scopedTree = filterByPrefix(tree, prefix);
      const changes = diffMaps(parentSnap, scopedTree);
      if (changes.added.length + changes.modified.length + changes.removed.length === 0 && headId) {
        return { commit: resolve(headId), created: false };
      }
      const snap = snapshotId();
      snapshots.set(snap, new Map(scopedTree));
      const commit: NativeVcsCommit = {
        id: commitId(),
        ...(message !== undefined ? { message } : {}),
        createdAt: new Date().toISOString(),
        parents: headId ? [headId] : [],
        snapshot: snap,
        ...(author !== undefined ? { author } : {}),
      };
      commits.unshift(commit);
      refs.set(refName, commit.id);
      return { commit, created: true };
    },

    async log({ limit = 50, ref } = {}) {
      const headId = refs.get(ref ?? "main");
      if (!headId) return { commits: [] };
      const history: NativeVcsCommit[] = [];
      let cursor: string | undefined = headId;
      while (cursor && history.length < limit) {
        const found: NativeVcsCommit | undefined = commits.find((c) => c.id === cursor);
        if (!found) break;
        history.push(found);
        cursor = found.parents[0];
      }
      return { commits: history };
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

    async diff({ from, to, prefix }) {
      const a = resolve(from);
      const b = resolve(to);
      const fromSnap = snapshots.get(a.snapshot) ?? new Map();
      const toSnap = snapshots.get(b.snapshot) ?? new Map();
      return { from: a.id, to: b.id, ...filterDiff(diffMaps(fromSnap, toSnap), prefix) };
    },

    async branches() {
      return {
        branches: [...refs.entries()]
          .map(([name, commit]) => ({ name, commit }))
          .sort((a, b) => a.name.localeCompare(b.name)),
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
