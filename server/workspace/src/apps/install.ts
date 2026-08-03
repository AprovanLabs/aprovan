/**
 * Install records — interim pre-stream-3 shape.
 *
 * Stream 3 rewrites this to ULID-keyed `svc#installs / <installId>` with pins,
 * bindings, and lineage. Until then installs remain name-keyed under
 * `svc#apps#installed` for the existing install/uninstall procedures; session
 * partitions always use the origin `appId` (dataScope is gone).
 */

import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { workspacePath, type AppManifest, type AppPaths } from "./store.js";

const INSTALLED_SCOPE = svcScope("apps", "installed");

export interface AppInstall {
  /** Workspace id that published the app. */
  owner: string;
  name: string;
  /** Release id pinned at install time (null when the app has no releases). */
  release: string | null;
  /** Prefix in the installing workspace holding authored fork material (stream 3). */
  prefix: string;
  installedAt: string;
}

/** Stable key for an (owner, name) pair. */
function installKey(owner: string, name: string): string {
  return `${owner.replace(/[^A-Za-z0-9_-]/gu, "_")}.${name}`;
}

/** Default install prefix: the app's own folder in the caller's workspace. */
export function defaultInstallPrefix(name: string): string {
  return `apps/${name}`;
}

export function installPrefix(value: unknown, name: string): string {
  if (value === undefined || value === null || value === "") {
    return defaultInstallPrefix(name);
  }
  return workspacePath(value, "prefix");
}

export async function readInstall(
  workspaceId: string,
  owner: string,
  name: string,
): Promise<AppInstall | undefined> {
  return readSvcRecord<AppInstall>(workspaceId, INSTALLED_SCOPE, installKey(owner, name)).catch(
    () => undefined,
  );
}

export async function saveInstall(workspaceId: string, install: AppInstall): Promise<void> {
  await writeSvcRecord(
    workspaceId,
    INSTALLED_SCOPE,
    installKey(install.owner, install.name),
    install,
  );
}

export async function removeInstall(
  workspaceId: string,
  owner: string,
  name: string,
): Promise<boolean> {
  return deleteSvcRecord(workspaceId, INSTALLED_SCOPE, installKey(owner, name));
}

export async function listInstalls(workspaceId: string): Promise<AppInstall[]> {
  const entries = await listSvcRecords<AppInstall>(workspaceId, INSTALLED_SCOPE);
  return entries.map((entry) => entry.value);
}

/**
 * Path binding for an installed session: authored paths use the install
 * prefix; partition roots still derive from the origin `appId` until stream 3
 * mints installIds.
 */
export function installedScope(manifest: AppManifest, install: AppInstall): AppPaths {
  return { id: manifest.appId, name: manifest.name, paths: [install.prefix] };
}

/** Install is available for any published app (dataScope deleted). */
export function assertInstallable(_manifest: AppManifest): void {
  // Stream 3 replaces this with visibility / dependency checks.
}
