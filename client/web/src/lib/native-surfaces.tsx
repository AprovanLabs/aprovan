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

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
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

// Entries are appended by the panel wiring (see components/panels/*).
export const NATIVE_SURFACES: NativeSurfaceDef[] = [];

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
