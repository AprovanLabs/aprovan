## Flows

### Flow: First launch

1. User opens the application for the first time.
2. Shell checks platform support. Unsupported hardware or OS → a plain statement of the requirement and nothing else; the app does not proceed in a degraded state.
3. Shell starts the gateway. The window shows a starting state rather than a blank page.
4. Gateway reports ready. Since no workspace exists, the user is taken to workspace creation (the flow `local-first-workspace` defines), now with a native directory picker.
5. Failure path: gateway fails to start → a failed state naming the last error, with retry. The user is never shown an empty window.

### Flow: Renderer update arrives

1. Shell checks the update endpoint in the background.
2. A newer signed bundle is found, downloaded, verified, and staged. Nothing visible changes; the running renderer is untouched.
3. The user is told an update is ready and can apply it now or on next launch. Applying reloads the renderer only — the gateway and workspace state are unaffected.
4. Failure paths: verification fails → nothing changes, the failure is recorded, no user-facing alarm; bundle requires a newer shell → the user is pointed at the shell update instead; the new bundle fails to boot twice → automatic rollback with a brief notice that the previous version was restored.

### Flow: Gateway becomes unavailable while in use

1. Gateway exits unexpectedly during a session.
2. The window stays open. The surface enters an unavailable state naming what happened, and in-flight work is reported as interrupted rather than silently lost.
3. Supervisor restarts with backoff. On success, the surface returns to normal.
4. Failure path: retry ceiling reached → a failed state with the last error and an explicit retry.

## Screens & States

### Application window

- **Purpose**: host the shared renderer.
- **Key elements**: the existing client surface, plus a gateway status indicator that is invisible when ready.
- **States**: *starting* — brief, with an explanation, never a blank page; *ready* — indistinguishable from the web client; *restarting* — non-blocking banner, existing view retained; *failed* — blocking panel with last error and retry; *unsupported platform* — terminal statement of requirements.

### Update notice

- **Purpose**: tell the user a verified renderer update is staged.
- **Key elements**: version, apply-now, apply-later.
- **States**: *staged* — the only normally visible state; *rolled back* — a brief notice that the previous version was restored, shown once; *shell update required* — points at the shell updater instead of offering to apply the bundle. Downloading and verifying are deliberately silent.

### Workspace creation (desktop variant)

- **Purpose**: the flow from `local-first-workspace`, with the native picker.
- **Key elements**: native directory panel; proposed default subdirectory; the containment statement.
- **States**: unchanged from `local-first-workspace`, plus *picker cancelled* — returns to the field with the prior value intact.

## Component Inventory

Existing `@aprovan/ui` primitives throughout; the gateway status indicator and update notice reuse the notification and banner patterns already in the client rather than introducing new chrome. The only genuinely native elements are the directory panel and the Gatekeeper and update dialogs, all system-provided.

## Open Questions

None outstanding. Distribution, hydration, and supervision behavior were settled in the 2026-08-06 grilling session.
