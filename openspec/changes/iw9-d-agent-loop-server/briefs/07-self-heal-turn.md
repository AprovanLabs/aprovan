# Brief: Widget self-heal as a traced server-side turn (stream 7)

**Model tier: Sonnet.** **Depends-on: streams 5 and 6 (both merged).**

## Mission

When you are done, a widget that fails to compile or mount is fixed by a
real, budgeted, attributable agent turn on the chat session instead of an
untracked client completion: the client still decides *when* to ask, the
server decides *whether* and *how much*. Today's self-heal spends model
budget with no run record, no cost ceiling, and no audit row — and a
misbehaving client could loop it. Every existing arming rule survives
verbatim; the server adds its own enforcement underneath.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-d-agent-loop-server/prd.md` — Goal 4.
4. `openspec/changes/iw9-d-agent-loop-server/tech-plan.md` — **D5**.
5. `openspec/changes/iw9-d-agent-loop-server/specs/widget-self-heal-turn/spec.md`
6. `openspec/changes/iw9-d-agent-loop-server/ux.md` — Flow "Widget self-heal" ("a heal turn is a visible turn, streaming like any other, not a hidden mutation").
7. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — preamble.
8. `client/web/src/features/self-heal/useWidgetSelfHeal.ts` — read in full: arming refs L35-37, session-reset effect L53-55, history guard L63, per-message and chain caps L69-72, the `sendMessage` call at L75.
9. `client/web/src/contexts/widget-error-reporter-context.tsx:19` — `MAX_WIDGET_AUTOFIXES = 2`.
10. `server/workspace/src/routes/agent-chat.ts` — streams 3+5; you extend `POST /agents/chat-turn`.
11. `briefs/05-report.md` and `briefs/06-report.md` — the 429 shape reserved in 5.6 and the client path you must reuse.

`client/web/src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts` does
not exist; task 7.7 is this hook's first coverage.

## Tasks

- [x] 7.1 Extend `POST /agents/chat-turn` (stream 5) to accept `{ origin: "self-heal", failure }`: re-validate the per-assistant-message-id and consecutive-heal caps server-side against the session's transcript (spec "Consecutive cap is enforced server-side" — a misbehaving client cannot exceed `MAX_WIDGET_AUTOFIXES`, whose value is 2 at `client/web/src/contexts/widget-error-reporter-context.tsx:19`); on cap exceeded, return the 429 reserved in 5.6.
- [x] 7.2 Start the heal run with explicit `limits` (`maxTurns`, `maxToolCalls`, `wallClockMs`) and a token/cost ceiling, and set `origin: "self-heal"` on the `StoredAgentRun` (field added in 2.1).
- [x] 7.3 In `useWidgetSelfHeal.ts`, replace the `sendMessage({ text: ... })` call (current lines ~75-83) with a request through the same client path stream 6's `RunTransport` uses, so a heal turn streams as a visible turn (ux.md "a heal turn is a visible turn, streaming like any other, not a hidden mutation") — keep every existing arming rule unchanged: one heal per assistant message id (`autoFixRespondedRef`), `MAX_WIDGET_AUTOFIXES` consecutive cap (`autoFixChainRef`), the session-reset effect (~L51-56), and the `userSentThisWindowRef` history guard (~L63) verbatim (spec "Client arming bounds survive").
- [x] 7.4 Confirm budget exhaustion behavior: a heal run that hits its cost ceiling terminates with the limit stop reason, the widget's error state stays visible, and no further automatic heal is attempted for that message (spec "Budget exhaustion ends the heal quietly").
- [x] 7.5 Confirm self-heal runs are attributable: an `agents.runs` listing for the workspace includes heal-origin runs with their usage and the session id they healed (spec "Heal turns are attributable"); no new listing endpoint needed — the existing `agents.runs` surface plus the `origin`/`sessionId` fields from 2.1 are sufficient.
- [x] 7.6 New test file `tests/agent-chat-selfheal.test.ts` covering the widget-self-heal-turn spec scenarios: "Failure becomes a traced turn", "Heal turns are attributable", "Budget exhaustion ends the heal quietly", "History never triggers a heal" (assert the route path is never called for messages rendered from persisted history — client-side precondition, verified by 7.3's untouched guard plus a server-side test that an unarmed request is never sent), "Consecutive cap is enforced server-side" (requests beyond the cap, sent directly against the route bypassing the client, are refused).
- [x] 7.7 New test file `client/web/src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts` (none exists today — first coverage for this hook): the existing arming-rule unit behavior (one fix per message id, consecutive cap, session-reset, history guard) now asserted against the new request call instead of `sendMessage`.

## Acceptance criteria

From `specs/widget-self-heal-turn/spec.md`:

### Requirement: Self-heal is a server-side run continuation

A widget render failure reported by the client SHALL be healed by a
server-side agent turn on the chat session — a run (or run continuation)
whose input is the failure report (path, error, recent-problems digest) —
never by a client-composed completion. The heal turn SHALL be marked as
self-heal-originated on its run record, and its usage SHALL be accounted
exactly like a user-initiated turn.

#### Scenario: Failure becomes a traced turn

- **WHEN** a widget in the newest assistant message fails to compile or mount and the client reports it
- **THEN** the server starts a heal turn whose run record carries a self-heal origin marker, and the fix streams back over the same run event protocol as any other turn

#### Scenario: Heal turns are attributable

- **WHEN** an operator lists agent runs for the workspace
- **THEN** self-heal turns appear with their origin, usage, and the session they healed — none of chat's model spend is invisible

### Requirement: Heal turns have a cost ceiling

Each self-heal turn SHALL run under an explicit budget — bounded turns, wall
clock, and token/cost ceiling — enforced server-side via the run-args limits;
a heal turn that exhausts its budget terminates with the corresponding stop
reason and SHALL NOT be automatically retried.

#### Scenario: Budget exhaustion ends the heal quietly

- **WHEN** a heal turn hits its cost ceiling before producing a fix
- **THEN** the run terminates with the limit stop reason, the widget's error state remains visible in chat, and no further automatic heal is attempted for that message

### Requirement: Client arming bounds survive

The existing client-side arming rules SHALL be preserved as the gate on
reporting failures: at most one heal per assistant message id, at most
`MAX_WIDGET_AUTOFIXES` consecutive heals since the user last sent a message,
no heals for widgets re-rendered from persisted history, and no heals in
read-only sessions or when no provider is connected. The server SHALL
additionally enforce the per-message and consecutive caps so a misbehaving
client cannot exceed them.

#### Scenario: History never triggers a heal

- **WHEN** a session loads and a widget from persisted history fails to render
- **THEN** no failure report is sent and no heal turn starts

#### Scenario: Consecutive cap is enforced server-side

- **WHEN** heal requests for the same session arrive beyond the consecutive cap without an intervening user message
- **THEN** the server refuses the excess requests even if the client sends them

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- tests/agent-chat-selfheal.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts
```

Both files are new, so both must be fully green.

## Constraints

- Every existing arming rule is preserved **verbatim** — you are changing the action, not the gate. Server-side caps are additive defense, never a replacement for the client's.
- Do not detect failures server-side; only the client knows a widget failed to mount (D5).
- A heal turn is visible, not hidden — it streams like any other turn.
- New tests go in new files; never append to an existing test file.
- Surgical changes only; match existing style.
- Do not modify files outside: `client/web/src/features/self-heal/useWidgetSelfHeal.ts`, `server/workspace/src/routes/agent-chat.ts`, `server/workspace/src/vcs/chat-sessions.ts`, `server/workspace/tests/agent-chat-selfheal.test.ts`, `client/web/src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts`.

## Report back

Check off tasks as each Verify passes, and write `briefs/07-report.md`:
the heal run's limit values and where they are configured, how the server
reconstructs the consecutive count from the transcript, and any deviations.
Stream 8.4 re-runs your suite as its flip-time regression gate.
