# Brief: Client — sessions answerable + MergeDialog on sessions.resolve

## Mission

Rewire MergeDialog to real two-version diffs via DiffViewer/ChangeList,
unify change-list renderings, show auto-session change strips, and sweep
Git jargon from Sessions/Sandboxes panels. Wire `recordSessionTouch` call
sites if they fall in Touches; otherwise note stream 1's helper for a
follow-up on fs routes.

## Read first

1. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` stream 6
2. `ux.md` vocabulary table
3. Stream 4 on main: `DiffViewer`, `ChangeList`, SaveAffordance seam
4. Stream 1: two-parent merges, `recordSessionTouch`, `includesOtherActivity`
5. `MergeDialog.tsx`, `SessionBar.tsx`, panels

## Tasks

Copy 6.1–6.4 from `tasks.md` verbatim.

## Verify

Per tasks.md Verify (client typecheck/test + GitBranch/uncommitted grep gate).

## Constraints

- Touches ONLY stream 6 paths (+ tasks/report)
- If `recordSessionTouch` must be wired in `routes/fs.ts`, report as deviation
  (outside Touches) rather than expanding scope
- Open PR; `briefs/06-report.md`

## Report back

PR URL, verify, deviations.
