## Problem

Every callable operation's return value is `unknown` to every consumer, even though 83.3% of provider return types (9,581 of 11,495) already exist as generated TypeScript. The types reach exactly one consumer — the generated Markdown docs — because `ToolEntry.outputSchema` is hardcoded `undefined` at all three write sites and the public catalog carries no response data at all. Worse, 286 operations declare an *error* body as their return type: the response selector sorts 2xx first, finds a `204` with no content, falls through, and returns the 4xx schema — a value the runtime never produces, because the client throws on any non-OK response.

## Users & Jobs

- **MCP clients** — need `outputSchema` on tool definitions so a model knows a call's result shape before making it. The data is already on the object the loader reads and is discarded.
- **The generating model writing widget code** — currently learns result shapes by calling an operation and reading truncated JSON.
- **Catalog browsers** — see parameters and request bodies, and nothing about what comes back.
- **The type generator** — needs a machine-readable output schema to emit real return types instead of `Promise<unknown>`.

## Goals

- `outputSchema` is expressible: every tool-entry producer has the slot (today the return literal has no such field, so even contracts that know their result shape cannot express it).
- Zero operations declare an error response as their return type (today 286).
- Operations with no response content declare that explicitly rather than borrowing an unrelated schema.
- Provider output schemas are readable as data, not only as TypeScript text.
- MCP tool definitions carry `outputSchema` for every provider operation that has one.
- The success/error/envelope contract is written down once and referenced, rather than re-derived per consumer.

## Non-Goals

- Does **not** write output schemas for the 117 platform operations — those belong to `interfaces-native-provider`, which is restructuring the same handlers.
- Does **not** resolve the core-service vs contract shape divergences — same reason.
- Does **not** model error shapes. Errors are thrown, not returned, at three separate layers; `outputSchema` is a success-path contract.
- Does **not** invent schemas for the ~1,279 operations whose upstream OpenAPI genuinely omits a response.
- Does **not** change any runtime behavior of a provider call.

## Capabilities

### New Capabilities

- `tool-entry-output-slot`: the structural ability to express an output schema on a tool entry, end to end from contract helpers through discovery.
- `provider-output-schemas`: correct extraction of provider response schemas from OpenAPI, their machine-readable publication, and their delivery to MCP and the catalog.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Hard**: this change is scoped to the registry repository (`/Users/jacob/Documents/Code/AprovanLabs/registry`), plus nothing in this one. That is what makes it schedulable in parallel with every other change in this wave.
- **Hard**: a caller-facing output schema describes the value *inside* the gateway's `{ data, meta }` envelope, never the envelope itself.
- **Hard**: streaming operations bypass the envelope entirely and return a `ReadableStream` whose shape depends on the runtime value, not the operation. No static schema is correct for them; they need a marker, not a schema.
- **Assumption (verified)**: the generated `types/` trees are pure `import type` and transpile to 0-byte JavaScript, so nothing here adds runtime weight.
- **Assumption (unconfirmed)**: digitalocean's upstream OpenAPI source is available to re-bundle. Its 635 operations have no `responses` object at all because external `$ref`s to `resources/**/*.yml` were never resolved; fixing it alone moves global coverage from 83.3% to 88.8%.

## Open Questions

- **Emit a `tools` export into generated provider packages, or serve output schemas from the catalog endpoint?** Recommendation: the catalog endpoint. The per-operation `outputs` map is already built in `lib/registry.ts` and thrown away; serving it is a four-file change against a large-diff regeneration of 38 packages, and it covers the same ground.
- **Should `unknown` returns be distinguishable from "not yet extracted"?** Recommendation: yes — mark operations whose upstream spec omits a response, so coverage is measurable and a future overlay can target them.
