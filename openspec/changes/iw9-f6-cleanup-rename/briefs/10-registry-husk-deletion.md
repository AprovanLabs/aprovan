# Brief: Delete the registry-side husk (packages/utdk/infra)

## Mission

`registry/packages/utdk/infra/` has zero git-tracked files — everything on
disk is CDK bundling build residue (`cdk.out/bundling-temp-*/node_modules/`).
Delete it with `rm -rf` (untracked, so it produces no diff) and re-run the
repo-wide husk scan to confirm no other zero-tracked-file directories
remain.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 3, Constraints
   bullet (a)
2. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Context bullet on
   `registry/packages/utdk/infra/`
3. `openspec/changes/MIGRATION-DEBT.md` §2/§B (origin of the husk-test
   definition — read for the "Husks are untracked" framing this task cites)

**registry repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry`):

4. `packages/utdk/infra/` — confirmed on disk 2026-08-09: `git ls-files
   packages/utdk/infra | wc -l` is 0; the only contents are
   `cdk.out/bundling-temp-*/node_modules/utdk/`.

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §10)

> Depends-on: - | Repo: registry | Touches: registry/packages/utdk/infra/** | Verify: n=$(git ls-files packages/utdk/infra | wc -l | tr -d ' '); [ "$n" = 0 ] && rm -rf packages/utdk/infra && git status --short

- [ ] 10.1 Confirm the husk test: `git ls-files packages/utdk/infra | wc -l`
      is 0 (all that's on disk is `cdk.out/bundling-temp-*/node_modules/`
      build residue).
- [ ] 10.2 `rm -rf packages/utdk/infra` — untracked, so this produces no git
      diff (MIGRATION-DEBT "Husks are untracked" caveat); record the
      before/after scan output in the PR description since `git show` can't.
- [ ] 10.3 Re-run the husk scan repo-wide:
      `for d in packages/*/ apps/*/; do [ -d "$d" ] || continue; n=$(git ls-files "$d" | wc -l | tr -d ' '); [ "$n" = 0 ] && echo "HUSK: $d"; done`
      returns nothing; `git status --short` shows no unexpected changes
      (deleting an untracked dir produces none).

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is exclusively the Verify command plus the repo-wide
re-scan in task 10.3.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/registry` (**registry
repo, not aprovan** — confirm your working directory first):

```bash
n=$(git ls-files packages/utdk/infra | wc -l | tr -d ' '); [ "$n" = 0 ] && rm -rf packages/utdk/infra && git status --short
for d in packages/*/ apps/*/; do [ -d "$d" ] || continue; n=$(git ls-files "$d" | wc -l | tr -d ' '); [ "$n" = 0 ] && echo "HUSK: $d"; done
```

The first command must delete the directory and `git status --short` must
show no output (untracked deletion → no diff). The second command (repo-wide
re-scan) must produce no `HUSK:` lines.

## Constraints

- Implement only what the task says; if `git ls-files packages/utdk/infra`
  is non-zero at implementation time (drift from the 2026-08-09
  verification), stop and report instead of deleting tracked files.
- This is in the **registry** repo, not aprovan.
- Do not modify files outside: `packages/utdk/infra/**`.

## Model

**Sonnet (Haiku fallback).** `IW-9-EXECUTION-OVERVIEW.md` tiers this stream
Haiku ("F6 husk deletion [...] mechanical, exhaustively specified,
verifiable by command"). Haiku is unavailable in this run, so this stream
runs on Sonnet as a fallback, not because it needs Sonnet's judgment —
re-promote to Haiku if it becomes available for a future dispatch of this
same stream.

## Report back

When done: check off tasks 10.1–10.3 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md` (note: this change's
planning artifacts live in the **aprovan** repo per the IW-9 cross-repo rule
even though this stream's work is in registry — check the box in the
aprovan checkout's copy of `tasks.md`), and open a PR (or write
`briefs/10-report.md`) containing: what you built, the before/after husk
scan output (since the deletion itself produces no diff to show), any
deviations from this brief and why, and anything the next wave needs to
know.
