# chat-app — the Chat flagship app

Chat is an app installed on the platform (iw9-b model), not a platform
service. Its data lives in iw9-f2's shared partition; its manifest is one
`app.yaml` declaring two host modes (D2).

## ADDED Requirements

### Requirement: Single manifest, two host modes

Chat SHALL ship exactly one `app.yaml` declaring host modes
`workspace-managed` and `hosted-by-creator`, a slug, an icon, and a
capability ceiling limited to the namespaces Chat consumes. The install flow
SHALL prompt for a mode because more than one is declared (D2), and the
chosen mode SHALL be recorded on the install record where it is immutable
(F2, invariant 10).

#### Scenario: Install prompts for host mode

- **WHEN** a user installs Chat in any workspace
- **THEN** the install flow presents both host modes with the D2 disclosure
  copy and does not proceed until one is chosen

#### Scenario: Hosted default is the creator's personal space

- **WHEN** a user chooses `hosted-by-creator`
- **THEN** the instance is created in the creator's personal space by
  default (D1), and choosing any other hosting space is a deliberate,
  visible selection — never silent

#### Scenario: Host mode cannot change after install

- **WHEN** any caller attempts to change an existing install's host mode
- **THEN** the mutation is rejected and the only offered path is
  export/import (invariant 10)

### Requirement: Channels, threads, and messages in the shared partition

Chat SHALL store channels, threads, and messages as records in the
instance's F2 shared partition, attributed to their author. Threads SHALL be
one level deep: a channel message may own thread replies; replies cannot own
threads. Chat SHALL NOT introduce its own storage plane or bypass
`records.*` / `vfs.*`.

#### Scenario: Message write is attributed and partition-scoped

- **WHEN** a participant posts a message to a channel
- **THEN** the record is written to that instance's shared partition with
  the author's user id, and is readable by other participants of that
  channel only

#### Scenario: Non-participant cannot read instance data

- **WHEN** a user who is not a participant of the instance queries its
  records
- **THEN** the platform returns the established deny-as-404 behavior — no
  existence oracle

#### Scenario: Thread nesting is bounded

- **WHEN** a client attempts to create a thread reply on a message that is
  itself a thread reply
- **THEN** the write is rejected with a validation error

### Requirement: Channel-level readability governs access

Every read and every fan-out decision SHALL be evaluated against the
channel's membership (public-to-instance channels: all participants;
restricted channels: an explicit member list). Instance participation alone
SHALL NOT grant access to a restricted channel.

#### Scenario: Restricted channel hides from non-members

- **WHEN** a participant who is not a member of a restricted channel lists
  channels or fetches its messages
- **THEN** the restricted channel's messages are not returned, and message
  fetch behaves as deny-as-404

### Requirement: Hosted-vs-managed disclosure

Chat SHALL surface invariant 5 in-product: managed instances display that
data lives in a workspace the viewer belongs to (readable, exportable,
deletable); hosted instances display who hosts (a fact, not a mode) and
that the host's claims are promises.

#### Scenario: Guest sees hosting disclosure

- **WHEN** a guest opens a hosted Chat instance
- **THEN** the UI displays the host's identity and the hosted-data
  disclosure defined in ux.md

### Requirement: Host storage visibility and control (D22)

The instance host SHALL see the instance's storage size, SHALL be able to
set a storage cap, and SHALL be able to delete the instance — all riding
F2's metering machinery, surfaced in Chat's admin surface.

#### Scenario: Host views and caps storage

- **WHEN** the host opens the instance admin surface
- **THEN** per-instance storage size is displayed and a cap can be set;
  writes beyond the cap fail with a user-visible, distinguishable error

#### Scenario: Host deletes the instance

- **WHEN** the host confirms instance deletion
- **THEN** the instance's records and files are deleted via the platform's
  audited instance-delete path and all participants lose access

### Requirement: Platform-first with explicit findings

Chat SHALL be built only on existing platform surfaces (`apps.*`,
`records.*`, `vfs.*`, `invites.*`, `agents.run`, realtime broker). Every
point where Chat requires a platform primitive that does not exist SHALL be
recorded as a numbered finding in tech-plan.md; no core endpoint SHALL be
added silently under this change.

#### Scenario: Gap discovered during implementation

- **WHEN** an implementer finds that a Chat behavior cannot be built on
  existing platform surfaces
- **THEN** the gap is added to tech-plan.md's Findings section (owner
  stream named) before any workaround is built, and the workaround stays
  inside the app boundary
