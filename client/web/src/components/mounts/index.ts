/**
 * Mounts management UI — list/add/remove via `vcs.mounts.*`, read-only tree
 * badges, and distinct overlap (409) / unreachable (400) inline errors.
 */

export { AddMountForm } from "./AddMountForm";
export { classifyMountError, listMounts, addMount, removeMount } from "./api";
export {
  buildMountTitleMap,
  formatMountBackend,
  formatPinnedRef,
  isUnderMount,
  MOUNT_READONLY_TITLE,
} from "./format";
export { MountErrorAlert } from "./MountErrorAlert";
export { MountReadOnlyBadge } from "./MountReadOnlyBadge";
export { MountsPanel, ensureMountsLoaded } from "./MountsPanel";
export { MountsTable } from "./MountsTable";
export {
  validateGitDraft,
  validateMountPrefix,
  validateS3Draft,
} from "./prefix";
export { RemoveMountDialog } from "./RemoveMountDialog";
export { mountsStore } from "./store";
export { useMounts, useMountTreeTitles } from "./useMounts";
export type {
  GitMountDraft,
  MountBackendType,
  MountDraft,
  MountFormError,
  MountFormErrorKind,
  S3MountDraft,
  VfsMountRecord,
} from "./types";
export { MountsApiError } from "./types";
