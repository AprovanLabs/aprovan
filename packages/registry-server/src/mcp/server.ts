/**
 * MCP surface (tech-plan D10): a thin adapter over the dispatch pipeline.
 *
 * Built per request from @utdk/mcp-core meta-tools (list/search/info/call);
 * the full tool catalog loads once and is cached at module scope. `call_tool`
 * executes through `dispatch()` — gaining Profiles, grants, limits, audit,
 * and attribution — which closes the old MCP drift (first-credential
 * resolution, no interface routing).
 *
 * Product-plane features (workspace fs tools, prompts, artifacts) do NOT
 * live here; the host re-attaches them via the `mcp.extensions` hook.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  handleCallTool,
  handleListTools,
  handleSearchTools,
  handleToolInfo,
  loadProviders,
  parseProviderNames,
  META_TOOLS,
  type Execute,
  type ProviderTool,
} from "@utdk/mcp-core";
import { resolveProfile } from "../profiles/resolve.js";
import { ServiceError } from "../kernel/index.js";
import type { CallContext, McpExtensions } from "../config/types.js";
import type { Dispatcher } from "../dispatch/index.js";
import type { ResolveDeps } from "../profiles/resolve.js";

// ---------------------------------------------------------------------------
// Module-level catalog cache (loaded once at first call)
// ---------------------------------------------------------------------------

let _catalog: ProviderTool[] | undefined;
let _catalogLoading: Promise<ProviderTool[]> | undefined;

async function getCatalog(): Promise<ProviderTool[]> {
  if (_catalog) return _catalog;
  if (_catalogLoading) return _catalogLoading;
  _catalogLoading = (async () => {
    const providerNames = parseProviderNames(process.env["UTDK_PROVIDERS"]);
    const tools = await loadProviders(providerNames);
    _catalog = tools;
    return tools;
  })();
  return _catalogLoading;
}

/** Reset the cached catalog (used in tests). */
export function resetMcpCatalog(): void {
  _catalog = undefined;
  _catalogLoading = undefined;
}

/** Test seam: pin the catalog without importing utdk provider packages. */
export function setMcpCatalogForTesting(tools: ProviderTool[]): void {
  _catalog = tools;
  _catalogLoading = undefined;
}

// ---------------------------------------------------------------------------
// Permission filter
// ---------------------------------------------------------------------------

/** "github.repos/list" → "repos.list" for the dispatch pipeline. */
function toolOperation(tool: ProviderTool): string {
  const rawOp = tool.utcpName.startsWith(`${tool.providerName}.`)
    ? tool.utcpName.slice(tool.providerName.length + 1)
    : tool.utcpName;
  return rawOp.replace(/\//g, ".");
}

/**
 * Visibility follows dispatchability: a member sees a namespace's tools iff
 * profile resolution would admit them (a stored default profile they lack a
 * grant for hides the namespace; the ungoverned zero-config path shows it).
 * Admins and auth-none see everything.
 */
async function permittedTools(
  all: ProviderTool[],
  ctx: CallContext,
  resolveDeps: ResolveDeps,
): Promise<ProviderTool[]> {
  if (resolveDeps.authMode === "none" || ctx.role === "admin") return all;
  const namespaces = [...new Set(all.map((tool) => tool.providerName))];
  const allowed = new Set<string>();
  for (const namespace of namespaces) {
    try {
      await resolveProfile(resolveDeps, ctx, namespace);
      allowed.add(namespace);
    } catch (err) {
      // 403 = not granted → hidden. Anything else (no credential, unknown)
      // keeps the namespace visible; dispatch reports the real error.
      if (!(err instanceof ServiceError && err.status === 403)) allowed.add(namespace);
    }
  }
  return all.filter((tool) => allowed.has(tool.providerName));
}

// ---------------------------------------------------------------------------
// Server factory
// ---------------------------------------------------------------------------

export interface McpDeps {
  dispatcher: Dispatcher;
  resolveDeps: ResolveDeps;
  extensions?: McpExtensions;
  serverName?: string;
}

export async function buildMcpServer(deps: McpDeps, ctx: CallContext): Promise<Server> {
  const all = await getCatalog();
  const permitted = await permittedTools(all, ctx, deps.resolveDeps);
  const permittedMap = new Map<string, ProviderTool>(permitted.map((t) => [t.mcpName, t]));
  const extensions = deps.extensions;
  const extensionTools = extensions?.tools ?? [];
  const extensionToolNames = new Set(extensionTools.map((t) => t.name));

  const server = new Server(
    { name: deps.serverName ?? "@aprovan/registry-server", version: "0.1.0" },
    {
      capabilities: {
        tools: { listChanged: false },
        prompts: { listChanged: false },
        resources: { listChanged: false },
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [...extensionTools, ...META_TOOLS],
  }));

  const execute: Execute = async (input) => {
    const provider = input.tool.providerName;
    const operation = toolOperation(input.tool);
    try {
      const result = await deps.dispatcher.dispatch(ctx, provider, operation, input.args);
      if (result.kind === "stream") {
        // MCP tool results are buffered text: drain the stream.
        const text = await new Response(result.stream).text();
        return { ok: true as const, data: text };
      }
      return { ok: true as const, data: result.data };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  };

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = (request.params.arguments ?? {}) as Record<string, unknown>;

    if (extensionToolNames.has(toolName) && extensions?.handleTool) {
      return extensions.handleTool(ctx, toolName, args);
    }
    if (toolName === "list_tools") return handleListTools(permitted, args);
    if (toolName === "search_tools") return handleSearchTools(permitted, args);
    if (toolName === "tool_info") return handleToolInfo(permittedMap, args);
    if (toolName === "call_tool") {
      const requestedName = typeof args["tool_name"] === "string" ? args["tool_name"] : "";
      const tool = permittedMap.get(requestedName);
      if (!tool) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: `forbidden: caller does not have permission for ${requestedName}`,
            },
          ],
        };
      }
      return handleCallTool(tool, args, execute);
    }
    return {
      isError: true,
      content: [
        {
          type: "text" as const,
          text: `Unknown tool: ${toolName}. Use list_tools or search_tools to discover tools, then call_tool to execute them.`,
        },
      ],
    };
  });

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: extensions?.listPrompts ? await extensions.listPrompts(ctx) : [],
  }));
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    if (!extensions?.getPrompt) throw new Error(`Prompt not found: ${request.params.name}`);
    return extensions.getPrompt(ctx, request.params.name);
  });
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: extensions?.listResources ? await extensions.listResources(ctx) : [],
  }));
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (!extensions?.readResource) {
      throw new Error(`Resource not found: ${request.params.uri}`);
    }
    return extensions.readResource(ctx, request.params.uri);
  });

  return server;
}

/** The per-request streamable-HTTP handler wired into ALL /mcp. */
export function createMcpHandler(deps: McpDeps): (ctx: CallContext, request: Request) => Promise<Response> {
  return async (ctx, request) => {
    const { WebStandardStreamableHTTPServerTransport } = await import(
      "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js"
    );
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    const server = await buildMcpServer(deps, ctx);
    await server.connect(transport);
    return transport.handleRequest(request);
  };
}
