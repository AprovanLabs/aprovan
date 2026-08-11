import type { VfsMountRecord } from "./types";

/** Human backend label for the mounts table. */
export function formatMountBackend(mount: VfsMountRecord): string {
  const cfg = mount.config;
  if (mount.type === "git") {
    const repo = typeof cfg["repo"] === "string" ? cfg["repo"] : "?";
    const path = typeof cfg["path"] === "string" && cfg["path"] ? `/${cfg["path"]}` : "";
    return `${repo}${path}`;
  }
  if (mount.type === "s3") {
    const bucket = typeof cfg["bucket"] === "string" ? cfg["bucket"] : "?";
    const prefix = typeof cfg["prefix"] === "string" && cfg["prefix"] ? `/${cfg["prefix"]}` : "";
    return `s3://${bucket}${prefix}`;
  }
  return mount.type;
}

/** Pinned ref (git) or version/prefix hint (s3). */
export function formatPinnedRef(mount: VfsMountRecord): string {
  const cfg = mount.config;
  if (mount.type === "git") {
    return typeof cfg["ref"] === "string" && cfg["ref"] ? cfg["ref"] : "—";
  }
  if (mount.type === "s3") {
    if (typeof cfg["versionId"] === "string" && cfg["versionId"]) return cfg["versionId"];
    if (typeof cfg["prefix"] === "string" && cfg["prefix"]) return cfg["prefix"];
    return "—";
  }
  return "—";
}

/** Tooltip / tree decoration title for a mounted prefix. */
export const MOUNT_READONLY_TITLE = "Mounted — read-only";

/**
 * Build path → title map for every mount prefix (exact path only). Tree hosts
 * pass this as `mountTitles` so the mount root shows a read-only badge.
 */
export function buildMountTitleMap(
  mounts: readonly VfsMountRecord[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const mount of mounts) {
    if (mount.prefix) map.set(mount.prefix, MOUNT_READONLY_TITLE);
  }
  return map;
}

/** True when `path` sits at or under a mount prefix. */
export function isUnderMount(
  path: string,
  mounts: readonly VfsMountRecord[],
): boolean {
  return mounts.some(
    (mount) => path === mount.prefix || path.startsWith(`${mount.prefix}/`),
  );
}
