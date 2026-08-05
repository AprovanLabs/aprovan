# Brief: grant-enforcement §5 — MCP sandbox execution tool

## Mission
Register a sandboxed-TypeScript MCP tool via `McpExtensions` that routes `tools` through
the same `Dispatcher` as `call_tool` (passes `resolveProfile`). Refuse registration when
`authMode === "none"`. Accept optional narrowing → `CallContext.narrowedTo`.

## Read first
1. `openspec/changes/grant-enforcement/{prd,tech-plan,tasks}.md` — D2, D5
2. GE §1 + §4 on main (`narrowedTo`, gated step 5)
3. registry `packages/registry-server/src/mcp/**`
4. Conflict: land BEFORE graphql-schema-surface §3 (both use McpExtensions)

## Tasks
Copy §5 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** submitting arbitrary TypeScript through MCP reaches strictly less than or
equal to what `list_tools` showed the same caller.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- mcp
```

## Constraints
- Depends-on: GE §1, §4 (both merged)
- Touches: `packages/registry-server/src/mcp/**`, `mcp/__tests__/**`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge05`
- Branch `iw8/grant-enforcement-05-sandbox`; report `briefs/05-report.md`; do NOT merge
