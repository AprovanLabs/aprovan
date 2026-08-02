# app-identity

The App/AppInstallation split. An **App** is the installable unit — manifest, releases,
channels, declared dependencies — owned by its origin workspace and identified by a ULID
minted at creation. An **AppInstallation** is a workspace binding of an app — its own ULID,
an `originAppId` lineage pointer, a pin, profile bindings, and config. `(workspaceId, name)`
is a mutable alias used only for URLs and display. All storage is ID-keyed; nuke-and-reseed —
no rename migrations, no name-keyed back-compat.

## ADDED Requirements

### Requirement: Every app has a ULID identity minted at creation

The system SHALL mint a ULID (`appId`) when an app is first published and SHALL use that id
as the app's durable reference in every stored key: the manifest record, release records,
usage counters, per-user record scopes (`app#<appId>#u#<sub>`), and per-user file-partition
roots. The `appId` SHALL never change for the life of the app.

#### Scenario: Publish mints an id

- **WHEN** `apps.publish` creates an app that did not previously exist
- **THEN** the response carries a new ULID `appId`, and the manifest record is stored under a
  key derived from that id, not from the name

#### Scenario: Republishing does not remint

- **WHEN** `apps.publish` updates an existing app (matched via its alias or id)
- **THEN** the stored `appId` is unchanged

### Requirement: The name is a mutable alias, resolved at the edge

`(workspaceId, name)` SHALL function only as an alias for URLs and display. The system SHALL
maintain a name→appId alias index per workspace, SHALL reject a publish whose name collides
with a different app's current alias in the same workspace, and SHALL allow renaming an app
by publishing under a new name with the same identity. Alias resolution SHALL happen at the
service/route edge; no storage key SHALL embed the name.

#### Scenario: Rename moves no storage

- **WHEN** an app with releases, per-user record scopes, and per-user file partitions is
  renamed
- **THEN** the app resolves under its new name, every release and every user's data remain
  readable unchanged, and no record or file key was rewritten

#### Scenario: Rename does not break installs

- **WHEN** an app installed into another workspace is renamed in its origin workspace
- **THEN** the installation (which references `appId`) continues to resolve the app, its
  releases, and its updates

#### Scenario: Alias collision is rejected

- **WHEN** `apps.publish` names an alias currently held by a different `appId` in the same
  workspace
- **THEN** the publish fails with 409 naming the holder

### Requirement: Installations and forks mint their own identity with lineage

The system SHALL give every AppInstallation its own ULID (`installId`) plus an `originAppId`
pointing at the app it was installed or forked from. Installation records SHALL be stored in
the installing workspace under keys derived from `installId`. Lineage SHALL be reported on
the wire (directory, installed list, app detail) so a fork can always answer "installed
from where".

#### Scenario: Install mints identity and lineage

- **WHEN** a workspace installs an app
- **THEN** the install record carries a fresh ULID and `originAppId` equal to the origin
  app's `appId`, and is keyed by the fresh ULID

#### Scenario: Two installs of the same app are distinct

- **WHEN** the same app is installed into two workspaces (or twice into one workspace after
  uninstall)
- **THEN** each installation has a distinct `installId`, distinct storage, and independent
  pins and config

### Requirement: Live URLs keep the alias form with an id permalink

The live app surface SHALL continue to serve `/apps/:workspaceId/:name` by resolving the
alias at the route, and SHALL additionally serve an id-addressed permalink
(`/apps/id/:appId`) that survives renames. The id form SHALL be reported in `apps.get` so
clients can offer durable links.

#### Scenario: Alias URL after rename

- **WHEN** an app is renamed and its old alias URL is requested
- **THEN** the old alias answers 404 and the new alias serves the app

#### Scenario: Permalink survives rename

- **WHEN** the id permalink of a renamed app is requested
- **THEN** it serves the app

### Requirement: Nothing name-keyed remains, and nothing is migrated

The system SHALL NOT read or write any name-keyed app storage (record scopes
`app#<name>#…`, `svc#apps / <name>` manifests, `svc#apps#releases#<name>`, install keys
`<owner>.<name>`). Pre-existing name-keyed data SHALL be ignored (nuke-and-reseed): no
dual-read, no migration path, no legacy-shape rebinding (the `readApp` legacy folder-shape
resolution is deleted with it).

#### Scenario: Grep gate for name-keyed scopes

- **WHEN** the server source is searched for name-derived app storage keys
- **THEN** every app record scope and release scope is built from `appId`, and the
  repository-level verify (`grep`) finds no `app#<name>` construction

#### Scenario: Registry stays app-ignorant

- **WHEN** an app or installation id is used as a profile-grant subject
- **THEN** it is passed to `@aprovan/registry-server` as an opaque
  `{kind: "app", id: <ulid>}` subject, and no app schema, name, or manifest crosses the
  boundary
