## 1. SSM credential loading

> Depends-on: - | Touches: `registry/packages/utdk-e2e/src/ssm-env.ts`, `registry/packages/utdk-e2e/scripts/write-env.ts`, `registry/packages/utdk-e2e/tests/ssm-env.test.ts`, `registry/packages/utdk-e2e/package.json` | Verify: `pnpm --filter @utdk/e2e typecheck && pnpm --filter @utdk/e2e test:all`

- [x] 1.1 Add `@aws-sdk/client-ssm` as a direct dependency of `@utdk/e2e` (`package.json`).
- [x] 1.2 Create `src/ssm-env.ts` exporting `fetchFromSsm(names, options?)` per the tech-plan's
      "`src/ssm-env.ts` module contract": chunks `names` to ≤10 per `GetParametersCommand` call,
      `WithDecryption: true`, prefix defaults to `/aprovan/test/utdk-creds/`, returns only names
      that had a value, rethrows on API/auth failure (satisfies e2e-credentials spec scenarios
      "fetch and write .env from SSM", "a parameter with no value degrades to blank", "an
      SSM/auth failure is not silently swallowed").
- [x] 1.3 Extend `scripts/write-env.ts` with `--from-ssm` and `--force`: derive the same
      variable-name list `render()` already computes, call `fetchFromSsm`, write `.env` in the
      existing scaffold format populated with resolved values; refuse to overwrite an existing
      `.env` unless `--force` is passed (mirrors the current `--env` guard). Satisfies
      e2e-credentials spec scenarios "existing .env is not clobbered" / "--force allows a
      refresh".
- [x] 1.4 Add `tests/ssm-env.test.ts` using a mocked `SSMClient` (e.g. `aws-sdk-client-mock`) to
      assert: chunking never exceeds 10 names per call, `WithDecryption: true` is always set,
      missing parameters are omitted from the result rather than throwing, and an API error
      (e.g. `AccessDeniedException`) propagates.
- [x] 1.5 Update the README's "Credentials" section to document `--from-ssm`/`--force` alongside
      the existing `env:scaffold -- --env` flow, and the naming convention
      (`/aprovan/test/utdk-creds/<ENV_VAR_NAME>`).

## 2. Nightly workflow

> Depends-on: 1 | Touches: `registry/.github/workflows/utdk-e2e-nightly.yml` | Verify: `python3 -c "import yaml; yaml.safe_load(open('registry/.github/workflows/utdk-e2e-nightly.yml')); print('valid yaml')"`

- [x] 2.1 Create `.github/workflows/utdk-e2e-nightly.yml`: `permissions: {contents: read,
      id-token: write, issues: write}`; triggers `schedule: '0 8 * * *'` (PRD open question —
      adjust if the owner specifies otherwise) and `workflow_dispatch`; explicitly no
      `pull_request` trigger (e2e-nightly spec: "scheduled, non-blocking workflow").
- [x] 2.2 Steps: checkout → setup pnpm/node → `pnpm install --frozen-lockfile` →
      `aws-actions/configure-aws-credentials@v4` with `role-to-assume: ${{ vars.AWS_DEPLOY_ROLE_ARN }}`
      (same pattern as `registry-deploy.yml`) → `pnpm --filter @utdk/e2e env:scaffold --
      --from-ssm --force` → `pnpm --filter @utdk/e2e doctor` (always runs, output captured to the
      job log/summary) → `pnpm --filter @utdk/e2e test:live -- --reporter=default
      --reporter=json --outputFile=live-results.json` with `continue-on-error: true` so the job
      reaches the reporting step regardless of outcome (e2e-nightly spec: "doctor runs for
      visibility, not as a shell-level gate"; "workflow completes even when probes fail").
      DEVIATION: added a `pnpm turbo run build --filter="@utdk/e2e^..."` step between install and
      the SSM fetch — `runDirectFlow` dynamically `import()`s `utdk/<provider>`, which resolves
      through the `utdk` package's built `dist`/exports, not its source; verified locally that
      `test:live` hard-fails (not skips) on the always-on `petstore` (no-auth) case without a
      prior build. Not in the original task list; required for the workflow to actually work.
- [x] 2.3 Add a reporting step using `actions/github-script`: parse `live-results.json`
      (`testResults[].assertionResults[]`, `status === "failed"`), and:
      - no failures + no open `utdk-e2e-nightly`-labeled issue → no action
      - no failures + an open issue exists → comment "green again", close it
      - failures + no open issue → create one, labeled `utdk-e2e-nightly`, stable title, body =
        date + run link + failing `{provider, flow, reason}` rows
      - failures + an open issue exists → comment with this run's date/failures, don't duplicate
      Satisfies all four "failure reporting" scenarios in e2e-nightly spec.
- [x] 2.4 Add a header comment (matching the style of `registry-deploy.yml`/`web.yml`) stating
      the required `vars.AWS_DEPLOY_ROLE_ARN` config, the SSM path this reads
      (`/aprovan/test/utdk-creds/*`), and that this workflow never gates merges.
- [ ] 2.5 Manual verification (not automatable from this task list): `gh workflow run
      utdk-e2e-nightly.yml --ref <branch>` against the registry repo once Task 3 has populated at
      least one provider's credentials; confirm the job completes, doctor output appears in the
      log, and — using a deliberately-broken credential to force a failure — the issue
      open/comment/close lifecycle behaves as specced. Do this before adding the `schedule:`
      trigger (tech-plan Rollout step 2). NOT DONE — owner action, requires Task 3 (SSM
      populated) and a live GitHub Actions run; left unchecked. See report's owner runbook.
      Note: the workflow file as committed already includes the `schedule:` trigger (per 2.1 and
      the e2e-nightly spec's literal requirement); `schedule:` only activates once merged to
      `main`, so this poses no risk before merge — but the owner should do this manual dispatch
      verification promptly after merge, or temporarily disable the scheduled trigger in the
      GitHub UI until verified.

## 3. Owner action — populate SSM parameters

> Depends-on: - | Touches: AWS SSM Parameter Store (`/aprovan/test/utdk-creds/*`) — no repo files | Verify: `aws ssm get-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN --with-decryption --query Parameter.Value --output text` returns a non-empty value; `pnpm --filter @utdk/e2e env:scaffold -- --from-ssm && pnpm --filter @utdk/e2e doctor` shows at least one `READY` row

**Not delegable to an agent** — requires real third-party account creation and real secrets. The
owner (or someone with access) must:

- [ ] 3.1 For each provider to cover, create the real credential (following `credentialUrl` /
      `credentialHint` already documented per-provider in `.env.example`) and write it to
      `/aprovan/test/utdk-creds/<ENV_VAR_NAME>` as a `SecureString`, e.g.:
      `aws ssm put-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN --type SecureString
      --value <token>`.
- [ ] 3.2 Confirm `vars.AWS_DEPLOY_ROLE_ARN` is set as a registry-repo Actions variable (should
      already be true per `registry-deploy.yml`'s existing requirement — verify, don't assume).
- [ ] 3.3 Spot-check the KMS assumption (PRD Open Question 3 / tech-plan Risk): run `aws ssm
      get-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN --with-decryption` under a role
      that has only `ssm:GetParameter` (no explicit `kms:Decrypt` grant) and confirm it succeeds
      against the default `alias/aws/ssm` key before Task 2.5's manual workflow run.
- [ ] 3.4 Not every provider needs to be populated immediately — even zero populated is a valid
      state (the nightly job will just report 0 READY and take no issue action). Prioritize
      providers with `signup: "self-serve"` in `src/matrix.ts` first for fastest coverage.

## 4. Stub: seeded-tenant gateway-flow variant (blocked)

> Depends-on: WS-4 `product-plane-move` (external, not yet implemented) | Touches: none in this pass | Verify: n/a — blocked, no code produced here

- [ ] 4.1 **Blocked, listed for completeness only.** Once WS-4 lands the registry server
      extraction + product-plane move, add a fifth flow variant that runs the existing
      `gateway`/`store` flows against a seeded, dedicated test tenant (rather than the
      developer's own local/deployed workspace) so the nightly run doesn't depend on a
      hand-provisioned local gateway. Revisit this task when WS-4 is archived; it needs its own
      PRD/tech-plan pass at that point (tenant seeding/teardown, isolation from other test
      tenants, credential-store cleanup ordering) rather than being speculatively designed now
      against infrastructure that doesn't exist yet.
