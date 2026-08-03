/**
 * Workspace filesystem for patchwork.
 *
 * A sync layer over two stores: the gateway's workspace FS (`/fs` routes —
 * the source of truth that follows the workspace across devices and agents)
 * and browser OPFS (offline cache + write-ahead store). When the gateway is
 * configured, every mutation lands in OPFS first (nothing is ever lost to a
 * dropped connection) and then write-through to the gateway; failures are
 * journaled and flushed on the next successful contact. Reads prefer the
 * gateway and fall back to the cache. Without a gateway, OPFS is simply the
 * store. Every exported helper is backend-agnostic so `ChatPage` never knows
 * which mode it's in.
 */

import {
  resolveEntry,
  type VirtualFile,
  type VirtualProject,
  type WatchCallback,
} from "@aprovan/patchwork-compiler";
import type { WidgetVfs } from "@aprovan/patchwork-editor";
import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";

const watchers = new Set<WatchCallback>();
const normalize = (path: string) => path.replace(/^\/+|\/+$/g, "");
const split = (path: string) => normalize(path).split("/").filter(Boolean);

/**
 * Workspaces with more paths than this use prefix-on-expand lazy tree loading
 * in the sidebar (openspec product-ux-followup-2 tech-plan D6). Under the
 * threshold the client keeps the eager full flat list it has always used.
 */
export const LAZY_TREE_THRESHOLD = 500;

export interface WorkspaceListPage {
  paths: string[];
  cursor?: string;
}

export function mergeWorkspacePaths(existing: string[], added: string[]): string[] {
  const merged = new Set(existing);
  for (const path of added) merged.add(path);
  return [...merged].sort();
}

// ---------------------------------------------------------------------------
// Active session (VCS overlay scope)
// ---------------------------------------------------------------------------

/**
 * When the active chat session is *staged*, every FS operation carries
 * `?session=<id>` and resolves against the session's overlay view on the
 * gateway (registry docs/vcs-and-sessions.md) — the live tree is untouched
 * until the user stages the session onto main. Staged scope is online-only:
 * the OPFS write-ahead cache and offline journal are bypassed so the shared
 * cache can never leak one session's staged content into another's view.
 * Auto sessions (`staged: false`) change nothing.
 */
let activeVfsSession: { id: string; staged: boolean } | null = null;

export function setActiveVfsSession(session: { id: string; staged: boolean } | null): void {
  activeVfsSession = session;
  for (const watcher of watchers) watcher("update", "");
}

function stagedSessionQuery(first = true): string {
  if (!activeVfsSession?.staged) return "";
  return `${first ? "?" : "&"}session=${encodeURIComponent(activeVfsSession.id)}`;
}

function isStagedScope(): boolean {
  return activeVfsSession?.staged === true;
}

// ---------------------------------------------------------------------------
// Live sync — near-real-time propagation across windows and collaborators
// ---------------------------------------------------------------------------

const LIVE_SYNC_INTERVAL_MS = 8_000;

/**
 * Poll the gateway's change feed (`GET /fs/changes`, registry
 * routes/fs.ts) and fire the ordinary watchers for exactly what changed —
 * the same machinery local writes use, so trees refresh and open tabs mark
 * stale no matter *who* made the change. This replaced a full unprefixed
 * `/fs` listing fetched (and locally hash-diffed) every tick: an idle
 * workspace now costs the server one in-memory cursor comparison and a 304,
 * not a full store read, every 8 seconds per visible tab.
 *
 * `since`/`If-None-Match` carry the last cursor this tab has seen: 304 means
 * nothing changed (no-op); a 200 carries exactly the deltas since then. A
 * `reset` response (first poll, a scope switch, or the server's journal
 * having lost history — restart or ring overflow) rebaselines the cursor
 * silently, the same "observe, don't announce" contract the old hash-diff
 * baseline had. Polling is the v1 transport; a push/CRDT feed can replace
 * this without touching callers.
 */
export function startLiveWorkspaceSync(): () => void {
  let scope = activeVfsSession?.staged ? activeVfsSession.id : "";
  let cursor: number | undefined;
  let stopped = false;

  const tick = async (): Promise<void> => {
    if (stopped || document.visibilityState !== "visible" || !GATEWAY_BASE) return;
    const currentScope = activeVfsSession?.staged ? activeVfsSession.id : "";
    if (currentScope !== scope) {
      // Scope switch — rebaseline against the new scope's own change feed
      // rather than diffing across two unrelated cursor spaces.
      scope = currentScope;
      cursor = undefined;
    }
    try {
      const query = new URLSearchParams();
      if (cursor !== undefined) query.set("since", String(cursor));
      if (scope) query.set("session", scope);
      const headers: Record<string, string> =
        cursor !== undefined ? { "If-None-Match": `"${cursor}"` } : {};
      const response = await gatewayFetch(`${GATEWAY_BASE}/fs/changes?${query}`, { headers });
      if (response.status === 304) return; // Nothing changed — no store read on the server either.
      if (!response.ok) return;
      const body = (await response.json()) as {
        cursor: number;
        reset: boolean;
        changes: Array<{ path: string; kind: "update" | "delete" }>;
      };
      cursor = body.cursor;
      if (body.reset) {
        // First poll, or the server's journal couldn't answer — rebaseline
        // without announcing (avoids a storm of spurious events on restart).
        return;
      }
      for (const change of body.changes) {
        for (const watcher of watchers) watcher(change.kind, change.path);
      }
    } catch {
      // Offline / transient — try again next tick.
    }
  };

  const timer = setInterval(() => void tick(), LIVE_SYNC_INTERVAL_MS);
  const onVisible = (): void => void tick();
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    stopped = true;
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

const MIME_BY_EXTENSION: Record<string, string> = {
  ts: "text/typescript",
  tsx: "text/typescript",
  js: "text/javascript",
  jsx: "text/javascript",
  json: "application/json",
  md: "text/markdown",
  css: "text/css",
  html: "text/html",
};

const mimeType = (path: string): string =>
  MIME_BY_EXTENSION[path.split(".").pop() ?? ""] ?? "text/plain";

interface WorkspaceBackend {
  /** File paths under a prefix, sorted. Paginate with limit/cursor when given. */
  list(
    prefix?: string,
    opts?: { limit?: number; cursor?: string },
  ): Promise<WorkspaceListPage>;
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<void>;
  /** Delete a file, or a whole subtree with recursive. */
  remove(path: string, recursive?: boolean): Promise<void>;
}

// ---------------------------------------------------------------------------
// OPFS backend (offline / unconfigured)
// ---------------------------------------------------------------------------

type IterableDirectoryHandle = FileSystemDirectoryHandle & {
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
};

async function opfsDirectory(
  path: string,
  create = false,
): Promise<FileSystemDirectoryHandle> {
  let current = await navigator.storage.getDirectory();
  for (const part of split(path)) {
    current = await current.getDirectoryHandle(part, { create });
  }
  return current;
}

async function opfsList(
  handle?: FileSystemDirectoryHandle,
  prefix = "",
): Promise<string[]> {
  const current = handle ?? (await navigator.storage.getDirectory());
  const files: string[] = [];
  for await (const [name, entry] of (
    current as IterableDirectoryHandle
  ).entries()) {
    const path = prefix ? `${prefix}/${name}` : name;
    if (entry.kind === "directory") {
      files.push(...(await opfsList(entry as FileSystemDirectoryHandle, path)));
    } else {
      files.push(path);
    }
  }
  return files.sort();
}

const opfsBackend: WorkspaceBackend = {
  async list(prefix = "", opts) {
    const all = await opfsList();
    const scope = normalize(prefix);
    const scoped = scope
      ? all.filter((p) => p === scope || p.startsWith(`${scope}/`))
      : all;
    if (!opts?.limit) return { paths: scoped };
    const after = opts.cursor ?? "";
    const start = after ? scoped.findIndex((p) => p > after) : 0;
    const slice = scoped.slice(start < 0 ? scoped.length : start, start + opts.limit);
    const cursor =
      start >= 0 && start + opts.limit < scoped.length
        ? slice[slice.length - 1]
        : undefined;
    return { paths: slice, ...(cursor ? { cursor } : {}) };
  },
  async read(path) {
    const parts = split(path);
    const name = parts.pop();
    if (!name) throw new Error("File path is required");
    const handle = await (await opfsDirectory(parts.join("/"))).getFileHandle(name);
    return (await handle.getFile()).text();
  },
  async write(path, content) {
    const parts = split(path);
    const name = parts.pop();
    if (!name) throw new Error("File path is required");
    const handle = await (
      await opfsDirectory(parts.join("/"), true)
    ).getFileHandle(name, { create: true });
    const writer = await handle.createWritable();
    await writer.write(content);
    await writer.close();
  },
  async remove(path, recursive = false) {
    const parts = split(path);
    const name = parts.pop();
    if (!name) throw new Error("File path is required");
    await (await opfsDirectory(parts.join("/"))).removeEntry(name, { recursive });
  },
};

// ---------------------------------------------------------------------------
// Gateway backend (the workspace's real filesystem)
// ---------------------------------------------------------------------------

const gatewayBackend: WorkspaceBackend = {
  async list(prefix = "", opts) {
    const params = new URLSearchParams();
    const scope = normalize(prefix);
    if (scope) params.set("prefix", scope);
    if (opts?.limit) params.set("limit", String(opts.limit));
    if (opts?.cursor) params.set("cursor", opts.cursor);
    const query = params.toString();
    const response = await gatewayFetch(
      `${GATEWAY_BASE}/fs${query ? `?${query}` : ""}${stagedSessionQuery(!query)}`,
    );
    if (!response.ok) throw new Error(`fs list failed (${response.status})`);
    const body = (await response.json()) as {
      entries: Array<{ path: string }>;
      cursor?: string;
    };
    return {
      paths: body.entries.map((entry) => entry.path),
      ...(body.cursor ? { cursor: body.cursor } : {}),
    };
  },
  async read(path) {
    const response = await gatewayFetch(
      `${GATEWAY_BASE}/fs/${normalize(path)}${stagedSessionQuery()}`,
    );
    if (!response.ok) throw new Error(`fs read failed (${response.status})`);
    return ((await response.json()) as { content: string }).content;
  },
  async write(path, content) {
    const response = await gatewayFetch(
      `${GATEWAY_BASE}/fs/${normalize(path)}${stagedSessionQuery()}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, mimeType: mimeType(path) }),
      },
    );
    if (!response.ok) throw new Error(`fs write failed (${response.status})`);
  },
  async remove(path, recursive = false) {
    const suffix = recursive ? "?recursive=1" : "";
    const response = await gatewayFetch(
      `${GATEWAY_BASE}/fs/${normalize(path)}${suffix}${stagedSessionQuery(!suffix)}`,
      { method: "DELETE" },
    );
    if (!response.ok) throw new Error(`fs delete failed (${response.status})`);
  },
};

// ---------------------------------------------------------------------------
// Offline journal
// ---------------------------------------------------------------------------

/**
 * Mutations that couldn't reach the gateway. Only the operation + path are
 * journaled — the content of a pending write is whatever OPFS holds for that
 * path at flush time, so repeated offline edits collapse into one upload.
 * Persisted in localStorage (OPFS itself holds the file bodies); like OPFS
 * it is origin-scoped, not workspace-scoped.
 */
interface PendingOp {
  op: "write" | "remove";
  path: string;
  recursive?: boolean;
}

const PENDING_KEY = "patchwork:wfs-pending";

function loadPending(): PendingOp[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) ?? "[]") as PendingOp[];
  } catch {
    return [];
  }
}

function savePending(entries: PendingOp[]): void {
  try {
    if (entries.length === 0) localStorage.removeItem(PENDING_KEY);
    else localStorage.setItem(PENDING_KEY, JSON.stringify(entries));
  } catch {
    // Journal persistence is best-effort; in-memory state still applies.
  }
  notifySyncState();
}

// ---------------------------------------------------------------------------
// Sync state — "is my workspace saved?" as one tiny signal
// ---------------------------------------------------------------------------

export interface WorkspaceSyncState {
  /** Journaled mutations that haven't reached the gateway yet. */
  pending: number;
  online: boolean;
}

const syncListeners = new Set<(state: WorkspaceSyncState) => void>();

function currentSyncState(): WorkspaceSyncState {
  return { pending: pending.length, online: navigator.onLine };
}

function notifySyncState(): void {
  for (const listener of syncListeners) listener(currentSyncState());
}

/**
 * Subscribe to the workspace sync signal the chat's status chip renders
 * ("Synced" / "Syncing…" / "Offline"). Fires immediately with the current
 * state, then on every journal change and online/offline transition.
 */
export function subscribeToSyncState(
  listener: (state: WorkspaceSyncState) => void,
): () => void {
  syncListeners.add(listener);
  listener(currentSyncState());
  const onNetwork = (): void => notifySyncState();
  window.addEventListener("online", onNetwork);
  window.addEventListener("offline", onNetwork);
  return () => {
    syncListeners.delete(listener);
    window.removeEventListener("online", onNetwork);
    window.removeEventListener("offline", onNetwork);
  };
}

let pending: PendingOp[] = loadPending();

function setPending(path: string, op: PendingOp): void {
  pending = [...pending.filter((entry) => entry.path !== path), op];
  savePending(pending);
}

function clearPending(path: string): void {
  if (!pending.some((entry) => entry.path === path)) return;
  pending = pending.filter((entry) => entry.path !== path);
  savePending(pending);
}

function hasPendingWrite(path: string): boolean {
  return pending.some((entry) => entry.op === "write" && entry.path === path);
}

let flushInFlight: Promise<void> | null = null;

/** Replay journaled mutations against the gateway; stops on first failure. */
function flushPending(): Promise<void> {
  if (pending.length === 0) return Promise.resolve();
  flushInFlight ??= (async () => {
    try {
      for (const entry of [...pending]) {
        if (entry.op === "write") {
          await gatewayBackend.write(entry.path, await opfsBackend.read(entry.path));
        } else {
          await gatewayBackend.remove(entry.path, entry.recursive);
        }
        clearPending(entry.path);
      }
    } catch {
      // Still offline (or a conflicting failure); retry on next contact.
    } finally {
      flushInFlight = null;
    }
  })();
  return flushInFlight;
}

/** A gateway op succeeded — good moment to drain the journal. */
function noteOnline(): void {
  if (pending.length > 0) void flushPending();
}

// ---------------------------------------------------------------------------
// Synced backend: OPFS cache + write-ahead, gateway source of truth
// ---------------------------------------------------------------------------

const syncedBackend: WorkspaceBackend = {
  async list(prefix = "", opts) {
    // Staged session scope: gateway only — no OPFS merge, no journal (see
    // setActiveVfsSession).
    if (isStagedScope()) return gatewayBackend.list(prefix, opts);
    try {
      const remote = await gatewayBackend.list(prefix, opts);
      noteOnline();
      const scope = normalize(prefix);
      const inScope = (path: string) =>
        !scope || path === scope || path.startsWith(`${scope}/`);
      const removed = new Set(
        pending.filter((entry) => entry.op === "remove").map((entry) => entry.path),
      );
      const merged = new Set(
        remote.paths.filter(
          (path) =>
            !removed.has(path) &&
            ![...removed].some((removedPath) => path.startsWith(`${removedPath}/`)),
        ),
      );
      for (const entry of pending) {
        if (entry.op === "write" && inScope(entry.path)) merged.add(entry.path);
      }
      const paths = [...merged].sort();
      if (!opts?.limit) return { paths };
      const after = opts.cursor ?? "";
      const start = after ? paths.findIndex((p) => p > after) : 0;
      const slice = paths.slice(start < 0 ? paths.length : start, start + opts.limit);
      const cursor =
        start >= 0 && start + opts.limit < paths.length
          ? slice[slice.length - 1]
          : undefined;
      return { paths: slice, ...(cursor ? { cursor } : {}) };
    } catch {
      return opfsBackend.list(prefix, opts);
    }
  },
  async read(path) {
    if (isStagedScope()) return gatewayBackend.read(path);
    if (!hasPendingWrite(path)) {
      try {
        const content = await gatewayBackend.read(path);
        noteOnline();
        // Refresh the offline cache in the background.
        void opfsBackend.write(path, content).catch(() => {});
        return content;
      } catch {
        // Gateway unreachable or file gateway-side missing — serve the cache.
      }
    }
    return opfsBackend.read(path);
  },
  async write(path, content) {
    if (isStagedScope()) return gatewayBackend.write(path, content);
    // Local-first: OPFS before the network, so a dropped connection never
    // loses an edit.
    await opfsBackend.write(path, content);
    try {
      await gatewayBackend.write(path, content);
      clearPending(path);
      noteOnline();
    } catch {
      setPending(path, { op: "write", path });
    }
  },
  async remove(path, recursive = false) {
    if (isStagedScope()) return gatewayBackend.remove(path, recursive);
    await opfsBackend.remove(path, recursive).catch(() => {});
    try {
      await gatewayBackend.remove(path, recursive);
      clearPending(path);
      noteOnline();
    } catch {
      setPending(path, { op: "remove", path, recursive });
    }
  },
};

// ---------------------------------------------------------------------------
// Backend selection
// ---------------------------------------------------------------------------

let backendPromise: Promise<WorkspaceBackend> | null = null;

/**
 * One-time OPFS → gateway migration. Files written before the gateway WFS
 * existed live only in browser OPFS; when the gateway becomes reachable and
 * the workspace tree is missing them, copy them up so nothing "disappears"
 * from the tree when the source of truth moves server-side.
 */
async function migrateOpfsToGateway(): Promise<void> {
  let localPaths: string[];
  try {
    localPaths = await opfsList();
  } catch {
    return; // No OPFS support — nothing to migrate.
  }
  if (localPaths.length === 0) return;
  const remotePaths = new Set((await gatewayBackend.list()).paths);
  const missing = localPaths.filter((path) => !remotePaths.has(path));
  await Promise.all(
    missing.map(async (path) => {
      try {
        await gatewayBackend.write(path, await opfsBackend.read(path));
      } catch {
        // Best-effort: an unreadable or rejected file shouldn't block the rest.
      }
    }),
  );
}

function backend(): Promise<WorkspaceBackend> {
  backendPromise ??= (async () => {
    if (!GATEWAY_BASE) return opfsBackend;
    try {
      const response = await gatewayFetch(`${GATEWAY_BASE}/fs`);
      if (response.ok) {
        await flushPending();
        await migrateOpfsToGateway();
        return syncedBackend;
      }
    } catch {
      // Gateway unreachable right now — the synced backend still serves the
      // OPFS cache and journals mutations until contact resumes.
    }
    return syncedBackend;
  })();
  return backendPromise;
}

/** Forget cached backend/session state (e.g. after a workspace switch). */
export function resetStore(): void {
  backendPromise = null;
}

// ---------------------------------------------------------------------------
// Shared helpers (backend-agnostic; the ChatPage surface)
// ---------------------------------------------------------------------------

export async function readFile(path: string): Promise<string> {
  return (await backend()).read(path);
}

/**
 * Read a file from the live workspace, ignoring any active staged-session
 * scope — the merge dialog uses this to show "the workspace version" next
 * to "this draft's version".
 */
export async function readWorkspaceFileUnscoped(path: string): Promise<string> {
  const response = await gatewayFetch(`${GATEWAY_BASE}/fs/${normalize(path)}`);
  if (!response.ok) throw new Error(`fs read failed (${response.status})`);
  return ((await response.json()) as { content: string }).content;
}

/**
 * Write a single workspace file (creating it if it doesn't exist yet).
 * Notifies watchers, which is what drives the sidebar tree's auto-refresh —
 * `ChatPage`'s "new file" flow relies on that instead of an explicit reload.
 */
/** Paths this window itself wrote recently — lets consumers tell "my own
 *  save echoed back" apart from "someone else changed this file". */
const recentLocalWrites = new Map<string, number>();
const LOCAL_WRITE_WINDOW_MS = 15_000;

function noteLocalWrite(path: string): void {
  recentLocalWrites.set(normalize(path), Date.now());
  if (recentLocalWrites.size > 200) {
    const cutoff = Date.now() - LOCAL_WRITE_WINDOW_MS;
    for (const [key, ts] of recentLocalWrites) {
      if (ts < cutoff) recentLocalWrites.delete(key);
    }
  }
}

export function wasRecentLocalWrite(path: string): boolean {
  const ts = recentLocalWrites.get(normalize(path));
  return ts !== undefined && Date.now() - ts < LOCAL_WRITE_WINDOW_MS;
}

export async function writeFile(path: string, content: string): Promise<void> {
  noteLocalWrite(path);
  await (await backend()).write(path, content);
  for (const watcher of watchers) watcher("update", normalize(path));
}

/**
 * Delete a workspace file or (with recursive) a whole directory subtree.
 * Watchers fire per removed path so open tabs close and trees refresh.
 */
export async function deleteWorkspacePath(
  path: string,
  options: { recursive?: boolean } = {},
): Promise<void> {
  const target = normalize(path);
  noteLocalWrite(target);
  const store = await backend();
  const removed = options.recursive
    ? (await store.list(target)).paths.filter((p) => p === target || p.startsWith(`${target}/`))
    : [target];
  await store.remove(target, options.recursive);
  for (const removedPath of removed.length > 0 ? removed : [target]) {
    for (const watcher of watchers) watcher("delete", removedPath);
  }
}

export async function listWorkspacePathsPage(
  prefix = "",
  opts?: { limit?: number; cursor?: string },
): Promise<WorkspaceListPage> {
  return (await backend()).list(prefix, opts);
}

/** Drain every page under a prefix (used when a lazy tree directory expands). */
export async function listWorkspacePathsUnderPrefix(prefix = ""): Promise<string[]> {
  const paths: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await listWorkspacePathsPage(prefix, {
      limit: 1000,
      ...(cursor ? { cursor } : {}),
    });
    paths.push(...page.paths);
    cursor = page.cursor;
  } while (cursor);
  return paths;
}

/**
 * Probe whether the workspace exceeds {@link LAZY_TREE_THRESHOLD}. Returns the
 * first page of paths when large (for lazy-tree seeding) or the full list when
 * small.
 */
export async function probeWorkspacePaths(): Promise<{
  lazy: boolean;
  paths: string[];
}> {
  const page = await listWorkspacePathsPage("", { limit: LAZY_TREE_THRESHOLD + 1 });
  if (page.cursor) return { lazy: true, paths: page.paths };
  return { lazy: false, paths: page.paths };
}

export async function listWorkspacePaths(): Promise<string[]> {
  const page = await listWorkspacePathsPage();
  if (!page.cursor) return page.paths;
  const paths = [...page.paths];
  let cursor: string | undefined = page.cursor;
  while (cursor) {
    const next = await listWorkspacePathsPage("", { limit: 1000, cursor });
    paths.push(...next.paths);
    cursor = next.cursor;
  }
  return paths;
}

export async function loadWorkspaceDirectoryProject(
  directoryPath: string,
): Promise<VirtualProject | null> {
  const prefix = normalize(directoryPath);
  const paths = (await (await backend()).list(prefix)).paths;
  if (!paths.length) return null;
  const files = new Map<string, VirtualFile>();
  await Promise.all(
    paths.map(async (path) => {
      const relativePath = prefix ? path.slice(prefix.length + 1) : path;
      files.set(relativePath, {
        path: relativePath,
        content: await readFile(path),
      });
    }),
  );
  return { id: prefix, entry: resolveEntry(files), files };
}

export async function loadWorkspaceFileProject(
  filePath: string,
): Promise<VirtualProject | null> {
  const parts = split(filePath);
  const name = parts.pop();
  if (!name) return null;
  try {
    const content = await readFile(filePath);
    return {
      id: parts.join("/"),
      entry: name,
      files: new Map([[name, { path: name, content }]]),
    };
  } catch {
    return null;
  }
}

export function createSingleWorkspaceFileProject(
  filePath: string,
  content: string,
): VirtualProject {
  const parts = split(filePath);
  const name = parts.pop() ?? "main.tsx";
  return {
    id: parts.join("/"),
    entry: name,
    files: new Map([[name, { path: name, content }]]),
  };
}

export async function saveWorkspaceProject(
  project: VirtualProject,
): Promise<void> {
  await Promise.all(
    [...project.files.values()].map((file) =>
      writeFile(
        [normalize(project.id), normalize(file.path)].filter(Boolean).join("/"),
        file.content,
      ),
    ),
  );
}

export function subscribeToWorkspaceChanges(
  callback: WatchCallback,
): () => void {
  watchers.add(callback);
  return () => watchers.delete(callback);
}

/**
 * Widget storage adapter for `CodePreview`: saves land in the workspace FS
 * (gateway or OPFS) instead of the editor package's dev-only `/vfs` routes.
 */
export const workspaceWidgetVfs: WidgetVfs = {
  usePaths: async () => true,
  saveProject: saveWorkspaceProject,
  readFile,
  subscribe: (callback) =>
    subscribeToWorkspaceChanges((event, path) => callback({ path, type: event })),
};
