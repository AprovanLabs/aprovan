/**
 * Notifications — client surface for the gateway's `notifications` core
 * service (registry docs/vcs-and-sessions.md "Notifications").
 *
 * Signal over noise: a notification is a **decision** (someone must act —
 * always shown), a **warning** (important), or **activity** (quiet, off by
 * default and never persisted server-side from this client). Rich content
 * renders through a widget reference (`builtin:` ids or workspace paths);
 * one-click actions are typed tool calls; `link` is the "get more deeply
 * involved" client action. Seen notifications hide by default and the
 * gateway expires them after 10 days.
 *
 * The feed merges the server's list (poll) with local ephemerals (instant,
 * never persisted — e.g. "this tab auto-refreshed").
 */

import { getAccessTokenSync } from "./auth";
import { invokeNamespaceTool } from "./tools";

const invokeNotificationsTool = invokeNamespaceTool("notifications");
const invokeKeyvalueTool = invokeNamespaceTool("keyvalue");

const POLL_MS = 15_000;
const PREFS_KEY_PREFIX = "patchwork:notify-prefs";

export type NotificationCategory = "decision" | "warning" | "activity";

export interface NotificationChoice {
  label: string;
  description?: string;
  call: { namespace: string; procedure: string; args: Record<string, unknown> };
}

/**
 * Gateway path for a notification choice — shared by the in-app feed and the
 * desktop native surface. App-sourced choices go through `/apps/…/tools/…` so
 * the emitting app's allow-list is enforced at click time; member choices use
 * `/tools/…`.
 */
export function buildChoiceDispatchPath(
  workspaceId: string | null,
  notification: Pick<AppNotification, "source">,
  choice: Pick<NotificationChoice, "call">,
): string {
  const { namespace, procedure } = choice.call;
  if (notification.source?.app) {
    const ws = workspaceId ?? "local";
    return `/apps/${encodeURIComponent(ws)}/${encodeURIComponent(
      notification.source.app,
    )}/tools/${encodeURIComponent(namespace)}/${procedure}`;
  }
  return `/tools/${encodeURIComponent(namespace)}/${procedure}`;
}

/** Client-known deep-involvement actions. */
export type NotificationAction =
  | { kind: "open-merge"; sessionId: string }
  | { kind: "open-chats" }
  | { kind: "open-file"; path: string }
  | {
      /** Server-emitted on workflow failure: hand the evidence to the chat agent. */
      kind: "debug-workflow";
      workflow: string;
      scriptPath?: string;
      runId: string;
      traceId?: string;
    };

export interface AppNotification {
  id: string;
  ts: string;
  category: NotificationCategory;
  title: string;
  body?: string;
  widget?: { path: string; data?: unknown };
  choices?: NotificationChoice[];
  link?: NotificationAction;
  /** Server-stamped emitting app (choices dispatch through its surface). */
  source?: { app: string };
  seen?: boolean;
  /** Local ephemeral — never reached the server, seen state is local too. */
  local?: boolean;
}

export function currentUserSub(): string | null {
  const token = getAccessTokenSync();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1] ?? "")) as { sub?: string };
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Preferences — which categories the user wants to see
// ---------------------------------------------------------------------------

export interface NotificationPrefs {
  /** Decisions are always shown — that's the category's contract. */
  warning: boolean;
  activity: boolean;
}

const DEFAULT_PREFS: NotificationPrefs = { warning: true, activity: false };

function prefsKey(): string {
  return `${PREFS_KEY_PREFIX}:${currentUserSub() ?? "local"}`;
}

let prefs: NotificationPrefs = (() => {
  try {
    const stored = localStorage.getItem(prefsKey());
    return stored ? { ...DEFAULT_PREFS, ...(JSON.parse(stored) as NotificationPrefs) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
})();

export function notificationPrefs(): NotificationPrefs {
  return prefs;
}

export function setNotificationPrefs(next: NotificationPrefs): void {
  prefs = next;
  try {
    localStorage.setItem(prefsKey(), JSON.stringify(next));
  } catch {
    // Cache is best-effort; the keyvalue copy is the durable one.
  }
  // Durable copy follows the user across devices (per-user key in the
  // workspace's shared KV — the key embeds the sub).
  void invokeKeyvalueTool("set", {
    key: `notify:prefs:${currentUserSub() ?? "local"}`,
    value: next,
  }).catch(() => {});
  notifyListeners();
}

async function hydratePrefs(): Promise<void> {
  try {
    const data = (await invokeKeyvalueTool("get", {
      key: `notify:prefs:${currentUserSub() ?? "local"}`,
    })) as { value?: NotificationPrefs | null };
    if (data.value && typeof data.value === "object") {
      prefs = { ...DEFAULT_PREFS, ...data.value };
      try {
        localStorage.setItem(prefsKey(), JSON.stringify(prefs));
      } catch {
        /* best-effort */
      }
      notifyListeners();
    }
  } catch {
    // Offline — cached prefs stand.
  }
}

export function categoryVisible(category: NotificationCategory): boolean {
  if (category === "decision") return true;
  return category === "warning" ? prefs.warning : prefs.activity;
}

// ---------------------------------------------------------------------------
// The feed
// ---------------------------------------------------------------------------

type Listener = (notifications: AppNotification[]) => void;

const listeners = new Set<Listener>();
let serverFeed: AppNotification[] = [];
let localFeed = new Map<string, AppNotification>();
let includeSeen = false;
let pollTimer: ReturnType<typeof setInterval> | null = null;

function merged(): AppNotification[] {
  return [...localFeed.values(), ...serverFeed]
    .filter((n) => categoryVisible(n.category))
    .filter((n) => includeSeen || !n.seen)
    .sort((a, b) => b.ts.localeCompare(a.ts));
}

function notifyListeners(): void {
  const list = merged();
  for (const listener of listeners) listener(list);
}

interface ServerNotification {
  id: string;
  category?: string;
  title: string;
  body?: string;
  widget?: { path: string; data?: unknown };
  choices?: NotificationChoice[];
  link?: unknown;
  source?: { app: string };
  createdAt: string;
  seenBy?: Record<string, string>;
}

async function poll(force = false): Promise<void> {
  if (!force && document.visibilityState !== "visible") return;
  try {
    const data = (await invokeNotificationsTool("list", {
      include_seen: includeSeen,
      limit: 50,
    })) as { notifications?: ServerNotification[] };
    const me = currentUserSub() ?? "local";
    serverFeed = (data.notifications ?? []).map((record) => ({
      id: record.id,
      ts: record.createdAt,
      category:
        record.category === "decision" || record.category === "warning"
          ? record.category
          : "activity",
      title: record.title,
      body: record.body,
      widget: record.widget,
      choices: record.choices,
      link: record.link as NotificationAction | undefined,
      source: record.source,
      seen: Boolean(record.seenBy?.[me]),
    }));
    notifyListeners();
  } catch {
    // Gateway unavailable — local ephemerals still flow.
  }
}

/**
 * Publish a notification. `local: true` keeps it in this window only (used
 * for quiet activity like "this tab refreshed" — no server round-trip, no
 * storage). Everything else lands in the workspace feed via
 * `notifications.emit` and appears here on the next poll (an optimistic
 * local copy shows instantly).
 */
export function publishNotification(
  input: Omit<AppNotification, "id" | "ts" | "seen"> & { localOnly?: boolean },
): void {
  const { localOnly, ...rest } = input;
  const optimistic: AppNotification = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    ...rest,
    local: true,
  };
  localFeed.set(optimistic.id, optimistic);
  notifyListeners();
  if (localOnly) return;
  void invokeNotificationsTool("emit", {
    category: rest.category,
    title: rest.title,
    ...(rest.body ? { body: rest.body } : {}),
    ...(rest.widget ? { widget: rest.widget } : {}),
    ...(rest.choices ? { choices: rest.choices } : {}),
    ...(rest.link ? { link: rest.link } : {}),
  })
    .then(() => {
      // The durable copy replaces the optimistic one on the next poll.
      localFeed.delete(optimistic.id);
      return poll();
    })
    .catch(() => {
      // Emit failed (offline / old gateway) — the local copy stands.
    });
}

export async function markSeen(notification: AppNotification): Promise<void> {
  if (notification.local) {
    const entry = localFeed.get(notification.id);
    if (entry) localFeed.set(notification.id, { ...entry, seen: true });
    notifyListeners();
    return;
  }
  serverFeed = serverFeed.map((n) => (n.id === notification.id ? { ...n, seen: true } : n));
  notifyListeners();
  await invokeNotificationsTool("seen", { id: notification.id }).catch(() => {});
}

export async function markAllSeen(): Promise<void> {
  localFeed = new Map(
    [...localFeed.entries()].map(([id, n]) => [id, { ...n, seen: true }]),
  );
  serverFeed = serverFeed.map((n) => ({ ...n, seen: true }));
  notifyListeners();
  await invokeNotificationsTool("seen", { all: true }).catch(() => {});
}

/** Immediate refresh (the drawer calls this on open) — explicit intent
 *  overrides the background-tab visibility gate. */
export function refreshNotifications(): void {
  void poll(true);
}

export function setIncludeSeen(next: boolean): void {
  includeSeen = next;
  notifyListeners();
  void poll();
}

export function subscribeToNotifications(listener: Listener): () => void {
  listeners.add(listener);
  listener(merged());
  if (!pollTimer) {
    void hydratePrefs();
    void poll();
    pollTimer = setInterval(() => void poll(), POLL_MS);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  };
}

/** Drop cached feed state (workspace switch). */
export function resetNotifications(): void {
  serverFeed = [];
  localFeed = new Map();
  notifyListeners();
}

export function unreadCount(notifications: AppNotification[]): number {
  // The badge is signal only: decisions and warnings, never activity.
  return notifications.filter((n) => !n.seen && n.category !== "activity").length;
}

// ---------------------------------------------------------------------------
// Focus — desktop native surface asks the renderer to open a notification
// ---------------------------------------------------------------------------

type FocusListener = (id: string) => void;
const focusListeners = new Set<FocusListener>();

/** Open / highlight a notification in the in-app feed (system notification click). */
export function focusNotification(id: string): void {
  for (const listener of focusListeners) listener(id);
}

export function subscribeNotificationFocus(listener: FocusListener): () => void {
  focusListeners.add(listener);
  return () => {
    focusListeners.delete(listener);
  };
}

const FOCUS_EVENT = "aprovan:focus-notification";

function installFocusEventBridge(): void {
  if (typeof window === "undefined") return;
  window.addEventListener(FOCUS_EVENT, ((event: Event) => {
    const detail = (event as CustomEvent<{ id?: string }>).detail;
    if (detail?.id) focusNotification(detail.id);
  }) as EventListener);
}

installFocusEventBridge();

