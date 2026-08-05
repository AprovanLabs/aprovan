# Brief: tools-addressing §3 — Bind full registry into tools.

## Mission
Scanned aliases resolve to canonical provider names when building `RuntimeDependency`.
`tools.googleDrive.files.list({})` dispatches `call("google/drive", "files.list", …)`.
Unknown aliases error with a suggestion to use `tools.search()`.

## Read first
1. `openspec/changes/tools-addressing/{prd,tech-plan,tasks}.md`
2. Tech-plan D3 (scan is a hint)
3. registry `packages/remote/src/imports.ts`, `proxy.ts`, `__tests__/remote.test.ts`
4. Confirm TA §1 merged (alias derivation)

## Tasks
Copy §3 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** any of the 1,996 slash-named providers is reachable from `tools.` and
dispatches under its canonical name.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @utdk/remote test
```

## Constraints
- Depends-on: TA §1
- Touches: registry `packages/remote/src/imports.ts`, `proxy.ts`, `__tests__/remote.test.ts`
- Do NOT make bracket access an error (GE §2 owns that, after TA §4)
- Serialize note: GE §2 will edit imports.ts after this; keep changes rebase-friendly
- Branch `iw8/tools-addressing-03-bind`; report `briefs/03-report.md`
- Do NOT merge yourself
