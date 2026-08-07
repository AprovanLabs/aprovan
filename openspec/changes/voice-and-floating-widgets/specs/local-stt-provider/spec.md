## ADDED Requirements

### Requirement: On-device transcription fulfils the stt contract

The `stt` interface SHALL offer an implementation that transcribes on the local machine, registered as credentialless, and satisfying the same contract a remote provider satisfies.

#### Scenario: Local provider passes the contract conformance suite

- **WHEN** the conformance suite written for the `stt` contract is run against the local provider
- **THEN** every case passes, as it does for the remote provider

#### Scenario: Audio does not leave the machine

- **WHEN** a transcription session runs against the local provider
- **THEN** no audio is transmitted to any external network endpoint

#### Scenario: Swapping providers requires no caller change

- **WHEN** an operator rebinds `stt` from the remote provider to the local one
- **THEN** existing callers continue to work unmodified

### Requirement: Model weights are managed

The provider SHALL ship with a default model usable without network access, and SHALL allow additional models to be installed on request and removed afterwards.

#### Scenario: First-run transcription with no network

- **WHEN** a freshly installed application with no network connectivity starts a transcription session
- **THEN** the bundled model transcribes and results are produced

#### Scenario: Installing an additional model

- **WHEN** a user installs a model that is not bundled
- **THEN** the weights are fetched and verified, progress is reported during the fetch, and the model becomes selectable

#### Scenario: Corrupt download is rejected

- **WHEN** fetched weights fail verification
- **THEN** the model is not installed, previously installed models are unaffected, and the failure is reported

#### Scenario: Bundled model cannot be removed

- **WHEN** a user attempts to remove the bundled default model
- **THEN** the request is refused, so the offline path is never lost

### Requirement: Capabilities follow the loaded model

The provider's declared capabilities SHALL reflect the model in use. Requesting a capability the current model lacks SHALL fail at session open.

#### Scenario: Diarization with a capable model

- **WHEN** a diarization-capable model is selected and a session is opened requesting diarization
- **THEN** the session opens and final segments carry speaker identifiers

#### Scenario: Diarization without a capable model

- **WHEN** the selected model does not support diarization and a session is opened requesting it
- **THEN** the open fails naming the unsupported capability, and no second model is loaded implicitly

#### Scenario: Capability report changes with model selection

- **WHEN** the selected model changes
- **THEN** the provider's reported capabilities change to match it

### Requirement: Model is ready before the first session

The default model SHALL be loaded when the provider becomes available, not on first use.

#### Scenario: First session does not wait for a model load

- **WHEN** the first transcription session of an application launch is opened
- **THEN** it begins transcribing without waiting for model weights to be read from disk
