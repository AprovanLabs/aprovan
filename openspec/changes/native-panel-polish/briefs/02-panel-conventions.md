# Brief: Panel conventions — shell primitives + registry copy (stream 2)

## Mission
Add `PanelUnavailable` + any missing shell primitives; rewrite the remaining
`NATIVE_SURFACES` titles/descriptions to ux.md copy; confirm `NativePanelProps` /
`PanelHostActions` contract freeze.

## Gate
Stream 1 merged (playground removed — `briefs/01-report.md`). IW-1 apps surface is on
main (`apps` entry exists) — preserve it when editing `native-surfaces.tsx`.

## Read first
1. `briefs/01-report.md`, `ux.md` panel conventions, `tech-plan.md`
2. `tasks.md` stream 2 (2.1–2.3)
3. Spec: `panel-conventions`
4. Existing: `components/panels/shell.tsx`, `lib/native-surfaces.tsx`

## Tasks
2.1–2.3 verbatim from `tasks.md`.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web typecheck
git grep -n "scope?: AppScope" client/web/src/components/panels/shell.tsx
pnpm --filter @aprovan/patchwork-web build
```

## Git
Worktree `/tmp/iw4-panel-conventions` branch `iw4/panel-conventions` from `origin/main`.
Do **not** call `move_agent_to_root`. Rebase carefully vs apps `native-surfaces` changes.

## Constraints
Touches only stream 2 globs. Do not rebuild Agents/Credentials/Admin (streams 4–6) or
copy-pass panels (7–8). Keep `apps` surface from IW-1.

## Report back
Check off tasks, merge PR, write `briefs/02-report.md`. Return merged PR URL.
