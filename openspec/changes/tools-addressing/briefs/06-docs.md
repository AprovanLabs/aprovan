# Brief: tools-addressing §6 — Documentation

## Mission
Document in `imports.ts` that the scan is a type-loading hint (enforcement at
`resolveProfile`) and that transport-specific namespace segments (`gql`, `mcp`) were
rejected.

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md`
2. Tech-plan D3; Non-Goals on transport segments
3. registry `packages/remote/src/imports.ts` (now has alias binding from §3)

## Tasks
- [ ] 6.1 State in the `imports.ts` module docstring that the scan is a type-loading
      hint and that enforcement lives at `resolveProfile` — the next reader will
      otherwise assume the dependency list is a security boundary.
- [ ] 6.2 Record that transport-specific namespace segments (`gql`, `mcp`) were
      considered and rejected, so the question is not reopened from scratch.

## Acceptance criteria
Docstring accurately reflects D3 and the rejected transport-segment approach.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @utdk/remote typecheck
```

## Constraints
- Depends-on: TA §3 (merged)
- Touches: registry `packages/remote/src/imports.ts` (docstring only); may update
  aprovan openspec/changes/tools-addressing/**
- Serialize lightly with any concurrent imports.ts edits (GE §2 not started)
- Branch `iw8/tools-addressing-06-docs`; report `briefs/06-report.md`
- Do NOT merge
