# document-persistence

Durable storage of live-doc CRDT state. Compaction is REQUIRED by D17/D18
and ADR 0003 ("Yjs history grows unboundedly otherwise") — it is part of the
capability contract, not an optimization.

## ADDED Requirements

### Requirement: Durable doc state is snapshot plus update log

Each live doc's durable state SHALL consist of a snapshot (the result of
`Y.encodeStateAsUpdate` at snapshot time) plus an ordered log of updates
received since that snapshot. Every update applied to the server replica
SHALL be appended durably before or promptly after application, such that
an abrupt server stop loses at most a small, bounded window of updates —
and never a materialized state (the `.md` from the last quiesce is the
floor). On doc load, the server SHALL reconstruct state by applying the
snapshot then the log.

#### Scenario: Restart reconstructs the doc

- **WHEN** the server restarts while a document has durable snapshot and
  log entries
- **THEN** the next session load reproduces the pre-restart doc content,
  and reconnecting clients converge to it via sync

### Requirement: Compaction bounds stored size and log age

The server SHALL compact a doc's durable state when the update log exceeds
a size threshold or an age threshold (both configurable; defaults declared
in the tech plan and enforced in code, not advisory). Compaction SHALL
write a new snapshot and prune the covered log entries atomically with
respect to readers — a loader observes either the old snapshot+log or the
new snapshot, never a torn mix. After compaction, stored size SHALL be the
snapshot plus the bounded post-snapshot tail.

#### Scenario: Long-lived doc stays bounded

- **WHEN** a document accumulates edits past the size threshold
- **THEN** compaction runs, the update log shrinks to entries newer than
  the new snapshot, and reconstructed content is identical before and
  after compaction

#### Scenario: Idle doc compacts by age

- **WHEN** a doc's oldest un-compacted update exceeds the age threshold
- **THEN** the next compaction pass snapshots and prunes it even though the
  size threshold was never reached

### Requirement: The materialized file is the fallback, not the CRDT store

The materialized `.md` SHALL NOT serve as the durable CRDT state. If a
doc's durable CRDT state is missing or unreadable (corruption, first-ever
open of an existing file, restore of an old commit via `vcs.restore`), the
server SHALL initialize a fresh Yjs doc from the current file content and
begin new durable state. Editing history/attribution before that point is
not reconstructed. When file content on main changes outside the live-doc
path (e.g. a `vcs.restore`), the live doc SHALL be re-initialized or
reconciled so the file and doc do not diverge silently.

#### Scenario: First open of an existing file

- **WHEN** a user opens a Markdown file that predates the Document app and
  has no CRDT state
- **THEN** a fresh doc initializes from the file content and collaboration
  proceeds; the file content is unchanged by the initialization

#### Scenario: Restore wins over stale doc state

- **WHEN** `vcs.restore` changes a document's file content while no live
  session is active
- **THEN** the next session load reflects the restored file content, not
  the pre-restore CRDT state
