# registry-telemetry

Built-in attributed OTLP instrumentation — plane 2 of the three-plane telemetry model
(decision 9, final). See tech-plan D9.

## ADDED Requirements

### Requirement: Universal attribution

Every telemetry emission produced by the registry server — spans, logs, metrics — SHALL
carry `{tenant, principal, source}` attributes (`aprovan.tenant`, `aprovan.principal`,
`aprovan.source.type`), taken from the emitting operation's `CallContext`. Emission
helpers SHALL require a context so unattributed emission is unrepresentable in package
code; process-lifecycle emissions use the `system` source with the operator principal.

#### Scenario: Dispatch span is fully attributed

- **WHEN** any dispatch completes on any surface (HTTP, embedding, MCP, sandbox)
- **THEN** its span carries tenant, principal, source type, request id, namespace,
  operation, resolved profile (when any), and status

#### Scenario: A tenant's slice is separable

- **WHEN** two tenants dispatch concurrently and the export stream is filtered by
  `aprovan.tenant`
- **THEN** each tenant's spans partition cleanly with no unattributed remainder from the
  dispatch pipeline

### Requirement: OTLP export to a configurable endpoint

The server SHALL export telemetry over OTLP to a configurable endpoint. With no endpoint
configured, telemetry SHALL be a true no-op (no exporter buffering, no network attempts,
negligible overhead). The standalone default is vendor-neutral: any OTLP-compatible
backend works with endpoint configuration alone.

#### Scenario: Endpoint off means no telemetry I/O

- **WHEN** the server runs without a telemetry endpoint and handles dispatches
- **THEN** no telemetry network connections are attempted and dispatch latency is
  unaffected

#### Scenario: Vendor-neutral export

- **WHEN** `telemetry.otlpEndpoint` points at a generic OTLP collector
- **THEN** attributed spans arrive at the collector with no vendor-specific exporter code
  involved

### Requirement: Three-plane separation honored

The server's built-in instrumentation (plane 2) SHALL be independent of the user-facing
`telemetry` contract (plane 1, a WS-2 contract dispatched like any interface through
profiles) and SHALL NOT export to any operator analytics backend itself (plane 3 is
host-side, consuming plane 2's attributed stream). Dispatches of the `telemetry`
namespace itself SHALL NOT be recorded as dispatch spans (observing the observer is
noise).

#### Scenario: telemetry-namespace calls are not self-recorded

- **WHEN** a caller queries the telemetry namespace
- **THEN** no dispatch span for that call appears in the export stream

#### Scenario: User backend binding does not alter plane 2

- **WHEN** a tenant binds its own telemetry-contract profile to a third-party backend
- **THEN** the server's built-in OTLP export continues unchanged and the tenant's
  telemetry-contract calls dispatch through the normal pipeline
