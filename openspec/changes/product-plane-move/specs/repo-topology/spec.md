# repo-topology — delta spec

## ADDED Requirements

### Requirement: Aprovan monorepo owns the product plane

The aprovan repo SHALL contain the entire product plane and everything needed to build and
deploy it: the moved `apps/workspace` server (minus the WS-3-extracted execution plane), the
moved packages `registry-ui`, `registry-main`, `sandbox-bashkit`, `sandbox-host`,
`sandbox-image-node`, and `aprovan-cli`, the moved registry `infra/` CDK app and deploy
scripts, core's `infra/aws` stacks and Cloudflare terraform, and core's `packages/ui`. All
intra-product dependencies SHALL resolve as `workspace:*` — the workspace server's former
dependency on published `@aprovan/patchwork-compiler` (the circular edge) SHALL become a
workspace dependency.

#### Scenario: Fresh clone builds with no siblings

- **WHEN** the aprovan repo is cloned fresh (no sibling `registry`/`core` checkouts) and
  `pnpm install && pnpm build && pnpm typecheck && pnpm test` is run
- **THEN** all steps succeed, resolving cross-repo code only from published npm (the WS-3
  registry server package) and internal code only from workspace packages

#### Scenario: Circular edge is gone

- **WHEN** the dependency graph of the aprovan monorepo is inspected after the move
- **THEN** no package in the registry repo depends on any aprovan-repo package, and the
  workspace server consumes `@aprovan/patchwork-compiler` via `workspace:*`

### Requirement: Registry repo builds standalone

The registry repo SHALL retain only the execution plane (the WS-3 registry server package and
its supporting packages: `utdk`, `utdk-cli`, `utdk-e2e`, `bundler`, `mcp`, `mcp-core`,
`runtime`) and the catalog site, and SHALL build from a fresh clone with no aprovan checkout
and no local links. Anything it consumes that is published from the aprovan repo (UI packages
for the catalog) SHALL be consumed via published npm semver ranges only.

#### Scenario: Fresh registry clone

- **WHEN** the registry repo is cloned fresh and `pnpm install && pnpm build && pnpm
  typecheck` is run
- **THEN** all steps succeed with no reference to a sibling checkout, no `link:` deps, and no
  `workspace:*` reference to a moved package

#### Scenario: Moved directories are gone

- **WHEN** the registry repo tree is listed after the move
- **THEN** `apps/workspace`, `packages/registry-ui`, `packages/registry-main`,
  `packages/sandbox-bashkit`, `packages/sandbox-host`, `packages/sandbox-image-node`,
  `packages/aprovan-cli`, and `infra/` do not exist, and no `pnpm-workspace.yaml` glob or
  turbo pipeline references them

### Requirement: apps/registry splits into catalog and product surfaces

The catalog site SHALL stay in the registry repo, keeping the catalog, providers, packages,
docs, and playground pages plus its build-time walk of `packages/utdk`. The credentials and
admin surfaces (`account/*` pages, `admin/*` pages, `components/credentials/*`,
`components/auth/*`, `AdminPanel`) SHALL move into the aprovan product app as workspace
panels. Retired catalog routes SHALL serve a static moved-notice page.

#### Scenario: Catalog has no account surface

- **WHEN** the catalog site is built after the split
- **THEN** the build contains no credential or admin management pages, and requests to the
  former `account/*` and `admin/*` routes serve the static moved-notice page

#### Scenario: Credential management works in the product app

- **WHEN** a signed-in workspace user opens the credentials panel in the product app and
  creates a credential
- **THEN** the credential is stored via the embedded registry server's credential API and is
  usable by tool calls, identically to the pre-move catalog flow

### Requirement: Core repo is dissolved

Core's `infra/aws` (MainStack, WebStack, CiStack), `infra/cloudflare` terraform (including
`workspace-tunnel.tf`), and `packages/ui` SHALL move into the aprovan repo. The config
packages (`eslint-config`, `prettier-config`, `tsconfig`, `vitest-config`) SHALL be inlined
as plain files in each consuming repo and their npm packages deprecated. Personal tooling
(`agents/`, `evals/`, `skills/`, `prompts/`) SHALL be evicted to a repo outside AprovanLabs
product repos (owner-run). After all of the above, the core repo SHALL be archived.

#### Scenario: No build or deploy depends on core

- **WHEN** the aprovan and registry repos are each built and deployed after the dissolution
- **THEN** no step clones, reads, or publishes from the core repo, and no `package.json` in
  either repo depends on `@aprovan/eslint-config`, `@aprovan/prettier-config`,
  `@aprovan/tsconfig`, or `@aprovan/vitest-config`

#### Scenario: Config behavior preserved

- **WHEN** `pnpm lint` and `pnpm typecheck` run in a repo with inlined configs
- **THEN** they enforce the same rules as the former config packages (same effective eslint
  ruleset and tsconfig bases)

### Requirement: Local-link escape hatch is removed

`.pnpmfile.cjs` SHALL be deleted from the aprovan repo and the `APROVAN_LOCAL_LINKS`
mechanism SHALL not be reintroduced anywhere; the packages it linked (`@aprovan/ui`,
`@aprovan/registry-ui`, `@aprovan/registry-main`) are workspace packages after the move.

#### Scenario: No local links remain

- **WHEN** the aprovan repo is searched for `pnpmfile` and `APROVAN_LOCAL_LINKS` after the
  move
- **THEN** there are no matches, and `client/web` consumes `@aprovan/ui`,
  `@aprovan/registry-ui`, and `@aprovan/registry-main` as `workspace:*`
