# Brief: grant-enforcement §2 — Dynamic namespace access is an error

## Mission
`tools[expr]` becomes a parse error (not an `unresolved` warning). Message names the
construct and points at `tools.search()` and `globalAlias`. Remove/retire the warning
chip in registry-ui.

## Read first
1. `openspec/changes/grant-enforcement/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D4
3. registry `packages/remote/src/tools-scan.ts`, `imports.ts`, `__tests__/remote.test.ts`
4. registry `packages/registry-ui/src/dependency-panel.tsx`
5. Grep consumers of `unresolved` / `ToolsAccessScan` in both repos before deleting the field

## Tasks
- [ ] 2.1 Make `tools[expr]` a parse error rather than an `unresolved` flag. The message
      names the construct and points at `tools.search()` for discovery and at
      `globalAlias` for slash-named providers.
- [ ] 2.2 Remove `unresolved` from `ToolsAccessScan`, or retain it only as an always-false
      field if downstream UI depends on the shape — decide by grepping consumers first.
- [ ] 2.3 Update `packages/registry-ui/src/dependency-panel.tsx`, which renders the
      warning chip today.
- [ ] 2.4 Tests: bracket access throws; string-literal `"tools[x]"` inside source does not.

## Acceptance criteria
**Done when** no script can reach a namespace the static list does not contain, and the
warning chip is gone rather than orphaned.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @utdk/remote test
```

## Constraints
- After tools-addressing §4 (done — single scanner in `@utdk/remote`)
- Bump `@utdk/remote` past 0.1.4 for publish
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge02`
- Branch `iw8/grant-enforcement-02-bracket`; report `briefs/02-report.md`; do NOT merge
