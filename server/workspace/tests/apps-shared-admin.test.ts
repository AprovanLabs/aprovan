/**
 * Admin and host procedures over shared partitions (iw9-f2 stream 5, TD6):
 * `apps.dataInstances` + the `instance` argument on `apps.dataKeys`/`dataGet`/
 * `dataRead` (app-admin-gated, audited), and the host-gated `apps.instance*`
 * family (usage/recount, cap, delete — every call audited). Spec
 * shared-record-partition "Audited admin access to shared partitions" and
 * instance-storage (host gate scenarios). Also covers task 5.3: uninstall
 * with purgeData deletes each of the install's instances via `deleteInstance`.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import "../src/services.js"; // install CORE_SERVICES before appsService.call
import { appsService } from "../src/apps/service.js";
import {
  createInstance,
  getInstance,
  sharedDataDir,
  sharedRecordScope,
} from "../src/apps/instances.js";
import { getAuditStore, type IAuditStore } from "../src/audit.js";
import { getFsStore } from "../src/fs-store.js";
import { putMembership } from "../src/memberships.js";
import { getRecordStore } from "../src/records.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import { ServiceError, type ServiceContext } from "../src/service-kernel.js";
import { keyvalueProductService } from "../src/services.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-shared-admin";
const ALICE = "alice"; // workspace admin (host) + app admin
const BOB = "bob"; // member, participant, neither admin
const MALLORY = "mallory"; // member, no roles at all

let appId: string;
let auditSpy: MockInstance<IAuditStore["append"]>;

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-shared-admin-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;

  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
  await putMembership({ workspaceId: WS, userId: MALLORY, role: "member" });

  await getFsStore().write(
    WS,
    "apps/shared-admin-app/index.tsx",
    "export default () => null;",
  );
  const published = (await appsService.call(ctx(ALICE), "publish", {
    name: "shared-admin-app",
    dir: "apps/shared-admin-app",
    allowed_tools: ["keyvalue.*"],
    roles: { admins: [ALICE] },
  })) as { appId: string };
  appId = published.appId;
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  auditSpy = vi.spyOn(getAuditStore(), "append");
});

afterEach(() => {
  auditSpy.mockRestore();
});

function ctx(userId: string): ServiceContext {
  return { workspaceId: WS, userId };
}

/** App-session context for the non-admin record surface (the "side door"). */
function appCtx(userId: string): ServiceContext {
  return {
    workspaceId: WS,
    userId,
    appScope: {
      id: appId,
      name: "shared-admin-app",
      paths: ["apps/shared-admin-app"],
      userId,
      role: "user",
    },
  };
}

async function seedInstance(participants: string[]): Promise<string> {
  const instance = await createInstance({
    workspaceId: WS,
    appId,
    createdBy: participants[0] ?? ALICE,
    participants,
  });
  return instance.instanceId;
}

function auditOps(): string[] {
  return auditSpy.mock.calls.map(([entry]) => String((entry as { operation: unknown }).operation));
}

function successAuditRows(): Array<{ callerId: string; operation: string; status: number }> {
  return auditSpy.mock.calls
    .map(([entry]) => entry as { callerId: string; operation: string; status: number })
    .filter((entry) => entry.status === 200);
}

describe("Audited admin access to shared partitions (apps.data*)", () => {
  it("admin reads a shared record by instance and key; the audit row names caller, app, instance, and key", async () => {
    const instanceId = await seedInstance([BOB]);
    const scope = sharedRecordScope(appId, instanceId);
    await getRecordStore().set(WS, scope, "notes", { text: "from bob" }, BOB);

    const result = (await appsService.call(ctx(ALICE), "dataGet", {
      app: appId,
      instance: instanceId,
      key: "notes",
    })) as Record<string, unknown>;
    expect(result).toMatchObject({
      appId,
      instance: instanceId,
      key: "notes",
      value: { text: "from bob" },
      updatedBy: BOB,
    });
    expect(result["user"]).toBeUndefined();

    expect(successAuditRows()).toEqual([
      expect.objectContaining({
        callerId: ALICE,
        operation: `data:${appId}:instance:${instanceId}:notes`,
        status: 200,
      }),
    ]);
  });

  it("instance addressing works on dataKeys and dataRead, with path-level audit detail", async () => {
    const instanceId = await seedInstance([BOB]);
    const scope = sharedRecordScope(appId, instanceId);
    await getRecordStore().set(WS, scope, "a", 1, BOB);
    await getRecordStore().set(WS, scope, "b", 2, BOB);
    await getFsStore().write(WS, `${sharedDataDir(appId, instanceId)}/report.md`, "# shared");

    const keys = (await appsService.call(ctx(ALICE), "dataKeys", {
      app: appId,
      instance: instanceId,
    })) as { keys: string[] };
    expect(keys.keys.sort()).toEqual(["a", "b"]);

    const read = (await appsService.call(ctx(ALICE), "dataRead", {
      app: appId,
      instance: instanceId,
      path: "report.md",
    })) as { content: string | null };
    expect(read.content).toBe("# shared");

    expect(auditOps()).toEqual([
      `data:${appId}:instance:${instanceId}`,
      `data:${appId}:instance:${instanceId}:report.md`,
    ]);
  });

  it("dataRead rejects paths escaping the instance partition", async () => {
    const instanceId = await seedInstance([BOB]);
    await expect(
      appsService.call(ctx(ALICE), "dataRead", {
        app: appId,
        instance: instanceId,
        path: "../../../secret.md",
      }),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });

  it("apps.dataInstances lists instances with participants, storageBytes, and cap for admins", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);
    await appsService.call(ctx(ALICE), "instanceCap", { instance: instanceId, cap: 4096 });
    auditSpy.mockClear();

    const listed = (await appsService.call(ctx(ALICE), "dataInstances", {
      app: appId,
    })) as { appId: string; instances: Array<Record<string, unknown>> };
    expect(listed.appId).toBe(appId);
    const row = listed.instances.find((entry) => entry["instanceId"] === instanceId);
    expect(row).toMatchObject({
      instanceId,
      participants: [ALICE, BOB],
      storageBytes: 0,
      storageCapBytes: 4096,
    });

    expect(successAuditRows()).toEqual([
      expect.objectContaining({ callerId: ALICE, operation: `data:${appId}:instances` }),
    ]);
  });

  it("non-admin gets 403 on every shared admin operation, with no success audit row", async () => {
    const instanceId = await seedInstance([BOB]);
    for (const [procedure, args] of [
      ["dataInstances", {}],
      ["dataKeys", { instance: instanceId }],
      ["dataGet", { instance: instanceId, key: "notes" }],
      ["dataRead", { instance: instanceId, path: "report.md" }],
    ] as const) {
      await expect(
        appsService.call(ctx(BOB), procedure, { app: appId, ...args }),
      ).rejects.toMatchObject({ status: 403 } satisfies Partial<ServiceError>);
    }
    expect(successAuditRows()).toEqual([]);
  });

  it("`user` and `instance` together are 400", async () => {
    const instanceId = await seedInstance([BOB]);
    for (const procedure of ["dataKeys", "dataGet", "dataRead"] as const) {
      await expect(
        appsService.call(ctx(ALICE), procedure, {
          app: appId,
          user: BOB,
          instance: instanceId,
          key: "k",
          path: "p.md",
        }),
      ).rejects.toMatchObject({
        status: 400,
        message: expect.stringMatching(/mutually exclusive/i),
      });
    }
    expect(successAuditRows()).toEqual([]);
  });

  it("no unaudited side door: admin-as-non-participant direct record access is still 404", async () => {
    const instanceId = await seedInstance([BOB]);
    await getRecordStore().set(WS, sharedRecordScope(appId, instanceId), "notes", "x", BOB);

    // ALICE is the app admin but not a participant — the plain record
    // surface denies her like any other non-participant.
    await expect(
      keyvalueProductService.call(appCtx(ALICE), "get", {
        key: "notes",
        instance: instanceId,
      }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("Host procedures (apps.instanceUsage / instanceCap / instanceDelete)", () => {
  it("host usage → cap → delete round-trip, all audited; recount corrects drift", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);
    const scope = sharedRecordScope(appId, instanceId);
    const value = { text: "metered" };
    await getRecordStore().set(WS, scope, "notes", value, BOB);
    const recordBytes = Buffer.byteLength(JSON.stringify(value), "utf8");

    // Counter tracks shared record writes (stream 4).
    const usage = (await appsService.call(ctx(ALICE), "instanceUsage", {
      instance: instanceId,
    })) as Record<string, unknown>;
    expect(usage).toEqual({ instanceId, storageBytes: recordBytes });

    // File-plane writes are not yet metered at the store layer — a real
    // drift source. Recount walks both planes and rewrites the counter.
    const fileContent = "# shared file";
    await getFsStore().write(WS, `${sharedDataDir(appId, instanceId)}/report.md`, fileContent);
    const trueBytes = recordBytes + Buffer.byteLength(fileContent, "utf8");
    const stale = (await appsService.call(ctx(ALICE), "instanceUsage", {
      instance: instanceId,
    })) as { storageBytes: number };
    expect(stale.storageBytes).toBe(recordBytes);
    const recounted = (await appsService.call(ctx(ALICE), "instanceUsage", {
      instance: instanceId,
      recount: true,
    })) as { storageBytes: number };
    expect(recounted.storageBytes).toBe(trueBytes);
    expect((await getInstance(WS, instanceId))?.storageBytes).toBe(trueBytes);

    // Cap set surfaces on usage; clear nulls it.
    const capped = (await appsService.call(ctx(ALICE), "instanceCap", {
      instance: instanceId,
      cap: 1024,
    })) as Record<string, unknown>;
    expect(capped).toEqual({ instanceId, storageBytes: trueBytes, storageCapBytes: 1024 });
    const usageWithCap = (await appsService.call(ctx(ALICE), "instanceUsage", {
      instance: instanceId,
    })) as Record<string, unknown>;
    expect(usageWithCap).toEqual({ instanceId, storageBytes: trueBytes, storageCapBytes: 1024 });
    const cleared = (await appsService.call(ctx(ALICE), "instanceCap", {
      instance: instanceId,
    })) as Record<string, unknown>;
    expect(cleared).toEqual({ instanceId, storageBytes: trueBytes, storageCapBytes: null });

    // Delete removes both planes and the instance record, and audits.
    const deleted = (await appsService.call(ctx(ALICE), "instanceDelete", {
      instance: instanceId,
    })) as Record<string, unknown>;
    expect(deleted).toEqual({ instanceId, deleted: true });
    expect(await getRecordStore().list(WS, scope)).toEqual([]);
    expect(
      await getFsStore().read(WS, `${sharedDataDir(appId, instanceId)}/report.md`),
    ).toBeUndefined();
    expect(await getInstance(WS, instanceId)).toBeUndefined();
    await expect(
      appsService.call(ctx(ALICE), "instanceUsage", { instance: instanceId }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);

    const rows = successAuditRows();
    expect(rows.map((row) => row.operation)).toEqual([
      `instance:usage:${instanceId}`,
      `instance:usage:${instanceId}`,
      `instance:usage:${instanceId}`,
      `instance:cap:${instanceId}`,
      `instance:usage:${instanceId}`,
      `instance:cap:${instanceId}`,
      `instance:delete:${instanceId}`,
    ]);
    for (const row of rows) expect(row.callerId).toBe(ALICE);
  });

  it("non-host gets 403 on usage, cap, and delete; cap and instance are unchanged", async () => {
    const instanceId = await seedInstance([ALICE, BOB]);
    await appsService.call(ctx(ALICE), "instanceCap", { instance: instanceId, cap: 2048 });
    auditSpy.mockClear();

    // BOB is a participant but not a hosting-workspace admin; MALLORY is
    // neither — the host gate turns both away identically.
    for (const caller of [BOB, MALLORY]) {
      for (const [procedure, args] of [
        ["instanceUsage", {}],
        ["instanceUsage", { recount: true }],
        ["instanceCap", { cap: 1 }],
        ["instanceCap", {}],
        ["instanceDelete", {}],
      ] as const) {
        await expect(
          appsService.call(ctx(caller), procedure, { instance: instanceId, ...args }),
        ).rejects.toMatchObject({
          status: 403,
          message: expect.stringMatching(/host/i),
        });
      }
    }

    expect(successAuditRows()).toEqual([]);
    expect(await getInstance(WS, instanceId)).toMatchObject({
      instanceId,
      storageCapBytes: 2048,
    });
  });

  it("unknown instance is 404; missing instance argument is 400", async () => {
    await expect(
      appsService.call(ctx(ALICE), "instanceUsage", { instance: "01NOSUCHINSTANCE00000000000" }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
    await expect(appsService.call(ctx(ALICE), "instanceDelete", {})).rejects.toMatchObject({
      status: 400,
    } satisfies Partial<ServiceError>);
  });
});

describe("Uninstall cleanup (task 5.3)", () => {
  it("uninstall with purgeData deletes the install's instances — records, files, and instance records", async () => {
    const installId = "01INSTALLPURGE0000000000000";
    await writeSvcRecord(WS, svcScope("installs"), installId, {
      installId,
      originAppId: appId,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      resolvedRelease: null,
      bindings: {},
      config: {},
      editing: false,
      installedBy: ALICE,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hosting: "managed",
    });
    const instance = await createInstance({
      workspaceId: WS,
      appId: installId,
      createdBy: ALICE,
      participants: [ALICE],
    });
    const scope = sharedRecordScope(installId, instance.instanceId);
    await getRecordStore().set(WS, scope, "notes", { keep: false }, ALICE);
    await getFsStore().write(
      WS,
      `${sharedDataDir(installId, instance.instanceId)}/state.md`,
      "shared",
    );
    await getFsStore().write(WS, `.apps/${installId}/data/${ALICE}/mine.md`, "per-user");

    const result = (await appsService.call(ctx(ALICE), "uninstall", {
      install: installId,
      purgeData: true,
    })) as Record<string, unknown>;
    expect(result).toEqual({ install: installId, removed: true, purged: true });

    // No orphans: instance record, shared records, and both file planes gone.
    expect(await getInstance(WS, instance.instanceId)).toBeUndefined();
    expect(await getRecordStore().list(WS, scope)).toEqual([]);
    expect(
      await getFsStore().read(WS, `${sharedDataDir(installId, instance.instanceId)}/state.md`),
    ).toBeUndefined();
    expect(await getFsStore().read(WS, `.apps/${installId}/data/${ALICE}/mine.md`)).toBeUndefined();
  });
});
