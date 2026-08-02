# interface-compat-catalog

The interface compat catalog — which providers implement which contract, with what
defaults and availability — as keep-set data instead of code inside `apps/workspace`.

## ADDED Requirements

### Requirement: Compat data lives with the contract

Each contract package that has committed implementations SHALL carry a `compat.json` at its
package root (`packages/contracts/<name>/compat.json`) describing the interface metadata and
compat entries currently hardcoded in `apps/workspace/src/interfaces.ts` `listInterfaces()`:
interface id, label, description, `timeoutMs`, `defaultsFor`, and per-entry
`{ provider, label, module, moduleSpecifier?, baseUrl?, defaults?, credentialless?, unavailable? }`.
A contract with no committed implementations (the new `keyvalue`, `events`, `vfs`,
`telemetry`) SHALL omit `compat.json` or ship an empty `compat` array — a compat entry is a
contract commitment and MUST NOT be declared speculatively. The `llm` compat list, which is
generated from the chat-provider registry rather than hand-listed, MAY declare a
`compatSource` indirection instead of inline entries.

#### Scenario: Existing catalog is externalized faithfully

- **WHEN** the `compat.json` files for `sql`, `sandbox`, `vcs`, and `agent` are compared
  against the current `listInterfaces()` definitions
- **THEN** every compat entry, default, timeout, `defaultsFor` list, `credentialless` flag,
  and `unavailable` reason is preserved verbatim

#### Scenario: No speculative entries

- **WHEN** the new contracts' packages are inspected
- **THEN** none declares a vendor compat entry that has no scheduled implementation

### Requirement: A published loader validates and serves compat data

`@utdk/common` (or a contract-owned equivalent in the keep-set) SHALL export a loader that
reads, schema-validates, and types `compat.json` documents, so consumers (WS-3 registry
server, catalog site) share one parser and one validation error surface. Validation
failures SHALL name the file and field; a malformed `compat.json` SHALL fail loudly at
load/build time, never silently drop entries.

#### Scenario: Loader round-trips all shipped compat files

- **WHEN** the loader is pointed at every `compat.json` under `packages/contracts/`
- **THEN** all parse and validate, and the typed result matches the `InterfaceDef` shape
  consumers expect

#### Scenario: Malformed data fails loudly

- **WHEN** a `compat.json` omits a required field (e.g. an entry without `module`)
- **THEN** the loader throws an error naming the contract, file path, and offending field

### Requirement: listInterfaces() consumes the extracted data

`apps/workspace/src/interfaces.ts` `listInterfaces()` SHALL build its `InterfaceDef[]` from
the extracted compat data via the shared loader rather than from inline literals, keeping
existing resolution behavior (`resolveInterface`, zero-config fallback, instance parsing)
unchanged. The `llm` interface SHALL continue to reflect the live chat-provider registry.
Workspace-side behavior is otherwise out of scope for this change (full extraction of
dispatch is WS-3); this requirement makes the workspace a *consumer* of the catalog so the
data has exactly one home before WS-3 begins.

#### Scenario: Behavior-preserving swap

- **WHEN** the workspace's interface discovery and binding surfaces run after the swap
- **THEN** `GET /tools/namespaces` reports the same interfaces, compat lists, labels, and
  availability as before the extraction

#### Scenario: Data edit propagates without code change

- **WHEN** a new compat entry is added to `packages/contracts/vcs/compat.json`
- **THEN** it appears in the workspace's `interfaces.list` output with no change to
  `interfaces.ts`
