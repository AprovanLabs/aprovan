# Brief: Chat-turn route and session bookkeeping (stream 5)

**Model tier: Sonnet.** **Depends-on: streams 3 and 4 (both merged).**
**Blocks: streams 6 and 10.** You are the only editor of
`agents/service.ts` until stream 10 starts — those two must never run
concurrently.

## Mission

When you are done, `POST /agents/chat-turn` exists: it resolves or lazily
creates the chat session, persists the user message server-side, resolves the
run's profile, wires per-send file context, records the live run id on the
session, and answers `{ runId, sessionId, streamUrl }`. This is where chat
stops being composed in the browser. A reload or a second device must be able
to reconstruct the conversation from the session record alone, which is why
the server — not the client — owns the transcript write from here on.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-d-agent-loop-server/prd.md`
4. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D4**, "Agent-profile pass-through", the frozen HTTP surface, and the **Verification addendum** (session/message storage ground truth and the double-write warning).
5. `openspec/changes/iw9-d-agent-loop-server/specs/chat-agent-transport/spec.md`
6. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble, incl. the baseline rule.
7. `server/workspace/src/routes/agent-chat.ts` — stream 3's file; you add to it.
8. `server/workspace/src/vcs/chat-sessions.ts` — record scopes `svc#chat#sessions/<id>` and `svc#chat#session#<id>/<seq10>#<messageId>`; `ChatSessionRecord` at L60.
9. `server/workspace/src/agents/service.ts:394` — `renderAgentRun`, the rendering path you reuse (do not add a second one).
10. `client/web/src/features/chat/useChatSubmit.ts` — read-only gate L149, lazy create L157.
11. `client/web/src/features/sessions/useSessionOrchestration.ts:128` — the second, uncited lazy-create call site (see task 5.1).
12. `client/web/src/features/chat/chat-file-context.ts` — `buildContextFiles`/`formatContextFilesPrefix`.
13. `client/web/src/lib/chat-sessions.ts:25` — `ChatSessionInfo`.
14. `client/web/src/features/sessions/useSessionChatSync.ts` — today's client-side writer; it stays until stream 8.10 deletes it.

## Tasks

- [x] 5.1 Add `POST /agents/chat-turn` to `routes/agent-chat.ts`, body validated by `ChatTurnRequest` (stream 1.5): resolve `sessionId`, or lazy-create one (`mode: "staged"`, seed title from the message text) mirroring today's client-side lazy create (`client/web/src/features/chat/useChatSubmit.ts:154-167`, `createChatSession({ mode: "staged", title: seedTitle })`) — this task moves that call server-side. Note there is a second client lazy-create call site, `useSessionOrchestration.ts:128` (`createChatSession({ mode })`), which the tech-plan does not cite; it stays client-side (it creates a session outside the send path), so the route must tolerate being handed an already-created `sessionId` from either origin. Return 409 when the resolved session's `status` is `merged`/`closed` (spec "Read-only sessions cannot start runs") before starting any run.
- [x] 5.2 Persist the user message onto the session's transcript via the existing per-message append path in `vcs/chat-sessions.ts` (`svc#chat#session#<id>` records) — reuse the store's append function; do not add a second write path. **Ownership is decided, not open**: for run-driven turns the **server owns the write** — the chat-turn route persists the user message at run start and the completed assistant transcript at the run's terminal event, because a run must reconstruct from the session record alone even when no client is attached (spec chat-agent-transport "Session sync and lazy creation"). State this in the route's code comment. The now-duplicate client-side persistence in `useSessionChatSync.ts` is deleted in stream 8.10, not here — until the flag flips, the legacy transport still needs it, so both writers coexist for exactly the streams 6-7 window and the route's append MUST be idempotent per `(sessionId, messageId)` so the overlap cannot double-write.
- [x] 5.3 Resolve the run's profile per tech-plan D4: session's stored `agent` name (future iw9-chat seam, D15) if present, else an ephemeral profile built from the request's `provider`/`model` and the caller's grants; render it through `renderAgentRun`'s existing shape (`agents/service.ts` ~L391-483, `agents/service.ts:381` doc comment) rather than a new rendering path.
- [x] 5.4 Wire `contextFiles` from the request straight into the run's input exactly as `chat-file-context.ts`'s `buildContextFiles`/`formatContextFilesPrefix` produce today, so a byte-for-byte comparison in stream 8 passes (spec "File context rides the run").
- [x] 5.5 Extend `ChatSessionRecord` (`vcs/chat-sessions.ts` interface ~L60-76) additively with `activeRunId?: string` — set when the route starts a run, cleared when that run reaches a terminal event; extend the client-facing `ChatSessionInfo` (`client/web/src/lib/chat-sessions.ts:25-39`) to mirror the field so a reload can find it.
- [x] 5.6 Respond `{ runId, sessionId, streamUrl }`; reserve (but do not yet fully wire — stream 7) a 429 response shape for the self-heal cap-exceeded case.
- [x] 5.7 New test file `tests/agent-chat-turn.test.ts`: sending with `provider: "openai", model: "gpt-4.1"` starts a run whose LLM dispatch resolves that pair and the response is renderable purely from the run's event stream (spec "Send dispatches a run"); switching model between two sends uses the new model on the second run without recreating the session or transport (spec "Per-send selection wins"); the first message on a sessionless request lazily creates a staged session with a seeded title; a closed/merged session's chat-turn request returns 409 and starts no run.

## Acceptance criteria

From `specs/chat-agent-transport/spec.md`:

### Requirement: Chat turns execute as agent runs

Submitting a chat message SHALL start a native agent run (`agents.run`)
carrying the session's message history, the send-time provider/model
selection, and the send-time file context; the client SHALL NOT compose tool
prompts, execute tool calls, or run any completion loop. The run id SHALL be
recorded on the chat session so any client can find and attach to the live
run.

#### Scenario: Send dispatches a run

- **WHEN** a user submits a message with provider `openai` and model `gpt-4.1` selected
- **THEN** a single `agents.run` starts whose LLM dispatch resolves that provider/model, and the client renders the reply exclusively from the run's event stream

#### Scenario: Per-send selection wins

- **WHEN** the user switches model between two sends
- **THEN** the second run uses the newly selected model without recreating the session or the transport

#### Scenario: File context rides the run

- **WHEN** the composer has pinned paths and an active file at send time
- **THEN** the run's input includes exactly the context files today's `buildContextFiles` would have produced for that send

### Requirement: Session sync and lazy creation

The first real message in an unsaved chat SHALL lazily create the session
record exactly as today (staged mode, seed title from the message), and both
the user message and the completed run's transcript SHALL be persisted on the
session server-side, so a second device or a reload reconstructs the
conversation — including a run still in progress — from the session record
alone.

#### Scenario: Reload mid-run reconstructs the conversation

- **WHEN** the user sends a message, the run starts, and the page is reloaded before the run finishes
- **THEN** the reloaded client renders the prior transcript from the session, finds the live run id on the session record, reattaches, and streams the remainder

#### Scenario: Read-only sessions cannot start runs

- **WHEN** the active session is closed/merged (read-only)
- **THEN** submit is refused client-side and `agents.run` is not called

(The client half of the read-only guard and the reload flow land in streams 6
and 8; your half is the 409 and the `activeRunId` bookkeeping that make them
possible.)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-chat-turn.test.ts tests/chat-sessions.test.ts && pnpm --filter @aprovan/workspace typecheck
```

**Baseline rule applies**: `tests/chat-sessions.test.ts` is already failing on
`main`. Capture its failure count first; pass = your new file fully green and
no additional failures there. State both numbers in your report.

## Constraints

- Reuse `renderAgentRun` — no second rendering path (D4).
- `agents/service.ts` is in scope **only** for the `renderAgentRun` reuse. The `ctx.appScope` gate at ~L642-660 belongs to stream 10; do not touch it.
- One writer per fact: the route's append must be idempotent per `(sessionId, messageId)`.
- Session/message records are append-only per-message; do not introduce a second write path.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `server/workspace/src/routes/agent-chat.ts`, `server/workspace/src/vcs/chat-sessions.ts`, `server/workspace/src/agents/service.ts`, `server/workspace/tests/agent-chat-turn.test.ts`. (Task 5.5's `ChatSessionInfo` mirror in `client/web/src/lib/chat-sessions.ts` is a type-only addition — if you would need to change client behavior, stop and report.)

## Report back

Check off tasks as each Verify passes, and write `briefs/05-report.md`:
the request/response shapes as built, how idempotent append is keyed
(stream 8.10 depends on it), your baselines, and any deviations. Streams 6,
7 and 10 all start from your file.
