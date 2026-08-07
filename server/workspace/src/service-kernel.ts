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

/**
 * Mode declared per operation in discovery. Absent ≡ false.
 * `"response"` is today's SSE pass-through; `"session"` selects the session path.
 */
// sync: import from @utdk/common/streaming when published
export type StreamingMode = "response" | "session" | false;

/**
 * Map a legacy boolean or already-widened mode onto {@link StreamingMode}.
 * `true` → `"response"` so existing declarations keep today's wire behavior.
 * Absent stays absent (semantically ≡ false).
 */
export function normalizeStreamingMode(
  value: boolean | StreamingMode | undefined,
): StreamingMode | undefined {
  if (value === undefined) return undefined;
  if (value === true) return "response";
  return value;
}

/** Tool metadata declared by a core/plugin service (provider filled at install). */
export interface ServiceToolEntry {
  name: string;
  operation: string;
  description?: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
  passthrough?: boolean;
  streaming?: StreamingMode;
}

export interface CoreService {
  /** Identity + one-line description for discovery and UI. */
  meta: CoreServiceMeta;
  /** Tool entries advertised in discovery (`GET /tools`). */
  tools: ServiceToolEntry[];
  call(
    ctx: ServiceContext,
    procedure: string,
    args: Record<string, unknown>,
  ): Promise<unknown>;
}

/**
 * Platform plugin names — Aprovan-only namespaces. Interface driver ids
 * (`vfs`, `vcs`, `keyvalue`, `events`, `telemetry`) are intentionally absent
 * so the intersection with interface ids is empty (native-interface-provider
 * / "No shadowed names"). Installation and lookup live in
 * `platform-plugins.ts`; these aliases keep existing call sites compiling
 * during the stream-6 rename.
 */
export {
  PLATFORM_PLUGIN_NAMES as CORE_SERVICE_NAMES,
  type PlatformPluginName as CoreServiceName,
  isPlatformPluginName as isCoreServiceName,
  getPlatformPlugin as getCoreService,
  installPlatformPlugins as installCoreServices,
  platformToolEntries as coreToolEntries,
  platformPluginMeta as coreServiceMeta,
} from "./platform-plugins.js";
