/**
 * The Personal app — every workspace's implicit, synthesized, built-in app.
 * See docs/apps-and-workflows.md ("The Personal app") and src/apps/personal.ts.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-apps-personal-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
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

const appCall = (user: string, path: string, body: Record<string, unknown> = {}) =>
  createApp().request(`/apps/local/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-User": user },
    body: JSON.stringify(body),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

interface PersonalAppEntry {
  name: string;
  builtin?: boolean;
  entry?: string;
  url?: string;
  roles?: unknown;
  createdBy?: string;
  visibility: string;
  workflows: Array<{ name: string; procedure: string }>;
}

describe("the Personal app", () => {
  it("is synthesized into apps.list in a stable leading position, owning unbundled workflows", async () => {
    await putFile("workflows/solo.js", "export default async () => 'solo';");
    await manage("workflows/register", { name: "solo-task", script_path: "workflows/solo.js" });

    const first = await data<{ apps: PersonalAppEntry[] }>(await manage("apps/list", {}));
    expect(first.apps[0]?.name).toBe("personal");
    expect(first.apps[0]?.builtin).toBe(true);
    expect(first.apps[0]?.visibility).toBe("private");
    expect(first.apps[0]?.workflows.map((w) => w.name)).toContain("solo-task");
    // Synthesized, not a real manifest: no entrypoint, no live URL, no roles.
    expect(first.apps[0]?.entry).toBeUndefined();
    expect(first.apps[0]?.url).toBeUndefined();
    expect(first.apps[0]?.createdBy).toBeUndefined();

    // Exporting the workflow from a real app promotes it out of Personal.
    await putFile("apps/exporter/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "exporter",
      dir: "apps/exporter",
      allowed_tools: ["keyvalue.*", "app.*"],
      workflows: ["solo-task"],
    });

    const second = await data<{ apps: PersonalAppEntry[] }>(await manage("apps/list", {}));
    expect(second.apps[0]?.name).toBe("personal");
    expect(second.apps[0]?.workflows.map((w) => w.name)).not.toContain("solo-task");
    const exporter = second.apps.find((a) => a.name === "exporter");
    expect(exporter?.workflows.map((w) => w.name)).toContain("solo-task");
  });

  it("apps.get and apps.capabilities work for personal", async () => {
    const got = await data<PersonalAppEntry & { capabilities: { native: unknown[]; providers: unknown[] } }>(
      await manage("apps/get", { name: "personal" }),
    );
    expect(got.name).toBe("personal");
    expect(got.builtin).toBe(true);
    expect(Array.isArray(got.capabilities.native)).toBe(true);
    expect(got.capabilities.providers).toEqual([]);

    const caps = await data<{
      app: string;
      dataScope: string;
      native: Array<{ namespace: string; partitioning: { path: string } }>;
      providers: unknown[];
    }>(await manage("apps/capabilities", { name: "personal" }));
    expect(caps.app).toBe("personal");
    expect(caps.providers).toEqual([]);
    const keyvalue = caps.native.find((n) => n.namespace === "keyvalue");
    expect(keyvalue?.partitioning.path).toBe("records: app#personal#u#<you>");
  });

  it("rejects apps.publish and apps.remove on personal with a clear 400", async () => {
    const publish = await manage("apps/publish", {
      name: "personal",
      allowed_tools: ["keyvalue.*"],
    });
    expect(publish.status).toBe(400);
    expect(((await publish.json()) as { error: string }).error).toContain("built-in");

    const remove = await manage("apps/remove", { name: "personal" });
    expect(remove.status).toBe(400);
    expect(((await remove.json()) as { error: string }).error).toContain("built-in");
  });

  it("is members-only and partitions app-proxy data per calling user", async () => {
    // In auth mode "none" the single local principal ("local") is the
    // workspace's one member; anyone else is not a member.
    const manifest = await createApp().request("/apps/local/personal", {
      headers: { "X-App-User": "local" },
    });
    expect(manifest.status).toBe(200);
    expect(((await manifest.json()) as { role: string }).role).toBe("admin");

    const outsider = await createApp().request("/apps/local/personal", {
      headers: { "X-App-User": "mallory" },
    });
    expect(outsider.status).toBe(403);

    const set = await appCall("local", "personal/tools/keyvalue/set", {
      args: { key: "note", value: "hi" },
    });
    expect(set.status).toBe(200);

    // Partitioned in the record store under scope app#personal#u#<user> — no
    // longer a workspace file (see docs/app-data.md), and invisible to the
    // file plane: nothing appears at the old .personal/data/<user> path.
    const got = await appCall("local", "personal/tools/keyvalue/get", { args: { key: "note" } });
    expect(((await got.json()) as { data: { value: string } }).data.value).toBe("hi");
    const notOnDisk = await createApp().request("/fs/.personal/data/local/note");
    expect(notOnDisk.status).toBe(404);

    const denied = await appCall("mallory", "personal/tools/keyvalue/set", {
      args: { key: "note", value: "nope" },
    });
    expect(denied.status).toBe(403);
  });

  it("runs unbundled workflows through the app proxy with the caller's own workspace", async () => {
    await putFile("workflows/echo.js", "export default async (input) => ({ seen: input });");
    await manage("workflows/register", { name: "echo-input", script_path: "workflows/echo.js" });

    const run = await appCall("local", "personal/tools/app/echoInput", { args: { hello: "world" } });
    expect(run.status).toBe(200);
    const body = (await run.json()) as { result: { seen: { hello: string } } };
    expect(body.result.seen).toEqual({ hello: "world" });
  });
});
