/**
 * Deployment-wide app directory — write-through index in the reserved
 * `__deployment__` tenant (`svc#directory / <appId>`).
 *
 * Synced from saveApp / removeApp / channel pointer changes / visibility changes.
 * `apps.directory` merges this index with the caller's own private apps.
 * The registry is never consulted.
 */

import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { DEPLOYMENT_TENANT } from "./identity.js";
import { DEFAULT_CHANNEL, resolveRelease } from "./release-tags.js";
import { releaseGlobalSlug } from "./slugs.js";
import { listApps, type AppManifest, type AppRequirement } from "./store.js";

const DIRECTORY_SCOPE = svcScope("directory");

export interface DirectoryEntry {
  appId: string;
  name: string;
  /** Vanity slug — `manifest.slug ?? manifest.name` so every row has one. */
  slug: string;
  workspaceId: string;
  title?: string;
  description?: string;
  /** Custom icon from last-reconciled yaml; undefined → UI fallback. */
  icon?: string;
  requires?: AppRequirement[];
  liveRelease?: string;
  updatedAt: string;
}

/** Reject the reserved deployment tenant as a caller workspace id. */
export function assertNotDeploymentTenant(workspaceId: string): void {
  if (workspaceId === DEPLOYMENT_TENANT) {
    throw new ServiceError(
      `"${DEPLOYMENT_TENANT}" is a reserved deployment scope and cannot be used as a workspace id`,
      400,
    );
  }
}

function toEntry(workspaceId: string, manifest: AppManifest): DirectoryEntry {
  return {
    appId: manifest.appId,
    name: manifest.name,
    slug: manifest.slug ?? manifest.name,
    workspaceId,
    title: manifest.title,
    description: manifest.description,
    icon: manifest.declared?.icon,
    requires: manifest.requires,
    liveRelease: manifest.channels?.[DEFAULT_CHANNEL],
    updatedAt: manifest.updatedAt,
  };
}

/** Release a deployment-wide global slug claim held by this app (no-op if none). */
async function releaseAppGlobalClaim(manifest: AppManifest): Promise<void> {
  const slug = manifest.slug ?? manifest.name;
  if (!slug) return;
  await releaseGlobalSlug(slug, manifest.appId);
}

/** Sync directory row; prefer VCS channel resolution when available. */
export async function syncDirectoryEntry(
  workspaceId: string,
  manifest: AppManifest,
): Promise<void> {
  assertNotDeploymentTenant(workspaceId);
  if ((manifest.visibility ?? "private") !== "public") {
    await dropDirectoryEntry(manifest.appId);
    // Unpublish releases the global vanity claim (spec app-slug).
    await releaseAppGlobalClaim(manifest);
    return;
  }
  const live = await resolveRelease(workspaceId, manifest.appId, DEFAULT_CHANNEL).catch(
    () => undefined,
  );
  const entry: DirectoryEntry = {
    ...toEntry(workspaceId, manifest),
    liveRelease: live?.releaseId ?? manifest.channels?.[DEFAULT_CHANNEL],
  };
  await writeSvcRecord(DEPLOYMENT_TENANT, DIRECTORY_SCOPE, manifest.appId, entry);
}

export async function dropDirectoryEntry(appId: string): Promise<void> {
  await deleteSvcRecord(DEPLOYMENT_TENANT, DIRECTORY_SCOPE, appId);
}

export async function readDirectoryEntry(
  appId: string,
): Promise<DirectoryEntry | undefined> {
  return readSvcRecord<DirectoryEntry>(DEPLOYMENT_TENANT, DIRECTORY_SCOPE, appId).catch(
    () => undefined,
  );
}

export async function listDirectoryIndex(): Promise<DirectoryEntry[]> {
  const entries = await listSvcRecords<DirectoryEntry>(DEPLOYMENT_TENANT, DIRECTORY_SCOPE);
  return entries.map((entry) => entry.value);
}

/**
 * Merge the deployment public index with the caller's own apps (including
 * private). Own apps win on appId collision so local metadata stays freshest.
 */
export async function listDirectoryForWorkspace(
  workspaceId: string,
): Promise<DirectoryEntry[]> {
  assertNotDeploymentTenant(workspaceId);
  const [index, own] = await Promise.all([
    listDirectoryIndex(),
    listApps(workspaceId),
  ]);
  const byId = new Map<string, DirectoryEntry>();
  for (const entry of index) {
    byId.set(entry.appId, entry);
  }
  for (const manifest of own) {
    byId.set(manifest.appId, toEntry(workspaceId, manifest));
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}
