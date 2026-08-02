/**
 * Public API of @utdk/mcp-core.
 *
 * Shared tool catalog + meta-tool handlers consumed by both the stdio MCP
 * server (@utdk/mcp) and the hosted gateway (Phase 2). Nothing here depends on
 * a specific transport: tool execution is injected via the {@link Execute}
 * callback in {@link handleCallTool}.
 */
export * from "./loader.js";
export * from "./search.js";
export * from "./meta-tools.js";
