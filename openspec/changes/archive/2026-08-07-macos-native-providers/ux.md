## Flows

### Flow: Select the on-device model

1. User opens model or interface settings for a workspace.
2. The on-device provider appears alongside hosted providers, marked as running on this machine and needing no credential.
3. User selects it; the binding is saved and subsequent calls run locally.
4. Failure paths: the machine's OS is too old → the option is shown disabled with the version requirement, not hidden, so the user learns it exists; the system feature is switched off → shown disabled with a remedy describing how to enable it, which is a different message from the unsupported case.

### Flow: Act on a notification from outside the app

1. A notification is emitted while the window is in the background.
2. A system notification appears with the notification's title and body, and its choices as actions.
3. User activates an action. The corresponding call is dispatched and the result is reflected in the in-app feed.
4. Alternative: user activates the notification body with no action → the application opens to that notification.
5. Failure paths: notification permission denied → the surface is absent, the in-app feed is unaffected, and the user is not re-prompted; the dispatched call fails → the failure appears in the in-app feed, since a system notification cannot host an error state.

### Flow: Widget renders offline

1. User opens a widget with no network connectivity.
2. Dependencies resolve from local storage and the widget renders normally. There is no visible difference from the online case, which is the point.
3. Failure path: the widget needs a dependency never fetched on this machine → an inline error naming the unresolvable dependency and stating that it requires a connection once, rather than a blank frame or an indefinite spinner.

## Screens & States

### Provider selection

- **Purpose**: choose an implementation per interface, including native ones.
- **Key elements**: provider list; an on-this-machine marker for native providers; the credential affordance suppressed for credentialless providers; a reason line for anything unselectable.
- **States**: *available* — selectable, no credential field; *unsupported* — disabled with the requirement, still visible; *disabled by user* — disabled with a remedy, worded distinctly from unsupported; *helper not running* — native providers disabled with a transient reason, since a restart usually resolves it.

### System notification

- **Purpose**: surface an item from the feed outside the window.
- **Key elements**: title, body, one action per choice.
- **States**: *with choices* — actions present; *without choices* — activation opens the app to the item; *withdrawn* — removed once seen in-app; *permission denied* — surface simply absent, with the in-app feed unchanged.

### Widget mount

- **Purpose**: render a widget.
- **Key elements**: unchanged from today.
- **States**: *resolving from cache* — no distinct state; it is fast enough not to warrant one; *fetching a new dependency* — the existing loading state; *unresolvable offline* — inline error naming the dependency and what would fix it.

## Component Inventory

No new components. Provider selection extends the existing picker with a reason line and an on-this-machine marker; the widget error uses the existing mount error state. System notifications are OS-rendered and have no component surface.

## Open Questions

None outstanding. The native provider pattern, notifications-as-surface, and the dependency cache were settled in the 2026-08-06 grilling session.
