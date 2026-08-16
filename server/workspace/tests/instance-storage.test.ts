/**
 * Storage metering and caps at the `apps/instances.ts` + `records.ts`
 * boundary (spec instance-storage; tech-plan TD5): counter deltas on shared
 * writes/deletes, 413 over-cap rejection storing nothing, recount as the
 * authoritative drift correction, and `deleteInstance` clearing both planes.
 * SQLite backend exercised directly; the Dynamo item shape is asserted
 * through a mocked `db/client.js` (no live Dynamo). Host-gating and audit
 * rows for these functions are stream 5's `apps.instance*` procedures — the
 * mechanism layer here appends no audit rows by design.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import SqliteDatabase from "better-sqlite3";
import {
  createInstance,
  deleteInstance,
  getInstance,
  assertInstanceAccess,
  recountInstanceUsage,
  reserveInstanceBytes,
  setInstanceCap,
  sharedDataDir,
  sharedRecordScope,
} from "../src/apps/instances.js";
import { getFsStore, listAll } from "../src/fs-store.js";
import { putMembership } from "../src/memberships.js";
import { getRecordStore, RecordStoreDynamodb } from "../src/records.js";
import { ServiceError } from "../src/service-kernel.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

// ---------------------------------------------------------------------------
// Mocked Dynamo document client — the store's serialization seam. Items land
// in a Map so `GetCommand` pre-reads and `ReturnValues: ALL_OLD` deletes see
// what `PutCommand` wrote; every put is also logged for shape assertions.
// ---------------------------------------------------------------------------

const dyn = vi.hoisted(() => {
  const items = new Map<string, Record<string, unknown>>();
  const puts: Array<Record<string, unknown>> = [];
  return {
    items,
    puts,
    reset(): void {
      items.clear();
      puts.length = 0;
    },
  };
});

vi.mock("../src/db/client.js", () => {
  class Command {
    constructor(readonly input: Record<string, any>) {}
  }
  class GetCommand extends Command {}
  class PutCommand extends Command {}
  class DeleteCommand extends Command {}
  class QueryCommand extends Command {}
  class ScanCommand extends Command {}
  const keyOf = (key: { PK?: unknown; SK?: unknown }): string =>
    `${String(key.PK)}|${String(key.SK)}`;
  const client = {
    async send(cmd: Command): Promise<Record<string, unknown>> {
      if (cmd instanceof GetCommand) {
        return { Item: dyn.items.get(keyOf(cmd.input["Key"])) };
      }
      if (cmd instanceof PutCommand) {
        const item = cmd.input["Item"] as Record<string, unknown>;
        dyn.items.set(keyOf(item), item);
        dyn.puts.push(item);
        return {};
      }
      if (cmd instanceof DeleteCommand) {
        const key = keyOf(cmd.input["Key"]);
        const old = dyn.items.get(key);
        dyn.items.delete(key);
        return cmd.input["ReturnValues"] === "ALL_OLD" ? { Attributes: old } : {};
      }
      if (cmd instanceof QueryCommand) {
        const pk = cmd.input["ExpressionAttributeValues"][":pk"];
        const rows = [...dyn.items.values()].filter((item) => item["PK"] === pk);
        return { Items: rows.map((item) => ({ SK: item["SK"] })) };
      }
      return { Items: [] };
    },
  };
  return {
    dynamo: async () => ({ client, GetCommand, PutCommand, DeleteCommand, QueryCommand, ScanCommand }),
    getDynamoDocClient: async () => client,
    resetDynamoDocClient: () => {},
  };
});

// ---------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------

let dataDir: string;

const WS = "ws-instance-storage";
const APP = "01APPSTORAGE000000000000000";
const ALICE = "alice";
const BOB = "bob";

/** Serialized byte size exactly as the write path stamps it (TD5). */
function sizeOf(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value ?? null), "utf8");
}

async function makeInstance(): Promise<string> {
  const instance = await createInstance({
    workspaceId: WS,
    appId: APP,
    createdBy: ALICE,
    participants: [ALICE, BOB],
  });
  return instance.instanceId;
}

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-instance-storage-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["FS_BUCKET"];
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  dyn.reset();
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
});

// ---------------------------------------------------------------------------
// Per-instance storage metering (SQLite backend, the singleton store)
// ---------------------------------------------------------------------------

describe("Per-instance storage metering", () => {
  it("shared writes and overwrites keep the counter at the stored footprint", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const small = { text: "hi" };
    const bigger = { text: "a much longer note than before" };

    await getRecordStore().set(WS, scope, "notes", small, ALICE);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(sizeOf(small));

    await getRecordStore().set(WS, scope, "notes", bigger, BOB);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(sizeOf(bigger));
  });

  it("stamps bytes on shared rows only; per-user and ws rows stay null (4.1)", async () => {
    const instanceId = await makeInstance();
    const shared = sharedRecordScope(APP, instanceId);
    const value = { text: "stamped" };

    await getRecordStore().set(WS, shared, "k", value, ALICE);
    await getRecordStore().set(WS, `app#${APP}#u#${ALICE}`, "k", value, ALICE);
    await getRecordStore().set(WS, "ws", "k", value, ALICE);

    const db = new SqliteDatabase(join(dataDir, "workspace.db"), { readonly: true });
    try {
      const stamp = (scope: string): unknown =>
        (
          db
            .prepare(`SELECT bytes FROM records WHERE tenant = ? AND scope = ? AND key = 'k'`)
            .get(WS, scope) as { bytes: number | null }
        ).bytes;
      expect(stamp(shared)).toBe(sizeOf(value));
      expect(stamp(`app#${APP}#u#${ALICE}`)).toBeNull();
      expect(stamp("ws")).toBeNull();
    } finally {
      db.close();
    }
  });

  it("Host reads instance size — usage reports the footprint and the cap", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const value = { doc: "records plane" };
    await getRecordStore().set(WS, scope, "doc", value, ALICE);
    const file = await getFsStore().write(
      WS,
      `${sharedDataDir(APP, instanceId)}/notes.txt`,
      "file plane bytes",
    );

    const capped = await setInstanceCap(WS, instanceId, 4096, ALICE);
    expect(capped.storageCapBytes).toBe(4096);

    const total = await recountInstanceUsage(WS, instanceId);
    expect(total).toBe(sizeOf(value) + file.size);
    expect(await getInstance(WS, instanceId)).toMatchObject({
      storageBytes: total,
      storageCapBytes: 4096,
    });
  });

  it("Recount corrects drift — counter rewritten to the recomputed footprint", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const value = { doc: "the truth" };
    await getRecordStore().set(WS, scope, "doc", value, ALICE);

    // Inject drift the way concurrent best-effort deltas would: overwrite
    // the counter with a figure the store contents contradict.
    const record = (await getInstance(WS, instanceId))!;
    await writeSvcRecord(WS, svcScope("app-instances"), instanceId, {
      ...record,
      storageBytes: 999_999,
    });
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(999_999);

    const recomputed = await recountInstanceUsage(WS, instanceId);
    expect(recomputed).toBe(sizeOf(value));
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(recomputed);
  });

  it("reserveInstanceBytes fails closed on a missing instance record", async () => {
    await expect(
      reserveInstanceBytes(WS, "01NOSUCHINSTANCE00000000000", 10),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

// ---------------------------------------------------------------------------
// Host-set storage cap
// ---------------------------------------------------------------------------

describe("Host-set storage cap", () => {
  it("Over-cap write rejected — 413, nothing stored, footprint unchanged", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    await setInstanceCap(WS, instanceId, 10, ALICE);

    await expect(
      getRecordStore().set(WS, scope, "big", { text: "way past ten bytes" }, BOB),
    ).rejects.toMatchObject({ status: 413 } satisfies Partial<ServiceError>);

    expect(await getRecordStore().get(WS, scope, "big")).toBeUndefined();
    expect(await getRecordStore().list(WS, scope)).toEqual([]);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(0);
  });

  it("Delete permitted while over cap — delete succeeds, footprint decreases", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const first = { text: "first record" };
    const second = { text: "second record" };
    await getRecordStore().set(WS, scope, "a", first, ALICE);
    await getRecordStore().set(WS, scope, "b", second, ALICE);

    // Cap lowered after the writes: the instance is now over cap.
    await setInstanceCap(WS, instanceId, 1, ALICE);
    await expect(
      getRecordStore().set(WS, scope, "c", { text: "no" }, BOB),
    ).rejects.toMatchObject({ status: 413 } satisfies Partial<ServiceError>);

    expect(await getRecordStore().delete(WS, scope, "a")).toBe(true);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(sizeOf(second));
  });

  it("clearing the cap lifts enforcement; invalid caps rejected 400", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    await setInstanceCap(WS, instanceId, 1, ALICE);
    await expect(
      getRecordStore().set(WS, scope, "k", { text: "blocked" }, ALICE),
    ).rejects.toMatchObject({ status: 413 } satisfies Partial<ServiceError>);

    const cleared = await setInstanceCap(WS, instanceId, undefined, ALICE);
    expect(cleared.storageCapBytes).toBeUndefined();
    await getRecordStore().set(WS, scope, "k", { text: "now fine" }, ALICE);

    await expect(setInstanceCap(WS, instanceId, -1, ALICE)).rejects.toMatchObject({
      status: 400,
    } satisfies Partial<ServiceError>);
  });
});

// ---------------------------------------------------------------------------
// Host-initiated instance deletion (mechanism half — audit row is stream 5's
// apps.instanceDelete procedure, asserted in apps-shared-admin.test.ts)
// ---------------------------------------------------------------------------

describe("Host-initiated instance deletion", () => {
  it("deleteInstance clears both planes and the record; access fails closed", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    await getRecordStore().set(WS, scope, "a", { text: "one" }, ALICE);
    await getRecordStore().set(WS, scope, "b", { text: "two" }, BOB);
    await getFsStore().write(WS, `${sharedDataDir(APP, instanceId)}/a.txt`, "file a");
    await getFsStore().write(WS, `${sharedDataDir(APP, instanceId)}/nested/b.txt`, "file b");
    // A sibling path outside the shared dir must survive the prefix removal.
    await getFsStore().write(WS, `.apps/${APP}/data/${ALICE}/own.txt`, "per-user");

    await deleteInstance(WS, instanceId, ALICE);

    expect(await getRecordStore().list(WS, scope)).toEqual([]);
    expect(await listAll(getFsStore(), WS, sharedDataDir(APP, instanceId))).toEqual([]);
    expect(await getInstance(WS, instanceId)).toBeUndefined();
    await expect(assertInstanceAccess(WS, APP, instanceId, ALICE)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
    await expect(deleteInstance(WS, instanceId, ALICE)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);

    const untouched = await getFsStore().read(WS, `.apps/${APP}/data/${ALICE}/own.txt`);
    expect(untouched?.content).toBe("per-user");
  });
});

// ---------------------------------------------------------------------------
// Dynamo backend via the serialization seam — same metering behavior, item
// shape carries the bytes attribute only under #shared# scopes
// ---------------------------------------------------------------------------

describe("Dynamo item shape and metering (mocked client)", () => {
  it("stamps bytes on shared items, omits it on per-user items, meters deltas", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const store = new RecordStoreDynamodb({ tableName: "RecordsTest" });
    const value = { text: "dynamo shared" };

    await store.set(WS, scope, "notes", value, ALICE);
    const sharedItem = dyn.puts.at(-1)!;
    expect(sharedItem).toMatchObject({
      PK: `t#${WS}#s#${scope}`,
      SK: "notes",
      bytes: sizeOf(value),
      updatedBy: ALICE,
    });
    // Counter parity with the SQL backends: the same delta reached the
    // instance record (which lives in the SQLite singleton).
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(sizeOf(value));

    await store.set(WS, `app#${APP}#u#${ALICE}`, "notes", value, ALICE);
    expect("bytes" in dyn.puts.at(-1)!).toBe(false);
  });

  it("over-cap write rejects 413 before any item is put", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const store = new RecordStoreDynamodb({ tableName: "RecordsTest" });
    await setInstanceCap(WS, instanceId, 5, ALICE);

    await expect(
      store.set(WS, scope, "big", { text: "exceeds the five byte cap" }, BOB),
    ).rejects.toMatchObject({ status: 413 } satisfies Partial<ServiceError>);
    expect(dyn.puts).toEqual([]);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(0);
  });

  it("delete returns the stamp via ALL_OLD and decrements the counter", async () => {
    const instanceId = await makeInstance();
    const scope = sharedRecordScope(APP, instanceId);
    const store = new RecordStoreDynamodb({ tableName: "RecordsTest" });
    const value = { text: "to be deleted" };
    await store.set(WS, scope, "gone", value, ALICE);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(sizeOf(value));

    expect(await store.delete(WS, scope, "gone")).toBe(true);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(0);
  });
});
