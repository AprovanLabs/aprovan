## ADDED Requirements

### Requirement: Root package name reflects the aprovan product repo
The repo root's `package.json` `name` field SHALL identify the repo as an aprovan package,
not as "patchwork".

#### Scenario: Root package name no longer contains "patchwork"
- **WHEN** reading the `name` field of the repo root `package.json`
- **THEN** it SHALL NOT contain the substring "patchwork"

### Requirement: README framing matches the repo's role as the aprovan product repo
`README.md`'s title and opening description SHALL identify the repo as the aprovan product
repo rather than "patchwork", while continuing to accurately describe any individual
`@aprovan/patchwork-*` packages that still exist under their real (unrenamed) names.

#### Scenario: README title is not "patchwork"
- **WHEN** reading the top-level heading of `README.md`
- **THEN** it SHALL NOT read "# patchwork"

#### Scenario: Package descriptions inside the README stay accurate
- **WHEN** the README describes an individual package (e.g. `@aprovan/patchwork-web`,
  `@aprovan/patchwork-mcp`)
- **THEN** it SHALL use that package's real, current name — this change does not rename
  sub-packages, so the README SHALL NOT claim they have been renamed

### Requirement: Workspace package globs match the actual package layout
`pnpm-workspace.yaml` SHALL NOT declare a glob for a directory that does not exist in the repo.

#### Scenario: Dead `apps/**` glob is removed
- **WHEN** reading `pnpm-workspace.yaml`
- **THEN** it SHALL NOT include an `apps/**` entry, since no `apps/` directory exists at the
  repo root
