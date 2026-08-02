/**
 * The native-surface registry (registry/docs/native-surfaces.md): every
 * native service that presents itself as a built-in app declares one entry
 * here — identity (id/title/icon/description) plus its Panel component.
 *
 * capability = namespace, extended one step: namespace = app surface. The
 * sidebar's Workspace group, the `native://` content tabs, and the app
 * inspector's contextual tabs are all projections of this one list —
 * adding the next surface is an entry here, not a UX negotiation.
 */

import {
  Activity,
  Bell,
  Bot,
  Box,
  Database,
  GitBranch,
  GitCompareArrows,
  KeyRound,
  Plug,
  Shield,
  Terminal,
  Webhook,
} from "lucide-react";
import { AdminPermissionsPanel } from "../components/panels/AdminPermissionsPanel";
import { AgentsPanel } from "../components/panels/AgentsPanel";
import { CredentialsPanel } from "../components/panels/CredentialsPanel";
import { InterfacesPanel } from "../components/panels/InterfacesPanel";
import { KeyValuePanel } from "../components/panels/KeyValuePanel";
import { NotificationsPanel } from "../components/panels/NotificationsPanel";
import { PlaygroundPanel } from "../components/panels/PlaygroundPanel";
import { SandboxesPanel } from "../components/panels/SandboxesPanel";
import { SessionsPanel } from "../components/panels/SessionsPanel";
import { SyncPanel } from "../components/panels/SyncPanel";
import { TelemetryPanel } from "../components/panels/TelemetryPanel";
import { WebhooksPanel } from "../components/panels/WebhooksPanel";
import type { NativePanelProps } from "../components/panels/shell";
import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

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
 * app's partition, Activity filters traces to the app, Notifications filters
 * on the server-stamped emitting app. Agents, Webhooks, Sync, Sessions and
 * Interfaces are workspace-level configuration, so they stay off app panes.
 *
 * Icons mirror each panel's own header icon so a row and the pane it opens
 * read as the same thing.
 */
export const NATIVE_SURFACES: NativeSurfaceDef[] = [
  {
    id: "keyvalue",
    title: "Data",
    icon: Database,
    description: "Browse and edit the records your workspace and workflows store",
    Panel: KeyValuePanel,
    appTab: true,
  },
  {
    id: "agents",
    title: "Agents",
    icon: Bot,
    description: "Named profiles workflows can run as, and their executions",
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
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "The full feed — decisions, warnings and activity, including seen",
    Panel: NotificationsPanel,
    // Scoped to an app it filters on the server-stamped `source.app`, so an
    // app pane answers "what has this app been telling people".
    appTab: true,
  },
  {
    id: "sessions",
    title: "Sessions",
    icon: GitBranch,
    description: "Chat sessions as branches — staged diffs, merges, archives",
    Panel: SessionsPanel,
  },
  {
    id: "interfaces",
    title: "Interfaces",
    icon: Plug,
    description: "Choose which service backs each built-in capability",
    Panel: InterfacesPanel,
  },
  {
    id: "sync",
    title: "Sync",
    icon: GitCompareArrows,
    description: "Pipelines that move data between services and your workspace",
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
  {
    id: "credentials",
    title: "Credentials",
    icon: KeyRound,
    description: "Provider tokens and OAuth connections for tool calls",
    Panel: CredentialsPanel,
  },
  {
    id: "playground",
    title: "Playground",
    icon: Terminal,
    description: "Run scripts against connected providers in a sandbox",
    Panel: PlaygroundPanel,
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Members, groups, invites, and audit log",
    Panel: AdminPermissionsPanel,
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
