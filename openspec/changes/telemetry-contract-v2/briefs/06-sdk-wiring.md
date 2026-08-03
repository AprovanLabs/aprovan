# Brief: Telemetry SDK wiring — workflow + widget (stream 6)

## Mission
Expose pre-bound `createTelemetry` facades in the workflow sandbox and widget runtime
that call native `telemetry.export`, with run/widget attribution, flush on success/error/
teardown, and a test that scripts use SDK helpers without hand-building OTLP.

## Gate
Stream 5 merged (#61). `@utdk/telemetry@^0.3.0` with `./sdk` available.

## Read first
1. `briefs/05-report.md`
2. `tasks.md` stream 6 (6.1–6.4)
3. Specs: `telemetry-sdk`, native export attribution
4. `tech-plan.md` SDK facade section
5. Existing: `server/workspace/src/workflows/**`, widget runtime under `client/web/src/lib/**`

## Tasks
6.1–6.4 verbatim.

## Owner discoveries
Bare `telemetry` = native store only; named instances are separate. Facades should call
bare `telemetry.export` (native), not a vendor instance, unless explicitly configured
otherwise by the change artifacts.

## Verify
```bash
pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw5-telemetry-sdk` branch `iw5/telemetry-sdk`. No `move_agent_to_root`.

## Constraints
Touches stream 6 globs only. Do not edit Activity/TelemetryPanel (stream 7).

## Report back
Check off tasks, merge PR, `briefs/06-report.md`. Return merged PR URL.
