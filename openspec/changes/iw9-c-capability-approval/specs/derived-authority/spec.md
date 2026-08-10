# derived-authority

Authority is derived at run time, never snapshotted (invariant 3).
Standing automations run with their owner's current standing; revocation
cascades. Agents propose; people instantiate (invariant 11).

## ADDED Requirements

### Requirement: Runtime authority resolution
Every execution of a standing workflow, schedule, or agent profile SHALL
resolve its owner's grants at dispatch time through the same chokepoint
predicate as interactive calls. No grant, membership, or credential
reference SHALL be copied into the automation record at save time; the
record stores only the owner's identity.

#### Scenario: Narrowed owner narrows the automation
- **WHEN** an owner's grant is narrowed after saving a standing workflow
  that uses the removed resource
- **THEN** the workflow's next run is evaluated under the narrowed grant
  and the out-of-grant action queues (or the run asks), with no memory of
  the earlier wider grant

### Requirement: Cascading revocation on departure
When a user leaves a workspace (or their membership is revoked), their
standing automations in that workspace SHALL deactivate before their next
scheduled execution, and their user-level credential grants SHALL stop
resolving immediately. Deactivation SHALL be visible (listed as
"deactivated: owner departed") and reassignable by an admin — reassignment
re-evaluates under the new owner's grants, never inherits the old owner's.

#### Scenario: Owner departs
- **WHEN** a member with a nightly standing workflow leaves the workspace
- **THEN** the workflow does not run again, its record shows deactivated
  with reason, and an admin can reassign it to a present member

#### Scenario: Reassignment re-derives
- **WHEN** an admin reassigns a deactivated automation to themselves
- **THEN** subsequent runs are evaluated under the admin's current grants
  and audited under the admin's identity

### Requirement: Credential revocation cascades
Revoking a credential or a grant SHALL take effect for every dependent
principal — automations, app installs, agent profiles — at their next
dispatch, without waiting for a cache TTL longer than one tool-list cache
window; the workspace tool-list cache SHALL be invalidated on grant and
credential changes.

#### Scenario: Grant revoked mid-standing
- **WHEN** an admin revokes an app's `(slack.post, ...)` grant
- **THEN** the app's next `slack.post` from any path is out-of-grant
  (queues if resource-level, denies if capability-level) and the tool list
  no longer shows the capability as granted

### Requirement: Agents draft, never self-provision
No agent-reachable tool SHALL create or activate a standing automation,
install, grant, or agent profile. Agent tools MAY create draft records
that appear in the review surface for a person to instantiate
(invariant 11). Instantiation by the person SHALL be the authority event —
the draft carries no authority of its own.

#### Scenario: Agent drafts a schedule
- **WHEN** an agent run creates a draft standing schedule
- **THEN** the schedule does not execute, a review-surface item appears
  for the owner, and accepting it creates the automation owned by the
  accepting person under their current grants
