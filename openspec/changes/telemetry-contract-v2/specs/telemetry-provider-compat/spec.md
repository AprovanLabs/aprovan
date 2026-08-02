# telemetry-provider-compat

The telemetry contract gains its compat catalog — native default, a real Datadog adapter,
and an honest unavailable entry for Sentry.

## ADDED Requirements

### Requirement: The telemetry contract ships compat.json

`registry/packages/contracts/telemetry/compat.json` SHALL exist (schemaVersion 1) and
declare the `telemetry` interface with exactly three compat entries: `native`
(credentialless, module `native`, the workspace activity store), `datadog` (module
`datadog/telemetry`), and `sentry` (module `sentry/telemetry`) carrying an `unavailable`
reason. The interface description SHALL state that reads (`query`/`traces`) stay native
and vendor egress uses named instances.

#### Scenario: Compat loads through the standard loader

- **WHEN** `loadCompatDocuments` enumerates the contracts directory
- **THEN** the telemetry document loads without error and `listInterfaces()`-style
  consumers see `telemetry` with the three entries, `native` marked `credentialless`

#### Scenario: Zero-config resolution picks native

- **WHEN** the telemetry interface resolves with no explicit binding
- **THEN** the credentialless `native` entry wins ahead of any connected vendor credential

### Requirement: A handwritten Datadog adapter implements the contract

`registry/packages/utdk/datadog/telemetry/` SHALL be a handwritten suite module (the
`github/vcs` pattern) exporting `createDatadogTelemetryClient(options:
TelemetryClientOptions): TelemetryClient`. It SHALL validate args with
`validateExportArgs`, split the payload into OTLP `/v1/traces`, `/v1/logs`, and
`/v1/metrics` bodies, POST each non-empty body to the Datadog OTLP intake with the
`DD-API-KEY` header derived from the injected credential (via `secretFromHeaders`), pass
payloads through with zero shape translation, and merge the per-signal partial-success
responses into one `TelemetryExportResult`. A missing credential SHALL surface as the
contract's 400 `TelemetryError` naming the provider and secret. `baseUrl` and `fetchImpl`
injection SHALL work as in other adapters.

#### Scenario: Export fans out per signal

- **WHEN** the client's `export` receives a payload with spans and metrics but no logs,
  against an injected `fetchImpl`
- **THEN** exactly two POSTs occur (`/v1/traces`, `/v1/metrics`), each body is the
  corresponding array wrapped as OTLP JSON with no field changes, and both carry
  `DD-API-KEY`

#### Scenario: Partial success merges

- **WHEN** the traces endpoint reports `partialSuccess { rejectedSpans: 2 }` and the
  metrics endpoint accepts fully
- **THEN** the returned result carries `rejected.spans = 2`, `rejected.metrics = 0`, and a
  message naming the rejection

#### Scenario: Missing credential is a contract error

- **WHEN** the client is constructed without an `Authorization` header and `export` is
  called
- **THEN** a `TelemetryError` with status 400 names `datadog` and the required credential

### Requirement: Sentry is declared, not faked

The `sentry` compat entry SHALL carry an `unavailable` reason recording why no adapter
exists (Sentry's OTLP ingestion is trace-focused and DSN-keyed; no logs/metrics mapping).
No `sentry/telemetry` module SHALL be created in this change, and no generated
`@utdk/sentry` OpenAPI surface SHALL be presented as a telemetry implementation.

#### Scenario: Dispatch to sentry is a legible 501

- **WHEN** a workspace binds a telemetry instance to `sentry` and calls `export`
- **THEN** resolution refuses with a 501 carrying the compat entry's `unavailable` text
  (never a module-loader error)
