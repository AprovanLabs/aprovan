# Tasks — iw9-d-agent-loop-server

External dependencies: none new, with one caveat — the new workspace
package created in stream 1 (`@aprovan/agent-protocol`) takes `zod` as a
direct dependency (already used at `server/workspace/package.json:79` pinned
`3.25.76`, and by `packages/compiler`; not previously a dependency of
`client/web`) and `@utdk/agent` (`^0.2.0`, already a `server/workspace`
dependency at `package.json:59`) for the `AgentRunStatus`/`AgentStopReason`/
`AgentUsage` types it re-exports. No registry-repo work and no package
publishes: every stream below is `Repo: aprovan` (IW-9 "Cross-repo
coordination" table: stream D = `agents/runner.ts`, chat routes,
`client/web/features/chat`, aprovan only). Per rule 4, deletion grep-gates
still sweep both checkouts. Verify commands run from the aprovan repo root
`AAP` = `/Users/jacob/Documents/Code/AprovanLabs/aprovan`; the sibling
checkout is `REG` = `/Users/jacob/Documents/Code/AprovanLabs/registry`.
Both paths appear literally in every grep-gate below — a gate that cannot
read `REG` is a **failed** gate, not a passed one; if the sibling checkout
is absent, stop and report rather than letting a negated grep pass
vacuously. New tests go in new files (never appended to an existing test
file), matching this repo's convention (see `tests/agent-run.test.ts` vs.
the new files below).

**Verify commands are pass/no-new-failures against a captured baseline, not
green-suite assertions.** Measured on `main` at delegation time
(`pnpm turbo run build --filter=@aprovan/workspace && pnpm --filter
@aprovan/workspace test`): **81 failed / 474 passed / 57 skipped across 612
tests, 18 failing files** — not the 22 legacy failures the IW-9
implementation prompt's Wave-0 gate describes. Three of those failing files
are named in this change's Verify commands: `tests/agent-run.test.ts` and
`tests/sandbox-agent-runs.test.ts` (stream 2; `agent-run` also in 4 and 10)
and `tests/chat-sessions.test.ts` (stream 5). Before touching code, capture
the baseline for the files your stream names, and treat your Verify as
passing when (a) your new test file is fully green and (b) the named
pre-existing files show no *additional* failures versus your captured
baseline. Do not repair unrelated legacy failures — that is iw9-f6's
test-repair stream — and never report a stream green without stating its
baseline numbers.

Ordering rationale (PRD constraint: "you are the LONGEST stream — order
tasks so the stream protocol lands early"): streams 1–4 (protocol, runner
event emission, stream endpoint, describe tool) are pure additions with zero
client-visible change — they can start immediately and are what iw9-c and
iw9-chat need published first. Stream 5 wires chat to the new loop
server-side. Stream 6 is the client transport, built and shipped behind a
dev flag so streams 5–7 can be validated without breaking the shipping
chat loop. Stream 7 (self-heal) depends on 6 because its action becomes a
RunTransport-shaped request. Stream 8 is the explicit parity checklist,
flag flip, and legacy-loop deletion (grep-gated). Stream 9 (llm-jobs
dissolution) runs last per tech-plan D6's explicit order (chat off jobs
first, then widget-edit, then an evidence gate, then delete).

Stream 10 (app-scoped agent profiles, CF-5) is numbered last but ordered
**immediately after stream 5**: `Depends-on: 5` because stream 5 is the
only other editor of `agents/service.ts`, and the two MUST NOT run
concurrently. It does not block or gate streams 6-9, and streams 6-9 do not
gate it — after stream 5 merges, stream 10 and stream 6 may run in
parallel (their Touches are disjoint). Stream 10 is the assigned owner of
finding CF-5 (`IW-9-EXECUTION-OVERVIEW.md` "Findings", finding 1), which
`iw9-chat-flagship` stream 5 and `iw9-doc-markdown` stream 10 both gate on.
It additionally makes one additive edit to `apps/manifest.ts`, which is
**iw9-f4's** file: F4 is Wave 0 and lands before this Wave-1 change, and
no `iw9-b` stream touches `apps/manifest.ts` — verify both facts hold
before starting stream 10 and record a deviation if they do not.

Line numbers below were re-verified against the working tree while writing
this file (see tech-plan.md's "Verification addendum") and are current as
of `main` at authoring time; re-locate by symbol name if the tree has
drifted.

## 1. Agent run-event protocol package

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/agent-protocol/**, aprovan/server/workspace/package.json, aprovan/client/web/package.json | Verify: pnpm --filter @aprovan/agent-protocol build && pnpm --filter @aprovan/agent-protocol test

- [x] 1.1 Scaffold `packages/agent-protocol` (`@aprovan/agent-protocol`, `workspace:*`) mirroring `packages/native/package.json`'s shape (`main`/`types`/`exports` pointing at `dist`); dependencies: `zod@3.25.76` (matching `server/workspace/package.json:79`) and `@utdk/agent@^0.2.0` (matching `server/workspace/package.json:59`).
- [x] 1.2 Define the `RunEvent` zod discriminated union in `src/run-event.ts` with exactly the nine members from tech-plan.md "Interfaces & Data → RunEvent": `run_started`, `turn_started`, `assistant_delta`, `tool_call_started`, `tool_call_finished`, `turn_finished`, `run_finished`, `error`, and the reserved `pending_action` (registered in the union, no producer in this change emits it — spec agent-run-stream "Run event vocabulary"). Export the TS type via `z.infer`.
- [x] 1.3 Add `parseRunEvent(json: unknown): RunEvent | undefined` — returns `undefined` (never throws) for a `type` outside the union, satisfying "Clients SHALL ignore event types they do not recognize" (spec "Unknown event types are ignored") on both the encode and decode side.
- [x] 1.4 Add the SSE wire-frame helpers: `encodeRunEventFrame(event): string` (`data: <json>\n\n`) and `decodeRunEventFrame(line): RunEvent | undefined` (uses 1.3).
- [x] 1.5 Define `ChatTurnRequest`/`ChatTurnResponse` zod schemas per tech-plan.md "Interfaces & Data → HTTP surface" (`POST /agents/chat-turn` body incl. `origin`/`failure`, response `{ runId, sessionId, streamUrl }`). The mount prefix and URL shapes are **frozen** by the tech-plan and are not a stream-3 choice: export `AGENTS_ROUTE_PREFIX = "/agents"`, `chatTurnPath()` → `/agents/chat-turn`, and `runStreamPath(runId, from)` → `/agents/runs/<runId>/stream?from=<n>`; `streamUrl` in the response is produced by `runStreamPath(runId, 0)` and every consumer (streams 3, 5, 6, 7) builds URLs from these helpers rather than string literals.
- [x] 1.6 Add `@aprovan/agent-protocol: workspace:*` to `server/workspace/package.json` and `client/web/package.json` dependencies.
- [x] 1.7 New test file `packages/agent-protocol/src/__tests__/run-event.test.ts`: round-trip encode/decode for each of the nine event types; an event with an unrecognized `type` decodes to `undefined` instead of throwing; `seq` field is required and numeric on every member.

## 2. Runner event emission and the run-event log

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/agents/runner.ts, aprovan/server/workspace/src/agents/run-events.ts, aprovan/server/workspace/tests/agent-run-events.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-run-events.test.ts tests/agent-run.test.ts tests/sandbox-agent-runs.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 2.1 Create `agents/run-events.ts`: `appendRunEvents(workspaceId, runId, events)` (assigns gapless `seq`, batched persist onto the run record), `readRunEvents(workspaceId, runId, from)` (replay `seq >= from`), `subscribeRunEvents(runId, cb)` / `unsubscribe` (in-process live fan-out — PRD assumption: single gateway task, no cross-process bus). Extend `StoredAgentRun` (`runner.ts` interface at ~L104-108) with `events?: RunEvent[]`, `lastSeq?: number`, `origin?: "chat" | "self-heal" | "api"`, `sessionId?: string`, importing `RunEvent` from `@aprovan/agent-protocol` (stream 1).
- [x] 2.1a Persistence is unconditional and universal: **every** native run persists its event log, whatever started it (`agents.run` via the tools surface, the chat-turn route, self-heal, or a test), so `origin: "api"` runs answer replay exactly like chat runs (spec "Ordered, persisted run events" makes no exception for a run's origin). Wire `appendRunEvents` inside the runner's own run lifecycle — not at the call sites — so no caller can start an unlogged run; the injected `emit` of 2.2 is an **additional** sink, overridable in tests, never the thing that decides whether events are recorded.
- [x] 2.2 Give the runner loop an injected `emit?: (event: RunEvent) => void` parameter (tech-plan D-decision "the loop calls an injected emit(event); it never knows who is listening"); call it at the turn boundary (loop body near `callToolSchema`, ~runner.ts L208-230), around the tool-call dispatch (~runner.ts L425-450, the `toolGranted`/`invokeTool` block), and at the terminal write, emitting the full `run_started → turn_started → assistant_delta* → tool_call_started/finished* → turn_finished → run_finished|error` sequence per spec "Ordered, persisted run events".
- [x] 2.3 Verify (and document in a code comment) whether the runner's `llm.createChatCompletion` call streams today; if it is a single buffered completion per turn, emit one `assistant_delta` carrying the full turn text rather than fabricating a fake stream — fenced widget content passes through verbatim either way (spec "Widget fences stream through deltas"). Do not add upstream provider streaming in this task if it is not already there — that is a separate, unscoped change. **The finding is a required output of this task, not an internal detail**: record which branch was taken in `openspec/changes/iw9-d-agent-loop-server/briefs/deviations.md` and repeat it in this stream's report, because a buffered branch means `ux.md`'s "assistant text streams token-wise" is not met in this change (a UX deviation streams 6 and 8 must know about before they write their delta-granularity tests).
- [x] 2.4 Flip `AgentCapabilities.streaming` from `false` to `true` in the native runtime's capability descriptor (runner.ts ~L91) once 2.1–2.2 land (spec "Streaming capability is declared").
- [x] 2.5 Confirm by test that event emission does not change the dispatch boundary: a `call_tool` outside the run's pattern list still emits its `tool_call_started`/denial and ends the run `tool_denied` exactly as before instrumentation (PRD constraint, invariant 3; the grant re-check at runner.ts ~L435-441 is unmodified).
- [x] 2.6 New test file `tests/agent-run-events.test.ts`: two turns with one tool call each produce consecutive gapless `seq` in emission order matching the persisted record (spec "Events are ordered and gapless"); a run's event log is readable an hour after it reached a terminal state (spec "Event log survives the run"); a run with zero subscribers still reaches its terminal state and its full turns are visible via `agents.get` afterward (spec "Disconnect does not cancel").

## 3. Reattach/replay stream endpoint

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/routes/agent-chat.ts, aprovan/server/workspace/src/app.ts, aprovan/server/workspace/tests/agent-chat-stream.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-chat-stream.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 3.1 Create `routes/agent-chat.ts` with `GET /agents/runs/:id/stream?from=<seq>` (SSE, using `@aprovan/agent-protocol`'s `encodeRunEventFrame`): replay `readRunEvents(from)` then tail live via `subscribeRunEvents`; close the connection after the terminal event (`run_finished`/`error`) is replayed or emitted.
- [x] 3.2 Add keepalive SSE comments on an interval while the model is thinking, reusing the "job-backed, first-byte-immediately" lesson already applied in `routes/llm.ts` (~L338-345, CloudFront's 60s origin-read timeout) so a long-silent run doesn't get cut before its first event.
- [x] 3.3 Mount the router in `app.ts` at the **frozen** prefix `app.route("/agents", agentChatRouter)`, following the existing `app.route("/prefix", xRouter)` pattern (see `app.ts:144-169`). The prefix is not a choice — it is `AGENTS_ROUTE_PREFIX` from stream 1.5, and streams 5/6/7 build their URLs from the same helpers. Confirm by test that mounting it does not shadow the `agents.*` tools-namespace dispatch (which is served under `/tools`, not `/agents`); if a real collision exists, STOP and record a blocker rather than renaming the prefix unilaterally, since the client contract is already frozen.
- [x] 3.4 Support concurrent reattach: two clients streaming the same run id at different `from` values each receive correct, independent replay+tail with no cross-talk (spec "Reattaching SHALL be valid any number of times, concurrently, without affecting the run").
- [x] 3.5 New test file `tests/agent-chat-stream.test.ts`: a client that consumed up to `seq` 41 and reconnects with `from=42` gets 42-onward with no gap/duplicate followed by the live tail through `run_finished` (spec "Client reattaches mid-run"); killing the stream mid-run and reattaching with the last-seen `seq` produces a byte-identical event sequence to an uninterrupted client (spec "Locked phone loses nothing" — this is the PRD's disconnect test, PRD Goal 1).

## 4. `describe(namespace)` tool

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/agents/runner.ts, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/tests/agent-describe.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-describe.test.ts tests/agent-run.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 4.1 Extract the operation-catalog logic inside `describeNamespaces` (`routes/tools.ts:756`) into a shared, importable function (e.g. `catalogForNamespace(workspaceId, namespace)`) so `runner.ts` reuses the same catalog instead of a second implementation (spec tool-discovery-describe: "the same catalog `describeNamespaces` uses"; avoids the duplicate-implementation pattern the IW-9 preamble warns about).
- [x] 4.2 Add `describeToolSchema()` beside `callToolSchema` (runner.ts ~L208-230): a second function definition, `describe { namespace, query?, cursor? }`, offered to the model on every native run alongside `call_tool`.
- [x] 4.3 Implement the `describe` handler: filter 4.1's catalog to operations matching the run's `allowed` pattern list using the same `toolGranted` check `call_tool` uses (runner.ts ~L435); page at ~40 operations per response with a `cursor` and `remaining` count (spec "Large namespaces paginate").
- [x] 4.4 Ungranted-namespace refusal: return `{ error, allowed: string[] }` and let the run continue (not `tool_denied` — spec "a describe refusal is recoverable, unlike a denied call_tool"; no catalog for the ungranted namespace is loaded).
- [x] 4.5 Confirm the runner's system-prompt builder never embeds per-operation signatures (only the pattern list + `call_tool`/`describe` mechanics) — this is the server-side half of PRD Goal 2; the client-side `formatToolSignatures`/`{{tools}}` deletion is stream 8.
- [x] 4.6 New test file `tests/agent-describe.test.ts`: a run granted `vcs.*` calling `describe { namespace: "vcs" }` gets compact signatures sufficient to issue a correct `call_tool` with no signature ever in the system prompt (spec "Model discovers operations mid-run"); a run granted only `vcs.*` calling `describe { namespace: "github" }` gets the refusal shape naming allowed patterns (spec "Ungranted namespace is refused"); pagination round-trips via `cursor` (spec "Large namespaces paginate"); describing a namespace then calling a denied operation still ends the run `tool_denied` exactly as without the describe call (spec "Describe does not widen authority").

## 5. Chat-turn route and session bookkeeping

> Depends-on: 3, 4 | Repo: aprovan | Touches: aprovan/server/workspace/src/routes/agent-chat.ts, aprovan/server/workspace/src/vcs/chat-sessions.ts, aprovan/server/workspace/src/agents/service.ts, aprovan/server/workspace/tests/agent-chat-turn.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-chat-turn.test.ts tests/chat-sessions.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 5.1 Add `POST /agents/chat-turn` to `routes/agent-chat.ts`, body validated by `ChatTurnRequest` (stream 1.5): resolve `sessionId`, or lazy-create one (`mode: "staged"`, seed title from the message text) mirroring today's client-side lazy create (`client/web/src/features/chat/useChatSubmit.ts:154-167`, `createChatSession({ mode: "staged", title: seedTitle })`) — this task moves that call server-side. Note there is a second client lazy-create call site, `useSessionOrchestration.ts:128` (`createChatSession({ mode })`), which the tech-plan does not cite; it stays client-side (it creates a session outside the send path), so the route must tolerate being handed an already-created `sessionId` from either origin. Return 409 when the resolved session's `status` is `merged`/`closed` (spec "Read-only sessions cannot start runs") before starting any run.
- [x] 5.2 Persist the user message onto the session's transcript via the existing per-message append path in `vcs/chat-sessions.ts` (`svc#chat#session#<id>` records) — reuse the store's append function; do not add a second write path. **Ownership is decided, not open**: for run-driven turns the **server owns the write** — the chat-turn route persists the user message at run start and the completed assistant transcript at the run's terminal event, because a run must reconstruct from the session record alone even when no client is attached (spec chat-agent-transport "Session sync and lazy creation"). State this in the route's code comment. The now-duplicate client-side persistence in `useSessionChatSync.ts` is deleted in stream 8.10, not here — until the flag flips, the legacy transport still needs it, so both writers coexist for exactly the streams 6-7 window and the route's append MUST be idempotent per `(sessionId, messageId)` so the overlap cannot double-write.
- [x] 5.3 Resolve the run's profile per tech-plan D4: session's stored `agent` name (future iw9-chat seam, D15) if present, else an ephemeral profile built from the request's `provider`/`model` and the caller's grants; render it through `renderAgentRun`'s existing shape (`agents/service.ts` ~L391-483, `agents/service.ts:381` doc comment) rather than a new rendering path.
- [x] 5.4 Wire `contextFiles` from the request straight into the run's input exactly as `chat-file-context.ts`'s `buildContextFiles`/`formatContextFilesPrefix` produce today, so a byte-for-byte comparison in stream 8 passes (spec "File context rides the run").
- [x] 5.5 Extend `ChatSessionRecord` (`vcs/chat-sessions.ts` interface ~L60-76) additively with `activeRunId?: string` — set when the route starts a run, cleared when that run reaches a terminal event; extend the client-facing `ChatSessionInfo` (`client/web/src/lib/chat-sessions.ts:25-39`) to mirror the field so a reload can find it.
- [x] 5.6 Respond `{ runId, sessionId, streamUrl }`; reserve (but do not yet fully wire — stream 7) a 429 response shape for the self-heal cap-exceeded case.
- [x] 5.7 New test file `tests/agent-chat-turn.test.ts`: sending with `provider: "openai", model: "gpt-4.1"` starts a run whose LLM dispatch resolves that pair and the response is renderable purely from the run's event stream (spec "Send dispatches a run"); switching model between two sends uses the new model on the second run without recreating the session or transport (spec "Per-send selection wins"); the first message on a sessionless request lazily creates a staged session with a seeded title; a closed/merged session's chat-turn request returns 409 and starts no run.

## 6. Client RunTransport (dev-flagged, coexists with the legacy loop)

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/client/web/src/features/chat/run-transport.ts, aprovan/client/web/src/features/chat/chat-transport.ts, aprovan/client/web/src/features/sessions/useSessionOrchestration.ts, aprovan/client/web/src/pages/ChatPage.tsx, aprovan/client/web/src/features/chat/__tests__/run-transport.test.ts | Verify: pnpm --filter @aprovan/patchwork-web test -- src/features/chat/__tests__/run-transport.test.ts && pnpm --filter @aprovan/patchwork-web typecheck

- [x] 6.1 Create `features/chat/run-transport.ts`: an AI SDK `ChatTransport` implementation — `sendMessages` posts to `POST /agents/chat-turn` (via `@aprovan/agent-protocol`'s `ChatTurnRequest`), then opens `GET /agents/runs/:id/stream?from=0` (stream 3) and translates `RunEvent`s into `UIMessage` stream parts: `assistant_delta` → text-delta parts, `tool_call_started`/`tool_call_finished` → the `tool-*`/`dynamic-tool` part shape `MessageParts.tsx` already renders (~L192-213), `run_finished`/`error` → finish/error.
- [x] 6.2 Implement reconnect-with-`from`: on stream drop, reattach at the last consumed `seq`; skip (never throw on) an event whose `type` `parseRunEvent` (stream 1.3) doesn't recognize (spec "Unknown event types are ignored").
- [x] 6.3 Add a dev-only toggle (code-level constant or env var, not a shipped product feature flag) so `ChatPage.tsx`/`useSessionOrchestration.ts` can construct either `useChatTransport` (legacy, `chat-transport.ts`) or the new `RunTransport` (6.1) — both remain wired until stream 8 flips the default and removes the toggle.
- [x] 6.4 New test file `__tests__/run-transport.test.ts`: each `RunEvent` type maps to the expected `UIMessage` part; reconnect produces no duplicate or missing parts across a simulated drop; a `tool_call_started` with no matching `tool_call_finished` yet (mid-replay) renders as the "running" state, matching ux.md's "Partial state on reattach: … renders as running — correct by construction from replay order."

## 7. Widget self-heal as a traced server-side turn

> Depends-on: 5, 6 | Repo: aprovan | Touches: aprovan/client/web/src/features/self-heal/useWidgetSelfHeal.ts, aprovan/server/workspace/src/routes/agent-chat.ts, aprovan/server/workspace/src/vcs/chat-sessions.ts, aprovan/server/workspace/tests/agent-chat-selfheal.test.ts, aprovan/client/web/src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-chat-selfheal.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts

- [ ] 7.1 Extend `POST /agents/chat-turn` (stream 5) to accept `{ origin: "self-heal", failure }`: re-validate the per-assistant-message-id and consecutive-heal caps server-side against the session's transcript (spec "Consecutive cap is enforced server-side" — a misbehaving client cannot exceed `MAX_WIDGET_AUTOFIXES`, whose value is 2 at `client/web/src/contexts/widget-error-reporter-context.tsx:19`); on cap exceeded, return the 429 reserved in 5.6.
- [ ] 7.2 Start the heal run with explicit `limits` (`maxTurns`, `maxToolCalls`, `wallClockMs`) and a token/cost ceiling, and set `origin: "self-heal"` on the `StoredAgentRun` (field added in 2.1).
- [ ] 7.3 In `useWidgetSelfHeal.ts`, replace the `sendMessage({ text: ... })` call (current lines ~75-83) with a request through the same client path stream 6's `RunTransport` uses, so a heal turn streams as a visible turn (ux.md "a heal turn is a visible turn, streaming like any other, not a hidden mutation") — keep every existing arming rule unchanged: one heal per assistant message id (`autoFixRespondedRef`), `MAX_WIDGET_AUTOFIXES` consecutive cap (`autoFixChainRef`), the session-reset effect (~L51-56), and the `userSentThisWindowRef` history guard (~L63) verbatim (spec "Client arming bounds survive").
- [ ] 7.4 Confirm budget exhaustion behavior: a heal run that hits its cost ceiling terminates with the limit stop reason, the widget's error state stays visible, and no further automatic heal is attempted for that message (spec "Budget exhaustion ends the heal quietly").
- [ ] 7.5 Confirm self-heal runs are attributable: an `agents.runs` listing for the workspace includes heal-origin runs with their usage and the session id they healed (spec "Heal turns are attributable"); no new listing endpoint needed — the existing `agents.runs` surface plus the `origin`/`sessionId` fields from 2.1 are sufficient.
- [ ] 7.6 New test file `tests/agent-chat-selfheal.test.ts` covering the widget-self-heal-turn spec scenarios: "Failure becomes a traced turn", "Heal turns are attributable", "Budget exhaustion ends the heal quietly", "History never triggers a heal" (assert the route path is never called for messages rendered from persisted history — client-side precondition, verified by 7.3's untouched guard plus a server-side test that an unarmed request is never sent), "Consecutive cap is enforced server-side" (requests beyond the cap, sent directly against the route bypassing the client, are refused).
- [ ] 7.7 New test file `client/web/src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts` (none exists today — first coverage for this hook): the existing arming-rule unit behavior (one fix per message id, consecutive cap, session-reset, history guard) now asserted against the new request call instead of `sendMessage`.

## 8. Parity checklist, flag flip, and legacy-loop deletion

> Depends-on: 6, 7 | Repo: aprovan | Touches: aprovan/client/web/src/features/chat/chat-transport.ts, aprovan/client/web/src/pages/ChatPage.tsx, aprovan/client/web/src/features/sessions/useSessionOrchestration.ts, aprovan/client/web/src/features/sessions/useSessionChatSync.ts, aprovan/client/web/src/features/chat/chat-artifact.test.ts | Verify: pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck && test -d /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" /Users/jacob/Documents/Code/AprovanLabs/aprovan/client /Users/jacob/Documents/Code/AprovanLabs/aprovan/server /Users/jacob/Documents/Code/AprovanLabs/registry

This is the PRD's explicit parity checklist (PRD Goal 6: "model/provider
picker, per-send file context, widget fence streaming, session sync/lazy
session creation, and read-only-session guards all work exactly as
today") — every item below is validated against `RunTransport` *before* the
legacy loop is deleted.

- [ ] 8.1 Parity: model/provider picker — per-send `provider`/`model` selection (`useChatProviders`/`chatProviderRef`/`chatModelRef` in `useChatSubmit.ts`) resolves the run's LLM dispatch through `RunTransport` exactly as `DefaultChatTransport` did; add/extend a test that switches provider mid-conversation and asserts the next run uses it.
- [ ] 8.2 Parity: file context — `buildContextFiles`/pinned-path/@mention parsing (`chat-file-context.ts`) produces the same `contextFiles` set sent through `RunTransport`/`POST /agents/chat-turn` as the deleted client-composed `formatContextFilesPrefix` text did (cross-check against stream 5.4's server-side wiring).
- [ ] 8.3 Parity: widget fence streaming — `widget-fences.ts`/`shouldMountAsWidget` incremental-mount behavior is unchanged when fed `assistant_delta` events via `RunTransport` instead of AI-SDK text-deltas; extend `chat-artifact.test.ts` (do not rewrite it) with a case driven through `RunTransport`.
- [ ] 8.4 Parity: self-heal bounds — re-run stream 7's test suite against the flipped-default transport as a regression gate (no new tests; this is the flip-time checkpoint).
- [ ] 8.5 Parity: session sync — lazy session creation (now server-side per 5.1) and reload-mid-run reconstruction (session carries `activeRunId` from 5.5, a reload renders history then reattaches and streams the remainder — spec "Reload mid-run reconstructs the conversation") verified against `RunTransport`. The parity bar for message persistence is **the observable outcome, not the mechanism**: after a send completes, the session record holds the user message and the full assistant transcript exactly as it did under `useSessionChatSync.ts` — asserted with the client-side writer already removed by 8.10, proving the server write alone is sufficient.
- [ ] 8.6 Parity: read-only-session guard — submitting against a closed/merged session is refused client-side before any network call (spec "Read-only sessions cannot start runs"), matching today's `sessionReadOnly` gate in `useChatSubmit.ts:149`.
- [ ] 8.7 Flip the dev toggle from 6.3 to default-on in `ChatPage.tsx`/`useSessionOrchestration.ts`; delete the toggle and the legacy branch.
- [ ] 8.8 Delete from `client/web/src/features/chat/chat-transport.ts`: the `DefaultChatTransport` usage, `formatToolSignatures`, and `TOOL_PROMPT_CAP_PER_NAMESPACE` (the `useChatTransport` export in full). Keep `useEditTransport` in the same file untouched — it is out of this change's scope per the PRD non-goal ("Widget-edit panel transport … beyond migrating its durability off llm-jobs"); only its `runChatCompletionJob` call migrates, in stream 9.
- [ ] 8.9 Grep gate, both repos (IW-9 rule 4): `grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" $AAP/client $AAP/server $REG` returns nothing, with `AAP=/Users/jacob/Documents/Code/AprovanLabs/aprovan` and `REG=/Users/jacob/Documents/Code/AprovanLabs/registry` (spec chat-agent-transport "Grep gate holds"; PRD Goal 2). If `$REG` does not exist on the executing machine, the gate is **unmet** — record a blocker; do not treat an unreadable path as a clean result.
- [ ] 8.10 Delete the now-duplicate client-side transcript persistence in `useSessionChatSync.ts` (the `lastPersistedCountRef`-gated append of the AI SDK `messages` array), which stream 5.2 replaced with the server-owned write; keep any non-persistence responsibilities of the hook intact, and delete the hook entirely only if persistence was its sole job. The 8.5 assertion is what proves the deletion is safe; run it after this task, not before.

## 9. `llm-jobs` dissolution

> Depends-on: 8 | Repo: aprovan | Touches: aprovan/client/web/src/features/chat/chat-transport.ts, aprovan/client/web/src/lib/chat-transport.ts, aprovan/client/web/src/lib/llm.ts, aprovan/client/web/src/lib/llm-jobs.test.ts, aprovan/server/workspace/src/routes/llm.ts, aprovan/server/workspace/src/llm-jobs.ts, aprovan/server/workspace/tests/llm-jobs.test.ts, aprovan/server/workspace/tests/llm.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/llm.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/lib/llm-jobs.test.ts

Order per tech-plan D6: chat off jobs (already done by stream 8, since
`x-llm-job` is only read by the transport just deleted) → widget-edit off
jobs → **evidence gate** → delete.

The original plan made the last step a calendar wait ("one release"), which
this execution cannot satisfy or honestly check off. The safety *intent* —
never delete a store an in-flight client still depends on — is preserved
and made verifiable: 9.4 collects three pieces of evidence (no callers in
either repo, parity/E2E green without the job path, an explicit
compatibility assessment for clients already holding job ids), and 9.5
deletes **only if all three pass**. If any fails, 9.5 is not checked: write
the blocker in `briefs/deviations.md` with the failing evidence and leave
`llm-jobs.ts` in place with its deprecation notice. A recorded blocker is a
completed task-9.5 outcome; a silent check-off is not.

- [ ] 9.1 Confirm chat no longer reads `x-llm-job` anywhere in `client/web/src` post-stream-8 (spec "Chat no longer needs job splicing"): `grep -rn "x-llm-job" client/web/src` returns only `lib/chat-transport.ts`'s `resilientChatFetch` (still used by `useEditTransport`, migrated next) and no chat-path references.
- [ ] 9.2 Migrate `useEditTransport`'s `runChatCompletionJob` (`client/web/src/lib/llm.ts`) and its `resilientChatFetch` wrapping off `llm-jobs`: reuse stream 3's run-record-backed stream endpoint for a single-turn run (or an equivalent resumable run stream) instead of the job-poll splice; preserve the existing `onProgress` staged-feedback contract (`useEditTransport`, `chat-transport.ts` ~L138-179: "Asking …", "Thinking through the change…", "Writing edits…", per-block "Change N drafted") unchanged.
- [ ] 9.3 Add a deprecation notice on `GET /llm/jobs/:id` (`routes/llm.ts`, the `llmRouter.get("/jobs/:id", …)` handler ~L841-865) that states the removal condition in the terms 9.4 actually measures — no in-repo callers, parity/E2E green without the job path, and the compatibility assessment recorded — rather than a calendar window; do not delete `llm-jobs.ts` in this task.
- [ ] 9.4 Evidence gate for deletion — collect all three, record each result verbatim in the stream report: **(a) zero callers**, `grep -rn "x-llm-job\|readLlmJob\|writeLlmJob\|pollJobUntilTerminal\|resilientChatFetch" $AAP/client $AAP/server $REG` returns only the definitions about to be deleted and their own tests (`AAP`/`REG` per the preamble; an unreadable `$REG` fails the gate); **(b) parity green**, stream 8's full suite plus this stream's `tests/llm.test.ts` and the widget-edit path's tests pass with 9.2's migration in place, proving no behavior depends on the job splice; **(c) compatibility assessment**, an explicit written finding on whether a client shipped before this change can hold a job id across the deploy and, if so, what it observes when `/llm/jobs/:id` disappears — the assessment must name the actual behavior of the deleted client path (post-stream-8 chat no longer polls; the widget-edit path is migrated in 9.2), not assume it.
- [ ] 9.5 Delete on evidence, or record a blocker. **If 9.4 (a)+(b)+(c) all pass**: delete `server/workspace/src/llm-jobs.ts`, its call sites in `routes/llm.ts` (`writeLlmJob`, `readLlmJob`, the `x-llm-job` header at ~L404, the `/jobs/:id` route), `resilientChatFetch`/`pollJobUntilTerminal` (`client/web/src/lib/chat-transport.ts`, `client/web/src/lib/llm.ts`), and their dedicated test files (`server/workspace/tests/llm-jobs.test.ts`, `client/web/src/lib/llm-jobs.test.ts`); then the grep gate `grep -rn "llm-jobs\|x-llm-job\|readLlmJob\|writeLlmJob" $AAP/client $AAP/server $REG` must return nothing (spec "Job store deletion is gated"). **If any part of 9.4 fails**: do not delete — leave 9.3's notice in place, write the failing evidence as a blocker in `briefs/deviations.md` naming what would have to change to unblock, and report the stream as complete-with-blocker.

## 10. App-scoped agent profiles (CF-5)

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/manifest.ts, aprovan/server/workspace/src/agents/app-profiles.ts, aprovan/server/workspace/src/agents/service.ts, aprovan/server/workspace/tests/agent-app-profiles.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/agent-app-profiles.test.ts tests/app-manifest.test.ts tests/agent-run.test.ts && pnpm --filter @aprovan/workspace typecheck

This stream owns finding **CF-5** (`IW-9-EXECUTION-OVERVIEW.md` "Findings",
finding 1), assigned to iw9-d per the overview's recommendation because
iw9-d owns the agents service and the loop that must execute the profile.
It is the *whole* seam — declaration grammar, registration, and execution —
so neither flagship is left half-unblocked: `iw9-chat-flagship` stream 5
(`chat/summarize`) and `iw9-doc-markdown` stream 10 (`doc/fix-typos`) both
exit their gates when this stream lands.

Security shape, non-negotiable (ADR 0002): apps are separate principals
(invariant 4); grants intersect and never union (invariant 2); authority is
derived at run time, never snapshotted (invariant 3); agents and apps
propose but people instantiate (invariant 11). The existing 403 is
deliberate behavior, not a bug — this stream **narrows** it to exactly one
new permitted case and widens nothing else.

Serialization: `Depends-on: 5` because stream 5 is the only other editor of
`agents/service.ts`. `apps/manifest.ts` belongs to **iw9-f4** (Wave 0,
lands first) and is touched by no `iw9-b` stream — confirm before starting.

- [x] 10.1 Extend F4's `AppYamlSchema` (`server/workspace/src/apps/manifest.ts`) additively with an optional top-level `agents` block: a list of `{ name, description?, prompt?, llm?, tools: string[] }`, `name` matching the same lowercase-slug rule agent profiles already use (`NAME_RE`, `agents/service.ts`). The schema stays `.strict()` (F4 spec app-manifest "unknown key rejected" must still pass unchanged), and `agents` is the *only* new key. Reject at parse time any entry whose `tools` patterns are not covered by the manifest's declared `capabilities` ceiling — a declaration may narrow the app's ceiling, never exceed it (invariant 2), with a 400 naming both the pattern and the ceiling.
- [x] 10.2 Create `server/workspace/src/agents/app-profiles.ts` exporting `resolveAppProfile(workspaceId, appId, name)`: read the installed app's last-reconciled manifest snapshot (F4's `AppRecord.declared`) and render an in-memory `AgentProfile` from the matching `agents` entry. Declaration **is** registration — there is no separate registration record and no stored copy of the profile, so a manifest edit takes effect on next resolve and a removed declaration stops resolving immediately (invariant 3: derived at run time, never snapshotted). Return `undefined` (not a throw) when the app declares no such agent.
- [x] 10.3 Add app provenance to `AgentProfile` (`agents/service.ts`, the interface at ~L67-104): `app?: { appId: string; slug: string }`, populated only by 10.2's resolver. The field is never accepted from request input and never written by `agents.create`/`update`; a stored workspace profile always has it `undefined`. Any `agents.get`/`list` rendering shows it so an operator can tell an app-shipped profile from a workspace one.
- [x] 10.4 Narrow the `ctx.appScope` gate (`agents/service.ts` ~L642-660) minimally: `get`/`list`/`runs`/`getRun` remain allowed exactly as today; `run` becomes allowed **only** when the requested profile name is `<slug>/<agent>` where `<slug>` is the calling app's own slug and `resolveAppProfile` (10.2) returns a declaration for it; every other `run` — including any workspace-level profile name and any other app's profile — and all of `create`/`update`/`delete` continue to throw the existing `ServiceError("Apps cannot manage or run agent profiles", 403)`. Keep the existing comment and extend it to state precisely what is now permitted and why the widening is safe (declaration is authored by a person in the app's manifest; invariant 11 is preserved because the app cannot mint or edit a declaration at run time).
- [x] 10.5 Effective authority is an intersection computed at run render, not a copy: the app-scoped run's tool patterns = the declared profile's `tools` ∩ the app's installed capability grants ∩ the invoker's grants (invariant 2), threaded through `renderAgentRun`'s existing shape (stream 5.3's path) with no new rendering path. The runner's pattern-list bound and `invokeTool`'s `ctx.grants` re-check are **not modified** by this stream (invariant 3, PRD constraint). Attribution follows ADR 0002's consequence: the run record names the invoker as principal/payer and the app profile as the via-path.
- [x] 10.6 New test file `tests/agent-app-profiles.test.ts` covering every scenario in the `app-scoped-agent-profiles` spec: a declared profile runs from an app session ("Declared app profile runs"); the same session naming a workspace profile is refused 403 ("Arbitrary workspace profile is refused"); `agents.create`/`agents.update` from an app session are still refused 403 ("Apps never provision profiles") while `get`/`list`/`runs`/`getRun` still succeed; a declaration whose `tools` exceed the invoker's grants runs with the intersection and a call outside it is denied at dispatch ("Authority is the intersection, derived at run time"); and a manifest whose `agents[].tools` exceed the app's own `capabilities` ceiling is rejected at parse time ("Declaration cannot exceed the app ceiling").
- [x] 10.7 Close the cross-change gates: confirm `iw9-chat-flagship/tasks.md` 5.1 and `iw9-doc-markdown/tasks.md` 10.0 name this stream and that their stated exit conditions are literally satisfied by what landed (an app-declared `<slug>/<agent>` profile parses, resolves, and runs bounded by app ∩ invoker grants); report any mismatch as a blocker against those changes rather than adjusting scope here.
