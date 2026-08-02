/**
 * Install records — the caller side of `dataScope: "workspace"`.
 *
 * An owner-hosted app (`dataScope: "owner"`, the default) needs no install:
 * the publishing workspace stores everyone's partition. A workspace-scoped app
 * is a *template* — the code is published, the workspace is brought by the
 * user — so a caller records an install in their OWN workspace, under the
 * `svc#apps#installed` record scope:
 *
 *   svc#apps#installed / <owner>.<name>
 *     { owner, name, release, prefix, installedAt }
 *
 * With that record present, the app session's `appScope` resolves data and the
 * native namespaces into the *caller's* workspace under `<prefix>/data`, and
 * every execution uses the caller's credentials. Without one, behaviour is
 * unchanged: owner-hosted.
 */

import { ServiceError } from "../service-kernel.js";
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
  /** Prefix in the installing workspace holding the app's data. */
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
 * The path binding an installed session uses: the install prefix stands in for
 * the app's published folder, so `keyvalue` lands at `<prefix>/data/<key>` and
 * relative `vfs` paths resolve under `<prefix>/`.
 */
export function installedScope(manifest: AppManifest, install: AppInstall): AppPaths {
  return { name: manifest.name, paths: [install.prefix], dataScope: "workspace" };
}

/** Reject an install of an app that isn't a template. */
export function assertInstallable(manifest: AppManifest): void {
  if ((manifest.dataScope ?? "owner") !== "workspace") {
    throw new ServiceError(
      `App ${manifest.name} is owner-hosted (dataScope "owner") — its data lives in the publishing workspace, so there is nothing to install. Open it instead.`,
      400,
    );
  }
}
