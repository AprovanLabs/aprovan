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
- [x] 5.1 Add `@utdk/stt` to the workspace's dependencies and confirm the interface resolves through the existing interface→provider path with no bespoke branch.
- [x] 5.2 End-to-end test against a fake driver: open, push three chunks, receive partials and one final, close, assert the terminal result.
- [x] 5.3 Write `docs/stt.md` stating the required encoding, that `final` is per-segment and not end-of-session, and that speaker ids are session-scoped — the three things a caller is most likely to assume wrongly.
- [x] 5.4 Link it from `docs/index.md`.

## Verify
`pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace check-types`

## Constraints
Touches: `server/workspace/package.json` (+ lockfile), `server/workspace/src/interfaces.ts` (only if needed), tests, `docs/stt.md`, `docs/index.md`.
Bump `@aprovan/registry-server` to `^0.2.9` if not already.
This completes `stt-contract` when merged.
