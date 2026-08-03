# Brief: Playground removal + workspace profile CRUD (native-panel-polish streams 1 + 3)

## Mission
Remove the Playground native surface (with graceful stale-tab fallback) and stand up
workspace profile CRUD routes on the gateway (`routes/profiles.ts`) over registry-server
`ProfileService`. These two streams are ungated and path-disjoint from the parallel editor /
presence / unfork work. Panel convention restyles and registry-ui profile UI come later.

## Read first
1. `openspec/changes/native-panel-polish/prd.md`
2. `openspec/changes/native-panel-polish/ux.md` (stale playground tab; shared conventions for
   copy tone on surface descriptions only if stream 2 is not in scope — here only fallback copy)
3. `openspec/changes/native-panel-polish/tech-plan.md` (D4 + Interfaces for ProfileWire)
4. `openspec/changes/native-panel-polish/tasks.md` (streams 1 and 3)
5. Specs: `playground-removal/spec.md`, `credential-profiles/spec.md` (server scenarios)
6. Sources:
   - `client/web/src/lib/native-surfaces.tsx`
   - `server/workspace/src/routes/groups.ts` (existing `workspaceProfilesRouter` to move)
   - `server/workspace/src/profile-grants.ts`

## Tasks
Streams **1** and **3** (1.1–1.3, 3.1–3.3). Check off as completed.
Do **not** edit `shell.tsx` contract types, AgentsPanel, registry-ui credentials/admin, or
TelemetryPanel (other streams / later waves).

## Acceptance criteria
**playground-removal**
- Playground surface removed; stale playground tabs show notice + catalog link; unknown
  native ids never crash

**credential-profiles** (server)
- Workspace serves profile CRUD; admin round-trip; members read / only admins write;
  unavailable backend answers 501; no credential payload leakage

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
! git grep -q "PlaygroundPanel\|lib/playground" -- client/web/src
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
pnpm --filter @aprovan/patchwork-web exec vitest run src/features/tabs
pnpm --filter @aprovan/workspace typecheck
pnpm --filter @aprovan/workspace test
```

## Git workflow
- Repo: aprovan; branch `iw4/playground-and-profiles` from `origin/main`
- Isolated worktree; rebase; PR; merge when green.
- If `native-surfaces.tsx` conflicts with another branch adding `apps`, keep playground
  removal and leave apps entry to IW-1.
- Do not delete `@aprovan/runtime` consumption beyond playground files named in tasks —
  IW-0 publishes runtime; playground code goes away here.

## Constraints
- `NativePanelProps` / `PanelHostActions` must remain unchanged (stream 2 verifies freeze).
- Touches only stream 1 + 3 globs in tasks.md.
- Surgical; karpathy-guidelines.

## Report back
Check off 1.* and 3.*; write `briefs/01-report.md` with PR URL, verify summary, and notes
for streams 2/4/5 (shell primitives, agents, credentials UI).
