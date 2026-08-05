/**
 * Lazy provider type acquisition for the script editor.
 *
 * The dependency scan is a type-loading hint (tools-addressing D3): aliases found
 * in source are resolved through the namespace catalog's `globalAlias` map, and
 * only those canonical providers are fetched. Unknown aliases are skipped (cache
 * miss) — the editor keeps its ambient fallback rather than erroring.
 */

import {
  resolveOnDemandProviderMounts,
  type OnDemandProviderMountOptions,
  type ProviderTypesBundle,
} from "@aprovan/patchwork/namespace-types";
import { scanToolsAccess } from "@utdk/remote/tools-scan";

/** One row from `GET /tools/namespaces` (alias + canonical name). */
export interface NamespaceCatalogEntry {
  /** Canonical provider name, e.g. `google/drive`. */
  name: string;
  /** `tools.` binding, e.g. `googleDrive`. */
  globalAlias: string;
}

/** Scanned alias → canonical provider name. Built from catalog, not derived. */
export type ProviderAliasMap = ReadonlyMap<string, string>;

/** Build alias resolution map from catalog namespace entries. */
export function buildAliasMapFromCatalog(
  namespaces: readonly NamespaceCatalogEntry[],
): ProviderAliasMap {
  return new Map(namespaces.map((entry) => [entry.globalAlias, entry.name]));
}

/**
 * Resolve scanned aliases to canonical provider names.
 * Unknown aliases are omitted (cache miss per D3) — never throws.
 */
export function resolveScannedAliasesForTypes(
  aliases: readonly string[],
  catalog: ProviderAliasMap,
): string[] {
  const providers: string[] = [];
  const seen = new Set<string>();

  for (const alias of aliases) {
    const canonical = catalog.get(alias);
    if (canonical === undefined) continue;
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    providers.push(canonical);
  }

  return providers;
}

export interface LazyTypeMountOptions {
  /** Script source to scan for `tools.<alias>` member access. */
  source: string;
  /** Alias → canonical map from the namespace catalog (§2). */
  catalog: ProviderAliasMap;
  /** Fetch one provider's `.d.ts` bundle by canonical name. */
  fetchBundle: (canonicalProvider: string) => Promise<ProviderTypesBundle | null>;
  /** First-party namespaces with inline types — skip network fetch. */
  builtins?: OnDemandProviderMountOptions["builtins"];
}

/**
 * Mount provider `.d.ts` files for namespaces referenced in `source`.
 * Fetches are driven by scanned aliases only — the catalog's full type surface
 * is never loaded eagerly.
 */
export async function mountLazyProviderTypes(
  options: LazyTypeMountOptions,
): Promise<{
  files: Record<string, string>;
  fetchedProviders: string[];
  scannedAliases: string[];
}> {
  const { namespaces: scannedAliases } = scanToolsAccess(options.source);
  const providers = resolveScannedAliasesForTypes(
    scannedAliases,
    options.catalog,
  );

  const { files, fetchedProviders } = await resolveOnDemandProviderMounts({
    providers,
    fetchBundle: options.fetchBundle,
    builtins: options.builtins,
  });

  return { files, fetchedProviders, scannedAliases };
}
