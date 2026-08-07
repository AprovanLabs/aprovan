# Brief: Document streaming sessions

## Mission
Write `docs/streaming-sessions.md` covering the wire table, state machine, error codes, and how a provider implements `StreamingSessionDriver` around a vendor duplex socket. State that continuous upstream input is a sequence of POSTs, not a duplex channel (MCP alignment). Link from `docs/index.md`.

## Read first
1. `openspec/changes/utdk-streaming-sessions/tasks.md` section 5
2. `openspec/changes/utdk-streaming-sessions/tech-plan.md` (wire table)
3. `docs/index.md` for link style
4. Implementation already on main: `sessions-streaming.ts`, `@utdk/common/streaming`

## Tasks
Copy section 5 checkboxes (5.1–5.3) from tasks.md.

## Verify
Docs are accurate against the landed wire surface. (`pnpm lint` may fail for pre-existing eslint config issues — do not block on that; prefer verifying links/content.)

## Constraints
Touches only: `docs/streaming-sessions.md`, `docs/index.md`.
Do not edit other change docs in the same PR.
