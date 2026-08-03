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
 *   install/uninstall/installed — interim install records (stream 3 rewrites)
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
import { profileGrantsAvailable } from "../profile-grants.js";
import { getRegistryStorage } from "../registry-storage.js";
import {
  APP_WORKFLOW_NAMESPACE,
  assertAllowedTools,
  camelCase,
  effectiveRateLimit,
  nativeCapabilities,
  providerGrantCapabilities,
  type ProviderGrant,
  type ProviderGrantCapability,
} from "./capabilities.js";
import {
  assertInstallable,
  installPrefix,
  listInstalls,
  readInstall,
  removeInstall,
  saveInstall,
  type AppInstall,
} from "./install.js";
import {
  dropAlias,
  mintAppId,
  readAlias,
  resolveAppRef,
  setAlias,
} from "./identity.js";
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
import {
  ENTRY_CANDIDATES,
  appDataDir,
  appName,
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

function livePath(workspaceId: string, name: string): string {
  return `/apps/${workspaceId}/${name}`;
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

function apiBase(workspaceId: string, name: string): string {
  return `/api/gateway/apps/${workspaceId}/${name}`;
}

function parseAllowedTools(
  raw: unknown,
  context: { app: string; workflows: string[] },
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
  // Deny by default AND deny by construction: the auto-partitioned native
  // namespaces, this app's own workflows, and exact provider procedures
  // (credential grants — verified against the credential store below).
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
    /** UI entrypoint, as a workspace path. */
    entry: manifest.entry,
    /** Workspace prefixes this app publishes (paths[0] is its root). */
    paths: manifest.paths,
    /** Live page URL (aprovan.com/apps/<workspace>/<name>). */
    url: livePath(workspaceId, manifest.name),
    /** Durable id permalink that survives renames. */
    permalink: `/apps/id/${manifest.appId}`,
    /** API surface base (tools + workflow runs). */
    apiBase: apiBase(workspaceId, manifest.name),
    /** Channel → release id. `apps.channels` resolves them to release records. */
    channels: manifest.channels ?? {},
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
 * Resolve the manifest's path binding from the publish arguments. `entry`
 * (a file, or a folder to resolve within) is the explicit form; `dir` is
 * sugar for the same thing. With neither, an update keeps its binding and a
 * fresh publish claims `apps/<name>/index.tsx` — the UI is often authored
 * after the app is registered, so that default is not required to exist yet.
 *
 * `paths` always leads with the entry's folder — the primary prefix carries
 * the app's data partition and its app-relative vfs paths, so it is derived,
 * never declared. Extra prefixes survive an update unless `paths` is given
 * (pass `[]` to drop them).
 */
async function resolveBinding(
  workspaceId: string,
  name: string,
  args: Record<string, unknown>,
  existing: AppManifest | undefined,
): Promise<{ entry: string; paths: string[] }> {
  const target = args["entry"] ?? args["dir"];
  const entry =
    target !== undefined
      ? await resolveAppEntry(workspaceId, target)
      : (existing?.entry ?? `apps/${name}/${ENTRY_CANDIDATES[0]}`);

  const declared = args["paths"] ?? existing?.paths.slice(1) ?? [];
  if (!Array.isArray(declared)) {
    throw new ServiceError("paths must be an array of workspace prefixes", 400);
  }
  const extra = declared.map((path) => workspacePath(path, "paths[]"));

  return { entry, paths: [...new Set([pathDir(entry), ...extra])] };
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
        "Publish (or update) an app by binding workspace paths to a live endpoint: 'entry' is the UI entrypoint path (e.g. apps/liift4/widget.tsx) and 'paths' are the prefixes the app publishes — the same prefixes decide what the live site serves and what the app's sessions may read/write. 'workflows' is the app's export list: each becomes callable as app.<workflow>. 'allowed_tools' may only name the auto-partitioned native namespaces (vfs, keyvalue, events) or the app's own workflows — a provider (github, linear, …) must be reached through an exported workflow. The live app serves at /apps/<workspace>/<name>; identity is a ULID with a mutable name alias.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "App id (kebab-case)" },
          title: { type: "string" },
          description: { type: "string" },
          entry: {
            type: "string",
            description:
              "Workspace path of the UI entrypoint (e.g. apps/liift4/widget.tsx). A folder resolves to index.tsx, index.ts, widget.tsx, or its only *.tsx",
          },
          paths: {
            type: "array",
            items: { type: "string" },
            description:
              "Extra workspace prefixes the app publishes (e.g. ['lib/charts']); the entry's folder is always included and is the app's root",
          },
          dir: { type: "string", description: "Sugar for entry: a folder whose entrypoint is resolved for you" },
          visibility: { type: "string", enum: ["public", "private"], description: "Who can open the live page (default private)" },
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
      name: "apps.data",
      operation: "data",
      description:
        "Owner-side administration of an app's user data, since per-user partitions are read-enforced (foreign access answers 404): with just 'app', lists the app's users; add 'user' to list that user's keys; add 'key' to read one record, or 'path' to read one file from the user's file partition under .apps/<appId>/data/<user>. Gated on the app's admin role; every call is audited.",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string", description: "App alias or ULID" },
          name: { type: "string" },
          user: { type: "string", description: "App-user sub — list their keys, or read one with `key`" },
          key: { type: "string", description: "One record key to read (requires `user`; mutually exclusive with `path`)" },
          path: { type: "string", description: "One file to read from the user's file partition (requires `user`; mutually exclusive with `key`)" },
        },
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
      description: "Point channel 'to' at whatever channel 'from' currently serves (e.g. preview → live).",
      inputSchema: {
        type: "object",
        properties: {
          app: { type: "string" },
          name: { type: "string" },
          from: { type: "string" },
          to: { type: "string" },
        },
        required: ["from", "to"],
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
        "Install an app into THIS workspace (interim pre-stream-3): records the owner, name, pinned release, and a prefix. Stream 3 replaces this with ULID installs, pins, and bindings.",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string", description: "Workspace id that published the app" },
          name: { type: "string" },
          prefix: { type: "string", description: "Workspace prefix for the app's data (default apps/<name>)" },
        },
        required: ["owner", "name"],
      },
    },
    {
      name: "apps.uninstall",
      operation: "uninstall",
      description:
        "Remove an install record from this workspace. The app's data stays on the filesystem under its prefix; delete it with vfs if you want it gone.",
      inputSchema: {
        type: "object",
        properties: { owner: { type: "string" }, name: { type: "string" } },
        required: ["owner", "name"],
      },
    },
    {
      name: "apps.installed",
      operation: "installed",
      description: "Apps installed into this workspace (owner, name, pinned release, data prefix).",
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
        const { entry, paths } = await resolveBinding(ctx.workspaceId, name, args, existing);
        const { tools: allowedTools, grants } = parseAllowedTools(args["allowed_tools"], {
          app: name,
          workflows,
        });
        await assertGrantCredentials(ctx.workspaceId, grants);
        const now = new Date().toISOString();
        const appId = existing?.appId ?? mintAppId();
        const manifest: AppManifest = {
          appId,
          name,
          originAppId: existing?.originAppId,
          title: typeof args["title"] === "string" ? args["title"] : existing?.title,
          description:
            typeof args["description"] === "string" ? args["description"] : existing?.description,
          entry,
          paths,
          visibility: parseVisibility(args["visibility"]) ?? existing?.visibility ?? "private",
          workflows,
          channels: existing?.channels,
          allowedTools,
          roles: parseRoles(args["roles"]) ?? existing?.roles,
          rateLimit: parseRateLimit(args["rate_limit"]) ?? existing?.rateLimit,
          createdBy: existing?.createdBy ?? ctx.userId,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };
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
            url: livePath(ctx.workspaceId, manifest.name),
            permalink: `/apps/id/${manifest.appId}`,
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
        return {
          appId: manifest.appId,
          app: manifest.name,
          /** Auto-partitioned first-party namespaces, allow-list filtered. */
          native: nativeCapabilities(manifest),
          /** Provider credential grants — tier (2), exact procedures only. */
          providers: await withExecutingProfiles(ctx.workspaceId, providerGrantCapabilities(manifest)),
          /** Exported workflows — the app's own namespace (`app.<procedure>`). */
          workflows: (
            await summarizeWorkflows(ctx.workspaceId, manifest, registrations, false)
          ).map((workflow) => ({
            ...workflow,
            namespace: APP_WORKFLOW_NAMESPACE,
            toolPath: `${apiBase(ctx.workspaceId, manifest.name)}/tools/${APP_WORKFLOW_NAMESPACE}/${workflow.procedure}`,
          })),
        };
      }
      case "data": {
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
        if (key !== undefined && user === undefined) {
          throw new ServiceError("`key` requires `user`", 400);
        }
        if (filePath !== undefined && user === undefined) {
          throw new ServiceError("`path` requires `user`", 400);
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
        if (user !== undefined && filePath !== undefined) {
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
        } else if (user !== undefined && key !== undefined) {
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
        } else if (user !== undefined) {
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
            js: `${livePath(ctx.workspaceId, manifest.name)}/__sdk__.js`,
            dts: `${livePath(ctx.workspaceId, manifest.name)}/__sdk__.d.ts`,
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
        const manifest = await requireApp(ctx.workspaceId, args);
        const from = channelName(args["from"], "");
        const to = channelName(args["to"], "");
        if (!from || !to) throw new ServiceError("from and to channels are required", 400);
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
        const owner = typeof args["owner"] === "string" ? args["owner"] : "";
        if (!owner) throw new ServiceError("owner (the publishing workspace id) is required", 400);
        const name = appName(args["name"]);
        const appId = await resolveAppRef(owner, name).catch(() => undefined);
        const manifest = appId ? await readApp(owner, appId).catch(() => undefined) : undefined;
        if (!manifest) throw new ServiceError(`Unknown app: ${owner}/${name}`, 404);
        assertInstallable(manifest);
        const existing = await readInstall(ctx.workspaceId, owner, name);
        const install: AppInstall = {
          owner,
          name,
          release: manifest.channels?.[DEFAULT_CHANNEL] ?? null,
          prefix: installPrefix(args["prefix"] ?? existing?.prefix, name),
          installedAt: new Date().toISOString(),
        };
        await saveInstall(ctx.workspaceId, install);
        return {
          ...install,
          appId: manifest.appId,
          title: manifest.title,
          url: livePath(owner, name),
          dataPrefix: appDataDir(manifest.appId, ctx.userId),
        };
      }
      case "uninstall": {
        const owner = typeof args["owner"] === "string" ? args["owner"] : "";
        const name = appName(args["name"]);
        if (!owner) throw new ServiceError("owner is required", 400);
        const removed = await removeInstall(ctx.workspaceId, owner, name);
        return { owner, name, removed };
      }
      case "installed": {
        const installs = await listInstalls(ctx.workspaceId);
        return {
          apps: await Promise.all(
            installs.map(async (install) => {
              const appId = await resolveAppRef(install.owner, install.name).catch(() => undefined);
              const manifest = appId
                ? await readApp(install.owner, appId).catch(() => undefined)
                : undefined;
              return {
                ...install,
                appId: manifest?.appId,
                title: manifest?.title,
                description: manifest?.description,
                url: livePath(install.owner, install.name),
                dataPrefix: manifest ? appDataDir(manifest.appId, ctx.userId) : `${install.prefix}/data`,
                available: Boolean(manifest),
              };
            }),
          ),
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
