# Brief: Registry — level model, schema, creation rules

- **Change**: `iw9-f3-credential-levels` (stream 1 of 7)
- **Repo**: `registry` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/registry`
- **Depends-on**: none — this is the first dependency-safe wave; nothing
  else in this change may start before this stream's tests are green
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`'s model-tier table —
  F3 is not in the Opus-escalation list; contracts here are frozen in the
  tech-plan, this is elaboration against fixed interfaces)

## Mission

When you are done, every credential row in `@aprovan/registry-server`
carries a `level` — `workspace-token`, `workspace-oauth`, or `user-oauth`
— validated against its payload type at creation, defaulted when omitted,
and race-safe against duplicate per-user connections. Legacy rows (no
stored level) resolve deterministically without a data migration. This is
the foundation every other F3 stream builds on: registry publishes it
(stream 3), aprovan pins it (stream 4) and mirrors it in its own stores
(stream 5), and the invoker-aware resolution logic in stream 2 depends on
`CredentialLevel`/`effectiveLevel` existing first.

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry` unless noted.

Orchestrator context (read in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`, do not edit anything there):

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 1 ("Identity follows
   the credential"), decisions D12/D15/D22
2. `docs/decisions/0002-app-first-platform-invariants.md` — binding ADR
   recording invariant 1
3. `openspec/changes/iw9-f3-credential-levels/prd.md` — problem, A1-A3
   (confirmed — treat as settled, not proposals)
4. `openspec/changes/iw9-f3-credential-levels/tech-plan.md` — read in
   full; D1, D2, D3, **D3a** (the race-safe uniqueness mechanism this
   stream implements), D3b (context only — D3b's fix lands in stream 5,
   not here, but explains why `CredentialProvisionInput.level` matters
   beyond this repo)
5. `openspec/changes/iw9-f3-credential-levels/specs/credential-levels/spec.md`
   — every requirement below is copied into Acceptance criteria, but read
   it in place too
6. `openspec/changes/iw9-f3-credential-levels/briefs/deviations.md` — line
   drift and lint-baseline notes (not load-bearing for this stream's line
   citations, which were verified exact, but read for context)

This repo — read in this order, each file grounds the next:

7. `packages/registry-server/src/credentials/types.ts` — payload shapes;
   this is where `CredentialLevel` and `effectiveLevel` land
8. `packages/registry-server/src/storage/types.ts` — `CredentialRow`,
   `CredentialStore.create()`'s input type, `CredentialProvisionInput`
   (currently has no `level` field — you are adding it)
9. `packages/registry-server/src/storage/schema.ts` — the `credentials`
   table DDL (you are adding a nullable `level TEXT` column and a partial
   unique index)
10. `packages/registry-server/src/storage/sql-client.ts` — read
    `UniqueConstraintError` and the `wrapConstraint`/`isUniqueViolation`
    functions (lines 47-68); every driver's `run()` already converts a
    unique-index violation into this error automatically — you rely on
    this, you do not reimplement it
11. `packages/registry-server/src/storage/sql-storage.ts` — `CRED_COLS`,
    `SqlCredentialStore.create` (~lines 121-151), and `provisionCredential`
    (~lines 581-631, especially the `credentialStore.create()` call at
    ~591-597 — this is a *second* place `level` must be threaded, not just
    the row mapping)
12. `packages/registry-server/src/storage/dynamo-storage.ts` — the
    `provisionCredential`'s `credentials.create()` call (~lines 660-670)
    — same threading requirement; note `credentials` here is a
    host-injected `CredentialStore` (this file does not implement it),
    so your only job in this file is passing `level` through, not
    validating it
13. `packages/registry-server/src/credentials/service.ts` — `create`
    (~line 99) and the existing `OAuthClientResolutionError` catch
    (~lines 93-98) — you add a sibling catch for `UniqueConstraintError`
    here, in the same style
14. `packages/registry-server/src/credentials/__tests__/` — existing test
    files for house style (assertions, fixtures, sqlite in-memory setup)

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`
(aprovan repo), section "1. Registry — level model, schema, creation
rules":

- [ ] 1.1 Add `CredentialLevel` union and `effectiveLevel(type, stored?)`
      backfill function to `credentials/types.ts` (tech-plan D1/D2:
      `bearer_token`/`api_key` → `workspace-token`; `oauth2_client`/
      `oauth2_authcode` → `workspace-oauth`; never `user-oauth` from
      backfill). Spec: credential-levels "Legacy rows backfill to
      workspace levels".
- [ ] 1.2 Add nullable `level TEXT` to the `credentials` table
      (`storage/schema.ts`) plus the D3a partial unique index
      (`CREATE UNIQUE INDEX IF NOT EXISTS credentials_user_oauth_owner ON credentials(tenant_id, provider, created_by) WHERE level = 'user-oauth';`
      — portable across sqlite/libsql/postgres); `level?: CredentialLevel`
      on `CredentialRow` AND on `CredentialProvisionInput`
      (`storage/types.ts`) and `CredentialStore.create()`'s input; thread
      `level` through `sql-storage.ts` (CRED_COLS, row mapping, AND the
      `credentialStore.create()` call inside `provisionCredential()` at
      :591-597) and `dynamo-storage.ts` (row mapping AND the
      `credentials.create()` call inside `provisionCredential()` at
      :664-670) — the column alone is not enough if the provisioning path
      drops the field on the way to storage.
- [ ] 1.3 `CredentialService.create`: validate the level/payload-type
      matrix, derive the default level from payload type when absent,
      require `createdBy` for `user-oauth`, and rely on the D3a partial
      unique index for one `user-oauth` row per (tenant, provider,
      createdBy) — catch `UniqueConstraintError` (import from
      `../storage/index.js`, alongside the existing
      `OAuthClientResolutionError` catch at :93-98) and rethrow a
      `CredentialResolutionError` naming the provider and "already
      connected"; do NOT implement this as list-then-insert (a
      check-then-insert race — see tech-plan D3a) (tech-plan D3/D3a; spec:
      credential-levels "Level and payload-type compatibility",
      "User-level credentials have an owner").
- [ ] 1.4 New test file
      `credentials/__tests__/credential-levels.test.ts` covering: level
      round-trip on list/get, unknown level rejected, type-mismatch
      rejected, authcode-as-workspace-oauth accepted, ownerless
      user-oauth rejected, duplicate (provider, owner) rejected via the
      partial unique index (assert the friendly error, not a raw
      constraint message), two distinct owners accepted, `effectiveLevel`
      backfill for all four payload types.

## Acceptance criteria

Copied in full from
`openspec/changes/iw9-f3-credential-levels/specs/credential-levels/spec.md`
(aprovan repo) — these are the tests of done:

### Requirement: Three credential levels

Every credential record SHALL carry exactly one `level` from the closed
vocabulary `workspace-token` | `workspace-oauth` | `user-oauth` (IW-9
invariant 1). The level SHALL be stored on the row in both repositories
(`CredentialRecord` in the workspace, `CredentialRow` in
`@aprovan/registry-server`) and SHALL be returned by every list/get surface
that returns credential metadata.

#### Scenario: Level is present on every read surface
- **WHEN** a credential is created with any level and then read back via
  `list`, `get`, or the store adapter
- **THEN** the returned record includes the same `level` value that was
  stored

#### Scenario: Unknown level values are rejected
- **WHEN** a credential is created with a `level` outside the three-value
  vocabulary
- **THEN** creation fails with a validation error naming the allowed values

### Requirement: Level and payload-type compatibility

The level SHALL be validated against the credential's payload type at
creation: `workspace-token` requires a static payload (`bearer_token` or
`api_key`); `user-oauth` requires `oauth2_authcode`; `workspace-oauth`
requires an OAuth payload (`oauth2_client` or `oauth2_authcode`). When no
level is supplied, the default SHALL derive from the payload type:
`bearer_token`/`api_key` → `workspace-token`, `oauth2_client` →
`workspace-oauth`, `oauth2_authcode` → `user-oauth`.

#### Scenario: Incompatible level is rejected
- **WHEN** a credential is created with payload type `bearer_token` and
  level `user-oauth`
- **THEN** creation fails with an error naming the level/type mismatch

#### Scenario: Default level derives from payload type
- **WHEN** a credential is created with payload type `oauth2_authcode` and
  no explicit level
- **THEN** the stored level is `user-oauth`

#### Scenario: Authcode payload may be a shared bot
- **WHEN** a credential is created with payload type `oauth2_authcode` and
  explicit level `workspace-oauth`
- **THEN** creation succeeds and the stored level is `workspace-oauth`

### Requirement: User-level credentials have an owner

A `user-oauth` credential SHALL record its owner (the connecting user's
sub) and creation SHALL fail when no owner is available. Workspace-level
credentials keep `createdBy` as provenance only. A workspace SHALL hold at
most one `user-oauth` credential per (provider, owner) pair.

#### Scenario: User-level credential without an owner is rejected
- **WHEN** a `user-oauth` credential is created with no authenticated
  user sub in the calling context
- **THEN** creation fails rather than storing an ownerless user-level row

#### Scenario: Duplicate user connection is rejected
- **WHEN** a user who already owns a `user-oauth` credential for a provider
  creates a second `user-oauth` credential for the same provider in the
  same workspace
- **THEN** creation fails with an error identifying the existing connection

#### Scenario: Two users connect the same provider
- **WHEN** two different users each create a `user-oauth` credential for
  the same provider in the same workspace
- **THEN** both rows exist, each with its own owner

### Requirement: Legacy rows backfill to workspace levels

Credential rows that predate the `level` field SHALL resolve to a
deterministic level derived from their payload type — `bearer_token`/
`api_key` → `workspace-token`; `oauth2_client`/`oauth2_authcode` →
`workspace-oauth` — preserving their current workspace-shared behavior. No
legacy row SHALL ever backfill to `user-oauth`. The backfill SHALL apply on
read (a missing stored level maps to the derived value) so no bulk data
migration is required before deploy.

#### Scenario: Legacy static row resolves as workspace-token
- **WHEN** a pre-existing `api_key` credential row without a stored level
  is read or resolved
- **THEN** it behaves as `workspace-token` on every surface

#### Scenario: Legacy authcode row stays workspace-shared
- **WHEN** a pre-existing `oauth2_authcode` credential row without a stored
  level is read or resolved
- **THEN** it behaves as `workspace-oauth` (shared), and no invoker is cut
  off from a connection that worked before the migration

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/registry`
unless otherwise noted. All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server test
grep -n "level" packages/registry-server/src/storage/schema.ts
```

Additional checks (not in the original task metadata, added so this brief
does not depend on a later stream to catch a regression):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server build
pnpm --filter @aprovan/registry-server exec tsc --noEmit -p .
```

Lint: this repo's root `pnpm lint` has a pre-existing, unrelated baseline
of **236 errors / 22 warnings** (verified 2026-08-09, mostly `import/order`
in generated `packages/utdk/*` clients — see `briefs/deviations.md` in the
aprovan repo). Do not run root `pnpm lint` as your gate and do not treat a
green root lint as required or achievable. Instead run the scoped check
and confirm you have not raised its count above the pre-existing
**35 errors / 0 warnings**:

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
npx eslint "packages/registry-server/src/**/*.ts"
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (D1-D3, D3a) are fixed — if one seems wrong, stop and report instead of
  changing it.
- Surgical changes only; match existing style (idempotent `IF NOT EXISTS`
  DDL, the `str`/`optStr` row-mapping helpers already in `sql-storage.ts`,
  the try/catch-`UniqueConstraintError` idiom already used by
  `SqlTenantStore.ensure` and `SqlGrantStore.grant`).
- Do not modify files outside:
  `packages/registry-server/src/credentials/**`,
  `packages/registry-server/src/storage/**`,
  `packages/registry-server/src/credentials/__tests__/credential-levels.test.ts`.
- New tests go in the new file named above; do not extend existing test
  files.
- Never import across repos — this stream's only cross-repo artifact is
  what gets published in stream 3.
- Do not touch `openspec/changes/iw9-f3-credential-levels/**` in the
  aprovan repo (read-only context for this brief).

## Report back

When done: check off tasks 1.1-1.4 in
`openspec/changes/iw9-f3-credential-levels/tasks.md` (aprovan repo), and
write `openspec/changes/iw9-f3-credential-levels/briefs/01-report.md`
(aprovan repo) containing: what you built, how you verified it (paste the
Verify output), any deviations from this brief and why, and anything
stream 2 needs to know (e.g. the exact `CredentialLevel` union member
names/casing, the exact shape of the friendly duplicate-connection error
you threw, and the exact index name if you changed it from
`credentials_user_oauth_owner`).
