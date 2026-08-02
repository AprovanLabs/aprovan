import type { OpenAPIV3 } from "openapi-types";

type HttpMethod = "delete" | "get" | "head" | "options" | "patch" | "post" | "put" | "trace";

const HTTP_METHODS: HttpMethod[] = ["delete", "get", "head", "options", "patch", "post", "put", "trace"];

export type DocsOperationGroup = {
  key: string;
  title: string;
  operations: Array<{
    method: HttpMethod;
    path: string;
    operationId?: string;
    summary?: string;
  }>;
};

function toTitle(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function fallbackGroupKey(path: string): string {
  const segments = path.split("/").filter(Boolean);
  return segments[0] ?? "general";
}

export function groupOpenApiOperations(document: OpenAPIV3.Document): DocsOperationGroup[] {
  const groups = new Map<string, DocsOperationGroup>();

  for (const [path, pathItem] of Object.entries(document.paths ?? {}).sort(([left], [right]) => left.localeCompare(right))) {
    if (!pathItem) {
      continue;
    }

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];

      if (!operation || typeof operation !== "object") {
        continue;
      }

      const tag = operation.tags?.[0];
      const key = (tag ?? fallbackGroupKey(path)).toLowerCase().replace(/\s+/g, "-");
      const group = groups.get(key) ?? {
        key,
        title: toTitle(tag ?? fallbackGroupKey(path)),
        operations: [],
      };

      group.operations.push({
        method,
        path,
        operationId: operation.operationId,
        summary: operation.summary,
      });
      groups.set(key, group);
    }
  }

  return [...groups.values()].sort((left, right) => left.key.localeCompare(right.key));
}
