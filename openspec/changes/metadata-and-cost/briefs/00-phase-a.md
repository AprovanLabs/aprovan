# Brief: metadata-and-cost — Phase A only (streams 1–4)

## Mission
Cut the platform's idle-cost curve without touching the storage backend: a change journal +
`GET /fs/changes?since=` endpoint with an ETag 304 fast path (stream 1) consumed by the web
client in place of its 8-second unprefixed full-workspace poll (stream 2); per-token auth
caching and mounts caching (stream 3); unversioned `.services/**` writes plus an S3 blob GC
script (stream 4). These four streams are the bulk of the current ~$5/user/month. Streams 5–10
(Phases B–D) are OUT of scope for this brief.

## Read first (under /Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/)
1. `tech-plan.md` — decisions D1–D4 and the interface contracts for the change feed, auth
   cache, `versioned: false` write option, and GC (FIXED)
2. `tasks.md` — streams 1–4
3. `specs/change-feed/spec.md`, `specs/fs-metadata-store/spec.md` (the Phase-A requirements)
4. Registry sources: `apps/workspace/src/{routes/fs.ts,fs-store.ts,middleware/auth.ts,vcs/mounts.ts}`
5. Aprovan client: `client/web/src/lib/workspace-vfs.ts` (`startLiveWorkspaceSync`)

## Tasks
Execute streams 1, 3, 4 (registry repo — any order), then stream 2 (aprovan client, depends
on 1's endpoint shape). Check tasks off in the main checkout's
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/tasks.md`
(uncommitted).

## Acceptance criteria
The Phase-A scenarios in `specs/change-feed/spec.md` and the unversioned-write + GC
requirements in `specs/fs-metadata-store/spec.md`. Each stream's Verify must pass.

## Verify
Registry (from your registry worktree):
```
pnpm --filter @aprovan/workspace test tests/change-feed.test.ts tests/auth-cache.test.ts tests/vfs-mounts.test.ts tests/fs.test.ts tests/fs-s3.test.ts && pnpm --filter @aprovan/workspace typecheck
```
Aprovan (from your aprovan worktree):
```
pnpm --filter @aprovan/patchwork-web build
```

## Git workflow
- TWO worktrees, TWO PRs:
  - Registry: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-phase-a -b metadata-cost-phase-a main` (`pnpm install` first)
  - Aprovan: `git -C /Users/jacob/Documents/Code/AprovanLabs/aprovan worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-phase-a-client -b metadata-cost-phase-a main` (`pnpm install` first)
- The aprovan PR body must state it depends on the registry PR (deploy server first; the
  client falls back gracefully per the spec's compatibility scenario — verify that scenario
  explicitly).
- Never touch `client/web/src/pages/ChatPage.tsx` or `client/web/src/features/**` (a parallel
  agent owns those), and nothing in the registry outside streams 1/3/4's Touches globs (parallel
  agents own packages/utdk, packages/contracts, packages/utdk-e2e, and the purge targets).
- Commits end `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`; PRs via
  `gh pr create -R AprovanLabs/registry` / `gh pr create -R AprovanLabs/aprovan`, bodies end
  "🤖 Generated with [Claude Code](https://claude.com/claude-code)".

## Constraints
- Interfaces in tech-plan.md are fixed (endpoint shape, 304 semantics, cache TTL default 60s,
  `versioned` option, GC safety age 7 days). If one is unimplementable, stop and report.
- Do NOT start Phases B–D.

## Report back
Write `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/briefs/00-phase-a-report.md`
(uncommitted): per-stream status, verify results, both PR URLs, deviations, and measured/estimated
read-op reduction if you can compute it from the tests.
