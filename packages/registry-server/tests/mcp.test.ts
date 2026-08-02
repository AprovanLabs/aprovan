/**
 * MCP surface tests (registry-server spec MCP scenarios): call_tool executes
 * through the shared dispatch pipeline (profiles, grants, audit, spans),
 * permission-filtered listings, host extension hook.
 */

import { afterEach, describe, expect, it } from "vitest";
import type { ProviderTool } from "@utdk/mcp-core";
import {
  buildMcpServer,
  resetMcpCatalog,
  setMcpCatalogForTesting,
} from "../src/mcp/server.js";
import {
  adminCtx,
  ctx,
  fakeProviderModule,
  makeDispatchEnv,
  type DispatchEnv,
} from "./helpers.js";
import type { CallContext } from "../src/config/types.js";

let env: DispatchEnv;

afterEach(async () => {
  await env?.close();
  resetMcpCatalog();
});

const bearer = (token: string) => ({ type: "bearer_token" as const, token });

const githubTool: ProviderTool = {
  mcpName: "github__repos_get",
  utcpName: "github.repos/get",
  description: "Get a repository",
  inputSchema: { type: "object", properties: {} },
  providerName: "github",
  tags: ["repos"],
  method: "GET",
  routeTemplate: "/repos/{owner}/{repo}",
  contentType: "application/json",
  pathParamKeys: ["owner", "repo"],
  queryParamKeys: [],
  auth: undefined,
};

const sqlTool: ProviderTool = {
  ...githubTool,
  mcpName: "sql__query",
  utcpName: "sql.query",
  description: "Run a query",
  providerName: "sql",
};

/** Drive a Server's request handler directly (no transport round-trip). */
async function callServerTool(
  server: Awaited<ReturnType<typeof buildMcpServer>>,
  name: string,
  args: Record<string, unknown>,
) {
  const internals = server as unknown as {
    _requestHandlers: Map<string, (req: unknown, extra: unknown) => Promise<unknown>>;
  };
  const handler = internals._requestHandlers.get("tools/call")!;
  return handler(
    { method: "tools/call", params: { name, arguments: args } },
    { signal: new AbortController().signal },
  ) as Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;
}

async function listServerTools(server: Awaited<ReturnType<typeof buildMcpServer>>) {
  const internals = server as unknown as {
    _requestHandlers: Map<string, (req: unknown, extra: unknown) => Promise<unknown>>;
  };
  const handler = internals._requestHandlers.get("tools/list")!;
  return handler({ method: "tools/list", params: {} }, { signal: new AbortController().signal }) as Promise<{
    tools: Array<{ name: string }>;
  }>;
}

function makeServer(callerCtx: CallContext, extra?: Parameters<typeof buildMcpServer>[0]["extensions"]) {
  return buildMcpServer(
    {
      dispatcher: env.dispatcher,
      resolveDeps: env.deps,
      ...(extra ? { extensions: extra } : {}),
    },
    callerCtx,
  );
}

describe("mcp surface", () => {
  it("call_tool executes through dispatch — profile resolution, credential, audit, span", async () => {
    env = await makeDispatchEnv();
    setMcpCatalogForTesting([githubTool]);
    const { mod, calls } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    await env.credentials.create("t1", "user-1", { provider: "github", payload: bearer("gh") });

    const server = await makeServer(adminCtx({ source: { type: "mcp" } }));
    const result = await callServerTool(server, "call_tool", {
      tool_name: "github__repos_get",
      arguments: { owner: "o", repo: "r" },
    });
    expect(result.isError).toBeFalsy();
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer gh" });

    // The shared pipeline audited and attributed the call as source=mcp.
    const audit = await env.storage.audit.query("t1");
    expect(audit).toHaveLength(1);
    expect(audit[0]?.namespace).toBe("github");
    const span = env.exporter.getFinishedSpans()[0]!;
    expect(span.attributes["aprovan.source.type"]).toBe("mcp");
  });

  it("an ungranted caller receives the same 403 the HTTP surface returns", async () => {
    env = await makeDispatchEnv();
    setMcpCatalogForTesting([githubTool]);
    const { mod } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    // A stored default profile the member is NOT granted.
    await env.credentials.create("t1", "admin", { provider: "github", payload: bearer("gh") });
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "provider", provider: "github" },
    });

    // Listing filters the namespace for the ungranted member...
    const memberServer = await makeServer(ctx({ source: { type: "mcp" } }));
    const listed = await callServerTool(memberServer, "list_tools", {});
    expect(listed.content[0]?.text ?? "").not.toContain("github");

    // ...and a forced call_tool is refused.
    const refused = await callServerTool(memberServer, "call_tool", {
      tool_name: "github__repos_get",
      arguments: {},
    });
    expect(refused.isError).toBe(true);
    expect(refused.content[0]?.text).toMatch(/forbidden/iu);
  });

  it("permission filtering keeps ungoverned namespaces visible to members", async () => {
    env = await makeDispatchEnv();
    setMcpCatalogForTesting([githubTool, sqlTool]);
    // github has a stored default profile granted to nobody; sql is ungoverned.
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "provider", provider: "github" },
    });
    const memberServer = await makeServer(ctx({ source: { type: "mcp" } }));
    const listed = await callServerTool(memberServer, "list_tools", {});
    const text = listed.content.map((c) => c.text).join("\n");
    expect(text).not.toContain("github__repos_get");
    expect(text).toContain("sql__query");

    // Admins see everything.
    const adminServer = await makeServer(adminCtx({ source: { type: "mcp" } }));
    const adminListed = await callServerTool(adminServer, "list_tools", {});
    expect(adminListed.content.map((c) => c.text).join("\n")).toContain("github__repos_get");
  });

  it("host extensions appear alongside meta-tools and dispatch through the hook", async () => {
    env = await makeDispatchEnv();
    setMcpCatalogForTesting([]);
    const handled: string[] = [];
    const server = await makeServer(adminCtx({ source: { type: "mcp" } }), {
      tools: [{ name: "fs_read", description: "Read a file", inputSchema: { type: "object" } }],
      handleTool: async (_ctx, name, args) => {
        handled.push(name);
        return { content: [{ type: "text", text: JSON.stringify({ name, args }) }] };
      },
    });
    const listed = await listServerTools(server);
    const names = listed.tools.map((t) => t.name);
    expect(names).toContain("fs_read");
    expect(names).toContain("list_tools");
    expect(names).toContain("call_tool");

    const result = await callServerTool(server, "fs_read", { path: "a.txt" });
    expect(handled).toEqual(["fs_read"]);
    expect(result.content[0]?.text).toContain("a.txt");
  });

  it("the standalone surface (no extensions) serves meta-tools only", async () => {
    env = await makeDispatchEnv();
    setMcpCatalogForTesting([]);
    const server = await makeServer(adminCtx({ source: { type: "mcp" } }));
    const listed = await listServerTools(server);
    expect(listed.tools.map((t) => t.name)).toEqual([
      "list_tools",
      "search_tools",
      "tool_info",
      "call_tool",
    ]);
  });
});
