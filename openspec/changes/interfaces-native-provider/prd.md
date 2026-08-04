## Problem

Four namespaces — `keyvalue`, `events`, `vfs`, `telemetry` — are simultaneously first-party services and registry interface ids. Dispatch checks the service first, so the interface binding is unreachable except through a colon-addressed namespace that returns a *different shape* — and that escape hatch is being deleted. Splitting version control out of `vfs` adds a fifth case. Meanwhile the platform's own namespaces (`apps`, `workflows`, `sessions`, …) are modelled as the same kind of thing as `github`, despite having no contract any vendor could implement, and all 117 platform operations return `unknown` because none declares an output schema.

The pattern that resolves this already exists and is documented for two namespaces: `sandbox` is the swappable driver interface, `sandboxes` is the workspace service built on top; the same holds for `agent` and `agents`. This change generalises it.

## Users & Jobs

- **Widget and script authors** — need `tools.vfs` to mean one thing with one shape, whether it is served by the workspace store or by S3.
- **Workspace administrators** — need to point a first-party capability at a third-party implementation, which is currently impossible for the four shadowed namespaces.
- **The generating model** — needs a typed return value; today every platform call resolves to `unknown`.
- **Platform maintainers** — need one routing model instead of a precedence rule that makes half the configuration surface unreachable.

## Goals

- No namespace is both a service name and an interface id. Each name means exactly one thing.
- Each of `vfs`, `vcs`, `keyvalue`, `events`, `telemetry` is a clean registry interface whose default binding is an Aprovan-supplied provider.
- Aprovan-only namespaces are plugin-provided, not core services; `CORE_SERVICE_NAMES` and the service-before-interface precedence no longer exist.
- `tools.vfs` exposes only driver operations; version control is `tools.vcs`; mounts are path-keyed profiles.
- A first-party namespace and its contract return the same shape — today they disagree on field names, field types, and the presence of fields that make results unambiguous.
- Every platform operation with a statically determinable result declares an output schema; those that cannot are explicitly marked rather than silently returning `unknown`.

## Non-Goals

- Does **not** change the `tools` root, the plugin mechanism, or the dependency scan — established by `tools-global`.
- Does **not** change profile or mount addressing — established by `profiles-unified`.
- Does **not** touch provider-side output schema extraction — that is `utdk-output-schemas`.
- Does **not** preserve compatibility for callers of the changed shapes.
- Does **not** attempt output schemas for driver-passthrough operations whose result belongs to a bound third-party implementation.

## Capabilities

### New Capabilities

- `native-interface-provider`: the Aprovan provider implementing five contracts, its registration as a credentialless default binding, and the dissolution of the service-versus-interface precedence.
- `platform-namespace-plugins`: Aprovan-only namespaces as plugin-provided namespaces rather than core services, and their typed surfaces.
- `vfs-vcs-split`: the driver/product-semantics boundary for files, version control, and mounts.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Hard**: a UTDK module runs inside the isolate and cannot call back into the gateway, so a first-party in-process implementation cannot be an ordinary compat entry. The existing pattern — a credentialless entry the service short-circuits in-process — is the only available shape.
- **Hard**: the file contract is a *driver* contract by design; sessions, overlays, mounts, and version history are explicitly excluded from it. Anything the workspace adds on top belongs to a different namespace.
- **Hard**: platform handlers are typed as returning `unknown` at the dispatch boundary, so output schemas cannot be derived automatically without restructuring every service. They must be hand-written.
- **Assumption (confirmed)**: no backwards compatibility is required for the changed shapes.
- **Assumption (unconfirmed)**: the four contract implementations that already exist for these interfaces — for object storage, a key-value store, a queue, and an observability vendor — are still wanted as user-selectable alternatives. If not, those interfaces could collapse to plugins instead.
- **Assumption (unconfirmed)**: no consumer depends on the current ambiguity in the key-value read result, where a missing key and a stored empty value are indistinguishable.

## Open Questions

- **Do the driver-passthrough operations declare their contract's shape advisorily, or stay unmarked?** Recommendation: declare it and mark it advisory. A documented expectation that a third-party driver may violate is more useful than nothing, provided the claim is labelled rather than implied.
- **Does the operation whose result shape depends on which argument was supplied get split into separate operations?** Recommendation: yes. A four-way alternative is nearly useless to a model and to a type generator, and the schema work is what surfaces that the operation was overloaded.
