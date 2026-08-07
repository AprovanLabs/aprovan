# Brief: Gateway supervision

## Mission
Spawn the gateway on an ephemeral loopback port with `WORKSPACE_MODE=local` and the app data directory; poll health and emit `GatewayStatus` over the bridge; restart with exponential backoff then hold at `failed`; clean shutdown on quit. Cover every scenario in `specs/gateway-supervision/spec.md`.

## Read first
1. `openspec/changes/desktop-shell/tasks.md` section 3
2. `openspec/changes/desktop-shell/tech-plan.md` (D5)
3. `openspec/changes/desktop-shell/specs/gateway-supervision/spec.md`
4. Existing `desktop/src/` scaffold + vendored gateway from stream 2

## Depends-on
Stream 2 merged.

## Tasks
Copy section 3 checkboxes (3.1–3.5).

## Verify
`pnpm --filter @aprovan/desktop test`

## Constraints
Touches: `desktop/src/gateway-supervisor.ts`, `desktop/src/__tests__/gateway-supervisor.test.ts` (or desktop/__tests__/). Wire into main as needed without rewriting bundle scripts.
