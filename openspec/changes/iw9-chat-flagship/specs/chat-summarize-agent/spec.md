# chat-summarize-agent — the `chat/summarize` profile

Chat ships an app-scoped agent profile (D15: apps may ship
`<app>/<agent>` profiles bounded by the app's grants), executed by iw9-d's
server-side loop (`agents.run`).

## ADDED Requirements

### Requirement: Profile bounded by the app's grants (D15, invariant 2)

The `chat/summarize` profile SHALL execute with authority equal to the
intersection of the invoker's authority and Chat's granted ceiling. It SHALL
be able to read only channels the **invoker** can read (invariant 4 — the
invoker's agent inherits the invoker's access, narrowed by the app's
grants), and SHALL have no write capability beyond posting its summary reply
into the conversation it was invoked from.

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

### Requirement: Server-loop execution and invoker billing

`chat/summarize` SHALL run via `agents.run` on the server loop (iw9-d) —
no client-side loop, no prompt-pasting. LLM/agent spend SHALL be attributed
to the invoker (D22), and any approvals raised by the run SHALL go to the
invoker's queue (D15).

#### Scenario: Invoker is billed and attributed

- **WHEN** any participant invokes `chat/summarize`
- **THEN** the run record names the invoker as the payer/principal, and the
  audit trail attributes the run to the invoker via the app profile

### Requirement: Summary is an attributed message

The summary output SHALL be posted as a message in the invoked channel or
thread, attributed as agent-produced on behalf of the invoker — it SHALL be
visually and structurally distinguishable from a human message.

#### Scenario: Summary lands in the thread

- **WHEN** a participant invokes summarize on a thread
- **THEN** the summary appears as a reply in that thread, marked as
  agent-produced, and is stored in the shared partition like any message
