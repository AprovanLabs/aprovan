## 1. Swift helper skeleton

> Depends-on: - | Touches: native/macos-helper/**, desktop/src/helper-supervisor.ts, desktop/src/__tests__/helper-supervisor.test.ts | Verify: `pnpm --filter @aprovan/desktop test && swift test --package-path native/macos-helper`

- [x] 1.1 Create the Swift package producing a single binary that binds an ephemeral loopback port and serves `/health` (D1).
- [x] 1.2 Implement `/availability` returning `AvailabilityReport` with the three capability states from the tech plan (D3).
- [x] 1.3 Supervise the helper from Electron main using the same pattern as the gateway supervisor: start, health-poll, restart with backoff, stop on quit.
- [x] 1.4 Ensure helper absence degrades cleanly — the application runs, native capabilities report unavailable, everything else is unaffected.
- [x] 1.5 Cover every scenario in `specs/loopback-provider-host/spec.md`.

## 2. Widget dependency cache

> Depends-on: 1 | Touches: native/macos-helper/Sources/EsmCache/**, desktop/src/seed-deps.ts, packages/compiler/src/cdn-config.ts | Verify: `pnpm --filter @aprovan/patchwork test && swift test --package-path native/macos-helper`

- [ ] 2.1 Implement `/esm/*` mirroring the public CDN's specifier grammar, serving from disk and fetching through on a miss (D5).
- [ ] 2.2 Key the cache by fully resolved specifier including version; never satisfy a request from a different version.
- [ ] 2.3 Generate the seed set from the default workspace's widget dependencies at build time rather than hand-maintaining a list, and ship it in the app.
- [ ] 2.4 Call `setCdnBaseUrl()` at renderer startup when the helper is available; leave the public default in place otherwise.
- [ ] 2.5 Make an unresolvable dependency fail with a message naming it, never hang or render blank.
- [ ] 2.6 Cover every scenario in `specs/widget-dependency-cache/spec.md`, including a first-run offline render against seeded dependencies only.

## 3. On-device chat provider

> Depends-on: 1 | Touches: native/macos-helper/Sources/ChatCompletions/**, registry/packages/registry-server/src/catalog/default.ts, registry/packages/utdk/common/compat.ts | Verify: `pnpm --filter @aprovan/registry-server test && swift test --package-path native/macos-helper`

- [ ] 3.1 Implement `/v1/chat/completions` and `/v1/models` over the on-device model, matching the chat-completion and model-list shapes the `llm` contract declares, including the streaming response form (D2).
- [ ] 3.2 Report the model's capability as available, unsupported, or disabled via `/availability`, distinguishing an unsupported OS from a user-disabled feature.
- [ ] 3.3 Add the optional `availabilityProbe` field to the compat schema, restricted to an enumerated set of probe identifiers rather than an open string (D3 risk).
- [ ] 3.4 Add the provider to `CHAT_PROVIDERS` with a loopback `baseUrl`, `credentialless: true`, and its probe identifier.
- [ ] 3.5 Reject binding when the probe reports unavailable, surfacing the reported reason.
- [ ] 3.6 Assert no change to the `llm` contract, its shapes, or its dispatch, satisfying "No contract change for native inference".
- [ ] 3.7 Cover every scenario in `specs/native-llm-provider/spec.md`.

## 4. Native notification surface

> Depends-on: 1 | Touches: desktop/src/notifications.ts, desktop/src/__tests__/notifications.test.ts, client/web/src/lib/notifications.ts | Verify: `pnpm --filter @aprovan/desktop test && pnpm --filter @aprovan/patchwork-web typecheck`

- [x] 4.1 Subscribe to the existing notification feed from Electron main and present new items through the system notification centre (D4).
- [x] 4.2 Map each `choice` to a notification action, dispatching its call through the same gateway path the in-app feed uses — do not add a second dispatch path.
- [x] 4.3 Use the notification id as the system identifier so a seen item is withdrawn and nothing is presented twice.
- [x] 4.4 Open the application to the notification when one carrying no choices is activated.
- [x] 4.5 Request notification authorization on first use and treat denial as a non-fatal loss of the surface.
- [x] 4.6 Assert no bindable notification interface was added, satisfying "Native presentation is not a delivery contract".
- [x] 4.7 Cover every scenario in `specs/native-notification-surface/spec.md`.

## 5. Signing and entitlements

> Depends-on: 2, 3, 4 | Touches: desktop/build/entitlements.plist, desktop/electron-builder.yml, .github/workflows/desktop.yml | Verify: `pnpm --filter @aprovan/desktop dist`

- [ ] 5.1 Sign the helper as part of the application bundle and declare the entitlements the on-device model and notification centre require.
- [ ] 5.2 Confirm the helper starts under Hardened Runtime in a notarized build on a clean machine.
- [ ] 5.3 Add the helper's Swift build to the release workflow.

## 6. Documentation

> Depends-on: 5 | Touches: docs/native-providers.md, docs/native-surfaces.md, docs/index.md | Verify: `pnpm lint`

- [ ] 6.1 Write `docs/native-providers.md`: the loopback pattern, why the gateway stays portable, how to add the next native provider, and the three availability states.
- [ ] 6.2 Record that the on-device model needed one catalog entry and no contract change — the evidence for the pattern's central claim.
- [ ] 6.3 Note in `docs/native-surfaces.md` that system notifications are a presentation of the existing feed, not a delivery interface.
- [ ] 6.4 Link from `docs/index.md`.
