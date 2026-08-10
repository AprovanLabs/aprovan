# Brief: Broker contract and namespace store (Stream 1)

**Model:** Sonnet (default tier — see `openspec/changes/IW-9-EXECUTION-OVERVIEW.md`
"Model tiers for the implementing fleet": this stream elaborates a frozen
tech-plan contract, not novel/security-shaped logic, so it does not qualify
for the Opus escalation list).

## Mission

When you are done, `server/workspace/src/realtime/broker.ts` exposes an
async `NamespaceHandler` contract (`onSubscribe` returns a Promise,
`onPublish`/`onDisconnect` are promise-tolerant), a new
`server/workspace/src/realtime/store.ts` gives the broker an owned, ephemeral
per-(workspace, namespace) key-value store reachable via
`RealtimeBroker.storeFor(...)`, and every fan-out goes through an optional
per-handler `authorize` hook. This is the frozen interface
`iw9-chat-flagship` (Wave 2) builds its message/typing/presence namespace
against — get the shapes exactly right, because changing them later reopens
Chat's plan by rule.

This stream also carries one narrowly-scoped readiness fix (task 1.7): the
interface change alone would break `presence.ts`'s typecheck before Stream 2
(which owns presence's real migration) ever runs. You add a
compile-preserving `Promise.resolve(...)` wrap to `presence.ts` and nothing
else — no store reads, no behavior change. Read `briefs/deviations.md` item
1 before touching `presence.ts` so you understand exactly where the
boundary is.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 7, D16, the F5 entry under "Wave 0"
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 7 binding text
3. `openspec/changes/iw9-f5-broker-spec/prd.md`
4. `openspec/changes/iw9-f5-broker-spec/tech-plan.md` — Decisions D1–D4 (note D3's sync-seam clarification), "Interfaces & Data" (the frozen contract)
5. `openspec/changes/iw9-f5-broker-spec/specs/realtime-broker/spec.md`
6. `openspec/changes/iw9-f5-broker-spec/briefs/deviations.md` — items 1 (why task 1.7 exists) and 2 (why `storeFor` must not do an async workspace lookup)
7. `server/workspace/src/realtime/broker.ts` — current sync implementation, full file
8. `server/workspace/src/realtime/protocol.ts` — `Topic`, `ServerMessage`, `ClientMessage` types (unchanged, just consumed)
9. `server/workspace/src/runtime/config.ts` (`resolveLocusDispatch`, `storeBackendForLocus`, around lines 255–298) — the seam D3 mirrors, and why it can't be called synchronously from `storeFor`
10. `server/workspace/src/workspaces.ts` (`getWorkspace`, `resolveLocus`) — confirms the async workspace-record read that makes the D3 clarification necessary
11. `server/workspace/src/realtime/presence.ts` — read in full; task 1.7's only target is `onSubscribe` (currently lines 172-175)
12. `server/workspace/tests/presence.test.ts` — must stay green against your shim (part of this stream's Verify)

## Tasks

(Verbatim from `openspec/changes/iw9-f5-broker-spec/tasks.md` §1, as amended)

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
- [ ] 1.7 Readiness fix (see `briefs/deviations.md`): `presence.ts`'s
      `onSubscribe` (presence.ts:172-175) returns a plain object today, which
      no longer satisfies the `Promise<{ body?: unknown }>` signature from
      1.1 — leaving it untouched fails this stream's own `typecheck` Verify
      before Stream 2 ever runs. Wrap the return in `Promise.resolve(...)`
      only: zero behavior change, no store reads, no state migration. This
      is the only edit to `presence.ts` in this stream. Stream 2 replaces
      this shim wholesale with the real store-backed implementation (its
      tasks 2.1-2.2) — do not build on top of it, and do not add anything
      here beyond the `Promise.resolve` wrap.

## Acceptance criteria

Full WHEN/THEN scenarios from `specs/realtime-broker/spec.md` this stream
satisfies (task 1.7 has no dedicated scenario of its own — it is a readiness
fix, not a new requirement; don't search for one):

> #### Scenario: Handler resolves asynchronously
> - **WHEN** a client subscribes to a topic whose handler resolves its snapshot body from an awaited store read
> - **THEN** the client receives `{type:"subscribed", topic, body}` carrying the resolved body after the promise fulfills, and the subscription is active
>
> #### Scenario: Rejected subscribe rolls back
> - **WHEN** a handler's `onSubscribe` promise rejects for a topic the connection was not previously subscribed to
> - **THEN** the client receives `{type:"error", code:"bad-topic"}` with the rejection message and no subscription state remains for that (connection, topic)
>
> #### Scenario: Store scoped per workspace and namespace
> - **WHEN** two workspaces have presence members on the same path
> - **THEN** each workspace's entries live under that workspace's store scope and neither can read or clobber the other's
>
> #### Scenario: Client recovers by resubscribing
> - **WHEN** a client suspects it missed events (reconnect, buffer-drop disconnect)
> - **THEN** re-subscribing yields a `subscribed` body sufficient to rebuild current state without any replayed events
>
> #### Scenario: Local locus resolves in-process
> - **WHEN** the broker constructs a namespace store for a `local`-locus workspace
> - **THEN** the in-process backend is selected with no network or AWS SDK loaded
>
> #### Scenario: Backend swap requires no handler change
> - **WHEN** a second store backend is introduced behind the factory
> - **THEN** namespace handlers compile and run unchanged — they depend only on the store interface
>
> #### Scenario: Fan-out re-checks authorization
> - **WHEN** an event is published to a topic with subscribers whose authorization hook rejects one connection
> - **THEN** that connection does not receive the event while remaining subscribers do, and the rejection is not an error frame to anyone
>
> #### Scenario: Subscription is not a grant
> - **WHEN** a connection holds a subscription that predates an authorization change rejecting it
> - **THEN** subsequent fan-outs deliver nothing to that connection — the stale subscription confers no access

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/realtime-broker.test.ts tests/presence.test.ts && pnpm --filter @aprovan/workspace typecheck
```

Both must pass. `tests/presence.test.ts` is included specifically to confirm
your task-1.7 shim doesn't change presence's observable behavior.

## Constraints

- Touches only: `server/workspace/src/realtime/broker.ts`,
  `server/workspace/src/realtime/store.ts`,
  `server/workspace/src/realtime/presence.ts` (task 1.7 only — the
  `Promise.resolve` wrap, nothing more),
  `server/workspace/tests/realtime-broker.test.ts`.
- The interfaces in `tech-plan.md` "Interfaces & Data" are fixed — if one
  seems wrong, stop and report instead of changing it (it's load-bearing for
  a Wave-2 change you can't see).
- `NamespaceStoreFactory`/`storeFor` must stay synchronous — do not add an
  async workspace-locus lookup to make it "really" locus-aware; see
  `briefs/deviations.md` item 2 and D3's clarification.
- Surgical changes only; match existing style.
- Do not touch `socket.ts` — that file (including the `handleClientMessage`
  call-site update) belongs to Stream 3.

## Report back

When done: check off tasks 1.1–1.7 in `openspec/changes/iw9-f5-broker-spec/tasks.md`,
and write `openspec/changes/iw9-f5-broker-spec/briefs/01-report.md` containing
what you built, the Verify output, any deviations, and an explicit note
confirming task 1.7's shim is ready for Stream 2 to replace (so the next
dispatch doesn't have to re-derive that from the diff).
