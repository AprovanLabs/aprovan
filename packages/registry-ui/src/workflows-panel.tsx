/**
 * WorkflowsPanel — the workflow management surface, kept for the hosts that
 * already render it.
 *
 * As of 0.4.0 this is a thin wrapper over {@link AppsPanel}: the panel's whole
 * machinery — the grouped catalog, the TailorFlow graph, the run form, run
 * history, per-run traces, cascade trees, the version log, and the app access
 * / release editors — lives in `./apps-panel` and its internals, so there is
 * one implementation rather than two that drift. Hosts that only pass
 * `invoke` get the implicit Personal group alone, which is exactly the flat
 * list they had before; hosts that also pass `invokeApps` get the published
 * app groups too.
 *
 * New surfaces should import `@aprovan/registry-ui/apps-panel` directly —
 * `AppsPanel` for the full master/detail view, `AppsExplorer` for the compact
 * sidebar list.
 */

import * as React from "react";
import { AppsPanel, type AppsInvoke } from "./apps-panel";

export type {
  AppChannel,
  AppRateLimit,
  AppRelease,
  AppRoles,
  AppSummary,
  AppsSelection,
  CapabilityModel,
  CapabilityReach,
  DataScope,
  FileVersion,
  RunStatus,
  TraceRunNode,
  WorkflowRunSummary,
  WorkflowRunTrace,
  WorkflowSummary,
  WorkflowTriggers,
} from "./apps-panel";

/** Legacy alias for the transport signature. */
export type WorkflowsInvoke = AppsInvoke;

export interface WorkflowsPanelProps {
  /** Gateway `workflows` tool namespace (POST /tools/workflows/:operation). */
  invoke: WorkflowsInvoke;
  /**
   * Optional transport for the gateway's `apps` tool namespace (POST
   * /tools/apps/:operation). When present, published apps become groups in
   * the list with their exported workflows nested beneath them.
   */
  invokeApps?: WorkflowsInvoke;
  /** Open the workflow's script in the host's editor, when available. */
  onOpenScript?: (path: string) => void;
  /**
   * Read a workflow's script from the workspace. When supplied, a selected
   * workflow renders as the flow graph with its run overlaid; without it the
   * run form renders alone.
   */
  loadScript?: (path: string) => Promise<string | null>;
  /** See `AppsPanelProps.onCreateWorkflow` — powers the "no workflows yet" empty states. */
  onCreateWorkflow?: (appName?: string) => void;
  /** See `AppsPanelProps.createWorkflowHref`. */
  createWorkflowHref?: string;
  className?: string;
}

export function WorkflowsPanel({
  invoke,
  invokeApps,
  onOpenScript,
  loadScript,
  onCreateWorkflow,
  createWorkflowHref,
  className,
}: WorkflowsPanelProps) {
  return (
    <AppsPanel
      className={className}
      invoke={invoke}
      title="Workflows"
      {...(invokeApps ? { invokeApps } : {})}
      {...(loadScript ? { loadScript } : {})}
      {...(onOpenScript ? { onOpenScript } : {})}
      {...(onCreateWorkflow ? { onCreateWorkflow } : {})}
      {...(createWorkflowHref ? { createWorkflowHref } : {})}
    />
  );
}
