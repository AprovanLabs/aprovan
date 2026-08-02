# provider-naming-authority

One explicit authority for mapping API hostnames to package names, and the end of
dot-splitting in provider-name handling.

## ADDED Requirements

### Requirement: Explicit hostname-to-package authority map

The bundler SHALL own a single hostname→package authority module that maps an API hostname
to its package name and import path. The map SHALL contain explicit entries for known
hostnames and apply a `.com` default rule for the rest:

- Explicit entries win: `github.com → @utdk/github`, `drive.google.com → @utdk/google/drive`
  (name `google/drive`), `synthetic.new → @utdk/synthetic-new` (name `synthetic-new`).
- `.com` default: `<vendor>.com → <vendor>`; `<service>.<vendor>.com → <vendor>/<service>`.
- Any hostname not ending in `.com` and not explicitly mapped SHALL resolve to its
  full-domain slug as a single dash-joined segment (`synthetic.new → synthetic-new`,
  `github.io → github-io`) — never to a multi-segment name derived from domain dots.

All ingest sources (`scripts/sources/apis-guru.ts` and future sources) SHALL derive
provider names through this authority, not through local slug logic.

#### Scenario: Explicit entry wins over default

- **WHEN** the authority resolves `drive.google.com`
- **THEN** it returns provider name `google/drive` with package `@utdk/google` and import
  specifier `utdk/google/drive`

#### Scenario: .com default applies

- **WHEN** the authority resolves `linear.com` (no explicit entry)
- **THEN** it returns provider name `linear` with package `@utdk/linear`

#### Scenario: Non-.com TLD collapses to one segment

- **WHEN** the authority resolves `synthetic.new` (no explicit entry)
- **THEN** it returns the single-segment name `synthetic-new` and package
  `@utdk/synthetic-new`, and no path segment boundary is introduced at the domain dot

### Requirement: Provider names never contain dots

Provider names in `data/registry.json` and throughout the bundler SHALL use `/` as the only
segment separator and SHALL contain no `.` characters. `splitProviderName`
(`packages/bundler/src/provider.ts`) SHALL split on `/` only. Existing dotted names in
`data/registry.json` SHALL be normalized through the authority map in this change.
Tool-name prefix stripping SHALL continue to accept dotted *tool prefixes*
(`github.repos.get`) since dots remain the namespace/operation separator on the tool
surface — the prohibition applies to provider identity, not tool names.

#### Scenario: splitProviderName ignores dots

- **WHEN** `splitProviderName("synthetic-new")` and `splitProviderName("google/drive")` run
- **THEN** they return `["synthetic-new"]` and `["google", "drive"]` respectively, and a
  hypothetical dotted input is not split at the dot

#### Scenario: Registry data is dot-free

- **WHEN** every `name` in `data/registry.json` is checked
- **THEN** none contains a `.` character

#### Scenario: Generation round-trip for a mapped provider

- **WHEN** the generation flow (`pnpm --filter @utdk/e2e test:generation`) runs after the
  authority map lands
- **THEN** provider directory layout, package exports, and import specifiers for
  multi-segment providers (`google/drive`-shaped) are unchanged, and single-segment
  dash-named providers resolve to one directory level
