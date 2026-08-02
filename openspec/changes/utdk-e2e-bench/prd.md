## Problem

`@utdk/e2e`'s live probe flows (direct/gateway/store) only ever ran against a hand-filled local
`.env` — there is no way to run them unattended, so provider breakage (a 3rd-party API change, a
regenerated access path, an expired token) goes undetected between whenever a human happens to run
`test:live` locally. The credential-free `generation` flow (280 assertions) already guards the merge
gate; nothing guards the live surface on a schedule.

## Users & Jobs

- **Provider maintainers / implementing agents** — want to know, without hand-managing ~67
  third-party secrets on a laptop, whether a change to the bundler, the client builder, or a
  provider's own API broke the live path.
- **Deployment owner (jacob)** — wants automatic detection of live breakage with zero merge-gate
  risk: 3rd-party flakiness (rate limits, trial expirations, upstream outages) must never fail a PR.
- **CI** — needs the existing fast, free, deterministic merge gate (`test:generation`) left exactly
  as it is.

## Goals

- Real E2E credentials sourced from AWS SSM Parameter Store under
  `/aprovan/test/utdk-creds/*` (SecureString) — never committed, never hand-copied between
  machines beyond initial provisioning.
- `write-env.ts` grows `--from-ssm`: one command turns an authenticated AWS session (local `aws
  sso login`, or CI's existing OIDC role) into a working `.env`, matching the ergonomics of the
  existing `env:scaffold` command.
- A nightly scheduled GitHub Actions workflow in the registry repo: assumes the **existing** CI
  OIDC deploy role (`CiStack`'s `RegistryDeployRole`, `vars.AWS_DEPLOY_ROLE_ARN`) — zero new IAM
  surface — pulls credentials, runs `doctor` for visibility, runs `test:live`, and on failure
  opens or updates a single tracking GitHub issue, auto-closing it when green again.
- The nightly workflow can **never** block a merge: not triggered by `pull_request`, not a
  required status check, and structured so a live-probe failure doesn't fail the job before the
  issue-reporting step runs.
- `pnpm --filter @utdk/e2e test:generation` remains the merge gate, byte-for-byte unchanged —
  this change does not touch `src/matrix.ts`, `src/flows.ts`'s existing flow logic, or
  `tests/generation.test.ts`.

## Non-Goals

- The seeded-test-tenant gateway-flow variant (needs WS-4's registry-server extraction /
  product-plane move to exist) — stubbed as a blocked task only, not implemented here.
- No change to the four-flow architecture (generation/direct/gateway/store) or the probe matrix
  itself — `src/matrix.ts` and `src/flows.ts` are consumed as-is.
- No credential rotation policy, expiry alerting, or per-secret access-audit UI.
- No solving the pre-existing two-header-credential gap (Datadog, Plaid — README finding 5) or
  any other pre-existing matrix defect; the SSM naming convention faithfully mirrors today's
  single-env-var-per-slot model, it doesn't extend it.
- Not actually populating the SSM parameter values — an agent cannot create real third-party
  accounts or mint real tokens. That is an explicit owner action (see tasks.md).
- No change to `@aprovan/node`'s `/aprovan/<env>/env` blob-loader — that loads product **runtime**
  config for the deployed app; test credentials are a separate, deliberately non-overlapping
  concern (see tech-plan D4).

## Capabilities

### New Capabilities
- `e2e-credentials`: SSM-backed credential source and naming convention; `write-env.ts
  --from-ssm`; local (`aws sso`) and CI (OIDC role) both use the same loader path.
- `e2e-nightly`: the scheduled, non-blocking GitHub Actions workflow — doctor visibility, live
  suite run, GitHub issue open/update/close on failure/recovery.

### Modified Capabilities
(none — the generation flow and merge gate are explicitly unchanged)

## Constraints & Assumptions

- This workstream is scoped to the **registry repo** only (`registry/packages/utdk-e2e` +
  `registry/.github/workflows`) per the decision record ("WS-7 `utdk-e2e-bench` (free; registry
  repo)") — no aprovan-repo or core-repo changes.
- **Assumption**: new SecureString parameters use the default AWS-managed KMS key
  (`alias/aws/ssm`), so the existing `ssm:GetParameter`/`ssm:GetParameters` grant on
  `CiStack`'s deploy role is sufficient with no added `kms:Decrypt` statement. Flagged as an
  open question — confirm before Task 4 (owner action) provisions parameters with a
  non-default key.
- **Assumption**: `vars.AWS_DEPLOY_ROLE_ARN` is already configured as a registry-repo variable
  (it must be — `registry-deploy.yml` and `workspace-image.yml` already require it).
- No backward compatibility required anywhere in this repo (standing convention); delete/replace
  freely within `@utdk/e2e`.

## Open Questions

1. **Nightly cron time.** Recommend `0 8 * * *` (08:00 UTC) — arbitrary off-peak slot, no
   dependency identified on any specific time. Confirm or override.
2. **Tracking-issue assignment.** Recommend label-only (`utdk-e2e-nightly`), no auto-assignee —
   the owner already watches repo activity. Confirm.
3. **KMS key for the new SecureStrings.** Recommend the default `alias/aws/ssm` key (zero extra
   IAM). If per-secret access control is wanted later, that's a follow-up CDK change to
   `CiStack`, not part of this pass.
