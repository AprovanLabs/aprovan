# Brief: tools-addressing §4 — Consolidate scanner (two-step)

## Mission
One scanner implementation in `@utdk/remote` (`./tools-scan` export). Editor deletes its
copy and depends on the published package. **Cross-repo publish ordering is mandatory.**

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md`
2. Tech-plan D4
3. registry `packages/remote/**` (canonical scanner)
4. aprovan `packages/editor/src/lib/scan-tools-access.ts`, `code-extractor.ts`

## Tasks
Copy §4 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** one implementation exists, the editor's exports are byte-compatible, and
`tsup` still builds the editor with `@utdk/remote` external.

## Process (orchestrator-enforced split)
### Step A — registry only (this agent, first PR)
- 4.1 exports + sideEffects; publish via merge to main (publish.yml)
- 4.2 port missing scanner test cases into remote.test.ts
- Stop. Do not touch aprovan.

### Step B — aprovan only (second agent, after npm version installable)
- 4.3–4.5 repoint editor, delete fork, grep both repos

## Verify
```bash
# Step A
pnpm --filter @utdk/remote test
# Step B (after publish)
pnpm --filter @utdk/remote test && pnpm --filter @aprovan/editor test && pnpm --filter @aprovan/editor typecheck
```

## Constraints
- Conflict: land BEFORE grant-enforcement §2 (tools-scan.ts)
- Branch A: `iw8/tools-addressing-04a-remote` on registry
- Branch B: `iw8/tools-addressing-04b-editor` on aprovan
- Reports: `briefs/04a-report.md`, `briefs/04b-report.md`
