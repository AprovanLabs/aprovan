# Brief: Reattach/replay stream endpoint (stream 3)

**Model tier: Opus.** Resumability correctness; failure modes are silent
(missing or duplicated events a user only notices as a mangled transcript).
**Depends-on: stream 2 (merged). May run in parallel with stream 4 —
disjoint files.**

## Mission

When you are done, the gateway exposes `GET /agents/runs/:id/stream?from=<seq>`
as SSE: it replays every persisted event from `from` onward, then tails live
emission until the run is terminal, and it can be attached any number of
times concurrently without touching the run. This is the mechanism behind the
product promise — lock your phone mid-reply, come back, and nothing is lost.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 7 (topics route, never authorize) is why this is an SSE GET and not a broker topic.
3. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 1 is your acceptance bar.
4. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D1** (and its rejected alternatives: `streaming-sessions`, job splicing, WebSocket/broker) and the frozen HTTP surface.
5. `openspec/changes/iw9-d-agent-loop-server/specs/agent-run-stream/spec.md`
6. `openspec/changes/iw9-d-agent-loop-server/ux.md` — "Lock the phone / lose the network mid-run".
7. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble.
8. `server/workspace/src/agents/run-events.ts` — stream 2's `readRunEvents`/`subscribeRunEvents`.
9. `packages/agent-protocol/src/*` — `encodeRunEventFrame`, `AGENTS_ROUTE_PREFIX`, `runStreamPath`.
10. `server/workspace/src/routes/llm.ts` ~L338-345 — the "job-backed, first-byte-immediately" keepalive lesson (CloudFront's 60s origin-read timeout).
11. `server/workspace/src/app.ts:144-169` — the router-mounting pattern.
12. `server/workspace/src/routes/sessions-streaming.ts` — reuse its SSE frame discipline, not its lifecycle (see D1).

`server/workspace/src/routes/agent-chat.ts` does not exist yet; you create
it. Stream 5 will add `POST /agents/chat-turn` to the same file later.

## Tasks

- [ ] 3.1 Create `routes/agent-chat.ts` with `GET /agents/runs/:id/stream?from=<seq>` (SSE, using `@aprovan/agent-protocol`'s `encodeRunEventFrame`): replay `readRunEvents(from)` then tail live via `subscribeRunEvents`; close the connection after the terminal event (`run_finished`/`error`) is replayed or emitted.
- [ ] 3.2 Add keepalive SSE comments on an interval while the model is thinking, reusing the "job-backed, first-byte-immediately" lesson already applied in `routes/llm.ts` (~L338-345, CloudFront's 60s origin-read timeout) so a long-silent run doesn't get cut before its first event.
- [ ] 3.3 Mount the router in `app.ts` at the **frozen** prefix `app.route("/agents", agentChatRouter)`, following the existing `app.route("/prefix", xRouter)` pattern (see `app.ts:144-169`). The prefix is not a choice — it is `AGENTS_ROUTE_PREFIX` from stream 1.5, and streams 5/6/7 build their URLs from the same helpers. Confirm by test that mounting it does not shadow the `agents.*` tools-namespace dispatch (which is served under `/tools`, not `/agents`); if a real collision exists, STOP and record a blocker rather than renaming the prefix unilaterally, since the client contract is already frozen.
- [ ] 3.4 Support concurrent reattach: two clients streaming the same run id at different `from` values each receive correct, independent replay+tail with no cross-talk (spec "Reattaching SHALL be valid any number of times, concurrently, without affecting the run").
- [ ] 3.5 New test file `tests/agent-chat-stream.test.ts`: a client that consumed up to `seq` 41 and reconnects with `from=42` gets 42-onward with no gap/duplicate followed by the live tail through `run_finished` (spec "Client reattaches mid-run"); killing the stream mid-run and reattaching with the last-seen `seq` produces a byte-identical event sequence to an uninterrupted client (spec "Locked phone loses nothing" — this is the PRD's disconnect test, PRD Goal 1).

## Acceptance criteria

From `specs/agent-run-stream/spec.md`:

### Requirement: Reattach and replay by run id

The gateway SHALL expose a stream endpoint addressed by run id that accepts a
`from` sequence number, replays all persisted events with `seq >= from`, and
then continues with live events until the run is terminal. Reattaching SHALL
be valid any number of times, concurrently, without affecting the run.

#### Scenario: Client reattaches mid-run

- **WHEN** a client that consumed events up to `seq` 41 reconnects with `from=42` while the run is still executing
- **THEN** it receives every event from 42 onward with no gap and no duplicate, followed by the live tail through `run_finished`

#### Scenario: Locked phone loses nothing

- **WHEN** the streaming connection dies mid-run (backgrounded tab, network drop) and the client later reattaches with the last `seq` it saw
- **THEN** the replayed-plus-live event sequence is identical to what an uninterrupted client would have received

### Requirement: Ordered, persisted run events (consumer side)

#### Scenario: Event log survives the run

- **WHEN** a client requests the event stream of a run that reached a terminal state an hour ago
- **THEN** the full event history is replayed from the run record, ending with the terminal event

### Requirement: Runs are client-independent

#### Scenario: Disconnect does not cancel

- **WHEN** the only attached client disconnects while the run has three turns left
- **THEN** the run executes those turns, persists its events and terminal record, and a later `agents.get` shows `succeeded` with full turns

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-chat-stream.test.ts && pnpm --filter @aprovan/workspace typecheck
```

Your named test file is new, so it must be fully green. The repo-wide
baseline is 81 pre-existing failures elsewhere; do not repair them.

## Constraints

- Do not build on `streaming-sessions` and do not introduce broker/WebSocket semantics — both were considered and rejected in tech-plan D1 for stated reasons.
- Disconnect must never cancel a run; `agents.cancel` stays the only cancellation path.
- The `/agents` prefix and URL shapes are frozen client contract (stream 1.5). A genuine collision is a blocker to report, not a rename to make.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `server/workspace/src/routes/agent-chat.ts`, `server/workspace/src/app.ts`, `server/workspace/tests/agent-chat-stream.test.ts`.

## Report back

Check off tasks as each Verify passes, and write `briefs/03-report.md`:
what you built, how you verified the byte-identical-reattach claim, any
deviations, and anything streams 5 and 6 need (they add to your file and
consume your endpoint).
