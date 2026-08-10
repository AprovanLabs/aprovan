# realtime-broker

The contract between the realtime broker and its namespace handlers
(`server/workspace/src/realtime/broker.ts`). Hardened by IW-9 F5 (D16) so that
Wave-2 consumers (Chat flagship) build against a shape that survives the move
to a cloud-swappable backend: subscribe is async, handlers are stateless over
a broker-owned store, delivery guarantees are minimal and explicit, and
authorization is never inferred from topic membership (invariant 7).

**Wave-2 target (informative, not required by this change):** the broker's
destination is a scoped-topic bus — topics keyed `ws:<workspaceId>:<topic>`,
with refcounted dynamic subscribe/unsubscribe (unsubscribe debounced to avoid
churn), following the measured pattern that reduced irrelevant delivery 64x.
Nothing in this capability may preclude that shape; nothing in this change
implements it. Sharding and Redis/Valkey/NATS backends remain deferred (D16).

## ADDED Requirements

### Requirement: Asynchronous subscribe contract

`NamespaceHandler.onSubscribe` SHALL return
`Promise<{ body?: unknown }>`. The broker SHALL await the handler before
sending `{type:"subscribed"}`, and SHALL send the `subscribed` frame with the
resolved body only after the promise fulfills. A rejected promise SHALL be
treated exactly as a thrown error is today: the just-created subscription
state is rolled back and the client receives `{type:"error", code:"bad-topic"}`
with the rejection message. Events published to the topic between subscription
registration and `subscribed` delivery MAY be delivered to the subscriber in
either order relative to the `subscribed` frame — clients MUST NOT assume
`subscribed` precedes the first event.

#### Scenario: Handler resolves asynchronously

- **WHEN** a client subscribes to a topic whose handler resolves its snapshot
  body from an awaited store read
- **THEN** the client receives `{type:"subscribed", topic, body}` carrying the
  resolved body after the promise fulfills, and the subscription is active

#### Scenario: Rejected subscribe rolls back

- **WHEN** a handler's `onSubscribe` promise rejects for a topic the
  connection was not previously subscribed to
- **THEN** the client receives `{type:"error", code:"bad-topic"}` with the
  rejection message and no subscription state remains for that
  (connection, topic)

### Requirement: Namespace handlers hold no state

Namespace handlers SHALL NOT retain per-connection, per-user, or per-topic
state in handler-scoped closures or module scope. All handler state SHALL
live behind a broker-owned ephemeral state store interface that the broker
constructs and passes to the handler at registration. The store is keyed by
workspace and namespace, is never persisted, and is dropped for a workspace
when the broker drops that workspace's state. The presence handler
(`server/workspace/src/realtime/presence.ts`), which today holds
`ConnFocus`/`UserMembership` maps in-process, SHALL be migrated onto this
store with identical observable behavior (roster snapshots, join/leave/update
deltas, exclusive focus, disconnect clears focus).

#### Scenario: Presence state lives in the broker-owned store

- **WHEN** the presence handler records a connection's focus
- **THEN** the focus and membership entries are written through the
  broker-owned store interface, and no handler module retains them in its own
  Map or closure

#### Scenario: Store scoped per workspace and namespace

- **WHEN** two workspaces have presence members on the same path
- **THEN** each workspace's entries live under that workspace's store scope
  and neither can read or clobber the other's

### Requirement: No ordering or exactly-once assumptions

The broker SHALL NOT guarantee cross-topic ordering, cross-publisher
ordering within a topic, or exactly-once delivery. Handlers and clients MUST
NOT assume any of these; an event MAY be dropped (slow-client backpressure,
disconnect) or observed after a newer event from a different publisher.
Handler and client state derived from events SHALL therefore be reconcilable
from a fresh subscribe snapshot alone — the `subscribed` body is the recovery
mechanism, not replay. The spec-level statement of these semantics SHALL
appear in the broker module documentation so Wave-2 handler authors inherit
it.

#### Scenario: Client recovers by resubscribing

- **WHEN** a client suspects it missed events (reconnect, buffer-drop
  disconnect)
- **THEN** re-subscribing yields a `subscribed` body sufficient to rebuild
  current state without any replayed events

### Requirement: Store backend selected by workspace locus

The broker-owned state store SHALL be constructed behind a factory that
selects the backend from the workspace execution locus, mirroring how the
storage stores select backends via `WORKSPACE_MODE`/locus resolution in
`server/workspace/src/runtime/config.ts` (`resolveLocusDispatch`,
`storeBackendForLocus`). A `local`-locus workspace SHALL use the in-process
(in-memory Map) backend. A cloud-locus workspace SHALL resolve through the
same factory seam so a future distributed backend can be swapped in without
touching handler code — but this change SHALL ship only the in-process
implementation; selecting a cloud backend beyond in-process is deferred (D16)
and the factory SHALL default cloud loci to the in-process backend with that
deferral documented.

#### Scenario: Local locus resolves in-process

- **WHEN** the broker constructs a namespace store for a `local`-locus
  workspace
- **THEN** the in-process backend is selected with no network or AWS SDK
  loaded

#### Scenario: Backend swap requires no handler change

- **WHEN** a second store backend is introduced behind the factory
- **THEN** namespace handlers compile and run unchanged — they depend only on
  the store interface

### Requirement: Topic keys route, they never authorize

Topic keys SHALL be used only for routing. Being subscribed to a topic SHALL
NOT be treated as authorization to receive its events: authorization SHALL be
re-applied at every fan-out path — in-process `publishToTopic` today, and any
future bus — via an authorization hook evaluated per (connection, topic,
event) delivery decision. The default hook preserves current behavior
(workspace-scoped connections receive workspace-scoped topics); namespace
handlers MAY narrow it. This codifies IW-9 invariant 7; no delivery path may
bypass the hook.

#### Scenario: Fan-out re-checks authorization

- **WHEN** an event is published to a topic with subscribers whose
  authorization hook rejects one connection
- **THEN** that connection does not receive the event while remaining
  subscribers do, and the rejection is not an error frame to anyone

#### Scenario: Subscription is not a grant

- **WHEN** a connection holds a subscription that predates an authorization
  change rejecting it
- **THEN** subsequent fan-outs deliver nothing to that connection — the stale
  subscription confers no access
