# group-profile-grants

Groups administer capability as **profile membership** (decision 8). The Profile primitive and
group→profile storage/resolver come from WS-3 `registry-server-extraction`; this capability wires
them into authorization, the admin API, and the admin UI — and deletes the dead
`GroupPrefixGrants` mechanism outright.

## ADDED Requirements

### Requirement: GroupPrefixGrants is deleted outright

The system SHALL contain no `GroupPrefixGrants` table, data-layer functions (`addPrefixGrant`,
`removePrefixGrant`, `listPrefixGrants`, `listGrantedPrefixes`), HTTP routes
(`/groups/:id/prefix-grants`), infra table definition, or admin UI section. Deleting a group
SHALL no longer attempt prefix-grant cleanup. No replacement path-ACL mechanism is introduced.

#### Scenario: Prefix-grant admin surface is gone

- **WHEN** a client calls any `/groups/:id/prefix-grants` route
- **THEN** the gateway answers 404 (unknown route), and the Groups admin UI renders no prefix-
  grant section

#### Scenario: No dangling references

- **WHEN** the workspace gateway is typechecked and its test suite runs
- **THEN** no source, schema, infra, or test references `GroupPrefixGrants` or
  `listGrantedPrefixes`

### Requirement: Group capability is profile membership

The system SHALL administer group capability exclusively as group→profile membership:
`GET/POST/DELETE /groups/:id/profiles` (admin-gated) list, attach, and detach profiles using the
WS-3 membership storage. Attaching is idempotent; attaching a profile that does not exist in the
workspace fails with 404. The legacy `/groups/:id/tool-grants` routes and their data layer SHALL
be removed once profile membership is wired.

#### Scenario: Attach a profile to a group

- **WHEN** a workspace admin POSTs a valid profile reference to `/groups/:id/profiles`
- **THEN** the membership is recorded, the response includes the profile's name and target, and a
  repeat POST succeeds without duplicating

#### Scenario: Attach a nonexistent profile

- **WHEN** an admin POSTs a profile name the workspace does not define
- **THEN** the gateway answers 404 naming the missing profile

#### Scenario: Tool-grant legacy surface removed

- **WHEN** a client calls `/groups/:id/tool-grants` after this change
- **THEN** the gateway answers 404 (unknown route)

### Requirement: Tool authorization resolves through the profile join

`mayInvokeTool` SHALL authorize a non-admin caller when (a) they hold a direct permission grant
(unchanged), or (b) any of their groups has an attached profile whose grants cover the requested
`provider:operation` — resolved via the WS-3 single auth-time join (no per-request `UserGroups`
query followed by per-call N+1 grant gets). Workspace admins remain implicitly authorized.

#### Scenario: Group member invokes a profile-granted tool

- **WHEN** a non-admin member of a group with an attached `github`-target profile invokes a
  `github` operation covered by the profile's grants
- **THEN** the invocation is authorized, and removing the group membership or the profile
  attachment causes the next invocation to be denied

#### Scenario: One join per authorization

- **WHEN** a non-admin caller's tool invocation is authorized via a group profile
- **THEN** grant resolution issues a single joined query for the caller's groups' profile grants,
  not one query per group per grant

### Requirement: Admin UI manages profile membership

The Groups admin tab SHALL show, for a selected group, a Profiles section that lists attached
profiles (name, target, credential label), attaches from the workspace's profile list, and
detaches — replacing the removed prefix-grant and tool-grant sections. Empty and error states are
explicit: no attached profiles, no workspace profiles (with a pointer to profile creation), and
load failure with retry.

#### Scenario: Admin attaches a profile in the UI

- **WHEN** an admin selects a group, opens the attach picker, and chooses a profile
- **THEN** the profile appears as a chip with its target and credential label, and the group's
  members gain the capability on their next call

#### Scenario: Workspace without profiles

- **WHEN** an admin opens the Profiles section in a workspace defining no profiles
- **THEN** the section shows an empty state directing the admin to create a profile first, and no
  attach action is offered

### Requirement: Access pane names the executing profile

Surfaces that describe provider execution — `apps.capabilities` tier-2 entries and the app
detail Access tab — SHALL name the profile that executes each provider grant once profiles are
the allow-listing unit, rather than only a bare credential/provider name.

#### Scenario: Capabilities report profile-backed execution

- **WHEN** `apps.capabilities` is invoked for an app holding provider grants on a
  profiles-enabled gateway
- **THEN** each tier-2 entry identifies the executing profile, and the Access tab renders it
