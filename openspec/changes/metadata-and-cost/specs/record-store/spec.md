# record-store

Moves platform subsystems' accumulated state off the file plane into `IRecordStore`
(`registry/apps/workspace/src/records.ts`), extending `registry/docs/app-data.md`'s
normative rule — "files are authored; records are accumulated" — from app data to the
platform's own `.services/**` state. Adds the DSQL record backend.

## ADDED Requirements

### Requirement: The record rule covers platform subsystems

Platform subsystems SHALL NOT persist accumulated state as VFS files. The `.services/**`
file namespace is retired for state (registrations, run/session/job records, cursors,
settings); each subsystem addresses the record store under a reserved system scope
namespace `svc#<subsystem>` within its workspace tenant (the `svc#` prefix is disjoint
from `ws` and `app#...` scopes, so app sessions can never address it). The subsystems in
scope, with their current file prefixes, are:

1. chat sessions (`.services/chat/sessions/<id>.json`)
2. chat transcripts (`.services/chat/sessions/<id>/messages.json`)
3. VCS refs (`.services/vcs/refs`)
4. VCS commits (`.services/vcs/commits`)
5. VCS snapshots (`.services/vcs/snapshots`)
6. VFS mounts (`.services/vcs/mounts.json`)
7. app registrations (`.services/apps/*`)
8. app installs (`.services/apps/installed`)
9. agent definitions (`.services/agents/*`)
10. agent runs (`.services/agents/_runs`)
11. sandbox registrations (`.services/sandboxes/*`)
12. sandbox hosts (`.services/sandboxes/hosts`)
13. sandbox runs (`.services/sandboxes/runs`)
14. sandbox defaults (`.services/sandboxes/defaults`)
15. workflow registrations (`.services/workflows/*`)
16. workflow cron cursors (`.services/workflows/cron-workspaces`)
17. events append-logs (`.services/events/*`)
18. webhook registrations + secrets (`.services/webhooks/*`)
19. sync state (`.services/sync/*`)
20. LLM jobs (`.services/llm-jobs/*`)
21. workspace settings (`.services/workspace`)
22. legacy keyvalue + interface bindings (`.services/keyvalue/*`, `.services/bindings`)
    — deleted or migrated only; bindings die with WS-3 Profiles, so they get a
    tombstone read path, not a new home.

Staged-session shadow *content* (`.services/chat/sessions/<id>/files/**`) is file
content by nature (hash-addressed staged versions of authored files) and SHALL remain
on the FS store, unversioned per the fs-metadata-store spec.

#### Scenario: No subsystem writes service files

- **WHEN** the full workspace test suite exercises chat, apps, agents, sandboxes,
  workflows, webhooks, sync, events, and LLM jobs
- **THEN** no new `.services/**` paths are created on the FS store except staged-session
  shadow content, and each subsystem's state is readable through the record store under
  its `svc#<subsystem>` scope

#### Scenario: App sessions cannot reach system scopes

- **WHEN** an app session attempts to address a `svc#`-prefixed scope through any
  keyvalue/records surface
- **THEN** the request is rejected; app sessions remain confined to their
  `app#<name>#u#<sub>` partition

### Requirement: Transcripts append as per-message records

Chat transcripts SHALL be stored one record per message
(scope `svc#chat#session#<id>`, key = zero-padded sequence + message id), so appending
messages writes only the new/replaced message rows plus the session record — never a
full-transcript rewrite. Reads reassemble the transcript by ordered key listing.
Idempotent re-sends (same client message id) SHALL replace the existing message row in
place, preserving its position. Deleting a session SHALL delete its message records and
shadow content.

#### Scenario: Append cost is O(messages appended)

- **WHEN** a session already holds 500 messages and the client appends 2 new ones
- **THEN** exactly the 2 message records (plus the session record) are written, and a
  subsequent read returns all 502 in order

#### Scenario: Idempotent re-send replaces in place

- **WHEN** the client re-sends the transcript tail containing an already-stored message
  id with edited content
- **THEN** the stored message is replaced at its original position and the message
  count is unchanged

### Requirement: DSQL record backend

A `RecordStoreDsql` backend SHALL implement `IRecordStore` (get/set/delete/list/
listScopes, TTL expiry semantics, >350KB S3 value spill under the existing `records/`
prefix) against Aurora DSQL, selected by the same three-way backend switch as the FS
store. `listScopes` SHALL be an indexed query (tenant + scope prefix), removing the
Dynamo backend's full-table-scan exception. Expired rows SHALL be excluded from reads
and reaped by a periodic sweep (DSQL has no native TTL).

#### Scenario: DSQL backend passes the record contract suite

- **WHEN** the existing record store test suite (scope isolation, prefix listing,
  expiry, large-value spill) runs against `RecordStoreDsql`
- **THEN** all contract assertions pass identically to the SQLite and Dynamo backends

#### Scenario: listScopes without a scan

- **WHEN** `listScopes(tenant, "app#liift4#u#")` runs on the DSQL backend
- **THEN** it is served by an index on (tenant, scope) — verified by the query plan or
  by a row-touch bound in the integration test — and returns the same scopes as the
  other backends

### Requirement: Cached mounts read

`readMounts` SHALL be served from a per-workspace in-process cache once mounts move to
the record store: invalidated synchronously by mount mutations in the same process and
bounded by a short TTL (default 30s) to cover the brief two-task overlap during rolling
deploys. FS operations under mounted prefixes therefore perform no store read for mount
resolution in the steady state.

#### Scenario: Hot path reads mounts from cache

- **WHEN** 100 FS reads occur in one process within the TTL with no mount mutations
- **THEN** at most one backing-store read of the mounts record occurs

#### Scenario: Mutation invalidates immediately

- **WHEN** a mount is added and a listing under its prefix follows in the same process
- **THEN** the listing reflects the new mount without waiting for TTL expiry
