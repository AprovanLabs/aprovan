# widget-self-heal-turn — traced, cost-ceilinged server-side self-heal

## ADDED Requirements

### Requirement: Self-heal is a server-side run continuation

A widget render failure reported by the client SHALL be healed by a
server-side agent turn on the chat session — a run (or run continuation)
whose input is the failure report (path, error, recent-problems digest) —
never by a client-composed completion. The heal turn SHALL be marked as
self-heal-originated on its run record, and its usage SHALL be accounted
exactly like a user-initiated turn.

#### Scenario: Failure becomes a traced turn

- **WHEN** a widget in the newest assistant message fails to compile or mount
  and the client reports it
- **THEN** the server starts a heal turn whose run record carries a self-heal
  origin marker, and the fix streams back over the same run event protocol
  as any other turn

#### Scenario: Heal turns are attributable

- **WHEN** an operator lists agent runs for the workspace
- **THEN** self-heal turns appear with their origin, usage, and the session
  they healed — none of chat's model spend is invisible

### Requirement: Heal turns have a cost ceiling

Each self-heal turn SHALL run under an explicit budget — bounded turns, wall
clock, and token/cost ceiling — enforced server-side via the run-args limits;
a heal turn that exhausts its budget terminates with the corresponding stop
reason and SHALL NOT be automatically retried.

#### Scenario: Budget exhaustion ends the heal quietly

- **WHEN** a heal turn hits its cost ceiling before producing a fix
- **THEN** the run terminates with the limit stop reason, the widget's error
  state remains visible in chat, and no further automatic heal is attempted
  for that message

### Requirement: Client arming bounds survive

The existing client-side arming rules SHALL be preserved as the gate on
reporting failures: at most one heal per assistant message id, at most
`MAX_WIDGET_AUTOFIXES` consecutive heals since the user last sent a message,
no heals for widgets re-rendered from persisted history, and no heals in
read-only sessions or when no provider is connected. The server SHALL
additionally enforce the per-message and consecutive caps so a misbehaving
client cannot exceed them.

#### Scenario: History never triggers a heal

- **WHEN** a session loads and a widget from persisted history fails to
  render
- **THEN** no failure report is sent and no heal turn starts

#### Scenario: Consecutive cap is enforced server-side

- **WHEN** heal requests for the same session arrive beyond the consecutive
  cap without an intervening user message
- **THEN** the server refuses the excess requests even if the client sends
  them
