# chat-realtime — fan-out, presence, typing

Chat consumes the in-memory broker under iw9-f5's hardened spec
(`server/workspace/src/realtime/broker.ts`). Topic keys route; they never
authorize (invariant 7).

## ADDED Requirements

### Requirement: Authorization re-applied at fan-out (invariant 7)

For every message event, the fan-out path SHALL re-evaluate whether each
subscribed connection's user can read the event's channel at delivery time.
Subscription success SHALL NOT be treated as authorization. A guest or
participant who cannot read a channel SHALL never receive any event —
message, edit-of-membership, presence, or typing — scoped to that channel.

#### Scenario: Guest never receives unreadable-channel events

- **WHEN** a guest is subscribed to the instance's realtime topics and a
  message is posted in a restricted channel the guest cannot read
- **THEN** the guest's connection receives no event for it (asserted by an
  automated test that captures the guest's full event stream)

#### Scenario: Revocation takes effect at fan-out

- **WHEN** a participant's access to a channel is revoked while they hold an
  open subscription
- **THEN** events fanned out after the revocation are not delivered to them,
  without requiring a reconnect (authority derived at run time, invariant 3)

### Requirement: Presence and typing are ephemeral

Presence (who is online in the instance / viewing a channel) and typing
indicators SHALL live only in broker/socket memory, following the existing
presence-handler pattern (`realtime/presence.ts`: state cleared on
disconnect). No presence or typing code path SHALL write to the record
store, the VFS, or any persistent store — grep-verifiable.

#### Scenario: Typing indicator round-trip

- **WHEN** user A types in a channel both A and B can read
- **THEN** B sees A's typing indicator within the session, and no
  persistent row is created anywhere

#### Scenario: Disconnect clears presence

- **WHEN** a user's last connection closes
- **THEN** their presence disappears for all viewers and no residue of it
  exists after the process restarts

### Requirement: Backpressure conformance (F5)

Chat's client SHALL conform to the F5 broker contract: it SHALL tolerate
dropped/batched non-priority events by reconciling from the store
(re-fetching the canonical timeline window), and SHALL treat a
server-initiated disconnect (slow-client policy) as a resume-and-reconcile,
not an error surface. Chat SHALL NOT assume ordering or exactly-once
delivery.

#### Scenario: Slow client reconciles after disconnect

- **WHEN** the broker disconnects a client under the full-buffer policy and
  the client reconnects
- **THEN** the timeline re-renders correctly from canonical records with no
  duplicated or lost messages in the visible window

### Requirement: Live timeline updates

A message posted by one participant SHALL appear in every eligible
participant's open timeline via the broker without polling, and SHALL be
reconcilable against the canonical record (ids match; the realtime payload
is a hint, the record store is truth — invariant 8 posture).

#### Scenario: Two-client message delivery

- **WHEN** users A and B have the same channel open and A posts a message
- **THEN** B's timeline shows the message without a manual refresh, with id
  equal to the stored record's id
