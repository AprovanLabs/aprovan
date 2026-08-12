/**
 * Legacy + convenience live-app URLs — resolve-then-302 shims only.
 *
 * Serving lives in `routes/app-urls.ts` under `/a/…` and `/w/…/a/…`.
 * Every route here resolves the legacy segment to a canonical path and
 * redirects; nothing serves app content.
 *
 *   GET /apps/:slug                  — convenience → /a/<appId>
 *   GET /apps/:workspaceId/:name     — legacy → /a/<appId> or /w/<ws>/a/<installId>
 *   GET /apps/id/:appId              — legacy permalink → /a/<appId>
 *   … plus the same forms with /__project__, /__sdk__.js|.d.ts, and
 *      wildcard static paths (workspace + id forms only — convenience is
 *      the bare slug path)
 */

import { Hono } from "hono";
import { readInstall } from "../apps/install.js";
import { isAppId, resolveAppLocation, resolveAppRef } from "../apps/identity.js";
import { resolveGlobalSlug } from "../apps/slugs.js";
import { ServiceError } from "../service-kernel.js";

export const liveAppsRouter = new Hono();

function errorResponse(c: { json: (body: unknown, status?: number) => Response }, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  return c.json({ error: err instanceof Error ? err.message : "Internal error" }, 500);
}

function requestPath(c: { req: { url: string } }): { pathname: string; search: string } {
  const url = new URL(c.req.url, "http://local");
  // Hono keeps the full request pathname even under `app.route("/apps", …)`.
  // Direct `liveAppsRouter.request("/local/…")` calls are already mount-relative.
  let pathname = url.pathname;
  if (pathname === "/apps" || pathname.startsWith("/apps/")) {
    pathname = pathname.slice("/apps".length) || "/";
  }
  return { pathname, search: url.search };
}

/**
 * Split a legacy live path into `{ kind, segments after the app address, search }`.
 * Mounted at `/apps`, so pathname is relative to that mount.
 */
function parseLegacyPath(pathname: string): {
  appId?: string;
  workspaceId?: string;
  name?: string;
  slug?: string;
  rest: string;
} {
  const parts = pathname.replace(/^\//, "").split("/").filter(Boolean);
  if (parts[0] === "id" && parts[1]) {
    return {
      appId: parts[1],
      rest: parts.length > 2 ? `/${parts.slice(2).join("/")}` : "",
    };
  }
  if (parts.length >= 2) {
    return {
      workspaceId: parts[0],
      name: parts[1],
      rest: parts.length > 2 ? `/${parts.slice(2).join("/")}` : "",
    };
  }
  if (parts.length === 1) {
    return { slug: parts[0], rest: "" };
  }
  throw new ServiceError("Not found", 404);
}

async function resolveCanonicalBase(parsed: {
  appId?: string;
  workspaceId?: string;
  name?: string;
  slug?: string;
}): Promise<string> {
  if (parsed.appId) {
    await resolveAppLocation(parsed.appId);
    return `/a/${parsed.appId}`;
  }
  if (parsed.workspaceId && parsed.name) {
    if (isAppId(parsed.name)) {
      const install = await readInstall(parsed.workspaceId, parsed.name);
      if (install) return `/w/${parsed.workspaceId}/a/${install.installId}`;
    }
    const appId = await resolveAppRef(parsed.workspaceId, parsed.name);
    return `/a/${appId}`;
  }
  if (parsed.slug) {
    const claim = await resolveGlobalSlug(parsed.slug);
    if (!claim) throw new ServiceError("Not found", 404);
    return `/a/${claim.appId}`;
  }
  throw new ServiceError("Not found", 404);
}

async function redirectShim(c: any) {
  try {
    const { pathname, search } = requestPath(c);
    const parsed = parseLegacyPath(pathname);
    const base = await resolveCanonicalBase(parsed);
    return c.redirect(`${base}${parsed.rest}${search}`, 302);
  } catch (err) {
    return errorResponse(c, err);
  }
}

// Literal permalink first so "id" is never treated as a workspace or slug.
liveAppsRouter.get("/id/:appId", redirectShim);
liveAppsRouter.get("/id/:appId/*", redirectShim);

// Two-segment legacy form (and its sub-resources) before bare /:slug.
liveAppsRouter.get("/:workspaceId/:name", redirectShim);
liveAppsRouter.get("/:workspaceId/:name/*", redirectShim);

// Convenience: bare /apps/<globalSlug> only.
liveAppsRouter.get("/:slug", redirectShim);
