# Brief: product-plane-move — remaining implementable gaps (post stream 8)

## Mission
Close the leftover non-owner tasks from streams 2–7 so the change is ready for the
owner cutover runbook (stream 9). Stream 8 is done (registry PR #80 merged; deletion
PR #81 open DO-NOT-MERGE). Do not execute DSQL flip, Dynamo retirement, DNS, or merge #81.

## Read first
1. `openspec/changes/product-plane-move/briefs/00-report.md`
2. `openspec/changes/product-plane-move/{tasks.md,tech-plan.md,ux.md}`
3. `metadata-and-cost/briefs/01-phases-bcd-report.md` reconciliation #5 (dispatch-route half)
4. `data-auth-model/briefs/00-report.md` notes for WS-4
5. Aprovan main at post-PR #6 (`1a33fcb+`): `server/workspace/`, `infra/`, `client/web/`

## Tasks (do these)
- [ ] 4.5 Complete dispatch-route cutover: route workspace tool/contract calls through
      embedded `server.dispatch` / registered native implementations; remove bespoke
      product-side dispatch path for contract-addressed calls in `workflows/invoke.ts`
      (and any siblings). Keep dynamo bindings-file reader only if still required until
      `STORE_BACKEND=dsql` — document; do not flip the backend.
- [ ] 5.3 Finish credentials/admin panel non-happy states per ux.md: error + **retry**,
      OAuth-pending partial. Match existing PanelShell patterns; add retry affordance
      even if it means a thin local wrapper around PanelEmpty.
- [ ] 6.5 Update `CiStack` repository allow-list in `infra/aws-core` so aprovan deploys
      everything it now owns; registry keeps catalog deploy + registry image publish.
- [ ] 7.3 If not already green from the parent's image push: `bash scripts/image.sh build`
      then `bash scripts/image.sh run` and curl health/config. If parent already published
      an aprovan-built tag, verify against that and check 7.3 off.
- [ ] 2.4 Optional/best-effort: rule-identical lint diff before vs after config inline —
      if too expensive, document skip reason in 00-report and leave unchecked.
- [ ] Mark 10.1 done if PR #81 already contains the deletion branch (it does — confirm
      and check off; do NOT merge it).

## Acceptance criteria
- Contract-addressed calls from the workspace go through the embedding API (no bespoke
  parallel dispatch for those paths); tests cover in-process dispatch.
- Credentials + admin panels show retry on gateway error; OAuth-pending partial state exists.
- CiStack allow-list reflects aprovan-as-deployer.
- Image smoke passes OR documented as satisfied by published tag.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace... build
pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/workspace typecheck
pnpm --filter @aprovan/patchwork-web build
# after infra touch:
pnpm --filter @aprovan/cdk build && pnpm --filter './infra/aws-core' build
```

## Git / deploy
- Branch from fresh `origin/main` (post #6). Worktree recommended.
- `git commit --no-gpg-sign`; PR → green → `gh pr merge --merge` →
  `AWS_PROFILE=aprovan pnpm run deploy` (web). Infra image pin is owner/parent-driven —
  do not flip SSM unless image smoke just produced a new tag and cdk diff is image-only.
- Update `tasks.md` checkboxes and append to `briefs/00-report.md`.

## Constraints
- No DSQL/storeBackend flip, no Dynamo retirement, no merge of registry PR #81, no DNS.
- Surgical changes; interfaces in tech-plan fixed.
- Do not touch ChatPage.tsx history assumptions.
