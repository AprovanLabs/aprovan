import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { DEFAULT_OUTPUT_ROOT, loadRegistryProviders, resolveProvider, resolveProviderOutputDir } from "../provider.js";
import type { OpenAPIV3 } from "openapi-types";

export type PaginationHint = {
  type: "cursor" | "offset" | "page";
  cursorParam?: string;
  limitParam?: string;
  offsetParam?: string;
  pageParam?: string;
  resultsKey?: string;
  nextCursorKey?: string;
  /** True when the API signals next-page via a `Link` response header (e.g. GitHub REST API). */
  linkHeader?: boolean;
};

export type EnrichOverlay = {
  provider: string;
  specUrl: string;
  generatedAt: string;
  descriptions: Record<string, string>;
  paginationHints: Record<string, PaginationHint>;
  authHints: Record<string, unknown>;
};

export type RunEnrichPhaseOptions = {
  provider: string;
  outputRoot?: string;
  /**
   * Optional pre-loaded OpenAPI document. When provided and no overlay exists yet,
   * pagination hints are auto-detected and seeded into the new overlay.
   */
  document?: OpenAPIV3.Document;
};

export type RunEnrichPhaseResult = {
  provider: string;
  overlayPath: string;
  created: boolean;
  overlay: EnrichOverlay;
};

// ---------------------------------------------------------------------------
// Pagination detection helpers
// ---------------------------------------------------------------------------

/** Response-body property names that signal a cursor to the next page. */
const CURSOR_RESPONSE_FIELDS = new Set([
  "next_cursor",
  "nextCursor",
  "after",
  "cursor",
  "page_token",
  "pageToken",
  "next_page_token",
  "nextPageToken",
  "next_token",
  "nextToken",
  "next_page",
  "nextPage",
]);

/** Query-parameter names that carry a cursor value. */
const CURSOR_PARAM_NAMES = new Set(["cursor", "after", "page_token", "page_token"]);

/** Resolve a JSON Pointer `$ref` to its target in the document. */
function resolveRef<T>(document: OpenAPIV3.Document, ref: string): T | undefined {
  if (!ref.startsWith("#/")) return undefined;
  return ref
    .slice(2)
    .split("/")
    .reduce<unknown>((curr, part) => {
      if (!curr || typeof curr !== "object") return undefined;
      return (curr as Record<string, unknown>)[part.replace(/~1/gu, "/").replace(/~0/gu, "~")];
    }, document) as T | undefined;
}

function isRefObject(obj: unknown): obj is OpenAPIV3.ReferenceObject {
  return Boolean(obj && typeof obj === "object" && "$ref" in obj);
}

function resolveObject<T extends object>(
  document: OpenAPIV3.Document,
  obj: T | OpenAPIV3.ReferenceObject,
): T | undefined {
  if (isRefObject(obj)) {
    return resolveRef<T>(document, obj.$ref);
  }
  return obj;
}

/**
 * Return the set of query-parameter names for an operation (lower-cased for
 * case-insensitive matching) alongside the original name map so callers can
 * preserve the original casing in emitted hints.
 */
function getQueryParams(
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document,
): Map<string, string> {
  const result = new Map<string, string>(); // lowercase → original

  for (const paramOrRef of operation.parameters ?? []) {
    const param = resolveObject<OpenAPIV3.ParameterObject>(document, paramOrRef);
    if (param && param.in === "query" && typeof param.name === "string") {
      result.set(param.name.toLowerCase(), param.name);
    }
  }

  return result;
}

/**
 * Return the name of the first cursor-style field found in the top-level
 * properties of the primary success response body, or `undefined` if none.
 */
function getResponseCursorField(
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document,
): string | undefined {
  for (const [status, responseOrRef] of Object.entries(operation.responses ?? {})) {
    if (!/^2\d\d$|^default$/u.test(status)) continue;

    const response = resolveObject<OpenAPIV3.ResponseObject>(document, responseOrRef);
    if (!response?.content) continue;

    const mediaTypeObj =
      response.content["application/json"] ??
      Object.values(response.content)[0];

    if (!mediaTypeObj?.schema) continue;

    const schema = resolveObject<OpenAPIV3.SchemaObject>(document, mediaTypeObj.schema);
    if (!schema?.properties) continue;

    for (const key of Object.keys(schema.properties)) {
      if (CURSOR_RESPONSE_FIELDS.has(key)) {
        return key;
      }
    }
  }

  return undefined;
}

/**
 * Return `true` if any success response declares a `Link` response header.
 * The GitHub REST API (and several others) use `Link: <...>; rel="next"` to
 * communicate pagination rather than embedding a cursor in the response body.
 */
function responseHasLinkHeader(
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document,
): boolean {
  for (const [status, responseOrRef] of Object.entries(operation.responses ?? {})) {
    if (!/^2\d\d$|^default$/u.test(status)) continue;

    const response = resolveObject<OpenAPIV3.ResponseObject>(document, responseOrRef);
    if (!response?.headers) continue;

    for (const headerName of Object.keys(response.headers)) {
      if (headerName.toLowerCase() === "link") {
        return true;
      }
    }
  }

  return false;
}

/**
 * Detect the pagination style for a single operation.
 *
 * Detection priority:
 *  1. `offset` + `limit` → offset-based
 *  2. `page` + `per_page`/`pageSize` → page-based (possibly with Link header)
 *  3. Cursor field in response body → cursor-based
 *  4. Cursor query parameter → cursor-based
 *
 * Returns `undefined` when no pagination is detected.
 */
export function detectOperationPaginationHint(
  operation: OpenAPIV3.OperationObject,
  document: OpenAPIV3.Document,
): PaginationHint | undefined {
  const params = getQueryParams(operation, document);
  const hasLinkHdr = responseHasLinkHeader(operation, document);
  const cursorResponseField = getResponseCursorField(operation, document);

  const hasOffset = params.has("offset");
  const hasLimit = params.has("limit");
  const hasPage = params.has("page");
  const perPageKey = ["per_page", "per-page", "pagesize", "page_size"].find((k) => params.has(k));
  const cursorParamKey = [...CURSOR_PARAM_NAMES].find((k) => params.has(k));

  // --- 1. Offset-based: offset + limit ---
  if (hasOffset && hasLimit) {
    return {
      type: "offset",
      offsetParam: params.get("offset")!,
      limitParam: params.get("limit")!,
    };
  }

  // --- 2. Page-based: page + per_page ---
  if (hasPage && perPageKey) {
    const hint: PaginationHint = {
      type: "page",
      pageParam: params.get("page")!,
      limitParam: params.get(perPageKey)!,
    };
    if (hasLinkHdr) hint.linkHeader = true;
    return hint;
  }

  // --- 3. Cursor-based: field in response body ---
  if (cursorResponseField) {
    const hint: PaginationHint = {
      type: "cursor",
      nextCursorKey: cursorResponseField,
    };
    if (cursorParamKey) hint.cursorParam = params.get(cursorParamKey)!;
    if (hasLimit) hint.limitParam = params.get("limit")!;
    else if (perPageKey) hint.limitParam = params.get(perPageKey)!;
    return hint;
  }

  // --- 4. Cursor query parameter (no response cursor field) ---
  if (cursorParamKey) {
    const hint: PaginationHint = {
      type: "cursor",
      cursorParam: params.get(cursorParamKey)!,
    };
    if (hasLimit) hint.limitParam = params.get("limit")!;
    else if (perPageKey) hint.limitParam = params.get(perPageKey)!;
    if (hasLinkHdr) hint.linkHeader = true;
    return hint;
  }

  // --- 5. Link header + page param only ---
  if (hasLinkHdr && hasPage) {
    return {
      type: "page",
      pageParam: params.get("page")!,
      linkHeader: true,
    };
  }

  return undefined;
}

/**
 * Scan all GET (and POST) operations in an OpenAPI document and return a map
 * of `operationId → PaginationHint` for every operation where pagination was
 * detected.
 */
export function detectPaginationHints(document: OpenAPIV3.Document): Record<string, PaginationHint> {
  const hints: Record<string, PaginationHint> = {};

  for (const pathItem of Object.values(document.paths ?? {})) {
    if (!pathItem || isRefObject(pathItem)) continue;

    for (const method of ["get", "post"] as const) {
      const operation = (pathItem as OpenAPIV3.PathItemObject)[method];
      if (!operation || isRefObject(operation) || !operation.operationId) continue;

      const hint = detectOperationPaginationHint(operation, document);
      if (hint) {
        hints[operation.operationId] = hint;
      }
    }
  }

  return hints;
}

// ---------------------------------------------------------------------------
// Enrich phase runner
// ---------------------------------------------------------------------------

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildInitialOverlay(
  providerName: string,
  specUrl: string,
  paginationHints: Record<string, PaginationHint> = {},
): EnrichOverlay {
  return {
    provider: providerName,
    specUrl,
    generatedAt: new Date().toISOString(),
    descriptions: {},
    paginationHints,
    authHints: {},
  };
}

export async function runEnrichPhase(options: RunEnrichPhaseOptions): Promise<RunEnrichPhaseResult> {
  const outputRoot = options.outputRoot ?? DEFAULT_OUTPUT_ROOT;
  const providers = await loadRegistryProviders();
  const provider = resolveProvider(providers, options.provider);
  const providerDir = resolveProviderOutputDir(provider.name, outputRoot);
  const overlayPath = path.join(providerDir, "overlay.yaml");

  await mkdir(providerDir, { recursive: true });

  const exists = await fileExists(overlayPath);

  if (exists) {
    const raw = await readFile(overlayPath, "utf8");
    const overlay = parseYaml(raw) as EnrichOverlay;
    return { provider: provider.name, overlayPath, created: false, overlay };
  }

  const detectedHints = options.document ? detectPaginationHints(options.document) : {};
  const overlay = buildInitialOverlay(provider.name, provider.url, detectedHints);

  const yamlContent =
    `# Spec enrichment overlay for ${provider.name}\n` +
    `# Edit this file to add corrections, pagination hints, and auth hints.\n` +
    `# This overlay is applied during regeneration to enrich the generated package.\n` +
    `# Keys under 'descriptions', 'paginationHints', and 'authHints' are keyed by operationId.\n` +
    `#\n` +
    `# Example description correction:\n` +
    `#   descriptions:\n` +
    `#     listRepos: "List all repositories the authenticated user has access to."\n` +
    `#\n` +
    `# Example pagination hint:\n` +
    `#   paginationHints:\n` +
    `#     listRepos:\n` +
    `#       type: cursor\n` +
    `#       cursorParam: page\n` +
    `#       limitParam: per_page\n` +
    `#       resultsKey: items\n` +
    `\n` +
    stringifyYaml(overlay);

  await writeFile(overlayPath, yamlContent, "utf8");
  return { provider: provider.name, overlayPath, created: true, overlay };
}
