# Brief: aprovan — action exception queue

**Depends-on: 8 (merged)** | Repo: aprovan | Wave 6 (parallel with 11)

## Mission

When you are done, out-of-grant **resource** misses persist as
`QueuedAction` records (`queued → released|discarded|expired`), with
chain semantics for fire-and-forget vs result-dependent runs, release
(optional remember-pattern grant), discard, F3 attribution + audit on
every transition. Capability-level misses never queue (deny / JIT).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 1, 6
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goals 4, 5
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Interfaces `QueuedAction` + state machine
5. `openspec/changes/iw9-c-capability-approval/specs/action-exception-queue/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 9
7. `agents/runner.ts` `RUNS_SCOPE` precedent; published `matchesResourcePattern` from pin

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 9.1 New module `action-queue.ts`: `QueuedAction` persisted as an
      `svc#` record (`svcScope("actions", "queue")`, the `agents/
      runner.ts` `RUNS_SCOPE` precedent) with lifecycle `queued →
      released | discarded | expired` (terminal, no further
      transitions). Spec: action-exception-queue "Out-of-grant actions
      queue", "Queued actions expire" (default 7 days, PRD Open Question
      1 resolved this way).
- [x] 9.2 `evaluateDispatch`'s `queue` decision (stream 8) calls into
      `action-queue.ts` to persist the record and returns
      `{ kind: "queue", queuedActionId }`; a capability-level denial
      (namespace not granted at all) never queues — it denies or raises a
      JIT card (stream 10). Spec scenario: "Resource miss queues",
      "Namespace miss does not queue".
- [x] 9.3 Chain semantics: expose `queueForChain(runId, resultDependent):
      { queuedActionId }` so the caller (agents/runner.ts, wired in
      stream 10) can tell fire-and-forget from result-dependent chains and
      decide whether to continue the turn or end it with "queued N
      actions". Spec: "Chain semantics", scenarios "Fire-and-forget
      continues", "Result-dependent ends turn".
- [x] 9.4 `release(id, reviewerId, rememberPattern?)`: executes the
      original args verbatim exactly once via `evaluateDispatch`'s allow
      path, marks the record terminal, and — if `rememberPattern` is set
      — writes a `ResourceGrantRow` through the standard grant path (the
      published matcher from registry stream 3). A second release attempt
      on a terminal record is a no-op error. `discard(id, reviewerId)`:
      marks terminal, no execution, no undo. Spec: "Release and discard",
      scenarios "Release executes once", "Release with remember".
- [x] 9.5 Every transition (queued/released/discarded/expired) carries
      the F3 attribution triple and writes an audit row via `audit.ts`.
      Spec: "Queue rows carry full attribution", scenario "Attribution
      survives release".
- [x] 9.6 New test file `tests/action-queue.test.ts`: full lifecycle
      round-trip, double-release is a no-op error, expiry after the
      configured window discards without executing, remember-pattern
      release writes a grant that later dispatches match directly,
      attribution triple present on every transition's audit row.

## Acceptance criteria

From `specs/action-exception-queue/spec.md`:

#### Scenario: Resource miss queues
- **WHEN** `email.send` to `bob@example.org` is dispatched under grant
  `(email.send, mailto:*@aprovan.com)`
- **THEN** no email is sent and a queued-action record exists carrying the
  full call and its target resource

#### Scenario: Namespace miss does not queue
- **WHEN** a principal with no `email` grant dispatches `email.send`
- **THEN** nothing is queued; the caller receives an authorization error
  (or, in an agent run, a JIT capability card)

#### Scenario: Fire-and-forget continues
- **WHEN** a run queues a notification-send whose result is unused
- **THEN** the run's next step executes in the same turn and the final
  message notes the queued action

#### Scenario: Result-dependent ends turn
- **WHEN** a run queues an action and the next step reads its result
- **THEN** the turn ends with "queued N actions"; no simulated result is injected

#### Scenario: Release executes once
- **WHEN** a reviewer releases a queued `email.send`
- **THEN** the send executes with the original arguments, the record
  becomes terminal, and a second release attempt is a no-op error

#### Scenario: Release with remember
- **WHEN** the reviewer releases and checks "allow *@example.org"
- **THEN** a grant row is written via the standard grant path and future
  matching actions dispatch directly

#### Scenario: Expiry discards
- **WHEN** a queued action passes its expiry
- **THEN** it transitions to a terminal discarded state with reason
  "expired" and can no longer be released

#### Scenario: Attribution survives release
- **WHEN** an admin releases a member's queued action executed under a
  workspace-oauth credential
- **THEN** the audit rows name the original member as invoker, the
  releasing admin as approver, and the credential level + id

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- action-queue
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/action-queue.ts`, `aprovan/server/workspace/src/grants.ts` (queue-decision branch only), `aprovan/server/workspace/tests/action-queue.test.ts`
- Do not emit `pending_action` or build review UI (streams 10/12/13).
- No simulated results; no undo.

## Report back

Check off tasks; PR or `briefs/09-report.md`; note `queueForChain` API for
stream 10.
