# deployment — delta spec

## ADDED Requirements

### Requirement: Two published images, built where their code lives

Exactly two Docker images SHALL be published: `aprovan/registry` (execution plane only),
built and published from the registry repo (WS-3 owns its content), and `aprovan/workspace`
(all-in-one product, embedding the registry server), built and published from the aprovan
repo. The aprovan repo SHALL own the workspace image's Dockerfile and a CI workflow that
builds both architectures natively (amd64 + arm64 by digest, stitched into one multi-arch
tag) — the same build reachable locally via a `scripts/image.sh` equivalent. The registry
repo's `workspace-image.yml` workflow and `apps/workspace/Dockerfile` SHALL be removed.

#### Scenario: Workspace image builds from aprovan

- **WHEN** the workspace image build runs from a fresh aprovan clone (CI or
  `scripts/image.sh build`)
- **THEN** it produces a runnable image whose container starts the product server with the
  embedded registry server, resolving all registry-repo code from published npm during the
  image build

#### Scenario: Registry repo no longer builds the workspace image

- **WHEN** the registry repo's workflows and tree are inspected after the move
- **THEN** no workflow or Dockerfile in the registry repo references the workspace image;
  the registry repo builds only `aprovan/registry`

### Requirement: All infra lives in the aprovan repo

The aprovan repo SHALL contain all infrastructure-as-code: the registry repo's `infra/` CDK
app (ECS service, Dynamo tables, S3), core's MainStack/WebStack/CiStack CDK app, and core's
Cloudflare terraform including `workspace-tunnel.tf`. The moved code SHALL keep its behavior
— including synth-time resolution of the shared SSM env and the image-pin parameter
(`/aprovan/<env>/workspace/image`) — and the registry and core repos SHALL contain no infra.

#### Scenario: Infra synth from aprovan

- **WHEN** the moved CDK apps are synthesized from the aprovan repo with valid AWS
  credentials
- **THEN** synth succeeds and produces templates equivalent to the pre-move stacks (same
  logical resources; only source location and CI wiring differ)

#### Scenario: Registry repo ships artifacts only

- **WHEN** the registry repo is inspected after the move
- **THEN** it contains no CDK app, no terraform, and no ECS deploy script — its CI publishes
  npm packages, the `aprovan/registry` image, and the static catalog site only

### Requirement: ECS service cuts over to the aprovan-built workspace image

The production ECS service SHALL be cut over to the `aprovan/workspace` image built from the
aprovan repo using the existing SSM image-pin mechanism: writing the new tag to
`/aprovan/<env>/workspace/image` and running the (now aprovan-hosted) infra deploy makes the
release; re-pinning the previous registry-built tag and redeploying is the rollback. The
cutover SHALL be an owner-run step.

#### Scenario: Release via image pin

- **WHEN** the owner runs the deploy script with a new aprovan-built image tag
- **THEN** the SSM parameter is updated, CDK registers a new task-definition revision, the
  service rolls onto the new image, and the app serves at its existing URLs with login and
  tool dispatch working

#### Scenario: Rollback via image pin

- **WHEN** the owner re-runs the deploy script with the previously pinned tag
- **THEN** the service rolls back to that image with no other stack changes

### Requirement: Surviving npm packages publish from their owning repo

The aprovan repo SHALL gain a publish workflow (modeled on the existing stable-then-dev-SHA
flow) covering every moved package with an external consumer — `@aprovan/ui`,
`@aprovan/registry-ui`, `@aprovan/registry-main`, `@aprovan/cli`, `@aprovan/sandbox-host`,
`@aprovan/sandbox-bashkit`, `@aprovan/sandbox-image-node`, plus `@aprovan/patchwork-compiler`
and any other already-published aprovan package — publishing in dependency order (leaves
first). The registry repo's publish list SHALL shrink to its remaining packages. Core's
publish workflow SHALL be retired. Packages with no remaining external consumer
(`@aprovan/cdk`, `@aprovan/node`, the config packages) SHALL stop publishing and be
`npm deprecate`d — never unpublished.

#### Scenario: Catalog consumes aprovan-published UI

- **WHEN** the catalog site installs from a fresh registry clone after an aprovan-side
  publish
- **THEN** `@aprovan/ui`, `@aprovan/registry-ui`, and `@aprovan/registry-main` resolve from
  npm at versions published by the aprovan repo's workflow

#### Scenario: Publish is ordered and idempotent

- **WHEN** the aprovan publish workflow runs twice on the same commit
- **THEN** the first run publishes any not-yet-published stable versions in dependency order
  and the second run skips them all without failing

### Requirement: Deploy scripts move and keep SSM discovery

The registry repo's deploy scripts for the workspace service (`deploy-infra.sh`,
`image.sh`, and shared lib) SHALL move to the aprovan repo and merge with the existing
aprovan `scripts/deploy*.sh` family, preserving the env-var → SSM-parameter → default
resolution order so the same script runs locally (AWS_PROFILE) and in CI (OIDC). The
registry repo SHALL keep only its catalog-site deploy script.

#### Scenario: One-command deploy from aprovan

- **WHEN** the owner runs the aprovan repo's deploy entry point with an AWS profile
- **THEN** web assets, infra, and image pinning are each reachable from aprovan scripts with
  configuration discovered from SSM, with no script left in aprovan or registry referencing a
  path that moved
