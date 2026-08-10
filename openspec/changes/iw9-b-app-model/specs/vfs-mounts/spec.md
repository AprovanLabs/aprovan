# vfs-mounts

Mounts revival (D19). The engine exists and works — `vcs/mounts.ts` (721 LOC:
git/s3 read-through, mount lineage in snapshots, 30s cache) — but
`addMount`/`removeMount` have **zero non-test callers** (verified: only the
module itself and `tests/auth-cache.test.ts` reference them). This capability
adds the missing surface: `vcs.mounts.*` procedures and a management UI. It
also gives mounts their new job: they are how an app reaches shared content
(a shared VFS backend both parties mount) and how migrated `paths[]` extras
keep working (see `app-roots`). Apps never mount apps (D19); app→app calls
stay deferred. v1 engine constraints stand: git/s3, read-only, mounted
content never enters snapshots (lineage recorded instead).

## ADDED Requirements

### Requirement: Mounts are manageable through procedures

The system SHALL expose procedures to list, add, and remove mounts —
list/add/remove over the existing engine (`readMounts`/`addMount`/
`removeMount`) — with tool schemas registered like other `vcs` verbs. Add
SHALL validate prefix shape, reject a prefix that shadows an existing app
root or another mount, and reject `crdt` (engine-reserved). Remove SHALL
invalidate the cache so the next read reflects it (the engine already does;
the procedure exposes it).

#### Scenario: Add then read through

- **WHEN** a member adds a git mount at `vendor/charts` pinned to a ref and
  reads `vendor/charts/README.md`
- **THEN** the read serves the repo content at that ref, and the file does
  not enter the FS store

#### Scenario: Overlapping mount rejected

- **WHEN** a mount add names a prefix inside an existing app's root that the
  app did not request, or inside another mount's prefix
- **THEN** the call fails with 409 naming the conflict

### Requirement: Apps may carry mounts under their root

An app SHALL be able to declare mounts scoped under its own root (the
migration target for retired `paths[]` extras — shared code arrives as a
mounted backend, not a path claim). App-scoped mounts SHALL be readable by
the app's sessions like any in-root path, SHALL follow the app on
promote-out and be included in install copies (re-created in the installing
workspace, pointing at the same backend), and SHALL never target another
app's root in any workspace (apps never mount apps).

#### Scenario: App reads its mounted library

- **WHEN** app `tasks` carries a mount `Apps/tasks/lib` → a git repo, and its
  session reads `lib/util.ts` (app-relative)
- **THEN** the read serves the mounted content under the app's ordinary
  path authorization

#### Scenario: App-root targets are rejected

- **WHEN** a mount add (workspace- or app-scoped) targets a backend that is
  another app's root — e.g. an s3/git location published as an app root, or a
  workspace-path backend under `Apps/`
- **THEN** the call fails with 400: shared content must be an external
  backend both parties mount, never an app

### Requirement: Mounts have a management UI

The client SHALL surface mounts: list existing mounts with prefix, type,
backend, pinned ref/version, and creator; add a mount via a form (git repo +
ref + optional subpath, or s3 bucket/prefix); remove with confirmation.
Mounted subtrees in the file tree SHALL be visually marked as mounted
(read-only badge), and mount-lineage on commits remains untouched (owned by
the engine and iw9-a's scope filtering).

#### Scenario: Mounted subtree is marked

- **WHEN** the file tree renders a workspace containing a mount at
  `vendor/charts`
- **THEN** `vendor/charts` shows a mount marker and its entries are not
  editable

#### Scenario: Add via UI

- **WHEN** a member adds a git mount through the mounts UI
- **THEN** the mount appears in the list and the tree without reload, backed
  by the `vcs.mounts.*` procedures
