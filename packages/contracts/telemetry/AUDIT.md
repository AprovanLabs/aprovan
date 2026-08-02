# Shape audit — @utdk/telemetry

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **OpenTelemetry Collector** (OTLP/HTTP JSON: `POST /v1/traces`, `POST /v1/logs`)
2. **Datadog OTLP intake** (Agent/Datadog OTLP ingestion endpoint)
3. **Honeycomb OTLP intake** (`api.honeycomb.io/v1/traces`, `/v1/logs`)

## Per-operation mapping

### `export` (`TelemetryExportArgs` → `TelemetryExportResult`)

| Contract element | OTLP Collector | Datadog OTLP | Honeycomb OTLP |
| --- | --- | --- | --- |
| `resourceSpans` (OTLP JSON) | `POST /v1/traces` body verbatim | OTLP ingestion verbatim | `POST /v1/traces` verbatim |
| `resourceLogs` (OTLP JSON) | `POST /v1/logs` body verbatim | OTLP logs ingestion | `POST /v1/logs` verbatim |
| `traceId`/`spanId` hex, `timeUnixNano` strings | exactly the OTLP JSON encoding | same | same |
| partial success result | `partialSuccess { rejectedSpans, errorMessage }` → `rejected` | mapped from response | mapped from response |
| `aprovan.*` resource attributes | ordinary resource attributes (pass through) | become tags | become fields/dataset routing |
| `resourceMetrics` reserved → 501 | not sent | not sent | not sent |
| auth | none / configurable headers | `DD-API-KEY` header | `x-honeycomb-team` header |
| error → `TelemetryError(status)` | HTTP status | HTTP status | HTTP status |

Findings:

- Because the contract adopts OTLP/HTTP JSON verbatim (D7), the adapter for
  all three vendors is: split the args into the `/v1/traces` and `/v1/logs`
  bodies, attach the vendor auth header, POST. The round-trip requires zero
  shape translation — the audit's sample payload (see
  `__tests__/telemetry.test.ts`) is a literal OTLP body.
- The one contract-vs-OTLP delta is combining spans and logs in ONE `export`
  call where OTLP/HTTP has two endpoints; the adapter fans out to both and
  merges the two partial-success responses into one `rejected` block. All
  three vendors accept the halves independently, so partial success
  composes.
- Vendor auth headers ride the standard `headers` client option (Datadog
  `DD-API-KEY`, Honeycomb `x-honeycomb-team`); no auth concept leaks into
  the contract surface.
- Attribution attributes under `aprovan.*` are legal resource attributes
  everywhere (Datadog renders them as tags, Honeycomb as fields) — the D9
  attribution scheme needs no vendor-specific casing.

## Changes

No change. The OTLP-verbatim subset round-trips to all three intakes
unmodified (the D7 revisit trigger did not fire).

## Verdict

**Frozen at 0.2.0.** All three audited intakes accept the contract's payload
encoding as-is.
