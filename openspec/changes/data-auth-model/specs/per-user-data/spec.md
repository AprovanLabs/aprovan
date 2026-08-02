# per-user-data

Per-user private data partitions — the synthesized Personal app's partition rule
(`.personal/data/<sub>/…`, record scope `app#personal#u#<sub>`) generalized into an enforced
authorization boundary covering every per-user file partition (`<appRoot>/data/<sub>/…` included),
on both the tool plane (`vfs.*`) and the HTTP file plane (`/fs/*`).

## ADDED Requirements

### Requirement: Foreign partition access is denied, not hidden

The system SHALL deny read, write, and delete of any exact path inside another user's data
partition with **404 Not found** — indistinguishable from a nonexistent path. A user's data
partition is any path under `.personal/data/<sub>/` or under a published app's
`<paths[0]>/data/<sub>/` where `<sub>` is not the caller's subject. Enforcement MUST apply on the
`vfs` service (`read`, `write`, `delete`), the HTTP file plane (`GET/PUT/DELETE /fs/*path`), and
version-pinned reads (`hash` parameter). Enforcement MUST hook above the `IFsStore` interface
(store backends are being replaced by WS-5 and carry no principal).

#### Scenario: Exact-path read of another member's personal file

- **WHEN** member B calls `vfs.read` or `GET /fs/.personal/data/<A>/notes.md` where A ≠ B
- **THEN** the response is 404 Not found, byte-identical in shape to a read of a path that does
  not exist

#### Scenario: Exact-path write and delete of a foreign partition

- **WHEN** member B calls `vfs.write`, `vfs.delete`, `PUT /fs/...`, or `DELETE /fs/...` on a path
  under `apps/<app>/data/<A>/` where A ≠ B
- **THEN** the operation is rejected with 404 and no file content or version row is created,
  modified, or removed

#### Scenario: Version-pinned read is equally guarded

- **WHEN** member B requests `vfs.read { path, hash }` or `GET /fs/<path>?hash=<h>` for a path in
  A's partition, using a hash learned from any source
- **THEN** the response is 404 regardless of whether the version exists

### Requirement: Owners have full access to their own partition

The system SHALL allow the partition owner unrestricted read, write, and delete within their own
partition, and app sessions SHALL continue to reach their own per-(app, user) partition through
the existing app-scope confinement unchanged.

#### Scenario: Owner reads and writes their own private files

- **WHEN** member A reads, writes, or deletes a path under `.personal/data/<A>/`
- **THEN** the operation succeeds exactly as for any workspace file

#### Scenario: App session addresses its own partition

- **WHEN** an app session for user U calls its native namespaces (vfs relative paths, keyvalue)
- **THEN** its data resolves to its own `app#<name>#u#<U>` record scope and `<appRoot>/data/<U>`
  file partition exactly as before this change

### Requirement: Listings include the caller's own partition

`vfs.list` and `GET /fs?prefix=` SHALL include entries under a hidden data partition when the
partition owner is the caller, and SHALL continue to omit all other users' partitions. The chat
file tree SHALL surface the caller's personal partition as a distinct "Private" section.

#### Scenario: Member lists the workspace root

- **WHEN** member A lists the workspace with no prefix
- **THEN** entries under `.personal/data/<A>/` are present, and no entry under any other user's
  partition (personal or app) appears

#### Scenario: Private section renders in the chat file tree

- **WHEN** member A opens the chat client file tree and their partition contains files
- **THEN** a Private section shows those files, and an empty partition shows the visible-only-to-
  you hint instead of nothing

### Requirement: Admin access to app file partitions is explicit and audited

The system SHALL extend the audited `apps.data` procedure to cover file partitions
(`<appRoot>/data/<user>/…`), gated on the app's admin role, writing an audit entry per access.
Personal partitions (`.personal/data/**`) SHALL have **no** admin override: no procedure serves
another user's personal data, and ambient reads remain 404 for every caller including workspace
admins.

#### Scenario: App admin reads a user's app file through apps.data

- **WHEN** a caller holding the app's admin role invokes `apps.data` naming the app, a user, and a
  file path within that user's partition
- **THEN** the content is returned and an audit record is written identifying the caller, app,
  target user, and path

#### Scenario: Non-admin is refused by apps.data

- **WHEN** a caller without the app's admin role invokes `apps.data`
- **THEN** the call fails with 403 naming the required role, and no audit-read occurs

#### Scenario: No admin override for personal data

- **WHEN** a workspace admin attempts to read `.personal/data/<other>/…` via any procedure or
  file API
- **THEN** the file APIs answer 404 and `apps.data` rejects the personal app with an error stating
  personal data has no admin override

### Requirement: Snapshots, commits, and restores never leak partitions

VCS snapshots SHALL continue to exclude all per-user data partitions, and `vfs.restore` SHALL
never create files inside any user's partition. Commit-pinned reads (`commit` parameter) SHALL
resolve only paths present in the snapshot and therefore never serve partition content.

#### Scenario: Commit over a workspace with private files

- **WHEN** any member commits (`vfs.commit`) while user partitions contain files
- **THEN** the resulting snapshot manifest contains no path under any data partition

#### Scenario: Restore cannot resurrect foreign data

- **WHEN** a member runs `vfs.restore` against any commit with any path/prefix filter
- **THEN** no write lands under `.personal/data/**` or any `<appRoot>/data/**` path

### Requirement: Access pane partition language reflects enforcement

`apps.capabilities` partitioning descriptions SHALL state that per-user partitions are
read-enforced (readable only by the owning user, with app-admin access via the audited procedure)
— only after enforcement ships, and the Personal app's synthesized manifest SHALL carry the same
truthful description.

#### Scenario: Capabilities string after enforcement

- **WHEN** `apps.capabilities` is invoked for an app using per-user vfs or keyvalue partitions
- **THEN** the partition description states owner-only access and names the audited admin
  procedure, with no claim reducible to "hidden from listings"
