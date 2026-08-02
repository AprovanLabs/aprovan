# WS-4 Report: product-plane-move

**Date:** 2026-08-02  
**Agent:** WS-4 autonomous implementation  
**Registry pin SHA:** `99e8cc5a08b61d702d1a2e770375d795f793829c`

## PR URLs & merge/deploy outcomes

| Repo | PR | Status | Deploy |
|------|-----|--------|--------|
| aprovan | [PR #5](https://github.com/AprovanLabs/aprovan/pull/5) | **MERGED** to main | **SUCCESS** — `AWS_PROFILE=aprovan pnpm run deploy` uploaded patchwork-web to S3 + CloudFront invalidation (`I168YKVUXV29FYZ2S6GPUAVXLP`) |
| registry | [PR #80](https://github.com/AprovanLabs/registry/pull/80) | **MERGED** to main | **SUCCESS** — `AWS_PROFILE=aprovan pnpm run deploy` CloudFront invalidation `I5AO6WPWLAXYKKATGEH875SNY0` |
| registry (removal) | [PR #81](https://github.com/AprovanLabs/registry/pull/81) | **OPEN** — label `DO-NOT-MERGE-UNTIL-CUTOVER` | Do not merge until cutover soak |
| core | — | **Not started** (`dissolve-core`) | — |

## Tasks completed: 32 / 41

### Stream 1 — Preflight ✅ (3/3)
- `@aprovan/registry-server@0.1.0` published and installable
- WS-1 deletions verified; WS-3 execution plane extracted
- Registry pin: `99e8cc5`

### Stream 2 — Scaffolding ✅ (3/4)
- `pnpm-workspace.yaml`: `server/**`, `infra/*`, excluded `packages/utdk/dist/**`
- Turbo pipeline + root scripts
- Config inlined under `config/{eslint-config,tsconfig,vitest-config}/`, `.prettierrc.json`
- **Deferred:** 2.4 rule-identical lint diff (not run formally)

### Stream 3 — Package moves ✅ (4/4, with reconciliations)
- Copied registry packages + `core/packages/ui`, `cdk`, `node`
- `client/web` deps → `workspace:*`
- `.pnpmfile.cjs` deleted
- **Reconciliation:** Vendored `packages/{registry-server,utdk,contracts,mcp-core,mcp,bundler,runtime}` because bare `utdk` npm publish fails E403 and `@aprovan/registry-server` npm dep would pull unpublished `utdk`. Workspace uses `workspace:*` for registry-server instead of npm-only per tech-plan D4.

### Stream 4 — Server move & embedding ⚠️ (5/6)
- `server/workspace` copied + Dockerfile adapted (registry git SHA vendor for utdk in image)
- `tenant-registry.ts`, `registry-embed.ts`, integration tests
- Native core services registered via `nativeServices` on `createRegistryServer`
- `compatDispatch.agent` → `dispatchNativeAgentOp`
- **Partial:** 4.5 dispatch-route cutover — `workflows/invoke.ts` still uses bespoke dispatch (registry embed ready; full cutover blocked on DSQL backend + per-run `interfaceInstances` context). Dynamo interim bindings file reader retained until owner `STORE_BACKEND=dsql` flip.

### Stream 5 — Credentials/admin panels ⚠️ (2/3)
- `CredentialsPanel`, `AdminPermissionsPanel`, `OAuthCallbackPage`, `credentials.ts`, native-surfaces wiring
- **Partial:** 5.3 — simplified happy-path panels; no retry buttons (PanelShell API uses children-only `PanelEmpty`)

### Stream 6 — Infra & scripts ✅ (4/5)
- `infra/{workspace,aws-core,cloudflare}` copied
- `scripts/{deploy-infra,image,deploy-lib,seed-*}` ported; Dockerfile path → `server/workspace/Dockerfile`
- **Not verified:** 6.5 CiStack allow-list update, CDK synth diff

### Stream 7 — CI ⚠️ (2/3)
- `.github/workflows/{workspace-image,publish}.yml` added
- **Not run:** 7.3 Docker image smoke (`scripts/image.sh build && run`)

### Stream 8 — Registry catalog split ✅ (4/4)
- Removed credential/admin surfaces; static moved notices on retired `account/*` and `admin/*` routes.
- Catalog shell: "Open the app" link (no sign-in); playground stripped of workspace file load and sign-in affordances; Try-it panels link to product app.
- Catalog npm pins: `@aprovan/registry-ui@0.4.0`, `@aprovan/registry-main@0.1.0`, `@aprovan/ui@0.5.0` (verified via `npm view` at dispatch).
- `publish.yml` shrunk to registry-server/utdk remainder; `workspace-image.yml` deleted.
- `llm-compat.ts` snapshot replaces `apps/workspace/src/llm` import for catalog build (D3).
- `apps/workspace`, moved packages, and `infra/` retained on split branch (stream 10.1 prepared on `product-plane-removal`).

### Streams 9–10 — Partial
- Stream 9 cutover: owner-run (not executed)
- Stream 10.1 deletion branch prepared: [PR #81](https://github.com/AprovanLabs/registry/pull/81) — DO NOT MERGE until soak

## Verify results

| Gate | Result |
|------|--------|
| `pnpm build` (monorepo) | ✅ Pass |
| `pnpm typecheck` | ✅ Pass |
| `pnpm --filter @aprovan/workspace test` | ✅ 483 passed, 7 skipped |
| Docker image smoke | ❌ Not run |
| CDK synth diff (`infra/workspace`, `infra/aws-core`) | ❌ Not run — **stop-and-report if replacements appear** |
| Registry fresh-clone standalone | ✅ Pass on `product-plane-registry-split` / main post-#80 |
| `aprovan registry run` smoke | ❌ Not run |

## Reconciliations (vs tech-plan)

1. **registry-server + utdk vendored** — npm-only embedding blocked by E403 on `utdk` and unpublished transitive deps; workspace `pnpm.overrides` pin `@utdk/common` and `@utdk/mcp-core` to workspace copies (npm copies lacked `compat.ts`).
2. **Contracts dir resolution** — `resolveContractsDir()` in `interfaces.ts` and `registry-server/catalog/default.ts` prefers `packages/contracts` in monorepo layout (npm `@utdk/agent` alone only exposes agent contract).
3. **D4 npm semver for registry-server** — uses `workspace:*` vendored copy, not `@aprovan/registry-server@0.1.0` alone.
4. **Dispatch cutover** — embed + native registration done; invoke.ts cutover deferred (see stream 4).

## Owner cutover runbook (DO NOT EXECUTE — document only)

### Prerequisites
- Stream 7 image CI green; first `aprovan/workspace` image published to ECR
- Stream 8 registry catalog split merged
- `product-plane-removal` branch prepared (DO-NOT-MERGE-UNTIL-CUTOVER)

### Merge order
1. Merge aprovan PR #5 ✅ (done)
2. Merge registry `product-plane-registry-split` (stream 8)
3. Merge core `dissolve-core` when aprovan infra consumers ready

### Deploy infra (owner)
```bash
cd ~/Documents/Code/AprovanLabs/aprovan
AWS_PROFILE=aprovan ENVIRONMENT=prd npx cdk diff --app infra/workspace   # expect image-only; STOP if replacements
AWS_PROFILE=aprovan scripts/deploy-infra.sh <aprovan-workspace-image-sha>
AWS_PROFILE=aprovan pnpm run deploy   # web ✅ done post-#5
AWS_PROFILE=aprovan npx cdk diff --app infra/aws-core   # expect empty
AWS_PROFILE=aprovan scripts/deploy.sh   # aws-core + web stacks
```

### Soak checks (24–48h)
- Login, chat streaming, credential-backed tool call, sandbox host, credentials panel CRUD
- Rollback: `AWS_PROFILE=aprovan scripts/deploy-infra.sh <previous-registry-image-tag>`

### Live-data cutover (OWNER-RUN — not executed by agent)
1. **DSQL reseed** — metadata-and-cost tasks 10.1/10.2
2. **SSM image pin** — point ECS to aprovan-built workspace image
3. **`STORE_BACKEND=dsql` flip** — preserve `-c storeBackend` / `-c dynamoRetired` CDK context
4. **Dynamo retirement** — after soak on DSQL
5. **Merge `product-plane-removal`** — delete moved code from registry
6. **Core repo archive** — after `dissolve-core` + terraform state verified
7. **DNS/tunnel** — Cloudflare terraform apply (not run)
8. **npm deprecate** core packages (not run)

## Blockers for owner cutover

1. **Stream 8** — ✅ merged ([PR #80](https://github.com/AprovanLabs/registry/pull/80)); catalog deployed
2. **Docker image** — workspace image CI failed post-#5; **fixed in [PR #6](https://github.com/AprovanLabs/aprovan/pull/6)**. Re-run image publish / `scripts/image.sh push` then pin ECS.
3. **CDK synth** — build `@aprovan/cdk` before `infra/workspace` synth; stop-and-report on replacements.
4. **DSQL cutover** — metadata-and-cost 10.1/10.2 not done; dynamo bindings path still active
5. **Full dispatch cutover** — `workflows/invoke.ts` → `server.dispatch` incomplete
6. **First publish from aprovan** — publish.yml E404 for new package names; stream 8.2 pins existing `@aprovan/{ui,registry-ui,registry-main}` from npm. Owner must grant npm create rights for sandbox/cli/editor packages.
7. **Stream 10.1** — merge [PR #81](https://github.com/AprovanLabs/registry/pull/81) only after cutover soak (label `DO-NOT-MERGE-UNTIL-CUTOVER`)

---

## WS-4 brief 09 — remaining gaps (2026-08-02)

**Branch:** `ws4/remaining-gaps` → PR TBD  
**Agent:** WS-4 subagent (brief `09-remaining-gaps.md`)

### Tasks closed this session

| Task | Status | Notes |
|------|--------|-------|
| 4.5 | Partial | `dispatchInterface` routes through `registryDispatch` when `STORE_BACKEND=dsql`; dynamo interim keeps legacy bindings-file + bespoke provider path; provider `client(label)` pins stay legacy until profile migration |
| 5.3 | ✅ | `PanelErrorWithRetry`, OAuth-pending row on credentials panel, admin retry |
| 6.5 | ✅ | CiStack default repos → `AprovanLabs/aprovan,AprovanLabs/registry` |
| 7.3 | Partial | `scripts/image.sh build` ✅; detached run fails: `Cannot find package '@utdk/common'` at container start (workspace-image CI still red on main) |
| 10.1 | ✅ (prepared) | [PR #81](https://github.com/AprovanLabs/registry/pull/81) `product-plane-removal` branch confirmed; DO NOT MERGE |
| 2.4 | Skipped | Rule-identical lint diff not run — would require restoring pre-inline config packages; deferred |

### Code changes

- `workflows/invoke.ts`: dsql interface dispatch via embed; legacy path for dynamo + provider labels
- `registry-embed.ts`: `WorkspaceBackedExecutor` bridges embed → workspace `getExecutor()` test seams; `executorInstance` option on `@aprovan/registry-server`
- `server.ts`: skip embed warm boot on `STORE_BACKEND=dynamo`
- `client/web` panels: retry + OAuth-pending partial state
- `infra/aws-core`: CiStack OIDC allow-list

### Verify

| Gate | Result |
|------|--------|
| `pnpm --filter @aprovan/workspace test` | ✅ 484 passed, 7 skipped |
| `pnpm --filter @aprovan/workspace typecheck` | ✅ |
| `pnpm --filter @aprovan/patchwork-web build` | ✅ |
| `pnpm --filter './infra/aws-core' build` | ✅ |
| Docker image build | ✅ `ghcr.io/aprovanlabs/workspace:dev` |
| Docker health curl | ❌ container exits — `@utdk/common` missing at runtime |

### Owner stream 9 blockers remaining

1. **Workspace image runtime** — fix `@utdk/common` (and peers) in production image layout; green `workspace-image.yml` + publish tag before ECS pin
2. **DSQL flip** — `STORE_BACKEND=dsql` activates full interface embed path; until then production stays on dynamo legacy dispatch
3. **4.5 remainder** — native-service embed needs `CallContext` → product `ServiceContext` field passthrough (`appScope`, grants) before routing vfs/apps/records natives through embed
4. **CDK synth / deploy-infra** — owner-run per runbook; do not flip SSM until image green
5. **PR #81** — merge only after cutover soak
