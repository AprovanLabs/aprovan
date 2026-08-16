/**
 * Partition guard + scope grammar at the `apps/store.ts` boundary (spec
 * shared-record-partition: "Shared scope-key grammar", "Shared partitions are
 * hidden from the file plane"; tech-plan TD1/TD2). Classification stays pure
 * and synchronous; `assertPartitionAccess` is the one async choke point that
 * resolves the participant ACL via instances.ts. Record-surface addressing
 * (the scope-string 4xx for `app#A#team#X` etc.) is Stream 3.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  appPathServable,
  assertPartitionAccess,
  hiddenDataPrefixes,
  isHiddenDataPath,
  parseSharedPartition,
  partitionAccess,
  sharedDataDir,
  type AppPaths,
} from "../src/apps/store.js";
import { createInstance } from "../src/apps/instances.js";
import { putMembership, removeMember } from "../src/memberships.js";
import { ServiceError } from "../src/service-kernel.js";

let dataDir: string;

const WS = "ws-partition-guard";
const APP = "01APPSHAREDGUARD00000000000";
const INSTANCE = "01INSTANCESHARED00000000000";
const ALICE = "alice";
const BOB = "bob";
const CAROL = "carol";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-shared-partition-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("partitionAccess classification (TD1/TD2)", () => {
  it("classifies shared partitions and their containers", () => {
    const table: Array<[string, string]> = [
      // Shared partitions — the instance dir and everything below it.
      [`.apps/${APP}/shared/${INSTANCE}`, "shared"],
      [`.apps/${APP}/shared/${INSTANCE}/notes.md`, "shared"],
      [`.apps/${APP}/shared/${INSTANCE}/deep/nested/file.txt`, "shared"],
      // Containers belong to nobody.
      [".apps", "open"],
      [`.apps/${APP}`, "open"],
      [`.apps/${APP}/shared`, "open"],
      [`.apps/${APP}/data`, "open"],
      // Malformed discriminators never mint "shared" (file-plane analog of
      // the scope grammar's `app#A#team#X` / empty-instance-id rejection).
      [`.apps/${APP}/team/X`, "open"],
      [`.apps/${APP}/shared/`, "open"],
      // Per-user and private-space rules are untouched.
      [`.apps/${APP}/data/${ALICE}/file.md`, "own"],
      [`.apps/${APP}/data/${BOB}/file.md`, "foreign"],
      [`.users/${ALICE}/note.md`, "own"],
      [`.users/${BOB}/note.md`, "foreign"],
      ["apps/liift4/widget.tsx", "open"],
    ];
    for (const [path, expected] of table) {
      expect(partitionAccess(path, ALICE), path).toBe(expected);
    }
  });
});

describe("parseSharedPartition grammar (TD1)", () => {
  it("round-trips sharedDataDir with and without a file suffix", () => {
    expect(parseSharedPartition(sharedDataDir(APP, INSTANCE))).toEqual({
      id: APP,
      instanceId: INSTANCE,
    });
    expect(parseSharedPartition(`${sharedDataDir(APP, INSTANCE)}/deep/notes.md`)).toEqual({
      id: APP,
      instanceId: INSTANCE,
    });
  });

  it("returns undefined for containers, other discriminators, and empty ids", () => {
    for (const path of [
      ".apps",
      `.apps/${APP}`,
      `.apps/${APP}/shared`,
      `.apps/${APP}/shared/`, // empty instance id
      `.apps/${APP}/team/X`, // `shared` and `data` are the only discriminators
      `.apps/${APP}/data/${ALICE}/file.md`,
      `.users/${ALICE}/note.md`,
      "apps/liift4/widget.tsx",
    ]) {
      expect(parseSharedPartition(path), path).toBeUndefined();
    }
  });
});

describe("Shared partitions are hidden from the file plane", () => {
  it("snapshot/list hiding covers .apps/<id>/shared/** via the structural root", async () => {
    const hidden = await hiddenDataPrefixes(WS);
    expect(isHiddenDataPath(`.apps/${APP}/shared/${INSTANCE}/notes.md`, hidden)).toBe(true);
    expect(isHiddenDataPath(`.apps/${APP}/shared`, hidden)).toBe(true);
    expect(isHiddenDataPath("apps/liift4/widget.tsx", hidden)).toBe(false);
  });

  it("appPathServable is false for every shared path", () => {
    const app: AppPaths = { id: APP, name: "liift4", root: "apps/liift4", paths: ["apps/liift4"] };
    expect(appPathServable(app, "apps/liift4/widget.tsx")).toBe(true);
    expect(appPathServable(app, `.apps/${APP}/shared/${INSTANCE}/notes.md`)).toBe(false);
    expect(appPathServable(app, `.apps/${APP}/data/${ALICE}/file.md`)).toBe(false);

    // Defense-in-depth: even a root pointed at the partition container never
    // serves it — the whole `.apps/<id>` subtree is excluded, not just data/.
    const hostile: AppPaths = {
      id: APP,
      name: "hostile",
      root: `.apps/${APP}`,
      paths: [`.apps/${APP}`],
    };
    expect(appPathServable(hostile, `.apps/${APP}/shared/${INSTANCE}/notes.md`)).toBe(false);
    expect(appPathServable(hostile, `.apps/${APP}/data/${ALICE}/file.md`)).toBe(false);
    expect(appPathServable(hostile, `.apps/${APP}`)).toBe(false);
  });
});

describe("assertPartitionAccess resolves the instance ACL (TD2)", () => {
  beforeEach(async () => {
    await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
    await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
    await putMembership({ workspaceId: WS, userId: CAROL, role: "member" });
  });

  it("participant passes; non-participant and orphan scope deny as 404", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, BOB],
    });
    const path = `${sharedDataDir(APP, instance.instanceId)}/notes.md`;

    await expect(assertPartitionAccess(WS, BOB, path)).resolves.toBeUndefined();

    // Non-participant workspace member — denial indistinguishable from absence.
    await expect(assertPartitionAccess(WS, CAROL, path)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);

    // Orphan scope without instance record — fail closed for everyone.
    const orphan = `${sharedDataDir(APP, "01ORPHANINSTANCE00000000000")}/notes.md`;
    await expect(assertPartitionAccess(WS, ALICE, orphan)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
  });

  it("departed hosting-workspace member is denied on a managed instance", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, CAROL],
    });
    const path = `${sharedDataDir(APP, instance.instanceId)}/notes.md`;
    await expect(assertPartitionAccess(WS, CAROL, path)).resolves.toBeUndefined();

    await removeMember(WS, CAROL);
    await expect(assertPartitionAccess(WS, CAROL, path)).rejects.toMatchObject({
      status: 404,
    } satisfies Partial<ServiceError>);
  });

  it("existing own/foreign/open behavior is unchanged", async () => {
    await expect(
      assertPartitionAccess(WS, ALICE, `.apps/${APP}/data/${ALICE}/file.md`),
    ).resolves.toBeUndefined();
    await expect(
      assertPartitionAccess(WS, ALICE, `.apps/${APP}/data/${BOB}/file.md`),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
    // Containers (including malformed discriminators) stay open — they hold
    // nothing and are hidden from the file plane anyway.
    await expect(assertPartitionAccess(WS, ALICE, `.apps/${APP}/shared`)).resolves.toBeUndefined();
  });
});
