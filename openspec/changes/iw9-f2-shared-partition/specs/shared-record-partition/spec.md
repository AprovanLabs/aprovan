# shared-record-partition — delta spec (iw9-f2-shared-partition)

Shared app-data partitions: a SHARED record-scope shape and file-plane
partition alongside the existing per-app-per-user shape, ACL'd by an
instance's participant list. Grounded in IW-9 invariants 3, 4, 5, 10 and
decisions D1/D2/D22.

## ADDED Requirements

### Requirement: Shared scope-key grammar

The record store SHALL accept a shared scope shape
`app#<id>#shared#<instanceId>` alongside the existing
`app#<id>#u#<sub>`, where `<id>` is the app ULID (origin-hosted) or install
ULID (installed) — the same `<id>` used by per-user scopes — and
`<instanceId>` is a platform-minted ULID naming one shared instance of that
app. The matching file-plane partition SHALL be
`.apps/<id>/shared/<instanceId>/…`, alongside `.apps/<id>/data/<sub>/…`. The
literal segments `u` and `shared` are the only scope discriminators after the
app id; no other discriminator SHALL be accepted. Caller-supplied scopes
remain confined by `assertCallerScope` exactly as today: `svc#` stays
unreachable and `user#` stays self-addressed.

#### Scenario: Shared scope stored and listed distinctly

- **WHEN** records are written under `app#A#shared#I1` and `app#A#u#S1` in the
  same tenant
- **THEN** `list` on either scope returns only that scope's keys, and
  `listScopes(tenant, "app#A#")` surfaces both scope strings

#### Scenario: Malformed shared discriminator rejected

- **WHEN** a caller addresses `app#A#team#X` or `app#A#shared#` (empty
  instance id)
- **THEN** the request fails with a 4xx error and no record is written

### Requirement: Instance record is the ACL

Each shared instance SHALL be represented by a platform-owned instance record
(stored under a reserved `svc#` scope, unreachable by callers) holding at
minimum: `instanceId`, the owning app/install `<id>`, the hosting workspace
id, the creator, creation time, and `participants` — a list of user subs.
The participant list SHALL be the sole ACL for the instance's record scope and
file partition: participants (and, per invariant 4, their agents acting as
them) read and write; everyone else is denied. Denial SHALL be
indistinguishable from absence (404, matching the existing foreign-partition
rule). Access SHALL be evaluated against the participant list at request time,
never cached beyond the request or snapshotted into grants (invariant 3).

#### Scenario: Participant reads and writes

- **WHEN** a user on the instance's participant list calls record get/set/list
  or file read/write inside the instance's shared partition
- **THEN** the call succeeds and the row's `updatedBy` names that user

#### Scenario: Non-participant denied as 404

- **WHEN** a workspace member who is not on the participant list addresses any
  key or file path inside the shared partition
- **THEN** the call fails with 404 and the response does not reveal whether
  the instance or key exists

#### Scenario: Removal takes effect at next request

- **WHEN** a user is removed from the participant list and then issues a read
  against the shared partition
- **THEN** the read is denied (404) with no restart, cache expiry, or
  re-login required

#### Scenario: Orphan scope without instance record

- **WHEN** a shared scope is addressed whose `instanceId` has no instance
  record
- **THEN** access is denied (404) for every caller — fail closed

### Requirement: Managed instances require hosting-workspace membership

For an instance whose install's hosting mode is `managed`, every participant
MUST be a member of the hosting workspace (IW-9 invariant 5). The platform
SHALL reject adding a non-member to a managed instance's participant list,
and SHALL re-check membership at access time: a participant who has left the
hosting workspace is denied even while still listed. `hosted` instances carry
no such membership requirement (invariant 5: hosted data is a promise, not an
enforcement).

#### Scenario: Non-member cannot be added to a managed instance

- **WHEN** a caller adds a user sub that is not a hosting-workspace member to
  a managed instance's participant list
- **THEN** the mutation fails with a 4xx error naming the membership
  requirement, and the list is unchanged

#### Scenario: Departed member loses managed access

- **WHEN** a listed participant's hosting-workspace membership is removed and
  they then address the managed instance's partition
- **THEN** access is denied (404)

### Requirement: Hosting mode is immutable on the install record

The install record SHALL carry a hosting-mode field (`hosted` | `managed`)
set exactly once at creation (IW-9 invariant 10). Every write path for
install records SHALL reject any change to this field on an existing record.
There SHALL be no migration path, script, or admin override that flips the
mode of existing data — changing mode is export/import into a new install.
(Precedent: the `dataScope: "workspace"` migration in
`scripts/migrate-app-records.ts` lost write attribution irrecoverably; this
capability forecloses that class of migration by construction.)

#### Scenario: Mode flip rejected

- **WHEN** an updated install record is saved whose hosting mode differs from
  the stored record's
- **THEN** the save fails with a 4xx error stating the mode is immutable, and
  the stored record is unchanged

#### Scenario: Mode fixed at creation

- **WHEN** an install record is created with hosting mode `managed`
- **THEN** every subsequent read of that record reports `managed`, and no API
  accepts a mode value for that install thereafter

### Requirement: Shared partitions are hidden from the file plane

Shared file partitions under `.apps/<id>/shared/…` SHALL be excluded from
snapshots, `vfs.list`, file search, and live-site serving exactly as per-user
partitions under `.apps/<id>/data/…` are today — the structural hidden roots
already cover `.apps` wholesale, and this capability SHALL keep that true (no
carve-out that exposes shared paths).

#### Scenario: Shared files invisible to snapshots and search

- **WHEN** a snapshot or file listing is produced for a workspace containing
  `.apps/A/shared/I1/notes.md`
- **THEN** no path under `.apps/A/shared/` appears in the result

#### Scenario: Shared files never served over HTTP

- **WHEN** the live app site is asked for a path under `.apps/<id>/shared/`
- **THEN** the request is refused as non-servable

### Requirement: Audited admin access to shared partitions

App admins SHALL be able to inspect shared partitions only through the
`apps.data*` procedure family, extended with: an instance-listing operation
(instances of an app, with participant lists), and `instance`-addressed
variants of key-listing, record-get, and file-read (mutually exclusive with
the existing `user` argument). Every such call SHALL require app-admin role,
SHALL be denied to non-admins with 403, and SHALL append an audit row naming
the caller, the app id, the instance id, and the key/path touched — matching
the existing per-user `apps.data*` audit behavior. Per invariant 4, this
audited path is the ONLY way a non-participant (including the app's publisher
and admins) reaches shared-instance data.

#### Scenario: Admin reads a shared record, audited

- **WHEN** an app admin fetches a record by instance id and key through the
  admin procedure
- **THEN** the value is returned and an audit row records caller, app,
  instance, and key

#### Scenario: Non-admin denied

- **WHEN** a workspace member without the app-admin role calls any shared
  admin operation
- **THEN** the call fails with 403 and no audit "success" row is written

#### Scenario: No unaudited side door

- **WHEN** an admin who is not a participant addresses the shared partition
  directly via record or file procedures (not `apps.data*`)
- **THEN** access is denied (404) like any other non-participant
