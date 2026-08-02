#!/usr/bin/env node
/**
 * @utdk/mcp-server — Unified MCP server with dynamic tool loading.
 *
 * Usage:
 *   UTDK_PROVIDERS=github,slack npx @utdk/mcp-server
 *
 * MCP config:
 *   { "command": "npx", "args": ["@utdk/mcp-server"], "env": { "UTDK_PROVIDERS": "github" } }
 *
 * Environment variables:
 *   UTDK_PROVIDERS          Comma-separated list of @utdk providers to load (required)
 *   UTDK_OTEL_EXPORTER      Telemetry exporter: "otlp" | "console" | unset (noop)
 *   <PROVIDER>_TOKEN        Bearer token for a provider (e.g. GITHUB_TOKEN)
 *   <PROVIDER>_SECRET_KEY   API key for a provider (e.g. STRIPE_SECRET_KEY)
 *
 * Hot-reload:
 *   Send SIGHUP to reload provider list from the current UTDK_PROVIDERS env value.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { configureTelemetry } from "@utdk/common";
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
import { buildAuthProvider } from "./auth.js";
import { executeTool } from "./loader.js";

// ---------------------------------------------------------------------------
// fetch-based execute callback
// ---------------------------------------------------------------------------

/**
 * Adapt the stdio server's `fetch`-based {@link executeTool} into the
 * transport-agnostic {@link Execute} contract from @utdk/mcp-core.
 * `executeTool` returns parsed output on success and throws on HTTP errors;
 * here success becomes `{ ok: true, data }` and a thrown error becomes
 * `{ ok: false, error }`. The hosted gateway (Phase 2) passes its own
 * executor that maps onto the same contract.
 */
const execute: Execute = async (input) => {
  try {
    const data = await executeTool(input.tool, input.args);
    return { ok: true as const, data };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : String(err) };
  }
};

// ---------------------------------------------------------------------------
// Telemetry init (env-driven, stdio-specific)
// ---------------------------------------------------------------------------

/**
 * Initialize telemetry if UTDK_OTEL_EXPORTER is set.
 */
async function initTelemetry(): Promise<void> {
  const exporter = process.env["UTDK_OTEL_EXPORTER"];
  if (exporter === "otlp" || exporter === "console") {
    await configureTelemetry({ enabled: true, exporter });
  }
}

// ---------------------------------------------------------------------------
// MCP Server factory
// ---------------------------------------------------------------------------

/**
 * Create a low-level MCP Server that serves tools from the given ProviderTool list.
 * Uses raw request handlers for tools/list and tools/call to support dynamic,
 * JSON-schema-based tool definitions without requiring Zod schemas.
 */
function createServer(tools: ProviderTool[]): Server {
  const server = new Server(
    { name: "@utdk/mcp-server", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  // Build a lookup map for fast dispatch
  const toolMap = new Map<string, ProviderTool>(tools.map((t) => [t.mcpName, t]));

  // tools/list — return exactly the 4 meta-tools (no direct provider tool exposure)
  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: META_TOOLS }));

  // tools/call — dispatch to the 4 meta-tools only
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = (request.params.arguments ?? {}) as Record<string, unknown>;

    if (toolName === "list_tools") return handleListTools(tools, args);
    if (toolName === "search_tools") return handleSearchTools(tools, args);
    if (toolName === "tool_info") return handleToolInfo(toolMap, args);
    if (toolName === "call_tool") {
      const requestedName = typeof args["tool_name"] === "string" ? args["tool_name"] : "";
      return handleCallTool(toolMap.get(requestedName), args, execute);
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

  return server;
}

// ---------------------------------------------------------------------------
// Hot-reload support
// ---------------------------------------------------------------------------

/**
 * Reload providers from the current UTDK_PROVIDERS env value.
 * Returns the new tool list (the caller is responsible for reconnecting if needed).
 */
async function reloadProviders(): Promise<ProviderTool[]> {
  const providerNames = parseProviderNames(process.env["UTDK_PROVIDERS"]);
  process.stderr.write(
    `[mcp-server] (Re)loading providers: ${providerNames.join(", ") || "(none)"}\n`,
  );

  const tools = await loadProviders(providerNames, buildAuthProvider);
  process.stderr.write(
    `[mcp-server] Loaded ${tools.length} total tool(s) from ${providerNames.length} provider(s)\n`,
  );
  return tools;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  await initTelemetry();

  const providerNames = parseProviderNames(process.env["UTDK_PROVIDERS"]);

  if (providerNames.length === 0) {
    process.stderr.write(
      "[mcp-server] Warning: UTDK_PROVIDERS is not set — starting with no tools.\n" +
        "[mcp-server] Set UTDK_PROVIDERS=github,slack,stripe to load providers.\n",
    );
  } else {
    process.stderr.write(
      `[mcp-server] Loading providers: ${providerNames.join(", ")}\n`,
    );
  }

  let tools = await loadProviders(providerNames, buildAuthProvider);
  process.stderr.write(
    `[mcp-server] Ready with ${tools.length} tool(s). Starting MCP stdio server...\n`,
  );

  let server = createServer(tools);
  const transport = new StdioServerTransport();

  // SIGHUP → hot-reload provider list.
  // Because the MCP protocol is stateful (initialized per connection), we rebuild
  // the internal request handler registry. The client sees updated tools on the
  // next tools/list request without needing to reconnect.
  process.on("SIGHUP", () => {
    process.stderr.write("[mcp-server] SIGHUP received — reloading providers...\n");
    reloadProviders()
      .then((newTools) => {
        tools = newTools;
        // Rebuild server handlers in-place by re-registering on the existing server.
        // The transport connection is preserved; only the handler registry changes.
        server = createServer(newTools);
        // Reconnect the new server to the existing transport so future messages
        // are routed to the updated handler set.
        server.connect(transport).catch((err) => {
          process.stderr.write(`[mcp-server] Reconnect error after SIGHUP: ${err}\n`);
        });
      })
      .catch((err) => {
        process.stderr.write(`[mcp-server] Reload error: ${err}\n`);
      });
  });

  process.on("SIGTERM", () => {
    process.stderr.write("[mcp-server] SIGTERM received — shutting down.\n");
    process.exit(0);
  });

  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`[mcp-server] Fatal: ${err}\n`);
  process.exit(1);
});
