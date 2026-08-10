## ADDED Requirements

### Requirement: First-class diff viewer
The client SHALL render file diffs with a real merge/diff component
(`@codemirror/merge` over the CodeMirror 6 stack already in
`packages/editor`), showing before/after content — not just changed-path
lists. The viewer SHALL be reachable from: a commit in the history view, a
session's change list, and a merge conflict. It SHALL fetch content by the
hashes `vcs.show`/`vcs.diff` return on the wire (iw9-f1), and
`client/web/src/lib/vfs-commits.ts` SHALL surface the `changes` payload it
currently discards.

#### Scenario: Diff from history
- **WHEN** a user opens a commit in the history view and selects a changed
  file
- **THEN** a side-by-side (or unified, per viewport) diff of that file's
  before/after content renders

#### Scenario: Change data no longer discarded
- **WHEN** `fetchCommitDetail` returns
- **THEN** its result includes the commit's change data (added/modified/
  removed with hashes), consumed by the diff viewer

### Requirement: One-click undo via vcs.restore
The history view SHALL offer a single-action undo ("Restore this version")
that invokes `vcs.restore`, scoped to the current context (workspace or app).
Undo SHALL be non-destructive: restoring creates a new commit and history is
preserved. The affordance SHALL state this in plain language.

#### Scenario: Restore from history
- **WHEN** a user clicks Restore on an earlier version
- **THEN** the tree matches that version, a new history entry appears
  ("Restored to <when>"), and the previous state remains reachable

### Requirement: All six vcs verbs have client callers
The client SHALL invoke every one of `vcs.commit`, `vcs.log`, `vcs.show`,
`vcs.diff`, `vcs.restore`, `vcs.branches` from a real user-facing surface
(history view, diff viewer, undo, app timeline). Today only `vcs.show` has a
caller.

#### Scenario: No orphan verbs
- **WHEN** the client source is grepped for each verb's invocation
- **THEN** each of the six verbs has at least one non-test call site

### Requirement: One change-list component and one symbol set
Changed-path lists SHALL be rendered by a single shared component with a
single symbol/label vocabulary (new / edited / removed). The five current
renderings — `SessionBar.tsx:151-158`, `features/chat/ChatDock.tsx:216-222`,
`packages/editor/src/components/SaveAffordance.tsx:301-307`,
`panels/SessionsPanel.tsx:119-148`, `panels/SandboxesPanel.tsx:201-217` —
SHALL all use it, and the `+`/`~`/`−` glyph variants SHALL be gone.

#### Scenario: Single implementation
- **WHEN** the client source is searched for change-row mapping logic
  (added/modified/removed → rows)
- **THEN** exactly one component implements it and all five former sites
  import it

### Requirement: Plain-language vocabulary, no hashes
User-facing surfaces SHALL follow the SessionBar vocabulary rule
(`SessionBar.tsx:5-9`): no "commit", "branch", "stage", "merge", or raw
hashes; versions are shown as moments in time. Specifically: `VcsPanel` is
renamed/retitled "Code host"; `SessionsPanel` drops the `GitBranch` icon,
"staged" wording, and Open/Merged/Closed tab labels in favor of plain terms;
`SandboxesPanel` drops "uncommitted"; `CommitMountedContent.tsx:58`
(`shortToken`) and `packages/registry-ui/src/apps/versions.tsx:148` (raw
`hash.slice(0, 10)`) stop showing hashes (versions.tsx is deleted by the
release-tags migration).

#### Scenario: Jargon grep gate
- **WHEN** user-visible strings in the renamed panels are grepped for
  `stage|staged|uncommitted|GitBranch` and shortened-hash rendering
- **THEN** no user-facing occurrences remain (code identifiers and server
  wire fields are exempt)

#### Scenario: Time, not hash
- **WHEN** any surface identifies a version
- **THEN** it shows a relative or absolute time (and message/author where
  useful), never a content hash
