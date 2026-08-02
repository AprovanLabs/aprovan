import { describe, expect, it, vi } from "vitest";
import {
  META_TOOLS,
  handleListTools,
  handleSearchTools,
  handleToolInfo,
  handleCallTool,
  type CallToolResult,
  type ExecuteInput,
  type ExecuteResult,
  type ProviderTool,
} from "../index.js";

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

function makeTool(overrides: Partial<ProviderTool> & { mcpName: string }): ProviderTool {
  return {
    utcpName: overrides.mcpName.replace(/__/g, "."),
    description: "",
    inputSchema: { type: "object" },
    providerName: "testprovider",
    tags: [],
    method: "GET",
    routeTemplate: "https://api.example.com/test",
    contentType: "application/json",
    pathParamKeys: [],
    queryParamKeys: [],
    auth: undefined,
    ...overrides,
  };
}

const reposTool = makeTool({
  mcpName: "github__repos_list",
  providerName: "github",
  description: "List public repositories for the specified user.",
  tags: ["repos"],
});

const issuesTool = makeTool({
  mcpName: "github__issues_list",
  providerName: "github",
  description: "List issues assigned to the authenticated user across all visible repositories.",
  tags: ["issues"],
});

const prTool = makeTool({
  mcpName: "github__pulls_list",
  providerName: "github",
  description: "List pull requests in a repository.",
  tags: ["pulls"],
});

const slackTool = makeTool({
  mcpName: "slack__messages_send",
  providerName: "slack",
  description: "Send a message to a Slack channel.",
  tags: ["messaging"],
});

const ALL_TOOLS = [reposTool, issuesTool, prTool, slackTool];

function parseText(result: CallToolResult): unknown {
  return JSON.parse(result.content[0]!.text);
}

// ---------------------------------------------------------------------------
// handleListTools
// ---------------------------------------------------------------------------

describe("handleListTools", () => {
  it("returns the names of every tool when given no filter (4 entries)", () => {
    const result: CallToolResult = handleListTools(ALL_TOOLS, {});
    const names = parseText(result) as string[];
    expect(names).toHaveLength(4);
    expect(names).toEqual(
      expect.arrayContaining([
        "github__repos_list",
        "github__issues_list",
        "github__pulls_list",
        "slack__messages_send",
      ]),
    );
    expect(result.isError).toBeFalsy();
  });

  it("filters to a single provider", () => {
    const result: CallToolResult = handleListTools(ALL_TOOLS, { provider: "slack" });
    expect(parseText(result)).toEqual(["slack__messages_send"]);
  });
});

// ---------------------------------------------------------------------------
// handleSearchTools
// ---------------------------------------------------------------------------

describe("handleSearchTools", () => {
  it("returns ranked matches for a keyword query", () => {
    const result: CallToolResult = handleSearchTools(ALL_TOOLS, { query: "repos" });
    const matches = parseText(result) as Array<{ name: string }>;
    expect(matches.length).toBeGreaterThan(0);
    // The tool whose name contains "repos" ranks first.
    expect(matches[0]!.name).toBe("github__repos_list");
  });
});

// ---------------------------------------------------------------------------
// handleToolInfo
// ---------------------------------------------------------------------------

describe("handleToolInfo", () => {
  it("returns the resolved tool's schema and metadata", () => {
    const toolMap = new Map(ALL_TOOLS.map((t) => [t.mcpName, t]));
    const result: CallToolResult = handleToolInfo(toolMap, { tool_name: "github__repos_list" });
    const info = parseText(result) as {
      name: string;
      description: string;
      provider: string;
      inputSchema: { type: string };
    };
    expect(info.name).toBe("github__repos_list");
    expect(info.description).toBe("List public repositories for the specified user.");
    expect(info.provider).toBe("github");
    expect(info.inputSchema.type).toBe("object");
    expect(result.isError).toBeFalsy();
  });

  it("returns an error result for an unknown tool", () => {
    const toolMap = new Map(ALL_TOOLS.map((t) => [t.mcpName, t]));
    const result: CallToolResult = handleToolInfo(toolMap, { tool_name: "nope__does_not_exist" });
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toContain("Unknown tool: nope__does_not_exist");
  });
});

// ---------------------------------------------------------------------------
// handleCallTool
// ---------------------------------------------------------------------------

describe("handleCallTool", () => {
  it("invokes the injected execute callback with the correct payload and wraps the result in CallToolResult", async () => {
    const execute = vi.fn(async (_input: ExecuteInput): Promise<ExecuteResult> => ({
      ok: true as const,
      data: { id: 1, name: "repo1" },
    }));

    const result: CallToolResult = await handleCallTool(
      reposTool,
      { tool_name: "github__repos_list", arguments: { username: "octocat" } },
      execute,
    );

    // execute was called once with { tool, args } where args is the extracted arguments
    expect(execute).toHaveBeenCalledOnce();
    expect(execute.mock.calls[0]![0]).toEqual({
      tool: reposTool,
      args: { username: "octocat" },
    });

    // result is a CallToolResult wrapping the data as JSON text
    expect(result.isError).toBeFalsy();
    expect(result.content[0]!.type).toBe("text");
    expect(result.content[0]!.text).toBe(JSON.stringify({ id: 1, name: "repo1" }, null, 2));
  });

  it("wraps a string result directly without JSON-encoding", async () => {
    const execute = vi.fn(async (): Promise<ExecuteResult> => ({
      ok: true as const,
      data: "plain text output",
    }));
    const result: CallToolResult = await handleCallTool(
      reposTool,
      { tool_name: "github__repos_list", arguments: {} },
      execute,
    );
    expect(result.content[0]!.text).toBe("plain text output");
  });

  it("surfaces an execute error as an isError CallToolResult", async () => {
    const execute = vi.fn(async (): Promise<ExecuteResult> => ({
      ok: false as const,
      error: "404 Not Found",
    }));
    const result: CallToolResult = await handleCallTool(
      reposTool,
      { tool_name: "github__repos_list", arguments: {} },
      execute,
    );
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toBe("Error calling github__repos_list: 404 Not Found");
  });

  it("returns an Unknown tool error when the tool is undefined", async () => {
    const execute = vi.fn(async (): Promise<ExecuteResult> => ({ ok: true as const, data: null }));
    const result: CallToolResult = await handleCallTool(
      undefined,
      { tool_name: "nope__missing" },
      execute,
    );
    expect(execute).not.toHaveBeenCalled();
    expect(result.isError).toBe(true);
    expect(result.content[0]!.text).toBe("Unknown tool: nope__missing");
  });
});

// ---------------------------------------------------------------------------
// META_TOOLS sanity
// ---------------------------------------------------------------------------

describe("META_TOOLS", () => {
  it("defines the 4 meta-tools", () => {
    expect(META_TOOLS).toHaveLength(4);
    expect(META_TOOLS.map((t) => t.name).sort()).toEqual([
      "call_tool",
      "list_tools",
      "search_tools",
      "tool_info",
    ]);
  });
});
