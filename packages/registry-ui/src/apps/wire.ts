/**
 * Wire types and defensive normalisers for the Apps / Workflows surfaces.
 *
 * Moved to `@aprovan/ui/apps-store` (2026-07-24) so the data plane is shared
 * with any other host that renders an Apps surface, not just this package.
 * This file re-exports the same names so registry-ui's own modules — which
 * import `./wire` throughout — never had to change, and so a consumer that
 * (still) imports `@aprovan/registry-ui/apps-panel` sees the identical
 * exported type and function set it always has.
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
  type AppPin,
  type AppRateLimit,
  type AppRequirement,
  type AppRoles,
  type AppSummary,
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
} from "@aprovan/ui/apps-store";
