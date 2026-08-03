# Brief: App-model integration, reseed, docs (stream 6)

## Mission
Close out IW-1 with end-to-end proof: cross-workspace publish → directory → install →
partitioned data → rename-survives; reseed cleans legacy name keys; registry stays
app-ignorant on grant subjects; docs match the shipped model (no Personal / dataScope /
name identity / sidebar apps group). Inert-bundle export/import stays an explicit
non-goal / future note.

## Gate
Streams 1–5 are on `origin/main` (#28, #31, #35, #32, #33). Reports:
`briefs/01-report.md` … `05-report.md`.

## Read first
1. `briefs/03-report.md`, `05-report.md`
2. `tasks.md` stream 6 (6.1–6.4)
3. `tech-plan.md` Rollout §1 + Goals/Non-Goals
4. Specs: `app-identity` (Registry stays app-ignorant + rename/install scenarios),
   `app-install-lifecycle`, `app-dependencies`, `per-user-space`, `apps-native-surface`
5. Existing: `scripts/reseed-apps.ts`, `server/workspace/tests/**` apps tests,
   docs mentioning Personal / dataScope / sidebar apps

## Tasks
Copy verbatim from `tasks.md` §6:

- [ ] 6.1 End-to-end integration test: workspace A publishes a public app with `requires:
      [{contract: "sql"}]` + a provider grant → B sees it in the directory → installs with
      the default profile → app session reads/writes land in `.apps/<installId>/data/<sub>`
      and `app#<installId>#u#<sub>` → A renames the app → B's install still resolves,
      updates, and serves (the full spec chain across all four server capabilities).
- [ ] 6.2 Run the reseed script against a seeded legacy-shaped workspace fixture and assert
      a clean boot with zero name-keyed keys remaining (tech-plan Rollout 1).
- [ ] 6.3 Registry-boundary test: assert the only registry-server calls made by app flows
      are profile/grant operations with opaque `{kind: "app", id}` subjects — no manifest,
      name, or app schema crosses (spec app-identity "Registry stays app-ignorant").
- [ ] 6.4 Docs: update the app-data / native-surfaces docs sections that describe Personal,
      `(workspace, name)` identity, `dataScope`, and the sidebar apps group to the shipped
      model; note the inert-bundle export/import as explicit future direction (PRD
      Non-Goals).

## Acceptance criteria
Satisfy the cross-capability chain in 6.1 (publish/requires → directory → install →
partition paths → rename-safe install). Satisfy Rollout 1 reseed cleanliness. Satisfy
app-identity "Registry stays app-ignorant". Docs no longer describe Personal /
dataScope / name-keyed identity / SidebarApps as current behavior.

## Verify
```bash
pnpm --dir server/workspace test
pnpm --dir client/web build
! grep -rn "PERSONAL_APP_NAME\|PERSONAL_PREFIX\|isPersonalApp\|\.personal" \
  server/workspace/src client/web/src packages/ui/src packages/registry-ui/src
```
All must pass before reporting done.

## Git
Work already checked out at `/tmp/iw1-integration` on branch `iw1/integration`
(tracking latest `origin/main` at stream-5 merge). Do **not** call `move_agent_to_root`.
Do **not** use the multi-root Cursor workspace. Commit + push from this worktree only.

```bash
# before PR
git fetch origin main && git rebase origin/main
# open PR, wait for green, merge via gh
```

## Constraints
- Implement only tasks 6.1–6.4.
- Do not modify files outside: `server/workspace/tests/app-integration.test.ts` (and
  closely related test helpers if required), `docs/**`,
  `openspec/changes/app-model-split/**` (tasks checkboxes + this brief/report).
- Prefer one new integration test file as named in Touches; add a second test file only
  if 6.2/6.3 cannot live cleanly alongside 6.1.
- Match existing test style (see karpathy-guidelines skill). Surgical changes only.
- If a required interface is missing from streams 1–5, stop and report — do not invent
  APIs.

## Owner discoveries (fixed — do not reopen)
- `dataScope` is deleted; unbundled workflows are creator-private.
- Partitions: `.apps/<id>/data/<sub>` + `.users/<sub>`.
- Registry grant subjects are opaque `{kind:"app", id}` only.

## Report back
Check off 6.1–6.4 in `tasks.md`. Open a PR (merge when green). Write
`briefs/06-report.md` with: what you built, how you verified, deviations, and anything
wave-close / archive needs to know. Return the merged PR URL.
