## ADDED Requirements

### Requirement: Auto sessions answer "what changed?"
`changeSummary` SHALL return real change data for `auto`-mode sessions by
computing `diff(base, main)` filtered to the paths the session touched,
instead of iterating the (empty) overlay and returning nothing
(`vcs/chat-sessions.ts:423-443` today). Staged sessions keep the overlay
path. The result SHALL feed both the change list and the diff viewer.

#### Scenario: Auto session shows its changes
- **WHEN** an auto session has written three files directly to the workspace
  and its summary is requested
- **THEN** those three paths are returned as added/modified/removed relative
  to the session's base — not an empty summary

#### Scenario: Concurrent foreign edits are excluded
- **WHEN** another user edits an unrelated file while an auto session is open
- **THEN** that file does not appear in the session's change summary
  (diff is filtered to session-touched paths)

#### Scenario: Auto session undo
- **WHEN** a user invokes undo on an auto session's changes
- **THEN** `vcs.restore` restores the session-touched paths to their base
  versions in one action, recorded as a new history entry (D11)

### Requirement: Merge conflicts resolved with eyes open
`MergeDialog` SHALL resolve conflicts through the server's
`sessions.resolve` procedure (`vcs/sessions-service.ts:175`, `resolveSessionMerge`)
instead of reimplementing resolution client-side, and SHALL show both
versions of each conflicted file (the session's and the workspace's) via the
diff viewer before the user chooses (`MergeDialog.tsx:220-282` currently
shows only the path).

#### Scenario: Both versions visible
- **WHEN** the merge dialog lists a conflicted file
- **THEN** the user can view a diff of "your version" vs "the workspace
  version" for that file before choosing

#### Scenario: Resolution goes through the server
- **WHEN** the user confirms per-file choices (keep mine / keep workspace /
  AI-combined content)
- **THEN** the client calls `sessions.resolve` with those choices and the
  server applies them atomically, returning the resulting session state and
  merge commit
