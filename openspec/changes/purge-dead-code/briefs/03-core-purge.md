# Brief: Core repo purge (purge-dead-code stream 3)

## Mission
Remove two pieces of dead infrastructure config from
`/Users/jacob/Documents/Code/AprovanLabs/core`: the stale compiled CDK output
(`infra/aws/dist/` — contains stacks deleted from source long ago) and the
never-applied placeholder Cloudflare tunnel config (`infra/cloudflare/tunnel.tf` —
copy-pasted provider-docs values, fully superseded by `workspace-tunnel.tf`).

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/specs/codebase-hygiene/spec.md`
2. `/Users/jacob/Documents/Code/AprovanLabs/core/infra/cloudflare/tunnel.tf` and its siblings (confirm no cross-references before deleting)

## Tasks
Work stream "3. Core repo purge" in
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/tasks.md`
(tasks 3.1–3.3). Execute verbatim; check each off as you complete it.

## Acceptance criteria
The core-repo scenarios under "Confirmed-dead packages and files are absent from the tree"
in `specs/codebase-hygiene/spec.md`.

## Verify
```
cd /Users/jacob/Documents/Code/AprovanLabs/core/infra/aws && pnpm run build && pnpm run typecheck
cd /Users/jacob/Documents/Code/AprovanLabs/core/infra/cloudflare && make validate
```
Both must pass. (`make validate` runs `tofu validate`; no cloud credentials needed. If the
`tofu`/`terraform` binary is missing, report that instead of skipping silently.)

## Git workflow
- `infra/aws/dist/` is untracked (gitignored) — deleting it produces no diff; that's expected.
  The only tracked change is deleting `tunnel.tf`.
- Work directly in the core checkout on a new branch: `git -C /Users/jacob/Documents/Code/AprovanLabs/core checkout -b purge/core` (check `git status` first; if there are unrelated
  uncommitted changes, leave them alone and stage only `infra/cloudflare/tunnel.tf`).
- Commit (message ends `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`), push the
  branch, open a PR via `gh pr create -R AprovanLabs/core` (body ends with
  "🤖 Generated with [Claude Code](https://claude.com/claude-code)"), then
  `git checkout main` so the user's checkout is left on main.
- If push/PR auth fails, leave the branch committed locally, return to main, and say so.

## Constraints
- Only the two targets above. `workspace-tunnel.tf` and everything else stays untouched.
- Do not modify files outside the stream's Touches globs.

## Report back
Check off tasks 3.1–3.3 in the tasks.md above, then write
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/purge-dead-code/briefs/03-report.md`
(uncommitted): what you did, verify output, PR URL, any deviations.
