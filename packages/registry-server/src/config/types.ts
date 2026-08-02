/**
 * Core types of the registry server — the embedding contract.
 *
 * These shapes are normative (tech-plan "Interfaces & Data"): names may not
 * drift without updating the plan. Everything a host needs to construct,
 * embed, or stand the server up alone is declared here.
 */

import type { Hono } from "hono";
import type { AuthAdapter, TenantResolver } from "../auth/types.js";
import type { InterfaceCatalog } from "../catalog/types.js";
import type { CoreService } from "../kernel/index.js";
import type { ProviderExecutor } from "../executor/index.js";
import type { RegistryStorage } from "../storage/types.js";
import type { RegistryTelemetry } from "../telemetry/index.js";

// ---------------------------------------------------------------------------
// Call context — who is calling, from where, in which tenant
// ---------------------------------------------------------------------------

/** Who is calling, from where, in which tenant. Threaded through EVERYTHING. */
export interface CallContext {
  tenantId: string;
  /** Subject id ("local" in auth-none). */
  principal: string;
  /** Attribution origin. */
  source: TelemetrySource;
  role: "admin" | "member";
  groupIds: string[];
  /** Non-user caller identity, when dispatch originates from a granted subject. */
  actor?: { kind: "app" | "workflow" | "agent"; id: string };
  traceId?: string;
}

export type TelemetrySource =
  | { type: "tool" }
  | { type: "mcp" }
  | { type: "workflow"; runId?: string }
  | { type: "widget"; path?: string }
  | { type: "app"; app?: string }
  | { type: "chat"; sessionId?: string }
  | { type: "system" };

// ---------------------------------------------------------------------------
// Server construction (the embedding contract)
// ---------------------------------------------------------------------------

export interface RegistryServerOptions {
  storage:
    | { driver: "sqlite" | "libsql"; url?: string; dir?: string }
    | { driver: "dsql"; url: string }
    | RegistryStorage; // bring your own
  auth:
    | { mode: "oidc"; issuer: string; audience: string }
    | { mode: "api-key" }
    | { mode: "none" }
    | AuthAdapter;
  tenancy:
    | { mode: "single" } // standalone: auto-provision "default"
    | { mode: "external"; resolve: TenantResolver }; // embedded: host maps workspace→tenant
  /** WS-2 compat data (interfaces + compat entries + llm aliases). */
  catalog: InterfaceCatalog;
  /** Host-registered natives (vfs, workflows, …). */
  nativeServices?: Record<string, CoreService>;
  telemetry?: { otlpEndpoint?: string; serviceName?: string };
  executor?: { cacheSize?: number }; // default 20
  /** Share the host process executor (test seams, module cache). */
  executorInstance?: ProviderExecutor;
  sandbox?: { memoryLimitMb?: number; concurrency?: number }; // defaults 32 / 2
  limits?: { defaultRps?: number; defaultBurst?: number }; // tenant-level defaults
  /** Gate: networked multi-tenant + auth none. */
  allowInsecure?: boolean;
  /** MCP extension hook — host-attached tools/prompts/resources (product plane). */
  mcp?: { extensions?: McpExtensions };
  /**
   * Host hook for compat entries whose module is "native" (the implementation
   * IS the host process — e.g. the agent contract's native runner), keyed by
   * interface id. Without a hook such entries refuse with 501.
   */
  compatDispatch?: Record<
    string,
    (
      ctx: import("../kernel/index.js").ServiceContext,
      operation: string,
      args: Record<string, unknown>,
    ) => Promise<unknown>
  >;
}

export interface RegistryServer {
  /** Hono app: /tools, /profiles, /credentials, /mcp, /healthz. Host mounts or serves it. */
  router: Hono;
  /** In-process dispatch — the embed hot path. Host has already authenticated. */
  dispatch(
    ctx: CallContext,
    namespace: string,
    operation: string,
    args: Record<string, unknown>,
    opts?: { profile?: string; stream?: boolean },
  ): Promise<DispatchResult>;
  /** Run untrusted guest source in the QuickJS runtime with SDK globals installed. */
  runScript(ctx: CallContext, opts: RunScriptOptions): Promise<unknown>;
  stores: RegistryStorage;
  telemetry: RegistryTelemetry;
  /** The provider-module executor (exposed for host test seams and cache control). */
  executor: ProviderExecutor;
  close(): Promise<void>;
}

export type DispatchResult =
  | { kind: "json"; data: unknown; requestId: string; durationMs: number }
  | { kind: "stream"; stream: ReadableStream<Uint8Array>; headers: Record<string, string> };

// ---------------------------------------------------------------------------
// Script execution
// ---------------------------------------------------------------------------

export interface RunScriptOptions {
  /** ES-module-shaped script source (`import x from "ns"` / `export default`). */
  source: string;
  filename?: string;
  /** JSON-serializable trigger payload exposed as `input`. */
  input?: unknown;
  /** Namespace globals to expose (github, keyvalue, …). */
  namespaces: string[];
  /** Wall-clock + interpreter budget for the whole run (default 30_000). */
  timeoutMs?: number;
  /** Resolved agent profile exposed to the script as the `agent` global. */
  agent?: unknown;
  /** Captured console output. Parts arrive pre-stringified. */
  log?: (level: "log" | "info" | "warn" | "error" | "debug", parts: unknown[]) => void;
}

// ---------------------------------------------------------------------------
// MCP extension hook (product-plane features re-attached by the host)
// ---------------------------------------------------------------------------

export interface McpExtensionTool {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export interface McpExtensions {
  tools?: McpExtensionTool[];
  handleTool?: (
    ctx: CallContext,
    name: string,
    args: Record<string, unknown>,
  ) => Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }>;
  listPrompts?: (ctx: CallContext) => Promise<Array<{ name: string }>>;
  getPrompt?: (
    ctx: CallContext,
    name: string,
  ) => Promise<{ messages: Array<{ role: "user"; content: { type: "text"; text: string } }> }>;
  listResources?: (
    ctx: CallContext,
  ) => Promise<Array<{ uri: string; name: string; mimeType?: string }>>;
  readResource?: (
    ctx: CallContext,
    uri: string,
  ) => Promise<{ contents: Array<{ uri: string; mimeType?: string; text: string }> }>;
}
