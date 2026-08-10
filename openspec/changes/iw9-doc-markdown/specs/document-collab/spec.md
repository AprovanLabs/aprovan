# document-collab

Live collaborative editing session over a Yjs doc, one per document (D17,
D18). The server holds the authoritative replica; clients bind CodeMirror 6
via `y-codemirror.next` and exchange sync + awareness updates. Presence rides
the realtime broker under the iw9-f5 `realtime-broker` contract.

## ADDED Requirements

### Requirement: One live doc per document, keyed by workspace and path

A live collaborative session SHALL be backed by exactly one Yjs doc per
document, identified by `(workspaceId, vfs path)`. The document body SHALL
live in a single `Y.Text`. The server SHALL be the authoritative replica:
it loads or creates the live doc on the first participant's join and all
client replicas converge to it via the Yjs sync protocol (`y-protocols`).
Two concurrent joins for the same `(workspaceId, path)` SHALL resolve to the
same live doc instance — never two competing authorities.

#### Scenario: Concurrent joiners share one doc

- **WHEN** two clients join a session for the same workspace path at the
  same time
- **THEN** both converge to a single server-held doc, and a character typed
  by either client appears in the other's editor without reload

#### Scenario: Doc identity survives reconnect

- **WHEN** a client disconnects and rejoins the same path while other
  participants kept the session alive
- **THEN** it syncs against the same live doc state, not a fresh doc
  re-read from the file

### Requirement: Awareness carries cursors, selections, and names

The session SHALL use the Yjs awareness protocol to share each
participant's cursor position, selection range, and display name (plus a
stable per-user color derived from identity). Awareness state SHALL be
ephemeral: never persisted, dropped when the participant disconnects, and
excluded from document snapshots. Remote cursors and selections SHALL render
in every participant's editor with the owner's name.

#### Scenario: Two users see each other's cursors

- **WHEN** two authenticated users have the same document open and one
  moves their cursor or changes their selection
- **THEN** the other sees the updated cursor/selection decorated with the
  first user's display name, without any document content change

#### Scenario: Departure clears presence

- **WHEN** a participant closes the document or their connection drops
- **THEN** their cursor, selection, and name disappear from all remaining
  participants' editors, and no trace of the awareness state is persisted

### Requirement: Joining a session requires an authenticated member with file access

Joining a live session SHALL require an authenticated workspace principal
whose file access to the document's path is re-checked at join time through
tenant-scoped access checks — topic or doc identifiers never authorize
(invariants 7 and 8). Anonymous principals SHALL be refused live-session
join, sync, and awareness unconditionally, including for link-shared
documents (invariant 9; their read path is the materialized file, see
`document-materialization`).

#### Scenario: Anonymous link recipient cannot join

- **WHEN** an anonymous holder of a valid link-share key attempts to open
  the live collaborative session for the shared document
- **THEN** the join is refused; the holder can only read the materialized
  `.md` via the share's file read path

#### Scenario: Access revocation is honored at join

- **WHEN** a user whose access to the document's path has been removed
  attempts to join (or rejoin) the session
- **THEN** the join is refused by the tenant-scoped access check regardless
  of any previously known topic or doc id

### Requirement: Presence and session events ride the broker contract

Realtime delivery for the document session SHALL conform to the iw9-f5
`realtime-broker` capability: subscribe is async, the namespace handler
holds no module-scope state (broker-owned store), and no ordering or
exactly-once delivery is assumed. Client state SHALL be reconcilable from a
fresh subscribe/sync alone: a (re)connecting client performs a full Yjs sync
handshake and receives a fresh awareness snapshot — missed incremental
updates are never required for convergence.

#### Scenario: Client recovers by resync

- **WHEN** a client suspects missed updates (reconnect after buffer-drop
  disconnect)
- **THEN** re-joining performs a sync handshake that converges its replica
  to the server state and rebuilds the presence roster, with no replay of
  individual missed events

### Requirement: Live doc lifecycle is bounded by participation

The server SHALL load a live doc on first join and release it after the
last participant leaves once quiesce materialization and durable
persistence (see `document-materialization`, `document-persistence`) have
completed. A released doc leaves no in-memory state; a later join
reconstructs it from durable CRDT state.

#### Scenario: Last leave releases the doc

- **WHEN** the last participant leaves a live session and quiesce
  materialization plus snapshot persistence complete
- **THEN** the server drops the in-memory doc, and a subsequent join
  reconstructs identical content from durable state
