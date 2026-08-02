# Brief: utdk-e2e-bench — streams 1–2 (SSM loading + nightly workflow)

## Mission
Wire the UTDK E2E bench to real credentials: an SSM-backed loader
(`/aprovan/test/utdk-creds/*` → the env vars in `.env.example`) with `write-env.ts --from-ssm`,
and a nightly GitHub Actions workflow that assumes the existing OIDC role, gates on `doctor`,
runs the live suite for ready providers, and opens/updates a tracking issue on failure —
never gating merges. Stream 3 (populating SSM) is owner-run and stream 4 is blocked; skip both.

## Read first (under /Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-e2e-bench/)
1. `tech-plan.md` — the six decisions and interface contracts (FIXED)
2. `tasks.md` — streams 1 and 2
3. `specs/e2e-credentials/spec.md`, `specs/e2e-nightly/spec.md` — acceptance scenarios
4. In the registry repo: `packages/utdk-e2e/{README.md,scripts/write-env.ts,scripts/doctor.ts,src/env.ts,.env.example}` and `.github/workflows/` for CI conventions

## Tasks
Execute streams 1 then 2 from `tasks.md`. Check tasks off in
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-e2e-bench/tasks.md`
(main aprovan checkout, uncommitted). Leave streams 3–4 unchecked.

## Acceptance criteria
All scenarios in both spec files that streams 1–2 cover (stream 3's live-SSM scenarios can't
be exercised without populated parameters — unit-test the loader with mocked SSM instead, per
the tasks).

## Verify
```
pnpm --filter @utdk/e2e typecheck && pnpm --filter @utdk/e2e test:all
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/utdk-e2e-nightly.yml')); print('valid yaml')"
```

## Git workflow
- Isolated worktree: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-e2e -b utdk-e2e-bench main`; `pnpm install` there first.
- Commit (ends `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`), push, ONE PR via
  `gh pr create -R AprovanLabs/registry` (body ends "🤖 Generated with [Claude Code](https://claude.com/claude-code)").
- A parallel agent is restructuring `packages/utdk/` + `packages/contracts/` on another
  branch — your paths are disjoint; if `pnpm-lock.yaml` conflicts at merge, the later PR
  regenerates it. Note in PR body.

## Constraints
- Interfaces in tech-plan.md are fixed (SSM naming, GetParameters chunking, doctor-as-reporting).
- Do not modify files outside streams 1–2's Touches globs.
- Do not create AWS resources or call SSM against real parameters — mocked tests only.

## Report back
Write `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/utdk-e2e-bench/briefs/00-report.md`
(uncommitted): status, verify results, PR URL, deviations, and the exact owner runbook for
stream 3 (populate SSM + first live doctor run).
