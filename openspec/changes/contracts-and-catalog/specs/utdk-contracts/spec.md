# utdk-contracts

Contract packages as first-class, top-level, published workspace packages.

## ADDED Requirements

### Requirement: Contract packages are top-level workspace packages

The five existing contract packages (`@utdk/sql`, `@utdk/llm`, `@utdk/sandbox`,
`@utdk/vcs`, `@utdk/agent`) SHALL live under `registry/packages/contracts/<name>/`, outside
the generated provider catalogue (`registry/packages/utdk/`). Each SHALL build and typecheck
standalone via its own `package.json` scripts. `@utdk/common` SHALL remain at
`packages/utdk/common` (its `dist/common/` output is load-bearing for the root `utdk`
package's `client.ts` relative import).

#### Scenario: Contract builds standalone

- **WHEN** `pnpm --filter @utdk/vcs build` is run from a fresh clone of the registry repo
- **THEN** the package compiles to its own `dist/` with declarations, without building the
  `utdk` catalogue package

#### Scenario: Catalogue directory contains no contract sources

- **WHEN** the top-level entries of `registry/packages/utdk/` are listed
- **THEN** no directory named `sql`, `llm`, `sandbox`, `vcs`, or `agent` exists there, while
  provider suite subdirectories such as `github/vcs` remain untouched

### Requirement: Every contract manifest carries the utdk.contract marker

Every contract package manifest SHALL declare `"utdk": { "contract": "<name>", "handwritten": true }`,
including `@utdk/sql` (which today lacks the marker). This marker SHALL be the machine-readable
criterion by which tooling (catalog site, WS-3 registry server) enumerates contracts.

#### Scenario: Marker present on all nine contracts

- **WHEN** the manifests under `packages/contracts/*/package.json` are read
- **THEN** all nine (`sql`, `llm`, `sandbox`, `vcs`, `agent`, `keyvalue`, `events`, `vfs`,
  `telemetry`) contain a `utdk.contract` field equal to the package's contract name

#### Scenario: Marker distinguishes contracts from providers

- **WHEN** a tool enumerates workspace packages looking for contracts
- **THEN** filtering on the presence of `utdk.contract` yields exactly the contract
  packages and no generated provider content

### Requirement: The four contract exclusion lists are eliminated

The aligned contract exclusion lists SHALL be removed: `SKIP_TOP_DIRS` in
`packages/utdk/build.mjs`, `skippedTopDirs` in `packages/utdk/copy-assets.mjs`, the
contract-name entries in `packages/utdk/tsconfig.json` `exclude`, and the contract names in
the bundler's `providersOnDisk` skip-set (`packages/bundler/src/render.ts`). After the move,
no build script, tsconfig, or bundler code SHALL enumerate contract names to keep them out
of the catalogue build. Non-contract skip entries (`dist`, `node_modules`, `common`,
`__tests__`, `.turbo`) remain.

#### Scenario: No contract names in build tooling

- **WHEN** `packages/utdk/build.mjs`, `packages/utdk/copy-assets.mjs`,
  `packages/utdk/tsconfig.json`, and `packages/bundler/src/render.ts` are searched for the
  strings `"sql"`, `"llm"`, `"sandbox"`, `"agent"`, `"vcs"` as skip/exclude entries
- **THEN** no such entries exist

#### Scenario: Suite adapters survive the removal

- **WHEN** the `utdk` catalogue package is rebuilt after the exclusion lists are removed
- **THEN** the `github/vcs` adapter suite still transpiles into `dist/github/vcs/` and the
  regenerated exports map still advertises it

### Requirement: New contract packages keyvalue, events, vfs, telemetry exist

Four new contract packages SHALL be created under `packages/contracts/`: `@utdk/keyvalue`,
`@utdk/events`, `@utdk/vfs`, and `@utdk/telemetry`, each implementing the surface defined in
the tech plan (Interfaces & Data). Each SHALL follow the established contract-package
pattern: exported types, a contract error class carrying an HTTP-ish `status`, argument
validation helpers, a `<name>ToolEntries(provider, …)` tool-discovery factory, client
options accepting injected `headers`/`baseUrl`/`fetchImpl`, and unit tests. `@utdk/vfs`
SHALL be a minimal file contract (read/write/delete/list/stat) — sessions, overlays, and
mounts MUST NOT appear in its surface. `@utdk/telemetry` SHALL be OTLP-shaped: its export
payloads follow the OTLP/HTTP JSON encoding for spans and logs.

#### Scenario: New contracts build and test

- **WHEN** `pnpm --filter @utdk/keyvalue --filter @utdk/events --filter @utdk/vfs --filter @utdk/telemetry build`
  and the corresponding `test` scripts run
- **THEN** all four packages compile with declarations and their unit tests pass

#### Scenario: vfs surface stays minimal

- **WHEN** the exported surface of `@utdk/vfs` is inspected
- **THEN** it exposes only file-plane operations (read/write/delete/list/stat) and contains
  no session, overlay, or mount concept

#### Scenario: telemetry export accepts OTLP-shaped payloads

- **WHEN** a caller passes an OTLP/HTTP JSON `resourceSpans`/`resourceLogs` payload to the
  `@utdk/telemetry` validation helpers
- **THEN** the payload validates without transformation, and a payload missing required
  OTLP fields (e.g. a span without `traceId`) is rejected with a contract error

### Requirement: Each contract surface is shape-audited before freezing

Each of the five promoted contracts SHALL have a recorded shape audit validating its
surface against 2–3 real would-be provider APIs before its surface is frozen (version bump
to 0.2.0). The four new contracts SHALL receive the same audit at creation time. An audit
SHALL name the vendors checked, map each contract operation onto the vendor's API, and list
surface changes made (or explicitly record "no change"). Audit notes live in the contract
package (e.g. `packages/contracts/<name>/AUDIT.md`).

#### Scenario: Audit exists per contract

- **WHEN** a contract package is versioned 0.2.0 or higher
- **THEN** its package directory contains an audit record naming at least two real vendor
  APIs the surface was mapped against, with per-operation findings

#### Scenario: Audit gates the freeze

- **WHEN** a contract has no completed audit record
- **THEN** its version remains below 0.2.0 and WS-3 consumers treat its surface as
  unfrozen

### Requirement: Shared credential types are published from @utdk/common

The gateway credential-type vocabulary (`bearer_token`, `api_key`, `oauth2_client`,
`oauth2_authcode`) SHALL be exported from `@utdk/common` (the existing `./auth` subpath)
as the single source of truth. `packages/bundler/src/phases/authIntel.ts` SHALL import
`AuthIntelMethod`/credential-type definitions from `@utdk/common` instead of mirroring
them, and its LLM output schema enum SHALL be derived from the imported values.

#### Scenario: Bundler imports the shared types

- **WHEN** `packages/bundler/src/phases/authIntel.ts` is inspected
- **THEN** it contains no locally-declared credential-type union and imports the type and
  its runtime value list from `@utdk/common`

#### Scenario: Divergence is impossible by construction

- **WHEN** a credential type is added to `@utdk/common`
- **THEN** the bundler's auth-intel schema enum includes it on next build with no bundler
  code change

### Requirement: CI publishes all contract packages

The registry publish workflow (`.github/workflows/publish.yml`) SHALL include
`@utdk/sandbox`, `@utdk/agent`, and `@utdk/vcs` (missing today) plus the four new contract
packages in its publish list, alongside the existing `@utdk/common`, `@utdk/sql`,
`@utdk/llm`, `@utdk/mcp-core`, and `utdk`. Every published contract manifest SHALL carry
`"publishConfig": { "access": "public" }` and a license (`@utdk/sql` and `@utdk/llm` lack
these today).

#### Scenario: Publish list covers all contracts

- **WHEN** the publish workflow's package loop is read
- **THEN** all nine `@utdk/*` contract packages are listed, and the per-package
  skip-if-already-published behavior is preserved

#### Scenario: Manifests are publishable

- **WHEN** `pnpm publish --dry-run` is executed for each contract package
- **THEN** none is rejected for missing access config or license
