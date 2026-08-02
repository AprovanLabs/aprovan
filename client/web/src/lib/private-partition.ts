/**
 * The caller's private partition in the file tree (registry specs
 * per-user-data): the gateway lists `.personal/data/<self>/…` — and ONLY the
 * caller's own partition, foreign partitions are never listed and 404 on
 * exact paths — so any entry under `.personal/data/` in a listing belongs to
 * the signed-in user. The chat tree renders that subtree as a top-level
 * "Private" section: display-name translation only, raw paths keep working
 * everywhere (tabs, URLs, the FS routes).
 *
 * Feature detection: an old gateway never lists the partition, so the
 * section simply doesn't render there. Once own-partition entries have been
 * seen, the root is remembered per workspace so an *emptied* partition still
 * shows the section with its visible-only-to-you hint instead of vanishing.
 */

export const PRIVATE_SECTION_LABEL = "Private";
export const PERSONAL_DATA_PREFIX = ".personal/data";

const ROOT_MEMORY_PREFIX = "patchwork:private-root";
/** Same storage key useTabs.ts owns — read-only here (module cycle avoidance). */
const ACTIVE_WORKSPACE_KEY = "patchwork:active-workspace";

function rootMemoryKey(): string {
  const workspaceId = localStorage.getItem(ACTIVE_WORKSPACE_KEY) ?? "";
  return workspaceId ? `${ROOT_MEMORY_PREFIX}:${workspaceId}` : ROOT_MEMORY_PREFIX;
}

/** `.personal/data/<sub>` from any own-partition entry in the listing. */
export function detectPrivateRoot(paths: readonly string[]): string | null {
  for (const path of paths) {
    if (!path.startsWith(`${PERSONAL_DATA_PREFIX}/`)) continue;
    const sub = path.slice(PERSONAL_DATA_PREFIX.length + 1).split("/", 1)[0];
    if (sub) return `${PERSONAL_DATA_PREFIX}/${sub}`;
  }
  return null;
}

/**
 * The private root for the current listing: detected from entries when the
 * partition has files, otherwise the remembered root (so an empty partition
 * keeps its section on gateways known to support it), otherwise null (old
 * gateway — no section, no error).
 */
export function resolvePrivateRoot(paths: readonly string[]): string | null {
  const detected = detectPrivateRoot(paths);
  if (detected) {
    try {
      localStorage.setItem(rootMemoryKey(), detected);
    } catch {
      // Memory is best-effort; detection still works per listing.
    }
    return detected;
  }
  try {
    return localStorage.getItem(rootMemoryKey());
  } catch {
    return null;
  }
}

/** Raw workspace path → display path (`.personal/data/<sub>/x` → `Private/x`). */
export function toDisplayPath(path: string, privateRoot: string | null): string {
  if (!privateRoot) return path;
  if (path === privateRoot) return PRIVATE_SECTION_LABEL;
  if (path.startsWith(`${privateRoot}/`)) {
    return `${PRIVATE_SECTION_LABEL}/${path.slice(privateRoot.length + 1)}`;
  }
  return path;
}

/** Display path → raw workspace path (`Private/x` → `.personal/data/<sub>/x`). */
export function fromDisplayPath(displayPath: string, privateRoot: string | null): string {
  if (!privateRoot) return displayPath;
  if (displayPath === PRIVATE_SECTION_LABEL) return privateRoot;
  if (displayPath.startsWith(`${PRIVATE_SECTION_LABEL}/`)) {
    return `${privateRoot}/${displayPath.slice(PRIVATE_SECTION_LABEL.length + 1)}`;
  }
  return displayPath;
}

/** Does the display listing contain any Private-section entries? */
export function hasPrivateEntries(displayPaths: readonly string[]): boolean {
  return displayPaths.some((path) => path.startsWith(`${PRIVATE_SECTION_LABEL}/`));
}
