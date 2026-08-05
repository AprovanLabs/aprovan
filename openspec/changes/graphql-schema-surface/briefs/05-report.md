# Report: graphql-schema-surface §5 — API version as a first-class field

## PR

https://github.com/AprovanLabs/registry/pull/143 (branch `iw8/graphql-schema-05-version`, not merged)

## What shipped

- **`packages/bundler/src/provider.ts`** — `RegistryProvider` gains optional
  `apiVersions: string[]`, `defaultVersion: string`, `versionedBaseUrl` (a
  `{version}`-templated endpoint). `assertValidApiVersioning` (called from
  `loadRegistryProviders`, alongside `assertValidPlatformApp`) rejects:
  `defaultVersion`/`versionedBaseUrl` declared without `apiVersions`; an
  empty/non-string `apiVersions`; a missing `defaultVersion`; a
  `defaultVersion` absent from its own `apiVersions`. All three fields stay
  optional — most of the ~2,000 providers have no version concept (5.3).
- **`packages/registry-server/src/profiles/versioning.ts`** (new) —
  `resolveProviderVersion(provider, versioning, requestedVersion,
  explicitBaseUrl)`: the one function that turns a provider's versioning
  metadata + a profile's pinned `version` into `{ version, baseUrl }`, or
  throws a `ServiceError` (400) naming the problem — unsupported version,
  version pinned on an unversioned provider, or an explicit `baseUrl` on a
  versioned provider. `buildProviderVersioningLookup` builds the
  provider→metadata map from loaded registry entries.
- **`packages/registry-server/src/config/provider-versioning.ts`** (new) —
  `loadProviderVersioning()`, a startup loader mirroring
  `wirePlatformOAuthAtStartup` (platform-oauth-apps §2): one
  `loadRegistryProviders()` read via `@aprovan/utdk-bundler/provider`, cached
  as a sync lookup.
- **`packages/registry-server/src/profiles/resolve.ts`** — `ResolveDeps`
  gains `getProviderVersioning`; `ResolvedProfile` gains `version`. Both the
  stored-profile path (step 4) and the no-profile provider-target path now
  call `resolveProviderVersion` and let its `baseUrl` override the
  `splitOptions` fallback. **No new `return` statement** — the GE §1
  "every return path is grant-checked" test in `profiles.test.ts` still
  counts exactly 3.
- **`packages/registry-server/src/storage/{types,schema,sql-storage,dynamo-storage}.ts`**
  — `ProfileRow.version` (optional), a `version TEXT` column, and both
  storage drivers' create/update/read paths thread it through. Needed for
  the feature to be real (not just typed) — a profile has to be able to
  actually pin a version.
- **`packages/registry-server/src/server.ts`** — wires
  `getProviderVersioning: await loadProviderVersioning()` into the
  production `resolveDeps`.
- **Tests**: `packages/bundler/src/provider.test.ts` (+5, apiVersions
  shape + registry-load consistency lint), `packages/registry-server/tests/profiles.test.ts`
  (+6, describe block "provider API version (graphql-schema-surface D4)":
  pinned version selects its endpoint, no pin resolves `defaultVersion`, an
  unsupported pinned version fails loudly naming the supported set, an
  explicit `baseUrl` on a versioned provider is refused 400, a pinned
  version on an unversioned provider fails loudly, unversioned providers are
  provably unaffected). `tests/helpers.ts` gained `providerVersions` and
  `knownProviders` options on `makeEnv` to support these without touching
  real registry data.
- **Incidental fix**: `profiles.test.ts`'s GE §1 gate test
  ("enumerates every return and confirms grant-check coverage") was failing
  on `main` — it regex-matched for inlined `authMode`/`role` checks in
  `resolveProfile`'s own source, but grant-enforcement §4 (already merged)
  extracted that logic into an `authorizeCaller()` helper. Fixed the test to
  check the extracted helper's body instead of the (now nonexistent) inlined
  text. This is the only change outside the brief's touch list; it's
  test-only, and is what makes `test -- profiles` (the brief's own verify
  command) pass green rather than 29/30.

## Scope note: what's deliberately NOT done

- **`data/registry.json` is untouched.** No shipped provider currently has a
  genuine date/label-based versioned API (checked stripe, salesforce,
  twilio, instagram, squareup, zoom — none fit; Twilio's "versions" are
  already separate provider names, not a single provider with a version
  knob). Fabricating `apiVersions` on a real provider seemed worse than
  shipping the mechanism unattached. Everything is exercised via injected
  test fixtures instead.
- **Task 5.4's filesystem half is not wired.** "Every declared version must
  have a schema file" needs versioned SDL ingest — multiple
  `schemas/<version>.graphql` per provider — which doesn't exist yet; §1/§2
  only shipped one unversioned `schema.graphql` per provider
  (`graphqlSchemaUrl`). Implemented the half of 5.4 that's live today (the
  `apiVersions`/`defaultVersion` registry-load consistency lint). The
  disk-based check is a natural follow-up once versioned SDL ingest lands —
  flagging this explicitly rather than faking a check with nothing behind
  it.

## Verify — full paste

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/registry-server test -- profiles

 RUN  v2.1.5 .../packages/registry-server

 ✓ tests/profiles.test.ts (36 tests)

 Test Files  1 passed (1)
      Tests  36 passed (36)
```

Also ran, for completeness:

- `pnpm --filter @aprovan/registry-server test` — 184 passed, 10 skipped, 4
  failed. The 4 failures (`dispatch.test.ts` x2 "No default profile for
  github/agent"; `server.test.ts` x2 "'sql'/'__not_granted' is not defined")
  are **pre-existing on `main`** — reproduced identically (same messages) by
  stashing this change and re-running before starting work.
- `pnpm --filter @aprovan/registry-server check-types` and
  `pnpm --filter @aprovan/utdk-bundler check-types` — clean.
- `pnpm --filter @aprovan/utdk-bundler test -- provider` — 11/11.
- `pnpm --filter @aprovan/utdk-bundler test` — 247/248; the one failure
  (`catalog.test.ts` "advertises every provider that exists", missing
  `dynamodb-kv`/`sqs`) is pre-existing repo drift last touched by an
  unrelated commit (#116), not this change.

## Constraints followed

- Rebased on `origin/main` twice (POA §2 landing, then grant-enforcement §5 +
  the platform-OAuth runbook doc landing) — both fast-forwards, no conflicts.
- `data/registry.json`: no edits at all (see scope note above) — additive-only
  would have been satisfied trivially, but there was no honest real entry to
  add it to.
- Built on top of the GE §1 gate on `resolve.ts` without adding a new
  `return` path; fixed the gate test itself where it had drifted from the
  grant-enforcement §4 refactor.
- Work stayed in the worktree; branch `iw8/graphql-schema-05-version`.
- PR opened (#143), not merged.
