## Problem

`@aprovan/runtime` is the vendor-neutral mechanism for calling UTDK services through a proxy — namespace proxies, gateway transport, policy, pagination — but it wears the vendor's scope and ships from the vendor-neutral repository, which is the naming inverted. It also bundles a DOM-dependent iframe sandbox host alongside code that widget and script authors are meant to import, and that host duplicates the wire protocol the compiler's own iframe mount already speaks. Meanwhile the compiler carries its own copy of the same proxy logic, so the codebase has four namespace-proxy implementations and two implementations of one postMessage protocol.

## Users & Jobs

- **Widget and workflow authors** — need one package that means "call a service you do not hold the credential for," importable without dragging in a sandbox host.
- **The registry playground and any future non-Aprovan host** — need that package to have no Aprovan dependency.
- **Platform maintainers** — need one proxy implementation and one iframe host to fix bugs in.

## Goals

- `@utdk/remote` exists, is published, and has zero `@aprovan/*` dependencies.
- Exactly one namespace-proxy implementation is reachable from the compiler and the playground (today: four across both repos).
- Exactly one implementation of the `service-call` / `service-result` postMessage protocol exists (today: two).
- `@aprovan/runtime` is retired and removed from the publish list.
- Nothing importable by sandboxed widget code depends on the DOM or can create a sandbox.

## Non-Goals

- Does **not** change call syntax, the `tools` root, or plugin semantics — those are established in `tools-global`.
- Does **not** move provider or interface *types* into the package; type delivery is decided in `editor-consolidation` and `utdk-output-schemas`.
- Does **not** create `@aprovan/sdk` or `@aprovan/native` — those are created by the changes that need them.

## Capabilities

### New Capabilities

- `remote-client-package`: what `@utdk/remote` contains, what it must not contain, its dependency direction, and the retirement of `@aprovan/runtime`.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Hard**: `@utdk/remote` must not depend on any `@aprovan/*` package. UTDK stays standalone; the dependency arrow points from Aprovan to UTDK, never back.
- **Hard**: `sandbox.ts` requires `document` and creates iframes. It cannot ship in a package widget code imports.
- **Hard**: the registry repository is a separate working tree (`/Users/jacob/Documents/Code/AprovanLabs/registry`) with its own lockfile and publish workflow. Tasks touching it are cross-repo and cannot be verified by this repo's test run alone.
- **Assumption (verified)**: retiring `@aprovan/runtime` is near-free — `client/web/package.json` declares it and no file in `client/web/src` imports it; the two `registry-ui` files that mention it deliberately use structural stand-ins rather than importing its types.
- **Assumption (unconfirmed)**: `@aprovan/runtime@0.1.0` has no external consumers beyond these two repositories.

## Open Questions

> Settled 2026-08-03 — accept recommendations.

- **Should `@utdk/remote` re-export the pagination helpers (`allPages`, `paginate`), or should they reach callers through a namespace?** Re-export as plain functions.
- **Does the registry playground migrate to `@utdk/remote` in this change or a follow-up?** In this change.
