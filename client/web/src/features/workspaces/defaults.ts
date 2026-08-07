/**
 * Proposed default for a local workspace VFS root.
 *
 * Always a subdirectory — never the home directory itself (local-first UX /
 * desktop-shell task 6.3). Display form uses `~` so the same string works in
 * the browser without calling into Node.
 */

/** Display path shown in the plain path input before the user picks. */
export const PROPOSED_WORKSPACE_ROOT = "~/Documents/Aprovan";

/**
 * Plain-language containment statement shown beside the directory field.
 * Matches the local-first workspace creation UX.
 */
export const WORKSPACE_ROOT_CONTAINMENT_STATEMENT =
  "This directory is the boundary — agents and widgets in this workspace can read and write inside it and nowhere else.";
