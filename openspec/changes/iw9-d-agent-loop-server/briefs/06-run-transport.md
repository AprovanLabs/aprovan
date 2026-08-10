# Brief: Client RunTransport, dev-flagged (stream 6)

**Model tier: Sonnet.** **Depends-on: stream 5 (merged).** May run in
parallel with stream 10 — disjoint files.

## Mission

When you are done, the web client has a second chat transport —
`features/chat/run-transport.ts` — that posts a turn to the gateway and
renders the reply purely from the server's run event stream, reconnecting by
sequence number when the connection drops. It ships behind a dev-only toggle
next to the existing transport, so the shipping chat loop keeps working while
streams 6-8 validate the new one. This is the only file in the codebase that
speaks both the AI SDK's vocabulary and the run protocol's.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-d-agent-loop-server/prd.md`
3. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D2** and the Verification addendum's two client integration points.
4. `openspec/changes/iw9-d-agent-loop-server/ux.md` — Flows "Send a message", "Lock the phone / lose the network mid-run", "Reload / second device mid-run", and "Tool-call pill" (the partial-state-on-reattach rule).
5. `openspec/changes/iw9-d-agent-loop-server/specs/agent-run-stream/spec.md`
6. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble.
7. `briefs/02-report.md` — **read the 2.3 finding**: whether assistant text arrives as real token deltas or one buffered delta per turn changes what your tests can assert.
8. `packages/agent-protocol/src/*` — `ChatTurnRequest`, `parseRunEvent`, `chatTurnPath`, `runStreamPath`.
9. `client/web/src/pages/ChatPage.tsx:74-108` — where `useChatTransport(...)` builds the transport object.
10. `client/web/src/features/sessions/useSessionOrchestration.ts` — wraps it into the AI SDK `Chat` instances; unchanged by you except the toggle.
11. `client/web/src/features/chat/chat-transport.ts` — the legacy transport that stays wired until stream 8.
12. `client/web/src/features/chat/MessageParts.tsx:192-213` — the `tool-*`/`dynamic-tool` part shapes you must produce.

## Tasks

- [ ] 6.1 Create `features/chat/run-transport.ts`: an AI SDK `ChatTransport` implementation — `sendMessages` posts to `POST /agents/chat-turn` (via `@aprovan/agent-protocol`'s `ChatTurnRequest`), then opens `GET /agents/runs/:id/stream?from=0` (stream 3) and translates `RunEvent`s into `UIMessage` stream parts: `assistant_delta` → text-delta parts, `tool_call_started`/`tool_call_finished` → the `tool-*`/`dynamic-tool` part shape `MessageParts.tsx` already renders (~L192-213), `run_finished`/`error` → finish/error.
- [ ] 6.2 Implement reconnect-with-`from`: on stream drop, reattach at the last consumed `seq`; skip (never throw on) an event whose `type` `parseRunEvent` (stream 1.3) doesn't recognize (spec "Unknown event types are ignored").
- [ ] 6.3 Add a dev-only toggle (code-level constant or env var, not a shipped product feature flag) so `ChatPage.tsx`/`useSessionOrchestration.ts` can construct either `useChatTransport` (legacy, `chat-transport.ts`) or the new `RunTransport` (6.1) — both remain wired until stream 8 flips the default and removes the toggle.
- [ ] 6.4 New test file `__tests__/run-transport.test.ts`: each `RunEvent` type maps to the expected `UIMessage` part; reconnect produces no duplicate or missing parts across a simulated drop; a `tool_call_started` with no matching `tool_call_finished` yet (mid-replay) renders as the "running" state, matching ux.md's "Partial state on reattach: … renders as running — correct by construction from replay order."

## Acceptance criteria

From `specs/agent-run-stream/spec.md` (client side):

### Requirement: Run event vocabulary

#### Scenario: Unknown event types are ignored

- **WHEN** a client built against this protocol receives an event whose type it does not recognize (e.g. a future `pending_action`)
- **THEN** it skips the event without erroring and continues consuming the stream

### Requirement: Reattach and replay by run id

#### Scenario: Client reattaches mid-run

- **WHEN** a client that consumed events up to `seq` 41 reconnects with `from=42` while the run is still executing
- **THEN** it receives every event from 42 onward with no gap and no duplicate, followed by the live tail through `run_finished`

#### Scenario: Locked phone loses nothing

- **WHEN** the streaming connection dies mid-run (backgrounded tab, network drop) and the client later reattaches with the last `seq` it saw
- **THEN** the replayed-plus-live event sequence is identical to what an uninterrupted client would have received

### Requirement: Run event vocabulary — widget fences

#### Scenario: Widget fences stream through deltas

- **WHEN** the assistant's text contains a fenced widget block emitted across several deltas
- **THEN** `assistant_delta` events carry the fence content verbatim and in order, so a client can render the widget incrementally exactly as it does from today's UI message stream

Plus the ux.md contract: a `tool_call_started` with no finish yet renders as
running — correct by construction from replay order.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web test -- src/features/chat/__tests__/run-transport.test.ts && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Keep `useChat`/`UIMessage`/`MessageParts` untouched — only the transport changes (D2). Do not drop the AI SDK.
- The toggle is a code-level constant or env var, **not** a shipped product feature flag, and the legacy branch stays working until stream 8.
- Build every URL from `@aprovan/agent-protocol`'s helpers; no string literals.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `client/web/src/features/chat/run-transport.ts`, `client/web/src/features/chat/chat-transport.ts`, `client/web/src/features/sessions/useSessionOrchestration.ts`, `client/web/src/pages/ChatPage.tsx`, `client/web/src/features/chat/__tests__/run-transport.test.ts`.

## Report back

Check off tasks as each Verify passes, and write `briefs/06-report.md`:
the toggle's name and default, the event→part mapping table, anything stream
7 needs to route a heal request through your path, and any deviations.
