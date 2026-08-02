# native-telemetry-implementation

The workspace telemetry service becomes the contract's registered default implementation:
it accepts `export`, stores all three signals, and vendor egress rides named interface
instances — reads stay native.

## ADDED Requirements

### Requirement: The native service accepts the contract's export op

The `telemetry` core service (`server/workspace/src/telemetry/service.ts`) SHALL gain an
`export` procedure whose args are the contract's `TelemetryExportArgs`, validated by
`validateExportArgs` from `@utdk/telemetry`. Accepted envelopes SHALL be flattened into
activity-store events: each OTLP span → one `span` event (ids carried through, duration
derived from the nano timestamps, OTLP status code 2 → `status: "error"` with message),
each log record → one `log` event (severity mapped to level, string body to message), each
metric data point → one `metric` event. Existing caps (`BATCH_CAP` on flattened events,
text clipping, 3-day TTL) SHALL apply, and the procedure SHALL return the contract's
`TelemetryExportResult`. The `telemetry.export` tool SHALL appear in discovery for the
native namespace.

#### Scenario: OTLP export lands in the activity store

- **WHEN** a caller posts a valid OTLP payload with one span, one log, and one gauge data
  point to `telemetry.export`
- **THEN** the result is `accepted: { spans: 1, logs: 1, metrics: 1 }` and
  `telemetry.query` returns three events of kinds `span`, `log`, and `metric` with the
  span's trace correlation intact

#### Scenario: Invalid OTLP is a contract-shaped rejection

- **WHEN** the payload contains a span with a malformed `traceId`
- **THEN** the call fails 400 with the contract's field-naming message and nothing is
  stored

### Requirement: The metric event kind exists in the activity store

`TelemetryEvent` SHALL support `kind: "metric"` carrying `name`, `metricType`
(`counter` | `gauge` | `histogram`), `value` (data-point value; histogram stores the sum),
optional `unit`, and the usual `source`/`attributes`/`at` fields. `telemetry.query` SHALL
return metric events under the existing filters, and app-session scoping SHALL apply to
them exactly as to spans and logs (server-stamped `source.app`; app sessions read only
their own stream).

#### Scenario: Metrics respect app scoping

- **WHEN** an app session emits metrics via `export` and another app session queries
- **THEN** the emitting app's events carry its server-stamped `source.app` and the other
  app's query never returns them

### Requirement: Vendor egress is a named interface instance; the bare namespace stays native

The bare `telemetry` namespace SHALL always dispatch to the native core service (existing
core-service precedence), and this SHALL agree with compat resolution (the credentialless
`native` entry wins zero-config). Vendor egress SHALL require an explicit named instance —
e.g. binding `telemetry:datadog` to the `datadog` compat entry — dispatched through the
existing interface machinery to the adapter module; named telemetry instances SHALL never
resolve to `native` and SHALL expose only the contract op (`export`) in discovery via
`telemetryToolEntries(namespace)`. The `native` pseudo-provider SHALL NOT appear as a
connectable vendor in namespace listings (the `agent` handling precedent).

#### Scenario: Named instance exports to the vendor

- **WHEN** a workspace binds `telemetry:datadog` with a Datadog credential and a workflow
  calls `telemetry:datadog.export` with a valid payload
- **THEN** the dispatch resolves to the `datadog/telemetry` module and the payload leaves
  through the Datadog OTLP intake, while `telemetry.export` continues to write the
  workspace store

#### Scenario: Unbound named instance fails legibly

- **WHEN** `telemetry:staging.export` is called with no such binding
- **THEN** the caller gets the existing named-instance 404 telling them to bind it, not a
  silent native fallback

### Requirement: The SDK is wired into the workflow sandbox and widget runtime

The workflow sandbox and the browser widget runtime SHALL expose a pre-bound
`@utdk/telemetry/sdk` facade whose `export` targets `telemetry.export` and whose
attribution reflects the run's source (`{type, path, runId?/sessionId?}`). The workflow
runner SHALL flush the facade at run end on both success and error paths. Raw
`telemetry.emit/query/traces` remain available unchanged.

#### Scenario: Workflow logs through the facade

- **WHEN** a workflow script calls the exposed `log("info", …)` helper and the run ends
- **THEN** the event is flushed to `telemetry.export` and is queryable with the run's
  `runId` attribution without the script having built any OTLP envelope

#### Scenario: Failed runs still flush

- **WHEN** a workflow script throws after recording telemetry
- **THEN** the buffered events are flushed before the run is reported failed

### Requirement: The Activity panel accommodates metric events

The Activity panel (`telemetry` native surface) SHALL render `metric` events in its
existing list/query presentation — name, value, unit, source — and its filters SHALL not
break on the new kind. No charting or new visualization is added.

#### Scenario: Metric rows render

- **WHEN** the Activity panel loads a workspace whose store contains metric events
- **THEN** metric rows display name/value/unit alongside span and log rows and existing
  status/source filters continue to work
