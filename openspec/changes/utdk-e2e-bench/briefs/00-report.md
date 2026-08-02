# Report: utdk-e2e-bench — streams 1–2

## Status

Streams 1 (SSM credential loading) and 2 (nightly workflow) are **complete** and pushed as one
PR. Stream 3 (owner-run: populate SSM) and stream 4 (blocked on `product-plane-move`) are
untouched, per the brief — left unchecked in `tasks.md`.

- Worktree: `/private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-e2e`
  (branch `utdk-e2e-bench`, off `registry@main`), pushed to `origin/utdk-e2e-bench`.
- Two commits, incremental by stream:
  1. `feat(utdk-e2e): load credentials from SSM via write-env.ts --from-ssm`
  2. `feat(ci): add nightly UTDK E2E workflow (never gates merges)`
- `tasks.md` (main aprovan checkout, uncommitted) updated: 1.1–1.5 and 2.1–2.4 checked; 2.5
  (manual GH Actions dispatch) explicitly left unchecked with a note — it needs Task 3 done
  first and a real Actions run, neither of which this agent can do.

## PR

**https://github.com/AprovanLabs/registry/pull/74**

Title: "utdk-e2e-bench: SSM credential loading + nightly E2E workflow"

## Verify results

```
pnpm --filter @utdk/e2e typecheck && pnpm --filter @utdk/e2e test:all
```
- `typecheck`: passes (0 errors). Required `pnpm turbo run build --filter="@utdk/e2e^..."`
  first in a fresh worktree — `@utdk/common`/`utdk` workspace deps ship pre-built `dist/`, which
  a plain `pnpm install` doesn't produce. This is pre-existing repo structure, not something
  introduced by this change (confirmed: `typecheck` passes with no build step on the pre-existing
  `main` checkout, which already had `dist/` built from prior work).
- `test:all`: **281 passed, 150 skipped**, 3 files (`tests/generation.test.ts`,
  new `tests/ssm-env.test.ts`, `tests/live.test.ts`). No failures.

```
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/utdk-e2e-nightly.yml')); print('valid yaml')"
```
- **valid yaml** (used a scratch venv with PyYAML since the ambient `python3` had no `yaml`
  module; same file, same check).

Additional manual checks performed (all against a mocked `SSMClient` or no-credential local
state — no real AWS/SSM calls):
- `pnpm env:scaffold` and `pnpm env:scaffold -- --env` still produce byte-identical
  `.env.example`/`.env` content to before the change (regenerated and diffed — `.env.example`
  showed no diff in `git status`).
- Verified the vitest JSON reporter's actual shape (`testResults[].assertionResults[]` with
  `status`/`fullName`/`failureMessages`) matches what the tech-plan assumed, and hand-verified
  the `github-script` parsing regex against both a `live: <provider> > <flow>` test name and the
  `gateway canary > ...` test name.
- Confirmed (then reverted) that `tests/live.test.ts` hard-**fails** — not skips — on the
  always-on, no-credential `petstore` probe when the `utdk` workspace package's `dist/` isn't
  built, because `runDirectFlow` dynamically `import()`s `utdk/<provider>` at runtime (resolved
  through `utdk`'s package exports, i.e. its build output, not source). This is why the workflow
  gained a build step — see Deviations.

## Deviations from the task list

1. **Added a build step to the workflow, not in the original task list.** Between
   `pnpm install --frozen-lockfile` and the SSM-fetch/doctor/test:live steps, the workflow now
   runs `pnpm turbo run build --filter="@utdk/e2e^..."`. Without it, `test:live` isn't just
   slower or less informative — it's **wrong**: the always-on `petstore` case (no auth required)
   hard-fails on module resolution instead of running the probe, and any provider whose SSM
   credential *does* resolve would fail the same way instead of actually probing the live API.
   This would silently defeat the entire purpose of the nightly run for every ready provider.
   Verified locally by deleting `packages/utdk/dist` and re-running `test:live` (see above).
   Noted inline in the workflow's header comment, in the commit message, in `tasks.md` under
   2.2, and in the PR body.

2. **`schedule:` trigger included from the start, not staged behind `workflow_dispatch`-only.**
   `tech-plan.md`'s Rollout narrative (step 2) suggests landing the workflow
   `workflow_dispatch`-only first, adding `schedule:` only after step 4's manual verification.
   But `tasks.md` task 2.1 explicitly specifies `schedule: '0 8 * * *'` as part of the initial
   file, and the formal spec (`specs/e2e-nightly/spec.md`, Requirement "scheduled, non-blocking
   workflow") states the workflow *SHALL* run on cron + `workflow_dispatch` — that's a stream
   1–2 acceptance scenario I'm required to satisfy. I resolved this in favor of the literal
   task/spec text and included `schedule:` now. This is low-risk: GitHub only fires `schedule:`
   triggers for workflow files present on the **default branch**, so it's inert until this PR
   merges to `main`. I flagged in `tasks.md` (2.5) and below that the owner should either do the
   manual-dispatch verification promptly after merging, or temporarily disable the scheduled
   trigger in the GitHub UI until they have.

3. **`aws-sdk-client-mock@^4.1.0` added as a new devDependency**, not previously in the repo
   anywhere (checked; `@aws-sdk/client-ssm` itself is already used in `core/packages/node` and
   `registry/infra` at `^3.848.0`, which I matched). Necessary to satisfy task 1.4's explicit
   ask for mocked-`SSMClient` unit tests without hand-rolling a mock.

No other deviations. `src/matrix.ts`, `src/flows.ts`, `tests/generation.test.ts` untouched, per
the tech-plan's non-goals. No AWS resources created; no calls made against real
`/aprovan/test/utdk-creds/*` parameters — `tests/ssm-env.test.ts` mocks `SSMClient` entirely.

## Owner runbook: stream 3 (populate SSM + first live doctor run)

Not delegable to an agent — requires real third-party account creation and real secrets
(`tasks.md` task 3 is explicit about this). Steps:

1. **Confirm the deploy role variable is set** (should already be true — `registry-deploy.yml`
   has required it since before this change):
   ```
   gh variable get AWS_DEPLOY_ROLE_ARN -R AprovanLabs/registry
   ```
   If unset, the nightly workflow's job is skipped entirely (`if: vars.AWS_DEPLOY_ROLE_ARN != ''`).

2. **Spot-check the KMS assumption** before relying on it nightly (tech-plan Risk / PRD Open
   Question 3) — confirm a role with only `ssm:GetParameter` (no explicit `kms:Decrypt` grant)
   can still decrypt against the default `alias/aws/ssm` key:
   ```
   aws ssm put-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN \
     --type SecureString --value <a-real-or-throwaway-token>
   aws ssm get-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN --with-decryption \
     --query Parameter.Value --output text
   ```
   If this fails under the deploy role's actual permission set, the plan's "zero new IAM
   surface" assumption (D3/D4) is wrong and needs revisiting before going further.

3. **Populate credentials**, one `SecureString` per environment variable, at
   `/aprovan/test/utdk-creds/<ENV_VAR_NAME>` — the name is exactly the `.env.example` key (see
   `packages/utdk-e2e/.env.example` for the full list, or run
   `pnpm --filter @utdk/e2e env:scaffold` to regenerate it). Example:
   ```
   aws ssm put-parameter --name /aprovan/test/utdk-creds/GITHUB_TOKEN \
     --type SecureString --value <token>
   ```
   Per `credentialUrl`/`credentialHint` comments already in `.env.example`. Prioritize
   `signup: "self-serve"` providers in `src/matrix.ts` first — fastest coverage, no approval
   wait. Zero populated is a valid state (doctor reports 0 ready, `test:live` all-skips, no
   issue opens) — this does not need to be done all at once.

4. **Verify locally** (or from a machine with `aws sso login` against the test account):
   ```
   cd registry
   pnpm --filter @utdk/e2e env:scaffold -- --from-ssm
   pnpm --filter @utdk/e2e doctor
   ```
   Expect at least one `READY` row for whatever you populated in step 3.

5. **Manually dispatch the workflow** (this is `tasks.md` task 2.5, left unchecked — it's the
   one piece of stream 2 this agent could not do):
   ```
   gh workflow run utdk-e2e-nightly.yml --ref utdk-e2e-bench -R AprovanLabs/registry
   # or, once merged: --ref main
   ```
   Confirm: the job completes; `doctor`'s table appears in both the job log and the run's step
   summary; with everything populated correctly, `test:live` passes/skips cleanly and **no**
   issue is opened.

6. **Force one deliberate failure** (e.g. temporarily `put-parameter` a garbage value over a
   real token, or use an obviously-wrong `GITHUB_TOKEN`) and re-dispatch. Confirm: a new issue
   opens labeled `utdk-e2e-nightly`, titled "UTDK nightly E2E — live probe failures", with a
   `{provider, flow, reason}` table and a link back to the run. Re-dispatch again with the same
   bad value — confirm it **comments** on the same issue rather than opening a second one.
   Restore the good value and dispatch once more — confirm it comments "✅ green again..." and
   **closes** the issue.

7. Once 5–6 look right, either leave the already-committed `schedule: '0 8 * * *'` trigger as-is
   (it only activates on `main`, so if you're doing this verification pre-merge you're already
   safe), or if you did it post-merge and want a clean window, temporarily disable the workflow
   via the GitHub Actions UI ("..." → "Disable workflow") and re-enable once satisfied.

8. Confirm the workflow is **not** added to the repo's required status checks (branch protection
   settings) — it shouldn't be, since nothing in this PR touches branch protection, but worth a
   one-time check since that setting lives outside the repo's files.
