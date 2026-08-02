import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { applyProviderOpenApiOptions, loadOpenApiDocument } from "../openapi.js";
import {
  DEFAULT_DOCS_CACHE_ROOT,
  DEFAULT_OUTPUT_ROOT,
  loadRegistryProviders,
  resolveProvider,
  resolveProviderDocsIndexPath,
  resolveProviderDocsManifestPath,
  resolveProviderDocsSourcesDir,
  resolveProviderOutputDir,
} from "../provider.js";
import { discoverDocsReferences } from "./discover.js";
import { fetchDocsSources } from "./fetch.js";
import { hashOpenApiDocument } from "./hash.js";
import { createDocsManifest, writeDocsManifest } from "./manifest.js";
import { validateDocsReferences } from "./validate.js";
import type { DocsDiscoveredReference } from "./types.js";

export type LoadProviderDocsOptions = {
  provider: string;
  docsCacheRoot?: string;
  outputRoot?: string;
  seededReferences?: DocsDiscoveredReference[];
  rawSnapshots?: boolean;
};

export type LoadProviderDocsResult = {
  provider: string;
  discoveredCount: number;
  validatedCount: number;
  failedCount: number;
  sourceCount: number;
  manifestPath: string;
  indexPath: string;
  warnings: string[];
};

type ExistingPackageDocsMetadata = {
  references: DocsDiscoveredReference[];
};

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeMetadataReference(value: unknown): DocsDiscoveredReference | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const url = toOptionalString(record.url);

  if (!url) {
    return undefined;
  }

  return {
    source: "package-metadata",
    url,
    canonicalUrl: toOptionalString(record.canonicalUrl),
    label: toOptionalString(record.label),
    category:
      record.category === "overview" ||
      record.category === "reference" ||
      record.category === "guide" ||
      record.category === "changelog" ||
      record.category === "other"
        ? record.category
        : undefined,
  };
}

async function readExistingPackageDocsMetadata(packageDir: string): Promise<ExistingPackageDocsMetadata> {
  const packageJsonPath = path.join(packageDir, "package.json");

  try {
    const raw = await readFile(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const utdk = parsed.utdk as Record<string, unknown> | undefined;
    const docs = utdk?.docs as Record<string, unknown> | undefined;
    const references = Array.isArray(docs?.references)
      ? docs?.references.map(normalizeMetadataReference).filter((entry): entry is DocsDiscoveredReference => Boolean(entry))
      : [];

    return {
      references,
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "ENOENT") {
      return { references: [] };
    }

    throw error;
  }
}

function renderDocsIndex(
  provider: string,
  discovered: DocsDiscoveredReference[],
  warnings: string[],
): string {
  const grouped = new Map<string, DocsDiscoveredReference[]>();

  for (const reference of discovered) {
    const category = reference.category ?? "other";
    const list = grouped.get(category) ?? [];
    list.push(reference);
    grouped.set(category, list);
  }

  const lines: string[] = [
    `# ${provider} docs cache index`,
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  if (warnings.length > 0) {
    lines.push("## Warnings", "");
    lines.push(...warnings.map((warning) => `- ${warning}`));
    lines.push("");
  }

  lines.push("## Sources", "");

  for (const [category, references] of [...grouped.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    lines.push(`### ${category}`);
    lines.push("");
    lines.push(
      ...references.map((reference) => {
        const label = reference.label ?? reference.canonicalUrl ?? reference.url;
        const href = reference.canonicalUrl ?? reference.url;
        return `- [${label}](${href}) (${reference.source})`;
      }),
    );
    lines.push("");
  }

  return lines.join("\n").trimEnd().concat("\n");
}

export async function loadProviderDocs(options: LoadProviderDocsOptions): Promise<LoadProviderDocsResult> {
  const docsCacheRoot = options.docsCacheRoot ?? DEFAULT_DOCS_CACHE_ROOT;
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const packageDir = resolveProviderOutputDir(provider.name, outputRoot);
  const packageMetadata = await readExistingPackageDocsMetadata(packageDir);
  const rawOpenApiDocument = await loadOpenApiDocument(provider);
  const openApiDocument = applyProviderOpenApiOptions(rawOpenApiDocument, provider);
  const manifestPath = resolveProviderDocsManifestPath(provider.name, docsCacheRoot);
  const indexPath = resolveProviderDocsIndexPath(provider.name, docsCacheRoot);
  const sourcesDir = resolveProviderDocsSourcesDir(provider.name, docsCacheRoot);
  const rawSnapshotsDir = options.rawSnapshots ? path.join(sourcesDir, "_raw") : undefined;
  const discovered = discoverDocsReferences({
    provider,
    openApiDocument,
    seededReferences: options.seededReferences,
    packageMetadataReferences: packageMetadata.references,
  });
  const validation = await validateDocsReferences(discovered);
  const fetchResult = await fetchDocsSources({
    references: validation.valid,
    sourcesDir,
    rawSnapshotsDir,
  });
  const warnings = [
    ...validation.failed.map((reference) => `Validation failed for ${reference.url}: ${reference.reason}`),
    ...fetchResult.warnings,
  ];
  const manifest = createDocsManifest(provider.name, {
    openApi: {
      url: provider.url,
      hash: hashOpenApiDocument(openApiDocument),
    },
    references: discovered,
    sources: fetchResult.sources,
    warnings,
  });
  const index = renderDocsIndex(provider.name, discovered, warnings);

  await writeDocsManifest(manifestPath, manifest);
  await mkdir(path.dirname(indexPath), { recursive: true });
  await writeFile(indexPath, index, "utf8");

  return {
    provider: provider.name,
    discoveredCount: discovered.length,
    validatedCount: validation.valid.length,
    failedCount: validation.failed.length,
    sourceCount: fetchResult.sources.length,
    manifestPath,
    indexPath,
    warnings,
  };
}
