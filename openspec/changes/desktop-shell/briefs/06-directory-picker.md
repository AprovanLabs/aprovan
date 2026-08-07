# Brief: Directory picker and workspace creation

## Mission
Implement `pickDirectory` over the native panel; use it in workspace creation when available with fallback to plain path input; propose a subdirectory default (never home) and show the containment statement.

## Read first
1. `openspec/changes/desktop-shell/tasks.md` section 6
2. `openspec/changes/desktop-shell/tech-plan.md` (DesktopBridge pickDirectory)
3. `client/web/src/features/workspaces/**`
4. Bridge surface from stream 1

## Depends-on
Stream 1 merged (scaffold).

## Tasks
Copy section 6 checkboxes (6.1–6.3).

## Verify
`pnpm --filter @aprovan/patchwork-web typecheck`

## Constraints
Touches: `desktop/src/dialogs.ts`, `client/web/src/features/workspaces/**`, and bridge wiring if pickDirectory was stubbed.
