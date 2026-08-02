import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  resolveProviderDocsIndexPath,
  resolveProviderDocsManifestPath,
  resolveProviderOutputDir,
} from "../provider.js";
import { getProviderImportSpecifier, stripProviderToolName, type RegistryProvider } from "../provider.js";
import { buildPublicTypeMap } from "../openapi.js";
import { createProviderSchemaTypes, createSchemaRenderContext, type ProviderSchemaTypes } from "../render.js";
import { schemaToObjectContent, schemaToTypeScriptType, type SchemaRenderContext } from "../schema.js";
import { groupOpenApiOperations } from "./grouping.js";
import { getDocsStaleCheckResult } from "./hash.js";
import { readDocsManifest } from "./manifest.js";
import { loadDocsPromptAssets } from "./prompt.js";
import { DocsPipelineError, type ProviderPackageDocsMetadata } from "./types.js";
import type { ClientToolDefinition } from "../client-api.js";
import type { Tool } from "@utcp/sdk";
import type { OpenAPIV3 } from "openapi-types";

export type AugmentProviderDocsOptions = {
  provider: string;
  providerOptions?: RegistryProvider["options"];
  openApiDocument: OpenAPIV3.Document;
  tools?: Tool[];
  clientToolMap?: Map<string, ClientToolDefinition>;
  docsCacheRoot: string;
  outputRoot: string;
  overwriteDocs?: boolean;
};

export type AugmentProviderDocsResult = {
  readme: string;
  docs: Array<{
    relativePath: string;
    content: string;
  }>;
  metadata: ProviderPackageDocsMetadata;
  staleReason: string;
};

type ExistingDocsMetadata = {
  openApiHash?: string | null;
  promptHash?: string | null;
};

type AugmentedOperation = {
  accessPath: string[];
  description?: string;
  docsUrl?: string;
  hasInput: boolean;
  hasOptions: boolean;
  httpMethod: string;
  inputType: string;
  optionsOptional: boolean;
  optionsType: string;
  outputType: string;
  rawInputSchema?: unknown;
  rawOutputSchema?: unknown;
  requiredInputKeys: string[];
  toolName: string;
};

function normalizePath(pathTemplate: string): string {
  const value = pathTemplate.trim();

  if (!value) {
    return "/";
  }

  return value.startsWith("/") ? value : `/${value}`;
}

function getOperationKey(method: string, route: string): string {
  return `${method.toUpperCase()} ${normalizePath(route)}`;
}

function splitIdentifierWords(name: string): string[] {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toPascalCase(name: string): string {
  const parts = splitIdentifierWords(name);

  if (parts.length === 0) {
    return "Operation";
  }

  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join("");
}

function toCamelCase(name: string): string {
  const parts = splitIdentifierWords(name);

  if (parts.length === 0) {
    return "client";
  }

  const [first = "client", ...rest] = parts;
  return (
    first.toLowerCase() +
    rest.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join("")
  );
}

function getOperationFromPath(
  document: OpenAPIV3.Document,
  operationPath: string,
  operationMethod: string
): OpenAPIV3.OperationObject | undefined {
  const pathItem = document.paths?.[operationPath];

  if (!pathItem) {
    return undefined;
  }

  return pathItem[operationMethod.toLowerCase() as keyof OpenAPIV3.PathItemObject] as
    | OpenAPIV3.OperationObject
    | undefined;
}

function isParameterObject(
  parameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
): parameter is OpenAPIV3.ParameterObject {
  return typeof parameter === "object" && !("$ref" in parameter);
}

function buildOperationLookup(
  provider: string,
  providerOptions: RegistryProvider["options"] | undefined,
  tools: Tool[] | undefined,
  clientToolMap: Map<string, ClientToolDefinition> | undefined,
  publicTypeMap?: ReturnType<typeof buildPublicTypeMap>,
): {
  byMethodAndPath: Map<string, AugmentedOperation>;
  byOperationId: Map<string, AugmentedOperation>;
} {
  const byMethodAndPath = new Map<string, AugmentedOperation>();
  const byOperationId = new Map<string, AugmentedOperation>();

  for (const tool of tools ?? []) {
    const mapped = clientToolMap?.get(tool.name);

    if (!mapped) {
      continue;
    }

    const strippedToolName = stripProviderToolName(tool.name, {
      name: provider,
      options: providerOptions,
    });
    const publicTypes = publicTypeMap?.get(tool.name);
    const inputSchemaRecord = mapped.inputSchema as { required?: string[] } | undefined;
    const operation: AugmentedOperation = {
      accessPath: mapped.accessPath,
      description: tool.description,
      docsUrl: publicTypes?.docsUrl,
      hasInput: mapped.hasInput,
      hasOptions: mapped.hasOptions,
      httpMethod: mapped.runtimeMetadata.method,
      inputType: mapped.inputType,
      optionsOptional: mapped.optionsOptional,
      optionsType: mapped.optionsType,
      outputType: publicTypes?.outputType ?? schemaToTypeScriptType(tool.outputs),
      rawInputSchema: mapped.rawInputSchema,
      rawOutputSchema: publicTypes?.rawResponseSchema,
      requiredInputKeys: Array.isArray(inputSchemaRecord?.required) ? inputSchemaRecord.required : [],
      toolName: strippedToolName,
    };

    byOperationId.set(strippedToolName, operation);
    byMethodAndPath.set(
      getOperationKey(mapped.runtimeMetadata.method, mapped.runtimeMetadata.routeTemplate),
      operation
    );
  }

  return { byMethodAndPath, byOperationId };
}

function formatResponseCodes(operation: OpenAPIV3.OperationObject | undefined): string {
  const responseCodes = operation ? Object.keys(operation.responses ?? {}) : [];

  if (responseCodes.length === 0) {
    return "Not declared in OpenAPI";
  }

  return responseCodes
    .sort((left, right) => left.localeCompare(right))
    .map((code) => `\`${code}\``)
    .join(", ");
}

function formatListOrNone(values: string[]): string {
  return values.length > 0 ? values.map((value) => `\`${value}\``).join(", ") : "None";
}

function getClientPackageSpecifier(provider: string): string {
  return getProviderImportSpecifier(provider);
}

function getOperationMethodName(
  operation: AugmentedOperation | undefined,
  fallbackOperationId: string | undefined,
  method: string,
  route: string
): string {
  if (operation) {
    return operation.accessPath.join(".");
  }

  if (fallbackOperationId) {
    return toCamelCase(fallbackOperationId);
  }

  return `${method.toLowerCase()}${toPascalCase(route)}`;
}

function getOverviewBlurb(groups: ReturnType<typeof groupOpenApiOperations>): string {
  if (groups.length === 0) {
    return "This client exposes typed operations generated from the provider OpenAPI specification.";
  }

  const topGroups = groups
    .slice()
    .sort((left, right) => right.operations.length - left.operations.length)
    .slice(0, 4)
    .map((group) => group.title);

  return `This client wraps the provider API in typed methods focused on ${topGroups.join(", ")}.`;
}

function truncateInlineType(value: string, maxLength = 220): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 1)}...` : normalized;
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

async function readExistingDocsMetadata(outputDir: string): Promise<ExistingDocsMetadata> {
  const packageJsonPath = path.join(outputDir, "package.json");

  try {
    const raw = await readFile(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const utdk = parsed.utdk as Record<string, unknown> | undefined;
    const docs = utdk?.docs as Record<string, unknown> | undefined;

    return {
      openApiHash: toOptionalString(docs?.openApiHash) ?? null,
      promptHash: toOptionalString(docs?.promptHash) ?? null,
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

// ---------------------------------------------------------------------------
// Per-group doc content builder
// ---------------------------------------------------------------------------

type GroupDocOptions = {
  openApiDocument: OpenAPIV3.Document;
  operationLookup: ReturnType<typeof buildOperationLookup>;
  packageSpecifier: string;
  clientVariable: string;
  promptsHash: string;
  schemaContext?: SchemaRenderContext;
};

function isExpandableObjectSchema(schema: unknown): boolean {
  const record = schema as { type?: string; properties?: Record<string, unknown> } | undefined;
  if (!record || typeof record !== "object") return false;
  if (record.type !== "object" && !record.properties) return false;
  return Object.keys(record.properties ?? {}).length > 0;
}

/**
 * Render an operation as a TypeScript signature — the same shape a user sees
 * in their editor, with named component types for outputs and documented
 * properties for inputs.
 */
function renderDocSignature(
  callPath: string,
  operation: AugmentedOperation | undefined,
  context?: SchemaRenderContext,
): string {
  if (!operation) {
    return `${callPath}(input): Promise<unknown>`;
  }

  const inputSource = operation.rawInputSchema;
  const inputTypeStr =
    inputSource && isExpandableObjectSchema(inputSource)
      ? `{\n${schemaToObjectContent(inputSource, "  ", context)}\n}`
      : inputSource
        ? schemaToTypeScriptType(inputSource, context)
        : operation.inputType;
  const outputTypeStr =
    operation.rawOutputSchema !== undefined
      ? schemaToTypeScriptType(operation.rawOutputSchema, context)
      : operation.outputType;

  const parameters = [
    operation.hasInput ? `input: ${inputTypeStr}` : undefined,
    operation.hasOptions
      ? `options${operation.optionsOptional ? "?" : ""}: ${truncateInlineType(operation.optionsType)}`
      : undefined,
  ].filter((value): value is string => Boolean(value));

  return `${callPath}(${parameters.join(", ")}): Promise<${truncateInlineType(outputTypeStr, 400)}>`;
}

function buildGroupDocContent(
  group: ReturnType<typeof groupOpenApiOperations>[number],
  opts: GroupDocOptions
): string {
  const { openApiDocument, operationLookup, packageSpecifier, clientVariable, promptsHash, schemaContext } = opts;
  const fallbackSourceUrl =
    openApiDocument.externalDocs?.url ?? toOptionalString(openApiDocument.info?.contact?.url);

  return [
    `# ${group.title}`,
    "",
    `${group.operations.length} operation${group.operations.length === 1 ? "" : "s"} · \`${packageSpecifier}\``,
    "",
    "```ts",
    `import ${clientVariable} from "${packageSpecifier}";`,
    "```",
    "",
    ...group.operations.flatMap((operation) => {
      const openApiOperation = getOperationFromPath(
        openApiDocument,
        operation.path,
        operation.method
      );
      const operationDetails =
        operationLookup.byMethodAndPath.get(getOperationKey(operation.method, operation.path)) ??
        (operation.operationId
          ? operationLookup.byOperationId.get(operation.operationId)
          : undefined);
      const methodName = getOperationMethodName(
        operationDetails,
        operation.operationId,
        operation.method,
        operation.path
      );
      const callPath = `${clientVariable}.${methodName}`;
      const operationDescription =
        operation.summary ??
        openApiOperation?.summary ??
        openApiOperation?.description ??
        operationDetails?.description;
      const docsUrl = openApiOperation?.externalDocs?.url ?? operationDetails?.docsUrl;
      const descriptionLine = [
        operationDescription?.trim().replace(/\s+/g, " "),
        docsUrl
          ? `[API reference](${docsUrl})`
          : fallbackSourceUrl
            ? `[Provider docs](${fallbackSourceUrl})`
            : undefined,
      ]
        .filter(Boolean)
        .join(" — ");

      return [
        `## \`${callPath}\``,
        "",
        ...(descriptionLine ? [descriptionLine, ""] : []),
        "```ts",
        renderDocSignature(callPath, operationDetails, schemaContext),
        "```",
        "",
        `<sub>\`${operation.method.toUpperCase()} ${operation.path}\`${
          operation.operationId ? ` · \`${operation.operationId}\`` : ""
        }</sub>`,
        "",
      ];
    }),
    "Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.",
    "",
    "<!-- prompt-hash:",
    promptsHash,
    "-->",
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// README builder
// ---------------------------------------------------------------------------

/**
 * Summarize the spec's `securitySchemes` as setup-oriented bullets that match
 * the gateway credential model. (The LLM auth phase can later replace these
 * with richer, provider-specific setup steps.)
 */
function buildAuthSection(openApiDocument: OpenAPIV3.Document): string[] {
  const schemes = openApiDocument.components?.securitySchemes ?? {};
  const bullets: string[] = [];

  for (const definition of Object.values(schemes)) {
    if (!definition || typeof definition !== "object" || "$ref" in definition) continue;

    if (definition.type === "http" && definition.scheme === "bearer") {
      bullets.push("- **Bearer token** — sent as `Authorization: Bearer <token>`.");
    } else if (definition.type === "http") {
      bullets.push(`- **HTTP ${definition.scheme}** authentication.`);
    } else if (definition.type === "apiKey") {
      bullets.push(`- **API key** — sent as the \`${definition.name}\` ${definition.in}.`);
    } else if (definition.type === "oauth2") {
      const flows = Object.keys(definition.flows ?? {});
      bullets.push(`- **OAuth 2.0** — flows: ${flows.join(", ") || "unspecified"}.`);
    } else if (definition.type === "openIdConnect") {
      bullets.push(`- **OpenID Connect** — [discovery document](${definition.openIdConnectUrl}).`);
    }
  }

  if (bullets.length === 0) {
    return [];
  }

  return [
    "## Authentication",
    "",
    ...bullets,
    "",
    "Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.",
    "",
  ];
}

/** Pick a friendly first call for the quick start: prefer no-input GETs. */
function pickExampleOperation(
  operationLookup: ReturnType<typeof buildOperationLookup>,
): AugmentedOperation | undefined {
  const operations = [...operationLookup.byOperationId.values()];

  return (
    operations.find((operation) => operation.httpMethod.toUpperCase() === "GET" && !operation.hasInput) ??
    operations.find((operation) => operation.httpMethod.toUpperCase() === "GET" && operation.requiredInputKeys.length === 0) ??
    operations.find((operation) => operation.httpMethod.toUpperCase() === "GET") ??
    operations[0]
  );
}

function buildReadme(options: {
  provider: string;
  openApiDocument: OpenAPIV3.Document;
  groups: ReturnType<typeof groupOpenApiOperations>;
  operationLookup: ReturnType<typeof buildOperationLookup>;
  packageSpecifier: string;
  clientVariable: string;
  indexMarkdown: string;
}): string {
  const { provider, openApiDocument, groups, operationLookup, packageSpecifier, clientVariable, indexMarkdown } = options;
  const title = toOptionalString(openApiDocument.info?.title) ?? provider;
  const example = pickExampleOperation(operationLookup);
  const exampleArgs = example
    ? example.requiredInputKeys.length > 0
      ? `{ /* ${example.requiredInputKeys.join(", ")} */ }`
      : example.hasInput
        ? "{}"
        : ""
    : "{}";
  const exampleCall = example
    ? `const result = await ${clientVariable}.${example.accessPath.join(".")}(${exampleArgs});`
    : `const result = await ${clientVariable}.someOperation({});`;

  return [
    `# ${title}`,
    "",
    `\`${packageSpecifier}\` — a typed SDK generated from the provider's OpenAPI spec. ${getOverviewBlurb(groups)}`,
    "",
    "## Quick start",
    "",
    "```ts",
    `import ${clientVariable} from "${packageSpecifier}";`,
    "",
    exampleCall,
    "```",
    "",
    `In the UTDK isolate runtime, \`${clientVariable}\` is also available directly as a namespace value — no import needed.`,
    "",
    ...buildAuthSection(openApiDocument),
    "## Operations",
    "",
    ...groups.map(
      (group) =>
        `- [${group.title}](./docs/${group.key}.md) — ${group.operations.length} operation${group.operations.length === 1 ? "" : "s"}`
    ),
    "",
    "Every operation is a typed method (`" +
      `${clientVariable}.group.action(input)` +
      "`); result shapes are named exported types you can hover in your editor.",
    "",
    "## Source Index",
    "",
    indexMarkdown.trim(),
    "",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Main augmentation pipeline
// ---------------------------------------------------------------------------

export async function augmentProviderDocs(
  options: AugmentProviderDocsOptions
): Promise<AugmentProviderDocsResult> {
  const manifestPath = resolveProviderDocsManifestPath(options.provider, options.docsCacheRoot);
  const indexPath = resolveProviderDocsIndexPath(options.provider, options.docsCacheRoot);
  const outputDir = resolveProviderOutputDir(options.provider, options.outputRoot);
  const docsOutputPath = path.join(outputDir, "docs");
  const manifest = await readDocsManifest(manifestPath);

  let indexMarkdown = "";
  let staleReason = "";

  const prompts = await loadDocsPromptAssets();

  if (!manifest) {
    indexMarkdown = "";
    staleReason = "docs-cache-missing";
  } else {
    try {
      indexMarkdown = await readFile(indexPath, "utf8");
    } catch (error: unknown) {
      if (typeof error === "object" && error && "code" in error && error.code === "ENOENT") {
        indexMarkdown = "";
      } else {
        throw error;
      }
    }

    const existing = await readExistingDocsMetadata(outputDir);
    const staleCheck = getDocsStaleCheckResult({
      previousManifestVersion: manifest.schemaVersion,
      previousOpenApiHash: existing.openApiHash,
      nextOpenApiHash: manifest.openApi.hash,
      previousPromptHash: existing.promptHash,
      nextPromptHash: prompts.hash,
    });

    if (
      !options.overwriteDocs &&
      !staleCheck.isStale &&
      (existing.openApiHash != null || existing.promptHash != null)
    ) {
      throw new DocsPipelineError(
        "DOCS_OVERWRITE_BLOCKED",
        `Docs outputs for ${options.provider} are up to date. Pass --overwrite-docs to replace unchanged README/docs output.`,
        {
          provider: options.provider,
          staleReason: staleCheck.reason,
          manifestPath,
          indexPath,
        }
      );
    }

    staleReason = staleCheck.reason;
  }

  const groups = groupOpenApiOperations(options.openApiDocument);
  const schemaTypes = createProviderSchemaTypes(options.openApiDocument);
  const schemaContext: SchemaRenderContext | undefined = createSchemaRenderContext(schemaTypes);
  // Same context the docs render with, so response `$ref`s collapse to names
  // rather than being materialized (unbounded on cross-referential specs).
  const publicTypeMap = buildPublicTypeMap(options.openApiDocument, options.tools ?? [], schemaContext);
  const operationLookup = buildOperationLookup(
    options.provider,
    options.providerOptions,
    options.tools,
    options.clientToolMap,
    publicTypeMap,
  );
  const packageSpecifier = getClientPackageSpecifier(options.provider);
  const clientVariable = toCamelCase(options.provider.split(/[./]/u).at(-1) ?? options.provider);
  const groupDocOpts: GroupDocOptions = {
    openApiDocument: options.openApiDocument,
    operationLookup,
    packageSpecifier,
    clientVariable,
    promptsHash: prompts.hash,
    schemaContext,
  };
  const docs = groups.map((group) => ({
    relativePath: `${group.key}.md`,
    content: buildGroupDocContent(group, groupDocOpts),
  }));
  const readme = buildReadme({
    provider: options.provider,
    openApiDocument: options.openApiDocument,
    groups,
    operationLookup,
    packageSpecifier,
    clientVariable,
    indexMarkdown,
  });

  return {
    readme,
    docs,
    metadata: {
      manifestPath,
      indexPath,
      docsPath: docsOutputPath,
      generatedAt: new Date().toISOString(),
      sourceCount: manifest?.sources.length ?? 0,
      openApiHash: manifest?.openApi.hash ?? null,
      promptHash: prompts.hash,
    },
    staleReason: staleReason,
  };
}
