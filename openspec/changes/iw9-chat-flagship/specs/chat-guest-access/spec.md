# chat-guest-access — guests, invites, membership

Guest access rides the existing invite machinery
(`server/workspace/src/invites.ts` facade: create/get/list/revoke/consume;
`InviteRecord` has `role`, `groupIds`, 7-day TTL, consumed-on-accept) plus a
guest role. Invariant 9: no anonymous participation, ever.

## ADDED Requirements

### Requirement: Guest role scoped to one instance

A guest SHALL be an authenticated platform user whose authority is scoped to
exactly one Chat instance: the channels granted to them, that instance's
presence, and nothing else in the hosting space. Guests SHALL NOT gain
workspace membership rights in the hosting workspace (managed mode) or any
access to the host's personal space beyond the instance (hosted mode).
Grants intersect, never union (invariant 2).

#### Scenario: Guest cannot reach host data outside the instance

- **WHEN** a guest holding a valid instance grant calls any `vfs.*` or
  `records.*` surface against the hosting space outside the instance's
  partition
- **THEN** the call is denied with the platform's standard deny behavior

#### Scenario: Anonymous user cannot participate

- **WHEN** an unauthenticated visitor opens a guest invite link
- **THEN** they are required to authenticate before the invite can be
  consumed; no anonymous read of records, presence, or realtime occurs
  (invariant 9)

### Requirement: Guest invites via existing invite machinery

Chat SHALL issue guest invites through the platform invite surface (the
`invites.*` facade), carrying a guest role, and consumption SHALL mint the
guest's instance participation. In hosted mode there is no shared workspace
membership to mint; the consumption target is instance participation
(F2 participant list), and any invite-machinery change this requires SHALL
be recorded as a tech-plan finding, not silently forked.

#### Scenario: Guest joins hosted instance via link

- **WHEN** a creator issues a guest invite for their hosted instance and the
  invitee opens the link and authenticates
- **THEN** the invite is consumed exactly once, the invitee appears in the
  instance participant list as a guest, and can read/post in granted
  channels

#### Scenario: Invite is single-use and expiring

- **WHEN** a consumed or expired (7-day TTL) invite token is presented
- **THEN** joining fails with a distinguishable error and no participation
  is created

#### Scenario: Host revokes a pending invite

- **WHEN** the host revokes a pending guest invite
- **THEN** the token no longer consumes, and the revocation is visible in
  the host's invite list

### Requirement: Guest lifecycle

The host SHALL be able to remove a guest, a guest SHALL be able to leave,
and instance deletion SHALL end all guest access. Removal SHALL take effect
against live subscriptions at the next fan-out (invariant 3 / invariant 7 —
no reconnect required to enforce).

#### Scenario: Removed guest loses live access

- **WHEN** the host removes a guest who has an open connection
- **THEN** subsequent events are not delivered to that guest and their next
  store read is denied

### Requirement: Managed mode requires membership (invariant 5)

In a workspace-managed instance, every participant SHALL be a member of the
hosting workspace, checked at access time. Adding a non-member to a managed
instance SHALL route through workspace invite/membership flows first —
managed instances have no guests.

#### Scenario: Non-member cannot be added to managed instance

- **WHEN** a managed-instance admin attempts to add a user who is not a
  member of the hosting workspace
- **THEN** the operation is rejected with guidance to invite them to the
  workspace first
