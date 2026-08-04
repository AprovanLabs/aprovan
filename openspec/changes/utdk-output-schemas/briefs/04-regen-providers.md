# Brief: Regenerate providers (utdk-output-schemas stream 4)

## Mission
Regenerate all provider packages after the bundler fix; review ~286 changed return types;
add a test that no generated op types from non-2xx; record coverage before/after for stream 7.

## Read first
tasks.md stream 4; brief 03 must be merged to main first.

## Tasks
Stream **4** (4.1–4.4) verbatim.

## Acceptance criteria
### provider-output-schemas

#### Scenario: No-content success does not fall through

- **WHEN** an operation's only success response is `204` with no content, and the spec also declares a `400` with a body
- **THEN** the operation's return type reflects no content, and the `400` body is not used

### provider-output-schemas

#### Scenario: Error bodies eliminated

- **WHEN** every generated provider type tree is inspected after regeneration
- **THEN** no operation declares a type whose source was a non-2xx response

### provider-output-schemas

#### Scenario: Multiple success responses

- **WHEN** an operation declares more than one 2xx response with content
- **THEN** extraction selects deterministically and the same input always yields the same return type

### provider-output-schemas

#### Scenario: Void return declared

- **WHEN** an operation's success response is `204` or `205`
- **THEN** its declared return type expresses "no value", matching what the client actually returns

### provider-output-schemas

#### Scenario: Catalog serves response schemas

- **WHEN** a consumer fetches a provider's catalog entry
- **THEN** each operation carries its response schema alongside its parameters and request-body fields

### provider-output-schemas

#### Scenario: Coverage is measurable

- **WHEN** an operation's upstream specification declares no response schema
- **THEN** it is marked as such, so the proportion of operations lacking a schema can be measured rather than inferred

### provider-output-schemas

#### Scenario: Output schema reaches the MCP definition

- **WHEN** a provider tool with a known response schema is exposed over MCP
- **THEN** its tool definition includes the corresponding output schema

### provider-output-schemas

#### Scenario: Unknown schema omitted, not faked

- **WHEN** a provider tool has no known response schema
- **THEN** its MCP definition omits the output schema rather than declaring a permissive placeholder

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/clients build
```

## Git workflow
- Branch: `iw7/utdk-regen-providers` from main **after** response-extraction merged
- Touches: `packages/utdk/*/types/**`, `packages/utdk/*/docs/**` (+ coverage note)
- Open PR; do not merge.

## Report back
`briefs/04-report.md` with coverage baseline for digitalocean stream 7.
