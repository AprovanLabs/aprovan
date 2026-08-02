# Brief: contracts-and-catalog — full implementation (streams 1–7)

## Mission
Make UTDK contracts first-class in the registry repo: promote the five existing contracts
(`sql, llm, sandbox, vcs, agent`) out of `packages/utdk/` into `packages/contracts/*` (killing
the four aligned exclusion lists), create the four new contracts (`keyvalue, events, vfs,
telemetry`), fix the provider naming authority (hostname map, dot-splitting bug), extract the
interface compat catalog into keep-set data, ship webhook generation metadata + shared
credential types, fix the CI publish list, and give the catalog site first-class interface
representation.

## Read first (all under /Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/contracts-and-catalog/)
1. `tech-plan.md` — decisions and the complete contract surfaces in Interfaces & Data (these are FIXED)
2. `tasks.md` — your work, streams 1–7
3. `specs/*/spec.md` — acceptance scenarios
4. `prd.md`, `ux.md` for context

## Tasks
Execute ALL seven work streams from `tasks.md` in dependency order:
first 1, 2, 4 (any order), then 3 and 5, then 6, then 7. Check tasks off in the tasks.md at
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/contracts-and-catalog/tasks.md`
(the main aprovan checkout — leave uncommitted) as you go.

## Acceptance criteria
Every scenario in the five spec files. Each stream's Verify command must pass before you move on.

## Verify (final, after stream 7)
Run every stream's Verify command once more from the worktree root. The critical gates:
```
pnpm install && pnpm --filter @utdk/e2e test:generation
pnpm --filter @aprovan/workspace check-types && pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/registry-web build
```

## Git workflow
- Create an isolated worktree: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-contracts -b contracts-and-catalog main` — ALL work happens there. `pnpm install` first.
- NOTE: the tasks.md Touches globs are written `../registry/...` relative to the aprovan repo;
  inside your worktree they are just the repo-relative paths.
- The user's main registry checkout has uncommitted deletions of two files under
  `apps/registry/` (AppsHost.tsx, apps.astro). Your worktree still has them. Do not build new
  dependencies on those two files; if stream 7 interacts with them, note it in your report.
- Commit per stream or logically grouped (messages end `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`), push `contracts-and-catalog`, open ONE PR against main via
  `gh pr create -R AprovanLabs/registry` (body ends "🤖 Generated with [Claude Code](https://claude.com/claude-code)").
- A parallel agent is adding a dep in `packages/utdk-e2e` on another branch — if
  `pnpm-lock.yaml` conflicts at merge time, the later PR regenerates it with `pnpm install`;
  note this in your PR body.

## Constraints
- The contract surfaces and schemas in tech-plan.md Interfaces & Data are fixed. If one is
  unimplementable as written, stop that stream and report — do not redesign.
- Surgical changes; match existing style. Do not modify files outside the union of the seven
  streams' Touches globs.

## Report back
Write `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/contracts-and-catalog/briefs/00-report.md`
(uncommitted): per-stream status, verify results, PR URL, deviations, and anything WS-3
(registry-server-extraction) needs to know — it pins the contract versions you froze.
