/**
 * Legacy `/apps/…` routes are resolve-then-302 shims only.
 * Serving coverage lives in `app-urls.test.ts`.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { claimGlobalSlug } from "../src/apps/slugs.js";
import { liveAppsRouter } from "../src/routes/live-apps.js";
import { createWorkspaceApp } from "../src/server.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-live-apps-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
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
  const body = (await res.json()) as { data: T };
  return body.data;
}

async function publishFolderApp(
  name: string,
  extra: Record<string, unknown> = {},
): Promise<{ appId: string }> {
  await putFile(`apps/${name}/index.tsx`, `export default function App() { return null; }`);
  const res = await manage("apps/publish", {
    name,
    dir: `apps/${name}`,
    allowed_tools: ["keyvalue.*", "vfs.*"],
    ...extra,
  });
  expect(res.status).toBe(200);
  return data<{ appId: string }>(res);
}

function expectRedirect(res: Response, location: string) {
  expect(res.status).toBe(302);
  expect(res.headers.get("location")).toBe(location);
}

describe("path binding (publish still works; live paths 302)", () => {
  it("resolves a folder to its entrypoint, preferring the conventional names", async () => {
    await putFile("apps/liift4/widget.tsx", "export default () => null;");
    const published = await data<{ entry: string; paths: string[] }>(
      await manage("apps/publish", {
        name: "liift4",
        dir: "apps/liift4",
        allowed_tools: ["keyvalue.*"],
      }),
    );
    expect(published.entry).toBe("apps/liift4/widget.tsx");
    expect(published.paths).toEqual(["apps/liift4"]);
  });

  it("accepts an explicit entry path and derives the primary prefix from it", async () => {
    await putFile("studio/ui/main.tsx", "export default () => null;");
    const published = await data<{ entry: string; paths: string[] }>(
      await manage("apps/publish", {
        name: "studio",
        entry: "studio/ui/main.tsx",
        allowed_tools: ["keyvalue.*"],
      }),
    );
    expect(published.entry).toBe("studio/ui/main.tsx");
    expect(published.paths).toEqual(["studio/ui"]);
  });

  it("rejects an ambiguous folder with the candidates listed", async () => {
    await putFile("apps/ambiguous/a.tsx", "export default () => null;");
    await putFile("apps/ambiguous/b.tsx", "export default () => null;");
    // iw9-b resolvePublishRoot now claims the folder with a conventional
    // default entry when resolution is ambiguous (no longer 400s here).
    const res = await manage("apps/publish", {
      name: "ambiguous",
      dir: "apps/ambiguous",
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(200);
    const published = await data<{ entry: string }>(res);
    expect(published.entry).toBe("apps/ambiguous/index.tsx");
  });

  it("ignores name-keyed legacy manifests (nuke-and-reseed; no rebinding)", async () => {
    await putFile("apps/legacy/widget.tsx", "export default () => null;");
    const { getRecordStore } = await import("../src/records.js");
    await getRecordStore().set(
      "local",
      "svc#apps",
      "legacy",
      {
        name: "legacy",
        dir: "apps/legacy",
        visibility: "public",
        allowedTools: ["keyvalue.*"],
        createdBy: "local",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      "system",
    );
    const res = await liveAppsRouter.request("/local/legacy/__project__");
    expect(res.status).toBe(404);
  });

  it("publishes a folder app; legacy live path 302s to canonical", async () => {
    await putFile("apps/charted/index.tsx", "export default () => null;");
    await putFile("apps/charted/lib/bar.ts", "export const bar = 1;");
    const published = await data<{ paths: string[]; appId: string }>(
      await manage("apps/publish", {
        name: "charted",
        dir: "apps/charted",
        visibility: "public",
        allowed_tools: ["vfs.*"],
      }),
    );
    expect(published.paths).toEqual(["apps/charted"]);

    expectRedirect(
      await liveAppsRouter.request("/local/charted/__project__"),
      `/a/${published.appId}/__project__`,
    );
    expectRedirect(
      await liveAppsRouter.request("/local/charted/lib/bar.ts"),
      `/a/${published.appId}/lib/bar.ts`,
    );
  });
});

describe("legacy live paths redirect to canonical", () => {
  it("redirects the page and __project__ for a published app", async () => {
    const { appId } = await publishFolderApp("site", { visibility: "public" });
    await putFile("apps/site/lib.ts", "export const n = 1;");

    expectRedirect(await liveAppsRouter.request("/local/site"), `/a/${appId}`);
    expectRedirect(
      await liveAppsRouter.request("/local/site/__project__"),
      `/a/${appId}/__project__`,
    );
  });

  it("allows publish that claims a hollow folder (entry materialises later)", async () => {
    // iw9-b: missing entrypoint no longer blocks publish — folder is claimed.
    const res = await manage("apps/publish", {
      name: "hollow",
      dir: "apps/hollow",
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(200);
  });

  it("redirects static and SPA paths (never serves content)", async () => {
    const { appId } = await publishFolderApp("assets", { visibility: "public" });
    await putFile("apps/assets/style.css", "body { margin: 0 }");
    await putFile("apps/assets/data/alice/secret", "hunter2");

    expectRedirect(
      await liveAppsRouter.request("/local/assets/style.css"),
      `/a/${appId}/style.css`,
    );
    expectRedirect(
      await liveAppsRouter.request("/local/assets/data/alice/secret"),
      `/a/${appId}/data/alice/secret`,
    );
    expectRedirect(
      await liveAppsRouter.request("/local/assets/some/client/route"),
      `/a/${appId}/some/client/route`,
    );
  });

  it("redirects private-app project paths (gating happens on canonical)", async () => {
    const { appId } = await publishFolderApp("members-only", {
      visibility: "private",
      roles: { access: "listed", users: ["alice"] },
    });

    expectRedirect(
      await liveAppsRouter.request("/local/members-only/__project__", {
        headers: { "X-App-User": "alice" },
      }),
      `/a/${appId}/__project__`,
    );
    expectRedirect(
      await liveAppsRouter.request("/local/members-only/__project__", {
        headers: { "X-App-User": "mallory" },
      }),
      `/a/${appId}/__project__`,
    );
  });

  it("redirects /apps/id/:appId permalink to /a/:appId", async () => {
    const { appId } = await publishFolderApp("perma", { visibility: "public" });
    expectRedirect(await liveAppsRouter.request(`/id/${appId}`), `/a/${appId}`);
    expectRedirect(
      await liveAppsRouter.request(`/id/${appId}/__project__`),
      `/a/${appId}/__project__`,
    );
  });

  it("redirects /apps/:slug convenience to /a/:appId when claimed", async () => {
    const { appId } = await publishFolderApp("vanity-src", { visibility: "public" });
    await claimGlobalSlug("vanity-src", appId, "local");
    expectRedirect(await liveAppsRouter.request("/vanity-src"), `/a/${appId}`);
  });

  it("legacy /apps/<ws>/<name> Location never contains the workspace id", async () => {
    const { appId } = await publishFolderApp("noleak", { visibility: "public" });
    const res = await liveAppsRouter.request("/local/noleak");
    expectRedirect(res, `/a/${appId}`);
    expect(res.headers.get("location")).not.toContain("local");
  });

  it("createWorkspaceApp mount strips /apps before resolving (not mount-relative path)", async () => {
    const { appId } = await publishFolderApp("mounted", { visibility: "public" });
    const live = createWorkspaceApp();
    expectRedirect(await live.request("/apps/local/mounted"), `/a/${appId}`);
    expectRedirect(await live.request(`/apps/id/${appId}`), `/a/${appId}`);
    expectRedirect(
      await live.request(`/apps/id/${appId}/__project__`),
      `/a/${appId}/__project__`,
    );
  });
});

describe("co-located app data", () => {
  const appCall = (user: string, path: string, body: Record<string, unknown> = {}) =>
    createApp().request(`/apps/local/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-App-User": user },
      body: JSON.stringify(body),
    });

  it("partitions keyvalue per app user in the record store, invisible to vfs", async () => {
    await publishFolderApp("tracker");

    await appCall("alice", "tracker/tools/keyvalue/set", {
      args: { key: "state", value: { weeks: 3 } },
    });

    const got = await data<{ value: { weeks: number } }>(
      await appCall("alice", "tracker/tools/keyvalue/get", { args: { key: "state" } }),
    );
    expect(got.value).toEqual({ weeks: 3 });
    const onDisk = await manage("vfs/read", { path: "apps/tracker/data/alice/state" });
    expect(onDisk.status).toBe(404);
  });

  it("resolves app vfs paths against the app's primary prefix", async () => {
    await publishFolderApp("notes");

    const write = await appCall("alice", "notes/tools/vfs/write", {
      args: { path: "shared-notes.md", content: "# hi" },
    });
    expect(write.status).toBe(200);

    const owner = await data<{ content: string }>(
      await manage("vfs/read", { path: "apps/notes/shared-notes.md" }),
    );
    expect(owner.content).toBe("# hi");

    const listing = await data<{ entries: Array<{ path: string }> }>(
      await appCall("alice", "notes/tools/vfs/list", { args: {} }).then((r) => r),
    );
    expect(listing.entries.every((e) => e.path.startsWith("apps/notes/"))).toBe(true);
  });

  it("blocks workspace paths unless shared via workspace config", async () => {
    await publishFolderApp("reader");
    await putFile("shared/recipes.json", JSON.stringify(["soup"]));

    const denied = await appCall("alice", "reader/tools/vfs/read", {
      args: { path: "~/shared/recipes.json" },
    });
    expect(denied.status).toBe(403);

    const shared = await manage("apps/share", { prefix: "shared", apps: "*", mode: "read" });
    expect(shared.status).toBe(200);

    const allowed = await appCall("alice", "reader/tools/vfs/read", {
      args: { path: "~/shared/recipes.json" },
    });
    expect(allowed.status).toBe(200);

    const write = await appCall("alice", "reader/tools/vfs/write", {
      args: { path: "~/shared/recipes.json", content: "[]" },
    });
    expect(write.status).toBe(403);
  });
});

describe("daily call limits", () => {
  const appCall = (user: string, path: string, body: Record<string, unknown> = {}) =>
    createApp().request(`/apps/local/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-App-User": user },
      body: JSON.stringify(body),
    });

  it("meters per-(app, user) calls per day and rejects past the budget", async () => {
    await publishFolderApp("metered", {
      rate_limit: { rps: 100, burst: 100, daily: 3 },
    });

    for (let i = 0; i < 3; i += 1) {
      const res = await appCall("visitor", "metered/tools/keyvalue/set", {
        args: { key: `k${i}`, value: i },
      });
      expect(res.status).toBe(200);
    }

    const blocked = await appCall("visitor", "metered/tools/keyvalue/set", {
      args: { key: "k4", value: 4 },
    });
    expect(blocked.status).toBe(429);
    const body = (await blocked.json()) as { error: string; used: number; limit: number };
    expect(body.error).toBe("daily_limit_exceeded");
    expect(body.limit).toBe(3);

    const other = await appCall("someone-else", "metered/tools/keyvalue/set", {
      args: { key: "k", value: 1 },
    });
    expect(other.status).toBe(200);
  });
});
