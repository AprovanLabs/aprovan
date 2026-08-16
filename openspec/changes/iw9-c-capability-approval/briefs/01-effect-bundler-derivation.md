# Brief: Registry — effect classification: bundler derivation

**Depends-on: -** | Repo: registry | Wave 0 (parallel with 2, 3)

## Mission

When you are done, the UTDK bundler derives `effect: "observation" | "action"`
from each tool's HTTP method at generation time (`GET`/`HEAD` → observation;
everything else, including missing method → action) and stamps it onto
`ToolRuntimeMetadata`. Published provider packages will carry effect without
consumers re-deriving it. This is D13 and unblocks stream 4's regen.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goal 2
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — D1, Interfaces (`Effect`)
5. `openspec/changes/iw9-c-capability-approval/specs/effect-classification/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — preamble + stream 1
7. `packages/bundler/src/client-api.ts` (`ToolRuntimeMetadata` ~:15, derivation ~:154-155, render ~:708-709)
8. `packages/bundler/src/openapi.ts` (~:138-139)

Work in `/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Tasks

- [ ] 1.1 Add `export type Effect = "observation" | "action"` and a pure
      `effectFromHttpMethod(method: string | undefined): Effect` to
      `client-api.ts` (GET/HEAD → `observation`; everything else,
      including an unrecognized/missing method, → `action` — fail closed).
      Spec: effect-classification "Generated providers derive effect from
      HTTP method", "Missing method fails closed" (tech-plan D1).
- [ ] 1.2 Add `effect: Effect` to `ToolRuntimeMetadata`
      (`client-api.ts:15`) and populate it at both derivation sites
      (`client-api.ts:154-155` and the render path `:708-709`); mirror the
      same extraction in `openapi.ts:138-139`.
- [ ] 1.3 Tests: GET operation → `observation`; POST/PUT/PATCH/DELETE →
      `action`; a template with no `http_method` → `action` (spec
      scenarios "GET tool is an observation", "POST tool is an action",
      "Missing method fails closed").

## Acceptance criteria

From `specs/effect-classification/spec.md`:

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

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/utdk-bundler test
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `registry/packages/bundler/src/client-api.ts`, `registry/packages/bundler/src/openapi.ts`, `registry/packages/bundler/src/client-api.test.ts`, `registry/packages/bundler/src/openapi.test.ts`
- Do not regenerate or publish `@utdk/*` (streams 4–5). Do not annotate handwritten providers (stream 2).

## Report back

When done: check off your tasks in `openspec/changes/iw9-c-capability-approval/tasks.md`, and open a
PR (or write `briefs/01-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (especially stream 4 regen).
