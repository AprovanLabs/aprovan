# Brief: Catalog session layer (standalone-creds stream 5)

## Mission
Un-fork catalog account surfaces onto published minors (`registry-main@0.2.0`,
`registry-ui@0.6.0`). Replace `PUBLIC_ACCOUNT_HOST` with `PUBLIC_SESSION_MODE`; implement
`StandaloneSession` (discovery + PKCE when advertised + bearer paste fallback) and
`HostedSession` (Cognito PKCE); unify `SessionGate`. Eradicate MovedNotice.

## Gate
Published:
- `@aprovan/registry-server@0.2.0`
- `@aprovan/registry-main@0.2.0`
- `@aprovan/registry-ui@0.6.0`

## Read first
1. `briefs/04-report.md`
2. `tech-plan.md` D1, D2, D7 + interface 5
3. `tasks.md` stream 5
4. Specs: `catalog-session`, `catalog-account-surfaces`
5. `registry/apps/registry/src/**`

## Tasks
5.1–5.7 verbatim. Owner: standalone OIDC uses PKCE when `browserClientId` advertised;
paste-a-bearer is universal fallback. `product-plane-removal` disposition is stream 7.

## Verify
```
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-web typecheck && pnpm --filter @aprovan/registry-web build
! grep -rn "PUBLIC_ACCOUNT_HOST\|MovedNotice\|moved to the Aprovan product app" apps/registry/src
```

## Git
`/tmp/iw3-catalog-session` branch `iw3/catalog-session` from registry origin/main.
Bump apps/registry deps to the published minors. PR+merge. Write briefs/05-report.md.

## Constraints
Touches `registry:apps/registry/**` only. Do not edit deploy.yml (stream 6).
