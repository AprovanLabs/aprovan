## ADDED Requirements

### Requirement: SSM parameter naming convention
Every environment variable the provider matrix declares (credential slots from
`credentialEnvKeys(auth)`, plus each probe's `needs` fixtures and `baseUrlEnv`) SHALL map 1:1 to
an SSM SecureString parameter at `/aprovan/test/utdk-creds/<ENV_VAR_NAME>`, where
`<ENV_VAR_NAME>` MUST be exactly the variable name as it appears in `.env.example` — no
translation table, no provider-nested path segment.

#### Scenario: parameter name is derivable without a lookup table
- **WHEN** a developer or CI job needs the SSM parameter name for `GITHUB_TOKEN`
- **THEN** the parameter name is exactly `/aprovan/test/utdk-creds/GITHUB_TOKEN`

#### Scenario: shared variables are not duplicated per provider
- **WHEN** the twelve `google/*` providers all read `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
  and `GOOGLE_REFRESH_TOKEN`
- **THEN** exactly one SSM parameter exists per variable name (`/aprovan/test/utdk-creds/GOOGLE_CLIENT_ID`,
  etc.), not one per provider

### Requirement: `write-env.ts --from-ssm`
`scripts/write-env.ts` SHALL gain a `--from-ssm` flag that batch-fetches every derived parameter
name from SSM (via `ssm:GetParameters`, chunked to AWS's 10-names-per-call limit, with
`WithDecryption: true`) and writes a `.env` file in the same format `env:scaffold` already
produces, populated with whatever values SSM returned.

#### Scenario: fetch and write `.env` from SSM
- **WHEN** a developer runs `pnpm --filter @utdk/e2e env:scaffold -- --from-ssm` with an
  authenticated AWS session
- **THEN** the script resolves every credential/fixture variable name from the matrix, fetches
  their values from `/aprovan/test/utdk-creds/*` in chunks of at most 10 names per
  `GetParameters` call, and writes `.env` with the resolved values

#### Scenario: a parameter with no value degrades to blank, not failure
- **WHEN** a derived parameter name (e.g. `/aprovan/test/utdk-creds/MERCURY_API_TOKEN`) does not
  exist in SSM
- **THEN** the script leaves that variable's line blank in the written `.env` — the same "valid
  partially-filled state" the manual scaffold already tolerates — rather than throwing

#### Scenario: an SSM/auth failure is not silently swallowed
- **WHEN** the SSM API call itself fails (expired SSO session, `AccessDenied`, throttling
  exhausted after retry)
- **THEN** the script exits non-zero with the underlying error, distinct from "parameter simply
  absent" — so a broken AWS session is diagnosed immediately rather than reported as "every
  provider unready"

#### Scenario: existing `.env` is not clobbered without explicit opt-in
- **WHEN** `.env` already exists and `--from-ssm` is run without `--force`
- **THEN** the script refuses to overwrite it and reports that it was skipped, matching the
  existing `--env` flag's "refusing to overwrite credentials" guard

#### Scenario: `--force` allows a refresh
- **WHEN** `.env` already exists and `--from-ssm --force` is run
- **THEN** the script overwrites `.env` with freshly fetched SSM values

### Requirement: local and CI flows share one credential path
Both the local developer flow and the CI flow SHALL resolve credentials through the same
`--from-ssm` code path and the same default AWS SDK credential chain (`SSMClient({})`) — no
bespoke authentication code for either caller.

#### Scenario: local developer flow via AWS SSO
- **WHEN** a developer has run `aws sso login` against the test account and has ambient AWS
  credentials in their shell
- **THEN** `pnpm --filter @utdk/e2e env:scaffold -- --from-ssm` succeeds with no additional
  configuration beyond the default SDK credential chain

#### Scenario: CI flow via the existing OIDC deploy role
- **WHEN** the nightly workflow has assumed `vars.AWS_DEPLOY_ROLE_ARN` (`CiStack`'s
  `RegistryDeployRole`) via `aws-actions/configure-aws-credentials`
- **THEN** the same `--from-ssm` invocation succeeds using the role's credentials, with no
  workflow-specific SSM code

### Requirement: zero new IAM surface
Fetching `/aprovan/test/utdk-creds/*` SHALL NOT require any CDK or IAM change, because
`CiStack`'s `RegistryDeployRole` already grants `ssm:GetParameter`/`ssm:GetParameters` against
the resource wildcard `arn:aws:ssm:*:<account>:parameter/aprovan/*`, which covers the new
parameter path.

#### Scenario: batch fetch succeeds under the existing grant
- **WHEN** `--from-ssm` calls `ssm:GetParameters` with an exact list of parameter names under
  `/aprovan/test/utdk-creds/`
- **THEN** the call succeeds under the existing `ReadDeployParameters` policy statement with no
  changes to `core/infra/aws/src/stacks/ci.ts`
