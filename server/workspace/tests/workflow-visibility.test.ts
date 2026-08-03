/**
 * Unbundled workflows are creator-private; exporting from an app flips
 * visibility (specs per-user-space; tech-plan D8).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  saveRegistration,
  type WorkflowRegistration,
} from "../src/workflows/store.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-wf-vis-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const call = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

async function seedForeignWorkflow(name: string): Promise<void> {
  const now = new Date().toISOString();
  const registration: WorkflowRegistration = {
    name,
    scriptPath: `workflows/${name}.js`,
    triggers: { manual: true },
    createdBy: "alice",
    createdAt: now,
    updatedAt: now,
  };
  await putFile(registration.scriptPath, "export default async () => ({ ok: true });");
  await saveRegistration("local", registration);
}

describe("workflow creator-private visibility", () => {
  it("owner sees + runs own unexported workflow; foreign is not-found", async () => {
    await putFile(
      "workflows/mine.js",
      "export default async () => ({ who: 'local' });",
    );
    const reg = await call("workflows/register", {
      name: "mine",
      script_path: "workflows/mine.js",
    });
    expect(reg.status).toBe(200);
    expect((await data<{ exportedBy: string[] }>(reg)).exportedBy).toEqual([]);

    const list = await data<{
      workflows: Array<{ name: string; exportedBy: string[]; createdBy: string }>;
    }>(await call("workflows/list"));
    const mine = list.workflows.find((workflow) => workflow.name === "mine");
    expect(mine).toMatchObject({ createdBy: "local", exportedBy: [] });

    const run = await call("workflows/run", { name: "mine" });
    expect(run.status).toBe(200);

    await seedForeignWorkflow("alices-private");
    const foreignList = await data<{ workflows: Array<{ name: string }> }>(
      await call("workflows/list"),
    );
    expect(foreignList.workflows.some((workflow) => workflow.name === "alices-private")).toBe(
      false,
    );

    const foreignRun = await call("workflows/run", { name: "alices-private" });
    expect(foreignRun.status).toBe(404);
    expect(((await foreignRun.json()) as { error: string }).error).toMatch(/Unknown workflow/);

    const foreignGet = await call("workflows/get", { name: "alices-private" });
    expect(foreignGet.status).toBe(404);
  });

  it("exporting from an app flips visibility and annotates exportedBy", async () => {
    await seedForeignWorkflow("shared-flow");
    await putFile("apps/share-app/index.tsx", "export default () => null;");
    const publish = await call("apps/publish", {
      name: "share-app",
      dir: "apps/share-app",
      workflows: ["shared-flow"],
      allowed_tools: ["vfs.*"],
      rate_limit: { rps: 100, burst: 200 },
    });
    expect(publish.status).toBe(200);
    const { appId } = await data<{ appId: string }>(publish);

    const list = await data<{
      workflows: Array<{ name: string; exportedBy: string[] }>;
    }>(await call("workflows/list"));
    const shared = list.workflows.find((workflow) => workflow.name === "shared-flow");
    expect(shared?.exportedBy).toEqual([appId]);

    const run = await call("workflows/run", { name: "shared-flow" });
    expect(run.status).toBe(200);
  });
});
