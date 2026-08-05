# Brief: graphql-schema-surface §4 — SDL-derived overview docs

## Mission
Generate provider-level `docs/graphql.md` from SDL (root entry points, pagination
convention, ID/node scheme, auth-scope model, deprecation posture). Bound length for
tool descriptions; preserve `prompt-hash` footer. No per-query/mutation sections.

## Read first
1. `openspec/changes/graphql-schema-surface/{prd,tech-plan,tasks}.md`
2. §2 artifacts: `graphql-index.json` / `.ndjson`, Linear seed
3. registry `packages/bundler/src/docs/**`

## Tasks
Copy §4 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** `docs/graphql.md` tells an agent the provider's conventions, and
`schema_lookup` covers everything it deliberately omits.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/utdk-bundler test -- docs
```

## Constraints
- Depends-on: §2 merged
- Touches: `packages/bundler/src/docs/**`, `packages/utdk/<provider>/docs/graphql.md`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-gql04`
- Branch `iw8/graphql-schema-04-docs`; report `briefs/04-report.md`; do NOT merge
