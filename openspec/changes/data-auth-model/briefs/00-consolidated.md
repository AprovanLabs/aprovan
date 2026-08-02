# Brief: data-auth-model — full implementation (streams 1–6)

## Mission
Close the three broken trust promises: per-user private data gets real READ authorization on
both planes (not list-only hiding, 404 semantics), the dead GroupPrefixGrants system is
excised and group grants rebase onto registry-server Profiles, and commits/snapshots gain
mount lineage (deterministic version tokens + provenance). Plus the Access-pane truthfulness
and client UX that surface all of it.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/data-auth-model/tech-plan.md`
   — decisions D1–D6 (D6's wildcard question is RESOLVED against WS-3 D12: profile grants
   subsume `provider:*` structurally) and the Interfaces & Data seams (partitionAccess guard
   signature, MountLineageEntry/MountProvenance, profiles admin API). FIXED.
2. `specs/{per-user-data,group-profile-grants,mount-lineage}/spec.md`, `prd.md`, `ux.md`.
3. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/registry-server-extraction/briefs/00-report.md`
   — the Profiles/grants schema and claims conventions you wire against (subject-typed
   `profile_grants` in `@aprovan/registry-server`).
4. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/metadata-and-cost/briefs/01-phases-bcd-report.md`
   — REQUIRED: streams here touch `vcs/**` and the record store AFTER Phases B–D moved them;
   reconcile your edits onto the record-backed implementations and document reconciliations.
5. Sources (registry repo): `apps/workspace/src/{apps/store.ts,apps/personal.ts,services.ts,
   routes/fs.ts,vcs/mounts.ts,vcs/store.ts,groups.ts,userGroups.ts,routes/groups.ts}`;
   (aprovan repo): the chat client's file tree + Access surfaces, `packages/registry-ui` /
   `@aprovan/ui/apps-store` Access pane per ux.md.

## Tasks
`tasks.md` streams in order: 1, 2, 3 (independent), then 4 (profiles wiring), then 5, then 6
(client UX, aprovan repo). Check off in the main checkout's tasks.md.

## Acceptance criteria
Every scenario in the three spec files, including the negative greps (zero references to
`GroupPrefixGrants`/`GroupToolGrants` post-excision).

## Verify
Registry worktree (build contracts + registry-server first):
```
pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace typecheck
```
Aprovan worktree: `pnpm typecheck && pnpm --filter @aprovan/patchwork-web build`.
Plus each stream's own Verify from tasks.md.

## Git workflow
- TWO worktrees, TWO PRs (registry + aprovan), same conventions as prior workstreams:
  branch from fresh `origin/main` of each repo, `pnpm install` + contracts/registry-server
  build first (registry side), `git commit --no-gpg-sign` incrementally, synchronous commands,
  `gh pr create` per repo, do NOT merge. The aprovan PR body notes its dependency on the
  registry PR.
- Registry branch name `data-auth-model`; aprovan branch name `data-auth-model-client`.
- Do not touch `client/web/src/pages/ChatPage.tsx`'s uncommitted working-tree edits in the
  main aprovan checkout (user's pending work; your worktree won't see them anyway).

## Constraints
- Interfaces fixed except documented reconciliations against the Phases B–D report.
- 404 (not 403) for foreign partitions; no admin override for Personal; snapshots/restore
  never touch partitions — these are spec invariants, test them explicitly.
- Deleting the GroupPrefixGrants table itself is CDK synth-only (owner deploys).

## Report back
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/data-auth-model/briefs/00-report.md`
(main checkout, uncommitted): per-stream status, reconciliations, verify results, both PR
URLs, deviations, and notes for WS-4 (paths that will move).
