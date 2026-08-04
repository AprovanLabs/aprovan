# Brief: editor-consolidation (streams 1–8)

## Mission
Injected Checker seam; unify highlighter + editable code surface; one composition/save;
one markdown pipeline; per-project type environment; one type-bundle generator;
move language-service editor into consolidated package; wire checker on compile-before-preview.

## Gate
**Blocked until `tools-global` on main** (package renames `@aprovan/patchwork` / `@aprovan/editor`).

## Settled
Keep rich-text markdown; editable composition wins; re-derive read-only; typecheck on compile only.

## Read first
prd/tech-plan/tasks/specs under openspec/changes/editor-consolidation/

## Tasks
Streams 1–8. Internal parallelism: 1 ‖ 2 ‖ 5 after gate; then 3,4 after 2; 6 after 5; 7 after 3+4+5+6; 8 after 1+5+6+7.

## Acceptance criteria
### unified-code-editor

#### Scenario: Single highlighter

- **WHEN** the repositories are searched for code that tokenises source for display
- **THEN** one implementation is found, excluding what third-party dependencies do internally

### unified-code-editor

#### Scenario: Single editable-code component

- **WHEN** the repositories are searched for an editable code surface
- **THEN** one implementation is found, and it carries the union of the previously separate behaviours — indentation handling, auto-sizing, and scroll synchronisation

### unified-code-editor

#### Scenario: Single editor composition

- **WHEN** a host renders a file for viewing or editing
- **THEN** it uses one composition, parameterised by whether editing is permitted, rather than choosing between two near-copies

### unified-code-editor

#### Scenario: Single type-bundle generator

- **WHEN** virtual declaration files are produced for the editor
- **THEN** one generator produces them, with one implementation of the package-name derivation

### unified-code-editor

#### Scenario: Structural logs source unchanged

- **WHEN** a host supplies a logs source without importing its type
- **THEN** it continues to satisfy the editor's expectation with no change to the object's shape

### unified-code-editor

#### Scenario: Host slots still honoured

- **WHEN** a host supplies a storage adapter, a custom preview, or composer controls
- **THEN** each is used as before

### unified-code-editor

#### Scenario: Streaming code view

- **WHEN** a code fence is still being produced and its closing delimiter has not arrived
- **THEN** the partial content renders progressively without error

### unified-code-editor

#### Scenario: Write policies

- **WHEN** a file resolves to direct, staged, or read-only handling
- **THEN** the editor applies the corresponding save behaviour, including the debounce and explicit-flush behaviour of the staged policy

### unified-code-editor

#### Scenario: Stale-file handling

- **WHEN** a file changes underneath an open editor
- **THEN** a clean editor reloads silently and a dirty editor offers reload or keep-mine

### unified-code-editor

#### Scenario: Markdown fidelity probe

- **WHEN** a markdown file cannot round-trip through the rich view without loss
- **THEN** it opens in source view with an explanation, rather than opening in rich view and losing content

### unified-code-editor

#### Scenario: Patch rendering and progress

- **WHEN** a patch is produced incrementally
- **THEN** completed hunks are counted as progress and unapplied hunks remain visibly unapplied

### unified-code-editor

#### Scenario: Playground continues to function

- **WHEN** the playground page loads after the consolidation
- **THEN** its editor renders with diagnostics, completions, and hover, and its lazy-loading boundary is unchanged

### unified-code-editor

#### Scenario: Coordinated release

- **WHEN** the editor moves to its new package
- **THEN** the consuming repository is updated in the same coordinated release, and no version resolves to a package missing the entry point

### widget-typecheck

#### Scenario: No checker supplied

- **WHEN** a widget is compiled with no checker
- **THEN** compilation succeeds or fails exactly as it does today, and no typechecking code is loaded

### widget-typecheck

#### Scenario: Checker supplied

- **WHEN** a widget is compiled with a checker and the source contains a type error
- **THEN** the error is reported with its file, position, and message

### widget-typecheck

#### Scenario: Runtime carries no typechecker dependency

- **WHEN** the widget runtime's dependencies are inspected
- **THEN** no typechecker appears among them

### widget-typecheck

#### Scenario: Published app page loads none

- **WHEN** a published app page loads the widget runtime
- **THEN** no typechecker bytes are fetched

### widget-typecheck

#### Scenario: Flag has an observable effect

- **WHEN** a caller passes the option and supplies a checker
- **THEN** typechecking runs

### widget-typecheck

#### Scenario: No silently ignored option

- **WHEN** the option is inspected in the codebase
- **THEN** it is either consumed or absent, and no caller passes an option that is never read

### widget-typecheck

#### Scenario: Diagnostic reaches the logs panel

- **WHEN** a widget fails to typecheck
- **THEN** the error appears in the logs panel attributed to that widget's source path

### widget-typecheck

#### Scenario: Diagnostic reaches the model

- **WHEN** a widget fails to typecheck and an automatic fix is attempted
- **THEN** the type error is included in the problem digest sent with the fix request

### widget-typecheck

#### Scenario: No cross-contamination

- **WHEN** two editors are open on projects with different available namespaces
- **THEN** each sees only its own declarations

### widget-typecheck

#### Scenario: Environment torn down

- **WHEN** an editor closes
- **THEN** its environment and mounted files are released rather than accumulating

### widget-typecheck

#### Scenario: Global root is typed

- **WHEN** a declaration introducing the service root as a global is mounted
- **THEN** references to that root in project source resolve to it, with completions on its namespaces

### widget-typecheck

#### Scenario: Provider types load on demand

- **WHEN** project source references a provider namespace whose declarations are not yet mounted
- **THEN** those declarations are fetched and mounted, and the whole provider catalogue is not shipped ahead of time

## Verify
Per tasks.md; final builds for web + registry-web.

## Git
Aprovan `iw7/editor-consolidation` + registry touches for CodeEditor/highlight/playground.
Worktrees. PRs; do not merge.

## Path conflicts
Do not touch `packages/compiler/src/mount/**` while utdk-remote stream 2/3 is open —
editor streams 1/6 touch compiler types/transforms/schemas, not mount. Confirm Touches.
If conflict with remote on compiler package.json, serialize.

## Report
briefs/00-report.md
