# Brief: 06 — Provider schema/version lint (task 5.4)

## Mission

The last open task of graphql-schema-surface. Streams 1–5 landed versioned
API schemas for registry providers: a provider entry may declare
`apiVersions` + `defaultVersion`, ship SDL under a `schemas/` directory, and
profiles pin a `version` that selects both endpoint and schema. What is
missing is the guard that keeps the catalog coherent as providers are added:
a lint that fails when (a) a provider ships `schemas/` but declares no
`defaultVersion`, or (b) a declared version has no matching schema file.
When you are done, catalog drift between declared versions and shipped
schemas is a build-time error in the registry repo, not a runtime surprise.

## Read first

All paths under /Users/jacob/Documents/Code/AprovanLabs/aprovan unless noted:

1. openspec/changes/graphql-schema-surface/tasks.md — section "5. API
   version as a first-class field" (task 5.4 is yours; 5.1–5.3 and 5.5 are
   done and describe the shape you are linting).
2. openspec/changes/graphql-schema-surface/briefs/05-api-version.md and
   05-report.md — what stream 5 built and where.
3. openspec/changes/graphql-schema-surface/briefs/01-ingest-sdl.md and
   01-report.md — where provider `schemas/` live and how they are ingested.
4. In the registry repo (/Users/jacob/Documents/Code/AprovanLabs/registry):
   `data/registry.json` (provider entries), the schema directories the
   ingest stream established, and any existing registry-data validation
   script wired into build/test — extend the existing validation seam rather
   than inventing a new entry point.

## Tasks

- [ ] 5.4 Lint: a provider with `schemas/` must declare `defaultVersion`, and every
      declared version must have a schema file.

## Acceptance criteria

- A provider directory containing `schemas/` whose registry entry lacks
  `defaultVersion` fails the lint with an error naming the provider.
- A registry entry declaring a version in `apiVersions` with no
  corresponding schema file fails the lint naming provider + version.
- The current catalog passes (fix any real drift the lint uncovers only if
  it is mechanical — a missing `defaultVersion` that has exactly one
  shipped version; otherwise report it).
- The lint runs in the registry repo's existing verification path (test
  suite or build step), so CI-less local `pnpm --filter
  @aprovan/registry-server test` (or the data-validation equivalent the
  repo already uses) exercises it.

## Verify

Run in the registry repo:

    pnpm --filter @aprovan/registry-server test -- profiles

plus a demonstration in your report: temporarily break one provider (both
failure modes), show the lint failing with a useful message, then restore.

Known baseline: the full registry-server suite has 4 pre-existing failures
(`tests/dispatch.test.ts` ×2, `tests/server.test.ts` ×2 — documented in
openspec/changes/iw9-f3-credential-levels/briefs/02-report.md). Your change
must add zero failures beyond that baseline.

## Constraints

- Work in an isolated worktree of the registry repo:
  `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add
  /Users/jacob/Documents/Code/AprovanLabs/worktrees/graphql-schema-lint -b
  graphql-schema-lint origin/main`
- Registry repo only; do not modify the aprovan repo (the orchestrator
  handles tasks.md and this report's placement).
- Surgical changes; match existing validation style. Do not restructure
  provider data.
- The versioned-schema semantics from streams 1–5 are fixed; if the lint
  seems to contradict them, stop and report.

## Report back

Open a PR against registry main (do not merge). Final message: PR URL,
verify output verbatim, the break-one-provider demonstration, any real
catalog drift found, deviations. The orchestrator saves this as
briefs/06-report.md and checks off task 5.4.
