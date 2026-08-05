# Report: grant-enforcement §3 — Provision default profile on connect

PR: https://github.com/AprovanLabs/registry/pull/134 (branch `iw8/grant-enforcement-03-provision`, rebased onto `origin/main` at `43b01b6`, which already includes §1 [#125](https://github.com/AprovanLabs/registry/pull/125) and §2 [#133](https://github.com/AprovanLabs/registry/pull/133)). **Not merged**, per instructions.

## What changed

Every `CredentialService.create()` call now routes through a new
`RegistryStorage.provisionCredential()`, which writes the credential together
with a `default` profile (`{kind: "provider", targetId: <provider>}`) and a
grant to the connecting principal **in one transaction**. This is the
write-time half of §1's read-time gate — see tech-plan D3.

- `storage/types.ts` — new `CredentialProvisionInput` / `ProvisionedCredential`
  types; `RegistryStorage.provisionCredential(tenantId, input)`.
- `storage/sql-client.ts` — new `SqlClient.transaction<T>(fn): Promise<T>` on
  all three SQL drivers:
  - sqlite / libsql: each has exactly one logical connection, so concurrent
    `BEGIN`s from different requests would nest and error. Serialized with a
    small FIFO mutex (`createTransactionMutex`), then `BEGIN`/`COMMIT`, with
    `ROLLBACK` + rethrow on failure.
  - dsql (postgres): `pool.query()` picks an arbitrary pooled connection per
    call, so `BEGIN` and every statement inside the transaction must pin ONE
    checked-out connection (`pool.connect()`) or the "transaction" silently
    spans different backends. `transaction()` checks out a dedicated
    connection, runs `fn` against a client scoped to it, and always
    `release()`s it.
- `storage/sql-storage.ts` — `provisionCredential()` uses `db.transaction()`
  to run the credential create + profile lookup/create-or-bind + grant
  through fresh store instances scoped to the transaction's client.
- `storage/dynamo-storage.ts` — `provisionCredential()` for the interim
  Dynamo path (see below — not fully atomic with the credential write).
- `credentials/service.ts` — `CredentialService` constructor takes a second
  argument, the provisioning function; `create()` is otherwise unchanged
  (same signature, same return type `CredentialRow`), so `http/router.ts`
  needed **no changes**.
- `server.ts`, `tests/helpers.ts` — wired `storage.provisionCredential` into
  the two `CredentialService` construction sites (these are DI wiring, not
  behavior; every other file touched is in the brief's allowed list).

Binding semantics (task 3.3): if no `default` row exists yet for
`(tenantId, "provider", provider)`, one is created bound to the new
credential + a grant to `createdBy`. If a row already exists **and has no
credential pinned**, the new credential is bound to it and a grant is added.
If a row already exists **and is pinned** (to this credential or another),
nothing is written — no repoint, no new grant. A second credential for an
already-bound provider never steals the existing default.

## Verify

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/registry-server test -- credentials

> @aprovan/registry-server@0.2.2 test /packages/registry-server
> vitest run credentials

 RUN  v2.1.5 /packages/registry-server

9:55:05 PM [vite] warning: Missing "./${provider}" specifier in "@utdk/clients" package
  Plugin: vite:dynamic-import-vars
  File: /packages/registry-server/src/executor/index.ts
 ✓ tests/credentials.test.ts (11 tests) 77ms

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  21:55:05
   Duration  512ms (transform 104ms, setup 0ms, collect 204ms, tests 77ms, environment 0ms, prepare 39ms)
```

11 tests = 5 pre-existing (cipher round-trip, OAuth resolution) + 6 new §3
tests added to `tests/credentials.test.ts`:

1. `3.1/3.2 direct create writes a default profile + grant bound to the credential`
2. `3.2 the OAuth authcode exchange path provisions the same way as a direct create`
3. `3.3 a second credential for the same provider does not steal the existing default`
4. `3.3 binds an existing unpinned default row instead of creating a duplicate`
5. `3.4 connect → immediately dispatch resolves via the provisioned profile, no admin step`
6. `3.4 a failed write leaves no half-state: neither the credential nor the profile persist`
   — forces the grant `INSERT` inside the transaction to throw and asserts
   neither the credential nor the profile row survived the rollback.

I also typechecked the whole package (`tsc -p tsconfig.json --noEmit`, clean)
and ran the full suite (`pnpm --filter @aprovan/registry-server test`):
**149 passed / 4 failed / 10 skipped**. I verified all 4 failures are
pre-existing on `main` at `43b01b6` (before this branch — checked out a
throwaway worktree there and reproduced them identically) and are unrelated
to this stream:

- `dispatch.test.ts` × 2 — ephemeral/request-supplied credentials, and
  credentialless `"native"` compat entries. Neither ever calls
  `credentials.create()`, so there's no connect event for §3 to hook
  provisioning off of; closing these means changing `resolve.ts`'s step-5
  gate or the ephemeral-credential path in `dispatch/index.ts`, both
  explicitly out of scope for this brief (owned by §1 / not this stream).
- `server.test.ts` × 2 — a sandboxed script referencing a bare `sql` /
  `__not_granted` global throws `ReferenceError`. Unrelated to profiles or
  credentials; reproduces identically on `main` before this branch.

I also had to touch `profiles.test.ts`, `mcp.test.ts`, and `discovery.test.ts`
(outside the brief's file list) because provisioning changed real,
intentional behavior their old assertions encoded as the *absence* of a
default profile after connecting a credential — e.g. a test literally named
"governed provider target with credential but no profile is refused 403" no
longer holds once §3 provisions that profile. I updated those assertions to
the new, correct behavior rather than leaving them red; I did not touch
`resolve.ts` or any dispatch/HTTP production code outside the allowed files.

## Creation paths covered (task 3.2)

Grepped `credentials.create` (the `CredentialService` method — everything
funnels through it) across `packages/registry-server/src`:

- **`http/router.ts:427`** — `POST /credentials`. The only production call
  site. Handles direct payloads (bearer/api-key/etc.) **and** the OAuth
  authcode exchange, since the exchange happens inside
  `CredentialService.create()` itself, before the storage write — one call
  site, one provisioning path.
- **No admin-import path exists.** Same grep, repeated for any other
  `credentials.create` / `store.create` call site under `src/` — none found
  besides the router route and my own new `dynamo-storage.ts` internals
  (which call the *storage-level* `CredentialStore.create`, already inside
  `provisionCredential`).

If a future admin-import feature is added, it MUST go through
`CredentialService.create()` (or directly through
`RegistryStorage.provisionCredential()`) or it reopens the hole §1 closed.

## Storage API changes `platform-oauth-apps` §1 must rebase onto

- **`RegistryStorage.provisionCredential(tenantId, input): Promise<ProvisionedCredential>`**
  (new, `storage/types.ts`) — the new entry point for creating a credential;
  replaces the old pattern of `credentials.create` + a separate manual
  profile/grant write. `ProvisionedCredential = { credential, defaultProfile?, grant? }`.
- **`CredentialService`'s constructor signature changed**:
  `new CredentialService(store: CredentialStore, provisionCredential: ProvisionCredentialFn)`
  — the second argument is new and required. Both production call sites
  (`server.ts`) and the test fixture (`tests/helpers.ts`) pass
  `storage.provisionCredential`. `platform-oauth-apps` §1, which also touches
  `credentials/service.ts`, will need to preserve this constructor shape (or
  extend it) when it adds platform OAuth client resolution — `create()`'s own
  signature and return type (`Promise<CredentialRow>`) are unchanged, so
  callers of `create()` itself (like the OAuth code-exchange logic §1 will
  extend) don't need changes.
- **`SqlClient.transaction<T>(fn: (tx: SqlClient) => Promise<T>): Promise<T>`**
  (new, `storage/sql-client.ts`) — available to any other storage code
  (including a future POA §1 credential-import flow) that needs cross-table
  atomicity on the SQL drivers.
- The Dynamo path (`storage/dynamo-storage.ts`) is **not fully atomic**: its
  `CredentialStore` is host-injected (this file doesn't own that table's
  writes), so the credential `Put` cannot join the profile+grant
  `TransactWriteCommand`. On a provisioning failure, `provisionCredential`
  compensates with a best-effort delete of the just-created credential
  (documented inline in `dynamo-storage.ts`) rather than leaving an
  unreachable credential stranded. If POA §1 needs true cross-table atomicity
  on Dynamo, the host-side `CredentialStore` injection point will need to
  change to accept a `TransactWriteCommand` item instead of performing its
  own `Put`.

## Constraints honored

- Did not touch `resolve.ts` step-5 gating (§1's, unmodified).
- Did not implement platform OAuth client resolution.
- Branched from `origin/main`, rebased twice as main advanced (through §1,
  §2, and the tools-addressing/graphql-schema-surface streams that landed in
  between); PR opened to `AprovanLabs/registry`, not merged.
- `tasks.md` §3 checked off; this report written.
