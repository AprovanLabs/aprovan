# telemetry-sdk

App/workflow-facing helpers over the OTLP shapes: `log`/`counter`/`gauge`/`histogram`/
`span` ergonomics so applications never hand-build OTLP envelopes.

## ADDED Requirements

### Requirement: The SDK ships as a zero-dependency subpath of the contract package

`@utdk/telemetry` SHALL export an SDK layer at the `./sdk` subpath. The SDK SHALL have no
runtime dependencies beyond Web-platform APIs (`crypto.getRandomValues`, `Date.now`,
`TextEncoder`) and MUST NOT import `@opentelemetry/*`, so it runs identically in Node, the
QuickJS workflow sandbox, and the browser widget runtime.

#### Scenario: SDK imports cleanly without Node builtins

- **WHEN** `@utdk/telemetry/sdk` is bundled for a browser/QuickJS target
- **THEN** the bundle resolves with no Node builtin or `@opentelemetry/*` imports

### Requirement: createTelemetry produces valid OTLP envelopes from ergonomic calls

`createTelemetry({ export, attribution?, resourceAttributes?, scope?, maxBatch?,
flushIntervalMs?, onError? })` SHALL return a facade with `log(level, message,
attributes?)`, `counter(name, value?, attributes?)` (monotonic delta sum), `gauge(name,
value, attributes?)`, `histogram(name, value, attributes?)`, `startSpan(name, options?)`,
`withSpan(name, fn)`, and `flush()`. Every batch the facade exports SHALL pass
`validateExportArgs` — generated `traceId`/`spanId` values are correctly-sized lowercase
hex, times are Unix-nano strings, and metric values use the OTLP JSON number encodings.

#### Scenario: Helper output round-trips validation

- **WHEN** a caller invokes `log`, `counter`, `gauge`, `histogram`, and `withSpan` and then
  `flush()` against a capturing `export` function
- **THEN** the captured `TelemetryExportArgs` passes `validateExportArgs` with all three
  signal arrays populated

#### Scenario: Spans correlate their inner logs

- **WHEN** `log` is called inside a `withSpan(name, fn)` callback
- **THEN** the exported log record carries the active span's `traceId` and `spanId`

### Requirement: Attribution is applied automatically

When `attribution` is provided, the SDK SHALL fold `{tenant, principal, source}` into each
exported resource's attributes under the `aprovan.*` keys via `withAttribution`, replacing
any caller-supplied values for those keys.

#### Scenario: Exported resources carry aprovan.* attributes

- **WHEN** a facade created with `attribution: { tenant: "w1", source: "workflow" }`
  flushes any signal
- **THEN** every exported resource's attributes include `aprovan.tenant = "w1"` and
  `aprovan.source = "workflow"`

### Requirement: Batching and failure isolation

The SDK SHALL buffer events and export when the buffer reaches `maxBatch` (default 100),
when `flushIntervalMs` elapses (default 5000; `0` disables the timer), or when `flush()`
is called. A failing `export` MUST NOT throw into application code: the error goes to
`onError` (or is swallowed) and the facade keeps accepting events.

#### Scenario: Export failure does not break the app

- **WHEN** the injected `export` rejects
- **THEN** the calling `log`/`metric`/`span` code observes no exception, `onError`
  receives the failure, and subsequent events are still accepted

#### Scenario: flush drains the buffer

- **WHEN** `flush()` is awaited after events were recorded
- **THEN** the buffer is empty and the returned value is the export result (or undefined
  when there was nothing to send)

### Requirement: Destination-agnostic by construction

The SDK SHALL depend only on the injected `export` function and MUST NOT special-case any
destination — the same facade works over `telemetry.export` (native) and
`telemetry:datadog.export` (vendor instance).

#### Scenario: Same facade, either destination

- **WHEN** `createTelemetry` is constructed with an `export` bound to a vendor instance
  instead of the native namespace
- **THEN** behavior and payload shape are identical; only the destination differs
