# chat-agent-transport — chat drives agents.run

## ADDED Requirements

### Requirement: Chat turns execute as agent runs

Submitting a chat message SHALL start a native agent run (`agents.run`)
carrying the session's message history, the send-time provider/model
selection, and the send-time file context; the client SHALL NOT compose tool
prompts, execute tool calls, or run any completion loop. The run id SHALL be
recorded on the chat session so any client can find and attach to the live
run.

#### Scenario: Send dispatches a run

- **WHEN** a user submits a message with provider `openai` and model
  `gpt-4.1` selected
- **THEN** a single `agents.run` starts whose LLM dispatch resolves that
  provider/model, and the client renders the reply exclusively from the
  run's event stream

#### Scenario: Per-send selection wins

- **WHEN** the user switches model between two sends
- **THEN** the second run uses the newly selected model without recreating
  the session or the transport

#### Scenario: File context rides the run

- **WHEN** the composer has pinned paths and an active file at send time
- **THEN** the run's input includes exactly the context files today's
  `buildContextFiles` would have produced for that send

### Requirement: Session sync and lazy creation

The first real message in an unsaved chat SHALL lazily create the session
record exactly as today (staged mode, seed title from the message), and both
the user message and the completed run's transcript SHALL be persisted on the
session server-side, so a second device or a reload reconstructs the
conversation — including a run still in progress — from the session record
alone.

#### Scenario: Reload mid-run reconstructs the conversation

- **WHEN** the user sends a message, the run starts, and the page is reloaded
  before the run finishes
- **THEN** the reloaded client renders the prior transcript from the session,
  finds the live run id on the session record, reattaches, and streams the
  remainder

#### Scenario: Read-only sessions cannot start runs

- **WHEN** the active session is closed/merged (read-only)
- **THEN** submit is refused client-side and `agents.run` is not called

### Requirement: Client loop and prompt-pasting are removed

The client-side completion loop and prompt composition SHALL be deleted:
`DefaultChatTransport` usage against `/llm/:provider/chat`,
`formatToolSignatures`, and `TOOL_PROMPT_CAP_PER_NAMESPACE` (all in
client/web/src/features/chat/chat-transport.ts today). Deletion is complete
only when a repo-wide grep for the removed symbols returns nothing in either
repo.

#### Scenario: Grep gate holds

- **WHEN** `grep -rn "TOOL_PROMPT_CAP_PER_NAMESPACE\|formatToolSignatures"`
  runs over both repos (excluding this change's planning artifacts)
- **THEN** it returns no matches

### Requirement: llm-jobs folds into run records

The LLM job store (`server/workspace/src/llm-jobs.ts`, `svc#llm-jobs`
records, the `x-llm-job` response header, and `GET /llm/jobs/:id`) SHALL be
retired: chat durability moves to run records and the run event stream, and
the remaining job consumer (the widget-edit completion path) moves to a
run-record-backed equivalent before the store is deleted. Removal is
grep-gated on `llm-jobs`, `x-llm-job`, and `readLlmJob`/`writeLlmJob`.

#### Scenario: Chat no longer needs job splicing

- **WHEN** a chat stream dies mid-reply after the migration
- **THEN** recovery happens by reattaching to the run stream, and no code
  path polls `GET /llm/jobs/:id`

#### Scenario: Job store deletion is gated

- **WHEN** the deletion task is checked done
- **THEN** `grep -rn "llm-jobs\|x-llm-job" server/ client/` returns nothing
  in either repo
