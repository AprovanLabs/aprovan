
import type { RegistryProvider } from "../provider.js";
import type { DocsDiscoveredReference, DocsReferenceCategory, DocsReferenceSource } from "./types.js";
import type { OpenAPIV3 } from "openapi-types";

export type DiscoverDocsReferencesOptions = {
  provider: RegistryProvider;
  openApiDocument: OpenAPIV3.Document;
  seededReferences?: DocsDiscoveredReference[];
  packageMetadataReferences?: DocsDiscoveredReference[];
};

function trimToUndefined(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeReference(
  reference: DocsDiscoveredReference,
  fallbackSource: DocsReferenceSource,
): DocsDiscoveredReference | undefined {
  const url = trimToUndefined(reference.url);

  if (!url) {
    return undefined;
  }

  return {
    source: reference.source ?? fallbackSource,
    url,
    canonicalUrl: trimToUndefined(reference.canonicalUrl),
    label: trimToUndefined(reference.label),
    category:
      reference.category === "overview" ||
      reference.category === "reference" ||
      reference.category === "guide" ||
      reference.category === "changelog" ||
      reference.category === "other"
        ? reference.category
        : undefined,
    notes: trimToUndefined(reference.notes),
  };
}

function dedupeReferences(
  references: DocsDiscoveredReference[],
  source: DocsReferenceSource,
): DocsDiscoveredReference[] {
  const seen = new Set<string>();
  const deduped: DocsDiscoveredReference[] = [];

  for (const reference of references) {
    const normalized = normalizeReference(reference, source);

    if (!normalized) {
      continue;
    }

    const dedupeKey = normalized.canonicalUrl ?? normalized.url;

    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    deduped.push(normalized);
  }

  return deduped;
}

function deriveOpenApiReferenceCategory(label?: string): DocsReferenceCategory {
  const normalizedLabel = label?.toLowerCase();

  if (!normalizedLabel) {
    return "reference";
  }

  if (normalizedLabel.includes("changelog") || normalizedLabel.includes("release")) {
    return "changelog";
  }

  if (normalizedLabel.includes("guide") || normalizedLabel.includes("tutorial")) {
    return "guide";
  }

  if (normalizedLabel.includes("overview") || normalizedLabel.includes("getting started")) {
    return "overview";
  }

  return "reference";
}

function deriveOpenApiReferences(
  provider: RegistryProvider,
  openApiDocument: OpenAPIV3.Document,
): DocsDiscoveredReference[] {
  const providerMetadata = provider as RegistryProvider & {
    metadata?: {
      documentation_url?: string;
      docs_url?: string;
    };
  };
  const documentRecord = openApiDocument as unknown as Record<string, unknown>;
  const externalDocs = openApiDocument.externalDocs;
  const info = openApiDocument.info as unknown as Record<string, unknown> | undefined;
  const infoContact = (info?.contact as Record<string, unknown> | undefined) ?? {};

  const candidates: DocsDiscoveredReference[] = [
    {
      source: "openapi",
      url: providerMetadata.metadata?.documentation_url ?? "",
      label: "Registry Documentation",
      category: "reference",
    },
    {
      source: "openapi",
      url: providerMetadata.metadata?.docs_url ?? "",
      label: "Registry Docs",
      category: "reference",
    },
    {
      source: "openapi",
      url: externalDocs?.url ?? "",
      label: externalDocs?.description ?? "OpenAPI external docs",
      category: deriveOpenApiReferenceCategory(externalDocs?.description),
    },
    {
      source: "openapi",
      url: trimToUndefined(infoContact.url) ?? "",
      label: "OpenAPI contact",
      category: "overview",
    },
    {
      source: "openapi",
      url: trimToUndefined(info?.termsOfService) ?? "",
      label: "Terms of Service",
      category: "reference",
    },
    {
      source: "openapi",
      url: trimToUndefined(documentRecord["x-documentation-url"]) ?? "",
      label: "OpenAPI x-documentation-url",
      category: "reference",
    },
  ];

  return dedupeReferences(candidates, "openapi");
}

export function discoverDocsReferences(options: DiscoverDocsReferencesOptions): DocsDiscoveredReference[] {
  const seeded = dedupeReferences(options.seededReferences ?? [], "registry-seed");
  const packageMetadata = dedupeReferences(options.packageMetadataReferences ?? [], "package-metadata");
  const openApi = deriveOpenApiReferences(options.provider, options.openApiDocument);
  const merged: DocsDiscoveredReference[] = [];
  const seen = new Set<string>();

  // Precedence: seeded references > package metadata references > OpenAPI-derived references.
  for (const reference of [...seeded, ...packageMetadata, ...openApi]) {
    const dedupeKey = reference.canonicalUrl ?? reference.url;

    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    merged.push(reference);
  }

  return merged;
}
