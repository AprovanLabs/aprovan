import { describe, expect, it } from "vitest";
import { tokenize, buildTfIdf, searchTools, groupTools } from "../search.js";
import type { ProviderTool } from "../loader.js";

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

// ---------------------------------------------------------------------------
// tokenize
// ---------------------------------------------------------------------------

describe("tokenize", () => {
  it("lowercases and splits on non-alphanumeric chars", () => {
    expect(tokenize("hello world")).toEqual(["hello", "world"]);
  });

  it("splits snake_case / double-underscore MCP names", () => {
    expect(tokenize("github__repos_list")).toEqual(["github", "repos", "list"]);
  });

  it("splits camelCase boundaries", () => {
    expect(tokenize("listForUser")).toEqual(["list", "for", "user"]);
  });

  it("strips punctuation", () => {
    expect(tokenize("security-advisories")).toEqual(["security", "advisories"]);
  });

  it("returns empty array for empty string", () => {
    expect(tokenize("")).toEqual([]);
  });

  it("filters empty tokens", () => {
    expect(tokenize("  hello   world  ")).toEqual(["hello", "world"]);
  });
});

// ---------------------------------------------------------------------------
// buildTfIdf
// ---------------------------------------------------------------------------

describe("buildTfIdf", () => {
  it("returns zero score for empty corpus", () => {
    const score = buildTfIdf([]);
    expect(score(reposTool, ["repos"])).toBe(0);
  });

  it("scores tool with name match higher than description-only match", () => {
    const tools = [reposTool, issuesTool];
    const score = buildTfIdf(tools);
    // "repos" is in reposTool name AND tags but NOT in issuesTool name or tags
    const reposScore = score(reposTool, ["repos"]);
    const issuesScore = score(issuesTool, ["repos"]);
    expect(reposScore).toBeGreaterThan(0);
    expect(issuesScore).toBe(0);
  });

  it("returns higher score for rare term (IDF effect)", () => {
    // "list" appears in all github tools but "pull" only in prTool
    const tools = [reposTool, issuesTool, prTool];
    const score = buildTfIdf(tools);
    const scoreOnPullRare = score(prTool, ["pull"]);
    const scoreOnListCommon = score(prTool, ["list"]);
    // "pull" is rarer than "list" so IDF is higher → pull score > list score
    expect(scoreOnPullRare).toBeGreaterThan(scoreOnListCommon);
  });

  it("returns positive score for a matching term in description", () => {
    const tools = [slackTool];
    const score = buildTfIdf(tools);
    expect(score(slackTool, ["channel"])).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// searchTools
// ---------------------------------------------------------------------------

describe("searchTools", () => {
  it("returns empty array for empty query", () => {
    expect(searchTools(ALL_TOOLS, "", undefined, 10)).toEqual([]);
  });

  it("returns empty array for blank query", () => {
    expect(searchTools(ALL_TOOLS, "   ", undefined, 10)).toEqual([]);
  });

  it("finds tools by name keyword", () => {
    const results = searchTools(ALL_TOOLS, "repos", undefined, 10);
    expect(results.map((r) => r.name)).toContain("github__repos_list");
  });

  it("finds tools by tag", () => {
    const results = searchTools(ALL_TOOLS, "issues", undefined, 10);
    expect(results.map((r) => r.name)).toContain("github__issues_list");
  });

  it("finds tools by description keyword", () => {
    const results = searchTools(ALL_TOOLS, "channel", undefined, 10);
    expect(results.map((r) => r.name)).toContain("slack__messages_send");
  });

  it("excludes tools where a query word does not appear anywhere", () => {
    const results = searchTools(ALL_TOOLS, "nonexistent_xyz", undefined, 10);
    expect(results).toHaveLength(0);
  });

  it("requires ALL query words to match", () => {
    // "repos" matches reposTool, "channel" matches slackTool → no tool matches both
    const results = searchTools(ALL_TOOLS, "repos channel", undefined, 10);
    expect(results).toHaveLength(0);
  });

  it("respects provider filter", () => {
    const results = searchTools(ALL_TOOLS, "list", "slack", 10);
    // slackTool description has "list" via "List" — but depends on description
    // More importantly, github tools should NOT appear
    expect(results.every((r) => r.name.startsWith("slack__"))).toBe(true);
  });

  it("respects limit", () => {
    const results = searchTools(ALL_TOOLS, "list", undefined, 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("returns tags in results", () => {
    const results = searchTools(ALL_TOOLS, "repos", undefined, 10);
    const reposResult = results.find((r) => r.name === "github__repos_list");
    expect(reposResult?.tags).toEqual(["repos"]);
  });

  it("ranks name matches above description-only matches", () => {
    // "repos" is in the name of reposTool but only in description of issuesTool
    const tools = [
      reposTool,
      makeTool({
        mcpName: "github__something_else",
        providerName: "github",
        description: "Access repos for any organization.",
        tags: [],
      }),
    ];
    const results = searchTools(tools, "repos", undefined, 10);
    // reposTool (name match) should come before the description-only match
    expect(results[0]?.name).toBe("github__repos_list");
  });
});

// ---------------------------------------------------------------------------
// groupTools
// ---------------------------------------------------------------------------

describe("groupTools", () => {
  it("groups by provider", () => {
    const grouped = groupTools(ALL_TOOLS, "provider");
    expect(grouped["github"]).toEqual(
      expect.arrayContaining(["github__repos_list", "github__issues_list", "github__pulls_list"]),
    );
    expect(grouped["slack"]).toEqual(["slack__messages_send"]);
  });

  it("groups by tag", () => {
    const grouped = groupTools(ALL_TOOLS, "tag");
    expect(grouped["repos"]).toEqual(["github__repos_list"]);
    expect(grouped["issues"]).toEqual(["github__issues_list"]);
    expect(grouped["pulls"]).toEqual(["github__pulls_list"]);
    expect(grouped["messaging"]).toEqual(["slack__messages_send"]);
  });

  it("falls back to provider name for tools with no tags when grouping by tag", () => {
    const noTagTool = makeTool({
      mcpName: "provider__notag_tool",
      providerName: "myprovider",
      tags: [],
    });
    const grouped = groupTools([noTagTool], "tag");
    expect(grouped["myprovider"]).toEqual(["provider__notag_tool"]);
  });

  it("returns empty object for empty tool list", () => {
    expect(groupTools([], "provider")).toEqual({});
    expect(groupTools([], "tag")).toEqual({});
  });

  it("assigns multi-tag tool to all its tag groups", () => {
    const multiTagTool = makeTool({
      mcpName: "github__multi_tool",
      providerName: "github",
      tags: ["repos", "admin"],
    });
    const grouped = groupTools([multiTagTool], "tag");
    expect(grouped["repos"]).toContain("github__multi_tool");
    expect(grouped["admin"]).toContain("github__multi_tool");
  });
});
