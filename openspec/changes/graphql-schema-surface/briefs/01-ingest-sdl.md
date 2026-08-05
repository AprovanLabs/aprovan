# Brief: graphql-schema-surface §1 — Ingest and ship SDL

## Mission
Providers may declare a GraphQL schema source (URL or repo path) fetched with the same
provenance treatment as OpenAPI. Valid SDL ships as `schema.graphql` in the provider
package; malformed SDL fails the build naming the provider. Seed Linear. A schema source
and a GraphQL operation must both be present or neither.

## Read first
1. `openspec/changes/graphql-schema-surface/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D1–D2 (passthrough only; shipped artifacts — **not** curated ops, **not**
   runtime introspection)
3. registry `packages/bundler/src/phases/**`
4. registry `packages/bundler/src/openapi.ts` (provenance pattern to mirror)
5. Existing Linear provider under `packages/utdk/linear/` and its registry entry

## Tasks
- [ ] 1.1 Add an SDL fetch/ingest step: a provider entry may declare a schema source
      (URL or repo path) fetched alongside its OpenAPI spec, with the same
      `provenance.json` treatment — hash, `fetchedAt`, `generation`.
- [ ] 1.2 Write `schema.graphql` into the provider package. Validate it parses as SDL at
      bundle time; a malformed schema fails the build rather than shipping.
- [ ] 1.3 Seed with Linear, whose passthrough operation already exists and whose schema
      is public and stable.
- [ ] 1.4 Assert a provider declaring a schema source also declares a GraphQL operation,
      and vice versa — a schema with no way to execute it is a packaging bug.

## Acceptance criteria
**Done when** `packages/utdk/linear/schema.graphql` ships with provenance, and a
corrupted SDL fails `pnpm build` with the provider named.

Rejected: curated `.graphql` operation documents; schema-derived ops per root field;
runtime introspection.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/utdk-bundler test
```
Paste full output. Confirm `packages/utdk/linear/schema.graphql` exists with provenance.
Show a deliberate corrupt-SDL failure message naming Linear (or fixture provider).

## Constraints
- Files: registry `packages/bundler/src/phases/**`, `packages/bundler/src/openapi.ts`,
  `packages/utdk/<provider>/schema.graphql` (Linear seed), related bundler tests,
  registry entry fields needed for schema source declaration.
- Do **not** edit `packages/bundler/src/naming.ts` or `provider.ts` naming logic
  (owned by tools-addressing §1 — rebase if both land).
- Do **not** build the type index (§2) or MCP lookup (§3).
- Branch from `origin/main`; PR to `AprovanLabs/registry`.
- Check off `tasks.md` §1; write `briefs/01-report.md`.

## Report back
PR URL, verify paste, schema-source field name chosen (must match tech-plan spirit),
Linear provenance snippet, anything §2 needs about artifact layout.
