# graphql-schema-surface

Streams 1 and 5 may start immediately and in parallel. Stream 2 depends on 1; streams 3
and 4 depend on 2 and touch disjoint paths, so they run in parallel once 2 lands.

## 1. Ingest and ship SDL

> Depends-on: - | Touches: registry `packages/bundler/src/phases/**`, `packages/bundler/src/openapi.ts`, `packages/utdk/<provider>/schema.graphql` | Verify: `pnpm --filter @aprovan/utdk-bundler test`

- [x] 1.1 Add an SDL fetch/ingest step: a provider entry may declare a schema source
      (URL or repo path) fetched alongside its OpenAPI spec, with the same
      `provenance.json` treatment — hash, `fetchedAt`, `generation`.
- [x] 1.2 Write `schema.graphql` into the provider package. Validate it parses as SDL at
      bundle time; a malformed schema fails the build rather than shipping.
- [x] 1.3 Seed with Linear, whose passthrough operation already exists and whose schema
      is public and stable.
- [x] 1.4 Assert a provider declaring a schema source also declares a GraphQL operation,
      and vice versa — a schema with no way to execute it is a packaging bug.

**Done when** `packages/utdk/linear/schema.graphql` ships with provenance, and a
corrupted SDL fails `pnpm build` with the provider named.

## 2. Build the type index

> Depends-on: 1 | Touches: registry `packages/bundler/src/graphql-index.ts` (new), `packages/bundler/src/__tests__/graphql-index.test.ts` | Verify: `pnpm --filter @aprovan/utdk-bundler test -- graphql-index`

- [x] 2.1 Generate a type index from SDL at bundle time: type name → kind, fields, field
      args, deprecation, description. Root `Query`/`Mutation`/`Subscription` fields are
      marked as entry points.
- [x] 2.2 Store it as a queryable artifact, not as prose. Size it so a single-type lookup
      never requires loading the whole index.
- [x] 2.3 Record index size per provider in the build output — this is the number that
      tells you when the artifact needs splitting.
- [x] 2.4 Tests: a known type resolves to its fields; an unknown type returns a miss, not
      an error; deprecated fields carry their reason.

**Done when** looking up one type costs a bounded read regardless of schema size.

## 3. Schema lookup tool

> Depends-on: 2 | Touches: registry `packages/mcp-core/src/**`, `packages/registry-server/src/mcp/**` | Verify: `pnpm --filter @utdk/mcp-core test && pnpm --filter @aprovan/registry-server test -- mcp`

- [x] 3.1 Register `schema_lookup({ provider, type?, field?, version? })` through
      `McpExtensions`, returning one type's fields.
- [x] 3.2 With no `type`, return root entry points only — never the full type list.
- [x] 3.3 Cap response size explicitly and say so in the response when truncated; silent
      truncation reads as "that's all there is".
- [x] 3.4 Tests: root listing; single type; unknown provider; a type large enough to
      trigger truncation.

**Done when** an agent can go from "list issues" to the fields it needs in two calls
without the SDL entering context.

## 4. SDL-derived overview docs

> Depends-on: 2 | Touches: registry `packages/bundler/src/docs/**`, `packages/utdk/<provider>/docs/graphql.md` | Verify: `pnpm --filter @aprovan/utdk-bundler test -- docs`

- [x] 4.1 Generate the GraphQL overview page from SDL rather than OpenAPI metadata:
      root entry points, pagination convention (Relay connections vs offset), ID/node
      scheme, auth-scope model, and deprecation posture.
- [x] 4.2 Keep it provider-level. No per-query or per-mutation sections — that is the
      curation this change rejected.
- [x] 4.3 Bound its length so it can sit in a tool description, and state the budget in
      the generator.
- [x] 4.4 Preserve the `prompt-hash` footer convention so regeneration stays detectable.

**Done when** `docs/graphql.md` tells an agent the provider's conventions, and
`schema_lookup` covers everything it deliberately omits.

## 5. API version as a first-class field

> Depends-on: - | Touches: registry `packages/registry-server/src/profiles/resolve.ts`, `packages/registry-server/src/storage/types.ts`, `data/registry.json` | Verify: `pnpm --filter @aprovan/registry-server test -- profiles`

- [x] 5.1 Add `apiVersions` and `defaultVersion` to provider entries; add `version` to
      profiles. A profile version absent from `apiVersions` is a resolution error naming
      the supported set.
- [x] 5.2 **Derive** `baseUrl` from the resolved version via `versionedBaseUrl`; do not
      let a profile set both. A profile setting `baseUrl` on a versioned provider is a
      400 — that is the drift this change exists to prevent.
- [x] 5.3 Keep both fields optional: most of the ~2,000 providers have no version
      concept.
- [ ] 5.4 Lint: a provider with `schemas/` must declare `defaultVersion`, and every
      declared version must have a schema file.
- [x] 5.5 Tests: pinned version selects its schema and its endpoint; a version with no
      schema fails loudly; unversioned providers are unaffected.

**Done when** the endpoint and the schema for a given call are provably derived from one
field.
