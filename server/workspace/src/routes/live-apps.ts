/**
 * Live app pages — published apps as standalone websites:
 *
 *   GET /apps/:workspaceId/:name               — the app page (HTML shell)
 *   GET /apps/id/:appId                        — durable permalink (same surface)
 *   GET /apps/:workspaceId/:name/__project__   — the app's source project (JSON)
 *   GET /apps/:workspaceId/:name/__sdk__.js    — generated runtime shim
 *   GET /apps/:workspaceId/:name/__sdk__.d.ts  — generated types
 *   GET /apps/:workspaceId/:name/*             — static files from the app's
 *                                                prefixes, SPA-fallback to the page
 *
 * **Channels.** When the manifest has a channel pointer, content requests
 * serve that release's pinned hashes (the entry is read at `entryHash`)
 * instead of the latest write; with no pointer, latest — so an app that never
 * cuts a release behaves exactly as it always did. `?channel=preview` (or any
 * non-default channel) is honoured only for callers holding the app's admin
 * role, and is checked on the token-bearing endpoints, not on page chrome.
 *
 * Mounted at the domain root (aprovan.com/apps/...) — CloudFront forwards
 * `apps/*` to the gateway alongside `api/*`. The shell carries no app
 * source; it fetches `__project__` with the viewer's token and compiles the
 * manifest's declared `entry` in-browser (the payload names it, so the shell
 * never guesses), so **visibility is enforced server-side on the project and
 * file endpoints**, not on page chrome:
 *
 *   - "public": anyone can load the project/files, no Aprovan account.
 *   - "private" (default): a valid token passing the manifest role model.
 *
 * What may be served is decided by exactly one rule — the manifest's
 * declared path prefixes minus its data partition (appPathServable in
 * apps/store.js), the same rule that authorizes an app session's FS access.
 * Tool/workflow calls always ride the authenticated app API surface
 * (/api/gateway/apps/...) regardless of visibility.
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
  cachedOriginRelease,
  readInstall,
  remapEntry,
} from "../apps/install.js";
import { isAppId, resolveAppLocation, resolveAppRef } from "../apps/identity.js";
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
 * dependency — `tests/live-apps.test.ts` asserts it, because drift here is
 * silent and severe. Widgets reach server namespaces only through the global
 * `tools` root assembled by this compiler; there are no bare namespace import
 * specifiers to claim. The exact pin remains for reproducible esm.sh caching
 * (unversioned "latest" redirects are cached for hours), not because npm
 * package name collisions could hijack `vfs`/`events`/`agents` anymore.
 */
export const APP_SHELL_COMPILER_VERSION = "0.2.0";
const APP_SHELL_IMAGE_VERSION = "0.1.4";

export const liveAppsRouter = new Hono();

interface LiveApp {
  manifest: AppManifest;
  /** Workspace whose FS is read for content (origin when serving a default install). */
  workspaceId: string;
  /** Pinned release when serving an install or channel pin. */
  release?: AppRelease;
  /** True when content comes from a materialized local fork. */
  localFork?: boolean;
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

async function resolveLiveApp(c: HonoCtx): Promise<LiveApp> {
  const appIdParam = c.req.param("appId");
  if (appIdParam) {
    const loc = await resolveAppLocation(appIdParam);
    const manifest = await readApp(loc.workspaceId, appIdParam).catch(() => undefined);
    if (!manifest?.entry) throw new ServiceError("Not found", 404);
    return { manifest, workspaceId: loc.workspaceId };
  }
  const workspaceId = c.req.param("workspaceId");
  const name = c.req.param("name");
  if (!workspaceId || !name) throw new ServiceError("Not found", 404);

  // Install-id address: serve from origin release (editing off) or local fork.
  if (isAppId(name)) {
    const install = await readInstall(workspaceId, name);
    if (install) {
      const release = await cachedOriginRelease(
        install.originWorkspaceId,
        install.originAppId,
        install.resolvedRelease,
      );
      const originManifest =
        release?.manifest ??
        (await readApp(install.originWorkspaceId, install.originAppId).catch(() => undefined));
      if (!originManifest?.entry) throw new ServiceError("Not found", 404);

      if (install.editing && install.prefix) {
        const forked: AppManifest = {
          ...originManifest,
          entry: remapEntry(originManifest.entry, originManifest.paths, install.prefix),
          paths: [install.prefix],
          originAppId: install.originAppId,
        };
        return {
          manifest: forked,
          workspaceId,
          release,
          localFork: true,
        };
      }
      return {
        manifest: originManifest,
        workspaceId: install.originWorkspaceId,
        release: release ?? undefined,
      };
    }
  }

  const appId = await resolveAppRef(workspaceId, name);
  const manifest = await readApp(workspaceId, appId).catch(() => undefined);
  if (!manifest?.entry) throw new ServiceError("Not found", 404);
  return { manifest, workspaceId };
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

// ---------------------------------------------------------------------------
// GET /:workspaceId/:name — the app page
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
liveAppsRouter.get("/id/:appId", handleLivePage);
liveAppsRouter.get("/:workspaceId/:name", handleLivePage);

// ---------------------------------------------------------------------------
// GET /:workspaceId/:name/__project__ — the source project (visibility-gated)
// ---------------------------------------------------------------------------

async function handleLiveProject(c: any) {
  try {
    const app = await resolveLiveApp(c);
    await requireViewer(c, app.manifest);
    const release = await resolvePin(c, app);

    // Every declared prefix ships, keyed by workspace path — so an app that
    // publishes `apps/liift4` plus `lib/charts` compiles as one project and
    // relative imports keep resolving.
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
liveAppsRouter.get("/id/:appId/__project__", handleLiveProject);
liveAppsRouter.get("/:workspaceId/:name/__project__", handleLiveProject);

// ---------------------------------------------------------------------------
// GET /:workspaceId/:name/__sdk__.js|.d.ts — generated bindings
// ---------------------------------------------------------------------------
//
// The manifest is the world; these are the bindings. Both are visibility-gated
// like `__project__` and pinned to the requested channel, so an editor and the
// running page always see the same surface.

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
liveAppsRouter.get("/id/:appId/__sdk__.js", handleLiveSdkJs);
liveAppsRouter.get("/:workspaceId/:name/__sdk__.js", handleLiveSdkJs);

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
liveAppsRouter.get("/id/:appId/__sdk__.d.ts", handleLiveSdkDts);
liveAppsRouter.get("/:workspaceId/:name/__sdk__.d.ts", handleLiveSdkDts);

// ---------------------------------------------------------------------------
// GET /:workspaceId/:name/* — static files, SPA fallback to the page
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
    // Client-side routes fall back to the app page.
    return c.newResponse(buildAppShell(app, channelName(c.req.query("channel"))), 200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
  } catch (err) {
    return errorResponse(c, err);
  }
}
liveAppsRouter.get("/id/:appId/*", handleLiveStatic);
liveAppsRouter.get("/:workspaceId/:name/*", handleLiveStatic);

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function buildAppShell(app: LiveApp, channel = DEFAULT_CHANNEL): string {
  const { manifest, workspaceId } = app;
  const title = manifest.title ?? manifest.name;
  // The app's injected namespaces are the allow-list's namespaces plus the
  // app's own workflow namespace — the app can only reference what the app
  // surface will actually serve.
  const services = [
    ...new Set([
      ...manifest.allowedTools.map((tool) => tool.split(".")[0]!),
      ...((manifest.workflows ?? []).length > 0 ? ["app"] : []),
    ]),
  ];
  const config = {
    app: manifest.name,
    appId: manifest.appId,
    workspaceId,
    title,
    appBase: `/api/gateway/apps/${workspaceId}/${manifest.name}`,
    liveBase: `/apps/${workspaceId}/${manifest.name}`,
    permalinkBase: `/apps/id/${manifest.appId}`,
    // The channel the shell asks for; content endpoints resolve the pin (and
    // gate non-default channels on the admin role).
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
