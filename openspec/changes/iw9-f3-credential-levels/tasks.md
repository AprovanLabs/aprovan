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
      (`storage/schema.ts`) and `level?: CredentialLevel` to
      `CredentialRow` (`storage/types.ts`); thread through
      `sql-storage.ts` (CRED_COLS, row mapping) and `dynamo-storage.ts`.
- [ ] 1.3 `CredentialService.create`: validate the level/payload-type
      matrix, derive the default level from payload type when absent,
      require `createdBy` for `user-oauth`, and enforce one `user-oauth`
      row per (tenant, provider, createdBy) (tech-plan D3; spec:
      credential-levels "Level and payload-type compatibility",
      "User-level credentials have an owner").
- [ ] 1.4 New test file
      `credentials/__tests__/credential-levels.test.ts` covering: level
      round-trip on list/get, unknown level rejected, type-mismatch
      rejected, authcode-as-workspace-oauth accepted, ownerless
      user-oauth rejected, duplicate (provider, owner) rejected, two
      distinct owners accepted, `effectiveLevel` backfill for all four
      payload types.

## 2. Registry — invoker-aware resolution + published contract

> Depends-on: 1 | Repo: registry | Touches: registry/packages/registry-server/src/profiles/resolve.ts, registry/packages/registry-server/src/credentials/service.ts, registry/packages/registry-server/src/index.ts, registry/packages/registry-server/src/profiles/__tests__/level-resolution.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test && grep -n "CredentialNotConnectedError" packages/registry-server/src/index.ts

- [ ] 2.1 Define and export the resolution contract from the package
      root: `CredentialInvoker`, `CredentialResolutionRequest`,
      `ResolvedCredential` (id, level, owner?, payload),
      `CredentialNotConnectedError` (`code: "credential_not_connected"`,
      `status: 403`, `provider`, `requiredLevel`) — tech-plan
      "Interfaces & Data", D5. Spec: credential-level-resolution
      "Resolution-order contract is published".
- [ ] 2.2 `resolveProfile` step 4c: a pinned credential resolving to a
      `user-oauth` row whose owner ≠ `ctx.principal` throws
      `CredentialNotConnectedError` (never another user's payload, never
      a downgrade). Step 5 fallback: invoker's own `user-oauth` row
      first, then workspace-level rows in existing order; other users'
      `user-oauth` rows are invisible (tech-plan D4).
- [ ] 2.3 `CredentialService` resolution methods return
      `ResolvedCredential` (level via `effectiveLevel`, owner for
      user-level) so dispatch/audit callers read level without a second
      fetch.
- [ ] 2.4 New test file
      `profiles/__tests__/level-resolution.test.ts`: owner resolves own
      connection; other user fails closed with
      `credential_not_connected`; own user-oauth outranks workspace row;
      workspace row serves unconnected invoker; pinned foreign
      user-oauth fails closed; legacy (level-null) rows resolve as
      workspace-shared.

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
      pattern (credentials.ts:402-408 precedent); Dynamo store writes/
      projects it; `CredentialStoreRegistry` inherits it from the
      package table.
- [ ] 5.2 `credential-store-adapter.ts` maps `level` both directions;
      creation-time validation (matrix, default derivation, user-oauth
      owner + uniqueness) applies identically on the sqlite/dynamo
      backends so behavior does not depend on `storeBackend()`.
- [ ] 5.3 New test file
      `server/workspace/tests/credential-levels.test.ts` (sqlite
      backend): level round-trip on all `ICredentialStore` methods,
      pre-existing rows (insert without level) read back with the
      type-derived effective level, duplicate user connection rejected.

## 6. aprovan — invoker-aware resolution at every dispatch path

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/server/workspace/src/credentials.ts, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/src/routes/llm.ts, aprovan/server/workspace/src/workflows/invoke.ts, aprovan/server/workspace/src/vcs/mounts.ts, aprovan/server/workspace/tests/credential-level-resolution.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- credential-level-resolution && grep -n "resolveWorkspaceCredential" server/workspace/src/vcs/mounts.ts && ! grep -rn "resolveRecordForProvider" server/workspace/src/routes server/workspace/src/workflows server/workspace/src/vcs --include="*.ts"

- [ ] 6.1 `resolveCredentialRecord` gains a **required**
      `invoker: CredentialInvoker` parameter, returns
      `ResolvedCredential`, and implements the D4 order (pin loud →
      invoker's own user-oauth → workspace-level rows; fail closed with
      the re-exported `CredentialNotConnectedError`).
- [ ] 6.2 Add `resolveWorkspaceCredential(workspaceId, provider)` for
      invoker-less system paths — structurally filters to workspace
      levels, can never return a `user-oauth` row (tech-plan D6);
      migrate `vcs/mounts.ts:207` to it.
- [ ] 6.3 Thread the invoker at all three dispatch call sites:
      `routes/tools.ts:1248` (principal.sub from :858 + actor when the
      call is app/workflow/agent-originated), `workflows/invoke.ts:366`
      (ServiceContext), `routes/llm.ts:116`. A
      `CredentialNotConnectedError` surfaces as HTTP 403 with its `code`
      in the body (spec: "The error is machine-distinguishable").
- [ ] 6.4 New test file
      `server/workspace/tests/credential-level-resolution.test.ts`:
      per-invoker resolution through the workspace entry point, fail
      closed (owner ≠ invoker; no connection and no workspace row),
      workspace fallback for unconnected invoker without a user-level
      selection, `resolveWorkspaceCredential` never returns user-oauth.
- [ ] 6.5 Grep gate (both repos, IW-9 rule 4): no invoker-less use of
      the store resolution primitives outside `credentials.ts` in
      aprovan, and no resolution entry point in
      `registry/packages/registry-server/src` that reaches a
      `user-oauth` row without `ctx.principal` (verify command above
      encodes both).

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
