# change-feed

Replaces the 8-second unprefixed full-workspace listing poll
(`client/web/src/lib/workspace-vfs.ts` `startLiveWorkspaceSync`) with a versioned,
cheap-when-idle change endpoint.

## ADDED Requirements

### Requirement: Workspace change journal

The workspace server SHALL maintain a per-workspace monotonic change cursor and an
in-memory journal of recent FS mutations (path, kind: update|delete, cursor). Every
mutation through `IFsStore` (write, remove, removePrefix, completeUpload — including
staged-session shadow writes) SHALL advance the cursor and append to the journal. The
journal MAY be bounded (ring of at least 1,000 entries per workspace); a request whose
`since` token has fallen off the ring SHALL be answered with a full listing and a fresh
cursor rather than an error.

#### Scenario: Mutation advances the cursor

- **WHEN** a file is written through any FS mutation path
- **THEN** the workspace's change cursor is strictly greater than before, and the
  journal contains an entry for that path at the new cursor

#### Scenario: Overflowed token falls back to full listing

- **WHEN** a client presents a `since` token older than the oldest retained journal
  entry (e.g. after a server restart, which resets the journal)
- **THEN** the response carries `reset: true`, the current full entry listing, and the
  current cursor — and the client rebaselines instead of erroring

### Requirement: Change endpoint with ETag fast path

The server SHALL expose `GET /fs/changes?since=<cursor>` returning
`{ cursor, reset, changes: [{ path, kind }] }` scoped exactly like the existing `/fs`
listing (including staged-session scope via the existing session query parameter). The
current cursor SHALL be served as the response `ETag`; a request whose `If-None-Match`
matches the current cursor SHALL be answered `304 Not Modified` **without any backend
store read**. Service paths (`.services/**`) SHALL never appear in change entries (same
visibility rule as the raw FS surfaces).

#### Scenario: Idle workspace costs no store reads

- **WHEN** a client polls `/fs/changes` with `If-None-Match` equal to the cursor of an
  unchanged workspace
- **THEN** the server responds 304 with no DynamoDB/DSQL/SQLite query issued for the
  request

#### Scenario: Incremental delta after a change

- **WHEN** a client polls with a valid `since` cursor after two files changed and one
  was deleted
- **THEN** the response lists exactly those three paths with kinds update/update/delete
  and a new cursor, and does not include unchanged paths

#### Scenario: Service paths stay invisible

- **WHEN** a `.services/**` path is written while a client polls `/fs/changes`
- **THEN** no change entry for that path is returned to the client

### Requirement: Client live-sync consumes the change feed

`startLiveWorkspaceSync` SHALL poll `/fs/changes` (with `If-None-Match`/`since`) instead
of fetching the full unprefixed `/fs` listing every tick. On 304 it SHALL do nothing; on
a delta it SHALL fire per-path watcher events; on `reset: true` it SHALL rebaseline
silently (observe, don't announce), preserving the existing scope-switch behaviour for
staged sessions. The poll interval SHALL remain visibility-gated (no polling for hidden
tabs).

#### Scenario: Watchers fire only for real deltas

- **WHEN** another user changes one file between two ticks
- **THEN** exactly one watcher `update` event fires for that path, and no events fire
  on ticks where the server returned 304

#### Scenario: Scope switch rebaselines

- **WHEN** the active staged-session scope changes between ticks
- **THEN** the client rebaselines against the new scope without emitting spurious
  update/delete events
