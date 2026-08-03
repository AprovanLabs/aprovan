# Platform Refactor — Decision Record & Workstream Map

_2026-08-01. Supersedes the open questions in [refactor.md](./refactor.md). Produced from a
four-agent investigation of all three repos plus a full decision-grilling session with the owner.
This is the zero-context source of truth for authoring and implementing the refactor workstreams._

Repos (local checkouts are siblings):

- `AprovanLabs/aprovan` — this repo. Becomes THE PRODUCT REPO (product plane + all infra).
- `AprovanLabs/registry` — becomes THE STANDALONE REGISTRY PRODUCT (execution plane, no infra).
- `AprovanLabs/core` — DISSOLVES into aprovan (identity/edge/CI CDK, `@aprovan/ui`) and personal tooling (evicted).

## Target architecture

```
┌────────────────────────────────────────────────────────────┐
│  aprovan/workspace  (all-in-one image — the ECS deploy)    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PRODUCT PLANE (aprovan repo)                          │  │
│  │ identity · VFS · apps · workflows · sessions · chat   │  │
│  │ agents · sandboxes · webhooks · sync · notifications  │  │
│  │ native impls registered against @utdk contracts       │  │
│  └───────────────────────┬──────────────────────────────┘  │
│                          │ embeds as library (in-process)  │
│  ┌───────────────────────▼──────────────────────────────┐  │
│  │ EXECUTION PLANE = registry server (registry repo)     │──┼── also ships alone as
│  │ provider execution (lazy-load + LRU) · contract       │  │   aprovan/registry image
│  │ dispatch · Profiles/credentials · QuickJS runtime     │  │   + `aprovan registry run`
│  │ MCP surface · catalog                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
 storage backends, pluggable: SQLite/libSQL (bundled default) │ DSQL (cloud)
 auth, pluggable: OIDC adapter (Cognito is just config) │ API keys │ none (local)
```

Cross-repo consumption: aprovan → registry via published npm only. One direction. The circular
edge (registry's workspace depending on `@aprovan/patchwork-compiler`) dies with the move.

## Decision record (all confirmed by the owner)

1. **Runtime split.** QuickJS-WASM sandboxes user-authored code only (workflow scripts, sync
   transforms), holding just a lightweight proxy layer (namespace proxies, retries, pagination —
   cooperative). Generated provider modules execute in-process at the gateway — the current
   "fallback" direct executor renamed to the intended executor — with lazy `import('utdk/<p>')`
   and an LRU cap on resident provider modules. Rate limits and budgets are enforced
   gateway-side only. `@utdk/isolate` is deleted. The proven QuickJS sandbox is
   `registry/apps/workspace/src/workflows/sandbox.ts` (513 LOC, `@jitl/quickjs-wasmfile-debug-asyncify`;
   release builds are miscompiled — keep debug-asyncify); it gets extracted into the registry
   server. `packages/runtime` (`@aprovan/runtime`: proxies + policy + pagination + iframe sandbox)
   is the seed of the in-sandbox SDK layer.
2. **Deletions.** `packages/bobbin` (5,971 LOC; accepting loss of the visual-edit panel in
   EditModal) and `packages/mcp-app-server` (4,112 LOC; MCP-Apps distribution is
   rebuild-later-if-ever). npm packages get `npm deprecate`, never unpublish.
3. **Storage.** All cloud metadata → Aurora DSQL in one design pass (FS metadata, records,
   credentials, audit, identity/authz). Local stays SQLite/libSQL (Turso-compatible). Migration
   posture: **nuke-and-reseed** — no dual-read paths, no version-history carryover. Preceded by
   a runbook'd manual snapshot: pull every S3 blob + Dynamo latest-pointer into a local SQLite
   mirror (the existing `FsStoreSqlite` shape), verify it boots in local mode, then cut over.
4. **Registry is a standalone product.** The execution plane (provider execution, credential
   store, contract dispatch, QuickJS runtime, MCP surface, catalog) is extracted from
   `registry/apps/workspace` into a registry server package. Multi-tenant at core (the embedded
   case — one ECS task, many workspaces — requires it; standalone auto-provisions a default
   tenant; aprovan maps workspaceId → tenant 1:1). Pluggable auth: OIDC adapter (any issuer),
   API keys, `none` (local). Pluggable storage backends.
5. **Packaging & infra.** An `aprovan` CLI in the aprovan repo (grown from
   `registry/packages/aprovan-cli`) gains `aprovan registry run`. Two published Docker images:
   `aprovan/registry` (execution plane only) and `aprovan/workspace` (all-in-one, embeds the
   registry server in-process). Only the aprovan repo stands up infra; the ECS service is cut
   over to the new `aprovan/workspace` image. The registry repo ships artifacts only (npm + image).
   Core's identity/edge/CI CDK moves to aprovan. The catalog site (`registry/apps/registry`)
   stays in the registry repo (it reads `packages/utdk` off disk at build time).
6. **Contracts v1.** Promote existing `sql, llm, sandbox, vcs, agent` out of
   `packages/utdk/<name>/` into real top-level packages (killing the four aligned exclusion
   lists: `packages/utdk/build.mjs`, `copy-assets.mjs`, `tsconfig.json`, bundler
   `render.ts` `providersOnDisk`), each **shape-audited** against 2–3 real would-be providers
   before freezing. Create new contracts: `keyvalue`, `events`, `vfs`, `telemetry`. Stays
   product-plane: `sessions, notifications, agents, apps, sync`. `webhooks` becomes UTDK
   *generation metadata* (per-provider setup/config intel; bundler `webhooks.json` is the seed),
   not an interface. Fix hostname→package authority mapping (bundler splits provider names on
   dots — `synthetic.new` would become `utdk/synthetic/new`; introduce an explicit hostname map
   with `.com` default: `github.com → @utdk/github`, `drive.google.com → @utdk/google/drive`,
   `synthetic.new → @utdk/synthetic-new`). Catalog site gains first-class interface
   representation: a provider page shows "implements X contract" + optional capabilities.
   Add `@utdk/sandbox`, `@utdk/agent`, `@utdk/vcs` to the CI publish list (currently missing).
7. **Profiles.** One unified, tenant-scoped primitive: `{name, target (interface|provider),
   credential ref, options, grants}`. Replaces BOTH existing half-mechanisms (named interface
   instances in `.services/bindings.json` via `interfaces.bind`, and credential-label
   resolution in `resolveCredentialRecord`). `sql.client("docs")` resolves a Profile; bare
   `sql.*` / `github.*` resolve the default-named profile. Profiles are the allow-listing unit
   for workflows/apps/agents (granting a profile IS the credential grant). Credentials gain a
   user dimension (`createdBy`/owner — today `CredentialRecord` has none at all) in the same
   schema work. UI: credential page lists its profiles; interface page lists tenant profiles;
   catalog shows which providers back which interface.
8. **Groups.** `GroupPrefixGrants` deleted outright (written via admin API, enforced by
   nothing — `listGrantedPrefixes()` has zero callers). `GroupToolGrants` rebased to
   group→profile membership, resolved in one auth-time join (kills the per-request
   `UserGroups` query + per-call N+1 gets). Workspace/app roles stay as-is.
9. **Telemetry.** One attributed pipeline — every emission carries `{tenant, principal,
   source}` — with three planes: (1) workspace plane: `telemetry` contract + profiles, users
   bind their own backend and call telemetry tools in workflows; (2) default/global plane:
   registry server ships built-in instrumentation exporting to a configurable OTLP endpoint
   (vendor-neutral standalone default); users see their own workspace's slice; (3) operator
   plane: cross-tenant aggregate for the aprovan.com deployment owner only → PostHog (v1),
   gated on a new deployment-operator role (defined in the identity migration). No bespoke
   admin portal this pass.
10. **E2E bench.** Real credentials live in SSM under `/aprovan/test/utdk-creds/*`.
    `write-env.ts` grows `--from-ssm`. Nightly scheduled workflow: `doctor` gates, live suite
    runs for ready providers, failures open a GitHub issue (non-blocking — 3rd-party flakiness
    must not gate merges). The credential-free generation flow (280 assertions) stays the CI
    merge gate. Post-refactor, a gateway-flow variant runs against a seeded test tenant.

## Key investigation findings (ground truth for authors/implementers)

- **Already solved — do not build:** shared login (one Cognito pool, PKCE client, same-origin
  SSO across aprovan.com/chat + /registry) and single-container hosting (one Fargate Spot task
  ~$8/mo; CloudFront → Cloudflare tunnel `origin.aprovan.app` → loopback:4000; no ALB/NAT).
- **Dependency directions:** `apps/workspace` (41K LOC) imports the keep-set via 8 shallow
  edges; NOTHING in the keep-set imports workspace. `registry/apps/registry` walks the
  filesystem for `packages/utdk` at build time and throws if missing.
- **Dynamo cost ($5/user/mo) is workload shape, not backend:** (a) unprefixed full-workspace
  listing poll every 8s per tab (`aprovan/client/web/src/lib/workspace-vfs.ts`
  `startLiveWorkspaceSync`); (b) `.services/**` for ~18 subsystems stored as VFS files — every
  chat message is a full-transcript read-modify-write creating a permanent `V#` version row +
  a never-GC'd S3 blob; (c) uncached per-request auth triple-read (Sessions + Memberships +
  UserGroups); (d) server loops: sandbox queue 500ms poll, relay 250ms, leader lease 30s,
  LLM job 1s. Fix the workload first; the quick wins are backend-agnostic.
- **Store layer:** `fs-store.ts`, `records.ts`, `credentials.ts`, `audit.ts` follow a clean
  `IXStore` interface + Dynamo/SQLite impls + `getXStore()` singleton selected by
  `isAwsMode()` (`runtime/config.ts`). Identity/authz (users, workspaces, memberships,
  sessions, invites, groups, userGroups, permissions) is Dynamo-only, ~58 raw call sites
  across 13 files, no interfaces — DSQL impls are from-scratch but the schemas are
  relational-in-disguise (`workspaceId#groupId` composite keys). `IFsStore.list` has no
  pagination — add a cursor during the swap.
- **`@utdk/keyvalue` / `@utdk/events` do not exist** — they're core services in
  `apps/workspace/src/services.ts`. Creating contracts is net-new design, not a move.
- **`@utdk/isolate` is dead code:** `apps/workspace/src/isolate.ts:188` try/catches a
  deliberately-failing import and falls back to an UNSANDBOXED direct executor —
  which is the intended in-process executor going forward (rename it, delete the package).
- **Core repo:** publish pipeline covers only cdk/node/ui (3 of 8 packages); six undelivered
  changesets; consumers pin stale versions (`ui@^0.5.0` vs 0.6.0; `@aprovan/registry-main`
  pinned to dev SHA `0.1.0-dev.7343775`); `aprovan/.pnpmfile.cjs` `APROVAN_LOCAL_LINKS=1` is
  the escape hatch. `@aprovan/ui` absorbed 978 lines of registry apps-store data plane
  (`core/packages/ui/src/apps-store/wire.ts`). `@aprovan/devtools` is declared by
  `aprovan/client/web` but never imported.
- **Aprovan repo:** `ChatPage.tsx` is 3,264 lines (the whole app; no router). Nine native
  panels (~5.2K LOC) are cleanly self-contained. The compiler contains a dead second VFS
  (~1,100 LOC: `packages/compiler/src/vfs/{store.ts,backends/http.ts,backends/indexeddb.ts,
  sync/**}` — serves dev-server routes that no longer exist; live parts are only
  `vfs/project.ts`, `vfs/core/**`, `backends/memory.ts`). `packages/patchwork/src/types.ts`
  (~110 LOC) has zero references. `packages/images/{ink,vanilla}` are untracked dist litter.
  Repo is still named `@aprovan/patchwork-workspace`; `pnpm-workspace.yaml` globs a
  nonexistent `apps/**`.
- **Registry repo dead weight:** `infra/cdk.out` = 6.7 GB gitignored build artifact.
  `packages/fn` (945 LOC, fully orphaned), `apps/tailor` (1,456 LOC, duplicated into
  `registry-ui/src/tailor/`), `experiments/` (1,610 LOC, last touched 2026-03), `temp.md`,
  `tasks.md`, `utcp_config.json`, `uv.toml`, `.python-version`, `.registry/`.
- **Bundler↔gateway silent contract:** `packages/bundler/src/phases/authIntel.ts` duplicates
  gateway credential types by hand ("Mirrors the gateway credential types") — needs a shared
  published type or a contract test post-split.
- **Mounts/lineage:** `.services/vcs/mounts.json`, read uncached on every FS op. Commits
  record nothing about mounted refs ("a commit can't pin what it doesn't own"); `config.ref`
  defaults to the moving `main`. Lineage is a WS-6 design item.
- **Per-user data today:** ~~the synthesized Personal app (`apps/personal.ts`, `.personal/`
  prefix, record scope `app#personal#u#<sub>`)~~ **Shipped:** Personal deleted; partitions are
  `.apps/<id>/data/<sub>` + `.users/<sub>` with record scopes `app#<id>#u#<sub>` — see
  [app-data.md](../app-data.md).

## Workstreams

```
WS-1 Purge ──────────────────────────────── free
WS-2 Contracts & catalog ────┐              free
WS-3 Registry server ────────┴──► WS-4      WS-3 needs WS-2 contracts
WS-4 Move & compose ─────────────────────── needs WS-3
WS-5 Metadata & cost ────────────────────── mostly free (coordinate stores with WS-3)
WS-6 Data & auth model ──────────────────── needs WS-3 Profiles
WS-7 E2E bench ──────────────────────────── free
WS-8 Aprovan app cleanup ────────────────── free
```

OpenSpec change names: WS-1 `purge-dead-code`, WS-2 `contracts-and-catalog`,
WS-3 `registry-server-extraction`, WS-4 `product-plane-move`, WS-5 `metadata-and-cost`,
WS-6 `data-auth-model`, WS-7 `utdk-e2e-bench`, WS-8 `workspace-app-cleanup`.

### WS-1 `purge-dead-code` (free; mechanical)
Registry repo: `rm -rf infra/cdk.out`; delete `packages/fn`, `apps/tailor`, `experiments/`,
`packages/utdk-isolate` (rename the direct executor in `isolate.ts` to the intended path,
delete the dead dynamic-import branch), `temp.md`, `tasks.md`, `utcp_config.json`, `uv.toml`,
`.python-version`, `.registry/`. Aprovan repo: delete `packages/bobbin` (+ its EditModal
integration; keep the AI edit loop), `packages/mcp-app-server`, `packages/patchwork/src/types.ts`
(shrink package to `mcp.ts` if still consumed, else delete package), compiler's dead VFS
(`src/vfs/store.ts`, `backends/http.ts`, `backends/indexeddb.ts`, `sync/**` + their exports in
`compiler/src/index.ts`), unused editor exports (`ServicesInspector`, `CodeBlockExtension`, …),
`packages/images/{ink,vanilla}` litter, `client/web/.utcp_config.json`, `docs/temp.md`,
`@aprovan/devtools` dep. Core repo: `infra/aws/dist/` stale stacks, `infra/cloudflare/tunnel.tf`.
npm: `npm deprecate` `@aprovan/bobbin`, `@aprovan/patchwork-mcp` (+`@aprovan/patchwork` if deleted).
Verify: full typecheck+build+test in each touched repo.

### WS-2 `contracts-and-catalog` (free; registry repo)
Promote 5 contracts to top-level packages; shape-audit each against 2–3 would-be providers;
design + create `@utdk/keyvalue`, `@utdk/events`, `@utdk/vfs` (minimal file contract — product
semantics like sessions/overlays/mounts stay aprovan-side), `@utdk/telemetry` (OTLP-shaped);
webhooks → generation metadata (extend bundler `webhooks.json` phase; remove any interface
framing); hostname→package authority map (explicit map + `.com` default, fix dot-splitting);
extract the interface compat catalog out of `apps/workspace/src/interfaces.ts` into keep-set
data (e.g. `compat.json` per contract); fix CI publish list; catalog site: interface pages +
provider "implements" representation. Fix `authIntel.ts` credential-type duplication (publish
shared types from `@utdk/common`).

### WS-3 `registry-server-extraction` (needs WS-2; registry repo; THE center of gravity)
New registry server package: multi-tenant execution plane extracted from `apps/workspace` —
tools dispatch (`routes/tools.ts` provider/contract half), credentials + Profiles (new unified
schema incl. user dimension), interface binding resolution, in-process provider executor with
lazy-load + LRU, QuickJS runtime (extracted from `workflows/sandbox.ts`; drags `ServiceError` +
`__dispatch` host contract), MCP surface (`mcp/server.ts` + `@utdk/mcp-core`), pluggable auth
adapters (OIDC/API-key/none), pluggable storage (SQLite/libSQL default; DSQL), built-in OTLP
instrumentation with `{tenant, principal, source}` attribution. `aprovan/registry` Docker image.
Standalone default tenant. Profiles replace bindings.json + credential-label resolution;
group grants become group→profile membership (schema here, product wiring in WS-6).

### WS-4 `product-plane-move` (needs WS-3; both repos + core)
Move product plane to aprovan: `apps/workspace` minus extracted execution plane, `registry-ui`,
`registry-main`, `sandbox-{bashkit,host,image-node}`, `aprovan-cli`, `infra/`, deploy scripts.
Split `apps/registry`: catalog stays, credentials/admin UI moves. Product plane embeds the
registry server in-process; native impls register against `@utdk` contracts. `aprovan` CLI:
`aprovan registry run`. `aprovan/workspace` image; ECS cutover. Core dissolution: identity/edge/CI
CDK + tunnel terraform → aprovan; `@aprovan/ui` → aprovan (still published); config packages
inlined; personal tooling (agents/evals/skills/prompts) evicted to a personal repo. Kill
`.pnpmfile.cjs` local-links (monorepo makes it moot for aprovan-internal deps).

### WS-5 `metadata-and-cost` (mostly free; coordinate store interfaces with WS-3)
Quick wins first (backend-agnostic): replace the 8s unprefixed poll with ETag/`?since=` change
feed; cache the auth triple-read per token; cache `readMounts`; version retention/GC — stop
version-logging `.services/**` writes (chat transcripts worst). Then: move ~18 `.services/**`
subsystems off the file plane into the record store ("files are authored; records are
accumulated", per `registry/docs/app-data.md`); DSQL backends behind existing interfaces
(FsFiles, records, credentials, audit) + from-scratch identity/authz schema; `IFsStore.list`
cursor. Snapshot runbook (S3+Dynamo → local SQLite mirror, verify local boot) then
nuke-and-reseed cutover. PITR/table cleanup in CDK.

### WS-6 `data-auth-model` (needs WS-3 Profiles; aprovan side)
Per-user private data: generalize the Personal app into real per-user partitions with READ
authorization (not list-hiding); groups→profiles product wiring + admin UI; delete
`GroupPrefixGrants` admin surface; mount lineage (commits pin mount version tokens; `ref`
pinning; provenance records); workspace/app data-scope UX (the Access pane stays truthful).

### WS-7 `utdk-e2e-bench` (free; registry repo)
SSM credential source `/aprovan/test/utdk-creds/*`; `write-env.ts --from-ssm`; nightly
doctor-gated live workflow, failures → GitHub issue; generation flow stays merge gate;
seed-tenant gateway-flow variant post-WS-4 (stub task).

### WS-8 `workspace-app-cleanup` (free; aprovan repo)
Decompose `ChatPage.tsx` (3,264 LOC) into route/feature modules; consolidate the three
component sources (vendored `components/ui/*` vs `@aprovan/ui` vs `@aprovan/registry-ui`);
rebrand repo (`@aprovan/patchwork-workspace` → aprovan; README; workspace globs); keep the
nine native panels' self-contained pattern.

## Conventions for implementers

- No backwards compatibility required anywhere. Delete aggressively; git history is the archive.
- Cross-repo consumption only via published npm. The registry repo must build standalone from
  a fresh clone.
- Durable cross-cutting decisions (the 10 above) are settled — do not relitigate; put NEW
  cross-cutting decisions in ADRs (docs/decisions/).
- Every work stream's tasks.md must carry runnable Verify commands.
