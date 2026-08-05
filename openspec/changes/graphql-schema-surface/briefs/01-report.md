# Report: graphql-schema-surface §1 — Ingest and ship SDL

## PR

https://github.com/AprovanLabs/registry/pull/132 (branch `iw8/graphql-schema-01-ingest`, not merged)

## What shipped

- **`RegistryProvider.graphqlSchemaUrl`** (new, optional, additive-only field in
  `packages/bundler/src/provider.ts`) — the schema-source field name. Same scheme
  conventions as `url` (`https://`, `file://`, `repo://`), so it reads as a sibling of
  the OpenAPI `url` rather than a new concept.
- **`packages/bundler/src/graphql-schema.ts`** (new):
  - `loadGraphqlSchemaSource` — fetches raw SDL text, mirroring `loadOpenApiDocument`'s
    scheme handling but with no JSON/YAML framing.
  - `assertValidSdl` — parses with `graphql`'s `parse()`; throws naming the provider on
    malformed SDL.
  - `hasGraphqlOperation` — heuristic: does the OpenAPI document have an operation
    tagged `GraphQL` or with `graphql` in its `operationId` (case-insensitive)?
  - `assertSchemaOperationPairing` — enforces task 1.4: schema source and GraphQL
    operation must both be present or neither, throwing naming the provider on either
    mismatch.
- **`packages/bundler/src/index.ts`** (`generateRegistryTypes`) — wired in: pairing
  assertion runs right after the OpenAPI document is built (before any file is
  written); if `graphqlSchemaUrl` is set, SDL is fetched and validated up front, then
  written to `schema.graphql` in the provider directory alongside `openapi.json`.
- **`packages/bundler/src/phases/ship.ts`** — `provenance.json` gained a
  `graphqlSchema: { hash, fetchedAt } | null` block, computed from the shipped
  `schema.graphql` the same way `source.hash` is computed from `openapi.json` (read
  from disk, sha256, `sha256:`-prefixed). Reuses the existing top-level `generation` —
  no separate generation counter per source.
- **Linear seed** — `data/registry.json`'s `linear` entry now has:
  ```json
  "graphqlSchemaUrl": "https://raw.githubusercontent.com/linear/linear/master/packages/sdk/src/schema.graphql"
  ```
  This is Linear's own published SDL file (via their `linear/linear` GitHub repo,
  `packages/sdk/src/schema.graphql`) — a static artifact fetch, not runtime
  introspection. `packages/utdk/linear/schema.graphql` ships (1.26 MB, ~50k lines).
- Tests: `packages/bundler/src/graphql-schema.test.ts` (new, 12 tests — fetch by
  scheme, malformed-SDL rejection, pairing assertion both directions) +
  `packages/bundler/src/phases/ship.test.ts` (+2 tests for the `graphqlSchema`
  provenance block).

## Verify — full paste

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/utdk-bundler test

 RUN  v2.1.5 .../packages/bundler

 ✓ src/verification/scorecard.test.ts (34 tests)
 ✓ src/render.test.ts (28 tests)
 ✓ src/client-api.test.ts (13 tests)
 ✓ src/phases/enrich.test.ts (23 tests)
 ✓ src/phases/ship.test.ts (20 tests)
 ✓ src/openapi.test.ts (9 tests)
 ✓ src/utcp.test.ts (17 tests)
 ✓ src/phases/review.test.ts (7 tests)
 ✓ src/naming.test.ts (22 tests)
 ✓ src/provider-output-schemas.test.ts (1 test)
 ✓ src/phases/research.test.ts (7 tests)
 ✓ src/graphql-schema.test.ts (12 tests)
 ✓ src/docs/load.test.ts (1 test)
 ✓ src/index.test.ts (3 tests)
 ❯ src/catalog.test.ts (2 tests | 1 failed)
   × provider catalogue > advertises every provider that exists
     → expected [ 'dynamodb-kv', 'sqs' ] to deeply equal []
 ✓ src/docs/augment.test.ts (2 tests)
 ✓ src/provider.test.ts (5 tests)
 ✓ src/docs/manifest.test.ts (3 tests)
 ✓ src/docs/discover.test.ts (1 test)
 ✓ src/docs/hash.test.ts (3 tests)
 ✓ src/docs/validate.test.ts (1 test)
 ✓ src/docs/grouping.test.ts (1 test)
 ✓ src/docs/prompt.test.ts (1 test)

 Test Files  1 failed | 22 passed (23)
      Tests  1 failed | 215 passed (216)
```

The one failure (`dynamodb-kv`/`sqs` uncatalogued) reproduces identically on a clean
`origin/main` clone — pre-existing, unrelated to this change. `typecheck` is clean.

## Linear provenance — full paste

`packages/utdk/linear/provenance.json` (the `graphqlSchema` block is new; everything
else is the file as previously committed — see "How I avoided regen noise" below):

```json
{
  "provider": "linear",
  "generatedAt": "2026-05-30T12:22:15.091Z",
  "generation": 1,
  "source": {
    "type": "openapi",
    "url": "repo://data/openapi/linear.json",
    "hash": "sha256:d2eec16f71a7f3b6931159e83934c040021cccaf2e5b8d4611a4221997ad73b1",
    "fetchedAt": "2026-05-30T12:22:15.091Z"
  },
  "graphqlSchema": {
    "hash": "sha256:11c549e81063b746b046fa272b4fd018e289768a3a1633e29bfabff77bdc16ec",
    "fetchedAt": "2026-08-05T02:40:56.227Z"
  },
  "ingestSource": "composio",
  "pipeline": {
    "research": { "noveltyScore": 2, "competingPackages": 17 },
    "scorecard": { "infrastructure": "fail", "domain": 100 },
    "agentReadiness": "pass"
  },
  "bundlerVersion": "0.1.1"
}
```

## Corrupt-SDL failure — full paste

Reproduced by pointing `linear.graphqlSchemaUrl` at a deliberately malformed fixture
(`type Query { issues: [Issue!! }`) and running the real CLI:

```
$ pnpm generate linear
{
  "ok": false,
  "error": {
    "code": "CLI_ERROR",
    "message": "Provider \"linear\" has malformed GraphQL SDL: Syntax Error: Expected \"]\", found \"!\"."
  }
}
$ echo $?
1
```

Names the provider, fails the whole build (exit 1), writes no `schema.graphql`. The
fixture pointer was reverted immediately after (`data/registry.json` diff in the PR is
just the one real Linear line).

## How I avoided regen noise

Running the real end-to-end `pnpm generate linear` (confirmed working, log above)
also touches `research.json` (npm registry drift), `README.md` (unrelated renderer
template changes since this provider was last regenerated), and — more seriously —
rewrites the root `packages/utdk/package.json` `exports`/`dependencies` map from
whatever's on disk in this worktree, which **dropped several unrelated workspace
dependencies** (`@utdk/events`, `@utdk/vfs`, `@utdk/telemetry`, etc.) because those
provider directories/registry entries aren't present in this branch's exact state.
That's out of scope and would have been a destructive, misleading diff. I reverted
those files to `HEAD` and hand-patched only the `graphqlSchema` block into the
already-committed `provenance.json` (hash independently verified with `shasum -a
256`), keeping the PR's diff scoped to what §1 actually changed. Flagging this as a
pre-existing regen-drift risk in `packages/utdk/package.json` that whoever next runs
a full-repo `generate` sweep should be aware of — it's not caused by this change.

## Schema-source field name

`graphqlSchemaUrl` on the registry provider entry (mirrors `url`'s naming and scheme
conventions exactly). Chosen over `schemaSource`/`graphqlSchema` to read unambiguously
as "the URL-like thing GraphQL schema comes from," parallel to the existing `url`.

## For §2 (type index) — artifact layout notes

- Unversioned providers (Linear included): `packages/utdk/<provider>/schema.graphql`,
  sibling to `openapi.json`. Versioned providers per D4's `schemas/<version>.graphql`
  layout are **not** implemented here — only the unversioned case (§1's scope; §5 owns
  `apiVersions`/`defaultVersion`).
- `provenance.json.graphqlSchema` is `null` when the provider has no
  `graphqlSchemaUrl` — safe to treat absence and `null` as the same "no schema" signal
  when building the index.
- Linear's shipped SDL is 1.26 MB / ~50,261 lines — a good real-world size reference
  for whatever bounded-read strategy §2 picks.
- `hasGraphqlOperation`'s tag/operationId heuristic lives in `graphql-schema.ts` and is
  exported — reuse it rather than re-deriving "does this provider have a GraphQL
  operation" if §2/§3 need the same signal.

## Constraints followed

- `naming.ts` untouched (already owned/merged by tools-addressing §1 before this PR's
  final rebase — confirmed no conflicts).
- `provider.ts` touched only additively: one new optional field
  (`graphqlSchemaUrl`) on `RegistryProvider`. No naming/alias logic touched.
- No curated GraphQL operations added. No runtime introspection — the Linear ingest
  fetches a static, vendor-published SDL file, never `https://api.linear.app/graphql`.
- Did not build the type index (§2) or MCP lookup (§3).
- Branched from `origin/main`, rebased cleanly onto main after grant-enforcement §1
  (#125), platform-oauth §3 (#126), and tools-addressing §1 (#127) merged — no
  conflicts. PR opened, not merged.
