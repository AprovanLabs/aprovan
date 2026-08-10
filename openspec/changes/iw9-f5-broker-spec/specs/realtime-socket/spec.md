# realtime-socket — delta (iw9-f5-broker-spec)

Adds WebSocket backpressure to the realtime transport
(`server/workspace/src/realtime/socket.ts`). Base capability defined by
`openspec/changes/presence-realtime/specs/realtime-socket/spec.md` (not yet
synced to `openspec/specs/`); this delta uses the same capability name so
requirements merge on sync. Pattern source: block/buzz connection lifecycle
(D24 — read as reference, not adopted code). Upgrade auth, principal
resolution, and membership checks are untouched by this change.

## ADDED Requirements

### Requirement: Bounded outbound queue per connection

Each connection SHALL have a bounded outbound event queue in front of the
WebSocket send path. When the queue is full, the oldest queued *event* frames
SHALL be dropped to admit newer ones (events are reconcilable via resubscribe
per the realtime-broker delivery semantics) and the connection SHALL be
marked as having experienced a full-buffer event. The bound SHALL be a
server-side constant with a test-injectable override, in the same style as
`pingIntervalMs`/`maxMissedPongs` in `AttachRealtimeOptions`.

#### Scenario: Full queue drops oldest events

- **WHEN** a connection's outbound queue is at capacity and a new event is
  enqueued
- **THEN** the oldest queued event frame is dropped, the new event is
  enqueued, and the connection open state is unaffected

### Requirement: Priority control channel

Control frames — `subscribed`, `error`, and any future non-event
server frame — SHALL bypass the bounded event queue on a separate priority
path and SHALL NOT be dropped by event backpressure. A full event queue
SHALL never delay or discard a control frame.

#### Scenario: Control frame passes a saturated queue

- **WHEN** a connection's event queue is full and the connection completes a
  new subscribe
- **THEN** the `subscribed` frame is delivered without waiting behind or being
  dropped with the queued events

### Requirement: Batch flush of queued events

Queued event frames SHALL be flushed in batches on a short flush interval
rather than written individually per publish, coalescing bursts into fewer
socket writes. Flushing SHALL preserve enqueue order within a connection and
SHALL respect the WebSocket's own buffer: while `bufferedAmount` exceeds the
configured high-water mark the flusher SHALL hold the queue rather than
growing the kernel buffer. The flush interval and high-water mark SHALL be
server-side constants with test-injectable overrides.

#### Scenario: Burst coalesced into batched writes

- **WHEN** many events are published to a connection's topics within one
  flush interval
- **THEN** they are written in enqueue order in one or few flushes rather
  than one write per event

### Requirement: Slow-client disconnect

A connection that experiences N consecutive full-buffer events (buffer still
full at flush time, N a server-side constant with a test-injectable override)
SHALL be closed by the server with close code 1013 ("try again later"). The
close path SHALL run the normal cleanup: subscriptions dropped and namespace
handlers notified exactly as for any other close, so a reconnecting client
rebuilds state via fresh subscribes. A single full-buffer episode that drains
before N is reached SHALL reset the counter.

#### Scenario: Persistently slow client is disconnected

- **WHEN** a connection's outbound buffer remains full across N consecutive
  flush attempts
- **THEN** the server closes it with code 1013 and namespace handlers observe
  the disconnect as a normal close

#### Scenario: Recovered client stays connected

- **WHEN** a connection's buffer fills, then drains before N consecutive
  full-buffer flushes occur
- **THEN** the counter resets and the connection remains open
