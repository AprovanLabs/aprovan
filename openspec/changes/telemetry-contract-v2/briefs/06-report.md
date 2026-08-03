# Report: Brief 06 — telemetry SDK wiring

## PR
https://github.com/AprovanLabs/aprovan/pull/64

Branch: `iw5/telemetry-sdk`
Worktree: `/tmp/iw5-telemetry-sdk`

## What landed
- Workflow sandbox: host-side `createTelemetry` facade on the `telemetry`
  namespace; helpers (`log`/`counter`/`gauge`/`histogram`/`withSpan`/`flush`)
  call bare `telemetry.export` with server-stamped
  `{type: "workflow", path, runId}` attribution; raw `emit`/`query`/`traces`/
  `export` stay available. Guest bind implements `withSpan` locally (callbacks
  cannot cross the JSON bridge).
- Runner flushes in `try/finally` with a 2s budget (failed runs still flush).
- Widget runtime: `widgetTelemetrySdk({ path, sessionId })` over the tool-call
  bridge (`telemetry.export` + `X-Telemetry-Source`); flush on visibility
  change / pagehide.
- `flattenExport` honors `ServiceContext.telemetrySource` (set by the runner /
  HTTP attribution header).

## Verify
```text
pnpm --filter @aprovan/workspace test
  OK — 537 passed
pnpm --filter @aprovan/workspace check-types
  OK
pnpm --filter @aprovan/patchwork-web build
  OK
```

## Tasks
6.1–6.4 checked off. Stream 7 already merged (#63); TelemetryPanel untouched.

## Owner discovery (unchanged)
Bare `telemetry` = native store only; facades call bare `telemetry.export`,
never a vendor instance.
