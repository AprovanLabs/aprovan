## ADDED Requirements

### Requirement: Capture happens in the client

Microphone capture SHALL be performed by the client and delivered to the bound provider through the contract's push messages. No provider SHALL open a capture device.

#### Scenario: Captured audio is delivered as contract messages

- **WHEN** a user starts capture
- **THEN** audio is framed and delivered as push messages in the contract's required encoding

#### Scenario: Local and remote providers receive identical input

- **WHEN** the same capture is run against the local provider and against a remote provider
- **THEN** both receive the same message sequence, no provider-specific capture path existing

### Requirement: Explicit start and end

Capture SHALL begin only on an explicit user action and end on an explicit action, a provider-signalled end of speech where that capability is declared, or a session error. There SHALL be no wake-word or always-on listening.

#### Scenario: Capture requires a deliberate action

- **WHEN** the application is running and the user takes no action
- **THEN** the microphone is not active

#### Scenario: Stopping returns the final result

- **WHEN** a user ends capture
- **THEN** the session is closed and the complete transcript is returned

#### Scenario: End of speech ends capture when supported

- **WHEN** the bound provider declares end-of-speech detection and signals it
- **THEN** capture ends and the final transcript is produced without further user action

### Requirement: Permission handling

The client SHALL request microphone permission on first use and SHALL distinguish a denial from a device failure.

#### Scenario: Permission denied

- **WHEN** a user denies microphone permission
- **THEN** voice input is reported unavailable with the reason, other input remains usable, and the user is not repeatedly prompted

#### Scenario: No input device

- **WHEN** no microphone is present
- **THEN** the failure is reported as a missing device, distinctly from a permission denial

### Requirement: Live feedback while speaking

Partial results SHALL be surfaced while the user is still speaking, rather than only at the end.

#### Scenario: Partials appear during speech

- **WHEN** a user speaks for several seconds during an active session
- **THEN** partial transcripts are displayed before capture ends

### Requirement: Destination is visible during capture

The client SHALL make plain which provider is receiving audio while capture is active.

#### Scenario: Remote provider is disclosed

- **WHEN** capture runs with a remote provider bound
- **THEN** the surface indicates that audio is being sent to that provider

#### Scenario: Local provider is disclosed

- **WHEN** capture runs with the local provider bound
- **THEN** the surface indicates that transcription is happening on this machine
