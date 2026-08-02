import { OpenApiConverter } from "@utcp/http";
import { loadOpenApiDocument } from "./openapi.js";
import { getPrimaryProviderAuthOption, type RegistryProvider } from "./provider.js";
import type { Auth, Tool } from "@utcp/sdk";
import type { OpenAPIV3 } from "openapi-types";

export type LoadedProviderTools = {
  tools: Tool[];
};

const OPERATION_METHODS = ["get", "post", "put", "delete", "patch"] as const;
type OperationMethod = (typeof OPERATION_METHODS)[number];

/**
 * Replaces non-standard JSON Schema types with valid equivalents.
 *
 * Swagger 2.0 uses `type: "file"` for file upload parameters, which is not a
 * valid JSON Schema type and causes UTCP's Zod validator to reject the entire
 * spec conversion. This function replaces "file" with "string" throughout the
 * spec so OpenApiConverter can proceed.
 */
export function sanitizeSchemaTypes(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeSchemaTypes);
  }

  const obj = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(obj)) {
    if (key === "type" && val === "file") {
      result[key] = "string";
    } else {
      result[key] = sanitizeSchemaTypes(val);
    }
  }

  return result;
}

/**
 * Generates a valid `operationId` from an HTTP method and path.
 *
 * Example: GET /auth/token/{grant_type} → "get_auth_token_grant_type"
 */
function generateOperationId(method: string, path: string): string {
  return `${method}_${path}`
    .replace(/\{([^}]+)\}/g, (_, name: string) => name)
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

/**
 * Adds `operationId` to any OpenAPI operation that lacks one.
 *
 * UTCP's OpenApiConverter silently drops operations without `operationId`.
 * This pre-processing step ensures every operation gets a stable, unique ID
 * so all operations are discovered as tools.
 */
export function addMissingOperationIds(spec: OpenAPIV3.Document): OpenAPIV3.Document {
  if (!spec.paths) {
    return spec;
  }

  const usedIds = new Set<string>();

  // First pass: collect all existing operationIds.
  for (const pathItem of Object.values(spec.paths)) {
    if (!pathItem) {
      continue;
    }

    for (const method of OPERATION_METHODS) {
      const op = pathItem[method] as OpenAPIV3.OperationObject | undefined;

      if (op?.operationId) {
        usedIds.add(op.operationId);
      }
    }
  }

  // Second pass: generate unique IDs for operations that lack them.
  const newPaths: OpenAPIV3.PathsObject = {};

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem) {
      newPaths[path] = pathItem;
      continue;
    }

    const newPathItem = { ...pathItem };

    for (const method of OPERATION_METHODS) {
      const op = pathItem[method] as OpenAPIV3.OperationObject | undefined;

      if (!op || op.operationId) {
        continue;
      }

      let operationId = generateOperationId(method, path);
      let counter = 2;

      while (usedIds.has(operationId)) {
        operationId = `${generateOperationId(method, path)}_${counter}`;
        counter += 1;
      }

      usedIds.add(operationId);
      newPathItem[method as OperationMethod] = { ...(op as OpenAPIV3.OperationObject), operationId };
    }

    newPaths[path] = newPathItem;
  }

  return { ...spec, paths: newPaths };
}

/**
 * Puts an upstream spec into the shape UTCP's `OpenApiConverter` can actually
 * consume: every operation carries an `operationId`, and no schema declares the
 * Swagger 2.0-only `type: "file"`.
 *
 * Both transforms are prerequisites for conversion, not conveniences — without
 * them the converter silently drops operations (missing `operationId`) or
 * rejects the whole document (`type: "file"`). Callers that persist a document
 * for later re-conversion must persist *this* document, otherwise the artifact
 * they ship converts to a different (usually empty) tool set than the one the
 * build derived. Idempotent, so it is safe to apply more than once.
 */
export function normalizeOpenApiDocument(spec: OpenAPIV3.Document): OpenAPIV3.Document {
  return sanitizeSchemaTypes(addMissingOperationIds(spec)) as OpenAPIV3.Document;
}

export async function loadProviderTools(
  provider: RegistryProvider,
  openApiDocument?: OpenAPIV3.Document,
): Promise<LoadedProviderTools> {
  const auth = getPrimaryProviderAuthOption(provider.options);

  const rawSpec = openApiDocument ?? (await loadOpenApiDocument(provider));
  const sanitizedSpec = normalizeOpenApiDocument(rawSpec);

  const converter = new OpenApiConverter(sanitizedSpec as unknown as Record<string, unknown>, {
    specUrl: provider.url,
    callTemplateName: provider.name,
    ...(auth !== undefined ? { authTools: auth as unknown as Auth } : {}),
  });

  let tools: Tool[];

  try {
    const manual = converter.convert();
    tools = manual.tools;
  } catch (error) {
    process.stderr.write(
      `[loadProviderTools] Failed to convert ${provider.name}: ${error instanceof Error ? error.message : String(error)}\n`,
    );

    return { tools: [] };
  }

  // Replicate UtcpClient.registerManual's tool name prefixing: each tool name
  // must start with "{manualName}." so that stripProviderToolName can strip it.
  const manualName = provider.name.replace(/[^\w]/g, "_");

  return {
    tools: tools.map((tool) => ({
      ...tool,
      name: tool.name.startsWith(`${manualName}.`) ? tool.name : `${manualName}.${tool.name}`,
    })),
  };
}
