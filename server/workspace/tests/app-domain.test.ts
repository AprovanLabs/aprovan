/**
 * The apps/workflows domain model: the native allow-list, workflows as
 * namespace procedures, releases + channels, install, trace propagation,
 * and the generated SDK. See docs/apps-and-workflows.md.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { liveAppsRouter } from "../src/routes/live-apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-domain-"));
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

describe("native allow-list", () => {
  it("rejects a provider namespace and points at exporting a workflow", async () => {
    const res = await manage("apps/publish", {
      name: "leaky",
      allowed_tools: ["keyvalue.*", "github.*"],
    });
    expect(res.status).toBe(400);
    const { error } = (await res.json()) as { error: string };
    expect(error).toContain("github");
    expect(error).toContain("workflow");
  });

  it("rejects an app.<workflow> entry the app does not export", async () => {
    const res = await manage("apps/publish", {
      name: "wishful",
      allowed_tools: ["app.not-exported"],
    });
    expect(res.status).toBe(400);
  });

  it("reports capabilities: native namespaces, partitioning, and workflows", async () => {
    await putFile("workflows/summary.js", "export default async () => ({ headline: 'hi' });");
    await manage("workflows/register", {
      name: "weekly-summary",
      script_path: "workflows/summary.js",
      description: "Summarize the week",
      input: { type: "object", properties: { weeks: { type: "number" } }, required: ["weeks"] },
      output: { type: "object", properties: { headline: { type: "string" } } },
    });
    await putFile("apps/caps/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "caps",
      dir: "apps/caps",
      allowed_tools: ["keyvalue.*", "app.*"],
      workflows: ["weekly-summary"],
    });

    const caps = await data<{
      native: Array<{ namespace: string; procedures: string[]; partitioning: { mode: string; path: string }; rateLimit: { rps: number } }>;
      workflows: Array<{ name: string; procedure: string; input?: unknown; toolPath: string }>;
    }>(await manage("apps/capabilities", { name: "caps" }));

    const keyvalue = caps.native.find((n) => n.namespace === "keyvalue");
    expect(keyvalue?.procedures.sort()).toEqual(["delete", "get", "list", "set"]);
    expect(keyvalue?.partitioning.mode).toBe("per-app-user");
    // keyvalue is record-store-backed (see docs/app-data.md): a scope
    // string, not a workspace file path.
    expect(keyvalue?.partitioning.path).toMatch(/^records: app#[0-9A-HJKMNP-TV-Z]{26}#u#<you>$/);
    expect(keyvalue?.rateLimit.rps).toBe(5);
    // vfs is not allow-listed here, so it is not reported as reachable.
    expect(caps.native.some((n) => n.namespace === "vfs")).toBe(false);

    expect(caps.workflows[0]).toMatchObject({
      name: "weekly-summary",
      procedure: "weeklySummary",
    });
    expect(caps.workflows[0]?.toolPath).toContain("/tools/app/weeklySummary");
    expect(caps.workflows[0]?.input).toMatchObject({ type: "object" });
  });
});

describe("workflows as namespace procedures", () => {
  beforeEach(async () => {
    await putFile(
      "workflows/echo-app.js",
      `import keyvalue from "keyvalue";
       export default async (input) => {
         await keyvalue.set({ key: "last", value: input });
         return { echoed: input && input.n };
       }`,
    );
    await manage("workflows/register", {
      name: "echo-input",
      script_path: "workflows/echo-app.js",
    });
    await putFile("apps/ns/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "ns",
      dir: "apps/ns",
      allowed_tools: ["keyvalue.*"],
      workflows: ["echo-input"],
      rate_limit: { rps: 100, burst: 200 },
    });
  });

  it("calls an exported workflow through the app tool proxy, camel-cased", async () => {
    const res = await appCall("alice", "ns/tools/app/echoInput", { args: { n: 7 } });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { echoed: number }; status: string; traceId: string };
    expect(body.status).toBe("succeeded");
    expect(body.data.echoed).toBe(7);
    expect(body.traceId).toBeTruthy();

    // The kebab id works too, and both run inside the caller's partition.
    const kebab = await appCall("alice", "ns/tools/app/echo-input", { args: { n: 9 } });
    expect(((await kebab.json()) as { data: { echoed: number } }).data.echoed).toBe(9);

    const stored = await data<{ value: { n: number } }>(
      await appCall("alice", "ns/tools/keyvalue/get", { args: { key: "last" } }),
    );
    expect(stored.value.n).toBe(9);
  });

  it("404s a workflow the app does not export", async () => {
    expect((await appCall("alice", "ns/tools/app/nope")).status).toBe(404);
  });

  it("links the app call, its workflow run, and its cascade into one trace", async () => {
    const res = await appCall("alice", "ns/tools/app/echoInput", { args: { n: 1 } });
    const { traceId, runId } = (await res.json()) as { traceId: string; runId: string };

    const tree = await data<{
      traceId: string;
      runs: Array<{ runId: string; workflow: string; parentRunId?: string }>;
      rootRunIds: string[];
    }>(await manage("workflows/tree", { trace_id: traceId }));
    expect(tree.runs.map((r) => r.runId)).toContain(runId);
    expect(tree.rootRunIds).toContain(runId);
  });
});

describe("releases and channels", () => {
  it("pins the live page to a release and rolls back", async () => {
    await putFile("apps/rel/index.tsx", "export default () => 'v1';");
    await manage("apps/publish", {
      name: "rel",
      dir: "apps/rel",
      visibility: "public",
      allowed_tools: ["keyvalue.*"],
    });

    const first = await data<{ id: string; entryHash: string }>(
      await manage("apps/release", { name: "rel", notes: "first" }),
    );
    expect(first.entryHash).toBeTruthy();

    // The entry moves on; the live channel keeps serving the pinned content.
    await putFile("apps/rel/index.tsx", "export default () => 'v2';");
    const pinned = (await (
      await liveAppsRouter.request("/local/rel/__project__")
    ).json()) as { files: Array<{ path: string; content: string }>; release: { id: string } };
    expect(pinned.release.id).toBe(first.id);
    expect(pinned.files.find((f) => f.path === "apps/rel/index.tsx")?.content).toContain("v1");

    // A second release picks up the new content...
    const second = await data<{ id: string }>(await manage("apps/release", { name: "rel" }));
    const live = (await (
      await liveAppsRouter.request("/local/rel/__project__")
    ).json()) as { files: Array<{ path: string; content: string }> };
    expect(live.files.find((f) => f.path === "apps/rel/index.tsx")?.content).toContain("v2");

    // ...and a rollback returns to the previous one.
    const rolled = await data<{ release: string }>(
      await manage("apps/rollback", { name: "rel" }),
    );
    expect(rolled.release).toBe(first.id);
    expect(second.id).not.toBe(first.id);

    const channels = await data<{ channels: Array<{ channel: string; release: string; resolved: boolean }> }>(
      await manage("apps/channels", { name: "rel" }),
    );
    expect(channels.channels).toEqual([
      expect.objectContaining({ channel: "live", release: first.id, resolved: true }),
    ]);
  });

  it("serves a non-default channel to admins only", async () => {
    await putFile("apps/chan/index.tsx", "export default () => 'preview';");
    await manage("apps/publish", {
      name: "chan",
      dir: "apps/chan",
      visibility: "public",
      allowed_tools: ["keyvalue.*"],
      roles: { admins: ["carol"] },
    });
    await manage("apps/release", { name: "chan", channel: "preview" });

    const admin = await liveAppsRouter.request("/local/chan/__project__?channel=preview", {
      headers: { "X-App-User": "carol" },
    });
    expect(admin.status).toBe(200);

    const stranger = await liveAppsRouter.request("/local/chan/__project__?channel=preview", {
      headers: { "X-App-User": "mallory" },
    });
    expect(stranger.status).toBe(403);
  });
});

describe("generated SDK", () => {
  it("serves a shim and types built from the manifest and workflow schemas", async () => {
    await putFile("workflows/sdk-wf.js", "export default async () => ({ headline: 'x' });");
    await manage("workflows/register", {
      name: "weekly-report",
      script_path: "workflows/sdk-wf.js",
      input: { type: "object", properties: { weeks: { type: "number" } }, required: ["weeks"] },
      output: { type: "object", properties: { headline: { type: "string" } } },
    });
    await putFile("apps/sdk/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "sdk",
      dir: "apps/sdk",
      visibility: "public",
      allowed_tools: ["keyvalue.*", "vfs.*"],
      workflows: ["weekly-report"],
    });

    const js = await liveAppsRouter.request("/local/sdk/__sdk__.js");
    expect(js.headers.get("content-type")).toContain("javascript");
    const shim = await js.text();
    expect(shim).toContain("__APP_CONFIG__");
    expect(shim).toContain('config.appBase');
    expect(shim).toContain("export const keyvalue");
    expect(shim).toContain("export const app");

    const dts = await liveAppsRouter.request("/local/sdk/__sdk__.d.ts");
    expect(dts.headers.get("content-type")).toContain("typescript");
    const types = await dts.text();
    expect(types).toContain("export interface AppNamespace");
    expect(types).toContain("weeklyReport");
    expect(types).toContain("weeks: number");
    expect(types).toContain("headline?: string");
    // Ambient `declare module` blocks — the same file the compiler generates
    // for the editor, so `import keyvalue from "keyvalue"` resolves everywhere.
    expect(types).toContain('declare module "keyvalue"');
    expect(types).toContain("export { keyvalue };");
    // Namespaces the allow-list withholds are not declared at all.
    expect(types).not.toContain('declare module "events"');
  });
});

describe("install (interim, pre-stream-3)", () => {
  it("records an install and keeps origin-hosted keyvalue under appId scopes", async () => {
    await putFile("apps/tmpl/index.tsx", "export default () => null;");
    const published = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "tmpl",
        dir: "apps/tmpl",
        allowed_tools: ["keyvalue.*"],
        rate_limit: { rps: 100, burst: 200 },
      }),
    );

    await appCall("alice", "tmpl/tools/keyvalue/set", { args: { key: "k", value: 1 } });
    const owned = await data<{ value: number }>(
      await appCall("alice", "tmpl/tools/keyvalue/get", { args: { key: "k" } }),
    );
    expect(owned.value).toBe(1);

    const install = await data<{ prefix: string; appId: string; dataPrefix: string }>(
      await manage("apps/install", { owner: "local", name: "tmpl", prefix: "installed/tmpl" }),
    );
    expect(install.appId).toBe(published.appId);
    expect(install.dataPrefix).toContain(`.apps/${published.appId}/data/`);

    const listed = await data<{ apps: Array<{ name: string; owner: string; available: boolean }> }>(
      await manage("apps/installed", {}),
    );
    expect(listed.apps).toEqual([
      expect.objectContaining({ name: "tmpl", owner: "local", available: true }),
    ]);

    await manage("apps/uninstall", { owner: "local", name: "tmpl" });
  });
});

describe("apps.list composition", () => {
  it("returns workflows, triggers, and last run without extra round-trips", async () => {
    await putFile("workflows/listed.js", "export default async () => 1;");
    await manage("workflows/register", {
      name: "listed-wf",
      script_path: "workflows/listed.js",
      description: "Listed",
      triggers: { webhook: true },
    });
    await putFile("apps/listing/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "listing",
      dir: "apps/listing",
      allowed_tools: ["keyvalue.*"],
      workflows: ["listed-wf"],
      rate_limit: { rps: 100, burst: 200 },
    });
    await appCall("alice", "listing/tools/app/listedWf");

    const list = await data<{
      apps: Array<{
        name: string;
        appId: string;
        url: string;
        channels: Record<string, string>;
        workflows: Array<{
          name: string;
          procedure: string;
          scriptPath: string;
          webhookPath?: string;
          lastRun?: { id: string; status: string };
        }>;
      }>;
    }>(await manage("apps/list", {}));

    const app = list.apps.find((a) => a.name === "listing");
    expect(app?.appId).toBeTruthy();
    expect(app?.url).toBe("/apps/local/listing");
    expect(app?.workflows[0]).toMatchObject({
      name: "listed-wf",
      procedure: "listedWf",
      scriptPath: "workflows/listed.js",
    });
    expect(app?.workflows[0]?.webhookPath).toContain("/hooks/local/listed-wf");
    expect(app?.workflows[0]?.lastRun?.status).toBe("succeeded");
  });
});
