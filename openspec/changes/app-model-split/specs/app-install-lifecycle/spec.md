# app-install-lifecycle

Installing, updating, configuring, forking, and discovering apps. The origin workspace is the
source of truth for releases; an installation is a fork pinned to a release or channel with
editing disabled by default. `visibility: public` makes an app installable
deployment-wide via a directory served by the workspace server. The registry is never
involved; cross-deployment sharing is out of scope (future: inert bundle export/import).

## ADDED Requirements

### Requirement: Any installable app can be installed

`apps.install` SHALL accept any app that is `visibility: public`, or any app of the caller's
own workspace regardless of visibility, addressed by `appId` (alias accepted at the edge and
resolved). The `dataScope: "workspace"`-only restriction is deleted along with the `dataScope`
field itself: using an app in place (the origin hosts it) and installing it (your workspace
hosts your copy's data) are the two modes, chosen by the consumer, not by the manifest.

#### Scenario: Installing a public app from another workspace

- **WHEN** workspace B installs a `visibility: public` app owned by workspace A
- **THEN** the install succeeds, mints an installation (see app-identity), pins the origin's
  current live-channel release, and B's app sessions store data in B

#### Scenario: Private apps are not installable elsewhere

- **WHEN** workspace B attempts to install a `visibility: private` app owned by workspace A
- **THEN** the install fails with 404 (no existence oracle for private apps)

### Requirement: Installs pin a release or channel and update explicitly

An installation SHALL record a pin: either a fixed release id or a channel name (default: the
`live` channel). The system SHALL expose an update operation that re-resolves the pin against
the origin (channel pin → the channel's current release; release pin → an explicitly named
newer release) and reports what changed. Installations SHALL never update implicitly.

#### Scenario: Channel-pinned install updates on demand

- **WHEN** the origin cuts a new release on `live` and the installer runs `apps.update`
- **THEN** the installation's resolved release moves to the new release and the response
  reports old → new; before `apps.update` runs, the installation keeps serving the prior
  release

#### Scenario: Origin removed

- **WHEN** the origin app is removed and the installer runs `apps.update` or lists installs
- **THEN** update fails with a clear "origin unavailable" error, the installed list flags
  `available: false`, and the installation keeps working from its pinned content

### Requirement: Installations carry per-install config

An installation SHALL hold a `config` JSON object, settable at install time and via
`apps.configure`, exposed to the app session (read-only) through its SDK/context. Config
SHALL be independent per installation and survive updates.

#### Scenario: Config survives update

- **WHEN** an installer sets config and later updates the installation's release
- **THEN** the config value is unchanged after the update

### Requirement: Installs are forks with editing off by default

An installation SHALL default to `editing: false`: its source is served from the origin's
pinned release content and is not editable in the installing workspace. Enabling editing
SHALL materialize the pinned release's source files into the installing workspace under the
installation's own prefix, after which the installation behaves as an app of its own (its own
releases may be cut) while retaining `originAppId` lineage; the update-from-origin flow SHALL
then require explicit confirmation that local edits are overwritten (or be refused).

#### Scenario: Default install has no editable source

- **WHEN** a workspace installs an app without enabling editing
- **THEN** no source files are copied into the installing workspace and edits to the app's
  source paths are not possible there

#### Scenario: Enabling editing materializes a fork

- **WHEN** the installer enables editing on an installation
- **THEN** the pinned release's files are written under the installation's prefix in the
  installing workspace, lineage is retained, and the app serves from the local copy

### Requirement: The workspace server serves a deployment-wide directory

The system SHALL expose a directory listing every `visibility: public` app across the
deployment's workspaces — id, alias, title, description, origin workspace, declared
dependencies, and current live release — plus the caller's own workspace's private apps. The
directory SHALL be served by the workspace server (one aggregated call), and installing from
a directory entry SHALL be a single follow-up call. The registry SHALL NOT be consulted or
informed.

#### Scenario: Public app appears in every workspace's directory

- **WHEN** workspace A publishes an app with `visibility: public` and workspace B opens the
  directory
- **THEN** the app is listed for B with its dependencies and install affordance; flipping it
  back to private removes it from B's directory (and new installs), without touching B's
  existing installation

#### Scenario: Directory is deployment-scoped only

- **WHEN** the directory is served
- **THEN** it contains only apps of this deployment's workspaces; no registry/catalog call is
  made (cross-deployment sharing, if ever, is inert bundle export/import — not in scope)
