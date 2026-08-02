## ADDED Requirements

### Requirement: scheduled, non-blocking workflow
`registry/.github/workflows/utdk-e2e-nightly.yml` SHALL run on a nightly `schedule:` cron plus
`workflow_dispatch`, MUST NOT be triggered by `pull_request`, and MUST NOT be configured as a
required status check — so its outcome cannot block or gate any merge.

#### Scenario: workflow triggers
- **WHEN** the nightly cron fires, or a maintainer runs `workflow_dispatch`
- **THEN** the workflow executes; a `pull_request` event never triggers it

#### Scenario: no PR is ever blocked by this workflow
- **WHEN** the live suite fails on a scheduled run
- **THEN** no open pull request's mergeability is affected, because this workflow is not listed
  among the repo's required status checks and runs on an independent trigger

### Requirement: doctor runs for visibility, not as a shell-level gate
The workflow SHALL always run `doctor` after fetching credentials, and SHALL always run
`test:live` afterward regardless of doctor's reported ready-count — relying on `test:live`'s
existing per-provider skip-on-missing-credential behavior rather than parsing doctor's output to
decide whether to invoke vitest at all.

#### Scenario: doctor output is captured for context
- **WHEN** the workflow runs `pnpm --filter @utdk/e2e doctor` after `env:scaffold -- --from-ssm`
- **THEN** its table (READY/missing/BROKEN/no-probe per provider) is captured in the job log and
  made available to the failure-reporting step for context

#### Scenario: `test:live` always executes
- **WHEN** doctor reports zero READY providers
- **THEN** `pnpm --filter @utdk/e2e test:live` still runs and completes successfully (every case
  self-skips), rather than the workflow special-casing a "nothing to do" exit before vitest runs

### Requirement: failure reporting via a single tracking GitHub issue
When `test:live` reports one or more failures, the workflow SHALL open a GitHub issue labeled
`utdk-e2e-nightly` if none is open, or comment on the existing one if it is — the workflow MUST
NOT create a duplicate tracking issue per run.

#### Scenario: first failure opens a new issue
- **WHEN** `test:live` fails and no open issue labeled `utdk-e2e-nightly` exists
- **THEN** the workflow creates one, labeled `utdk-e2e-nightly`, with a body listing each failing
  provider, its failure reason, and a link to the workflow run

#### Scenario: repeat failure updates the existing issue
- **WHEN** `test:live` fails and an open issue labeled `utdk-e2e-nightly` already exists
- **THEN** the workflow adds a comment to that issue with the new run's date, failures, and a
  link — it does not open a second issue

#### Scenario: recovery auto-closes the issue
- **WHEN** `test:live` completes with no failures and an open issue labeled
  `utdk-e2e-nightly` exists
- **THEN** the workflow comments that the suite is green and closes the issue

#### Scenario: a clean run with no prior open issue is silent
- **WHEN** `test:live` completes with no failures and no open issue labeled `utdk-e2e-nightly`
  exists
- **THEN** the workflow takes no GitHub-issue action

### Requirement: workflow completes even when probes fail
A live-probe failure inside `test:live` SHALL NOT prevent the issue-reporting step from running —
the job MUST reach the reporting step regardless of the test step's outcome.

#### Scenario: reporting step runs after a failing test step
- **WHEN** one or more live probes fail in the `test:live` step
- **THEN** the step's failure is captured (not left to abort the job) so the subsequent
  issue-open/update step still executes in the same job run
