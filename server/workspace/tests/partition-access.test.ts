/**
 * Per-user data partition enforcement (specs per-user-data; tech-plan
 * data-auth-model D1–D3): foreign partitions answer 404 — indistinguishable
 * from a nonexistent path — on BOTH planes (vfs.* tools and /fs routes),
 * including version-pinned reads; owners keep full access and see their own
 * partition in listings; snapshots/commits/restores never touch partitions;
 * and the audited `apps.data` procedure is the only sanctioned admin path to
 * app file partitions (personal has no override at all).
 *
 * Auth mode "none" resolves the single local principal as sub "local", so
 * "foreign" is exercised by seeding files under other subs' partitions
 * directly through the FS store (below the guard, exactly where legacy
 * pre-migration data still lives).
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

async function publishApp(name: string, overrides: Record<string, unknown> = {}): Promise<void> {
  await putFile(`apps/${name}/index.tsx`, "export default () => null;");
  const res = await manage("apps/publish", {
    name,
    dir: `apps/${name}`,
    allowed_tools: ["keyvalue.*", "vfs.*"],
    rate_limit: { rps: 100, burst: 200 },
    ...overrides,
  });
  expect(res.status).toBe(200);
}

// ---------------------------------------------------------------------------
// The pure rule
// ---------------------------------------------------------------------------

describe("partitionAccess (pure)", () => {
  const hidden = [".personal/data", "apps/papp/data"] as const;

  it("paths outside every hidden prefix are open", () => {
    expect(partitionAccess("notes.md", "alice", hidden)).toBe("open");
    expect(partitionAccess("apps/papp/index.tsx", "alice", hidden)).toBe("open");
    expect(partitionAccess(".personal-lookalike/x", "alice", hidden)).toBe("open");
  });

  it("the partition container itself is open (owned by nobody)", () => {
    expect(partitionAccess(".personal/data", "alice", hidden)).toBe("open");
    expect(partitionAccess("apps/papp/data", "alice", hidden)).toBe("open");
  });

  it("owner = first segment after the prefix; own vs foreign", () => {
    expect(partitionAccess(".personal/data/alice/notes.md", "alice", hidden)).toBe("own");
    expect(partitionAccess(".personal/data/alice/notes.md", "bob", hidden)).toBe("foreign");
    expect(partitionAccess("apps/papp/data/alice/deep/nested/file", "alice", hidden)).toBe("own");
    expect(partitionAccess("apps/papp/data/alice/deep/nested/file", "bob", hidden)).toBe("foreign");
  });

  it("the partition-root path (no trailing content) belongs to its sub", () => {
    expect(partitionAccess(".personal/data/alice", "alice", hidden)).toBe("own");
    expect(partitionAccess(".personal/data/alice", "bob", hidden)).toBe("foreign");
  });
});

// ---------------------------------------------------------------------------
// Tool plane (vfs.*)
// ---------------------------------------------------------------------------

describe("vfs.* foreign-partition enforcement", () => {
  it("read / hash-pinned read / write / delete of a foreign partition 404 like a missing path", async () => {
    const store = getFsStore();
    const seeded = await store.write("local", ".personal/data/alice/notes.md", "alice's secret");

    // Exact-path read: 404, same error shape as a genuinely missing path.
    const foreign = await manage("vfs/read", { path: ".personal/data/alice/notes.md" });
    expect(foreign.status).toBe(404);
    const foreignBody = (await foreign.json()) as { error: string };
    const missing = await manage("vfs/read", { path: ".personal/data/alice/does-not-exist.md" });
    expect(missing.status).toBe(404);
    const missingBody = (await missing.json()) as { error: string };
    expect(foreignBody.error).toBe("Not found: .personal/data/alice/notes.md");
    expect(missingBody.error).toBe("Not found: .personal/data/alice/does-not-exist.md");

    // Version-pinned read with a hash learned out of band: equally 404.
    const pinned = await manage("vfs/read", {
      path: ".personal/data/alice/notes.md",
      hash: seeded.hash,
    });
    expect(pinned.status).toBe(404);

    // Write: rejected, and no new version row is created.
    const write = await manage("vfs/write", {
      path: ".personal/data/alice/notes.md",
      content: "overwritten by mallory",
    });
    expect(write.status).toBe(404);
    expect((await store.read("local", ".personal/data/alice/notes.md"))?.content).toBe(
      "alice's secret",
    );
    expect(await store.listVersions("local", ".personal/data/alice/notes.md")).toHaveLength(1);

    // Delete: rejected, file untouched.
    const del = await manage("vfs/delete", { path: ".personal/data/alice/notes.md" });
    expect(del.status).toBe(404);
    expect(await store.read("local", ".personal/data/alice/notes.md")).toBeDefined();
  });

  it("app data partitions of other users are equally enforced", async () => {
    await publishApp("papp");
    await getFsStore().write("local", "apps/papp/data/alice/state.json", "{}");
    expect((await manage("vfs/read", { path: "apps/papp/data/alice/state.json" })).status).toBe(404);
    expect(
      (await manage("vfs/write", { path: "apps/papp/data/alice/state.json", content: "x" })).status,
    ).toBe(404);
    expect((await manage("vfs/delete", { path: "apps/papp/data/alice/state.json" })).status).toBe(
      404,
    );
  });

  it("the owner has full access, and listings include their own partition only", async () => {
    await getFsStore().write("local", ".personal/data/alice/notes.md", "alice's secret");

    const write = await manage("vfs/write", {
      path: ".personal/data/local/mine.md",
      content: "my private notes",
    });
    expect(write.status).toBe(200);
    const read = await manage("vfs/read", { path: ".personal/data/local/mine.md" });
    expect(read.status).toBe(200);
    expect((await data<{ content: string }>(read)).content).toBe("my private notes");

    const listing = await data<{ entries: Array<{ path: string }> }>(await manage("vfs/list", {}));
    const paths = listing.entries.map((entry) => entry.path);
    expect(paths).toContain(".personal/data/local/mine.md");
    expect(paths.some((path) => path.startsWith(".personal/data/alice/"))).toBe(false);

    const del = await manage("vfs/delete", { path: ".personal/data/local/mine.md" });
    expect(del.status).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// HTTP plane (/fs)
// ---------------------------------------------------------------------------

describe("/fs foreign-partition enforcement", () => {
  it("GET/PUT/DELETE (and hash-pinned GET) 404 byte-identically to a missing path", async () => {
    const store = getFsStore();
    const seeded = await store.write("local", ".personal/data/alice/http.md", "secret");
    const app = createApp();

    const foreign = await app.request("/fs/.personal/data/alice/http.md");
    const missing = await app.request("/fs/definitely/not/a/file.md");
    expect(foreign.status).toBe(404);
    expect(missing.status).toBe(404);
    // Byte-identical body: no existence oracle.
    expect(await foreign.text()).toBe(await missing.text());

    const pinned = await app.request(`/fs/.personal/data/alice/http.md?hash=${seeded.hash}`);
    expect(pinned.status).toBe(404);

    const put = await app.request("/fs/.personal/data/alice/http.md", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "clobbered" }),
    });
    expect(put.status).toBe(404);
    expect((await store.read("local", ".personal/data/alice/http.md"))?.content).toBe("secret");

    const del = await app.request("/fs/.personal/data/alice/http.md", { method: "DELETE" });
    expect(del.status).toBe(404);
    expect(await store.read("local", ".personal/data/alice/http.md")).toBeDefined();
  });

  it("the caller's own partition is writable, readable, and listed; foreign is unlisted", async () => {
    await getFsStore().write("local", ".personal/data/alice/http.md", "secret");

    const put = await putFile(".personal/data/local/own.md", "mine");
    expect(put.status).toBe(201);
    const got = await createApp().request("/fs/.personal/data/local/own.md");
    expect(got.status).toBe(200);

    const res = await createApp().request("/fs");
    const body = (await res.json()) as { entries: Array<{ path: string }> };
    const paths = body.entries.map((entry) => entry.path);
    expect(paths).toContain(".personal/data/local/own.md");
    expect(paths.some((path) => path.startsWith(".personal/data/alice/"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Snapshots, commits, restores
// ---------------------------------------------------------------------------

describe("snapshots and restores never touch partitions", () => {
  it("commits exclude ALL partitions (own included) and restores cannot write into one", async () => {
    const store = getFsStore();
    await putFile("src/app.ts", "export {};");
    await manage("vfs/write", { path: ".personal/data/local/own-note.md", content: "own" });
    await store.write("local", ".personal/data/alice/foreign.md", "foreign");

    const commit = await data<{ commit: { id: string } }>(
      await manage("vfs/commit", { message: "partition test" }),
    );

    const show = await data<{ entries: Array<{ path: string }> }>(
      await manage("vfs/show", { commit: commit.commit.id }),
    );
    expect(
      show.entries.some(
        (entry) =>
          entry.path.startsWith(".personal/data/") || /\/data\//u.test(entry.path),
      ),
    ).toBe(false);
    expect(show.entries.some((entry) => entry.path === "src/app.ts")).toBe(true);

    // A restore of the full commit — and of the personal prefix explicitly —
    // writes nothing under any partition.
    const full = await data<{ restored: string[] }>(
      await manage("vfs/restore", { commit: commit.commit.id }),
    );
    expect(full.restored.some((path) => path.startsWith(".personal/data/"))).toBe(false);
    const scoped = await data<{ restored: string[] }>(
      await manage("vfs/restore", { commit: commit.commit.id, prefix: ".personal" }),
    );
    expect(scoped.restored).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// apps.data — file partitions, audited; personal has no override
// ---------------------------------------------------------------------------

describe("apps.data file-partition access", () => {
  it("serves a user's app file to the app's admin and audits path-level detail", async () => {
    await publishApp("fp-app", { roles: { admins: ["local"] } });
    await getFsStore().write("local", "apps/fp-app/data/alice/report.md", "# report");

    const auditSpy = vi.spyOn(getAuditStore(), "append");
    const res = await manage("apps/data", { name: "fp-app", user: "alice", path: "report.md" });
    expect(res.status).toBe(200);
    const body = await data<{ content: string | null }>(res);
    expect(body.content).toBe("# report");

    const detailed = auditSpy.mock.calls.filter(([entry]) =>
      String(entry.operation).startsWith("data:"),
    );
    expect(detailed.map(([entry]) => entry.operation)).toEqual(["data:fp-app:alice:report.md"]);
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

  it("rejects personal (records AND files) with the no-admin-override error", async () => {
    for (const args of [
      { name: "personal" },
      { name: "personal", user: "alice", path: "notes.md" },
    ]) {
      const res = await manage("apps/data", args);
      expect(res.status).toBe(403);
      expect(((await res.json()) as { error: string }).error).toMatch(/no admin override/i);
    }
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
