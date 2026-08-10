# Brief: Delete the tracked infra/aws/aws duplicate

## Mission

`infra/aws/aws/` is a tracked, byte-identical 19-file duplicate of
`infra/aws/`'s own source tree — an artifact of an earlier
`infra/aws-core → infra/aws` rename. Nothing references it. Delete it with a
normal `git rm` (it is tracked, not a husk — do not use the husk-scan
pattern), verified by a clean CDK typecheck+synth afterward, and confirm no
dangling references in either repo.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 3 (husk scan) and
   Constraints bullet (b)
2. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Context bullet on
   `infra/aws/aws/`, and Decision **D6**
3. `infra/aws/cdk.json`, `infra/aws/Makefile`, `infra/aws/package.json`,
   `infra/aws/tsconfig.json` (confirm none reference `aws/aws`)
4. `infra/aws/aws/` (the 19 files to delete: `templates/*.yml`, `Makefile`,
   `src/lambdas/{oac-body-hash,restore-auth-header,post-confirmation}/index.ts`,
   `src/app.ts`, `src/stacks/{web,main,ci}.ts`, `package.json`, `cdk.json`,
   `tsconfig.json`, `scripts/get-function-url-domain.sh` — confirmed present,
   exactly 19 tracked files, as of 2026-08-09)

**registry repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry`):

_None to read — this stream's grep gate runs against this repo but touches
no files in it._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §4)

> Depends-on: - | Repo: aprovan | Touches: aprovan/infra/aws/aws/** | Verify: pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth

- [ ] 4.1 Confirm zero references before deleting:
      `grep -rn "aws/aws" infra/aws/cdk.json infra/aws/Makefile infra/aws/package.json infra/aws/tsconfig.json`
      returns nothing, and no `.ts` file under `infra/aws/src` imports from
      `./aws/...` (tech-plan D6, already verified 2026-08-09; re-verify at
      implementation time in case it drifted).
- [ ] 4.2 `git rm -r infra/aws/aws` (a normal tracked deletion — not a husk
      scan; it produces a real diff).
- [ ] 4.3 Verify the CDK app still typechecks and synthesizes cleanly with
      the directory gone (Verify command above).
- [ ] 4.4 Grep gate in both repos: `grep -rn "infra/aws/aws" .` (excluding
      `.git`) returns nothing in either `aprovan` or `registry`.

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is the Verify command plus the two-repo grep gate in task
4.4.

## Verify

Pre-deletion check and the deletion itself, run from
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
grep -rn "aws/aws" infra/aws/cdk.json infra/aws/Makefile infra/aws/package.json infra/aws/tsconfig.json
grep -rln "\./aws/" infra/aws/src   # confirm no .ts import reaches into aws/aws
git rm -r infra/aws/aws
pnpm --filter @aprovan/infra typecheck && pnpm --filter @aprovan/infra synth
```

Two-repo grep gate (task 4.4) — run once per checkout, using the sibling
absolute paths both orchestrator docs use:

```bash
grep -rn "infra/aws/aws" /Users/jacob/Documents/Code/AprovanLabs/aprovan --exclude-dir=.git
grep -rn "infra/aws/aws" /Users/jacob/Documents/Code/AprovanLabs/registry --exclude-dir=.git
```

Both grep gate commands above must produce no output.

## Constraints

- Implement only what the tasks say; if the interfaces or claims in
  `tech-plan.md` seem wrong at implementation time, stop and report instead
  of improvising.
- This is a real `git rm`, not the husk-scan pattern (tech-plan D6 — it
  would not be caught by a `git ls-files | wc -l = 0` test since it has 19
  tracked files).
- Grep gate must be run in **both** repos even though the deletion is
  aprovan-only (IW-9 cross-repo rule: grep-gates run in BOTH repos for every
  deletion) — use the sibling checkout paths above, do not assume a relative
  `../registry` layout without confirming it first.
- Verify scope is focused on this stream's ownership: the CDK
  typecheck+synth command above only exercises `@aprovan/infra`; do not
  expand the Verify run to the full monorepo build.
- Do not modify files outside: `infra/aws/aws/**`.

## Model

**Sonnet.** Not named in `IW-9-EXECUTION-OVERVIEW.md`'s Haiku tier (that row
lists "F6 husk deletion" — a different stream, #10 — not this tracked-source
deletion). This stream requires a live re-verification of zero references
plus a CDK typecheck/synth pass, which is more judgment than a pure
grep-gate close-out; run on Sonnet as the default tier, not a Haiku
fallback.

## Report back

When done: check off tasks 4.1–4.4 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/04-report.md`) containing: what you built, how you verified it
(including both repos' grep gate output), any deviations from this brief and
why, and anything the next wave needs to know.
