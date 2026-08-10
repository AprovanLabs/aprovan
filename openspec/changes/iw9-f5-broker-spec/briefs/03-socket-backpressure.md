# Brief: Socket backpressure (Stream 3)

**Model:** Sonnet (default tier — see `openspec/changes/IW-9-EXECUTION-OVERVIEW.md`
"Model tiers for the implementing fleet". This is self-contained
queue/timer logic behind an unchanged public signature — no cross-file
state-migration risk — so default tier is appropriate; give the
drain/reset counter logic in 3.2 a careful second pass regardless).

## Mission

When you are done, `server/workspace/src/realtime/socket.ts` owns every byte
written to a connection through a new `OutboundChannel`: `event` frames
queue in a bounded, drop-oldest buffer and flush in batches on a timer
gated by `ws.bufferedAmount`; `subscribed`/`error` (and any future
non-event frame) bypass that queue entirely on a priority path; a
connection whose buffer stays full across N consecutive flush attempts is
closed with code 1013 and cleaned up exactly like any other disconnect. This
stops a fast publisher (or a slow client) from growing an unbounded kernel
buffer, without changing `Conn.send(msg)`'s public signature or anything
about the wire protocol itself.

You also own one small but easy-to-miss edit: once Stream 1 lands,
`RealtimeBroker.handleClientMessage` returns `Promise<void>` instead of
`void`. The production call site in this file's `ws.on("message", ...)`
handler needs an explicit `void` prefix (task 3.3) — Stream 1 cannot make
this edit itself because its `Touches` never opens `socket.ts`.

## Read first

1. `openspec/changes/iw9-f5-broker-spec/tech-plan.md` — D5 (the chosen design plus its rejected alternatives: broker-side backpressure, drop-newest, per-topic queues), and D1's parenthetical naming this stream as owner of the `handleClientMessage` call-site edit
2. `openspec/changes/iw9-f5-broker-spec/specs/realtime-socket/spec.md` — all four ADDED requirements, full text below
3. `openspec/changes/presence-realtime/specs/realtime-socket/spec.md` — the base capability this is a delta on (same capability name; requirements merge on sync — keep your changes' language consistent with the base)
4. `openspec/changes/iw9-f5-broker-spec/briefs/deviations.md` — item 3 (exact call-site edit and why it's yours, not Stream 1's)
5. `server/workspace/src/realtime/socket.ts` — current file: `Conn.send` (lines 206-215), `AttachRealtimeOptions` (lines 32-49), the existing `pingIntervalMs`/`maxMissedPongs` injectable-constant pattern to mirror, the `ws.on("message", ...)` handler (around line 255-267) containing the call site you update
6. `server/workspace/tests/realtime-socket.test.ts` — current assertions and test harness; the injection pattern used for existing options

Pattern source, reference only (not a repo path — external prior art, not
adopted code, per tech-plan D5/IW-9 D24): the block/buzz connection lifecycle.

## Tasks

(Verbatim from `openspec/changes/iw9-f5-broker-spec/tasks.md` §3, as amended)

- [ ] 3.1 Build the OutboundChannel inside socket.ts behind the unchanged
      `Conn.send(msg)` signature: `event` frames enter a bounded drop-oldest
      queue; `subscribed`/`error` and any future non-event frame write
      immediately on the priority path (tech-plan D5; spec realtime-socket
      "Bounded outbound queue" + "Priority control channel").
- [ ] 3.2 Batch flusher: flush queued events in enqueue order on the flush
      interval, holding while `ws.bufferedAmount` exceeds the high-water
      mark; count consecutive flush attempts that find the buffer still full,
      reset on drain, and `ws.close(1013, ...)` at N — normal close path runs
      cleanup → `broker.removeConnection` (spec "Batch flush" +
      "Slow-client disconnect").
- [ ] 3.3 Extend `AttachRealtimeOptions` with `outboundQueueLimit` (256),
      `flushIntervalMs` (25), `sendHighWaterMark` (1 MiB),
      `maxFullBufferFlushes` (3) — defaults as constants, all
      test-injectable, matching the existing `pingIntervalMs` pattern. After
      Stream 1, `RealtimeBroker.handleClientMessage` returns `Promise<void>`
      (tech-plan D1); update the production call site in socket.ts's
      `ws.on("message", ...)` handler (today, unawaited,
      `broker.handleClientMessage(conn, parsed);` at socket.ts:266) to `void
      broker.handleClientMessage(conn, parsed);` — an explicit fire-and-forget,
      matching D1's stated intent and the spec's permitted event/`subscribed`
      reordering (clients MUST NOT assume ordering). This stream owns that
      one-line edit: Stream 1's Touches is limited to broker.ts/store.ts and
      never opens socket.ts. Update `tests/realtime-socket.test.ts` for the
      async call site accordingly.
- [ ] 3.4 New `tests/realtime-backpressure.test.ts`: full queue drops oldest
      and keeps newest; control frame delivered while event queue saturated;
      burst coalesced into batched in-order writes; N consecutive full-buffer
      flushes → close 1013 with handlers observing a normal disconnect;
      drain before N resets the counter and keeps the connection open (every
      realtime-socket delta scenario).

## Acceptance criteria

Full requirement text and WHEN/THEN scenarios from
`specs/realtime-socket/spec.md` — all four apply:

> ### Requirement: Bounded outbound queue per connection
>
> Each connection SHALL have a bounded outbound event queue in front of the WebSocket send path. When the queue is full, the oldest queued *event* frames SHALL be dropped to admit newer ones (events are reconcilable via resubscribe per the realtime-broker delivery semantics) and the connection SHALL be marked as having experienced a full-buffer event. The bound SHALL be a server-side constant with a test-injectable override, in the same style as `pingIntervalMs`/`maxMissedPongs` in `AttachRealtimeOptions`.
>
> #### Scenario: Full queue drops oldest events
> - **WHEN** a connection's outbound queue is at capacity and a new event is enqueued
> - **THEN** the oldest queued event frame is dropped, the new event is enqueued, and the connection open state is unaffected
>
> ### Requirement: Priority control channel
>
> Control frames — `subscribed`, `error`, and any future non-event server frame — SHALL bypass the bounded event queue on a separate priority path and SHALL NOT be dropped by event backpressure. A full event queue SHALL never delay or discard a control frame.
>
> #### Scenario: Control frame passes a saturated queue
> - **WHEN** a connection's event queue is full and the connection completes a new subscribe
> - **THEN** the `subscribed` frame is delivered without waiting behind or being dropped with the queued events
>
> ### Requirement: Batch flush of queued events
>
> Queued event frames SHALL be flushed in batches on a short flush interval rather than written individually per publish, coalescing bursts into fewer socket writes. Flushing SHALL preserve enqueue order within a connection and SHALL respect the WebSocket's own buffer: while `bufferedAmount` exceeds the configured high-water mark the flusher SHALL hold the queue rather than growing the kernel buffer. The flush interval and high-water mark SHALL be server-side constants with test-injectable overrides.
>
> #### Scenario: Burst coalesced into batched writes
> - **WHEN** many events are published to a connection's topics within one flush interval
> - **THEN** they are written in enqueue order in one or few flushes rather than one write per event
>
> ### Requirement: Slow-client disconnect
>
> A connection that experiences N consecutive full-buffer events (buffer still full at flush time, N a server-side constant with a test-injectable override) SHALL be closed by the server with close code 1013 ("try again later"). The close path SHALL run the normal cleanup: subscriptions dropped and namespace handlers notified exactly as for any other close, so a reconnecting client rebuilds state via fresh subscribes. A single full-buffer episode that drains before N is reached SHALL reset the counter.
>
> #### Scenario: Persistently slow client is disconnected
> - **WHEN** a connection's outbound buffer remains full across N consecutive flush attempts
> - **THEN** the server closes it with code 1013 and namespace handlers observe the disconnect as a normal close
>
> #### Scenario: Recovered client stays connected
> - **WHEN** a connection's buffer fills, then drains before N consecutive full-buffer flushes occur
> - **THEN** the counter resets and the connection remains open

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/realtime-socket.test.ts tests/realtime-backpressure.test.ts
```

## Constraints

- Touches only: `server/workspace/src/realtime/socket.ts`,
  `server/workspace/tests/realtime-socket.test.ts`,
  `server/workspace/tests/realtime-backpressure.test.ts`.
- `Conn.send(msg)`'s signature must not change — the `OutboundChannel` lives
  entirely inside how `socket.ts` constructs `conn.send`, not in a new
  parameter or return type.
- Defaults are constants (queue depth 256, flush interval 25ms, high-water
  mark 1 MiB, N = 3), each overridable via `AttachRealtimeOptions`, matching
  the existing `pingIntervalMs` pattern — do not make these user-facing
  configuration.
- Do not implement per-topic queues, drop-newest, or broker-side
  backpressure — all three are explicitly rejected alternatives in
  tech-plan D5.
- Surgical changes only; match existing style.
- Do not touch `broker.ts`, `store.ts`, or `presence.ts` — those belong to
  Streams 1 and 2.

## Report back

When done: check off tasks 3.1–3.4 in `openspec/changes/iw9-f5-broker-spec/tasks.md`,
and write `openspec/changes/iw9-f5-broker-spec/briefs/03-report.md` containing
what you built, the Verify output, and any deviations (e.g. if the
drain/reset counter semantics needed clarification beyond the spec text).
