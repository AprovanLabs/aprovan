# Report: graphql-schema-surface §3 — Schema lookup tool

**PR:** https://github.com/AprovanLabs/registry/pull/144 (open, not merged)
**Branch:** `iw8/graphql-schema-03-lookup`
**Worktree:** `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-gql03`

## What shipped

- `schema_lookup({ provider, type?, field?, version? })`, registered through
  `McpExtensions` in `packages/registry-server/src/mcp/schema-lookup-tool.ts`,
  composed with the grant-enforcement §5 sandbox tool via
  `withSchemaLookupTool` (mirrors `withSandboxTool` — see `server.ts`; neither
  tool's registration replaces the other).
- No `type` → root `Query`/`Mutation`/`Subscription` entry points (name,
  return type, args), built from the manifest's root type records — never
  the full type list.
- `type` given → that type's fields or enum values.
- `field` narrows either result to one named entry (within `type`, or among
  root entry points when `type` is omitted).
- Responses are capped by a byte budget (default 8000 bytes of serialized
  field/entry-point data) and explicitly flagged via
  `truncated`/`truncatedMessage` — never truncated silently.
- Unknown provider, unknown type, and unknown field are `found: false`
  misses in the response body, never thrown tool errors — matching §2's
  `lookupGraphqlType` "miss over throw" philosophy.
- `version` is accepted and resolves to a `schemas/<version>/` subdirectory,
  forward-compatible with §5 (not yet merged); unversioned providers (the
  common case today) resolve at the package root.

## New: `@utdk/mcp-core` read-only graphql-index client

Added `packages/mcp-core/src/graphql-index.ts` rather than depending on
`@aprovan/utdk-bundler/graphql-index` directly. Rationale: `@utdk/mcp-core`
is also consumed by the stdio server `@utdk/mcp`, and the bundler package
pulls in a build-time dependency tree (`@anthropic-ai/sdk`, `@utcp/sdk`,
`graphql`, etc.) that has no business in a lean MCP client just to read two
shipped JSON/ndjson files. The new module is a structural mirror of the §2
artifact's manifest/record shapes (same field names, same byte-range
contract) — the two packages agree on shape without sharing code. Provider
packages are located via `resolveProviderPackageDir`, which uses Node module
resolution (`createRequire(...).resolve`), the same approach `loader.ts`
already uses to import a provider's `openapi.json` — so it works identically
in the pnpm workspace (symlinks) and in a real npm install.

`getProviderImportBase` (previously private to `loader.ts`) is now exported
so `graphql-index.ts` can reuse the exact same provider → import-specifier
mapping (including the vendor-suite `@utdk/clients/<vendor>/<provider>`
case), rather than duplicating it.

## Deviations / judgment calls

- **`field`'s exact semantics weren't specified beyond the tech-plan
  signature.** I implemented it as "narrow to one named field" in both
  modes: within `type`'s fields/enum values when `type` is given, or among
  aggregated root entry points when it's omitted. This composes cleanly with
  the "two calls" acceptance criterion (list root entry points → see an
  entry's return type → `schema_lookup({ type: <that type> })`) without
  requiring a third mode.
- **Root entry points needed richer data than the §2 manifest's
  `entryPoints` array carries** (it's `{rootType, field}` only, no return
  type/args). Rather than exposing that thin list, `schema_lookup` does a
  small, bounded number of additional type lookups (at most 3: `Query`,
  `Mutation`, `Subscription`) to pull each entry point's full field record
  (return type, args, deprecation, description) — still a small constant
  number of bounded reads, not proportional to schema size, and far more
  useful for the "which type do I look up next" step. A defensive fallback
  (name-only entry, `type: ""`) covers schemas with non-default root
  operation type names, which §2's manifest doesn't currently capture.
- **Truncation cap is byte-budget-based** (serialized JSON size of the
  fields/entry-points array), not a fixed item count — sizing to a context
  budget rather than an arbitrary field count. Verified against real data:
  Linear's `Query` type has 165 fields (~117KB serialized) and `Issue` has 86
  fields (~37KB), both comfortably exceeding the 8000-byte default, so the
  truncation path is exercised by real provider data in tests, not only a
  synthetic fixture.
- **Not gated by grant or auth mode.** The sandbox tool refuses to register
  under `authMode: "none"` because it can reach tenant credentials through
  dispatch. `schema_lookup` never dispatches and never touches tenant data —
  it only reads public SDL metadata already shipped inside installed
  `@utdk/*` packages — so it's registered unconditionally, including under
  `authMode: "none"`. Not gating by the caller's namespace grants either: a
  provider's GraphQL shape is package-level public information, not
  per-tenant data, so hiding it behind `list_tools` grant filtering (as
  `permittedTools` does for the underlying dispatchable tools) didn't seem
  warranted; flagged here in case that judgment should be revisited.

## Verification

```
pnpm --filter @utdk/mcp-core test               # 70 passed (14 new)
pnpm --filter @aprovan/registry-server test -- mcp   # 34 passed (20 new)
pnpm turbo run typecheck --filter=@utdk/mcp-core --filter=@aprovan/registry-server   # clean
```

New tests cover: real `@utdk/linear` package integration (both in
`mcp-core`'s `graphql-index.test.ts` and `registry-server`'s
`mcp-schema-lookup.test.ts`) alongside hand-written fixtures for
deterministic root-listing/single-type/field-narrowing/truncation/miss
cases, plus a composition test proving `schema_lookup` and `run_script`
(the sandbox tool) are listed and callable side by side without either
registration replacing the other, including under `authMode: "none"`.

Also ran the full `registry-server` test suite (not just `-- mcp`) and
confirmed via `git stash` that the pre-existing failures in
`profiles.test.ts` / `server.test.ts` (sandbox/QuickJS assertion text) are
present on `main` too, unrelated to and unaffected by this change.

## Not done

- Did not modify `openspec/changes/graphql-schema-surface/tasks.md` (lives
  in the `aprovan` repo; this stream's work is confined to the `registry`
  worktree per the isolation constraint). §3's checkboxes (3.1–3.4) should
  be checked off by whoever merges/archives this stream.
