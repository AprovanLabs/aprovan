/**
 * Single reconcile entry point — first-sight mint, foreign/duplicate-id
 * rejection, slug-collision 409, and rename-as-`mv`. Subsumes the four-write
 * `saveApp` fan-out for identity-bearing records (tech-plan T3/T8).
 */

import { ServiceError } from "../service-kernel.js";
import {
  bindRoot,
  dropAlias,
  dropRootBinding,
  indexAppLocation,
  mintAppId,
  readAlias,
  readRootBinding,
  resolveAppLocation,
  setAlias,
  type AppId,
} from "./identity.js";
import type { AppYaml } from "./manifest.js";
import { assertValidSlug } from "./slugs.js";
import {
  ENTRY_CANDIDATES,
  hydrateAppRecord,
  readApp,
  saveApp,
  type AppManifest,
  type AppRecord,
} from "./store.js";

export interface ReconcileInput {
  workspaceId: string;
  /** App-root workspace path (basename = slug). */
  root: string;
  /** Already loaded/validated authored snapshot. */
  yaml: AppYaml;
  /** Callers that think they know; mismatch = 400, never adopt. */
  expectedAppId?: AppId;
  /** Sub for createdBy/audit. */
  actor: string;
}

export interface ReconcileResult {
  appId: AppId;
  created: boolean;
  changed: boolean;
}

function rootBasename(root: string): string {
  const trimmed = root.replace(/\/+$/u, "");
  const cut = trimmed.lastIndexOf("/");
  return cut < 0 ? trimmed : trimmed.slice(cut + 1);
}

function declaredEqual(a: AppYaml | undefined, b: AppYaml): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function foreignIdError(root: string, appId: string): ServiceError {
  return new ServiceError(
    `Foreign or duplicate app id ${appId} for root ${root}`,
    400,
  );
}

/** 409 when `slug` is held by a different app — check before any writes. */
async function assertSlugAvailable(
  workspaceId: string,
  slug: string,
  appId: AppId,
): Promise<void> {
  const existing = await readAlias(workspaceId, slug);
  if (existing && existing.appId !== appId) {
    throw new ServiceError(
      `App name "${slug}" is already held by app ${existing.appId}`,
      409,
    );
  }
}

/** Validate directory-basename slug rules shared by every reconcile path. */
function resolveSlug(root: string, yaml: AppYaml): string {
  const slug = rootBasename(root);
  if (yaml.slug !== undefined && yaml.slug !== slug) {
    throw new ServiceError(
      `slug "${yaml.slug}" does not match directory basename "${slug}"; ` +
        `the directory name is authoritative`,
      400,
    );
  }
  assertValidSlug(slug);
  return slug;
}

function projectFromYaml(
  base: Pick<AppManifest, "appId" | "createdBy" | "createdAt"> &
    Partial<AppManifest>,
  root: string,
  slug: string,
  yaml: AppYaml,
  updatedAt: string,
): AppRecord {
  return hydrateAppRecord({
    ...base,
    name: slug,
    slug,
    root,
    declared: yaml,
    title: yaml.title,
    description: yaml.description,
    requires: yaml.requires,
    allowedTools: yaml.capabilities ?? base.allowedTools ?? [],
    entry: base.entry || `${root}/${ENTRY_CANDIDATES[0]}`,
    paths: [root],
    updatedAt,
  });
}

/**
 * Reconcile an app root against the platform record. See tech-plan
 * `reconcileApp` algorithm (first-sight / rename / update / guards).
 */
export async function reconcileApp(input: ReconcileInput): Promise<ReconcileResult> {
  const { workspaceId, root, yaml, expectedAppId, actor } = input;
  const slug = resolveSlug(root, yaml);
  const binding = await readRootBinding(workspaceId, root);

  if (!binding) {
    if (expectedAppId) {
      return renameApp(workspaceId, root, slug, yaml, expectedAppId, actor);
    }
    return firstSight(workspaceId, root, slug, yaml, actor);
  }

  const appId = binding.appId;
  if (expectedAppId !== undefined && expectedAppId !== appId) {
    throw foreignIdError(root, expectedAppId);
  }

  const existing = await readApp(workspaceId, appId);
  if (!existing) {
    throw foreignIdError(root, appId);
  }

  // Guard: expectedAppId (or bound id) must not be owned by a different root.
  if (existing.root && existing.root !== root) {
    throw new ServiceError(
      `App id ${appId} is bound to root ${existing.root}, not ${root}`,
      400,
    );
  }

  const currentSlug = existing.slug ?? existing.name;
  if (declaredEqual(existing.declared, yaml) && currentSlug === slug) {
    return { appId, created: false, changed: false };
  }

  await assertSlugAvailable(workspaceId, slug, appId);
  const now = new Date().toISOString();
  const updated = projectFromYaml(existing, root, slug, yaml, now);
  await saveApp(workspaceId, updated);
  await bindRoot(workspaceId, root, appId);
  return { appId, created: false, changed: true };
}

async function firstSight(
  workspaceId: string,
  root: string,
  slug: string,
  yaml: AppYaml,
  actor: string,
): Promise<ReconcileResult> {
  const appId = mintAppId();
  await assertSlugAvailable(workspaceId, slug, appId);
  const now = new Date().toISOString();
  const record = projectFromYaml(
    { appId, createdBy: actor, createdAt: now, allowedTools: [] },
    root,
    slug,
    yaml,
    now,
  );
  await saveApp(workspaceId, record);
  await bindRoot(workspaceId, root, appId);
  return { appId, created: true, changed: true };
}

async function renameApp(
  workspaceId: string,
  newRoot: string,
  newSlug: string,
  yaml: AppYaml,
  expectedAppId: AppId,
  _actor: string,
): Promise<ReconcileResult> {
  let loc;
  try {
    loc = await resolveAppLocation(expectedAppId);
  } catch (err) {
    if (err instanceof ServiceError && err.status === 404) {
      throw foreignIdError(newRoot, expectedAppId);
    }
    throw err;
  }
  if (loc.workspaceId !== workspaceId) {
    throw foreignIdError(newRoot, expectedAppId);
  }

  const existing = await readApp(workspaceId, expectedAppId);
  if (!existing) {
    throw foreignIdError(newRoot, expectedAppId);
  }

  // Collision check before any rebind writes.
  await assertSlugAvailable(workspaceId, newSlug, expectedAppId);

  const oldRoot = existing.root;
  const oldSlug = existing.slug ?? existing.name;
  const now = new Date().toISOString();
  const updated = projectFromYaml(existing, newRoot, newSlug, yaml, now);

  // Alias move: bind new first, then drop old.
  await setAlias(workspaceId, newSlug, expectedAppId);
  if (oldSlug && oldSlug !== newSlug) {
    await dropAlias(workspaceId, oldSlug);
  }
  await indexAppLocation(workspaceId, expectedAppId, newSlug);
  await bindRoot(workspaceId, newRoot, expectedAppId);
  if (oldRoot && oldRoot !== newRoot) {
    await dropRootBinding(workspaceId, oldRoot);
  }
  // Persist record + directory via saveApp (setAlias/index are idempotent now).
  await saveApp(workspaceId, updated);
  return { appId: expectedAppId, created: false, changed: true };
}
