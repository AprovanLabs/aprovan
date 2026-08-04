## ADDED Requirements

### Requirement: Tool entries can express an output schema

Every producer of tool entries SHALL be able to declare an output schema alongside the input schema. The declared return type of each helper SHALL include the slot.

#### Scenario: Contract helper declares an output schema

- **WHEN** a contract's tool-entry helper returns entries for its operations
- **THEN** each entry may carry an `outputSchema`, and the helper's declared return type permits it

#### Scenario: Discovery preserves the slot

- **WHEN** tool entries pass through discovery relabelling
- **THEN** any `outputSchema` present on an entry survives to the caller unchanged

#### Scenario: Absent schema is distinguishable

- **WHEN** an operation has no known output schema
- **THEN** the field is absent rather than set to a placeholder, so "unknown" and "not declared" are the same observable state and neither is mistaken for a real schema

### Requirement: Envelope contract is documented

The relationship between an output schema and the gateway's response envelope SHALL be recorded once as an architecture decision and referenced by consumers.

#### Scenario: Schema describes the unwrapped value

- **WHEN** an operation declares an output schema and the gateway wraps the result as `{ data, meta }`
- **THEN** the schema describes the value at `data`, not the envelope

#### Scenario: Errors are out of scope

- **WHEN** an operation fails
- **THEN** the failure travels as a thrown error or an `{ error }` body with a non-OK status, and is not described by the operation's output schema

### Requirement: Streaming operations are marked, not schematised

An operation whose response is a stream SHALL be identified as streaming rather than given an output schema.

#### Scenario: Streaming operation carries a marker

- **WHEN** an operation returns a stream rather than a JSON body
- **THEN** its entry carries a streaming marker and no `outputSchema`

#### Scenario: Consumers can distinguish

- **WHEN** a consumer reads a tool entry with a streaming marker
- **THEN** it can present the operation as streaming instead of reporting an unknown result shape
