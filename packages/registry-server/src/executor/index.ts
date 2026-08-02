/**
 * ProviderExecutor — the in-process provider executor (tech-plan D5;
 * decision 1 final). The renamed direct executor from
 * apps/workspace/src/isolate.ts:
 *
 * - Provider modules load on first use via dynamic import and live in an LRU
 *   cache keyed by IMPORT SPECIFIER (`utdk/<p>` or the explicit
 *   `moduleSpecifier`) — first-party modules and catalogue providers must
 *   not collide. Cap configurable (default 20).
 * - Client objects are constructed per call with the call's injected
 *   credential and baseUrl, and are NEVER cached — a shared client cache is a
 *   cross-tenant credential hazard.
 * - The catalogue guard refuses unknown namespaces before the module loader.
 * - Knows nothing about tenants or profiles.
 */

import { createRequire } from "node:module";
import type { InjectableCredential } from "../credentials/types.js";

// ---------------------------------------------------------------------------
// Contract (normative — tech-plan "Executor contract")
// ---------------------------------------------------------------------------

export interface ExecuteOptions {
  /** Decides the client factory name (createGithubClient). */
  provider: string;
  /** Import specifier when not utdk/<provider> (first-party). */
  module?: string;
  /** Dot path. */
  operation: string;
  args: Record<string, unknown>;
  /** bearer_token | api_key ONLY (OAuth pre-resolved). */
  credentials?: InjectableCredential;
  baseUrl?: string;
  /** default 30_000 */
  timeout?: number;
}

export interface ExecuteResult {
  success: boolean;
  data?: unknown;
  error?: string;
  durationMs: number;
}

export interface ProviderModule {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Catalogue guard
// ---------------------------------------------------------------------------

const _require = createRequire(import.meta.url);

interface RegistryJson {
  providers?: Record<string, unknown>;
}

let catalogueProviders: Set<string> | undefined;

/**
 * Provider ids in the utdk catalogue. Empty when the registry manifest is
 * unresolvable (utdk not built, as in unit tests) — the guard then stands
 * down rather than rejecting everything.
 */
export function getRegistryProviders(): string[] {
  try {
    const reg = _require("utdk/registry.json") as RegistryJson;
    return Object.keys(reg.providers ?? {});
  } catch {
    return [];
  }
}

export function isCatalogueProvider(provider: string): boolean {
  catalogueProviders ??= new Set(getRegistryProviders());
  return catalogueProviders.size === 0 || catalogueProviders.has(provider);
}

/** Tests: force the guard to re-read the manifest. */
export function resetCatalogueGuard(): void {
  catalogueProviders = undefined;
}

function assertCatalogueProvider(provider: string): void {
  if (isCatalogueProvider(provider)) return;
  throw new Error(
    `Unknown tool namespace "${provider}": not a provider in the UTDK catalogue, ` +
      `and not a native service or interface this server recognizes.`,
  );
}

// ---------------------------------------------------------------------------
// Helpers (ported verbatim)
// ---------------------------------------------------------------------------

function buildAuthHeaders(payload: InjectableCredential | undefined): Record<string, string> {
  if (!payload) return {};
  switch (payload.type) {
    case "bearer_token":
      return { Authorization: `Bearer ${payload.token}` };
    case "api_key":
      return { [payload.headerName ?? "X-Api-Key"]: payload.value };
  }
}

/** "google/books" → "createGoogleBooksClient" (split on -, _, /, .). */
export function toClientFactoryName(provider: string): string {
  const pascalCase = provider
    .split(/[-_/.]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join("");
  return `create${pascalCase}Client`;
}

// ---------------------------------------------------------------------------
// Executor
// ---------------------------------------------------------------------------

const DEFAULT_CACHE_SIZE = 20;
const DEFAULT_TIMEOUT_MS = 30_000;

export class ProviderExecutor {
  /** LRU keyed by import specifier; Map insertion order tracks recency. */
  private readonly cache = new Map<string, ProviderModule>();
  private readonly maxSize: number;

  constructor(options: { cacheSize?: number } = {}) {
    this.maxSize =
      options.cacheSize && options.cacheSize > 0 ? options.cacheSize : DEFAULT_CACHE_SIZE;
  }

  /** The cache key for a load: the exact import specifier. */
  static specifierFor(provider: string, moduleSpecifier?: string): string {
    return moduleSpecifier ?? `utdk/${provider}`;
  }

  async getModule(provider: string, moduleSpecifier?: string): Promise<ProviderModule> {
    const specifier = ProviderExecutor.specifierFor(provider, moduleSpecifier);
    const cached = this.cache.get(specifier);
    if (cached) {
      // Move to most-recently-used position.
      this.cache.delete(specifier);
      this.cache.set(specifier, cached);
      return cached;
    }
    // Two import forms, one cache. The template-literal form keeps the
    // 49-provider catalogue out of every consumer's type graph.
    if (!moduleSpecifier) assertCatalogueProvider(provider);
    const mod = moduleSpecifier
      ? ((await import(/* @vite-ignore */ moduleSpecifier)) as ProviderModule)
      : ((await import(`utdk/${provider}`)) as ProviderModule);
    this.put(specifier, mod);
    return mod;
  }

  private put(specifier: string, mod: ProviderModule): void {
    this.cache.delete(specifier);
    this.cache.set(specifier, mod);
    while (this.cache.size > this.maxSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest === undefined) break;
      this.cache.delete(oldest);
    }
  }

  /** Test seam: inject a module without the real dynamic import. */
  setModuleForTesting(specifier: string, mod: ProviderModule): void {
    this.put(specifier, mod);
  }

  isCached(specifier: string): boolean {
    return this.cache.has(specifier);
  }

  reset(): void {
    this.cache.clear();
  }

  async execute(options: ExecuteOptions): Promise<ExecuteResult> {
    const start = Date.now();
    try {
      const mod = await this.getModule(options.provider, options.module);

      // The named client factory export lets us inject credentials at
      // construction time; the client is per-call, never cached.
      const factoryName = toClientFactoryName(options.provider);
      const factory = mod[factoryName] as
        | ((opts?: { headers?: Record<string, string>; baseUrl?: string }) => Promise<unknown>)
        | undefined;
      if (typeof factory !== "function") {
        throw new Error(`Provider "${options.provider}" does not export "${factoryName}"`);
      }

      const authHeaders = buildAuthHeaders(options.credentials);
      const client = (await factory({
        headers: authHeaders,
        ...(options.baseUrl ? { baseUrl: options.baseUrl } : {}),
      })) as Record<string, unknown>;

      const clientKeys = Object.keys(client);
      const parts = options.operation.split(".");
      let current: unknown = client;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]!;
        if (current == null || typeof current !== "object") {
          const resolvedPath = parts.slice(0, i).join(".");
          throw new Error(
            `Operation path "${options.operation}" not found on provider "${options.provider}": ` +
              `"${part}" is not accessible after "${resolvedPath || "(root)"}". ` +
              `Available keys at root: [${clientKeys.slice(0, 10).join(", ")}${clientKeys.length > 10 ? "..." : ""}]`,
          );
        }
        current = (current as Record<string, unknown>)[part];
      }
      if (typeof current !== "function") {
        throw new Error(
          `Operation "${options.operation}" is not a function on provider "${options.provider}"`,
        );
      }

      const timeoutMs = options.timeout ?? DEFAULT_TIMEOUT_MS;
      let timer: NodeJS.Timeout | undefined;
      const result = await Promise.race([
        (current as (...args: unknown[]) => Promise<unknown>)(options.args),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () =>
              reject(
                new Error(
                  `${options.provider}.${options.operation} timed out after ${timeoutMs}ms`,
                ),
              ),
            timeoutMs,
          );
        }),
      ]).finally(() => clearTimeout(timer));

      return { success: true, data: result, durationMs: Date.now() - start };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: Date.now() - start,
      };
    }
  }
}
