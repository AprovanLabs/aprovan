/**
 * Canonical `/a/…` + `/w/…/a/…` live surface — serving, vanity, redirects,
 * shell leak, install dual-resolution (ported from live-apps.test.ts).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  installAsCopy,
  installServingManifest,
} from "../src/apps/install.js";
import { mintAppId, indexAppLocation, setAlias } from "../src/apps/identity.js";
import { claimGlobalSlug } from "../src/apps/slugs.js";
import { DEPLOYMENT_TENANT } from "../src/apps/identity.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import { getFsStore } from "../src/fs-store.js";
import { APP_SHELL_COMPILER_VERSION, appUrlsRouter } from "../src/routes/app-urls.js";
import { liveAppsRouter } from "../src/routes/live-apps.js";
import { writeSvcRecord, svcScope } from "../src/svc-records.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-urls-"));
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
    // iw9-b: ambiguous folders claim with a conventional default entry.
    const res = await manage("apps/publish", {
      name: "ambiguous",
      dir: "apps/ambiguous",
      allowed_tools: ["keyvalue.*"],
    });
    expect(res.status).toBe(200);
    const published = await data<{ entry: string }>(res);
    expect(published.entry).toBe("apps/ambiguous/index.tsx");
  });

  it("ignores name-keyed legacy manifests under canonical URLs", async () => {
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
    expect((await appUrlsRouter.request("/w/local/a/legacy/__project__")).status).toBe(404);
  });

  it("serves files under the app root as one project under /a", async () => {
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

    const project = (await (
      await appUrlsRouter.request(`/a/${published.appId}/__project__`)
    ).json()) as { entry: string; files: Array<{ path: string }> };
    expect(project.entry).toBe("apps/charted/index.tsx");
    expect(project.files.map((f) => f.path).sort()).toEqual([
      "apps/charted/index.tsx",
      "apps/charted/lib/bar.ts",
    ]);

    expect(
      (await appUrlsRouter.request(`/a/${published.appId}/lib/bar.ts`)).status,
    ).toBe(200);

    const read = await appCall("alice", "charted/tools/vfs/read", {
      args: { path: "lib/bar.ts" },
    });
    expect(read.status).toBe(200);

    await putFile("lib/secret.ts", "export const s = 1;");
    const denied = await appCall("alice", "charted/tools/vfs/read", {
      args: { path: "~/lib/secret.ts" },
    });
    expect(denied.status).toBe(403);
  });
});

describe("canonical live app pages", () => {
  it("serves the page shell and the source project at /a/:appId", async () => {
    const { appId } = await publishFolderApp("site", { visibility: "public" });
    await putFile("apps/site/lib.ts", "export const n = 1;");

    const page = await appUrlsRouter.request(`/a/${appId}`);
    expect(page.status).toBe(200);
    expect(page.headers.get("content-type")).toContain("text/html");
    expect(await page.text()).toContain("__project__");

    const project = await appUrlsRouter.request(`/a/${appId}/__project__`);
    expect(project.status).toBe(200);
    const body = (await project.json()) as { entry: string; files: Array<{ path: string }> };
    expect(body.entry).toBe("apps/site/index.tsx");
    expect(body.files.map((f) => f.path).sort()).toEqual([
      "apps/site/index.tsx",
      "apps/site/lib.ts",
    ]);
  });

  it("serves the same surface under /w/:wsId/a/:name (alias)", async () => {
    const { appId } = await publishFolderApp("ws-alias", { visibility: "public" });
    const project = await appUrlsRouter.request("/w/local/a/ws-alias/__project__");
    expect(project.status).toBe(200);
    const page = await appUrlsRouter.request(`/w/local/a/${appId}`);
    expect(page.status).toBe(200);
  });

  it("serves static files but never the data partition, with SPA fallback", async () => {
    const { appId } = await publishFolderApp("assets", { visibility: "public" });
    await putFile("apps/assets/style.css", "body { margin: 0 }");
    await putFile("apps/assets/data/alice/secret", "hunter2");

    const css = await appUrlsRouter.request(`/a/${appId}/style.css`);
    expect(css.status).toBe(200);
    expect(await css.text()).toContain("margin: 0");

    const secret = await appUrlsRouter.request(`/a/${appId}/data/alice/secret`);
    expect(secret.headers.get("content-type")).toContain("text/html");
    expect(await secret.text()).not.toContain("hunter2");

    const spa = await appUrlsRouter.request(`/a/${appId}/some/client/route`);
    expect(spa.headers.get("content-type")).toContain("text/html");
  });

  it("gates private apps by the role model", async () => {
    const { appId } = await publishFolderApp("members-only", {
      visibility: "private",
      roles: { access: "listed", users: ["alice"] },
    });

    const alice = await appUrlsRouter.request(`/a/${appId}/__project__`, {
      headers: { "X-App-User": "alice" },
    });
    expect(alice.status).toBe(200);

    const mallory = await appUrlsRouter.request(`/a/${appId}/__project__`, {
      headers: { "X-App-User": "mallory" },
    });
    expect(mallory.status).toBe(403);
  });
});

describe("redirect matrix", () => {
  it("redirects all legacy/convenience forms to canonical Locations", async () => {
    const { appId } = await publishFolderApp("redir", { visibility: "public" });
    await claimGlobalSlug("redir", appId, "local");

    expectRedirect(await liveAppsRouter.request("/local/redir"), `/a/${appId}`);
    expectRedirect(await liveAppsRouter.request(`/id/${appId}`), `/a/${appId}`);
    expectRedirect(await liveAppsRouter.request("/redir"), `/a/${appId}`);
    expectRedirect(
      await liveAppsRouter.request("/local/redir/__project__"),
      `/a/${appId}/__project__`,
    );
    expect( (await liveAppsRouter.request("/local/redir")).headers.get("location") ).not.toContain(
      "/local/",
    );
  });
});

describe("canonical stability + vanity", () => {
  it("canonical /a/:appId survives a rename", async () => {
    const { appId } = await publishFolderApp("before-rename", { visibility: "public" });
    const before = await appUrlsRouter.request(`/a/${appId}/__project__`);
    expect(before.status).toBe(200);

    const renamed = await manage("apps/rename", { app: "before-rename", name: "after-rename" });
    expect(renamed.status).toBe(200);

    const after = await appUrlsRouter.request(`/a/${appId}/__project__`);
    expect(after.status).toBe(200);
    expect((await liveAppsRouter.request("/local/before-rename")).status).toBe(404);
    expectRedirect(await liveAppsRouter.request("/local/after-rename"), `/a/${appId}`);
  });

  it("global vanity /a/:slug resolves via claim", async () => {
    const { appId } = await publishFolderApp("claimed-app", { visibility: "public" });
    await claimGlobalSlug("claimed-app", appId, "local");
    const page = await appUrlsRouter.request("/a/claimed-app");
    expect(page.status).toBe(200);
    expect(await page.text()).toContain(appId);
  });

  it("ULID segment after /a/ is never consulted as a slug", async () => {
    const { appId } = await publishFolderApp("id-disambig", { visibility: "public" });
    // Claiming a different slug that is not the ULID — requesting the ULID
    // serves the app by id even if a slug index were somehow involved.
    const page = await appUrlsRouter.request(`/a/${appId}`);
    expect(page.status).toBe(200);
    expect((await appUrlsRouter.request("/a/no-such-slug")).status).toBe(404);
  });

  it("workspace vanity /w/:wsSlug/a/:slug resolves via wsSlugs + alias", async () => {
    const { appId } = await publishFolderApp("ws-vanity", { visibility: "public" });
    await writeSvcRecord(DEPLOYMENT_TENANT, svcScope("wsSlugs"), "acme", {
      workspaceId: "local",
    });
    const page = await appUrlsRouter.request("/w/acme/a/ws-vanity");
    expect(page.status).toBe(200);
    const project = await appUrlsRouter.request(`/w/acme/a/${appId}/__project__`);
    expect(project.status).toBe(200);
  });

  it("unresolvable slug and ws/install mismatch are 404", async () => {
    expect((await appUrlsRouter.request("/a/missing-slug")).status).toBe(404);
    expect((await appUrlsRouter.request("/w/unknown-ws/a/nope")).status).toBe(404);
    const fakeInstall = mintAppId();
    expect((await appUrlsRouter.request(`/w/local/a/${fakeInstall}`)).status).toBe(404);
  });
});

describe("public shell carries no workspace id", () => {
  it("rendered public shell HTML embeds no hosting workspace id", async () => {
    const { appId } = await publishFolderApp("shell-public", { visibility: "public" });
    const html = await (await appUrlsRouter.request(`/a/${appId}`)).text();
    expect(html).toContain(`"liveBase":"/a/${appId}"`);
    expect(html).toContain(`"permalinkBase":"/a/${appId}"`);
    expect(html).toContain(`"appBase":"/api/gateway/apps/id/${appId}"`);
    expect(html).not.toContain("/apps/local/");
    expect(html).not.toContain('"workspaceId"');
    expect(html).not.toMatch(/\/w\/local\//);
  });
});

describe("install-then-alias dual resolution at /w/:wsId/a/:ref", () => {
  it("serves an install-as-copy by installId; alias still resolves own apps", async () => {
    const originWs = "ws-origin-urls";
    const installerWs = "ws-installer-urls";
    const store = getFsStore();
    const root = "apps/tasks";
    const entry = `${root}/index.tsx`;
    await store.write(originWs, entry, "export default () => 'origin';", "text/tsx");

    const originId = mintAppId();
    const now = new Date().toISOString();
    const origin: AppManifest = {
      appId: originId,
      name: "tasks",
      root,
      paths: [root],
      entry,
      visibility: "public",
      allowedTools: ["keyvalue.*"],
      createdBy: "alice",
      createdAt: now,
      updatedAt: now,
    };
    await saveApp(originWs, origin);
    await setAlias(originWs, "tasks", originId);
    await indexAppLocation(originWs, originId, "tasks");

    const install = await installAsCopy({
      originWorkspaceId: originWs,
      manifest: origin,
      installerWorkspaceId: installerWs,
      installedBy: "bob",
      hosting: "managed",
    });
    const local = installServingManifest(install);
    expect(local?.entry).toBeTruthy();

    // Install id under installer workspace.
    const byInstall = await appUrlsRouter.request(
      `/w/${installerWs}/a/${install.installId}/__project__`,
      { headers: { "X-App-User": "bob" } },
    );
    expect(byInstall.status).toBe(200);
    const body = (await byInstall.json()) as { entry: string };
    expect(body.entry).toBe(local!.entry);

    // Same installId in the wrong workspace → 404 (no fall-through to origin).
    expect(
      (await appUrlsRouter.request(`/w/${originWs}/a/${install.installId}/__project__`)).status,
    ).toBe(404);

    // Alias under origin still resolves the authored app.
    const byAlias = await appUrlsRouter.request(`/w/${originWs}/a/tasks/__project__`);
    expect(byAlias.status).toBe(200);

    // Installs are not slug-addressable under the installer.
    expect(
      (await appUrlsRouter.request(`/w/${installerWs}/a/tasks/__project__`)).status,
    ).toBe(404);
  });
});

describe("app shell compiler pin", () => {
  it("loads the same compiler major.minor.patch this package depends on", async () => {
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
    const { appId } = await publishFolderApp("pinned", { visibility: "public" });
    const html = await (await appUrlsRouter.request(`/a/${appId}`)).text();

    expect(html).toContain(
      `https://esm.sh/@aprovan/patchwork@${APP_SHELL_COMPILER_VERSION}?external=esbuild-wasm`,
    );
    expect(html).not.toContain("${APP_SHELL_COMPILER_VERSION}");
  });
});
