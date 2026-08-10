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
import { getMembership } from "../memberships.js";
import { ServiceError } from "../service-kernel.js";
import {
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
