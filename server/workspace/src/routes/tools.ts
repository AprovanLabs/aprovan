/**
 * Tool call proxy route.
 *
 * POST /tools/:provider/:operation
 *
 * Authentication: Cognito access token (verified by `requireAuth`), which sets
 * `c.var.principal` with the caller's `sub`, active `workspaceId`, `role`, and
 * `groupIds`. The route:
 * - Authorizes via `mayInvokeTool` (direct grant, group tool grant, or admin)
 * - Resolves credentials for the provider from the credential store
 * - Applies rate limiting per user id
 * - Executes the operation in the Isolate runtime (APR-15)
 * - Emits telemetry span
 * - Logs request/response metadata (not bodies)
 */

import { agentToolEntries as agentDiscoveryEntries } from "@utdk/agent";
import { withSpan } from "@utdk/common/telemetry";
import { llmToolEntries as llmDiscoveryEntries } from "@utdk/llm";
import { telemetryToolEntries as telemetryDiscoveryEntries } from "@utdk/telemetry";
import { Hono } from "hono";
import { getAuditStore } from "../audit.js";
import { mayInvokeTool } from "../authorize.js";
import { getCredentialStore, resolveCredentialRecord } from "../credentials.js";
import {
  isInterface,
  listInstances,
  listInterfaces,
  parseInterfaceNamespace,
  readBindings,
  resolveInterfaceForWorkspace,
} from "../interfaces.js";
import { getExecutor, getProviderModule, type IsolateResult, type ProviderModule } from "../isolate.js";
import { isLlmProvider, resolveLlmProvider } from "../llm.js";
import { getAuthMode, requireAuth } from "../middleware/auth.js";
import { rateLimitByUserId } from "../middleware/rateLimitMiddleware.js";
import { OAuthExchangeError, resolveToInjectable } from "../oauthTokens.js";
import { isCoreServiceName, ServiceError } from "../service-kernel.js";
import { parseTelemetrySourceHeader, recordTelemetry } from "../telemetry/service.js";
import {
  catalogToolEntries,
  coreServiceMeta,
  coreToolEntries,
  getCoreService,
} from "../services.js";
import type { ToolCallRequest } from "../contract.js";
import type { CredentialPayload } from "../credentials.js";

export const toolsRouter = new Hono();

// Every tool route requires a verified Cognito access token + resolved principal.
toolsRouter.use("*", requireAuth);

// ---------------------------------------------------------------------------
// GET /tools — workspace-filtered tool discovery
// ---------------------------------------------------------------------------
//
// Returns the tool schemas for every provider that has at least one credential
// configured in the caller's workspace. Tool schemas are read from each
// provider package's static `tools` export (see APR-304) via the LRU provider
// cache. The result is cached per workspace with a 5-minute TTL.

export interface ToolEntry {
  provider: string;
  name: string;
  operation: string;
  description?: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
}

interface CachedToolList {
  tools: ToolEntry[];
  expiresAt: number;
}

const DEFAULT_TOOL_LIST_TTL_MS = 5 * 60 * 1000;

function getToolListTtlMs(): number {
  const raw = Number(process.env["TOOL_LIST_CACHE_TTL_MS"]);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_TOOL_LIST_TTL_MS;
}

const toolListCache = new Map<string, CachedToolList>();

/** Drop the cached tool list for a workspace (call when credentials change). */
export function invalidateToolListCache(workspaceId: string): void {
  toolListCache.delete(workspaceId);
  configuredToolListCache.delete(workspaceId);
}

/** Clear every cached tool list (used in tests). */
export function resetToolListCache(): void {
  toolListCache.clear();
  configuredToolListCache.clear();
}

/**
 * Derive tool entries for a provider from its cached module.
 *
 * Primary source: the static `tools` export (APR-304). Each entry is expected
 * to look like `{ name, description?, inputSchema?, outputSchema? }` where
 * `name` follows the `provider.operation` convention.
 *
 * Transitional fallback: when a `tools` export is not present but the module
 * re-exports `toolMetadata`, entries are derived from the runtime metadata
 * map (best-effort input schema from the parameter keys). This keeps
 * discovery useful before every provider package ships a `tools` export.
 */
function deriveToolEntries(provider: string, mod: ProviderModule): ToolEntry[] {
  const entries: ToolEntry[] = [];

  const toolsExport = mod["tools"];
  if (Array.isArray(toolsExport)) {
    for (const t of toolsExport) {
      if (!t || typeof t !== "object") continue;
      const entry = t as Record<string, unknown>;
      const name = typeof entry["name"] === "string" ? entry["name"] : "";
      if (!name) continue;
      const operation = name.startsWith(`${provider}.`)
        ? name.slice(provider.length + 1)
        : name;
      entries.push({
        provider,
        name,
        operation,
        description: typeof entry["description"] === "string" ? entry["description"] : undefined,
        inputSchema: entry["inputSchema"],
        outputSchema: entry["outputSchema"],
      });
    }
    return entries;
  }

  const meta = mod["toolMetadata"];
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    for (const [, value] of Object.entries(meta as Record<string, unknown>)) {
      if (!value || typeof value !== "object") continue;
      const m = value as Record<string, unknown>;
      const accessPath = Array.isArray(m["accessPath"])
        ? (m["accessPath"] as unknown[]).map(String)
        : [];
      if (accessPath.length === 0) continue;
      const operation = accessPath.join(".");
      entries.push({
        provider,
        name: `${provider}.${operation}`,
        operation,
        description: typeof m["description"] === "string" ? m["description"] : undefined,
        inputSchema: synthesizeInputSchema(m),
        outputSchema: undefined,
      });
    }
  }

  return entries;
}

/** Best-effort JSON schema for a tool derived from runtime metadata. */
function synthesizeInputSchema(meta: Record<string, unknown>): Record<string, unknown> {
  const stringKeys = (key: string): string[] =>
    Array.isArray(meta[key]) ? (meta[key] as unknown[]).map(String) : [];

  const pathKeys = stringKeys("pathParameterKeys");
  const queryKeys = stringKeys("queryParameterKeys");
  const bodyKeys = stringKeys("bodyPropertyKeys");
  const headerKeys = stringKeys("headerParameterKeys");
  const descriptions =
    meta["parameterDescriptions"] && typeof meta["parameterDescriptions"] === "object"
      ? (meta["parameterDescriptions"] as Record<string, unknown>)
      : {};

  const properties: Record<string, unknown> = {};
  for (const key of [...pathKeys, ...queryKeys, ...bodyKeys, ...headerKeys]) {
    properties[key] = {
      type: "string",
      ...(typeof descriptions[key] === "string" ? { description: descriptions[key] } : {}),
    };
  }

  const schema: Record<string, unknown> = { type: "object", properties };
  if (pathKeys.length > 0) {
    schema["required"] = pathKeys;
  }
  return schema;
}

/**
 * Discovery entries for a generic interface namespace. The `llm` interface
 * carries the OpenAI-compatible chat surface; calls dispatch to the bound
 * implementation, so the entry text stays provider-neutral.
 */
function toLlmToolEntries(
  provider: string,
  entries: ReturnType<typeof llmDiscoveryEntries>,
): ToolEntry[] {
  return entries.map((entry) => ({
    provider,
    name: entry.name,
    // Strip the namespace by length, not by the first dot: provider ids
    // contain dots of their own (`synthetic.new.createChatCompletion` would
    // otherwise yield the operation `new.createChatCompletion`).
    operation: entry.name.startsWith(`${provider}.`)
      ? entry.name.slice(provider.length + 1)
      : entry.name.slice(entry.name.indexOf(".") + 1),
    description: entry.description,
    inputSchema: entry.inputSchema,
  }));
}

/** Re-label a contract package's own entries onto an interface namespace. */
function toContractToolEntries(
  namespace: string,
  entries: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }>,
): ToolEntry[] {
  return entries.map((entry) => ({
    provider: namespace,
    name: entry.name,
    // Strip the namespace by length, not by the first dot: namespaces contain
    // dots and colons of their own (`synthetic.new`, `agent:reviewer`).
    operation: entry.name.startsWith(`${namespace}.`)
      ? entry.name.slice(namespace.length + 1)
      : entry.name.slice(entry.name.indexOf(".") + 1),
    description: entry.description,
    inputSchema: entry.inputSchema,
  }));
}

/**
 * Discovery entries for an interface namespace.
 *
 * `llm`, `agent`, and `telemetry` have hand-written binding-neutral entry
 * sets: their contract packages know the whole surface, so they can describe
 * themselves with no implementation resolvable. For `agent` that is not a
 * convenience but a requirement — its default implementation is the gateway's
 * own runner, which has no module to import and no credential to be connected
 * by, so borrowing schemas from "whatever resolved" would leave the namespace
 * permanently empty in a workspace that connected no vendor. For `telemetry`,
 * named instances expose only the contract's `export` op via
 * `telemetryToolEntries` — the bare `telemetry` namespace is the Activity core
 * service and never rides this path.
 *
 * Every other interface borrows the entries of whichever implementation the
 * workspace resolves to and re-labels them onto the interface namespace —
 * `postgres.query` becomes `sql.query`. Before this, `sql` and `sandbox`
 * returned nothing, so two shipped interfaces were callable but invisible to
 * chat's tool list, the services menu, and workflow script globals.
 */
async function interfaceToolEntries(
  workspaceId: string,
  namespace: string,
): Promise<ToolEntry[]> {
  const parsed = parseInterfaceNamespace(namespace);
  if (!parsed) return [];
  // Contract-driven interfaces below describe themselves without loading an
  // implementation, which is exactly why they need this check: nothing else
  // on their path would notice that whatever they resolve to cannot run. A
  // tool the model can see is a tool the model will call.
  if (!(await interfaceIsExecutable(workspaceId, namespace))) return [];
  if (parsed.interfaceId === "llm") {
    return toLlmToolEntries(
      namespace,
      llmDiscoveryEntries(namespace, { interfaceNamespace: true }),
    );
  }
  if (parsed.interfaceId === "agent") {
    // When the namespace resolves to the gateway's own runner, its declared
    // capabilities trim the advertised surface (no submitToolResults — the
    // in-process transport never yields tool calls, and no file ops). A
    // vendor binding keeps the contract's binding-neutral full set.
    let capabilities;
    try {
      const resolved = await resolveInterfaceForWorkspace(workspaceId, namespace);
      if (resolved.compat.provider === "native") {
        capabilities = (await import("../agents/runner.js")).NATIVE_AGENT_CAPABILITIES;
      }
    } catch {
      // Unresolvable binding: keep the binding-neutral entries.
    }
    return toContractToolEntries(
      namespace,
      agentDiscoveryEntries(namespace, capabilities ? { capabilities } : {}),
    );
  }
  if (parsed.interfaceId === "telemetry") {
    // Vendor egress only — named instances advertise `export`; the bare
    // namespace is the core service (emit/query/traces/export → activity store).
    return toContractToolEntries(namespace, telemetryDiscoveryEntries(namespace));
  }
  try {
    const resolved = await resolveInterfaceForWorkspace(workspaceId, namespace);
    const mod = await getProviderModule(resolved.compat.module, resolved.compat.moduleSpecifier);
    return deriveToolEntries(resolved.compat.provider, mod).map((entry) => ({
      ...entry,
      provider: namespace,
      name: `${namespace}.${entry.operation}`,
    }));
  } catch {
    // Unresolvable binding or module: the interface still dispatches (and
    // reports its own error there); it just contributes no schemas here.
    return [];
  }
}

/**
 * Whether this namespace resolves to something that can actually execute.
 *
 * Resolution deliberately succeeds for a declared-but-unbuilt entry — that is
 * what a contract commitment means, and the short-circuit dispatch that skips
 * the module depends on it. Discovery is the place that has to care, because
 * advertising operations whose only outcome is a 501 puts them in the model's
 * tool list, where they get called.
 */
async function interfaceIsExecutable(
  workspaceId: string,
  namespace: string,
): Promise<boolean> {
  try {
    const resolved = await resolveInterfaceForWorkspace(workspaceId, namespace);
    return !resolved.compat.unavailable;
  } catch {
    return false;
  }
}

/**
 * Every interface namespace this workspace can call: each interface's default
 * instance when some compatible provider is connected, plus every named
 * instance the workspace has bound. `sql:analytics` is a namespace in exactly
 * the way `sql` is — same discovery, same dispatch, its own credential.
 */
async function interfaceNamespaces(
  workspaceId: string,
  connected: Set<string>,
): Promise<string[]> {
  const namespaces = listInterfaces()
    .filter((def) => {
      // When an interface id is also a core service (`telemetry`), the bare
      // namespace stays on the core-service branch — vendor egress is named
      // instances only (D3). Don't advertise a duplicate interface namespace.
      if (isCoreServiceName(def.id)) return false;
      // A credentialless implementation is always available, so its interface
      // is always listed — `agent` must appear in a workspace that has
      // connected nothing, because the gateway's own runner is already there.
      return def.compat.some((entry) => entry.credentialless || connected.has(entry.provider));
    })
    .map((def) => def.id);
  for (const instance of await listInstances(workspaceId)) {
    if (!namespaces.includes(instance.instance)) namespaces.push(instance.instance);
  }
  return namespaces;
}

/**
 * Credentials whose `provider` field is an interface id (`llm`, `agent`, …)
 * or an interface-only implementation (`machine`, `native`, `bashkit`,
 * `harness`) must not become top-level provider namespaces. Doing so:
 *   - overwrites the interface's `kind: "interface"` in `/tools/namespaces`
 *     when the Map is keyed by id (last write wins), so `llm` lands under
 *     Providers instead of Interfaces;
 *   - surfaces sandbox-host client tokens / in-process runners as if they
 *     were registry SaaS providers.
 * Real UTDK providers that also appear in a compat list (github, openai, …)
 * still list normally.
 */
const INTERFACE_ONLY_PROVIDERS = new Set(["machine", "native", "bashkit", "harness"]);

export function shouldListCredentialAsProvider(provider: string): boolean {
  if (isInterface(provider)) return false;
  if (INTERFACE_ONLY_PROVIDERS.has(provider)) return false;
  return true;
}

function llmToolEntries(providerId: string): ToolEntry[] {
  const alias = resolveLlmProvider(providerId);
  return toLlmToolEntries(
    providerId,
    llmDiscoveryEntries(providerId, {
      label: alias?.label,
      defaultModel: alias?.defaultModel,
    }),
  );
}

async function discoverTools(workspaceId: string): Promise<ToolEntry[]> {
  const now = Date.now();
  const cached = toolListCache.get(workspaceId);
  if (cached && cached.expiresAt > now) {
    return cached.tools;
  }

  // Only providers with at least one credential configured in the workspace
  // contribute tools — a user who hasn't connected GitHub sees no GitHub tools.
  const credStore = getCredentialStore();
  const credentials = await credStore.list(workspaceId);
  const providers = Array.from(new Set(credentials.map((c) => c.provider)));

  // Core service namespaces (events, keyvalue, vfs, registry) are first-party
  // and always available — no credential required.
  const tools: ToolEntry[] = [...coreToolEntries()];

  // Generic interfaces (llm, …) surface whenever any compatible provider is
  // connected; calls resolve to the workspace's binding (interfaces.bind) or
  // the first connected implementation.
  const connected = new Set(providers);
  for (const namespace of await interfaceNamespaces(workspaceId, connected)) {
    tools.push(...(await interfaceToolEntries(workspaceId, namespace)));
  }

  for (const provider of providers) {
    if (!shouldListCredentialAsProvider(provider)) continue;
    // LLM chat providers (anthropic, synthetic.new, …) are credential-store
    // aliases onto OpenAI-compatible modules. They surface a curated entry
    // set (chat + model listing); the tool-call route resolves the alias to
    // its executing module and base URL.
    if (isLlmProvider(provider)) {
      tools.push(...llmToolEntries(provider));
      continue;
    }

    let entries: ToolEntry[] = [];
    try {
      const mod = await getProviderModule(provider);
      entries = deriveToolEntries(provider, mod);
    } catch {
      // Module unresolvable — the catalog fallback below still covers it.
    }
    // Generated modules typically export only the client factory (no `tools`
    // / `toolMetadata`), so the public registry catalog is the usual source
    // of operation schemas.
    if (entries.length === 0) {
      try {
        entries = await catalogToolEntries(provider);
      } catch (err) {
        // A single unresolvable provider should not break discovery.
        process.stderr.write(
          JSON.stringify({
            ts: new Date().toISOString(),
            type: "gateway_tool_discovery_error",
            provider,
            error: err instanceof Error ? err.message : String(err),
          }) + "\n",
        );
      }
    }
    tools.push(...entries);
  }

  toolListCache.set(workspaceId, { tools, expiresAt: now + getToolListTtlMs() });
  return tools;
}

// ---------------------------------------------------------------------------
// GET /tools?scope=configured — fast discovery, no catalog scan
// ---------------------------------------------------------------------------
//
// `discoverTools` above falls back to a network fetch of the public registry
// catalog (`catalogToolEntries`) for any credentialed provider whose UTDK
// module doesn't export its own tool metadata — the common case. That scan is
// the slow part. "configured" scope skips it entirely: core services (always
// free), LLM chat-provider aliases (a static curated entry set, no I/O), and
// whatever a credentialed provider's own module exports directly. A provider
// with neither simply contributes no operations to this scope — the default
// (unscoped) list is still the place that finds them via the catalog.

const configuredToolListCache = new Map<string, CachedToolList>();

async function discoverConfiguredTools(workspaceId: string): Promise<ToolEntry[]> {
  const now = Date.now();
  const cached = configuredToolListCache.get(workspaceId);
  if (cached && cached.expiresAt > now) {
    return cached.tools;
  }

  const credStore = getCredentialStore();
  const credentials = await credStore.list(workspaceId);
  const providers = Array.from(new Set(credentials.map((c) => c.provider)));

  const tools: ToolEntry[] = [...coreToolEntries()];

  const connected = new Set(providers);
  for (const namespace of await interfaceNamespaces(workspaceId, connected)) {
    tools.push(...(await interfaceToolEntries(workspaceId, namespace)));
  }

  for (const provider of providers) {
    if (!shouldListCredentialAsProvider(provider)) continue;
    if (isLlmProvider(provider)) {
      tools.push(...llmToolEntries(provider));
      continue;
    }
    try {
      const mod = await getProviderModule(provider);
      const entries = deriveToolEntries(provider, mod);
      if (entries.length > 0) {
        tools.push(...entries);
        continue;
      }
    } catch {
      // Module unresolvable — fall through to the catalog below.
    }
    // A credentialed provider MUST appear in the configured scope — it is
    // the definition of "configured". The catalog fetch here is bounded by
    // the workspace's credential count (a handful), not the whole catalog,
    // so the fast path stays fast; silently dropping a connected provider
    // (as this branch originally did) made GitHub vanish from chat's
    // services panel.
    try {
      tools.push(...(await catalogToolEntries(provider)));
    } catch {
      // Catalog unreachable — surface the namespace at least, so the
      // provider is visibly connected even without per-tool metadata.
      tools.push({
        provider,
        name: `${provider}.*`,
        operation: "*",
        description: `${provider} (connected — tool metadata unavailable)`,
      });
    }
  }

  configuredToolListCache.set(workspaceId, { tools, expiresAt: now + getToolListTtlMs() });
  return tools;
}

toolsRouter.get("/", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  const tools =
    c.req.query("scope") === "configured"
      ? await discoverConfiguredTools(workspaceId)
      : await discoverTools(workspaceId);
  return c.json({ tools, workspace_id: workspaceId });
});

// ---------------------------------------------------------------------------
// GET /tools/namespaces — what *kind* each namespace is
// ---------------------------------------------------------------------------
//
// `GET /tools` answers "which operations can I call"; it does not answer
// "is `agents` a first-party service or someone's SaaS?". Clients were
// deciding that with their own hardcoded name lists, which silently
// misclassified every namespace shipped after the list was written. This is
// the server's answer, and it costs no catalog I/O: core services and
// interfaces are static, providers come from the credential list.

export type NamespaceKind = "core" | "interface" | "provider" | "llm-alias";

export interface NamespaceInfo {
  id: string;
  kind: NamespaceKind;
  label: string;
  description: string;
  /** Icon slug for core services and interfaces; providers carry their own art. */
  icon?: string;
  /** Interfaces: the compatible implementations and which one is in force. */
  compat?: Array<{ provider: string; label: string; connected: boolean }>;
  binding?: { provider: string; options?: Record<string, unknown> } | null;
  /** LLM aliases: the model used when a call names none. */
  defaultModel?: string;
}

async function describeNamespaces(workspaceId: string): Promise<NamespaceInfo[]> {
  const credentials = await getCredentialStore().list(workspaceId);
  const connected = new Set(credentials.map((credential) => credential.provider));
  const bindings = await readBindings(workspaceId);

  const namespaces: NamespaceInfo[] = coreServiceMeta().map((service) => ({
    id: service.id,
    kind: "core",
    label: service.label,
    description: service.blurb,
    icon: service.icon,
  }));

  // An interface is listed only when something can actually execute it —
  // otherwise every workspace would advertise a `sql` namespace that 400s.
  // Named instances are always listed: the workspace bound them on purpose.
  for (const namespace of await interfaceNamespaces(workspaceId, connected)) {
    const parsed = parseInterfaceNamespace(namespace);
    const def = parsed && listInterfaces().find((entry) => entry.id === parsed.interfaceId);
    if (!parsed || !def) continue;
    namespaces.push({
      id: namespace,
      kind: "interface",
      label: parsed.name ? `${def.label} · ${parsed.name}` : def.label,
      description: def.description,
      icon: "plug",
      compat: def.compat
        // Telemetry's `native` entry is the Activity core service, not a
        // connectable vendor — same INTERFACE_ONLY treatment as agent's
        // in-process runner, but filtered from listings so named instances
        // only offer real backends (datadog, sentry, …).
        .filter((entry) => !(parsed.interfaceId === "telemetry" && entry.provider === "native"))
        .map((entry) => ({
          provider: entry.provider,
          label: entry.label,
          // A credentialless implementation reads as connected because there is
          // nothing to connect; showing the gateway's own agent runner as
          // "not connected" next to the binding that resolves to it is the kind
          // of contradiction a panel should never render.
          connected: entry.credentialless === true || connected.has(entry.provider),
        })),
      binding: bindings[namespace] ?? null,
    });
  }

  for (const provider of connected) {
    if (!shouldListCredentialAsProvider(provider)) continue;
    const alias = resolveLlmProvider(provider);
    namespaces.push(
      alias
        ? {
            id: alias.id,
            kind: "llm-alias",
            label: alias.label,
            description: `OpenAI-compatible chat completions via ${alias.label}`,
            defaultModel: alias.defaultModel,
          }
        : { id: provider, kind: "provider", label: provider, description: "" },
    );
  }

  return namespaces;
}

toolsRouter.get("/namespaces", async (c) => {
  const workspaceId = c.get("principal").workspaceId;
  return c.json({ namespaces: await describeNamespaces(workspaceId), workspace_id: workspaceId });
});

toolsRouter.get("/search", async (c) => {
  const query = (c.req.query("q") ?? "").trim().toLowerCase();
  const tools = await discoverTools(c.get("principal").workspaceId);
  const matches = query
    ? tools.filter((tool) =>
        [tool.provider, tool.operation, tool.description]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query)),
      )
    : tools;
  return c.json({
    tools: matches.map((tool) => ({
      provider: tool.provider,
      operation: tool.operation,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  });
});

// ---------------------------------------------------------------------------
// POST /tools/:provider/:operation
// ---------------------------------------------------------------------------

toolsRouter.post("/:provider/:operation{.*}", rateLimitByUserId, async (c) => {
  const principal = c.get("principal");
  const callerId = principal.sub;
  const workspaceId = principal.workspaceId;

  let provider = c.req.param("provider");
  const operation = c.req.param("operation");

  // Dispatch span for the workspace telemetry store: the server is the single
  // writer for service-call spans; the optional X-Telemetry-Source header
  // carries the client's attribution (widget path, session, trace).
  // Telemetry's own calls are not recorded — observing the observer is noise.
  //
  // EVERY exit from this handler must record one. Because the browser skips
  // shipping its own service-call events (they would double-count against
  // these), a path that returns without recording is invisible to
  // `telemetry.query` — so an agent asked to debug a failing widget sees a
  // gap where the failure was. The early validation and credential-resolution
  // returns below used to be exactly that gap.
  const attribution = parseTelemetrySourceHeader(c.req.header("x-telemetry-source"));
  const recordDispatch = (status: number, durationMs: number, errorMessage?: string): void => {
    if (provider === "telemetry") return;
    void recordTelemetry(workspaceId, callerId, [
      {
        kind: "span",
        name: `${provider}.${operation}`,
        source: attribution?.source ?? { type: "tool" },
        ...(attribution?.traceId ? { traceId: attribution.traceId } : {}),
        durationMs,
        status: status < 400 ? "ok" : "error",
        ...(status >= 400
          ? { error: { message: errorMessage ?? `HTTP ${status}` } }
          : {}),
        attributes: { namespace: provider ?? "", procedure: operation ?? "", "http.status": status },
      },
    ]);
  };

  // Core services (events, keyvalue) are first-party: auto-tenanted by the
  // caller's workspace, open to any authed member, no credential or UTDK
  // module involved.
  const coreService = provider ? getCoreService(provider) : undefined;
  if (coreService && provider && operation) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    let body: ToolCallRequest;
    try {
      body = await c.req.json<ToolCallRequest>();
    } catch {
      recordDispatch(400, 0, "Expected { args }");
      return c.json({ error: "Expected { args }" }, 400);
    }
    try {
      const data = await coreService.call(
        {
          workspaceId,
          userId: callerId,
          // Export attribution: same X-Telemetry-Source the dispatch-span
          // writer already trusts (widget path / session).
          ...(provider === "telemetry" &&
          operation === "export" &&
          attribution?.source
            ? { telemetrySource: attribution.source }
            : {}),
        },
        operation,
        (body.args ?? {}) as Record<string, unknown>,
      );
      const durationMs = Date.now() - startTime;
      getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status: 200, durationMs });
      recordDispatch(200, durationMs);
      return c.json({ data, meta: { requestId, durationMs } });
    } catch (err) {
      const status = err instanceof ServiceError ? err.status : 500;
      const message = err instanceof Error ? err.message : String(err);
      getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status });
      recordDispatch(status, Date.now() - startTime, message);
      return c.json({ error: message }, status as 400);
    }
  }

  // Generic interfaces (llm, …) resolve to the workspace's bound
  // implementation and dispatch as that concrete provider — credential
  // lookup, alias resolution, permissions, and audit all see the real
  // provider id.
  let interfaceDefaults: Record<string, unknown> | undefined;
  let interfaceModule: string | undefined;
  let interfaceTimeoutMs: number | undefined;
  let interfaceBaseUrl: string | undefined;
  let interfaceModuleSpecifier: string | undefined;
  let interfaceCredentialId: string | undefined;
  // The agent interface's `native` entry is this process: dispatch
  // short-circuits in-process below (after authz + body validation), the
  // same way the workflow twin does in workflows/invoke.ts. No module, no
  // credential, no isolate.
  let nativeAgentInterface = false;
  if (provider && operation && parseInterfaceNamespace(provider)) {
    try {
      const resolved = await resolveInterfaceForWorkspace(workspaceId, provider);
      // An entry with no loadable module must not reach the isolate: the
      // loader's own error names a package subpath, not the thing that is
      // actually missing. See InterfaceCompat.unavailable.
      if (resolved.compat.unavailable) {
        throw new ServiceError(
          `${resolved.instance} resolves to ${resolved.compat.provider}: ${resolved.compat.unavailable}`,
          501,
        );
      }
      nativeAgentInterface =
        resolved.def.id === "agent" && resolved.compat.provider === "native";
      interfaceDefaults = resolved.def.defaultsFor.includes(operation)
        ? resolved.options
        : undefined;
      provider = resolved.compat.provider;
      interfaceModule = resolved.compat.module;
      interfaceTimeoutMs = resolved.def.timeoutMs;
      interfaceBaseUrl = resolved.baseUrl;
      interfaceModuleSpecifier = resolved.compat.moduleSpecifier;
      interfaceCredentialId = resolved.credentialId;
    } catch (err) {
      const status = err instanceof ServiceError ? err.status : 500;
      const message = err instanceof Error ? err.message : String(err);
      recordDispatch(status, 0, message);
      return c.json({ error: message }, status as 400);
    }
  }

  if (
    getAuthMode() === "oidc" &&
    !(await mayInvokeTool(principal, provider!, operation!))
  ) {
    const requestId = crypto.randomUUID();
    logMetadata({ requestId, workspaceId, callerId, provider: provider!, operation: operation!, status: 403 });
    getAuditStore().append({ requestId, workspaceId, callerId, provider: provider!, operation: operation!, status: 403 });
    recordDispatch(403, 0, "Forbidden: caller does not have permission for this operation");
    return c.json({ error: "Forbidden: caller does not have permission for this operation" }, 403);
  }

  if (!provider || !operation) {
    recordDispatch(400, 0, "Missing provider or operation");
    return c.json({ error: "Missing provider or operation" }, 400);
  }

  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  let body: ToolCallRequest;
  try {
    body = await c.req.json<ToolCallRequest>();
  } catch {
    recordDispatch(400, Date.now() - startTime, "Expected { args, credential? }");
    return c.json({ error: "Expected { args, credential? }" }, 400);
  }
  if (!body.args || typeof body.args !== "object" || Array.isArray(body.args)) {
    recordDispatch(400, Date.now() - startTime, "args must be an object");
    return c.json({ error: "args must be an object" }, 400);
  }
  // In-process short-circuit for the native agent runtime — the HTTP twin of
  // the one in workflows/invoke.ts, mirroring the core-service branch above:
  // no credential resolution (the runner is credentialless) and no isolate.
  if (nativeAgentInterface) {
    try {
      const nativeArgs = {
        ...(interfaceDefaults ?? {}),
        ...(body.args as Record<string, unknown>),
      };
      const { dispatchNativeAgentOp } = await import("../agents/runner.js");
      const data = await dispatchNativeAgentOp(
        { workspaceId, userId: callerId },
        operation,
        nativeArgs,
      );
      const durationMs = Date.now() - startTime;
      getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status: 200, durationMs });
      recordDispatch(200, durationMs);
      return c.json({ data, meta: { requestId, durationMs } });
    } catch (err) {
      const status = err instanceof ServiceError ? err.status : 500;
      const message = err instanceof Error ? err.message : String(err);
      getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status });
      recordDispatch(status, Date.now() - startTime, message);
      return c.json({ error: message }, status as 400);
    }
  }
  let credentials: CredentialPayload | undefined;
  if (body.credential) {
    if (process.env["GATEWAY_EPHEMERAL_CREDENTIALS"] === "0") {
      recordDispatch(403, Date.now() - startTime, "Ephemeral credentials are disabled");
      return c.json({ error: "Ephemeral credentials are disabled" }, 403);
    }
    credentials =
      body.credential.type === "bearer_token"
        ? { type: "bearer_token", token: body.credential.token ?? "" }
        : {
            type: "api_key",
            value: body.credential.value ?? "",
            headerName: body.credential.name,
          };
  } else {
    const store = getCredentialStore();
    let record: { id: string; payload: CredentialPayload } | undefined;
    try {
      // `interfaceCredentialId` is set when the namespace was an interface
      // instance pinned to one credential; otherwise this is the provider's
      // first credential, as it has always been.
      record = await resolveCredentialRecord(workspaceId, provider, interfaceCredentialId);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logMetadata({ requestId, workspaceId, callerId, provider, operation, status: 400 });
      getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status: 400 });
      recordDispatch(400, Date.now() - startTime, message);
      return c.json({ error: message }, 400);
    }
    if (record) {
      // OAuth payloads resolve to live bearer tokens here (client-credentials
      // grant or refresh); the executor only ever sees injectable credentials.
      try {
        credentials = await resolveToInjectable(record.payload, {
          cacheKey: `${workspaceId}:${provider}:${record.id}`,
          persist: (payload) => store.updatePayload(workspaceId, record.id, payload),
        });
      } catch (err) {
        const message =
          err instanceof OAuthExchangeError
            ? `OAuth token resolution failed for ${provider}: ${err.message}`
            : `OAuth token resolution failed for ${provider}`;
        logMetadata({ requestId, workspaceId, callerId, provider, operation, status: 502 });
        getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status: 502 });
        recordDispatch(502, Date.now() - startTime, message);
        return c.json({ error: message }, 502);
      }
    }
  }
  // Chat clients (AI SDK) send `stream: true` at the top level of the request;
  // provider chat-completion operations expect it inside their own arguments.
  let args = body.stream === true ? { ...body.args, stream: true } : body.args;
  // Interface binding defaults (e.g. model) fill in missing args only.
  if (interfaceDefaults) {
    args = { ...interfaceDefaults, ...args };
  }

  // LLM chat-provider aliases (synthetic.new, anthropic, …) execute through
  // their OpenAI-compatible module with the alias's base URL. Credentials are
  // stored under the alias id, so the resolution above already found them.
  const llmAlias = isLlmProvider(provider) ? resolveLlmProvider(provider) : undefined;
  if (llmAlias && operation === "createChatCompletion" && !("model" in args)) {
    args = { ...args, model: llmAlias.defaultModel };
  }

  // Execute via Isolate with telemetry
  const executor = await getExecutor();

  const runExecute = (): Promise<IsolateResult> =>
    withSpan<IsolateResult>(
      { provider, operation, spanName: `gateway ${provider} ${operation}` },
      async (span) => {
        span.setAttribute("caller_id", callerId);
        span.setAttribute("workspace_id", workspaceId);
        span.setAttribute("request_id", requestId);

        const r = await executor.execute({
          provider: interfaceModule ?? llmAlias?.module ?? provider,
          ...(interfaceModuleSpecifier ? { module: interfaceModuleSpecifier } : {}),
          operation,
          args,
          credentials,
          ...(interfaceBaseUrl ?? llmAlias?.baseUrl
            ? { baseUrl: (interfaceBaseUrl ?? llmAlias?.baseUrl)! }
            : {}),
          timeout: interfaceTimeoutMs ?? (llmAlias ? 120_000 : 30_000),
        });

        span.setAttribute("success", r.success);
        span.setAttribute("duration_ms", r.durationMs);
        if (!r.success) {
          span.setAttribute("error", r.error ?? "unknown");
        }
        return r;
      },
    );

  const finishLog = (result: IsolateResult): void => {
    // For streaming operations this measures time to first byte, not the full
    // stream duration — the response body is still being produced when we log.
    const durationMs = Date.now() - startTime;
    const status = result.success ? 200 : 500;
    logMetadata({ requestId, workspaceId, callerId, provider, operation, status, durationMs });
    getAuditStore().append({ requestId, workspaceId, callerId, provider, operation, status, durationMs });
    recordDispatch(status, durationMs, result.success ? undefined : (result.error ?? "Execution failed"));
  };

  // Chat completions requested with `stream: true` get their SSE response
  // OPENED IMMEDIATELY — before the upstream has answered. The gateway owns
  // client-facing streaming: some providers sit on a large prompt for over a
  // minute before sending response headers (observed: 79s on a widget-edit
  // prompt), and every hop between here and the browser has a
  // time-to-first-byte limit (CloudFront cuts the origin at 60s, the web
  // client aborts a headerless connect at 30s). Comment keepalives hold the
  // connection open while the upstream thinks; the upstream's bytes are piped
  // through when they arrive; a provider that ignored `stream` and answered
  // with buffered JSON is re-emitted as one SSE event. SSE parsers ignore
  // `:` comment lines by spec, so keepalives are invisible to clients.
  if (llmAlias && operation === "createChatCompletion" && args["stream"] === true) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const keepalive = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(`: keepalive ${Date.now()}\n\n`));
          } catch {
            clearInterval(keepalive);
          }
        }, 15_000);
        try {
          const result = await runExecute();
          finishLog(result);
          if (!result.success) {
            // The 200 is already on the wire — the error travels in-band as
            // the standard OpenAI-style SSE error chunk clients parse.
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: { message: result.error ?? "Execution failed" } })}\n\n`,
              ),
            );
            return;
          }
          const streamBody = asStreamBody(result.data);
          if (streamBody) {
            const reader = streamBody.stream.getReader();
            for (;;) {
              const { value, done } = await reader.read();
              if (done) break;
              if (value) controller.enqueue(value);
            }
            return;
          }
          // Upstream ignored `stream`: hand the buffered completion over as
          // a single SSE event so the client's stream reader still works.
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(result.data)}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: { message: err instanceof Error ? err.message : String(err) } })}\n\n`,
            ),
          );
        } finally {
          clearInterval(keepalive);
          try {
            controller.close();
          } catch {
            // Already closed (client went away mid-stream).
          }
        }
      },
    });
    return c.newResponse(stream, 200, { ...SSE_HEADERS });
  }

  const isolateResult = await runExecute();
  const durationMs = Date.now() - startTime;
  finishLog(isolateResult);

  if (!isolateResult.success) {
    return c.json({ error: isolateResult.error ?? "Execution failed" }, 500);
  }

  // Streaming results from non-chat operations are passed through as-is —
  // typically SSE — rather than JSON-buffered. Requires Lambda response
  // streaming to reach the client incrementally (see src/server.ts and
  // infra/src/workspace-service.ts).
  const streamBody = asStreamBody(isolateResult.data);
  if (streamBody) {
    return c.newResponse(streamBody.stream, 200, streamBody.headers);
  }

  return c.json({ data: isolateResult.data, meta: { requestId, durationMs } });
});

// ---------------------------------------------------------------------------
// Streaming pass-through helpers
// ---------------------------------------------------------------------------

const SSE_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
};

interface StreamBody {
  stream: ReadableStream<Uint8Array>;
  headers: Record<string, string>;
}

function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === "function"
  );
}

/**
 * Detect a streaming execution result and normalize it to a byte stream plus
 * response headers. Handles the shapes provider modules can hand back:
 * a fetch `Response` (raw SSE from the upstream API), a bare `ReadableStream`,
 * or an async-iterable SDK stream (e.g. OpenAI chunk objects, which are
 * re-encoded as SSE `data:` events). Returns undefined for plain JSON data.
 */
function asStreamBody(data: unknown): StreamBody | undefined {
  if (data instanceof Response) {
    if (!data.body) return undefined;
    return {
      stream: data.body,
      headers: {
        ...SSE_HEADERS,
        "Content-Type": data.headers.get("content-type") ?? SSE_HEADERS["Content-Type"]!,
      },
    };
  }
  if (data instanceof ReadableStream) {
    return { stream: data, headers: { ...SSE_HEADERS } };
  }
  if (isAsyncIterable(data)) {
    return { stream: sseFromAsyncIterable(data), headers: { ...SSE_HEADERS } };
  }
  return undefined;
}

/**
 * Encode an async-iterable stream as SSE. String and byte chunks are assumed
 * to already be wire-format (pre-encoded SSE) and pass through untouched;
 * object chunks become `data: <json>` events, terminated by `data: [DONE]`
 * to match the OpenAI-style contract chat clients expect.
 */
function sseFromAsyncIterable(iterable: AsyncIterable<unknown>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const iterator = iterable[Symbol.asyncIterator]();
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }
      if (value instanceof Uint8Array) {
        controller.enqueue(value);
      } else if (typeof value === "string") {
        controller.enqueue(encoder.encode(value));
      } else {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(value)}\n\n`));
      }
    },
    async cancel(reason) {
      await iterator.return?.(reason);
    },
  });
}

// ---------------------------------------------------------------------------
// Logging helper — logs metadata only (no credential values, no request/response bodies)
// ---------------------------------------------------------------------------

interface RequestMetadata {
  requestId: string;
  workspaceId: string;
  callerId: string;
  provider: string;
  operation: string;
  status: number;
  durationMs?: number;
}

function logMetadata(meta: RequestMetadata): void {
  // Structured log line; omit all sensitive fields
  const entry = {
    ts: new Date().toISOString(),
    type: "gateway_request",
    ...meta,
  };
  // Use stderr for structured logs so stdout can remain clean for piping
  process.stderr.write(JSON.stringify(entry) + "\n");
}
