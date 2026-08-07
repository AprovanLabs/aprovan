# Brief: STT workspace integration and docs

## Mission
Add `@utdk/stt` to the workspace dependencies; confirm the interface resolves through the existing path with no bespoke branch; e2e test with a fake driver (open, three pushes, partials + final, close); write `docs/stt.md` and link from `docs/index.md`.

## Read first
1. `openspec/changes/stt-contract/tasks.md` section 5
2. `openspec/changes/stt-contract/tech-plan.md`
3. `openspec/changes/stt-contract/specs/stt-contract/spec.md`
4. `docs/streaming-sessions.md` (session wire already documented)
5. `@aprovan/registry-server@0.2.9` has stt in INTERFACE_ORDER; `@utdk/stt` available via workspace/tarball (npm packument may still 404 — prefer `^0.1.2` or tarball URL if install fails)

## Depends-on
Stream 4 merged (catalog). Streaming session routes are on main.

## Tasks
Copy section 5 checkboxes (5.1–5.4).

## Verify
`pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace check-types`

## Constraints
Touches: `server/workspace/package.json` (+ lockfile), `server/workspace/src/interfaces.ts` (only if needed), tests, `docs/stt.md`, `docs/index.md`.
Bump `@aprovan/registry-server` to `^0.2.9` if not already.
This completes `stt-contract` when merged.
