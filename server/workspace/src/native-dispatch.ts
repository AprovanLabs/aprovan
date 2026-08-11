/**
 * In-process short-circuit for the credentialless `aprovan` provider.
 *
 * An isolate-hosted module cannot reach workspace storage, so vfs / vcs /
 * keyvalue / events / telemetry resolve here — same pattern as the agent
 * interface's `native` runner.
 */

import {
  NATIVE_PROVIDER_ID,
  createNativeEvents,
  createNativeKeyValue,
  createNativeTelemetry,
  createNativeVcs,
  createNativeVfs,
  dispatchNativeOp,
  isNativeInterface,
  type NativeDispatchContext,
  type NativeVcsBackend,
} from "@aprovan/native";
import {
  DEFAULT_LIST_LIMIT as EVENTS_DEFAULT_LIMIT,
  type EventRecord as ContractEventRecord,
} from "@utdk/events";
import { ttlUnsupported, type KeyValueListResult } from "@utdk/keyvalue";
import {
  VfsError,
  type VfsListResult,
  type VfsStat,
} from "@utdk/vfs";
import { getFsStore, listAll, type IFsStore } from "./fs-store.js";
import { getRecordStore, type IRecordStore } from "./records.js";
import { ServiceError, type ServiceContext } from "./service-kernel.js";
import {
  appRefName,
  commitTree,
  diffSnapshots,
  listRefs,
  logCommits,
  readRef,
  readSnapshot,
  refName,
  resolveCommitish,
  restoreCommit,
  type VcsDiff,
} from "./vcs/store.js";

/** Same containment rule as `restoreCommit`'s prefix filter (tech-plan D4). */
function pathUnderPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(`${prefix}/`);
}

function filterDiffByPrefix(diff: VcsDiff, prefix?: string): VcsDiff {
  if (!prefix) return diff;
  return {
    added: diff.added.filter((e) => pathUnderPrefix(e.path, prefix)),
    modified: diff.modified.filter((e) => pathUnderPrefix(e.path, prefix)),
    removed: diff.removed.filter((e) => pathUnderPrefix(e.path, prefix)),
  };
}

/**
 * Map wire `scope: { app }` onto F1 `prefix`/`ref` (tech-plan Interfaces).
 * Explicit `prefix`/`ref` already on the args win over the mapped values only
 * when scope is absent; when scope is present it owns both.
 */
async function applyVcsAppScope(
  workspaceId: string,
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const scope = args["scope"];
  if (!scope || typeof scope !== "object" || Array.isArray(scope)) return args;
  const appRef = (scope as Record<string, unknown>)["app"];
  if (typeof appRef !== "string" || !appRef.trim()) return args;
  const { resolveAppRef } = await import("./apps/identity.js");
  const { appRoot, readApp } = await import("./apps/store.js");
  const appId = await resolveAppRef(workspaceId, appRef.trim());
  const manifest = await readApp(workspaceId, appId);
  if (!manifest) throw new ServiceError(`Unknown app: ${appRef}`, 404);
  const prefix = appRoot({
    id: manifest.appId,
    name: manifest.name,
    root: manifest.root,
    paths: manifest.paths ?? (manifest.root ? [manifest.root] : []),
  });
  return {
    ...args,
    prefix,
    ref: appRefName(appId),
  };
}

export { NATIVE_PROVIDER_ID, isNativeInterface };

const EVENTS_MAX_RETAINED = 500;

function kvScopeFor(ctx: ServiceContext): string {
  if (ctx.appScope) return `app#${ctx.appScope.id}#u#${ctx.appScope.userId}`;
  return "ws";
}

function eventsScope(channel: string): string {
  return `svc#events#${channel}`;
}

function seqKey(seq: number, id: string): string {
  return `${String(seq).padStart(16, "0")}#${id}`;
}

function parseSeqKey(key: string): { seq: number; id: string } | undefined {
  const hash = key.indexOf("#");
  if (hash <= 0) return undefined;
  const seq = Number(key.slice(0, hash));
  if (!Number.isFinite(seq)) return undefined;
  return { seq, id: key.slice(hash + 1) };
}

function vfsBackend(workspaceId: string, store: IFsStore) {
  return {
    async read(path: string) {
      const file = await store.read(workspaceId, path);
      if (!file) return undefined;
      return {
        content: file.content,
        encoding: "utf8" as const,
        size: file.size,
        etag: file.hash,
        modifiedAt: file.updatedAt,
      };
    },
    async write(path: string, content: string, encoding: "utf8" | "base64", ifMatch?: string) {
      if (encoding === "base64") {
        // Workspace FS stores utf8 text; binary writes land as base64 strings.
      }
      if (ifMatch !== undefined) {
        const existing = await store.read(workspaceId, path);
        if (ifMatch === "*") {
          if (!existing) throw new VfsError(`ifMatch "*" requires an existing file: ${path}`, 409);
        } else if (!existing || existing.hash !== ifMatch) {
          throw new VfsError(`etag mismatch for ${path}`, 409);
        }
      }
      const written = await store.write(workspaceId, path, content);
      return {
        path: written.path,
        kind: "file" as const,
        size: written.size,
        etag: written.hash,
        modifiedAt: written.updatedAt,
      };
    },
    async delete(path: string) {
      return store.remove(workspaceId, path);
    },
    async list(args: {
      prefix: string;
      recursive: boolean;
      cursor?: string;
      limit: number;
    }): Promise<VfsListResult> {
      const all = await listAll(store, workspaceId, args.prefix);
      const entries: VfsStat[] = [];
      const dirs = new Set<string>();
      const prefix = args.prefix;
      for (const file of all) {
        if (!args.recursive) {
          const rest = prefix
            ? file.path.slice(prefix.length + (prefix ? 1 : 0))
            : file.path;
          const slash = rest.indexOf("/");
          if (slash >= 0) {
            const dirPath = prefix ? `${prefix}/${rest.slice(0, slash)}` : rest.slice(0, slash);
            dirs.add(dirPath);
            continue;
          }
        }
        entries.push({
          path: file.path,
          kind: "file",
          size: file.size,
          etag: file.hash,
          modifiedAt: file.updatedAt,
        });
      }
      for (const dir of [...dirs].sort()) {
        entries.push({ path: dir, kind: "directory" });
      }
      entries.sort((a, b) => a.path.localeCompare(b.path));
      let start = 0;
      if (args.cursor) {
        const idx = entries.findIndex((e) => e.path === args.cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const page = entries.slice(start, start + args.limit);
      const next = start + args.limit < entries.length ? page[page.length - 1]?.path : undefined;
      return { entries: page, ...(next ? { cursor: next } : {}) };
    },
    async stat(path: string): Promise<VfsStat | undefined> {
      const file = await store.read(workspaceId, path);
      if (file) {
        return {
          path: file.path,
          kind: "file",
          size: file.size,
          etag: file.hash,
          modifiedAt: file.updatedAt,
        };
      }
      const children = await listAll(store, workspaceId, path);
      if (children.some((c) => c.path === path || c.path.startsWith(path + "/"))) {
        return { path, kind: "directory" };
      }
      return undefined;
    },
  };
}

function keyvalueBackend(ctx: ServiceContext, records: IRecordStore) {
  const workspaceId = ctx.workspaceId;
  const userId = ctx.userId;
  const scope = kvScopeFor(ctx);
  return {
    supportsTtl: true as const,
    async get(key: string) {
      const hit = await records.get(workspaceId, scope, key);
      if (!hit) return undefined;
      return { value: hit.value, updatedAt: hit.updatedAt };
    },
    async set(key: string, value: unknown, ttlSeconds?: number) {
      const entry = await records.set(workspaceId, scope, key, value, userId, {
        ...(ttlSeconds !== undefined
          ? { expiresAtEpochSeconds: Math.floor(Date.now() / 1000) + ttlSeconds }
          : {}),
      });
      return {
        value: entry.value,
        updatedAt: entry.updatedAt,
        ...(ttlSeconds !== undefined
          ? { expiresAt: new Date((Math.floor(Date.now() / 1000) + ttlSeconds) * 1000).toISOString() }
          : {}),
      };
    },
    async delete(key: string) {
      return records.delete(workspaceId, scope, key);
    },
    async list(args: { prefix?: string; cursor?: string; limit: number }): Promise<KeyValueListResult> {
      const keys = (await records.list(workspaceId, scope, args.prefix ?? "")).sort();
      let start = 0;
      if (args.cursor) {
        const idx = keys.indexOf(args.cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const pageKeys = keys.slice(start, start + args.limit);
      const rows: KeyValueListResult["keys"] = [];
      for (const key of pageKeys) {
        const hit = await records.get(workspaceId, scope, key);
        rows.push({
          key,
          ...(hit ? { updatedAt: hit.updatedAt } : {}),
        });
      }
      const next = start + args.limit < keys.length ? pageKeys[pageKeys.length - 1] : undefined;
      return { keys: rows, ...(next ? { cursor: next } : {}) };
    },
  };
}

function eventsBackend(ctx: ServiceContext, records: IRecordStore) {
  const workspaceId = ctx.workspaceId;
  const userId = ctx.userId;
  return {
    async emit(args: { channel: string; type: string; payload?: unknown }) {
      const scope = eventsScope(args.channel);
      const id = crypto.randomUUID();
      const timestamp = new Date().toISOString();
      const record: ContractEventRecord = {
        id,
        channel: args.channel,
        type: args.type,
        timestamp,
        ...(args.payload !== undefined ? { payload: args.payload } : {}),
      };
      const keys = await records.list(workspaceId, scope);
      const last = keys.length > 0 ? parseSeqKey(keys[keys.length - 1]!) : undefined;
      const seq = last ? last.seq + 1 : 0;
      await records.set(workspaceId, scope, seqKey(seq, id), record, userId);
      for (const stale of keys.slice(0, Math.max(0, keys.length + 1 - EVENTS_MAX_RETAINED))) {
        void records.delete(workspaceId, scope, stale).catch(() => undefined);
      }
      // Product fan-out: subscribed workflows (same as the former core service).
      void import("./workflows/runner.js")
        .then(({ triggerEventWorkflows }) =>
          triggerEventWorkflows(ctx, args.channel, args.payload, ctx.workflowDepth ?? 0),
        )
        .catch(() => undefined);
      return { id, channel: args.channel, timestamp };
    },
    async list(args: {
      channel: string;
      after?: string;
      cursor?: string;
      limit: number;
    }) {
      const scope = eventsScope(args.channel);
      const keys = await records.list(workspaceId, scope);
      const events: ContractEventRecord[] = [];
      for (const key of keys) {
        const hit = await records.get(workspaceId, scope, key).catch(() => undefined);
        if (hit) events.push(hit.value as ContractEventRecord);
      }
      let start = 0;
      if (args.after) {
        const idx = events.findIndex((e) => e.id === args.after);
        start = idx >= 0 ? idx + 1 : events.length;
      } else if (args.cursor) {
        const idx = events.findIndex((e) => e.id === args.cursor);
        start = idx >= 0 ? idx + 1 : 0;
      }
      const page = events.slice(start, start + (args.limit || EVENTS_DEFAULT_LIMIT));
      const next = start + page.length < events.length ? page[page.length - 1]?.id : undefined;
      return { channel: args.channel, events: page, ...(next ? { cursor: next } : {}) };
    },
  };
}

function vcsBackend(workspaceId: string, userId: string): NativeVcsBackend {
  return {
    async commit({ message, prefix, ref }) {
      const { commit, created } = await commitTree(workspaceId, {
        message: message ?? "commit",
        author: userId,
        ...(prefix !== undefined ? { prefix } : {}),
        ...(ref !== undefined ? { ref } : {}),
      });
      return {
        commit: {
          id: commit.id,
          message: commit.message,
          createdAt: commit.createdAt,
          parents: commit.parents,
          snapshot: commit.snapshot,
          author: commit.author,
        },
        created,
      };
    },
    async log({ limit = 50, ref } = {}) {
      const head = await readRef(workspaceId, refName(ref));
      if (!head) return { commits: [] };
      const commits = await logCommits(workspaceId, head.commit, limit);
      return {
        commits: commits.map((c) => ({
          id: c.id,
          message: c.message,
          createdAt: c.createdAt,
          parents: c.parents,
          snapshot: c.snapshot,
          author: c.author,
        })),
      };
    },
    async show({ commit: commitish }) {
      const commit = await resolveCommitish(workspaceId, commitish);
      const snapshot = await readSnapshot(workspaceId, commit.snapshot);
      if (!snapshot) throw new ServiceError(`Snapshot missing for commit ${commit.id}`, 404);
      const parent = commit.parents[0]
        ? await resolveCommitish(workspaceId, commit.parents[0]).catch(() => undefined)
        : undefined;
      const parentSnapshot = parent
        ? await readSnapshot(workspaceId, parent.snapshot)
        : undefined;
      const changes = diffSnapshots(parentSnapshot, snapshot);
      return {
        commit: {
          id: commit.id,
          message: commit.message,
          createdAt: commit.createdAt,
          parents: commit.parents,
          snapshot: commit.snapshot,
          author: commit.author,
        },
        files: snapshot.entries.map((e) => e.path).sort(),
        changes,
      };
    },
    async diff({ from, to, prefix }) {
      const a = await resolveCommitish(workspaceId, from);
      const b = await resolveCommitish(workspaceId, to);
      const fromSnapshot = await readSnapshot(workspaceId, a.snapshot);
      const toSnapshot = await readSnapshot(workspaceId, b.snapshot);
      if (!fromSnapshot || !toSnapshot) {
        throw new ServiceError("Snapshot missing for a diff side", 404);
      }
      const changes = filterDiffByPrefix(diffSnapshots(fromSnapshot, toSnapshot), prefix);
      return {
        from: a.id,
        to: b.id,
        ...changes,
      };
    },
    async branches() {
      const refs = await listRefs(workspaceId);
      return {
        branches: refs.map((r) => ({ name: r.name, commit: r.commit })),
      };
    },
    async restore({ commit: commitish, path, prefix }) {
      const commit = await resolveCommitish(workspaceId, commitish);
      const result = await restoreCommit(workspaceId, commit, {
        ...(path !== undefined ? { path } : {}),
        ...(prefix !== undefined ? { prefix } : {}),
      });
      return { commit: commit.id, restored: result.restored };
    },
  };
}

function buildNativeContext(ctx: ServiceContext): NativeDispatchContext {
  const records = getRecordStore();
  const fs = getFsStore();
  return {
    vfs: createNativeVfs({ backend: vfsBackend(ctx.workspaceId, fs) }),
    vcs: createNativeVcs({ backend: vcsBackend(ctx.workspaceId, ctx.userId) }),
    keyvalue: createNativeKeyValue({
      backend: keyvalueBackend(ctx, records),
      providerLabel: NATIVE_PROVIDER_ID,
    }),
    events: createNativeEvents({
      backend: eventsBackend(ctx, records),
    }),
    telemetry: createNativeTelemetry({
      backend: {
        async export(args) {
          const { telemetryService } = await import("./telemetry/service.js");
          return (await telemetryService.call(ctx, "export", args as Record<string, unknown>)) as {
            accepted: { spans: number; logs: number; metrics: number };
          };
        },
      },
    }),
  };
}

/**
 * Dispatch one operation for an Aprovan native interface binding.
 */
export async function dispatchAprovanNativeOp(
  ctx: ServiceContext,
  interfaceId: string,
  operation: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  if (!isNativeInterface(interfaceId)) {
    throw new ServiceError(`Not a native interface: ${interfaceId}`, 404);
  }
  try {
    // Telemetry product ops (emit/query/traces) stay on the activity store;
    // only `export` is the rebindable contract surface.
    if (interfaceId === "telemetry" && operation !== "export") {
      const { telemetryService } = await import("./telemetry/service.js");
      return telemetryService.call(ctx, operation, args);
    }
    // iw9-b artifact shares — product surface over vfs/shares (not in @utdk/vfs).
    if (interfaceId === "vfs" && (operation === "share" || operation.startsWith("shares."))) {
      return dispatchVfsShareOp(ctx, operation, args);
    }
    // iw9-b mounts procedures — validated wrappers over vcs/mounts-procedures.
    if (interfaceId === "vcs" && operation.startsWith("mounts.")) {
      return dispatchVcsMountsOp(ctx, operation, args);
    }
    // App-scope mapping for all six vcs verbs (iw9-a stream 1): scope:{app}
    // → prefix=<app root>, ref=app/<appId> before the native wire strip.
    let normalizedArgs =
      interfaceId === "events" && operation === "emit" && typeof args["type"] !== "string"
        ? { ...args, type: typeof args["channel"] === "string" ? args["channel"] : "event" }
        : args;
    if (interfaceId === "vcs" && !operation.startsWith("mounts.")) {
      normalizedArgs = await applyVcsAppScope(ctx.workspaceId, normalizedArgs);
    }
    // VFS product surface: partitions, service-path hiding, sessions, commit
    // pins, mounts. Adapt delete to the contract's boolean `deleted`.
    if (interfaceId === "vfs") {
      const { vfsProductService } = await import("./services.js");
      const result = await vfsProductService.call(ctx, operation, args);
      if (operation === "delete" && result && typeof result === "object") {
        const row = result as { deleted?: unknown };
        if (typeof row.deleted === "string") {
          return { deleted: true, path: row.deleted };
        }
      }
      return result;
    }
    // Key-value product surface: app partitions + legacy FS migration, adapted
    // to contract shapes (`found`, list rows, write timestamps).
    if (interfaceId === "keyvalue") {
      const { keyvalueProductService } = await import("./services.js");
      const result = await keyvalueProductService.call(ctx, operation, args);
      return adaptKeyvalueProductResult(operation, result);
    }
    // Default `type` for events.emit when callers still pass only channel+payload
    // is applied above into normalizedArgs.
    return await dispatchNativeOp(interfaceId, operation, normalizedArgs, buildNativeContext(ctx));
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    const status =
      err && typeof err === "object" && "status" in err && typeof (err as { status: unknown }).status === "number"
        ? ((err as { status: number }).status as 400)
        : 500;
    const message = err instanceof Error ? err.message : String(err);
    if (err instanceof VfsError) throw new ServiceError(err.message, err.status as 400);
    if (message.includes("ttl not supported")) throw ttlUnsupported(NATIVE_PROVIDER_ID);
    throw new ServiceError(message, status);
  }
}

export function isAprovanNativeBinding(interfaceId: string, provider: string): boolean {
  return provider === NATIVE_PROVIDER_ID && isNativeInterface(interfaceId);
}

/** Map first-party keyvalue results onto `@utdk/keyvalue` contract shapes. */
function adaptKeyvalueProductResult(operation: string, result: unknown): unknown {
  if (!result || typeof result !== "object") return result;
  const row = result as Record<string, unknown>;
  switch (operation) {
    case "get": {
      const value = row["value"];
      const found = value !== null && value !== undefined;
      return {
        key: row["key"],
        value: found ? value : null,
        found,
      };
    }
    case "set": {
      return {
        key: row["key"],
        updatedAt: typeof row["updatedAt"] === "string" ? row["updatedAt"] : new Date().toISOString(),
      };
    }
    case "list": {
      const keys = row["keys"];
      if (!Array.isArray(keys)) return result;
      return {
        keys: keys.map((k) => (typeof k === "string" ? { key: k } : k)),
      };
    }
    default:
      return result;
  }
}

async function dispatchVfsShareOp(
  ctx: ServiceContext,
  operation: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const {
    createLinkShare,
    createPersonShare,
    listSharesCreatedBy,
    revokeShare,
  } = await import("./vfs/shares.js");

  switch (operation) {
    case "share": {
      const path = typeof args["path"] === "string" ? args["path"] : "";
      const expiresAt = typeof args["expiresAt"] === "string" ? args["expiresAt"] : "";
      if (!path) throw new ServiceError("path is required", 400);
      if (!expiresAt) throw new ServiceError("expiresAt is required", 400);
      const person = typeof args["person"] === "string" ? args["person"] : "";
      const link = args["link"] === true;
      if (person && link) {
        throw new ServiceError("provide person or link, not both", 400);
      }
      if (!person && !link) {
        throw new ServiceError("provide person (sub) or link:true", 400);
      }
      if (person) {
        return createPersonShare(ctx.workspaceId, {
          path,
          grantee: person,
          expiresAt,
          createdBy: ctx.userId,
        });
      }
      const { share, key } = await createLinkShare(ctx.workspaceId, {
        path,
        expiresAt,
        createdBy: ctx.userId,
      });
      return { shareId: share.shareId, key, share };
    }
    case "shares.list": {
      const shares = await listSharesCreatedBy(ctx.workspaceId, ctx.userId);
      return { shares };
    }
    case "shares.revoke": {
      const shareId = typeof args["shareId"] === "string" ? args["shareId"] : "";
      if (!shareId) throw new ServiceError("shareId is required", 400);
      return revokeShare(ctx.workspaceId, shareId, ctx.userId);
    }
    default:
      throw new ServiceError(`Unknown vfs operation: ${operation}`, 404);
  }
}

async function dispatchVcsMountsOp(
  ctx: ServiceContext,
  operation: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const {
    addMount,
    listMounts,
    removeMount,
  } = await import("./vcs/mounts-procedures.js");

  switch (operation) {
    case "mounts.list": {
      const mounts = await listMounts(ctx.workspaceId);
      return { mounts };
    }
    case "mounts.add": {
      const prefix = typeof args["prefix"] === "string" ? args["prefix"] : "";
      const type = typeof args["type"] === "string" ? args["type"] : "";
      if (!prefix) throw new ServiceError("prefix is required", 400);
      if (!type) throw new ServiceError("type is required", 400);
      if (!args["config"] || typeof args["config"] !== "object" || Array.isArray(args["config"])) {
        throw new ServiceError("config must be an object", 400);
      }
      const mode = typeof args["mode"] === "string" ? args["mode"] : undefined;
      return addMount(ctx.workspaceId, ctx.userId, {
        prefix,
        type,
        config: args["config"] as Record<string, unknown>,
        ...(mode !== undefined ? { mode } : {}),
      });
    }
    case "mounts.remove": {
      const prefix = typeof args["prefix"] === "string" ? args["prefix"] : "";
      if (!prefix) throw new ServiceError("prefix is required", 400);
      const removed = await removeMount(ctx.workspaceId, prefix);
      return { prefix, removed };
    }
    default:
      throw new ServiceError(`Unknown vcs operation: ${operation}`, 404);
  }
}
