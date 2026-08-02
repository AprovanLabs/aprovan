/**
 * Built-in workspace filesystem MCP tools.
 *
 * Like a local harness's file tools: every agent connected to the gateway
 * MCP server gets the workspace tree (`fs_list` / `fs_read` / `fs_write` /
 * `fs_delete`) for free, scoped to the caller's workspace — third-party
 * capability arrives separately via the UTDK meta-tools. Prefix-level
 * permission grants land with the WFS permissions workstream; today
 * workspace membership grants the whole tree, matching the /fs routes.
 */

import { listAll, getFsStore, normalizeFsPath } from "../fs-store.js";
import type { Principal } from "../middleware/auth.js";

export const FS_TOOLS = [
  {
    name: "fs_list",
    description:
      "List files in the workspace filesystem (latest version metadata). " +
      "Optionally scope to a directory prefix like 'widgets' or 'skills'.",
    inputSchema: {
      type: "object" as const,
      properties: {
        prefix: {
          type: "string",
          description: "Directory prefix to list under (default: whole tree)",
        },
      },
    },
  },
  {
    name: "fs_read",
    description:
      "Read a file from the workspace filesystem. Returns the latest " +
      "version unless a content hash pins an older one.",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "File path, e.g. widgets/clock/main.tsx" },
        hash: { type: "string", description: "Optional content hash of a specific version" },
      },
      required: ["path"],
    },
  },
  {
    name: "fs_write",
    description:
      "Write a file to the workspace filesystem (content-hash versioned; " +
      "prior versions stay readable by hash).",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "File path, e.g. skills/deploy/SKILL.md" },
        content: { type: "string", description: "Full file content" },
        mimeType: { type: "string", description: "MIME type (default text/plain)" },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "fs_delete",
    description:
      "Delete a file (all versions) from the workspace filesystem, or an " +
      "entire subtree with recursive=true.",
    inputSchema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "File path or directory prefix" },
        recursive: { type: "boolean", description: "Delete the whole subtree" },
      },
      required: ["path"],
    },
  },
];

export const FS_TOOL_NAMES = new Set(FS_TOOLS.map((tool) => tool.name));

interface McpToolResult {
  isError?: boolean;
  content: Array<{ type: "text"; text: string }>;
}

const ok = (payload: unknown): McpToolResult => ({
  content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
});

const fail = (message: string): McpToolResult => ({
  isError: true,
  content: [{ type: "text", text: message }],
});

export async function handleFsTool(
  principal: Principal,
  toolName: string,
  args: Record<string, unknown>,
): Promise<McpToolResult> {
  const store = getFsStore();
  const workspaceId = principal.workspaceId;

  if (toolName === "fs_list") {
    const rawPrefix = typeof args["prefix"] === "string" ? args["prefix"] : "";
    const prefix = rawPrefix ? normalizeFsPath(rawPrefix) : "";
    if (prefix === null) return fail(`Invalid prefix: ${rawPrefix}`);
    return ok({ entries: await listAll(store, workspaceId, prefix) });
  }

  const path = typeof args["path"] === "string" ? normalizeFsPath(args["path"]) : null;
  if (!path) return fail("path is required and must be a workspace-relative file path");

  if (toolName === "fs_read") {
    const hash = typeof args["hash"] === "string" ? args["hash"] : undefined;
    const file = await store.read(workspaceId, path, hash);
    return file ? ok(file) : fail(`Not found: ${path}`);
  }

  if (toolName === "fs_write") {
    if (typeof args["content"] !== "string") return fail("content must be a string");
    const mimeType = typeof args["mimeType"] === "string" ? args["mimeType"] : undefined;
    const { content: _content, ...meta } = await store.write(
      workspaceId,
      path,
      args["content"],
      mimeType,
    );
    return ok(meta);
  }

  if (toolName === "fs_delete") {
    const removed =
      args["recursive"] === true
        ? (await store.removePrefix(workspaceId, path)) > 0
        : await store.remove(workspaceId, path);
    return removed ? ok({ deleted: path }) : fail(`Not found: ${path}`);
  }

  return fail(`Unknown fs tool: ${toolName}`);
}
