# Brief: Conflict consolidation + SessionBar declutter (stream 6)

## Mission
Route draft-sync conflicts through `publishConflictNotification`; strip MergeConflictCard
to summary + Review; declutter SessionBar; delete `keepEditDrafts` end-to-end; scope
versioning vocabulary to staged contexts.

## Gate
Editor stream 4 (#41). Presence UI (#47) already removed peers chip/drawer — do not
reintroduce; continue declutter from that baseline.

## Read first
1. `briefs/04-report.md`, presence `briefs/04-report.md` if present
2. `tasks.md` stream 6 (6.1–6.5)
3. Specs: `session-history-simplification`
4. Existing: SessionBar, MergeConflictCard, useDraftSync, conflict-notify

## Tasks
6.1–6.5 verbatim.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web build
! grep -rn "edit-keep-draft\|keepEditDrafts" client/web/src
# publishNotification should not remain as the draft-sync path:
! grep -c "publishNotification" client/web/src/features/sessions/useDraftSync.ts || true
```
(Follow the exact Verify line in tasks.md.)

## Git
`/tmp/iw2-sessionbar` branch `iw2/sessionbar-declutter`. No `move_agent_to_root`.

## Constraints
Touches stream 6 globs only. Do not recompose ChatDock (stream 5) beyond what's needed
for conflict notify wiring.

## Report back
Check off tasks, merge PR, `briefs/06-report.md`. Return merged PR URL.
