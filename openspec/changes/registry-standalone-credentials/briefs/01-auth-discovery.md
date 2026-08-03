# Brief: Registry-server auth discovery (standalone-creds stream 1)

## Mission
Add public `GET /auth/config` and authenticated `GET /whoami` to published
`@aprovan/registry-server`, plus optional `browserClientId` on OIDC config. IW-0 has
landed — work on the registry repo (single source), not the deleted aprovan fork.

## Read first
1. `openspec/changes/registry-standalone-credentials/prd.md`
2. `openspec/changes/registry-standalone-credentials/tech-plan.md`
3. `openspec/changes/registry-standalone-credentials/tasks.md` stream 1
4. Specs: `registry-server-auth-discovery`
5. Sources under `/Users/jacob/Documents/Code/AprovanLabs/registry/packages/registry-server/`

## Tasks
Stream 1 (1.1–1.4) verbatim. Check off in tasks.md.

## Verify
```
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server typecheck && pnpm --filter @aprovan/registry-server test
```

## Git
Branch `iw3/registry-auth-discovery` from origin/main in registry worktree. PR + merge.
Bump/patch publish of registry-server only after streams 1–3 of this change are ready
(stream 4) — do not publish from this brief alone unless orchestrator asks.

## Constraints
Touches: `registry:packages/registry-server/**` only. Surgical; karpathy-guidelines.
Owner: standalone OIDC uses PKCE when advertised; paste-a-bearer is universal fallback.
