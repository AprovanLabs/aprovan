# Report: graphql-schema-surface §2 — Build the type index

## PR

https://github.com/AprovanLabs/registry/pull/136 (branch `iw8/graphql-schema-02-index`, not merged)

## What shipped

- **`packages/bundler/src/graphql-index.ts`** (new):
  - `buildGraphqlTypeIndex(provider, sdl, options?)` — pure function. Parses SDL with
    `graphql`'s `buildSchema`, walks `schema.getTypeMap()` (skipping introspection types
    and the five built-in scalars via `isIntrospectionType`/`isSpecifiedScalarType`), and
    produces one `GraphqlTypeRecord` per remaining type: `name`, `kind` (`OBJECT` |
    `INTERFACE` | `UNION` | `ENUM` | `INPUT_OBJECT` | `SCALAR`), `description`, `fields`
    (populated for OBJECT/INTERFACE/INPUT_OBJECT — name, type string, args, description,
    `deprecated`/`deprecationReason`), and `enumValues` (populated for ENUM, same
    deprecation shape). Root `Query`/`Mutation`/`Subscription` fields are collected up
    front from `schema.getQueryType()`/`getMutationType()`/`getSubscriptionType()` and
    every matching field record gets `entryPoint: true` — every other field is `false`.
  - `writeGraphqlTypeIndex(providerDir, provider, sdl, options?)` — writes the artifact
    (see storage layout below) to disk, mirroring `schema.graphql`'s write pattern.
  - `readGraphqlIndexManifest(providerDir)` — reads only the manifest; `null` if absent
    (no throw).
  - `lookupGraphqlType(providerDir, typeName, manifest?)` — the bounded-read lookup; see
    below. Returns `{ found: true, record }` or `{ found: false, record: null }` — a
    miss is data, never an exception, for both an unknown type and a provider with no
    index at all.
- **`packages/bundler/src/index.ts`** (`generateRegistryTypes`) — after the existing
  `graphqlSchemaSdl` fetch/validate step, builds the index from that same validated SDL
  (so the index and the shipped `schema.graphql` can never disagree about a type's
  shape) and writes `graphql-index.json` + `graphql-index.ndjson` alongside it. Result
  type gained `graphqlIndex: { typeCount, sizeBytes } | null`.
- **`packages/bundler/src/phases/ship.ts`** — `provenance.json` gained a
  `graphqlIndex: { typeCount, sizeBytes } | null` block, read from the shipped
  `graphql-index.json` the same way `graphqlSchema` reads `schema.graphql`. This is the
  "build output" task 2.3 asks for — `sizeBytes` is the number that says when the
  ndjson artifact needs splitting.
- **Linear artifacts** — ran the index builder against the real, already-shipped
  `packages/utdk/linear/schema.graphql` (not a fixture) and committed the real output:
  `packages/utdk/linear/graphql-index.json` (manifest) and `graphql-index.ndjson`
  (records), plus the `graphqlIndex` block hand-patched into `provenance.json` (same
  regen-noise avoidance as §1 — see its report's "How I avoided regen noise").
- Tests: `packages/bundler/src/graphql-index.test.ts` (new, 17 tests) +
  `packages/bundler/src/phases/ship.test.ts` (+2 tests for the `graphqlIndex`
  provenance block).

## Storage layout for single-type bounded reads

Two sibling files per provider, next to `schema.graphql`:

- **`graphql-index.json`** (manifest) — `{ provider, generatedAt, typeCount, sizeBytes,
  entryPoints: [{ rootType, field }], types: { [typeName]: { kind, fieldCount, offset,
  length } } }`. One small entry per type — kind plus a byte offset/length into the
  records file — no field bodies. This is also where "no type given, just entry points"
  lookups (§3's scope) will read from without ever touching the bulk file.
- **`graphql-index.ndjson`** (records) — one `JSON.stringify(typeRecord)` line per type,
  in the same order the manifest's offsets describe.

`lookupGraphqlType` reads the manifest (small — see real numbers below), looks up
`manifest.types[typeName]`, and if present does exactly one `fileHandle.read(buffer, 0,
entry.length, entry.offset)` against the ndjson file — a single byte-range read sized to
that one type's serialized record, never the whole records file and never the SDL. If
the type isn't in `manifest.types`, or there's no manifest on disk at all, the lookup
returns a miss immediately with no filesystem read of the records file.

**Rejected — single JSON blob for the whole index.** Would require parsing the entire
structure (or hand-rolling a streaming JSON scanner) to pull out one type; the manifest
+ ndjson split gets the same "queryable artifact" property with `JSON.parse` on a
bounded slice instead.

**Rejected — one file per type (a directory of `<TypeName>.json`).** Works, but turns
every provider's `graphql-index/` into a directory with as many entries as it has types
(1203 for Linear) with no aggregate manifest — no way to answer "what types exist" or
"what are the entry points" without a directory listing across N small files. The
manifest+ndjson split gives that summary a home.

## Verify — full paste

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/utdk-bundler test -- graphql-index

 RUN  v2.1.5 .../packages/bundler

 ✓ src/graphql-index.test.ts (17 tests) 18ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
```

Full suite (`pnpm --filter @aprovan/utdk-bundler test`, no `-- graphql-index` filter):
234/235 pass. The one failure (`catalog.test.ts` — `advertises every provider that
exists`, expects `['dynamodb-kv', 'sqs']` uncatalogued to equal `[]`) reproduces
identically on a clean `origin/main` checkout with none of this change's commits
applied — pre-existing, unrelated (same finding §1's report made). `tsc --noEmit` is
clean (after `pnpm --filter @utdk/common build`, needed once for `@utdk/common/auth`
and `@utdk/common/webhooks` type resolution — unrelated pre-existing build-ordering
quirk, not caused by this change).

## Real-scale numbers — Linear's shipped schema

Ran `buildGraphqlTypeIndex`/`writeGraphqlTypeIndex`/`lookupGraphqlType` against the
actual `packages/utdk/linear/schema.graphql` (1,265,996 bytes / ~50k lines, per §1):

```
build ms: 60.9
SDL bytes: 1265996
typeCount: 1203
index sizeBytes (graphql-index.ndjson): 2312423
manifest.json bytes (pretty-printed): 210532
entryPoints: 617

manifest read ms: 0.76
lookup 'Issue' found: true fields: 86 lookup ms: 0.30-0.49
lookup 'TotallyNotAType' found: false (no throw)
```

The manifest (210 KB) is ~11x smaller than the records artifact (2.3 MB) and comparable
to the SDL itself; a single-type lookup against a 1203-type index costs sub-millisecond
and touches only that one type's byte range in `graphql-index.ndjson` — the acceptance
criterion ("looking up one type costs a bounded read regardless of schema size") holds
at Linear's real scale, not just on synthetic fixtures.

## Deprecation handling — full paste

Confirmed against a fixture with a deprecated field, a deprecated enum value, and a
non-deprecated field of the same type, from `graphql-index.test.ts`:

```ts
oldTitleField.deprecated === true
oldTitleField.deprecationReason === "renamed to title"

titleField.deprecated === false
titleField.deprecationReason === null

archivedEnumValue.deprecated === true
archivedEnumValue.deprecationReason === "use CLOSED"
```

`graphql-js` exposes `deprecationReason` uniformly on `GraphQLField`, `GraphQLArgument`,
`GraphQLInputField`, and `GraphQLEnumValue` (all four checked directly against the
`graphql@16.14.0` type defs before writing the code) — one `deprecated` derivation
(`Boolean(x.deprecationReason)`) covers every place deprecation can appear in the index.

## For §3 (schema lookup tool) — notes

- `readGraphqlIndexManifest` + `lookupGraphqlType` are the two functions to build
  `schema_lookup` on: call `readGraphqlIndexManifest` once per request, then either
  return `manifest.entryPoints` directly (task 3.2's "no `type` -> root entry points
  only") or call `lookupGraphqlType(providerDir, type, manifest)` for a single-type
  request — pass the already-loaded manifest through so a request with both `type` and
  a later truncation check doesn't re-read `graphql-index.json` twice.
- Task 3.3 ("cap response size explicitly, say so when truncated") has a ready hook:
  `record.fields.length` (or `manifest.types[name].fieldCount` without loading the
  record at all) tells you up front whether a type is large enough to need truncation,
  before you've paid for the read.
- Nothing here registers through `McpExtensions` or touches `packages/mcp-core` /
  `packages/registry-server` — that's entirely task 3's scope.

## Constraints followed

- Touched only `packages/bundler/src/graphql-index.ts` (new) + its test, plus the
  minimal wiring needed to actually produce the artifact "at bundle time" as task 2.1
  requires: `index.ts` (`generateRegistryTypes` writes it) and `phases/ship.ts`
  (`provenance.json` records its size) — same pattern §1 used to wire `schema.graphql`
  beyond its own initially-listed file. Noting this since the brief's touch list named
  only `graphql-index.ts`; wiring nowhere would leave 2.1/2.3 unimplemented in practice.
- No MCP registration (§3) — no `packages/mcp-core` or `packages/registry-server`
  touched.
- No docs generation (§4) — no `packages/bundler/src/docs/**` touched.
- Did not touch `naming.ts`, `provider.ts`, or `graphql-schema.ts` (§1's surface).
- Branched from `origin/main` at `43b01b6` (§1, #132, already merged) — no rebase
  needed; nothing landed on `main` after it during this work. PR opened, not merged.
