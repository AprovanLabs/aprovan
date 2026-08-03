/**
 * Deployment directory write-through index (app-model-split stream 3 / D7).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { DEPLOYMENT_TENANT } from "../src/apps/identity.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-dir-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
});

const manage = (path: string, args: Record<string, unknown>) =>
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
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body.data;
}

async function err(res: Response): Promise<{ status: number; error: string }> {
  const body = (await res.json()) as { error?: string };
  return { status: res.status, error: body.error ?? "" };
}

describe("apps.directory", () => {
  it("lists public apps and drops them on visibility flip", async () => {
    await putFile("apps/dir/index.tsx", "export default () => null;");
    const published = await data<{ appId: string; name: string }>(
      await manage("apps/publish", {
        name: "dir-pub",
        dir: "apps/dir",
        visibility: "public",
        title: "Directory App",
        description: "Listed",
        allowed_tools: ["keyvalue.*"],
        requires: [{ contract: "llm", optional: true }],
      }),
    );

    const listed = await data<{
      apps: Array<{ appId: string; name: string; title?: string; requires?: unknown[] }>;
    }>(await manage("apps/directory", {}));
    expect(listed.apps.some((a) => a.appId === published.appId)).toBe(true);
    const entry = listed.apps.find((a) => a.appId === published.appId)!;
    expect(entry.title).toBe("Directory App");
    expect(entry.requires).toEqual([{ contract: "llm", optional: true }]);

    await manage("apps/publish", {
      name: "dir-pub",
      dir: "apps/dir",
      visibility: "private",
      allowed_tools: ["keyvalue.*"],
    });

    const after = await data<{ apps: Array<{ appId: string; name: string }> }>(
      await manage("apps/directory", {}),
    );
    // Own private apps still appear (merged); the public index entry is gone
    // but own-workspace merge keeps it.
    expect(after.apps.some((a) => a.appId === published.appId)).toBe(true);

    // A second workspace would not see it — assert via index directly.
    const { readDirectoryEntry } = await import("../src/apps/directory.js");
    expect(await readDirectoryEntry(published.appId)).toBeUndefined();
  });

  it("rejects __deployment__ as a caller workspace", async () => {
    const { assertNotDeploymentTenant } = await import("../src/apps/directory.js");
    expect(() => assertNotDeploymentTenant(DEPLOYMENT_TENANT)).toThrow(/reserved/i);
  });

  it("includes the caller's private apps", async () => {
    await putFile("apps/mine/index.tsx", "export default () => null;");
    const mine = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "mine-priv",
        dir: "apps/mine",
        visibility: "private",
        allowed_tools: ["keyvalue.*"],
      }),
    );
    const listed = await data<{ apps: Array<{ appId: string }> }>(
      await manage("apps/directory", {}),
    );
    expect(listed.apps.some((a) => a.appId === mine.appId)).toBe(true);
  });
});
