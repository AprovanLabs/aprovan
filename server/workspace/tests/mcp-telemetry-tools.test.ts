import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
// Importing services installs the core-service registry the MCP tools call.
import "../src/services.js";
import {
  TELEMETRY_TOOLS,
  TELEMETRY_TOOL_NAMES,
  handleTelemetryTool,
} from "../src/mcp/server.js";
import { recordTelemetry } from "../src/telemetry/service.js";
import type { Principal } from "../src/middleware/auth.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-mcp-telemetry-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const principal = {
  sub: "user-1",
  workspaceId: "ws-mcp",
  role: "member",
  groupIds: [],
} as unknown as Principal;

const text = (result: { content: Array<{ text: string }> }) => result.content[0]!.text;

describe("mcp telemetry tools", () => {
  it("exposes both tools with schemas", () => {
    expect([...TELEMETRY_TOOL_NAMES]).toEqual(["telemetry_traces", "telemetry_query"]);
    for (const tool of TELEMETRY_TOOLS) {
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.inputSchema.type).toBe("object");
    }
  });

  it("reads the workspace telemetry store", async () => {
    await recordTelemetry("ws-mcp", "user-1", [
      {
        kind: "span",
        traceId: "trace-mcp",
        name: "workflow broken-cron",
        source: { type: "workflow", path: "workflows/broken.js", runId: "run1" },
        status: "error",
        error: { message: "exploded" },
      },
    ]);

    const traces = JSON.parse(
      text(await handleTelemetryTool(principal, "telemetry_traces", { status: "error" })),
    ) as { traces: Array<{ traceId: string; name: string }> };
    expect(traces.traces.some((t) => t.traceId === "trace-mcp")).toBe(true);

    const events = JSON.parse(
      text(await handleTelemetryTool(principal, "telemetry_query", { traceId: "trace-mcp" })),
    ) as { events: Array<{ error?: { message: string } }> };
    expect(events.events[0]?.error?.message).toBe("exploded");

    // Scoped to the caller's workspace.
    const other = JSON.parse(
      text(
        await handleTelemetryTool(
          { ...principal, workspaceId: "ws-other" } as Principal,
          "telemetry_query",
          {},
        ),
      ),
    ) as { events: unknown[] };
    expect(other.events).toHaveLength(0);
  });
});
