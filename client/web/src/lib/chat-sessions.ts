/**
 * Chat sessions — the client surface for the gateway's `sessions` namespace
 * (registry docs/vcs-and-sessions.md).
 *
 * A session is a branch-shaped chat: transcript + a file view (base commit +
 * staged overlay). This module is transport + persistence only; ChatPage owns
 * the React state. The active session id is remembered per workspace so a
 * reload resumes the same chat, and `?session=<id>` in the URL wins so a
 * second browser window can host a parallel session.
 */

import { invokeNamespaceTool } from "./tools";

const invokeSessionsTool = invokeNamespaceTool("sessions");

export type SessionMode = "auto" | "staged";
export type SessionStatus = "open" | "merged" | "closed";

export interface SessionChanges {
  added: string[];
  modified: string[];
  removed: string[];
}

export interface ChatSessionInfo {
  id: string;
  title: string;
  status: SessionStatus;
  mode: SessionMode;
  base: string;
  /** When the base snapshot was taken — rendered as "workspace as of …". */
  baseAt?: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
  changes?: SessionChanges;
  mergeCommit?: string;
  tabs?: unknown;
}

export interface SessionConflict {
  path: string;
  ours: string | null;
  theirs?: string;
}

export function changedFileCount(session: ChatSessionInfo): number {
  const changes = session.changes;
  if (!changes) return 0;
  return changes.added.length + changes.modified.length + changes.removed.length;
}

/** Marker stored in session `tabs` so chat can recognize panel-originated chats. */
export const PANEL_SESSION_ORIGIN = "panel" as const;

export type PanelOriginTabs = { origin: typeof PANEL_SESSION_ORIGIN };

export function panelOriginTabs(): PanelOriginTabs {
  return { origin: PANEL_SESSION_ORIGIN };
}

export function isPanelOriginatedSession(session: {
  tabs?: unknown;
}): boolean {
  const tabs = session.tabs;
  return (
    !!tabs &&
    typeof tabs === "object" &&
    (tabs as { origin?: unknown }).origin === PANEL_SESSION_ORIGIN
  );
}

export async function createChatSession(options: {
  title?: string;
  mode?: SessionMode;
}): Promise<ChatSessionInfo> {
  const data = (await invokeSessionsTool("create", options)) as { session: ChatSessionInfo };
  return data.session;
}

/**
 * Open a gateway session from the floating panel and tag it as panel-originated.
 * Lives in the workspace session list so chat can attach by id (`?session=`).
 */
export async function createPanelChatSession(options: {
  title?: string;
  mode?: SessionMode;
} = {}): Promise<ChatSessionInfo> {
  const created = await createChatSession({
    title: options.title?.trim() || "Panel",
    mode: options.mode,
  });
  return updateChatSession(created.id, { tabs: panelOriginTabs() });
}

export async function listChatSessions(status?: SessionStatus): Promise<ChatSessionInfo[]> {
  const data = (await invokeSessionsTool("list", status ? { status } : {})) as {
    sessions: ChatSessionInfo[];
  };
  return data.sessions ?? [];
}

export async function getChatSession(id: string): Promise<ChatSessionInfo> {
  const data = (await invokeSessionsTool("get", { id })) as { session: ChatSessionInfo };
  return data.session;
}

export async function fetchSessionMessages(id: string): Promise<unknown[]> {
  const data = (await invokeSessionsTool("messages", { id })) as { messages: unknown[] };
  return Array.isArray(data.messages) ? data.messages : [];
}

export async function appendSessionMessages(
  id: string,
  messages: unknown[],
): Promise<ChatSessionInfo> {
  const data = (await invokeSessionsTool("append", { id, messages })) as {
    session: ChatSessionInfo;
  };
  return data.session;
}

export async function updateChatSession(
  id: string,
  patch: { title?: string; mode?: SessionMode; tabs?: unknown },
): Promise<ChatSessionInfo> {
  const data = (await invokeSessionsTool("update", { id, ...patch })) as {
    session: ChatSessionInfo;
  };
  return data.session;
}

export async function syncChatSession(
  id: string,
): Promise<{ session: ChatSessionInfo; conflicts: SessionConflict[] }> {
  return (await invokeSessionsTool("sync", { id })) as {
    session: ChatSessionInfo;
    conflicts: SessionConflict[];
  };
}

export async function closeChatSession(
  id: string,
  options: { stage?: boolean; message?: string } = {},
): Promise<{ session: ChatSessionInfo; commit?: { id: string; message: string } }> {
  return (await invokeSessionsTool("close", { id, ...options })) as {
    session: ChatSessionInfo;
    commit?: { id: string; message: string };
  };
}

/** Permanently delete a chat: transcript, record, unapplied changes. */
export async function deleteChatSession(id: string): Promise<void> {
  await invokeSessionsTool("delete", { id });
}

export async function discardSessionChanges(
  id: string,
  paths: string[],
): Promise<ChatSessionInfo> {
  const data = (await invokeSessionsTool("discard", { id, paths })) as {
    session: ChatSessionInfo;
  };
  return data.session;
}

/** "just now" / "5m ago" / "2h ago" / "Jul 25" — for "workspace as of …". */
export function relativeTime(iso: string | undefined): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, (Date.now() - then) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return new Date(then).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// ---------------------------------------------------------------------------
// Active-session persistence
// ---------------------------------------------------------------------------

const ACTIVE_KEY_PREFIX = "patchwork:chat-session";

function activeKey(workspaceId: string | null): string {
  return workspaceId ? `${ACTIVE_KEY_PREFIX}:${workspaceId}` : ACTIVE_KEY_PREFIX;
}

/** URL `?session=` wins (parallel windows); localStorage otherwise. */
export function loadActiveSessionId(workspaceId: string | null): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("session");
  if (fromUrl) return fromUrl;
  try {
    return localStorage.getItem(activeKey(workspaceId));
  } catch {
    return null;
  }
}

export function saveActiveSessionId(workspaceId: string | null, id: string | null): void {
  try {
    if (id) localStorage.setItem(activeKey(workspaceId), id);
    else localStorage.removeItem(activeKey(workspaceId));
  } catch {
    // Best-effort.
  }
}

/** The URL for opening a session in its own window (parallel chats). */
export function sessionWindowUrl(id: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set("session", id);
  return url.toString();
}
