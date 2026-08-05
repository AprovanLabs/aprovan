## Problem

GraphQL providers reach the registry as a single passthrough operation — Linear ships
`linear.executeGraphQl({ query, variables, operationName })`, modelled as one
`POST /graphql` path in a hand-written OpenAPI spec. That works for execution and gives
an agent nothing to work from. The generated doc is 774 bytes describing the *envelope*;
it says nothing about Linear's schema, so an agent still cannot write
`issues { nodes { id title } }`.

Two things block the obvious fixes. The catalog's tool search indexes *operations*, and
a passthrough provider has exactly one — there is nothing to discriminate on. And a
GraphQL SDL is megabytes and well over a thousand types for the providers that matter,
so it cannot be carried in a tool description or a doc file.

Separately, providers that version their API by date (Shopify: `2024-10`, quarterly,
~12-month support window) put the version in the URL path. A profile can already pin one
via `baseUrl`, and the registry will happily hand back a schema for a different version —
the agent then writes a query against fields that do not exist and gets a bare GraphQL
error with no indication the schema was wrong.

## Users & Jobs

- **Agents writing GraphQL** — need to find the three types relevant to a task without
  loading the other thousand.
- **Agents encountering a provider for the first time** — need its conventions
  (pagination style, ID scheme, auth scopes) before its type list.
- **Tenants pinned to an older API version** — need the schema they are actually talking
  to, or a loud failure.

## Goals

- Execution stays passthrough. No curated operation documents.
- A provider's schema is a shipped artifact, versioned alongside its spec.
- An agent can retrieve one type's fields without retrieving the schema.
- A provider-level overview conveys conventions, not per-operation detail.
- A pinned API version selects its own schema, or resolution fails loudly.

## Non-Goals

- Does **not** generate an operation per GraphQL root field. Selection sets have no
  OpenAPI analogue and auto-generated ones produce response shapes nobody wants.
- Does **not** introduce transport-specific namespace segments; GraphQL is an operation
  on the base provider (`tools.linear.executeGraphQl`).
- Does **not** add runtime introspection. Deferred until a tenant-varying schema forces
  it.

## Capabilities

### New Capabilities

- `graphql-schema-artifact`: SDL shipped per provider per API version.
- `graphql-type-index`: a searchable index keyed by type and field, distinct from the
  tool catalog.
- `provider-api-version`: a first-class version on provider entries and profiles.

### Modified Capabilities

- `provider-docs`: the GraphQL overview page is generated from SDL rather than from
  OpenAPI metadata.

## Open Questions

- Do any current providers have tenant-varying schemas (Hasura-style, custom apps)?
  Assumed **no** for the initial set. If one appears, the override seam in
  `provider-api-version` is where runtime introspection would attach.
