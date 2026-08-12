/**
 * IW-9 A stream 2 — vcs.* discovery schema shapes.
 * Asserts scope on all six verbs, parents on commit outputs, hash-bearing
 * diff/show change rows, and tag/channel ref wording on branches (F1 wire
 * behaviors this change relies on — not re-implemented here).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetToolListCache } from "../src/routes/tools.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-tools-vcs-discovery-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetToolListCache();
});

interface ToolEntryLike {
  provider: string;
  operation: string;
  name: string;
  description?: string;
  inputSchema?: unknown;
  outputSchema?: unknown;
}

const VCS_OPS = ["commit", "log", "show", "diff", "branches", "restore"] as const;

function propsOf(schema: unknown): Record<string, unknown> {
  if (!schema || typeof schema !== "object") return {};
  const props = (schema as { properties?: unknown }).properties;
  return props && typeof props === "object" && !Array.isArray(props)
    ? (props as Record<string, unknown>)
    : {};
}

function itemsProps(schema: unknown): Record<string, unknown> {
  if (!schema || typeof schema !== "object") return {};
  return propsOf((schema as { items?: unknown }).items);
}

describe("vcs.* discovery schemas (IW-9 A stream 2)", () => {
  it("advertises scope on all six verbs and F1 wire shapes", async () => {
    const res = await createApp().request("/tools?scope=configured");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { tools: ToolEntryLike[] };
    const vcs = body.tools.filter(
      (t) => t.provider === "vcs" && (VCS_OPS as readonly string[]).includes(t.operation),
    );
    expect(vcs.map((t) => t.operation).sort()).toEqual([...VCS_OPS].sort());

    for (const op of VCS_OPS) {
      const entry = vcs.find((t) => t.operation === op);
      expect(entry, `missing vcs.${op}`).toBeDefined();
      const inputProps = propsOf(entry!.inputSchema);
      expect(inputProps, `vcs.${op} inputSchema.scope`).toHaveProperty("scope");
      expect(propsOf(inputProps["scope"])).toHaveProperty("app");
    }

    const commit = vcs.find((t) => t.operation === "commit")!;
    expect(propsOf(propsOf(commit.outputSchema)["commit"])).toHaveProperty("parents");

    const log = vcs.find((t) => t.operation === "log")!;
    expect(itemsProps(propsOf(log.outputSchema)["commits"])).toHaveProperty("parents");

    const show = vcs.find((t) => t.operation === "show")!;
    const showAdded = propsOf(propsOf(show.outputSchema)["changes"])["added"];
    expect(itemsProps(showAdded)).toHaveProperty("hash");

    const diff = vcs.find((t) => t.operation === "diff")!;
    expect(itemsProps(propsOf(diff.outputSchema)["added"])).toHaveProperty("hash");

    const branches = vcs.find((t) => t.operation === "branches")!;
    const nameField = itemsProps(propsOf(branches.outputSchema)["branches"])["name"] as {
      type?: string;
      description?: string;
    };
    expect(nameField?.type).toBe("string");
    expect(nameField?.description ?? "").toMatch(/tag\/app\//);
    expect(nameField?.description ?? "").toMatch(/channel\/app\//);
    expect(branches.description ?? "").toMatch(/tag\/app\//);
  });
});
