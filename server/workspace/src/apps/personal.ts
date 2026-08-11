/**
 * Personal app — lazy-created ordinary app row + promote-out (tech-plan D3).
 *
 * Personal is a real stored manifest (slug `personal`, root `apps/personal`),
 * recognized by slug at this one creation site only. The old synthesized
 * Personal helpers and prefix literals stay deleted (grep gate in the brief).
 *
 * Promote-out is copy → mint → delete-source-last. There is no VFS move
 * primitive; failure before the delete rolls back the copy (and any minted
 * row) so the source subtree stays intact.
 *
 * F4 `reconcileApp` is not on main yet. First-sight mint uses {@link saveApp}
 * (same documented pattern as stream 1 publish). When F4-3 lands, replace the
 * `saveApp` call sites below with `reconcileApp`.
 */

import { getFsStore, listAll } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import { mintAppId, readAlias } from "./identity.js";
import { loadAppYaml } from "./manifest.js";
import { assertRootAvailable } from "./roots.js";
import {
  ENTRY_CANDIDATES,
  appName,
  hydrateAppRecord,
  readApp,
  removeApp,
  resolveAppEntry,
  saveApp,
  workspacePath,
  type AppRecord,
} from "./store.js";

/** Platform slug / alias for the Personal app — recognized only here. */
const PERSONAL_SLUG = "personal";

/** FS root for Personal (`apps/<slug>`; product spelling is Apps/personal). */
const PERSONAL_ROOT = `apps/${PERSONAL_SLUG}`;

const DEFAULT_ALLOWED_TOOLS = ["vfs.*", "keyvalue.*"] as const;

/**
 * Return the workspace's Personal app row, creating it lazily on first need.
 * Idempotent: concurrent callers that lose the alias race re-read the winner.
 */
export async function ensurePersonalApp(
  workspaceId: string,
  actor: string,
): Promise<AppRecord> {
  const existing = await readPersonal(workspaceId);
  if (existing) return existing;

  await assertRootAvailable(workspaceId, PERSONAL_ROOT);
  const now = new Date().toISOString();
  const manifest = hydrateAppRecord({
    appId: mintAppId(),
    name: PERSONAL_SLUG,
    slug: PERSONAL_SLUG,
    title: "Personal",
    root: PERSONAL_ROOT,
    entry: `${PERSONAL_ROOT}/${ENTRY_CANDIDATES[0]}`,
    paths: [PERSONAL_ROOT],
    allowedTools: [...DEFAULT_ALLOWED_TOOLS],
    visibility: "private",
    createdBy: actor,
    createdAt: now,
    updatedAt: now,
  });

  try {
    // Swap site: F4 reconcileApp (first-sight mint) — use saveApp until F4-3.
    await saveApp(workspaceId, manifest);
    return manifest;
  } catch (err) {
    // Lost a create race — the alias is held; return the winner's row.
    if (err instanceof ServiceError && err.status === 409) {
      const winner = await readPersonal(workspaceId);
      if (winner) return winner;
    }
    throw err;
  }
}

export interface PromoteAppInput {
  workspaceId: string;
  /** VFS subtree to promote (typically under `apps/personal/…`). */
  source: string;
  /** Vanity slug for the new app root (`apps/<slug>`). */
  slug: string;
  actor: string;
  /**
   * @internal Test seam — invoked after the new app is minted, before the
   * source subtree is deleted. Throw to simulate mid-promote failure.
   */
  __beforeDelete?: () => Promise<void>;
}

/**
 * Promote a VFS subtree into a standalone app: assert root free → copy to
 * `apps/<slug>` → mint via saveApp (F4 first-sight) → delete source last.
 */
export async function promoteApp(input: PromoteAppInput): Promise<AppRecord> {
  const workspaceId = input.workspaceId;
  const slug = appName(input.slug);
  const source = workspacePath(input.source, "source");
  const root = `apps/${slug}`;

  if (source === root || source.startsWith(`${root}/`) || root.startsWith(`${source}/`)) {
    throw new ServiceError(
      `Cannot promote "${source}" onto overlapping root "${root}"`,
      400,
    );
  }

  await assertRootAvailable(workspaceId, root);
  const collision = await readAlias(workspaceId, slug);
  if (collision) {
    throw new ServiceError(
      `App name "${slug}" is already held by app ${collision.appId}`,
      409,
    );
  }

  const store = getFsStore();
  const entries = await listAll(store, workspaceId, source);
  if (entries.length === 0) {
    throw new ServiceError(`Nothing to promote at ${source}`, 400);
  }

  let copied = false;
  let minted: AppRecord | undefined;

  try {
    // Clear any orphan dest tree left by a prior crashed promote (tech-plan).
    await store.removePrefix(workspaceId, root);

    for (const entry of entries) {
      const relative =
        entry.path === source
          ? ""
          : entry.path.slice(source.length).replace(/^\//, "");
      const dest = relative ? `${root}/${relative}` : root;
      const file = await store.read(workspaceId, entry.path);
      if (!file) continue;
      await store.write(workspaceId, dest, file.content, file.mimeType);
    }
    copied = true;

    const entry = await resolveAppEntry(workspaceId, root).catch(
      () => `${root}/${ENTRY_CANDIDATES[0]}`,
    );
    const yaml = await loadRootYamlProjection(workspaceId, root);
    const now = new Date().toISOString();
    minted = hydrateAppRecord({
      appId: mintAppId(),
      name: slug,
      slug,
      title: yaml.title ?? slug,
      description: yaml.description,
      root,
      entry,
      paths: [root],
      declared: yaml.declared,
      reconcile: yaml.reconcile,
      allowedTools: [...DEFAULT_ALLOWED_TOOLS],
      visibility: "private",
      createdBy: input.actor,
      createdAt: now,
      updatedAt: now,
    });

    // Swap site: F4 reconcileApp (first-sight mint) — use saveApp until F4-3.
    await saveApp(workspaceId, minted);

    if (input.__beforeDelete) await input.__beforeDelete();

    await store.removePrefix(workspaceId, source);
    return minted;
  } catch (err) {
    // Failure before source delete: drop the minted row (if any) and the copy
    // so the Personal subtree is unchanged and no orphan app remains.
    if (minted) {
      await removeApp(workspaceId, minted.appId).catch(() => undefined);
    }
    if (copied || minted) {
      await store.removePrefix(workspaceId, root).catch(() => undefined);
    }
    throw err;
  }
}

async function readPersonal(workspaceId: string): Promise<AppRecord | undefined> {
  const alias = await readAlias(workspaceId, PERSONAL_SLUG);
  if (!alias) return undefined;
  return readApp(workspaceId, alias.appId);
}

/** Soft-load `app.yaml` at the new root — invalid yaml does not abort promote. */
async function loadRootYamlProjection(
  workspaceId: string,
  root: string,
): Promise<{
  declared?: AppRecord["declared"];
  title?: string;
  description?: string;
  reconcile: NonNullable<AppRecord["reconcile"]>;
}> {
  const file = await getFsStore()
    .read(workspaceId, `${root}/app.yaml`)
    .catch(() => undefined);
  if (!file) return { reconcile: { status: "ok" } };
  const loaded = loadAppYaml(file.content);
  if (!loaded.ok) {
    return { reconcile: { status: "error", issues: loaded.issues } };
  }
  return {
    declared: loaded.value,
    title: loaded.value.title,
    description: loaded.value.description,
    reconcile: { status: "ok" },
  };
}
