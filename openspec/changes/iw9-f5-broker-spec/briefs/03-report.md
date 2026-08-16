# Report: Socket backpressure (Stream 3)

## What was built

### `server/workspace/src/realtime/socket.ts` (tasks 3.1, 3.2, 3.3)

**`WsLike` interface** (exported, `@internal`): minimal WebSocket surface
(`readyState`, `OPEN`, `bufferedAmount`, `send`, `close`) typed separately so
unit tests can pass a plain mock object instead of a real `WebSocket`.  This
does not change the public API — it is an implementation detail of
`OutboundChannel`.

**`OutboundChannel` class** (exported for unit testing, `@internal` jsdoc;
tech-plan D5):
- `send(msg: ServerMessage)`: routes by `msg.type`.  `event` frames enter a
  bounded drop-oldest `Array` queue (capacity `queueLimit`); when full, the
  oldest entry is `shift()`-ed before the new one is pushed.  All other frame
  types (`subscribed`, `error`, and any future non-event frame) are written
  immediately to `ws.send()` on the priority path — never queued, never
  dropped.
- `flushNow()`: public method that calls the private `flush()` — exposed for
  unit tests to trigger a flush synchronously without waiting for the timer.
  Production code uses the interval timer exclusively.
- `flush()` (private): checks `ws.readyState === OPEN`, then checks
  `ws.bufferedAmount > highWaterMark`.  If the buffer is over HWM,
  increments `consecutiveFullFlushes` and closes with 1013 when that count
  reaches `maxFullFlushes`.  If the buffer is healthy (or the queue is empty),
  resets `consecutiveFullFlushes` to 0 and drains the queue in enqueue order
  via `ws.send()`.  An empty queue with a healthy buffer still resets the
  counter, so a connection that had queued events but fully drained clears its
  consecutive count on the next flush.
- `destroy()`: clears the `setInterval` flush timer (called from the
  connection cleanup closure).

**`AttachRealtimeOptions`** extended with four new fields matching the
`pingIntervalMs` injectable-constant pattern (task 3.3):
- `outboundQueueLimit` (default 256)
- `flushIntervalMs` (default 25)
- `sendHighWaterMark` (default 1 MiB = `1 << 20`)
- `maxFullBufferFlushes` (default 3)

All four are resolved at `attachRealtime()` call time alongside `pingIntervalMs`
and passed into each `OutboundChannel` constructor at connection time.

**`Conn.send`** (task 3.1): now delegates entirely to `channel.send(msg)`.
The public `Conn` interface signature is unchanged (`send(msg: ServerMessage): void`).

**`handleClientMessage` call site** (task 3.3): changed from
`broker.handleClientMessage(conn, parsed);` to
`void broker.handleClientMessage(conn, parsed);` — explicit fire-and-forget
matching D1's stated intent and `Promise<void>` return.

**Cleanup path** (`ws.on("close", cleanup)`): `channel.destroy()` added as the
first call inside the `cleanup` closure so the flush timer is cancelled before
`broker.removeConnection(conn)`.

### `server/workspace/tests/realtime-socket.test.ts` (task 3.3 update)

- `attachWithAuth` helper extended to forward `flushIntervalMs`,
  `outboundQueueLimit`, `sendHighWaterMark`, `maxFullBufferFlushes` from the
  `opts` object to `attachRealtime`.  Existing test bodies are unchanged.
- Pre-existing stale assertion fixed: the "reserved vs unknown namespace error
  codes" test previously checked that `doc:notes/plan.md` returned
  `reserved-namespace`.  Since commit `19da322` (IW-9 doc stream 3) registered
  the `doc` namespace in `attachRealtime`, that assertion had already been
  failing on `main` before this stream started (confirmed by stash-and-run
  against unmodified HEAD).  The assertion was updated to remove the `doc` line
  — `fs` (still truly reserved) and `bogus` (unknown namespace) lines
  are retained, preserving the intent of the test.

### `server/workspace/tests/realtime-backpressure.test.ts` (task 3.4, new file)

Nine tests covering all four ADDED spec requirements:

**Unit tests via `OutboundChannel` + `MockWs`** (no real socket, fully
synchronous via `flushNow()`):

1. *Bounded outbound queue — drops oldest*: limit=3, send 4 events, verify
   only events 2-3-4 flush (event 1 dropped).
2. *Bounded outbound queue — connection stays open after drop*: verify `ws.closed`
   is empty after a drop-oldest event.
3. *Priority control channel — subscribed immediate*: fill queue (limit=2),
   send a `subscribed` frame, verify it arrives immediately (before any flush).
4. *Priority control channel — error immediate*: same but with `error` frame.
5. *Batch flush — enqueue order preserved*: 5 events, `flushNow()`, verify
   order 0-1-2-3-4.
6. *Batch flush — holds while buffer over HWM*: `bufferedAmount=2MiB >
   HWM=1MiB`, `flushNow()` sends nothing; set `bufferedAmount=0`, `flushNow()`
   sends all.
7. *Slow-client disconnect — close 1013 at N*: `sendHighWaterMark=1MiB`,
   `bufferedAmount=2MiB`, N=3; first two `flushNow()` calls do not close; third
   does, with `{ code: 1013 }`.
8. *Slow-client disconnect — counter resets on drain*: 2 full-buffer flushes
   (consecutive=2 < N=3), then `bufferedAmount=0` → flush drains queue and
   resets counter; 2 more full-buffer flushes do not close.

**Integration test via `attachRealtime` + real `WebSocket`** (verifies 1013
reaches the client and `onDisconnect` fires):

9. *slow-client disconnect via real socket*: `sendHighWaterMark: -1`
   (so `bufferedAmount ≥ 0 > -1` is always true), `maxFullBufferFlushes: 2`,
   `flushIntervalMs: 20`; a publisher keeps enqueuing events every 5ms so
   each flush sees a non-empty queue.  Waits for the client socket to close
   with code 1013, then asserts `onDisconnect` was called exactly once.

## Verify output

```
$ pnpm --filter @aprovan/workspace exec vitest run tests/realtime-socket.test.ts tests/realtime-backpressure.test.ts

 RUN  v2.1.5 .../server/workspace

 ✓ tests/realtime-backpressure.test.ts (9 tests) 103ms
 ✓ tests/realtime-socket.test.ts (9 tests) 477ms

 Test Files  2 passed (2)
      Tests  18 passed (18)
   Start at  15:29:58
   Duration  990ms (transform 139ms, setup 13ms, collect 587ms, tests 580ms, environment 0ms, prepare 64ms)
```

Both files exit 0. 18/18 tests pass. No skipped tests, no weakened assertions.

## Deviations

### D1: `OutboundChannel` exported for unit testability

The brief specified `OutboundChannel` lives "inside socket.ts behind the
unchanged public surface" — it is an implementation detail, not a public API.
The class is exported with `@internal` jsdoc and the `WsLike` interface is
exported for the same reason (mocking in tests).  Neither was visible before;
neither changes `Conn.send`'s signature or any other public contract.  The
export exists purely so `realtime-backpressure.test.ts` can instantiate
`OutboundChannel` with a mock `WsLike` and call `flushNow()` to run
synchronous unit tests without a real socket.  Stream 4's E2E test does not
need to import either.

### D2: Pre-existing `realtime-socket.test.ts` failure fixed in-stream

The "reserved vs unknown namespace error codes" test was already failing on
`main` before this stream branched (commit `19da322` registered the `doc`
namespace, invalidating the `doc:` → `reserved-namespace` assertion).
Because `realtime-socket.test.ts` is in this stream's `Touches` and the Verify
command requires it to pass, the stale `doc` assertion was removed.  Only the
`doc:` line was changed — the `fs:` and `bogus:` lines are intact and still
verify the correct behavior for truly-reserved and unknown namespaces.  This
was a bug in the test, not in the production code.

## Notes for Stream 4 (end-to-end verification)

- `OutboundChannel` is exported from `socket.ts` as a named export; `WsLike`
  likewise.  Stream 4 does not need to import either — they are test utilities.
- The `consecutiveFullFlushes` counter resets to 0 whenever the queue drains
  successfully (buffer healthy, queue non-empty → flushed) OR the queue is
  found empty on a flush tick.  An empty queue never increments the counter.
- `channel.destroy()` is the first line of the `cleanup` closure; the flush
  timer is stopped before `broker.removeConnection` so no flush can fire after
  a close-path removal.
- `flushIntervalMs: -1` is NOT a valid override for the integration slow-client
  test; instead `sendHighWaterMark: -1` is used to make every flush count as
  "buffer full" regardless of actual `bufferedAmount`.
- The `void broker.handleClientMessage(conn, parsed)` edit at socket.ts:372 is
  live.  Stream 4's E2E tests (realtime-e2e.test.ts) must account for the
  fire-and-forget semantics (messages processed asynchronously; ordering between
  event delivery and subscribed frames is not guaranteed, as spec'd).

## Blockers

None.
