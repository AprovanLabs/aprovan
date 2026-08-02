## ADDED Requirements

### Requirement: Per-type default views are owned by fileTypes.ts
`packages/editor/src/components/edit/fileTypes.ts` SHALL define the default view for each file
category/type (e.g. markdown → rich text with source toggle; compilable → code with preview
toggle; text → code view; media → media preview). Host components SHALL NOT override these
defaults through initial-state props; the `initialState.showPreview` override path from
`EditModalHost` SHALL be removed.

#### Scenario: Policy is consulted, not host state
- **WHEN** an editing surface (in-tab pane or EditModal) mounts a file
- **THEN** its initial view is resolved from the `fileTypes.ts` policy for that file's type,
  with no host-supplied initial-view override in the call path

#### Scenario: Hosts share one policy
- **WHEN** the same file type is opened from different hosts (tab pane, widget editor)
- **THEN** it opens in the same default view in both

### Requirement: Markdown defaults to editable WYSIWYG with a source toggle
`.md` files SHALL open in the TipTap-based rich-text editor (editable), with a toggle to a
syntax-highlighted source view and back. This fixes the regression where `.md` opened as a raw
code view because the host forced `showPreview: false`.

#### Scenario: Markdown opens rich by default
- **WHEN** a user opens any `.md` file
- **THEN** the editable WYSIWYG view renders (not a raw textarea or code view)

#### Scenario: Source toggle round-trips
- **WHEN** the user toggles to source, edits, and toggles back
- **THEN** the rich view reflects the source edits and no content is lost

#### Scenario: Non-round-trippable markdown falls back to source
- **WHEN** a markdown file cannot be represented faithfully by the rich editor
- **THEN** the pane opens in source view with a notice, and the file content is never
  silently rewritten
