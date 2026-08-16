# Brief: `ChatTimelineAdapter` and messaging feature UI

**Depends-on: 1, 2, 6 (merged)** | Repo: aprovan | Wave 2 (parallel with 5)

## Mission

When you are done, `ChatTimelineAdapter` is the only module talking to
records/realtime; the messaging UI wraps vendored `MessageTimeline`, adds
channel rail, one-level thread pane, thin composer (T7), presence/typing,
and all ux.md reconnect/reconcile states. Event payloads are hints (T4).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 7, 8
3. `openspec/changes/iw9-chat-flagship/ux.md` — Instance view states; Presence and typing; composer
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — T4, T7, Interfaces `ChatTimelineAdapter`
5. `openspec/changes/iw9-chat-flagship/specs/chat-realtime/spec.md` — Backpressure / Live timeline
6. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 7
7. Vendored timeline from stream 6; stream 1/2 APIs

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 7.1 Implement `ChatTimelineAdapter` (`features/messaging/adapter.ts`)
      exactly to the interface in tech-plan.md "Interfaces & Data"
      (`fetchWindow`, `fetchOlder`, `send`, `onEvent`, `connectionState`,
      `presence`, `signalTyping`) — the ONLY module that talks to
      `records.*`/the realtime broker; everything else in `features/
      messaging/` consumes the adapter, never the platform surfaces
      directly (tech-plan Architecture).
- [ ] 7.2 Reconciliation per T4: `onEvent` hints trigger a re-fetch of the
      canonical window via `fetchWindow`/`fetchOlder`, never trusting the
      event payload as source of truth; `connectionState()` surfaces
      `live`/`reconnecting`/`reconciling` per iw9-f5's disconnect/resubscribe
      contract (spec `chat-realtime` "Backpressure conformance", "Slow
      client reconciles after disconnect").
- [ ] 7.3 Build channel rail, timeline pane (wraps vendored
      `MessageTimeline` from stream 6 — styling only, no fork), thread pane
      (opens on demand, one level, no reply-to-reply affordance per ux.md),
      and the thin composer (T7: plain textarea, Enter sends, Shift+Enter
      newline, typing signal on keystroke — no rich text, no buzz composer
      per D24).
- [ ] 7.4 Presence/typing UI: rail presence dots, roster tooltip, "{n}
      people are typing…" with ~4s client-side expiry (ux.md "Presence and
      typing" flow) — reads `adapter.presence()`/`onEvent` only, no direct
      store access.
- [ ] 7.5 Reconnect/reconcile/over-cap/access-revoked/deleted-instance UI
      states exactly as enumerated in ux.md "Instance view" States list (no
      blank flash, no duplicate messages, distinguishable over-cap error,
      revoked-channel swap without reconnect).
- [ ] 7.6 New test file `client/web/src/lib/__tests__/chat-timeline-adapter.test.ts`:
      hint-triggers-refetch reconciliation, reconnect state transitions,
      send failure surfaces the over-cap error distinguishably, typing
      signal is fire-and-forget (adapter never blocks composer on it).

## Acceptance criteria

From `specs/chat-realtime/spec.md`:
#### Scenario: Slow client reconciles after disconnect
#### Scenario: Two-client message delivery
Plus ux.md Instance view States and Presence/typing flows.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/src/features/messaging/**`, `aprovan/client/web/src/lib/__tests__/chat-timeline-adapter.test.ts`
- Do not fork vendored MessageTimeline. No buzz composer. Adapter is the only platform bridge.

## Report back

Check off tasks; PR or `briefs/07-report.md`; unblock streams 8/10/12.
