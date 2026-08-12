# Brief: `llm-jobs` dissolution (stream 9)

**Model tier: Sonnet.** **Depends-on: stream 8 (merged).**

## Mission

When you are done, the widget-edit completion path no longer depends on the
LLM job store, `GET /llm/jobs/:id` carries a deprecation notice stating a
measurable removal condition, and — if the evidence supports it — the whole
job store and its polling client are deleted with a grep gate across both
checkouts. `llm-jobs.ts` exists only because the browser-side loop died when
a phone locked; run records now provide that durability structurally, so the
patch can go. If the evidence does *not* support deletion, you record a
blocker instead. Both are acceptable outcomes; a silent check-off is not.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — rule 4 and step 6.
2. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 5 and the resolved Open Question.
3. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D6 and its execution-time amendment** (why the calendar window became an evidence gate).
4. `openspec/changes/iw9-d-agent-loop-server/specs/chat-agent-transport/spec.md` — "llm-jobs folds into run records".
5. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — stream 9 preamble; it defines the gate you must satisfy.
6. `briefs/deviations.md` — entry 5 explains the rewrite; you append to this file if you hit the blocker branch.
7. `server/workspace/src/llm-jobs.ts` — read the header comment; it states why the store exists.
8. `server/workspace/src/routes/llm.ts` — job creation and the "job-backed, first-byte-immediately" comment ~L344, `x-llm-job` header L404, `GET /llm/jobs/:id` handler L841-848.
9. `client/web/src/lib/chat-transport.ts` — `resilientChatFetch`, `pollJobUntilTerminal`.
10. `client/web/src/lib/llm.ts` — `runChatCompletionJob`.
11. `client/web/src/features/chat/chat-transport.ts` ~L138-179 — `useEditTransport`'s `onProgress` staged-feedback strings, which must not change.

## Tasks

- [x] 9.1 Confirm chat no longer reads `x-llm-job` anywhere in `client/web/src` post-stream-8 (spec "Chat no longer needs job splicing"): `grep -rn "x-llm-job" client/web/src` returns only `lib/chat-transport.ts`'s `resilientChatFetch` (still used by `useEditTransport`, migrated next) and no chat-path references.
- [x] 9.2 Migrate `useEditTransport`'s `runChatCompletionJob` (`client/web/src/lib/llm.ts`) and its `resilientChatFetch` wrapping off `llm-jobs`: reuse stream 3's run-record-backed stream endpoint for a single-turn run (or an equivalent resumable run stream) instead of the job-poll splice; preserve the existing `onProgress` staged-feedback contract (`useEditTransport`, `chat-transport.ts` ~L138-179: "Asking …", "Thinking through the change…", "Writing edits…", per-block "Change N drafted") unchanged.
- [x] 9.3 Add a deprecation notice on `GET /llm/jobs/:id` (`routes/llm.ts`, the `llmRouter.get("/jobs/:id", …)` handler ~L841-865) that states the removal condition in the terms 9.4 actually measures — no in-repo callers, parity/E2E green without the job path, and the compatibility assessment recorded — rather than a calendar window; do not delete `llm-jobs.ts` in this task.
- [x] 9.4 Evidence gate for deletion — collect all three, record each result verbatim in the stream report: **(a) zero callers**, `grep -rn "x-llm-job\|readLlmJob\|writeLlmJob\|pollJobUntilTerminal\|resilientChatFetch" $AAP/client $AAP/server $REG` returns only the definitions about to be deleted and their own tests (`AAP`/`REG` per the preamble; an unreadable `$REG` fails the gate); **(b) parity green**, stream 8's full suite plus this stream's `tests/llm.test.ts` and the widget-edit path's tests pass with 9.2's migration in place, proving no behavior depends on the job splice; **(c) compatibility assessment**, an explicit written finding on whether a client shipped before this change can hold a job id across the deploy and, if so, what it observes when `/llm/jobs/:id` disappears — the assessment must name the actual behavior of the deleted client path (post-stream-8 chat no longer polls; the widget-edit path is migrated in 9.2), not assume it.
- [ ] 9.5 Delete on evidence, or record a blocker. **If 9.4 (a)+(b)+(c) all pass**: delete `server/workspace/src/llm-jobs.ts`, its call sites in `routes/llm.ts` (`writeLlmJob`, `readLlmJob`, the `x-llm-job` header at ~L404, the `/jobs/:id` route), `resilientChatFetch`/`pollJobUntilTerminal` (`client/web/src/lib/chat-transport.ts`, `client/web/src/lib/llm.ts`), and their dedicated test files (`server/workspace/tests/llm-jobs.test.ts`, `client/web/src/lib/llm-jobs.test.ts`); then the grep gate `grep -rn "llm-jobs\|x-llm-job\|readLlmJob\|writeLlmJob" $AAP/client $AAP/server $REG` must return nothing (spec "Job store deletion is gated"). **If any part of 9.4 fails**: do not delete — leave 9.3's notice in place, write the failing evidence as a blocker in `briefs/deviations.md` naming what would have to change to unblock, and report the stream as complete-with-blocker.
  - Blocker recorded (deviations §7 / 09-report): post-delete grep cannot clear within Touches; store retained.

## Acceptance criteria

From `specs/chat-agent-transport/spec.md`:

### Requirement: llm-jobs folds into run records

The LLM job store (`server/workspace/src/llm-jobs.ts`, `svc#llm-jobs`
records, the `x-llm-job` response header, and `GET /llm/jobs/:id`) SHALL be
retired: chat durability moves to run records and the run event stream, and
the remaining job consumer (the widget-edit completion path) moves to a
run-record-backed equivalent before the store is deleted. Removal is
grep-gated on `llm-jobs`, `x-llm-job`, and `readLlmJob`/`writeLlmJob`.

#### Scenario: Chat no longer needs job splicing

- **WHEN** a chat stream dies mid-reply after the migration
- **THEN** recovery happens by reattaching to the run stream, and no code path polls `GET /llm/jobs/:id`

#### Scenario: Job store deletion is gated

- **WHEN** the deletion task is checked done
- **THEN** `grep -rn "llm-jobs\|x-llm-job" server/ client/` returns nothing in either repo

(If the evidence gate fails, this scenario is not satisfied and 9.5 stays
unchecked with a recorded blocker — that is the correct outcome, not a
failure to report.)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/llm.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/lib/llm-jobs.test.ts
```

Plus, for 9.5's deletion branch, the grep gate in the task text with
`AAP=/Users/jacob/Documents/Code/AprovanLabs/aprovan` and
`REG=/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Constraints

- Preserve `useEditTransport`'s `onProgress` staged-feedback strings exactly; the editor's search/replace UX is a PRD non-goal.
- Never delete on assumption. The three pieces of evidence are the authorization; a recorded blocker is a legitimate completion.
- An unreadable sibling checkout fails a grep gate.
- Surgical changes only; match existing style.
- Do not modify files outside: `client/web/src/features/chat/chat-transport.ts`, `client/web/src/lib/chat-transport.ts`, `client/web/src/lib/llm.ts`, `client/web/src/lib/llm-jobs.test.ts`, `server/workspace/src/routes/llm.ts`, `server/workspace/src/llm-jobs.ts`, `server/workspace/tests/llm-jobs.test.ts`, `server/workspace/tests/llm.test.ts`.

## Report back

Check off tasks as each Verify passes, and write `briefs/09-report.md`
containing the three evidence results verbatim, which branch of 9.5 you took
and why, and any deviations. If you took the blocker branch, the entry in
`briefs/deviations.md` must name exactly what would unblock deletion later.
