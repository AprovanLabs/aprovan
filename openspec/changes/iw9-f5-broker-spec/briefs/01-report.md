# Report: Broker contract and namespace store (Stream 1)

## What was built

- **`server/workspace/src/realtime/broker.ts`** (task 1.1, 1.3, 1.4, 1.5):
  - `NamespaceHandler.onSubscribe` now returns `Promise<{ body?: unknown }>`;
    `onPublish`/`onDisconnect` are `void | Promise<void>`; added optional
    `authorize?(conn, topic): boolean`.
  - `RealtimeBroker.handleClientMessage` is now `async`/`Promise<void>` and
    `await`s `onSubscribe`/`onPublish`. Reject on subscribe rolls back the
    just-created subscription (topic/subs maps) and sends
    `{code:"bad-topic"}` with the rejection message — same rollback shape as
    the old synchronous throw path, now driven by a `try { await ... } catch`.
    Reject on publish sends `{code:"bad-body"}`. `onDisconnect` stays
    fire-and-forget: wrapped in `Promise.resolve(...).catch(() => {})` plus an
    outer `try/catch` so a synchronous throw (before the handler ever returns
    a promise) is swallowed too, matching the original fire-and-forget intent
    for both sync and async handler implementations.
  - Added `RealtimeBroker.storeFor(workspaceId, namespace)`, delegating to an
    injectable `NamespaceStoreFactory` (`createBroker(opts?: { storeFactory?
    })`, defaulting to `createNamespaceStoreFactory()`). `dropEmptyWorkspace`
    now also calls `storeFactory.dropWorkspace(workspaceId)`.
  - `publishToTopic`'s delivery loop now resolves the topic's registered
    handler and, per candidate connection (after existing workspace/`except`
    scoping), skips delivery when `handler.authorize` is present and returns
    `false`. Absent hook = allow, preserving current behavior.
  - Added a module-doc block stating the delivery-semantics contract (no
    cross-topic/cross-publisher ordering, no exactly-once, `subscribed` body
    is the recovery mechanism) per spec "No ordering or exactly-once
    assumptions."

- **`server/workspace/src/realtime/store.ts`** (new, task 1.2): `NamespaceStore`
  (async `get`/`set`/`delete`/`list`-by-prefix) and `NamespaceStoreFactory`
  (`storeFor`, `dropWorkspace`) interfaces exactly as frozen in tech-plan
  "Interfaces & Data," plus an in-process `Map`-backed implementation and
  `createNamespaceStoreFactory()`. Per deviations.md item 2's clarification of
  D3, this does **not** import or call `resolveLocusDispatch`/perform any
  workspace-locus lookup: `storeFor` is synchronous by contract, and since
  every locus resolves to the same in-process backend today (D16), the
  factory constructs the in-process store unconditionally. The doc comment on
  `createNamespaceStoreFactory()` documents the selection seam (matching the
  tech-plan's own comment verbatim in intent) without a live `if (locus ===
  ...)` branch, since there is nothing to branch on yet.

- **`server/workspace/src/realtime/presence.ts`** (task 1.7, readiness shim
  only): `onSubscribe`'s return is wrapped in `Promise.resolve(...)` with a
  comment marking it as the Stream 1 readiness shim for Stream 2 to replace.
  No other line in this file was touched — no store reads, no behavior
  change, `focusByConn`/`members` closure maps are untouched.

- **`server/workspace/tests/realtime-broker.test.ts`** (new, task 1.6): unit
  tests against `createBroker()` with hand-rolled fake `Conn`s (no real
  sockets needed for this stream's contract-level coverage). Covers:
  - async subscribe body delivery resolved from an awaited `storeFor` read
  - reject-rollback: `onSubscribe` throwing yields `bad-topic` and leaves no
    residual subscription (a subsequent `publishToTopic` delivers nothing)
  - publish rejection → `bad-body`
  - `storeFor` scoping across two workspaces (same key, independent values)
  - store dropped when its workspace's connection state is dropped
    (`removeConnection` on the last connection)
  - authorize hook filtering one subscriber while another still receives
  - stale-subscription-confers-nothing: flipping `authorize` to reject
    between two publishes stops delivery to the still-subscribed connection
    without ever unsubscribing it, and without surfacing an error frame

## Verify output

Exact brief command, run from `server/workspace` via the `aprovan` root
`pnpm --filter`:

```
$ pnpm --filter @aprovan/workspace exec vitest run tests/realtime-broker.test.ts tests/presence.test.ts && pnpm --filter @aprovan/workspace typecheck

 RUN  v2.1.5 .../server/workspace

 ✓ tests/realtime-broker.test.ts (6 tests) 3ms
 ✓ tests/presence.test.ts (7 tests) 321ms

 Test Files  2 passed (2)
      Tests  13 passed (13)

> @aprovan/workspace@0.2.0 typecheck
> tsc -p tsconfig.json --noEmit
(clean — no output)
```

Both commands exited 0. `tests/presence.test.ts`'s 7 pre-existing scenarios
(rejects non-canonical paths, watching-is-not-being-there, path-switch
atomicity, disconnect-emits-leave, subscribe snapshot with self, multi-window
join/leave, zero `presence:` record-store keys) all still pass unmodified,
confirming the task-1.7 shim is behavior-preserving.

As an out-of-scope sanity check (not part of this stream's Verify, no files
outside Touches were changed to make it pass), `tests/realtime-socket.test.ts`
and `tests/realtime-e2e.test.ts` were also run and remain green — the
async-tolerant `await` on a handler that still returns a plain object (not a
`Promise`) works because `await` accepts non-promise values.

## Deviations

None beyond the two already recorded in `briefs/deviations.md` before this
dispatch (item 1 — why task 1.7 exists; item 2 — why `storeFor` stays
synchronous with no live locus branch). No new deviations were needed:
implementation followed the frozen "Interfaces & Data" shapes in
`tech-plan.md` exactly (`Conn`, `NamespaceHandler`, `RealtimeBroker`,
`createBroker(opts?)`, `NamespaceStore`, `NamespaceStoreFactory`,
`createNamespaceStoreFactory()`).

`socket.ts` was not touched (Stream 3's `Touches`); its existing unawaited
call site `broker.handleClientMessage(conn, parsed);` (socket.ts:266) still
compiles unchanged against the new `Promise<void>` return — TypeScript does
not error on a floating/ignored promise — so this stream's Verify and the
broader realtime suite both stay green ahead of Stream 3's planned `void`
call-site edit.

## Task 1.7 shim — ready for Stream 2

Confirmed: `presence.ts`'s `onSubscribe` is exactly `Promise.resolve({ body:
{ peers: roster(conn.workspaceId, path) } })` — the same synchronous roster
read as before, wrapped in `Promise.resolve` only. `focusByConn` and
`members` closure maps, `onPublish`, `onDisconnect`, `setFocus`, `clearFocus`,
and `roster` are byte-identical to pre-Stream-1 `presence.ts`. Stream 2
(tasks 2.1–2.2) can replace this wrapped return, along with the closure maps,
wholesale with the real `broker.storeFor(conn.workspaceId, "presence")`-backed
implementation using the key layout from tech-plan "Interfaces & Data"
(`focus:<connId>`, `member:<path>\0<userId>`) — nothing in this shim was
built upon or extended beyond the one-line wrap, per the brief's constraint.

## Blockers

None.
