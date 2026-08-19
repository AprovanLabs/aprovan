# Report: 05 — aprovan credential stores carry the level

## What was built (tasks 5.1–5.3)

### 5.1 — `credentials.ts`

- **Vocabulary re-exported, not redeclared** (per the drift warning at
  `credentials.ts:53-64`): `export type { CredentialLevel }` and
  `export { effectiveLevel }` from `@aprovan/registry-server`;
  `defaultLevelForType`/`isCredentialLevel`/`credentialLevelValues` are
  imported for internal use (not re-exported — surgical minimum).
- **`CredentialInput.level?: string`** — mirrors the published registry
  `CredentialInput` exactly (`string`, validated against the closed
  vocabulary at create, since route bodies arrive as untyped JSON).
- **`CredentialRecord.level: CredentialLevel` — required.** Every backend
  computes it on read via `effectiveLevel(type, stored)`, so legacy
  NULL-level rows surface `workspace-token`/`workspace-oauth` (never
  `user-oauth`) and stream 6 gets a trustworthy level from every backend
  with no re-derivation.
- **Shared create-time rules** — module-level `resolveCreateLevel(input)`
  used by the sqlite and Dynamo backends; the dsql backend inherits the
  identical semantics from `CredentialService.create` itself (D3b).
  Vocabulary check, `defaultLevelForType` derivation, level/type matrix,
  user-oauth owner requirement — error messages verbatim from the registry
  service so behavior does not depend on `storeBackend()`.
- **sqlite**: `level TEXT` in the base DDL + the try/catch `ALTER` for
  pre-level databases (the `created_by` precedent at :402-408), then the
  D3a partial unique index (`credentials_user_oauth_owner` on
  `(workspace_id, provider, created_by) WHERE level = 'user-oauth'`,
  idempotent). `create()` catches `SQLITE_CONSTRAINT_UNIQUE` and rethrows
  the friendly `"<provider> is already connected"`.
- **Dynamo (`CredentialStoreDynamodb`)**: `create()`'s two sequential
  `PutCommand`s are now ONE `TransactWriteCommand` (record + `CREDID#`
  pointer, both conditioned) with a third conditional
  `USEROAUTH#<provider>#<createdBy>` item when `level === "user-oauth"`
  (mirrors registry `DynamoProfileStore.create`). `delete()` removes the
  pointer symmetrically in the same transact so a disconnected user can
  reconnect. `list` projects `#lvl` (`level` is a DynamoDB reserved word).
- **D3b**: `CredentialStoreRegistry.create` no longer calls
  `storage.credentials.create()` raw; it constructs
  `new CredentialService(storage.credentials, storage.provisionCredential)`
  — the exact `routes/profiles.ts:97` construction — and creates through
  it, so the dsql backend inherits stream 1's validation, uniqueness, and
  the grant-provisioning transaction.

### 5.2 — `credential-store-adapter.ts`

`create` forwards `input.level` into the workspace store; `toRow` maps
`level` back out, so `get`/`list`/`getWithPayload` (and, incidentally,
`firstForProvider`'s row — its resolution primitive is untouched per the
brief; that migrates in stream 6) all carry it. `firstForProvider`'s body
was not modified.

### 5.3 — `tests/credential-levels.test.ts`

15 tests. One shared `levelContract` suite runs against BOTH backends —
`CredentialStoreSqlite` directly and `CredentialStoreRegistry` over
sqlite-driver registry storage (covering the D3b routing): default
derivation, explicit-level round-trip on create/get/list, identical
vocabulary/matrix/owner validation, legacy NULL-level rows (raw-inserted
into each schema) reading back the type-derived effective level (legacy
authcode → `workspace-oauth`, per D2), duplicate user connection rejected
with the friendly error (asserted NOT to be a raw driver constraint
message), two users connecting the same provider, and
delete-then-reconnect (pointer symmetry). Plus an adapter suite asserting
`level` maps both directions through `adaptCredentialStore`.

## Verify

```
$ pnpm --filter @aprovan/workspace test -- credential-levels
 Test Files  1 passed (1)
      Tests  15 passed (15)

$ grep -n "level" server/workspace/src/credential-store-adapter.ts
27:        ...(input.level !== undefined ? { level: input.level } : {}),
77:    level: CredentialLevel;
89:    level: row.level,

$ pnpm --filter @aprovan/workspace check-types
effect-completeness: ok (143 tools)        # tsc --noEmit passed

$ grep -n "TransactWriteCommand" server/workspace/src/credentials.ts
199 / 259 / 265 / 296 / 345 / 347 / 373    # create + delete transacts
```

Adjacent-suite baseline: `store-backends`, `profiles.test`, `get-client`,
`credentials-dynamodb`, `agent-app-profiles` show 10 failures — **byte-identical
with this branch stashed at clean `44481ff`** (pre-existing 0.3.0 pin
fallout, e.g. `profiles.test.ts` still constructs `CredentialService` with
one argument; tests are outside `check-types` scope). This stream adds 0
failures.

## Deviations

1. **Dynamo duplicate detection is transact-aware.** D3a says to catch
   `ConditionalCheckFailedException` with an `isConditionalFailure`-shaped
   helper; a conditional failure inside a `TransactWriteCommand` actually
   surfaces as `TransactionCanceledException` with per-item
   `CancellationReasons`. The local helper (`isUserOauthConflict`) accepts
   both shapes and only treats the `USEROAUTH#` item's reason (index 2) as
   a duplicate — a record-put id-collision failure still rethrows raw.
   Intent unchanged; the literal exception name in the plan was wrong for
   transacts.
2. **`CredentialRecord.level` is required (`CredentialLevel`), not
   optional** — `effectiveLevel` is applied on read in every backend's row
   mapper. The registry's own `CredentialRow.level` stays optional; the
   workspace record is the read surface stream 6 consumes, and "always
   present, already backfilled" is the guarantee it needs.
3. **`CredentialStoreRegistry.create` passes `input.createdBy ?? ""`** —
   the service's `createdBy` parameter is positional and required; empty
   string preserves the optionality of the workspace interface (the
   service rejects it for `user-oauth`, same as before). All live routes
   always pass `principal.sub`.
4. Dynamo's D3a path is exercised only by the dynamodb-local-gated
   contract suite (skipped without a local endpoint, as designed); the new
   test file covers sqlite + dsql per task 5.3's explicit scope.

## For stream 6 (dispatch resolution)

- `CredentialRecord.level: CredentialLevel` is **always present and
  already effective** — do not re-apply `effectiveLevel` to it. A row is
  workspace-level iff `record.level !== "user-oauth"`; no extra helper was
  added (the check is one comparison on an always-present field).
- `effectiveLevel` and `type CredentialLevel` are re-exported from
  `server/workspace/src/credentials.js`; `CredentialNotConnectedError`,
  `ResolvedCredential`, `CredentialInvoker` are NOT yet re-exported —
  stream 6 adds whichever it exposes (import from
  `@aprovan/registry-server` root either way).
- `CredentialStoreRegistry.create` now provisions the `default` profile +
  grant (via `provisionCredential`) like the routes/profiles path — dsql
  credential creation is no longer a bare row insert.
- The friendly duplicate error is `"<provider> is already connected"`
  (status 400) on every backend; match `CredentialNotConnectedError` by
  `code`, not message, per stream 2's report.
