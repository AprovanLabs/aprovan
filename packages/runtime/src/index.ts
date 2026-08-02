/**
 * @aprovan/runtime — the shared UTDK sandbox runtime.
 *
 * One package answers "how does sandboxed code call 3rd-party providers"
 * for every Aprovan surface:
 *
 *   - registry playground: scripts run in a sandboxed iframe
 *     (`runScriptInSandbox`), namespaced imports become proxies, calls go
 *     through the gateway with workspace credentials.
 *   - patchwork widgets: the same proxies + transport back generative UI
 *     (patchwork's compiler bridge is the adoption point).
 *   - server hosts: the proxies and policy layer are environment-agnostic;
 *     pair them with a server transport or the gateway.
 *
 * Composition: `manifest → createRuntimeGlobals(deps, instrument(withPolicy(transport)))`.
 */

export {
  RuntimeTimeoutError,
  TransportError,
  type ManifestPolicy,
  type RateLimitPolicy,
  type RetryPolicy,
  type RuntimeDependency,
  type RuntimeEvent,
  type RuntimeEventListener,
  type RuntimeManifest,
  type RuntimePolicy,
  type Transport,
  type TransportCallOptions,
} from "./types.js";

export {
  createNamespaceProxy,
  createRuntimeGlobals,
  ROOT_OPERATION,
  type NamespaceProxy,
} from "./proxy.js";

export {
  parseScriptDependencies,
  rewriteDefaultExport,
  type ParsedScript,
} from "./imports.js";

export { resolvePolicy, withPolicy, type PolicyHooks } from "./policy.js";

export {
  createGatewayTransport,
  instrument,
  type GatewayTransportOptions,
} from "./transport.js";

export {
  runScriptInSandbox,
  type RunScriptOptions,
  type SandboxRun,
} from "./sandbox.js";

export { allPages, paginate, type PaginateOptions } from "./paginate.js";
