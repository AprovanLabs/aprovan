# Brief: CF-1 — App-scoped realtime handler (core touch)

**Depends-on: 1 (merged)** | Repo: aprovan | Wave 1 (parallel with 4)

## Mission

When you are done, one generic `NamespaceHandler` at namespace `app` /
topic `app:<installId>` handles subscribe snapshots, sync `authorize?`
via stream 1's `canReadChannel`, message publish hints, priority
channel-membership events, and ephemeral presence/typing with **zero**
`records.*`/`vfs.*` writes. This is the deliberate minimal core touch
(CF-1). Invariant 7.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **invariant 7**, 3
3. `openspec/changes/iw9-chat-flagship/prd.md` — Presence / invariant 7 goals
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — CF-1, T3–T5, Interfaces realtime wire
5. `openspec/changes/iw9-chat-flagship/specs/chat-realtime/spec.md`
6. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 2
7. iw9-f5 frozen: `RealtimeBroker`/`NamespaceHandler`/`NamespaceStore`, async `onSubscribe`, sync `authorize?`
8. `realtime/presence.ts` pattern; stream 1 `canReadChannel`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 2.1 Create `realtime/app-topics.ts`: one generic `NamespaceHandler`
      registered at boot, namespace `app`, topic grammar `app:<installId>`
      (tech-plan Architecture, finding CF-1). `onSubscribe` (async, per
      iw9-f5's frozen contract) calls `assertInstanceAccess` and returns the
      channel list + presence roster snapshot as the subscribe body.
- [x] 2.2 Implement the sync `authorize?(conn, topic)` hook (iw9-f5 D4) by
      resolving the event's `channelId` from the topic's per-connection
      cached subscribe state and calling stream 1's `canReadChannel` —
      **the same function**, not a reimplementation (spec `chat-realtime`
      "Authorization re-applied at fan-out"). Cache only what F5's D4
      requires to answer synchronously (channel membership snapshot in the
      handler's `NamespaceStore`, invalidated on channel-membership events).
- [x] 2.3 Wire `onPublish` for message posts (persists via stream 1's
      `postMessage`, then `publishToTopic` with `{kind:"message", channelId,
      recordId, seq}` — payload is a hint per T4, not the message body) and
      `{kind:"channel-membership"}` events on the priority class (iw9-f5 D5:
      control-channel path, undroppable).
- [x] 2.4 Ephemeral presence/typing sub-protocol (T5) inside the same
      handler, modeled on `realtime/presence.ts`'s pattern but reached via
      `broker.storeFor(workspaceId, "app")` (iw9-f5 D2 — broker-owned store,
      no handler-closure state): instance roster + channel-scoped typing,
      typing events on the droppable/non-priority class. No write to
      `records.*`/`vfs.*` anywhere in this file — grep-verifiable (PRD
      "Presence visible" goal).
- [x] 2.5 New test file `tests/realtime-app-topics.test.ts`: subscribe
      returns channel+presence snapshot for a participant, 404-equivalent
      rejection for a non-participant, guest never receives an event for a
      restricted channel they're not a member of (flip `canReadChannel` mid-
      stream and assert no delivery — invariant 7, mirrors iw9-f5's own
      "stale-subscription-confers-nothing" test shape), typing/presence
      round-trip with zero calls into `records.*`/`vfs.*` (assert via a
      spy/mock on those modules), channel-membership event delivered on the
      priority path even with the event queue saturated.

## Acceptance criteria

From `specs/chat-realtime/spec.md`:

#### Scenario: Guest never receives unreadable-channel events
- **WHEN** a guest is subscribed to the instance's realtime topics and a
  message is posted in a restricted channel the guest cannot read
- **THEN** the guest's connection receives no event for it

#### Scenario: Revocation takes effect at fan-out
- **WHEN** a participant's access to a channel is revoked while they hold an
  open subscription
- **THEN** events fanned out after the revocation are not delivered to them,
  without requiring a reconnect

#### Scenario: Typing indicator round-trip / Disconnect clears presence
(presence/typing ephemeral; no persistent rows)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace exec vitest run tests/realtime-app-topics.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/realtime/app-topics.ts`, `aprovan/server/workspace/tests/realtime-app-topics.test.ts`
- Reuse `canReadChannel` — never duplicate. No `records.*`/`vfs.*` writes in this file.
- F5 contracts frozen.

## Report back

Check off tasks; PR or `briefs/02-report.md`; note topic grammar for
streams 7/12.
