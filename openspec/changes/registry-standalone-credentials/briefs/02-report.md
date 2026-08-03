# Report: Stream 2 — registry-main transport headers

## PR
https://github.com/AprovanLabs/aprovan/pull/25 — **merged** (`ae6fe76`)

## Built
- `GatewayClientOptions.authHeader?` (default `"Authorization"`) and
  `scopeHeader?` (default `"X-Aprovan-Workspace"`); private `fetch` uses both.
- Doc-comment on `authHeader` explaining CloudFront OAC overwriting `Authorization`
  (mirrors `@aprovan/ui/gateway`'s `DEFAULT_AUTH_HEADER` rationale).
- Defaults unchanged: existing callers keep `Authorization` + `X-Aprovan-Workspace`.

## Verified
```
pnpm --filter @aprovan/registry-main typecheck  # pass
pnpm --filter @aprovan/registry-main build       # pass
```
CI `verify` on the PR passed before merge.

## Deviations
None.

## For next wave
- Header options are on aprovan `main` but **not published** yet (stream 4). Catalog
  session work (stream 5) must wait for a published `@aprovan/registry-main` minor.
- Hosted catalog will pass `{ authHeader: "X-Aprovan-Authorization" }`; standalone
  will pass `{ scopeHeader: "X-Registry-Tenant" }`.
