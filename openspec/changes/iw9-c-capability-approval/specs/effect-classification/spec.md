# effect-classification

Every dispatchable tool carries an effect — `observation` (safe to run
without approval) or `action` (side-effectful; subject to resource grants
and the exception queue). Prerequisite for D12; defined by D13.

## ADDED Requirements

### Requirement: Generated providers derive effect from HTTP method
Generated provider tools SHALL derive their effect from the HTTP method the
bundler already retains per tool (`ToolRuntimeMetadata.method`, populated
from `tool_call_template.http_method`): `GET` and `HEAD` map to
`observation`; every other method maps to `action`. The derivation SHALL
happen in the registry bundler at generation time so the published package
carries the effect; consumers SHALL NOT re-derive it.

#### Scenario: GET tool is an observation
- **WHEN** a provider tool is generated from an OpenAPI operation with
  `http_method: "GET"`
- **THEN** the generated tool metadata carries `effect: "observation"`

#### Scenario: POST tool is an action
- **WHEN** a provider tool is generated from an operation with
  `http_method: "POST"` (or PUT/PATCH/DELETE)
- **THEN** the generated tool metadata carries `effect: "action"`

#### Scenario: Missing method fails closed
- **WHEN** a tool template carries no recognizable HTTP method
- **THEN** the tool is classified `action` (fail closed, never fail open)

### Requirement: Handwritten providers and core services are annotated
Every handwritten provider tool and every core-service procedure (vcs, vfs,
records, apps, agents, notifications, …) SHALL carry an explicit
`effect` annotation in its tool metadata. Absence of an annotation SHALL be
treated as `action` at dispatch and reported by the completeness gate.

#### Scenario: Annotated core procedure
- **WHEN** the tool list is built for a workspace
- **THEN** every core-service entry carries an explicit
  `effect: "observation" | "action"` field

#### Scenario: Unannotated tool fails the completeness gate
- **WHEN** the CI completeness check runs against a tool list containing an
  entry with no effect annotation and no derivable method
- **THEN** the check fails naming the tool, and dispatch treats that tool
  as `action` until annotated

### Requirement: Effect is visible on the wire
The workspace tool listing (`GET /tools`) SHALL surface each tool's effect
so clients (install card, review surface, agent loop) never guess.

#### Scenario: Tool list carries effect
- **WHEN** a client fetches the tool list
- **THEN** each entry includes `effect`, and entries for generated
  providers match the method-derived value published by the bundler

### Requirement: Observations never require action approval
Dispatch SHALL NOT route `observation` calls through the exception queue or
JIT action approval; observations are governed by capability grants
(namespace visibility) only.

#### Scenario: Observation inside a granted namespace
- **WHEN** a principal with a `github` capability grant calls a
  `github.*` tool classified `observation` on any resource
- **THEN** the call executes without a resource-grant check, queue entry,
  or card
