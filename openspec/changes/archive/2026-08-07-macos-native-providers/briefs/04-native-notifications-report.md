# Report: Native notification surface (stream 4)

## What was built

- **`desktop/src/notifications.ts`** — feed mirror for Electron main (D4):
  - Polls `POST /api/gateway/tools/notifications/list` once the gateway is ready
  - Presents unseen items via Electron `Notification` (system notification centre)
  - Maps each `choice` to a button action; activation dispatches through the same paths as the in-app feed (`/tools/…` or `/apps/:ws/:app/tools/…`) then marks seen
  - Tracks presentations by notification id — refresh does not duplicate; seen items are withdrawn
  - No-choice click → focus/show the main window and fire `aprovan:focus-notification`
  - Authorization requested on first use; denial stops the surface without affecting the in-app feed
- **`client/web/src/lib/notifications.ts`** — shared `buildChoiceDispatchPath`, plus `focusNotification` / `subscribeNotificationFocus` and a DOM event bridge for desktop
- **`NotificationsBell`** — uses the shared path helper; opens the drawer on focus events
- **`main.ts`** — starts/stops the mirror with gateway ready/not-ready; drains on quit

No bindable `notify` interface, no second notification store, no DesktopBridge growth.

## Verify

```
pnpm --filter @aprovan/desktop test          # 75 passed (incl. 13 notifications)
pnpm --filter @aprovan/patchwork-web typecheck
```

## Spec coverage (`native-notification-surface`)

| Scenario | Covered by |
| --- | --- |
| Notification appears without the window in front | Mirror presents title/body regardless of window focus |
| Feed remains the source of truth | Present does not mark seen / mutate feed ownership |
| Activating an action dispatches its call | Action → `dispatchChoice` + `markSeen` via gateway client |
| Emit-time validation unchanged | App-sourced choices use `/apps/…/tools/…` only |
| Notification with no choices | Empty actions; click → `onOpenNotification` |
| Reading in-app clears the system notification | Seen on next sync → `close()` / withdraw |
| No duplicate presentation | Presented id set skips re-show |
| No new bindable interface | Bridge methods + `INTERFACE_ORDER` free of notify |

## Deviations

- Electron's `Notification` API has no stable OS identifier field; we key the in-process map by feed id and call `close()` to withdraw (same effect as the UNUserNotificationCenter mapping in the tech plan).
- Permission probe uses `systemPreferences.getNotificationSettings` when present; otherwise first-use is treated as grant-and-let-OS-prompt (denial still stops further presentation once observed).

## Next wave needs to know

- Mirror lifecycle is tied to gateway `ready`; signing stream should declare any notification-centre entitlements the packaged app needs.
- Docs stream (6.3) should note this is presentation of the existing feed, not a delivery interface.
