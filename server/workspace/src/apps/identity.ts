/**
 * App identity — ULID minting and the mutable name→appId alias index.
 *
 * Every other apps module takes an `appId`/`installId` and never parses names.
 * Service procedures and live routes call {@link resolveAppRef} once at the
 * edge; rename is an alias move that rewrites no storage keys.
 */

import { isValid, ulid } from "ulid";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

export type AppId = string;
export type InstallId = string;

const ALIAS_SCOPE = svcScope("apps", "alias");

export interface AppAliasRecord {
  appId: AppId;
}

export function mintAppId(): AppId {
  return ulid();
}

export function mintInstallId(): InstallId {
  return ulid();
}

/** True when `ref` is a well-formed ULID (passthrough for resolve). */
export function isAppId(ref: string): boolean {
  return isValid(ref);
}

/**
 * ULID passthrough, or (workspaceId, name) alias lookup. Throws 404 on miss.
 */
export async function resolveAppRef(workspaceId: string, ref: string): Promise<AppId> {
  if (!ref) throw new ServiceError("Unknown app", 404);
  if (isAppId(ref)) return ref;
  const alias = await readSvcRecord<AppAliasRecord>(workspaceId, ALIAS_SCOPE, ref).catch(
    () => undefined,
  );
  if (!alias?.appId) throw new ServiceError(`Unknown app: ${ref}`, 404);
  return alias.appId;
}

/** Look up a name→appId binding without throwing. */
export async function readAlias(
  workspaceId: string,
  name: string,
): Promise<AppAliasRecord | undefined> {
  return readSvcRecord<AppAliasRecord>(workspaceId, ALIAS_SCOPE, name).catch(() => undefined);
}

/**
 * Bind `name` → `appId`. 409 when the name is already held by a different app.
 * Idempotent when the same appId already owns the name.
 */
export async function setAlias(
  workspaceId: string,
  name: string,
  appId: AppId,
): Promise<void> {
  const existing = await readAlias(workspaceId, name);
  if (existing && existing.appId !== appId) {
    throw new ServiceError(
      `App name "${name}" is already held by app ${existing.appId}`,
      409,
    );
  }
  if (existing?.appId === appId) return;
  await writeSvcRecord(workspaceId, ALIAS_SCOPE, name, { appId } satisfies AppAliasRecord);
}

export async function dropAlias(workspaceId: string, name: string): Promise<void> {
  await deleteSvcRecord(workspaceId, ALIAS_SCOPE, name);
}

/**
 * Deployment-wide reverse index so `/apps/id/:appId` can find the owning
 * workspace without a cross-tenant scan. Stream 3's directory reuses the
 * same reserved tenant.
 */
export const DEPLOYMENT_TENANT = "__deployment__";
const BY_ID_SCOPE = svcScope("apps", "byId");

export interface AppLocationRecord {
  workspaceId: string;
  name: string;
}

export async function indexAppLocation(
  workspaceId: string,
  appId: AppId,
  name: string,
): Promise<void> {
  await writeSvcRecord(DEPLOYMENT_TENANT, BY_ID_SCOPE, appId, {
    workspaceId,
    name,
  } satisfies AppLocationRecord);
}

export async function dropAppLocation(appId: AppId): Promise<void> {
  await deleteSvcRecord(DEPLOYMENT_TENANT, BY_ID_SCOPE, appId);
}

/** Resolve an appId to its owning workspace (404 when unknown). */
export async function resolveAppLocation(appId: string): Promise<AppLocationRecord> {
  if (!isAppId(appId)) throw new ServiceError("Unknown app", 404);
  const loc = await readSvcRecord<AppLocationRecord>(DEPLOYMENT_TENANT, BY_ID_SCOPE, appId).catch(
    () => undefined,
  );
  if (!loc?.workspaceId) throw new ServiceError(`Unknown app: ${appId}`, 404);
  return loc;
}

/**
 * Workspace-scoped root → appId binding (T8). Unconditional read/write/delete —
 * no self-guard; reconcileApp owns all foreign-id / collision checks before
 * calling these.
 */
const ROOT_SCOPE = svcScope("apps", "root");

export interface AppRootBinding {
  appId: AppId;
}

export async function readRootBinding(
  workspaceId: string,
  root: string,
): Promise<AppRootBinding | undefined> {
  return readSvcRecord<AppRootBinding>(workspaceId, ROOT_SCOPE, root).catch(() => undefined);
}

export async function bindRoot(
  workspaceId: string,
  root: string,
  appId: AppId,
): Promise<void> {
  await writeSvcRecord(workspaceId, ROOT_SCOPE, root, { appId } satisfies AppRootBinding);
}

export async function dropRootBinding(workspaceId: string, root: string): Promise<void> {
  await deleteSvcRecord(workspaceId, ROOT_SCOPE, root);
}
