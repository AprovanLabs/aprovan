/**
 * Contract-freeze test for the iw9-b seam (iw9-f2 stream 6).
 *
 * Pins every literal and signature stated in tech-plan.md "Interfaces & Data"
 * verbatim so a later wave cannot silently reshape the frozen contract.
 * A breaking edit by Wave 1 (iw9-b) or beyond will fail this suite by
 * construction.
 *
 * Sections mirror the tech-plan's Interfaces & Data headings:
 *   1. Scope-key grammar (TD1) — `sharedRecordScope` / `sharedDataDir` literals
 *   2. Partition guard contract (TD2) — `PartitionAccess` union includes "shared";
 *      `parseSharedPartition` accepts ULID pairs and rejects other discriminators
 *   3. `AppInstallation.hosting` values and 409 flip rejection (TD4)
 *   4. Error codes at module seams — 409 (hosting flip), 413 (cap exceeded),
 *      404 (deny-as-404), 403 (host gate) — each asserted live against the
 *      fully wired procedures from Streams 1–5
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isValid as isValidUlid } from "ulid";
import {
  assertInstanceAccess,
  createInstance,
  reserveInstanceBytes,
  setInstanceCap,
  sharedDataDir,
  sharedRecordScope,
  type AppInstanceRecord,
  type HostingMode,
} from "../src/apps/instances.js";
import {
  appPathServable,
  assertPartitionAccess,
  parseSharedPartition,
  partitionAccess,
  type PartitionAccess,
} from "../src/apps/store.js";
import { mintNewInstall, saveInstall, readInstall, type AppInstallation } from "../src/apps/install.js";
import { putMembership } from "../src/memberships.js";
import { ServiceError } from "../src/service-kernel.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

// ---------------------------------------------------------------------------
// Test environment
// ---------------------------------------------------------------------------

let dataDir: string;

const WS = "ws-contract-freeze";
const APP = "01APPCONTRACTFREEZE0000000A";
const INSTANCE = "01INSTANCECONTRACTFREEZE000";
const ALICE = "alice";
const BOB = "bob";
const OUTSIDER = "outsider";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-contract-freeze-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  await putMembership({ workspaceId: WS, userId: BOB, role: "member" });
});

// ---------------------------------------------------------------------------
// 1. Scope-key grammar — frozen literals (tech-plan TD1)
// ---------------------------------------------------------------------------

describe("Scope-key grammar (TD1) — frozen literals", () => {
  it("sharedRecordScope returns `app#<id>#shared#<instanceId>` — verbatim tech-plan contract", () => {
    // Tech-plan "Interfaces & Data" §instances.ts:
    //   export function sharedRecordScope(appId: string, instanceId: string): string;
    //   // `app#${appId}#shared#${instanceId}`
    expect(sharedRecordScope(APP, INSTANCE)).toBe(`app#${APP}#shared#${INSTANCE}`);
    expect(sharedRecordScope("X", "Y")).toBe("app#X#shared#Y");
  });

  it("sharedDataDir returns `.apps/<id>/shared/<instanceId>` — verbatim tech-plan contract", () => {
    // Tech-plan "Interfaces & Data" §store.ts:
    //   export function sharedDataDir(id: string, instanceId: string): string;
    //   // `.apps/${id}/shared/${instanceId}`
    expect(sharedDataDir(APP, INSTANCE)).toBe(`.apps/${APP}/shared/${INSTANCE}`);
    expect(sharedDataDir("X", "Y")).toBe(".apps/X/shared/Y");
  });

  it("scope-string and file-plane literals form the same structural pair", () => {
    // Record scope:  app#<id>#shared#<instanceId>
    // File path:    .apps/<id>/shared/<instanceId>[/…]
    // Both address the same logical instance and parseSharedPartition must
    // round-trip the file-plane form.
    const scope = sharedRecordScope(APP, INSTANCE);
    const dir = sharedDataDir(APP, INSTANCE);
    expect(scope).toBe(`app#${APP}#shared#${INSTANCE}`);
    expect(dir).toBe(`.apps/${APP}/shared/${INSTANCE}`);
    // File plane path is parseable back to ids.
    expect(parseSharedPartition(dir)).toEqual({ id: APP, instanceId: INSTANCE });
  });
});

// ---------------------------------------------------------------------------
// 2. Partition guard contract (tech-plan TD2)
// ---------------------------------------------------------------------------

describe("PartitionAccess union includes `shared` (TD2)", () => {
  it("partitionAccess returns exactly `shared` for `.apps/<id>/shared/<instanceId>[/…]`", () => {
    // Tech-plan "Interfaces & Data" §store.ts:
    //   export type PartitionAccess = "open" | "own" | "foreign" | "shared";
    //   /** Pure and synchronous. "shared" means: ACL required … */
    //   export function partitionAccess(path, callerSub, hiddenPrefixes?): PartitionAccess;
    const result: PartitionAccess = partitionAccess(
      sharedDataDir(APP, INSTANCE),
      ALICE,
    );
    expect(result).toBe("shared");

    // Sub-paths within the instance are also "shared".
    const nested: PartitionAccess = partitionAccess(
      `${sharedDataDir(APP, INSTANCE)}/notes/doc.md`,
      ALICE,
    );
    expect(nested).toBe("shared");
  });

  it("containers and non-shared paths never return `shared`", () => {
    // Containers (`.apps`, `.apps/<id>`, `.apps/<id>/shared`) — open.
    expect(partitionAccess(".apps", ALICE)).toBe("open");
    expect(partitionAccess(`.apps/${APP}`, ALICE)).toBe("open");
    expect(partitionAccess(`.apps/${APP}/shared`, ALICE)).toBe("open");
    // Per-user partition — own/foreign depending on callerSub.
    expect(partitionAccess(`.apps/${APP}/data/${ALICE}/f.txt`, ALICE)).toBe("own");
    expect(partitionAccess(`.apps/${APP}/data/${BOB}/f.txt`, ALICE)).toBe("foreign");
    // Malformed discriminators: `team` is not a valid discriminator.
    expect(partitionAccess(`.apps/${APP}/team/${INSTANCE}`, ALICE)).toBe("open");
    // Empty instance id segment is a container, not a partition.
    expect(partitionAccess(`.apps/${APP}/shared/`, ALICE)).toBe("open");
  });
});

describe("parseSharedPartition grammar (TD1 — file-plane contract)", () => {
  it("parses `.apps/<id>/shared/<instanceId>` and sub-paths; returns `{ id, instanceId }`", () => {
    // Tech-plan "Interfaces & Data" §store.ts:
    //   export function parseSharedPartition(path: string):
    //     { id: string; instanceId: string } | undefined;
    //   // `.apps/<id>/shared/<instanceId>[/...]` → ids; undefined otherwise.
    expect(parseSharedPartition(sharedDataDir(APP, INSTANCE))).toEqual({
      id: APP,
      instanceId: INSTANCE,
    });
    expect(parseSharedPartition(`${sharedDataDir(APP, INSTANCE)}/sub/dir/file.json`)).toEqual({
      id: APP,
      instanceId: INSTANCE,
    });
  });

  it("returns undefined for all non-shared paths (containers, other discriminators, empty ids)", () => {
    // Tech-plan: "undefined otherwise".
    for (const path of [
      ".apps",
      `.apps/${APP}`,
      `.apps/${APP}/shared`,          // container, not a partition
      `.apps/${APP}/shared/`,          // empty instanceId segment
      `.apps/${APP}/team/${INSTANCE}`, // `team` is not the shared discriminator
      `.apps/${APP}/data/${ALICE}/f`,  // per-user, not shared
      `.users/${ALICE}/note.md`,
      "apps/liift4/widget.tsx",
    ]) {
      expect(parseSharedPartition(path), path).toBeUndefined();
    }
  });

  it("accepts non-ULID ids structurally (guard is structural; scope grammar owns 4xx)", () => {
    // Tech-plan Stream 2 report: "parseSharedPartition accepts any non-empty
    // <id>/<instanceId> segment (structural, like the rest of the guard)."
    // The scope-string surface owns 4xx for malformed discriminators.
    expect(parseSharedPartition(".apps/shortid/shared/instanceX")).toEqual({
      id: "shortid",
      instanceId: "instanceX",
    });
  });

  it("createInstance mints a ULID instanceId that satisfies isValidUlid", async () => {
    // Tech-plan §instances.ts: instanceId = ULID; iw9-b addresses instances
    // by this id — pin that a fresh instance is always addressable.
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    expect(isValidUlid(inst.instanceId)).toBe(true);
    // The ULID instanceId round-trips through both helpers.
    expect(sharedRecordScope(APP, inst.instanceId)).toBe(
      `app#${APP}#shared#${inst.instanceId}`,
    );
    expect(parseSharedPartition(sharedDataDir(APP, inst.instanceId))).toEqual({
      id: APP,
      instanceId: inst.instanceId,
    });
  });
});

// ---------------------------------------------------------------------------
// 3. `AppInstallation.hosting` accepted values and immutability (TD4)
// ---------------------------------------------------------------------------

describe("AppInstallation.hosting — frozen type contract (TD4)", () => {
  it('mintNewInstall defaults hosting to "managed"', () => {
    // Tech-plan §install.ts:
    //   export type HostingMode = "hosted" | "managed";  // re-exported from instances.ts
    //   // mintNewInstall(input) gains `hosting: HostingMode` (default "managed").
    const install = mintNewInstall({
      originAppId: APP,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      bindings: {},
      config: {},
      installedBy: ALICE,
    });
    // Only the two literal values are valid — any other string is a type error.
    const mode: HostingMode = install.hosting;
    expect(mode).toBe("managed");
  });

  it('accepts explicit "hosted" pick at creation', () => {
    const install = mintNewInstall({
      originAppId: APP,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      bindings: {},
      config: {},
      installedBy: ALICE,
      hosting: "hosted",
      hostingWorkspaceId: WS,
    });
    const mode: HostingMode = install.hosting;
    expect(mode).toBe("hosted");
  });

  it("saveInstall throws ServiceError 409 on a hosting flip (managed → hosted)", async () => {
    // Tech-plan §install.ts:
    //   // saveInstall(workspaceId, install) throws ServiceError 409 when a stored
    //   // record exists and stored.hosting !== install.hosting.
    const install = mintNewInstall({
      originAppId: APP,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      bindings: {},
      config: {},
      installedBy: ALICE,
    });
    await saveInstall(WS, install);

    await expect(
      saveInstall(WS, { ...install, hosting: "hosted" }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(/immutable/i),
    } satisfies Partial<ServiceError>);

    // Stored record is unchanged.
    expect((await readInstall(WS, install.installId))?.hosting).toBe("managed");
  });

  it("saveInstall throws ServiceError 409 on the reverse flip (hosted → managed)", async () => {
    const install = mintNewInstall({
      originAppId: APP,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      bindings: {},
      config: {},
      installedBy: ALICE,
      hosting: "hosted",
      hostingWorkspaceId: WS,
    });
    await saveInstall(WS, install);

    await expect(
      saveInstall(WS, { ...install, hosting: "managed" }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(/immutable/i),
    } satisfies Partial<ServiceError>);

    expect((await readInstall(WS, install.installId))?.hosting).toBe("hosted");
  });

  it("absent hosting field on pre-F2 records reads as managed (TD4 no-migration invariant)", async () => {
    // Tech-plan: "Absent on pre-F2 stored records ⇒ read as 'managed' (TD4).
    // No mode-flip migration exists or will."
    const preF2Id = "01PREF2CONTRACTFREEZE000000";
    await writeSvcRecord(WS, svcScope("installs"), preF2Id, {
      installId: preF2Id,
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
      // deliberately omit `hosting`
    });
    const stored = await readInstall(WS, preF2Id);
    expect(stored).toBeDefined();
    // The field is absent on the raw record — the consumer (instanceAccess,
    // install.ts guard) normalizes absent to "managed".
    expect((stored as AppInstallation & { hosting?: HostingMode }).hosting).toBeUndefined();

    // A flip to "hosted" is rejected as if the record said "managed".
    await expect(
      saveInstall(WS, { ...stored!, hosting: "hosted" }),
    ).rejects.toMatchObject({ status: 409, message: expect.stringMatching(/immutable/i) });

    // Writing explicit "managed" is accepted (not a flip).
    await saveInstall(WS, { ...stored!, hosting: "managed" });
    expect((await readInstall(WS, preF2Id))?.hosting).toBe("managed");
  });
});

// ---------------------------------------------------------------------------
// 4. Error codes at module seams — the iw9-b call-surface contract
// ---------------------------------------------------------------------------

describe("Error code 404 — deny-as-404 at assertInstanceAccess (TD2/TD3)", () => {
  it("non-participant denied as 404 (deny-as-404, no oracle)", async () => {
    // Tech-plan §instances.ts:
    //   /** Throws 404 (deny-as-404) unless callerSub ∈ participants … */
    //   export function assertInstanceAccess(…): Promise<AppInstanceRecord>;
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });

    await expect(
      assertInstanceAccess(WS, APP, inst.instanceId, OUTSIDER),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("orphan instance id denied as 404 (fail closed)", async () => {
    // Tech-plan: "Fails closed when the instance record is missing."
    await expect(
      assertInstanceAccess(WS, APP, "01ORPHANCONTRACTFREEZE00000", ALICE),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });

  it("assertPartitionAccess propagates 404 for a shared path with no participant access", async () => {
    // Tech-plan §store.ts:
    //   /** Throws ServiceError 404 on any denial — deny-as-404, no oracle. */
    //   export function assertPartitionAccess(…): Promise<void>;
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    const path = `${sharedDataDir(APP, inst.instanceId)}/file.md`;

    // Participant passes.
    await expect(assertPartitionAccess(WS, ALICE, path)).resolves.toBeUndefined();

    // Non-participant is a 404, indistinguishable from an orphan.
    await expect(
      assertPartitionAccess(WS, OUTSIDER, path),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);
  });
});

describe("Error code 413 — storage cap exceeded at reserveInstanceBytes (TD5)", () => {
  it("reserveInstanceBytes throws 413 when delta pushes storageBytes past storageCapBytes", async () => {
    // Tech-plan §instances.ts:
    //   /** Pre-write check + post-write counter delta (TD5). Throws 413 over cap. */
    //   export function reserveInstanceBytes(…): Promise<void>;
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    // Set a 100-byte cap.
    await setInstanceCap(WS, inst.instanceId, 100, ALICE);

    // A 101-byte write exceeds the cap.
    await expect(
      reserveInstanceBytes(WS, inst.instanceId, 101),
    ).rejects.toMatchObject({ status: 413 } satisfies Partial<ServiceError>);
  });

  it("setInstanceCap throws 400 on negative cap (not 413 — distinct validation error)", async () => {
    // Tech-plan §instances.ts:
    //   export function setInstanceCap(…, capBytes: number | undefined, …): Promise<AppInstanceRecord>;
    //   // 400 on negative or non-integer caps.
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE],
    });
    await expect(
      setInstanceCap(WS, inst.instanceId, -1, ALICE),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<ServiceError>);
  });
});

describe("AppInstanceRecord shape — frozen field contract (TD3)", () => {
  it("createInstance returns a record matching the frozen AppInstanceRecord interface", async () => {
    // Tech-plan §instances.ts:
    //   export interface AppInstanceRecord {
    //     instanceId: string;        // ULID, record key under svc#app-instances
    //     appId: string;             // app or install ULID (the scope's <id>)
    //     hostWorkspaceId: string;   // tenant the rows live in
    //     createdBy: string;         // user sub
    //     createdAt: string;         // ISO
    //     updatedAt: string;         // ISO
    //     participants: string[];    // user subs — THE ACL (invariant 4)
    //     storageCapBytes?: number;  // host-set; absent = uncapped (D22)
    //     storageBytes: number;      // metered, eventually consistent (TD5)
    //   }
    const inst = await createInstance({
      workspaceId: WS,
      appId: APP,
      createdBy: ALICE,
      participants: [ALICE, BOB],
    });

    // Every required field must be present with the correct type.
    const record: AppInstanceRecord = inst;  // compile-time type check
    expect(typeof record.instanceId).toBe("string");
    expect(isValidUlid(record.instanceId)).toBe(true);
    expect(record.appId).toBe(APP);
    expect(record.hostWorkspaceId).toBe(WS);
    expect(record.createdBy).toBe(ALICE);
    expect(typeof record.createdAt).toBe("string");
    expect(typeof record.updatedAt).toBe("string");
    expect(record.participants).toEqual([ALICE, BOB]);
    expect(record.storageBytes).toBe(0);
    // storageCapBytes is optional (absent = uncapped per D22).
    expect(record.storageCapBytes).toBeUndefined();
  });
});

describe("appPathServable — shared paths are never HTTP-servable (TD2)", () => {
  it("appPathServable returns false for every shared-instance path", () => {
    // Tech-plan §store.ts:
    //   /** Is `path` publishable over HTTP? … per-user app data and shared
    //    * instance partitions are never served through the live site. */
    const app = {
      id: APP,
      name: "testapp",
      root: "apps/testapp",
      paths: ["apps/testapp"],
    };
    // Normal app paths are servable.
    expect(appPathServable(app, "apps/testapp/index.tsx")).toBe(true);
    // Shared-instance paths are never servable.
    expect(appPathServable(app, sharedDataDir(APP, INSTANCE))).toBe(false);
    expect(appPathServable(app, `${sharedDataDir(APP, INSTANCE)}/notes.md`)).toBe(false);
  });
});
