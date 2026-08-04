/**
 * First-party core service namespaces — the infra-level primitives widgets
 * and handlers call as bare injected globals:
 *
 *   await keyvalue.set("draft", { title: "..." });
 *   const draft = await keyvalue.get("draft");
 *   await events.emit("form.submitted", { id: 1 });
 *
 * Every call is auto-tenanted by the caller's workspace and attributed to the
 * calling user — callers never see storage, tenancy, or transport. The SDK
 * surface is the stable contract (think WASI): `keyvalue` is backed by the
 * record store (accumulated state — see records.ts and docs/app-data.md),
 * `vfs`/`events` still ride the workspace FS store, and any of them can swap
 * backends (Valkey/Redis, SNS/Kafka) without touching a single caller.
 *
 * Dispatch rides the same proxy path as UTDK providers
 * (`POST /tools/:namespace/:procedure`), so clients need no special casing:
 * core namespaces appear in tool discovery next to credentialed providers.
 */

import { appsService } from "./apps/service.js";
import {
  appDataDir,
  appFsAllowed,
  assertPartitionAccess,
  hiddenDataPrefixes,
  partitionAccess,
  readWorkspaceConfig,
  resolveAppPath,
} from "./apps/store.js";
import { getFsStore, isServicePath, listAll, normalizeFsPath } from "./fs-store.js";
import { interfacesService } from "./interfaces-service.js";
import { profilesService } from "./profiles-service.js";
import {
  commitTree,
  diffSnapshots,
  listRefs,
  logCommits,
  readSnapshot,
  resolveCommitish,
  restoreCommit,
} from "./vcs/store.js";
import {
  assertNotMounted,
  mountEntries,
  mountRead,
  readMounts,
} from "./vcs/mounts.js";
import { getRecordStore } from "./records.js";
import { assertCallerScope, parseSeqKey, seqKey, svcScope } from "./svc-records.js";
import { sandboxesService } from "./sandboxes/service.js";
import {
  installCoreServices,
  ServiceError,
  type CoreService,
  type CoreServiceName,
  type ServiceContext,
} from "./service-kernel.js";
import { syncService } from "./sync.js";
import {
  requireSession,
  sessionDelete,
  sessionList,
  sessionRead,
  sessionWrite,
  type ChatSessionRecord,
} from "./vcs/chat-sessions.js";
import { notificationsService } from "./notifications/service.js";
import { telemetryService } from "./telemetry/service.js";
import { agentsService } from "./agents/service.js";
import { assertPathGranted, pathAccess } from "./grants.js";
import { sessionsService } from "./vcs/sessions-service.js";
import { webhooksService } from "./webhooks/service.js";
import { workflowsService } from "./workflows/service.js";
import type { ToolEntry } from "./routes/tools.js";

// The contract lives in service-kernel.ts and is deliberately NOT re-exported
// here: this module builds CORE_SERVICES from the service modules at init, so
// anything it imports must never import back. One canonical home for
// ServiceError / ServiceContext / CoreService is what keeps that true.

/** Keys/channels: dotted-path identifiers, no traversal. */
const IDENT_RE = /^[\w][\w.\-:]{0,127}$/u;

function ident(value: unknown, label: string): string {
  if (typeof value !== "string" || !IDENT_RE.test(value)) {
    throw new ServiceError(`${label} must match ${IDENT_RE}`, 400);
  }
  return value;
}

// ---------------------------------------------------------------------------
// keyvalue — accumulated per-partition state. Backend: the record store
// (records.ts) — see docs/app-data.md. Was FS-backed (a key physically lived
// at `.services/keyvalue/<key>` or `<app root>/data/<user>/<key>`); that made
// every write a file version, browsable by any workspace member. Records are
// unversioned and invisible to the file plane by construction.
//
// Legacy FS keys from before this migration are handled lazily: a
// record-store miss falls back to the old file path, and a hit there is
// migrated in place (written to the record store, then the file deleted) —
// see `legacyKvPath`/`readLegacy`. `list` still merges in any not-yet-migrated
// legacy keys so nothing looks lost mid-migration. `scripts/migrate-app-
// records.ts` does the same sweep eagerly, workspace by workspace.
// ---------------------------------------------------------------------------

const KV_LEGACY_PREFIX = ".services/keyvalue/";

/** Record-store scope for this call: "ws" for a workspace caller, always
 * "app#<appId>#u#<userSub>" for an app session — tenancy is `ctx.workspaceId`.
 * The reserved `svc#` system namespace (svc-records.ts) is rejected outright. */
function kvScope(ctx: ServiceContext): string {
  const scope = ctx.appScope;
  const resolved = scope ? `app#${scope.id}#u#${scope.userId}` : "ws";
  assertCallerScope(resolved, "scope", ctx.userId);
  return resolved;
}

/** Where this key would have lived under the old FS-backed keyvalue, for the
 * lazy-migration fallback read and for `list`'s legacy-key merge. */
function legacyKvPath(ctx: ServiceContext, key: string): string {
  const scope = ctx.appScope;
  if (!scope) return KV_LEGACY_PREFIX + key;
  return `${appDataDir(scope.id, scope.userId)}/${key}`;
}

const keyvalue: CoreService = {
  meta: {
    label: "Key value",
    blurb: "Workspace-scoped records: prefix query, JSON viewer/editor",
    icon: "database",
  },
  tools: [
    {
      name: "keyvalue.get",
      operation: "get",
      description: "Read a value by key (null when absent).",
      inputSchema: { type: "object", properties: { key: { type: "string" } }, required: ["key"] },
    },
    {
      name: "keyvalue.set",
      operation: "set",
      description: "Write a JSON-serializable value under a key.",
      inputSchema: {
        type: "object",
        properties: { key: { type: "string" }, value: {} },
        required: ["key", "value"],
      },
    },
    {
      name: "keyvalue.delete",
      operation: "delete",
      description: "Delete a key.",
      inputSchema: { type: "object", properties: { key: { type: "string" } }, required: ["key"] },
    },
    {
      name: "keyvalue.list",
      operation: "list",
      description: "List keys under an optional prefix.",
      inputSchema: { type: "object", properties: { prefix: { type: "string" } } },
    },
  ],

  async call(ctx, procedure, args) {
    const records = getRecordStore();
    const tenant = ctx.workspaceId;
    const scope = kvScope(ctx);
    switch (procedure) {
      case "get": {
        const key = ident(args["key"], "key");
        const hit = await records.get(tenant, scope, key);
        if (hit) return { key, value: hit.value };

        // Miss: fall back to the legacy FS path. Found → migrate in place
        // (write-through then delete) so the next read is a plain hit.
        const legacy = await getFsStore().read(tenant, legacyKvPath(ctx, key));
        if (!legacy) return { key, value: null };
        const value = JSON.parse(legacy.content) as unknown;
        await records.set(tenant, scope, key, value, ctx.userId);
        await getFsStore().remove(tenant, legacyKvPath(ctx, key));
        return { key, value };
      }
      case "set": {
        const key = ident(args["key"], "key");
        await records.set(tenant, scope, key, args["value"] ?? null, ctx.userId);
        // New writes never touch the file plane again; clear a stale legacy
        // shadow if one exists so a reader can't resurrect an old value
        // (e.g. after a delete + re-set) by falling through to it. Best
        // effort — the file may well not exist.
        await getFsStore()
          .remove(tenant, legacyKvPath(ctx, key))
          .catch(() => undefined);
        return { key, ok: true };
      }
      case "delete": {
        const key = ident(args["key"], "key");
        const deletedRecord = await records.delete(tenant, scope, key);
        const deletedLegacy = await getFsStore()
          .remove(tenant, legacyKvPath(ctx, key))
          .catch(() => false);
        return { key, deleted: deletedRecord || deletedLegacy };
      }
      case "list": {
        const prefix = typeof args["prefix"] === "string" ? args["prefix"] : "";
        const recordKeys = await records.list(tenant, scope, prefix);

        // Merge in not-yet-migrated legacy keys (defense during the
        // migration window; harmless once the sweep script has run).
        const root = legacyKvPath(ctx, "");
        const entries = await listAll(getFsStore(), tenant, root.replace(/\/$/, "")).catch(
          () => [],
        );
        const legacyKeys = entries
          .map((e) => e.path)
          .filter((p) => p.startsWith(root))
          .map((p) => p.slice(root.length))
          .filter((k) => k.startsWith(prefix));

        const keys = [...new Set([...recordKeys, ...legacyKeys])].sort();
        return { keys };
      }
      default:
        throw new ServiceError(`Unknown keyvalue procedure: ${procedure}`, 404);
    }
  },
};

// ---------------------------------------------------------------------------
// events — workspace-scoped event channels. Backend: the record store,
// one record per event under `svc#events#<channel>` with seq keys so lexical
// order is emission order (specs/record-store; an emit writes exactly one
// row, never a log rewrite). Emit is fire-and-forget for callers; consumers
// poll with `list`. A push backend (SNS/Kafka/WebSocket fan-out) replaces
// this without changing the emit/list contract.
// ---------------------------------------------------------------------------

const EVENTS_MAX_RETAINED = 500;

function eventsScope(channel: string): string {
  return svcScope("events", channel);
}

interface EventRecord {
  id: string;
  ts: string;
  userId: string;
  payload: unknown;
}

const events: CoreService = {
  meta: {
    label: "Events",
    blurb: "Emit + poll workspace event channels",
    icon: "radio",
  },
  tools: [
    {
      name: "events.emit",
      operation: "emit",
      description: "Emit an event on a named channel (e.g. 'form.submitted').",
      inputSchema: {
        type: "object",
        properties: { channel: { type: "string" }, payload: {} },
        required: ["channel"],
      },
    },
    {
      name: "events.list",
      operation: "list",
      description: "Read recent events on a channel, oldest first.",
      inputSchema: {
        type: "object",
        properties: { channel: { type: "string" }, limit: { type: "number" } },
        required: ["channel"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    const records = getRecordStore();
    switch (procedure) {
      case "emit": {
        const channel = ident(args["channel"], "channel");
        const scope = eventsScope(channel);
        const record: EventRecord = {
          id: crypto.randomUUID(),
          ts: new Date().toISOString(),
          userId: ctx.userId,
          payload: args["payload"] ?? null,
        };
        // One key listing to find the next ordinal, one write for the event.
        const keys = await records.list(ctx.workspaceId, scope);
        const last = keys.length > 0 ? parseSeqKey(keys[keys.length - 1]!) : undefined;
        const seq = last ? last.seq + 1 : 0;
        await records.set(ctx.workspaceId, scope, seqKey(seq, record.id), record, ctx.userId);
        // Retention: prune the overflow past the cap (best-effort).
        for (const stale of keys.slice(0, Math.max(0, keys.length + 1 - EVENTS_MAX_RETAINED))) {
          void records.delete(ctx.workspaceId, scope, stale).catch(() => undefined);
        }
        // Every emission kicks off subscribed workflows. The runner sets
        // `workflowDepth` on its context, so workflow→event→workflow chains
        // carry an incrementing depth and are capped (loop-safe). Dynamic
        // import breaks the services ⇄ workflows module cycle.
        void import("./workflows/runner.js")
          .then(({ triggerEventWorkflows }) =>
            triggerEventWorkflows(ctx, channel, record.payload, ctx.workflowDepth ?? 0),
          )
          .catch(() => undefined);
        return { id: record.id, channel };
      }
      case "list": {
        const channel = ident(args["channel"], "channel");
        const limit = Math.min(Number(args["limit"]) || 50, EVENTS_MAX_RETAINED);
        const scope = eventsScope(channel);
        const keys = (await records.list(ctx.workspaceId, scope)).slice(-limit);
        const events: EventRecord[] = [];
        for (const key of keys) {
          const hit = await records.get(ctx.workspaceId, scope, key).catch(() => undefined);
          if (hit) events.push(hit.value as EventRecord);
        }
        return { channel, events };
      }
      default:
        throw new ServiceError(`Unknown events procedure: ${procedure}`, 404);
    }
  },
};

// ---------------------------------------------------------------------------
// vfs — the workspace filesystem as a tool namespace. Same store and
// semantics as the /fs routes and the MCP fs_* tools, so widgets can read
// and persist files without a bespoke transport.
// ---------------------------------------------------------------------------

function fsPath(value: unknown): string {
  const path = typeof value === "string" ? normalizeFsPath(value) : null;
  if (!path) throw new ServiceError("path must be a workspace-relative file path", 400);
  // Service state (.services/**) is managed only through its tool
  // namespaces — never through raw vfs access (it holds hook tokens and
  // webhook HMAC secrets).
  if (isServicePath(path)) {
    throw new ServiceError("Service state is managed through its tool namespaces", 403);
  }
  return path;
}

/**
 * Resolve a vfs path for the caller. Workspace callers address the whole
 * workspace. App sessions address their primary prefix (`data/x` means
 * `<paths[0]>/data/x`) with automatic access; `~/<path>` addresses the
 * workspace root and is allowed only for the app's other declared prefixes
 * or a `.services/workspace.json` share at the required level — the single
 * prefix rule in apps/store.js decides both.
 */
async function resolveVfsPath(
  ctx: ServiceContext,
  value: unknown,
  write: boolean,
): Promise<string> {
  const scope = ctx.appScope;
  if (!scope) return fsPath(value);
  if (typeof value !== "string") {
    throw new ServiceError("path must be a file path", 400);
  }

  if (value.startsWith("~/")) {
    const path = fsPath(value.slice(2)); // also rejects .services/**
    const config = await readWorkspaceConfig(ctx.workspaceId);
    if (!appFsAllowed(scope, config, path, write)) {
      throw new ServiceError(`Path not shared with this app: ~/${path}`, 403);
    }
    return path;
  }

  return fsPath(resolveAppPath(scope, value));
}

/**
 * VCS verbs (and commit-pinned reads) are member-only: an app session's view
 * of the filesystem is its own partition, and history/refs are a workspace
 * concern (see docs/vcs-and-sessions.md).
 */
function requireWorkspaceCaller(ctx: ServiceContext): void {
  if (ctx.appScope) {
    throw new ServiceError("VCS operations are workspace-only", 403);
  }
}

/**
 * Resolve an optional `session` argument to a *staged* session whose overlay
 * should intercept this FS operation. Auto-mode sessions pass through to the
 * live tree (that is their contract). Closed staged sessions stay readable —
 * that's the "peek at what a past chat saw" — but reject writes.
 */
async function stagedSession(
  ctx: ServiceContext,
  args: Record<string, unknown>,
  write: boolean,
): Promise<ChatSessionRecord | undefined> {
  const raw = args["session"];
  if (raw === undefined || raw === null || raw === "") return undefined;
  requireWorkspaceCaller(ctx);
  if (typeof raw !== "string") throw new ServiceError("session must be a session id", 400);
  const session = await requireSession(ctx.workspaceId, raw);
  if (session.mode !== "staged") return undefined;
  if (write && session.status !== "open") {
    throw new ServiceError("Session is not open", 400);
  }
  return session;
}

const vfs: CoreService = {
  meta: {
    label: "VFS",
    blurb: "Workspace files, commits and mounts",
    icon: "folder-tree",
  },
  tools: [
    {
      name: "vfs.list",
      operation: "list",
      description:
        "List workspace files (latest version metadata), optionally under a directory prefix. Pass commit (id or ref) to list that snapshot instead.",
      inputSchema: {
        type: "object",
        properties: {
          prefix: { type: "string" },
          commit: { type: "string" },
          session: { type: "string" },
          limit: { type: "number" },
          cursor: { type: "string" },
        },
      },
    },
    {
      name: "vfs.read",
      operation: "read",
      description:
        "Read a workspace file (latest version unless a content hash or a commit pins an older one).",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string" },
          hash: { type: "string" },
          commit: { type: "string" },
          session: { type: "string" },
        },
        required: ["path"],
      },
    },
    {
      name: "vfs.write",
      operation: "write",
      description: "Write a workspace file (content-hash versioned; prior versions stay readable).",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string" },
          content: { type: "string" },
          mimeType: { type: "string" },
          session: { type: "string" },
        },
        required: ["path", "content"],
      },
    },
    {
      name: "vfs.delete",
      operation: "delete",
      description: "Delete a workspace file, or a whole subtree with recursive=true.",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string" },
          recursive: { type: "boolean" },
          session: { type: "string" },
        },
        required: ["path"],
      },
    },
    {
      name: "vfs.commit",
      operation: "commit",
      description:
        "Snapshot the current workspace tree as a commit on main (cheap — records content hashes, copies nothing). No-op when nothing changed.",
      inputSchema: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
    {
      name: "vfs.log",
      operation: "log",
      description: "Commit history, newest first (ref defaults to main).",
      inputSchema: {
        type: "object",
        properties: { ref: { type: "string" }, limit: { type: "number" } },
      },
    },
    {
      name: "vfs.show",
      operation: "show",
      description:
        "A commit's metadata, file manifest, and change list vs its parent. Accepts a commit id (or unambiguous prefix) or a ref name.",
      inputSchema: {
        type: "object",
        properties: { commit: { type: "string" } },
        required: ["commit"],
      },
    },
    {
      name: "vfs.diff",
      operation: "diff",
      description:
        "Added/modified/removed paths (with content hashes) between two commits or refs. Read either side of a file with vfs.read {path, hash}.",
      inputSchema: {
        type: "object",
        properties: { from: { type: "string" }, to: { type: "string" } },
        required: ["from", "to"],
      },
    },
    {
      name: "vfs.branches",
      operation: "branches",
      description: "Named refs (main plus any session branches) with their head commits.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "vfs.mounts",
      operation: "mounts",
      description:
        "List VFS mounts — path prefixes backed by an external store (git repo at a ref, or an S3 bucket). Read-only in v1.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "vfs.mount",
      operation: "mount",
      description:
        'Mount an external store at a path prefix. type "git": config {repo: "owner/name", ref?, path?} (uses the workspace github credential). type "s3": config {bucket, prefix?, region?} (gateway-role access). Mounted prefixes are read-only and excluded from commits.',
      inputSchema: {
        type: "object",
        properties: {
          prefix: { type: "string" },
          type: { type: "string", enum: ["git", "s3", "crdt"] },
          config: { type: "object" },
          mode: { type: "string", enum: ["read", "readwrite"] },
        },
        required: ["prefix", "type", "config"],
      },
    },
    {
      name: "vfs.unmount",
      operation: "unmount",
      description: "Remove a mount by its prefix (the external store is untouched).",
      inputSchema: {
        type: "object",
        properties: { prefix: { type: "string" } },
        required: ["prefix"],
      },
    },
    {
      name: "vfs.restore",
      operation: "restore",
      description:
        "Non-destructively restore a commit's content (optionally one path or a prefix): old content is re-written as the new latest, nothing is erased.",
      inputSchema: {
        type: "object",
        properties: {
          commit: { type: "string" },
          path: { type: "string" },
          prefix: { type: "string" },
        },
        required: ["commit"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    const store = getFsStore();
    switch (procedure) {
      case "list": {
        const raw = typeof args["prefix"] === "string" ? args["prefix"] : "";
        const staged = await stagedSession(ctx, args, false);
        if (staged) {
          const prefix = raw ? normalizeFsPath(raw) : "";
          if (prefix === null) throw new ServiceError(`Invalid prefix: ${raw}`, 400);
          return {
            session: staged.id,
            entries: await sessionList(ctx.workspaceId, staged, prefix),
          };
        }
        // Listing at a commit returns that snapshot's manifest (member-only).
        if (typeof args["commit"] === "string" && args["commit"]) {
          requireWorkspaceCaller(ctx);
          const commit = await resolveCommitish(ctx.workspaceId, args["commit"]);
          const snapshot = await readSnapshot(ctx.workspaceId, commit.snapshot);
          if (!snapshot) throw new ServiceError(`Snapshot missing for commit ${commit.id}`, 404);
          const prefix = raw ? normalizeFsPath(raw) : "";
          if (prefix === null) throw new ServiceError(`Invalid prefix: ${raw}`, 400);
          return {
            commit: commit.id,
            entries: snapshot.entries.filter(
              (entry) =>
                !prefix || entry.path === prefix || entry.path.startsWith(`${prefix}/`),
            ),
          };
        }
        if (ctx.appScope) {
          // No prefix lists everything the app publishes — all of its
          // declared prefixes, not just its root.
          const roots = raw
            ? [await resolveVfsPath(ctx, raw, false)]
            : ctx.appScope.paths;
          const listings = await Promise.all(
            roots.map((root) => listAll(store, ctx.workspaceId, root)),
          );
          return { entries: listings.flat() };
        }
        const prefix = raw ? normalizeFsPath(raw) : "";
        if (prefix === null) throw new ServiceError(`Invalid prefix: ${raw}`, 400);
        if (prefix && isServicePath(prefix)) {
          throw new ServiceError("Service state is managed through its tool namespaces", 403);
        }
        const limit =
          typeof args["limit"] === "number" && Number.isFinite(args["limit"])
            ? Math.min(Math.floor(args["limit"]), 10_000)
            : undefined;
        const listCursor = typeof args["cursor"] === "string" ? args["cursor"] : undefined;
        if (listCursor && limit === undefined) {
          throw new ServiceError("cursor requires limit", 400);
        }
        const page =
          limit !== undefined
            ? await store.list(ctx.workspaceId, prefix, {
                limit,
                ...(listCursor ? { cursor: listCursor } : {}),
              })
            : null;
        const entries = page ? page.entries : await listAll(store, ctx.workspaceId, prefix);
        // A workspace listing never surfaces OTHER users' data partitions —
        // the caller's own partition IS listed (their private files are a
        // place, not a secret; tech-plan data-auth-model D2), and foreign
        // partitions are invisible AND unreadable (the partition guard 404s
        // exact-path access below).
        const hidden = await hiddenDataPrefixes(ctx.workspaceId);
        const includeMounts = limit === undefined || !listCursor;
        const mounted = includeMounts ? await mountEntries(ctx.workspaceId, prefix) : [];
        const filtered = [
          ...entries.filter(
            (entry) =>
              !isServicePath(entry.path) &&
              partitionAccess(entry.path, ctx.userId, hidden) !== "foreign",
          ),
          ...mounted,
        ]
          // Agent-bounded contexts only see what their path grants cover.
          .filter(
            (entry) =>
              !ctx.grants?.paths || pathAccess(ctx.grants.paths, entry.path) !== "none",
          )
          .sort((a, b) => a.path.localeCompare(b.path));
        return {
          entries: filtered,
          ...(page?.cursor ? { cursor: page.cursor } : {}),
        };
      }
      case "read": {
        const path = await resolveVfsPath(ctx, args["path"], false);
        assertPathGranted(ctx.grants, path, false);
        // Foreign per-user partitions 404 before the store is touched —
        // covers latest, hash-pinned, and commit-pinned reads alike. App
        // sessions skip it: their appScope confinement already applies.
        if (!ctx.appScope) await assertPartitionAccess(ctx.workspaceId, ctx.userId, path);
        const staged = await stagedSession(ctx, args, false);
        if (staged) {
          const file = await sessionRead(ctx.workspaceId, staged, path);
          if (!file) throw new ServiceError(`Not found: ${path}`, 404);
          return file;
        }
        if (!ctx.appScope) {
          const viaMount = await mountRead(ctx.workspaceId, path);
          if (viaMount !== "not-mounted") {
            if (!viaMount) throw new ServiceError(`Not found: ${path}`, 404);
            return viaMount;
          }
        }
        let hash = typeof args["hash"] === "string" ? args["hash"] : undefined;
        // A commit(ish) pins the read to the file's hash in that snapshot.
        if (!hash && typeof args["commit"] === "string" && args["commit"]) {
          requireWorkspaceCaller(ctx);
          const commit = await resolveCommitish(ctx.workspaceId, args["commit"]);
          const snapshot = await readSnapshot(ctx.workspaceId, commit.snapshot);
          const entry = snapshot?.entries.find((e) => e.path === path);
          if (!entry) throw new ServiceError(`Not in commit ${commit.id.slice(0, 8)}: ${path}`, 404);
          hash = entry.hash;
        }
        const file = await store.read(ctx.workspaceId, path, hash);
        if (!file) throw new ServiceError(`Not found: ${path}`, 404);
        return file;
      }
      case "write": {
        const path = await resolveVfsPath(ctx, args["path"], true);
        assertPathGranted(ctx.grants, path, true);
        if (!ctx.appScope) await assertPartitionAccess(ctx.workspaceId, ctx.userId, path);
        await assertNotMounted(ctx.workspaceId, path);
        if (typeof args["content"] !== "string") {
          throw new ServiceError("content must be a string", 400);
        }
        const mimeType = typeof args["mimeType"] === "string" ? args["mimeType"] : undefined;
        const staged = await stagedSession(ctx, args, true);
        if (staged) {
          return sessionWrite(ctx.workspaceId, staged, path, args["content"], mimeType);
        }
        const { content: _content, ...meta } = await store.write(
          ctx.workspaceId,
          path,
          args["content"],
          mimeType,
        );
        return meta;
      }
      case "delete": {
        const path = await resolveVfsPath(ctx, args["path"], true);
        assertPathGranted(ctx.grants, path, true);
        if (!ctx.appScope) await assertPartitionAccess(ctx.workspaceId, ctx.userId, path);
        await assertNotMounted(ctx.workspaceId, path);
        const staged = await stagedSession(ctx, args, true);
        if (staged) {
          const removed = await sessionDelete(
            ctx.workspaceId,
            staged,
            path,
            args["recursive"] === true,
          );
          return { deleted: path, staged: removed };
        }
        const removed =
          args["recursive"] === true
            ? (await store.removePrefix(ctx.workspaceId, path)) > 0
            : await store.remove(ctx.workspaceId, path);
        if (!removed) throw new ServiceError(`Not found: ${path}`, 404);
        return { deleted: path };
      }
      case "commit": {
        requireWorkspaceCaller(ctx);
        const message =
          typeof args["message"] === "string" && args["message"] ? args["message"] : "Commit";
        const { commit, created } = await commitTree(ctx.workspaceId, {
          message,
          author: ctx.userId,
        });
        return { commit, created };
      }
      case "log": {
        requireWorkspaceCaller(ctx);
        const head = await resolveCommitish(
          ctx.workspaceId,
          typeof args["ref"] === "string" && args["ref"] ? args["ref"] : "main",
        ).catch(() => undefined);
        if (!head) return { commits: [] };
        const limit = Math.min(Number(args["limit"]) || 50, 200);
        return { commits: await logCommits(ctx.workspaceId, head.id, limit) };
      }
      case "show": {
        requireWorkspaceCaller(ctx);
        if (typeof args["commit"] !== "string" || !args["commit"]) {
          throw new ServiceError("commit is required", 400);
        }
        const commit = await resolveCommitish(ctx.workspaceId, args["commit"]);
        const snapshot = await readSnapshot(ctx.workspaceId, commit.snapshot);
        if (!snapshot) throw new ServiceError(`Snapshot missing for commit ${commit.id}`, 404);
        const parent = commit.parents[0]
          ? await resolveCommitish(ctx.workspaceId, commit.parents[0]).catch(() => undefined)
          : undefined;
        const parentSnapshot = parent
          ? await readSnapshot(ctx.workspaceId, parent.snapshot)
          : undefined;
        return {
          commit,
          entries: snapshot.entries,
          // Mount lineage (specs/mount-lineage): the snapshot's deterministic
          // tokens ride along so history consumers can pair them with the
          // commit's `provenance`. Absent for pre-lineage commits — no error.
          ...(snapshot.mounts ? { mounts: snapshot.mounts } : {}),
          changes: diffSnapshots(parentSnapshot, snapshot),
        };
      }
      case "diff": {
        requireWorkspaceCaller(ctx);
        if (typeof args["from"] !== "string" || typeof args["to"] !== "string") {
          throw new ServiceError("from and to are required", 400);
        }
        const from = await resolveCommitish(ctx.workspaceId, args["from"]);
        const to = await resolveCommitish(ctx.workspaceId, args["to"]);
        const [fromSnapshot, toSnapshot] = await Promise.all([
          readSnapshot(ctx.workspaceId, from.snapshot),
          readSnapshot(ctx.workspaceId, to.snapshot),
        ]);
        if (!fromSnapshot || !toSnapshot) {
          throw new ServiceError("Snapshot missing for a diff side", 404);
        }
        return { from: from.id, to: to.id, ...diffSnapshots(fromSnapshot, toSnapshot) };
      }
      case "branches": {
        requireWorkspaceCaller(ctx);
        return { refs: await listRefs(ctx.workspaceId) };
      }
      case "mounts": {
        requireWorkspaceCaller(ctx);
        return { mounts: await readMounts(ctx.workspaceId) };
      }
      case "mount": {
        requireWorkspaceCaller(ctx);
        throw new ServiceError(
          "vcs.mount is removed — create a path-keyed profile with profiles.set { path, provider, options }",
          400,
        );
      }
      case "unmount": {
        requireWorkspaceCaller(ctx);
        throw new ServiceError(
          "vcs.unmount is removed — remove the path-keyed profile with profiles.remove { path }",
          400,
        );
      }
      case "restore": {
        requireWorkspaceCaller(ctx);
        if (typeof args["commit"] !== "string" || !args["commit"]) {
          throw new ServiceError("commit is required", 400);
        }
        const commit = await resolveCommitish(ctx.workspaceId, args["commit"]);
        const filter = {
          path: typeof args["path"] === "string" ? normalizeFsPath(args["path"]) ?? undefined : undefined,
          prefix:
            typeof args["prefix"] === "string" ? normalizeFsPath(args["prefix"]) ?? undefined : undefined,
        };
        const result = await restoreCommit(ctx.workspaceId, commit, filter);
        return { commit: commit.id, ...result };
      }
      default:
        throw new ServiceError(`Unknown vfs procedure: ${procedure}`, 404);
    }
  },
};

// ---------------------------------------------------------------------------
// registry — meta tools over the public registry catalog, so widgets (and
// agents) can discover which UTDK SDKs exist and which operations they can
// call through the tool proxy without leaving the gateway surface.
// ---------------------------------------------------------------------------

const REGISTRY_BASE = (): string =>
  (process.env["GATEWAY_REGISTRY_BASE_URL"] ?? "https://aprovan.com/registry").replace(/\/$/, "");

interface CatalogProvider {
  id: string;
  title: string;
  description: string | null;
  packageName: string;
  icon: string | null;
  auth?: unknown;
}

interface CatalogOperation {
  providerPath: string;
  providerTitle: string;
  operationId: string;
  sdkPath: string;
  method: string;
  path: string;
  summary: string | null;
}

interface CatalogCache {
  providers: CatalogProvider[];
  operations: CatalogOperation[];
  expiresAt: number;
}

const CATALOG_TTL_MS = 10 * 60 * 1000;
let catalogCache: CatalogCache | null = null;

async function fetchCatalogJson<T>(path: string): Promise<T> {
  const response = await fetch(`${REGISTRY_BASE()}${path}`);
  if (!response.ok) {
    throw new ServiceError(`Registry catalog unavailable (${response.status})`, 502);
  }
  return (await response.json()) as T;
}

async function loadCatalog(): Promise<CatalogCache> {
  const now = Date.now();
  if (catalogCache && catalogCache.expiresAt > now) return catalogCache;
  const [providersBody, opsBody] = await Promise.all([
    fetchCatalogJson<{ providers: CatalogProvider[] }>("/catalog/providers.json"),
    fetchCatalogJson<{ operations: CatalogOperation[] }>("/catalog/ops.json"),
  ]);
  catalogCache = {
    providers: providersBody.providers ?? [],
    operations: opsBody.operations ?? [],
    expiresAt: now + CATALOG_TTL_MS,
  };
  return catalogCache;
}

interface CatalogDetailField {
  name: string;
  required: boolean;
  description: string | null;
  schema: unknown;
}

interface CatalogDetailOperation {
  sdkPath: string;
  httpMethod: string;
  summary: string | null;
  description: string | null;
  parameters?: CatalogDetailField[];
  requestBodyFields?: CatalogDetailField[];
}

function schemaFromCatalogOp(op: CatalogDetailOperation): Record<string, unknown> {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];
  for (const field of [...(op.parameters ?? []), ...(op.requestBodyFields ?? [])]) {
    if (!field?.name || field.name in properties) continue;
    const schema =
      field.schema && typeof field.schema === "object"
        ? (field.schema as Record<string, unknown>)
        : { type: "string" };
    properties[field.name] = {
      ...schema,
      ...(field.description ? { description: field.description } : {}),
    };
    if (field.required) required.push(field.name);
  }
  return {
    type: "object",
    properties,
    ...(required.length > 0 ? { required } : {}),
  };
}

const providerDetailCache = new Map<
  string,
  { entries: ToolEntry[]; expiresAt: number }
>();

/**
 * Tool entries for a provider derived from the public registry catalog
 * (`/catalog/p/<provider>.json`). Used as the discovery source when the
 * provider's UTDK module doesn't export tool metadata itself — which is the
 * common case today, since generated modules only export the client factory.
 */
export async function catalogToolEntries(provider: string): Promise<ToolEntry[]> {
  const now = Date.now();
  const cached = providerDetailCache.get(provider);
  if (cached && cached.expiresAt > now) return cached.entries;
  const detail = await fetchCatalogJson<{ operations?: CatalogDetailOperation[] }>(
    `/catalog/p/${provider}.json`,
  );
  const entries: ToolEntry[] = (detail.operations ?? [])
    .filter((op) => typeof op.sdkPath === "string" && op.sdkPath)
    .map((op) => ({
      provider,
      name: `${provider}.${op.sdkPath}`,
      operation: op.sdkPath,
      description: op.summary ?? op.description ?? undefined,
      inputSchema: schemaFromCatalogOp(op),
      outputSchema: undefined,
    }));
  providerDetailCache.set(provider, {
    entries,
    expiresAt: now + CATALOG_TTL_MS,
  });
  return entries;
}

const registry: CoreService = {
  meta: {
    label: "Registry",
    blurb: "Look up available SDKs and operations",
    icon: "book-open",
  },
  tools: [
    {
      name: "registry.providers",
      operation: "providers",
      description:
        "Page through registry providers (UTDK SDKs): id, title, and description. Optional `q` substring filter over id/title/description/package; `offset`/`limit` page the (post-filter) result (limit default 25, max 100). Returns { providers, total }.",
      inputSchema: {
        type: "object",
        properties: {
          q: { type: "string" },
          offset: { type: "number" },
          limit: { type: "number" },
        },
      },
    },
    {
      name: "registry.search",
      operation: "search",
      description:
        "Search registry SDK operations by keyword. Returns the sdkPath to call (e.g. `github.users.getByUsername`) plus HTTP method/path and summary.",
      inputSchema: {
        type: "object",
        properties: {
          q: { type: "string" },
          provider: { type: "string" },
          limit: { type: "number" },
        },
        required: ["q"],
      },
    },
  ],

  async call(_ctx, procedure, args) {
    const catalog = await loadCatalog();
    switch (procedure) {
      case "providers": {
        const q = typeof args["q"] === "string" ? args["q"].trim().toLowerCase() : "";
        // Same catalog source and substring match as `search`, but over
        // providers: id/title/description/package, in the catalog's stable
        // order (never re-sorted, so a page is stable across calls).
        const matches = q
          ? catalog.providers.filter((p) =>
              [p.id, p.title, p.description, p.packageName]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q)),
            )
          : catalog.providers;
        const offset = Math.max(0, Math.trunc(Number(args["offset"])) || 0);
        const limit = Math.min(100, Math.max(1, Math.trunc(Number(args["limit"])) || 25));
        const providers = matches.slice(offset, offset + limit).map((p) => ({
          id: p.id,
          title: p.title,
          ...(p.description ? { description: p.description } : {}),
        }));
        return { providers, total: matches.length };
      }
      case "search": {
        const q = typeof args["q"] === "string" ? args["q"].trim().toLowerCase() : "";
        if (!q) throw new ServiceError("q is required", 400);
        const provider = typeof args["provider"] === "string" ? args["provider"] : "";
        const limit = Math.min(Number(args["limit"]) || 25, 100);
        const operations = catalog.operations
          .filter((op) => !provider || op.providerPath === provider)
          .filter((op) =>
            [op.sdkPath, op.operationId, op.summary, op.providerTitle, op.path]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(q)),
          )
          .slice(0, limit);
        return { operations };
      }
      default:
        throw new ServiceError(`Unknown registry procedure: ${procedure}`, 404);
    }
  },
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Keyed by {@link CORE_SERVICE_NAMES}, so a namespace named there without a
 * service wired here (or wired here without being named there) fails the
 * build instead of surfacing as a missing namespace at runtime.
 */
export const CORE_SERVICES: Record<CoreServiceName, CoreService> = {
  keyvalue,
  events,
  vfs,
  registry,
  workflows: workflowsService,
  apps: appsService,
  webhooks: webhooksService,
  interfaces: interfacesService,
  profiles: profilesService,
  sync: syncService,
  sessions: sessionsService,
  notifications: notificationsService,
  telemetry: telemetryService,
  agents: agentsService,
  sandboxes: sandboxesService,
};

// Hand the registry to the kernel, so upstream modules (the workflow runner,
// sync) can dispatch to a sibling namespace without importing this file.
installCoreServices(CORE_SERVICES);

// Lookup and discovery are the kernel's; re-exported here so `services.js`
// stays the import site every route already uses.
export { coreServiceMeta, coreToolEntries, getCoreService } from "./service-kernel.js";
