## ADDED Requirements

### Requirement: Files open as editable in-tab panes by default
Opening a text-editable workspace file (markdown, code, text categories per `fileTypes.ts`)
SHALL present a directly editable surface inside the tab pane — sidebar tree + tab, no
fullscreen overlay, no separate edit mode to enter.

#### Scenario: Markdown file opens editable in the tab
- **WHEN** a user opens a `.md` file from the tree
- **THEN** the tab pane shows an editable rich-text view and typing modifies the buffer
  immediately

#### Scenario: Code file opens editable in the tab
- **WHEN** a user opens a `.ts` (or other text/compilable) file
- **THEN** the tab pane shows an editable code view without any modal or overlay

#### Scenario: Non-editable types degrade gracefully
- **WHEN** a user opens a media or binary file
- **THEN** the pane shows the read-only preview (or download affordance) with no editing
  chrome

### Requirement: Save state is visible and singular
The pane header SHALL show exactly one save-state indicator whose states cover: saved, edit
pending (debounce), saving, save failed (with retry), offline/journaled, draft (staged targets,
with changed-file count), and read-only. Direct saves SHALL be debounced with an immediate-save
keyboard shortcut (Cmd/Ctrl+S).

#### Scenario: Debounced autosave
- **WHEN** a user stops typing in a direct-policy file
- **THEN** the indicator moves from edit-pending to saving to saved without user action

#### Scenario: Failed save is recoverable
- **WHEN** a save fails for a reason other than connectivity
- **THEN** the indicator shows a failure state with a retry affordance and the buffer is not
  lost

#### Scenario: Staged target shows draft state
- **WHEN** a user has saved edits to a staged target
- **THEN** the indicator shows the draft state with its changed-file count and a path to
  review/apply

### Requirement: Chat is an opt-in dock beside the file
Chat SHALL be reachable from the file pane as a side dock that keeps the file visible and
editable. Opening the dock SHALL NOT create a session; the session record is created on the
first sent message, as with any chat.

#### Scenario: Dock opens without a session
- **WHEN** a user opens the chat dock on a file and closes it without sending a message
- **THEN** no session record exists

#### Scenario: File stays editable with dock open
- **WHEN** the chat dock is open
- **THEN** the file pane remains visible and directly editable alongside it

### Requirement: EditModal is demoted to an explicit widget-editing flow
The fullscreen `EditModal` SHALL no longer be the default surface for opening or editing files.
It SHALL remain available as an explicitly invoked flow for compilable widget files (live
compile preview), and its saves SHALL follow the same write-policy resolution as the in-tab
pane.

#### Scenario: Plain file never routes to the modal
- **WHEN** a user opens or edits a non-compilable file through default affordances
- **THEN** the fullscreen editor is never shown

#### Scenario: Widget editor is explicit
- **WHEN** a user invokes the widget editor on a compilable file
- **THEN** the fullscreen editor opens, and closing it returns to the same in-tab pane

### Requirement: External changes surface through one banner
When a file changes remotely while a pane holds unsaved local edits, the pane SHALL show a
single external-change banner offering reload (take remote) or keep-mine. When the local buffer
is clean, remote changes SHALL refresh the pane silently.

#### Scenario: Clean buffer refreshes silently
- **WHEN** a file changes remotely and the pane has no unsaved edits
- **THEN** the pane updates to the new content without interrupting the user

#### Scenario: Dirty buffer prompts
- **WHEN** a file changes remotely and the pane has unsaved edits
- **THEN** the banner appears with reload and keep-mine choices, and no content is lost
  without an explicit choice
