# Brief: metadata-and-cost — Phases B–D (streams 5–10) + WS-3 deferred cutover

## Mission
Finish the storage replatform: move the remaining `.services/**` subsystems off the file plane
into the record store (Phase B), stand up DSQL as the cloud backend for every store plus the
from-scratch relational identity/authz schema (Phase C), and build the snapshot/reseed cutover
tooling + runbook (Phase D — tooling only; the production cutover itself is owner-executed).
Additionally, complete the dispatch-plane cutover that WS-3 deliberately deferred pending DSQL
(deleting bindings.json / label-profiles / colon-syntax remnants from the workspace once
registry-server stores run on a durable backend in AWS mode).

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/registry-server-extraction/briefs/00-report.md`
   — REQUIRED FIRST. The execution plane moved into `packages/registry-server`
   (`RegistryStorage` over a `SqlClient` seam with sqlite/libsql/dsql-postgres adapters and a
   driver-conformance suite; credentials/profiles live THERE now, with `created_by`). Its
   "deferred with cause" section defines the dispatch-plane cutover you will complete.
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/tech-plan.md`
   and `specs/{record-store,fs-metadata-store,identity-store,storage-cutover}/spec.md` —
   the contracts. RECONCILE: where the tech plan says "credentials → DSQL in apps/workspace",
   the credential store now lives in registry-server; the work becomes wiring/enabling its
   existing dsql adapter and cutting the workspace over, not building a second store. Document
   every such reconciliation in your report. All other stores (FsFiles metadata, records,
   audit, identity) remain workspace-side per the tech plan.
3. `tasks.md` streams 5–10.
4. Sources: `apps/workspace/src/{records.ts,fs-store.ts,vcs/**,apps/**,workflows/**,
   sandboxes/**,agents/**,webhooks/**,sync.ts,llm-jobs.ts,services.ts,db/**,users.ts,
   workspaces.ts,memberships.ts,sessions.ts,invites.ts,groups.ts,userGroups.ts,permissions.ts,
   middleware/auth.ts}` and `infra/src/**`.

## Tasks
Streams 5 → 6 → 7 → 8 → 9 → 10, checked off in the main checkout's tasks.md. Stream 10:
implement the CDK changes and synth them, but DO NOT deploy, DO NOT run the reseed against
production, DO NOT delete any AWS resource — those tasks are owner-executed via the runbook;
mark them as owner-run in tasks.md rather than checked.

## Acceptance criteria
Every scenario in the four spec files (Phase-A scenarios are already landed). Each stream's
Verify passes before moving on. Local-mode (`WORKSPACE_MODE=local`) must stay fully green
throughout — it is the developer default.

## Verify (final)
```
pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace typecheck
pnpm --filter @aprovan/registry-infra typecheck && (cd infra && pnpm cdk synth --quiet)
```
Build contracts first in a fresh worktree: `pnpm --filter "./packages/contracts/**" build && pnpm --filter @utdk/common build && pnpm --filter @aprovan/registry-server build`.

## Git workflow
- Worktree: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /private/tmp/claude-501/-Users-jacob-Documents-Code-AprovanLabs-aprovan/2300937b-9a5a-436a-9139-c2f3e7d66fb5/scratchpad/wt-phases-bcd -b metadata-cost-phases-bcd origin/main` (fetch first; main includes PR #77). `pnpm install` + the build-first step.
- `git commit --no-gpg-sign`, incrementally per stream, messages end
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Run commands synchronously; no idling on background shells.
- ONE PR via `gh pr create -R AprovanLabs/registry`; do NOT merge it.
- No real AWS calls: DSQL tests run only when their env URL is present (skip otherwise, per
  the conformance-suite pattern); dynamodb-local/MinIO via the repo's docker-compose is fine.

## Constraints
- Interfaces in the tech plan are fixed except where the WS-3 reconciliation (Read first #2)
  applies — reconcile there, redesign nowhere. If something is genuinely unimplementable,
  stop that stream and report.
- The auth-cache, change-journal, and versioned-write behavior from Phase A must keep their
  tests green — you are building on them, not around them.

## Report back
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/briefs/01-phases-bcd-report.md`
(main checkout, uncommitted): per-stream status, every WS-3 reconciliation made, verify
results, PR URL, deviations, and the OWNER RUNBOOK for the production cutover (snapshot →
verify → reseed → deploy → table deletion) with exact commands and expected outputs.
