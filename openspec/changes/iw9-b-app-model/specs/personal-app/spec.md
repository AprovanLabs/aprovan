# personal-app

Personal is a **real app row** (D7): a stored manifest with a real root
(`Apps/personal`), real storage, and a first-class **promote-out** operation.
This deliberately differs from `app-model-split`'s deletion of the Personal
*pseudo-app*: what that change removed — and stays removed — is a
*synthesized* manifest (`apps/personal.ts`, client-side `builtin` synthesis,
triplicated `.personal` literals) that existed only in code and could never be
promoted, exported, or reasoned about as an app. What this change adds is an
ordinary app row that happens to be created by the platform: it lives in the
store like any app, its widgets/flows live under its root like any app's, and
its whole purpose is that content **promotes out** of it into standalone apps.
No `isPersonalApp` branches return; the per-user-space grep gates
(`PERSONAL_APP_NAME`, `PERSONAL_PREFIX`, `.personal`, `isPersonalApp`) keep
passing.

## ADDED Requirements

### Requirement: Personal is a stored app row, not a synthesis

Each workspace SHALL have at most one Personal app: a real stored manifest
with slug `personal`, rooted at `Apps/personal`, created lazily the first
time a one-off widget or flow needs a home (not eagerly at workspace
creation). It SHALL appear in `apps.list` as an ordinary row, be served like
any app, and own its data partition like any app. The system SHALL NOT
special-case it in authorization, listing, or serving code paths.

#### Scenario: Lazy creation on first one-off

- **WHEN** a user saves their first one-off widget in a workspace with no
  Personal app
- **THEN** a Personal app row is created (platform-assigned ULID, slug
  `personal`, root `Apps/personal`), the widget lands under its root, and
  `apps.list` now includes it

#### Scenario: No synthesis, no special-casing

- **WHEN** server and client sources are searched for `PERSONAL_APP_NAME`,
  `PERSONAL_PREFIX`, `.personal`, or `isPersonalApp`
- **THEN** no match exists — Personal reaches every surface through the same
  code paths as any stored app

### Requirement: Promote-out is a first-class operation

The system SHALL expose a promote operation ("make this its own app") that,
given a subtree of the Personal app's root (or the whole root's content for a
named widget/flow), atomically: (1) moves the VFS subtree to a new
`Apps/<slug>` root, (2) has the platform assign a new appId (via the iw9-f4
identity flow — first sight of a new app root), and (3) points the chosen
slug at the new app. The operation SHALL run overlap validation
(`app-roots`) before moving, SHALL preserve file content byte-for-byte, and
SHALL be all-or-nothing: on any failure the Personal subtree is unchanged.

#### Scenario: Promote moves, mints, and re-points

- **WHEN** a user promotes `Apps/personal/budget` to slug `budget`
- **THEN** the files now live at `Apps/budget`, a new appId exists for the
  new root, `Apps/personal/budget` is gone, and opening `budget` from the
  launcher serves the moved content

#### Scenario: Promote is atomic under failure

- **WHEN** promotion fails after validation (e.g. the move is interrupted or
  the slug is taken mid-flight)
- **THEN** no partial state remains: the subtree is intact under
  `Apps/personal`, and no orphan app row or half-moved root exists

#### Scenario: Promoted app is independent

- **WHEN** an app promoted out of Personal is later shared, installed, or
  renamed
- **THEN** it behaves identically to an app authored directly at its own
  root; nothing links it back to Personal
