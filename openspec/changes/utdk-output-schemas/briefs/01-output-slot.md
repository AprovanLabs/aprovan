# Brief: Output-schema slot (utdk-output-schemas stream 1)

## Mission
Add `outputSchema?` and `streaming?` to contract tool-entry helpers, discovery
relabelling, and the kernel `ToolEntry` type, with tests proving the slot survives
relabelling and is omitted when unknown. No producer fills the slot in this change —
that is intentional for interfaces-native-provider.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-output-schemas/prd.md` + `tech-plan.md` (settled)
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-output-schemas/tasks.md` stream 1
3. Spec `openspec/changes/utdk-output-schemas/specs/tool-entry-output-slot/spec.md`
4. Sources: `packages/contracts/*/index.ts`,
   `packages/registry-server/src/http/discovery.ts`,
   `packages/registry-server/src/kernel/index.ts`

## Tasks
Stream **1** (1.1–1.4) from tasks.md, verbatim. Check off as you go.

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

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm check-types
# plus any new tests for 1.3/1.4
```

## Git workflow
- Repo: `/Users/jacob/Documents/Code/AprovanLabs/registry` only
- Branch: `iw7/utdk-output-slot` from `origin/main`
- Open PR to registry `main`. Do not merge. No aprovan code edits (openspec checkoffs live in aprovan — write `briefs/01-report.md` here under the change if you cannot edit aprovan).
- Do **not** touch bundler, apps/registry, mcp-core, or utdk provider packages.

## Constraints
- Touches only: `packages/contracts/*/index.ts`,
  `packages/registry-server/src/http/discovery.ts`,
  `packages/registry-server/src/kernel/index.ts` (+ colocated tests)
- Slot only — do not fill platform schemas.

## Report back
PR URL, verify summary, deviations in `openspec/changes/utdk-output-schemas/briefs/01-report.md` (aprovan path) or attach to the PR body.
