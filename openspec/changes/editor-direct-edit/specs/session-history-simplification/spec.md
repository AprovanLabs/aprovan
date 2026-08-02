## ADDED Requirements

### Requirement: Sessions exist only when meaningful
A chat-session record SHALL exist only when (a) the user sent at least one chat message, or
(b) a draft was created for a staged target by the lazy-draft rule. File browsing and direct
editing SHALL produce no session records; `Edit: <file>` husk sessions SHALL no longer be
created.

#### Scenario: History shows only real activity
- **WHEN** a user browses and directly edits plain files for a whole session, then opens the
  chats list
- **THEN** the list contains no entries from that activity

#### Scenario: Draft entries carry their target
- **WHEN** a draft exists for a staged target
- **THEN** its history entry identifies the target scope (app or repo) and its changed-file
  count

### Requirement: Versioning and merge UI is scoped to staged targets
Apply/discard/sync controls, base-age display ("workspace as of …"), and merge/conflict UI
SHALL appear only for staged sessions (drafts over apps/repos or chat proposals). Direct
editing surfaces SHALL never show versioning vocabulary.

#### Scenario: Plain-file editing shows no versioning UI
- **WHEN** a user edits a direct-policy file
- **THEN** no apply, sync, base-age, or merge affordance is shown — only the save-state
  indicator

#### Scenario: Draft shows the full flow
- **WHEN** a staged session with changes is active
- **THEN** review, apply, and discard are available, and conflicts route to the single
  resolution surface

### Requirement: One conflict surface
All conflict occurrences (draft auto-sync, draft apply, editor-draft finish, AI proposal
apply) SHALL surface through exactly one notification card kind that summarizes the conflict
and routes to one resolution dialog. The dialog SHALL own all resolution actions (per-file
keep-mine / keep-workspace / AI-combine, plus bulk options); the notification card SHALL NOT
carry its own independent resolution actions, and duplicated inline conflict-notice
construction SHALL be consolidated into one shared helper.

#### Scenario: Conflicts converge on the dialog
- **WHEN** a conflict is detected by any flow
- **THEN** the user sees the one card kind, and resolving happens in the one dialog

#### Scenario: One code path builds conflict notifications
- **WHEN** the client code is inspected
- **THEN** conflict notifications are constructed by a single shared helper (no duplicated
  choice-blob literals across `useDraftSync` and the editor-draft path)

### Requirement: SessionBar is decluttered
The session strip SHALL show at most: chat title/list entry, sync chip, draft badge with
changed-files and apply (staged only), and presence. All remaining actions (open in window,
reset, archive, delete, refresh) SHALL live in a single overflow menu. The `keepEditDrafts`
checkbox SHALL be removed along with its preference.

#### Scenario: Strip control budget
- **WHEN** the session strip renders for a non-draft context
- **THEN** at most five interactive controls are visible outside the overflow menu

#### Scenario: keepEditDrafts is gone
- **WHEN** the codebase is searched for the `patchwork:edit-keep-draft` key
- **THEN** no reference exists
