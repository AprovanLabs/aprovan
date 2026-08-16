# Brief: `chat/summarize` agent profile

**Depends-on: 1, 4 (merged)** | Repo: aprovan | Wave 2 (parallel with 7)

## Mission

When you are done, Chat ships `chat/summarize` via the app's agent
declaration, bounded by Chat ∩ invoker grants, posting an attributed
summary message through stream 1's `postMessage`. Runs via `agents.run`
(iw9-d) — no Chat-local agent loop.

**Already on main:** iw9-d stream 10 (CF-5 app-scoped profiles) and iw9-d
stream 8 (`RunTransport` default). Task 5.1 is a verify-landed gate, not
a rebuild. If CF-5 is missing, stop and raise against iw9-d.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 2, 4
3. `openspec/changes/iw9-chat-flagship/prd.md` — summarize goal
4. `openspec/changes/iw9-chat-flagship/tech-plan.md` — CF-5 note; Interfaces agent marker
5. `openspec/changes/iw9-chat-flagship/specs/chat-summarize-agent/spec.md`
6. `openspec/changes/iw9-d-agent-loop-server/specs/app-scoped-agent-profiles/spec.md`
7. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 5
8. Stream 1 `postMessage` / `canReadChannel`; `Apps/chat/app.yaml` from stream 4

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 5.1 Before starting: verify **`iw9-d-agent-loop-server` stream 10
      ("App-scoped agent profiles (CF-5)") has landed** — it is the assigned
      owner of finding CF-5 (`IW-9-EXECUTION-OVERVIEW.md` finding 1) and
      covers the whole seam, so there is no separate iw9-b dependency for
      this. Concretely: `app.yaml` accepts an `agents:` block (iw9-d task
      10.1), `resolveAppProfile` renders it (10.2), and `agents.run` from an
      app session succeeds for the app's own `<slug>/<agent>` while
      `create`/`update` stay 403 (10.4) — see D's
      `specs/app-scoped-agent-profiles/spec.md`. If it has not landed, stop
      and raise against iw9-d — do not build a Chat-local agent loop.
- [ ] 5.2 Declare `chat/summarize` in `Apps/chat/app.yaml`'s agent list,
      bounded by Chat's capability ceiling (D15, invariant 2 — intersection
      of invoker authority and app grant); tool access limited to
      `canReadChannel`-gated message reads on the invoked channel/thread and
      one write: posting its own summary reply.
- [ ] 5.3 Wire invoker attribution and billing: the run record names the
      invoker as payer/principal (D22); approvals raised by the run route to
      the invoker's queue (D15) — both via iw9-d's existing `agents.run`
      plumbing, no Chat-local billing code.
- [ ] 5.4 Summary output posts through stream 1's `postMessage` with the
      `agent: { profile: "chat/summarize", invoker }` marker (spec
      `chat-summarize-agent` "Summary is an attributed message").
- [ ] 5.5 New test file `tests/chat-summarize-agent.test.ts`: run scoped to
      a guest's readable channels only when a restricted channel exists in
      the same instance (no tool call in the trace touches it), out-of-grant
      tool call denied not silently succeeding, run record attributes
      invoker as payer, posted message carries the agent marker.

## Acceptance criteria

From `specs/chat-summarize-agent/spec.md`:

#### Scenario: Summarize respects the invoker's channel access
- **WHEN** a guest invokes `chat/summarize` on a channel they can read,
  while the instance contains restricted channels they cannot
- **THEN** the summary is produced from the readable channel only, and no
  tool call in the run's trace touches a channel the guest cannot read

#### Scenario: Out-of-grant tool call fails closed
- **WHEN** the summarize run attempts a namespace outside Chat's granted
  ceiling
- **THEN** the call is denied by the platform; the run surfaces the denial
  (or queues per D12 if iw9-c has landed) rather than silently succeeding

#### Scenario: Invoker is billed and attributed
- **WHEN** any participant invokes `chat/summarize`
- **THEN** the run record names the invoker as the payer/principal, and the
  audit trail attributes the run to the invoker via the app profile

#### Scenario: Summary lands in the thread
- **WHEN** a participant invokes summarize on a thread
- **THEN** the summary appears as a reply in that thread, marked as
  agent-produced, and is stored in the shared partition like any message

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace exec vitest run tests/chat-summarize-agent.test.ts
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/Apps/chat/app.yaml`, `aprovan/Apps/chat/agents/summarize.ts`, `aprovan/server/workspace/tests/chat-summarize-agent.test.ts`
- Do not build a Chat-local agent loop or billing path. Do not edit core `agents/service.ts` (D owns CF-5 — already on main).

## Report back

Check off tasks; PR or `briefs/05-report.md`; confirm 5.1 CF-5 gate passed.
