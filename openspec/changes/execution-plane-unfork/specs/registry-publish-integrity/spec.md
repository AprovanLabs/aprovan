# registry-publish-integrity — delta spec

## ADDED Requirements

### Requirement: Fork divergence is reconciled upstream before the fork is deleted

The registry repo's `packages/registry-server` SHALL absorb the aprovan fork's two source
deltas — the `executorInstance?: ProviderExecutor` option in `src/config/types.ts` (honored
in `src/server.ts` as `options.executorInstance ?? new ProviderExecutor(options.executor ?? {})`)
and the monorepo-contracts resolution fallback in `src/catalog/default.ts` — and SHALL be
published under a new version before any aprovan-side deletion lands. After reconciliation,
a source diff of `aprovan/packages/registry-server/src` against
`registry/packages/registry-server/src` SHALL show no divergence.

#### Scenario: Reconciled files match the fork's behavior

- **WHEN** the reconciliation commit lands in the registry repo and
  `diff -r aprovan/packages/registry-server/src registry/packages/registry-server/src`
  is run (excluding build artifacts)
- **THEN** the only remaining differences, if any, are in the aprovan fork's favor of the
  upstream (i.e. upstream is a superset), and `src/catalog/default.ts`,
  `src/config/types.ts`, and `src/server.ts` are byte-identical

#### Scenario: Embedding host can share its executor

- **WHEN** a host constructs the registry server passing `executorInstance`
- **THEN** the server uses the supplied `ProviderExecutor` instead of constructing its own,
  and omitting the option preserves the previous behavior

### Requirement: Published registry-server is installable from npm

`@aprovan/registry-server` SHALL be installable in an empty project from the public npm
registry. In particular every dependency pnpm rewrites from `workspace:*` at publish time —
including `utdk` — SHALL exist on npm at the referenced version. The registry `publish.yml`
stable list SHALL succeed for `utdk` (currently version-listed but never published, which
makes `@aprovan/registry-server@0.1.0` unresolvable).

#### Scenario: Clean-room install

- **WHEN** `npm install @aprovan/registry-server` runs in a fresh temporary directory with
  no pnpm workspace, no sibling checkouts, and default npm registry configuration
- **THEN** the install succeeds and `node -e "import('@aprovan/registry-server')"` (or the
  package's documented entrypoint check) loads without module-resolution errors

#### Scenario: utdk meta-package is on npm

- **WHEN** `npm view utdk version` is run after the publish pipeline completes
- **THEN** it prints the version referenced by the published `@aprovan/registry-server`
  dependency range

### Requirement: @aprovan/runtime is published from the registry repo

The registry repo SHALL publish `@aprovan/runtime` (its `packages/runtime`, currently
tracked but absent from the `publish.yml` build and stable lists) so that aprovan's
`client/web` can consume it via npm semver instead of the fork.

#### Scenario: Runtime package available

- **WHEN** `npm view @aprovan/runtime version` is run after the publish pipeline completes
- **THEN** it prints a version satisfying the range declared by `aprovan/client/web`

### Requirement: Published artifacts carry no absolute checkout paths

No git-tracked manifest in the registry repo, and no file in any published registry npm
tarball, SHALL contain an absolute filesystem path into a developer checkout. The five
provider manifests currently embedding `/Users/...` values in their `utdk.docs` fields
(`packages/utdk/{anthropic,figma,gemini,github,posthog}/package.json`) SHALL be scrubbed —
normalized to repo-relative form consistent with the bundler's own rendering contract
(`.registry/<provider>/manifest.json`, `packages/utdk/<provider>/docs`) or removed. No
runtime or build consumer of these fields exists, so behavior SHALL be otherwise unchanged.

#### Scenario: Repo grep is clean

- **WHEN** `grep -rn "/Users/" packages/utdk --include=package.json` (excluding
  `node_modules` and `dist`) is run in the registry repo
- **THEN** there are no matches

#### Scenario: Tarball grep is clean

- **WHEN** `pnpm --filter utdk publish --dry-run` (or `npm pack`) produces the `utdk`
  tarball and its contents are searched for `/Users/`
- **THEN** there are no matches

### Requirement: Registry workspace metadata matches the tracked tree

`pnpm-workspace.yaml` SHALL contain no glob for a directory absent from the git-tracked tree
(the dead `infra` entry is removed), and `pnpm-lock.yaml` SHALL contain no importer for a
directory absent from the git-tracked tree (stale importers remain for `apps/workspace`,
`infra`, `packages/{aprovan-cli,registry-main,registry-ui,sandbox-bashkit,sandbox-host,
sandbox-image-node,utdk-isolate}` and removed `packages/utdk/*` contract subdirectories).
The `publish.yml` stable list SHALL not reference packages that no longer live in the
registry repo (`@aprovan/sandbox-image-node` moved to aprovan in WS-4).

#### Scenario: Frozen install on a fresh clone

- **WHEN** the registry repo is cloned fresh and `pnpm install --frozen-lockfile` is run
- **THEN** the install succeeds without lockfile mismatch errors

#### Scenario: No stale importers

- **WHEN** the importer keys of `pnpm-lock.yaml` are compared against directories containing
  a git-tracked `package.json`
- **THEN** every importer key corresponds to a tracked package directory

### Requirement: Registry repo builds standalone from a fresh clone

A fresh clone of the registry repo, with no sibling checkouts and no local links, SHALL run
`pnpm install && pnpm build && pnpm typecheck && pnpm test` green.

#### Scenario: Fresh registry clone is green

- **WHEN** the registry repo is cloned into an isolated directory (no `../aprovan`) and
  `pnpm install && pnpm build && pnpm typecheck && pnpm test` runs
- **THEN** all four commands exit 0
