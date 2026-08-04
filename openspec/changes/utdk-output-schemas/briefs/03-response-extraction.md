# Brief: Fix response extraction (utdk-output-schemas stream 3)

## Mission
Fix OpenAPI response-schema extraction in `@aprovan/utdk-bundler`: dedupe getters,
restrict to 2xx, introduce four-outcome result type, handle 204/205, deterministic
multi-2xx, and regression-test the 204+400 bug that sourced error bodies as return types.
This PR gates streams 4–6.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-output-schemas/tech-plan.md` (D2)
2. tasks.md stream 3
3. Spec `provider-output-schemas`
4. Sources: `packages/bundler/src/openapi.ts`, `render.ts`, `schema.ts`, tests;
   reference client void-return behaviour around `client.ts:397-400`

## Tasks
Stream **3** (3.1–3.6) verbatim.

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

(Focus on no-content / error-body / multi-2xx / void scenarios.)

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/utdk-bundler test
```

## Git workflow
- Repo: registry. Branch: `iw7/utdk-response-extraction`
- Touches only: `packages/bundler/src/**` (+ tests)
- Open PR; do not merge.

## Report back
`briefs/03-report.md` with PR URL; note streams 4–6 may start after this merges.
