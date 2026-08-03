## ADDED Requirements

### Requirement: Catalog does not push users to the product app

The registry catalog shell SHALL NOT render an “Open the app” / “Open in app” CTA in the header. Account credentials and admin pages SHALL work with the catalog session alone.

#### Scenario: Credentials page standalone

- WHEN a user opens `/account/credentials` on the catalog host with a valid catalog session
- THEN CredentialManager is interactive in-page and no MovedNotice redirects them to chat

#### Scenario: Header has no Open-the-app

- WHEN the catalog shell renders
- THEN no control labeled “Open the app” or “Open in app” appears in the top-right chrome

### Requirement: Workspaces pane is collapsible

The workspaces / workspace-tree region in chat SHALL be collapsible with a persisted preference.

#### Scenario: Collapse persists

- WHEN the user collapses the workspaces pane and reloads
- THEN the pane remains collapsed until they expand it

### Requirement: Keyvalue has at least one cloud backend

The registry SHALL ship at least one handwritten `@utdk/keyvalue` implementation backed by DynamoDB or Redis, registered in compat and callable via the gateway.

#### Scenario: Dynamo or Redis get/set round-trip

- WHEN a workspace binds keyvalue to the new provider with valid credentials
- THEN `keyvalue.set` followed by `keyvalue.get` returns the stored value

### Requirement: Events has at least one cloud backend

The registry SHALL ship at least one handwritten `@utdk/events` implementation backed by SNS and/or SQS.

#### Scenario: Emit and list

- WHEN a workspace binds events to the new provider
- THEN `events.emit` succeeds and a subsequent `events.list` (or receive) observes the message under the contract semantics

### Requirement: VFS has at least one cloud backend

The registry SHALL ship at least one handwritten `@utdk/vfs` implementation backed by S3 (or S3-compatible).

#### Scenario: Put and get object as file

- WHEN a workspace binds vfs to the S3 provider
- THEN `vfs.write` then `vfs.read` round-trips content for a relative path

### Requirement: Runtime VCS and LLM are native modules

Agent hosting, git hosting, and LLM SHALL appear as first-class native surfaces (titles Runtime, VCS, LLM or equivalent) and SHALL NOT be discoverable only as anonymous Interfaces rows.

#### Scenario: Sidebar lists natives

- WHEN the workspace sidebar Workspace group renders
- THEN entries for Runtime, VCS, and LLM exist with human titles

### Requirement: Chat does not silently overwrite root main.tsx

Generated widget/code artifacts SHALL NOT write `main.tsx` at the workspace root by default. Save SHALL be explicit with an auto-suggested path derived from the artifact.

#### Scenario: Save prompt with suggestion

- WHEN a chat turn finishes generating a widget fence
- THEN the UI offers Save with a suggested path under e.g. `widgets/<slug>/` and does not auto-write root `main.tsx`

### Requirement: Widget progress is visible while streaming

Streaming widget/code generation SHALL update an in-transcript artifact/progress surface incrementally and SHALL NOT be solely nested under a collapsed thinking/reasoning part.

#### Scenario: Incremental preview

- WHEN the model streams a widget code fence
- THEN the user sees growing preview/content outside a Thinking disclosure before the turn completes

### Requirement: Editor respects dark mode

Code and raw text views SHALL use a dark highlighter theme when the app theme is dark. Markdown files SHALL default to rich text preview.

#### Scenario: Dark code canvas

- WHEN dark mode is enabled and a `.ts` or `.md` source view is shown
- THEN the editor background is not bright white

#### Scenario: Markdown rich default

- WHEN opening a `.md` file
- THEN the initial view is rich text (toggle available for source)

### Requirement: Staging vs applied is clear

Staged session chrome SHALL state that changes are drafts until the user applies them to the workspace.

#### Scenario: Draft copy

- WHEN a staged session has pending file changes
- THEN SessionBar (or save chip) copy communicates draft status and an Apply action

### Requirement: Edit label

Controls that open the file editor SHALL be labeled “Edit”, not “Open editor”.

#### Scenario: Tree action label

- WHEN the workspace tree exposes the open-file action
- THEN its label is “Edit”

### Requirement: Code renderer works in chat

Compilable fences in chat SHALL render via CodePreview/ChatArtifactBlock without a blank/broken state under normal success paths.

#### Scenario: Widget fence renders

- WHEN an assistant message contains a valid widget fence
- THEN a preview mounts (or an explicit error), never an empty silent failure

### Requirement: Chrome does not duplicate identity

The UI SHALL NOT show two primary chat icons for the same chat affordance, nor repeat the open file’s path as a large title inside the pane when the tab already shows it.

#### Scenario: Single chat affordance

- WHEN ChatPage chrome is visible with an active session
- THEN only one primary MessageSquare chat identity control is emphasized for “current chat”

### Requirement: Members show human identity

Admin Members SHALL display email and/or name when available; Cognito subject MAY appear secondary.

#### Scenario: Email visible

- WHEN member records include email or name claims
- THEN the Members table shows that identity as the primary User column
