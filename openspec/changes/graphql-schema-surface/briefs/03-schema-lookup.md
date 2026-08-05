# Brief: graphql-schema-surface §3 — Schema lookup tool

## Mission
Register `schema_lookup({ provider, type?, field?, version? })` through `McpExtensions`,
returning one type's fields (or root entry points when `type` omitted). Cap response size
and say so when truncated.

## Read first
1. `openspec/changes/graphql-schema-surface/{prd,tech-plan,tasks}.md`
2. §2 index layout: `graphql-index.json` + `.ndjson`, `lookupGraphqlType`
3. GE §5 on main — follow `McpExtensions` / `withSandboxTool` composition pattern
4. registry `packages/mcp-core/src/**`, `packages/registry-server/src/mcp/**`

## Tasks
Copy §3 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** an agent can go from "list issues" to the fields it needs in two calls
without the SDL entering context.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @utdk/mcp-core test && pnpm --filter @aprovan/registry-server test -- mcp
```

## Constraints
- Depends-on: §2 + GE §5 (both merged)
- Compose with sandbox tool extensions — do not replace them
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-gql03`
- Branch `iw8/graphql-schema-03-lookup`; report `briefs/03-report.md`; do NOT merge
