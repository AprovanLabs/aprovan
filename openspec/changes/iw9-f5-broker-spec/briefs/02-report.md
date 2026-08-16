# Report: Presence migration onto the broker-owned store (Stream 2)

## What was built

- **`server/workspace/src/realtime/presence.ts`** (tasks 2.1–2.2):
  - Removed closure maps `focusByConn` (`Map<string, ConnFocus>`) and `members`
    (`Map<string, Map<string, UserMembership>>`), and the `ConnFocus`/`UserMembership`
    interface types. No handler-scoped or module-scoped `Map` remains.
  - Replaced with `StoredFocus` (`{ path, lastActive }`) and `StoredMembership`
    (`{ connIds: string[], lastActive }`) interfaces — these are the shapes stored
    in the broker-owned `NamespaceStore` under the tech-plan key layout:
    `focus:<connId>` and `member:<path>\0<userId>`.
  - Added `store(workspaceId)` helper that calls `broker.storeFor(workspaceId,
    "presence")` — no caching, always delegates to the broker.
  - `roster(workspaceId, path)` is now async: calls `st.list("member:" + path +
    "\0")` and reconstructs `PresencePeer[]` from the store entries.
  - `clearFocus(conn)` is now `async`: reads `focus:<connId>`, deletes it, reads
    `member:<path>\0<userId>`, removes `conn.id` from `connIds`; if `connIds`
    becomes empty it deletes the member entry and emits `leave`; if other
    connections remain it updates the entry without emitting `leave` (multi-window
    semantics preserved).
  - `setFocus(conn, path)` is now `async`: reads the current focus, handles same-path
    update (refresh `lastActive`, emit `update`) and path-switch (await `clearFocus`
    first — leave-before-join atomicity preserved — then write new focus and member
    entries, emit `join` or `update` per first-connection-for-user logic).
  - `onSubscribe`, `onPublish`, `onDisconnect` are all declared `async` against the
    broker's `NamespaceHandler` contract (`Promise<{body?:unknown}>`,
    `void | Promise<void>`, `void | Promise<void>`).
  - Stream 1's `Promise.resolve(...)` readiness shim is gone; `onSubscribe` now
    awaits `roster()` from the store.

- **`server/workspace/tests/presence.test.ts`** (task 2.3):
  - Existing 7 scenarios are unchanged in assertions — all still pass against the
    async implementation (the broker's `handleClientMessage` awaits `onSubscribe`
    and `onPublish`, and `onDisconnect` fires-and-forgets with error swallowing, so
    the wire behavior seen by test WebSocket clients is byte-identical).
  - Added one new test: **"two-workspace isolation: same path, separate store
    scopes"**. It spins up a second `createBroker()` + `attachRealtime` server
    instance scoped to `workspaceId: "ws-b"`, focuses a user in `ws-a` on
    `notes/plan.md`, then subscribes from `ws-b` and verifies the roster is
    empty — confirming no bleed-through between store scopes. It also verifies
    `ws-a`'s roster contains only its own member, not `ws-b`'s. The second
    server is torn down in a `finally` block to avoid leaked handles.

## Verify output

Exact brief command:

```
$ pnpm --filter @aprovan/workspace exec vitest run tests/presence.test.ts && ! grep -n "new Map" server/workspace/src/realtime/presence.ts

 RUN  v2.1.5 .../server/workspace

 ✓ tests/presence.test.ts (8 tests) 379ms

 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  15:26:09
   Duration  818ms (transform 111ms, setup 10ms, collect 238ms, tests 379ms, environment 0ms, prepare 27ms)
```

The `grep -n "new Map"` command produced no output (exit 1 from grep → negated to exit 0). Both commands exited 0.

Typecheck also clean:

```
$ pnpm --filter @aprovan/workspace typecheck
> tsc -p tsconfig.json --noEmit && tsx scripts/check-effect-completeness.ts
effect-completeness: ok (137 tools)
```

## Deviations

**None.** Implementation follows the frozen key layout from tech-plan "Interfaces &
Data" exactly (`focus:<connId>`, `member:<path>\0<userId>`, roster prefix
`member:<path>\0`). All wire-observable behavior is byte-identical to pre-migration:

- Roster snapshot shape (`{ peers: PresencePeer[] }`) unchanged.
- Join/leave/update delta shape and ordering rules unchanged.
- Leave-before-join on path switch preserved (sequential `await clearFocus` before
  writing new entries).
- Multi-window: only the last connection departing emits `leave` — preserved via
  `connIds` array in `StoredMembership`.
- Blur clears focus (exclusive focus model) — preserved.
- Disconnect clears focus — preserved.

`connIds` in `StoredMembership` uses `string[]` (serializable to the KV store)
instead of the former `Set<string>`. Semantics are identical; sets were an
in-memory optimization that the async store interface cannot carry.

## Notes for Stream 4 (e2e verification)

- `presence.ts` now holds zero `new Map` calls — the grep gate `! grep -n "new Map"
  server/workspace/src/realtime/presence.ts` passes cleanly.
- `focusByConn` and `UserMembership` (the names Stream 4's Verify grep-gates)
  are fully removed from `presence.ts`.
- The eight `presence.test.ts` scenarios (7 original + 1 new isolation case) are
  the behavioral contract. Stream 4's `realtime-e2e.test.ts` update (task 4.1)
  can rely on these passing unchanged.
- The `snapshot on subscribe includes focused peers and self when focused` test
  uses a `setTimeout(r, 30)` delay before subscribe to let async publish settle —
  this pattern was already in the pre-migration test and remains sufficient because
  the in-process store resolves already-settled promises synchronously under the hood.

## Blockers

None.
