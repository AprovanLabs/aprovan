# Brief: Agent run-event protocol package (stream 1)

**Model tier: Opus.** Novel contract design; every other stream and two
sibling changes (iw9-c, iw9-chat) build against what you publish here.
**Depends-on: nothing — this is wave 1, start immediately.**

## Mission

When you are done, a new workspace package `@aprovan/agent-protocol` exists
and builds, containing the typed seam that the gateway and the web client
will each build against independently: a zod discriminated union of the nine
run-event types, SSE wire-frame helpers, the chat-turn request/response
schemas, and the frozen URL helpers for the two new HTTP endpoints. Nothing
consumes it yet. This matters because chat's agent loop is moving from the
browser to the server, and every later stream — plus a separate change that
adds approval events to the same stream — needs one source of truth for the
wire format instead of two drifting copies.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — execution protocol; step 6 is the deviations rule.
2. `docs/decisions/0002-app-first-platform-invariants.md` — the 11 invariants bind every line.
3. `docs/decisions/0004-server-side-agent-loop.md` — why the loop moves server-side.
4. `openspec/changes/iw9-d-agent-loop-server/prd.md`
5. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **"Interfaces & Data → RunEvent"** and **"→ HTTP surface"** are the frozen contract you implement; D3 explains why the package lives here rather than in the registry repo.
6. `openspec/changes/iw9-d-agent-loop-server/specs/agent-run-stream/spec.md`
7. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble (external deps, baseline rule, new-test-file convention).
8. `packages/native/package.json` — the package shape to mirror.
9. `server/workspace/package.json` — `zod` pinned `3.25.76` (L79), `@utdk/agent` `^0.2.0` (L59).
10. `client/web/package.json`.

`packages/agent-protocol/` does not exist yet; you create it.

## Tasks

- [ ] 1.1 Scaffold `packages/agent-protocol` (`@aprovan/agent-protocol`, `workspace:*`) mirroring `packages/native/package.json`'s shape (`main`/`types`/`exports` pointing at `dist`); dependencies: `zod@3.25.76` (matching `server/workspace/package.json:79`) and `@utdk/agent@^0.2.0` (matching `server/workspace/package.json:59`).
- [ ] 1.2 Define the `RunEvent` zod discriminated union in `src/run-event.ts` with exactly the nine members from tech-plan.md "Interfaces & Data → RunEvent": `run_started`, `turn_started`, `assistant_delta`, `tool_call_started`, `tool_call_finished`, `turn_finished`, `run_finished`, `error`, and the reserved `pending_action` (registered in the union, no producer in this change emits it — spec agent-run-stream "Run event vocabulary"). Export the TS type via `z.infer`.
- [ ] 1.3 Add `parseRunEvent(json: unknown): RunEvent | undefined` — returns `undefined` (never throws) for a `type` outside the union, satisfying "Clients SHALL ignore event types they do not recognize" (spec "Unknown event types are ignored") on both the encode and decode side.
- [ ] 1.4 Add the SSE wire-frame helpers: `encodeRunEventFrame(event): string` (`data: <json>\n\n`) and `decodeRunEventFrame(line): RunEvent | undefined` (uses 1.3).
- [ ] 1.5 Define `ChatTurnRequest`/`ChatTurnResponse` zod schemas per tech-plan.md "Interfaces & Data → HTTP surface" (`POST /agents/chat-turn` body incl. `origin`/`failure`, response `{ runId, sessionId, streamUrl }`). The mount prefix and URL shapes are **frozen** by the tech-plan and are not a stream-3 choice: export `AGENTS_ROUTE_PREFIX = "/agents"`, `chatTurnPath()` → `/agents/chat-turn`, and `runStreamPath(runId, from)` → `/agents/runs/<runId>/stream?from=<n>`; `streamUrl` in the response is produced by `runStreamPath(runId, 0)` and every consumer (streams 3, 5, 6, 7) builds URLs from these helpers rather than string literals.
- [ ] 1.6 Add `@aprovan/agent-protocol: workspace:*` to `server/workspace/package.json` and `client/web/package.json` dependencies.
- [ ] 1.7 New test file `packages/agent-protocol/src/__tests__/run-event.test.ts`: round-trip encode/decode for each of the nine event types; an event with an unrecognized `type` decodes to `undefined` instead of throwing; `seq` field is required and numeric on every member.

## Acceptance criteria

From `specs/agent-run-stream/spec.md`:

### Requirement: Run event vocabulary

The protocol SHALL define exactly these event types: `run_started`,
`turn_started`, `assistant_delta` (incremental assistant text, fenced widget
content passed through verbatim), `tool_call_started` (name, decoded
namespace/operation/args), `tool_call_finished` (result summary or error,
duration), `turn_finished`, `run_finished` (status, stopReason, usage), and
`error`. The type `pending_action` SHALL be reserved for the approval stream
(iw9-c): its name is registered in the protocol union but no producer in this
change emits it. Clients SHALL ignore event types they do not recognize.

#### Scenario: Unknown event types are ignored

- **WHEN** a client built against this protocol receives an event whose type it does not recognize (e.g. a future `pending_action`)
- **THEN** it skips the event without erroring and continues consuming the stream

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/agent-protocol build && pnpm --filter @aprovan/agent-protocol test
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed — if one seems wrong, stop and report instead of changing it. The nine members, their field sets, and the two URL shapes are contract, not suggestions.
- No new dependencies beyond `zod@3.25.76` and `@utdk/agent@^0.2.0`.
- Surgical changes only; match existing style (see the karpathy-guidelines skill).
- Do not modify files outside: `packages/agent-protocol/**`, `server/workspace/package.json`, `client/web/package.json`.
- Where a cited `file:line` has drifted, the tech-plan's stated intent wins over the line number — record the drift in `briefs/deviations.md`.

## Report back

When done: check off your tasks in `openspec/changes/iw9-d-agent-loop-server/tasks.md` (one at a time, each only after its Verify passed), and write `briefs/01-report.md` containing what you built, how you verified it, any deviations and why, and anything the next wave needs to know. Streams 2 and 6 consume your exports directly — call out any naming you had to choose that the tech-plan did not pin.
