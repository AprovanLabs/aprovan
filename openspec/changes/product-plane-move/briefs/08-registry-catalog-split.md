# Brief: product-plane-move stream 8 — registry catalog split

## Mission
Strip credential/admin surfaces out of the registry catalog site, point the catalog at
published `@aprovan/*` npm packages (no longer `workspace:*` for those), shrink registry
publish/image workflows to the artifact-shipping remainder, and leave `apps/workspace` +
moved packages + `infra/` intact for now. When done, a fresh clone of the registry repo
still builds the catalog standalone, retired account/admin routes show a static "moved"
notice linking to the product app, and registry no longer publishes the packages that now
live in aprovan.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/product-plane-move/briefs/00-consolidated.md`
2. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/product-plane-move/briefs/00-report.md` — streams 1–7 landed via aprovan PR #5 (merged + web deployed). Pin registry copies from `99e8cc5+`.
3. `openspec/changes/product-plane-move/{tech-plan.md,tasks.md,ux.md,specs/repo-topology/spec.md,specs/deployment/spec.md}`
4. Registry paths: `apps/registry/`, `.github/workflows/`, `pnpm-workspace.yaml`
5. Handoff: `contracts-and-catalog/briefs/00-report.md` — catalog build-time reads of
   `packages/utdk` (stays) and of moved `apps/workspace/src/llm.ts` (compat source — relocate
   or snapshot per tech-plan D3 and document).

## Tasks
Copied from tasks.md stream 8:

- [ ] 8.1 Remove `apps/registry/src/pages/{account,admin}` and
      `components/{credentials,auth,AdminPanel.tsx}`; add the static moved-notice page for
      retired routes (ux.md; spec: repo-topology "Catalog has no account surface"). Strip
      playground affordances that use saved credentials (PRD Open Question 1
      recommendation); drop sign-in from the catalog shell in favor of one "Open the app"
      link (ux.md Open Question 1).
- [ ] 8.2 Switch `apps/registry` deps on `@aprovan/registry-ui` / `@aprovan/registry-main` /
      `@aprovan/ui` from `workspace:*` to published semver (versions from stream 7's first
      publish) — spec: deployment "Catalog consumes aprovan-published UI".
- [ ] 8.3 Shrink registry `publish.yml` to the remaining packages; delete
      `workspace-image.yml` and workspace-related path triggers; keep
      `registry-deploy.yml` (catalog) and the WS-3 `aprovan/registry` image workflow.
- [ ] 8.4 NOTE: do NOT delete `apps/workspace`, moved `packages/*`, or `infra/` yet — that
      is stream 10, after cutover soak (tech-plan D7). Update `pnpm-workspace.yaml` globs
      only where needed for the catalog build to pass with the dirs still present.

Also prepare (do not merge until soak): branch `product-plane-removal` with the stream-10.1
deletions, open a PR labeled `DO-NOT-MERGE-UNTIL-CUTOVER`.

## Acceptance criteria
From specs (copy the relevant WHEN/THEN from repo-topology "Catalog has no account surface"
and deployment "Catalog consumes aprovan-published UI" / "Two published images" registry
side). In short:
- Visiting `/registry/account/*` or `/registry/admin/*` shows the static moved notice with a
  link to the product app; no auth on those stubs.
- Catalog shell has no Sign-in; one "Open the app" link.
- `apps/registry` depends on published semver `@aprovan/registry-ui`, `@aprovan/registry-main`,
  `@aprovan/ui` — not `workspace:*`.
- Registry `publish.yml` no longer publishes packages that live in aprovan; workspace-image
  workflow is gone from registry; catalog deploy + `aprovan/registry` image remain.
- `apps/workspace`, moved packages, and `infra/` still present on this branch.

## Verify
```bash
# In the registry worktree after changes:
pnpm install && pnpm build && pnpm typecheck
pnpm --filter @aprovan/registry-web build

# Fresh-clone standalone (mandatory):
T=$(mktemp -d) && git clone ~/Documents/Code/AprovanLabs/registry "$T/r" \
  && cd "$T/r" && git checkout product-plane-registry-split \
  && pnpm install && pnpm build && pnpm typecheck
```

## Git / deploy (OWNER OVERRIDE)
- Branch `product-plane-registry-split` from fresh `origin/main` (post-`99e8cc5`).
- Use a clean worktree — the main registry checkout has unrelated dirty files (AppsHost,
  apps-panel, utdk package.json); ignore them.
- `git commit --no-gpg-sign`; open PR; when green: `gh pr merge --merge`; then
  `AWS_PROFILE=aprovan pnpm run deploy` (or `deploy:web`) from a clean main checkout.
- Second branch `product-plane-removal`: open PR, label `DO-NOT-MERGE-UNTIL-CUTOVER`, do not merge.
- Check off tasks in the **aprovan** main checkout:
  `openspec/changes/product-plane-move/tasks.md`
- Append outcomes to
  `openspec/changes/product-plane-move/briefs/00-report.md`

## Constraints
- Do NOT delete `apps/workspace`, moved `packages/*`, or `infra/` on the split branch.
- If stream 7's first aprovan publish has not produced new semver yet, use the latest
  published npm versions that satisfy the catalog build (`@aprovan/registry-ui@0.4.0`,
  `@aprovan/registry-main@0.1.0`, `@aprovan/ui@0.5.0` as of dispatch — re-check with
  `npm view`). Document the pin. If catalog needs newer UI that only exists in aprovan
  main and is unpublished, stop and report — do not re-introduce `workspace:*` for those.
- Resolve the `llm.ts` / catalog compat source per tech-plan D3; document the choice.
- Surgical changes only; match existing style.
- Do not modify files outside the Touches for stream 8 (plus the removal branch's deletion
  set for the DO-NOT-MERGE PR only).

## Report back
Update `00-report.md` with PR URLs, deploy outcome, verify results, reconciliations, and
anything stream 9/10 need.
