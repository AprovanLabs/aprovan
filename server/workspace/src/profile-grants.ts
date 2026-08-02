/**
 * Group→profile grants — the workspace's wiring onto `@aprovan/registry-server`
 * profile storage (WS-3 registry-server-extraction; specs group-profile-grants;
 * tech-plan data-auth-model D6).
 *
 * A group's capability IS a subject-typed `profile_grants` row
 * (`subjectKind: "group"`): attaching a profile to a group grants every
 * member the profile's target surface on their next call — no session
 * refresh, no per-request UserGroups query, no N+1 grant gets. Resolution is
 * the store's single indexed join (`grants.grantedProfileIds`).
 *
 * Backend note: registry-server storage exists on the `sqlite` (local) and
 * `dsql` (cloud) backends only — WS-3 D8 gives the package no Dynamo driver.
 * On the interim `dynamo` backend the admin surface answers 501 and grant
 * resolution finds nothing; the whole interim path retires at the
 * STORE_BACKEND=dsql cutover.
 */

import { getRegistryStorage } from "./registry-storage.js";
import { storeBackend } from "./runtime/config.js";
import { ServiceError } from "./service-kernel.js";
import type { GrantSubject, ProfileRow, RegistryStorage } from "@aprovan/registry-server";

/** Wire shape of one attached profile (tech-plan groups/profiles admin API). */
export interface GroupProfileSummary {
  id: string;
  name: string;
  target: { kind: "interface" | "provider"; id: string; provider?: string };
  /** The pinned credential's label (falling back to its provider) — display only. */
  credentialLabel?: string;
}

/** Do profile grants exist on this deployment's backend at all? */
export function profileGrantsAvailable(): boolean {
  return storeBackend() !== "dynamo";
}

function requireAvailable(): void {
  if (!profileGrantsAvailable()) {
    throw new ServiceError(
      "Profiles need the relational store backend (sqlite/dsql) — the interim dynamo backend has no profile storage (WS-3 D8; retires at cutover).",
      501,
    );
  }
}

async function storage(workspaceId: string): Promise<RegistryStorage> {
  requireAvailable();
  const store = await getRegistryStorage();
  await store.tenants.ensure(workspaceId);
  return store;
}

async function toSummary(
  store: RegistryStorage,
  workspaceId: string,
  row: ProfileRow,
): Promise<GroupProfileSummary> {
  let credentialLabel: string | undefined;
  if (row.credentialId) {
    const credential = await store.credentials
      .get(workspaceId, row.credentialId)
      .catch(() => undefined);
    credentialLabel = credential?.label ?? credential?.provider;
  }
  return {
    id: row.id,
    name: row.name,
    target: {
      kind: row.targetKind,
      id: row.targetId,
      ...(row.targetKind === "interface" && row.provider ? { provider: row.provider } : {}),
    },
    ...(credentialLabel ? { credentialLabel } : {}),
  };
}

/**
 * Resolve a caller-supplied profile reference — a profile id, or a profile
 * name when exactly one profile carries it. Unknown → 404 naming it;
 * ambiguous name → 400 listing the target-qualified candidates.
 */
async function resolveProfileRef(
  store: RegistryStorage,
  workspaceId: string,
  ref: string,
): Promise<ProfileRow> {
  const byId = await store.profiles.getById(workspaceId, ref);
  if (byId) return byId;
  const all = await store.profiles.list(workspaceId);
  const byName = all.filter((row) => row.name === ref);
  if (byName.length === 1) return byName[0]!;
  if (byName.length > 1) {
    const candidates = byName.map((row) => `${row.targetId}/${row.name} (${row.id})`).join(", ");
    throw new ServiceError(
      `Profile name "${ref}" is ambiguous — pass the profile id. Candidates: ${candidates}`,
      400,
    );
  }
  throw new ServiceError(`Unknown profile: ${ref}`, 404);
}

/** Profiles attached to a group, name-sorted, with display credential labels. */
export async function listGroupProfiles(
  workspaceId: string,
  groupId: string,
): Promise<GroupProfileSummary[]> {
  const store = await storage(workspaceId);
  const granted = await store.grants.grantedProfileIds(workspaceId, [
    { kind: "group", id: groupId },
  ]);
  if (granted.size === 0) return [];
  const rows = (await store.profiles.list(workspaceId)).filter((row) => granted.has(row.id));
  const summaries = await Promise.all(rows.map((row) => toSummary(store, workspaceId, row)));
  return summaries.sort((a, b) => a.name.localeCompare(b.name) || a.target.id.localeCompare(b.target.id));
}

/** Idempotent attach; 404 on an unknown profile reference. */
export async function attachProfileToGroup(
  workspaceId: string,
  groupId: string,
  profileRef: string,
  grantedBy: string,
): Promise<GroupProfileSummary> {
  const store = await storage(workspaceId);
  const profile = await resolveProfileRef(store, workspaceId, profileRef);
  await store.grants.grant(workspaceId, profile.id, { kind: "group", id: groupId }, grantedBy);
  return toSummary(store, workspaceId, profile);
}

/** Detach; false when no such attachment existed. */
export async function detachProfileFromGroup(
  workspaceId: string,
  groupId: string,
  profileRef: string,
): Promise<boolean> {
  const store = await storage(workspaceId);
  const profile = await resolveProfileRef(store, workspaceId, profileRef);
  return store.grants.revoke(workspaceId, profile.id, { kind: "group", id: groupId });
}

/** Every workspace profile (the admin attach picker's source). */
export async function listWorkspaceProfiles(
  workspaceId: string,
): Promise<GroupProfileSummary[]> {
  const store = await storage(workspaceId);
  const rows = await store.profiles.list(workspaceId);
  const summaries = await Promise.all(rows.map((row) => toSummary(store, workspaceId, row)));
  return summaries.sort((a, b) => a.name.localeCompare(b.name) || a.target.id.localeCompare(b.target.id));
}

/**
 * The auth-time join (tech-plan D6/D12): does any profile granted to this
 * caller — as the user or through any of their groups — target `namespace`?
 * A granted profile grants its target's full surface; the profile's own
 * options/limits narrow execution, not the allow decision. `provider:*`
 * wildcard rows are subsumed structurally.
 *
 * Exactly ONE grant query (`grantedProfileIds` over all subjects) plus one
 * profile listing to map ids → targets — never a per-group per-grant N+1.
 * On the interim dynamo backend this resolves to false (no profile storage).
 */
export async function profileGrantAllows(
  workspaceId: string,
  sub: string,
  groupIds: readonly string[],
  namespace: string,
): Promise<boolean> {
  if (!profileGrantsAvailable()) return false;
  const store = await getRegistryStorage();
  await store.tenants.ensure(workspaceId);
  const subjects: GrantSubject[] = [
    { kind: "user", id: sub },
    ...groupIds.map((id): GrantSubject => ({ kind: "group", id })),
  ];
  const granted = await store.grants.grantedProfileIds(workspaceId, subjects);
  if (granted.size === 0) return false;
  const rows = await store.profiles.list(workspaceId, { targetId: namespace });
  return rows.some((row) => granted.has(row.id));
}
