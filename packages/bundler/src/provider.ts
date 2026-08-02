import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { assertValidProviderName } from "./naming.js";

export type RegistryProvider = {
  name: string;
  options?: RegistryProviderOptions;
  transport_type?: string;
  fetch_method?: string;
  url: string;
  content_type?: string;
  /** Ingest source for provenance tracking. Defaults to "manual". */
  ingestSource?: string;
  metadata?: RegistryProviderMetadata;
  provenance?: RegistryProviderProvenance;
  branding?: RegistryProviderBranding;
};

export type RegistryProviderMetadata = {
  description?: string;
  category?: string;
  last_updated?: string;
  maintainer?: string;
  documentation_url?: string;
  version?: string;
  openapi_version?: string;
};

/**
 * Chain of ownership for a provider. Links must point at the upstream vendor
 * (origin spec + domain), never at an aggregator we happened to ingest through
 * (the aggregator is recorded separately as `source`).
 */
export type RegistryProviderProvenance = {
  /** Ingest script/source that produced this entry (e.g. "apis-guru", "manual"). */
  source: string;
  /** Vendor domain that owns the API (e.g. "github.com"). */
  originDomain?: string;
  /** The vendor's original OpenAPI spec URL, as published by them. */
  originSpecUrl?: string;
  /** Sub-service under the origin domain (e.g. "api.github.com"). */
  service?: string;
  /** ISO timestamp of when this entry was ingested/refreshed. */
  retrievedAt?: string;
};

export type RegistryProviderBranding = {
  /** Provider logo URL. */
  logo?: string;
  /** Vendor website (marketing/home), preferred link target for the provider. */
  site?: string;
};

export type RegistryProviderAuthOption = Record<string, unknown>;

export type RegistryProviderOptions = {
  auth?: RegistryProviderAuthOption | RegistryProviderAuthOption[];
  openapi?: RegistryProviderOpenApiOptions;
  operations?: RegistryProviderOperationsOptions;
};

export type RegistryProviderOpenApiOptions = {
  icon?: string;
};

export type RegistryProviderOperationsOptions = {
  stripPrefix?: string;
};

export const REGISTRY_PATH = resolveRepoPath("data", "registry.json");
export const DEFAULT_OUTPUT_ROOT = resolveRepoPath("packages", "utdk");
export const DEFAULT_DOCS_CACHE_ROOT = resolveRepoPath(".registry");

export function resolveRepoPath(...segments: string[]): string {
  return path.join(fileURLToPath(new URL("../../..", import.meta.url)), ...segments);
}

/**
 * Provider names split on `/` only. Dots are not a separator in provider
 * identity — they belong to the tool surface (`github.repos.get`); the
 * naming authority (naming.ts) guarantees names never contain them.
 */
export function splitProviderName(providerName: string): string[] {
  const segments = providerName
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  return segments.length > 0 ? segments : [providerName];
}

export function normalizeProviderName(providerName: string): string {
  return splitProviderName(providerName).join("/");
}

export function getProviderPackageRootName(providerName: string): string {
  return splitProviderName(providerName)[0] ?? providerName;
}

export function getProviderPackageSubpath(providerName: string): string | undefined {
  const segments = splitProviderName(providerName);
  return segments.length > 1 ? segments.slice(1).join("/") : undefined;
}

export function getProviderPackageName(providerName: string): string {
  return `@utdk/${getProviderPackageRootName(providerName)}`;
}

/**
 * Import specifier consumers use for a provider's client.
 * Top-level providers are scoped packages (@utdk/github); vendor-suite
 * services are subpaths of the root "utdk" package (utdk/google/drive).
 */
export function getProviderImportSpecifier(providerName: string): string {
  const segments = splitProviderName(providerName);
  return segments.length > 1 ? `utdk/${segments.join("/")}` : `@utdk/${segments.join("/")}`;
}

export function getProviderClientImportPath(providerName: string): string {
  return `${"../".repeat(splitProviderName(providerName).length)}client.js`;
}

export function getPrimaryProviderAuthOption(
  providerOptions?: RegistryProviderOptions,
): RegistryProviderAuthOption | undefined {
  return getProviderAuthOptions(providerOptions)[0];
}

export function getProviderAuthOptions(
  providerOptions?: RegistryProviderOptions,
): RegistryProviderAuthOption[] {
  const auth = providerOptions?.auth;

  if (!auth) {
    return [];
  }

  return Array.isArray(auth) ? auth : [auth];
}

function getProviderToolPrefixes(providerName: string): string[] {
  const normalizedProviderName = normalizeProviderName(providerName);
  const dottedProviderName = normalizedProviderName.replace(/\//g, ".");

  return [...new Set([providerName, normalizedProviderName, dottedProviderName])]
    .filter(Boolean)
    .map((prefix) => `${prefix}.`);
}

function stripCustomOperationPrefix(
  toolName: string,
  providerOptions?: RegistryProviderOptions,
): string {
  const stripPrefix = providerOptions?.operations?.stripPrefix?.trim();

  return stripPrefix && toolName.startsWith(stripPrefix) ? toolName.slice(stripPrefix.length) : toolName;
}

export function stripProviderToolName(toolName: string, provider: Pick<RegistryProvider, "name" | "options">): string {
  for (const prefix of getProviderToolPrefixes(provider.name)) {
    if (toolName.startsWith(prefix)) {
      return stripCustomOperationPrefix(toolName.slice(prefix.length), provider.options);
    }
  }

  const fallbackSegments = toolName.split(".");
  const fallbackToolName = fallbackSegments.length > 1 ? fallbackSegments.slice(1).join(".") : toolName;
  return stripCustomOperationPrefix(fallbackToolName, provider.options);
}

export async function loadRegistryProviders(): Promise<RegistryProvider[]> {
  const rawRegistry = await readFile(REGISTRY_PATH, "utf8");
  const providers = JSON.parse(rawRegistry) as RegistryProvider[];
  // A hand-edited dotted (or otherwise malformed) name must fail here, at
  // load time — not later, as a mis-split directory during generation.
  for (const provider of providers) {
    assertValidProviderName(provider.name);
  }
  return providers;
}

export function resolveProvider(providers: RegistryProvider[], providerName: string): RegistryProvider {
  const normalizedProviderName = normalizeProviderName(providerName);
  const provider = providers.find((entry) => normalizeProviderName(entry.name) === normalizedProviderName);

  if (!provider) {
    throw new Error(`Provider "${providerName}" was not found in ${REGISTRY_PATH}.`);
  }

  if (!provider.url) {
    throw new Error(`Provider "${providerName}" is missing a URL in ${REGISTRY_PATH}.`);
  }

  const providerType = provider.transport_type ?? "http";
  if (providerType !== "http" && providerType !== "local") {
    throw new Error(`Provider "${providerName}" uses unsupported type "${provider.transport_type}".`);
  }

  return provider;
}

export function resolveProviderOutputDir(providerName: string, outputRoot: string): string {
  return path.join(outputRoot, ...splitProviderName(providerName));
}

export function resolveProviderPackageRootDir(providerName: string, outputRoot: string): string {
  return path.join(outputRoot, getProviderPackageRootName(providerName));
}

export function resolveProviderDocsCacheDir(providerName: string, docsCacheRoot = DEFAULT_DOCS_CACHE_ROOT): string {
  return path.join(docsCacheRoot, ...splitProviderName(providerName));
}

export function resolveProviderDocsManifestPath(providerName: string, docsCacheRoot = DEFAULT_DOCS_CACHE_ROOT): string {
  return path.join(resolveProviderDocsCacheDir(providerName, docsCacheRoot), "manifest.json");
}

export function resolveProviderDocsSourcesDir(providerName: string, docsCacheRoot = DEFAULT_DOCS_CACHE_ROOT): string {
  return path.join(resolveProviderDocsCacheDir(providerName, docsCacheRoot), "sources");
}

export function resolveProviderDocsIndexPath(providerName: string, docsCacheRoot = DEFAULT_DOCS_CACHE_ROOT): string {
  return path.join(resolveProviderDocsCacheDir(providerName, docsCacheRoot), "index.md");
}

export function resolveProviderDocsOutputDir(providerName: string, outputRoot = DEFAULT_OUTPUT_ROOT): string {
  return path.join(resolveProviderOutputDir(providerName, outputRoot), "docs");
}
