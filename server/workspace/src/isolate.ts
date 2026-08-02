/**
 * Provider execution — now the `ProviderExecutor` in
 * `@aprovan/registry-server` (tech-plan D5: the direct executor renamed and
 * extracted; lazy import, LRU keyed by import specifier, catalogue guard,
 * per-call client construction). This module is the workspace-side adapter:
 * it preserves the historical `Isolate*` names and the provider-name-keyed
 * test seams every call site and test in this app uses.
 */

import {
  ProviderExecutor,
  type ExecuteResult,
  type ProviderModule,
} from "@aprovan/registry-server";
import type { CredentialPayload } from "./credentials.js";

export type { ProviderModule };

// ---------------------------------------------------------------------------
// Public interface (unchanged shape)
// ---------------------------------------------------------------------------

export interface IsolateExecuteOptions {
  /** @utdk provider name, e.g. "github" or "google/books". Also decides the
   *  client-factory export name (`createGithubClient`). */
  provider: string;
  /** Import specifier when the implementation is not in the UTDK catalogue. */
  module?: string;
  /** Dot-separated operation path, e.g. "repos.list". */
  operation: string;
  args: Record<string, unknown>;
  /** Credential payload to inject at call time (not via process.env). */
  credentials: CredentialPayload | undefined;
  /** API root override (OpenAI-SDK `baseURL` semantics). */
  baseUrl?: string;
  /** Execution timeout in ms (default: 30_000). */
  timeout?: number;
}

export type IsolateResult = ExecuteResult;

export interface IsolateExecutor {
  execute(options: IsolateExecuteOptions): Promise<IsolateResult>;
}

// ---------------------------------------------------------------------------
// The package executor, adapted
// ---------------------------------------------------------------------------

function getProviderCacheSize(): number | undefined {
  const raw = Number(process.env["PROVIDER_CACHE_SIZE"]);
  return Number.isFinite(raw) && raw > 0 ? raw : undefined;
}

let _packageExecutor: ProviderExecutor | undefined;

function packageExecutor(): ProviderExecutor {
  _packageExecutor ??= new ProviderExecutor(
    getProviderCacheSize() ? { cacheSize: getProviderCacheSize()! } : {},
  );
  return _packageExecutor;
}

class PackageBackedExecutor implements IsolateExecutor {
  async execute(options: IsolateExecuteOptions): Promise<IsolateResult> {
    // The package executor only accepts injectable credentials; OAuth
    // payloads are pre-resolved by every dispatch path before reaching here
    // (resolveToInjectable), so a stray OAuth payload is executed
    // credential-less exactly as the old direct executor did.
    const credentials =
      options.credentials &&
      (options.credentials.type === "bearer_token" || options.credentials.type === "api_key")
        ? options.credentials
        : undefined;
    return packageExecutor().execute({
      provider: options.provider,
      ...(options.module ? { module: options.module } : {}),
      operation: options.operation,
      args: options.args,
      ...(credentials ? { credentials } : {}),
      ...(options.baseUrl ? { baseUrl: options.baseUrl } : {}),
      ...(options.timeout !== undefined ? { timeout: options.timeout } : {}),
    });
  }
}

/**
 * Load a provider module by name via the package executor's LRU cache.
 */
export async function getProviderModule(
  provider: string,
  moduleSpecifier?: string,
): Promise<ProviderModule> {
  return packageExecutor().getModule(provider, moduleSpecifier);
}

/** Inject a provider module directly into the cache (test seam). */
export function setProviderModuleForTesting(provider: string, mod: ProviderModule): void {
  packageExecutor().setModuleForTesting(ProviderExecutor.specifierFor(provider), mod);
}

/** Whether a provider module is currently cached. */
export function isProviderCached(provider: string): boolean {
  return packageExecutor().isCached(ProviderExecutor.specifierFor(provider));
}

/** Drop every cached provider module (used in tests). */
export function resetProviderCache(): void {
  packageExecutor().reset();
}

/** Drop a single provider from the cache. */
export function invalidateProvider(provider: string): void {
  // The package cache has no single-key delete; a full reset is safe (cold
  // reloads are cheap and this only runs on registry updates/tests).
  packageExecutor().reset();
}

// ---------------------------------------------------------------------------
// Public factory (unchanged shape)
// ---------------------------------------------------------------------------

let _executor: IsolateExecutor | undefined;

export async function getExecutor(): Promise<IsolateExecutor> {
  _executor ??= new PackageBackedExecutor();
  return _executor;
}

/** Override the executor (used in tests). */
export function setExecutor(executor: IsolateExecutor): void {
  _executor = executor;
}

export function resetExecutor(): void {
  _executor = undefined;
}
