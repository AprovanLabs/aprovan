# UX — contracts-and-catalog

The user-facing surface of this change is the catalog site (`registry/apps/registry`,
Astro, statically built off the packages on disk). It gains a first-class interface
representation: browse interfaces, see which providers implement each one, and see on a
provider page what it implements. Everything else in this change (package promotion, naming
authority, CI publish) is backend/build-time with no UX surface.

Because the site is statically generated, there are no client-side loading or network-error
states on these pages; the failure modes are build-time (missing/invalid `compat.json`
fails the build loudly) and content states (empty compat lists, unavailable entries).

## Flows

### Flow: Browse interfaces and pick a provider

Serves PRD goal: catalog visitors can browse interfaces and see implementers.

1. Visitor lands on the catalog (`/catalog` or `/providers`) and sees a new **Interfaces**
   section/nav entry alongside the provider listing.
2. Visitor opens the interfaces index: one card per contract (`llm`, `sql`, `sandbox`,
   `vcs`, `agent`, `keyvalue`, `events`, `vfs`, `telemetry`) with label, one-line
   description, npm package name, and an implementer count badge.
3. Visitor clicks `sql` and reaches the interface detail page: contract description,
   operation surface (from the contract package), and the compat table of implementing
   providers.
4. Each available implementer row links to its provider page. Visitor clicks `postgres` and
   continues the existing provider-page flow (auth setup, operations).
5. Failure path: visitor clicks an implementer marked **Not yet built** — the row is not a
   dead link; it expands/shows the `unavailable` reason text (e.g. "The Bitbucket adapter
   module is not built yet…") so the visitor knows the mapping is committed but absent.
6. Failure path: an interface with zero implementers (new contracts) shows an explicit
   empty state ("No registry providers implement this contract yet") rather than an empty
   table.

### Flow: Understand what a provider implements

1. Visitor opens a provider page (e.g. `/catalog/p/github`) from search or the index.
2. Below the provider header, an **Implements** section lists each contract the provider
   has a compat entry for: contract name (`@utdk/vcs`), the adapter module that speaks it
   (`github/vcs`), and optional capability badges (e.g. sandbox capability flags, or
   `credentialless`).
3. Each entry links back to the interface detail page.
4. Providers with no compat entries render no Implements section at all (most of the ~49
   generated providers) — absence, not an empty box.
5. Failure path: a compat entry marked `unavailable` renders with a "not yet built" badge
   and its reason, identical vocabulary to the interface detail page.

### Flow: Read webhook setup metadata on a provider page

Serves the "webhooks are generation metadata, not an interface" requirement.

1. Visitor opens a provider page for a provider whose bundle includes `webhooks.json`.
2. A **Webhooks** metadata section renders: supported yes/no, plain-language summary, event
   list, subscription-management operations, and setup steps — presented in the same visual
   family as the existing auth-setup intel (also generation metadata), and *not* in the
   Implements section.
3. Providers without `webhooks.json`, or with `supported: false`, either omit the section
   or show a one-line "No outbound webhook support" — never an error.
4. Nothing anywhere on the site lists "webhooks" among interfaces.

## Screens & States

### Interfaces index (new page, e.g. `/interfaces`)

- **Purpose**: entry point for contract browsing; the public face of "the registry is a set
  of contracts, not just a pile of providers".
- **Key elements**: card grid; per card: contract label, npm name, one-line description,
  implementer count, "N available / M planned" split when unavailable entries exist.
- **States**: contracts with zero implementers still render (count 0, muted styling) — the
  contract package existing is the listing criterion, `utdk.contract` marker is the source
  of truth. Build fails loudly if the contracts directory is missing (same posture as the
  existing "Could not locate workspace root containing packages/utdk" guard).

### Interface detail (new page, e.g. `/interfaces/sql`)

- **Purpose**: everything an evaluator or implementer needs about one contract.
- **Key elements**: header (label, npm package name, version, description); operations
  table (operation name, description, key args — sourced from the contract's tool-entry
  metadata); compat table (provider logo/name, adapter module, capability/`credentialless`
  badges, availability); link to the contract package README/npm.
- **States**: empty compat list → explicit empty state with a sentence inviting adapter
  contributions; `unavailable` rows → muted with reason text; contract with no
  operations metadata (should not happen — every contract exports tool entries) → build
  warning, section omitted.

### Provider page — Implements section (modified page)

- **Purpose**: answer "does this provider speak a shared contract?" without the visitor
  knowing contracts exist beforehand.
- **Key elements**: one row per compat entry naming the contract, adapter module subpath,
  capability badges; placed near the existing metadata sections (auth intel).
- **States**: no compat entries → section absent; unavailable → badge + reason; a compat
  entry referencing a provider the catalog doesn't know (data error) → build-time
  validation failure, not a silent skip.

### Provider page — Webhooks metadata section (modified page)

- **Purpose**: render `webhooks.json` intel as setup documentation.
- **Key elements**: supported badge, summary paragraph, events list (collapsed beyond ~10),
  subscription operations, ordered setup steps, docs link when present.
- **States**: file absent or `supported: false` → section omitted or single muted line;
  malformed JSON → build warning + section omitted (a bad intel file must not take the
  provider page down).

## Component Inventory

`apps/registry` already carries a shadcn-style component setup (`components.json`) and
provider-card/table patterns on the existing catalog pages. Reuse, do not invent:

- Interfaces index: existing catalog card grid component (as used by the provider index).
- Compat/operations tables: existing table primitives from the provider operations view.
- Badges (`available`, `not yet built`, `credentialless`, capability flags): existing
  badge primitive with the site's status color tokens.
- Webhooks section: same collapsible section/accordion pattern as the auth-setup intel
  rendering on provider pages.
- Empty states: existing muted-text empty-state pattern from the catalog search results.

## Open Questions

- **Nav placement**: top-level "Interfaces" nav item vs. a tab within the existing catalog
  page. Recommendation: top-level nav item — interfaces are a peer of providers, and the
  index doubles as marketing surface for the contract story.
- **Operations detail depth**: render full JSON input schemas on interface pages or just
  operation names + descriptions? Recommendation: names + descriptions + required args
  only; deep-link to the npm package for full types. Full schemas belong to provider pages.
