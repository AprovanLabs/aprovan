# catalog-interface-representation

First-class interface representation on the catalog site (`registry/apps/registry`).

## ADDED Requirements

### Requirement: Interfaces index page

The catalog site SHALL provide an interfaces index page listing every contract package
found on disk (enumerated by the `utdk.contract` manifest marker under
`packages/contracts/`), each with its label, npm package name, one-line description, and an
implementer count derived from its compat data. Contracts with zero implementers SHALL
still be listed. The page SHALL be reachable from the site's primary navigation.

#### Scenario: All contracts listed

- **WHEN** the site builds and the interfaces index renders
- **THEN** all nine contracts appear, each showing its implementer count (0 for the new
  contracts), with counts splitting available vs. not-yet-built entries

#### Scenario: Missing contracts directory fails the build

- **WHEN** the site builds in a tree where `packages/contracts/` cannot be located
- **THEN** the build fails with an error naming the expected path (matching the existing
  off-disk-read posture)

### Requirement: Interface detail pages

Each contract SHALL have a detail page showing: the contract's description and npm package
identity; its operation surface (operation names, descriptions, and required arguments,
sourced from the contract package's tool-entry metadata); and its compat table — each
implementing provider with adapter module, capability/`credentialless` badges, and
availability. Available implementers link to their provider pages; entries marked
`unavailable` render the reason text and MUST NOT link as if executable. An empty compat
list SHALL render an explicit empty state.

#### Scenario: Compat table renders availability truthfully

- **WHEN** the `vcs` interface page renders from current data
- **THEN** GitHub appears as an available implementer linking to the github provider page,
  and Bitbucket appears as not-yet-built showing its `unavailable` reason

#### Scenario: Empty compat state

- **WHEN** the `vfs` interface page renders with no compat entries
- **THEN** an explicit "no registry providers implement this contract yet" state renders
  instead of an empty table

### Requirement: Provider pages show what they implement

A provider page SHALL render an "Implements" section when any contract's compat data
references that provider: one entry per contract naming the contract, the adapter module
(e.g. `github/vcs`), optional capability badges, and availability, linking to the interface
detail page. Providers referenced by no compat entry SHALL render no Implements section.

#### Scenario: Implementing provider shows the section

- **WHEN** the github provider page renders
- **THEN** an Implements section shows `@utdk/vcs` via the `github/vcs` adapter, linking to
  the vcs interface page

#### Scenario: Non-implementing provider omits the section

- **WHEN** a provider page renders for a provider absent from all compat data
- **THEN** no Implements section (and no empty placeholder) appears

### Requirement: Provider pages render webhook metadata as setup intel

Provider pages SHALL render `webhooks.json` (when present and `supported`) as a metadata
section — summary, events, subscription operations, setup steps — in the same visual family
as the existing auth-setup intel, and never within the Implements/interfaces
representation. Absent or unsupported webhook intel SHALL degrade to an omitted section or
a single muted line; a malformed `webhooks.json` SHALL warn at build time and omit the
section without failing the provider page.

#### Scenario: Webhook intel renders as metadata

- **WHEN** a provider with a `supported: true` `webhooks.json` renders
- **THEN** its webhook events and setup steps appear in a metadata section, and "webhooks"
  appears nowhere in the Implements section

#### Scenario: Malformed intel degrades gracefully

- **WHEN** a provider's `webhooks.json` fails to parse during the site build
- **THEN** the build emits a warning naming the provider and the page renders without the
  webhook section
