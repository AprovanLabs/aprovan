/**
 * The native-surface registry (registry/docs/native-surfaces.md): every
 * native service that presents itself as a built-in app declares one entry
 * here — identity (id/title/icon/description) plus its Panel component.
 *
 * capability = namespace, extended one step: namespace = app surface. The
 * sidebar's demoted Workspace group (collapsed secondary affordance — not
 * the front door; see `WorkspaceSidebar` + iw9-b app-launcher), the
 * `native://` content tabs, and the app inspector's contextual tabs are
 * all projections of this one list — adding the next surface is an entry
 * here, not a UX negotiation. Registry entries themselves are placement-
 * independent; only where the sidebar renders them changed for iw9-b.
 */

import {
  Activity,
  Bell,
  Bot,
  Box,
  Brain,
  Cpu,
  Database,
  FolderGit,
  GitBranch,
  GitCompareArrows,
  HardDrive,
  KeyRound,
  LayoutGrid,
  Plug,
  Shield,
  Webhook,
} from "lucide-react";
import { AdminPermissionsPanel } from "../components/panels/AdminPermissionsPanel";
import { AgentsPanel } from "../components/panels/AgentsPanel";
import { AppsPanel } from "../components/panels/AppsPanel";
import { CredentialsPanel } from "../components/panels/CredentialsPanel";
import { InterfacesPanel } from "../components/panels/InterfacesPanel";
import { KeyValuePanel } from "../components/panels/KeyValuePanel";
import { LlmPanel } from "../components/panels/LlmPanel";
import { MountsPanel } from "../components/mounts";
import { NotificationsPanel } from "../components/panels/NotificationsPanel";
import { RuntimePanel } from "../components/panels/RuntimePanel";
import { SandboxesPanel } from "../components/panels/SandboxesPanel";
import { SessionsPanel } from "../components/panels/SessionsPanel";
import { SyncPanel } from "../components/panels/SyncPanel";
import { TelemetryPanel } from "../components/panels/TelemetryPanel";
import { VcsPanel } from "../components/panels/VcsPanel";
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
 * Order is the demoted Workspace section order (docs' inventory table). The
 * Apps launcher is a separate sidebar projection — not this list. `appTab`
 * is set only where the panel actually does something with `scope` — Data
 * describes the app's partition, Activity filters traces to the app,
 * Notifications filters on the server-stamped emitting app. Agents,
 * Webhooks, Sync, Sessions and Interfaces are workspace-level
 * configuration, so they stay off app panes.
 *
 * Icons mirror each panel's own header icon so a row and the pane it opens
 * read as the same thing.
 */
export const NATIVE_SURFACES: NativeSurfaceDef[] = [
  {
    id: "apps",
    title: "Apps",
    icon: LayoutGrid,
    description: "Your apps, installations, private flows, and the directory",
    Panel: AppsPanel,
  },
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
    description: "Reusable AI workers with their own model, instructions, and permissions",
    Panel: AgentsPanel,
  },
  {
    id: "runtime",
    title: "Runtime",
    icon: Cpu,
    description: "Choose which runtime executes agent turns in this workspace",
    Panel: RuntimePanel,
  },
  {
    id: "vcs",
    title: "VCS",
    icon: FolderGit,
    description: "Choose which git host powers code review and repo tools",
    Panel: VcsPanel,
  },
  {
    id: "mounts",
    title: "Mounts",
    icon: HardDrive,
    description: "Mount shared git or S3 content into this workspace (read-only)",
    Panel: MountsPanel,
  },
  {
    id: "llm",
    title: "LLM",
    icon: Brain,
    description: "Choose which provider powers chat completions and model calls",
    Panel: LlmPanel,
  },
  {
    id: "webhooks",
    title: "Webhooks",
    icon: Webhook,
    description: "Receive events from outside services and start workflows from them",
    Panel: WebhooksPanel,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Decisions, warnings, and activity across your workspace",
    Panel: NotificationsPanel,
    // Scoped to an app it filters on the server-stamped `source.app`, so an
    // app pane answers "what has this app been telling people".
    appTab: true,
  },
  {
    id: "sessions",
    title: "Sessions",
    icon: GitBranch,
    description: "Chat history as branches you can stage, merge, and archive",
    Panel: SessionsPanel,
  },
  {
    id: "interfaces",
    title: "Interfaces",
    icon: Plug,
    description: "Pick which connected service powers each workspace capability",
    Panel: InterfacesPanel,
  },
  {
    id: "sync",
    title: "Sync",
    icon: GitCompareArrows,
    description: "Keep external services and your workspace data in step",
    Panel: SyncPanel,
  },
  {
    id: "sandboxes",
    title: "Sandboxes",
    icon: Box,
    description: "Isolated runtimes that can read and write your workspace files",
    Panel: SandboxesPanel,
    // Scoped to an app, it filters to the sandboxes whose mounts touch that
    // app's paths — a filter over mount sources, not a second listing.
    appTab: true,
  },
  {
    id: "telemetry",
    title: "Activity",
    icon: Activity,
    description: "See what ran, what failed, and where it came from",
    Panel: TelemetryPanel,
    appTab: true,
  },
  {
    id: "credentials",
    title: "Credentials",
    icon: KeyRound,
    description: "Connect providers so tools and workflows can act on your behalf",
    Panel: CredentialsPanel,
  },
  {
    id: "admin",
    title: "Admin",
    icon: Shield,
    description: "Manage members, groups, and who can use which profiles",
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
