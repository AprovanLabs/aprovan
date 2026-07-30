/**
 * The native-surface registry (registry/docs/native-surfaces.md): every
 * native service that presents itself as a built-in app declares one entry
 * here — identity (id/title/icon/description) plus its Panel component.
 *
 * capability = namespace, extended one step: namespace = app surface. The
 * sidebar's Workspace group, the `native://` content tabs, and the app
 * inspector's contextual tabs are all projections of this one list —
 * adding surface #7 is an entry here, not a UX negotiation.
 */

import { Activity, Bot, Box, Database, GitCompareArrows, Webhook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { AgentsPanel } from "../components/panels/AgentsPanel";
import { KeyValuePanel } from "../components/panels/KeyValuePanel";
import { SandboxesPanel } from "../components/panels/SandboxesPanel";
import { SyncPanel } from "../components/panels/SyncPanel";
import { TelemetryPanel } from "../components/panels/TelemetryPanel";
import { WebhooksPanel } from "../components/panels/WebhooksPanel";
import type { NativePanelProps } from "../components/panels/shell";

export interface NativeSurfaceDef {
  /** Stable id — used in the `native://<id>` tab key. */
  id: string;
  title: string;
  icon: LucideIcon;
  /** One line: row tooltip + pane header. */
  description: string;
  Panel: ComponentType<NativePanelProps>;
  /** Render as a contextual tab on app panes (receives `scope`). */
  appTab?: boolean;
}

/**
 * Order is the sidebar order (docs' inventory table). `appTab` is set only
 * where the panel actually does something with `scope` — Data describes the
 * app's partition, Activity filters traces to the app. Agents, Webhooks and
 * Sync are workspace-level registrations, so they stay off app panes.
 *
 * Icons mirror each panel's own header icon so a row and the pane it opens
 * read as the same thing.
 */
export const NATIVE_SURFACES: NativeSurfaceDef[] = [
  {
    id: "keyvalue",
    title: "Data",
    icon: Database,
    description: "Workspace key-value records: prefix query, JSON viewer/editor",
    Panel: KeyValuePanel,
    appTab: true,
  },
  {
    id: "agents",
    title: "Agents",
    icon: Bot,
    description: "Agent profiles, capability grants and their executions",
    Panel: AgentsPanel,
  },
  {
    id: "webhooks",
    title: "Webhooks",
    icon: Webhook,
    description: "Inbound URLs, delivery stats and the workflows they trigger",
    Panel: WebhooksPanel,
  },
  {
    id: "sync",
    title: "Sync",
    icon: GitCompareArrows,
    description: "source → transform → sink lineage, schedules and last runs",
    Panel: SyncPanel,
  },
  {
    id: "sandboxes",
    title: "Sandboxes",
    icon: Box,
    description: "Execution environments mounted from your workspace",
    Panel: SandboxesPanel,
    // Scoped to an app, it filters to the sandboxes whose mounts touch that
    // app's paths — a filter over mount sources, not a second listing.
    appTab: true,
  },
  {
    id: "telemetry",
    title: "Activity",
    icon: Activity,
    description: "Workspace traces with status and source filters",
    Panel: TelemetryPanel,
    appTab: true,
  },
];

export function nativeSurfaceById(id: string): NativeSurfaceDef | undefined {
  return NATIVE_SURFACES.find((surface) => surface.id === id);
}

/** Pseudo-path tab key for a native surface (`native://agents`). Can never
 *  collide with a workspace path — no workspace path contains `://`. */
export const NATIVE_TAB_PREFIX = "native://";

export function nativeTabPath(id: string): string {
  return `${NATIVE_TAB_PREFIX}${id}`;
}

export function parseNativeTabPath(path: string): NativeSurfaceDef | undefined {
  if (!path.startsWith(NATIVE_TAB_PREFIX)) return undefined;
  return nativeSurfaceById(path.slice(NATIVE_TAB_PREFIX.length));
}
