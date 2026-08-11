/**
 * Anonymous link-share read route (iw9-b D6 / invariant 9).
 *
 *   GET /share/:key
 *   GET /share/:key/*subpath
 *
 * Resolves the link key → checks expiry/revocation → serves file bytes
 * read-only. This module's only workspace imports are `vfs/shares` and the
 * raw FS read primitive — no `records`, `apps/service`, or `workflows/*`
 * (structural invariant 9). Mount ahead of `requireAuth`.
 */

import { Hono } from "hono";
import { getFsStore, normalizeFsPath } from "../fs-store.js";
import { pathCoveredByShare, resolveLinkShare } from "../vfs/shares.js";

export const shareRouter = new Hono();

function notFound(): Response {
  return Response.json({ error: "Not found" }, { status: 404 });
}

/**
 * Resolve `:key` + optional subpath to an absolute workspace path under the
 * shared artifact. File shares reject any subpath; directory shares require
 * the joined path to stay under the shared prefix.
 */
function resolveTargetPath(
  sharePath: string,
  subpath: string | undefined,
): string | null {
  if (!subpath) return sharePath;
  const joined = normalizeFsPath(`${sharePath}/${subpath}`);
  if (!joined || !pathCoveredByShare(sharePath, joined)) return null;
  return joined;
}

async function serveShare(key: string, subpath: string | undefined): Promise<Response> {
  const resolved = await resolveLinkShare(key);
  if (!resolved) return notFound();

  const target = resolveTargetPath(resolved.share.path, subpath);
  if (!target) return notFound();

  // Directory share without a file subpath — no listing. Exact file only.
  const file = await getFsStore().read(resolved.workspaceId, target);
  if (!file) return notFound();

  return Response.json({
    path: file.path,
    content: file.content,
    mimeType: file.mimeType,
    size: file.size,
    hash: file.hash,
    updatedAt: file.updatedAt,
  });
}

shareRouter.get("/:key", async (c) => {
  const key = c.req.param("key");
  if (!key) return notFound();
  return serveShare(key, undefined);
});

shareRouter.get("/:key/:subpath{.+}", async (c) => {
  const key = c.req.param("key");
  const subpath = c.req.param("subpath");
  if (!key) return notFound();
  return serveShare(key, subpath);
});

/** Reject non-GET on the share surface — write is never admitted (invariant 9). */
shareRouter.all("/*", (c) => {
  if (c.req.method === "GET") return notFound();
  return c.json({ error: "Not found" }, 404);
});
