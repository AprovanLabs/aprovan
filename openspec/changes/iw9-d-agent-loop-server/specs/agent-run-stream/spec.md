# agent-run-stream — server→client run event protocol

## ADDED Requirements

### Requirement: Ordered, persisted run events

A native agent run SHALL emit a sequence of run events, each carrying a
monotonically increasing integer `seq` (starting at 0, no gaps), and the
event log SHALL be persisted on the run record so it survives client
disconnects and answers replays after the run is terminal.

#### Scenario: Events are ordered and gapless

- **WHEN** a run executes two turns with one tool call each
- **THEN** the emitted events carry consecutive `seq` values in emission
  order, and the persisted run record contains the same events in the same
  order

#### Scenario: Event log survives the run

- **WHEN** a client requests the event stream of a run that reached a
  terminal state an hour ago
- **THEN** the full event history is replayed from the run record, ending
  with the terminal event

### Requirement: Run event vocabulary

The protocol SHALL define exactly these event types: `run_started`,
`turn_started`, `assistant_delta` (incremental assistant text, fenced widget
content passed through verbatim), `tool_call_started` (name, decoded
namespace/operation/args), `tool_call_finished` (result summary or error,
duration), `turn_finished`, `run_finished` (status, stopReason, usage), and
`error`. The type `pending_action` SHALL be reserved for the approval stream
(iw9-c): its name is registered in the protocol union but no producer in this
change emits it. Clients SHALL ignore event types they do not recognize.

#### Scenario: Tool call is observable in phases

- **WHEN** the model requests `call_tool { namespace: "vcs", operation:
  "log" }` and it succeeds
- **THEN** the stream carries a `tool_call_started` event with the decoded
  call before dispatch and a `tool_call_finished` event with duration and a
  truncated result echo after it

#### Scenario: Unknown event types are ignored

- **WHEN** a client built against this protocol receives an event whose type
  it does not recognize (e.g. a future `pending_action`)
- **THEN** it skips the event without erroring and continues consuming the
  stream

#### Scenario: Widget fences stream through deltas

- **WHEN** the assistant's text contains a fenced widget block emitted across
  several deltas
- **THEN** `assistant_delta` events carry the fence content verbatim and in
  order, so a client can render the widget incrementally exactly as it does
  from today's UI message stream

### Requirement: Reattach and replay by run id

The gateway SHALL expose a stream endpoint addressed by run id that accepts a
`from` sequence number, replays all persisted events with `seq >= from`, and
then continues with live events until the run is terminal. Reattaching SHALL
be valid any number of times, concurrently, without affecting the run.

#### Scenario: Client reattaches mid-run

- **WHEN** a client that consumed events up to `seq` 41 reconnects with
  `from=42` while the run is still executing
- **THEN** it receives every event from 42 onward with no gap and no
  duplicate, followed by the live tail through `run_finished`

#### Scenario: Locked phone loses nothing

- **WHEN** the streaming connection dies mid-run (backgrounded tab, network
  drop) and the client later reattaches with the last `seq` it saw
- **THEN** the replayed-plus-live event sequence is identical to what an
  uninterrupted client would have received

### Requirement: Runs are client-independent

A run in progress SHALL continue to its terminal state when zero clients are
attached to its stream. Client disconnect SHALL NOT cancel, pause, or fail a
run; cancellation happens only through the existing `agents.cancel` surface.

#### Scenario: Disconnect does not cancel

- **WHEN** the only attached client disconnects while the run has three
  turns left
- **THEN** the run executes those turns, persists its events and terminal
  record, and a later `agents.get` shows `succeeded` with full turns

### Requirement: Streaming capability is declared

The native runtime's capability descriptor SHALL declare `streaming: true`
once the event stream exists, and the declaration SHALL be the discoverable
signal that a runtime's runs can be attached to (per the `@utdk/agent`
capability contract).

#### Scenario: Capability reflects reality

- **WHEN** a caller inspects the native runtime's `AgentCapabilities`
- **THEN** `streaming` is `true` and the stream endpoint answers for its runs
