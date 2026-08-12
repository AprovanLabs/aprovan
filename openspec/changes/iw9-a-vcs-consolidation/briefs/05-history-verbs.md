# Brief: Client — history view, undo, all six vcs verbs

## Mission

Wire History (workspace + app scope) over `vcs.log`/`branches`/`show`/`diff`,
one-click restore, manual commit, retitle VcsPanel to "Code host", and kill
hash-token UI leaks. Completes six-of-six verb coverage on the client.

## Read first

1. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` stream 5
2. `ux.md` History / restore copy
3. Stream 4 on main: DiffViewer, ChangeList
4. Stream 2 on main (#207): `scope` on discovery schemas
5. Stream 1: two-parent merges, app refs
6. Note: stream 3 may delete `versions.tsx` — if already gone, confirm no imports; if still present, leave deletion to stream 3 or delete only if in Touches

## Tasks

Copy 5.1–5.5 from `tasks.md` verbatim.

## Verify

Per tasks.md Verify line.

## Constraints

- Touches ONLY stream 5 paths (+ tasks/report)
- Open PR; `briefs/05-report.md`

## Report back

PR URL, verify, deviations.
