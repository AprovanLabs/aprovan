import type { OpenAPIV3 } from "openapi-types";

function normalizePathname(pathname: string): string {
  const normalized = pathname.trim().replace(/\/+$/u, "");

  if (!normalized) {
    return "/";
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function sanitizeServerUrl(url: string): string {
  return url.replace(/\{[^}]+\}/gu, "placeholder");
}

function extractPathname(rawUrl: string): string {
  if (/^[a-z]+:\/\//iu.test(rawUrl)) {
    return normalizePathname(rawUrl.replace(/^[a-z]+:\/\/[^/]+/iu, ""));
  }

  return normalizePathname(rawUrl);
}

function getBasePaths(document: OpenAPIV3.Document): string[] {
  const basePaths = new Set<string>();
  const openApiV2BasePath = (document as { basePath?: unknown }).basePath;

  if (typeof openApiV2BasePath === "string") {
    basePaths.add(normalizePathname(openApiV2BasePath));
  }

  for (const server of document.servers ?? []) {
    if (typeof server.url !== "string") {
      continue;
    }

    try {
      const pathname = new URL(sanitizeServerUrl(server.url), "https://example.invalid").pathname;

      if (pathname && pathname !== "/") {
        basePaths.add(normalizePathname(pathname));
      }
    } catch {
      continue;
    }
  }

  return [...basePaths];
}

export function getDocumentPathnames(document: OpenAPIV3.Document, rawUrl: string): string[] {
  const pathname = extractPathname(rawUrl);
  const candidates = new Set<string>([pathname]);

  for (const basePath of getBasePaths(document)) {
    if (pathname === basePath) {
      candidates.add("/");
      continue;
    }

    if (pathname.startsWith(`${basePath}/`)) {
      candidates.add(normalizePathname(pathname.slice(basePath.length)));
    }
  }

  return [...candidates];
}

export function getDocumentPathItem(
  document: OpenAPIV3.Document,
  rawUrl: string,
): { pathItem?: OpenAPIV3.PathItemObject; pathname: string } {
  const pathnameCandidates = getDocumentPathnames(document, rawUrl);

  for (const pathname of pathnameCandidates) {
    const pathItem = document.paths?.[pathname];

    if (pathItem) {
      return { pathItem, pathname };
    }
  }

  return {
    pathItem: undefined,
    pathname: pathnameCandidates[0] ?? "/",
  };
}
