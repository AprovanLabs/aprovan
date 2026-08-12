/**
 * Derived authority (IW-9 C / invariant 3).
 *
 * Standing automations (workflows, schedules, agent profiles) store owner
 * identity only — never grants, membership, or credential references. Every
 * execution resolves the owner's current standing through
 * {@link evaluateDispatch}. Membership departure deactivates automations;
 * grant/credential revocation invalidates the tool-list cache immediately so
 * the next dispatch (not the next TTL) sees the narrowed grant.
 */

import { randomUUID } from "node:crypto";
import {
  evaluateDispatch,
  type DispatchDecision,
  type DispatchRequest,
  type EvaluateDispatchOptions,
} from "./grants.js";
import type { Principal } from "./middleware/auth.js";
import { ServiceError } from "./service-kernel.js";

export type AutomationKind = "workflow" | "schedule" | "agent-profile";

export type AutomationStatus = "active" | "deactivated";

/** Visible deactivation reason for owner departure (spec wording). */
export const OWNER_DEPARTED_REASON = "owner departed";

/** Visible deactivation reason when standing authority is revoked. */
export const AUTHORITY_REVOKED_REASON = "authority revoked";

/**
 * Standing automation record. Intentionally omits grants — callers must not
 * snapshot capability/resource/credential authority onto this shape.
 */
export interface StandingAutomationRecord {
  id: string;
  workspaceId: string;
  kind: AutomationKind;
  name: string;
  /** Owner identity only (invariant 3). */
  ownerId: string;
  status: AutomationStatus;
  /** e.g. "owner departed" — shown on the review / admin surface. */
  deactivationReason?: string;
  deactivatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterStandingAutomationInput {
  workspaceId: string;
  kind: AutomationKind;
  name: string;
  ownerId: string;
  id?: string;
}

export type AutomationDispatchResult =
  | DispatchDecision
  | { kind: "skipped"; reason: "deactivated" };

const automations = new Map<string, StandingAutomationRecord>();
/** `${workspaceId}:${userId}` — user-level credential grants stop resolving. */
const departedUserLevel = new Set<string>();

/**
 * Tool-list cache invalidator — registered from `routes/tools.ts` so this
 * module stays free of a tools import cycle. Defaults to a no-op until wired.
 */
let invalidateToolListCacheFn: (workspaceId: string) => void = () => {};

/** Wire {@link invalidateToolListCache} from routes/tools (call once at load). */
export function setToolListCacheInvalidator(
  fn: (workspaceId: string) => void,
): void {
  invalidateToolListCacheFn = fn;
}

function automationKey(workspaceId: string, id: string): string {
  return `${workspaceId}:${id}`;
}

function departedKey(workspaceId: string, userId: string): string {
  return `${workspaceId}:${userId}`;
}

/** Reset in-memory state (tests). Keeps the cache invalidator wiring. */
export function resetDerivedAuthorityState(): void {
  automations.clear();
  departedUserLevel.clear();
}

/**
 * Register (or replace) a standing automation. Stores owner identity only —
 * any grant-shaped fields on `input` are rejected by the type and ignored.
 */
export function registerStandingAutomation(
  input: RegisterStandingAutomationInput,
): StandingAutomationRecord {
  const now = new Date().toISOString();
  const id = input.id ?? randomUUID();
  const existing = automations.get(automationKey(input.workspaceId, id));
  const record: StandingAutomationRecord = {
    id,
    workspaceId: input.workspaceId,
    kind: input.kind,
    name: input.name,
    ownerId: input.ownerId,
    status: existing?.status ?? "active",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    ...(existing?.deactivationReason !== undefined
      ? { deactivationReason: existing.deactivationReason }
      : {}),
    ...(existing?.deactivatedAt !== undefined
      ? { deactivatedAt: existing.deactivatedAt }
      : {}),
  };
  automations.set(automationKey(input.workspaceId, id), record);
  return { ...record };
}

export function getStandingAutomation(
  workspaceId: string,
  id: string,
): StandingAutomationRecord | undefined {
  const hit = automations.get(automationKey(workspaceId, id));
  return hit ? { ...hit } : undefined;
}

export function listStandingAutomations(
  workspaceId: string,
  filter?: { ownerId?: string; status?: AutomationStatus },
): StandingAutomationRecord[] {
  const out: StandingAutomationRecord[] = [];
  for (const record of automations.values()) {
    if (record.workspaceId !== workspaceId) continue;
    if (filter?.ownerId !== undefined && record.ownerId !== filter.ownerId) continue;
    if (filter?.status !== undefined && record.status !== filter.status) continue;
    out.push({ ...record });
  }
  return out;
}

/** Whether a deactivated/departed owner's user-level credential grants still resolve. */
export function userLevelCredentialGrantsResolvable(
  workspaceId: string,
  userId: string,
): boolean {
  return !departedUserLevel.has(departedKey(workspaceId, userId));
}

/** True when the automation is active and may be scheduled/dispatched. */
export function canRunStandingAutomation(workspaceId: string, automationId: string): boolean {
  const record = automations.get(automationKey(workspaceId, automationId));
  return record?.status === "active";
}

/**
 * Resolve authority for one standing-automation tool call at dispatch time.
 * Builds the owner's principal fresh — never reads snapshotted grants.
 */
export async function resolveAutomationDispatch(
  args: {
    workspaceId: string;
    automationId: string;
    tool: DispatchRequest["tool"];
    resource?: string;
    credential?: DispatchRequest["credential"];
    via?: DispatchRequest["via"];
    runContext?: DispatchRequest["runContext"];
    /** Live group membership for the owner (not stored on the automation). */
    ownerGroupIds?: string[];
    ownerRole?: string;
  },
  options?: EvaluateDispatchOptions,
): Promise<AutomationDispatchResult> {
  const record = automations.get(automationKey(args.workspaceId, args.automationId));
  if (!record) {
    throw new ServiceError(`Standing automation ${args.automationId} not found`, 404);
  }
  if (record.status !== "active") {
    return { kind: "skipped", reason: "deactivated" };
  }

  // User-oauth path: departed owners fail closed immediately.
  if (
    args.credential?.level === "user-oauth" &&
    !userLevelCredentialGrantsResolvable(args.workspaceId, record.ownerId)
  ) {
    return { kind: "deny", reason: "credential-unconnected" };
  }

  const principal: Principal = {
    sub: record.ownerId,
    workspaceId: args.workspaceId,
    role: args.ownerRole ?? "member",
    groupIds: args.ownerGroupIds ?? [],
  };

  const req: DispatchRequest = {
    principal,
    tool: args.tool,
    ...(args.resource !== undefined ? { resource: args.resource } : {}),
    ...(args.credential !== undefined ? { credential: args.credential } : {}),
    ...(args.via !== undefined ? { via: args.via } : {}),
    ...(args.runContext !== undefined ? { runContext: args.runContext } : {}),
  };

  return evaluateDispatch(req, options);
}

/**
 * Membership-departure listener. Deactivates the member's standing automations
 * in this workspace before their next scheduled run, and stops resolving their
 * user-level credential grants immediately.
 *
 * Wire from {@link removeMember} (or identity-store remove) when that path is
 * in Touches — exported here for the review-surface / admin UX and tests.
 */
export function onMembershipDeparture(
  workspaceId: string,
  userId: string,
): StandingAutomationRecord[] {
  departedUserLevel.add(departedKey(workspaceId, userId));
  const now = new Date().toISOString();
  const deactivated: StandingAutomationRecord[] = [];
  for (const [k, record] of automations) {
    if (record.workspaceId !== workspaceId || record.ownerId !== userId) continue;
    if (record.status === "deactivated" && record.deactivationReason === OWNER_DEPARTED_REASON) {
      deactivated.push({ ...record });
      continue;
    }
    const next: StandingAutomationRecord = {
      ...record,
      status: "deactivated",
      deactivationReason: OWNER_DEPARTED_REASON,
      deactivatedAt: now,
      updatedAt: now,
    };
    automations.set(k, next);
    deactivated.push({ ...next });
  }
  return deactivated;
}

/**
 * Admin-only reassign. Re-derives under the new owner's grants on subsequent
 * runs — never inherits the previous owner's standing.
 */
export function reassignAutomation(args: {
  workspaceId: string;
  automationId: string;
  newOwnerId: string;
  actor: Principal;
}): StandingAutomationRecord {
  if (args.actor.role !== "admin") {
    throw new ServiceError("Only workspace admins can reassign standing automations", 403);
  }
  if (args.actor.workspaceId !== args.workspaceId) {
    throw new ServiceError("Admin must act within the automation's workspace", 403);
  }

  const key = automationKey(args.workspaceId, args.automationId);
  const record = automations.get(key);
  if (!record) {
    throw new ServiceError(`Standing automation ${args.automationId} not found`, 404);
  }

  const now = new Date().toISOString();
  const next: StandingAutomationRecord = {
    id: record.id,
    workspaceId: record.workspaceId,
    kind: record.kind,
    name: record.name,
    ownerId: args.newOwnerId,
    status: "active",
    createdAt: record.createdAt,
    updatedAt: now,
  };
  automations.set(key, next);
  return { ...next };
}

/**
 * Grant revocation cascade: drop the tool-list cache so every dependent
 * principal's next dispatch sees the narrowed grant (not the next TTL).
 */
export function onGrantRevoked(workspaceId: string): void {
  invalidateToolListCacheFn(workspaceId);
}

/**
 * Credential revocation cascade — same cache invalidation as grant revoke.
 * Hooked from the credential store delete path.
 */
export function onCredentialRevoked(workspaceId: string): void {
  invalidateToolListCacheFn(workspaceId);
}
