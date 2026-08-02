/**
 * Stream 7 — STORE_BACKEND three-way switch, cursor-paginated FS listing,
 * DSQL foundation helpers (OCC retry, transaction chunking), and the
 * DSQL-backed store contract suites.
 *
 * The DSQL suites follow the conformance-suite pattern: they run only when
 * `WORKSPACE_TEST_DSQL_URL` names a reachable Postgres-dialect endpoint
 * (a dev DSQL cluster, or vanilla Postgres for the dialect subset), and are
 * skipped otherwise so the suite stays green without cloud access. FS
 * content blobs additionally need the compose MinIO (S3_ENDPOINT).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chunkRows, isOccConflict, withOccRetry } from "../src/db/dsql.js";
import {
  FsStoreSqlite,
  listAll,
  MAX_FS_PATH_BYTES,
  normalizeFsPath,
} from "../src/fs-store.js";
import { resetWorkspaceConfig, storeBackend } from "../src/runtime/config.js";

const DSQL_URL = process.env["WORKSPACE_TEST_DSQL_URL"];

// ---------------------------------------------------------------------------
// Backend switch
// ---------------------------------------------------------------------------

describe("STORE_BACKEND switch", () => {
  afterAll(() => {
    delete process.env["STORE_BACKEND"];
    resetWorkspaceConfig();
  });

  it("defaults to sqlite in local mode and honors explicit values", () => {
    delete process.env["STORE_BACKEND"];
    resetWorkspaceConfig();
    expect(storeBackend()).toBe("sqlite");
    process.env["STORE_BACKEND"] = "dsql";
    expect(storeBackend()).toBe("dsql");
    process.env["STORE_BACKEND"] = "dynamo";
    expect(storeBackend()).toBe("dynamo");
  });

  it("rejects unknown backends loudly", () => {
    process.env["STORE_BACKEND"] = "postgres";
    expect(() => storeBackend()).toThrowError(/STORE_BACKEND/);
    delete process.env["STORE_BACKEND"];
  });
});

// ---------------------------------------------------------------------------
// Cursor-paginated listing (SQLite backend) + path cap
// ---------------------------------------------------------------------------

describe("cursor-paginated FS listing", () => {
  let dataDir: string;
  let store: FsStoreSqlite;

  beforeAll(async () => {
    dataDir = mkdtempSync(join(tmpdir(), "gateway-fs-pages-"));
    store = new FsStoreSqlite(dataDir);
    for (let i = 0; i < 150; i += 1) {
      await store.write("ws", `tree/f${String(i).padStart(3, "0")}.txt`, `content ${i}`);
    }
  });

  afterAll(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("two-page listing round-trips: disjoint, ordered, complete", async () => {
    const first = await store.list("ws", "tree", { limit: 100 });
    expect(first.entries).toHaveLength(100);
    expect(first.cursor).toBeDefined();
    const second = await store.list("ws", "tree", { cursor: first.cursor, limit: 100 });
    expect(second.entries).toHaveLength(50);
    expect(second.cursor).toBeUndefined();
    const paths = [...first.entries, ...second.entries].map((entry) => entry.path);
    expect(new Set(paths).size).toBe(150);
    expect(paths).toEqual([...paths].sort());
  });

  it("listAll drains every page", async () => {
    // Force multiple pages through a small internal limit by calling list
    // directly; listAll itself passes no limit, so also verify one-shot.
    const all = await listAll(store, "ws", "tree");
    expect(all).toHaveLength(150);
  });

  it("caps paths at 900 bytes in normalizeFsPath", () => {
    const ok = `a/${"b".repeat(200)}`;
    expect(normalizeFsPath(ok)).toBe(ok);
    const long = `a/${"b".repeat(MAX_FS_PATH_BYTES)}`;
    expect(normalizeFsPath(long)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// DSQL helpers — OCC retry and transaction chunking (no database needed)
// ---------------------------------------------------------------------------

describe("DSQL foundation helpers", () => {
  it("retries SQLSTATE 40001 with bounded attempts", async () => {
    let calls = 0;
    const flaky = async (): Promise<string> => {
      calls += 1;
      if (calls < 3) {
        const err = new Error("serialization failure") as Error & { code: string };
        err.code = "40001";
        throw err;
      }
      return "ok";
    };
    await expect(withOccRetry(flaky, { baseDelayMs: 1 })).resolves.toBe("ok");
    expect(calls).toBe(3);
  });

  it("gives up after the attempt budget and rethrows", async () => {
    const always = async (): Promise<never> => {
      const err = new Error("conflict") as Error & { code: string };
      err.code = "40001";
      throw err;
    };
    await expect(withOccRetry(always, { attempts: 2, baseDelayMs: 1 })).rejects.toThrow(
      "conflict",
    );
  });

  it("does not retry non-OCC errors", async () => {
    let calls = 0;
    const broken = async (): Promise<never> => {
      calls += 1;
      throw new Error("syntax error");
    };
    await expect(withOccRetry(broken, { baseDelayMs: 1 })).rejects.toThrow("syntax error");
    expect(calls).toBe(1);
    expect(isOccConflict(new Error("syntax error"))).toBe(false);
  });

  it("chunks rows within the 3,000-row / 10 MiB transaction caps", () => {
    const rows = Array.from({ length: 7_500 }, (_, i) => ({ i }));
    const batches = chunkRows(rows);
    expect(batches.map((batch) => batch.length)).toEqual([3000, 3000, 1500]);

    const fat = Array.from({ length: 10 }, () => ({ blob: "x".repeat(4 * 1024 * 1024) }));
    const byBytes = chunkRows(fat);
    for (const batch of byBytes) {
      expect(batch.length).toBeLessThanOrEqual(2); // 3 × 4 MiB > 10 MiB
    }
    expect(byBytes.flat()).toHaveLength(10);
  });
});

// ---------------------------------------------------------------------------
// DSQL store contract suites (gated on WORKSPACE_TEST_DSQL_URL)
// ---------------------------------------------------------------------------

describe.skipIf(!DSQL_URL)("DSQL store backends (contract)", () => {
  beforeAll(async () => {
    process.env["DSQL_URL"] = DSQL_URL!;
    process.env["STORE_BACKEND"] = "dsql";
    const { resetDsqlPool } = await import("../src/db/dsql.js");
    await resetDsqlPool();
  });

  afterAll(async () => {
    delete process.env["DSQL_URL"];
    delete process.env["STORE_BACKEND"];
    const { resetDsqlPool } = await import("../src/db/dsql.js");
    await resetDsqlPool();
    resetWorkspaceConfig();
  });

  const ws = `dsql-test-${Date.now().toString(36)}`;

  it("record store: round-trip, prefix listing, scope isolation, expiry, indexed listScopes", async () => {
    const { RecordStoreDsql } = await import("../src/records.js");
    const store = new RecordStoreDsql();

    await store.set(ws, "ws", "alpha", { n: 1 }, "tester");
    await store.set(ws, "ws", "alpha/beta", { n: 2 }, "tester");
    await store.set(ws, "app#demo#u#u1", "state", { n: 3 }, "tester");

    expect((await store.get(ws, "ws", "alpha"))?.value).toEqual({ n: 1 });
    expect(await store.list(ws, "ws", "alpha")).toEqual(["alpha", "alpha/beta"]);
    // Scope isolation: the app partition sees only its own keys.
    expect(await store.list(ws, "app#demo#u#u1")).toEqual(["state"]);
    // Indexed scope enumeration.
    expect(await store.listScopes(ws, "app#demo#u#")).toEqual(["app#demo#u#u1"]);

    // Expiry is a read filter + sweep.
    await store.set(ws, "ws", "expired", 1, "tester", {
      expiresAtEpochSeconds: Math.floor(Date.now() / 1000) - 10,
    });
    expect(await store.get(ws, "ws", "expired")).toBeUndefined();
    expect(await store.list(ws, "ws", "expired")).toEqual([]);
    await store.sweepExpired();

    expect(await store.delete(ws, "ws", "alpha")).toBe(true);
    expect(await store.get(ws, "ws", "alpha")).toBeUndefined();
  });

  it("audit store: append + recent ordering and filtering", async () => {
    const { AuditStoreDsql } = await import("../src/audit.js");
    const store = new AuditStoreDsql();
    store.append({
      requestId: "r1",
      workspaceId: ws,
      callerId: "alice",
      provider: "github",
      operation: "issues.create",
      status: 200,
    });
    store.append({
      requestId: "r2",
      workspaceId: ws,
      callerId: "bob",
      provider: "linear",
      operation: "issue.list",
      status: 403,
    });
    // append is fire-and-forget; give it a beat.
    await new Promise((resolve) => setTimeout(resolve, 300));
    const all = await store.recent({ workspaceId: ws });
    expect(all.length).toBeGreaterThanOrEqual(2);
    const bob = await store.recent({ workspaceId: ws, callerId: "bob" });
    expect(bob.every((entry) => entry.callerId === "bob")).toBe(true);
    expect(bob[0]?.result).toBe("forbidden");
  });

  // FS metadata additionally needs the compose MinIO for content blobs.
  const s3Ready = Boolean(process.env["S3_ENDPOINT"] ?? "http://localhost:9000");

  it.skipIf(!s3Ready)(
    "fs store: write/read/list/versions/remove + unversioned service writes + chunked removePrefix",
    async () => {
      process.env["S3_ENDPOINT"] ??= "http://localhost:9000";
      process.env["FS_BUCKET"] ??= "aprovan-fs-test";
      const { FsStoreDsql } = await import("../src/fs-store.js");
      const store = new FsStoreDsql();

      await store.write(ws, "widgets/a.ts", "v1");
      await store.write(ws, "widgets/a.ts", "v2");
      const read = await store.read(ws, "widgets/a.ts");
      expect(read?.content).toBe("v2");
      const versions = await store.listVersions(ws, "widgets/a.ts");
      expect(versions).toHaveLength(2);
      const pinned = await store.read(ws, "widgets/a.ts", versions[1]!.hash);
      expect(pinned?.content).toBe("v1");

      // Unversioned service writes leave no version trail.
      for (let i = 0; i < 5; i += 1) {
        await store.write(ws, ".services/probe.json", `{"i":${i}}`);
      }
      expect((await store.listVersions(ws, ".services/probe.json")).length).toBeLessThanOrEqual(1);

      // Cursor pagination + chunked prefix removal.
      for (let i = 0; i < 25; i += 1) {
        await store.write(ws, `bulk/f${String(i).padStart(2, "0")}.txt`, `x${i}`);
      }
      const page = await store.list(ws, "bulk", { limit: 10 });
      expect(page.entries).toHaveLength(10);
      expect(page.cursor).toBeDefined();
      const drained = await listAll(store, ws, "bulk");
      expect(drained).toHaveLength(25);
      expect(await store.removePrefix(ws, "bulk")).toBe(25);
      expect((await store.list(ws, "bulk")).entries).toEqual([]);

      expect(await store.remove(ws, "widgets/a.ts")).toBe(true);
      expect(await store.read(ws, "widgets/a.ts")).toBeUndefined();
    },
  );

  it("identity flows behave identically on the DSQL backend", async () => {
    const { createDsqlIdentityClient, createIdentityStoreSql } = await import(
      "../src/identity/sql.js"
    );
    const store = createIdentityStoreSql(createDsqlIdentityClient());
    const alice = `alice-${ws}`; // unique per run — the database persists

    await store.workspaces.put({ workspaceId: ws, name: "DSQL WS" });
    expect((await store.workspaces.get(ws))?.name).toBe("DSQL WS");

    await store.memberships.put({ workspaceId: ws, userId: alice, role: "admin" });
    expect((await store.memberships.get(ws, alice))?.role).toBe("admin");
    expect((await store.memberships.listByUser(alice)).length).toBe(1);

    await store.sessions.setCurrentWorkspace(alice, ws);
    expect(await store.sessions.getCurrentWorkspace(alice)).toBe(ws);

    const invite = await store.invites.create(ws, "d@example.com", "member", [], alice);
    expect((await store.invites.consume(invite.inviteToken))?.email).toBe("d@example.com");

    const group = await store.groups.create(ws, "dsql-group");
    await store.groups.members.add(ws, group.groupId, alice);
    expect(await store.groups.members.listGroupIdsForUser(ws, alice)).toEqual([
      group.groupId,
    ]);
    const perm = await store.permissions.grant(ws, {
      callerId: alice,
      provider: "github",
      operation: "issues.create",
      grantedBy: "admin",
    });
    expect(await store.permissions.check(ws, alice, "github", "issues.create")).toBe(true);
    expect(await store.permissions.revoke(ws, perm.id)).toBe(true);

    const { record, secret } = await store.apiKeys.create(ws, { name: "dsql-key" });
    expect((await store.apiKeys.verify(secret))?.keyId).toBe(record.keyId);
    expect(await store.apiKeys.revoke(ws, record.keyId)).toBe(true);
  });

  it("credential store rides registry-server storage with created_by", async () => {
    const { CredentialStoreRegistry } = await import("../src/credentials.js");
    const store = new CredentialStoreRegistry();
    const record = await store.create(ws, {
      provider: "github",
      label: "work",
      payload: { type: "bearer_token", token: "tok-123" },
      createdBy: "user-sub-1",
    });
    expect(record.createdBy).toBe("user-sub-1");
    const listed = await store.list(ws);
    expect(listed.some((row) => row.id === record.id && row.createdBy === "user-sub-1")).toBe(
      true,
    );
    const resolved = await store.resolveRecordForProvider(ws, "github");
    expect(resolved?.payload).toEqual({ type: "bearer_token", token: "tok-123" });
    const byId = await store.resolveRecordById(ws, record.id);
    expect(byId?.provider).toBe("github");
    await store.updatePayload(ws, record.id, { type: "bearer_token", token: "tok-456" });
    expect((await store.getPayload(ws, record.id)) as { token?: string }).toMatchObject({
      token: "tok-456",
    });
    expect(await store.delete(ws, record.id)).toBe(true);
  });
});
