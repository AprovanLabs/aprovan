# Brief: Native notification surface

## Mission
Mirror the notification feed to the system notification centre from Electron main; map choices to actions via the same gateway path the in-app feed uses; use the notification id as the system id; open the app on activate when there are no choices; request auth on first use and treat denial as non-fatal; do not add a bindable notify interface. Cover `specs/native-notification-surface/spec.md`.

## Read first
1. `openspec/changes/macos-native-providers/tasks.md` section 4
2. `openspec/changes/macos-native-providers/tech-plan.md` (D4)
3. `openspec/changes/macos-native-providers/specs/native-notification-surface/spec.md`
4. `client/web/src/lib/notifications.ts`

## Depends-on
Stream 1 merged (`01-swift-helper` / PR #137).

## Tasks
- [x] 4.1 Subscribe to the existing notification feed from Electron main and present new items through the system notification centre (D4).
- [x] 4.2 Map each `choice` to a notification action, dispatching its call through the same gateway path the in-app feed uses — do not add a second dispatch path.
- [x] 4.3 Use the notification id as the system identifier so a seen item is withdrawn and nothing is presented twice.
- [x] 4.4 Open the application to the notification when one carrying no choices is activated.
- [x] 4.5 Request notification authorization on first use and treat denial as a non-fatal loss of the surface.
- [x] 4.6 Assert no bindable notification interface was added, satisfying "Native presentation is not a delivery contract".
- [x] 4.7 Cover every scenario in `specs/native-notification-surface/spec.md`.

## Verify
```bash
pnpm --filter @aprovan/desktop test && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints
Touches: `desktop/src/notifications.ts`, `desktop/src/__tests__/notifications.test.ts`, `client/web/src/lib/notifications.ts` (+ minimal main wiring).
Do not add a bindable notification interface.
Do not implement ESM cache or on-device chat in this stream.
Check off 4.1–4.7 when done; open PR; write `briefs/04-native-notifications-report.md`.
Isolated worktree only.
