# playground-removal — delta spec

## ADDED Requirements

### Requirement: The playground native surface is removed

The product client SHALL NOT expose a playground surface: the `playground` entry is removed
from `NATIVE_SURFACES`, and `PlaygroundPanel.tsx` and `client/web/src/lib/playground.ts` are
deleted along with any dependencies that existed only for them. The registry catalog's
`/playground` page (ephemeral credentials) is unaffected and remains the only playground.

#### Scenario: No playground in the product

- **WHEN** the client is built after this change
- **THEN** no sidebar row, services menu entry, or native-surface registry entry offers a
  playground, and `git grep -i "PlaygroundPanel\|lib/playground"` over `client/web/src`
  returns nothing

#### Scenario: Catalog playground untouched

- **WHEN** the registry repo is inspected after this change
- **THEN** `registry/apps/registry/src/pages/playground.astro` and its supporting libraries
  are unmodified by this change

### Requirement: Stale playground tabs degrade gracefully

A persisted tab whose key is `native://playground` (or any `native://` id no longer in the
registry) SHALL render a notice instead of a blank or broken pane. For the playground id
specifically, the notice SHALL link to the registry catalog playground and offer a close-tab
action.

#### Scenario: Old tab shows the pointer

- **WHEN** a user whose persisted tab state includes `native://playground` loads the app
  after the removal
- **THEN** that tab renders a single notice card explaining the playground now lives in the
  registry catalog, with a working link to it and a control that closes the tab

#### Scenario: Unknown native ids never crash

- **WHEN** any unresolvable `native://<id>` tab key is encountered
- **THEN** the tab renders the same graceful notice pattern (without the playground link)
  rather than throwing or rendering an empty pane
