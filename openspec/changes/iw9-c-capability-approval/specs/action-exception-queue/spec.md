# action-exception-queue

Out-of-grant resource → the action queues instead of failing (D12).
No simulated results. No undo for actions.

## ADDED Requirements

### Requirement: Out-of-grant actions queue
When the dispatch predicate denies an `action` on resource grounds (the
capability is granted, the resource pattern is not), the platform SHALL
persist a queued-action record — (principal, app/profile, tool, args,
target resource, credential level, timestamps) — instead of executing or
erroring. Capability-level denials (namespace not granted at all) SHALL
NOT queue; they fail with an authorization error or raise a JIT capability
card.

#### Scenario: Resource miss queues
- **WHEN** `email.send` to `bob@example.org` is dispatched under grant
  `(email.send, mailto:*@aprovan.com)`
- **THEN** no email is sent and a queued-action record exists carrying the
  full call and its target resource

#### Scenario: Namespace miss does not queue
- **WHEN** a principal with no `email` grant dispatches `email.send`
- **THEN** nothing is queued; the caller receives an authorization error
  (or, in an agent run, a JIT capability card)

### Requirement: Chain semantics
Within a run, after an action queues: if no subsequent step consumes the
action's result (fire-and-forget), the run SHALL continue on
acknowledgment of the queueing; if a subsequent step depends on the
result, the run SHALL end the turn reporting "queued N actions" (D12).
The platform SHALL never fabricate a result for a queued action.

#### Scenario: Fire-and-forget continues
- **WHEN** a run queues a notification-send whose result is unused
- **THEN** the run's next step executes in the same turn and the final
  message notes the queued action

#### Scenario: Result-dependent ends turn
- **WHEN** a run queues an action and the next step reads its result
- **THEN** the turn ends with "queued N actions"; no simulated result is
  injected

### Requirement: Release and discard
A reviewer with authority over the miss (the resource's grant approver per
invariant 1) SHALL be able to release (execute now, optionally recording a
grant for the pattern) or discard a queued action from the review surface.
Release executes the original args verbatim exactly once; a released or
discarded record is terminal. There is no undo for a released action.

#### Scenario: Release executes once
- **WHEN** a reviewer releases a queued `email.send`
- **THEN** the send executes with the original arguments, the record
  becomes terminal, and a second release attempt is a no-op error

#### Scenario: Release with remember
- **WHEN** the reviewer releases and checks "allow *@example.org"
- **THEN** a grant row is written via the standard grant path and future
  matching actions dispatch directly

### Requirement: Queued actions expire
Queued actions SHALL expire after a configured window (default 7 days);
expiry is a discard — an expired action never executes. The review surface
SHALL show approaching expiry.

#### Scenario: Expiry discards
- **WHEN** a queued action passes its expiry
- **THEN** it transitions to a terminal discarded state with reason
  "expired" and can no longer be released

### Requirement: Queue rows carry full attribution
Every queued-action record SHALL carry the F3 attribution triple (user,
via app/profile, credential level + id), and every queue transition
(queued, released, discarded, expired) SHALL write an audit row.

#### Scenario: Attribution survives release
- **WHEN** an admin releases a member's queued action executed under a
  workspace-oauth credential
- **THEN** the audit rows name the original member as invoker, the
  releasing admin as approver, and the credential level + id
