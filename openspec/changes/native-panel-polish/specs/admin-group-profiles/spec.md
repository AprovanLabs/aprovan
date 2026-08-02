# admin-group-profiles — delta spec

## ADDED Requirements

### Requirement: Group detail exposes profile membership

The Admin panel's group detail SHALL show the profiles attached to the selected group
(from `GET /groups/:id/profiles`), SHALL let an admin attach a profile chosen from the
workspace profile listing (`GET /profiles` → `POST /groups/:id/profiles`), and SHALL let an
admin detach one (`DELETE /groups/:id/profiles`) with an armed confirmation. Attach is
idempotent in the UI: re-attaching an already-attached profile is treated as success.

#### Scenario: Attach grants through the picker

- **WHEN** an admin selects a group, opens the attach picker, and chooses a workspace
  profile
- **THEN** the panel POSTs the profile reference to `/groups/:id/profiles` and the group's
  profile list shows the attached profile with its name, target, and credential label

#### Scenario: Detach removes the grant

- **WHEN** an admin arms and confirms detach on an attached profile
- **THEN** the panel DELETEs the attachment and the row disappears; detaching a profile that
  was already removed surfaces the server's not-attached response as a non-fatal inline
  message

### Requirement: Profile features feature-detect the storage backend

The Admin panel SHALL treat a 501 from the profile routes as "unavailable on this
deployment", rendering the panel-conventions unavailable state in the Profiles section and
hiding attach/detach affordances. Members, groups, and access management SHALL remain fully
functional in that state.

#### Scenario: Dynamo deployment degrades calmly

- **WHEN** the deployment runs the interim dynamo backend and `GET /groups/:id/profiles`
  answers 501
- **THEN** the Profiles section shows a calm explanatory card (no error styling, no status
  code), no attach control renders, and the rest of the Admin panel works unchanged

### Requirement: The Admin panel is professional and dense

The Admin panel SHALL be reworked to the shared conventions: tabbed layout (Members, Groups,
Access), dense tables rather than nested cards, master-detail group management, armed
destructive actions, and copy per panel-conventions (including renaming the "Tool grants"
tab per the ux.md decision). The backing routes (`/members`, `/groups`, `/permissions`) are
unchanged.

#### Scenario: Same admin surface, new presentation

- **WHEN** an admin performs each existing operation (list/remove member, create/rename/
  delete group, add/remove group user, list/revoke access grant) in the reworked panel
- **THEN** each operation calls the same route with the same payload as before, and every
  destructive action requires an armed second click instead of a browser dialog

#### Scenario: Non-admins are turned away kindly

- **WHEN** a non-admin reaches the Admin surface by deep link
- **THEN** the panel renders the standard not-authorized card with plain-language copy and
  no partial admin data
