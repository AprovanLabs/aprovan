import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { getDocumentPathItem } from "./openapi-path.js";
import { resolveRepoPath } from "./provider.js";
import { schemaToTypeScriptType, type SchemaRenderContext } from "./schema.js";
import type { RegistryProvider } from "./provider.js";
import type { Tool } from "@utcp/sdk";
import type { OpenAPIV3 } from "openapi-types";

type PublicToolTypes = {
  inputType: string;
  outputType: string;
  /** Preferred response content schema with `$ref`s preserved (for named-type rendering). */
  rawResponseSchema?: unknown;
  /** Operation-level external documentation URL from the spec, when present. */
  docsUrl?: string;
};

const OPERATION_METHODS = ["delete", "get", "head", "options", "patch", "post", "put", "trace"] as const;

function isReferenceObject(value: unknown): value is OpenAPIV3.ReferenceObject {
  return Boolean(value && typeof value === "object" && "$ref" in value);
}

function getRefTarget(document: OpenAPIV3.Document, ref: string): unknown {
  if (!ref.startsWith("#/")) {
    return undefined;
  }

  return ref
    .slice(2)
    .split("/")
    .reduce<unknown>((current, part) => {
      if (!current || typeof current !== "object") {
        return undefined;
      }

      return (current as Record<string, unknown>)[part.replace(/~1/g, "/").replace(/~0/g, "~")];
    }, document);
}

type ResolvedSchema = OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;

/**
 * Materialize a schema by following `$ref`s. `seen` is copied per branch, which
 * bounds recursion depth but not total work: a schema reachable through N
 * distinct paths is expanded N times over. On a densely cross-referential spec
 * that is exponential — see the `context` short-circuit below.
 */
function resolveSchema(
  document: OpenAPIV3.Document,
  schema: ResolvedSchema | undefined,
  seen: Set<string> = new Set(),
  context?: SchemaRenderContext,
): ResolvedSchema | undefined {
  if (!schema) {
    return undefined;
  }

  if (isReferenceObject(schema)) {
    // A ref that has a generated type name renders as that name, so expanding
    // it here is pure waste — and it is the waste that makes this function
    // explode. Stripe's 1,422 component schemas reference each other densely
    // enough that expanding one response costs >300k recursive calls and OOMs a
    // 16GB heap; stopping at the name costs one. Keeping the `$ref` node is
    // what the renderer wants anyway (see `SchemaRenderContext.refTypeName`).
    if (context?.refTypeName?.(schema.$ref)) {
      return schema;
    }

    if (seen.has(schema.$ref)) {
      return { type: "object", additionalProperties: true };
    }

    const target = getRefTarget(document, schema.$ref);

    if (!target || typeof target !== "object") {
      return undefined;
    }

    const nextSeen = new Set(seen);
    nextSeen.add(schema.$ref);
    return resolveSchema(document, target as ResolvedSchema, nextSeen, context);
  }

  const resolved: OpenAPIV3.SchemaObject = { ...schema };

  if (schema.properties) {
    resolved.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]) => [
        key,
        resolveSchema(document, value, seen, context) ?? { type: "object" },
      ]),
    );
  }

  const arraySchema = schema as OpenAPIV3.ArraySchemaObject;

  if (arraySchema.items) {
    (resolved as any).items = Array.isArray(arraySchema.items)
      ? arraySchema.items.map(
          (item: ResolvedSchema) => resolveSchema(document, item, seen, context) ?? { type: "object" },
        )
      : (resolveSchema(document, arraySchema.items, seen, context) ?? { type: "object" });
  }

  if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    resolved.additionalProperties = resolveSchema(document, schema.additionalProperties, seen, context);
  }

  if (schema.allOf) {
    resolved.allOf = schema.allOf
      .map((item) => resolveSchema(document, item, seen, context))
      .filter((item): item is ResolvedSchema => Boolean(item));
  }

  if (schema.anyOf) {
    resolved.anyOf = schema.anyOf
      .map((item) => resolveSchema(document, item, seen, context))
      .filter((item): item is ResolvedSchema => Boolean(item));
  }

  if (schema.oneOf) {
    resolved.oneOf = schema.oneOf
      .map((item) => resolveSchema(document, item, seen, context))
      .filter((item): item is ResolvedSchema => Boolean(item));
  }

  return resolved;
}

function getOperation(
  document: OpenAPIV3.Document,
  tool: Tool,
): OpenAPIV3.OperationObject | undefined {
  const method =
    tool.tool_call_template && typeof tool.tool_call_template.http_method === "string"
      ? tool.tool_call_template.http_method.toLowerCase()
      : undefined;
  const rawUrl =
    tool.tool_call_template && typeof tool.tool_call_template.url === "string" ? tool.tool_call_template.url : undefined;

  if (!method || !rawUrl) {
    return undefined;
  }

  const { pathItem } = getDocumentPathItem(document, rawUrl);

  if (!pathItem || !(method in pathItem)) {
    return undefined;
  }

  return pathItem[method as keyof OpenAPIV3.PathItemObject] as OpenAPIV3.OperationObject | undefined;
}

function getResponseSchema(
  document: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject | undefined,
  context?: SchemaRenderContext,
): ResolvedSchema | undefined {
  if (!operation) {
    return undefined;
  }

  const responseEntries = Object.entries(operation.responses ?? {}).sort(([left], [right]) => {
    const leftScore = /^2\d\d$/.test(left) ? 0 : left === "default" ? 2 : 1;
    const rightScore = /^2\d\d$/.test(right) ? 0 : right === "default" ? 2 : 1;
    return leftScore - rightScore;
  });

  for (const [, responseValue] of responseEntries) {
    const response = isReferenceObject(responseValue)
      ? (getRefTarget(document, responseValue.$ref) as OpenAPIV3.ResponseObject | undefined)
      : responseValue;

    if (!response?.content) {
      continue;
    }

    const contentEntry =
      response.content["application/json"] ??
      Object.entries(response.content).find(([contentType]) => contentType.includes("json"))?.[1] ??
      Object.values(response.content)[0];

    const schema = resolveSchema(document, contentEntry?.schema, new Set(), context);

    if (schema) {
      return schema;
    }
  }

  return undefined;
}

export async function loadOpenApiDocument(provider: RegistryProvider): Promise<OpenAPIV3.Document> {
  let rawDocument: string;

  if (provider.url.startsWith("file://")) {
    // Load from local file system (used for community-curated specs stored in the repo)
    const filePath = fileURLToPath(provider.url);
    rawDocument = await readFile(filePath, "utf8");
  } else if (provider.url.startsWith("repo://")) {
    // Load from a path relative to the repository root (e.g. "repo://data/openapi/linear.json")
    const relPath = provider.url.slice("repo://".length);
    const absPath = resolveRepoPath(...relPath.split("/"));
    rawDocument = await readFile(absPath, "utf8");
  } else {
    const response = await fetch(provider.url, {
      headers: {
        Accept: provider.content_type ?? "application/json",
        "User-Agent": "UTDK/1.0.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${provider.name} OpenAPI schema: ${response.status} ${response.statusText}`);
    }

    rawDocument = await response.text();
  }

  try {
    return JSON.parse(rawDocument) as OpenAPIV3.Document;
  } catch (jsonError: unknown) {
    const parsedDocument = parseYaml(rawDocument);

    if (parsedDocument && typeof parsedDocument === "object") {
      return parsedDocument as OpenAPIV3.Document;
    }

    const errorMessage = jsonError instanceof Error ? jsonError.message : String(jsonError);
    throw new Error(`Failed to parse ${provider.name} OpenAPI schema as JSON or YAML: ${errorMessage}`);
  }
}

export function applyProviderOpenApiOptions(
  document: OpenAPIV3.Document,
  provider: Pick<RegistryProvider, "options">,
): OpenAPIV3.Document {
  const stripPrefix = provider.options?.operations?.stripPrefix?.trim();

  if (!stripPrefix || !document.paths) {
    return document;
  }

  const paths = Object.fromEntries(
    Object.entries(document.paths).map(([path, pathItem]) => {
      if (!pathItem) {
        return [path, pathItem];
      }

      const nextPathItem: OpenAPIV3.PathItemObject = { ...pathItem };

      for (const method of OPERATION_METHODS) {
        const operation = nextPathItem[method];

        if (!operation || typeof operation !== "object" || !("operationId" in operation)) {
          continue;
        }

        if (typeof operation.operationId !== "string" || !operation.operationId.startsWith(stripPrefix)) {
          continue;
        }

        nextPathItem[method] = {
          ...operation,
          operationId: operation.operationId.slice(stripPrefix.length),
        };
      }

      return [path, nextPathItem];
    }),
  ) as OpenAPIV3.PathsObject;

  return {
    ...document,
    paths,
  };
}

function getRawResponseSchema(
  document: OpenAPIV3.Document,
  operation: OpenAPIV3.OperationObject | undefined,
): unknown {
  if (!operation) {
    return undefined;
  }

  const responseEntries = Object.entries(operation.responses ?? {}).sort(([left], [right]) => {
    const leftScore = /^2\d\d$/.test(left) ? 0 : left === "default" ? 2 : 1;
    const rightScore = /^2\d\d$/.test(right) ? 0 : right === "default" ? 2 : 1;
    return leftScore - rightScore;
  });

  for (const [, responseValue] of responseEntries) {
    const response = isReferenceObject(responseValue)
      ? (getRefTarget(document, responseValue.$ref) as OpenAPIV3.ResponseObject | undefined)
      : responseValue;

    if (!response?.content) {
      continue;
    }

    const contentEntry =
      response.content["application/json"] ??
      Object.entries(response.content).find(([contentType]) => contentType.includes("json"))?.[1] ??
      Object.values(response.content)[0];

    if (contentEntry?.schema) {
      return contentEntry.schema;
    }
  }

  return undefined;
}

/**
 * `context` (from `createProviderSchemaTypes`) makes response schemas render as
 * named component types instead of being inlined. Pass it whenever the caller
 * also emits the named declarations — without it, every response `$ref` is
 * materialized, which is unbounded work on specs whose components reference
 * each other heavily.
 */
export function buildPublicTypeMap(
  document: OpenAPIV3.Document,
  tools: Tool[],
  context?: SchemaRenderContext,
): Map<string, PublicToolTypes> {
  return new Map(
    tools.map((tool) => {
      const operation = getOperation(document, tool);
      const responseSchema = getResponseSchema(document, operation, context);
      const rawResponseSchema = getRawResponseSchema(document, operation);
      const docsUrl = operation?.externalDocs?.url;

      return [
        tool.name,
        {
          // `tool.inputs`/`tool.outputs` come from the UTCP conversion already
          // dereferenced, so they are rendered without the context.
          inputType: schemaToTypeScriptType(tool.inputs),
          outputType: responseSchema
            ? schemaToTypeScriptType(responseSchema, context)
            : schemaToTypeScriptType(tool.outputs),
          ...(rawResponseSchema !== undefined ? { rawResponseSchema } : {}),
          ...(docsUrl ? { docsUrl } : {}),
        },
      ];
    }),
  );
}
