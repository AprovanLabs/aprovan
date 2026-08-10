/**
 * Slug shape rules, deployment-wide global slug claims, and workspace-slug
 * resolution. Streams 3 (reconcile) and 5 (URL scheme) depend on these
 * exports — see tech-plan T4/T6.
 */

import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";
import { DEPLOYMENT_TENANT, isAppId, type AppId } from "./identity.js";

/**
 * Same shape as `NAME_RE` in `apps/store.ts` (module-private there; this
 * stream cannot export it). Keep the literal identical so slug and app-name
 * rules cannot drift.
 */
const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/u;

const SLUGS_SCOPE = svcScope("slugs");
const WS_SLUGS_SCOPE = svcScope("wsSlugs");

export interface GlobalSlugClaim {
  appId: AppId;
  workspaceId: string;
  claimedAt: string;
}

export interface WorkspaceSlugRecord {
  workspaceId: string;
}

/** Reject malformed or ULID-shaped slugs (T4 — ULID check delegates to `isAppId`). */
export function assertValidSlug(slug: string): void {
  if (typeof slug !== "string" || !NAME_RE.test(slug)) {
    throw new ServiceError(`slug must match ${NAME_RE}`, 400);
  }
  if (isAppId(slug)) {
    throw new ServiceError("ULID-shaped slugs are reserved", 400);
  }
}

/**
 * Bind a free global vanity slug to `appId`. 409 when held by a different
 * app; idempotent when the same app already holds it.
 */
export async function claimGlobalSlug(
  slug: string,
  appId: AppId,
  workspaceId: string,
): Promise<void> {
  assertValidSlug(slug);
  const existing = await readSvcRecord<GlobalSlugClaim>(
    DEPLOYMENT_TENANT,
    SLUGS_SCOPE,
    slug,
  ).catch(() => undefined);
  if (existing && existing.appId !== appId) {
    throw new ServiceError(
      `Global slug "${slug}" is already held by app ${existing.appId}`,
      409,
    );
  }
  if (existing?.appId === appId) return;
  await writeSvcRecord(DEPLOYMENT_TENANT, SLUGS_SCOPE, slug, {
    appId,
    workspaceId,
    claimedAt: new Date().toISOString(),
  } satisfies GlobalSlugClaim);
}

/** Drop a claim; only the holding `appId` may release it. No-op when absent. */
export async function releaseGlobalSlug(slug: string, appId: AppId): Promise<void> {
  const existing = await readSvcRecord<GlobalSlugClaim>(
    DEPLOYMENT_TENANT,
    SLUGS_SCOPE,
    slug,
  ).catch(() => undefined);
  if (!existing) return;
  if (existing.appId !== appId) {
    throw new ServiceError(
      `Global slug "${slug}" is held by app ${existing.appId}`,
      403,
    );
  }
  await deleteSvcRecord(DEPLOYMENT_TENANT, SLUGS_SCOPE, slug);
}

/** Resolve a global vanity slug; undefined when unclaimed. */
export async function resolveGlobalSlug(
  slug: string,
): Promise<{ appId: AppId; workspaceId: string } | undefined> {
  const claim = await readSvcRecord<GlobalSlugClaim>(
    DEPLOYMENT_TENANT,
    SLUGS_SCOPE,
    slug,
  ).catch(() => undefined);
  if (!claim?.appId || !claim.workspaceId) return undefined;
  return { appId: claim.appId, workspaceId: claim.workspaceId };
}

/**
 * Resolve a workspace vanity slug under `svc#wsSlugs`. Resolver only — F4
 * never writes entries; unresolved returns undefined.
 */
export async function resolveWorkspaceSlug(
  wsSlug: string,
): Promise<{ workspaceId: string } | undefined> {
  const rec = await readSvcRecord<WorkspaceSlugRecord>(
    DEPLOYMENT_TENANT,
    WS_SLUGS_SCOPE,
    wsSlug,
  ).catch(() => undefined);
  if (!rec?.workspaceId) return undefined;
  return { workspaceId: rec.workspaceId };
}
