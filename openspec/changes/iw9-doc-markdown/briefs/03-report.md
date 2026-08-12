# Report: Server — `doc` realtime namespace (Stream 3)

## What was built

Un-reserved and registered the `doc` namespace as a Yjs sync + awareness
handler over base64-in-JSON frames (D1):

| Piece | Role |
| --- | --- |
| `protocol.ts` | Removed `"doc"` from `RESERVED_NAMESPACES` (`fs` remains reserved) |
| `doc/doc-namespace.ts` | `createDocHandler(broker)` — `onSubscribe` / `onPublish` / `onDisconnect` |
| `socket.ts` | Boot-registers beside presence + app-topics |
| `tests/doc-namespace.test.ts` | Concurrent join, reconnect identity, awareness deltas, last-leave release |

Wire shapes (for client stream 7):

```ts
type DocSyncFrame = { kind: "sync"; data: string };       // base64(y-protocols sync bytes)
type DocAwarenessFrame = { kind: "awareness"; data: string }; // base64(encodeAwarenessUpdate)
```

- Subscribe → `{ type: "subscribed", body: DocSyncFrame }` where `data` is
  SyncStep1; awareness snapshot (if any peers) follows as a separate
  `{ type: "event", body: DocAwarenessFrame }` on the next macrotask.
- Publish SyncStep1 → SyncStep2 reply event to that conn only.
- Publish SyncStep2 / Update → apply, `appendUpdate` for durability, fan-out
  to other subscribers.
- Publish awareness → apply, fan-out; clientIDs tracked per conn for leave.
- Last participant leave → schedule `releaseDoc` (memory-only; stream 4
  completes materialize-on-release). Rejoin reconstructs via durable log.

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-namespace.test.ts realtime-broker.test.ts && pnpm --filter @aprovan/workspace typecheck
```

- Vitest: **11 passed** (5 doc-namespace + 6 realtime-broker)
- Typecheck: **ok** (effect-completeness 137 tools)

## Deviations

1. **`lib0` on `@aprovan/workspace`** — brief allowlisted only four files;
   `y-protocols` sync APIs require `lib0/encoding` + `lib0/decoding`, which
   pnpm isolation does not expose transitively. Same class of fix as stream 2's
   direct `yjs`/`y-protocols` pin. Added `lib0@^0.2.85` (+ lockfile).
2. **Awareness-after-subscribed uses `setTimeout(0)`** — `queueMicrotask`
   races the broker's await-continuation and can deliver the awareness
   `event` before `subscribed`. Macrotask ordering keeps the tech-plan
   sequence.
3. **Sync updates call `appendUpdate`** — needed so last-leave → rejoin can
   reconstruct edited content while `releaseDoc` is still memory-only
   (stream 4 owns materialize-on-release).
4. **`tasks.md` / `briefs/03-report.md`** — checkoff + this report (outside
   the four-file allowlist; required by the brief's Report back).

## Notes for next wave

- **Stream 4**: join auth (`assertPathGranted` / partition); quiesce timers;
  extend `releaseDoc` to materialize + flush before drop.
- **Stream 7 (client)**: handshake is SyncStep1 in `subscribed`, then client
  publishes SyncStep2 then SyncStep1 as **separate** publishes (one
  `readSyncMessage` per frame). Awareness snapshot may arrive as the next
  `event` after `subscribed`.
- **Test debt**: `realtime-e2e.test.ts` and `realtime-socket.test.ts` still
  assert `doc:` → `reserved-namespace`. With the handler registered those
  cases will fail / need to assert successful subscribe (or keep covering
  only `fs:`). Out of this stream's allowlist — fix in a follow-up.
- Broker `unsubscribe` does not notify handlers; participants are cleared on
  `onDisconnect` only. Clients that unsubscribe without closing the socket
  leave a participant until disconnect (same class of gap as presence focus).
