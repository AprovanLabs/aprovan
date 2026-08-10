# Tasks — iw9-f5-broker-spec

External dependencies: none. No new packages, no registry-side work, no
publishes (IW-9 "Cross-repo coordination" table: F5 = `realtime/*`,
aprovan only). All work is inside `server/workspace/src/realtime/` and its
tests in the aprovan checkout. Interfaces between streams are frozen in
tech-plan.md "Interfaces & Data" (the iw9-chat-flagship contract) — streams
communicate only through those shapes. Verify commands run from the aprovan
repo root; the stream-4 deletion grep-gate also sweeps the sibling
`../registry` checkout (IW-9 cross-repo rule 4).

## 1. Broker contract and namespace store

> Repo: aprovan | Depends-on: - | Touches: aprovan/server/workspace/src/realtime/broker.ts, aprovan/server/workspace/src/realtime/store.ts, aprovan/server/workspace/tests/realtime-broker.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/realtime-broker.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 1.1 Change `NamespaceHandler.onSubscribe` to return
      `Promise<{ body?: unknown }>` and `onPublish`/`onDisconnect` to
      `void | Promise<void>`; broker awaits subscribe (reject → rollback of
      just-created subscription + `{code:"bad-topic"}`, mirroring the current
      throw path at broker.ts:182-193) and publish (reject →
      `{code:"bad-body"}`); disconnect stays fire-and-forget with errors
      swallowed. `handleClientMessage` returns `Promise<void>` (tech-plan D1;
      spec realtime-broker "Asynchronous subscribe contract").
- [ ] 1.2 Create `server/workspace/src/realtime/store.ts`: `NamespaceStore`
      (async `get`/`set`/`delete`/`list`-by-prefix), `NamespaceStoreFactory`
      (`storeFor`, `dropWorkspace`), in-process Map implementation, and
      `createNamespaceStoreFactory()` selecting by locus via
      `resolveLocusDispatch` from `runtime/config.ts` — cloud loci fall back
      to in-process with the D16 deferral documented at the selection site
      (tech-plan D2/D3).
- [ ] 1.3 Wire the factory into `createBroker(opts?)`: expose
      `RealtimeBroker.storeFor(workspaceId, namespace)`; drop a workspace's
      stores from `dropEmptyWorkspace` (broker.ts:68-72); factory injectable
      for tests.
- [ ] 1.4 Add optional `NamespaceHandler.authorize?(conn, topic): boolean`
      and evaluate it per candidate connection inside `publishToTopic`'s
      delivery loop (after existing workspace scoping); absent hook = allow
      (tech-plan D4; spec "Topic keys route, they never authorize").
- [ ] 1.5 Write the delivery-semantics contract into the broker module doc:
      no cross-topic or cross-publisher ordering, no exactly-once; the
      `subscribed` body is the recovery mechanism (spec "No ordering or
      exactly-once assumptions").
- [ ] 1.6 New `tests/realtime-broker.test.ts` covering: async subscribe body
      delivery, reject-rollback (no residual subscription state), publish
      rejection → `bad-body`, `storeFor` scoping across two workspaces, store
      dropped with workspace, authorize hook filtering one subscriber while
      others receive, and stale-subscription-confers-nothing (flip authorize
      to reject between publishes).

## 2. Presence migration onto the broker-owned store

> Repo: aprovan | Depends-on: 1 | Touches: aprovan/server/workspace/src/realtime/presence.ts, aprovan/server/workspace/tests/presence.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/presence.test.ts && ! grep -n "new Map" server/workspace/src/realtime/presence.ts

- [ ] 2.1 Replace the closure maps `focusByConn`/`members`
      (presence.ts:71-73, types `ConnFocus` presence.ts:30-33 /
      `UserMembership` presence.ts:36-39) with reads/writes through
      `broker.storeFor(conn.workspaceId, "presence")` using the key layout
      from tech-plan "Interfaces & Data" (`focus:<connId>`,
      `member:<path>\0<userId>`).
- [ ] 2.2 Make `onSubscribe`/`onPublish`/`onDisconnect` async against the
      store while keeping wire behavior byte-identical: roster `subscribed`
      body, join/leave/update deltas, exclusive focus (leave-before-join on
      path change), blur clears focus, disconnect clears focus (spec
      "Namespace handlers hold no state", both scenarios).
- [ ] 2.3 Update `tests/presence.test.ts` for the async handler contract and
      add a two-workspace isolation case (same path, separate store scopes);
      confirm zero handler-module state remains (the Verify grep gate).

## 3. Socket backpressure

> Repo: aprovan | Depends-on: 1 | Touches: aprovan/server/workspace/src/realtime/socket.ts, aprovan/server/workspace/tests/realtime-socket.test.ts, aprovan/server/workspace/tests/realtime-backpressure.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/realtime-socket.test.ts tests/realtime-backpressure.test.ts

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
      test-injectable, matching the existing `pingIntervalMs` pattern; update
      `tests/realtime-socket.test.ts` for the async `handleClientMessage`
      call site.
- [ ] 3.4 New `tests/realtime-backpressure.test.ts`: full queue drops oldest
      and keeps newest; control frame delivered while event queue saturated;
      burst coalesced into batched in-order writes; N consecutive full-buffer
      flushes → close 1013 with handlers observing a normal disconnect;
      drain before N resets the counter and keeps the connection open (every
      realtime-socket delta scenario).

## 4. End-to-end verification and contract gates

> Repo: aprovan | Depends-on: 1, 2, 3 | Touches: aprovan/server/workspace/tests/realtime-e2e.test.ts | Verify: pnpm --filter @aprovan/workspace test && grep -n "Promise<{ body?: unknown }>" server/workspace/src/realtime/broker.ts && ! grep -rn "focusByConn\|UserMembership" server/workspace/src/realtime/presence.ts && ! grep -rn --include="*.ts" "focusByConn\|UserMembership" ../registry/packages

- [ ] 4.1 Update `tests/realtime-e2e.test.ts` for the async contract and add
      an end-to-end recovery case: client is disconnected for slowness (or
      drops events), reconnects, resubscribes, and rebuilds correct presence
      state from the `subscribed` body alone (spec "Client recovers by
      resubscribing").
- [ ] 4.2 Run the full workspace suite plus the grep gates in Verify
      (MIGRATION-DEBT definition of done: replaced state names return
      nothing **in both repos** — aprovan realtime sources and the sibling
      `../registry` checkout, per IW-9 cross-repo rule 4; async signature
      present); confirm no file outside
      `server/workspace/src/realtime/` and its tests changed
      (`git diff --stat` scoped review — F5 shares no files with F1-F4/F6).
