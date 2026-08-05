# Wave plan — improve-wave IW-7

## Settled
- PostHog prompts → repo/workspace FS only (PostHog stubbed DEPRECATED v4).
- Keep third-party interface compat adapters.

## Wave 0 — done
utdk §1–§7 (#108–#116), tools-global (#82/#114), Dockerfile (#115). Coverage 90.6%.

## Wave 1 — done
utdk-remote (#117–#119, `@utdk/remote@0.1.2`), profiles-unified (#85/#120–#121),
editor-consolidation (#84/#122, `@aprovan/editor@0.2.0`). Prod chat redeployed.

## Wave 2 — done (`interfaces-native-provider`)
| Item | Status | Link |
|------|--------|------|
| Registry compat defaults | **merged + published** | [#123](https://github.com/AprovanLabs/registry/pull/123) → `@utdk/{vfs,vcs,keyvalue,events,sandbox}@0.2.1`, `@utdk/telemetry@0.3.1` |
| Aprovan streams 1–8 | **merged** | [#86](https://github.com/AprovanLabs/aprovan/pull/86) |
| Prod web | **redeployed** | https://aprovan.com/chat/ |
| Prod gateway | **rolled** | image `723009123143` via `deploy-infra.sh` (CI OIDC roll failed) |
| `@aprovan/native@0.1.0` | **published** | npm |

## Closeout
- All six change `tasks.md` files fully checked.
- Reports present under each change `briefs/`.
- Optional later: `openspec archive` per change; PostHog UI archive of stubbed prompt;
  unify `@utdk/vcs` Git-hosting vs workspace commit ops; full example reseed pass.

**IW-7 workstreams complete.**

---

# Wave plan — improve-wave IW-8

## Settled
- **Hard order:** `grant-enforcement` §1 before `registry-server-extraction` §9.4
  (`permittedTools` visibility).
- **Conflict matrix override:** `grant-enforcement` §3 and `platform-oauth-apps` §1 both
  touch `registry packages/registry-server/src/credentials/service.ts` — serialize
  **GE §3 → POA §1** (matrix omitted this; do not run in parallel).
- `tools-scan.ts`: `tools-addressing` §4 before `grant-enforcement` §2.
- `imports.ts`: TA §3 → GE §2 → TA §6.
- `mcp/**`: GE §5 before GQL §3.
- `profiles/resolve.ts`: GE §1 before GQL §5.
- `data/registry.json`: additive separate commits + rebase (GQL §5, POA §2/§5).
- Corepack: `COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0` for pnpm.
- Cross-repo: registry publish before aprovan pin (`tools-addressing` §4.1 → §4.3).

## Wave 0 — in progress
| Item | Status | Link |
|------|--------|------|
| tools-addressing §1 naming authority | **merged** | [#127](https://github.com/AprovanLabs/registry/pull/127) → `main` |
| grant-enforcement §1 gate step 5 | **merged** | [#125](https://github.com/AprovanLabs/registry/pull/125) → `main` |
| grant-enforcement §3 provision default | **merged** | [#134](https://github.com/AprovanLabs/registry/pull/134) |
| graphql-schema-surface §1 ingest SDL | **merged** | [#132](https://github.com/AprovanLabs/registry/pull/132) Linear schema shipped |
| platform-oauth-apps §3 pool limiter | **merged** | [#126](https://github.com/AprovanLabs/registry/pull/126) → `main` |

Hard-order gate cleared for `registry-server-extraction` §9.4 (still wait for GE §3 per task 9.2).
TA §1 unlocks Wave-1: TA §2, TA §3, TA §4a.

## Wave 1 — in progress (unlocked by TA §1)
| Item | Status | Link |
|------|--------|------|
| tools-addressing §2 catalog alias | **merged** | [#130](https://github.com/AprovanLabs/registry/pull/130) |
| tools-addressing §3 tools. bind | **merged + published** | [#129](https://github.com/AprovanLabs/registry/pull/129) → `@utdk/remote@0.1.4` |
| tools-addressing §4a scanner export | **merged + published** | [#128](https://github.com/AprovanLabs/registry/pull/128) → `@utdk/remote@0.1.3` |
| tools-addressing §4b editor consume | **merged** | [#102](https://github.com/AprovanLabs/aprovan/pull/102) → editor `@utdk/remote@0.1.4` |
| tools-addressing §6 documentation | **merged** | [#131](https://github.com/AprovanLabs/registry/pull/131) |
| platform-oauth-apps §1 resolution | pending | GE §3 |
| platform-oauth-apps §2 flag/secrets | pending | serialize registry.json |
| grant-enforcement §2 bracket error | **merged** | see Wave 1b |
| graphql-schema-surface §2 type index | **merged** | [#136](https://github.com/AprovanLabs/registry/pull/136) |

## Wave 1b — unlocked by TA §4
| Item | Status | Link |
|------|--------|------|
| grant-enforcement §2 bracket error | **merged** | [#133](https://github.com/AprovanLabs/registry/pull/133) `@utdk/remote@0.1.5` + aprovan [#104](https://github.com/AprovanLabs/aprovan/pull/104) chip removed |
| tools-addressing §5 lazy types | **merged** | [#103](https://github.com/AprovanLabs/aprovan/pull/103) |

## Settled (mid-wave addendum)
- tools-addressing §1–§6 **complete** on main.

## Wave 3 — unlocked by GE §3
| Item | Status | Link |
|------|--------|------|
| platform-oauth-apps §1 resolution | **merged** | [#137](https://github.com/AprovanLabs/registry/pull/137) |
| grant-enforcement §4 run-scoped narrowing | **merged** | [#135](https://github.com/AprovanLabs/registry/pull/135) |
| registry-server-extraction §9 MCP closeout | **dispatched** | worktree `aprovan-iw8-rse09` |

## Wave 3b — unlocked by GE §4
| Item | Status | Link |
|------|--------|------|
| grant-enforcement §5 MCP sandbox tool | **dispatched** | worktree `registry-iw8-ge05` |

## Wave 2b — unlocked by GQL §2
| Item | Status | Link |
|------|--------|------|
| graphql-schema-surface §4 SDL overview docs | **dispatched** | worktree `registry-iw8-gql04` |
| graphql-schema-surface §3 schema_lookup | **blocked** | wait GE §5 (mcp/**) |
| graphql-schema-surface §5 api version | **blocked** | serialize `data/registry.json` after POA §2 |

## Later
grant-enforcement §4–§5; tools-addressing §5–§6; graphql §3–§5; platform-oauth §4–§5;
registry-server-extraction §9 (after GE §1).
