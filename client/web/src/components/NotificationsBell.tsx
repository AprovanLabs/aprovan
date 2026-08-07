/**
 * NotificationsBell — bell + right-side drawer over the workspace
 * notification feed (lib/notifications.ts → the gateway's `notifications`
 * core service).
 *
 * Signal over noise: the badge counts unseen decisions + warnings only;
 * activity is opt-in via the gear (per-user preference). Rows render rich
 * content through widgets — `builtin:` ids resolve to first-party cards
 * (merge-conflict first), workspace paths compile through the patchwork
 * pipeline via the host-supplied `renderWidget`. Choices are typed tool
 * calls; **app-sourced choices dispatch through the app's own tool surface**
 * so its allow-list is enforced server-side at click time, never with the
 * clicking user's full authority.
 */

import {
  Bell,
  Check,
  CircleAlert,
  Info,
  Loader2,
  Settings2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GATEWAY_BASE } from "@/lib/gateway";
import { gatewayFetch } from "@/lib/gateway-fetch";
import { relativeTime } from "@/lib/chat-sessions";
import {
  markAllSeen,
  markSeen,
  notificationPrefs,
  refreshNotifications,
  setIncludeSeen,
  setNotificationPrefs,
  subscribeNotificationFocus,
  subscribeToNotifications,
  unreadCount,
  buildChoiceDispatchPath,
  type AppNotification,
  type NotificationAction,
  type NotificationChoice,
} from "@/lib/notifications";
import { invokeNamespaceTool } from "@/lib/tools";
import { MergeConflictCard } from "./notifications/MergeConflictCard";

interface NotificationsBellProps {
  workspaceId: string | null;
  onAction: (action: NotificationAction) => void;
  /** Host renderer for workspace-path notification widgets. */
  renderWidget?: (path: string, data: unknown) => ReactNode;
}

/**
 * Run a notification choice. Member-sourced choices go through the normal
 * tools proxy; app-sourced ones go through the app surface, where the app's
 * allow-list is re-validated server-side.
 */
async function dispatchChoice(
  workspaceId: string | null,
  notification: AppNotification,
  choice: NotificationChoice,
): Promise<void> {
  const { args } = choice.call;
  const path = buildChoiceDispatchPath(workspaceId, notification, choice);
  if (notification.source?.app) {
    const response = await gatewayFetch(`${GATEWAY_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      throw new Error(body.error ?? `Choice failed (${response.status})`);
    }
    return;
  }
  const { namespace, procedure } = choice.call;
  await invokeNamespaceTool(namespace)(procedure, args);
}

function WidgetBody({
  notification,
  renderWidget,
}: {
  notification: AppNotification;
  renderWidget?: (path: string, data: unknown) => ReactNode;
}) {
  const widget = notification.widget;
  if (!widget) return null;
  if (widget.path === "builtin:merge-conflict") {
    return <MergeConflictCard data={widget.data} />;
  }
  if (widget.path.startsWith("builtin:")) return null; // Unknown builtin — body text stands.
  return <>{renderWidget?.(widget.path, widget.data) ?? null}</>;
}

export function NotificationsBell({ workspaceId, onAction, renderWidget }: NotificationsBellProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);
  const [showSeen, setShowSeen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefsTick, setPrefsTick] = useState(0);
  const [running, setRunning] = useState<string | null>(null); // "id:label"
  const [done, setDone] = useState<Set<string>>(new Set());
  const [choiceError, setChoiceError] = useState<string | null>(null);

  useEffect(() => subscribeToNotifications(setNotifications), []);

  useEffect(
    () =>
      subscribeNotificationFocus(() => {
        refreshNotifications();
        setOpen(true);
        setIncludeSeen(true);
        setShowSeen(true);
      }),
    [],
  );

  const runChoice = useCallback(
    async (notification: AppNotification, choice: NotificationChoice) => {
      const key = `${notification.id}:${choice.label}`;
      setRunning(key);
      setChoiceError(null);
      try {
        await dispatchChoice(workspaceId, notification, choice);
        setDone((prev) => new Set(prev).add(notification.id));
        await markSeen(notification);
      } catch (err) {
        setChoiceError(err instanceof Error ? err.message : String(err));
      } finally {
        setRunning(null);
      }
    },
    [workspaceId],
  );

  const prefs = notificationPrefs();
  const unread = unreadCount(notifications);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          refreshNotifications();
          setOpen(true);
        }}
        className="relative p-1.5 rounded hover:bg-muted"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-semibold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <Bell className="h-4 w-4" />
              <span className="text-sm font-semibold">Notifications</span>
              <button
                type="button"
                className="ml-auto rounded p-1 hover:bg-muted"
                onClick={() => setPrefsOpen((v) => !v)}
                title="Notification preferences"
              >
                <Settings2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded p-1 hover:bg-muted"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {prefsOpen && (
              <div className="border-b px-4 py-3 text-sm space-y-2">
                <p className="text-xs font-medium text-muted-foreground">What shows up here</p>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" checked disabled />
                  Things that need your decision (always on)
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.warning}
                    onChange={(e) => {
                      setNotificationPrefs({ ...prefs, warning: e.target.checked });
                      setPrefsTick((t) => t + 1);
                    }}
                  />
                  Warnings — something important happened
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.activity}
                    onChange={(e) => {
                      setNotificationPrefs({ ...prefs, activity: e.target.checked });
                      setPrefsTick((t) => t + 1);
                    }}
                  />
                  Activity — quiet FYIs (auto-synced files, applied changes)
                </label>
                <span className="hidden">{prefsTick}</span>
              </div>
            )}

            <div className="flex items-center gap-3 border-b px-4 py-1.5 text-xs text-muted-foreground">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSeen}
                  onChange={(e) => {
                    setShowSeen(e.target.checked);
                    setIncludeSeen(e.target.checked);
                  }}
                />
                Show seen
              </label>
              <button
                type="button"
                className="ml-auto hover:text-foreground"
                onClick={() => void markAllSeen()}
              >
                Mark all as seen
              </button>
            </div>

            {choiceError && (
              <p className="border-b bg-destructive/10 px-4 py-2 text-xs text-destructive">
                {choiceError}
              </p>
            )}

            <div className="flex-1 space-y-1.5 overflow-y-auto p-2">
              {notifications.length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  Nothing needs you right now.
                </p>
              )}
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    notification.seen ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {notification.category === "decision" ? (
                      <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500" />
                    ) : notification.category === "warning" ? (
                      <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                    ) : (
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{notification.title}</p>
                      {notification.body && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{notification.body}</p>
                      )}
                      <WidgetBody notification={notification} renderWidget={renderWidget} />
                      {notification.choices && !done.has(notification.id) && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {notification.choices.map((choice) => {
                            const key = `${notification.id}:${choice.label}`;
                            return (
                              <Button
                                key={key}
                                size="sm"
                                variant="secondary"
                                className="h-6 px-2 text-xs"
                                disabled={running !== null}
                                title={choice.description}
                                onClick={() => void runChoice(notification, choice)}
                              >
                                {running === key && (
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                )}
                                {choice.label}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                      {done.has(notification.id) && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <Check className="h-3 w-3" /> Done.
                        </p>
                      )}
                      <p className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                        {relativeTime(notification.ts)}
                        {notification.source?.app && <span>· {notification.source.app}</span>}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {notification.link && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            setOpen(false);
                            onAction(notification.link!);
                          }}
                        >
                          {notification.link.kind === "debug-workflow" ? "Debug in chat" : "Review"}
                        </Button>
                      )}
                      {!notification.seen && (
                        <button
                          type="button"
                          className="text-[11px] text-muted-foreground hover:text-foreground"
                          onClick={() => void markSeen(notification)}
                          title="Mark as seen — hidden by default, deleted after 10 days"
                        >
                          Seen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
