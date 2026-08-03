# Brief: Admin panel rework + group profiles (stream 6)

## Mission
Add group-profile client APIs, Profiles section on group detail (attach/detach, 501 →
unavailable), rework AdminPanel to Members/Groups/Access dense tabs with armed
destructive actions, plus unit tests.

## Gate
Streams 2–3 and 5 merged (#37 conventions, profile routes, #46 credential profiles).
Do **not** edit `packages/registry-ui/src/credentials/**` or fight stream-5 `index.tsx`
exports — AdminPanel is already exported.

## Read first
1. `briefs/02-report.md`, `briefs/05-report.md`
2. `ux.md` Admin / group profiles, `tech-plan.md` Interfaces
3. `tasks.md` stream 6 (6.1–6.4)
4. Spec: `admin-group-profiles`
5. Existing: `packages/registry-ui/src/admin/**`, `AdminPermissionsPanel.tsx`

## Tasks
6.1–6.4 verbatim.

## Verify
```bash
pnpm --filter @aprovan/registry-ui build
pnpm --filter @aprovan/registry-ui test
pnpm --filter @aprovan/patchwork-web build
! grep -rn "confirm(" packages/registry-ui/src/admin --include="*.tsx" | grep -v test
```

## Git
`/tmp/iw4-admin-profiles` branch `iw4/admin-profiles` from latest `origin/main`.
No `move_agent_to_root`. Rebase before PR/merge.

## Constraints
Touches stream 6 globs only. Props signature `{ client }` unchanged.

## Report back
Check off tasks, merge PR, `briefs/06-report.md`. Return merged PR URL.
