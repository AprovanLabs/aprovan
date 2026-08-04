## ADDED Requirements

### Requirement: One implementation per editing concern

The repositories SHALL contain one syntax highlighter, one editable-code component, one markdown pipeline, one editor composition, one save affordance, and one type-bundle generator.

#### Scenario: Single highlighter

- **WHEN** the repositories are searched for code that tokenises source for display
- **THEN** one implementation is found, excluding what third-party dependencies do internally

#### Scenario: Single editable-code component

- **WHEN** the repositories are searched for an editable code surface
- **THEN** one implementation is found, and it carries the union of the previously separate behaviours — indentation handling, auto-sizing, and scroll synchronisation

#### Scenario: Single editor composition

- **WHEN** a host renders a file for viewing or editing
- **THEN** it uses one composition, parameterised by whether editing is permitted, rather than choosing between two near-copies

#### Scenario: Single type-bundle generator

- **WHEN** virtual declaration files are produced for the editor
- **THEN** one generator produces them, with one implementation of the package-name derivation

### Requirement: Host-extension seams preserved

The seams a host uses to extend the editor SHALL keep their existing shapes: the storage adapter, the custom-preview hook, the logs source, and the composer-controls slot.

#### Scenario: Structural logs source unchanged

- **WHEN** a host supplies a logs source without importing its type
- **THEN** it continues to satisfy the editor's expectation with no change to the object's shape

#### Scenario: Host slots still honoured

- **WHEN** a host supplies a storage adapter, a custom preview, or composer controls
- **THEN** each is used as before

### Requirement: Editing behaviours preserved

Behaviours that exist today and have live consumers SHALL survive consolidation.

#### Scenario: Streaming code view

- **WHEN** a code fence is still being produced and its closing delimiter has not arrived
- **THEN** the partial content renders progressively without error

#### Scenario: Write policies

- **WHEN** a file resolves to direct, staged, or read-only handling
- **THEN** the editor applies the corresponding save behaviour, including the debounce and explicit-flush behaviour of the staged policy

#### Scenario: Stale-file handling

- **WHEN** a file changes underneath an open editor
- **THEN** a clean editor reloads silently and a dirty editor offers reload or keep-mine

#### Scenario: Markdown fidelity probe

- **WHEN** a markdown file cannot round-trip through the rich view without loss
- **THEN** it opens in source view with an explanation, rather than opening in rich view and losing content

#### Scenario: Patch rendering and progress

- **WHEN** a patch is produced incrementally
- **THEN** completed hunks are counted as progress and unapplied hunks remain visibly unapplied

### Requirement: Cross-repo consumer keeps working

The language-service editor consumed by the registry playground SHALL keep working across the consolidation, with the move made as a coordinated release rather than an in-place rename.

#### Scenario: Playground continues to function

- **WHEN** the playground page loads after the consolidation
- **THEN** its editor renders with diagnostics, completions, and hover, and its lazy-loading boundary is unchanged

#### Scenario: Coordinated release

- **WHEN** the editor moves to its new package
- **THEN** the consuming repository is updated in the same coordinated release, and no version resolves to a package missing the entry point
