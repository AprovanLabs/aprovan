import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { FS_TOOLS, FS_TOOL_NAMES, handleFsTool } from "../src/mcp/fs-tools.js";
import { resetFsStore } from "../src/fs-store.js";
import type { Principal } from "../src/middleware/auth.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-mcp-fs-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  resetFsStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetFsStore();
  rmSync(dataDir, { recursive: true, force: true });
});

const principal = {
  sub: "user-1",
  workspaceId: "ws-1",
  role: "member",
  groupIds: [],
} as unknown as Principal;

const text = (result: { content: Array<{ text: string }> }) =>
  result.content[0]!.text;

describe("mcp workspace fs tools", () => {
  it("exposes the four fs tools with schemas", () => {
    expect([...FS_TOOL_NAMES]).toEqual(["fs_list", "fs_read", "fs_write", "fs_delete"]);
    for (const tool of FS_TOOLS) {
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.inputSchema.type).toBe("object");
    }
  });

  it("writes, lists, reads, and deletes through the store", async () => {
    const written = await handleFsTool(principal, "fs_write", {
      path: "skills/deploy/SKILL.md",
      content: "# Deploy",
      mimeType: "text/markdown",
    });
    expect(written.isError).toBeUndefined();
    expect(JSON.parse(text(written))).toMatchObject({
      path: "skills/deploy/SKILL.md",
      mimeType: "text/markdown",
    });

    const listed = await handleFsTool(principal, "fs_list", { prefix: "skills" });
    expect(JSON.parse(text(listed)).entries).toHaveLength(1);

    const read = await handleFsTool(principal, "fs_read", {
      path: "skills/deploy/SKILL.md",
    });
    expect(JSON.parse(text(read)).content).toBe("# Deploy");

    const deleted = await handleFsTool(principal, "fs_delete", {
      path: "skills",
      recursive: true,
    });
    expect(deleted.isError).toBeUndefined();

    const missing = await handleFsTool(principal, "fs_read", {
      path: "skills/deploy/SKILL.md",
    });
    expect(missing.isError).toBe(true);
  });

  it("scopes reads to the caller's workspace", async () => {
    await handleFsTool(principal, "fs_write", { path: "data/a.txt", content: "a" });
    const other = { ...principal, workspaceId: "ws-2" } as Principal;
    const read = await handleFsTool(other, "fs_read", { path: "data/a.txt" });
    expect(read.isError).toBe(true);
  });

  it("rejects traversal paths", async () => {
    const result = await handleFsTool(principal, "fs_read", { path: "../etc/passwd" });
    expect(result.isError).toBe(true);
  });
});
