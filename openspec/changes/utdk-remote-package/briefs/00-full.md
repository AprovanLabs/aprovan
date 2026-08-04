# Brief: utdk-remote-package (streams 1–5)

## Mission
Create and publish `@utdk/remote` (proxy/transport/policy/paginate/imports, zero `@aprovan/*` deps,
depth-0 call signature from tools-global D2). Merge sandbox hosts, point widget runtime + registry
playground at `@utdk/remote`, retire `@aprovan/runtime`.

## Gate
**Blocked until `tools-global` is merged to aprovan (+registry) main.** Package names may be
`@aprovan/patchwork` / `@aprovan/editor` after that merge — use post-rename names.

## Read first
prd.md, tech-plan.md, tasks.md, specs/ under openspec/changes/utdk-remote-package/
Brief path: this file. Settled OQs: publish 0.1.0; keep imports.ts move here; re-export pagination;
playground migrates in this change.

## Tasks
Streams 1–5 verbatim from tasks.md. After stream 1 creates `registry/packages/remote`,
profiles-unified stream 6 may proceed (orchestrator coordinates).

## Acceptance criteria
### remote-client-package

#### Scenario: Importable from a sandboxed widget

- **WHEN** widget code running in a `null`-origin iframe imports the package
- **THEN** the module graph resolves with no reference to `document`, `window`, or any iframe-creating code

### remote-client-package

#### Scenario: No sandbox host in the package

- **WHEN** the published package contents are inspected
- **THEN** no module creates an iframe or implements the `service-call` / `service-result` host side

### remote-client-package

#### Scenario: No Aprovan dependency

- **WHEN** the package manifest's dependencies are inspected
- **THEN** no entry is in the `@aprovan` scope

### remote-client-package

#### Scenario: Aprovan consumes it

- **WHEN** the widget runtime needs a namespace proxy or a gateway transport
- **THEN** it imports from `@utdk/remote` rather than declaring its own

### remote-client-package

#### Scenario: Compiler uses the shared proxy

- **WHEN** the widget runtime assembles the `tools` root
- **THEN** the namespace nodes are constructed by `@utdk/remote`, not by a local copy

### remote-client-package

#### Scenario: No surviving duplicates

- **WHEN** both repositories are searched for a proxy that builds a dotted procedure path and dispatches it
- **THEN** exactly one implementation is found

### remote-client-package

#### Scenario: One host implementation

- **WHEN** both repositories are searched for code that creates a sandboxed iframe and answers `service-call` messages
- **THEN** exactly one implementation is found, in the widget runtime package

### remote-client-package

#### Scenario: Playground uses the same host

- **WHEN** the registry playground runs a script in a sandbox
- **THEN** it uses the shared host rather than a second implementation

### remote-client-package

#### Scenario: Removed from manifests

- **WHEN** dependency manifests are inspected
- **THEN** `@aprovan/runtime` appears in none of them

### remote-client-package

#### Scenario: Removed from publishing

- **WHEN** the publish workflow runs
- **THEN** it neither builds nor publishes `@aprovan/runtime`

## Verify
Per-stream Verify lines in tasks.md; final: `pnpm check-types` in both repos.

## Git
- Registry branch `iw7/utdk-remote` for streams 1,4,5 (package + playground + delete runtime)
- Aprovan branch `iw7/utdk-remote` for streams 2,3 (compiler mount merge + consume remote)
- Worktrees under `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/`
- Open PRs; do not merge.

## Constraints
Touches only globs in tasks.md. Do not start profiles stream 6 or editor-consolidation.

## Report
briefs/00-report.md with PR URLs + note that profiles-unified stream 6 unblocked after remote package on main.
