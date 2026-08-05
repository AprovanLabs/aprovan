## Problem

The `tools.` global can only address providers whose name is a single JavaScript
identifier. `scanToolsAccess` reads exactly one identifier after `tools.` and stops;
`namespacesToDependencies` then sets `provider: namespace, path: ""`. Provider names,
however, are slash-separated by design — `google/drive`, `adyen/checkoutservice` — and
**1,996 of the registry's providers carry a slash today.** None of them are reachable
from the `tools.` surface that the chat app and sandbox use. `tools.adyen` names a
provider that does not exist; `tools["adyen/checkoutservice"]` sets `unresolved` and is
not addressable at all.

A second copy of the scanner lives in the editor package. It is byte-identical to the
canonical one except for comments, with nothing enforcing that it stays that way.

## Users & Jobs

- **Script and widget authors** — need to reach any connected provider from `tools.`,
  not just the ~50 whose names happen to lack a slash.
- **The generating model** — needs one addressing rule it can apply without knowing
  whether a provider name is a suite member.
- **Editor type acquisition** — needs to know which namespaces a script touches so it
  can lazily load `.d.ts` for those and only those.

## Goals

- Every provider in the registry is addressable from `tools.`, gated only by whether a
  credential is configured.
- One canonical provider name (`google/drive`) with a derived global alias
  (`googleDrive`) — a rendering, not a second identity.
- Exactly one implementation of the tools-access scanner across both repos.
- The scanner's output is understood as a type-loading hint, not a security boundary.

## Non-Goals

- Does **not** change how grants or credentials are enforced — that is
  `grant-enforcement`, which establishes the scan is not a security boundary.
- Does **not** introduce transport-specific addressing (`gql`, `mcp` segments). GraphQL
  is reached through a normal operation on the base provider; see
  `graphql-schema-surface`.
- Does **not** change the `tools` root or plugin semantics established in `tools-global`.

## Capabilities

### New Capabilities

- `provider-global-alias`: the derived camelCase alias, its uniqueness rule, and its
  publication in the namespace catalog.

### Modified Capabilities

- `tools-global`: the `tools.` surface reaches the full registry rather than the
  single-segment subset.
- `dependency-scan`: single implementation; documented as a hint.

## Open Questions

- Should the alias be published alongside the canonical name in `GET /tools/namespaces`,
  or replace it in that response? Assumed **alongside**, with the canonical name as the
  stable key.
