/**
 * Workspace telemetry MCP tools — the debugging store over MCP, so external
 * agents can monitor and debug widgets/workflows (docs/telemetry-and-agents.md).
 *
 * Registered with the registry-server MCP surface via the `mcp.extensions`
 * hook (registry-server-extraction §9.3) rather than a standalone assembly.
 */

import type { Principal } from "../middleware/auth.js";

export const TELEMETRY_TOOLS = [
  {
    name: "telemetry_traces",
    description:
      "Recent traces from the workspace telemetry store, newest first: {traceId, name, source, startedAt, spans, logs, errors, status}. Filter with source ('tool'|'workflow'|'widget'|'app'|'chat'), path (script path), app, runId, status ('error' to see recent failures), since (ISO), limit. Start here to find what failed, then telemetry_query with the traceId.",
    inputSchema: {
      type: "object" as const,
      properties: {
        source: { type: "string" },
        path: { type: "string" },
        app: { type: "string" },
        runId: { type: "string" },
        status: { type: "string" },
        since: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "telemetry_query",
    description:
      "Telemetry events (spans + console logs), newest first. Filters: traceId, source, path, app, runId, level, status, since, limit. Error spans carry {error: {message, stack}}; workflow console output arrives as log events. Full workflow run records (all logs/spans) live behind call_tool workflows.trace {run: <runId>}.",
    inputSchema: {
      type: "object" as const,
      properties: {
        traceId: { type: "string" },
        source: { type: "string" },
        path: { type: "string" },
        app: { type: "string" },
        runId: { type: "string" },
        level: { type: "string" },
        status: { type: "string" },
        since: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
];

export const TELEMETRY_TOOL_NAMES = new Set(TELEMETRY_TOOLS.map((t) => t.name));

export async function handleTelemetryTool(
  principal: Principal,
  toolName: string,
  args: Record<string, unknown>,
) {
  try {
    const { telemetryService: service } = await import("../telemetry/service.js");
    if (!service) throw new Error("telemetry service unavailable");
    const procedure = toolName === "telemetry_traces" ? "traces" : "query";
    const data = await service.call(
      { workspaceId: principal.workspaceId, userId: principal.sub },
      procedure,
      args,
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
  } catch (err) {
    return {
      isError: true,
      content: [
        { type: "text" as const, text: err instanceof Error ? err.message : String(err) },
      ],
    };
  }
}
