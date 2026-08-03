# Brief: Copy pass B — activity & delivery panels (stream 8)

## Mission
Apply ux.md tone/density/empty-error states and armed destructive actions to
Notifications, Telemetry (Activity), Webhooks, and Sessions panels. Presentation/copy
only — do not change session semantics (IW-2 owns those).

## Gate
Stream 2 merged. Stream 7 (copy A) already on main.

## Read first
1. `briefs/02-report.md`, `briefs/07-report.md` if present
2. `ux.md` for Notifications / Activity / Webhooks / Sessions
3. `tasks.md` stream 8 (8.1–8.4)
4. Spec: `panel-conventions`
5. Existing: the four panel files in Touches

## Tasks
8.1–8.4 verbatim.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw4-copy-pass-b` branch `iw4/copy-pass-b`. No `move_agent_to_root`. Rebase + merge.

## Constraints
Touches only stream 8 panel files. Do not change session draft/edit semantics.
If a telemetry-contract change later touches TelemetryPanel, this stream owns copy only.

## Report back
Check off tasks, merge PR, `briefs/08-report.md`. Return merged PR URL.
