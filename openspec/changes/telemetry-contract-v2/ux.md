# UX — telemetry-contract-v2

Developer-facing change; the only user-facing surfaces are two existing panels touched
minimally. No new screens.

## Flows

### Flow: Bind a vendor telemetry backend (workspace operator)

1. Operator opens the **Interfaces** panel; the `telemetry` interface now appears in the
   catalog with "Workspace activity store" shown as the built-in default (credentialless,
   the `agent` presentation precedent).
2. Operator creates a named instance (`telemetry:datadog`), picks **Datadog (OTLP
   intake)**, and selects/creates a Datadog credential — the existing instance-binding
   flow, no new UI.
3. Discovery/tools listings now show `telemetry:datadog.export`; workflows can egress
   explicitly.
4. Failure path: choosing **Sentry** shows the compat entry's unavailable reason inline
   (existing `unavailable` rendering); binding is allowed but calls return the 501 text.
5. Failure path: calling an unbound named instance returns the existing "bind it with
   interfaces.bind" 404 message.

### Flow: See app/workflow telemetry in Activity (all users)

1. A workflow or widget logs/counts/traces via the SDK facade; events land in the
   workspace store through `telemetry.export`.
2. User opens the **Activity** panel: metric events appear interleaved with spans and
   logs, newest first; existing source/status filters apply.
3. Empty state, loading state, and trace drill-down are unchanged.

## Screens & States

### Activity panel (`telemetry` surface — modified)

- Purpose: unchanged (workspace traces/evidence).
- New element: a metric row — name, value + unit, source chip; visually parallel to log
  rows. No charts.
- States: loading/empty/error unchanged. Partial: a trace whose group contains metric
  events must not miscount errors (metrics carry no error status). Filters that don't
  apply to metrics (`level`, `status`) simply never match them — no new filter UI.

### Interfaces panel (modified in data only)

- Purpose: unchanged. The telemetry interface arrives via `compat.json`; the panel's
  existing catalog/instance/binding rendering handles it with zero component changes.
- States: `native` entry renders as built-in default (never as a connectable vendor);
  `sentry` renders its unavailable reason; loading/error unchanged.

## Component Inventory

- Activity panel: existing `TelemetryPanel` list rows; the metric row reuses the log-row
  composition (existing Badge/mono text primitives). No new shadcn/ui components.
- Interfaces panel: existing `InterfacesPanel` — no changes.

## Open Questions

- Should metric rows be filterable by a new `kind` filter in the Activity panel?
  Recommendation: no for this change (non-goal: only what new signals require); revisit
  with IW-4 native-panel-polish.
