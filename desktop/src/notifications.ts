/**
 * Native notification surface — mirrors the workspace notification feed into
 * the OS notification centre (tech-plan D4). Presentation only: no bindable
 * delivery interface, no second store. Choice activation reuses the same
 * gateway paths the in-app feed uses (`/tools/…` or `/apps/…/tools/…`).
 */

import {
  BrowserWindow,
  Notification as ElectronNotification,
  systemPreferences,
} from "electron";

export const GATEWAY_API_PREFIX = "/api/gateway";
export const DEFAULT_POLL_MS = 15_000;

export type NotificationPermission = "granted" | "denied" | "default";

export type FeedChoice = {
  label: string;
  description?: string;
  call: { namespace: string; procedure: string; args: Record<string, unknown> };
};

export type FeedNotification = {
  id: string;
  title: string;
  body?: string;
  choices?: FeedChoice[];
  source?: { app: string };
  seen?: boolean;
};

export type PresentedSystemNotification = {
  close(): void;
};

export type SystemNotificationHost = {
  isSupported(): boolean;
  requestPermission(): Promise<NotificationPermission>;
  show(input: {
    id: string;
    title: string;
    body?: string;
    actions: Array<{ text: string }>;
    onAction: (index: number) => void;
    onClick: () => void;
  }): PresentedSystemNotification;
};

type FetchLike = (
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  },
) => Promise<{
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}>;

/**
 * Path relative to the gateway API base — identical to the in-app feed's
 * choice dispatch (`NotificationsBell` / `buildChoiceDispatchPath`).
 */
export function buildChoiceDispatchPath(
  workspaceId: string | null,
  notification: Pick<FeedNotification, "source">,
  choice: Pick<FeedChoice, "call">,
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

export function gatewayApiBase(gatewayOrigin: string): string {
  return `${gatewayOrigin.replace(/\/$/, "")}${GATEWAY_API_PREFIX}`;
}

type ServerNotification = {
  id: string;
  title: string;
  body?: string;
  choices?: FeedChoice[];
  source?: { app: string };
  createdAt?: string;
  seenBy?: Record<string, string>;
};

export type GatewayNotificationClient = {
  listNotifications(opts?: {
    includeSeen?: boolean;
  }): Promise<FeedNotification[]>;
  markSeen(id: string): Promise<void>;
  dispatchChoice(
    notification: FeedNotification,
    choice: FeedChoice,
  ): Promise<void>;
};

export function createGatewayNotificationClient(opts: {
  /** Gateway origin (`http://127.0.0.1:<port>`), or null when not ready. */
  getGatewayOrigin: () => string | null;
  workspaceId?: string | null;
  /** User sub for `seenBy` mapping; local mode defaults to `"local"`. */
  userSub?: string | null;
  fetch?: FetchLike;
}): GatewayNotificationClient {
  const fetchImpl = opts.fetch ?? (globalThis.fetch as FetchLike);
  const workspaceId = opts.workspaceId ?? "local";
  const userSub = opts.userSub ?? "local";

  async function invoke(
    path: string,
    args: Record<string, unknown>,
  ): Promise<unknown> {
    const origin = opts.getGatewayOrigin();
    if (!origin) throw new Error("Gateway is not ready");
    const url = `${gatewayApiBase(origin)}${path}`;
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args }),
    });
    const body = (await res.json().catch(() => ({}))) as {
      data?: unknown;
      error?: string;
    };
    if (!res.ok) {
      throw new Error(body.error ?? `Gateway call failed (${res.status})`);
    }
    return body.data;
  }

  return {
    async listNotifications({ includeSeen = true } = {}) {
      const data = (await invoke("/tools/notifications/list", {
        include_seen: includeSeen,
        limit: 50,
      })) as { notifications?: ServerNotification[] };
      return (data.notifications ?? []).map((record) => ({
        id: record.id,
        title: record.title,
        body: record.body,
        choices: record.choices,
        source: record.source,
        seen: Boolean(record.seenBy?.[userSub]),
      }));
    },

    async markSeen(id: string) {
      await invoke("/tools/notifications/seen", { id });
    },

    async dispatchChoice(notification, choice) {
      const path = buildChoiceDispatchPath(workspaceId, notification, choice);
      await invoke(path, choice.call.args ?? {});
    },
  };
}

/**
 * Electron host for UNUserNotificationCentre via Electron's Notification API.
 * Authorization denial is non-fatal — the caller stops presenting.
 */
export function createElectronNotificationHost(): SystemNotificationHost {
  return {
    isSupported: () => ElectronNotification.isSupported(),

    async requestPermission() {
      if (!ElectronNotification.isSupported()) return "denied";
      const prefs = systemPreferences as {
        getNotificationSettings?: () => { authorizationStatus?: string };
      };
      if (typeof prefs.getNotificationSettings === "function") {
        const status = prefs.getNotificationSettings().authorizationStatus;
        if (status === "denied") return "denied";
        if (
          status === "authorized" ||
          status === "provisional" ||
          status === "temporary"
        ) {
          return "granted";
        }
        // not-determined — first show() prompts; allow the surface through.
      }
      return "granted";
    },

    show({ title, body, actions, onAction, onClick }) {
      const notification = new ElectronNotification({
        title,
        body: body ?? "",
        silent: false,
        ...(actions.length > 0
          ? {
              actions: actions.map((a) => ({
                type: "button" as const,
                text: a.text,
              })),
            }
          : {}),
      });
      notification.on("action", (_event, index) => {
        onAction(index);
      });
      notification.on("click", () => {
        onClick();
      });
      notification.show();
      return {
        close: () => {
          notification.close();
        },
      };
    },
  };
}

export type NotificationMirror = {
  start(): void;
  stop(): void;
  /** Drive one sync cycle (tests / forced refresh). */
  syncNow(): Promise<void>;
  /** Presented system ids currently held (tests). */
  presentedIds(): string[];
  /** Current permission outcome after first-use request (tests). */
  permission(): NotificationPermission | null;
};

export type NotificationMirrorOptions = {
  host: SystemNotificationHost;
  gateway: GatewayNotificationClient;
  pollIntervalMs?: number;
  /** Activate a no-choice notification — focus the app on that item. */
  onOpenNotification?: (id: string) => void;
  setIntervalFn?: typeof setInterval;
  clearIntervalFn?: typeof clearInterval;
};

/**
 * Subscribe to the feed and reflect unseen items into the system centre.
 * Seen items are withdrawn; already-presented ids are never shown twice.
 */
export function createNotificationMirror(
  opts: NotificationMirrorOptions,
): NotificationMirror {
  const pollMs = opts.pollIntervalMs ?? DEFAULT_POLL_MS;
  const setIntervalFn = opts.setIntervalFn ?? setInterval;
  const clearIntervalFn = opts.clearIntervalFn ?? clearInterval;

  const presented = new Map<string, PresentedSystemNotification>();
  let timer: ReturnType<typeof setInterval> | null = null;
  let permission: NotificationPermission | null = null;
  let started = false;
  let syncing = false;

  function withdraw(id: string): void {
    const handle = presented.get(id);
    if (!handle) return;
    handle.close();
    presented.delete(id);
  }

  async function ensurePermission(): Promise<boolean> {
    if (permission === "denied") return false;
    if (permission === "granted") return true;
    if (!opts.host.isSupported()) {
      permission = "denied";
      return false;
    }
    permission = await opts.host.requestPermission();
    return permission === "granted";
  }

  async function handleAction(
    notification: FeedNotification,
    choice: FeedChoice,
  ): Promise<void> {
    try {
      await opts.gateway.dispatchChoice(notification, choice);
      await opts.gateway.markSeen(notification.id);
    } catch (err) {
      // Failure surfaces in the in-app feed; system centre cannot host errors.
      console.warn("[notifications] choice dispatch failed", err);
    } finally {
      withdraw(notification.id);
    }
  }

  function present(notification: FeedNotification): void {
    const choices = notification.choices ?? [];
    const handle = opts.host.show({
      id: notification.id,
      title: notification.title,
      body: notification.body,
      actions: choices.map((c) => ({ text: c.label })),
      onAction: (index) => {
        const choice = choices[index];
        if (!choice) return;
        void handleAction(notification, choice);
      },
      onClick: () => {
        if (choices.length === 0) {
          opts.onOpenNotification?.(notification.id);
        }
      },
    });
    presented.set(notification.id, handle);
  }

  async function syncNow(): Promise<void> {
    if (syncing) return;
    syncing = true;
    try {
      if (!(await ensurePermission())) return;

      const feed = await opts.gateway.listNotifications({ includeSeen: true });
      const unseen = new Map(
        feed.filter((n) => !n.seen).map((n) => [n.id, n] as const),
      );

      for (const id of [...presented.keys()]) {
        if (!unseen.has(id)) withdraw(id);
      }

      for (const [id, notification] of unseen) {
        if (presented.has(id)) continue;
        present(notification);
      }
    } catch (err) {
      console.warn("[notifications] feed sync failed", err);
    } finally {
      syncing = false;
    }
  }

  return {
    start() {
      if (started) return;
      started = true;
      void syncNow();
      timer = setIntervalFn(() => {
        void syncNow();
      }, pollMs);
      if (typeof timer === "object" && timer && "unref" in timer) {
        (timer as NodeJS.Timeout).unref?.();
      }
    },
    stop() {
      started = false;
      if (timer != null) {
        clearIntervalFn(timer as NodeJS.Timeout);
        timer = null;
      }
      for (const id of [...presented.keys()]) withdraw(id);
    },
    syncNow,
    presentedIds: () => [...presented.keys()],
    permission: () => permission,
  };
}

/** Focus (or create) the main window and ask the renderer to open a notification. */
export function openApplicationToNotification(
  id: string,
  ensureWindow: () => BrowserWindow = () => {
    const existing = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());
    if (existing) return existing;
    throw new Error("No BrowserWindow available to focus notification");
  },
): void {
  const win = ensureWindow();
  if (win.isDestroyed()) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
  void win.webContents.executeJavaScript(
    `window.dispatchEvent(new CustomEvent("aprovan:focus-notification",{detail:{id:${JSON.stringify(id)}}}))`,
  );
}
