# Report: graphql-schema-surface §4 — SDL-derived overview docs

## PR

https://github.com/AprovanLabs/registry/pull/138 (branch `iw8/graphql-schema-04-docs`, not merged)

## What shipped

- **`packages/bundler/src/docs/graphql-overview.ts`** (new):
  - `GRAPHQL_OVERVIEW_CHAR_BUDGET = 6_000` — stated in the generator and enforced via
    `truncateToBudget` (tasks.md 4.3).
  - `analyzeGraphqlConventions(provider, sdl, openApiDocument?)` — SDL analysis via
    `graphql` `buildSchema` + `buildGraphqlTypeIndex`: Relay vs offset pagination
    (`PageInfo`, `*Connection`, cursor vs offset/page args), `Node` interface presence,
    deprecated field/arg/enum counts, auth summary from OpenAPI `securitySchemes` plus
    scope-related SDL type names, entry-point samples from the type-index manifest.
  - `buildGraphqlOverviewMarkdown(options)` — provider-level `docs/graphql.md` prose
    (tasks.md 4.1): execution via passthrough, entry-point samples (not exhaustive),
    pagination, IDs/nodes, auth/scopes, deprecation; no per-query/mutation sections
    (4.2); `prompt-hash` footer preserved (4.4).
  - `isGraphqlPassthroughDocsGroup(group)` — detects the single-operation OpenAPI
    `GraphQL` tag group so augment can drop it in favour of the SDL overview.
- **`packages/bundler/src/docs/augment.ts`** — when `graphqlSchemaSdl` is supplied,
  filters the passthrough group, appends SDL-derived `graphql.md`, and adds a README
  **GraphQL** section linking to it.
- **`packages/bundler/src/index.ts`** — `augmentRegistryProviderDocs` reads shipped
  `schema.graphql` and passes it through when the provider declares `graphqlSchemaUrl`.
- **Linear seed** — regenerated `packages/utdk/linear/docs/graphql.md` (2344 chars,
  under budget; 1203 types, 165/372/80 root fields sampled with `schema_lookup` pointers).
- Tests: `graphql-overview.test.ts` (5) + `augment.test.ts` (+1 SDL overview case).

## Verify — full paste

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/utdk-bundler test -- docs

 RUN  v2.1.5 .../packages/bundler

 ✓ src/docs/augment.test.ts (3 tests)
 ✓ src/docs/load.test.ts (1 test)
 ✓ src/docs/graphql-overview.test.ts (5 tests)
 ✓ src/docs/manifest.test.ts (3 tests)
 ✓ src/docs/discover.test.ts (1 test)
 ✓ src/docs/hash.test.ts (3 tests)
 ✓ src/docs/validate.test.ts (1 test)
 ✓ src/docs/grouping.test.ts (1 test)
 ✓ src/docs/prompt.test.ts (1 test)

 Test Files  9 passed (9)
      Tests  19 passed (19)
```

## Constraints followed

- Rebased on `origin/main` with §2 (`graphql-index.*`) from #136.
- Touched only `packages/bundler/src/docs/**` and `packages/utdk/linear/docs/graphql.md`.
- No `schema_lookup` MCP work (§3) — overview deliberately omits per-type detail and
  points agents at `schema_lookup` instead.
- PR opened, not merged.
