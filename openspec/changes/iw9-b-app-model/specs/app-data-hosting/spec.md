# app-data-hosting

Hosted vs managed is the only user-facing data question (invariant 5). The
app declares which hosting modes it supports in `app.yaml` (schema field owned
by iw9-f4, like `requires[]` — D2); the installer picks at install time when
more than one is declared; single-mode apps skip the prompt. The chosen mode
is recorded on the install record and is **immutable** (invariant 10 —
changing it is export/import, not a flag). Shared-mode storage rides iw9-f2's
shared partition (external dependency); this capability owns declaration,
pick, recording, and disclosure — not partition mechanics, metering, or caps
(F2's), and not the capability card (iw9-c's).

## ADDED Requirements

### Requirement: Apps declare supported hosting modes

An app's `app.yaml` SHALL declare the data-hosting modes it supports via
iw9-f4's `hostModes` field — one or more of `managed` (data lives in a space
the user belongs to), `creator-hosted` (data lives in the installing user's
own personal space acting as host — IW-9 D1's default for group instances),
or `publisher-hosted` (data lives in the app publisher's space). Absence of a
declaration SHALL default to `managed` only. Validation of the field's shape
is the iw9-f4 loader's; this system SHALL consume the parsed declaration,
collapse `creator-hosted`/`publisher-hosted` into the single user-facing
`hosted` bucket (invariant 5: hosted-vs-managed is the *only* user-facing
data question — which of the two hosts is a displayed fact, never a third
pick), and reject an install naming a hosting bucket the app did not declare
any flavor of.

#### Scenario: Undeclared mode is uninstallable

- **WHEN** an app declares only `managed` and an install requests `hosted`
- **THEN** the install fails with 400 naming the declared modes

#### Scenario: Hosted flavor is a displayed fact, not a third pick

- **WHEN** an app declares `[managed, publisher-hosted]` and an install
  requests `hosted`
- **THEN** the install proceeds as hosted with the publisher named as host;
  the user was never asked to choose among hosting flavors, only
  managed-vs-hosted

### Requirement: The installer picks the mode when more than one is declared

When an app declares exactly one hosting mode, install SHALL proceed with it
and SHALL NOT prompt. When it declares more than one, install SHALL require
an explicit mode choice (the client presents the pick; a mode-less API call
fails with 400 listing the options). Publisher-hosted installs SHALL be
rendered loudly: the confirmation and the installed-app row both name who
hosts the data (a displayed fact, not a mode — invariant 5).

#### Scenario: Single-mode skips the prompt

- **WHEN** a user installs an app whose declaration is `[managed]`
- **THEN** the install completes without a hosting question and records
  `managed`

#### Scenario: Multi-mode requires the pick

- **WHEN** a user installs an app whose declaration is `[managed, hosted]`
  without naming a mode
- **THEN** the API answers 400 with both options, and the client renders the
  picker before retrying

### Requirement: The recorded mode is immutable

The install record SHALL carry the chosen hosting mode from creation in
iw9-f2's `hosting: "managed" | "hosted"` field (plus `hostingWorkspaceId`
when hosted, naming which flavor was declared), and no procedure SHALL
mutate either. Moving data between modes SHALL be a new install plus
export/import (out of scope here), never a flag flip.

#### Scenario: No mutation path exists

- **WHEN** any update/configure operation on an install attempts to change
  the hosting mode
- **THEN** the operation fails with 400 stating the mode is immutable at
  creation

#### Scenario: Mode recorded at creation

- **WHEN** an install completes with mode `hosted`
- **THEN** the install record carries `hosted` and the hosting workspace's
  identity, and listing installs surfaces both
