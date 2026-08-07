## ADDED Requirements

### Requirement: On-device model as a chat provider

The on-device model SHALL be available through the `llm` interface as an OpenAI-compatible chat provider requiring no credential, selected the same way as any hosted provider.

#### Scenario: On-device model appears alongside hosted models

- **WHEN** an operator lists `llm` implementations on a machine where the capability is available
- **THEN** the on-device provider appears alongside the hosted providers and is bindable without a credential

#### Scenario: A chat completion runs on device

- **WHEN** a caller invokes a chat completion against the bound on-device provider
- **THEN** a completion in the standard chat-completion shape is returned, and no request is made to an external network endpoint

#### Scenario: Model listing works

- **WHEN** a caller lists models for the on-device provider
- **THEN** the available on-device model or models are returned in the standard list shape

### Requirement: No contract change for native inference

Adding the on-device provider SHALL NOT change the `llm` contract, its message shapes, or its dispatch path.

#### Scenario: Existing callers are unaffected

- **WHEN** an existing script or widget calling the `llm` interface runs after the on-device provider is added
- **THEN** its behavior is unchanged

#### Scenario: Swapping providers is a binding change

- **WHEN** an operator rebinds `llm` from a hosted provider to the on-device provider
- **THEN** callers require no code change

### Requirement: Availability is reported, not guessed

The on-device provider's availability SHALL be determined at runtime and reported through the helper's availability states.

#### Scenario: Unsupported operating system

- **WHEN** the machine's operating system predates on-device model support
- **THEN** the provider reports unsupported with the version requirement, and binding it fails with that reason

#### Scenario: Feature disabled by the user

- **WHEN** the operating system supports the model but the user has not enabled the underlying system feature
- **THEN** the provider reports disabled with a remedy, distinctly from unsupported

#### Scenario: Binding an unavailable provider fails loudly

- **WHEN** an operator binds the on-device provider on a machine where it is unavailable
- **THEN** the bind fails with the reported reason rather than succeeding and failing at call time
