# Brief: Parity checklist, flag flip, and legacy-loop deletion (stream 8)

**Model tier: Sonnet.** **Depends-on: streams 6 and 7 (both merged).**
This stream is IW-9's Wave-1 exit gate for change D.

## Mission

When you are done, the browser no longer contains an agent loop: six named
behaviors are proven identical under the new transport, the dev toggle is
gone, and `DefaultChatTransport`, `formatToolSignatures`,
`TOOL_PROMPT_CAP_PER_NAMESPACE`, and the duplicate client-side transcript
writer are deleted — with a grep gate across both checkouts proving it. The
order matters: parity is validated *before* anything is deleted, because the
legacy path is the only rollback.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — rule 4: deletion is done only when grep is empty in **both** repos.
2. `openspec/changes/iw9-d-agent-loop-server/prd.md` — **Goal 6** is your checklist, Goal 2 is your grep gate.
3. `openspec/changes/iw9-d-agent-loop-server/tasks.md` — stream 8 preamble and the baseline rule.
4. `openspec/changes/iw9-d-agent-loop-server/specs/chat-agent-transport/spec.md`
5. `openspec/changes/iw9-d-agent-loop-server/specs/tool-discovery-describe/spec.md` — "No signature pasting survives".
6. `briefs/02-report.md` (delta granularity), `briefs/05-report.md` (idempotent append keying), `briefs/06-report.md` (toggle name/default).
7. `client/web/src/features/chat/chat-transport.ts` — `TOOL_PROMPT_CAP_PER_NAMESPACE` L16, `formatToolSignatures` L18, `DefaultChatTransport` L83, `useEditTransport` L132 (**keep this one**).
8. `client/web/src/features/chat/useChatSubmit.ts` — provider/model refs; read-only gate L149.
9. `client/web/src/features/chat/chat-file-context.ts`, `client/web/src/features/chat/widget-fences.ts`, `client/web/src/features/chat/chat-artifact.test.ts`.
10. `client/web/src/features/sessions/useSessionChatSync.ts` — the duplicate writer you delete in 8.10.

## Tasks

- [x] 8.1 Parity: model/provider picker — per-send `provider`/`model` selection (`useChatProviders`/`chatProviderRef`/`chatModelRef` in `useChatSubmit.ts`) resolves the run's LLM dispatch through `RunTransport` exactly as `DefaultChatTransport` did; add/extend a test that switches provider mid-conversation and asserts the next run uses it.
- [x] 8.2 Parity: file context — `buildContextFiles`/pinned-path/@mention parsing (`chat-file-context.ts`) produces the same `contextFiles` set sent through `RunTransport`/`POST /agents/chat-turn` as the deleted client-composed `formatContextFilesPrefix` text did (cross-check against stream 5.4's server-side wiring).
- [x] 8.3 Parity: widget fence streaming — `widget-fences.ts`/`shouldMountAsWidget` incremental-mount behavior is unchanged when fed `assistant_delta` events via `RunTransport` instead of AI-SDK text-deltas; extend `chat-artifact.test.ts` (do not rewrite it) with a case driven through `RunTransport`.
- [x] 8.4 Parity: self-heal bounds — re-run stream 7's test suite against the flipped-default transport as a regression gate (no new tests; this is the flip-time checkpoint).
- [x] 8.5 Parity: session sync — lazy session creation (now server-side per 5.1) and reload-mid-run reconstruction (session carries `activeRunId` from 5.5, a reload renders history then reattaches and streams the remainder — spec "Reload mid-run reconstructs the conversation") verified against `RunTransport`. The parity bar for message persistence is **the observable outcome, not the mechanism**: after a send completes, the session record holds the user message and the full assistant transcript exactly as it did under `useSessionChatSync.ts` — asserted with the client-side writer already removed by 8.10, proving the server write alone is sufficient.
- [x] 8.6 Parity: read-only-session guard — submitting against a closed/merged session is refused client-side before any network call (spec "Read-only sessions cannot start runs"), matching today's `sessionReadOnly` gate in `useChatSubmit.ts:149`.
- [x] 8.7 Flip the dev toggle from 6.3 to default-on in `ChatPage.tsx`/`useSessionOrchestration.ts`; delete the toggle and the legacy branch.
- [x] 8.8 Delete from `client/web/src/features/chat/chat-transport.ts`: the `DefaultChatTransport` usage, `formatToolSignatures`, and `TOOL_PROMPT_CAP_PER_NAMESPACE` (the `useChatTransport` export in full). Keep `useEditTransport` in the same file untouched — it is out of this change's scope per the PRD non-goal ("Widget-edit panel transport … beyond migrating its durability off llm-jobs"); only its `runChatCompletionJob` call migrates, in stream 9.
- [x] 8.9 Grep gate, both repos (IW-9 rule 4): `grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" $AAP/client $AAP/server $REG` returns nothing, with `AAP=/Users/jacob/Documents/Code/AprovanLabs/aprovan` and `REG=/Users/jacob/Documents/Code/AprovanLabs/registry` (spec chat-agent-transport "Grep gate holds"; PRD Goal 2). If `$REG` does not exist on the executing machine, the gate is **unmet** — record a blocker; do not treat an unreadable path as a clean result.
- [x] 8.10 Delete the now-duplicate client-side transcript persistence in `useSessionChatSync.ts` (the `lastPersistedCountRef`-gated append of the AI SDK `messages` array), which stream 5.2 replaced with the server-owned write; keep any non-persistence responsibilities of the hook intact, and delete the hook entirely only if persistence was its sole job. The 8.5 assertion is what proves the deletion is safe; run it after this task, not before.

## Acceptance criteria

From `specs/chat-agent-transport/spec.md`:

### Requirement: Client loop and prompt-pasting are removed

The client-side completion loop and prompt composition SHALL be deleted:
`DefaultChatTransport` usage against `/llm/:provider/chat`,
`formatToolSignatures`, and `TOOL_PROMPT_CAP_PER_NAMESPACE` (all in
client/web/src/features/chat/chat-transport.ts today). Deletion is complete
only when a repo-wide grep for the removed symbols returns nothing in either
repo.

#### Scenario: Grep gate holds

- **WHEN** `grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures"` runs over both repos (excluding this change's planning artifacts)
- **THEN** it returns no matches

### Requirement: Session sync and lazy creation

#### Scenario: Reload mid-run reconstructs the conversation

- **WHEN** the user sends a message, the run starts, and the page is reloaded before the run finishes
- **THEN** the reloaded client renders the prior transcript from the session, finds the live run id on the session record, reattaches, and streams the remainder

### Requirement: Chat turns execute as agent runs

#### Scenario: Send dispatches a run

- **WHEN** a user submits a message with provider `openai` and model `gpt-4.1` selected
- **THEN** a single `agents.run` starts whose LLM dispatch resolves that provider/model, and the client renders the reply exclusively from the run's event stream

#### Scenario: Per-send selection wins

- **WHEN** the user switches model between two sends
- **THEN** the second run uses the newly selected model without recreating the session or the transport

#### Scenario: File context rides the run

- **WHEN** the composer has pinned paths and an active file at send time
- **THEN** the run's input includes exactly the context files today's `buildContextFiles` would have produced for that send

#### Scenario: Read-only sessions cannot start runs

- **WHEN** the active session is closed/merged (read-only)
- **THEN** submit is refused client-side and `agents.run` is not called

From `specs/tool-discovery-describe/spec.md`:

### Requirement: Prompts carry patterns, not signatures

#### Scenario: No signature pasting survives

- **WHEN** a chat-driven run's rendered system prompt is inspected in a test
- **THEN** it contains the allowed patterns and tool-use instructions but no operation parameter lists

From `specs/agent-run-stream/spec.md` (widget fences, validated in 8.3):

#### Scenario: Widget fences stream through deltas

- **WHEN** the assistant's text contains a fenced widget block emitted across several deltas
- **THEN** `assistant_delta` events carry the fence content verbatim and in order, so a client can render the widget incrementally exactly as it does from today's UI message stream

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck && test -d /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures" /Users/jacob/Documents/Code/AprovanLabs/aprovan/client /Users/jacob/Documents/Code/AprovanLabs/aprovan/server /Users/jacob/Documents/Code/AprovanLabs/registry
```

The `test -d` guard is deliberate: a missing sibling checkout must fail the
gate, not silently satisfy it.

## Constraints

- **Parity first, deletion second.** Tasks 8.1-8.6 must pass before 8.7-8.10 run; the legacy path is the rollback.
- `useEditTransport` stays in `chat-transport.ts`, untouched — only its `runChatCompletionJob` call migrates, in stream 9.
- Extend `chat-artifact.test.ts`; do not rewrite it.
- If stream 2's report says assistant text arrives as a single buffered delta per turn, say so in your 8.3 result rather than asserting token-level granularity that does not exist.
- Surgical changes only; match existing style.
- Do not modify files outside: `client/web/src/features/chat/chat-transport.ts`, `client/web/src/pages/ChatPage.tsx`, `client/web/src/features/sessions/useSessionOrchestration.ts`, `client/web/src/features/sessions/useSessionChatSync.ts`, `client/web/src/features/chat/chat-artifact.test.ts`.

## Report back

Check off tasks as each Verify passes, and write `briefs/08-report.md`:
each parity item with its evidence, the grep-gate output verbatim, what was
deleted, and any deviations. This report is the artifact the Wave-1 exit gate
is judged on.
