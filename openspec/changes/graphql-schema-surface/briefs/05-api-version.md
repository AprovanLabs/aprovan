# Brief: graphql-schema-surface §5 — API version as first-class field

## Mission
Add optional `apiVersions` / `defaultVersion` on providers and `version` on profiles.
Derive `baseUrl` via `versionedBaseUrl` — profiles must not set both. Loud failure when
pinned version has no schema.

## Read first
1. `openspec/changes/graphql-schema-surface/{prd,tech-plan,tasks}.md` — D4
2. registry `packages/registry-server/src/profiles/resolve.ts` (GE §1 gate already on main)
3. `packages/registry-server/src/storage/types.ts`, `data/registry.json`

## Tasks
Copy §5 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** the endpoint and the schema for a given call are provably derived from one
field.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- profiles
```

## Constraints
- `data/registry.json`: additive field commits only; rebase, no merge fights
- GE §1 already gated resolve.ts — build version resolution on top
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-gql05`
- Branch `iw8/graphql-schema-05-version`; report `briefs/05-report.md`; do NOT merge
