# Report: Brief 05 — native export + metric kind

## PR
https://github.com/AprovanLabs/aprovan/pull/61

Branch: `iw5/telemetry-native`
Worktree: `/tmp/iw5-telemetry-native`

## What landed
- `TelemetryEvent` gains `kind: "metric"` (`name`, `metricType`, `value`, `unit?`);
  `emit`/`query`/app-scoping accept metrics unchanged.
- Native `telemetry.export`: `validateExportArgs` → flatten OTLP three-signal into
  activity-store events (`BATCH_CAP` on flattened count); returns
  `TelemetryExportResult`. Tool entry from `telemetryToolEntries("telemetry")`.
- Dispatch (D3): bare `telemetry.*` stays core-service (never vendor-egresses).
  Named `telemetry:<name>` resolves via interface machinery; discovery uses
  `telemetryToolEntries(namespace)`. Telemetry `native` omitted from named-instance
  namespace listings; bind-to-native rejected.
- Dep stays `@utdk/telemetry@^0.3.0` (npm) — not `workspace:*`.

## Verify
```text
pnpm --filter @aprovan/workspace test -- tests/telemetry.test.ts tests/interfaces-catalog.test.ts
  OK — 16 tests
pnpm --filter @aprovan/workspace check-types
  OK
```

## Tasks
5.1–5.4 checked off. Streams 6–7 untouched.

## Owner discovery (unchanged)
Bare `telemetry` never vendor-egresses; vendor export is always a named
instance (`telemetry:datadog`).
