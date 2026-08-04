/**
 * Profile resolver — exact match for namespace keys, longest-prefix for path keys.
 */

import { ServiceError } from "../service-kernel.js";
import {
  getNamespaceProfile,
  listPathProfiles,
  listProfileNames,
} from "./store.js";
import {
  DEFAULT_PROFILE_NAME,
  mergeOptions,
  type CallOptions,
  type ProfileOptions,
  type ProfileRecord,
} from "./types.js";

export interface ResolvedNamespaceProfile {
  record: ProfileRecord | undefined;
  /** True when a named profile was requested and found, or the default was found. */
  found: boolean;
  options: Record<string, unknown>;
}

/**
 * Resolve a namespace profile. Named profiles must exist (fail at the
 * operation with a listing of what exists). The default profile falls through
 * to zero-config when no default is stored.
 */
export async function resolveNamespaceProfile(
  workspaceId: string,
  namespace: string,
  profileName: string | undefined,
  callSiteOptions?: CallOptions,
  compatDefaults?: Record<string, unknown>,
): Promise<ResolvedNamespaceProfile> {
  const name = profileName === undefined || profileName === "" ? undefined : profileName;
  const record = await getNamespaceProfile(workspaceId, namespace, name);

  if (name !== undefined && !record) {
    const existing = await listProfileNames(workspaceId, namespace);
    const available =
      existing.length > 0
        ? `Available profiles: ${existing.map((n) => JSON.stringify(n)).join(", ")}`
        : `No profiles are configured for ${namespace}`;
    throw new ServiceError(
      `No ${namespace} profile named ${JSON.stringify(name)}. ${available}`,
      404,
    );
  }

  const profileOptions = record?.options as ProfileOptions | undefined;
  return {
    record,
    found: record !== undefined,
    options: mergeOptions(compatDefaults, profileOptions, callSiteOptions),
  };
}

/**
 * Longest-prefix path match. Returns undefined when no configured prefix
 * covers `path` (the workspace's own store handles it).
 */
export async function resolvePathProfile(
  workspaceId: string,
  path: string,
): Promise<ProfileRecord | undefined> {
  const profiles = await listPathProfiles(workspaceId);
  let best: ProfileRecord | undefined;
  let bestLen = -1;
  for (const profile of profiles) {
    if (!("path" in profile) || typeof profile.path !== "string") continue;
    const prefix = profile.path;
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      if (prefix.length > bestLen) {
        best = profile;
        bestLen = prefix.length;
      }
    }
  }
  return best;
}

/** Normalize a stored default-profile name for display. */
export function displayProfileName(name: string | undefined): string | undefined {
  if (name === undefined || name === DEFAULT_PROFILE_NAME) return undefined;
  return name;
}
