import { OpenApiConverter } from "@utcp/http";
import type { AuthProvider } from "@utdk/common";

export interface ProviderTool {
  /** MCP tool name (e.g. "github__repos_list") */
  mcpName: string;
  /** Original UTCP tool name (e.g. "github.repos/list") */
  utcpName: string;
  description: string;
  /** JSON Schema for the tool's inputs */
  inputSchema: Record<string, unknown>;
  /** Provider name (e.g. "github") */
  providerName: string;
  /** OpenAPI operation tags (e.g. ["repos", "issues"]) */
  tags: string[];
  /** Transport method (e.g. "GET", "POST") */
  method: string;
  /** Route template with {param} placeholders */
  routeTemplate: string;
  /** Content-Type for requests */
  contentType: string;
  /** Parameter keys that appear in the URL path */
  pathParamKeys: string[];
  /** Parameter keys that should go in query string for GET/DELETE */
  queryParamKeys: string[];
  /** Auth provider for this provider */
  auth: AuthProvider | undefined;
}

export interface UtdkAuthConfig {
  auth_type: string;
  api_key?: string;
  var_name?: string;
  location?: string;
  token_url?: string;
  client_id?: string;
  client_secret?: string;
  scope?: string;
}

interface UtdkPackageJson {
  /** Absent on suite leaf packages — they are private subpaths of "utdk". */
  name?: string;
  utdk?: {
    provider: string;
    auth?: UtdkAuthConfig[];
    openapi?: {
      title?: string;
    };
  };
}

interface TransportCallTemplate {
  call_template_type: string;
  http_method?: string;
  url?: string;
  content_type?: string;
}

function extractPathParams(routeTemplate: string): string[] {
  const matches = routeTemplate.match(/\{([^}]+)\}/g) ?? [];
  return matches.map((m) => m.slice(1, -1));
}

function toMcpToolName(utcpName: string): string {
  return utcpName.replace(/\./g, "__").replace(/[^a-zA-Z0-9_-]/g, "_");
}

/**
 * Resolve the import specifier base for a provider.
 *
 * Top-level providers ("github") are standalone scoped packages
 * (@utdk/github). Vendor-suite providers ("google/drive") are subpaths of the
 * root "utdk" package (utdk/google/drive) — there is no per-vendor scoped
 * package. The root package's exports map exposes the per-provider
 * openapi.json/package.json from its built dist.
 */
function getProviderImportBase(providerName: string): string {
  return providerName.includes("/") ? `utdk/${providerName}` : `@utdk/${providerName}`;
}

/**
 * Load a provider package's OpenAPI document and package metadata.
 * This is the single choke point for the openapi.json dynamic-import contract.
 * Returns null if the package cannot be found or loaded.
 */
export async function loadProviderPackage(providerName: string): Promise<{
  openApiDoc: Record<string, unknown>;
  packageJson: UtdkPackageJson;
} | null> {
  const packageName = getProviderImportBase(providerName);

  try {
    const [openApiMod, pkgMod] = await Promise.all([
      import(`${packageName}/openapi.json`, { with: { type: "json" } }).catch(() => null),
      import(`${packageName}/package.json`, { with: { type: "json" } }).catch(() => null),
    ]);

    if (!openApiMod || !pkgMod) {
      process.stderr.write(
        `[mcp-core] Warning: could not import openapi.json or package.json for ${packageName}\n`,
      );
      return null;
    }

    return {
      openApiDoc: (openApiMod as { default: Record<string, unknown> }).default as Record<
        string,
        unknown
      >,
      packageJson: (pkgMod as { default: UtdkPackageJson }).default as UtdkPackageJson,
    };
  } catch (err) {
    process.stderr.write(
      `[mcp-core] Warning: failed to load provider ${providerName}: ${err}\n`,
    );
    return null;
  }
}

function buildProviderTools(
  providerName: string,
  openApiDoc: Record<string, unknown>,
  auth: AuthProvider | undefined,
): ProviderTool[] {
  const converter = new OpenApiConverter(openApiDoc, {
    callTemplateName: providerName,
  });

  const manual = converter.convert();
  const tools: ProviderTool[] = [];

  for (const tool of manual.tools) {
    const template = tool.tool_call_template as TransportCallTemplate | undefined;
    if (!template) continue;

    const routeTemplate = template.url ?? "/";
    const method = (template.http_method ?? "GET").toUpperCase();
    const contentType = template.content_type ?? "application/json";
    const pathParamKeys = extractPathParams(routeTemplate);

    const inputProperties = (tool.inputs?.properties ?? {}) as Record<string, unknown>;
    const allInputKeys = Object.keys(inputProperties);
    const isBodyMethod = ["POST", "PUT", "PATCH"].includes(method);
    const queryParamKeys = isBodyMethod
      ? []
      : allInputKeys.filter((k) => !pathParamKeys.includes(k));

    tools.push({
      mcpName: toMcpToolName(tool.name),
      utcpName: tool.name,
      description: tool.description ?? `${method} ${routeTemplate}`,
      inputSchema: tool.inputs as Record<string, unknown>,
      providerName,
      tags: (tool.tags as string[] | undefined) ?? [],
      method,
      routeTemplate,
      contentType,
      pathParamKeys,
      queryParamKeys,
      auth,
    });
  }

  return tools;
}

/**
 * Callback for authenticating and executing a tool call.
 * The stdio server passes a fetch-based implementation; the gateway passes its own executor.
 */
export type AuthFactory = (
  providerName: string,
  authConfigs: UtdkAuthConfig[],
) => AuthProvider | undefined;

/**
 * Load all tools for a list of provider names.
 * Providers that fail to load are skipped with a warning.
 * Pass `buildAuth` to attach credentials; omit it for unauthenticated tool loading.
 */
export async function loadProviders(
  providerNames: string[],
  buildAuth?: AuthFactory,
): Promise<ProviderTool[]> {
  const allTools: ProviderTool[] = [];

  await Promise.all(
    providerNames.map(async (providerName) => {
      const pkg = await loadProviderPackage(providerName);
      if (!pkg) return;

      const authConfigs = pkg.packageJson.utdk?.auth ?? [];
      const auth = buildAuth?.(providerName, authConfigs);

      const tools = buildProviderTools(providerName, pkg.openApiDoc, auth);
      process.stderr.write(
        `[mcp-core] Loaded ${tools.length} tools from ${getProviderImportBase(providerName)}\n`,
      );
      allTools.push(...tools);
    }),
  );

  return allTools;
}

/**
 * Parse the UTDK_PROVIDERS environment variable.
 * Returns an array of provider names (e.g. ["github", "slack", "stripe"]).
 */
export function parseProviderNames(envValue: string | undefined): string[] {
  if (!envValue?.trim()) return [];
  return envValue
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}
