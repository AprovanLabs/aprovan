# Brief: graphql-schema-surface §2 — Build the type index

## Mission
Generate a queryable type index from shipped SDL at bundle time (type → kind, fields,
args, deprecation, description). Root Query/Mutation/Subscription fields marked as entry
points. Single-type lookup never loads the whole index. Record index size per provider
in build output.

## Read first
1. `openspec/changes/graphql-schema-surface/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D3; Interfaces type-index shape
3. §1 report: `briefs/01-report.md` — field name `graphqlSchemaUrl`, Linear
   `schema.graphql` + provenance layout
4. registry `packages/bundler/src/graphql-schema.ts`, `packages/utdk/linear/schema.graphql`

## Tasks
- [ ] 2.1 Generate a type index from SDL at bundle time: type name → kind, fields, field
      args, deprecation, description. Root `Query`/`Mutation`/`Subscription` fields are
      marked as entry points.
- [ ] 2.2 Store it as a queryable artifact, not as prose. Size it so a single-type lookup
      never requires loading the whole index.
- [ ] 2.3 Record index size per provider in the build output — this is the number that
      tells you when the artifact needs splitting.
- [ ] 2.4 Tests: a known type resolves to its fields; an unknown type returns a miss, not
      an error; deprecated fields carry their reason.

## Acceptance criteria
**Done when** looking up one type costs a bounded read regardless of schema size.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/utdk-bundler test -- graphql-index
```

## Constraints
- Depends-on: §1 merged (#132)
- Touches: registry `packages/bundler/src/graphql-index.ts` (new),
  `packages/bundler/src/__tests__/graphql-index.test.ts` (or colocated)
- Do NOT register MCP lookup (§3) or docs (§4)
- Worktree: create `registry-iw8-gql02` from origin/main
- Branch `iw8/graphql-schema-02-index`; report `briefs/02-report.md`; do NOT merge

Rejected: extend tool-description search; expose SDL as MCP resource.
