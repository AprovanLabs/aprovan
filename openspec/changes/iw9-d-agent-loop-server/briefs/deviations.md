# Deviations — iw9-d-agent-loop-server

Per `IW-9-IMPLEMENTATION-PROMPT.md` step 6. Entries recorded **before**
implementation (during delegation packaging) are marked *planning*; entries
added by executing agents during implementation are marked *execution* and
must name the stream and task.

---

## 1. CF-5 assigned to this change (planning, 2026-08-09)

**Finding.** `IW-9-EXECUTION-OVERVIEW.md` "Findings" item 1 recorded CF-5 as
**UNASSIGNED**: `agents/service.ts:642-660` 403s any app-scoped
agent-profile call, hard-blocking `chat/summarize`
(`iw9-chat-flagship` stream 5) and `doc/fix-typos`
(`iw9-doc-markdown` stream 10) with no interim workaround. The overview
recommended folding the fix into iw9-d.

**What the artifacts said before this entry.** Nothing in iw9-d's `prd.md`,
`tech-plan.md`, `ux.md`, `tasks.md`, or its four spec files mentioned
`appScope`, app-scoped profiles, or CF-5. iw9-d's only contact with
`agents/service.ts` was stream 5's reuse of `renderAgentRun` (~L394), a
different function from the gate. So the overview's text was a
*recommendation to the owner*, not an authorization an executing agent could
act on — under the implementation prompt's step 2 ("a task outside its
Touches globs is a planning bug: record it, don't improvise") and its
non-negotiable "changing a decision is the owner's call, not yours."

**Decision.** The owner accepted the recommendation on 2026-08-09 and
directed that it be folded in *through coherent planning artifacts before
implementation*, which is what this entry records. CF-5 is now
`tasks.md` **stream 10**, backed by `specs/app-scoped-agent-profiles/spec.md`,
tech-plan **D7**, and PRD Goal 0 / the new `app-scoped-agent-profiles`
capability.

**Scope taken, and why the whole seam.** The Doc tech-plan had named two
possible owners — iw9-b for manifest declaration, iw9-d for loop-side
registration/execution. Splitting them would leave both flagships blocked on
the slower half, and in fact **no iw9-b stream mentions agents or profiles
at all** (`grep -i "agent\|profile" openspec/changes/iw9-b-app-model/tasks.md`
returns nothing), so "B owns the manifest half" was unowned in practice.
Stream 10 therefore takes declaration + registration + execution together:

- *Declaration* — one additive optional `agents:` block on iw9-f4's
  `AppYamlSchema` (`server/workspace/src/apps/manifest.ts`). F4 is Wave 0
  and lands before this Wave-1 change, and no iw9-b stream touches that
  file, so the cross-change edit is safe. A hard-serialization line was
  added to `IW-9-IMPLEMENTATION-PROMPT.md` to keep it that way.
- *Registration* — none. The declaration **is** the registration: profiles
  render from the app's last-reconciled manifest snapshot on each resolve.
  A stored registration record would violate invariant 3 (authority derived
  at run time, never snapshotted) and would have required a write path
  inside iw9-b's install code.
- *Execution* — the `ctx.appScope` gate narrows to exactly one new permitted
  case.

**Security analysis (why this is a narrowing, not an opening).** The
existing 403 is deliberate, documented behavior ("an app could otherwise
mint itself a wide grant"). Stream 10 preserves every binding invariant from
ADR 0002: apps stay separate principals needing grants (4); effective
authority is declared patterns ∩ app grants ∩ invoker grants and never a
union (2); the intersection is computed at run render, never snapshotted
(3); apps still cannot create, edit, or self-provision a profile — a person
authors the declaration in the manifest (11). The runner's pattern-list
bound and `invokeTool`'s dispatch-time `ctx.grants` re-check are explicitly
out of scope for the stream (invariant 3 / PRD constraint).

**Tier.** Opus, against the overview's Sonnet default for non-1-3 D streams,
because this is an authorization boundary — the overview's own escalation
criterion is "failure modes are silent-data or security-shaped."

**Cross-change edits made to keep the plan coherent:**
`IW-9-EXECUTION-OVERVIEW.md` finding 1 (UNASSIGNED → assigned, plus
inventory and model-tier rows); `iw9-chat-flagship/tasks.md` 5.1 and
`tech-plan.md` CF-5; `iw9-doc-markdown/tasks.md` preamble + 10.0/10.1 and
`tech-plan.md` CF-5; `IW-9-IMPLEMENTATION-PROMPT.md` hard-serialization
list.

---

## 2. Test baseline is 81 failures, not the documented 22 (planning, 2026-08-09)

**Finding.** `IW-9-IMPLEMENTATION-PROMPT.md`'s Wave-0 exit gate describes
"the 22 legacy failures fixed by F6". Measured on `main` at delegation time:

```
pnpm turbo run build --filter=@aprovan/workspace && pnpm --filter @aprovan/workspace test
→ Test Files  18 failed | 58 passed | 6 skipped (82)
→      Tests  81 failed | 474 passed | 57 skipped (612)
```

Failing files: `agent-interface`, `agent-run`, `apps`, `chat-sessions`,
`get-client`, `interfaces`, `live-apps`, `oauth-tokens`, `profiles`,
`sandbox-agent-runs`, `sandbox-repo-mounts`, `sandboxes`, `sync`,
`telemetry`, `vcs-interface`, `vcs-mount-lineage`, `vcs`, `vfs-mounts`
(all under `server/workspace/tests/`).

**Why it matters to this change specifically.** Three of those files are
named in D's own `Verify:` commands — `tests/agent-run.test.ts` and
`tests/sandbox-agent-runs.test.ts` (stream 2, plus `agent-run` in streams 4
and 10) and `tests/chat-sessions.test.ts` (stream 5). As literally written,
those Verify commands can never exit 0, so a faithful executing agent would
either report failure or be tempted to repair unrelated legacy suites
(iw9-f6's work).

**Adaptation (minimal, intent preserved).** `tasks.md`'s preamble now
defines Verify as **pass/no-new-failures against a captured baseline**: the
stream's own new test file must be fully green, and the named pre-existing
files must show no additional failures versus a baseline the agent captures
before touching code and states in its report. Unrelated legacy repair stays
out of scope.

**Consequence for the wave plan.** D's PRD says it has "no Wave-0
dependency". That remains true for its *code*, but there is now a documented
**soft** dependency on iw9-f6's test-repair stream for a clean signal in D's
verification. Not a blocker; recorded so the orchestrator is not surprised
when D's reports quote non-zero baselines.

---

## 3. Line drift and one uncited call site (planning, 2026-08-09)

Per overview finding 8, the tech-plan's stated intent wins over any line
number; drift is recorded here. Second audit results:

**Drifted:**

- `GET /llm/jobs/:id` is at `server/workspace/src/routes/llm.ts:841-848`,
  cited as `~L847-865`. Task 9.3 updated to cite the handler by symbol
  (`llmRouter.get("/jobs/:id", …)`) with the corrected range.
- `renderAgentRun` is at `server/workspace/src/agents/service.ts:394`, cited
  as `~L391-483`. Within tolerance; no task text changed.

**Uncited call site found (changes task text, not just a number):**

- `client/web/src/features/sessions/useSessionOrchestration.ts:128` also
  calls `createChatSession({ mode })` — a second client lazy-create path
  besides the cited `useChatSubmit.ts:157`. It sits outside the send path
  and stays client-side; task 5.1 now says the chat-turn route must tolerate
  an already-created `sessionId` from either origin. (Two further
  `createChatSession` call sites exist in the editing paths —
  `features/editing/useLazyDraft.ts:54`, `features/edit-modal/EditModalHost.tsx:116`
  — both out of chat scope.)

**Re-verified exact** (no drift): `runner.ts:91` `streaming: false`;
`runner.ts:102` `RUNS_MAX_RETAINED`; `runner.ts:105` `StoredAgentRun`;
`runner.ts:209` `callToolSchema`; `runner.ts:436` `toolGranted` re-check;
`routes/tools.ts:756` `describeNamespaces`; `app.ts:144-169` router mounts;
`routes/llm.ts:344` job-backed comment and `:404` `x-llm-job`;
`vcs/chat-sessions.ts:60` `ChatSessionRecord`; `lib/chat-sessions.ts:25`
`ChatSessionInfo`; `useChatSubmit.ts:149` read-only gate;
`MessageParts.tsx:192` tool-part branch;
`widget-error-reporter-context.tsx:19` `MAX_WIDGET_AUTOFIXES = 2`;
`useWidgetSelfHeal.ts:53-55/63/75` arming rules;
`chat-transport.ts:16` `TOOL_PROMPT_CAP_PER_NAMESPACE`;
`agents/service.ts:648-658` the CF-5 gate.

---

## 4. Standalone-test fixes folded into tasks.md (planning, 2026-08-09)

Five places where a brief could not have been executed without asking a
question. Each was resolved in `tasks.md` rather than left to the agent:

1. **Message-write ownership** (was "confirm in this task which side owns
   the write"): frozen — the **server** owns run-driven transcript writes;
   the route's append is idempotent per `(sessionId, messageId)`; the
   duplicate client writer in `useSessionChatSync.ts` is deleted at flip
   time (new task 8.10, file added to stream 8's Touches), and 8.5's parity
   bar was reworded to assert the observable outcome rather than the
   now-deleted mechanism.
2. **Route mount prefix** (was "pick a prefix that does not collide"):
   frozen at `/agents` in stream 1.5 as exported helpers
   (`AGENTS_ROUTE_PREFIX`, `chatTurnPath`, `runStreamPath`) that all
   consumers build URLs from; task 3.3 now mounts it rather than choosing
   it, and a genuine collision is a blocker, not a rename.
3. **Event-log universality** (unstated): new task 2.1a — persistence is
   wired inside the runner's lifecycle so every native run is logged
   regardless of caller, with the injected `emit` reduced to an additional,
   test-overridable live sink.
4. **Buffered-vs-streaming completions**: task 2.3 now makes the finding a
   required output — recorded here and in the stream report — because a
   buffered branch means `ux.md`'s "streams token-wise" is unmet, which
   streams 6 and 8 must know before writing delta-granularity tests.
5. **Grep-gate paths**: both checkouts are now named literally
   (`AAP`/`REG`), and an unreadable sibling checkout **fails** a gate
   instead of letting `! grep … 2>/dev/null` pass vacuously.

---

## 5. Task 9.4's calendar gate rewritten as an evidence gate (planning, 2026-08-09)

**Finding.** Original 9.4 was "(Time-gated — do not check off until 9.3's
deprecation window has elapsed…)". This change's definition of done requires
every box checked, so as written the change could never complete honestly:
the agent would either stall or check a box whose precondition it cannot
observe.

**Adaptation (safety intent preserved).** tech-plan D6 gained an amendment;
tasks 9.3-9.5 were rewritten. The deletion now depends on three observable
pieces of evidence rather than a calendar: (a) zero in-repo callers in both
checkouts, (b) parity/E2E green with the job path unused, (c) a written
compatibility assessment for clients holding a job id across the deploy.
9.5 deletes only if all three hold; **if any fails, the agent records a
blocker here and does not delete** — a recorded blocker is the completed
outcome of 9.5, a silent check-off is not. PRD Open Questions updated to
match.

---

## Execution-time entries

### 6. Runner LLM completions are buffered, not token-streamed (execution, stream 2 / task 2.3)

**Finding.** The native runner's `dispatchInterface(ctx, "llm", "createChatCompletion", …)` call returns one full assistant choice per turn. There is no token/chunk stream on this path today (unlike `POST /llm/:provider/chat` / completions, which pass `stream: true` and drain an upstream `ReadableStream`).

**Branch taken.** Emit a single `assistant_delta` per turn carrying the full `message.content` (including any fenced widget blocks verbatim). Do not fabricate multi-delta fake streams. Upstream provider streaming for the runner is out of scope for this stream.

**UX consequence.** `ux.md`'s "assistant text streams token-wise" is **not** met by this change. Streams 6 (run transport) and 8 (parity/flip) must write delta-granularity tests against **one delta per turn**, not token-wise chunks, until a later change adds real streaming to the runner's LLM call.

---

### 7. llm-jobs deletion blocked by out-of-Touches residual refs (execution, stream 9 / task 9.5)

**Finding.** Tasks 9.1–9.4 completed: chat no longer reads `x-llm-job` outside dead `resilientChatFetch`; `useEditTransport` migrated to `streamChatCompletion`; `GET /llm/jobs/:id` carries an evidence-gated deprecation notice; evidence (a) zero callers of the listed symbols beyond defs+tests, (b) patchwork-web 125/125 + llm suites green, (c) compatibility assessment recorded in `briefs/09-report.md`.

**Why deletion did not proceed.** Task 9.5's post-delete grep
`llm-jobs|x-llm-job|readLlmJob|writeLlmJob` across `$AAP/client`, `$AAP/server`, and `$REG` would still match files **outside stream 9 Touches**:

1. `server/workspace/scripts/migrate-services-to-records.ts` — `"llm-jobs"` CLI flag / `svcScope("llm-jobs")`
2. `registry/docs/local-mode.md` — storage table cell listing `llm-jobs`

Deleting only the Touched store/call sites would leave those hits and fail the spec/AGENTS.md delete gate. Expanding Touches is a planning call, not an improvisation.

**Branch taken.** Do not delete. Leave `llm-jobs.ts`, job writes in `routes/llm.ts`, `/jobs/:id` (with 9.3 notice), `resilientChatFetch`, and `pollJobUntilTerminal` in place. Task 9.5 left unchecked; recorded blocker is the completed outcome.

**Unblock.** A follow-up (Touches expansion or hygiene stream) must remove/rewrite those two residual references (registry docs via a registry PR if needed), then re-run 9.5 deletion until the grep returns nothing in both checkouts.

**Related deviation (9.2).** Widget-edit used the tools-proxy stream (`streamChatCompletion`), not `POST /agents/chat-turn` + run SSE: a chat-turn agent run would tool-loop instead of emitting search/replace blocks. Brief allows "or an equivalent resumable run stream."

**RESOLVED (execution, stream 9 re-evaluation, 2026-08-18).** The 9.4 gate was
re-run on current `main` (post-#274) and all three parts pass; the broad-grep
residuals were exactly the two named above, and both were cleared per this
entry's own unblock prescription:

- *(a) zero callers* — `x-llm-job|readLlmJob|writeLlmJob|pollJobUntilTerminal|resilientChatFetch`
  over `$AAP/client`, `$AAP/server`, `$REG` (REG readable) returned only the
  definitions about to be deleted, their tests, and the 9.3 deprecation text;
  REG had zero symbol hits.
- *(b) parity green, no-new-failures baseline* — server `tests/llm.test.ts`
  8/8 and `tests/llm-jobs.test.ts` 7/7 pre-delete; client suite baseline on
  clean HEAD was 9 failed files / 6 failed tests / 108 passed (all
  pre-existing yjs/virtua module-resolution collect failures plus
  `gateway.test.ts` — none job-path-related; `run-transport.test.ts` 11/11,
  `llm-jobs.test.ts` 4/4). Post-delete: identical failing set, 104 passed
  (108 minus the 4 deleted client `llm-jobs.test.ts` tests), server
  `tests/llm.test.ts` 7/7 (the deleted x-llm-job/resume test was the 8th),
  server typecheck clean, client typecheck 87 errors with an identical
  sorted-error hash to baseline.
- *(c) compatibility assessment* — the assessment in `briefs/09-report.md`
  still holds: post-stream-8 chat never holds a job id; the widget-edit path
  migrated in 9.2 never obtains one; only a pre-9.2 client already mid-flight
  at deploy could hold one, and it observes non-OK polls until its 5-minute
  poll timeout, then a surfaced error.

**Residual-ref clearance.**

1. `server/workspace/scripts/migrate-services-to-records.ts` — the
   `llm-jobs` subsystem case was removed as **dead**: it migrated legacy
   `.services/llm-jobs` files into the `svc#llm-jobs` record scope, whose
   only reader (`llm-jobs.ts`) is now deleted; migrating into an unread
   scope has no consumer.
2. `registry/docs/local-mode.md:55` — registry repo not edited from the
   aprovan worktree (per the re-evaluation's ground rules); the exact
   one-line doc edit is recorded in `briefs/09-report.md` for a registry-side
   change, and the aprovan-side gates are the deletion criterion.

**Deletion performed (9.5).** `server/workspace/src/llm-jobs.ts`,
`server/workspace/tests/llm-jobs.test.ts`, `client/web/src/lib/llm-jobs.test.ts`,
and `client/web/src/lib/chat-transport.ts` (sole export `resilientChatFetch`,
zero importers) deleted; `routes/llm.ts` stripped of `writeLlmJob`/`readLlmJob`,
the `x-llm-job` header, job-record persistence, and the `/jobs/:id` route
(streaming/first-byte/keepalive behavior of `/chat` and `/completions`
unchanged; `/completions` keeps its legacy `{jobId}` first frame as a message
id); `pollJobUntilTerminal` removed from `client/web/src/lib/llm.ts`. The 9.5
gate `grep -rn "llm-jobs\|x-llm-job\|readLlmJob\|writeLlmJob" $AAP/client
$AAP/server` returns nothing; `$REG` returns only the `docs/local-mode.md:55`
line pending the reported registry doc edit.

---
