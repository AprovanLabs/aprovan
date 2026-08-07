# Report: Directory picker and workspace creation

## What was built

1. **`desktop/src/dialogs.ts` (6.1)** — Native `pickDirectory("workspace-root")` over Electron `dialog.showOpenDialog` (`openDirectory` + `createDirectory`). Cancel returns `undefined`. Default panel path is `~/Documents/Aprovan` (a subdirectory, never `$HOME`). Wired through `bridge-handlers` so the preload `DesktopBridge.pickDirectory` invokes the panel for the sending window.

2. **`client/web/src/features/workspaces/**` (6.2–6.3)** — Workspace creation form with Local/Cloud kind selector. Local root uses a plain path input (web / no bridge) and a Browse button that calls `window.desktop.pickDirectory` when the desktop bridge is present. Cancelled picks leave the prior value intact. Default root is `~/Documents/Aprovan`; the containment statement is shown beside the field.

## Verification

1. `pnpm --filter @aprovan/desktop test` — 21 passed (including new dialogs cases).
2. `pnpm --filter @aprovan/desktop check-types` — passed.
3. `pnpm --filter @aprovan/patchwork-web typecheck` — passed.

## Deviations

- `local-first-workspace` never shipped a `features/workspaces` plain-path creation UI; this stream introduces that flow and layers the native picker on top when the bridge is available.
- Create form is exported for hosts to mount; no create-workspace HTTP API wiring yet (out of this stream’s touch list).
