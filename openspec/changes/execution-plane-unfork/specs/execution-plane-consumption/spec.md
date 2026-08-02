# execution-plane-consumption — delta spec

## ADDED Requirements

### Requirement: Aprovan contains no execution-plane source

The aprovan repo SHALL NOT contain the forked execution-plane packages: `packages/utdk`,
`packages/contracts`, `packages/runtime`, `packages/bundler`, `packages/mcp`,
`packages/mcp-core`, and `packages/registry-server` are deleted. No `pnpm-workspace.yaml`
glob, turbo pipeline entry, tsconfig reference, or CI workflow SHALL reference them (the
dead `!packages/utdk/dist/**` exclusion is removed with them).

#### Scenario: Forked directories are gone

- **WHEN** the aprovan tree is listed after the change
- **THEN** none of `packages/{utdk,contracts,runtime,bundler,mcp,mcp-core,registry-server}`
  exist, and `grep -rn "packages/utdk\|packages/contracts\|packages/registry-server" `
  over `pnpm-workspace.yaml`, `turbo.json`, root `package.json`, and `.github/workflows/`
  returns no matches

### Requirement: Execution-plane dependencies resolve from npm only

Every aprovan dependency on execution-plane code SHALL be a published npm semver range:
`server/workspace` depends on `@utdk/{agent,common,llm,mcp-core,sandbox}`, `utdk`, and
`@aprovan/registry-server` via semver; `client/web` depends on `@aprovan/runtime` via
semver. No `workspace:*` or `link:` reference to an execution-plane package SHALL remain,
and the root `pnpm.overrides` entries forcing `@utdk/common` and `@utdk/mcp-core` to
`workspace:*` SHALL be removed.

#### Scenario: No workspace links to the execution plane

- **WHEN** `grep -rn "workspace:\*" --include=package.json` (excluding `node_modules`) is
  run over the aprovan repo after the change
- **THEN** no match names `utdk`, an `@utdk/*` package, `@aprovan/registry-server`, or
  `@aprovan/runtime`

#### Scenario: Embedded registry server still works

- **WHEN** `server/workspace` starts locally (`WORKSPACE_MODE=local`) against the
  npm-installed `@aprovan/registry-server` and a tool call is dispatched through the
  embedded server (which shares the host `ProviderExecutor` via `executorInstance`)
- **THEN** the call executes identically to the forked build, including provider module
  resolution via the npm-installed `utdk` package (`utdk/registry.json`,
  `import("utdk/<provider>")`)

### Requirement: Local launch configuration targets aprovan's own server

`aprovan/.claude/launch.json` SHALL NOT reference the registry checkout. The
`gateway-local-scratch` configuration launches the gateway from aprovan's
`server/workspace` (the `@aprovan/workspace` package) with its existing environment
(`APROVAN_ENV=off`, `WORKSPACE_MODE=local`, `WORKSPACE_PORT=4010`, scratch data dir) and
port unchanged.

#### Scenario: Scratch gateway launches from aprovan

- **WHEN** the `gateway-local-scratch` launch configuration is started on a machine with
  only the aprovan checkout
- **THEN** the gateway starts on port 4010 from `server/workspace` and no path outside the
  aprovan repo is referenced by `launch.json`

### Requirement: Aprovan builds and ships from a fresh clone with no siblings

A fresh clone of the aprovan repo, with no sibling `registry` checkout, SHALL run
`pnpm install && pnpm build && pnpm typecheck && pnpm test` green, and the
`server/workspace` Docker image SHALL build from the same tree (its vendored-packages
rationale comment updated to the npm-consumption reality).

#### Scenario: Fresh aprovan clone is green

- **WHEN** the aprovan repo is cloned into an isolated directory (no `../registry`) and
  `pnpm install && pnpm build && pnpm typecheck && pnpm test` runs
- **THEN** all four commands exit 0

#### Scenario: Workspace image builds

- **WHEN** `docker build -f server/workspace/Dockerfile .` runs from the fresh clone
- **THEN** the image builds successfully, resolving execution-plane packages from npm via
  the committed lockfile

### Requirement: No absolute checkout paths remain in aprovan

No git-tracked file in the aprovan repo SHALL contain an absolute path into any developer
checkout (the 15 `/Users/...` manifest lines die with `packages/utdk`; `launch.json` loses
its registry path).

#### Scenario: Absolute-path grep is clean

- **WHEN** `git grep -n "/Users/"` is run in the aprovan repo after the change
- **THEN** there are no matches
