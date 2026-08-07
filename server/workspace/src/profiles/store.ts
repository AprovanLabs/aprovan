/**
 * Profile store — persists namespace-keyed and path-keyed profiles through
 * the registry ProfileStore.
 *
 * Mapping onto ProfileRow:
 *   namespace (interface) → targetKind "interface", targetId = namespace
 *   namespace (provider)  → targetKind "provider",  targetId = namespace
 *   path                 → targetKind "path",      targetId = path, name = "default"
 *
 * Profile names are any non-empty string (no identifier regex). The default
 * profile uses the reserved name {@link DEFAULT_PROFILE_NAME}.
 *
 * `"path"` is a first-class member of the published @aprovan/registry-server
 * `ProfileTargetKind` union as of 0.2.5 — no local widening needed.
 */

import { getRegistryStorage } from "../registry-storage.js";
import { isInterface } from "../interfaces.js";
import { ServiceError } from "../service-kernel.js";
import { assertProviderBindingAllowed } from "../workspaces.js";
import {
  DEFAULT_PROFILE_NAME,
  type ProfileOptions,
  type ProfileRecord,
  type ProfileValue,
} from "./types.js";

/** Owned by `@aprovan/registry-server` — re-exported here, never redeclared. */
export type { ProfileTargetKind } from "@aprovan/registry-server";

function normalizeName(name: string | undefined): string {
  if (name === undefined || name === "") return DEFAULT_PROFILE_NAME;
  if (typeof name !== "string" || name.length === 0) {
    throw new ServiceError("profile name must be a non-empty string", 400);
  }
  return name;
}

function namespaceTargetKind(namespace: string): "interface" | "provider" {
  return isInterface(namespace) ? "interface" : "provider";
}

function rowToRecord(row: {
  targetKind: string;
  targetId: string;
  name: string;
  provider?: string;
  credentialId?: string;
  options: Record<string, unknown>;
}): ProfileRecord {
  const value: ProfileValue = {
    ...(row.provider ? { provider: row.provider } : {}),
    ...(row.credentialId ? { credential: row.credentialId } : {}),
    ...(Object.keys(row.options ?? {}).length > 0 ? { options: row.options } : {}),
  };
  if (row.targetKind === "path") {
    return { path: row.targetId, ...value };
  }
  return {
    namespace: row.targetId,
    ...(row.name !== DEFAULT_PROFILE_NAME ? { name: row.name } : {}),
    ...value,
  };
}

async function ensureTenant(workspaceId: string): Promise<
  Awaited<ReturnType<typeof getRegistryStorage>>
> {
  const storage = await getRegistryStorage();
  await storage.tenants.ensure(workspaceId);
  return storage;
}

/**
 * Upsert a profile. Exactly one of `namespace` / `path` is required.
 * Path profiles are singly-bound (name is ignored).
 */
export async function setProfile(
  workspaceId: string,
  input: {
    namespace?: string;
    path?: string;
    name?: string;
    provider?: string;
    credential?: string;
    options?: ProfileOptions;
    createdBy?: string;
  },
): Promise<ProfileRecord> {
  const hasNamespace = typeof input.namespace === "string" && input.namespace.length > 0;
  const hasPath = typeof input.path === "string" && input.path.length > 0;
  if (hasNamespace === hasPath) {
    throw new ServiceError("profiles.set requires exactly one of namespace or path", 400);
  }

  await assertProviderBindingAllowed(workspaceId, input.provider);

  const storage = await ensureTenant(workspaceId);
  const createdBy = input.createdBy ?? "workspace";

  if (hasPath) {
    const path = input.path!;
    const existing = await storage.profiles.getByName(
      workspaceId,
      "path",
      path,
      DEFAULT_PROFILE_NAME,
    );
    const options = input.options ?? {};
    if (existing) {
      const updated = await storage.profiles.update(workspaceId, existing.id, {
        provider: input.provider,
        credentialId: input.credential,
        options,
      });
      return rowToRecord(updated!);
    }
    const created = await storage.profiles.create(workspaceId, {
      name: DEFAULT_PROFILE_NAME,
      targetKind: "path",
      targetId: path,
      ...(input.provider ? { provider: input.provider } : {}),
      ...(input.credential ? { credentialId: input.credential } : {}),
      options,
      createdBy,
    });
    return rowToRecord(created);
  }

  const namespace = input.namespace!;
  const name = normalizeName(input.name);
  const targetKind = namespaceTargetKind(namespace);
  const existing = await storage.profiles.getByName(workspaceId, targetKind, namespace, name);
  const options = input.options ?? {};

  if (existing) {
    const updated = await storage.profiles.update(workspaceId, existing.id, {
      provider: input.provider ?? (targetKind === "provider" ? namespace : existing.provider),
      credentialId: input.credential,
      options,
    });
    return rowToRecord(updated!);
  }

  if (targetKind === "interface" && !input.provider) {
    throw new ServiceError(
      `An interface profile for "${namespace}" must name its executing provider`,
      400,
    );
  }

  const created = await storage.profiles.create(workspaceId, {
    name,
    targetKind,
    targetId: namespace,
    provider: input.provider ?? (targetKind === "provider" ? namespace : undefined),
    ...(input.credential ? { credentialId: input.credential } : {}),
    options,
    createdBy,
  });
  return rowToRecord(created);
}

/** List profiles, optionally filtered by namespace or path prefix key. */
export async function listProfiles(
  workspaceId: string,
  filter?: { namespace?: string; path?: string },
): Promise<ProfileRecord[]> {
  const storage = await ensureTenant(workspaceId);
  const rows = await storage.profiles.list(workspaceId);

  let records = rows
    .filter((row) => row.targetKind === "interface" || row.targetKind === "provider" || row.targetKind === "path")
    .map(rowToRecord);

  if (filter?.namespace) {
    records = records.filter((r) => "namespace" in r && r.namespace === filter.namespace);
  }
  if (filter?.path !== undefined) {
    records = records.filter((r) => "path" in r && r.path === filter.path);
  }
  return records;
}

/** Remove a profile. Path profiles ignore `name`. */
export async function removeProfile(
  workspaceId: string,
  input: { namespace?: string; path?: string; name?: string },
): Promise<boolean> {
  const hasNamespace = typeof input.namespace === "string" && input.namespace.length > 0;
  const hasPath = typeof input.path === "string" && input.path.length > 0;
  if (hasNamespace === hasPath) {
    throw new ServiceError("profiles.remove requires exactly one of namespace or path", 400);
  }

  const storage = await ensureTenant(workspaceId);

  if (hasPath) {
    const existing = await storage.profiles.getByName(
      workspaceId,
      "path",
      input.path!,
      DEFAULT_PROFILE_NAME,
    );
    if (!existing) return false;
    return storage.profiles.delete(workspaceId, existing.id);
  }

  const namespace = input.namespace!;
  const name = normalizeName(input.name);
  const targetKind = namespaceTargetKind(namespace);
  const existing = await storage.profiles.getByName(workspaceId, targetKind, namespace, name);
  if (!existing) return false;
  return storage.profiles.delete(workspaceId, existing.id);
}

/** Look up one namespace profile by exact (namespace, name). */
export async function getNamespaceProfile(
  workspaceId: string,
  namespace: string,
  name?: string,
): Promise<ProfileRecord | undefined> {
  const storage = await ensureTenant(workspaceId);
  const profileName = normalizeName(name);
  const targetKind = namespaceTargetKind(namespace);
  const row = await storage.profiles.getByName(workspaceId, targetKind, namespace, profileName);
  return row ? rowToRecord(row) : undefined;
}

/** All path-keyed profiles for longest-prefix resolution. */
export async function listPathProfiles(workspaceId: string): Promise<ProfileRecord[]> {
  const storage = await ensureTenant(workspaceId);
  const rows = await storage.profiles.list(workspaceId, {
    targetKind: "path",
  });
  return rows.map(rowToRecord);
}

/** Names of profiles configured for a namespace (excluding the default sentinel when listing for errors). */
export async function listProfileNames(
  workspaceId: string,
  namespace: string,
): Promise<string[]> {
  const storage = await ensureTenant(workspaceId);
  const targetKind = namespaceTargetKind(namespace);
  return storage.profiles.namesForTarget(workspaceId, targetKind, namespace);
}

/** Whether the durable backends (sqlite/dsql) are available for profile storage. */
export function profilesAvailable(): boolean {
  return true;
}
