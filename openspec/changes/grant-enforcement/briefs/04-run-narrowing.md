# Brief: grant-enforcement §4 — Run-scoped narrowing

## Mission
Add `narrowedTo?: string[]` to `CallContext` (canonical provider names). Validate at
construction as a subset of the principal's grant (superset → 400). Enforce in the same
predicate as the grant check. Record narrowing in the audit span.

## Read first
1. `openspec/changes/grant-enforcement/{prd,tech-plan,tasks}.md`
2. Tech-plan Interfaces `CallContext.narrowedTo`
3. registry `packages/registry-server/src/config/types.ts`, `src/dispatch/**`
4. GE §1 is on main (gated resolveProfile)

## Tasks
Copy §4 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** a caller can voluntarily reduce blast radius and cannot increase it.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- dispatch
```

## Constraints
- Depends-on: GE §1 (done)
- Touches: `config/types.ts`, `dispatch/**`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge04`
- Branch `iw8/grant-enforcement-04-narrow`; report `briefs/04-report.md`; do NOT merge
