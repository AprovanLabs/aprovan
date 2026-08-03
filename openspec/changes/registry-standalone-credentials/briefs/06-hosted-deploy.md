# Brief: Hosted deployment flip (standalone-creds stream 6)

## Mission
Set `PUBLIC_SESSION_MODE=hosted` in `registry-deploy.yml`; drop any
`PUBLIC_ACCOUNT_HOST` reference. Confirm Cognito vars still wired (read-only check on
callback URL in aprovan infra — no infra change expected).

## Gate
Stream 5 merged: https://github.com/AprovanLabs/registry/pull/94

## Read first
1. `briefs/05-report.md`
2. `tasks.md` stream 6
3. `registry/.github/workflows/registry-deploy.yml`
4. Specs: hosted SSO / transport header scenarios (document owner smoke in PR)

## Tasks
6.1–6.2 verbatim. Post-deploy smoke is owner-run — document checklist in PR body.

## Verify
```
grep -q "PUBLIC_SESSION_MODE" .github/workflows/registry-deploy.yml
! grep -q "PUBLIC_ACCOUNT_HOST" .github/workflows/registry-deploy.yml
```

## Git
`/tmp/iw3-hosted-deploy` branch `iw3/hosted-deploy` from registry origin/main. PR+merge.
Optionally trigger registry-deploy if safe; otherwise leave for owner after merge.

## Constraints
Touches only `registry:.github/workflows/registry-deploy.yml`. No infra code edits.
