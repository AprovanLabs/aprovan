/**
 * IW-9 B stream 9 — install flow, hosting picker, promote-out, update affordance.
 *
 * Wired to stream 6 procedures: `apps.install`, `apps.promote`,
 * `apps.updateCheck`, `apps.applyUpdate`. Mount from the apps management /
 * directory surfaces (sidebar IA is stream 8).
 */

export {
  hostingBuckets,
  hostedDisclosure,
  MANAGED_DISCLOSURE,
  needsHostingPick,
  soleHostingBucket,
  type HostingBucket,
  type HostModeDecl,
} from "./hosting";

export {
  classifyInstallError,
  classifyPromoteError,
  isLocalEditsGuardMessage,
  isSlugCollisionMessage,
  parseDeclaredHostingOptions,
  type InstallErrorKind,
} from "./errors";

export { HostingModePicker, type HostingModePickerProps } from "./HostingModePicker";

export {
  InstallDialog,
  type InstallAppTarget,
  type InstallDialogProps,
} from "./InstallDialog";

export { PromoteDialog, type PromoteDialogProps } from "./PromoteDialog";

export {
  UpdateAvailable,
  type UpdateAvailableProps,
  type UpdateCheckResult,
} from "./UpdateAvailable";
