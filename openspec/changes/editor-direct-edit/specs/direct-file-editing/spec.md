## ADDED Requirements

### Requirement: Opening a file never creates a chat session
Opening a workspace file for viewing or editing SHALL NOT create, activate, or switch any chat
session record. The coupling in `useEditDraft.beginEditDraft` (session minted on file-open)
SHALL be removed.

#### Scenario: Plain file open is session-free
- **WHEN** a user opens any workspace file from the tree, a tab, or a widget affordance
- **THEN** no `createChatSession` call is made and the sessions list is unchanged

#### Scenario: Editing a plain file is session-free end to end
- **WHEN** a user edits and saves a plain workspace file (not under an app source prefix or a
  VCS mount) and closes the tab
- **THEN** zero chat-session records exist for that activity, and the saved content is
  readable through the VFS

### Requirement: Write policy is derived from the target path
The client SHALL resolve every editor write to a policy of `direct` or `staged` from the target
path alone: paths under an installed app's declared source prefixes and paths under a VCS mount
prefix are `staged`; all other workspace paths are `direct`. There SHALL be no user-facing
setting, toggle, or per-session mode that overrides this rule.

#### Scenario: Plain path resolves to direct
- **WHEN** the write-policy resolver is given a path not under any app source prefix or mount
  prefix
- **THEN** it returns `direct`

#### Scenario: App source path resolves to staged
- **WHEN** the resolver is given a path under an installed app's declared source prefix
  (the same prefix set `appPathAllowed` enforces server-side)
- **THEN** it returns `staged`

#### Scenario: Mounted repo path resolves to staged
- **WHEN** the resolver is given a path under a VCS mount prefix
- **THEN** it returns `staged`

#### Scenario: No mode toggle exists
- **WHEN** the client UI and persisted settings are inspected
- **THEN** no control or stored preference (including the removed
  `patchwork:edit-keep-draft` key) changes whether a given path's edits are direct or staged

### Requirement: Direct edits write through the VFS
Edits to `direct`-policy paths SHALL be written through the workspace VFS (`syncedBackend`):
local-first OPFS write-ahead, gateway write, offline journaling and replay — with no session
overlay in the path.

#### Scenario: Online direct save
- **WHEN** a direct-policy file is saved while the gateway is reachable
- **THEN** the content lands in OPFS and the gateway, and the sync state reports synced

#### Scenario: Offline direct save is journaled
- **WHEN** a direct-policy file is saved while the gateway is unreachable
- **THEN** the write is journaled and replayed when connectivity returns, and the editor
  remains usable throughout

### Requirement: Staged targets get a lazily created draft
For `staged`-policy paths, a draft (staged session) SHALL be created lazily on the first save —
not on file-open — and all subsequent saves in that editing context SHALL land in the draft's
overlay until the user applies or discards it.

#### Scenario: Read does not create a draft
- **WHEN** a user opens a staged-target file and closes it without saving
- **THEN** no draft exists

#### Scenario: First save creates the draft
- **WHEN** a user first saves an edit to a staged-target file
- **THEN** exactly one draft is created, scoped so the save lands in its overlay rather than
  the live target

#### Scenario: Draft creation failure does not write through
- **WHEN** the first save to a staged target fails to create a draft (offline or unsupported
  gateway)
- **THEN** the edit is NOT written to the live target; the buffer is preserved and the failure
  is surfaced

### Requirement: Chat-driven edits are always staged
File modifications produced by an AI chat turn SHALL always land in a staged session's overlay
regardless of the target path's policy, and SHALL reach the workspace only through an explicit
user apply.

#### Scenario: AI edit to a plain file is staged
- **WHEN** a chat turn proposes changes to a direct-policy file
- **THEN** the changes are held in the chat's staged scope and the live file is unchanged
  until the user applies them

#### Scenario: User applies an AI proposal
- **WHEN** the user accepts a chat proposal
- **THEN** the staged changes are applied to the workspace as one change set

### Requirement: Read-only mounts stay read-only
While a VCS mount is read-only, the editor SHALL present files under it as read-only and SHALL
NOT offer the draft flow for them; the staged policy for mounts activates only for writable
mounts.

#### Scenario: Read-only mount file
- **WHEN** a user opens a file under a read-only VCS mount
- **THEN** the pane is read-only with an explanatory indicator, and no draft can be created
  for it
