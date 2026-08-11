/**
 * Validated `vcs.mounts` procedures over the existing mounts engine
 * (tech-plan D7 / iw9-b stream 5).
 *
 * The engine (`vcs/mounts.ts`) stays untouched: these helpers validate prefix
 * shape, root/mount overlap, reserved backends, and app-root targets, then
 * delegate to `readMounts` / `addMount` / `removeMount`. App-scoped mounts are
 * ordinary workspace mounts whose prefix lies under an app root — no second
 * store; reads go through {@link appPathAllowed}.
 */

import { assertRootAvailable } from "../apps/roots.js";
import {
  appPathAllowed,
  listApps,
  workspacePath,
  type AppManifest,
  type AppPaths,
} from "../apps/store.js";
import { normalizeFsPath } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  addMount as engineAddMount,
  readMounts,
  removeMount as engineRemoveMount,
  type VfsMount,
} from "./mounts.js";

const overlaps = (a: string, b: string): boolean =>
  a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);

/** App whose root strictly contains `prefix` (app-scoped mount), if any. */
export async function findAppScopedOwner(
  workspaceId: string,
  prefix: string,
): Promise<AppManifest | undefined> {
  const apps = await listApps(workspaceId);
  return apps.find((app) => {
    const root = app.root ?? app.paths?.[0];
    return Boolean(root && prefix.startsWith(`${root}/`));
  });
}

/**
 * Reject backends that point at an app root (D19: apps never mount apps).
 * Workspace-path backends under `apps/` are the concrete case today; git/s3
 * configs that explicitly name a workspace path are caught the same way.
 */
async function assertNotAppRootTarget(
  workspaceId: string,
  config: Record<string, unknown>,
): Promise<void> {
  const candidates: string[] = [];
  for (const key of ["workspacePath", "localPath", "source", "target"] as const) {
    const value = config[key];
    if (typeof value === "string" && value.trim()) candidates.push(value);
  }
  // Bare workspace-path backend: `path` under apps/ without a git/s3 anchor.
  if (
    typeof config["path"] === "string" &&
    config["path"].trim() &&
    !config["repo"] &&
    !config["bucket"]
  ) {
    candidates.push(config["path"]);
  }
  if (candidates.length === 0) return;

  const apps = await listApps(workspaceId);
  for (const raw of candidates) {
    const path = normalizeFsPath(raw);
    if (!path) continue;
    for (const app of apps) {
      const root = app.root ?? app.paths?.[0];
      if (!root) continue;
      if (overlaps(path, root)) {
        throw new ServiceError(
          `Mount target "${path}" is an app root — shared content must be an external backend both parties mount, never an app`,
          400,
        );
      }
    }
    if (path === "apps" || path.startsWith("apps/")) {
      throw new ServiceError(
        `Mount target "${path}" is under Apps/ — shared content must be an external backend both parties mount, never an app`,
        400,
      );
    }
  }
}

export async function listMounts(workspaceId: string): Promise<VfsMount[]> {
  return readMounts(workspaceId);
}

export async function addMount(
  workspaceId: string,
  userId: string,
  options: {
    prefix: string;
    type: string;
    config: Record<string, unknown>;
    mode?: string;
  },
): Promise<VfsMount> {
  const prefix = workspacePath(options.prefix, "prefix");
  if (prefix.startsWith(".")) {
    throw new ServiceError("prefix must not be hidden", 400);
  }

  if (options.type === "crdt") {
    throw new ServiceError(
      'Mount type "crdt" is reserved — no provider is implemented yet (see docs/vcs-and-sessions.md)',
      501,
    );
  }

  await assertNotAppRootTarget(workspaceId, options.config);

  // App-scoped mounts lie under an app root — except that owner so D2's
  // containment check still runs against every other app. Workspace mounts
  // (and exact-root / parent-of-root prefixes) go through the full check.
  const owner = await findAppScopedOwner(workspaceId, prefix);
  await assertRootAvailable(workspaceId, prefix, owner?.appId);

  return engineAddMount(workspaceId, userId, {
    prefix,
    type: options.type,
    config: options.config,
    ...(options.mode !== undefined ? { mode: options.mode } : {}),
  });
}

export async function removeMount(workspaceId: string, prefix: string): Promise<boolean> {
  const normalized = workspacePath(prefix, "prefix");
  return engineRemoveMount(workspaceId, normalized);
}

/**
 * Whether an app session may read `path` when it sits under an app-scoped
 * mount — ordinary single-root {@link appPathAllowed}, no second authz path.
 */
export function appScopedMountPathAllowed(app: AppPaths, path: string): boolean {
  return appPathAllowed(app, path);
}
