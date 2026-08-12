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
import { ServiceError } from "./service-kernel.js";
import type {
  GrantSubject,
  ProfileRow,
  ProfileTargetKind,
  RegistryStorage,
} from "@aprovan/registry-server";

/** Wire shape of one attached profile (tech-plan groups/profiles admin API). */
export interface GroupProfileSummary {
  id: string;
  name: string;
  target: { kind: ProfileTargetKind; id: string; provider?: string };
  /** The pinned credential's label (falling back to its provider) — display only. */
  credentialLabel?: string;
}

/** Profiles are available on every store backend (sqlite, dsql, dynamo). */
export function profileGrantsAvailable(): boolean {
  return true;
}

function requireAvailable(): void {}

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
 * Invoker's matched tool-pattern set from profile grants (IW-9 C stream 8).
 * Each granted profile targeting a namespace contributes `namespace.*` so
 * `evaluateDispatch` can intersect invoker ∩ app ceiling ∩ profile narrowing.
 *
 * Exactly ONE grant query (`grantedProfileIds` over all subjects) plus one
 * profile listing — never a per-group per-grant N+1.
 */
export async function invokerMatchedToolPatterns(
  workspaceId: string,
  sub: string,
  groupIds: readonly string[],
): Promise<string[]> {
  if (!profileGrantsAvailable()) return [];
  try {
    const store = await getRegistryStorage();
    await store.tenants.ensure(workspaceId);
    const subjects: GrantSubject[] = [
      { kind: "user", id: sub },
      ...groupIds.map((id): GrantSubject => ({ kind: "group", id })),
    ];
    const granted = await store.grants.grantedProfileIds(workspaceId, subjects);
    if (granted.size === 0) return [];
    const rows = await store.profiles.list(workspaceId);
    const patterns = new Set<string>();
    for (const row of rows) {
      if (!granted.has(row.id)) continue;
      patterns.add(`${row.targetId}.*`);
    }
    return [...patterns];
  } catch {
    return [];
  }
}

/**
 * The auth-time join (tech-plan D6/D12): does any profile granted to this
 * caller — as the user or through any of their groups — target `namespace`?
 * Thin wrapper over {@link invokerMatchedToolPatterns}.
 */
export async function profileGrantAllows(
  workspaceId: string,
  sub: string,
  groupIds: readonly string[],
  namespace: string,
): Promise<boolean> {
  const patterns = await invokerMatchedToolPatterns(workspaceId, sub, groupIds);
  const callPrefix = `${namespace}.`;
  return patterns.some(
    (pattern) =>
      pattern === "*" ||
      pattern === `${namespace}.*` ||
      pattern === namespace ||
      (pattern.endsWith(".*") &&
        (namespace === pattern.slice(0, -2) ||
          namespace.startsWith(`${pattern.slice(0, -2)}.`))) ||
      pattern.startsWith(callPrefix),
  );
}

// ---------------------------------------------------------------------------
// App-install profile grants (app-model-split D5)
// ---------------------------------------------------------------------------

const appSubject = (installId: string): GrantSubject => ({ kind: "app", id: installId });

/**
 * Resolve an interface profile by name (or return undefined). Used at install
 * binding time — does not throw 501 on dynamo (returns undefined instead so
 * the degrade path can still record install-side bindings when callers pass
 * explicit ids).
 */
export async function resolveInterfaceProfileId(
  workspaceId: string,
  contract: string,
  profileName: string,
): Promise<string | undefined> {
  if (!profileGrantsAvailable()) return undefined;
  try {
    const store = await getRegistryStorage();
    await store.tenants.ensure(workspaceId);
    // Exact (targetKind, targetId, name) lookup first.
    const byName = await store.profiles.getByName(
      workspaceId,
      "interface",
      contract,
      profileName,
    );
    if (byName) return byName.id;
    // Allow passing a raw profile id as the "name".
    const byId = await store.profiles.getById(workspaceId, profileName);
    if (byId && byId.targetKind === "interface" && byId.targetId === contract) {
      return byId.id;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Mirror a binding as a profile grant to `{kind: "app", id: installId}`.
 * No-op (returns "ungated") when profile grants are unavailable.
 */
export async function grantProfileToInstall(
  workspaceId: string,
  profileId: string,
  installId: string,
  grantedBy: string,
): Promise<"granted" | "ungated"> {
  if (!profileGrantsAvailable()) return "ungated";
  const store = await storage(workspaceId);
  await store.grants.grant(workspaceId, profileId, appSubject(installId), grantedBy);
  return "granted";
}

/** Revoke the install's grant for a profile. No-op when grants unavailable. */
export async function revokeInstallProfileGrant(
  workspaceId: string,
  profileId: string,
  installId: string,
): Promise<boolean> {
  if (!profileGrantsAvailable()) return false;
  const store = await storage(workspaceId);
  return store.grants.revoke(workspaceId, profileId, appSubject(installId));
}

/**
 * Does the install currently hold a grant for `profileId`?
 * When grants are unavailable, returns `"ungated"` (install-side-only binding).
 */
export async function installGrantHolds(
  workspaceId: string,
  installId: string,
  profileId: string,
): Promise<boolean | "ungated"> {
  if (!profileGrantsAvailable()) return "ungated";
  const store = await getRegistryStorage();
  await store.tenants.ensure(workspaceId);
  const granted = await store.grants.grantedProfileIds(workspaceId, [appSubject(installId)]);
  return granted.has(profileId);
}

/** Revoke every grant held by an install subject (best-effort on uninstall). */
export async function revokeAllInstallGrants(
  workspaceId: string,
  installId: string,
  profileIds: Iterable<string>,
): Promise<void> {
  if (!profileGrantsAvailable()) return;
  const store = await storage(workspaceId);
  for (const profileId of profileIds) {
    await store.grants.revoke(workspaceId, profileId, appSubject(installId)).catch(() => false);
  }
}

