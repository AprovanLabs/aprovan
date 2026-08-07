# Brief: Bind-time streaming capability enforcement

## Mission
During `interfaces.bind`, when the target contract declares any session operation, read the provider's `StreamingCapabilities` and reject with `streaming-unsupported` if unsupported — fail at bind time, not call time.

## Read first
1. `openspec/changes/utdk-streaming-sessions/tech-plan.md` (D4)
2. `openspec/changes/utdk-streaming-sessions/specs/streaming-sessions/spec.md` — Bind-time streaming capability enforcement
3. `openspec/changes/utdk-streaming-sessions/tasks.md` section 4
4. `server/workspace/src/interfaces.ts`, `interfaces-service.ts`
5. Session routes already on main (stream 3)

## Tasks
Copy section 4 checkboxes (4.1–4.3).

## Verify
`pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace check-types`

## Constraints
Touches only interfaces bind path + tests. No docs (section 5).
