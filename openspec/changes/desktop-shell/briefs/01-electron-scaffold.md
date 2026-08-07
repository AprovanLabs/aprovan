# Brief: Electron scaffold and app origin

## Mission
Create the `desktop/` workspace package (main, preload, build config), register `app://` protocol serving only the active bundle directory, open the main window with contextIsolation, implement `DesktopBridge` exactly as the tech plan, enforce macOS 14+ Apple Silicon floor, and test the bridge surface.

## Read first
1. `openspec/changes/desktop-shell/tech-plan.md` (full Interfaces for DesktopBridge)
2. `openspec/changes/desktop-shell/specs/desktop-app-shell/spec.md`
3. `openspec/changes/desktop-shell/tasks.md` — section 1
4. Root `pnpm-workspace.yaml`, `turbo.json`, `package.json`

## Depends-on
None within desktop-shell. Prefer landing after local-first stream 6 so the renderer can resolve gateways, but scaffold itself has no hard code dependency.

## Tasks
Copy section 1 checkboxes from tasks.md verbatim.

## Verify
`pnpm --filter @aprovan/desktop build && pnpm --filter @aprovan/desktop test`

## Constraints
Touches: `desktop/**`, `package.json`, `pnpm-workspace.yaml`, `turbo.json` only.
Do not implement gateway supervision, bundle manager, or signing yet.
