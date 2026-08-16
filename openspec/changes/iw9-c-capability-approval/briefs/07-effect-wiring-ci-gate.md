# Brief: aprovan — effect wiring on the tool list + core-service annotations + CI gate

**Depends-on: 6 (merged)** | Repo: aprovan | Wave 4

## Mission

When you are done, `ToolEntry` / `ServiceToolEntry` and `GET /tools` carry
`effect` end-to-end; every core-service tool is annotated; a
`check-effect-completeness` CI script fails on holes; tests prove
observation routing assertions. Full resource/queue behavior lands in
stream 8.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goal 2
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Interfaces `Effect`
5. `openspec/changes/iw9-c-capability-approval/specs/effect-classification/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 7
7. `server/workspace/src/routes/tools.ts` (`ToolEntry` ~84-96), `service-kernel.ts`, `platform-plugins.ts`, `apps/service.ts`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 7.1 Add `effect: Effect` to `ToolEntry` (`routes/tools.ts:84-96`)
      and `ServiceToolEntry` (`service-kernel.ts:135-143`); thread it
      through `deriveToolEntries`, `catalogToolEntries`, and every core
      service's static `tools` export (starting with `platform-plugins.ts`
      and `apps/service.ts`) so `GET /tools` surfaces it end to end. Spec:
      effect-classification "Effect is visible on the wire".
- [ ] 7.2 Annotate every core-service tool entry with an explicit
      `effect` (read/list/get → `observation`; everything else →
      `action`); an entry with neither an annotation nor a derivable
      method defaults to `action` at dispatch (fail closed). Spec:
      "Handwritten providers and core services are annotated",
      "Unannotated tool fails the completeness gate".
- [ ] 7.3 New script `scripts/check-effect-completeness.ts`: builds the
      full tool list for a representative workspace and fails (naming the
      tool) if any entry lacks `effect` and has no derivable method; wire
      it into `pnpm --filter @aprovan/workspace check-types` or an
      equivalent pre-merge step.
- [ ] 7.4 New test file `tests/effect-classification.test.ts`: tool list
      entries all carry `effect`; a `github.*` GET tool's effect matches
      the bundler-derived value from the pinned package; an observation
      call inside a granted namespace executes without any resource-grant
      check (spec scenario "Observation inside a granted namespace" —
      exercised here as a routing assertion, full behavior lands in
      stream 8).

## Acceptance criteria

From `specs/effect-classification/spec.md`:

### Requirement: Handwritten providers and core services are annotated
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
#### Scenario: Tool list carries effect
- **WHEN** a client fetches the tool list
- **THEN** each entry includes `effect`, and entries for generated
  providers match the method-derived value published by the bundler

### Requirement: Observations never require action approval
#### Scenario: Observation inside a granted namespace
- **WHEN** a principal with a `github` capability grant calls a
  `github.*` tool classified `observation` on any resource
- **THEN** the call executes without a resource-grant check, queue entry,
  or card
(routing assertion here; full predicate in stream 8)

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- effect-classification && tsx server/workspace/scripts/check-effect-completeness.ts
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/routes/tools.ts` (ToolEntry + discovery functions only, not the invoke handler), `aprovan/server/workspace/src/service-kernel.ts`, `aprovan/server/workspace/src/platform-plugins.ts`, `aprovan/server/workspace/src/apps/service.ts`, `aprovan/server/workspace/scripts/check-effect-completeness.ts`, `aprovan/server/workspace/tests/effect-classification.test.ts`
- Do not rewrite invoke/dispatch gates (stream 8). New tests in a new file only.

## Report back

Check off tasks; PR or `briefs/07-report.md`; note any core tools that
could not be classified and how the gate names them.
