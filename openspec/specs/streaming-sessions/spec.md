## Requirements

### Requirement: Streaming mode declaration

A tool entry SHALL declare its streaming mode as `"response"`, `"session"`, or `false`. An absent field SHALL be equivalent to `false`. The declared mode SHALL appear in `GET /tools` discovery output so a caller determines the call shape without out-of-band knowledge.

#### Scenario: Session operation is discoverable

- **WHEN** a caller reads `GET /tools` for a contract declaring an operation with mode `"session"`
- **THEN** the entry for that operation includes `streaming: "session"`

#### Scenario: Legacy boolean maps to response mode

- **WHEN** an existing tool entry declares `streaming: true`
- **THEN** it is interpreted as mode `"response"` and its dispatch behavior is unchanged

#### Scenario: Absent field means not streaming

- **WHEN** a tool entry omits the streaming field
- **THEN** the operation dispatches as an ordinary one-shot call

### Requirement: Session lifecycle

The system SHALL expose a four-part session lifecycle for operations declaring mode `"session"`: an open call returning a session id, a server-sent-event channel for that session, a push endpoint accepting upstream messages, and a close call returning a terminal result.

#### Scenario: Opening a session

- **WHEN** a caller POSTs to a session operation with valid open arguments
- **THEN** the response contains a session id and the provider's streaming capabilities, and the session state is `active`

#### Scenario: Events arrive independently of pushes

- **WHEN** a provider emits two events without any intervening push
- **THEN** both events are delivered on the session's event channel in emission order with consecutive `seq` values

#### Scenario: Pushing upstream messages

- **WHEN** a caller POSTs a message to the push endpoint of an active session
- **THEN** the response status is 202 with an empty body and the message is delivered to the provider driver

#### Scenario: Closing returns the terminal result

- **WHEN** a caller POSTs to the close endpoint of an active session
- **THEN** the response contains the driver's terminal result, the event channel emits an end frame and closes, and the session state becomes `closed`

#### Scenario: Push after close is rejected

- **WHEN** a caller pushes to a session whose state is not `active`
- **THEN** the response status is 409 with code `session-not-found` or `session-expired` as applicable

### Requirement: Session ownership

A session SHALL be owned by the principal that opened it. Every subsequent request against a session SHALL re-verify the principal.

#### Scenario: Another principal cannot read a session

- **WHEN** a principal requests the event channel of a session opened by a different principal
- **THEN** the request is rejected with code `session-forbidden`

#### Scenario: Unknown session is not disclosed as forbidden

- **WHEN** a principal requests a session id that does not exist
- **THEN** the request is rejected with code `session-not-found`

### Requirement: Session expiry

A session SHALL be reclaimed after an idle period without a push or an emitted event, and after an absolute lifetime cap, whichever comes first. Reclamation SHALL release the provider's resources.

#### Scenario: Idle session is reclaimed

- **WHEN** a session receives no push and emits no event for longer than the idle timeout
- **THEN** the session is closed, its driver resources are released, and subsequent requests return code `session-expired`

#### Scenario: Long-lived session hits the absolute cap

- **WHEN** an active session exceeds the absolute lifetime cap while still receiving pushes
- **THEN** the session is closed and subsequent requests return code `session-expired`

### Requirement: Bind-time streaming capability enforcement

Binding a provider to an interface whose contract declares session operations SHALL be rejected unless the provider's capability descriptor reports streaming support. The rejection SHALL name the missing capability.

#### Scenario: Non-streaming provider is rejected at bind

- **WHEN** an operator binds a provider whose descriptor reports `streaming: false` to an interface with session operations
- **THEN** the bind fails with code `streaming-unsupported` and a message naming the provider and the capability

#### Scenario: Streaming provider binds successfully

- **WHEN** an operator binds a provider whose descriptor reports `streaming: true` to the same interface
- **THEN** the bind succeeds
