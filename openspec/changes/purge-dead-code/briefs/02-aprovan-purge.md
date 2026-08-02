# Brief: Aprovan repo purge (purge-dead-code stream 2)

## Mission
Remove all confirmed-dead code from the aprovan repo: `packages/bobbin` (visual-edit panel —
loss of that feature is an accepted decision), `packages/mcp-app-server` and
`packages/patchwork` (the MCP-Apps distribution channel), the compiler's dead second VFS
(store/http/indexeddb/sync — the live `vfs/project.ts`, `vfs/core/**`, `backends/memory.ts`
must survive), dead editor exports, image litter, and stale deps. ~11,500 LOC deleted; the
repo builds and tests clean afterward with no user-visible behavior change except the removed
Bobbin overlay in EditModal.

## Read first
1. `openspec/changes/purge-dead-code/tech-plan.md` (decisions D1, D2, D3)
2. `openspec/changes/purge-dead-code/specs/codebase-hygiene/spec.md`
3. `packages/editor/src/components/edit/EditModal.tsx` (bobbin surgery site)
4. `packages/editor/src/lib/vfs.ts` and `packages/editor/src/components/CodePreview.tsx` (WidgetVfs relocation)
5. `packages/compiler/src/vfs/index.ts` and `packages/compiler/src/index.ts` (export trims)

## Tasks
Work stream "2. Aprovan repo purge" in `openspec/changes/purge-dead-code/tasks.md`
(tasks 2.1–2.18). Execute verbatim; check each off as you complete it.

## Acceptance criteria
The scenarios under "Confirmed-dead packages and files are absent from the tree"
(aprovan-repo scenarios) in `specs/codebase-hygiene/spec.md`.

## Verify
```
pnpm install && pnpm -r typecheck && pnpm -r build && pnpm --filter @aprovan/patchwork-compiler test
```
All must pass. Also run the straggler grep from task 2.18.

## Git workflow
- You are working in an isolated worktree of the aprovan repo (provided by the harness).
- The main checkout has an uncommitted user modification to `client/web/src/pages/ChatPage.tsx`;
  it is not in your worktree and is not your concern — just never touch that file.
- Stage only paths you changed (never `git add -A`), commit on your branch with a message ending
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`, push it
  (`git push -u origin HEAD`), and open a PR against `main` via `gh pr create` (body ends with
  "🤖 Generated with [Claude Code](https://claude.com/claude-code)").
- `packages/images/ink` and `packages/images/vanilla` are UNTRACKED litter — they exist in the
  main checkout at `/Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/images/`, not in
  your worktree. Delete them there (no git involvement).
- If push/PR auth fails, leave the branch committed locally and say so in your report.

## Constraints
- Implement only what the tasks say. The kept surfaces (WidgetVfs contract, ServiceInfo type,
  CodeBlockExtension file, live vfs/core modules) are fixed — if a keep/delete call seems
  wrong, stop and report.
- Surgical changes; match existing style.
- Do not modify files outside the stream's Touches globs.
- Do NOT check off tasks in tasks.md inside your worktree commit — tasks.md lives in the main
  checkout's openspec tree; update it at
  `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/tasks.md`
  directly (uncommitted is fine).

## Report back
Check off tasks 2.1–2.18 in the main checkout's tasks.md, then write
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/briefs/02-report.md`
(uncommitted): what you did, verify summary, PR URL, deviations, notes for stream 4 and wave 2.
