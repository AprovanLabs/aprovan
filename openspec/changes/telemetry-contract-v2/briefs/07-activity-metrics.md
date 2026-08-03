# Brief: Activity panel metric rows (stream 7)

## Mission
Render `metric` events in the Activity (Telemetry) panel with name/value/unit/source chip
per ux.md; keep filters/trace grouping correct; make per-kind rendering an exhaustive
`switch` on `TelemetryEvent["kind"]`.

## Gate
Stream 5 merged (#61) — `kind: "metric"` exists on the wire/store.

## Read first
1. `briefs/05-report.md`
2. `tasks.md` stream 7 (7.1–7.2)
3. `ux.md` Activity / metric rows
4. Specs covering panel metric display if present
5. Existing TelemetryPanel / Activity panel under `client/web/src/components/panels/`

## Tasks
7.1–7.2 verbatim.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw5-telemetry-panel` branch `iw5/telemetry-panel`. No `move_agent_to_root`.

## Constraints
Touches telemetry/Activity panel only (stream 7 Touches). No session semantics changes.
Do not edit workflow/widget SDK (stream 6).

## Report back
Check off tasks, merge PR, `briefs/07-report.md`. Return merged PR URL.
