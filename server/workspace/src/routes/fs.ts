/**
 * Workspace filesystem routes — the HTTP face of {@link IFsStore}.
 *
 *   GET    /fs?prefix=widgets       list a subtree (metadata only)
 *   GET    /fs/changes?since=       poll for changes since a cursor (ETag 304 fast path)
 *   GET    /fs/*path[?hash=]        read a file (latest, or a pinned version)
 *   PUT    /fs/*path                write { content, mimeType? }
 *   DELETE /fs/*path[?recursive=]   delete a file, or a subtree with recursive=1
 *   POST   /fs-uploads              presigned direct-to-S3 blob upload
 *   POST   /fs-uploads/complete     register an uploaded blob under a path
 *
 * All routes are workspace-scoped through the authenticated principal, same
 * as /prompts and /artifacts (which these paths will eventually absorb).
 * The upload routes exist only on backends with object storage (S3/MinIO);
 * elsewhere they answer 501 — inline `PUT /fs/*path` always works.
 *
 * Every mutation below also records itself in the change journal
 * (change-journal.ts) — the sole source of `/fs/changes` answers. This is
 * deliberately done here, at the route/service layer, rather than inside the
 * store backends: the journal only needs to know "this path changed", not
 * how, and staged-session shadow writes (which the FS store sees as ordinary
 * `.services/**` paths) must be recorded under the *session-relative* path
 * so `.services/**` never appears in a change entry.
 */

import { Hono, type Context } from "hono";
import { hiddenDataPrefixes, partitionAccess } from "../apps/store.js";
import { changesSince, currentCursor, recordChange } from "../change-journal.js";
import {
  listAll,
  getFsStore,
  isServicePath,
  normalizeFsPath,
  type FsEntry,
  type FsListOptions,
} from "../fs-store.js";
import { requireAuth } from "../middleware/auth.js";
import { ServiceError } from "../service-kernel.js";
import {
  requireSession,
  sessionDelete,
  sessionList,
  sessionRead,
  sessionWrite,
  type ChatSessionRecord,
} from "../vcs/chat-sessions.js";
import { reconcileOrPassThrough } from "../doc/reconcile.js";
import { assertNotMounted, mountEntries, mountRead } from "../vcs/mounts.js";

export const fsRouter = new Hono();

fsRouter.use("*", requireAuth);

/**
 * `?session=<id>` scopes the operation to a *staged* chat session's overlay
 * view (docs/vcs-and-sessions.md). Auto-mode sessions resolve to undefined —
 * they write through to the live tree by contract. Closed staged sessions
 * stay readable (peek) but reject writes.
 */
async function stagedSessionParam(
  c: Context,
  write: boolean,
): Promise<ChatSessionRecord | undefined> {
  const id = c.req.query("session");
  if (!id) return undefined;
  const session = await requireSession(c.get("principal").workspaceId, id);
  if (session.mode !== "staged") return undefined;
  if (write && session.status !== "open") {
    throw new ServiceError("Session is not open", 400);
  }
  return session;
}

function serviceErrorResponse(c: Context, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  throw err;
}

/**
 * Per-user partition guard for the HTTP plane (specs per-user-data). A path
 * inside another user's data partition answers exactly the route's own
 * not-found body — `{ error: "Not found" }`, 404 — so a foreign partition is
 * byte-identical to a path that does not exist. Returns null when access is
 * allowed. REPO CONVENTION: every new exact-path /fs verb calls this first.
 */
async function foreignPartitionResponse(
  c: Context,
  path: string,
): Promise<Response | null> {
  const principal = c.get("principal");
  const hidden = await hiddenDataPrefixes(principal.workspaceId);
  if (partitionAccess(path, principal.sub, hidden) === "foreign") {
    return c.json({ error: "Not found" }, 404);
  }
  return null;
}

function parseFsListLimit(raw: string | undefined): number | "invalid" | null {
  if (!raw) return null;
  const limit = Number(raw);
  if (!Number.isFinite(limit) || limit < 1 || limit > 10_000) return "invalid";
  return Math.floor(limit);
}

function filterListedEntries(
  entries: FsEntry[],
  sub: string,
  hidden: readonly string[],
): FsEntry[] {
  return entries.filter(
    (entry) =>
      !isServicePath(entry.path) && partitionAccess(entry.path, sub, hidden) !== "foreign",
  );
}

fsRouter.get("/", async (c) => {
  const prefix = c.req.query("prefix") ?? "";
  const normalized = prefix ? normalizeFsPath(prefix) : "";
  if (normalized === null) return c.json({ error: "Invalid prefix" }, 400);
  if (normalized && isServicePath(normalized)) {
    return c.json({ error: "Service state is managed through its tool namespaces" }, 403);
  }
  const limitParam = parseFsListLimit(c.req.query("limit"));
  if (limitParam === "invalid") return c.json({ error: "Invalid limit" }, 400);
  const cursor = c.req.query("cursor") ?? "";
  if (cursor && limitParam === null) {
    return c.json({ error: "cursor requires limit" }, 400);
  }
  const workspaceId = c.get("principal").workspaceId;
  try {
    const session = await stagedSessionParam(c, false);
    if (session) {
      return c.json({
        session: session.id,
        entries: await sessionList(workspaceId, session, normalized),
      });
    }
  } catch (err) {
    return serviceErrorResponse(c, err);
  }
  const store = getFsStore();
  // Root listings (and the chat file tree, which calls this same route)
  // hide the service subtree entirely, plus every OTHER user's data
  // partition — the caller's own partition is listed (their private files
  // are a place, not a secret; see docs/app-data.md).
  const hidden = await hiddenDataPrefixes(workspaceId);
  const sub = c.get("principal").sub;
  let entries: FsEntry[];
  let nextCursor: string | undefined;
  if (limitParam !== null) {
    const listOpts: FsListOptions = { limit: limitParam };
    if (cursor) listOpts.cursor = cursor;
    const page = await store.list(workspaceId, normalized, listOpts);
    entries = page.entries;
    nextCursor = page.cursor;
  } else {
    entries = await listAll(store, workspaceId, normalized);
  }
  const includeMounts = limitParam === null || !cursor;
  const mounted = includeMounts ? await mountEntries(workspaceId, normalized) : [];
  return c.json({
    entries: [
      ...filterListedEntries(entries, sub, hidden),
      ...mounted,
    ].sort((a, b) => a.path.localeCompare(b.path)),
    ...(nextCursor ? { cursor: nextCursor } : {}),
  });
});

/**
 * Change feed the client polls in place of the old full unprefixed `/fs`
 * listing (client/web/src/lib/workspace-vfs.ts `startLiveWorkspaceSync`).
 * Registered before `/:path{.+}` so "changes" is never captured as a path
 * param.
 *
 * The `If-None-Match` check happens before any session resolution or store
 * read: an idle poll (cursor unchanged) short-circuits to 304 having touched
 * nothing but the in-memory journal, satisfying "Idle workspace costs no
 * store reads" regardless of whether `?session=` was supplied.
 */
fsRouter.get("/changes", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const cursor = currentCursor(workspaceId);
  const etag = `"${cursor}"`;
  if (c.req.header("If-None-Match") === etag) {
    c.header("ETag", etag);
    return c.body(null, 304);
  }

  let scope = "";
  let stagedSession: ChatSessionRecord | undefined;
  try {
    stagedSession = await stagedSessionParam(c, false);
    if (stagedSession) scope = stagedSession.id;
  } catch (err) {
    return serviceErrorResponse(c, err);
  }

  const since = c.req.query("since");
  const result = changesSince(workspaceId, scope, since === undefined ? undefined : Number(since));
  c.header("ETag", `"${result.cursor}"`);
  if (!result.reset) {
    return c.json({ cursor: result.cursor, reset: false, changes: result.changes });
  }

  // Reset: the journal can't answer (first poll, restart, or ring overflow).
  // "changes" carries the current full listing, every path reported as
  // "update" — the client rebaselines against it silently (see
  // workspace-vfs.ts).
  let paths: string[];
  if (stagedSession) {
    paths = (await sessionList(workspaceId, stagedSession, "")).map((entry) => entry.path);
  } else {
    const entries = await listAll(getFsStore(), workspaceId, "");
    const hidden = await hiddenDataPrefixes(workspaceId);
    const mounted = await mountEntries(workspaceId, "");
    const sub = c.get("principal").sub;
    paths = [
      ...entries.filter(
        (entry) =>
          !isServicePath(entry.path) &&
          partitionAccess(entry.path, sub, hidden) !== "foreign",
      ),
      ...mounted,
    ].map((entry) => entry.path);
  }
  return c.json({
    cursor: result.cursor,
    reset: true,
    changes: paths.map((path) => ({ path, kind: "update" as const })),
  });
});

fsRouter.get("/:path{.+}", async (c) => {
  const path = normalizeFsPath(c.req.param("path"));
  if (!path) return c.json({ error: "Invalid path" }, 400);
  if (isServicePath(path)) {
    return c.json({ error: "Service state is managed through its tool namespaces" }, 403);
  }
  const denied = await foreignPartitionResponse(c, path);
  if (denied) return denied;
  const workspaceId = c.get("principal").workspaceId;
  try {
    const session = await stagedSessionParam(c, false);
    if (session) {
      const file = await sessionRead(workspaceId, session, path);
      return file ? c.json(file) : c.json({ error: "Not found" }, 404);
    }
    const viaMount = await mountRead(workspaceId, path);
    if (viaMount !== "not-mounted") {
      return viaMount ? c.json(viaMount) : c.json({ error: "Not found" }, 404);
    }
  } catch (err) {
    return serviceErrorResponse(c, err);
  }
  const file = await getFsStore().read(workspaceId, path, c.req.query("hash"));
  return file ? c.json(file) : c.json({ error: "Not found" }, 404);
});

fsRouter.put("/:path{.+}", async (c) => {
  const path = normalizeFsPath(c.req.param("path"));
  if (!path) return c.json({ error: "Invalid path" }, 400);
  if (isServicePath(path)) {
    return c.json({ error: "Service state is managed through its tool namespaces" }, 403);
  }
  const denied = await foreignPartitionResponse(c, path);
  if (denied) return denied;
  const body = await c.req.json<{ content?: string; mimeType?: string; base?: string }>();
  if (typeof body.content !== "string") {
    return c.json({ error: "content must be a string" }, 400);
  }
  const principal = c.get("principal");
  const workspaceId = principal.workspaceId;
  try {
    await assertNotMounted(workspaceId, path);
    // Live-doc reconcile (D7) after mount/partition checks — fall through on not-live.
    const reconciled = await reconcileOrPassThrough({
      workspaceId,
      path,
      content: body.content,
      base: typeof body.base === "string" ? body.base : undefined,
      actor: { userId: principal.sub },
      explicitSessionId: c.req.query("session") || undefined,
    });
    if (reconciled.kind === "applied") {
      recordChange(workspaceId, "", path, "update");
      return c.json(
        { path, reconciled: true, appliedBlocks: reconciled.appliedBlocks },
        201,
      );
    }
    if (reconciled.kind === "conflict") {
      recordChange(workspaceId, reconciled.sessionId, path, "update");
      return c.json(
        {
          path,
          reconciled: true,
          conflict: true,
          sessionId: reconciled.sessionId,
          appliedBlocks: reconciled.appliedBlocks,
          failed: reconciled.failed,
        },
        201,
      );
    }
    const session = await stagedSessionParam(c, true);
    if (session) {
      const meta = await sessionWrite(workspaceId, session, path, body.content, body.mimeType);
      recordChange(workspaceId, session.id, path, "update");
      return c.json(meta, 201);
    }
  } catch (err) {
    return serviceErrorResponse(c, err);
  }
  const file = await getFsStore().write(workspaceId, path, body.content, body.mimeType);
  recordChange(workspaceId, "", path, "update");
  return c.json(file, 201);
});

fsRouter.delete("/:path{.+}", async (c) => {
  const path = normalizeFsPath(c.req.param("path"));
  if (!path) return c.json({ error: "Invalid path" }, 400);
  if (isServicePath(path)) {
    return c.json({ error: "Service state is managed through its tool namespaces" }, 403);
  }
  const denied = await foreignPartitionResponse(c, path);
  if (denied) return denied;
  const workspaceId = c.get("principal").workspaceId;
  const store = getFsStore();
  try {
    await assertNotMounted(workspaceId, path);
    const session = await stagedSessionParam(c, true);
    if (session) {
      const removedPaths = await sessionDelete(
        workspaceId,
        session,
        path,
        c.req.query("recursive") === "1",
      );
      for (const removedPath of removedPaths) {
        recordChange(workspaceId, session.id, removedPath, "delete");
      }
      return c.body(null, 204);
    }
  } catch (err) {
    return serviceErrorResponse(c, err);
  }
  let removed: boolean;
  if (c.req.query("recursive") === "1") {
    // Capture the subtree before deleting it — removePrefix only reports a
    // count, and the journal needs the individual paths.
    const toRemove = await listAll(store, workspaceId, path);
    removed = (await store.removePrefix(workspaceId, path)) > 0;
    if (removed) {
      for (const entry of toRemove) recordChange(workspaceId, "", entry.path, "delete");
    }
  } else {
    removed = await store.remove(workspaceId, path);
    if (removed) recordChange(workspaceId, "", path, "delete");
  }
  return removed
    ? c.body(null, 204)
    : c.json({ error: "Not found" }, 404);
});

// ---------------------------------------------------------------------------
// Direct-to-S3 uploads (mounted as /fs-uploads to stay clear of /fs/*path)
// ---------------------------------------------------------------------------

const HASH_PATTERN = /^[0-9a-f]{64}$/u;

export const fsUploadsRouter = new Hono();

fsUploadsRouter.use("*", requireAuth);

fsUploadsRouter.post("/", async (c) => {
  const store = getFsStore();
  if (!store.createUpload) {
    return c.json({ error: "Direct uploads need the S3 backend" }, 501);
  }
  const body = await c.req.json<{ hash?: string; mimeType?: string }>();
  if (!body.hash || !HASH_PATTERN.test(body.hash)) {
    return c.json({ error: "hash must be the hex SHA-256 of the content" }, 400);
  }
  const ticket = await store.createUpload(
    c.get("principal").workspaceId,
    body.hash,
    body.mimeType ?? "application/octet-stream",
  );
  return c.json(ticket, 201);
});

fsUploadsRouter.post("/complete", async (c) => {
  const store = getFsStore();
  if (!store.completeUpload) {
    return c.json({ error: "Direct uploads need the S3 backend" }, 501);
  }
  const body = await c.req.json<{ path?: string; hash?: string; mimeType?: string }>();
  const path = body.path ? normalizeFsPath(body.path) : null;
  if (!path) return c.json({ error: "Invalid path" }, 400);
  if (isServicePath(path)) {
    return c.json({ error: "Service state is managed through its tool namespaces" }, 403);
  }
  if (!body.hash || !HASH_PATTERN.test(body.hash)) {
    return c.json({ error: "hash must be the hex SHA-256 of the content" }, 400);
  }
  // Upload completion is a write at an exact path — same partition guard.
  const denied = await foreignPartitionResponse(c, path);
  if (denied) return denied;
  const workspaceId = c.get("principal").workspaceId;
  const entry = await store.completeUpload(
    workspaceId,
    path,
    body.hash,
    body.mimeType ?? "application/octet-stream",
  );
  if (entry) recordChange(workspaceId, "", path, "update");
  return entry
    ? c.json(entry, 201)
    : c.json({ error: "No uploaded blob for that hash" }, 404);
});
