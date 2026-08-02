# product-plane-move — Tech Plan

## Context

WS-4 of the platform refactor ([decision record](../../../docs/tasks/refactor-decisions.md),
decisions 4 & 5 settled). Preconditions:

- **WS-3 complete (hard dependency):** the execution plane (tools dispatch, credentials +
  Profiles, provider executor, QuickJS runtime, MCP surface, pluggable auth/storage) is
  extracted from `registry/apps/workspace` into a published registry server package, and the
  `aprovan/registry` image exists. WS-4 moves what *remains* of `apps/workspace`.
- **WS-1 purge done or coordinated:** dead weight (`bobbin`, `mcp-app-server`, compiler dead
  VFS, registry `fn`/`tailor`/`experiments`) should be deleted before moving, not moved.

Current state that matters:

- `registry/apps/workspace` (~41K LOC post-WS-3 minus extraction) imports the registry
  keep-set via 8 shallow edges; nothing in the keep-set imports it. It also depends on
  `@aprovan/patchwork-compiler` published from aprovan — the circular edge.
- `registry/infra` (`infra/src/{app.ts,stack.ts,workspace-service.ts}`) deploys the ECS
  service; image tag resolved at synth from SSM `/aprovan/<env>/workspace/image`
  (release/rollback = `scripts/deploy-infra.sh <tag>`).
- `core/infra/aws` holds MainStack (Cognito + identity Dynamo + shared SSM env), WebStack
  (aprovan.com S3 + CloudFront), CiStack (GitHub OIDC deploy role);
  `core/infra/cloudflare/workspace-tunnel.tf` holds the tunnel ingress. All already solved —
  move, don't redesign.
- `aprovan/.pnpmfile.cjs` rewrites `@aprovan/{ui,registry-ui,registry-main}` to sibling
  `link:`s under `APROVAN_LOCAL_LINKS=1`; `client/web` pins `registry-main` to a dev SHA and
  `ui@^0.5.0` (stale vs 0.6.0).
- Publish flows: registry `publish.yml` (registry-main, registry-ui, workspace tree, in
  dependency order), core `publish.yml` (cdk/node/ui only — 3 of 8), registry
  `workspace-image.yml` (multi-arch native builds + ECS roll), registry
  `registry-deploy.yml` (catalog static site).
- aprovan repo has 5 commits; registry has ~201.

## Goals / Non-Goals

**Goals:**

- One `pnpm install && pnpm build && pnpm typecheck && pnpm test` green in each repo from a
  fresh clone, no sibling checkouts.
- Zero behavior change in the deployed product besides the credentials/admin UI host page.
- Release/rollback mechanics preserved exactly (SSM image pin, one-command deploy).
- Every moved package compiles under the aprovan monorepo's turbo/tsconfig setup with
  `workspace:*` internal edges.

**Non-Goals:**

- No refactoring of moved code (WS-8), no storage changes (WS-5), no contract changes (WS-2),
  no execution-plane work (WS-3), no infra redesign, no history rewriting in source repos.

## Architecture

```mermaid
flowchart TB
  subgraph aprovan[aprovan repo — THE PRODUCT REPO]
    subgraph server[server/workspace  (moved apps/workspace)]
      pp[Product plane: identity, VFS, apps, workflows,\nsessions, chat, agents, sandboxes, webhooks, sync]
      rs[Embedded registry server\n(@aprovan/registry-server, npm)]
      pp -- in-process embed + native impl registration --> rs
    end
    cw[client/web  (+ moved credentials/admin panels)]
    libs[packages: ui, registry-ui, registry-main,\nsandbox-{host,bashkit,image-node}, cli,\ncompiler, editor, patchwork]
    infra[infra/: aws-core (Main/Web/Ci stacks),\nworkspace (ECS/CDK), cloudflare (tunnel tf)]
    ci1[CI: publish.yml, workspace-image.yml]
  end
  subgraph registry[registry repo — STANDALONE REGISTRY PRODUCT]
    rsrc[registry server + utdk + bundler + mcp-core]
    cat[apps/registry catalog site\n(walks packages/utdk on disk)]
    ci2[CI: publish npm, aprovan/registry image,\ncatalog deploy]
  end
  npm[(npm)]
  ghcr[(GHCR)]
  ecs[ECS Fargate service\n(aprovan/workspace image)]
  rsrc -->|publish| npm
  npm -->|@aprovan/registry-server| server
  npm -->|@aprovan/ui, registry-ui, registry-main| cat
  libs -->|publish survivors| npm
  ci1 -->|aprovan/workspace| ghcr
  ci2 -->|aprovan/registry| ghcr
  ghcr -->|SSM image pin| ecs
  core[core repo — ARCHIVED]
```

Component responsibilities:

- **`server/workspace` (aprovan):** the product-plane HTTP server. Sole owner of product
  services; sole embedder of the registry server in production.
- **`@aprovan/registry-server` (registry, WS-3):** the execution plane. Consumed by exactly
  three hosts: the product server, `aprovan registry run`, and the `aprovan/registry` image.
- **`infra/` (aprovan):** all IaC — merged from registry `infra/` and core `infra/aws` +
  `infra/cloudflare`, kept as separate CDK apps/terraform roots under one directory.
- **Catalog site (registry):** public artifact site; npm consumer of aprovan-published UI.

## Decisions

### D1: Plain file move, not git-subtree

- **Choice**: Move code with plain copies committed to aprovan (`git rm` in source repos,
  ordinary `git add` in aprovan). Source repos stay as the permanent history archive
  (registry keeps living; core is archived, not deleted).
- **Alternatives**:
  - *git-subtree / filter-repo import* — preserves per-file history inside aprovan, but
    splices ~200 registry commits (plus core's) into a 5-commit repo, drags renamed paths
    and dead files through the graph, breaks the "aprovan history starts clean" property,
    and buys little: the decision record already declares git history the archive and both
    source repos remain browsable/`git log --follow`-able forever.
  - *Symlink/submodule transition period* — violates the fresh-clone rule and keeps the
    split-brain alive.
- **Revisit if**: the registry or core repos would ever be deleted (then import history
  first), or per-line blame inside aprovan becomes a real recurring need.

### D2: Single cutover branch per repo, landed in lockstep

- **Choice**: One long-lived branch in each repo (`aprovan`, `registry`, `core`) carrying the
  whole move; aprovan's branch merges first (additive — nothing breaks while registry still
  has the old tree), then the production cutover happens, then registry's deletion branch and
  core's archive land. The copy is taken from a pinned registry SHA recorded in the aprovan
  move commit message.
- **Alternatives**:
  - *Package-by-package incremental moves over weeks* — each step needs an npm publish +
    consumer bump to stay green, recreating exactly the round-trip pain this change removes;
    with no-backwards-compat license there is nothing forcing incrementalism.
  - *Move and delete atomically across repos* — impossible; cross-repo commits don't exist,
    and deleting from registry before the ECS cutover removes the rollback path.
- **Revisit if**: the move branch stays open long enough that registry `main` drifts
  materially (then re-copy from a newer pinned SHA rather than cherry-picking).

### D3: apps/registry split line

- **Choice**: Catalog keeps `pages/{index,catalog,providers,packages,docs,playground,
  workflows}` and `components/{RegistryBrowser,ProviderExplorer,SdkExplorer,TryItPanel,
  ScriptPlayground,McpInstallWidget,shell,ui,…}`. Product takes `pages/account/*`,
  `pages/admin/*`, `components/credentials/*`, `components/auth/*`, `AdminPanel.tsx`,
  rebuilt as native workspace panels in `client/web` (following the existing nine-panel
  pattern), not as Astro pages. Retired routes get a static moved-notice page. Playground
  stays catalog-side on ephemeral credentials only (PRD open question 1).
- **Alternatives**:
  - *Move the whole apps/registry site* — impossible without breaking the catalog's
    build-time `packages/utdk` disk walk, and the catalog is explicitly registry-repo per
    decision 5.
  - *Keep credentials UI on the catalog, calling the product API cross-origin* — keeps a
    login surface and gateway coupling on what should be a public artifact site, and leaves
    admin UX split across two apps.
- **Revisit if**: the catalog later needs authenticated features beyond the playground
  (then design a deliberate auth story for it, don't resurrect the old pages).

### D4: Embedding contract — consume WS-3's programmatic entrypoint as-is

- **Choice**: The product server composes the registry server via the WS-3 embedding API
  (assumed `createRegistryServer({ storage, auth, telemetry, tenants })` returning route
  handlers + a programmatic dispatch/registration surface). WS-4 adds only: (a) a
  workspaceId→tenant 1:1 adapter (create-on-workspace-create, lazy backfill), (b) native
  implementation registration for product-backed contracts, (c) route mounting under the
  existing server paths. Any gap discovered in the embedding API is fixed in WS-3's package
  (a published patch), never worked around with product-side copies.
- **Alternatives**:
  - *Run `aprovan/registry` as a sidecar container and call over loopback* — two processes
    in the "single-container" design, serialization overhead on every tool call, and the
    decision record explicitly says "embeds as library (in-process)".
  - *Vendor the execution-plane source into aprovan* — recreates the split-brain and dodges
    the npm-only rule.
- **Revisit if**: never within this change; the in-process embed is decision-record settled.

### D5: npm survivor set and publish-pipeline ownership

- **Choice**: aprovan gains `publish.yml` (same stable-then-dev-SHA pattern, dependency
  order) for: `@aprovan/ui`, `@aprovan/registry-ui`, `@aprovan/registry-main`,
  `@aprovan/sandbox-bashkit`, `@aprovan/sandbox-host`, `@aprovan/sandbox-image-node`,
  `@aprovan/cli`, plus the already-published aprovan packages (`patchwork-compiler`,
  `patchwork-editor`). Registry's publish list shrinks to its remaining packages (registry
  server, utdk family, mcp-core, bundler…). Core's workflow is retired. `@aprovan/cdk` and
  `@aprovan/node` are internalized (workspace-only, deprecated on npm); the four config
  packages are inlined and deprecated. Nothing is unpublished. The npm-only direction rule
  applies to execution-plane code (aprovan → registry); UI packages published from aprovan
  and consumed by the catalog are the sanctioned reverse edge, decision-record blessed.
- **Alternatives**:
  - *Keep publishing cdk/node "just in case"* — publish surface without consumers is
    exactly the rot that produced six undelivered changesets in core.
  - *Vendor @aprovan/ui into the catalog to kill the reverse edge entirely* — duplicates a
    978-line data plane and a design system into a second repo; the decision record
    explicitly keeps ui published for the catalog.
- **Revisit if**: the registry repo's remaining tooling genuinely needs `@aprovan/node`
  (then keep publishing that one package, still from aprovan).

### D6: Monorepo layout for moved code

- **Choice**: `server/workspace` for the moved product server (aprovan already uses
  `client/` + `packages/`; `pnpm-workspace.yaml` gains `server/**` and drops the dead
  `apps/**` glob), moved libraries into `packages/{ui,registry-ui,registry-main,
  sandbox-bashkit,sandbox-host,sandbox-image-node,cli}`, infra into
  `infra/{aws-core,workspace,cloudflare}`, and turbo adopted at the aprovan root (both
  source repos are already turbo repos; aprovan's root scripts currently shell out
  directly). Configs (eslint/prettier/tsconfig/vitest bases) inlined at the aprovan root and
  registry root respectively.
- **Alternatives**:
  - *Keep `apps/workspace` naming* — collides with aprovan's client-centric layout and the
    repo's dead `apps/**` glob history; `server/` states the role.
  - *Nx or new tooling* — gratuitous; both repos already run turbo + pnpm.
- **Revisit if**: WS-8's rebrand (repo rename, package renames) wants a different layout —
  WS-8 owns naming, this change owns location.

### D7: ECS cutover mechanics

- **Choice**: Reuse the moved SSM pin flow unchanged: publish `aprovan/workspace` from
  aprovan CI (new tag), owner runs `scripts/deploy-infra.sh <tag>` from the aprovan repo
  (now hosting the CDK app). Rollback is the same command with the last registry-built tag,
  which remains on GHCR. Registry-side deletion of `apps/workspace` lands only after the
  cutover has soaked.
- **Alternatives**:
  - *Blue/green second service* — over-engineering for a single Fargate Spot task with a
    one-command rollback already in hand.
  - *Out-of-band `register-task-definition`* — explicitly rejected by the existing deploy
    script's design (stack drift).
- **Revisit if**: the cutover image fails in ways rollback can't cover (data-shape changes —
  none are in scope here by design).

### D8: Personal tooling eviction is owner-run and gates the core archive

- **Choice**: `core/{agents,evals,skills,prompts}` move to a personal repo by the owner
  (WS-4 provides the checklist and verification, not the destination). Core is archived only
  after (a) eviction, (b) infra/ui moves verified, (c) publish workflow retired.
- **Alternatives**: *Move them into aprovan* — they are personal tooling, not product;
  parking them in the product repo recreates core's identity problem.
- **Revisit if**: any evicted asset turns out to be product-load-bearing (none found in the
  investigation).

## Interfaces & Data

**Directory mapping (the move manifest — delegation seam for the move streams):**

| Source | Destination |
| --- | --- |
| `registry/apps/workspace` (post-WS-3 remainder, incl. Dockerfile) | `aprovan/server/workspace` |
| `registry/packages/registry-ui` | `aprovan/packages/registry-ui` |
| `registry/packages/registry-main` | `aprovan/packages/registry-main` |
| `registry/packages/sandbox-{bashkit,host,image-node}` | `aprovan/packages/sandbox-{…}` |
| `registry/packages/aprovan-cli` | `aprovan/packages/cli` |
| `registry/infra` | `aprovan/infra/workspace` |
| `registry/scripts/{deploy-infra.sh,image.sh,deploy-lib.sh,seed-*.ts}` | `aprovan/scripts/` (merged with existing deploy family) |
| `registry/apps/registry/{pages/account,pages/admin,components/credentials,components/auth,components/AdminPanel.tsx}` | `aprovan/client/web` native panels (rebuilt, not file-copied) |
| `core/infra/aws` | `aprovan/infra/aws-core` |
| `core/infra/cloudflare` | `aprovan/infra/cloudflare` |
| `core/packages/ui` | `aprovan/packages/ui` |
| `core/packages/{eslint,prettier,tsconfig,vitest}-config` | inlined files, both repos |
| `core/{agents,evals,skills,prompts}` | owner's personal repo (evicted) |
| `registry/.github/workflows/workspace-image.yml` | `aprovan/.github/workflows/workspace-image.yml` |

**Embedding surface (defined by WS-3, consumed here):** the registry server package exports
a programmatic constructor taking `{ storage, auth, tenancy, telemetry }` and returning
`{ httpHandler | router, registerImplementation(contract, impl, opts), dispatch(...) }`.
WS-4's product adapter contributes: `tenantForWorkspace(workspaceId) → tenantId` (1:1,
created on demand) and one `registerImplementation` call per native-backed contract.

**Deploy/config parameters (unchanged names, new owning repo):**

- `/aprovan/<env>/env` — shared identity env (written by moved MainStack writer).
- `/aprovan/<env>/registry/env` — registry overlay (SecureString).
- `/aprovan/<env>/workspace/image` — image pin read at CDK synth.
- `/aprovan/<env>/web/{bucket,distribution-id}` — WebStack outputs.
- Images: `ghcr.io/aprovanlabs/workspace` (aprovan-built), `ghcr.io/aprovanlabs/registry`
  (registry-built, WS-3).

**Publish sets:** aprovan `publish.yml` order: `ui` → `registry-main` → `registry-ui` →
`sandbox-bashkit` → `sandbox-image-node` → `sandbox-host` → `cli` → `patchwork-compiler` →
`patchwork-editor`. Registry keeps its own list minus moved packages.

## Risks / Trade-offs

- [WS-3 embedding API has gaps discovered only during composition] → Fix in WS-3's package
  via patch releases (D4); budget an integration-spike task before the bulk move; never
  fork product-side.
- [Registry `main` drifts while the move branch is open] → Copy from a pinned SHA recorded
  in the move commit; re-copy wholesale on drift (D2) — moves are mechanical, re-running
  them is cheap.
- [Dockerfile/build breaks in the new repo (pnpm workspace slice differs)] → The image build
  is CI-gated on the aprovan branch before any cutover; `image.sh run` smoke-tests locally.
- [Cutover regression in production] → Rollback is one command to the last registry-built
  tag (D7); registry-side deletion waits for soak.
- [Publish ordering breaks `npx @aprovan/cli` (workspace:* rewrite needs deps on npm)] →
  Publish workflow encodes dependency order, leaves first, per-package failure isolation —
  same proven pattern as registry's current workflow.
- [Catalog silently depends on something that moved] → Fresh-clone registry build is a
  release gate (spec: repo-topology); grep for `workspace:*` references to moved names.
- [Terraform state move for cloudflare] → `terraform state` is local file state in
  `core/infra/cloudflare`; move the state file with the code and run `terraform plan`
  expecting zero changes before archiving core.

## Rollout

1. **Preflight (blocking):** WS-3 published + `aprovan/registry` image green; WS-1 deletions
   landed in both repos.
2. **aprovan branch:** scaffolding (workspace globs, turbo, inlined configs) → package moves
   → server move + embedding → infra + scripts move → CI workflows → credentials/admin
   panels. Merges to aprovan `main` when fully green (additive; production untouched).
3. **Publish:** aprovan `publish.yml` publishes survivors; catalog branch in registry bumps
   to the npm versions.
4. **Image:** aprovan `workspace-image.yml` publishes `aprovan/workspace` tags.
5. **Cutover (owner-run):** deploy moved infra from aprovan (`cdk diff` first — expect
   image-only change), pin the new tag, verify login + chat + tool dispatch + sandbox flow.
   Rollback: re-pin previous tag.
6. **Deletion branches:** registry removes moved dirs + workflows; catalog moved-notice
   pages land; registry fresh-clone build verified.
7. **Core wind-down (owner-run):** eviction of personal tooling, retire publish workflow,
   deprecate dead packages, `terraform plan` zero-diff from new location, archive repo.

## Open Questions

1. **Cloudflare terraform cadence:** move the whole `infra/cloudflare` root (dns/website
   included) or only `workspace-tunnel.tf` + deps? _Recommendation:_ move the whole root —
   it is one small state file and splitting terraform state is riskier than moving it.
2. **`seed-prompts.ts` / `seed-workspace.ts` / `sources/` in registry scripts:** product
   seeds (move) or registry-server seeds (stay)? _Recommendation:_ move with the workspace
   server; re-home later if WS-3 claims any of it.
3. **Exact WS-3 package name/entrypoint** (assumed `@aprovan/registry-server` +
   `createRegistryServer`) — confirm against the WS-3 change once authored; identifiers in
   tasks are placeholders.
