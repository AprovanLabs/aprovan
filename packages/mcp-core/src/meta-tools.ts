import { searchTools, groupTools } from "./search.js";
import type { ProviderTool } from "./loader.js";

// ---------------------------------------------------------------------------
// Result shape (structurally compatible with MCP SDK CallToolResult)
// ---------------------------------------------------------------------------

/**
 * A text content block. Structurally compatible with the MCP SDK's text
 * `ContentBlock` so handlers can be returned directly from a tools/call
 * handler.
 */
export interface TextContent {
  type: "text";
  text: string;
}

/**
 * Result of a tools/call handler. Structurally compatible with the MCP SDK's
 * `CallToolResult` so values returned from these handlers can be passed
 * straight back to the SDK without an adapter: the stdio server returns them
 * directly from its `tools/call` request handler, and the hosted gateway
 * (Phase 2) serializes the same shape over HTTP. mcp-core deliberately does
 * not depend on `@modelcontextprotocol/sdk`; the handlers return fresh object
 * literals whose inferred types are assignable to the SDK's `ServerResult`
 * union, and this interface is the documented shape of those literals.
 */
export interface CallToolResult {
  content: TextContent[];
  isError?: boolean;
}

// ---------------------------------------------------------------------------
// Schema normalization
// ---------------------------------------------------------------------------

/**
 * Ensure the input schema is a valid MCP tool inputSchema (type: "object").
 */
export function normalizeInputSchema(schema: Record<string, unknown>): {
  type: "object";
  properties?: Record<string, object>;
  required?: string[];
} {
  return {
    type: "object",
    ...(schema["properties"]
      ? { properties: schema["properties"] as Record<string, object> }
      : {}),
    ...(schema["required"] ? { required: schema["required"] as string[] } : {}),
  };
}

// ---------------------------------------------------------------------------
// Meta-tool definitions (served by tools/list)
// ---------------------------------------------------------------------------

export const META_TOOLS = [
  {
    name: "list_tools",
    description:
      "List available tool names without full schemas. Pass an optional provider to filter results, or group_by to organize by category.",
    inputSchema: {
      type: "object" as const,
      properties: {
        provider: {
          type: "string",
          description: "Filter results to tools from this provider name (e.g. 'github')",
        },
        group_by: {
          type: "string",
          enum: ["provider", "tag"],
          description:
            "Group results by 'provider' or by OpenAPI 'tag'. When omitted, returns a flat list of names.",
        },
      },
    },
  },
  {
    name: "search_tools",
    description:
      "Find tools by keyword. Searches tool names, OpenAPI tags, and descriptions using TF-IDF relevance ranking so the LLM can locate relevant tools without browsing the full catalog.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description:
            "Natural language or keyword search (all words must appear in name, tags, or description)",
        },
        provider: {
          type: "string",
          description: "Restrict search to tools from this provider name (e.g. 'github')",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default 10)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "tool_info",
    description:
      "Get the full schema and metadata for a specific tool by name. Use this after list_tools or search_tools to retrieve the complete input schema before calling the tool.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tool_name: {
          type: "string",
          description: "The MCP tool name (e.g. 'github__repos_list')",
        },
      },
      required: ["tool_name"],
    },
  },
  {
    name: "call_tool",
    description:
      "Execute any registered tool by name with the provided arguments. Use tool_info first to get the correct argument schema.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tool_name: {
          type: "string",
          description: "The MCP tool name to execute (e.g. 'github__repos_list')",
        },
        arguments: {
          type: "object",
          description: "Arguments to pass to the tool",
        },
      },
      required: ["tool_name", "arguments"],
    },
  },
];

// ---------------------------------------------------------------------------
// Meta-tool call handlers
//
// Each handler returns a fresh object literal (no explicit return annotation)
// so the inferred type stays assignable to the MCP SDK's `ServerResult`
// union, which includes an index-signature envelope that named interface types
// cannot satisfy. `type: "text" as const` keeps the content block's `type`
// literal so the result is still assignable to {@link CallToolResult}.
// ---------------------------------------------------------------------------

export function handleListTools(tools: ProviderTool[], args: Record<string, unknown>) {
  const providerFilter =
    typeof args["provider"] === "string" ? args["provider"] : undefined;
  const groupBy =
    args["group_by"] === "provider" || args["group_by"] === "tag"
      ? (args["group_by"] as "provider" | "tag")
      : undefined;
  const filtered = providerFilter
    ? tools.filter((t) => t.providerName === providerFilter)
    : tools;
  const result =
    groupBy === "provider" || groupBy === "tag"
      ? groupTools(filtered, groupBy)
      : filtered.map((t) => t.mcpName);
  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
  };
}

export function handleSearchTools(tools: ProviderTool[], args: Record<string, unknown>) {
  const query = typeof args["query"] === "string" ? args["query"] : "";
  const providerFilter =
    typeof args["provider"] === "string" ? args["provider"] : undefined;
  const limit =
    typeof args["limit"] === "number" && args["limit"] > 0 ? Math.floor(args["limit"]) : 10;
  const results = searchTools(tools, query, providerFilter, limit);
  return {
    content: [{ type: "text" as const, text: JSON.stringify(results, null, 2) }],
  };
}

export function handleToolInfo(
  toolMap: Map<string, ProviderTool>,
  args: Record<string, unknown>,
) {
  const requestedName = typeof args["tool_name"] === "string" ? args["tool_name"] : "";
  const tool = toolMap.get(requestedName);
  if (!tool) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Unknown tool: ${requestedName}` }],
    };
  }
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            name: tool.mcpName,
            description: tool.description,
            provider: tool.providerName,
            inputSchema: normalizeInputSchema(tool.inputSchema),
          },
          null,
          2,
        ),
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// execute() contract for handleCallTool
// ---------------------------------------------------------------------------

/**
 * Payload handed to an {@link Execute} callback: the resolved tool plus the
 * arguments extracted from the `call_tool` meta-tool's `arguments` field.
 */
export interface ExecuteInput {
  tool: ProviderTool;
  args: Record<string, unknown>;
}

/**
 * Transport-agnostic result of executing a tool.
 *
 * - `ok: true` carries the parsed tool output (`data`); mcp-core serializes it
 *   as the `text` content of the {@link CallToolResult}.
 * - `ok: false` carries an `error` message; mcp-core surfaces it as an
 *   `isError` {@link CallToolResult}.
 *
 * The stdio server wraps its `fetch`-based executor (which throws on HTTP
 * errors) into this discriminated union; the hosted gateway (Phase 2) maps its
 * `IsolateResult` onto the same shape. Keeping errors as values (instead of
 * throwing) lets both transports share a single handler.
 */
export type ExecuteResult = { ok: true; data: unknown } | { ok: false; error: string };

/**
 * Callback that performs the actual tool execution. Injected into
 * {@link handleCallTool} so the handler stays transport-agnostic: the stdio
 * server passes a `fetch`-based implementation, the gateway passes its own
 * executor.
 */
export type Execute = (input: ExecuteInput) => Promise<ExecuteResult>;

/**
 * Handle a `call_tool` meta-tool invocation.
 *
 * `tool` is the *resolved* tool (the caller looks it up in its tool map, which
 * for the gateway is the per-caller filtered catalog); `undefined` produces an
 * "Unknown tool" result, matching the prior stdio behavior. The injected
 * `execute` callback is invoked with `{ tool, args }` (the arguments extracted
 * from `args["arguments"]`) and its {@link ExecuteResult} is wrapped in a
 * {@link CallToolResult}.
 */
export async function handleCallTool(
  tool: ProviderTool | undefined,
  args: Record<string, unknown>,
  execute: Execute,
) {
  const requestedName = typeof args["tool_name"] === "string" ? args["tool_name"] : "";
  if (!tool) {
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Unknown tool: ${requestedName}` }],
    };
  }
  const toolArgs =
    typeof args["arguments"] === "object" && args["arguments"] !== null
      ? (args["arguments"] as Record<string, unknown>)
      : {};
  const result = await execute({ tool, args: toolArgs });
  if (!result.ok) {
    return {
      isError: true,
      content: [
        { type: "text" as const, text: `Error calling ${tool.mcpName}: ${result.error}` },
      ],
    };
  }
  const text =
    typeof result.data === "string" ? result.data : JSON.stringify(result.data, null, 2);
  return { content: [{ type: "text" as const, text }] };
}
