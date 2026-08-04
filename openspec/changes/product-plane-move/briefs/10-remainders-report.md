# Brief report: product-plane-move remainders (2026-08-04)

## Done this pass
- **7.3** — Workspace image smoke OK on published tag `ghcr.io/aprovanlabs/workspace:723009123143` (`/health`, `/api/gateway/config`).
- **4.5↑** — Product `ServiceContext` preserved across embed `compatDispatch` (AsyncLocalStorage); HTTP tools path uses embed when `STORE_BACKEND=dsql`.
- **CI** — `workspace-image.yml` ECS roll limited to explicit `workflow_dispatch` (OIDC assume-role was failing every push).
- **2.4** — Documented deferred (cannot re-run pre-inline lint; root lint known-broken per AGENTS.md).

## Still blocked (owner / external)

| Item | Why blocked |
|------|-------------|
| **9.1–9.4** cutover | Owner AWS: CDK diff, `deploy-infra.sh` image pin, soak, aws-core zero-drift |
| **4.5 complete** | Needs production `STORE_BACKEND=dsql` flip; sqlite catalog lacks product `vfs`/`keyvalue` as dispatchable namespaces |
| **10.2** | Owner: evict `core/{agents,evals,skills,prompts}` to personal repo |
| **10.3–10.4** | Depends on 10.2 + cutover; npm deprecate needs publish rights |
| **10.5** | Owner: archive core on GitHub after 10.2–10.4 |
| **Registry #81** | DO-NOT-MERGE until cutover soak |
| **2.4 formal** | Pre-inline config packages deleted; `pnpm lint` fails at load (`typescript-eslint` undeclared) |

## PR
Aprovan: `fix/product-plane-move-remainders` (this branch).
