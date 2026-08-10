# Tasks — iw9-f3-credential-levels

External dependencies:

- npm publish rights for `@aprovan/registry-server` (stream 3). No other
  external services; all tests run locally (sqlite/in-memory; dynamodb-local
  only for existing contract tests).
- Two checkouts side by side: `aprovan/` = /Users/jacob/Documents/Code/AprovanLabs/aprovan,
  `registry/` = /Users/jacob/Documents/Code/AprovanLabs/registry. Cross-repo
  consumption is ONLY via the published npm package (tech-plan "Repo split &
  publish sequence"); never import sources across repos.
- New tests go in new files; do not extend existing test files.

## 1. Registry — level model, schema, creation rules

> Depends-on: - | Repo: registry | Touches: registry/packages/registry-server/src/credentials/**, registry/packages/registry-server/src/storage/**, registry/packages/registry-server/src/credentials/__tests__/credential-levels.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test && grep -n "level" packages/registry-server/src/storage/schema.ts

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

## 2. Registry — invoker-aware resolution + published contract

> Depends-on: 1 | Repo: registry | Touches: registry/packages/registry-server/src/profiles/resolve.ts, registry/packages/registry-server/src/credentials/service.ts, registry/packages/registry-server/src/index.ts, registry/packages/registry-server/src/profiles/__tests__/level-resolution.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test && grep -n "CredentialNotConnectedError" packages/registry-server/src/index.ts && grep -n "resolveForInvoker" packages/registry-server/src/credentials/service.ts && ! grep -n "deps\.credentials\.firstForProvider" packages/registry-server/src/profiles/resolve.ts

- [ ] 2.1 Define and export the resolution contract from the package
      root: `CredentialInvoker`, `CredentialResolutionRequest`,
      `ResolvedCredential` (id, level, owner?, payload),
      `CredentialNotConnectedError` (`code: "credential_not_connected"`,
      `status: 403`, `provider`, `requiredLevel`) — tech-plan
      "Interfaces & Data", D5. Spec: credential-level-resolution
      "Resolution-order contract is published".
- [ ] 2.2 Add `CredentialService.resolveForInvoker(tenantId, provider, invoker)`
      (tech-plan D4a; additive, sits beside `firstForProvider` — does not
      change its signature or behavior) implementing D4's order: the
      invoker's own `user-oauth` row for the provider first, else the
      first workspace-level row in creation order, via the same
      `list()`-then-filter idiom already used at
      `profiles/resolve.ts:323-325`. `resolveProfile` step 4c's no-pin
      default (:263) and step 5's ungoverned fallback (:350, :378) all
      switch from `deps.credentials.firstForProvider(...)` to
      `deps.credentials.resolveForInvoker(..., ctx)`-equivalent (build a
      `CredentialInvoker` from `ctx.principal`/`ctx.actor`). Step 4c's
      pinned-credential path: a `user-oauth` row whose owner ≠
      `ctx.principal` throws `CredentialNotConnectedError` (never another
      user's payload, never a downgrade); other users' `user-oauth` rows
      are invisible to the unpinned paths (tech-plan D4/D4a).
- [ ] 2.3 `CredentialService.resolveById` and the new `resolveForInvoker`
      return `ResolvedCredential` (level via `effectiveLevel`, owner for
      user-level) so dispatch/audit callers read level without a second
      fetch. `firstForProvider` itself is unchanged (additive-only bump —
      tech-plan D4a) but has zero remaining callers inside
      `profiles/resolve.ts` once 2.2 lands (gate: task 6.5-equivalent for
      registry, `! grep -n "deps\.credentials\.firstForProvider" profiles/resolve.ts`).
- [ ] 2.4 New test file
      `profiles/__tests__/level-resolution.test.ts`: owner resolves own
      connection; other user fails closed with
      `credential_not_connected`; own user-oauth outranks workspace row;
      workspace row serves unconnected invoker; pinned foreign
      user-oauth fails closed; legacy (level-null) rows resolve as
      workspace-shared. Cover both entry points: `resolveProfile` (stored
      profile no-pin default, ungoverned-mode fallback) AND
      `CredentialService.resolveForInvoker` directly (unit-level, not just
      through `resolveProfile`).

## 3. Registry — publish

> Depends-on: 2 | Repo: registry | Touches: registry/packages/registry-server/package.json, registry/packages/registry-server/CHANGELOG.md | Verify: npm view @aprovan/registry-server version

- [ ] 3.1 Minor version bump (additive/widening API only), changelog
      entry naming the new exports, `pnpm --filter
      @aprovan/registry-server build && pnpm --filter
      @aprovan/registry-server test`, then publish to npm (publish
      before pin — IW-9 cross-repo rule 2).

## 4. aprovan — dependency pin bump (separate commit)

> Depends-on: 3 | Repo: aprovan | Touches: aprovan/server/workspace/package.json, aprovan/pnpm-lock.yaml | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && grep -n "@aprovan/registry-server" server/workspace/package.json && pnpm --filter @aprovan/workspace check-types

- [ ] 4.1 Bump the `@aprovan/registry-server` pin to the version
      published in 3.1 (must stay `^0.2.7`-or-later per IW-9 rule 2) in
      its own commit; `pnpm install`; confirm typecheck passes before
      any aprovan F3 code lands.

## 5. aprovan — credential stores carry the level

> Depends-on: 4 | Repo: aprovan | Touches: aprovan/server/workspace/src/credentials.ts, aprovan/server/workspace/src/credential-store-adapter.ts, aprovan/server/workspace/tests/credential-levels.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- credential-levels && grep -n "level" server/workspace/src/credential-store-adapter.ts

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

## 6. aprovan — invoker-aware resolution at every dispatch path

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/server/workspace/src/credentials.ts, aprovan/server/workspace/src/credential-store-adapter.ts, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/src/routes/llm.ts, aprovan/server/workspace/src/workflows/invoke.ts, aprovan/server/workspace/src/vcs/mounts.ts, aprovan/server/workspace/tests/credential-level-resolution.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- credential-level-resolution && grep -n "resolveWorkspaceCredential" server/workspace/src/vcs/mounts.ts server/workspace/src/credential-store-adapter.ts && ! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"

- [ ] 6.1 `resolveCredentialRecord` gains a **required**
      `invoker: CredentialInvoker` parameter, returns
      `ResolvedCredential`, and implements the D4 order (pin loud →
      invoker's own user-oauth → workspace-level rows; fail closed with
      the re-exported `CredentialNotConnectedError`).
- [ ] 6.2 Add `resolveWorkspaceCredential(workspaceId: string, provider: string): Promise<ResolvedCredential | undefined>`
      for invoker-less system paths (tech-plan D6) — same
      `ResolvedCredential` return shape as `resolveCredentialRecord`, but
      row *selection* is structurally restricted to
      `effectiveLevel(...) ∈ {"workspace-token", "workspace-oauth"}`; a
      `user-oauth` row is filtered out before ranking, never merely
      "not the one picked" (so `owner` is always `undefined` on the
      result by construction). Migrate BOTH invoker-less call sites to
      it: `vcs/mounts.ts:207` (`githubToken`) AND
      `credential-store-adapter.ts`'s `firstForProvider` (:42-51 —
      currently dead code with zero call sites, verified; migrated now so
      no future caller can wire it up unsafely — tech-plan D6/D6a).
- [ ] 6.3 Thread the invoker at all three dispatch call sites:
      `routes/tools.ts:1248` (principal.sub from :858 + actor when the
      call is app/workflow/agent-originated), `workflows/invoke.ts:366`
      (ServiceContext), `routes/llm.ts:116`. A
      `CredentialNotConnectedError` surfaces as HTTP 403 with its `code`
      in the body (spec: "The error is machine-distinguishable"). (Line
      numbers per tech-plan; if drifted, the cited intent wins — see
      `briefs/deviations.md` for the drift already observed at
      elaboration time.)
- [ ] 6.4 New test file
      `server/workspace/tests/credential-level-resolution.test.ts`:
      per-invoker resolution through the workspace entry point, fail
      closed (owner ≠ invoker; no connection and no workspace row),
      workspace fallback for unconnected invoker without a user-level
      selection, `resolveWorkspaceCredential` never returns user-oauth
      (assert `owner === undefined` on every result, not just that no
      `user-oauth` row was picked).
- [ ] 6.5 Grep gate (both repos, IW-9 rule 4), exclusion-based so it
      covers every current AND future invoker-less call site rather than
      allowlisting known directories (tech-plan D6a):
      aprovan —
      `! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"`
      returns nothing (covers `routes/`, `workflows/`, `vcs/`,
      `credential-store-adapter.ts`, and any new file — `credentials.ts`
      is the sole legitimate owner of the primitive); registry —
      `! grep -n "deps\.credentials\.firstForProvider" registry/packages/registry-server/src/profiles/resolve.ts`
      returns nothing (verified in stream 2; re-checked here since stream
      6 is where aprovan's half of the gate first becomes checkable
      end-to-end).

## 7. aprovan — audit attribution

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/server/workspace/src/audit.ts, aprovan/server/workspace/src/db/dsql-schema.sql, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/src/routes/llm.ts, aprovan/server/workspace/src/workflows/invoke.ts, aprovan/server/workspace/tests/audit-attribution.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- audit-attribution && grep -n "credential_level" server/workspace/src/db/dsql-schema.sql

- [ ] 7.1 Extend `AuditEntry` with `credentialId?`, `credentialLevel?`,
      `credentialSource?: "stored" | "ephemeral"`, `actorKind?`,
      `actorId?`, `profileName?` (tech-plan D7); additive columns on
      sqlite (try/catch ALTER) and `db/dsql-schema.sql`; Dynamo
      test-only store passes them through; `recent()` returns them and
      tolerates pre-change rows (spec: "Attribution fields are
      queryable").
- [ ] 7.2 Thread attribution into every dispatch audit append: stored
      credentials record id + level from `ResolvedCredential`; ephemeral
      request-supplied credentials record `credentialSource:
      "ephemeral"` and no id (`routes/tools.ts:1227-1240`);
      credential-less dispatches append unchanged; workflow/agent paths
      record actor kind+id and the profile name when one selected the
      credential.
- [ ] 7.3 New test file
      `server/workspace/tests/audit-attribution.test.ts` (sqlite):
      round-trip of all six fields, pre-change row reads back with
      fields undefined, shared-bot row carries callerId + level
      `workspace-oauth` + credential id (spec: "Shared-bot action names
      the human").
