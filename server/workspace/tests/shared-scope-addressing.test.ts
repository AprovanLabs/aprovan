/**
 * Record-surface shared-instance addressing (iw9-f2 stream 3) — the
 * `resolveRecordScope(ctx, { instance? })` seam and its threading through
 * the keyvalue product surface and the native dispatch wire (spec
 * shared-record-partition: "Shared scope-key grammar", scenario "Shared
 * scope stored and listed distinctly"). Malformed scope shapes
 * (`app#A#team#X`, empty instance id) are 4xx here, at the record surface —
 * the file-plane guard (stream 2) only classifies them non-shared.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createInstance, sharedRecordScope } from "../src/apps/instances.js";
import { putMembership } from "../src/memberships.js";
import { dispatchAprovanNativeOp } from "../src/native-dispatch.js";
import { getRecordStore } from "../src/records.js";
import { ServiceError, type ServiceContext } from "../src/service-kernel.js";
import { keyvalueProductService, resolveRecordScope } from "../src/services.js";

let dataDir: string;

const WS = "ws-shared-addressing";
const APP = "01APPSHAREDADDR000000000000";
const ALICE = "alice";
const BOB = "bob";
const MALLORY = "mallory";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-shared-addressing-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
  await putMembership({ workspaceId: WS, userId: MALLORY, role: "member" });
});

function appCtx(userId: string): ServiceContext {
  return {
    workspaceId: WS,
    userId,
    appScope: { id: APP, name: "shared-addr", paths: [`apps/shared-addr`], userId, role: "user" },
  };
}

async function seedInstance(participants: string[]): Promise<string> {
  const instance = await createInstance({
    workspaceId: WS,
    appId: APP,
    createdBy: ALICE,
    participants,
  });
  return instance.instanceId;
}

describe("resolveRecordScope (the iw9-b seam)", () => {
  it("absent instance preserves today's behavior exactly", async () => {
    await expect(resolveRecordScope(appCtx(ALICE))).resolves.toBe(`app#${APP}#u#${ALICE}`);
    await expect(resolveRecordScope(appCtx(ALICE), {})).resolves.toBe(`app#${APP}#u#${ALICE}`);
    await expect(resolveRecordScope({ workspaceId: WS, userId: ALICE })).resolves.toBe("ws");
  });

  it("present instance returns app#<id>#shared#<instanceId> after assertInstanceAccess", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);
    await expect(resolveRecordScope(appCtx(BOB), { instance: instanceId })).resolves.toBe(
      sharedRecordScope(APP, instanceId),
    );
  });

  it("non-participant is denied as 404 (no oracle)", async () => {
    const instanceId = await seedInstance([ALICE]);
    await expect(
      resolveRecordScope(appCtx(MALLORY), { instance: instanceId }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("orphan instance id fails closed 404", async () => {
    await expect(
      resolveRecordScope(appCtx(ALICE), { instance: "01ORPHANINSTANCE00000000000" }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("malformed instance ids are 400 before any lookup", async () => {
    // Empty instance id — `app#A#shared#` can never be formed.
    await expect(resolveRecordScope(appCtx(ALICE), { instance: "" })).rejects.toMatchObject({
      status: 400,
    } satisfies Partial<ServiceError>);
    // `#`-bearing ids — `app#A#team#X` / grammar injection can never be formed.
    await expect(
      resolveRecordScope(appCtx(ALICE), { instance: "team#X" }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
    await expect(
      resolveRecordScope(appCtx(ALICE), { instance: "I1#u#alice" }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });

  it("instance addressing requires an app session", async () => {
    const instanceId = await seedInstance([ALICE]);
    await expect(
      resolveRecordScope({ workspaceId: WS, userId: ALICE }, { instance: instanceId }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });
});

describe("keyvalue procedures accept the instance argument", () => {
  it("participant get/set/list succeed with updatedBy attribution", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);

    await keyvalueProductService.call(appCtx(ALICE), "set", {
      key: "notes",
      value: { text: "from alice" },
      instance: instanceId,
    });
    await keyvalueProductService.call(appCtx(BOB), "set", {
      key: "votes",
      value: 2,
      instance: instanceId,
    });

    // Both participants read the same shared rows.
    await expect(
      keyvalueProductService.call(appCtx(BOB), "get", { key: "notes", instance: instanceId }),
    ).resolves.toEqual({ key: "notes", value: { text: "from alice" } });
    await expect(
      keyvalueProductService.call(appCtx(ALICE), "list", { instance: instanceId }),
    ).resolves.toEqual({ keys: ["notes", "votes"] });

    // Writes are attributed to the writing user, not a pseudo-user.
    const scope = sharedRecordScope(APP, instanceId);
    const notes = await getRecordStore().get(WS, scope, "notes");
    const votes = await getRecordStore().get(WS, scope, "votes");
    expect(notes?.updatedBy).toBe(ALICE);
    expect(votes?.updatedBy).toBe(BOB);
  });

  it("delete works on shared rows and non-participants get 404 on every verb", async () => {
    const instanceId = await seedInstance([ALICE]);
    await keyvalueProductService.call(appCtx(ALICE), "set", {
      key: "draft",
      value: "x",
      instance: instanceId,
    });

    for (const [procedure, args] of [
      ["get", { key: "draft" }],
      ["set", { key: "draft", value: "y" }],
      ["delete", { key: "draft" }],
      ["list", {}],
    ] as const) {
      await expect(
        keyvalueProductService.call(appCtx(MALLORY), procedure, {
          ...args,
          instance: instanceId,
        }),
      ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
    }

    // The denied writes changed nothing.
    await expect(
      keyvalueProductService.call(appCtx(ALICE), "get", { key: "draft", instance: instanceId }),
    ).resolves.toEqual({ key: "draft", value: "x" });

    await expect(
      keyvalueProductService.call(appCtx(ALICE), "delete", {
        key: "draft",
        instance: instanceId,
      }),
    ).resolves.toEqual({ key: "draft", deleted: true });
  });

  it("non-string instance argument is 400", async () => {
    await expect(
      keyvalueProductService.call(appCtx(ALICE), "get", { key: "k", instance: 7 }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });

  it("threads through the native dispatch wire (aprovan keyvalue interface)", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);
    await dispatchAprovanNativeOp(appCtx(ALICE), "keyvalue", "set", {
      key: "wire",
      value: { ok: true },
      instance: instanceId,
    });
    await expect(
      dispatchAprovanNativeOp(appCtx(BOB), "keyvalue", "get", {
        key: "wire",
        instance: instanceId,
      }),
    ).resolves.toEqual({ key: "wire", value: { ok: true }, found: true });
    await expect(
      dispatchAprovanNativeOp(appCtx(MALLORY), "keyvalue", "get", {
        key: "wire",
        instance: instanceId,
      }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("Shared scope stored and listed distinctly (spec scenario)", () => {
  it("app#A#shared#I1 and app#A#u#S1 list apart and both surface under listScopes", async () => {
    const instanceId = await seedInstance([ALICE]);

    // Shared row via instance addressing; per-user row via the default scope.
    await keyvalueProductService.call(appCtx(ALICE), "set", {
      key: "shared-key",
      value: 1,
      instance: instanceId,
    });
    await keyvalueProductService.call(appCtx(ALICE), "set", {
      key: "user-key",
      value: 2,
    });

    // `list` on either scope returns only that scope's keys.
    await expect(
      keyvalueProductService.call(appCtx(ALICE), "list", { instance: instanceId }),
    ).resolves.toEqual({ keys: ["shared-key"] });
    const userListed = (await keyvalueProductService.call(appCtx(ALICE), "list", {})) as {
      keys: string[];
    };
    expect(userListed.keys).toContain("user-key");
    expect(userListed.keys).not.toContain("shared-key");

    // `listScopes(tenant, "app#A#")` surfaces both scope strings.
    const scopes = await getRecordStore().listScopes(WS, `app#${APP}#`);
    expect(scopes).toContain(sharedRecordScope(APP, instanceId));
    expect(scopes).toContain(`app#${APP}#u#${ALICE}`);
  });
});
