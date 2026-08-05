# Stream 3 report: pool dimension on rate limiter

## Status
**DONE** — PR open (not merged).

## Built
- Extended `RateLimiter.enforce` with optional `pool` on `RateLimitKey` (`{ tenant, provider, principal, pool? }`); legacy string keys unchanged for existing dispatch call sites.
- Arithmetic pool ceiling: `configurePool` + `registerPoolTenant` / `unregisterPoolTenant`; per-tenant quota = published limit ÷ tenant count, recomputed on membership change.
- Pool hits emit `aprovan.rate_limit.pool_exceeded`; tenant hits emit `aprovan.rate_limit.tenant_exceeded` (via optional constructor callback).
- Module docstring documents in-process, arithmetic-only pool limiting (not distributed).
- Unit tests: two platform tenants contend; BYO tenant isolated; pool exhaustion names pool; quota recomputation on tenant-count change.

## Verified
```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa03
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- limits
```

```
> @aprovan/registry-server@0.2.2 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa03/packages/registry-server
> vitest run limits


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa03/packages/registry-server

 ✓ src/dispatch/__tests__/limits.test.ts (6 tests) 4ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  21:33:21
   Duration  293ms (transform 28ms, setup 0ms, collect 26ms, tests 4ms, environment 0ms, prepare 36ms)
```

## Files touched
- `packages/registry-server/src/dispatch/limits.ts`
- `packages/registry-server/src/dispatch/__tests__/limits.test.ts`
- `packages/registry-server/vitest.config.ts` (one-line include for colocated `src/**/*.test.ts` — required for brief verify path)
- `openspec/changes/platform-oauth-apps/tasks.md` (§3 checked)

## Deviations
- Added `vitest.config.ts` include entry so colocated tests under `src/dispatch/__tests__/` are discovered by `pnpm test -- limits`. No production wiring (dispatch still passes string keys; §4 picks defaults).

## For §4
- **Exported key type:** `RateLimitKey`
- **Pool-hit metric:** `aprovan.rate_limit.pool_exceeded` (`POOL_RATE_LIMIT_HIT_METRIC`)

## Branch / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa03`
- Branch: `iw8/platform-oauth-03-pool`
- PR: https://github.com/AprovanLabs/registry/pull/126
