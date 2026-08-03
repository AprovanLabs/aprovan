/**
 * Shared LRU provider client cache.
 *
 * Builds provider clients lazily on first use and caches them so that
 * high-use providers stay hot across warm invocations while rarely-used
 * ones are evicted. Per-session credentials are injected at call time.
 *
 * The provider module LRU (for the DirectExecutor) lives in isolate.ts.
 * This module provides a higher-level "built client" cache for cases
 * where callers want a pre-constructed client object rather than the raw module.
 */

import { createRequire } from "node:module";

// Load utdk registry.json via require so we don't need it in the utdk exports map.
const _require = createRequire(import.meta.url);
interface RegistryJson {
  schemaVersion: string;
  providers: Record<string, { packageName: string; generatedAt: string; bundlerVersion?: string }>;
}

// ---------------------------------------------------------------------------
// Simple LRU map (no external dependency required)
// ---------------------------------------------------------------------------

class LRUMap<K, V> {
  private readonly map = new Map<K, V>();
  constructor(private readonly maxSize: number) {}

  get(key: K): V | undefined {
    const v = this.map.get(key);
    if (v === undefined) return undefined;
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.maxSize) {
      this.map.delete(this.map.keys().next().value!);
    }
    this.map.set(key, value);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): void {
    this.map.delete(key);
  }

  get size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }
}

// ---------------------------------------------------------------------------
// Provider client LRU cache (shared across sessions)
// ---------------------------------------------------------------------------

const CLIENT_CACHE = new LRUMap<string, unknown>(50);

let _buildCallCount = 0;

/** Exposed for tests to verify caching behaviour. */
export function getClientBuildCount(): number {
  return _buildCallCount;
}

export function resetClientBuildCount(): void {
  _buildCallCount = 0;
}

/**
 * Build or retrieve a cached provider client.
 *
 * The returned client is the "base" client with no credentials injected.
 * Callers should inject per-session credentials at the operation call site.
 */
export async function getOrBuildClient(provider: string): Promise<unknown> {
  const cached = CLIENT_CACHE.get(provider);
  if (cached !== undefined) return cached;

  _buildCallCount++;

  const mod = await import(/* @vite-ignore */ `@utdk/clients/${provider}`) as Record<string, unknown>;
  const factoryName = toClientFactoryName(provider);
  const factory = mod[factoryName] as ((opts?: unknown) => Promise<unknown>) | undefined;

  if (typeof factory !== "function") {
    throw new Error(`Provider "${provider}" does not export "${factoryName}"`);
  }

  const client = await factory();
  CLIENT_CACHE.set(provider, client);
  return client;
}

function toClientFactoryName(provider: string): string {
  // Split on "/" and "." too — suite providers ("google/books") pascal-case
  // per segment, matching the bundler's generated createGoogleBooksClient.
  const pascalCase = provider
    .split(/[-_/.]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
  return `create${pascalCase}Client`;
}

// ---------------------------------------------------------------------------
// Reset helpers (used in tests)
// ---------------------------------------------------------------------------

export function resetToolCache(): void {
  CLIENT_CACHE.clear();
  _buildCallCount = 0;
}

// Re-export registry type for consumers that need to enumerate providers.
export function getRegistryProviders(): string[] {
  try {
    const reg = _require("@utdk/clients/registry.json") as RegistryJson;
    return Object.keys(reg.providers ?? {});
  } catch {
    return [];
  }
}
