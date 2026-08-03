# Tasks — telemetry-contract-v2

Registry repo: `/Users/jacob/Documents/Code/AprovanLabs/registry`. Aprovan repo:
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`. Registry-first (tech-plan D7); the
aprovan fork of the contract package is a verbatim mirror until IW-0 lands.

## 1. Contract: three-signal surface

> Depends-on: - | Touches: registry/packages/contracts/telemetry/{index.ts,__tests__/**,AUDIT.md} | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test

- [x] 1.1 Add the OTLP metrics subset types to `index.ts` (`OtlpNumberDataPoint`,
      `OtlpHistogramDataPoint`, `OtlpMetric`, `OtlpResourceMetrics`) exactly as declared
      in tech-plan Interfaces & Data (D1: gauge/sum/histogram only; nano strings, `asInt`
      as string).
- [x] 1.2 Extend `TelemetryExportArgs` with `resourceMetrics` and `TelemetryExportResult`
      with `metrics` counts (data points); update `validateExportArgs` to lift the 501,
      require at least one of the three arrays non-empty, and validate metric shapes with
      field-path-naming 400s (spec: "Malformed metric is rejected with a named field").
- [x] 1.3 Update the package header comment (metrics no longer "deliberately absent";
      query/read exclusion reasoning stays) and `telemetryToolEntries` description +
      `inputSchema` to name all three arrays.
- [x] 1.4 Extend `__tests__/telemetry.test.ts`: metrics-only payload validates; mixed
      three-signal payload validates; zero/two-data-shape metric 400s; empty `{}` and
      `{ resourceMetrics: [] }` 400; size cap applies to metrics; a literal OTLP JSON
      metrics body passes unmodified.
- [x] 1.5 Extend `AUDIT.md` with the metrics mapping against OTLP Collector, Datadog
      OTLP, and Honeycomb OTLP (per-shape findings or explicit "no change") — the 0.3.0
      freeze gate (spec: "Audit gates the version bump").

## 2. Contract: SDK helper layer

> Depends-on: 1 | Touches: registry/packages/contracts/telemetry/{sdk/**,package.json} | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test

- [x] 2.1 Implement `sdk/index.ts`: `newTraceId`/`newSpanId` (crypto.getRandomValues →
      lowercase hex), `nowUnixNano`, and `createTelemetry` per the tech-plan SDK surface —
      `log`, `counter` (monotonic delta sum), `gauge`, `histogram` (default explicit
      bounds per tech-plan open question), `startSpan`/`withSpan`, `flush`; buffering with
      `maxBatch`/`flushIntervalMs`/`onError`; attribution folded via `withAttribution`
      (D2, D6). No imports beyond the contract's own module and Web APIs.
- [x] 2.2 Add the `./sdk` subpath export to `package.json` (types + import conditions,
      mirroring the root export shape).
- [x] 2.3 SDK tests: every flushed batch passes `validateExportArgs`; logs inside
      `withSpan` carry the active trace/span ids; `attribution` lands as `aprovan.*`
      resource attributes; rejecting `export` reaches `onError` without throwing into
      caller code and the facade keeps accepting; `flush()` drains and returns the result;
      timer disabled at `flushIntervalMs: 0`.

## 3. Compat catalog + Datadog adapter

> Depends-on: 1 | Touches: registry/packages/contracts/telemetry/compat.json, registry/packages/utdk/datadog/telemetry/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && npx vitest run packages/utdk/datadog/telemetry && pnpm --filter utdk check-types

- [x] 3.1 Write `contracts/telemetry/compat.json` exactly as specified in the tech plan:
      `native` (credentialless), `datadog` (module `datadog/telemetry`), `sentry`
      (module `sentry/telemetry`, `unavailable` with the trace-focused/DSN-keyed reason).
      Confirm it loads via `@utdk/common/compat` `loadCompatDocuments`.
- [x] 3.2 Implement handwritten `packages/utdk/datadog/telemetry/index.ts` (`github/vcs`
      pattern): `createDatadogTelemetryClient(options)` → validate with
      `validateExportArgs`, fan out non-empty signal arrays to `/v1/traces`, `/v1/logs`,
      `/v1/metrics` with `DD-API-KEY` from `secretFromHeaders`, zero shape translation,
      merge partial-success into one `TelemetryExportResult` (D5).
- [x] 3.3 Adapter tests against injected `fetchImpl`: per-signal fan-out (two POSTs for
      spans+metrics), verbatim bodies, `DD-API-KEY` header present, partial-success merge
      (`rejected.spans = 2` case), missing-credential 400 naming `datadog`.
- [x] 3.4 Ensure the catalogue build picks up the new suite module (transpiles into
      `dist/datadog/telemetry/`, exports map advertises it — the `github/vcs` precedent).

## 4. Freeze and mirror

> Depends-on: 1, 2, 3 | Touches: registry/packages/contracts/telemetry/package.json, aprovan/packages/contracts/telemetry/** | Verify: diff -r --exclude=node_modules --exclude=dist /Users/jacob/Documents/Code/AprovanLabs/registry/packages/contracts/telemetry /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/contracts/telemetry && cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @utdk/telemetry build && pnpm --filter @utdk/telemetry test

- [ ] 4.1 Bump `@utdk/telemetry` to 0.3.0 (audit from 1.5 must be closed) and run
      `pnpm publish --dry-run` to confirm the manifest (incl. the new `./sdk` subpath)
      is publishable.
- [ ] 4.2 Mirror the contract package verbatim into
      `aprovan/packages/contracts/telemetry` (D7). Skip and switch the dependency to
      published npm instead iff IW-0 (`execution-plane-unfork`) has landed. Record which
      path was taken in the commit message.

## 5. Native implementation: export + metric kind

> Depends-on: 4 | Touches: aprovan/server/workspace/src/telemetry/**, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/package.json | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace check-types

- [ ] 5.1 Add `"@utdk/telemetry": "workspace:*"` to the workspace server and extend
      `TelemetryEvent` with `kind: "metric"` (`name`, `metricType`, `value`, `unit?`) in
      `telemetry/service.ts`; metric events flow through `query` filters and app-session
      scoping unchanged.
- [ ] 5.2 Implement the `export` procedure on the telemetry core service: validate with
      the contract's `validateExportArgs`, flatten per the tech-plan mapping (span→span
      with duration from nano timestamps and status 2→error; logRecord→log with
      severity→level; metric data point→metric event), apply `BATCH_CAP` to flattened
      events and existing clipping, server-stamp `source.app` for app sessions, return
      the contract's `TelemetryExportResult`; add the `telemetry.export` tool entry to the
      service's `tools` list.
- [ ] 5.3 `routes/tools.ts`: keep bare `telemetry.*` on the core-service branch (D3 needs
      no dispatch change — assert with a test); make named `telemetry:<name>` instances
      resolve through the interface machinery to `datadog/telemetry`, list bound
      instances in discovery via `telemetryToolEntries(namespace)`, and treat the
      telemetry `native` compat entry like `agent`'s (never a connectable vendor in
      namespace listings).
- [ ] 5.4 Tests: OTLP three-signal export lands as three queryable events with trace
      correlation (spec scenario); malformed traceId → 400, nothing stored; metric
      app-scoping (emitting app's stream invisible to another app session); unbound
      `telemetry:staging.export` → existing named-instance 404; `sentry`-bound instance →
      501 with the `unavailable` text.

## 6. SDK wiring: workflow sandbox + widget runtime

> Depends-on: 5 | Touches: aprovan/server/workspace/src/workflows/**, aprovan/client/web/src/lib/** (widget runtime bridge only) | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/patchwork-web build

- [ ] 6.1 Workflow sandbox: expose a pre-bound `createTelemetry` facade on the `telemetry`
      namespace proxy whose `export` calls `telemetry.export` and whose attribution
      carries the run's `{type: "workflow", path, runId}`; raw ops stay available.
- [ ] 6.2 Workflow runner: flush the facade at run end on success and error paths
      (try/finally, bounded flush — spec: "Failed runs still flush").
- [ ] 6.3 Widget runtime: same facade over the widget tool-call bridge with
      `{type: "widget", path, sessionId}` attribution; flush on teardown/visibility
      change.
- [ ] 6.4 Test: a workflow script using `log`/`counter`/`withSpan` ends with events
      queryable by `runId`, having built no OTLP envelope in script code.

## 7. Activity panel metric rows

> Depends-on: 5 | Touches: aprovan/client/web/src/components/panels/** (telemetry panel only) | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build

- [ ] 7.1 Render `metric` events in the Activity panel list (name, value + unit, source
      chip; log-row composition per ux.md); existing source/status filters must not break
      on the new kind, and trace grouping must not count metrics as errors.
- [ ] 7.2 Make the panel's per-kind rendering an exhaustive `switch` on
      `TelemetryEvent["kind"]` (compile-time `never` check), so a future fourth kind
      fails typecheck rather than rendering blank — verified by the build. (The web
      package has no test runner; do not introduce one here.)
