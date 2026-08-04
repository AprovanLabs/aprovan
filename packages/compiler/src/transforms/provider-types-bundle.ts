/**
 * Shared emit helpers for provider `.d.ts` bundles consumed by the browser
 * TypeScript environment (`/node_modules/@utdk/<provider>/…`).
 */

import { toPascalCase } from "./identifier-case.js";

/** Provider `.d.ts` bundle shape served by `/catalog/types/<provider>.json`. */
export interface ProviderTypesBundle {
  /** Import specifier the bundle types (e.g. `@utdk/github`). */
  module: string;
  /** Package-relative virtual file map (`index.d.ts`, `types/….d.ts`). */
  files: Record<string, string>;
}

/**
 * Synthesize the package entry declaration: typed default client + factory.
 * `typesImportPath` is the relative import of the generated types module
 * (e.g. `./types/index.js` or `./types.js`).
 */
export function emitProviderModuleIndex(
  providerPath: string,
  typesImportPath: string,
): string {
  const pascal = toPascalCase(providerPath);
  const clientTypeName = `${pascal}Client`;
  return [
    `import type { ${clientTypeName} } from "${typesImportPath}";`,
    `export * from "${typesImportPath}";`,
    `export declare function create${pascal}Client(`,
    `  options?: Record<string, unknown>,`,
    `): Promise<${clientTypeName}>;`,
    `declare const defaultClient: ${clientTypeName};`,
    `export default defaultClient;`,
    ``,
  ].join("\n");
}

/** Package specifier for a provider path (`github` → `@utdk/github`). */
export function providerModuleName(providerPath: string): string {
  return `@utdk/${providerPath}`;
}

export interface OnDemandProviderMountOptions {
  /** Providers referenced by the source (ids / catalog paths). */
  providers: readonly string[];
  /**
   * Fetch one provider's bundle. Callers must drive this from source
   * references — never pass the full catalogue here.
   */
  fetchBundle: (provider: string) => Promise<ProviderTypesBundle | null>;
  /** Skip network for first-party / inline namespaces. */
  builtins?: {
    has(provider: string): boolean;
    getTypes?(provider: string): string | undefined;
  };
}

/**
 * Mount provider declarations for exactly the providers the source references.
 * Returns the virtual file map and the list of providers that were fetched
 * (excluding builtins), so hosts can assert the catalogue was not prefetched.
 */
export async function resolveOnDemandProviderMounts(
  options: OnDemandProviderMountOptions,
): Promise<{
  files: Record<string, string>;
  fetchedProviders: string[];
}> {
  const files: Record<string, string> = {};
  const fetchedProviders: string[] = [];
  const unique = [...new Set(options.providers)];

  for (const provider of unique) {
    if (options.builtins?.has(provider)) {
      const types = options.builtins.getTypes?.(provider);
      if (types) {
        files[`/node_modules/${provider}/index.d.ts`] = types;
      }
      continue;
    }

    fetchedProviders.push(provider);
    const bundle = await options.fetchBundle(provider);
    if (!bundle) continue;

    for (const [relative, content] of Object.entries(bundle.files)) {
      files[`/node_modules/${bundle.module}/${relative}`] = content;
    }

    // Bare / short ids alias onto the `@utdk/…` package root.
    if (provider !== bundle.module) {
      files[`/node_modules/@utdk/${provider}/index.d.ts`] =
        `export * from "${bundle.module}";\n` +
        `export { default } from "${bundle.module}";\n`;
    }
  }

  return { files, fetchedProviders };
}
