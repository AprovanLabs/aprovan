## D1 — Passthrough only; no curated operation documents

`executeGraphQl` stays the execution surface. Curation is not attempted.

**Rejected — curated `.graphql` documents** exposed as typed operations. Hand-authored
per provider, forever; produces a surface of ~20 operations against an OpenAPI
provider's hundreds, and requires codegen, document versioning, and fragment composition
before anyone knows which twenty operations get called.

**Rejected — schema-derived operations**, one per root field. GraphQL's premise is
caller-specified selection; auto-generating selection sets yields REST with worse
ergonomics and unpredictable response shapes.

**Revisit if** telemetry shows a small set of queries dominating a provider's traffic —
that is the evidence that would justify curating exactly those.

## D2 — Schemas are shipped artifacts, not runtime introspection

`schema.graphql` sits beside `openapi.json` in the provider package, through the same
ingest, provenance, and release cadence.

**Rejected — runtime introspection, per-tenant cached.** Credential-gated round trip on
first use, and many providers disable introspection in production.

**Rejected — no stored schema; the agent introspects ad hoc.** Introspection responses
are larger than the SDL. A context-budget disaster disguised as zero infrastructure.

**Revisit if** a tenant-varying schema provider is onboarded — the `provider-api-version`
seam (D4) is where introspection would attach.

## D3 — A second index, keyed by type and field

The tool catalog indexes operations. A passthrough provider has one, so filtering it
accomplishes nothing. GraphQL discovery needs its own index whose unit is the type/field,
queried by a lookup tool rather than dumped into context.

**Rejected — extend tool-description search.** Nothing to discriminate on: one operation,
one description.

**Rejected — expose the SDL as an MCP resource.** Moves the megabytes rather than
avoiding them.

**Revisit if** the type index and the tool catalog develop enough shared query surface to
justify unification.

## D4 — API version is first-class; schema selection derives from it

`version` lives on the provider entry (with `defaultVersion`) and on the profile.
`baseUrl` is *derived* from the version rather than set alongside it, so the endpoint and
the schema cannot drift. Schemas are stored per version: `schemas/2024-10.graphql`.

**Rejected — provider-per-version** (`shopify/2024-10` as its own provider name). Legal
under the naming rules, but multiplies the catalog and forces a grant per version;
nobody grants "Shopify 2024-10".

**Rejected — `baseUrl` override alone** (status quo). Dispatch reaches the right
endpoint and the schema silently does not match.

**Rejected — latest only.** Breaks any tenant that cannot move on the registry's cadence.

**Revisit if** a provider's supported-version window grows large enough that
N-schemas-per-package needs a pruning story.

## Interfaces & Data

```ts
// Provider package layout
packages/utdk/<provider>/
  openapi.json
  schema.graphql              // unversioned providers
  schemas/2024-10.graphql     // versioned providers
  schemas/2025-01.graphql

// data/registry.json entry
{
  "name": "shopify",
  "apiVersions": ["2024-10", "2025-01"],   // NEW, optional
  "defaultVersion": "2025-01",             // NEW, required iff apiVersions present
  "versionedBaseUrl": "https://{shop}.myshopify.com/admin/api/{version}/graphql.json"
}

// Profile
interface ProfileRow {
  version?: string;   // NEW — must appear in the provider's apiVersions
}

// Type index lookup, registered through McpExtensions
schema_lookup({ provider: string, type?: string, field?: string, version?: string })
  → { name, kind, fields: Array<{ name, type, args, deprecated, description }> }
```

Resolution fails loudly when a profile pins a version whose schema is absent from the
package — same spirit as the existing "pinned credential resolves loudly, never falls
back".
