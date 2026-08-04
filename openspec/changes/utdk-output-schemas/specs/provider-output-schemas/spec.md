## ADDED Requirements

### Requirement: Only success responses become return types

Response-schema extraction SHALL consider only 2xx responses. A non-2xx response SHALL NOT become an operation's declared return type under any circumstance.

#### Scenario: No-content success does not fall through

- **WHEN** an operation's only success response is `204` with no content, and the spec also declares a `400` with a body
- **THEN** the operation's return type reflects no content, and the `400` body is not used

#### Scenario: Error bodies eliminated

- **WHEN** every generated provider type tree is inspected after regeneration
- **THEN** no operation declares a type whose source was a non-2xx response

#### Scenario: Multiple success responses

- **WHEN** an operation declares more than one 2xx response with content
- **THEN** extraction selects deterministically and the same input always yields the same return type

### Requirement: No-content responses are explicit

An operation whose success response carries no content SHALL declare that explicitly rather than resolving to an unrelated or unknown type.

#### Scenario: Void return declared

- **WHEN** an operation's success response is `204` or `205`
- **THEN** its declared return type expresses "no value", matching what the client actually returns

### Requirement: Output schemas are published as data

Provider response schemas SHALL be readable as structured data, not only as generated TypeScript text.

#### Scenario: Catalog serves response schemas

- **WHEN** a consumer fetches a provider's catalog entry
- **THEN** each operation carries its response schema alongside its parameters and request-body fields

#### Scenario: Coverage is measurable

- **WHEN** an operation's upstream specification declares no response schema
- **THEN** it is marked as such, so the proportion of operations lacking a schema can be measured rather than inferred

### Requirement: MCP tool definitions carry output schemas

Provider tools exposed over MCP SHALL include an output schema whenever one is known.

#### Scenario: Output schema reaches the MCP definition

- **WHEN** a provider tool with a known response schema is exposed over MCP
- **THEN** its tool definition includes the corresponding output schema

#### Scenario: Unknown schema omitted, not faked

- **WHEN** a provider tool has no known response schema
- **THEN** its MCP definition omits the output schema rather than declaring a permissive placeholder
