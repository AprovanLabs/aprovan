# Brief: product-plane-move — full implementation (streams 1–10)

## Mission
The finale of the platform refactor: move the product plane out of the registry repo into the
aprovan monorepo (workspace server, registry-ui, registry-main, sandbox packages, CLI, infra,
deploy scripts), split the catalog site (catalog stays registry-side; credentials/admin UI
moves), dissolve the core repo into aprovan (identity/edge/CI CDK + tunnel terraform +
@aprovan/ui), grow the `aprovan` CLI (`aprovan registry run`), define both Docker images, and
prepare the ECS cutover to `aprovan/workspace` — leaving registry as a pure artifact-shipping
repo (npm + `aprovan/registry` image) that builds standalone from a fresh clone.

## Read first
1. `/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/product-plane-move/tech-plan.md`
   — D1–D8 (plain file move, catalog/product split line D3, npm survivor set D5, target layout
   D6 `server/workspace` + `infra/{aws-core,workspace,cloudflare}`, SSM-pin cutover D7) and the
   full source→destination move manifest. FIXED.
2. `specs/{repo-topology,product-composition,deployment,aprovan-cli}/spec.md`, `tasks.md`
   (10 streams; stream 1 is the WS-3 preflight — the package is confirmed
   `@aprovan/registry-server` exporting `createRegistryServer(options)`).
3. Handoff reports (all under openspec/changes/*/briefs/):
   - `registry-server-extraction/briefs/00-report.md` — embedding contract, `compatDispatch`
     hook (this is where you register the native agent runner), `RegistryServer.executor`.
   - `metadata-and-cost/briefs/01-phases-bcd-report.md` — the **dispatch-route half of the
     WS-3 deferred cutover was re-deferred to THIS change**: complete it (workspace tool
     routes fully on registry-server dispatch; delete the tombstoned bindings reader with the
     move). Also: `STORE_BACKEND` flip and Dynamo retirement are owner-run; your infra move
     must carry the `-c storeBackend` / `-c dynamoRetired` machinery intact.
   - `data-auth-model/briefs/00-report.md` — profile-grants seam (`getRegistryStorage()`),
     paths that moved onto record scopes.
   - `contracts-and-catalog/briefs/00-report.md` — catalog's build-time reads of
     `packages/utdk` (stays registry-side) and of `apps/workspace/src/llm.ts` (moves with
     workspace → the catalog needs the compat source relocated or snapshotted; resolve per
     tech-plan D3 and document).
4. Repos: /Users/jacob/Documents/Code/AprovanLabs/{registry,aprovan,core}. Core's stacks:
   `core/infra/aws/src/{app.ts,stacks/{main,web,ci}.ts}`, `core/infra/cloudflare/`.

## Tasks
All 10 streams in tasks.md order. Stream 1 preflight first. Aprovan-repo streams 2–7 are
chained (shared lockfile — do them sequentially in ONE aprovan worktree/branch). Stream 8 is
registry-side (separate worktree/branch). Streams 9–10: implement + synth everything;
tasks marked OWNER-RUN (deploys, DNS/tunnel apply, ECS cutover execution, registry-repo
deletion of moved code is gated on cutover soak — see below) get built and documented, not
executed. Check off in the main checkout's tasks.md; mark owner-run items as such.

## Sequencing rule for the registry-side deletion (stream 8)
Do NOT delete the moved product-plane code from the registry repo in this pass. Land the
aprovan-side move + embedding + images + infra first; the registry deletion PR is prepared as
a SEPARATE branch/PR (`product-plane-removal`) that the owner merges after the ECS cutover
soaks. The registry must keep building standalone at every point.

## Acceptance criteria
Every scenario in the four spec files, minus deploy-execution scenarios (owner-run).

## Verify
- Aprovan worktree (after streams 2–7): `pnpm install && pnpm -r build && pnpm -r test &&
  pnpm typecheck`; Docker: `docker build` for the `aprovan/workspace` image + a boot smoke
  (local mode). `aprovan registry run` smoke: starts, default tenant, dispatch works.
- Registry worktree (stream 8): fresh-clone-standalone check — `pnpm install && pnpm -r build
  && pnpm --filter @utdk/e2e test:generation && pnpm --filter @aprovan/registry-web build`.
- Core: `pnpm run build && pnpm run typecheck` in infra/aws after extraction; the moved CDK
  in aprovan must `cdk synth` clean with zero unintended resource replacements vs. the
  existing stacks (compare synthesized templates; identity/edge resources must be import- or
  name-stable per tech-plan D7 — flag ANY replacement as a stop-and-report).

## Git workflow
- Aprovan worktree: branch `product-plane-move` from fresh origin/main (2360de6+).
- Registry worktree: branch `product-plane-registry-split` (catalog split + llm-compat
  relocation only) and a second branch `product-plane-removal` (deletion, prepared last,
  PR opened but labeled DO-NOT-MERGE-UNTIL-CUTOVER).
- Core: work directly in the checkout on branch `dissolve-core` (it has unrelated uncommitted
  user changes — stage only your paths; return checkout to main when done).
- `git commit --no-gpg-sign` incrementally; synchronous commands; `gh pr create` per branch
  (do NOT merge any of them — this change is review-gated by the owner given the deploy
  surface); bodies note cross-PR ordering.
- Preserve git history where cheap (`git mv` within a repo); cross-repo moves are plain
  copies per tech-plan D1.

## Constraints
- Interfaces and the move manifest in the tech plan are fixed; reconcile only where the four
  handoff reports override, and document every reconciliation.
- The user's aprovan checkout has uncommitted ChatPage.tsx edits (two AppHeader props) —
  irrelevant to your worktree, never touch that file's history assumptions.
- No deploys, no terraform apply, no DNS changes, no ECS actions, no npm publishes (CI does
  those on merge).

## Report back
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/openspec/changes/product-plane-move/briefs/00-report.md`
(main checkout, uncommitted): per-stream status, reconciliations, verify results (including
the synth-diff analysis for the CDK move), ALL PR URLs with their merge-order/gating, and the
complete OWNER CUTOVER RUNBOOK: merge order → deploy infra → publish images → SSM pin flip →
soak checks → storeBackend flip → Dynamo retirement → registry deletion PR merge → core repo
archive steps.
