# Brief: Envelope contract ADR (utdk-output-schemas stream 2)

## Mission
Record an ADR: output schemas describe the value inside `data`; errors are out-of-band;
streams bypass the envelope. Document the two divergent unwrap implementations and name
`tools-global` as the change that converges them.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-output-schemas/tech-plan.md`
2. ADR skill: `/Users/jacob/.claude/skills/adr/SKILL.md`
3. tasks.md stream 2
4. Envelope/errors/streaming scenarios in tool-entry-output-slot

## Tasks
Stream **2** (2.1–2.2) verbatim.

## Acceptance criteria
### tool-entry-output-slot

#### Scenario: Contract helper declares an output schema

- **WHEN** a contract's tool-entry helper returns entries for its operations
- **THEN** each entry may carry an `outputSchema`, and the helper's declared return type permits it

### tool-entry-output-slot

#### Scenario: Discovery preserves the slot

- **WHEN** tool entries pass through discovery relabelling
- **THEN** any `outputSchema` present on an entry survives to the caller unchanged

### tool-entry-output-slot

#### Scenario: Absent schema is distinguishable

- **WHEN** an operation has no known output schema
- **THEN** the field is absent rather than set to a placeholder, so "unknown" and "not declared" are the same observable state and neither is mistaken for a real schema

### tool-entry-output-slot

#### Scenario: Schema describes the unwrapped value

- **WHEN** an operation declares an output schema and the gateway wraps the result as `{ data, meta }`
- **THEN** the schema describes the value at `data`, not the envelope

### tool-entry-output-slot

#### Scenario: Errors are out of scope

- **WHEN** an operation fails
- **THEN** the failure travels as a thrown error or an `{ error }` body with a non-OK status, and is not described by the operation's output schema

### tool-entry-output-slot

#### Scenario: Streaming operation carries a marker

- **WHEN** an operation returns a stream rather than a JSON body
- **THEN** its entry carries a streaming marker and no `outputSchema`

### tool-entry-output-slot

#### Scenario: Consumers can distinguish

- **WHEN** a consumer reads a tool entry with a streaming marker
- **THEN** it can present the operation as streaming instead of reporting an unknown result shape

(Deliverable is the ADR; scenarios describe the contract it must record.)

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
# tasks.md expects: test -f docs/adr/*envelope*.md
mkdir -p docs/adr
# If using docs/decisions/ per adr skill, also place/copy so docs/adr/*envelope*.md exists
test -f docs/adr/*envelope*.md
```

## Git workflow
- Repo: registry. Branch: `iw7/utdk-envelope-adr`
- Touches only: `docs/adr/**` (and optionally `docs/decisions/**` + index)
- Open PR; do not merge.

## Report back
`briefs/02-report.md` with PR URL.
