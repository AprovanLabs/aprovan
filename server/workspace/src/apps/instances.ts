/**
 * Shared-instance records — identity and ACL resolution for app-data
 * partitions several people read and write together (tech-plan TD1, TD3).
 *
 * One record per instance, keyed by ULID under the caller-unreachable
 * `svc#app-instances` scope (`assertCallerScope`, svc-records.ts:51-65). The
 * embedded `participants` list is the sole ACL (invariant 4):
 * `assertInstanceAccess` is the single choke point everything else (the
 * partition guard, `resolveRecordScope`, admin/host procedures) delegates to,
 * and it fails closed — denial is indistinguishable from absence (404), never
 * an oracle.
 *
 * `managed` installs additionally require every participant to stay a member
 * of the hosting workspace (invariant 5), re-checked at request time, never
 * cached (invariant 3). Hosting mode itself lives on the install record
 * (`apps/install.ts`, added by iw9-f2 stream 3); it is read here via a
 * dynamic `import()` — the same technique `apps/store.ts` (`saveApp`,
 * `removeApp`) already uses to reach `apps/directory.ts` — because a static
 * import would close a cycle once stream 2 makes `apps/store.ts` delegate to
 * this module (`store.ts` → `instances.ts` → `install.ts` → `store.ts`).
 * Absent field / no install record at all reads as `"managed"` (TD4): the
 * safe default is the one that enforces membership, not the one that skips
 * it.
 */

import { ulid } from "ulid";
import { getFsStore, listAll } from "../fs-store.js";
import { getMembership } from "../memberships.js";
import { getRecordStore } from "../records.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

export type HostingMode = "hosted" | "managed";

export interface AppInstanceRecord {
  instanceId: string; // ULID, record key under svc#app-instances
  appId: string; // app or install ULID (the scope's <id>)
  hostWorkspaceId: string; // tenant the rows live in
  createdBy: string; // user sub
  createdAt: string; // ISO
  updatedAt: string; // ISO
  participants: string[]; // user subs — THE ACL (invariant 4)
  storageCapBytes?: number; // host-set; absent = uncapped (D22)
  storageBytes: number; // metered, eventually consistent (TD5)
}

const INSTANCES_SCOPE = svcScope("app-instances");

export function sharedRecordScope(appId: string, instanceId: string): string {
  return `app#${appId}#shared#${instanceId}`;
}

export function sharedDataDir(id: string, instanceId: string): string {
  return `.apps/${id}/shared/${instanceId}`;
}

/** Deny-as-404: identical whether the instance is missing or access denied. */
function denyInstance(instanceId: string): ServiceError {
  return new ServiceError(`Not found: instance ${instanceId}`, 404);
}

/**
 * The owning install's hosting mode. Dynamic import to avoid a static cycle
 * once `apps/store.ts` delegates here (see module docstring). No install
 * record for `appId` means it's an origin-hosted app, not an installed one —
 * its data lives in the workspace that owns it, the same shape as `managed`,
 * so it reads as `managed` too (TD4's absent-field default, applied
 * uniformly).
 */
async function resolveHostingMode(hostWorkspaceId: string, appId: string): Promise<HostingMode> {
  const { readInstall } = await import("./install.js");
  const install = await readInstall(hostWorkspaceId, appId).catch(() => undefined);
  if (!install) return "managed";
  return (install as { hosting?: HostingMode }).hosting ?? "managed";
}

/** 4xx naming the membership requirement when `sub` is not a member. */
async function assertHostingMembership(hostWorkspaceId: string, sub: string): Promise<void> {
  const membership = await getMembership(hostWorkspaceId, sub);
  if (!membership) {
    throw new ServiceError(
      `User ${sub} is not a member of workspace ${hostWorkspaceId}: managed instances require every participant to be a hosting-workspace member`,
      400,
    );
  }
}

/** Reject any non-member sub when the owning install is managed. */
async function assertParticipantsAllowed(
  hostWorkspaceId: string,
  appId: string,
  subs: readonly string[],
): Promise<void> {
  if ((await resolveHostingMode(hostWorkspaceId, appId)) !== "managed") return;
  for (const sub of subs) {
    await assertHostingMembership(hostWorkspaceId, sub);
  }
}

export async function createInstance(input: {
  workspaceId: string;
  appId: string;
  createdBy: string;
  participants: string[];
}): Promise<AppInstanceRecord> {
  const participants = [...new Set(input.participants)];
  await assertParticipantsAllowed(input.workspaceId, input.appId, participants);

  const now = new Date().toISOString();
  const record: AppInstanceRecord = {
    instanceId: ulid(),
    appId: input.appId,
    hostWorkspaceId: input.workspaceId,
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
    participants,
    storageBytes: 0,
  };
  await writeSvcRecord(
    input.workspaceId,
    INSTANCES_SCOPE,
    record.instanceId,
    record,
    input.createdBy,
  );
  return record;
}

export async function getInstance(
  workspaceId: string,
  instanceId: string,
): Promise<AppInstanceRecord | undefined> {
  return readSvcRecord<AppInstanceRecord>(workspaceId, INSTANCES_SCOPE, instanceId);
}

export async function listInstances(
  workspaceId: string,
  appId: string,
): Promise<AppInstanceRecord[]> {
  const entries = await listSvcRecords<AppInstanceRecord>(workspaceId, INSTANCES_SCOPE);
  return entries.map((entry) => entry.value).filter((record) => record.appId === appId);
}

async function requireInstance(workspaceId: string, instanceId: string): Promise<AppInstanceRecord> {
  const record = await getInstance(workspaceId, instanceId);
  if (!record) throw new ServiceError(`Unknown instance: ${instanceId}`, 404);
  return record;
}

/**
 * Throws 404 (deny-as-404) unless callerSub ∈ participants AND, when the
 * owning install's hosting mode is "managed", callerSub is currently a
 * member of hostWorkspaceId (invariants 3 + 5). Fails closed when the
 * instance record is missing (orphan scope) or names a different app.
 */
export async function assertInstanceAccess(
  workspaceId: string,
  appId: string,
  instanceId: string,
  callerSub: string,
): Promise<AppInstanceRecord> {
  const record = await getInstance(workspaceId, instanceId);
  if (!record || record.appId !== appId || !record.participants.includes(callerSub)) {
    throw denyInstance(instanceId);
  }
  if ((await resolveHostingMode(record.hostWorkspaceId, record.appId)) === "managed") {
    const membership = await getMembership(record.hostWorkspaceId, callerSub);
    if (!membership) throw denyInstance(instanceId);
  }
  return record;
}

/** 4xx when a sub is not a hosting-workspace member and mode is managed. */
export async function addParticipant(
  workspaceId: string,
  instanceId: string,
  sub: string,
  actor: string,
): Promise<AppInstanceRecord> {
  const record = await requireInstance(workspaceId, instanceId);
  await assertParticipantsAllowed(record.hostWorkspaceId, record.appId, [sub]);

  if (!record.participants.includes(sub)) {
    record.participants = [...record.participants, sub];
    record.updatedAt = new Date().toISOString();
    await writeSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId, record, actor);
  }
  return record;
}

export async function removeParticipant(
  workspaceId: string,
  instanceId: string,
  sub: string,
  actor: string,
): Promise<AppInstanceRecord> {
  const record = await requireInstance(workspaceId, instanceId);
  if (record.participants.includes(sub)) {
    record.participants = record.participants.filter((participant) => participant !== sub);
    record.updatedAt = new Date().toISOString();
    await writeSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId, record, actor);
  }
  return record;
}

// ---------------------------------------------------------------------------
// Storage metering (tech-plan TD5, IW-9 D22): the host pays for storage, so
// the host sees per-instance size, caps it, and may delete the instance. The
// counter is best-effort/eventually consistent — shared-scope writes and
// deletes in records.ts feed byte deltas through `reserveInstanceBytes`, and
// `recountInstanceUsage` is the authoritative correction path. Host-gating
// and audit rows live in the `apps.instance*` procedures (stream 5), not here.
// ---------------------------------------------------------------------------

export async function setInstanceCap(
  workspaceId: string,
  instanceId: string,
  capBytes: number | undefined,
  actor: string,
): Promise<AppInstanceRecord> {
  if (capBytes !== undefined && (!Number.isSafeInteger(capBytes) || capBytes < 0)) {
    throw new ServiceError("storageCapBytes must be a non-negative integer", 400);
  }
  const record = await requireInstance(workspaceId, instanceId);
  if (capBytes === undefined) delete record.storageCapBytes;
  else record.storageCapBytes = capBytes;
  record.updatedAt = new Date().toISOString();
  await writeSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId, record, actor);
  return record;
}

/**
 * Pre-write cap gate plus counter delta in one call (TD5): throws 413 when a
 * positive delta would push `storageBytes` past `storageCapBytes`, otherwise
 * applies the delta and persists. Negative deltas (deletes) are never blocked
 * — an over-cap instance must stay shrinkable — and the counter floors at 0
 * rather than going negative under drift.
 */
export async function reserveInstanceBytes(
  workspaceId: string,
  instanceId: string,
  deltaBytes: number,
): Promise<void> {
  if (deltaBytes === 0) return;
  const record = await requireInstance(workspaceId, instanceId);
  if (
    deltaBytes > 0 &&
    record.storageCapBytes !== undefined &&
    record.storageBytes + deltaBytes > record.storageCapBytes
  ) {
    throw new ServiceError(
      `Instance ${instanceId} storage cap exceeded: ${record.storageBytes} + ${deltaBytes} > ${record.storageCapBytes} bytes`,
      413,
    );
  }
  record.storageBytes = Math.max(0, record.storageBytes + deltaBytes);
  record.updatedAt = new Date().toISOString();
  await writeSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId, record);
}

/**
 * Recompute the instance's true footprint — every record in its shared scope
 * (spilled values included: `get` resolves them from S3 before sizing) plus
 * every file under its shared dir — rewrite `storageBytes`, and return the
 * figure. This is the authoritative correction for counter drift (TD5).
 */
export async function recountInstanceUsage(
  workspaceId: string,
  instanceId: string,
): Promise<number> {
  const record = await requireInstance(workspaceId, instanceId);
  const store = getRecordStore();
  const scope = sharedRecordScope(record.appId, instanceId);
  let total = 0;
  for (const key of await store.list(workspaceId, scope)) {
    const hit = await store.get(workspaceId, scope, key);
    if (hit) total += Buffer.byteLength(JSON.stringify(hit.value ?? null), "utf8");
  }
  const files = await listAll(getFsStore(), workspaceId, sharedDataDir(record.appId, instanceId));
  for (const entry of files) total += entry.size;

  record.storageBytes = total;
  record.updatedAt = new Date().toISOString();
  await writeSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId, record);
  return total;
}

/**
 * Remove the instance outright: every record in its shared scope (the store's
 * own delete cleans up spilled blobs), the shared file subtree (same FsStore
 * prefix removal `purgeInstallData` uses), then the instance record itself —
 * after which all access fails closed (404, orphan-scope rule). Mechanism
 * only: the audit row naming `actor` is appended by the stream-5
 * `apps.instanceDelete` procedure, which is also where host-gating lives.
 */
export async function deleteInstance(
  workspaceId: string,
  instanceId: string,
  _actor: string,
): Promise<void> {
  const record = await requireInstance(workspaceId, instanceId);
  const store = getRecordStore();
  const scope = sharedRecordScope(record.appId, instanceId);
  for (const key of await store.list(workspaceId, scope)) {
    await store.delete(workspaceId, scope, key);
  }
  await getFsStore().removePrefix(workspaceId, sharedDataDir(record.appId, instanceId));
  await deleteSvcRecord(workspaceId, INSTANCES_SCOPE, instanceId);
}
