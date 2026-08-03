# Report: Stream 1 — Registry-server auth discovery

## PR
https://github.com/AprovanLabs/registry/pull/92 — **merged** (`e7b26ba`)

## Built
- Optional `browserClientId` on OIDC auth config (`config/types.ts`); threaded through
  `createAuthAdapter` option type (unused by verification), `optionsFromEnv` via
  `OIDC_BROWSER_CLIENT_ID`, and `authConfigFromOptions` → router.
- Public `GET /auth/config` — exempt with `/healthz`; response
  `{ mode, oidc?: { issuer, audience, browserClientId? } }` with no secrets.
- Authenticated `GET /whoami` →
  `{ principal, tenantId, role, groupIds, mode }` from resolved `CallContext` + adapter mode.
- Vitest: `tests/auth-discovery.test.ts` (9 cases) covering none / api-key / oidc ±
  `browserClientId`, whoami happy paths + 401s, embedded (external tenancy) router.

## Verified
```
pnpm --filter @aprovan/registry-server typecheck  # pass
pnpm --filter @aprovan/registry-server test       # 123 passed | 10 skipped
```
Registry repo has no PR CI workflows (only main-push publish/deploy/image); merge
proceeded after local verify.

## Deviations
None material. Env surface gained optional `OIDC_BROWSER_CLIENT_ID` so standalone
operators can advertise PKCE without code — not named in the task list but required
to thread config through construction for Docker/env boots.

## For next wave
- Discovery is on `main` but **not published** yet (stream 4). Catalog session work
  (stream 5) must wait for a published `@aprovan/registry-server` minor that includes
  these routes.
- Custom `AuthAdapter` with `mode: "oidc"` advertises `{ mode: "oidc" }` only (no
  issuer/audience) — built-in oidc option object is the advertising path.
