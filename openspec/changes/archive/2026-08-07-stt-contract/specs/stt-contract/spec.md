## ADDED Requirements

### Requirement: The stt interface

The system SHALL expose an `stt` interface whose operations are a streaming session: open, push, and close, using the mechanism defined by `streaming-sessions`. The interface SHALL declare `open` in `defaultsFor`.

#### Scenario: Interface is discoverable and bindable

- **WHEN** an operator lists interfaces
- **THEN** `stt` appears with its compat list, and each entry is either bindable or carries an `unavailable` reason

#### Scenario: A session transcribes pushed audio

- **WHEN** a caller opens an stt session, pushes audio chunks, and closes the session
- **THEN** partial and final events are delivered on the event channel during the session, and close returns a result containing the full text, its segments, and the audio duration

### Requirement: Required audio encoding

Every stt provider SHALL accept `pcm_s16le_16k` audio, base64-encoded in the push message. A provider MAY advertise additional encodings in its capability descriptor. A caller SHALL NOT use an encoding that is not advertised.

#### Scenario: Default encoding is accepted

- **WHEN** a caller opens a session without specifying an encoding and pushes base64 `pcm_s16le_16k` audio
- **THEN** the provider accepts the audio and produces transcription events

#### Scenario: Unadvertised encoding is rejected at open

- **WHEN** a caller opens a session requesting an encoding absent from the provider's advertised encodings
- **THEN** the open fails with a message naming the requested and the supported encodings

### Requirement: Declared optional capabilities

An stt provider SHALL publish a capability descriptor declaring diarization, word timestamps, voice activity detection, and supported languages. Requesting an undeclared capability SHALL fail at session open rather than degrade silently.

#### Scenario: Diarization requested from a capable provider

- **WHEN** a caller opens a session with diarization enabled against a provider declaring `diarization: true`
- **THEN** the session opens and final segments carry speaker identifiers

#### Scenario: Diarization requested from an incapable provider

- **WHEN** a caller opens a session with diarization enabled against a provider declaring `diarization: false`
- **THEN** the open fails with a message naming the unsupported capability, and no session is created

#### Scenario: Word timestamps are absent when not requested

- **WHEN** a caller opens a session without requesting word timestamps
- **THEN** returned segments omit word-level detail regardless of provider capability

### Requirement: Providers never capture audio

The stt contract SHALL define no operation that opens a capture device. All audio SHALL arrive as push payloads supplied by the caller.

#### Scenario: Contract exposes no capture operation

- **WHEN** the stt tool entries are enumerated
- **THEN** no operation initiates, configures, or reads from an audio input device

### Requirement: Speaker identifiers are session-scoped

When diarization is active, speaker identifiers SHALL be opaque and meaningful only within one session. The contract SHALL NOT promise identity continuity across sessions.

#### Scenario: Same speaker across two sessions

- **WHEN** the same person speaks in two separate diarized sessions
- **THEN** the speaker identifiers in each session are independent and are not required to match

### Requirement: Final events are per-segment

A `final` event SHALL indicate that one segment is settled, not that the session has ended. The complete transcript SHALL be produced only by closing the session.

#### Scenario: Multiple finals in one session

- **WHEN** a caller pushes audio containing two separated utterances and then closes
- **THEN** two final events are delivered during the session, and the close result contains both segments and their concatenated text

### Requirement: Recoverable provider errors do not end the session

A provider failure that does not invalidate the session SHALL be delivered as an error event marked retryable, leaving the session active so the caller decides whether to continue.

#### Scenario: Upstream vendor connection drops mid-session

- **WHEN** a provider's upstream connection fails while the session is active
- **THEN** an error event with `retryable: true` is delivered and the session remains active and accepts further pushes
