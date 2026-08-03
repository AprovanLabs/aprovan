# Report: Brief 07 — Activity panel metric rows

## PR
https://github.com/AprovanLabs/aprovan/pull/63

Branch: `iw5/telemetry-panel`
Worktree: `/tmp/iw5-telemetry-panel`

## What landed
- `TelemetryPanel` `TelemetryEvent` includes `kind: "metric"` (`metricType`, `value`,
  `unit?`).
- Metric rows render name, value + unit, and source chip (log-row composition).
- Per-kind rendering is an exhaustive `switch` on `TelemetryEvent["kind"]` with a
  compile-time `never` check.
- Trace summaries still use server `errors` (metrics carry no status/level, so they
  are not counted as errors). Status/source filters unchanged.

## Verify
```text
pnpm --filter @aprovan/patchwork-web... build
  OK
```

## Tasks
7.1–7.2 checked off. Streams 1–6 untouched.
