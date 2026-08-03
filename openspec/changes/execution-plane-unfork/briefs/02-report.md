# Brief 02 report — Aprovan npm switch + fork delete

## Status
**Streams 4–5: DONE (PR).** Stream 6: fresh-clone + docker image verified green on the PR branch / after merge.

## What shipped
PR: https://github.com/AprovanLabs/aprovan/pull/24 (merged)

### Aprovan unfork
- Repointed `server/workspace` to npm: `@utdk/{agent,llm,sandbox}^0.2.0`,
  `@utdk/{common,mcp-core}^0.1.0`, `@utdk/clients^0.1.1`,
  `@aprovan/registry-server^0.1.4`, plus contract packages
  `@utdk/{sql,vcs,keyvalue,events,vfs,telemetry}^0.2.0` for compat catalog.
- `client/web` depends on `@aprovan/runtime^0.1.0`.
- Removed root `pnpm.overrides` for `@utdk/common` / `@utdk/mcp-core`.
- Deleted `packages/{utdk,contracts,runtime,bundler,mcp,mcp-core,registry-server}`;
  dropped `!packages/utdk/dist/**` from `pnpm-workspace.yaml`.
- Rewrote `gateway-local-scratch` in `.claude/launch.json` onto
  `pnpm --filter @aprovan/workspace exec tsx src/cli.ts start`.
- Dockerfile comment updated for npm-via-lockfile consumption.
- Requires retargeted: `@utdk/clients/registry.json`,
  `import("@utdk/clients/${provider}")`, webhook intel package paths.

### Supporting registry publishes (blockers found mid-stream)
| PR | Result |
|---|---|
| [registry#90](https://github.com/AprovanLabs/registry/pull/90) | `@utdk/common@0.1.1` (compat/webhooks exports) |
| [registry#91](https://github.com/AprovanLabs/registry/pull/91) | `@aprovan/registry-server@0.1.4` (depends on common 0.1.1) |

Published `@utdk/common@0.1.0` predated the compat commit; `registry-server@0.1.3`
pinned exact `0.1.0` and nested it under pnpm, breaking `@utdk/common/compat`.

### pnpm-aware compat loading
Walking up from `@utdk/agent` no longer finds sibling contracts under pnpm.
`interfaces.ts` now resolves each `@utdk/*` contract package and parses its
`compat.json` via `parseCompatDocument`.

### Collateral fixes (pre-existing on main)
- `@aprovan/devtools`: missing `cli.ts` / `quality` entry broke `pnpm build`;
  added minimal CLI, restored `SERVICE_OFFSETS`, dropped unused `venvBin`.
- `sandboxes.registerHost` now persists the `machine` credential (documented
  intent; `#11` had blocked POST `/credentials` for interface-only providers
  without updating host registration or tests).

## Verify results
| Check | Result |
|---|---|
| `pnpm install && pnpm build && pnpm typecheck && pnpm test` (worktree) | **PASS** |
| `@aprovan/workspace` tests | **499 passed** / 7 skipped |
| `registry-embed` suite | **PASS** (4) |
| Health smoke (`WORKSPACE_PORT=4010`) | **PASS** `{"status":"ok"}` |
| No `workspace:*` → exec-plane packages | **PASS** |
| `launch.json` has no registry path | **PASS** |
| Absolute `/Users/` grep | **PARTIAL** — launch.json + deleted utdk clean; pre-existing openspec docs still mention paths |
| Fresh clone (6.1) | **PASS** (PR branch clone)
| Docker workspace image (6.2) | **PASS** |

## Published versions consumed
| Package | Version |
|---|---|
| `@utdk/clients` | 0.1.1 |
| `@aprovan/registry-server` | **0.1.4** (task said ^0.1.3; 0.1.4 required for common/compat) |
| `@aprovan/runtime` | 0.1.0 |
| `@utdk/common` | 0.1.1 (via ^0.1.0) |

## Deviations
- Consumed `@aprovan/registry-server@^0.1.4` instead of `^0.1.3` (hard requirement).
- Added contract package deps beyond the task list so the interface catalog loads under pnpm.
- Fixed `@aprovan/devtools` and `registerHost` machine-credential persistence to get green build/test.
