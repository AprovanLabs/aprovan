# Brief: Bundle manager

## Mission
Implement signed OTA bundle fetch/verify/stage/activate with `minShell`, rename activation, boot-success tracking and rollback, expose `BundleInfo` on the bridge. Cover `specs/renderer-hydration/spec.md`.

## Read first
1. `openspec/changes/desktop-shell/tasks.md` section 5
2. `openspec/changes/desktop-shell/tech-plan.md` (D3)
3. `openspec/changes/desktop-shell/specs/renderer-hydration/spec.md`
4. Application Support layout from stream 2

## Depends-on
Stream 2 merged.

## Tasks
Copy section 5 checkboxes (5.1–5.6).

## Verify
`pnpm --filter @aprovan/desktop test`

## Constraints
Touches: `desktop/src/bundle-manager.ts`, tests. Do not implement signing CI (section 7) yet — use test keys/fixtures.
