# app-roots

Root-per-app `Apps/` tree. An app's path binding is exactly one directory —
`Apps/<slug>` — replacing the arbitrary `entry` + `paths[]` binding
(`apps/store.ts:95-100`). The root is derived from the app's location, never
declared; extra prefixes are retired in favor of VFS mounts (D19, see
`vfs-mounts`). Overlap validation, which does not exist today
(`apps/service.ts:468-491` only dedupes), is added: no app root may nest
inside or contain another app's root. Manifest authored fields live in
`app.yaml` at the app root, parsed by the iw9-f4 loader (external dependency);
this capability consumes the loader, it does not define the schema.

## ADDED Requirements

### Requirement: Every app occupies exactly one root under Apps/

An app's path binding SHALL be a single directory `Apps/<slug>` in the owning
workspace's VFS. The manifest SHALL NOT carry an `entry` path or a `paths[]`
list; the serving entrypoint and served prefixes SHALL all be derived from the
root. The live site and app sessions SHALL both authorize against the root
alone (one prefix rule, two consumers — the invariant `appPathAllowed`
enforces today, narrowed to one prefix).

#### Scenario: Publish binds the root, nothing else

- **WHEN** an app is published from `Apps/tasks`
- **THEN** its binding is exactly `Apps/tasks`; the stored manifest record
  carries no `paths` array, and vfs/keyvalue calls from its sessions resolve
  against `Apps/tasks` plus the app's data partition only

#### Scenario: Content outside the root is not the app's

- **WHEN** an app session addresses a workspace path outside its root, its
  data partition, and its mounts
- **THEN** the call is denied exactly as a foreign path is denied today

### Requirement: App roots never overlap

The system SHALL reject (409) any operation that would make one app's root
equal to, contain, or be contained by another app's root in the same
workspace — publish, promote-out, install materialization, and root rename
(`mv`) included. Validation SHALL run server-side against the current set of
app roots, not client-side.

#### Scenario: Nested publish rejected

- **WHEN** `Apps/crm` is an existing app's root and a publish attempts to
  create an app rooted at `Apps/crm/reports`
- **THEN** the operation fails with 409 naming the conflicting app

#### Scenario: Containing publish rejected

- **WHEN** apps exist at `Apps/crm/reports` (hypothetically) and a publish
  attempts `Apps/crm`
- **THEN** the operation fails with 409 (containment checked in both
  directions)

### Requirement: app.yaml at the root is the authored manifest

The manifest's authored fields (slug, title, icon, description, capabilities,
requires, host modes — schema owned by iw9-f4) SHALL be read from
`Apps/<slug>/app.yaml` via the iw9-f4 loader. The platform-owned record
(`svc#apps/<appId>`) SHALL hold only identity and derived state and SHALL NOT
duplicate authored fields as sources of truth. Editing `app.yaml` through
ordinary vfs writes SHALL be the way authored fields change; a reconcile step
SHALL surface validation errors without corrupting the stored record.

#### Scenario: Title change is a file edit

- **WHEN** a user edits `title:` in `Apps/tasks/app.yaml` and the app is next
  served or listed
- **THEN** the new title is reflected, with no separate `apps.update`-style
  manifest call

#### Scenario: Invalid app.yaml does not break the app record

- **WHEN** `app.yaml` is saved with a schema violation
- **THEN** the platform record retains its last-good derived state and the
  validation error is surfaced to the author (reconcile status), not thrown
  at app users

### Requirement: paths[] extras are retired in favor of mounts

The system SHALL NOT accept extra path prefixes on publish or update. Shared
content between apps SHALL be expressed as a mount under the consuming app's
root (see `vfs-mounts`). A migration SHALL convert each existing manifest's
`paths[]` entries beyond the root into mounts, and a grep gate SHALL confirm
no `paths` binding remains in app-model server code.

#### Scenario: Publish with extra paths rejected

- **WHEN** a publish names path prefixes beyond the app root
- **THEN** the request fails with 400 pointing at mounts as the mechanism

#### Scenario: Migrated app keeps reading its extras

- **WHEN** the migration converts an app whose manifest listed
  `["Apps/tasks", "shared/lib"]`
- **THEN** the app's root is `Apps/tasks`, `shared/lib` is reachable through
  a mount recorded under the app's root, and the app's reads of
  `shared/lib/**` succeed as before
