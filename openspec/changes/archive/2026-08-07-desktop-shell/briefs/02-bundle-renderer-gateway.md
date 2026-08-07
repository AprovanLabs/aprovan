# Brief: Bundle the renderer and the gateway build

## Mission
Produce renderer bundle from existing `client/web` with no desktop-only fork; vendor gateway artifact as Dockerfile `pnpm deploy` plus stock Node runtime; assert vendored gateway matches container build; lay out Application Support `bundles/` and `gateway-data/`.

## Read first
1. `openspec/changes/desktop-shell/tech-plan.md` (D2)
2. `openspec/changes/desktop-shell/tasks.md` section 2
3. `openspec/changes/desktop-shell/specs/desktop-app-shell/spec.md` — One renderer source
4. Existing Dockerfile / `scripts/image.sh` for gateway deploy shape
5. Stream 1 `@aprovan/desktop` scaffold is on main

## Tasks
Copy section 2 checkboxes (2.1–2.4).

## Verify
`pnpm --filter @aprovan/desktop build`

## Constraints
Touches: `desktop/build/**`, `desktop/scripts/**`, `scripts/image.sh` (only if needed for assertion). Isolated worktree from latest main.
