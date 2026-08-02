import { describe, expect, it, vi, beforeEach } from "vitest";
import { executeTool } from "../loader.js";
import type { ProviderTool } from "@utdk/mcp-core";

// ---------------------------------------------------------------------------
// executeTool — unit tests with mocked fetch
// ---------------------------------------------------------------------------

describe("executeTool", () => {
  const mockTool: ProviderTool = {
    mcpName: "github__repos_list_for_user",
    utcpName: "github.repos/listForUser",
    description: "List public repositories for the specified user.",
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "The handle for the GitHub user account." },
        per_page: { type: "integer" },
      },
      required: ["username"],
    },
    providerName: "github",
    tags: ["repos"],
    method: "GET",
    routeTemplate: "https://api.github.com/users/{username}/repos",
    contentType: "application/json",
    pathParamKeys: ["username"],
    queryParamKeys: ["per_page"],
    auth: undefined,
  };

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("substitutes path parameters and makes a GET request", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify([{ id: 1, name: "repo1" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await executeTool(mockTool, { username: "octocat", per_page: 10 });

    expect(mockFetch).toHaveBeenCalledOnce();
    const [calledUrl, calledInit] = mockFetch.mock.calls[0] as [string, RequestInit];

    expect(calledUrl).toContain("octocat");
    expect(calledUrl).not.toContain("{username}");
    expect(calledInit.method).toBe("GET");
    expect(result).toEqual([{ id: 1, name: "repo1" }]);
  });

  it("appends non-path args as query parameters for GET requests", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce(
      new Response("[]", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await executeTool(mockTool, { username: "octocat", per_page: 5 });

    const [calledUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(calledUrl).toContain("per_page=5");
  });

  it("applies auth headers when auth provider is present", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce(
      new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const toolWithAuth: ProviderTool = {
      ...mockTool,
      auth: {
        authenticate: async (headers) => {
          headers["Authorization"] = "Bearer test-token";
        },
      },
    };

    await executeTool(toolWithAuth, { username: "octocat" });

    const [, calledInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    const headers = calledInit.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer test-token");
  });

  it("sends JSON body for POST requests", async () => {
    const postTool: ProviderTool = {
      ...mockTool,
      method: "POST",
      routeTemplate: "https://api.github.com/user/repos",
      pathParamKeys: [],
      queryParamKeys: [],
      mcpName: "github__repos_create_for_authenticated_user",
      utcpName: "github.repos/createForAuthenticatedUser",
    };

    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 42, name: "new-repo" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await executeTool(postTool, { name: "new-repo", private: true });

    const [, calledInit] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(calledInit.method).toBe("POST");
    expect(calledInit.body).toBe(JSON.stringify({ name: "new-repo", private: true }));
    expect(result).toEqual({ id: 42, name: "new-repo" });
  });

  it("throws on non-ok HTTP responses", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce(
      new Response("Not Found", { status: 404 }),
    );

    await expect(executeTool(mockTool, { username: "nonexistent" })).rejects.toThrow(
      "Tool call failed: 404",
    );
  });
});
