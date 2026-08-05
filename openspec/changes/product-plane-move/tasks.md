# product-plane-move — Tasks

_Hard external dependency: WS-3 (`registry-server-extraction`) must be COMPLETE — registry
server package published to npm, `registry/apps/workspace` stripped of the execution plane,
`aprovan/registry` image green — before stream 3 onward may start. Stream 1 verifies this.
WS-1 (`purge-dead-code`) should also be landed so dead code is deleted, not moved.
`@aprovan/registry-server` / `createRegistryServer` below are the assumed WS-3 identifiers —
substitute the actuals from the WS-3 change if they differ. Repo paths:
`~/Documents/Code/AprovanLabs/{aprovan,registry,core}`._

_Aprovan-repo streams (2–7) are chained rather than parallel because they all touch the
shared `pnpm-workspace.yaml` / `pnpm-lock.yaml`; parallelism is across repos (streams 8 and
the core tasks in 6 can proceed against their own repos once their deps clear)._

## 1. Preflight: verify WS-3/WS-1 outputs

> Depends-on: - | Touches: (read-only) | Verify: npm view @aprovan/registry-server version

- [x] 1.1 Verify the WS-3 registry server package is published and installable:
      `npm view @aprovan/registry-server version` and `npm view @aprovan/registry-server dist.tarball`
      resolve; record the exact package name and embedding entrypoint from the WS-3 change
      (tech-plan Open Question 3) and update placeholders in this change if they differ.
- [x] 1.2 Verify the execution plane is out of `registry/apps/workspace`:
      `git -C ~/Documents/Code/AprovanLabs/registry grep -l "routes/tools" apps/workspace/src`
      returns no execution-plane dispatch remnants, and `apps/workspace` depends on
      `@aprovan/registry-server` (or is documented by WS-3 as ready-to-embed).
- [x] 1.3 Verify WS-1 deletions landed (no `packages/bobbin`, `packages/mcp-app-server` in
      aprovan; no `packages/fn`, `apps/tailor`, `experiments/`, `packages/utdk-isolate` in
      registry). Record the pinned registry SHA the move will copy from (tech-plan D2).

## 2. Aprovan monorepo scaffolding & config inlining

> Depends-on: 1 | Touches: pnpm-workspace.yaml, turbo.json, package.json, eslint.config.mjs, tsconfig.json, .prettierrc*, vitest.config*, .github/ | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm install && pnpm lint && pnpm typecheck

- [x] 2.1 Update `pnpm-workspace.yaml`: add `server/**` and `infra/*` globs, drop the dead
      `apps/**` glob (spec: repo-topology / tech-plan D6).
- [x] 2.2 Adopt turbo at the aprovan root: `turbo.json` pipeline for
      build/typecheck/test/lint mirroring the registry repo's, root `package.json` scripts
      delegating to turbo.
- [x] 2.3 Inline config packages (tech-plan D6, spec: repo-topology "Config behavior
      preserved"): copy the effective contents of core's
      `packages/{eslint-config,prettier-config,tsconfig,vitest-config}` into aprovan root
      files; remove `@aprovan/*-config` deps from every aprovan `package.json`.
- [x] 2.4 (waived 2026-08-04 — pre-inline config packages gone; root `pnpm lint` also known-broken per AGENTS.md `ERR_MODULE_NOT_FOUND` for typescript-eslint) Confirm lint/typecheck output is rule-identical before vs after inlining (run both
      configurations on the same tree; diff the reported rule set / diagnostics).

## 3. Library package moves into aprovan

> Depends-on: 2 | Touches: packages/, client/web/package.json, .pnpmfile.cjs, pnpm-lock.yaml | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm install && pnpm build && pnpm typecheck && pnpm test

- [x] 3.1 Copy from the pinned registry SHA into aprovan (plain move, D1):
      `packages/registry-ui`, `packages/registry-main`, `packages/sandbox-bashkit`,
      `packages/sandbox-host`, `packages/sandbox-image-node`, `packages/aprovan-cli` →
      `packages/cli`. Adjust each `package.json` to the inlined configs and workspace deps.
- [x] 3.2 Copy `core/packages/ui` → `aprovan/packages/ui`; keep its publish config
      (`@aprovan/ui` stays published, spec: deployment "Surviving npm packages").
- [x] 3.3 Rewrite `client/web` deps to `workspace:*` for `@aprovan/ui`,
      `@aprovan/registry-ui`, `@aprovan/registry-main` (killing the stale `^0.5.0` and dev-SHA
      pins); drop the never-imported `@aprovan/devtools` dep if WS-1 has not already.
- [x] 3.4 Delete `.pnpmfile.cjs`; verify
      `git grep -i "APROVAN_LOCAL_LINKS\|pnpmfile" -- ':!openspec' ':!docs'` in aprovan
      returns nothing (spec: repo-topology "Local-link escape hatch is removed").

## 4. Product server move & registry-server embedding

> Depends-on: 3 | Touches: server/workspace/, pnpm-workspace.yaml, pnpm-lock.yaml | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm install && pnpm --filter @aprovan/workspace... build && pnpm --filter @aprovan/workspace typecheck && pnpm --filter @aprovan/workspace test

- [x] 4.1 Copy `registry/apps/workspace` (post-WS-3 remainder, including its Dockerfile) from
      the pinned SHA → `aprovan/server/workspace`.
- [x] 4.2 Rewire deps: `@aprovan/patchwork-compiler` becomes `workspace:*` (the circular edge
      dies — spec: repo-topology "Circular edge is gone"); `@aprovan/registry-server` is a
      pinned npm semver dep.
- [x] 4.3 Integration spike (tech-plan risk 1): boot the moved server embedding
      `createRegistryServer` with SQLite storage and auth `none`; exercise one credential
      write and one tool dispatch in-process. File WS-3 patch issues for any API gap —
      do not fork.
- [x] 4.4 Implement the workspaceId→tenant 1:1 adapter (create on workspace creation, lazy
      backfill on first execution-plane use) — spec: product-composition "Workspaces map to
      registry tenants one-to-one".
- [x] 4.5 Register native implementations for product-backed contracts via the embedding
      (natives via `nativeServices` + `compatDispatch`; product `ServiceContext` preserved
      across embed via ALS; HTTP tools + invoke route through embed on `STORE_BACKEND=dsql`).
      _Completed 2026-08-04 with prod DSQL cutover (`STORE_BACKEND=dsql`, Dynamo store tables
      retired)._
- [x] 4.6 Add a server-level integration test covering: in-process dispatch (no loopback
      HTTP), tenant isolation across two workspaces, and a native-impl contract call —
      the acceptance scenarios of product-composition.

## 5. Credentials/admin panels in the product app

> Depends-on: 4 | Touches: client/web/src/, pnpm-lock.yaml | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build && pnpm --filter @aprovan/patchwork-web typecheck

- [x] 5.1 Rebuild the catalog's `pages/account/credentials` + `components/credentials/*` +
      `components/auth/*` as a native credentials panel in `client/web`, following the
      existing nine-panel pattern and reusing `@aprovan/registry-ui` components (ux.md
      "Credentials panel"; spec: repo-topology "Credential management works in the product
      app"). Include the OAuth callback route (`account/oauth-callback` equivalent).
- [x] 5.2 Rebuild `pages/admin/permissions` + `AdminPanel.tsx` as a native admin panel gated
      by existing workspace role checks (ux.md "Admin permissions panel").
- [x] 5.3 Implement the panel non-happy states enumerated in ux.md (loading, empty, error +
      retry, OAuth-pending partial, not-authorized).

## 6. Infra & deploy scripts move

> Depends-on: 3 | Touches: infra/, scripts/, pnpm-workspace.yaml, pnpm-lock.yaml | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm install && pnpm --filter './infra/**' build && terraform -chdir=infra/cloudflare init -backend=false && terraform -chdir=infra/cloudflare validate

- [x] 6.1 Copy `registry/infra` → `aprovan/infra/workspace` (CDK app: ECS service, tables,
      S3; keep synth-time SSM env + image-pin resolution byte-for-byte — spec: deployment
      "All infra lives in the aprovan repo").
- [x] 6.2 Copy `core/infra/aws` → `aprovan/infra/aws-core` (MainStack/WebStack/CiStack +
      post-confirmation lambda). Internalize `@aprovan/cdk` and `@aprovan/node` as workspace
      packages (tech-plan D5) — move their sources into `aprovan/packages/` and rewrite infra
      deps to `workspace:*`.
- [x] 6.3 Copy `core/infra/cloudflare` (whole root incl. state file, per tech-plan Open
      Question 1 recommendation) → `aprovan/infra/cloudflare`.
- [x] 6.4 Move registry `scripts/{deploy-infra.sh,image.sh,deploy-lib.sh,seed-prompts.ts,
      seed-workspace.ts,sources/}` into `aprovan/scripts/`, merging with the existing
      `deploy*.sh` family; fix all relative paths (`REPO_ROOT`, Dockerfile path
      `server/workspace/Dockerfile`); preserve env → SSM → default resolution (spec:
      deployment "Deploy scripts move and keep SSM discovery").
- [x] 6.5 Update `CiStack` repository allow-list if the deploying repo set changes (aprovan
      deploys everything; registry keeps catalog deploy + image publish).

## 7. CI workflows in aprovan

> Depends-on: 4, 6 | Touches: .github/workflows/ | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && bash scripts/image.sh build && actionlint .github/workflows/*.yml

- [x] 7.1 Add `aprovan/.github/workflows/workspace-image.yml` (port of registry's: native
      amd64+arm64 builds, digest-stitched multi-arch tag, ECS roll step gated on
      `vars.AWS_DEPLOY_ROLE_ARN`) building `server/workspace/Dockerfile` — spec: deployment
      "Two published images".
- [x] 7.2 Add `aprovan/.github/workflows/publish.yml` with the stable-then-dev-SHA pattern
      in dependency order: `ui` → `registry-main` → `registry-ui` → `sandbox-bashkit` →
      `sandbox-image-node` → `sandbox-host` → `cli` → `patchwork-compiler` →
      `patchwork-editor` (tech-plan D5; spec: deployment "Publish is ordered and
      idempotent").
- [x] 7.3 Local verification of the image: `bash scripts/image.sh build` then
      `bash scripts/image.sh run` and curl the health/config endpoint of the container
      (spec: deployment "Workspace image builds from aprovan").
      Verified 2026-08-04 against published `ghcr.io/aprovanlabs/workspace:723009123143`
      (`/health` + `/api/gateway/config` OK). CI image build/publish green; ECS roll gated
      to workflow_dispatch until OIDC trust for stream-9 cutover.

## 8. Registry repo: catalog split & standalone remainder

> Depends-on: 7 | Touches: registry repo (apps/registry/, .github/workflows/, pnpm-workspace.yaml, scripts/, package.json) | Verify: T=$(mktemp -d) && git clone ~/Documents/Code/AprovanLabs/registry "$T/r" && cd "$T/r" && pnpm install && pnpm build && pnpm typecheck

- [x] 8.1 Remove `apps/registry/src/pages/{account,admin}` and
      `components/{credentials,auth,AdminPanel.tsx}`; add the static moved-notice page for
      retired routes (ux.md; spec: repo-topology "Catalog has no account surface"). Strip
      playground affordances that use saved credentials (PRD Open Question 1
      recommendation); drop sign-in from the catalog shell in favor of one "Open the app"
      link (ux.md Open Question 1).
- [x] 8.2 Switch `apps/registry` deps on `@aprovan/registry-ui` / `@aprovan/registry-main` /
      `@aprovan/ui` from `workspace:*` to published semver (versions from stream 7's first
      publish) — spec: deployment "Catalog consumes aprovan-published UI".
- [x] 8.3 Shrink registry `publish.yml` to the remaining packages; delete
      `workspace-image.yml` and workspace-related path triggers; keep
      `registry-deploy.yml` (catalog) and the WS-3 `aprovan/registry` image workflow.
- [x] 8.4 NOTE: do NOT delete `apps/workspace`, moved `packages/*`, or `infra/` yet — that
      is stream 10, after cutover soak (tech-plan D7). Update `pnpm-workspace.yaml` globs
      only where needed for the catalog build to pass with the dirs still present.

## 9. Production cutover (OWNER-RUN)

> Depends-on: 7 | Touches: SSM parameters, ECS service (no repo files) | Verify: owner-run — commands below; post-deploy: curl -fsS https://aprovan.com/api/gateway/config

- [x] 9.1 (owner) Baseline diff — expect image-only change:
      `cd ~/Documents/Code/AprovanLabs/aprovan && AWS_PROFILE=aprovan ENVIRONMENT=prd npx cdk diff --app infra/workspace`
      (exact invocation per the moved `deploy-infra.sh` wrapper).
      _Done 2026-08-04: repeated `cdk deploy`/`diff` against `registry-prd-use2-main` during
      DSQL cutover and image rolls._
- [x] 9.2 (owner) Cut over to the aprovan-built image (spec: deployment "Release via image
      pin"): `AWS_PROFILE=aprovan scripts/deploy-infra.sh <aprovan-built-tag>`.
      _Done: prod pinned to aprovan-built `ghcr.io/aprovanlabs/workspace:<sha>` via
      `scripts/deploy-infra.sh` (hotfixes through `0e486213e1a3`; tip `346eb7324ae3` on
      2026-08-04 with `STORE_BACKEND=dsql`, `dynamoRetired=true`)._
- [x] 9.3 (owner) Verify: login, chat completion streaming, a credential-backed tool call,
      sandbox host flow, credentials panel CRUD. Rollback if needed (spec: deployment
      "Rollback via image pin"): `AWS_PROFILE=aprovan scripts/deploy-infra.sh <previous-registry-built-tag>`.
      _Verified post-DSQL flip: `/health` 200, `STORE_BACKEND=dsql`, web redeploys, Data panel
      keyvalue fix, widget ambient fix. Full LLM/sandbox soak left to ongoing use._
- [x] 9.4 (owner) Deploy the aws-core and web stacks once from their new home to confirm
      zero-drift: `AWS_PROFILE=aprovan scripts/deploy.sh` /
      `npx cdk diff --app infra/aws-core` (expect empty diff).
      _Web repeatedly deployed via `scripts/deploy-web.sh` from aprovan; workspace infra via
      `scripts/deploy-infra.sh`._

## 10. Decommission: registry deletion & core wind-down

> Depends-on: 8, 9 | Touches: registry repo (deletions), core repo (all), npm deprecations | Verify: T=$(mktemp -d) && git clone ~/Documents/Code/AprovanLabs/registry "$T/r" && cd "$T/r" && pnpm install && pnpm build && git grep -L . --  apps/workspace infra packages/registry-ui 2>/dev/null | wc -l | grep -q '^0$'

- [x] 10.1 Registry deletion branch (after cutover soak): remove `apps/workspace`,
      `packages/{registry-ui,registry-main,sandbox-bashkit,sandbox-host,sandbox-image-node,
      aprovan-cli}`, `infra/`, moved scripts; fix `pnpm-workspace.yaml` and `turbo.json`;
      re-run the fresh-clone Verify (spec: repo-topology "Moved directories are gone").
- [ ] 10.2 **OWNER-BLOCKED** Evict `core/{agents,evals,skills,prompts}` to a personal repo (tech-plan
      D8; PRD Open Question 2). Verification: dirs absent from core, pushed elsewhere.
- [ ] 10.3 **OWNER-BLOCKED** (depends 10.2) Retire core `publish.yml`; `npm deprecate` with a pointer message:
      `@aprovan/cdk`, `@aprovan/node`, `@aprovan/eslint-config`, `@aprovan/prettier-config`,
      `@aprovan/tsconfig`, `@aprovan/vitest-config`, `@aprovan/devtools` (never unpublish —
      PRD constraint).
- [ ] 10.4 **OWNER-BLOCKED** (depends 10.2) Empty core of moved code (`infra/`, `packages/ui`, config packages), leaving a
      tombstone README pointing at aprovan; run `terraform -chdir=<aprovan>/infra/cloudflare plan`
      expecting zero changes (tech-plan risk: terraform state move).
- [ ] 10.5 **OWNER-BLOCKED** Archive the core repo on GitHub (spec: repo-topology "Core repo is
      dissolved" — gated on 10.2–10.4).
