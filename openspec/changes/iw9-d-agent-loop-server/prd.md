# PRD — iw9-d `agent-loop-server`

_IW-9 Wave 1, stream D. Authority: `openspec/changes/IW-9-APP-FIRST.md` (D14,
D15, invariant 3). Settled: **server-side loop wins** — do not re-litigate._

## Problem

Chat's agent loop runs in the browser. The Vercel AI SDK's
`DefaultChatTransport` (client/web/src/features/chat/chat-transport.ts) sends
each turn to `/llm/:provider/chat` with tool *signatures pasted into the
prompt* (capped at `TOOL_PROMPT_CAP_PER_NAMESPACE = 40` per namespace,
chat-transport.ts:16), so the model sees a lossy tool list and every turn's
composition depends on the tab staying alive. Mobile browsers kill the fetch
when the screen locks — the `llm-jobs.ts` record + polling splice
(server/workspace/src/llm-jobs.ts, client/web/src/lib/chat-transport.ts) is a
text-only patch over that, blind to tool calls and turns. Widget self-heal
(client/web/src/features/self-heal/useWidgetSelfHeal.ts) is an untracked
client completion: no run record, no cost ceiling, no audit row. Meanwhile the
server already has the surviving loop — `agents.run` via
server/workspace/src/agents/runner.ts, with a single generic `call_tool`,
grant-projection tool lists, and grants re-checked at dispatch — and chat
does not use it.

## Users & Jobs

- **Chat users (mobile first)**: send a message, lock the phone, come back —
  the run finished and the full transcript is there. No lost turns, ever.
- **Agent-run observers**: see tool calls as they execute (name, args,
  result), not just final text.
- **Workspace operators**: every model call chat makes is a traced run record
  with usage and audit attribution — including self-heal turns.
- **Sibling streams (consumers of this change's interfaces)**: iw9-c builds
  approval events into the run stream; iw9-chat's `chat/summarize` agent
  profile rides `agents.run` (D15). Both need the stream protocol and
  run-record shape published early.

## Goals

0. **Apps can run the profiles they ship**: an app-scoped session runs
   `<app-slug>/<agent>` when — and only when — its own manifest declares it,
   bounded by app grants ∩ invoker grants derived at run time; app-driven
   profile creation, editing, and self-provisioning stay refused. This is
   CF-5, and its exit condition is that both flagship gates
   (`iw9-chat-flagship` 5.1, `iw9-doc-markdown` 10.0) open.
1. **Resumability is structural**: a chat run started before the client
   disconnects reaches its terminal state with zero client involvement; a
   client reattaching by run id replays the complete event history (all
   turns, tool calls, text) plus live tail. Verified by a disconnect test:
   kill the stream mid-run, reattach, transcript byte-identical to an
   uninterrupted run.
2. **Prompt-pasting is gone**: `grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE"
   client/` returns nothing; the model discovers operations via an on-demand
   `describe(namespace)` tool instead.
3. **One loop**: chat turns execute through `agents.run` /
   `agents/runner.ts`; the client contains no tool-execution or
   prompt-composition loop.
4. **Self-heal is governed**: each auto-fix is a server-side run continuation
   with a cost ceiling and a run-record trace; existing bounds (one fix per
   assistant message, `MAX_WIDGET_AUTOFIXES` consecutive, never for
   history-rendered widgets) survive.
5. **`llm-jobs.ts` dissolves**: run records are the durability mechanism;
   the job store and its polling path are deleted (grep-gated per
   MIGRATION-DEBT rule).
6. **Behavior parity**: model/provider picker, per-send file context, widget
   fence streaming, session sync/lazy session creation, and read-only-session
   guards all work exactly as today (parity checklist in tasks.md).

## Non-Goals

- **Approval/queue semantics** (D12) — that is iw9-c (Wave 2). This change
  only *reserves* a `pending_action` event type in the stream protocol so
  iw9-c extends without a protocol rev.
- **Credential resolution changes** — chat providers and credential lookup
  stay as-is; iw9-f3 touches credentials separately.
- **New agent runtimes** (harness, openai/assistants) — the native runner is
  the only runtime this change streams from.
- **Multi-agent orchestration, broker sharding, realtime bus** (D16 Wave 2).
- **Widget-edit panel transport** (`useEditTransport`) beyond migrating its
  durability off `llm-jobs`; the editor's search/replace UX is untouched.
- **Voice capture, composer UX changes** — transport-only on the client.

## Capabilities

### New Capabilities

- `agent-run-stream`: the server→client run event protocol — ordered,
  persisted, replayable events (turn lifecycle, assistant text deltas,
  tool-call phases, terminal states, reserved `pending_action`), the
  reattach-by-run-id contract, and the run-record event log backing it.
- `chat-agent-transport`: chat turns dispatch `agents.run`; client transport
  maps run events to rendered messages; session persistence and lazy session
  creation; deletion of the client loop, prompt-pasting, and `llm-jobs`.
- `tool-discovery-describe`: the runner's second built-in tool
  `describe(namespace)` returning operation signatures on demand, bounded by
  the run's grant projection; system prompts carry patterns, not signatures.
- `widget-self-heal-turn`: widget render failures become traced,
  cost-ceilinged server-side run continuations with the existing client-side
  arming bounds.
- `app-scoped-agent-profiles`: the declaration/registration/execution seam
  that lets an app run the agent profiles its own manifest declares —
  `app.yaml` grammar, manifest-derived resolution (declaration *is*
  registration), app provenance on the profile, and a narrowed `ctx.appScope`
  gate. Assigned here as finding **CF-5** (`IW-9-EXECUTION-OVERVIEW.md`
  "Findings", finding 1) because this change owns the agents service and the
  loop that executes the profile; it unblocks `chat/summarize`
  (iw9-chat-flagship) and `doc/fix-typos` (iw9-doc-markdown), which are
  otherwise hard-blocked with no interim.

### Modified Capabilities

None. Existing `openspec/specs/` capabilities (desktop shell, STT,
gateway resolution, `streaming-sessions`) keep their requirements;
`streaming-sessions` covers tool-session streaming and is not the transport
here (see tech-plan D1 for why).

## Constraints & Assumptions

- **Constraint (D14)**: `agents/runner.ts` is the surviving loop — extend it
  (event emission, describe tool); do not fork it or reintroduce a second
  loop anywhere.
- **Constraint (invariant 3)**: authority derived at run time — the runner's
  existing grant re-check at dispatch (runner.ts:436, `invokeTool`
  underneath) is load-bearing and must survive every refactor.
- **Constraint (IW-9 serialization)**: no Wave-0 dependency; iw9-a/b touch
  disjoint paths (no chat transport, no `agents/runner.ts`). The stream
  protocol + run-record shapes land first — they are interfaces iw9-c and
  iw9-chat consume.
- **Constraint (MIGRATION-DEBT)**: "delete X" tasks are done only when
  `grep X` is empty in both repos. Both checkout paths are named literally in
  tasks.md; an unreadable sibling checkout fails a gate rather than passing
  it vacuously.
- **Constraint (CF-5 is a narrowing, not an opening)**: the existing
  "Apps cannot manage or run agent profiles" 403 is deliberate behavior. The
  app-profile work permits exactly one new case — running the calling app's
  own manifest-declared profile — and preserves invariants 2 (grants
  intersect, never union), 3 (authority derived at run time), 4 (apps are
  separate principals), and 11 (agents propose, people instantiate).
- **Constraint (cross-change file ownership)**: the `app.yaml` grammar lives
  in `apps/manifest.ts`, owned by iw9-f4 (Wave 0, landed before this change)
  and touched by no iw9-b stream. This change makes one additive edit there
  — the optional `agents` block — so that no flagship is left waiting on an
  unassigned manifest change.
- **Assumption**: single gateway task (current deployment) — in-process live
  event fan-out plus record-backed replay is sufficient; a process restart
  mid-run fails the run (same as today) and the record says so.
- **Assumption**: the `@utdk/agent` contract (registry:
  packages/contracts/agent/index.ts) is where the run-event types belong; its
  `streaming` capability flag (declared, unconsumed per
  registry/docs/agent-interface.md "Deliberately deferred") is consumed by
  this change.
- **Assumption**: the client keeps AI SDK `UIMessage` rendering
  (MessageParts.tsx) and swaps only the transport underneath (tech-plan D2).

## Open Questions

None blocking — D14/D15 and the IW-9 grill settled scope.

The previously open item — whether `GET /llm/jobs/:id` needs a one-release
deprecation window before deletion — is **resolved into a verifiable gate**
rather than a calendar wait, because a calendar wait cannot be executed or
honestly checked off inside this change. Deletion proceeds only on three
pieces of evidence: no in-repo callers in either checkout, parity/E2E green
with the job path unused, and a written compatibility assessment for clients
holding a job id across the deploy. If the evidence does not hold, the store
stays and the blocker is recorded (tasks.md stream 9, tasks 9.3-9.5).
