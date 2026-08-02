import { describe, expect, it } from "vitest";
import { parseProviderNames, loadProviders } from "../loader.js";

// ---------------------------------------------------------------------------
// parseProviderNames
// ---------------------------------------------------------------------------

describe("parseProviderNames", () => {
  it("parses comma-separated provider names", () => {
    expect(parseProviderNames("github,slack,stripe")).toEqual(["github", "slack", "stripe"]);
  });

  it("trims whitespace", () => {
    expect(parseProviderNames("github, slack , stripe")).toEqual(["github", "slack", "stripe"]);
  });

  it("lowercases names", () => {
    expect(parseProviderNames("GitHub,Slack")).toEqual(["github", "slack"]);
  });

  it("returns empty array for undefined", () => {
    expect(parseProviderNames(undefined)).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(parseProviderNames("")).toEqual([]);
  });

  it("filters empty entries from double commas", () => {
    expect(parseProviderNames("github,,slack")).toEqual(["github", "slack"]);
  });
});

// ---------------------------------------------------------------------------
// loadProviders
// ---------------------------------------------------------------------------

describe("loadProviders", () => {
  it("returns an empty array for an unknown provider", async () => {
    const tools = await loadProviders(["__nonexistent_provider__"]);
    expect(tools).toEqual([]);
  });

  it("returns an empty array for an empty provider list", async () => {
    const tools = await loadProviders([]);
    expect(tools).toEqual([]);
  });

  it("loads tools from github provider (integration)", async () => {
    // This test requires the @utdk/github package to be present in the workspace.
    // It verifies that the loader correctly converts the OpenAPI doc to MCP tools.
    const tools = await loadProviders(["github"]);

    expect(tools.length).toBeGreaterThan(0);

    // All tools should have required fields
    for (const tool of tools) {
      expect(tool.mcpName).toMatch(/^[a-zA-Z0-9_-]+$/);
      expect(tool.providerName).toBe("github");
      expect(tool.description).toBeTruthy();
      expect(tool.method).toMatch(/^(GET|POST|PUT|PATCH|DELETE)$/);
      expect(tool.routeTemplate).toMatch(/^https?:\/\//);
      expect(tool.inputSchema).toBeDefined();
    }
  });

  it("loads tools from stripe provider (integration)", async () => {
    const tools = await loadProviders(["stripe"]);

    expect(tools.length).toBeGreaterThan(0);

    const tool = tools[0];
    expect(tool).toBeDefined();
    if (!tool) return;

    expect(tool.providerName).toBe("stripe");
    expect(tool.inputSchema["type"]).toBe("object");
  });

  it("loads tools from multiple providers simultaneously", async () => {
    const tools = await loadProviders(["github", "stripe"]);

    expect(tools.length).toBeGreaterThan(0);

    const githubTools = tools.filter((t) => t.providerName === "github");
    const stripeTools = tools.filter((t) => t.providerName === "stripe");

    expect(githubTools.length).toBeGreaterThan(0);
    expect(stripeTools.length).toBeGreaterThan(0);
  });

  it("tool names are MCP-safe (no dots or slashes)", async () => {
    const tools = await loadProviders(["github"]);
    for (const tool of tools) {
      expect(tool.mcpName).not.toContain(".");
      expect(tool.mcpName).not.toContain("/");
    }
  });

  it("input schemas have type: object", async () => {
    const tools = await loadProviders(["stripe"]);
    for (const tool of tools) {
      const schema = tool.inputSchema;
      expect(schema["type"]).toBe("object");
    }
  });

  it("populates tags from OpenAPI operation tags", async () => {
    const tools = await loadProviders(["github"]);
    expect(tools.length).toBeGreaterThan(0);

    // Every tool should have a tags array (may be empty for untagged operations)
    for (const tool of tools) {
      expect(Array.isArray(tool.tags)).toBe(true);
    }

    // At least some tools should have non-empty tags
    const taggedTools = tools.filter((t) => t.tags.length > 0);
    expect(taggedTools.length).toBeGreaterThan(0);

    // Tags should be strings
    for (const tool of taggedTools) {
      for (const tag of tool.tags) {
        expect(typeof tag).toBe("string");
      }
    }
  });
});
