/**
 * Per-user data partition enforcement (specs per-user-data / per-user-space):
 * foreign partitions answer 404 on BOTH planes (vfs.* and /fs), including
 * version-pinned reads; owners keep full access and see their own partition
 * in listings; snapshots never touch partitions; audited `apps.data` is the
 * only sanctioned admin path to app file partitions.
 *
 * Roots are structural: `.apps/<appId>/data/<sub>/…` and `.users/<sub>/…`.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { partitionAccess, resetHiddenDataPrefixCache } from "../src/apps/store.js";
import { getAuditStore } from "../src/audit.js";
import { getFsStore } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-partition-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
  resetHiddenDataPrefixCache();
});

const manage = (path: string, args: Record<string, unknown> = {}) =>
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

async function publishApp(
  name: string,
  overrides: Record<string, unknown> = {},
): Promise<{ appId: string }> {
  await putFile(`apps/${name}/index.tsx`, "export default () => null;");
  const res = await manage("apps/publish", {
    name,
    dir: `apps/${name}`,
    allowed_tools: ["keyvalue.*", "vfs.*"],
    rate_limit: { rps: 100, burst: 200 },
    ...overrides,
  });
  expect(res.status).toBe(200);
  const body = (await res.json()) as { data: { appId: string } };
  return { appId: body.data.appId };
}

describe("partitionAccess (pure)", () => {
  const hidden = [".apps", ".users"] as const;

  it("paths outside every hidden prefix are open", () => {
    expect(partitionAccess("notes.md", "alice", hidden)).toBe("open");
    expect(partitionAccess("apps/papp/index.tsx", "alice", hidden)).toBe("open");
    expect(partitionAccess(".apps-lookalike/x", "alice", hidden)).toBe("open");
  });

  it("the partition container itself is open (owned by nobody)", () => {
    expect(partitionAccess(".apps/01APPID000000000000000000/data", "alice", hidden)).toBe("open");
    expect(partitionAccess(".apps", "alice", hidden)).toBe("open");
    expect(partitionAccess(".users", "alice", hidden)).toBe("open");
  });

  it("owner = <sub> segment under .apps/<id>/data and .users", () => {
    expect(
      partitionAccess(".apps/01APPID000000000000000000/data/alice/notes.md", "alice", hidden),
    ).toBe("own");
    expect(
      partitionAccess(".apps/01APPID000000000000000000/data/alice/notes.md", "bob", hidden),
    ).toBe("foreign");
    expect(partitionAccess(".users/alice/draft.md", "alice", hidden)).toBe("own");
    expect(partitionAccess(".users/alice/draft.md", "bob", hidden)).toBe("foreign");
  });

  it("the partition-root path (no trailing content) belongs to its sub", () => {
    expect(partitionAccess(".apps/01APPID000000000000000000/data/alice", "alice", hidden)).toBe(
      "own",
    );
    expect(partitionAccess(".apps/01APPID000000000000000000/data/alice", "bob", hidden)).toBe(
      "foreign",
    );
    expect(partitionAccess(".users/alice", "alice", hidden)).toBe("own");
    expect(partitionAccess(".users/alice", "bob", hidden)).toBe("foreign");
  });
});

describe("vfs.* foreign-partition enforcement", () => {
  it("read / hash-pinned read / write / delete of a foreign partition 404", async () => {
    const { appId } = await publishApp("p-foreign");
    const path = `.apps/${appId}/data/alice/notes.md`;
    const store = getFsStore();
    const seeded = await store.write("local", path, "alice's secret");

    const foreign = await manage("vfs/read", { path });
    expect(foreign.status).toBe(404);
    const foreignBody = (await foreign.json()) as { error: string };
    const missing = await manage("vfs/read", { path: `.apps/${appId}/data/alice/missing.md` });
    expect(missing.status).toBe(404);
    const missingBody = (await missing.json()) as { error: string };
    expect(foreignBody.error).toBe(`Not found: ${path}`);
    expect(missingBody.error).toBe(`Not found: .apps/${appId}/data/alice/missing.md`);

    const pinned = await manage("vfs/read", { path, hash: seeded.hash });
    expect(pinned.status).toBe(404);

    const write = await manage("vfs/write", { path, content: "overwritten" });
    expect(write.status).toBe(404);
    expect((await store.read("local", path))?.content).toBe("alice's secret");
    expect(await store.listVersions("local", path)).toHaveLength(1);

    const del = await manage("vfs/delete", { path });
    expect(del.status).toBe(404);
    expect(await store.read("local", path)).toBeDefined();
  });

  it("the owner has full access, and listings include their own partition only", async () => {
    const { appId } = await publishApp("p-own");
    await getFsStore().write("local", `.apps/${appId}/data/alice/notes.md`, "alice's secret");

    const mine = `.apps/${appId}/data/local/mine.md`;
    const write = await manage("vfs/write", { path: mine, content: "my private notes" });
    expect(write.status).toBe(200);
    const read = await manage("vfs/read", { path: mine });
    expect(read.status).toBe(200);
    expect((await data<{ content: string }>(read)).content).toBe("my private notes");

    const listing = await data<{ entries: Array<{ path: string }> }>(await manage("vfs/list", {}));
    const paths = listing.entries.map((entry) => entry.path);
    expect(paths).toContain(mine);
    expect(paths.some((path) => path.startsWith(`.apps/${appId}/data/alice/`))).toBe(false);

    const del = await manage("vfs/delete", { path: mine });
    expect(del.status).toBe(200);
  });
});

describe("/fs foreign-partition enforcement", () => {
  it("GET/PUT/DELETE (and hash-pinned GET) 404 byte-identically to a missing path", async () => {
    const { appId } = await publishApp("p-http");
    const path = `.apps/${appId}/data/alice/http.md`;
    const store = getFsStore();
    const seeded = await store.write("local", path, "secret");
    const app = createApp();

    const foreign = await app.request(`/fs/${path}`);
    const missing = await app.request("/fs/definitely/not/a/file.md");
    expect(foreign.status).toBe(404);
    expect(missing.status).toBe(404);
    expect(await foreign.text()).toBe(await missing.text());

    const pinned = await app.request(`/fs/${path}?hash=${seeded.hash}`);
    expect(pinned.status).toBe(404);

    const put = await app.request(`/fs/${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "clobbered" }),
    });
    expect(put.status).toBe(404);
    expect((await store.read("local", path))?.content).toBe("secret");

    const del = await app.request(`/fs/${path}`, { method: "DELETE" });
    expect(del.status).toBe(404);
    expect(await store.read("local", path)).toBeDefined();
  });

  it("the caller's own partition is writable, readable, and listed; foreign is unlisted", async () => {
    const { appId } = await publishApp("p-http-own");
    await getFsStore().write("local", `.apps/${appId}/data/alice/http.md`, "secret");

    const mine = `.apps/${appId}/data/local/own.md`;
    const put = await putFile(mine, "mine");
    expect(put.status).toBe(201);
    const got = await createApp().request(`/fs/${mine}`);
    expect(got.status).toBe(200);

    const res = await createApp().request("/fs");
    const body = (await res.json()) as { entries: Array<{ path: string }> };
    const paths = body.entries.map((entry) => entry.path);
    expect(paths).toContain(mine);
    expect(paths.some((path) => path.startsWith(`.apps/${appId}/data/alice/`))).toBe(false);
  });
});

describe("snapshots and restores never touch partitions", () => {
  it("commits exclude ALL partitions (own included) and restores cannot write into one", async () => {
    const { appId } = await publishApp("p-snap");
    const store = getFsStore();
    await putFile("src/app.ts", "export {};");
    await manage("vfs/write", {
      path: `.apps/${appId}/data/local/own-note.md`,
      content: "own",
    });
    await manage("vfs/write", {
      path: ".users/local/private.md",
      content: "private",
    });
    await store.write("local", `.apps/${appId}/data/alice/foreign.md`, "foreign");
    await store.write("local", ".users/alice/foreign.md", "foreign-user");

    const commit = await data<{ commit: { id: string } }>(
      await manage("vcs/commit", { message: "partition test" }),
    );

    const show = await data<{ files: string[] }>(
      await manage("vcs/show", { commit: commit.commit.id }),
    );
    expect(show.files.some((path) => path.startsWith(`.apps/${appId}/data/`))).toBe(false);
    expect(show.files.some((path) => path.startsWith(".users/"))).toBe(false);
    expect(show.files.some((path) => path === "src/app.ts")).toBe(true);

    const full = await data<{ restored: string[] }>(
      await manage("vcs/restore", { commit: commit.commit.id }),
    );
    expect(full.restored.some((path) => path.startsWith(`.apps/${appId}/data/`))).toBe(false);
    expect(full.restored.some((path) => path.startsWith(".users/"))).toBe(false);
  });
});

describe("apps.data file-partition access", () => {
  it("serves a user's app file to the app's admin and audits path-level detail", async () => {
    const { appId } = await publishApp("fp-app", { roles: { admins: ["local"] } });
    await getFsStore().write("local", `.apps/${appId}/data/alice/report.md`, "# report");

    const auditSpy = vi.spyOn(getAuditStore(), "append");
    const res = await manage("apps/data", { name: "fp-app", user: "alice", path: "report.md" });
    expect(res.status).toBe(200);
    const body = await data<{ content: string | null }>(res);
    expect(body.content).toBe("# report");

    const detailed = auditSpy.mock.calls.filter(([entry]) =>
      String(entry.operation).startsWith("data:"),
    );
    expect(detailed.map(([entry]) => entry.operation)).toEqual([
      `data:${appId}:alice:report.md`,
    ]);
    auditSpy.mockRestore();
  });

  it("refuses non-admins with 403 naming the required role, without an audit-read", async () => {
    await publishApp("fp-gated", { roles: { admins: ["someone-else"] } });
    const auditSpy = vi.spyOn(getAuditStore(), "append");
    const res = await manage("apps/data", { name: "fp-gated", user: "alice", path: "x.md" });
    expect(res.status).toBe(403);
    expect(((await res.json()) as { error: string }).error).toMatch(/admins/i);
    expect(
      auditSpy.mock.calls.some(([entry]) => String(entry.operation).startsWith("data:")),
    ).toBe(false);
    auditSpy.mockRestore();
  });

  it("404s unknown apps", async () => {
    const res = await manage("apps/data", { name: "no-such-app" });
    expect(res.status).toBe(404);
  });

  it("accepts appId and cannot reach the private .users space", async () => {
    const { appId } = await publishApp("fp-id", { roles: { admins: ["local"] } });
    await getFsStore().write("local", `.apps/${appId}/data/alice/ok.md`, "ok");
    const byId = await manage("apps/data", { app: appId, user: "alice", path: "ok.md" });
    expect(byId.status).toBe(200);
    expect((await data<{ content: string | null }>(byId)).content).toBe("ok");

    // Path escape is rejected; there is no procedure that serves `.users/**`.
    const escape = await manage("apps/data", {
      app: appId,
      user: "alice",
      path: "../../../.users/alice/secret.md",
    });
    expect(escape.status).toBe(400);
  });

  it("rejects `path` together with `key`, and `path` escaping the partition", async () => {
    await publishApp("fp-strict", { roles: { admins: ["local"] } });
    const both = await manage("apps/data", {
      name: "fp-strict",
      user: "alice",
      key: "k",
      path: "p.md",
    });
    expect(both.status).toBe(400);
    const escape = await manage("apps/data", {
      name: "fp-strict",
      user: "alice",
      path: "../../index.tsx",
    });
    expect(escape.status).toBe(400);
  });
});
