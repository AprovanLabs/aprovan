/**
 * The product-plane MCP extension hook (registry-server-extraction §9.3):
 * workspace filesystem tools, telemetry tools, and the fs-backed
 * prompts/artifacts surfaces that the pre-cutover `mcp/server.ts` assembly
 * built inline. Wired into `createRegistryServer({ mcp: { extensions } })`
 * (`registry-embed.ts`) — `call_tool`/`list_tools`/`search_tools`/`tool_info`
 * (the github/sql/... provider surface, routed through `dispatch()`) never
 * live here; this is only the host-attached surface 7.2's hook exists for.
 */

import { getFsStore, listAll } from "../fs-store.js";
import type { Principal } from "../middleware/auth.js";
import { FS_TOOL_NAMES, FS_TOOLS, handleFsTool } from "./fs-tools.js";
import { TELEMETRY_TOOL_NAMES, TELEMETRY_TOOLS, handleTelemetryTool } from "./telemetry-tools.js";
import type { CallContext, McpExtensions } from "@aprovan/registry-server";

/**
 * Every extension handler below is keyed by (workspaceId, sub) the way the
 * pre-cutover handlers were — reconstruct that shape from the registry
 * CallContext (tenantId IS the workspaceId, 1:1 per `tenant-registry.ts`).
 */
function principalFromContext(ctx: CallContext): Principal {
  return { sub: ctx.principal, workspaceId: ctx.tenantId, role: ctx.role, groupIds: ctx.groupIds };
}

export const workspaceMcpExtensions: McpExtensions = {
  tools: [...FS_TOOLS, ...TELEMETRY_TOOLS],

  handleTool: async (ctx, name, args) => {
    const principal = principalFromContext(ctx);
    if (FS_TOOL_NAMES.has(name)) return handleFsTool(principal, name, args);
    if (TELEMETRY_TOOL_NAMES.has(name)) return handleTelemetryTool(principal, name, args);
    return {
      isError: true,
      content: [{ type: "text" as const, text: `Unknown tool: ${name}` }],
    };
  },

  // Prompts and artifacts are plain workspace-FS files under prompts/ and
  // artifacts/ — the same tree the fs_* tools and /fs routes operate on.
  listPrompts: async (ctx) => {
    const { workspaceId } = principalFromContext(ctx);
    return (await listAll(getFsStore(), workspaceId, "prompts/")).map((entry) => ({
      name: entry.path.replace(/^prompts\//u, "").replace(/\.md$/u, ""),
    }));
  },

  getPrompt: async (ctx, name) => {
    const { workspaceId } = principalFromContext(ctx);
    const store = getFsStore();
    const file =
      (await store.read(workspaceId, `prompts/${name}.md`)) ??
      (await store.read(workspaceId, `prompts/${name}`));
    if (!file) throw new Error(`Prompt not found: ${name}`);
    return {
      messages: [
        { role: "user" as const, content: { type: "text" as const, text: file.content } },
      ],
    };
  },

  listResources: async (ctx) => {
    const { workspaceId } = principalFromContext(ctx);
    return (await listAll(getFsStore(), workspaceId, "artifacts/")).map((entry) => ({
      uri: `aprovan://${entry.path}`,
      name: entry.path.replace(/^artifacts\//u, ""),
      mimeType: entry.mimeType,
    }));
  },

  readResource: async (ctx, uri) => {
    const { workspaceId } = principalFromContext(ctx);
    const url = new URL(uri);
    const path = `${url.host}${url.pathname}`.replace(/\/+$/u, "");
    const file = path ? await getFsStore().read(workspaceId, path) : undefined;
    if (!file) throw new Error(`Resource not found: ${uri}`);
    return { contents: [{ uri, mimeType: file.mimeType, text: file.content }] };
  },
};
