/**
 * `apps` core service — publish and manage app bundles from the owning
 * workspace. Like every core service it rides tool discovery, so chat can
 * publish an app ("publish my workout tracker for others") the same way it
 * registers workflows. The public consumption surface lives in routes/apps.ts;
 * the live page surface in routes/live-apps.ts.
 *
 * The domain in one paragraph: an **app** is a bundle (pages + exported
 * workflows + an allow-list + a data scope + roles); a **workflow** is one
 * published capability, callable through the app as `app.<workflow>`; a
 * **release** is an immutable pin of the content hashes the live page serves,
 * and a **channel** is a named pointer at one. This service is where all four
 * are edited:
 *
 *   publish/remove/share      — the bundle and its path binding
 *   capabilities              — what the app may touch and where its data lands
 *   release/releases/channels/promote/rollback — the deployable version pin
 *   install/update/configure/uninstall/installed/directory — install lifecycle
 *   rename                       — mutable alias move (storage keys unchanged)
 *   sdk                       — generated bindings (js + d.ts) for the manifest
 *   versions/version/restore  — the entrypoint's FS content history
 *
 * `apps.list` composes everything a directory UI needs (workflows, triggers,
 * last run, channels) into a single call — a directory should never need N+1
 * round-trips to render.
 */

import { getAuditStore } from "../audit.js";
import { getCredentialStore } from "../credentials.js";
import { getFsStore } from "../fs-store.js";
import { getRecordStore } from "../records.js";
import { ServiceError, type CoreService } from "../service-kernel.js";
import { hookPath } from "../workflows/service.js";
import { listRegistrations, listRuns, type WorkflowRegistration } from "../workflows/store.js";
import {
  grantProfileToInstall,
  installGrantHolds,
  profileGrantsAvailable,
  resolveInterfaceProfileId,
  revokeAllInstallGrants,
  revokeInstallProfileGrant,
} from "../profile-grants.js";
import { getRegistryStorage } from "../registry-storage.js";
import {
  APP_WORKFLOW_NAMESPACE,
  assertAllowedTools,
  camelCase,
  dependencyCapabilities,
  effectiveRateLimit,
  nativeCapabilities,
  parseRequires,
  providerGrantCapabilities,
  type ProviderGrant,
  type ProviderGrantCapability,
} from "./capabilities.js";
import { assertNotDeploymentTenant, listDirectoryForWorkspace } from "./directory.js";
import {
  applyUpdate,
  bindingMissingError,
  findInstallByOrigin,
  installAsCopy,
  installPrefix,
  isChannelPin,
  listInstalls,
  materializeFork,
  parseInstallPin,
  purgeInstallData,
  readInstall,
  removeInstall,
  requireInstall,
  resolveBindings,
  resolvePinRelease,
  saveInstall,
  updateCheck,
  type AppInstallation,
} from "./install.js";
import {
  dropAlias,
  mintAppId,
  readAlias,
  resolveAppLocation,
  resolveAppRef,
  setAlias,
} from "./identity.js";
import { promoteApp } from "./personal.js";
import {
  DEFAULT_CHANNEL,
  channelName,
  listReleases,
  previousRelease,
  readRelease,
  saveRelease,
  setChannel,
  snapshotRelease,
  type AppRelease,
} from "./releases.js";
import { generateAppSdk } from "./sdk.js";
import { loadAppYaml } from "./manifest.js";
import { assertRootAvailable } from "./roots.js";
import {
  canonicalLiveUrl,
  publicAppApiBase,
} from "./url-bases.js";
import {
  ENTRY_CANDIDATES,
  appDataDir,
  appName,
  hydrateAppRecord,
  listApps,
  listEntryVersions,
  pathDir,
  readApp,
  readEntryVersion,
  readWorkspaceConfig,
  removeApp,
  resolveAppEntry,
  restoreEntryVersion,
  saveApp,
  workspacePath,
  writeWorkspaceConfig,
  type AppManifest,
  type AppRateLimit,
  type AppRoles,
  type WorkspaceShare,
} from "./store.js";

function livePath(appId: string): string {
  return canonicalLiveUrl(appId);
}

/**
 * Name the profile that executes each tier-2 provider grant (specs
 * group-profile-grants "Access pane names the executing profile"): bare app
 * dispatch resolves the provider's stored `default` profile when one exists,
 * so that is the name reported. Absent (client falls back to the bare
 * credential string) when execution rides the zero-config fallback or the
 * backend has no profile storage (interim dynamo).
 */
async function withExecutingProfiles(
  workspaceId: string,
  grants: ProviderGrantCapability[],
): Promise<ProviderGrantCapability[]> {
  if (grants.length === 0 || !profileGrantsAvailable()) return grants;
  try {
    const storage = await getRegistryStorage();
    await storage.tenants.ensure(workspaceId);
    return await Promise.all(
      grants.map(async (grant) => {
        const row = await storage.profiles.getByName(
          workspaceId,
          "provider",
          grant.provider,
          "default",
        );
        return row ? { ...grant, profile: row.name } : grant;
      }),
    );
  } catch {
    return grants; // Degraded gateways keep the credential-only shape.
  }
}

function apiBase(appId: string): string {
  return publicAppApiBase(appId);
}

function parseAllowedTools(
  raw: unknown,
  context: { app: string; workflows: string[]; requires?: AppManifest["requires"] },
): { tools: string[]; grants: ProviderGrant[] } {
  if (!Array.isArray(raw)) {
    throw new ServiceError(
      "allowed_tools must be an array of 'namespace.procedure' (or 'namespace.*') entries",
      400,
    );
  }
  const tools = raw.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
  if (tools.length === 0) {
    throw new ServiceError("allowed_tools must contain at least one entry", 400);
  }
  const grants = assertAllowedTools(tools, context);
  return { tools, grants };
}

/**
 * A provider entry in `allowedTools` is a credential grant, so it is only
 * publishable when the workspace actually holds a credential for that
 * provider — an app promising `github.repos.get` with nothing to execute it
 * would 502 every caller.
 */
async function assertGrantCredentials(
  workspaceId: string,
  grants: ProviderGrant[],
): Promise<void> {
  if (grants.length === 0) return;
  const credentials = await getCredentialStore().list(workspaceId);
  const held = new Set(credentials.map((credential) => credential.provider));
  for (const provider of new Set(grants.map((grant) => grant.provider))) {
    if (held.has(provider)) continue;
    throw new ServiceError(
      `allowed_tools grants ${provider} procedures, but this workspace holds no ${provider} credential — ` +
        `connect one first, or reach ${provider} through an exported workflow.`,
      400,
    );
  }
}

function parseRoles(raw: unknown): AppRoles | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("roles must be an object", 400);
  }
  const value = raw as Record<string, unknown>;
  const roles: AppRoles = {};
  if (Array.isArray(value["admins"])) {
    roles.admins = value["admins"].filter((s): s is string => typeof s === "string");
  }
  if (value["access"] === "listed" || value["access"] === "any") {
    roles.access = value["access"];
  }
  if (Array.isArray(value["users"])) {
    roles.users = value["users"].filter((s): s is string => typeof s === "string");
  }
  return roles;
}

function parseRateLimit(raw: unknown): AppRateLimit | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("rate_limit must be an object", 400);
  }
  const value = raw as Record<string, unknown>;
  const limit: AppRateLimit = {};
  if (typeof value["rps"] === "number" && value["rps"] > 0) limit.rps = value["rps"];
  if (typeof value["burst"] === "number" && value["burst"] > 0) limit.burst = value["burst"];
  if (typeof value["daily"] === "number" && value["daily"] > 0) limit.daily = value["daily"];
  return limit;
}

function parseVisibility(raw: unknown): "public" | "private" | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (raw !== "public" && raw !== "private") {
    throw new ServiceError('visibility must be "public" or "private"', 400);
  }
  return raw;
}


// ---------------------------------------------------------------------------
// Composition — what a directory UI renders
// ---------------------------------------------------------------------------

interface AppWorkflowSummary {
  name: string;
  /** Camel-case alias: how the SDK spells it (`app.weeklySummary`). */
  procedure: string;
  scriptPath: string;
  description?: string;
  triggers: WorkflowRegistration["triggers"];
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  webhookPath?: string;
  /** Whether the registration still exists in the owner workspace. */
  registered: boolean;
  lastRun?: { id: string; status: string; startedAt: string; durationMs?: number };
}

async function summarizeWorkflows(
  workspaceId: string,
  manifest: AppManifest,
  registrations: Map<string, WorkflowRegistration>,
  withRuns: boolean,
): Promise<AppWorkflowSummary[]> {
  return Promise.all(
    (manifest.workflows ?? []).map(async (name) => {
      const registration = registrations.get(name);
      const runs = withRuns && registration ? await listRuns(workspaceId, name, 1) : [];
      const last = runs[0];
      return {
        name,
        procedure: camelCase(name),
        scriptPath: registration?.scriptPath ?? "",
        description: registration?.description,
        triggers: registration?.triggers ?? { manual: true },
        input: registration?.input,
        output: registration?.output,
        webhookPath: registration?.triggers.webhook ? hookPath(workspaceId, name) : undefined,
        registered: Boolean(registration),
        lastRun: last
          ? {
              id: last.id,
              status: last.status,
              startedAt: last.startedAt,
              durationMs: last.durationMs,
            }
          : undefined,
      };
    }),
  );
}

async function describeApp(
  workspaceId: string,
  manifest: AppManifest,
  registrations: Map<string, WorkflowRegistration>,
  options: { withRuns?: boolean } = {},
) {
  return {
    appId: manifest.appId,
    name: manifest.name,
    originAppId: manifest.originAppId,
    title: manifest.title,
    description: manifest.description,
    visibility: manifest.visibility ?? "private",
    /** Single app-root workspace path (authoritative binding). */
    root: manifest.root ?? manifest.paths[0],
    /** UI entrypoint under the root (derived). */
    entry: manifest.entry,
    /** Derived `[root]` projection — never a multi-prefix binding. */
    paths: manifest.paths,
    /** Last reconcile outcome for authors (`app.yaml` validation). */
    reconcile: manifest.reconcile,
    /** Live page URL (`/a/<appId>`). */
    url: livePath(manifest.appId),
    /** Durable id permalink that survives renames (same as live for public apps). */
    permalink: livePath(manifest.appId),
    /** API surface base (tools + workflow runs), appId-keyed. */
    apiBase: apiBase(manifest.appId),
    /** Channel → release id. `apps.channels` resolves them to release records. */
    channels: manifest.channels ?? {},
    requires: manifest.requires ?? [],
    allowedTools: manifest.allowedTools,
    roles: manifest.roles,
    rateLimit: effectiveRateLimit(manifest),
    createdBy: manifest.createdBy,
    createdAt: manifest.createdAt,
    updatedAt: manifest.updatedAt,
    workflows: await summarizeWorkflows(
      workspaceId,
      manifest,
      registrations,
      options.withRuns ?? true,
    ),
  };
}

async function registrationIndex(workspaceId: string): Promise<Map<string, WorkflowRegistration>> {
  const registrations = await listRegistrations(workspaceId).catch(() => []);
  return new Map(registrations.map((registration) => [registration.name, registration]));
}

async function summarizeInstall(
  workspaceId: string,
  install: AppInstallation,
  origin: AppManifest | undefined,
  userId: string,
) {
  return {
    installId: install.installId,
    originAppId: install.originAppId,
    originWorkspaceId: install.originWorkspaceId,
    pin: install.pin,
    resolvedRelease: install.resolvedRelease,
    bindings: install.bindings,
    config: install.config,
    editing: install.editing,
    prefix: install.prefix,
    root: install.root ?? install.prefix,
    hosting: install.hosting ?? "managed",
    hostingWorkspaceId: install.hostingWorkspaceId,
    contentFingerprint: install.contentFingerprint,
    installedBy: install.installedBy,
    installedAt: install.installedAt,
    updatedAt: install.updatedAt,
    name: origin?.name ?? install.manifest?.name,
    title: origin?.title ?? install.manifest?.title,
    description: origin?.description ?? install.manifest?.description,
    url: origin ? livePath(origin.appId) : undefined,
    permalink: livePath(install.originAppId),
    dataPrefix: appDataDir(install.installId, userId),
    available: Boolean(origin),
    requires: origin?.requires ?? install.manifest?.requires ?? [],
  };
}

/**
 * Install-as-copy (iw9-b D8). Resolves origin from `app` / `directoryRef`,
 * copies the archive into `apps/<slug>`, and returns the install record.
 */
async function completeInstall(
  ctx: { workspaceId: string; userId: string },
  input: {
    originWorkspaceId: string;
    manifest: AppManifest;
    args: Record<string, unknown>;
  },
) {
  const { originWorkspaceId, manifest, args } = input;
  const isOwn = originWorkspaceId === ctx.workspaceId;
  const visibility = manifest.visibility ?? "private";
  if (!isOwn && visibility !== "public") {
    // No existence oracle for private apps elsewhere.
    throw new ServiceError("Not found", 404);
  }

  const explicitBindings =
    args["bindings"] && typeof args["bindings"] === "object" && !Array.isArray(args["bindings"])
      ? (args["bindings"] as Record<string, string>)
      : undefined;
  const resolved = await resolveBindings(
    manifest.requires,
    explicitBindings,
    (contract, name) => resolveInterfaceProfileId(ctx.workspaceId, contract, name),
  );
  // When grants are unavailable, allow install-side bindings only if the
  // caller passed explicit profile ids (or there are no requirements).
  if (resolved.missing.length > 0) {
    if (!profileGrantsAvailable() && explicitBindings) {
      for (const contract of resolved.missing) {
        const id = explicitBindings[contract];
        if (id) resolved.bindings[contract] = id;
      }
      resolved.missing = resolved.missing.filter((c) => !resolved.bindings[c]);
    }
    if (resolved.missing.length > 0) throw bindingMissingError(resolved.missing);
  }

  const config =
    args["config"] && typeof args["config"] === "object" && !Array.isArray(args["config"])
      ? (args["config"] as Record<string, unknown>)
      : {};
  const slug = typeof args["slug"] === "string" && args["slug"] ? args["slug"] : undefined;
  // `mode` is the user-facing hosting pick (managed | hosted); accept `hosting` too.
  const mode =
    typeof args["mode"] === "string"
      ? args["mode"]
      : typeof args["hosting"] === "string"
        ? args["hosting"]
        : undefined;
  const pin = args["pin"] !== undefined ? parseInstallPin(args["pin"]) : undefined;

  const install = await installAsCopy({
    originWorkspaceId,
    manifest,
    installerWorkspaceId: ctx.workspaceId,
    installedBy: ctx.userId,
    ...(slug !== undefined ? { slug } : {}),
    ...(mode !== undefined ? { hosting: mode } : {}),
    bindings: resolved.bindings,
    config,
    ...(pin !== undefined ? { pin } : {}),
  });

  for (const profileId of Object.values(install.bindings)) {
    await grantProfileToInstall(ctx.workspaceId, profileId, install.installId, ctx.userId);
  }
  return summarizeInstall(ctx.workspaceId, install, manifest, ctx.userId);
}

/** Resolve `app` or `name` (alias or ULID) to a stored manifest. */
async function requireApp(workspaceId: string, args: Record<string, unknown>): Promise<AppManifest> {
  const ref = args["app"] ?? args["name"];
  if (typeof ref !== "string" || !ref) {
    throw new ServiceError("app (alias or id) is required", 400);
  }
  const appId = await resolveAppRef(workspaceId, ref);
  const manifest = await readApp(workspaceId, appId);
  if (!manifest) throw new ServiceError(`Unknown app: ${ref}`, 404);
  return manifest;
}

function summarizeRelease(release: AppRelease) {
  return {
    id: release.id,
    channel: release.channel,
    notes: release.notes,
    manifestHash: release.manifestHash,
    entry: release.entry,
    entryHash: release.entryHash,
    workflows: release.workflows,
    createdBy: release.createdBy,
    createdAt: release.createdAt,
  };
}

/**
 * Resolve the single app root for a publish. `entry`/`dir` name a file or
 * folder under the root; with neither, an update keeps its root and a fresh
 * publish claims `apps/<name>`. Extra `paths[]` prefixes are rejected — use
 * mounts instead (see {@link rejectExtraPaths}).
 *
 * Identity/derived-state writes go through {@link saveApp} after loading
 * `app.yaml`. When F4's `reconcileApp` lands, this call site swaps to it
 * (same root + yaml + actor inputs) — it is not stubbed here.
 */
async function resolvePublishRoot(
  workspaceId: string,
  name: string,
  args: Record<string, unknown>,
  existing: AppManifest | undefined,
): Promise<{ root: string; entry: string }> {
  const target = args["entry"] ?? args["dir"];
  if (target !== undefined) {
    const path = workspacePath(target, "entry");
    const store = getFsStore();
    const asFile = await store.read(workspaceId, path).catch(() => undefined);
    if (asFile) {
      const root = pathDir(path);
      return { root, entry: path };
    }
    // Folder (or not-yet-authored file path): root is the folder; entry may
    // resolve via ENTRY_CANDIDATES or fall back to the conventional default.
    try {
      const entry = await resolveAppEntry(workspaceId, path);
      return { root: pathDir(entry), entry };
    } catch (err) {
      // Fresh register before UI exists — claim the folder as root.
      if (!(err instanceof ServiceError)) throw err;
      const base = path.includes("/") ? path.slice(path.lastIndexOf("/") + 1) : path;
      const looksLikeFile = base.includes(".");
      const root = looksLikeFile ? pathDir(path) : path;
      return { root, entry: `${root}/${ENTRY_CANDIDATES[0]}` };
    }
  }
  const root = existing?.root ?? existing?.paths?.[0] ?? `apps/${name}`;
  const entry = existing?.entry ?? `${root}/${ENTRY_CANDIDATES[0]}`;
  return { root, entry };
}

/** 400 when publish/update still supplies path prefixes beyond the app root. */
function rejectExtraPaths(root: string, args: Record<string, unknown>): void {
  if (args["paths"] === undefined) return;
  const declared = args["paths"];
  if (!Array.isArray(declared)) {
    throw new ServiceError("paths must be an array of workspace prefixes", 400);
  }
  const extras = declared
    .map((path) => workspacePath(path, "paths[]"))
    .filter((path) => path !== root);
  if (extras.length > 0) {
    throw new ServiceError(
      "Extra path prefixes are no longer accepted on publish; share content between apps via mounts under the app root",
      400,
    );
  }
}

/**
 * Load `app.yaml` at the root and project authored fields onto the record.
 * Invalid yaml keeps last-good derived state and surfaces issues on
 * `reconcile` — never thrown at app users (app-roots scenario).
 *
 * When F4 `reconcileApp` lands, replace this + the subsequent `saveApp` with
 * that single entry point; do not reimplement mint/alias/root-index here.
 */
async function loadRootYaml(
  workspaceId: string,
  root: string,
  existing: AppManifest | undefined,
): Promise<{
  declared?: AppManifest["declared"];
  title?: string;
  description?: string;
  reconcile: NonNullable<AppManifest["reconcile"]>;
}> {
  const file = await getFsStore()
    .read(workspaceId, `${root}/app.yaml`)
    .catch(() => undefined);
  const content = file?.content ?? "{}";
  const loaded = loadAppYaml(content);
  if (!loaded.ok) {
    return {
      declared: existing?.declared,
      title: existing?.title,
      description: existing?.description,
      reconcile: { status: "error", issues: loaded.issues },
    };
  }
  return {
    declared: loaded.value,
    title: loaded.value.title ?? existing?.title,
    description: loaded.value.description ?? existing?.description,
    reconcile: { status: "ok" },
  };
}

export const appsService: CoreService = {
  meta: {
    label: "Apps",
    blurb: "Publish and manage workspace apps",
    icon: "layout-grid",
  },
  tools: [
    {
      name: "apps.publish",
      operation: "publish",
      description:
        "Publish (or update) an app bound to a single workspace root (apps/<name>). Pass 'entry' or 'dir' to name the UI under that root; the root is derived (never a multi-prefix paths[] list — extras are rejected; use mounts to share content). 'workflows' is the app's export list: each becomes callable as app.<workflow>. 'allowed_tools' may only name the auto-partitioned native namespaces (vfs, keyvalue, events) or the app's own workflows — a provider (github, linear, …) must be reached through an exported workflow. The live app serves at /apps/<workspace>/<name>; identity is a ULID with a mutable name alias.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "App id (kebab-case)" },
          title: { type: "string" },
          description: { type: "string" },
          entry: {
            type: "string",
            description:
              "Workspace path of the UI entrypoint (e.g. apps/liift4/widget.tsx). A folder resolves to index.tsx, index.ts, widget.tsx, or its only *.tsx. The entry's folder becomes the app root.",
          },
          paths: {
            type: "array",
            items: { type: "string" },
            description:
              "Rejected when it names prefixes beyond the app root — use mounts to share content between apps",
          },
          dir: { type: "string", description: "Sugar for entry: a folder whose entrypoint is resolved for you (the folder is the app root)" },
          visibility: { type: "string", enum: ["public", "private"], description: "Who can open the live page (default private)" },
          requires: {
            type: "array",
            description: "Interface-contract requirements: [{contract, profileName?, optional?}]",
          },
          workflows: {
            type: "array",
            items: { type: "string" },
            description:
              "The app's export list: registered workflow names published under the app namespace (callable as app.<workflow>)",
          },
          allowed_tools: {
            type: "array",
            items: { type: "string" },
            // Literal, not interpolated from the capability module: this
            // object is built at module init, and services ⇄ apps is a
            // module cycle — reading an imported const here would be a TDZ
            // crash depending on which file is imported first.
            description:
              "Tools app users may call: vfs.*, keyvalue.*, events.* (auto-partitioned natives), or app.<workflow> for this app's exported workflows — everything else is denied",
          },
          roles: {
            type: "object",
            description: "{ admins: [subs], access: 'any'|'listed', users: [subs] }",
          },
          rate_limit: {
            type: "object",
            description:
              "{ rps, burst, daily } per user — daily is a durable calls-per-UTC-day budget (default 1000)",
          },
        },
        required: ["name", "allowed_tools"],
      },
    },
    {
      name: "apps.list",
      operation: "list",
      description:
        "List the workspace's published apps with everything a directory needs in one call: appId, path binding, visibility, channels, allow-list, roles, limits, and each exported workflow with its triggers, schemas, webhook path, and last run.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "apps.summary",
      operation: "summary",
      description:
        "Lightweight app list (appId, name, title, visibility, workflow count, updatedAt) — for pickers and menus that don't render workflow detail.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "apps.get",
      operation: "get",
      description: "Get one app: the same composition as apps.list plus its capability report.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "App alias or ULID" },
          name: { type: "string", description: "Alias (same as app)" },
        },
      },
    },
    {
      name: "apps.rename",
      operation: "rename",
      description:
        "Rename an app's mutable alias. Storage keys (manifest, releases, partitions) are unchanged; the old alias 404s and the new one resolves. 409 when the new name is held by another app.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "Current alias or ULID" },
          name: { type: "string", description: "New alias (kebab-case)" },
        },
        required: ["app", "name"],
      },
    },
    {
      name: "apps.capabilities",
      operation: "capabilities",
      description:
        "What this app can touch and where its data lives: the allow-listed native namespaces (procedures, partitioning, rate limits) and the workflows it exports (with their declared input/output schemas). Render this instead of hardcoding namespace lists.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "App alias or ULID" },
          name: { type: "string" },
        },
      },
    },
    {
      name: "apps.dataUsers",
      operation: "dataUsers",
      description:
        "List users with data partitions for an app. Admin-only; audited.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "App alias or ULID" },
          name: { type: "string" },
        },
      },
    },
    {
      name: "apps.dataKeys",
      operation: "dataKeys",
      description:
        "List record keys in one app user's partition. Admin-only; audited.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          user: { type: "string", description: "App-user sub" },
        },
        required: ["user"],
      },
    },
    {
      name: "apps.dataGet",
      operation: "dataGet",
      description: "Read one record from an app user's partition. Admin-only; audited.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          user: { type: "string" },
          key: { type: "string" },
        },
        required: ["user", "key"],
      },
    },
    {
      name: "apps.dataRead",
      operation: "dataRead",
      description:
        "Read one file from an app user's file partition under .apps/<appId>/data/<user>. Admin-only; audited.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          user: { type: "string" },
          path: { type: "string" },
        },
        required: ["user", "path"],
      },
    },
    {
      name: "apps.sdk",
      operation: "sdk",
      description:
        "Generate the app's SDK: { js, dts } — a runtime shim over the app tool proxy plus TypeScript types built from the native namespaces and each exported workflow's declared schemas. Served live at /apps/<workspace>/<name>/__sdk__.js and __sdk__.d.ts.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          channel: { type: "string" },
        },
      },
    },
    {
      name: "apps.release",
      operation: "release",
      description:
        "Cut a release: snapshot the manifest hash, the entrypoint's content hash, and each exported workflow's script hash, then point a channel (default 'live') at it. Releases are free to create and instant to roll back because they pin content the FS already versions.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          channel: { type: "string", description: "Channel to point at the new release (default 'live')" },
          notes: { type: "string" },
        },
      },
    },
    {
      name: "apps.releases",
      operation: "releases",
      description: "List an app's releases, newest first.",
      inputSchema: {
        type: "object",
        properties: { app: { type: "string" }, name: { type: "string" } },
      },
    },
    {
      name: "apps.channels",
      operation: "channels",
      description:
        "What each channel currently serves: the release it points at, when it was cut, and its notes. The live page serves 'live'; '?channel=preview' serves 'preview' to the app's admins.",
      inputSchema: {
        type: "object",
        properties: { app: { type: "string" }, name: { type: "string" } },
      },
    },
    {
      name: "apps.promote",
      operation: "promote",
      description:
        "Promote a Personal (or any) VFS subtree into a standalone app: {source, slug} → {appId, root}. " +
        "Also supports channel promote {app, from, to} (e.g. preview → live).",
      inputSchema: {
        type: "object",
        properties: {
          source: { type: "string", description: "VFS subtree to promote (e.g. apps/personal/budget)" },
          slug: { type: "string", description: "Vanity slug for the new app root (apps/<slug>)" },
          app: { type: "string", description: "App alias or ULID (channel promote)" },
          name: { type: "string" },
          from: { type: "string", description: "Source channel (channel promote)" },
          to: { type: "string", description: "Target channel (channel promote)" },
        },
      },
    },
    {
      name: "apps.rollback",
      operation: "rollback",
      description: "Move a channel back to the release before the one it serves.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          channel: { type: "string" },
        },
      },
    },
    {
      name: "apps.install",
      operation: "install",
      description:
        "Install a public app (or any app of this workspace) into THIS workspace as a local copy under apps/<slug>: " +
        "pins {tag?, commit}, records hosting mode, and binds required interface profiles.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "App alias or ULID" },
          directoryRef: {
            type: "string",
            description: "Directory entry appId (alias for app when installing from apps.directory)",
          },
          workspace: {
            type: "string",
            description: "Origin workspace id (defaults to this workspace; required for cross-workspace installs by alias)",
          },
          mode: {
            type: "string",
            enum: ["managed", "hosted"],
            description: "Hosting pick when the app declares multiple buckets",
          },
          hosting: {
            type: "string",
            enum: ["managed", "hosted"],
            description: "Alias for mode",
          },
          slug: { type: "string", description: "Target slug under apps/<slug> (defaults to origin slug)" },
          pin: { description: "Channel name, {channel}, {release}, or {tag?, commit}" },
          bindings: {
            type: "object",
            description: "contract → profile id or name overrides",
          },
          config: { type: "object", description: "Per-install config JSON" },
        },
      },
    },
    {
      name: "apps.updateCheck",
      operation: "updateCheck",
      description:
        "Compare an installation's pin against the origin's current release/commit. Returns {current, available?, originAvailable, message?}.",
      inputSchema: {
        type: "object",
        properties: {
          install: { type: "string", description: "Install ULID" },
          installId: { type: "string", description: "Alias for install" },
        },
      },
      outputSchema: {
        type: "object",
        properties: {
          current: { type: "object" },
          available: { type: "object" },
          originAvailable: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["current", "originAvailable"],
      },
    },
    {
      name: "apps.applyUpdate",
      operation: "applyUpdate",
      description:
        "Re-copy the origin archive onto an installation's local root. Pass confirmOverwrite=true when the local copy has edits.",
      inputSchema: {
        type: "object",
        properties: {
          install: { type: "string", description: "Install ULID" },
          installId: { type: "string", description: "Alias for install" },
          confirmOverwrite: {
            type: "boolean",
            description: "Required when the local copy has edits since the last fingerprint",
          },
        },
      },
      outputSchema: {
        type: "object",
        properties: {
          installId: { type: "string" },
          from: { type: "object" },
          to: { type: "object" },
        },
        required: ["installId"],
      },
    },
    {
      name: "apps.update",
      operation: "update",
      description:
        "Re-resolve an installation's pin against the origin (channel → current release, or an explicit newer release). Returns {from, to}. Editing forks require force=true to overwrite local source. Prefer apps.applyUpdate for copy-model installs.",
      inputSchema: {
        type: "object",
        properties: {
          install: { type: "string", description: "Install ULID" },
          release: { type: "string", description: "Explicit release id (release-pinned installs)" },
          force: { type: "boolean", description: "Overwrite local fork source when editing" },
        },
        required: ["install"],
      },
    },
    {
      name: "apps.configure",
      operation: "configure",
      description:
        "Update an installation's bindings, config, and/or editing flag. Enabling editing materializes the pinned release under the install prefix.",
      inputSchema: {
        type: "object",
        properties: {
          install: { type: "string" },
          bindings: { type: "object" },
          config: { type: "object" },
          editing: { type: "boolean" },
          prefix: { type: "string" },
        },
        required: ["install"],
      },
    },
    {
      name: "apps.uninstall",
      operation: "uninstall",
      description:
        "Remove an install record. Pass purgeData=true to delete `.apps/<installId>` data partitions.",
      inputSchema: {
        type: "object",
        properties: {
          install: { type: "string" },
          purgeData: { type: "boolean" },
          purge_data: { type: "boolean" },
        },
        required: ["install"],
      },
    },
    {
      name: "apps.installed",
      operation: "installed",
      description: "Installations in this workspace, with an available flag when the origin is reachable.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "apps.directory",
      operation: "directory",
      description:
        "Deployment-wide directory of public apps plus this workspace's own apps. Registry is never consulted.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "apps.shares",
      operation: "shares",
      description:
        "List the workspace paths shared with apps (apps always have automatic access to their own declared prefixes; shares expose paths outside them).",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "apps.share",
      operation: "share",
      description:
        "Share a workspace path prefix with apps: { prefix, apps: [names] or '*', mode: 'read'|'readwrite' }. App sessions reach shared paths via '~/<path>'.",
      inputSchema: {
        type: "object",
        properties: {
          prefix: { type: "string", description: "Workspace path prefix (e.g. shared/recipes)" },
          apps: { description: "App names, or '*' for every published app" },
          mode: { type: "string", enum: ["read", "readwrite"] },
        },
        required: ["prefix"],
      },
    },
    {
      name: "apps.unshare",
      operation: "unshare",
      description: "Remove a workspace path share by prefix.",
      inputSchema: {
        type: "object",
        properties: { prefix: { type: "string" } },
        required: ["prefix"],
      },
    },
    {
      name: "apps.remove",
      operation: "remove",
      description:
        "Unpublish an app. By default authored files stay; pass purge_data=true to delete `.apps/<appId>` data partitions.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          purge_data: { type: "boolean", description: "Also delete .apps/<appId> per-user data" },
        },
      },
    },
    {
      name: "apps.versions",
      operation: "versions",
      description:
        "List the content versions of an app's UI entrypoint (its entry), newest first. The newest version is the live one (current: true).",
      inputSchema: {
        type: "object",
        properties: { app: { type: "string" }, name: { type: "string" } },
      },
    },
    {
      name: "apps.version",
      operation: "version",
      description: "Read one past version of an app's UI entrypoint by content hash.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          hash: { type: "string" },
        },
        required: ["hash"],
      },
    },
    {
      name: "apps.restore",
      operation: "restore",
      description:
        "Restore a past version of an app's UI entrypoint: re-writes that version's content as the new latest. Non-destructive — history is preserved and the old content becomes live again. Returns the updated app.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          hash: { type: "string" },
        },
        required: ["hash"],
      },
    },
  ],

  async call(ctx, procedure, args) {
    // Published apps are workspace-owned; app sessions cannot manage them.
    if (ctx.appScope) {
      throw new ServiceError("apps management is not available to app sessions", 403);
    }
    switch (procedure) {
      case "publish": {
        const name = appName(args["name"]);
        // Match an existing app by explicit id, else by current alias.
        const ref = typeof args["app"] === "string" ? args["app"] : name;
        let existing: AppManifest | undefined;
        try {
          const appId = await resolveAppRef(ctx.workspaceId, ref);
          existing = await readApp(ctx.workspaceId, appId);
        } catch {
          // Fresh publish under this alias — but reject if the alias is held.
          const holder = await readAlias(ctx.workspaceId, name);
          if (holder) {
            existing = await readApp(ctx.workspaceId, holder.appId);
          }
        }
        // Publishing under an alias held by a different app is a 409 (via setAlias).
        if (existing && existing.name !== name) {
          // Caller asked to publish as `name` while resolving a different app —
          // treat as update that also moves the alias (prefer apps.rename).
        }
        if (!existing) {
          const collision = await readAlias(ctx.workspaceId, name);
          if (collision) {
            throw new ServiceError(
              `App name "${name}" is already held by app ${collision.appId}`,
              409,
            );
          }
        } else if (existing.name !== name) {
          // Updating by id while supplying a new name — require rename procedure.
          throw new ServiceError(
            `App ${existing.appId} is aliased as "${existing.name}"; use apps.rename to change the alias`,
            400,
          );
        }

        const registrations = await registrationIndex(ctx.workspaceId);
        const workflows = Array.isArray(args["workflows"])
          ? args["workflows"].filter((w): w is string => typeof w === "string")
          : (existing?.workflows ?? []);
        for (const workflow of workflows) {
          if (!registrations.has(workflow)) {
            throw new ServiceError(
              `Unknown workflow: ${workflow} — register it with workflows.register before exporting it from an app`,
              400,
            );
          }
        }
        const { root, entry } = await resolvePublishRoot(
          ctx.workspaceId,
          name,
          args,
          existing,
        );
        rejectExtraPaths(root, args);
        await assertRootAvailable(ctx.workspaceId, root, existing?.appId);
        const yamlProjection = await loadRootYaml(ctx.workspaceId, root, existing);
        const requires =
          args["requires"] !== undefined
            ? parseRequires(args["requires"])
            : existing?.requires;
        const { tools: allowedTools, grants } = parseAllowedTools(args["allowed_tools"], {
          app: name,
          workflows,
          requires,
        });
        await assertGrantCredentials(ctx.workspaceId, grants);
        const now = new Date().toISOString();
        const appId = existing?.appId ?? mintAppId();
        // Prefer explicit publish args for title/description when provided;
        // otherwise take last-good / app.yaml projection (invalid yaml keeps
        // last-good and surfaces issues on reconcile — never throws at users).
        const titleFromArgs = typeof args["title"] === "string" ? args["title"] : undefined;
        const descriptionFromArgs =
          typeof args["description"] === "string" ? args["description"] : undefined;
        const manifest = hydrateAppRecord({
          appId,
          name,
          slug: name,
          originAppId: existing?.originAppId,
          title: titleFromArgs ?? yamlProjection.title ?? existing?.title,
          description:
            descriptionFromArgs ?? yamlProjection.description ?? existing?.description,
          root,
          entry,
          paths: [root],
          declared: yamlProjection.declared ?? existing?.declared,
          reconcile: yamlProjection.reconcile,
          visibility: parseVisibility(args["visibility"]) ?? existing?.visibility ?? "private",
          workflows,
          requires,
          channels: existing?.channels,
          allowedTools,
          roles: parseRoles(args["roles"]) ?? existing?.roles,
          rateLimit: parseRateLimit(args["rate_limit"]) ?? existing?.rateLimit,
          createdBy: existing?.createdBy ?? ctx.userId,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        });
        // F4 reconcileApp (not yet on main) owns mint/alias/root-index writes;
        // until it lands, saveApp is the identity fan-out. Do not stub reconcile.
        await saveApp(ctx.workspaceId, manifest);
        return describeApp(ctx.workspaceId, manifest, registrations, { withRuns: false });
      }
      case "rename": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const newName = appName(args["name"]);
        if (newName === manifest.name) {
          return describeApp(
            ctx.workspaceId,
            manifest,
            await registrationIndex(ctx.workspaceId),
            { withRuns: false },
          );
        }
        await setAlias(ctx.workspaceId, newName, manifest.appId);
        await dropAlias(ctx.workspaceId, manifest.name);
        const updated: AppManifest = {
          ...manifest,
          name: newName,
          updatedAt: new Date().toISOString(),
        };
        // saveApp would setAlias again (idempotent) — write manifest only via saveApp.
        await saveApp(ctx.workspaceId, updated);
        return describeApp(
          ctx.workspaceId,
          updated,
          await registrationIndex(ctx.workspaceId),
          { withRuns: false },
        );
      }
      case "list": {
        const [manifests, registrations] = await Promise.all([
          listApps(ctx.workspaceId),
          registrationIndex(ctx.workspaceId),
        ]);
        const apps = await Promise.all(
          manifests.map((manifest) => describeApp(ctx.workspaceId, manifest, registrations)),
        );
        return { apps };
      }
      case "summary": {
        const manifests = await listApps(ctx.workspaceId);
        return {
          apps: manifests.map((manifest) => ({
            appId: manifest.appId,
            name: manifest.name,
            title: manifest.title,
            description: manifest.description,
            visibility: manifest.visibility ?? "private",
            url: livePath(manifest.appId),
            permalink: livePath(manifest.appId),
            workflowCount: (manifest.workflows ?? []).length,
            channels: manifest.channels ?? {},
            updatedAt: manifest.updatedAt,
          })),
        };
      }
      case "get": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const registrations = await registrationIndex(ctx.workspaceId);
        const described = await describeApp(ctx.workspaceId, manifest, registrations);
        return {
          ...described,
          capabilities: {
            native: nativeCapabilities(manifest),
            providers: await withExecutingProfiles(ctx.workspaceId, providerGrantCapabilities(manifest)),
            workflows: described.workflows,
          },
        };
      }
      case "capabilities": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const registrations = await registrationIndex(ctx.workspaceId);
        const installId = typeof args["install"] === "string" ? args["install"] : undefined;
        const install = installId
          ? await readInstall(ctx.workspaceId, installId)
          : await findInstallByOrigin(ctx.workspaceId, manifest.appId);
        const fulfilled: Record<string, boolean | "ungated"> = {};
        if (install) {
          for (const [contract, profileId] of Object.entries(install.bindings)) {
            fulfilled[contract] = await installGrantHolds(
              ctx.workspaceId,
              install.installId,
              profileId,
            );
          }
        }
        return {
          appId: manifest.appId,
          app: manifest.name,
          /** Auto-partitioned first-party namespaces, allow-list filtered. */
          native: nativeCapabilities(manifest),
          /** Provider credential grants — tier (2), exact procedures only. */
          providers: await withExecutingProfiles(ctx.workspaceId, providerGrantCapabilities(manifest)),
          /** Declared interface-contract requirements and their bindings. */
          dependencies: dependencyCapabilities(manifest, {
            bindings: install?.bindings,
            fulfilled,
          }),
          /** Exported workflows — the app's own namespace (`app.<procedure>`). */
          workflows: (
            await summarizeWorkflows(ctx.workspaceId, manifest, registrations, false)
          ).map((workflow) => ({
            ...workflow,
            namespace: APP_WORKFLOW_NAMESPACE,
            toolPath: `${apiBase(manifest.appId)}/tools/${APP_WORKFLOW_NAMESPACE}/${workflow.procedure}`,
          })),
        };
      }
      case "data":
      case "dataUsers":
      case "dataKeys":
      case "dataGet":
      case "dataRead": {
        const manifest = await requireApp(ctx.workspaceId, args);

        const admins = manifest.roles?.admins ?? [];
        if (!admins.includes(ctx.userId)) {
          throw new ServiceError(
            `Only ${manifest.name}'s admins (roles.admins) can inspect its user data`,
            403,
          );
        }

        const user = typeof args["user"] === "string" ? args["user"] : undefined;
        const key = typeof args["key"] === "string" ? args["key"] : undefined;
        const filePath = typeof args["path"] === "string" ? args["path"] : undefined;
        // Legacy `apps.data` overload still accepted; prefer the split ops.
        const mode =
          procedure === "dataUsers"
            ? "users"
            : procedure === "dataKeys"
              ? "keys"
              : procedure === "dataGet"
                ? "get"
                : procedure === "dataRead"
                  ? "read"
                  : filePath !== undefined
                    ? "read"
                    : key !== undefined
                      ? "get"
                      : user !== undefined
                        ? "keys"
                        : "users";
        if ((mode === "keys" || mode === "get" || mode === "read") && user === undefined) {
          throw new ServiceError("`user` is required", 400);
        }
        if (mode === "get" && key === undefined) {
          throw new ServiceError("`key` is required", 400);
        }
        if (mode === "read" && filePath === undefined) {
          throw new ServiceError("`path` is required", 400);
        }
        if (filePath !== undefined && key !== undefined) {
          throw new ServiceError("`path` and `key` are mutually exclusive", 400);
        }

        const records = getRecordStore();
        const tenant = ctx.workspaceId;
        // Per-app partitions only (`app#<appId>#u#` / `.apps/<appId>/data/<user>`).
        // The private `.users/**` space has no admin procedure.
        const scopePrefix = `app#${manifest.appId}#u#`;

        let result: Record<string, unknown>;
        if (mode === "read" && user !== undefined && filePath !== undefined) {
          const partition = appDataDir(manifest.appId, user);
          const resolved = workspacePath(`${partition}/${filePath}`, "path");
          if (!resolved.startsWith(`${partition}/`)) {
            throw new ServiceError(`path must stay within the user's partition`, 400);
          }
          const file = await getFsStore().read(tenant, resolved);
          result = {
            appId: manifest.appId,
            app: manifest.name,
            user,
            path: filePath,
            content: file?.content ?? null,
            ...(file ? { hash: file.hash, mimeType: file.mimeType, size: file.size } : {}),
          };
        } else if (mode === "get" && user !== undefined && key !== undefined) {
          const entry = await records.get(tenant, `${scopePrefix}${user}`, key);
          result = {
            appId: manifest.appId,
            app: manifest.name,
            user,
            key,
            value: entry?.value ?? null,
            updatedAt: entry?.updatedAt,
            updatedBy: entry?.updatedBy,
          };
        } else if (mode === "keys" && user !== undefined) {
          result = {
            appId: manifest.appId,
            app: manifest.name,
            user,
            keys: await records.list(tenant, `${scopePrefix}${user}`),
          };
        } else {
          const scopes = await records.listScopes(tenant, scopePrefix);
          result = {
            appId: manifest.appId,
            app: manifest.name,
            users: scopes.map((scope) => scope.slice(scopePrefix.length)),
          };
        }

        getAuditStore().append({
          requestId: crypto.randomUUID(),
          workspaceId: tenant,
          callerId: ctx.userId,
          provider: "apps",
          operation: `data:${manifest.appId}${user ? `:${user}` : ""}${key ? `:${key}` : ""}${filePath ? `:${filePath}` : ""}`,
          status: 200,
        });
        return result;
      }
      case "sdk": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const registrations = await registrationIndex(ctx.workspaceId);
        const channel = args["channel"] === undefined ? undefined : channelName(args["channel"]);
        const sdk = generateAppSdk(
          manifest,
          (manifest.workflows ?? []).map((name) => {
            const registration = registrations.get(name);
            return {
              name,
              description: registration?.description,
              input: registration?.input,
              output: registration?.output,
            };
          }),
          { channel },
        );
        return {
          appId: manifest.appId,
          app: manifest.name,
          channel: channel ?? null,
          namespaces: sdk.namespaces,
          js: sdk.js,
          dts: sdk.dts,
          urls: {
            js: `${livePath(manifest.appId)}/__sdk__.js`,
            dts: `${livePath(manifest.appId)}/__sdk__.d.ts`,
          },
        };
      }
      case "release": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const channel = channelName(args["channel"]);
        const notes = typeof args["notes"] === "string" ? args["notes"] : undefined;
        const release = await snapshotRelease(ctx.workspaceId, manifest, {
          channel,
          notes,
          createdBy: ctx.userId,
        });
        await saveRelease(ctx.workspaceId, manifest.appId, release);
        const updated = await setChannel(ctx.workspaceId, manifest, channel, release.id);
        return { ...summarizeRelease(release), channels: updated.channels ?? {} };
      }
      case "releases": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const releases = await listReleases(ctx.workspaceId, manifest.appId);
        return {
          appId: manifest.appId,
          name: manifest.name,
          channels: manifest.channels ?? {},
          releases: releases.map(summarizeRelease),
        };
      }
      case "channels": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const pointers = Object.entries(manifest.channels ?? {});
        const channels = await Promise.all(
          pointers.map(async ([channel, releaseId]) => {
            const release = await readRelease(ctx.workspaceId, manifest.appId, releaseId);
            return {
              channel,
              release: releaseId,
              releasedAt: release?.createdAt,
              notes: release?.notes,
              entryHash: release?.entryHash,
              workflows: release?.workflows ?? {},
              resolved: Boolean(release),
            };
          }),
        );
        return {
          appId: manifest.appId,
          name: manifest.name,
          defaultChannel: DEFAULT_CHANNEL,
          channels,
        };
      }
      case "promote": {
        // Personal promote-out (iw9-b): {source, slug} → {appId, root}.
        const source = typeof args["source"] === "string" ? args["source"] : "";
        const slug = typeof args["slug"] === "string" ? args["slug"] : "";
        if (source && slug) {
          const app = await promoteApp({
            workspaceId: ctx.workspaceId,
            source,
            slug,
            actor: ctx.userId,
          });
          return { appId: app.appId, root: app.root ?? `apps/${app.slug ?? app.name}` };
        }
        // Channel promote (legacy): point `to` at whatever `from` currently serves.
        const manifest = await requireApp(ctx.workspaceId, args);
        const from = channelName(args["from"], "");
        const to = channelName(args["to"], "");
        if (!from || !to) {
          throw new ServiceError(
            "promote requires {source, slug} (Personal promote-out) or {from, to} (channel promote)",
            400,
          );
        }
        const releaseId = manifest.channels?.[from];
        if (!releaseId) throw new ServiceError(`Channel ${from} has no release to promote`, 404);
        const updated = await setChannel(ctx.workspaceId, manifest, to, releaseId);
        return {
          appId: manifest.appId,
          name: manifest.name,
          from,
          to,
          release: releaseId,
          channels: updated.channels ?? {},
        };
      }
      case "rollback": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const channel = channelName(args["channel"]);
        const releases = await listReleases(ctx.workspaceId, manifest.appId);
        const target = previousRelease(releases, manifest.channels?.[channel], channel);
        if (!target) {
          throw new ServiceError(`No earlier release to roll ${channel} back to`, 404);
        }
        const updated = await setChannel(ctx.workspaceId, manifest, channel, target.id);
        return {
          appId: manifest.appId,
          name: manifest.name,
          channel,
          release: target.id,
          rolledBackFrom: manifest.channels?.[channel] ?? null,
          channels: updated.channels ?? {},
        };
      }
      case "install": {
        assertNotDeploymentTenant(ctx.workspaceId);
        const appRef =
          (typeof args["app"] === "string" && args["app"]) ||
          (typeof args["directoryRef"] === "string" && args["directoryRef"]) ||
          "";
        if (!appRef) {
          throw new ServiceError("app or directoryRef (alias or ULID) is required", 400);
        }

        let originWorkspaceId: string;
        let manifest: AppManifest | undefined;

        // ULID → deployment location index (cross-workspace).
        const loc = await resolveAppLocation(appRef).catch(() => undefined);
        if (loc) {
          originWorkspaceId =
            typeof args["workspace"] === "string" && args["workspace"]
              ? args["workspace"]
              : loc.workspaceId;
          if (originWorkspaceId !== loc.workspaceId && args["workspace"] !== undefined) {
            // Caller forced a workspace that doesn't own this appId.
            throw new ServiceError("Not found", 404);
          }
          originWorkspaceId = loc.workspaceId;
          manifest = await readApp(originWorkspaceId, appRef).catch(() => undefined);
        } else {
          originWorkspaceId =
            typeof args["workspace"] === "string" && args["workspace"]
              ? args["workspace"]
              : ctx.workspaceId;
          assertNotDeploymentTenant(originWorkspaceId);
          const appId = await resolveAppRef(originWorkspaceId, appRef).catch(() => undefined);
          manifest = appId
            ? await readApp(originWorkspaceId, appId).catch(() => undefined)
            : undefined;
        }
        if (!manifest) throw new ServiceError("Not found", 404);
        return completeInstall(ctx, { originWorkspaceId, manifest, args });
      }
      case "updateCheck": {
        const installId =
          (typeof args["install"] === "string" && args["install"]) ||
          (typeof args["installId"] === "string" && args["installId"]) ||
          "";
        if (!installId) throw new ServiceError("install (or installId) is required", 400);
        return updateCheck(ctx.workspaceId, installId);
      }
      case "applyUpdate": {
        const installId =
          (typeof args["install"] === "string" && args["install"]) ||
          (typeof args["installId"] === "string" && args["installId"]) ||
          "";
        if (!installId) throw new ServiceError("install (or installId) is required", 400);
        const result = await applyUpdate(ctx.workspaceId, installId, {
          confirmOverwrite: args["confirmOverwrite"] === true,
        });
        const originManifest = await readApp(
          result.install.originWorkspaceId,
          result.install.originAppId,
        ).catch(() => undefined);
        return {
          ...(await summarizeInstall(ctx.workspaceId, result.install, originManifest, ctx.userId)),
          from: result.from,
          to: result.to,
        };
      }
      case "update": {
        const installId = typeof args["install"] === "string" ? args["install"] : "";
        if (!installId) throw new ServiceError("install is required", 400);
        const install = await requireInstall(ctx.workspaceId, installId);
        const originManifest = await readApp(install.originWorkspaceId, install.originAppId).catch(
          () => undefined,
        );
        if (!originManifest) {
          throw new ServiceError(
            `Origin unavailable: app ${install.originAppId} in workspace ${install.originWorkspaceId} is gone`,
            404,
          );
        }
        let pin = install.pin;
        if (typeof args["release"] === "string" && args["release"]) {
          pin = { release: args["release"] };
        }
        const release = await resolvePinRelease(
          install.originWorkspaceId,
          originManifest,
          pin,
        );
        if (!release) {
          throw new ServiceError(
            isChannelPin(pin)
              ? `Origin channel "${pin.channel}" has no release`
              : `Unknown origin release: ${pin.release}`,
            404,
          );
        }
        if (install.editing && args["force"] !== true) {
          throw new ServiceError(
            "Installation has local edits; pass force=true to overwrite the fork from the origin release",
            409,
          );
        }
        const from = install.resolvedRelease;
        const to = release.id;
        const next: AppInstallation = {
          ...install,
          pin,
          resolvedRelease: to,
          updatedAt: new Date().toISOString(),
        };
        if (install.editing && install.prefix && args["force"] === true) {
          await materializeFork(
            ctx.workspaceId,
            install.originWorkspaceId,
            release,
            install.prefix,
          );
        }
        await saveInstall(ctx.workspaceId, next);
        return {
          installId: next.installId,
          from,
          to,
          pin: next.pin,
          config: next.config,
          editing: next.editing,
        };
      }
      case "configure": {
        const installId = typeof args["install"] === "string" ? args["install"] : "";
        if (!installId) throw new ServiceError("install is required", 400);
        const install = await requireInstall(ctx.workspaceId, installId);
        const originManifest = await readApp(install.originWorkspaceId, install.originAppId).catch(
          () => undefined,
        );
        let next: AppInstallation = { ...install, updatedAt: new Date().toISOString() };

        if (args["config"] !== undefined) {
          if (!args["config"] || typeof args["config"] !== "object" || Array.isArray(args["config"])) {
            throw new ServiceError("config must be an object", 400);
          }
          next = { ...next, config: args["config"] as Record<string, unknown> };
        }

        if (args["bindings"] !== undefined) {
          if (!args["bindings"] || typeof args["bindings"] !== "object" || Array.isArray(args["bindings"])) {
            throw new ServiceError("bindings must be an object", 400);
          }
          const explicit = args["bindings"] as Record<string, string>;
          const resolved = await resolveBindings(
            originManifest?.requires ?? Object.keys(install.bindings).map((c) => ({ contract: c })),
            { ...install.bindings, ...explicit },
            (contract, name) => resolveInterfaceProfileId(ctx.workspaceId, contract, name),
          );
          if (resolved.missing.length > 0) throw bindingMissingError(resolved.missing);
          // Revoke removed / changed grants, grant new ones.
          for (const [contract, oldId] of Object.entries(install.bindings)) {
            const newId = resolved.bindings[contract];
            if (newId !== oldId) {
              await revokeInstallProfileGrant(ctx.workspaceId, oldId, install.installId);
            }
          }
          for (const [contract, profileId] of Object.entries(resolved.bindings)) {
            if (install.bindings[contract] !== profileId) {
              await grantProfileToInstall(
                ctx.workspaceId,
                profileId,
                install.installId,
                ctx.userId,
              );
            }
          }
          next = { ...next, bindings: resolved.bindings };
        }

        if (args["editing"] === true && !install.editing) {
          const prefix =
            typeof args["prefix"] === "string" && args["prefix"]
              ? installPrefix(args["prefix"], originManifest?.name ?? "app")
              : install.prefix ??
                installPrefix(undefined, originManifest?.name ?? "app");
          const release = install.resolvedRelease
            ? await resolvePinRelease(
                install.originWorkspaceId,
                originManifest ?? {
                  appId: install.originAppId,
                  name: "app",
                  entry: "",
                  paths: [],
                  allowedTools: [],
                  createdBy: install.installedBy,
                  createdAt: install.installedAt,
                  updatedAt: install.updatedAt,
                },
                install.pin,
              )
            : undefined;
          const pinned =
            release ??
            (install.resolvedRelease
              ? await readRelease(
                  install.originWorkspaceId,
                  install.originAppId,
                  install.resolvedRelease,
                )
              : undefined);
          if (!pinned) {
            throw new ServiceError(
              "Cannot enable editing: no resolved release to materialize",
              400,
            );
          }
          await materializeFork(
            ctx.workspaceId,
            install.originWorkspaceId,
            pinned,
            prefix,
          );
          next = { ...next, editing: true, prefix };
        } else if (args["editing"] === false) {
          next = { ...next, editing: false };
        } else if (typeof args["prefix"] === "string" && args["prefix"]) {
          next = {
            ...next,
            prefix: installPrefix(args["prefix"], originManifest?.name ?? "app"),
          };
        }

        await saveInstall(ctx.workspaceId, next);
        return summarizeInstall(ctx.workspaceId, next, originManifest, ctx.userId);
      }
      case "uninstall": {
        const installId = typeof args["install"] === "string" ? args["install"] : "";
        if (!installId) throw new ServiceError("install is required", 400);
        const install = await readInstall(ctx.workspaceId, installId);
        if (install) {
          await revokeAllInstallGrants(
            ctx.workspaceId,
            install.installId,
            Object.values(install.bindings),
          );
        }
        const removed = await removeInstall(ctx.workspaceId, installId);
        const purge = args["purgeData"] === true || args["purge_data"] === true;
        if (purge) await purgeInstallData(ctx.workspaceId, installId);
        return { install: installId, removed, purged: purge };
      }
      case "installed": {
        const installs = await listInstalls(ctx.workspaceId);
        return {
          installs: await Promise.all(
            installs.map(async (install) => {
              const manifest = await readApp(
                install.originWorkspaceId,
                install.originAppId,
              ).catch(() => undefined);
              return summarizeInstall(ctx.workspaceId, install, manifest, ctx.userId);
            }),
          ),
        };
      }
      case "directory": {
        assertNotDeploymentTenant(ctx.workspaceId);
        const entries = await listDirectoryForWorkspace(ctx.workspaceId);
        return {
          apps: entries.map((entry) => ({
            ...entry,
            url: livePath(entry.appId),
            permalink: livePath(entry.appId),
            installable:
              entry.workspaceId === ctx.workspaceId ||
              /* public index entries are installable */ true,
          })),
        };
      }
      case "remove": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const removed = await removeApp(ctx.workspaceId, manifest.appId, {
          purgeData: args["purge_data"] === true,
        });
        return { appId: manifest.appId, name: manifest.name, removed };
      }
      case "shares": {
        const config = await readWorkspaceConfig(ctx.workspaceId);
        return { shares: config.shares ?? [] };
      }
      case "share": {
        const rawPrefix = args["prefix"];
        if (typeof rawPrefix !== "string" || !rawPrefix.trim()) {
          throw new ServiceError("prefix is required", 400);
        }
        const prefix = rawPrefix.replace(/^\/+|\/+$/g, "");
        if (prefix === ".services" || prefix.startsWith(".services/")) {
          throw new ServiceError("service state cannot be shared with apps", 400);
        }
        const share: WorkspaceShare = {
          prefix,
          apps:
            args["apps"] === "*" || args["apps"] === undefined
              ? "*"
              : Array.isArray(args["apps"])
                ? args["apps"].filter((a): a is string => typeof a === "string")
                : (() => {
                    throw new ServiceError('apps must be an array of names or "*"', 400);
                  })(),
          mode: args["mode"] === "readwrite" ? "readwrite" : "read",
        };
        const config = await readWorkspaceConfig(ctx.workspaceId);
        const shares = (config.shares ?? []).filter((s) => s.prefix !== share.prefix);
        shares.push(share);
        await writeWorkspaceConfig(ctx.workspaceId, { ...config, shares });
        return share;
      }
      case "unshare": {
        const prefix = String(args["prefix"] ?? "").replace(/^\/+|\/+$/g, "");
        const config = await readWorkspaceConfig(ctx.workspaceId);
        const shares = (config.shares ?? []).filter((s) => s.prefix !== prefix);
        await writeWorkspaceConfig(ctx.workspaceId, { ...config, shares });
        return { prefix, removed: true };
      }
      case "versions": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const versions = await listEntryVersions(ctx.workspaceId, manifest.entry);
        return {
          path: manifest.entry,
          versions: versions.map((version, index) => ({
            hash: version.hash,
            updatedAt: version.updatedAt,
            size: version.size,
            current: index === 0,
          })),
        };
      }
      case "version": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const hash = typeof args["hash"] === "string" ? args["hash"] : "";
        const file = await readEntryVersion(ctx.workspaceId, manifest.entry, hash);
        if (!file) throw new ServiceError(`Unknown version: ${manifest.name}@${hash}`, 404);
        return {
          path: file.path,
          hash: file.hash,
          content: file.content,
          mimeType: file.mimeType,
          updatedAt: file.updatedAt,
        };
      }
      case "restore": {
        const manifest = await requireApp(ctx.workspaceId, args);
        const hash = typeof args["hash"] === "string" ? args["hash"] : "";
        const restored = await restoreEntryVersion(ctx.workspaceId, manifest.entry, hash);
        if (!restored) throw new ServiceError(`Unknown version: ${manifest.name}@${hash}`, 404);
        return describeApp(
          ctx.workspaceId,
          manifest,
          await registrationIndex(ctx.workspaceId),
          { withRuns: false },
        );
      }
      default:
        throw new ServiceError(`Unknown apps procedure: ${procedure}`, 404);
    }
  },
};
