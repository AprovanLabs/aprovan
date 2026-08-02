# PRD — telemetry-contract-v2 (IW-5)

## Problem

`@utdk/telemetry` is deliberately export-only today: one `export` op over an OTLP/HTTP JSON
subset for spans and logs, metrics reserved (present ⇒ 501), no read surface, and **zero
providers implementing it**. Meanwhile the thing applications actually need already exists
natively — the workspace `telemetry` service (`emit/query/traces`, auto-instrumented `/tools`
dispatch, 3-day TTL) — but it is invisible to the contract, so an app or workflow author gets
no portable logging/metrics/tracing story: they either hand-build OTLP envelopes for a
contract nobody implements, or write to a native shape that never leaves the workspace.

## Users & Jobs

- **App/workflow authors** want `log(...)`, `counter(...)`, `withSpan(...)` ergonomics that
  work in a workflow script or widget without hand-assembling OTLP envelopes (hex trace ids,
  `timeUnixNano` strings), and want the result visible in the Activity panel by default.
- **Workspace operators** (Decision 9 plane 1) want to bind their own observability backend
  (Datadog, any OTLP collector) via profiles and have workspace telemetry egress to it —
  payloads posting to any collector unmodified.
- **Provider implementers** need the contract to cover all three OTel signals so a real
  observability vendor adapter is worth building, and need at least one adapter as the
  exemplar (as `github/vcs` is for `@utdk/vcs`).
- **Agents debugging failures** keep using `telemetry.query`/`telemetry.traces` against the
  workspace's own store — reads stay native and unchanged in shape.

## Goals

- `@utdk/telemetry` accepts all three OTel signals in the OTLP/HTTP JSON encoding subset:
  `resourceSpans`, `resourceLogs`, and `resourceMetrics` (the 501 reservation is lifted); a
  payload built for the contract still posts to any OTLP collector unmodified.
- The contract package ships an SDK helper layer (`log`/`metric`/`span` builders over the
  OTLP shapes, id/time generation, batching, `{tenant, principal, source}` attribution
  applied automatically) with zero runtime dependencies, usable in Node, the QuickJS
  workflow sandbox, and the browser widget runtime.
- The native workspace telemetry service is the contract's registered default
  implementation: it accepts `export` (OTLP payloads land in the workspace activity store,
  including a new metric event kind), and the contract's compat data lists it as the
  credentialless default — mirroring the `agent` contract's native entry.
- At least one real vendor association exists: a handwritten `datadog/telemetry` adapter
  (OTLP intake + `DD-API-KEY`) is buildable per the existing shape audit; Sentry is honestly
  declared unavailable with the reason recorded.
- `export` remains the single egress op; `query`/`traces` remain native-only (the contract
  comment's reasoning holds — reads target the workspace's own store).
- Contract re-audited and version-bumped on freeze; registry repo and aprovan repo each
  build and pass tests standalone (npm one-way rule intact).

## Non-Goals

- **No operator-plane/PostHog work and no admin portal** — Decision 9 scoped these; the
  three-plane pipeline is not relitigated. Plane 2 (registry-server built-in OTLP
  instrumentation) is untouched.
- **No query/read surface in the contract.** `telemetry.query`/`telemetry.traces` stay
  native ops on the workspace service.
- **No Activity panel redesign** — only what new signals require (metric events render in
  existing list/query surfaces; no charting, no dashboards).
- **No changes to dispatch auto-instrumentation semantics** (the server stays the single
  writer of dispatch spans; `X-Telemetry-Source` attribution unchanged).
- **No long-term retention** — the 3-day TTL evidence-not-archive posture stands.
- **No generated-provider changes** — `@utdk/datadog`/`@utdk/sentry` OpenAPI packages stay
  as they are; the adapter is a handwritten suite module, the `github/vcs` pattern.

## Capabilities

### New Capabilities

- `telemetry-contract-signals`: the three-signal `@utdk/telemetry` surface — OTLP metrics
  types + validation, the lifted 501, export result accounting for metrics, updated tool
  entries, re-audit and version freeze.
- `telemetry-sdk`: app/workflow-facing helpers in the contract package — log/metric/span
  builders over OTLP shapes, id and time generation, batching/flush, automatic attribution.
- `telemetry-provider-compat`: the contract's `compat.json` (native default, Datadog
  adapter, Sentry declared unavailable) and the handwritten `datadog/telemetry` adapter
  module.
- `native-telemetry-implementation`: aprovan-side registration — `export` on the workspace
  telemetry service, the metric event kind in the activity store, named-instance vendor
  egress (`telemetry:datadog.export`), SDK wiring into the workflow sandbox and widget
  runtime, and the minimal Activity panel accommodation.

### Modified Capabilities

None — `openspec/specs/` has no telemetry capability yet (the contract's creation was
specced inside `contracts-and-catalog`'s `utdk-contracts` capability, which this change
extends rather than modifies: that spec froze the two-signal surface at 0.2.0; this change
supersedes it with an audited three-signal surface).

## Constraints & Assumptions

- Decision 9 (three-plane telemetry) and Decision 6/7 (contracts, Profiles) are settled;
  this change slots into them unchanged.
- Contract work lands in the **registry repo**; native implementation registration lands
  **aprovan-side**; cross-repo consumption via published npm only (one-way).
- Payload encoding is the OTLP/HTTP JSON subset verbatim (D7): field names/casing exactly as
  OTLP JSON, 64-bit ints as strings, hex ids. The metrics subset must round-trip to real
  OTLP intakes unmodified, verified by extending `AUDIT.md`.
- The `telemetry` namespace is dispatched as a **core service first** (before interface
  resolution) in `server/workspace/src/routes/tools.ts`; the design must be coherent with
  that precedence.
- Assumption (unconfirmed): the SDK helper layer lives inside `@utdk/telemetry` (e.g. an
  `/sdk` export) rather than a separate package — one contract package stays the single
  thing a provider or app author installs.
- Assumption (unconfirmed): the metrics subset covers gauge, sum, and histogram data points
  only (no exponential histogram, no summary) — matching what the SDK helpers can emit.
- Assumption (unconfirmed): zero UTDK telemetry providers exist today, so no compatibility
  window is owed on the contract surface (nuke-and-reseed posture; version bump signals the
  break).

## Open Questions

- **Does the bare `telemetry` namespace ever egress to a vendor?** Recommendation: no — the
  default instance is reserved for the native store (core-service dispatch precedence and
  the credentialless-wins compat rule already both say "native"); vendor egress is always an
  explicit named instance (`telemetry:datadog.export`). The alternative — the native
  `export` forwarding to a bound vendor — hides egress behind an implicit binding and makes
  the Activity panel silently empty.
- **Do SDK-emitted signals reach the Activity panel when exporting to a vendor instance?**
  Recommendation: the SDK targets one export function; callers pick the destination
  (`telemetry.export` native, `telemetry:datadog.export` vendor). Dual-writing is the
  caller's composition, not SDK magic.
- **Where does client-side attribution stop being trusted?** Recommendation: the SDK stamps
  `aprovan.*` resource attributes for vendor egress (best-effort claims); the native
  implementation continues to server-stamp `source.app` for app sessions and treats
  client-supplied attribution as advisory, exactly as `emit` does today.
