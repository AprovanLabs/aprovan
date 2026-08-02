# Brief: Registry repo purge (purge-dead-code stream 1)

## Mission
Remove all confirmed-dead code from `/Users/jacob/Documents/Code/AprovanLabs/registry`:
the orphaned `@utdk/fn` package, the duplicated `apps/tailor`, the abandoned `experiments/`,
the never-wired `@utdk/isolate` package, and scratch files — and rewrite
`apps/workspace/src/isolate.ts` so the in-process provider executor is the *intended*
single execution path rather than a "fallback". When you're done the repo builds and tests
clean with ~3,000 fewer LOC and 6.7 GB less disk.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/tech-plan.md` (decisions D4, D5)
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/specs/codebase-hygiene/spec.md`
3. `/Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace/src/isolate.ts` (the file you rewrite)

## Tasks
Work stream "1. Registry repo purge" in
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/tasks.md`
(tasks 1.1–1.9). Execute them verbatim; check each off in that tasks.md as you complete it.

## Acceptance criteria
The scenarios under these requirements in `specs/codebase-hygiene/spec.md`:
- "Confirmed-dead packages and files are absent from the tree" (registry-repo scenarios)
- "The in-process provider executor is the sole execution path" (all scenarios)

## Verify
```
cd <your-worktree> && pnpm install && pnpm -r typecheck && pnpm -r build && pnpm --filter @aprovan/workspace test
```
All must pass before reporting done. Also run the straggler grep from task 1.9.

## Git workflow
- The registry checkout has **uncommitted user deletions in `apps/registry/`** — do not touch or commit them.
- Create an isolated worktree: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-purge-registry -b purge/registry main` and do ALL work there.
- Note: task 1.1 (`rm -rf infra/cdk.out`) targets the ORIGINAL checkout at
  `/Users/jacob/Documents/Code/AprovanLabs/registry/infra/cdk.out` (untracked build litter; it
  won't exist in the worktree). Same for any other untracked targets (`.registry/`): remove them
  in the original checkout, tracked files in the worktree.
- Stage only paths you changed (never `git add -A`), commit with a clear message ending in
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`, push the branch
  (`git push -u origin purge/registry`), and open a PR against `main` with
  `gh pr create -R AprovanLabs/registry` (body ends with the standard
  "🤖 Generated with [Claude Code](https://claude.com/claude-code)" line).
- If push/PR auth fails, leave the branch committed locally and say so in your report.
- Remove the worktree only if you failed before committing.

## Constraints
- Implement only what the tasks say; interfaces named in tech-plan D4 (the exported isolate.ts
  functions/types) are fixed — if one seems wrong, stop and report instead of changing it.
- Surgical changes; match existing style.
- Do not modify files outside the stream's Touches globs (see the tasks.md metadata line).

## Report back
Check off tasks 1.1–1.9 in the tasks.md above, then write
`openspec/changes/purge-dead-code/briefs/01-report.md` (in the aprovan repo — do NOT commit it,
leave it as a working-tree file): what you did, verify output summary, PR URL, deviations, and
anything stream 4 (npm deprecations) or wave-2 agents need to know.
