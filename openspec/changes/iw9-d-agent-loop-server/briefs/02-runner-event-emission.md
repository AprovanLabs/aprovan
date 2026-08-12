# Brief: Runner event emission and the run-event log (stream 2)

**Model tier: Opus.** Touches the security-critical dispatch path; failure
modes are silent-data shaped. **Depends-on: stream 1 (merged).**

## Mission

When you are done, every native agent run emits and persists an ordered,
gapless event log — run/turn lifecycle, assistant text, tool-call phases,
terminal state — on its run record, and the native runtime honestly declares
`streaming: true`. The runner gains an injected `emit` sink and knows nothing
about who listens. Nothing user-visible changes yet; this is the substrate
that makes a locked phone stop losing replies, and it must land without
altering the loop's security shape by even one line.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 3 is load-bearing here.
3. `docs/decisions/0004-server-side-agent-loop.md`
4. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 1 and the invariant-3 constraint.
5. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — D1, "Run record extension", and the persistence-is-universal rule under "RunEvent".
6. `openspec/changes/iw9-d-agent-loop-server/specs/agent-run-stream/spec.md`
7. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble, especially the **baseline** rule (two of your Verify files are already red on `main`).
8. `packages/agent-protocol/src/run-event.ts` — stream 1's output; import, never redefine.
9. `server/workspace/src/agents/runner.ts` — capability descriptor L91, `RUNS_MAX_RETAINED` L102, `StoredAgentRun` L105, `callToolSchema` L209, grant re-check L436.
10. `server/workspace/tests/agent-run.test.ts` — house test conventions.

`server/workspace/src/agents/run-events.ts` does not exist yet; you create it.

## Tasks

- [x] 2.1 Create `agents/run-events.ts`: `appendRunEvents(workspaceId, runId, events)` (assigns gapless `seq`, batched persist onto the run record), `readRunEvents(workspaceId, runId, from)` (replay `seq >= from`), `subscribeRunEvents(runId, cb)` / `unsubscribe` (in-process live fan-out — PRD assumption: single gateway task, no cross-process bus). Extend `StoredAgentRun` (`runner.ts` interface at ~L104-108) with `events?: RunEvent[]`, `lastSeq?: number`, `origin?: "chat" | "self-heal" | "api"`, `sessionId?: string`, importing `RunEvent` from `@aprovan/agent-protocol` (stream 1).
- [x] 2.1a Persistence is unconditional and universal: **every** native run persists its event log, whatever started it (`agents.run` via the tools surface, the chat-turn route, self-heal, or a test), so `origin: "api"` runs answer replay exactly like chat runs (spec "Ordered, persisted run events" makes no exception for a run's origin). Wire `appendRunEvents` inside the runner's own run lifecycle — not at the call sites — so no caller can start an unlogged run; the injected `emit` of 2.2 is an **additional** sink, overridable in tests, never the thing that decides whether events are recorded.
- [x] 2.2 Give the runner loop an injected `emit?: (event: RunEvent) => void` parameter (tech-plan D-decision "the loop calls an injected emit(event); it never knows who is listening"); call it at the turn boundary (loop body near `callToolSchema`, ~runner.ts L208-230), around the tool-call dispatch (~runner.ts L425-450, the `toolGranted`/`invokeTool` block), and at the terminal write, emitting the full `run_started → turn_started → assistant_delta* → tool_call_started/finished* → turn_finished → run_finished|error` sequence per spec "Ordered, persisted run events".
- [x] 2.3 Verify (and document in a code comment) whether the runner's `llm.createChatCompletion` call streams today; if it is a single buffered completion per turn, emit one `assistant_delta` carrying the full turn text rather than fabricating a fake stream — fenced widget content passes through verbatim either way (spec "Widget fences stream through deltas"). Do not add upstream provider streaming in this task if it is not already there — that is a separate, unscoped change. **The finding is a required output of this task, not an internal detail**: record which branch was taken in `openspec/changes/iw9-d-agent-loop-server/briefs/deviations.md` and repeat it in this stream's report, because a buffered branch means `ux.md`'s "assistant text streams token-wise" is not met in this change (a UX deviation streams 6 and 8 must know about before they write their delta-granularity tests).
- [x] 2.4 Flip `AgentCapabilities.streaming` from `false` to `true` in the native runtime's capability descriptor (runner.ts ~L91) once 2.1–2.2 land (spec "Streaming capability is declared").
- [x] 2.5 Confirm by test that event emission does not change the dispatch boundary: a `call_tool` outside the run's pattern list still emits its `tool_call_started`/denial and ends the run `tool_denied` exactly as before instrumentation (PRD constraint, invariant 3; the grant re-check at runner.ts ~L435-441 is unmodified).
- [x] 2.6 New test file `tests/agent-run-events.test.ts`: two turns with one tool call each produce consecutive gapless `seq` in emission order matching the persisted record (spec "Events are ordered and gapless"); a run's event log is readable an hour after it reached a terminal state (spec "Event log survives the run"); a run with zero subscribers still reaches its terminal state and its full turns are visible via `agents.get` afterward (spec "Disconnect does not cancel").

## Acceptance criteria

From `specs/agent-run-stream/spec.md`:

### Requirement: Ordered, persisted run events

A native agent run SHALL emit a sequence of run events, each carrying a
monotonically increasing integer `seq` (starting at 0, no gaps), and the
event log SHALL be persisted on the run record so it survives client
disconnects and answers replays after the run is terminal.

#### Scenario: Events are ordered and gapless

- **WHEN** a run executes two turns with one tool call each
- **THEN** the emitted events carry consecutive `seq` values in emission order, and the persisted run record contains the same events in the same order

#### Scenario: Event log survives the run

- **WHEN** a client requests the event stream of a run that reached a terminal state an hour ago
- **THEN** the full event history is replayed from the run record, ending with the terminal event

### Requirement: Run event vocabulary (producer side)

#### Scenario: Tool call is observable in phases

- **WHEN** the model requests `call_tool { namespace: "vcs", operation: "log" }` and it succeeds
- **THEN** the stream carries a `tool_call_started` event with the decoded call before dispatch and a `tool_call_finished` event with duration and a truncated result echo after it

#### Scenario: Widget fences stream through deltas

- **WHEN** the assistant's text contains a fenced widget block emitted across several deltas
- **THEN** `assistant_delta` events carry the fence content verbatim and in order, so a client can render the widget incrementally exactly as it does from today's UI message stream

### Requirement: Runs are client-independent

A run in progress SHALL continue to its terminal state when zero clients are
attached to its stream. Client disconnect SHALL NOT cancel, pause, or fail a
run; cancellation happens only through the existing `agents.cancel` surface.

#### Scenario: Disconnect does not cancel

- **WHEN** the only attached client disconnects while the run has three turns left
- **THEN** the run executes those turns, persists its events and terminal record, and a later `agents.get` shows `succeeded` with full turns

### Requirement: Streaming capability is declared

The native runtime's capability descriptor SHALL declare `streaming: true`
once the event stream exists, and the declaration SHALL be the discoverable
signal that a runtime's runs can be attached to (per the `@utdk/agent`
capability contract).

#### Scenario: Capability reflects reality

- **WHEN** a caller inspects the native runtime's `AgentCapabilities`
- **THEN** `streaming` is `true` and the stream endpoint answers for its runs

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-run-events.test.ts tests/agent-run.test.ts tests/sandbox-agent-runs.test.ts && pnpm --filter @aprovan/workspace typecheck
```

**Baseline rule applies.** `tests/agent-run.test.ts` and
`tests/sandbox-agent-runs.test.ts` are already failing on `main` (repo-wide
baseline: 81 failed / 474 passed / 57 skipped). Capture their failure counts
before you start; your Verify passes when `tests/agent-run-events.test.ts` is
fully green and neither pre-existing file gained a failure. State both
numbers in your report. Do not repair unrelated legacy failures.

## Constraints

- **Invariant 3 is load-bearing**: the pattern-list bound and `invokeTool`'s `ctx.grants` re-check must survive byte-for-byte. You are adding instrumentation, not changing authority. Task 2.5 is the proof.
- Do not fork or duplicate the loop (D14). Do not add upstream provider streaming (2.3).
- Event-log growth is bounded by delta-batched appends, `resultPreview` truncation reusing the `MAX_RECORDED_RESULT_BYTES` discipline, and the existing `RUNS_MAX_RETAINED` pruning.
- New tests go in a new file; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `server/workspace/src/agents/runner.ts`, `server/workspace/src/agents/run-events.ts`, `server/workspace/tests/agent-run-events.test.ts`.

## Report back

Check off tasks in `tasks.md` as each Verify passes, and write
`briefs/02-report.md`. It must state: the 2.3 streaming-vs-buffered finding
(also appended to `briefs/deviations.md`), your captured baselines, and
anything streams 3, 4, 6 and 8 need — they consume your event ordering,
`emit` signature, and delta granularity.
