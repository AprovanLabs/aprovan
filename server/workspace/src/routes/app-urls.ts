/**
 * Canonical + vanity live-app surface (IW-9 D5):
 *
 *   GET /a/:ref                         — public app (appId or global slug)
 *   GET /w/:wsRef/a/:ref                — workspace-scoped (install id, own
 *                                          appId, or workspace alias/slug)
 *   …/__project__, …/__sdk__.js|.d.ts, and wildcard static paths — same
 *                                          sub-resources as today's live surface
 *
 * Serving logic moved here from `routes/live-apps.ts`. Legacy `/apps/…`
 * paths are resolve-then-302 shims only (see live-apps.ts).
 *
 * **Channels.** When the manifest has a channel pointer, content requests
 * serve that release's pinned hashes (the entry is read at `entryHash`)
 * instead of the latest write; with no pointer, latest — so an app that never
 * cuts a release behaves exactly as it always did. `?channel=preview` (or any
 * non-default channel) is honoured only for callers holding the app's admin
 * role, and is checked on the token-bearing endpoints, not on page chrome.
 *
 * Visibility is enforced server-side on the project and file endpoints, not
 * on page chrome:
 *
 *   - "public": anyone can load the project/files, no Aprovan account.
 *   - "private" (default): a valid token passing the manifest role model.
 */

import { Hono } from "hono";
import {
  DEFAULT_CHANNEL,
  channelName,
  resolveChannelRelease,
  type AppRelease,
} from "../apps/releases.js";
import { generateAppSdk } from "../apps/sdk.js";
import {
  installRoot,
  installServingManifest,
  readInstall,
} from "../apps/install.js";
import { isAppId, resolveAppLocation, resolveAppRef } from "../apps/identity.js";
import { resolveGlobalSlug, resolveWorkspaceSlug } from "../apps/slugs.js";
import { installAppApiBase, publicAppApiBase } from "../apps/url-bases.js";
import {
  appPathServable,
  callerRole,
  readApp,
  readEntryVersion,
  resolveAppPath,
  workspacePath,
  type AppManifest,
} from "../apps/store.js";
import { listAll, getFsStore } from "../fs-store.js";
import { getAuthMode, readBearerToken, verifyAccessToken } from "../middleware/auth.js";
import { ServiceError } from "../service-kernel.js";
import { readRegistration } from "../workflows/store.js";

/**
 * The compiler the app page loads from esm.sh, and the widget image it
 * compiles against.
 *
 * The compiler version MUST track this package's own `@aprovan/patchwork`
 * dependency — `tests/app-urls.test.ts` asserts it, because drift here is
 * silent and severe. Widgets reach server namespaces only through the global
 * `tools` root assembled by this compiler; there are no bare namespace import
 * specifiers to claim. The exact pin remains for reproducible esm.sh caching
 * (unversioned "latest" redirects are cached for hours), not because npm
 * package name collisions could hijack `vfs`/`events`/`agents` anymore.
 */
export const APP_SHELL_COMPILER_VERSION = "0.2.1";
const APP_SHELL_IMAGE_VERSION = "0.1.4";

export const appUrlsRouter = new Hono();

interface LiveApp {
  manifest: AppManifest;
  /** Workspace whose FS is read for content (always the installer for copies). */
  workspaceId: string;
  /** Pinned release when serving a channel pin on an origin app (not installs). */
  release?: AppRelease;
  /** True when content comes from an install-as-copy local root. */
  localFork?: boolean;
  /** Install id when serving `/w/…/a/<installId>` (canonical install surface). */
  installId?: string;
}

function toAppPaths(manifest: AppManifest) {
  return { id: manifest.appId, name: manifest.name, paths: manifest.paths };
}

type HonoCtx = {
  req: {
    header(name: string): string | undefined;
    param(name: string): string | undefined;
    query(name: string): string | undefined;
  };
};

/** Resolve `/w/:wsRef` — workspace-slug claim, else passthrough as workspace id. */
async function resolveWsRef(wsRef: string): Promise<string> {
  const claimed = await resolveWorkspaceSlug(wsRef);
  if (claimed?.workspaceId) return claimed.workspaceId;
  return wsRef;
}

/**
 * Dual lookup under a resolved workspace (ported from live-apps `resolveLiveApp`):
 * ULID → try install first; miss or non-ULID → `resolveAppRef` (own app / alias).
 */
async function resolveInWorkspace(workspaceId: string, ref: string): Promise<LiveApp> {
  if (isAppId(ref)) {
    const install = await readInstall(workspaceId, ref);
    if (install) {
      const root = installRoot(install);
      const manifest = installServingManifest(install);
      if (!manifest?.entry || !root) throw new ServiceError("Not found", 404);
      return {
        manifest,
        workspaceId,
        localFork: true,
        installId: install.installId,
      };
    }
  }

  const appId = await resolveAppRef(workspaceId, ref);
  const manifest = await readApp(workspaceId, appId).catch(() => undefined);
  if (!manifest?.entry) throw new ServiceError("Not found", 404);
  return { manifest, workspaceId };
}

async function resolveLiveApp(c: HonoCtx): Promise<LiveApp> {
  const ref = c.req.param("ref");
  if (!ref) throw new ServiceError("Not found", 404);

  const wsRef = c.req.param("wsRef");
  if (wsRef) {
    const workspaceId = await resolveWsRef(wsRef);
    return resolveInWorkspace(workspaceId, ref);
  }

  // Public `/a/:ref` — ULID = appId; else global slug claim.
  if (isAppId(ref)) {
    const loc = await resolveAppLocation(ref);
    const manifest = await readApp(loc.workspaceId, ref).catch(() => undefined);
    if (!manifest?.entry) throw new ServiceError("Not found", 404);
    return { manifest, workspaceId: loc.workspaceId };
  }

  const claim = await resolveGlobalSlug(ref);
  if (!claim) throw new ServiceError("Not found", 404);
  const manifest = await readApp(claim.workspaceId, claim.appId).catch(() => undefined);
  if (!manifest?.entry) throw new ServiceError("Not found", 404);
  return { manifest, workspaceId: claim.workspaceId };
}

/** The caller's sub, or undefined when the request carries no identity. */
async function viewerSub(c: HonoCtx): Promise<string | undefined> {
  if (getAuthMode() === "none") return c.req.header("X-App-User") ?? "local";
  const token = readBearerToken(c);
  if (!token) return undefined;
  try {
    return await verifyAccessToken(token);
  } catch {
    throw new ServiceError("Invalid or expired token", 401);
  }
}

/**
 * Enforce the manifest's visibility for content requests. Public apps serve
 * to anyone; private apps require a valid token whose sub passes the role
 * model.
 */
async function requireViewer(c: HonoCtx, manifest: AppManifest): Promise<void> {
  if ((manifest.visibility ?? "private") === "public") return;
  const sub = await viewerSub(c);
  if (!sub) throw new ServiceError("Sign in to view this app", 401);
  if (!callerRole(manifest, sub)) {
    throw new ServiceError("You do not have access to this app", 403);
  }
}

/**
 * Which release a content request serves. The default channel is open to
 * every viewer; any other channel (`?channel=preview`) is an admin-only view
 * of unreleased content, so it is gated on the app's admin role — checked
 * here, on the token-bearing endpoints, rather than on the page shell.
 */
async function resolvePin(c: HonoCtx, app: LiveApp): Promise<AppRelease | undefined> {
  // Install-pinned content wins over channel query.
  if (app.release) return app.release;
  const channel = channelName(c.req.query("channel"));
  if (channel !== DEFAULT_CHANNEL) {
    const sub = await viewerSub(c);
    if (!sub || callerRole(app.manifest, sub) !== "admin") {
      throw new ServiceError(`Channel "${channel}" is visible to this app's admins only`, 403);
    }
  }
  return resolveChannelRelease(app.workspaceId, app.manifest, channel);
}

/**
 * Read a file for the live surface, honouring a release pin: the entrypoint
 * is materialised at the release's content hash (the FS keeps every version,
 * so a pinned read is the same read with a hash), everything else is latest.
 */
async function readPinned(app: LiveApp, path: string, release: AppRelease | undefined) {
  if (release?.entryHash && path === release.entry) {
    const pinned = await readEntryVersion(app.workspaceId, path, release.entryHash);
    if (pinned) return pinned;
  }
  return getFsStore().read(app.workspaceId, path);
}

/**
 * Workspace paths a URL path may address: the app's root (so URLs read like
 * a normal site) and the raw workspace path (so the workspace-keyed paths
 * `__project__` hands out fetch back). Traversal, `.services/**`, and
 * anything outside the app's servable prefixes drop out here.
 */
function servableTargets(manifest: AppManifest, relative: string): string[] {
  const targets: string[] = [];
  for (const resolve of [
    () => resolveAppPath(toAppPaths(manifest), relative),
    () => workspacePath(relative),
  ]) {
    try {
      targets.push(resolve());
    } catch {
      // Not addressable — fall through to the SPA shell.
    }
  }
  return targets.filter((path) => appPathServable(toAppPaths(manifest), path));
}

function errorResponse(c: { json: (body: unknown, status?: number) => Response }, err: unknown): Response {
  if (err instanceof ServiceError) {
    return c.json({ error: err.message }, err.status as 400);
  }
  return c.json({ error: err instanceof Error ? err.message : "Internal error" }, 500);
}

/** Canonical live base for shell config (public = `/a/<appId>`; install = `/w/…`). */
function canonicalLiveBase(app: LiveApp): string {
  if (app.installId) return `/w/${app.workspaceId}/a/${app.installId}`;
  return `/a/${app.manifest.appId}`;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

async function handleLivePage(c: any) {
  try {
    const app = await resolveLiveApp(c);
    return c.newResponse(buildAppShell(app, channelName(c.req.query("channel"))), 200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
appUrlsRouter.get("/a/:ref", handleLivePage);
appUrlsRouter.get("/w/:wsRef/a/:ref", handleLivePage);

// ---------------------------------------------------------------------------
// __project__
// ---------------------------------------------------------------------------

async function handleLiveProject(c: any) {
  try {
    const app = await resolveLiveApp(c);
    await requireViewer(c, app.manifest);
    const release = await resolvePin(c, app);

    const { manifest, workspaceId } = app;
    const store = getFsStore();
    const listings = await Promise.all(
      manifest.paths.map((prefix) => listAll(store, workspaceId, prefix)),
    );
    const paths = [...new Set(listings.flat().map((entry) => entry.path))].filter((path) =>
      appPathServable(toAppPaths(manifest), path),
    );
    const files = (
      await Promise.all(
        paths.map(async (path) => {
          const file = await readPinned(app, path, release);
          return file ? { path, content: file.content } : null;
        }),
      )
    ).filter((f): f is { path: string; content: string } => f !== null);

    if (!files.some((f) => f.path === manifest.entry)) {
      throw new ServiceError(`App entrypoint missing: ${manifest.entry}`, 404);
    }
    return c.json({
      entry: manifest.entry,
      paths: manifest.paths,
      files,
      release: release ? { id: release.id, channel: release.channel, createdAt: release.createdAt } : null,
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
appUrlsRouter.get("/a/:ref/__project__", handleLiveProject);
appUrlsRouter.get("/w/:wsRef/a/:ref/__project__", handleLiveProject);

// ---------------------------------------------------------------------------
// __sdk__.js | __sdk__.d.ts
// ---------------------------------------------------------------------------

async function sdkFor(c: HonoCtx): Promise<{ js: string; dts: string }> {
  const app = await resolveLiveApp(c);
  await requireViewer(c, app.manifest);
  const release = await resolvePin(c, app);
  const workflows = await Promise.all(
    (app.manifest.workflows ?? []).map(async (name) => {
      const registration = await readRegistration(app.workspaceId, name).catch(() => undefined);
      return {
        name,
        description: registration?.description,
        input: registration?.input,
        output: registration?.output,
      };
    }),
  );
  return generateAppSdk(app.manifest, workflows, { channel: release?.channel });
}

async function handleLiveSdkJs(c: any) {
  try {
    const { js } = await sdkFor(c);
    return c.newResponse(js, 200, {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
appUrlsRouter.get("/a/:ref/__sdk__.js", handleLiveSdkJs);
appUrlsRouter.get("/w/:wsRef/a/:ref/__sdk__.js", handleLiveSdkJs);

async function handleLiveSdkDts(c: any) {
  try {
    const { dts } = await sdkFor(c);
    return c.newResponse(dts, 200, {
      "Content-Type": "application/typescript; charset=utf-8",
      "Cache-Control": "no-store",
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
appUrlsRouter.get("/a/:ref/__sdk__.d.ts", handleLiveSdkDts);
appUrlsRouter.get("/w/:wsRef/a/:ref/__sdk__.d.ts", handleLiveSdkDts);

// ---------------------------------------------------------------------------
// Static + SPA fallback
// ---------------------------------------------------------------------------

async function handleLiveStatic(c: any) {
  try {
    const app = await resolveLiveApp(c);
    const raw = c.req.param();
    const rest = (raw as Record<string, string>)["*"] ?? "";
    const relative = rest.replace(/^\/+|\/+$/g, "");

    const release = await resolvePin(c, app);
    for (const target of relative ? servableTargets(app.manifest, relative) : []) {
      const file = await readPinned(app, target, release);
      if (file) {
        await requireViewer(c, app.manifest);
        return c.newResponse(file.content, 200, {
          "Content-Type": file.mimeType ?? "application/octet-stream",
          "Cache-Control": "no-store",
        });
      }
    }
    return c.newResponse(buildAppShell(app, channelName(c.req.query("channel"))), 200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
appUrlsRouter.get("/a/:ref/*", handleLiveStatic);
appUrlsRouter.get("/w/:wsRef/a/:ref/*", handleLiveStatic);

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function buildAppShell(app: LiveApp, channel = DEFAULT_CHANNEL): string {
  const { manifest, workspaceId, installId } = app;
  const title = manifest.title ?? manifest.name;
  const services = [
    ...new Set([
      ...manifest.allowedTools.map((tool) => tool.split(".")[0]!),
      ...((manifest.workflows ?? []).length > 0 ? ["app"] : []),
    ]),
  ];
  const liveBase = canonicalLiveBase(app);
  // Public/authored surface: appId-keyed bases, no workspace id anywhere.
  // Install surface: `/w/<wsId>/a/<installId>` (workspace id allowed only here).
  const config = installId
    ? {
        app: manifest.name,
        appId: manifest.appId,
        workspaceId,
        title,
        appBase: installAppApiBase(workspaceId, installId),
        liveBase,
        permalinkBase: liveBase,
        channel,
        services,
      }
    : {
        app: manifest.name,
        appId: manifest.appId,
        title,
        appBase: publicAppApiBase(manifest.appId),
        liveBase,
        permalinkBase: liveBase,
        channel,
        services,
      };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title.replace(/</g, "&lt;")}</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  #status { padding: 16px; color: #666; font-size: 14px; }
  #root { min-height: 100vh; }
</style>
</head>
<body>
<div id="status">Loading ${title.replace(/</g, "&lt;")}…</div>
<div id="root"></div>
<script>window.__APP_CONFIG__ = ${JSON.stringify(config).replace(/</g, "\\u003c")};</script>
<script type="importmap">
{
  "imports": {
    "esbuild-wasm": "https://unpkg.com/esbuild-wasm@0.27.2/esm/browser.min.js"
  }
}
</script>
<script type="module">
const cfg = window.__APP_CONFIG__;
const status = document.getElementById("status");

// The @aprovan/ui auth client mirrors the access token into localStorage for
// same-origin non-React callers — exactly this case. The chat app (same
// origin) writes "patchwork:authToken"; the older keys are read for safety.
const AUTH_RETRY_FLAG = "aprovan.appAuthTried";
const token =
  localStorage.getItem("patchwork:authToken") ||
  localStorage.getItem("aprovan.accessToken") ||
  localStorage.getItem("patchwork_access_token") ||
  "";
const authHeaders = token ? { "Authorization": "Bearer " + token } : {};

try {
  const channelQuery = cfg.channel && cfg.channel !== "live" ? "?channel=" + encodeURIComponent(cfg.channel) : "";
  const projectRes = await fetch(cfg.liveBase + "/__project__" + channelQuery, { headers: authHeaders });
  if (projectRes.status === 401 || projectRes.status === 403) {
    // Private app, no usable session. Bounce through the chat app's sign-in —
    // it shares this origin and is an already-registered Cognito callback, and
    // it writes the same token key this page reads, so on return the token is
    // here and the app loads. Same-tab (not a popup), and guarded by a per-tab
    // flag so a still-unauthorized return can't loop.
    const appPath = location.pathname + location.search;
    const signInUrl = location.origin + "/chat/?authReturn=" + encodeURIComponent(appPath);
    if (!sessionStorage.getItem(AUTH_RETRY_FLAG)) {
      sessionStorage.setItem(AUTH_RETRY_FLAG, "1");
      location.replace(signInUrl);
    } else {
      status.innerHTML =
        'This app requires an Aprovan account — ' +
        '<a href="' + signInUrl + '">sign in</a>.';
    }
    throw new Error("not authorized");
  }
  // A live session reached the app — clear the retry guard so a later token
  // expiry gets a fresh sign-in attempt instead of the static prompt.
  sessionStorage.removeItem(AUTH_RETRY_FLAG);
  if (!projectRes.ok) throw new Error("Failed to load app source (" + projectRes.status + ")");
  const project = await projectRes.json();

  // Version-pinned (see APP_SHELL_COMPILER_VERSION): esm.sh caches the
  // unversioned "latest" redirect for hours, so a bare spec can silently serve
  // a stale compiler. esbuild-wasm is external + import-mapped to its real ESM
  // browser build — esm.sh's UMD interop drops its named exports
  // ("build is not a function").
  const { createCompiler } = await import("https://esm.sh/@aprovan/patchwork@${APP_SHELL_COMPILER_VERSION}?external=esbuild-wasm");
  const compiler = await createCompiler({
    image: "@aprovan/patchwork-image-shadcn@${APP_SHELL_IMAGE_VERSION}",
    cdnBaseUrl: "https://esm.sh",
    widgetCdnBaseUrl: "https://esm.sh",
    proxyUrl: cfg.appBase + "/tools",
    proxyFetch: (url, init) => fetch(url, {
      ...init,
      headers: { ...(init && init.headers ? init.headers : {}), ...authHeaders },
    }),
  });
  // The payload names its own entrypoint (the manifest's declared \`entry\`)
  // and keys every file by its workspace path, so relative imports resolve
  // across all of the app's published prefixes.
  const widget = await compiler.compile(
    {
      id: cfg.app,
      entry: project.entry,
      files: new Map(project.files.map((f) => [f.path, { path: f.path, content: f.content }])),
    },
    {
      name: cfg.app,
      version: "1.0.0",
      platform: "browser",
      image: "@aprovan/patchwork-image-shadcn",
      services: cfg.services,
    },
    { typescript: true },
  );
  status.remove();
  // allow-scripts ONLY: adding allow-same-origin would let published app
  // code escape the iframe sandbox and read the viewer's stored token —
  // the service proxy runs in this parent shell, so the widget needs no
  // same-origin powers.
  await compiler.mount(widget, { target: document.getElementById("root"), mode: "iframe", sandbox: ["allow-scripts"] });
} catch (err) {
  if (String(err && err.message) !== "not authorized") {
    status.textContent = "Failed to load app: " + (err && err.message ? err.message : err);
  }
  console.error(err);
}
</script>
</body>
</html>`;
}
