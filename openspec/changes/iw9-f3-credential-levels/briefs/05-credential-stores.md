# Brief: aprovan — credential stores carry the level

- **Change**: `iw9-f3-credential-levels` (stream 5 of 7)
- **Repo**: `aprovan` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- **Depends-on**: stream 4 (the pin bump must be merged; `check-types`
  must already be green against the new `@aprovan/registry-server`
  version before this stream's code lands)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`)

## Mission

When you are done, every one of aprovan's three `ICredentialStore`
backends — sqlite, Dynamo, and the registry-backed dsql adapter — carries
`level` identically, so behavior never depends on which `storeBackend()`
is configured. This includes closing two gaps found while planning this
change (see `briefs/deviations.md`): the dsql backend
(`CredentialStoreRegistry`) currently bypasses the validation stream 1
built by calling the raw storage primitive directly instead of going
through `CredentialService`, and Dynamo needs a race-safe, transactional
uniqueness check for `user-oauth` rows (not a check-then-insert race).
Stream 6 (invoker-aware dispatch resolution) depends on every backend
returning a trustworthy `level`.

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan` unless noted.

Orchestrator context:

1. `openspec/changes/iw9-f3-credential-levels/tech-plan.md` — read D3,
   **D3a** (the exact race-safe mechanism per backend — this stream
   implements the aprovan-sqlite and aprovan-Dynamo halves of it), **D3b**
   (the `CredentialStoreRegistry.create` routing fix — this stream
   implements it), D6 (context only — `resolveWorkspaceCredential` itself
   is built in stream 6, but D6 explains why `credential-store-adapter.ts`'s
   resolution-primitive migration is deferred there, not here)
2. `openspec/changes/iw9-f3-credential-levels/briefs/deviations.md` — read
   in full; the D3a/D3b findings and the exact line citations below were
   verified against live source during planning
3. `openspec/changes/iw9-f3-credential-levels/briefs/01-report.md` and
   `02-report.md` — read if they exist; they name the exact
   `CredentialLevel`/`effectiveLevel`/`ResolvedCredential` shapes you are
   re-exporting, not redeclaring

This repo — read in this order, each file grounds the next:

4. `server/workspace/src/credentials.ts` — read the whole file; in
   particular:
   - lines 53-64: the re-export drift warning — you re-export
     `CredentialLevel`/`effectiveLevel` from `@aprovan/registry-server`
     here, you do not redeclare them locally
   - lines 82-92: `CredentialRecord`
   - lines 156-202: `CredentialStoreDynamodb.create` — the two sequential
     `PutCommand`s you convert to one `TransactWriteCommand` with a third
     conditional item; `TransactWriteCommand` is already imported and used
     elsewhere in this file (see its `delete()`-adjacent method) — do not
     add a new import path for it
   - lines 402-408: the sqlite `ALTER TABLE ... ADD COLUMN created_by`
     try/catch precedent — the `level` column follows this exact pattern;
     the partial unique index goes next to it (no try/catch needed —
     `CREATE UNIQUE INDEX IF NOT EXISTS` is already idempotent)
   - lines 591-667 (`CredentialStoreRegistry`): line 612-623 `create()` —
     currently calls `storage.credentials.create()` directly; this is the
     D3b bypass you fix
5. `server/workspace/src/credential-store-adapter.ts` — the whole file
   (63 lines); you map `level` in `get`/`list`/`getWithPayload` here in
   this stream. Do **not** touch `firstForProvider` (lines 42-51) in this
   stream — its migration to `resolveWorkspaceCredential` happens in
   stream 6, because that function does not exist yet at this point in
   the dependency chain
6. `server/workspace/src/routes/profiles.ts` — line 97:
   `new CredentialService(storage.credentials, storage.provisionCredential)`
   — this is the exact construction `CredentialStoreRegistry.create` must
   copy for the D3b fix; do not invent a different pattern
7. `packages/registry-server/src/storage/dynamo-storage.ts` (registry
   repo, read-only reference) — `DynamoProfileStore.create` (~lines
   183-207) is the two-conditional-item `TransactWriteCommand` precedent
   your Dynamo fix mirrors; `isConditionalFailure` (~lines 507-514) is the
   error-detection precedent

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`,
section "5. aprovan — credential stores carry the level":

- [ ] 5.1 `CredentialRecord`/`CredentialInput` gain `level` (re-export
      `CredentialLevel`/`effectiveLevel` from the package — no local
      redeclaration, per the drift warning in credentials.ts:53-63);
      sqlite backend adds the `level` column with the try/catch `ALTER`
      pattern (credentials.ts:402-408 precedent) PLUS the D3a partial
      unique index (`CREATE UNIQUE INDEX IF NOT EXISTS credentials_user_oauth_owner ON credentials(workspace_id, provider, created_by) WHERE level = 'user-oauth';`,
      idempotent, no try/catch needed); Dynamo store (`CredentialStoreDynamodb`)
      writes/projects `level`, and per D3a combines the record + `CREDID#`
      writes with a third conditional `USEROAUTH#<provider>#<createdBy>`
      pointer (only when `level === "user-oauth"`) into ONE
      `TransactWriteCommand` (currently two sequential `PutCommand`s at
      :184-200 — mirror registry's `DynamoProfileStore.create`
      two-conditional-item pattern), deleting the pointer symmetrically in
      `delete()`; **`CredentialStoreRegistry.create` (:612-623) stops
      calling `storage.credentials.create()` directly and instead
      constructs a `CredentialService` the same way `routes/profiles.ts:97`
      already does** (`new CredentialService(storage.credentials, storage.provisionCredential)`)
      so the dsql backend inherits stream 1's validation instead of
      bypassing it (tech-plan D3b).
- [ ] 5.2 `credential-store-adapter.ts` maps `level` both directions for
      `get`/`list`/`getWithPayload` (its `firstForProvider`'s resolution
      *primitive* migrates in stream 6, task 6.2/6.3 — `resolveWorkspaceCredential`
      does not exist yet at this point in the chain); creation-time
      validation (matrix, default derivation, user-oauth owner +
      uniqueness via the D3a mechanisms above) applies identically on the
      sqlite/dynamo/dsql backends so behavior does not depend on
      `storeBackend()`.
- [ ] 5.3 New test file
      `server/workspace/tests/credential-levels.test.ts`: level
      round-trip on all `ICredentialStore` methods on BOTH the sqlite
      backend AND the dsql backend (via `CredentialStoreRegistry`, to
      cover the D3b routing fix), pre-existing rows (insert without
      level) read back with the type-derived effective level, duplicate
      user connection rejected on sqlite (partial-unique-index path) and
      on dsql (registry's `CredentialService.create` catch path) — assert
      the friendly error, not a raw driver constraint message.

## Acceptance criteria

No new spec scenarios beyond stream 1's — this stream is the workspace-side
mirror of the registry model applied to aprovan's three backends. The
same `credential-levels` capability requirements apply here as in stream
1's brief; in particular, re-verify against these two on every backend
(sqlite, Dynamo, dsql):

#### Scenario: Level is present on every read surface
- **WHEN** a credential is created with any level and then read back via
  `list`, `get`, or the store adapter
- **THEN** the returned record includes the same `level` value that was
  stored

#### Scenario: Duplicate user connection is rejected
- **WHEN** a user who already owns a `user-oauth` credential for a provider
  creates a second `user-oauth` credential for the same provider in the
  same workspace
- **THEN** creation fails with an error identifying the existing connection

#### Scenario: Two users connect the same provider
- **WHEN** two different users each create a `user-oauth` credential for
  the same provider in the same workspace
- **THEN** both rows exist, each with its own owner

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.
All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- credential-levels
grep -n "level" server/workspace/src/credential-store-adapter.ts
```

Additional checks (this stream touches three storage backends —
typechecking and a Dynamo-path-specific grep are worth the extra
confidence):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace check-types
grep -n "TransactWriteCommand" server/workspace/src/credentials.ts
```

Lint: per this repo's `AGENTS.md`, root `pnpm lint` fails at load time
(`ERR_MODULE_NOT_FOUND` from `config/eslint-config/base.mjs`) — this is a
pre-existing, tracked condition, not something introduced by this stream
and not fixable within this brief's scope. Do not attempt to fix root
lint; do not treat it as a gate. If a workspace-scoped eslint config is
available, prefer it; otherwise rely on `check-types` above as this
repo's practical scoped check.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (D3, D3a, D3b) are fixed — if one seems wrong, stop and report instead
  of changing it.
- Surgical changes only; match existing style — the `str`/`optStr`-style
  helpers, the existing try/catch `ALTER` pattern, the existing
  `TransactWriteCommand` usage already in this file for `delete()`.
- Do not modify files outside:
  `server/workspace/src/credentials.ts`,
  `server/workspace/src/credential-store-adapter.ts`,
  `server/workspace/tests/credential-levels.test.ts`.
- Do NOT touch `credential-store-adapter.ts`'s `firstForProvider` method
  body in this stream — leave its call to
  `store.resolveRecordForProvider` as-is; that migration is stream 6's
  job (task 6.2), once `resolveWorkspaceCredential` exists.
- New tests go in the new file named above; do not extend existing test
  files.
- Never import across repos.

## Report back

When done: check off tasks 5.1-5.3 in
`openspec/changes/iw9-f3-credential-levels/tasks.md`, and write
`openspec/changes/iw9-f3-credential-levels/briefs/05-report.md` containing:
what you built, how you verified it, any deviations from this brief and
why, and anything stream 6 needs to know — especially the exact shape of
`CredentialRecord.level` and any helper you added for
"is this row workspace-level" that `resolveWorkspaceCredential` (stream 6)
could reuse instead of re-deriving.
