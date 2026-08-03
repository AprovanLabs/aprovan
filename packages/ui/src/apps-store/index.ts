/**
 * `@aprovan/ui/apps-store` — the Apps/Workflows data plane, shared by every
 * host that renders an apps surface (the registry web app's `AppsPanel`,
 * patchwork chat's sidebar explorer and preview pane, and whatever mounts one
 * next).
 *
 * This is deliberately data-only: transport types, wire normalisers, the
 * "three ways data is reached" capability model, and the grouped catalog
 * store. Presentation — the rendered list, rows, tabs, and detail panes —
 * lives in `@aprovan/registry-ui`, which depends on this package and
 * re-exports the moved types from its existing import paths so its own public
 * API doesn't move.
 *
 * Plain React context/hooks throughout; no transport of its own beyond the
 * `ToolsInvoke` function a host supplies.
 */

export {
  // Transport
  attempt,
  type Attempt,
  type ToolsInvoke,
  // Coercion primitives
  asArray,
  asNumber,
  asRecord,
  asString,
  asStringList,
  unwrapList,
  // Workflows
  normalizeRunSummary,
  normalizeRunTrace,
  normalizeWorkflow,
  type RunStatus,
  type WorkflowRunSummary,
  type WorkflowRunTrace,
  type WorkflowSummary,
  type WorkflowTriggers,
  // Cascades (workflows.tree)
  normalizeTraceTree,
  type TraceRunNode,
  // Apps
  normalizeApp,
  normalizeRequirement,
  normalizeRequirements,
  normalizePin,
  type AppRateLimit,
  type AppRequirement,
  type AppRoles,
  type AppSummary,
  type AppPin,
  type DataScope,
  // Installations and directory
  installBindingsReady,
  normalizeDirectory,
  normalizeDirectoryEntry,
  normalizeInstall,
  normalizeInstalls,
  type DirectoryEntry,
  type InstallSummary,
  // Releases and channels
  normalizeChannels,
  normalizeRelease,
  normalizeReleases,
  type AppChannel,
  type AppRelease,
  // Capabilities — "three ways data is reached"
  NATIVE_APP_NAMESPACES,
  deriveCapabilities,
  mergeCapabilities,
  type AppDependencyStatus,
  type CapabilityModel,
  type CapabilityReach,
  type ReachKind,
  // Allow-list entries, classified — the tier model applied to one entry
  classifyToolEntry,
  type ToolEntryInfo,
  type ToolEntryTier,
  // Versions
  normalizeVersions,
  type FileVersion,
} from "./wire";

export {
  AppsCatalogProvider,
  PRIVATE_FLOWS_GROUP_ID,
  useAppsCatalog,
  useSharedAppsCatalog,
  /** @deprecated see {@link PRIVATE_FLOWS_GROUP_ID} — kept for older persisted state. */
  WORKSPACE_GROUP_ID,
  type AppsCatalog,
  type AppsCatalogProviderProps,
  type AppsSelection,
  type CatalogGroup,
} from "./catalog";

export { LastRunProvider, useLastRun, useRecordRun } from "./last-runs";
