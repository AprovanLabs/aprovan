# Report: 04 — Delete the tracked infra/aws/aws duplicate

## What was built

`git rm -r infra/aws/aws` — a normal tracked deletion of the byte-identical
19-file CDK-app duplicate at `infra/aws/aws/` (artifact of the
`infra/aws-core → infra/aws` rename, `f00616f`). No husk-scan pattern used
(it has 19 tracked files, not zero). No files outside `infra/aws/aws/**`
were touched except the tasks.md checkboxes and this report.

Work was done in an isolated worktree
(`/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-f6-delete-infra-duplicate`,
branch `chore/iw9-f6-delete-infra-duplicate`) branched directly from
`origin/main` (`78208a2`), because the shared primary aprovan checkout had
unrelated uncommitted work from other in-flight streams sitting in its
working tree — isolating to a fresh worktree kept this change's diff (and
its CDK verify run) uncontaminated by that unrelated state.

## How it was verified

Pre-deletion re-verification (task 4.1), run from the worktree root:

```
$ grep -rn "aws/aws" infra/aws/cdk.json infra/aws/Makefile infra/aws/package.json infra/aws/tsconfig.json
(no output)
$ grep -rln "\./aws/" infra/aws/src
(no output)
$ git ls-files infra/aws/aws | wc -l
19
```

Confirmed no drift since the tech-plan's 2026-08-09 verification.

Deletion (task 4.2): `git rm -r infra/aws/aws` produced a diff of exactly
the 19 expected deletions (`Makefile`, `cdk.json`, `package.json`,
`tsconfig.json`, `scripts/get-function-url-domain.sh`,
`src/app.ts`, `src/lambdas/{oac-body-hash,restore-auth-header,post-confirmation}/index.ts`,
`src/stacks/{ci,main,web}.ts`, `templates/*.yml` × 7). Nothing else changed.

CDK verify (task 4.3):

```
$ pnpm --filter @aprovan/infra typecheck
> tsc --noEmit
(clean, exit 0)

$ pnpm --filter @aprovan/infra synth
> cdk synth
Bundling asset prd-use2-main/PostConfirmation/Code/Stage... done
Bundling asset prd-glb-web/OacBodyHash/Code/Stage... done
Bundling asset prd-glb-web/RestoreAuthHeader/Code/Stage... done
Successfully synthesized to .../infra/aws/cdk.out
(exit 0)
```

(Required `pnpm turbo run build --filter=@aprovan/infra` first to build the
`@aprovan/cdk` workspace dependency — the isolated worktree had no built
`dist/` output yet. This is standard per the repo's `AGENTS.md` "Build
before dev/test" note, not a deviation.)

Two-repo grep gate (task 4.4):

```
$ grep -rn "infra/aws/aws" /Users/jacob/Documents/Code/AprovanLabs/registry --exclude-dir=.git
(no output)
```

registry repo: clean, exactly as the brief requires.

```
$ grep -rn "infra/aws/aws" . --exclude-dir=.git   # (aprovan worktree)
```

aprovan repo: **not clean** — see Deviations below. All matches are in
`openspec/changes/**` planning/report prose (this change's own `prd.md`,
`tech-plan.md`, `tasks.md`, `IW-9-EXECUTION-OVERVIEW.md`, this stream's own
briefs, and one unrelated already-existing citation in
`openspec/changes/registry-standalone-credentials/{tech-plan.md,tasks.md,briefs/06-report.md}`).
Zero matches in any application/infra source path (`server/`, `client/`,
`infra/aws/src`, `infra/aws/{cdk.json,Makefile,package.json,tsconfig.json}`,
`scripts/`, `.github/`) — the code-level guarantee the gate exists to
enforce holds.

## Deviations from the brief

The brief's task 4.4 and Verify section literally specify
`grep -rn "infra/aws/aws" .` must produce **no output** in the aprovan repo.
That is not achievable without editing files this brief is scoped away from
(`Do not modify files outside: infra/aws/aws/**`): the change's own planning
docs (`prd.md`, `tech-plan.md` D6, `tasks.md` §4, and this stream's own
`briefs/04-*.md`) necessarily name the path `infra/aws/aws/` in prose while
describing the deletion task itself, and one unrelated already-merged
change's docs (`registry-standalone-credentials`) cite
`infra/aws/aws/src/stacks/main.ts:171` as a source-location reference
pre-dating this stream.

Per the brief's constraint ("if ... claims ... seem wrong at implementation
time, stop and report instead of improvising"), I did not rewrite any of
those planning docs to satisfy a literal zero-output grep — that would
mean editing files outside `infra/aws/aws/**`, which the brief explicitly
forbids, and retroactively editing already-existing openspec history
(including an unrelated, already-completed change's own report) is out of
scope for this stream. Tech-plan D6 and the PRD's actual intent (confirmed
by context) are about eliminating *code* references to the duplicate
directory, not about doc mentions describing the deletion itself — the code
half of the gate is fully clean (see above). Flagging this rather than
silently declaring the literal gate "passed."

## For the next wave

- The `infra/aws/aws/` path is gone; any future doc reference to it should
  be understood as historical (describing this deletion), not a live path.
- No other stream's `Touches` list overlaps `infra/aws/aws/**`, so this
  merges independently of the other eleven streams.
