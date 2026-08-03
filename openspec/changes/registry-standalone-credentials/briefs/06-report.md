# Report: Stream 6 — Hosted deployment flip

## Status
**DONE** — tasks 6.1–6.2 checked; merged to registry main. Post-deploy smoke is
owner-run (checklist in PR).

## Built
- Set `PUBLIC_SESSION_MODE: hosted` in `.github/workflows/registry-deploy.yml` env
  block so the aprovan.com/registry static build inherits hosted mode through
  `scripts/deploy-web.sh` (ambient env → Astro `PUBLIC_*`).
- Documented hosted vs standalone default in the workflow header comment.
- No `PUBLIC_ACCOUNT_HOST` was present in the workflow (already gone after stream 5).
- Cognito read-only: `PUBLIC_COGNITO_AUTHORITY` / `PUBLIC_COGNITO_CLIENT_ID` still
  wired as repo vars; callback `https://aprovan.com/registry/auth/callback` still
  listed at `aprovan/infra/aws/aws/src/stacks/main.ts:171` — no infra change.

## Verified
```bash
grep -q "PUBLIC_SESSION_MODE" .github/workflows/registry-deploy.yml
! grep -q "PUBLIC_ACCOUNT_HOST" .github/workflows/registry-deploy.yml
```

## PR
- https://github.com/AprovanLabs/registry/pull/95 — **merged**
  (`b102e6e67fe820858c3f5d86c76455808b63b7e2`)

## Owner smoke (documented in PR; not agent-run)
1. Silent SSO from a live product session on `/registry/account/credentials`
2. Credential added on catalog appears in workspace native panel (shared store)
3. Authenticated `/api/gateway` call uses `X-Aprovan-Authorization` under CloudFront

## Deviations
None. Did not edit `deploy-web.sh` (brief Touches: workflow only). Hosted mode
relies on workflow env inheritance into the build subprocess.

## For next wave
Stream 7 (product-plane-removal disposition) can proceed independently of smoke;
hosted flip is on main and deploy workflow path change should auto-trigger
`Deploy Registry Web`.
