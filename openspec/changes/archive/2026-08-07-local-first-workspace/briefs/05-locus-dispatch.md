# Brief: Locus-aware resolution in the gateway

## Mission
Resolve store/credential/binding lookups from the workspace's locus; outbound proxy for cloud-locus workspaces; assert local workspace binding a remote provider calls outbound from local gateway without writing credentials upstream.

## Read first
1. `openspec/changes/local-first-workspace/tech-plan.md`
2. `openspec/changes/local-first-workspace/tasks.md` section 5
3. Specs under `specs/workspace-execution-locus/` and related
4. `server/workspace/src/runtime/config.ts`, `routes/proxy.ts`, `workflows/invoke.ts`
5. Stream 4 already landed locus fields on workspace records

## Depends-on
Stream 4 merged.

## Tasks
Copy section 5 checkboxes (5.1–5.3) from tasks.md.

## Verify
`pnpm --filter @aprovan/workspace test`

## Constraints
Touches: `server/workspace/src/runtime/config.ts`, `server/workspace/src/routes/proxy.ts`, `server/workspace/src/workflows/invoke.ts`, `server/workspace/src/__tests__/locus-dispatch.test.ts` (or tests/ path used by package).
Do not edit sessions-streaming or tools session routes.
