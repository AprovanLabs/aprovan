/**
 * Validated mounts procedures (iw9-b stream 5 / vfs-mounts).
 *
 * Covers: add-then-read-through; overlap vs app root and vs another mount
 * (409); crdt rejected; app-root-as-target (400); app-scoped mount reads via
 * ordinary appPathAllowed.
 */

import { createServer } from "node:http";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mintAppId } from "../src/apps/identity.js";
import { appPathAllowed, saveApp, type AppManifest } from "../src/apps/store.js";
import { getFsStore } from "../src/fs-store.js";
import { ServiceError } from "../src/service-kernel.js";
import {
  addMount,
  appScopedMountPathAllowed,
  findAppScopedOwner,
  listMounts,
  removeMount,
} from "../src/vcs/mounts-procedures.js";
import { mountRead, resetMountsCache } from "../src/vcs/mounts.js";

let dataDir: string;
let githubServer: { url: string; close: () => Promise<void> };

const README_CONTENT = "# charts\n";
const README_B64 = Buffer.from(README_CONTENT, "utf8").toString("base64");
const LIB_CONTENT = "export const util = 1;\n";
const LIB_B64 = Buffer.from(LIB_CONTENT, "utf8").toString("base64");

async function startGithubStub(): Promise<typeof githubServer> {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://stub");
    const json = (status: number, body: unknown): void => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (/^\/repos\/org\/charts\/git\/trees\//u.test(url.pathname)) {
      json(200, {
        tree: [
          { path: "README.md", type: "blob", sha: "sha-readme", size: README_CONTENT.length },
          { path: "util.ts", type: "blob", sha: "sha-util", size: LIB_CONTENT.length },
        ],
      });
      return;
    }
    if (/^\/repos\/org\/charts\/contents\/README\.md$/u.test(url.pathname)) {
      json(200, {
        content: README_B64,
        encoding: "base64",
        sha: "sha-readme",
        size: README_CONTENT.length,
      });
      return;
    }
    if (/^\/repos\/org\/charts\/contents\/util\.ts$/u.test(url.pathname)) {
      json(200, {
        content: LIB_B64,
        encoding: "base64",
        sha: "sha-util",
        size: LIB_CONTENT.length,
      });
      return;
    }
    json(404, { message: "Not Found" });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

function appRecord(overrides: Partial<AppManifest> & { name: string; root: string }): AppManifest {
  const appId = overrides.appId ?? mintAppId();
  const now = new Date().toISOString();
  return {
    appId,
    name: overrides.name,
    slug: overrides.slug ?? overrides.name,
    root: overrides.root,
    entry: overrides.entry ?? `${overrides.root}/index.tsx`,
    paths: [overrides.root],
    allowedTools: overrides.allowedTools ?? ["vfs.*"],
    createdBy: overrides.createdBy ?? "user1",
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
  };
}

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vcs-mounts-procedures-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  githubServer = await startGithubStub();
  process.env["GITHUB_API_URL"] = githubServer.url;
  resetMountsCache();
});

afterAll(async () => {
  await githubServer.close();
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GITHUB_API_URL"];
  resetMountsCache();
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetMountsCache();
});

afterEach(() => {
  resetMountsCache();
});

describe("vcs mounts procedures — add then read through", () => {
  it("adds a git mount and serves content without writing the FS store", async () => {
    const workspaceId = "mounts-add-read";
    const mount = await addMount(workspaceId, "user1", {
      prefix: "vendor/charts",
      type: "git",
      config: { repo: "org/charts", ref: "main" },
    });
    expect(mount).toMatchObject({
      prefix: "vendor/charts",
      type: "git",
      mode: "read",
    });

    const listed = await listMounts(workspaceId);
    expect(listed.map((m) => m.prefix)).toContain("vendor/charts");

    const file = await mountRead(workspaceId, "vendor/charts/README.md");
    expect(file).not.toBe("not-mounted");
    expect(file).toMatchObject({
      path: "vendor/charts/README.md",
      content: README_CONTENT,
    });

    // Mounted bytes never enter the native FS store.
    expect(await getFsStore().read(workspaceId, "vendor/charts/README.md")).toBeUndefined();

    expect(await removeMount(workspaceId, "vendor/charts")).toBe(true);
  });
});

describe("vcs mounts procedures — overlap rejected", () => {
  it("rejects a mount that overlaps an app root with 409", async () => {
    const workspaceId = "mounts-overlap-root";
    await saveApp(
      workspaceId,
      appRecord({ name: "tasks", root: "apps/tasks" }),
    );

    await expect(
      addMount(workspaceId, "user1", {
        prefix: "apps/tasks",
        type: "s3",
        config: { bucket: "b" },
      }),
    ).rejects.toMatchObject({ status: 409 } satisfies Partial<ServiceError>);

    await expect(
      addMount(workspaceId, "user1", {
        prefix: "apps",
        type: "s3",
        config: { bucket: "b" },
      }),
    ).rejects.toMatchObject({ status: 409 } satisfies Partial<ServiceError>);
  });

  it("rejects a mount that overlaps another mount with 409", async () => {
    const workspaceId = "mounts-overlap-mount";
    await addMount(workspaceId, "user1", {
      prefix: "vendor/charts",
      type: "s3",
      config: { bucket: "b" },
    });

    await expect(
      addMount(workspaceId, "user1", {
        prefix: "vendor/charts/sub",
        type: "s3",
        config: { bucket: "other" },
      }),
    ).rejects.toMatchObject({ status: 409 } satisfies Partial<ServiceError>);
  });
});

describe("vcs mounts procedures — reserved and forbidden backends", () => {
  it("rejects the reserved crdt type", async () => {
    await expect(
      addMount("mounts-crdt", "user1", {
        prefix: "live/doc",
        type: "crdt",
        config: { docUrl: "wss://example" },
      }),
    ).rejects.toMatchObject({ status: 501 } satisfies Partial<ServiceError>);
  });

  it("rejects an app-root workspace-path backend with 400", async () => {
    const workspaceId = "mounts-app-target";
    await saveApp(
      workspaceId,
      appRecord({ name: "crm", root: "apps/crm" }),
    );

    await expect(
      addMount(workspaceId, "user1", {
        prefix: "vendor/shared",
        type: "s3",
        config: { bucket: "b", workspacePath: "apps/crm" },
      }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);

    try {
      await addMount(workspaceId, "user1", {
        prefix: "vendor/shared",
        type: "s3",
        config: { bucket: "b", workspacePath: "apps/crm" },
      });
      expect.unreachable("expected ServiceError");
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceError);
      expect(String((error as ServiceError).message)).toMatch(/app root|external backend|never an app/i);
    }
  });
});

describe("vcs mounts procedures — app-scoped mounts", () => {
  it("allows a mount under an app root and authorizes reads via appPathAllowed", async () => {
    const workspaceId = "mounts-app-scoped";
    const app = appRecord({ name: "tasks", root: "apps/tasks" });
    await saveApp(workspaceId, app);

    const mount = await addMount(workspaceId, "user1", {
      prefix: "apps/tasks/lib",
      type: "git",
      config: { repo: "org/charts", ref: "main" },
    });
    expect(mount.prefix).toBe("apps/tasks/lib");

    const owner = await findAppScopedOwner(workspaceId, "apps/tasks/lib");
    expect(owner?.appId).toBe(app.appId);

    const scope = {
      id: app.appId,
      name: app.name,
      root: app.root,
      paths: [app.root!],
    };
    // Ordinary single-root authz — no second mount store / auth path.
    expect(appPathAllowed(scope, "apps/tasks/lib/util.ts")).toBe(true);
    expect(appScopedMountPathAllowed(scope, "apps/tasks/lib/util.ts")).toBe(true);
    expect(appPathAllowed(scope, "apps/other/secret.txt")).toBe(false);

    const file = await mountRead(workspaceId, "apps/tasks/lib/util.ts");
    expect(file).not.toBe("not-mounted");
    expect(file).toMatchObject({
      path: "apps/tasks/lib/util.ts",
      content: LIB_CONTENT,
    });
  });
});
