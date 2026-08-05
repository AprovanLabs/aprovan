# Stream 4 report: choose and enforce the default platform quota

## Status
**DONE** — PR open (not merged).

## Built
- `dispatch/limits.ts`: exported §4 quota constants — `PLATFORM_DEFAULT_RPS`
  (5), `PLATFORM_DEFAULT_BURST` (10), `PLATFORM_DEFAULT_BUDGET` (10 000),
  `PLATFORM_POOL_RPS` (50 published ceiling) — plus a `platformPoolId(provider)`
  helper (`"<provider>:platform"`) so every caller derives the same pool id.
  Module docstring documents the numbers and points at `decisions.md`.
- `RateLimiter` now takes an optional `platform` limits override in its
  constructor. `enforcePool` always runs the platform 24h budget check on the
  pool path (budget never scales with tenant count). `recomputePoolQuota`
  clamps the arithmetic per-tenant share to `min(published ÷ tenantCount,
  platformDefaultRps)` for both rps and burst — so the platform default is a
  hard ceiling even when a pool is under-subscribed.
- `dispatch/index.ts`: reads `resolved.credential.payload.clientOrigin` fresh
  on every call and only sets `pool: platformPoolId(resolved.provider)` on the
  `RateLimitKey` when origin is `"platform"`. BYO (`origin: "tenant"` or
  absent) keeps the plain non-pool key and today's `REGISTRY_DEFAULT_RPS`
  path — no platform ceiling is ever consulted for it (4.2).
- `config/types.ts` + `config/env.ts`: `RegistryServerOptions.limits.platform`
  (`defaultRps`/`defaultBurst`/`defaultBudget`/`poolRps`), populated from
  `REGISTRY_PLATFORM_DEFAULT_{RPS,BURST,BUDGET}` / `REGISTRY_PLATFORM_POOL_RPS`
  only when the env var is present and a valid number — absent/invalid env
  leaves the field unset so `dispatch/limits.ts`'s code-level defaults apply
  (defaults are not optional config, only overridable).
- `credentials/platform-secrets.ts`: added `PlatformOAuthSecretStore.has(provider)`
  (presence check, no access-audit log) so startup wiring can report which
  providers actually loaded a secret without polluting the audit trail.
- `config/platform-oauth.ts`: `wirePlatformOAuthAtStartup` now returns the
  array of provider ids that successfully loaded a platform secret.
- `server.ts`: `createRegistryServer` uses that return value to call
  `limiter.configurePool(platformPoolId(provider), poolRps)` once per loaded
  provider at startup — a provider flagged `platformApp: true` in
  `registry.json` with no secret loaded never gets a pool (falls through to
  BYO / the existing actionable 400, unchanged from pre-§4 behavior).
- Exported the new symbols (`PLATFORM_DEFAULT_RPS`, `PLATFORM_DEFAULT_BURST`,
  `PLATFORM_DEFAULT_BUDGET`, `PLATFORM_POOL_RPS`, `platformPoolId`,
  `RateLimitKey`, …) from `src/index.ts`.
- `docs/platform-oauth-runbook.md`: replaced the "blocked on §4.1" banner with
  a resolved-quota table (numbers + env overrides), an explanation of why BYO
  never inherits them, and a note on how `server.ts` wires pools at startup.
  Updated the onboarding checklist (old item 9, "configure pool limits once
  stream 4 ships") to say there's nothing left to configure — it's automatic.

## 4.3 — tenant switching picks up the wider limit
Tested end to end in `tests/platform-quota.test.ts`: a tenant on a
platform-secret-backed provider is throttled at the platform per-tenant rps
(5) via the pool path. The same tenant then calls `credentials.updatePayload`
on its *existing* credential row, replacing the payload with a BYO
`clientOrigin: "tenant"` shape (same `credentialId`, so the tenant's pinned
default profile still resolves it). The very next dispatch call — no profile
edit, no admin action — reads the fresh `clientOrigin` off the re-resolved
credential, drops the `pool` key, and is throttled at the wider BYO
`REGISTRY_DEFAULT_RPS` instead. This is possible because origin is read fresh
from the resolved credential on every dispatch rather than cached on the
profile.

## Verified
```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa04
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- config limits platform-quota
```

```
 RUN  v2.1.5 .../registry-iw8-poa04/packages/registry-server

 ✓ src/dispatch/__tests__/limits.test.ts (12 tests) 5ms
 ✓ src/config/__tests__/env.test.ts (5 tests) 15ms
 ✓ src/config/__tests__/platform-oauth.test.ts (10 tests) 30ms
 ✓ tests/platform-quota.test.ts (4 tests) 52ms

 Test Files  4 passed (4)
      Tests  31 passed (31)
```

Full package suite (`pnpm test`, 235 tests): 221 passed, 4 pre-existing
failures unrelated to this change (2 in `tests/dispatch.test.ts`, 2 in
`tests/server.test.ts` — reproduced identically on `origin/main` before this
branch's changes; unrelated Vitest module-resolution issue in the sandboxed
script runtime, not a regression from §4). `tsc -p tsconfig.json` (via
`pnpm --filter @aprovan/registry-server build`) is clean.

## Files touched
- `packages/registry-server/src/dispatch/limits.ts`
- `packages/registry-server/src/dispatch/index.ts`
- `packages/registry-server/src/dispatch/__tests__/limits.test.ts`
- `packages/registry-server/src/config/types.ts`
- `packages/registry-server/src/config/env.ts`
- `packages/registry-server/src/config/__tests__/env.test.ts` (new)
- `packages/registry-server/src/config/platform-oauth.ts`
- `packages/registry-server/src/config/__tests__/platform-oauth.test.ts`
- `packages/registry-server/src/credentials/platform-secrets.ts`
- `packages/registry-server/src/server.ts`
- `packages/registry-server/src/index.ts`
- `packages/registry-server/tests/helpers.ts`
- `packages/registry-server/tests/platform-quota.test.ts` (new)
- `packages/registry-server/docs/platform-oauth-runbook.md`
- `openspec/changes/platform-oauth-apps/tasks.md` (§4 checked, aprovan repo)

## Deviations
- None from the settled numbers. `RateLimiter`'s platform override is an
  optional constructor param (defaults to the `dispatch/limits.ts` constants
  when omitted) rather than a required argument, so every existing call site
  and test that doesn't care about §4 is unaffected.
- Added `resetPlatformOAuthSecretStore()` / `resetPlatformOAuthStartupLogs()`
  calls to `platform-quota.test.ts`'s `afterEach` — needed for isolation
  against the module-level singletons `config/platform-oauth.ts` already
  exposed; no production code path changed by this.

## Branch / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa04`
- Branch: `iw8/platform-oauth-04-quota`
- PR: https://github.com/AprovanLabs/registry/pull/147
