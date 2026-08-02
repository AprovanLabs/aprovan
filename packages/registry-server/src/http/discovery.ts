/**
 * Tenant-scoped tool discovery — ported from routes/tools.ts, minus the
 * product-plane public-catalog network fallback. Sources, in order:
 * native-service entries, interface entries (borrowed from the resolved
 * implementation's module, or the llm/agent contracts' self-describing
 * sets), credentialed providers (module `tools` export, llm-alias curated
 * set, or a visibility placeholder).
 *
 * Results are cached per TENANT with a TTL; mutations to credentials or
 * profiles invalidate the tenant's entry.
 */

import { agentToolEntries as agentDiscoveryEntries } from "@utdk/agent";
import { llmToolEntries as llmDiscoveryEntries } from "@utdk/llm";
import { findLlmAlias, type InterfaceCatalog, type InterfaceDef } from "../catalog/types.js";
import { resolveProfile, type ResolveDeps, type ResolvedProfile } from "../profiles/resolve.js";
import type { CallContext } from "../config/types.js";
import type { CredentialService } from "../credentials/service.js";
import type { NativeServiceRegistry, ToolEntry } from "../kernel/index.js";
import type { ProviderExecutor, ProviderModule } from "../executor/index.js";
import type { ProfileStore } from "../storage/types.js";

const DEFAULT_TOOL_LIST_TTL_MS = 5 * 60 * 1000;

function ttlMs(): number {
  const raw = Number(process.env["TOOL_LIST_CACHE_TTL_MS"]);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_TOOL_LIST_TTL_MS;
}

// ---------------------------------------------------------------------------
// Entry derivation (ported)
// ---------------------------------------------------------------------------

function deriveToolEntries(provider: string, mod: ProviderModule): ToolEntry[] {
  const entries: ToolEntry[] = [];
  const toolsExport = mod["tools"];
  if (Array.isArray(toolsExport)) {
    for (const t of toolsExport) {
      if (!t || typeof t !== "object") continue;
      const entry = t as Record<string, unknown>;
      const name = typeof entry["name"] === "string" ? entry["name"] : "";
      if (!name) continue;
      const operation = name.startsWith(`${provider}.`) ? name.slice(provider.length + 1) : name;
      entries.push({
        provider,
        name,
        operation,
        ...(typeof entry["description"] === "string"
          ? { description: entry["description"] as string }
          : {}),
        inputSchema: entry["inputSchema"],
        outputSchema: entry["outputSchema"],
      });
    }
  }
  return entries;
}

/** Re-label a contract package's entries onto a namespace, length-safe. */
function relabelEntries(
  namespace: string,
  entries: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }>,
): ToolEntry[] {
  return entries.map((entry) => ({
    provider: namespace,
    name: entry.name,
    // Strip the namespace by length, not by the first dot: namespaces
    // contain dots of their own (`synthetic.new`).
    operation: entry.name.startsWith(`${namespace}.`)
      ? entry.name.slice(namespace.length + 1)
      : entry.name.slice(entry.name.indexOf(".") + 1),
    description: entry.description,
    inputSchema: entry.inputSchema,
  }));
}

// ---------------------------------------------------------------------------
// Discovery service
// ---------------------------------------------------------------------------

export interface DiscoveryDeps {
  catalog: InterfaceCatalog;
  natives: NativeServiceRegistry;
  credentials: CredentialService;
  profiles: ProfileStore;
  executor: ProviderExecutor;
  resolveDeps: ResolveDeps;
}

interface CachedToolList {
  tools: ToolEntry[];
  expiresAt: number;
}

export interface NamespaceInfo {
  id: string;
  kind: "core" | "interface" | "provider" | "llm-alias";
  label: string;
  description: string;
  icon?: string;
  /** Interfaces: the compatible implementations and which are connected. */
  compat?: Array<{ provider: string; label: string; connected: boolean }>;
  /** Profile names that exist for this target in the tenant. */
  profiles?: string[];
  /** LLM aliases: the model used when a call names none. */
  defaultModel?: string;
}

export class DiscoveryService {
  private readonly cache = new Map<string, CachedToolList>();

  constructor(private readonly deps: DiscoveryDeps) {}

  /** Drop a tenant's cached tool list (call on credential/profile change). */
  invalidate(tenantId: string): void {
    this.cache.delete(tenantId);
  }

  reset(): void {
    this.cache.clear();
  }

  /**
   * Resolve an interface for discovery purposes, admin-eyed (grant checks do
   * not shape visibility here; dispatch enforces them). Returns undefined
   * when nothing can execute the interface — an advertised tool is a called
   * tool, so unresolvable/unavailable interfaces contribute nothing.
   */
  private async resolveForDiscovery(
    ctx: CallContext,
    def: InterfaceDef,
  ): Promise<ResolvedProfile | undefined> {
    try {
      return await resolveProfile(
        { ...this.deps.resolveDeps, authMode: "none" },
        { ...ctx, role: "admin" },
        def.id,
      );
    } catch {
      return undefined;
    }
  }

  private async interfaceEntries(ctx: CallContext, def: InterfaceDef): Promise<ToolEntry[]> {
    const resolved = await this.resolveForDiscovery(ctx, def);
    if (!resolved) return [];
    if (def.id === "llm") {
      return relabelEntries(def.id, llmDiscoveryEntries(def.id, { interfaceNamespace: true }));
    }
    if (def.id === "agent") {
      return relabelEntries(def.id, agentDiscoveryEntries(def.id, { interfaceNamespace: true }));
    }
    if (resolved.module === "native") return []; // host-process implementation; host advertises
    try {
      const mod = await this.deps.executor.getModule(resolved.module, resolved.moduleSpecifier);
      return deriveToolEntries(resolved.provider, mod).map((entry) => ({
        ...entry,
        provider: def.id,
        name: `${def.id}.${entry.operation}`,
      }));
    } catch {
      // Unresolvable module: the interface still dispatches (and reports its
      // own error there); it just contributes no schemas here.
      return [];
    }
  }

  private llmAliasEntries(providerId: string): ToolEntry[] {
    const alias = findLlmAlias(this.deps.catalog, providerId);
    return relabelEntries(
      providerId,
      llmDiscoveryEntries(providerId, {
        ...(alias ? { label: alias.label, defaultModel: alias.defaultModel } : {}),
      }),
    );
  }

  async discover(ctx: CallContext): Promise<ToolEntry[]> {
    const cached = this.cache.get(ctx.tenantId);
    const now = Date.now();
    if (cached && cached.expiresAt > now) return cached.tools;

    const tools: ToolEntry[] = [...this.deps.natives.toolEntries()];

    const credentials = await this.deps.credentials.list(ctx.tenantId);
    const providers = Array.from(new Set(credentials.map((c) => c.provider)));

    for (const def of this.deps.catalog.interfaces) {
      tools.push(...(await this.interfaceEntries(ctx, def)));
    }

    for (const provider of providers) {
      if (findLlmAlias(this.deps.catalog, provider)) {
        tools.push(...this.llmAliasEntries(provider));
        continue;
      }
      let entries: ToolEntry[] = [];
      try {
        const mod = await this.deps.executor.getModule(provider);
        entries = deriveToolEntries(provider, mod);
      } catch {
        // Module unresolvable — fall through to the visibility placeholder.
      }
      if (entries.length === 0) {
        // A credentialed provider MUST appear — it is the definition of
        // "connected" — even without per-tool metadata.
        entries = [
          {
            provider,
            name: `${provider}.*`,
            operation: "*",
            description: `${provider} (connected — tool metadata unavailable)`,
          },
        ];
      }
      tools.push(...entries);
    }

    this.cache.set(ctx.tenantId, { tools, expiresAt: now + ttlMs() });
    return tools;
  }

  async namespaces(ctx: CallContext): Promise<NamespaceInfo[]> {
    const credentials = await this.deps.credentials.list(ctx.tenantId);
    const connected = new Set(credentials.map((c) => c.provider));
    const infos: NamespaceInfo[] = this.deps.natives.meta().map((meta) => ({
      id: meta.id,
      kind: "core",
      label: meta.label,
      description: meta.blurb,
      icon: meta.icon,
    }));

    for (const def of this.deps.catalog.interfaces) {
      const executable =
        def.compat.some((entry) => entry.credentialless || connected.has(entry.provider)) ||
        (await this.deps.profiles.namesForTarget(ctx.tenantId, "interface", def.id)).length > 0;
      if (!executable) continue;
      infos.push({
        id: def.id,
        kind: "interface",
        label: def.label,
        description: def.description,
        icon: "plug",
        compat: def.compat.map((entry) => ({
          provider: entry.provider,
          label: entry.label,
          connected: entry.credentialless === true || connected.has(entry.provider),
        })),
        profiles: await this.deps.profiles.namesForTarget(ctx.tenantId, "interface", def.id),
      });
    }

    for (const provider of connected) {
      const alias = findLlmAlias(this.deps.catalog, provider);
      const profiles = await this.deps.profiles.namesForTarget(ctx.tenantId, "provider", provider);
      infos.push(
        alias
          ? {
              id: alias.id,
              kind: "llm-alias",
              label: alias.label,
              description: `OpenAI-compatible chat completions via ${alias.label}`,
              defaultModel: alias.defaultModel,
              profiles,
            }
          : { id: provider, kind: "provider", label: provider, description: "", profiles },
      );
    }

    return infos;
  }
}
