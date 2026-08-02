# file-presence

File-scoped presence over the realtime socket's `presence:<file>` topics: a user is present
in exactly one file (their active tab in a visible window), peers see a small avatar chip on
that file's surfaces only, and the legacy workspace-wide heartbeat (HTTP op, TTL record
rows, 10s client loop, SessionBar peers chip) is deleted. Presence state lives only in
socket memory — nothing is persisted, and when the socket is down there is no presence.

## ADDED Requirements

### Requirement: Presence topics keyed by file

The `presence` namespace SHALL define one topic per workspace file: `presence:<path>` where
`<path>` is the workspace-relative file path verbatim. Presence membership of a topic is the
set of users whose current focus (see focus exclusivity) is that file. Subscribing to a
topic expresses interest in its roster and does not by itself make the subscriber present
anywhere. Peers SHALL be represented as `{userId, path, lastActive}` (ISO timestamp); no
display names, cursors, or session data ride the presence payload. Native pseudo-paths
(tabs that are not workspace files) SHALL never be presence topics.

#### Scenario: Watching is not being there

- **WHEN** a connection subscribes to `presence:notes/plan.md` without publishing focus
- **THEN** it receives roster updates for that file but does not appear in any roster itself

### Requirement: Focus is exclusive per connection

A connection SHALL have at most one focused file at a time, set by publishing to its file's
topic a body `{action:"focus"}` and cleared by `{action:"blur"}`. Publishing focus on a new
topic SHALL implicitly clear the previous focus (the server emits the leave on the old
topic — clients need not send blur first). Focus publishes SHALL refresh `lastActive`.
On disconnect (clean or reaped), the server SHALL clear the connection's focus and emit the
corresponding leave.

#### Scenario: Switching files moves presence atomically

- **WHEN** a connection focused on `a.md` publishes `{action:"focus"}` to `presence:b.md`
- **THEN** subscribers of `presence:a.md` receive a leave for that user and subscribers of
  `presence:b.md` receive a join, with no interval in which the user is present in both

#### Scenario: Disconnect emits leave

- **WHEN** a focused connection closes or is reaped by keepalive
- **THEN** subscribers of its focused file's topic receive a leave for that user (unless the
  same user remains focused there via another connection)

### Requirement: Roster snapshot then deltas, deduplicated by user

On subscribing to `presence:<path>`, the server SHALL reply
`{type:"subscribed", topic, body:{peers:[…]}}` with the current roster, then push
`{type:"event"}` deltas `{kind:"join"|"leave"|"update", peer}` as membership changes.
Rosters and deltas SHALL be deduplicated to user granularity: a user with multiple focused
connections on the same file appears once, and their leave is emitted only when their last
such connection departs. The subscriber's own user SHALL be included in rosters (clients
filter self for display) so multi-window consistency is checkable.

#### Scenario: Snapshot on subscribe

- **WHEN** user B is focused on `notes/plan.md` and user A subscribes to
  `presence:notes/plan.md`
- **THEN** A's `subscribed` reply carries a roster containing exactly B's
  `{userId, path, lastActive}` entry (plus A only if A were focused there)

#### Scenario: Two windows, one chip

- **WHEN** user B focuses the same file from two windows and then closes one
- **THEN** other subscribers saw exactly one join for B and see no leave until B's second
  window also departs

### Requirement: Client presence follows the active tab and visibility

The web client SHALL derive its published focus from the active tab: a workspace-file active
tab publishes focus on that file's topic; a native-surface active tab, no active tab, or a
hidden document (`document.visibilityState !== "visible"`) publishes blur. The client SHALL
subscribe to `presence:<path>` for each open workspace-file tab and unsubscribe when the tab
closes. On socket (re)connect, the client SHALL re-subscribe its open tabs and re-announce
its current focus.

#### Scenario: Backgrounding clears presence

- **WHEN** a user with a focused file hides the window and later re-focuses it
- **THEN** peers see the user leave on hide and rejoin on return

### Requirement: Presence UI renders only on the focused file's surfaces

Peer presence SHALL render exclusively on the ux.md surface set for the file the peer is
focused on: the open tab's avatar group in the tab strip, the presence dot on that file's
sidebar tree row (only when the viewer has the file open as a tab), and — once the IW-2
editor shell exists — the editor header of that file. The viewer's own presence is never
rendered. No workspace-level presence indicator SHALL exist anywhere in the client.

#### Scenario: Chip appears only where the peer is

- **WHEN** a peer focuses `notes/plan.md` and the viewer has both `notes/plan.md` and
  `other.md` open as tabs
- **THEN** the peer's chip renders on the `notes/plan.md` tab (and its tree row dot) and on
  no other tab, tree row, or surface

### Requirement: Degradation without fallback

When the realtime socket is not open, the client SHALL render no presence anywhere and SHALL
NOT poll any HTTP endpoint for presence. The client SHALL reconnect with capped exponential
backoff indefinitely and silently (no error surface). Presence state SHALL exist only in
server socket memory and client memory — the server SHALL NOT write presence to the record
store or any other store.

#### Scenario: Socket down means no presence, quietly

- **WHEN** the socket drops while peers' chips are visible
- **THEN** all presence UI disappears, no network presence requests occur until the socket
  reopens, and no error is shown

### Requirement: Legacy heartbeat retirement

The workspace-wide presence path SHALL be deleted end to end: the `sessions.presence` tool
and its `heartbeatPresence` implementation and `presence:`-prefixed record rows
(`server/workspace/src/vcs/sessions-service.ts`), the client heartbeat loop
(`useDraftSync.ts` presence effect), `heartbeatPresence`/`PresencePeer` in
`client/web/src/lib/chat-sessions.ts`, the peers state plumbed through
`useSessionOrchestration`/`ChatDock`, and the SessionBar peers chip and drawer. Invoking
`sessions.presence` SHALL return the standard unknown-procedure error.

#### Scenario: The op is gone

- **WHEN** a client calls the `sessions` namespace with procedure `presence`
- **THEN** the server responds with the unknown-procedure error (404), and no record with a
  `presence:` key prefix exists or is written in the record store

#### Scenario: No heartbeat leaves the client

- **WHEN** the web client runs with a workspace open for several minutes
- **THEN** it issues zero HTTP requests to any presence endpoint, and
  `git grep -l heartbeatPresence` over `client/` and `server/` returns nothing
