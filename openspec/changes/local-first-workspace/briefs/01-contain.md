# Brief: Extract path containment

## Mission
Extract `containPath(root, relative)` from `LocalExecutor` into `packages/native/src/contain.ts` with byte-identical behavior, move existing tests first, then add adversarial cases. When done, containment is a shared primitive ready for the local-directory VFS backend.

## Read first
1. `openspec/changes/local-first-workspace/tech-plan.md` (D3, Interfaces & Data for `containPath`)
2. `openspec/changes/local-first-workspace/specs/local-directory-vfs/spec.md` (containment scenarios)
3. `openspec/changes/local-first-workspace/tasks.md` — section 1 only
4. `packages/native/src/host/executor.ts` — private `contain` / `containIn`
5. Existing containment tests colocated with the executor (find and move them)

## Tasks
- [ ] 1.1 Move the existing containment tests to `__tests__/contain.test.ts` and confirm they pass against the current executor before touching anything (D3).
- [ ] 1.2 Extract `containPath(root, relative)` — the lexical `..`/absolute rejection plus the realpath check — into `packages/native/src/contain.ts` and export it.
- [ ] 1.3 Rewire `LocalExecutor` to call it; delete the inline implementation. Behavior must be byte-identical.
- [ ] 1.4 Add adversarial cases: chained `..`, absolute paths, a symlink to the parent directory, and a symlink whose target is created after the lexical check.

## Acceptance criteria
Behavior must remain byte-identical for existing executor callers. Adversarial cases above must fail closed. Spec scenarios that describe path containment for local VFS must hold for `containPath` alone.

## Verify
```bash
pnpm --filter @aprovan/native test && pnpm check-types
```

## Constraints
- Implement only section 1 tasks; do not start local-directory VFS (section 2).
- Surgical changes only; match existing style.
- Do not modify files outside: `packages/native/src/contain.ts`, `packages/native/src/host/executor.ts`, `packages/native/__tests__/contain.test.ts`, and any test file you move from (delete after move). You may update `packages/native/src/index.ts` only if needed to export `containPath`.
- Repo: **aprovan** at the worktree root. Branch from latest `main`.
- When done: check off tasks 1.1–1.4 in `openspec/changes/local-first-workspace/tasks.md`, push branch, open PR to `main`, write `briefs/01-contain-report.md`.

## Report back
What you built, how you verified, any deviations, anything wave 2 (local-directory VFS) needs to know.
