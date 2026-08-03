# Brief: Native telemetry export + metric kind (stream 5)

## Mission
Implement native `telemetry.export` (OTLP three-signal → activity store events), add
`kind: "metric"` to `TelemetryEvent`, keep bare `telemetry.*` on the core-service branch,
and route named `telemetry:<name>` instances through interface machinery to vendor
adapters (e.g. datadog). Bare `telemetry` never vendor-egresses.

## Gate
Stream 4 merged — `@utdk/telemetry@0.3.0` on npm; workspace already depends on
`@utdk/telemetry@^0.3.0` (#60). **Do not** change that dep back to `workspace:*`
(task 5.1 text is stale post–IW-0 npm path).

## Read first
1. `briefs/04-report.md`
2. `tasks.md` stream 5 (5.1–5.4) — interpret 5.1 dep as “ensure `@utdk/telemetry` is
   available”; keep `^0.3.0`
3. `tech-plan.md` D3 + export mapping / BATCH_CAP
4. Specs: `native-telemetry-implementation`, `telemetry-contract-signals`
5. Existing: `server/workspace/src/telemetry/**`, `routes/tools.ts`

## Tasks
5.1–5.4 verbatim (with npm dep note above).

## Owner discoveries (fixed)
- Bare `telemetry` never vendor-egresses; vendor = named instance (`telemetry:datadog`).
- `telemetry` native compat entry is never a connectable vendor in namespace listings
  (like `agent`).

## Verify
```bash
pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/workspace check-types
# or typecheck if check-types script name differs
```

## Git
`/tmp/iw5-telemetry-native` branch `iw5/telemetry-native`. No `move_agent_to_root`.
Rebase onto `origin/main` before PR/merge.

## Constraints
Touches stream 5 globs only. Do not wire workflow/widget SDK (stream 6) or Activity panel
(stream 7).

## Report back
Check off 5.1–5.4, merge PR, `briefs/05-report.md`. Return merged PR URL.
