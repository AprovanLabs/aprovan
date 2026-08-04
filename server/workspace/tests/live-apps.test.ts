import { mkdtempSync, rmSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getFsStore } from "../src/fs-store.js";
import { APP_SHELL_COMPILER_VERSION, liveAppsRouter } from "../src/routes/live-apps.js";

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

async function publishFolderApp(
  name: string,
  extra: Record<string, unknown> = {},
): Promise<void> {
  await putFile(`apps/${name}/index.tsx`, `export default function App() { return null; }`);
  const res = await manage("apps/publish", {
    name,
    dir: `apps/${name}`,
    allowed_tools: ["keyvalue.*", "vfs.*"],
    ...extra,
  });
  expect(res.status).toBe(200);
}

describe("path binding", () => {
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
    const res = await manage("apps/publish", {
      name: "ambiguous",
      dir: "apps/ambiguous",
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(400);
    expect(((await res.json()) as { error: string }).error).toContain("a.tsx");
  });

  it("ignores name-keyed legacy manifests (nuke-and-reseed; no rebinding)", async () => {
    await putFile("apps/legacy/widget.tsx", "export default () => null;");
    // A pre-identity name-keyed record is not an alias and is not rebound.
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

  it("publishes extra prefixes and serves them as one project", async () => {
    await putFile("apps/charted/index.tsx", "export default () => null;");
    await putFile("lib/charts/bar.ts", "export const bar = 1;");
    const published = await data<{ paths: string[] }>(
      await manage("apps/publish", {
        name: "charted",
        dir: "apps/charted",
        paths: ["lib/charts"],
        visibility: "public",
        allowed_tools: ["vfs.*"],
      }),
    );
    expect(published.paths).toEqual(["apps/charted", "lib/charts"]);

    const project = (await (
      await liveAppsRouter.request("/local/charted/__project__")
    ).json()) as { entry: string; files: Array<{ path: string }> };
    expect(project.entry).toBe("apps/charted/index.tsx");
    expect(project.files.map((f) => f.path).sort()).toEqual([
      "apps/charted/index.tsx",
      "lib/charts/bar.ts",
    ]);

    // Static serving accepts either addressing: app-root-relative or the
    // workspace path the project payload hands out.
    expect((await liveAppsRouter.request("/local/charted/lib/charts/bar.ts")).status).toBe(200);

    // The same prefixes authorize the app session's FS access — no share needed.
    const read = await appCall("alice", "charted/tools/vfs/read", {
      args: { path: "~/lib/charts/bar.ts" },
    });
    expect(read.status).toBe(200);

    // ...and nothing outside them.
    await putFile("lib/secret.ts", "export const s = 1;");
    const denied = await appCall("alice", "charted/tools/vfs/read", {
      args: { path: "~/lib/secret.ts" },
    });
    expect(denied.status).toBe(403);

    // Extra prefixes survive an update that doesn't mention them.
    const updated = await data<{ paths: string[] }>(
      await manage("apps/publish", {
        name: "charted",
        dir: "apps/charted",
        allowed_tools: ["vfs.*"],
      }),
    );
    expect(updated.paths).toEqual(["apps/charted", "lib/charts"]);
  });
});

describe("live app pages", () => {
  it("serves the page shell and the source project", async () => {
    await publishFolderApp("site", { visibility: "public" });
    await putFile("apps/site/lib.ts", "export const n = 1;");

    const page = await liveAppsRouter.request("/local/site");
    expect(page.status).toBe(200);
    expect(page.headers.get("content-type")).toContain("text/html");
    expect(await page.text()).toContain("__project__");

    const project = await liveAppsRouter.request("/local/site/__project__");
    expect(project.status).toBe(200);
    const body = (await project.json()) as { entry: string; files: Array<{ path: string }> };
    // Entry and files are workspace paths — the shell never guesses.
    expect(body.entry).toBe("apps/site/index.tsx");
    expect(body.files.map((f) => f.path).sort()).toEqual([
      "apps/site/index.tsx",
      "apps/site/lib.ts",
    ]);
  });

  it("refuses to publish a folder app without its entrypoint", async () => {
    const res = await manage("apps/publish", {
      name: "hollow",
      dir: "apps/hollow",
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(400);
  });

  it("serves static files but never the data partition, with SPA fallback", async () => {
    await publishFolderApp("assets", { visibility: "public" });
    await putFile("apps/assets/style.css", "body { margin: 0 }");
    await putFile("apps/assets/data/alice/secret", "hunter2");

    const css = await liveAppsRouter.request("/local/assets/style.css");
    expect(css.status).toBe(200);
    expect(await css.text()).toContain("margin: 0");

    // data/ is invisible: falls back to the page shell instead of the file.
    const secret = await liveAppsRouter.request("/local/assets/data/alice/secret");
    expect(secret.headers.get("content-type")).toContain("text/html");
    expect(await secret.text()).not.toContain("hunter2");

    // Unknown paths (client-side routes) fall back to the shell too.
    const spa = await liveAppsRouter.request("/local/assets/some/client/route");
    expect(spa.headers.get("content-type")).toContain("text/html");
  });

  it("gates private apps by the role model", async () => {
    await publishFolderApp("members-only", {
      visibility: "private",
      roles: { access: "listed", users: ["alice"] },
    });

    const alice = await liveAppsRouter.request("/local/members-only/__project__", {
      headers: { "X-App-User": "alice" },
    });
    expect(alice.status).toBe(200);

    const mallory = await liveAppsRouter.request("/local/members-only/__project__", {
      headers: { "X-App-User": "mallory" },
    });
    expect(mallory.status).toBe(403);
  });
});

describe("co-located app data", () => {
  it("partitions keyvalue per app user in the record store, invisible to vfs", async () => {
    await publishFolderApp("tracker");

    await appCall("alice", "tracker/tools/keyvalue/set", {
      args: { key: "state", value: { weeks: 3 } },
    });

    // keyvalue is record-store-backed (see docs/app-data.md): round-trips
    // through the tool, not a workspace file — nothing appears on the vfs
    // at the old apps/tracker/data/alice/state path.
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

    // Listing is scoped to the app folder.
    const listing = await data<{ entries: Array<{ path: string }> }>(
      await appCall("alice", "notes/tools/vfs/list", { args: {} }).then((r) => r),
    );
    expect(listing.entries.every((e) => e.path.startsWith("apps/notes/"))).toBe(true);
  });

  it("blocks workspace paths unless shared via workspace config", async () => {
    await publishFolderApp("reader");
    await putFile("shared/recipes.json", JSON.stringify(["soup"]));

    // Not shared → denied.
    const denied = await appCall("alice", "reader/tools/vfs/read", {
      args: { path: "~/shared/recipes.json" },
    });
    expect(denied.status).toBe(403);

    // Share read access with every app (service state itself is not
    // reachable through /fs — shares are managed via the apps tools).
    const shared = await manage("apps/share", { prefix: "shared", apps: "*", mode: "read" });
    expect(shared.status).toBe(200);

    const allowed = await appCall("alice", "reader/tools/vfs/read", {
      args: { path: "~/shared/recipes.json" },
    });
    expect(allowed.status).toBe(200);

    // Read-only share → writes still denied.
    const write = await appCall("alice", "reader/tools/vfs/write", {
      args: { path: "~/shared/recipes.json", content: "[]" },
    });
    expect(write.status).toBe(403);
  });
});

describe("daily call limits", () => {
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

    // A different user has their own budget.
    const other = await appCall("someone-else", "metered/tools/keyvalue/set", {
      args: { key: "k", value: 1 },
    });
    expect(other.status).toBe(200);
  });
});

describe("app shell compiler pin", () => {
  it("loads the same compiler major.minor.patch this package depends on", async () => {
    // Drift here is the failure mode described on APP_SHELL_COMPILER_VERSION:
    // an older compiler has no namespace-import plugin, so `import keyvalue
    // from "keyvalue"` goes to esm.sh (404, page dead) and `import vfs from
    // "vfs"` silently loads an unrelated npm package. The dependency range is
    // the source of truth; the shell string follows it.
    const pkg = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    ) as { dependencies: Record<string, string> };
    const declared = pkg.dependencies["@aprovan/patchwork"];
    expect(declared).toBeDefined();
    let expected = declared!.replace(/^[\^~]/, "");
    if (expected === "workspace:*") {
      const compilerPkg = JSON.parse(
        await readFile(new URL("../../../packages/compiler/package.json", import.meta.url), "utf8"),
      ) as { version: string };
      expected = compilerPkg.version;
    }
    expect(APP_SHELL_COMPILER_VERSION).toBe(expected);
  });

  it("emits that version into the page, interpolated rather than literal", async () => {
    await publishFolderApp("pinned", { visibility: "public" });
    const html = await (await liveAppsRouter.request("/local/pinned")).text();

    expect(html).toContain(
      `https://esm.sh/@aprovan/patchwork@${APP_SHELL_COMPILER_VERSION}?external=esbuild-wasm`,
    );
    expect(html).not.toContain("${APP_SHELL_COMPILER_VERSION}");
  });
});
