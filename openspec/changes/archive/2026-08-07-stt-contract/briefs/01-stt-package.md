# Brief: The @utdk/stt contract package

## Mission
Scaffold `@utdk/stt` in the registry repo with types, open-arg validation, `sttToolEntries()` declaring `open` with streaming mode `"session"`, and a conformance suite.

## Read first
1. In aprovan: `openspec/changes/stt-contract/tech-plan.md` (Interfaces & Data)
2. `openspec/changes/stt-contract/specs/stt-contract/spec.md`
3. `openspec/changes/stt-contract/tasks.md` — section 1
4. In registry: existing contracts e.g. `packages/contracts/sandbox/` or `agent/` for package layout; `@utdk/common/streaming` for session mode

## Depends-on
`@utdk/common@0.1.2` with `./streaming` is published.

## Tasks
Copy section 1 checkboxes (1.1–1.6) from tasks.md.

## Verify
`pnpm --filter @utdk/stt test && pnpm --filter @utdk/stt check-types`

## Constraints
Work in **registry** repo under `packages/contracts/stt/**` only.
Branch from main, PR, bump version per convention. Check off aprovan tasks.md section 1 or note for orchestrator.
