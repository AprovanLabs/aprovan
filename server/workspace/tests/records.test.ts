/**
 * The record store (src/records.ts) and everything it changed about
 * `keyvalue`: scope isolation (workspace vs. per-app-user, across apps and
 * across users of the same app), the lazy-migration fallback off the old
 * FS-backed keys, the file plane forgetting app data (vfs.list / GET /fs),
 * and the audited `apps.data` admin procedure. See docs/app-data.md.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { hiddenDataPrefixes, resetHiddenDataPrefixCache } from "../src/apps/store.js";
import { getAuditStore } from "../src/audit.js";
import { getFsStore } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { getRecordStore, RecordStoreSqlite } from "../src/records.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-records-"));
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

const appCall = (user: string, path: string, body: Record<string, unknown> = {}) =>
  createApp().request(`/apps/local/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-User": user },
    body: JSON.stringify(body),
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
  overrides: Record<string, unknown> = {},
): Promise<void> {
  await putFile(`apps/${name}/index.tsx`, "export default () => null;");
  const res = await manage("apps/publish", {
    name,
    dir: `apps/${name}`,
    allowed_tools: ["keyvalue.*"],
    rate_limit: { rps: 100, burst: 200 },
    ...overrides,
  });
  expect(res.status).toBe(200);
}

// ---------------------------------------------------------------------------
// Direct backend unit tests (RecordStoreSqlite — the local dev backend)
// ---------------------------------------------------------------------------

describe("RecordStoreSqlite", () => {
  it("get/set/delete/list/listScopes round-trip within one tenant+scope partition", async () => {
    const store = new RecordStoreSqlite(dataDir);

    expect(await store.get("ws-a", "ws", "missing")).toBeUndefined();

    const written = await store.set("ws-a", "ws", "draft", { title: "hi" }, "user-1");
    expect(written.value).toEqual({ title: "hi" });
    expect(written.updatedBy).toBe("user-1");

    const read = await store.get("ws-a", "ws", "draft");
    expect(read?.value).toEqual({ title: "hi" });

    await store.set("ws-a", "ws", "draft-2", "x", "user-1");
    await store.set("ws-a", "ws", "other", "y", "user-1");
    expect((await store.list("ws-a", "ws", "draft")).sort()).toEqual(["draft", "draft-2"]);
    expect(await store.list("ws-a", "ws")).toContain("other");

    expect(await store.delete("ws-a", "ws", "draft")).toBe(true);
    expect(await store.delete("ws-a", "ws", "draft")).toBe(false);
    expect(await store.get("ws-a", "ws", "draft")).toBeUndefined();
  });

  it("keeps scopes and tenants isolated from each other", async () => {
    const store = new RecordStoreSqlite(dataDir);
    await store.set("ws-a", "app#x#u#alice", "k", 1, "alice");
    await store.set("ws-a", "app#x#u#bob", "k", 2, "bob");
    await store.set("ws-b", "app#x#u#alice", "k", 3, "alice");

    expect((await store.get("ws-a", "app#x#u#alice", "k"))?.value).toBe(1);
    expect((await store.get("ws-a", "app#x#u#bob", "k"))?.value).toBe(2);
    expect((await store.get("ws-b", "app#x#u#alice", "k"))?.value).toBe(3);

    const scopes = await store.listScopes("ws-a", "app#x#u#");
    expect(scopes.sort()).toEqual(["app#x#u#alice", "app#x#u#bob"]);
  });
});

// ---------------------------------------------------------------------------
// keyvalue routing through the record store, end to end
// ---------------------------------------------------------------------------

describe("keyvalue scope isolation", () => {
  it("never lets two app users of the same app see each other's keys", async () => {
    await publishFolderApp("tracker");
    await appCall("alice", "tracker/tools/keyvalue/set", { args: { key: "state", value: "alice-data" } });
    await appCall("bob", "tracker/tools/keyvalue/set", { args: { key: "state", value: "bob-data" } });

    const alice = await data<{ value: string }>(
      await appCall("alice", "tracker/tools/keyvalue/get", { args: { key: "state" } }),
    );
    const bob = await data<{ value: string }>(
      await appCall("bob", "tracker/tools/keyvalue/get", { args: { key: "state" } }),
    );
    expect(alice.value).toBe("alice-data");
    expect(bob.value).toBe("bob-data");

    // Directly against the record store: two distinct scopes under one tenant.
    const records = getRecordStore();
    expect((await records.get("local", "app#tracker#u#alice", "state"))?.value).toBe("alice-data");
    expect((await records.get("local", "app#tracker#u#bob", "state"))?.value).toBe("bob-data");
  });

  it("never lets two different apps' same-named keys collide", async () => {
    await publishFolderApp("app-one");
    await publishFolderApp("app-two");
    await appCall("alice", "app-one/tools/keyvalue/set", { args: { key: "state", value: "one" } });
    await appCall("alice", "app-two/tools/keyvalue/set", { args: { key: "state", value: "two" } });

    const one = await data<{ value: string }>(
      await appCall("alice", "app-one/tools/keyvalue/get", { args: { key: "state" } }),
    );
    const two = await data<{ value: string }>(
      await appCall("alice", "app-two/tools/keyvalue/get", { args: { key: "state" } }),
    );
    expect(one.value).toBe("one");
    expect(two.value).toBe("two");
  });

  it("keeps the shared workspace KV (scope 'ws') separate from every app scope", async () => {
    await publishFolderApp("sidecar");
    await manage("keyvalue/set", { key: "shared", value: "workspace-value" });
    await appCall("alice", "sidecar/tools/keyvalue/set", { args: { key: "shared", value: "app-value" } });

    const workspaceValue = await data<{ value: string }>(await manage("keyvalue/get", { key: "shared" }));
    const appValue = await data<{ value: string }>(
      await appCall("alice", "sidecar/tools/keyvalue/get", { args: { key: "shared" } }),
    );
    expect(workspaceValue.value).toBe("workspace-value");
    expect(appValue.value).toBe("app-value");

    const records = getRecordStore();
    expect((await records.get("local", "ws", "shared"))?.value).toBe("workspace-value");
    expect((await records.get("local", "app#sidecar#u#alice", "shared"))?.value).toBe("app-value");
  });
});

describe("lazy migration fallback", () => {
  it("migrates a legacy FS-backed workspace key on first read, then deletes the file", async () => {
    const store = getFsStore();
    await store.write("local", ".services/keyvalue/legacy-note", JSON.stringify("old-value"), "application/json");

    const got = await data<{ value: string }>(await manage("keyvalue/get", { key: "legacy-note" }));
    expect(got.value).toBe("old-value");

    // Landed in the record store...
    expect((await getRecordStore().get("local", "ws", "legacy-note"))?.value).toBe("old-value");
    // ...and the legacy file is gone.
    expect(await store.read("local", ".services/keyvalue/legacy-note")).toBeUndefined();

    // A second read is a plain record-store hit — no file to fall back to.
    const again = await data<{ value: string }>(await manage("keyvalue/get", { key: "legacy-note" }));
    expect(again.value).toBe("old-value");
  });

  it("migrates a legacy per-app-user FS key co-located with the app", async () => {
    await publishFolderApp("legacy-app");
    const store = getFsStore();
    await store.write(
      "local",
      "apps/legacy-app/data/alice/old-state",
      JSON.stringify({ weeks: 9 }),
      "application/json",
    );

    const got = await data<{ value: { weeks: number } }>(
      await appCall("alice", "legacy-app/tools/keyvalue/get", { args: { key: "old-state" } }),
    );
    expect(got.value).toEqual({ weeks: 9 });
    expect(
      (await getRecordStore().get("local", "app#legacy-app#u#alice", "old-state"))?.value,
    ).toEqual({ weeks: 9 });
    expect(await store.read("local", "apps/legacy-app/data/alice/old-state")).toBeUndefined();
  });

  it("keyvalue.list merges not-yet-migrated legacy keys with record-store keys", async () => {
    // Scoped to a "merge-" prefix (and filtered by it below) so leftover
    // "ws"-scope keys from earlier tests in this file can't leak in.
    await getFsStore().write(
      "local",
      ".services/keyvalue/merge-fresh",
      JSON.stringify(1),
      "application/json",
    );
    await manage("keyvalue/set", { key: "merge-brand-new", value: 2 });

    const listed = await data<{ keys: string[] }>(await manage("keyvalue/list", { prefix: "merge-" }));
    expect(listed.keys.sort()).toEqual(["merge-brand-new", "merge-fresh"]);
  });
});

describe("the file plane forgets app data", () => {
  it("hiddenDataPrefixes covers every published app's data root", async () => {
    await publishFolderApp("hidden-one");
    resetHiddenDataPrefixCache();
    const prefixes = await hiddenDataPrefixes("local");
    expect(prefixes).toContain("apps/hidden-one/data");
    expect(prefixes).toContain(".personal/data");
  });

  it("vfs.list hides an app's data directory but reads/writes to it still work", async () => {
    await publishFolderApp("visible-app");
    await appCall("alice", "visible-app/tools/keyvalue/set", { args: { key: "state", value: 1 } });
    // Seed a legacy-shaped file directly so there is something to hide even
    // before any lazy-migration read has swept it away.
    await getFsStore().write(
      "local",
      "apps/visible-app/data/alice/leftover",
      JSON.stringify("leftover"),
      "application/json",
    );

    const listing = await data<{ entries: Array<{ path: string }> }>(
      await manage("vfs/list", { prefix: "apps/visible-app" }),
    );
    expect(listing.entries.some((e) => e.path.startsWith("apps/visible-app/data/"))).toBe(false);
    // The app's own file (not under data/) is still listed normally.
    expect(listing.entries.some((e) => e.path === "apps/visible-app/index.tsx")).toBe(true);

    // Hiding grew into enforcement (specs per-user-data): a direct read of
    // ANOTHER user's partition by exact path now 404s like a missing file.
    // The partition owner's own app session still reads it (lazy migration).
    const direct = await manage("vfs/read", { path: "apps/visible-app/data/alice/leftover" });
    expect(direct.status).toBe(404);
  });

  it("GET /fs (the chat file tree route) hides the same prefixes", async () => {
    await publishFolderApp("tree-app");
    await getFsStore().write(
      "local",
      "apps/tree-app/data/alice/leftover",
      JSON.stringify("leftover"),
      "application/json",
    );

    const res = await createApp().request("/fs");
    const body = (await res.json()) as { entries: Array<{ path: string }> };
    expect(body.entries.some((e) => e.path.startsWith("apps/tree-app/data/"))).toBe(false);
    expect(body.entries.some((e) => e.path === "apps/tree-app/index.tsx")).toBe(true);
  });
});

describe("apps.data admin procedure", () => {
  it("is gated on the app's admin role and audits every call", async () => {
    await publishFolderApp("admin-app", { roles: { admins: ["local"] } });
    await appCall("alice", "admin-app/tools/keyvalue/set", { args: { key: "state", value: 1 } });
    await appCall("alice", "admin-app/tools/keyvalue/set", { args: { key: "other", value: 2 } });
    await appCall("bob", "admin-app/tools/keyvalue/set", { args: { key: "state", value: 3 } });

    const auditSpy = vi.spyOn(getAuditStore(), "append");

    // "local" is the admin (auth mode "none" resolves the sole workspace
    // member as "local"); listing users.
    const users = await data<{ users: string[] }>(await manage("apps/data", { name: "admin-app" }));
    expect(users.users.sort()).toEqual(["alice", "bob"]);

    const aliceKeys = await data<{ keys: string[] }>(
      await manage("apps/data", { name: "admin-app", user: "alice" }),
    );
    expect(aliceKeys.keys.sort()).toEqual(["other", "state"]);

    const value = await data<{ value: number }>(
      await manage("apps/data", { name: "admin-app", user: "alice", key: "state" }),
    );
    expect(value.value).toBe(1);

    // Every call is audited twice: once generically (routes/tools.ts appends
    // for every /tools/:provider/:operation call, bare `operation: "data"`)
    // and once by this procedure itself with the specific app/user/key in
    // `operation`, since "someone called apps.data" is much weaker than
    // "someone looked at admin-app's alice/state" for a feature whose whole
    // point is replacing ambient browsability with a visible, audited trail.
    expect(auditSpy).toHaveBeenCalledTimes(6);
    const detailed = auditSpy.mock.calls.filter(([entry]) => String(entry.operation).startsWith("data:"));
    expect(detailed).toHaveLength(3);
    for (const [entry] of detailed) {
      expect(entry).toMatchObject({ workspaceId: "local", callerId: "local", provider: "apps" });
      expect(String(entry.operation)).toContain("admin-app");
    }
    expect(detailed.map(([entry]) => entry.operation)).toEqual([
      "data:admin-app",
      "data:admin-app:alice",
      "data:admin-app:alice:state",
    ]);

    auditSpy.mockRestore();
  });

  it("rejects a call whose caller is not in the app's roles.admins", async () => {
    await publishFolderApp("gated-app", { roles: { admins: ["only-this-admin"] } });
    // The default local caller ("local") is not in roles.admins.
    const res = await manage("apps/data", { name: "gated-app" });
    expect(res.status).toBe(403);
  });

  it("rejects personal outright — personal data has no admin override", async () => {
    await appCall("local", "personal/tools/keyvalue/set", { args: { key: "note", value: "hi" } });
    const res = await manage("apps/data", { name: "personal" });
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toMatch(/no admin override/i);
  });

  it("requires `user` when `key` is given", async () => {
    await publishFolderApp("strict-app", { roles: { admins: ["local"] } });
    const res = await manage("apps/data", { name: "strict-app", key: "state" });
    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// The reserved `svc#` system namespace (specs/record-store, "The record rule
// covers platform subsystems" / "App sessions cannot reach system scopes").
// ---------------------------------------------------------------------------

describe("reserved svc# scopes", () => {
  it("rejects svc# scopes at the caller-scope guard", async () => {
    const { assertCallerScope, isSystemScope, svcScope } = await import("../src/svc-records.js");
    expect(isSystemScope(svcScope("chat", "sessions"))).toBe(true);
    expect(isSystemScope("ws")).toBe(false);
    expect(isSystemScope("app#liift4#u#user-1")).toBe(false);
    expect(() => assertCallerScope("svc#chat#sessions")).toThrowError(/svc#/);
    expect(() => assertCallerScope("ws")).not.toThrow();
    expect(() => assertCallerScope("app#liift4#u#user-1")).not.toThrow();
  });

  it("orders and parses seq keys so lexical order is append order", async () => {
    const { seqKey, parseSeqKey } = await import("../src/svc-records.js");
    const a = seqKey(2, "m2");
    const b = seqKey(10, "m10");
    expect(a < b).toBe(true);
    expect(parseSeqKey(b)).toEqual({ seq: 10, id: "m10" });
    expect(parseSeqKey("garbage")).toBeUndefined();
  });

  it("keeps app-session keyvalue confined to its app scope, never svc#", async () => {
    await publishFolderApp("scope-probe");
    await appCall("user-1", "scope-probe/tools/keyvalue/set", {
      args: { key: "state", value: 1 },
    });
    const store = getRecordStore();
    // The write landed in the app partition; the svc# namespace holds no key
    // an app session could have created.
    const appKeys = await store.list("local", "app#scope-probe#u#user-1");
    expect(appKeys).toContain("state");
    const chatKeys = await store.list("local", "svc#chat#sessions", "state");
    expect(chatKeys).toEqual([]);
  });
});
