/**
 * Instance records module — ACL + managed-membership semantics at the
 * `apps/instances.ts` boundary (spec shared-record-partition: "Instance
 * record is the ACL", "Managed instances require hosting-workspace
 * membership"). Record-store / file-plane end-to-end wiring is Stream 2/3.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isValid } from "ulid";
import {
  addParticipant,
  assertInstanceAccess,
  createInstance,
  getInstance,
  listInstances,
  removeParticipant,
  sharedDataDir,
  sharedRecordScope,
  type AppInstanceRecord,
  type HostingMode,
} from "../src/apps/instances.js";
import { putMembership, removeMember } from "../src/memberships.js";
import { getRecordStore } from "../src/records.js";
import { ServiceError } from "../src/service-kernel.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-instances";
const APP = "01APPINSTANCE00000000000000";
const INSTALL_HOSTED = "01INSTALLHOSTED000000000000";
const ALICE = "alice";
const BOB = "bob";
const CAROL = "carol";
const OUTSIDER = "outsider";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-instances-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
  await putMembership({ workspaceId: WS, userId: CAROL, role: "member" });
});

async function seedInstall(installId: string, hosting: HostingMode): Promise<void> {
  await writeSvcRecord(WS, svcScope("installs"), installId, {
    installId,
    originAppId: APP,
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: ALICE,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hosting,
  });
}

describe("scope helpers (TD1)", () => {
  it("sharedRecordScope and sharedDataDir match the frozen literals", () => {
    expect(sharedRecordScope(APP, "I1")).toBe(`app#${APP}#shared#I1`);
    expect(sharedDataDir(APP, "I1")).toBe(`.apps/${APP}/shared/I1`);
  });
});

describe("Instance record is the ACL", () => {
  it("Participant reads and writes — assert succeeds; write attributes updatedBy", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, BOB],
    });
    expect(isValid(instance.instanceId)).toBe(true);
    expect(instance.storageBytes).toBe(0);
    expect(instance.hostWorkspaceId).toBe(WS);

    const allowed = await assertInstanceAccess(WS, APP, instance.instanceId, BOB);
    expect(allowed.instanceId).toBe(instance.instanceId);

    const scope = sharedRecordScope(APP, instance.instanceId);
    await getRecordStore().set(WS, scope, "notes", { text: "hi" }, BOB);
    const hit = await getRecordStore().get(WS, scope, "notes");
    expect(hit?.updatedBy).toBe(BOB);
    expect(hit?.value).toEqual({ text: "hi" });
  });

  it("Non-participant denied as 404", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });

    await expect(
      assertInstanceAccess(WS, APP, instance.instanceId, BOB),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("Removal takes effect at next request", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, BOB],
    });
    await assertInstanceAccess(WS, APP, instance.instanceId, BOB);

    const after = await removeParticipant(WS, instance.instanceId, BOB, ALICE);
    expect(after.participants).toEqual([ALICE]);

    await expect(
      assertInstanceAccess(WS, APP, instance.instanceId, BOB),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("Orphan scope without instance record — fail closed 404", async () => {
    await expect(
      assertInstanceAccess(WS, APP, "01ORPHANINSTANCE00000000000", ALICE),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("create/get/list round-trip under svc#app-instances", async () => {
    const a = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    const b = await createInstance({
      workspaceId: WS,
      appId: "01OTHERAPP00000000000000000",
      createdBy: ALICE,
      participants: [ALICE],
    });

    expect(await getInstance(WS, a.instanceId)).toMatchObject({
      instanceId: a.instanceId,
      appId: APP,
    } satisfies Partial<AppInstanceRecord>);

    const listed = await listInstances(WS, APP);
    expect(listed.map((row) => row.instanceId)).toContain(a.instanceId);
    expect(listed.map((row) => row.instanceId)).not.toContain(b.instanceId);
  });

  it("assertInstanceAccess denies when appId does not match the record", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    await expect(
      assertInstanceAccess(WS, "01WRONGAPP00000000000000000", instance.instanceId, ALICE),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("Managed instances require hosting-workspace membership", () => {
  it("Non-member cannot be added to a managed instance", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });

    await expect(
      addParticipant(WS, instance.instanceId, OUTSIDER, ALICE),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/hosting-workspace member/i),
    });

    const unchanged = await getInstance(WS, instance.instanceId);
    expect(unchanged?.participants).toEqual([ALICE]);
  });

  it("createInstance rejects non-member participants on managed installs", async () => {
    await expect(
      createInstance({
        workspaceId: WS,
        appId: APP,
        createdBy: ALICE,
        participants: [ALICE, OUTSIDER],
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/hosting-workspace member/i),
    });
  });

  it("Departed member loses managed access", async () => {
    const instance = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, CAROL],
    });
    await assertInstanceAccess(WS, APP, instance.instanceId, CAROL);

    await removeMember(WS, CAROL);
    await expect(
      assertInstanceAccess(WS, APP, instance.instanceId, CAROL),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);

    const stillListed = await getInstance(WS, instance.instanceId);
    expect(stillListed?.participants).toContain(CAROL);
  });

  it("hosted installs skip membership enforcement on add and access", async () => {
    await seedInstall(INSTALL_HOSTED, "hosted");
    const instance = await createInstance({
      workspaceId: WS,
      appId: INSTALL_HOSTED,
      createdBy: ALICE,
      participants: [ALICE, OUTSIDER],
    });
    expect(instance.participants).toEqual([ALICE, OUTSIDER]);

    await expect(
      assertInstanceAccess(WS, INSTALL_HOSTED, instance.instanceId, OUTSIDER),
    ).resolves.toMatchObject({ instanceId: instance.instanceId });

    await addParticipant(WS, instance.instanceId, "another-outsider", ALICE);
    const after = await getInstance(WS, instance.instanceId);
    expect(after?.participants).toContain("another-outsider");
  });
});
