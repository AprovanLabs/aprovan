/**
 * The core-service kernel: the contract every core service is written
 * against, and nothing else.
 *
 * This module exists to be a **leaf**. `services.ts` builds `CORE_SERVICES`
 * from the service modules at module-init time, so any symbol those modules
 * need from `services.ts` would close a cycle whose resolution depends on
 * which file the process imported first — real entrypoints happened to load
 * `services.ts` first and worked, while `import("./apps/service.js")` from a
 * script or a focused test crashed with "Cannot access 'appsService' before
 * initialization". Putting the shared contract here removes the back-edge
 * instead of making the order tolerable.
 *
 * The invariant that keeps it that way: **`services.ts` must not export
 * `ServiceError`, `ServiceContext`, or `CoreService`.** With one canonical
 * home there is no import that could re-create the cycle by accident.
 *
 * The two imports below are `import type` and erase at compile time, so they
 * add no runtime edge even though both modules sit downstream of this one.
 */

import type { ServiceContext as RegistryServiceContext } from "@aprovan/registry-server";
import type { AppPaths } from "./apps/store.js";
import type { ToolEntry } from "./routes/tools.js";

/**
 * The kernel contract's canonical home is now `@aprovan/registry-server`
 * (tech-plan D6): `ServiceError` here IS the package's class, so status-
 * carrying errors thrown by the extracted dispatch pipeline and QuickJS
 * sandbox satisfy this module's `instanceof` checks. The workspace's
 * `ServiceContext` extends the package's core shape with the product-plane
 * fields the extracted server never reads.
 */
export { ServiceError } from "@aprovan/registry-server";

export interface ServiceContext extends RegistryServiceContext {
  /**
   * Event-cascade depth when the caller is a workflow run (set by the
   * workflow runner). `events.emit` uses it to cap workflow→event→workflow
   * chains; absent means a user/API call (depth 0).
   */
  workflowDepth?: number;
  /**
   * Set when the caller reached the workspace through a published app (see
   * src/apps). `paths` is the manifest's path binding and the sole authority
   * for what this session may touch: data is co-located with the app (a
   * keyvalue key `k` lives at `<paths[0]>/data/<userId>/k`), relative vfs
   * paths resolve under `paths[0]`, and `~/<path>` reaches any declared
   * prefix — anything else needs a `.services/workspace.json` share.
   */
  appScope?: AppPaths & { userId: string; role: "admin" | "user" };
  /**
   * Per-run interface binding overrides (interface id → provider id), set by
   * the workflow runner from the registration's `bindings`. Interface
   * dispatch prefers these over the workspace binding.
   */
  interfaceBindings?: Record<string, string>;
  /**
   * Per-run interface profile redirection (interface id → profile pin), set
   * from an agent profile's `llm`. An agent pinned to `{ interface: "llm",
   * profile: "fast" }` means its runs' plain `llm.createChatCompletion`
   * calls resolve through that profile.
   *
   * Distinct from {@link interfaceBindings}, which names a *provider* and so
   * bypasses profile options and credentials entirely.
   */
  interfaceInstances?: Record<string, string | { interface: string; profile?: string }>;
  /**
   * Trace correlation. Every cascade — `events.emit` → workflow, workflow →
   * workflow, app call → workflow — carries these forward, so a run record
   * links to the run (or app request) that caused it and `workflows.tree`
   * can render the whole cascade. Absent means "start a new trace".
   */
  traceId?: string;
  /** The run this context descends from (the parent edge in the trace). */
  parentRunId?: string;
  /**
   * Capability bounds for agent-attributed execution (src/grants.ts): tool
   * patterns checked in the workflow dispatch path, path prefixes checked in
   * vfs. Absent means unbounded (the executing user's normal reach).
   */
  grants?: import("./grants.js").CapabilityGrants;
  /**
   * Server-stamped source for `telemetry.export` flattening (workflow runner /
   * HTTP `X-Telemetry-Source`). When set, exported events carry this instead
   * of the default `{ type: "widget" }`.
   */
  telemetrySource?: {
    type: "tool" | "workflow" | "widget" | "app" | "chat";
    path?: string;
    runId?: string;
    sessionId?: string;
  };
}

/**
 * How a namespace presents itself to a human. Every core service declares its
 * own, so a client never has to keep a parallel map of labels and blurbs —
 * that map is what let five shipped namespaces (sessions, notifications,
 * telemetry, agents, sandboxes) fall through the chat services menu's
 * "is it native?" test and render as unconnectable third-party providers.
 *
 * `icon` is a slug, not an asset: which icon set draws it is the client's
 * business, but *which concept* it names is the service's.
 */
export interface CoreServiceMeta {
  /** Human label ("Key value"). */
  label: string;
  /** One line: what the namespace is for. */
  blurb: string;
  /** Icon slug the client maps to its own icon set. */
  icon: string;
}

export interface CoreService {
  /** Identity + one-line description for discovery and UI. */
  meta: CoreServiceMeta;
  /** Tool entries advertised in discovery (`GET /tools`). */
  tools: Omit<ToolEntry, "provider">[];
  call(
    ctx: ServiceContext,
    procedure: string,
    args: Record<string, unknown>,
  ): Promise<unknown>;
}

/**
 * The core namespaces, and the single source of truth for what they are.
 * `services.ts` types `CORE_SERVICES` as `Record<CoreServiceName, CoreService>`,
 * so adding a name here without wiring a service (or wiring one that isn't
 * named here) is a compile error rather than a runtime surprise.
 *
 * Callers that only need the *names* — the sandbox deciding which globals to
 * inject, discovery, allow-list validation — read this instead of reaching
 * back into `services.ts` for `Object.keys(CORE_SERVICES)`.
 */
export const CORE_SERVICE_NAMES = [
  "keyvalue",
  "events",
  "vfs",
  "registry",
  "workflows",
  "apps",
  "webhooks",
  "interfaces",
  "profiles",
  "sync",
  "sessions",
  "notifications",
  "telemetry",
  "agents",
  "sandboxes",
] as const;

export type CoreServiceName = (typeof CORE_SERVICE_NAMES)[number];

export function isCoreServiceName(name: string): name is CoreServiceName {
  return (CORE_SERVICE_NAMES as readonly string[]).includes(name);
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/**
 * Lookup lives here rather than in `services.ts` because two of its own
 * upstream modules — the workflow runner and sync — need to dispatch to a
 * sibling namespace. Reaching back for `CORE_SERVICES` is what made those
 * imports cyclic; reading from the kernel does not.
 *
 * `services.ts` fills this in at module init via {@link installCoreServices},
 * and is the only module allowed to.
 */
let installed: Record<CoreServiceName, CoreService> | null = null;

export function installCoreServices(services: Record<CoreServiceName, CoreService>): void {
  installed = services;
}

/**
 * The service for a namespace, or `undefined` when the namespace is not a
 * core service at all (the caller then tries providers and LLM aliases).
 *
 * A *known* core namespace requested before `services.ts` has been loaded is
 * a wiring bug, not a missing namespace, so it throws instead of returning
 * `undefined` — an empty registry must not read as "no such tool".
 */
export function getCoreService(namespace: string): CoreService | undefined {
  if (!isCoreServiceName(namespace)) return undefined;
  if (!installed) {
    throw new Error(
      `Core service "${namespace}" was requested before services.ts was loaded. ` +
        `Import "./services.js" (or an app entrypoint) before dispatching.`,
    );
  }
  return installed[namespace];
}

/** Discovery entries for every core service (always available, no credential). */
export function coreToolEntries(): ToolEntry[] {
  if (!installed) return [];
  return Object.entries(installed).flatMap(([provider, service]) =>
    service.tools.map((tool) => ({ ...tool, provider })),
  );
}

/**
 * Each core namespace's identity, for the namespace catalog (`GET
 * /tools/namespaces`). Separate from {@link coreToolEntries} because a client
 * that only wants to *classify* namespaces shouldn't have to page through
 * every operation's JSON schema to do it.
 */
export function coreServiceMeta(): Array<CoreServiceMeta & { id: CoreServiceName }> {
  if (!installed) return [];
  return Object.entries(installed).map(([id, service]) => ({
    id: id as CoreServiceName,
    ...service.meta,
  }));
}
