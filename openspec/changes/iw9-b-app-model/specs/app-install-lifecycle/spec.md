# app-install-lifecycle (delta)

Install becomes a **copy** (D8): the app archive — manifest (`app.yaml`) +
folder — is copied into the installer's workspace at install time, pinned to
the release it came from. This replaces `app-model-split`'s
reference-and-pin + serve-from-origin model (`apps/install.ts:4-5` states
"reference + pin (never a manifest copy)"; `routes/live-apps.ts:119-126` and
`routes/apps.ts:115-120,169-171` resolve `install.originWorkspaceId` at
request time — all replaced). Updates surface as "v(N) available → copy
again"; publisher push-to-all is deliberately given up. Release identity
comes from iw9-a's release-as-tag interface (a release = a tagged commit,
D10); where sequencing forces it, the pin records the commit id, which exists
regardless of A's landing. Hosting-mode choice at install is specified in
`app-data-hosting`. The `editing: true` fork flag dissolves: every install is
materialized, so "editing" is just editing.

## MODIFIED Requirements

### Requirement: Installs pin a release or channel and update explicitly

An installation SHALL record the release it was copied from as a pin — a
release tag (iw9-a's release-as-tag) or, minimally, the underlying commit id.
The system SHALL expose an update check that compares the pin against the
origin's current release and reports "v(N) available"; applying an update
SHALL be an explicit **copy-again** (a fresh archive copy replacing the
installed folder, config and data preserved). Installations SHALL never
update implicitly, and the origin SHALL have no push-to-installs path of any
kind.

#### Scenario: Update is an explicit re-copy

- **WHEN** the origin cuts a new release and the installer applies the
  offered update
- **THEN** the installed folder's content is replaced by a fresh copy of the
  new release, the pin moves to it, and the response reports old → new;
  until the installer acts, the installation serves its existing copy

#### Scenario: Origin removed

- **WHEN** the origin app or its workspace is deleted and the installer opens,
  serves, or lists the installation
- **THEN** everything keeps working from the installed copy; only the update
  check reports the origin unavailable

### Requirement: Installs are copies owned by the installer

An installation SHALL be created by copying the pinned release's archive —
`app.yaml` and the app root folder — into the installing workspace under its
own `Apps/<slug>` root (overlap-validated per `app-roots`; on slug collision
the install requires an explicit slug choice). The copy SHALL be the serving
source: no request-time reads from the origin workspace for manifest or
content. App-scoped mounts SHALL be re-created in the copy pointing at the
same backends. The installation retains `originAppId` lineage and its own
installId-keyed data partitions. Local edits are ordinary edits to the copy;
the update flow SHALL then require explicit confirmation that local edits
are overwritten (or be refused).

#### Scenario: Install copies the archive

- **WHEN** workspace B installs app `tasks` from workspace A
- **THEN** B holds `Apps/tasks/app.yaml` and the app files as its own VFS
  content, and subsequent serving reads only from B

#### Scenario: No request-time origin reads

- **WHEN** an installed app's page or tool call is served
- **THEN** no read against the origin workspace occurs (origin contact is
  limited to explicit install/update-check operations)

#### Scenario: Local edits guard the update

- **WHEN** the installer edited the copy and then applies an update
- **THEN** the flow demands explicit confirmation that local edits are
  overwritten, or refuses

## REMOVED Requirements

### Requirement: Installs are forks with editing off by default

**Reason**: D8 — every install is a materialized copy, so the
`editing: false` serve-from-origin state and the `editing`/`prefix`
fork-materialization machinery (`apps/install.ts:262-296`, `installedScope`'s
origin-paths branch at `install.ts:118-125`) no longer describe anything.

**Migration**: existing installs are materialized by the migration work
stream: for each install record, copy the resolved release's content into the
installer's workspace (the existing `materializeFork` logic is the seed),
set the pin from `resolvedRelease`, and drop `editing`/`prefix`; installs
whose origin is already gone and that never materialized are flagged broken
in the install list rather than silently dropped.
