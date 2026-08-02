# telemetry-contract-signals

The `@utdk/telemetry` contract covers all three OTel signals — spans, logs, and metrics —
in the OTLP/HTTP JSON encoding subset, so a payload built for the contract posts to any
OTLP collector unmodified.

## ADDED Requirements

### Requirement: The contract accepts OTLP metrics

`TelemetryExportArgs` SHALL accept `resourceMetrics` (OTLP JSON `ResourceMetrics[]`)
alongside `resourceSpans` and `resourceLogs`, and `validateExportArgs` SHALL no longer
reject a payload for containing `resourceMetrics` (the 501 reservation is lifted). The
metrics subset SHALL cover exactly three data shapes — `gauge`, `sum` (with
`aggregationTemporality` and `isMonotonic`), and `histogram` (with `explicitBounds` and
`bucketCounts`) — with field names and casing exactly as OTLP JSON (`timeUnixNano` and
`asInt` as strings). A metric declaring zero or more than one data shape SHALL be rejected
with a 400 `TelemetryError`. The package header comment SHALL no longer describe metrics
as deliberately absent.

#### Scenario: Metrics-only payload validates

- **WHEN** `validateExportArgs` receives a payload whose only content is a non-empty
  `resourceMetrics` array containing a well-formed gauge metric
- **THEN** validation passes without transformation and no 501 is raised

#### Scenario: Malformed metric is rejected with a named field

- **WHEN** a metric carries both `gauge` and `sum`, or a data point's `timeUnixNano` is a
  number instead of a string
- **THEN** `validateExportArgs` throws a `TelemetryError` with status 400 whose message
  names the offending field path

#### Scenario: Payload still posts to a collector unmodified

- **WHEN** a validated three-signal payload's `resourceMetrics` is posted as the body of
  `POST /v1/metrics` on an OTLP/HTTP collector (audit-level verification)
- **THEN** the collector accepts it with no field renaming or re-encoding

### Requirement: Export accounting covers metrics

`TelemetryExportResult` SHALL report `accepted: { spans, logs, metrics }` and, on partial
success, `rejected: { spans, logs, metrics, message }`, where the metrics count is the
number of metric data points (mirroring OTLP `rejectedDataPoints`).

#### Scenario: Accepted counts include data points

- **WHEN** an implementation accepts a payload containing one sum metric with three data
  points and two spans
- **THEN** the result reports `accepted.spans = 2` and `accepted.metrics = 3`

### Requirement: Empty and oversized payload rules extend to three signals

A payload with none of `resourceSpans`, `resourceLogs`, or `resourceMetrics` non-empty
SHALL be rejected with a 400 `TelemetryError`. The serialized-size cap
(`MAX_EXPORT_BYTES`) SHALL apply to the whole three-signal payload unchanged.

#### Scenario: All-empty payload is 400

- **WHEN** `validateExportArgs` receives `{}` or `{ resourceMetrics: [] }`
- **THEN** it throws a `TelemetryError` with status 400

### Requirement: Tool discovery describes three signals

`telemetryToolEntries(provider)` SHALL keep emitting exactly one `<provider>.export` entry
whose description and input schema name all three arrays (`resourceSpans`, `resourceLogs`,
`resourceMetrics`) and the size cap.

#### Scenario: Discovery entry mentions metrics

- **WHEN** `telemetryToolEntries("datadog")` is called
- **THEN** the single entry's `inputSchema.properties` contains `resourceMetrics` and the
  description no longer implies spans/logs only

### Requirement: The three-signal surface is re-audited and frozen at 0.3.0

`AUDIT.md` SHALL be extended with a metrics mapping against the same three intakes (OTLP
Collector, Datadog OTLP, Honeycomb OTLP), recording per-shape findings or an explicit "no
change". `@utdk/telemetry` SHALL be versioned 0.3.0 only after the extended audit closes,
and consumers SHALL treat 0.3.x as the frozen three-signal surface.

#### Scenario: Audit gates the version bump

- **WHEN** the package version reads 0.3.0
- **THEN** `AUDIT.md` contains a metrics section mapping gauge/sum/histogram onto at least
  two real OTLP intakes
