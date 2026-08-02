# webhook-generation-metadata

Webhooks are per-provider UTDK generation metadata — setup and configuration intel produced
by the bundler — not an interface, not a contract.

## ADDED Requirements

### Requirement: webhooks.json is generation metadata with a stable schema

The bundler webhook-intel phase (`packages/bundler/src/phases/webhookIntel.ts`) SHALL
remain the producer of per-provider `webhooks.json`, and its output SHALL be documented as
UTDK generation metadata: `{ supported, summary, events, subscriptionOperations,
registrationModel, setupSteps, docsUrl?, sourceHash, generatedAt, model }` (the existing
shape, formalized). The exported TypeScript types for this shape SHALL be importable by
consumers (catalog site, product plane) without importing the LLM-phase machinery — via a
types-only module or an export from `@utdk/common`.

#### Scenario: Metadata shape is published

- **WHEN** the catalog site (or any consumer) needs to type a `webhooks.json` document
- **THEN** it imports the published webhook-metadata types rather than declaring its own
  mirror

#### Scenario: Regeneration is cache-stable

- **WHEN** the webhook-intel phase re-runs for a provider whose spec's webhook surface is
  unchanged
- **THEN** it is a no-op (existing `sourceHash` behavior preserved)

### Requirement: Webhooks never appear as an interface

No interface catalog surface — `compat.json` data, `listInterfaces()`, the catalog site's
interface pages, or contract package markers — SHALL contain a `webhooks` entry. Registry
repo docs (`docs/interfaces.md` and related) SHALL classify webhook intel as generation
metadata; workspace-side webhook *delivery* remains a product-plane service outside this
repo's contract catalog.

#### Scenario: No webhooks interface anywhere

- **WHEN** the contract packages, compat data, and catalog interface pages are enumerated
- **THEN** no contract or interface named `webhooks` exists

#### Scenario: Docs frame webhooks as metadata

- **WHEN** registry docs describing provider intel are read
- **THEN** webhook intel is described alongside auth intel as bundler-generated metadata,
  with no interface/contract framing
