# execution-plane-unfork — Tech Plan

## Context

IW-0 of the improve wave ([findings §0](../../../docs/tasks/improve-findings.md)). Ground
truth verified 2026-08-02:

- aprovan's `packages/{utdk,contracts,runtime,bundler,mcp,mcp-core,registry-server}` are
  byte-copies of the registry repo's tracked packages of the same names. A full-tree diff
  shows the **only source divergence is three registry-server files**:
  - `src/config/types.ts` + `src/server.ts`: adds `executorInstance?: ProviderExecutor` so
    an embedding host can share its executor (consumed by
    `aprovan/server/workspace/src/registry-embed.ts:69`);
  - `src/catalog/default.ts`: prefers a monorepo-relative `packages/contracts` directory
    (resolved from `import.meta.dirname`, `existsSync`-guarded) before falling back to
    `require.resolve("@utdk/agent")`.
  Everything else differs only in build plumbing (tsconfig `extends` aprovan's
  `config/tsconfig/node.json`, extra devDeps) or committed build litter
  (`packages/utdk/common/*.js|.d.ts`).
- **`@aprovan/registry-server@0.1.0` on npm is uninstallable**: pnpm rewrote its
  `utdk: workspace:*` dependency to `utdk@0.1.0`, but `utdk` was never published (it is in
  `publish.yml`'s stable list; the publish evidently failed silently before the recent
  idempotency fix, commit `1c6cd44`). All other needed packages are current on npm:
  `@utdk/{common,mcp-core}@0.1.0`, `@utdk/{sql,llm,sandbox,vcs,agent,keyvalue,events,vfs,telemetry}@0.2.0`.
- `@aprovan/runtime` (registry `packages/runtime`, tracked) is not in `publish.yml` and not
  on npm; aprovan `client/web` consumes it (`PlaygroundPanel.tsx`, `lib/playground.ts`).
- Absolute-path leaks: `packages/utdk/{anthropic,figma,gemini,github,posthog}/package.json`
  in **both** repos carry `/Users/...` values in `utdk.docs.{manifestPath,indexPath,docsPath}`
  (3 lines × 5 providers, mirrored into `dist/` copies ≈ the "~40 reads"). The bundler only
  *writes* these fields (`bundler/src/render.ts:1167`) and its tests expect repo-relative
  values; **no runtime/build consumer reads them** (grepped server, registry-server, catalog).
  The `.registry/` docs cache they point at was deleted in WS-1.
- Registry hygiene debt: `pnpm-workspace.yaml` globs a nonexistent `infra`;
  `pnpm-lock.yaml` still has importers for WS-4-moved dirs (`apps/workspace`, `infra`,
  `packages/{aprovan-cli,registry-main,registry-ui,sandbox-*,utdk-isolate}`, old
  `packages/utdk/{agent,llm,sql,sandbox,vcs}`) that exist locally only as untracked build
  husks — a fresh clone fails `pnpm install --frozen-lockfile`.
- `aprovan/.claude/launch.json:36` (`gateway-local-scratch`) runs `tsx src/cli.ts start`
  from the gutted `registry/apps/workspace`; aprovan's own `server/workspace`
  (`@aprovan/workspace`) has the identical `src/cli.ts start` entrypoint.
- `server/workspace/Dockerfile` (lines 6–8) documents the vendoring rationale that this
  change removes; the image `COPY packages ./packages` + frozen-lockfile install survives
  the deletion since execution-plane deps move to npm.
- aprovan root `pnpm.overrides` forces `@utdk/common` and `@utdk/mcp-core` to
  `workspace:*` — a broken install once the fork is gone.

Boundary rules (settled): npm one-way aprovan → registry for execution-plane code; registry
never depends on an aprovan checkout; aprovan-published UI consumed by the catalog is the
sanctioned reverse edge. No refactoring of consumed code beyond the 3-file reconciliation.

## Goals / Non-Goals

**Goals:**

- Upstream-first reconciliation: registry publishes a superset of the fork before aprovan
  deletes anything.
- Make the published execution plane actually installable (`utdk` on npm) and leak-free
  (no `/Users/` in tarballs).
- Fresh clone of each repo green on `pnpm install && pnpm build && pnpm typecheck && pnpm test`
  with no sibling checkout; registry additionally green on `pnpm install --frozen-lockfile`.
- Keep aprovan's embedded-registry behavior bit-identical (same executor sharing, same
  provider resolution via `utdk`).

**Non-Goals:**

- No API redesign, provider regeneration, or bundler rework; no IW-1/IW-3/IW-4 scope; no
  core-repo work; no publish-automation redesign; no decision on the registry
  `product-plane-removal` branch.

## Architecture

```mermaid
flowchart LR
  subgraph registry[registry repo — execution plane]
    rs[packages/registry-server\n(+ executorInstance, catalog fallback)]
    ut[packages/utdk\n(meta pkg: providers + registry.json)]
    rt[packages/runtime]
    ct[packages/contracts/*]
    pub[publish.yml\n(stable list + build filters)]
  end
  npm[(npm)]
  subgraph aprovan[aprovan repo — product plane]
    sw[server/workspace\n(@aprovan/workspace, embeds registry server)]
    cw[client/web\n(playground uses @aprovan/runtime)]
    lj[.claude/launch.json\n(gateway-local-scratch → server/workspace)]
    df[server/workspace/Dockerfile]
  end
  rs -->|"@aprovan/registry-server@0.1.1"| npm
  ut -->|"utdk@0.1.0 (first real publish)"| npm
  rt -->|"@aprovan/runtime@0.1.0 (new in list)"| npm
  ct -->|"@utdk/*@0.2.0 (already published)"| npm
  npm --> sw
  npm --> cw
```

Responsibilities: the registry repo is the *only* source of execution-plane code and the
only publisher of `@aprovan/registry-server`, `utdk`, `@utdk/*`, `@aprovan/runtime`.
aprovan's `server/workspace` embeds the published server (passing `executorInstance`);
`client/web` consumes published `@aprovan/runtime`. The forked `packages/*` directories in
aprovan cease to exist; nothing replaces the forked `bundler`/`mcp` copies because nothing
in aprovan consumes them.

## Decisions

### D1: Reconcile both fork deltas upstream verbatim

- **Choice**: Port the `executorInstance` option (types + server wiring) and the
  `catalog/default.ts` monorepo-contracts fallback into the registry repo exactly as the
  fork has them. The fallback path resolves relative to the registry-server package itself
  (`src/catalog` → repo root → `packages/contracts` in the monorepo; a nonexistent
  `node_modules/packages/contracts` when installed from npm), so it is a dev convenience in
  registry and a guaranteed no-op for npm consumers.
- **Alternatives**:
  - *Upstream only `executorInstance`, drop the fallback* — the fallback's motivating case
    (the fork) dies here, but silently dropping fork behavior violates "reconcile first,
    superset upstream" and risks a subtle dev-mode regression for zero savings.
  - *Redesign the embedding surface while touching it* — explicitly out of scope ("no
    refactoring of consumed code beyond the 3-file reconciliation").
- **Revisit if**: a later registry change audits `resolveContractsDir()` and proves the
  fallback dead — delete it then, in registry, with its own verify.

### D2: Version the reconciled registry-server as 0.1.1

- **Choice**: Patch bump. Both deltas are additive and backward-compatible; the only
  consumers are aprovan and standalone self-hosters on 0.x.
- **Alternatives**: *0.2.0 minor* — semver-purist for new API surface, but pre-1.0 minors
  signal breakage in this repo's convention (contracts jumped 0.1→0.2 on a breaking
  promotion) and there is none here.
- **Revisit if**: reconciliation turns out to need any behavior change beyond the two
  additive deltas — then bump minor.

### D3: Fix the publish pipeline rather than publishing by hand

- **Choice**: Diagnose why `utdk@0.1.0` never published (its `prepublishOnly` runs
  `build:types` — a 4 GB-heap `tsc` — the likely CI failure; the old workflow also
  masked per-package failures until `1c6cd44`), fix in `publish.yml` (ensure `utdk` is
  built by the build step's filters, not only by `prepublishOnly`), add `@aprovan/runtime`
  to both the build filter and stable list, drop the stale `@aprovan/sandbox-image-node`
  entry (its directory moved to aprovan in WS-4; aprovan's own `publish.yml` owns it), and
  let CI publish. A manual `pnpm publish` from a clean checkout is the contingency, not the
  plan — the pipeline must be green for every future execution-plane release anyway.
- **Alternatives**: *One-off manual publish now, fix CI later* — unblocks aprovan a day
  earlier but leaves the exact failure that produced an uninstallable flagship package.
- **Revisit if**: CI cannot build `utdk` within runner memory — then split its build into
  the workflow's build step with explicit `NODE_OPTIONS`, or publish `utdk` from a larger
  runner.

### D4: Scrub provider docs metadata in place; do not regenerate providers

- **Choice**: Hand-edit the five affected `packages/utdk/*/package.json` files in the
  registry repo, rewriting `utdk.docs.{manifestPath,indexPath,docsPath}` to the
  repo-relative shape the bundler's tests codify (`.registry/<p>/manifest.json`,
  `.registry/<p>/index.md`, `packages/utdk/<p>/docs`). Aprovan's copies die with the fork.
- **Alternatives**:
  - *Regenerate the five providers through the bundler* — churns generated client code for
    a metadata-only fix and needs provider specs/docs infra (`.registry/` was purged in
    WS-1);
  - *Delete the `utdk.docs` block entirely* — also safe (no readers), but the fields are
    the bundler's documented output shape and keeping them relative preserves information
    at zero cost.
- **Revisit if**: a consumer of `utdk.docs.*` appears — then the paths must be made
  meaningful (the cache no longer exists), not merely relative.

### D5: aprovan consumes exact published versions via standard semver ranges

- **Choice**: `server/workspace`: `@utdk/agent ^0.2.0`, `@utdk/llm ^0.2.0`,
  `@utdk/sandbox ^0.2.0`, `@utdk/common ^0.1.0`, `@utdk/mcp-core ^0.1.0`, `utdk ^0.1.0`,
  `@aprovan/registry-server ^0.1.1`; `client/web`: `@aprovan/runtime ^0.1.0`. Delete the
  root `pnpm.overrides` for `@utdk/common`/`@utdk/mcp-core` (they existed to dedupe the
  fork's copies; npm resolution of consistent ranges makes them moot).
- **Alternatives**: *Exact pins* — fights the repo's existing convention (caret ranges
  everywhere) and turns every registry patch into an aprovan commit; the committed
  lockfile already gives reproducibility.
- **Revisit if**: an execution-plane release breaks aprovan through a caret upgrade —
  then pin at the lockfile level (which already happens) or tighten ranges.

### D6: Fork deletion is wholesale, in one aprovan commit after npm resolution is proven

- **Choice**: One branch: switch dependencies to npm, delete the seven package trees,
  remove the `!packages/utdk/dist/**` glob, drop the overrides, fix `launch.json` and the
  Dockerfile comment, refresh the lockfile — landed only after `pnpm install` resolves
  everything from npm. `bundler` and `mcp` get no npm substitution (zero aprovan
  consumers, verified).
- **Alternatives**: *Package-by-package deletion* — each step re-resolves a half-forked
  graph (pnpm overrides + workspace globs interact), multiplying broken intermediate
  states for no review benefit at this size.
- **Revisit if**: never within this change; partial deletion recreates §0's split-brain.

### D7: launch.json points at `server/workspace` via pnpm filter

- **Choice**: `gateway-local-scratch` becomes
  `env APROVAN_ENV=off WORKSPACE_MODE=local WORKSPACE_PORT=4010 WORKSPACE_DATA_DIR=/tmp/patchwork-gateway-scratch
  pnpm --filter @aprovan/workspace exec tsx src/cli.ts start` (port 4010 unchanged) —
  repo-relative, same entrypoint contract (`src/cli.ts start` exists in
  `server/workspace`).
- **Alternatives**: *`pnpm --dir server/workspace`* — equivalent but path-anchored;
  filter-by-name survives future directory moves (WS-8 owns naming).
- **Revisit if**: `server/workspace` gains a dedicated `dev:scratch` script — then call
  that.

## Interfaces & Data

The seams here are package boundaries, not APIs:

- **Registry-server embedding option (upstreamed):**
  `CreateRegistryServerOptions.executorInstance?: ProviderExecutor` — when present, the
  server uses it verbatim (`options.executorInstance ?? new ProviderExecutor(...)`). This
  is the one API addition; `aprovan/server/workspace/src/registry-embed.ts` already
  consumes it and MUST compile unchanged against the published 0.1.1 types.
- **Provider resolution contract (unchanged, now cross-package):** the executor requires
  `utdk/registry.json` and lazy-imports `utdk/<provider>`; `server/workspace/src/toolCache.ts`
  and `workflows/runner.ts` also require `utdk/registry.json`. Both resolve through the
  npm-installed `utdk` package's `exports` map (`./registry.json`, `./*` subpaths) — no
  code change, only the resolution source moves.
- **Publish sets after this change:** registry `publish.yml` stable list =
  `@utdk/{common,sql,llm,sandbox,vcs,agent,keyvalue,events,vfs,telemetry,mcp-core}`,
  `utdk`, `@aprovan/runtime`, `@aprovan/registry-server` (minus
  `@aprovan/sandbox-image-node`). aprovan's `publish.yml` is untouched.
- **Version matrix consumed by aprovan** (all published before the aprovan branch lands):
  `@aprovan/registry-server@0.1.1`, `utdk@0.1.0`, `@aprovan/runtime@0.1.0`,
  `@utdk/{agent,llm,sandbox}@0.2.x`, `@utdk/{common,mcp-core}@0.1.x`.

## Risks / Trade-offs

- [`utdk` publish fails again in CI (heap/tsc)] → D3 moves its build into the workflow's
  build step with explicit filters; contingency: manual publish from a clean checkout, then
  fix CI before closing the change.
- [Published `utdk@0.1.0` content drifts from what the fork ran (fork lacked registry's
  removed contract subdirs; provider sources verified identical)] → the embedded-server
  smoke scenario (spec: execution-plane-consumption) exercises registry.json + provider
  import through the npm package before the fork deletion merges.
- [Hidden aprovan consumer of a forked package surfaces after deletion] → `pnpm install`
  + full build/typecheck on the deletion branch catches unresolved imports; investigation
  found zero consumers of forked `bundler`/`mcp` (grep evidence in findings).
- [Registry lockfile refresh accidentally bumps unrelated resolutions] → run
  `pnpm install` with no manifest edits except the intended ones; review the lock diff for
  importer-key removals plus the new/changed packages only.
- [aprovan CI (frozen lockfile) races the registry publishes] → strict ordering in
  Rollout; the aprovan branch is not mergeable until the version matrix is on npm.
- [Local checkouts keep untracked husk dirs (`registry/apps/workspace` etc.) that mask
  fresh-clone failures] → all verify commands in tasks run against fresh clones or
  `git clean -fdx` trees, not developer checkouts.

## Rollout

1. **Registry branch A (reconcile + hygiene):** port the 3-file deltas; scrub the five
   provider manifests; fix `publish.yml` (utdk build, `@aprovan/runtime`, drop
   sandbox-image-node); remove the `infra` glob; refresh `pnpm-lock.yaml`; bump
   registry-server to 0.1.1. Merge → CI publishes `utdk@0.1.0`, `@aprovan/runtime@0.1.0`,
   `@aprovan/registry-server@0.1.1`.
2. **Verify npm (gate):** clean-room `npm install @aprovan/registry-server` + tarball
   `/Users/` grep. Nothing in aprovan proceeds until this is green.
3. **aprovan branch (consume + delete):** dependency switch, fork deletion, overrides/glob
   removal, `launch.json`, Dockerfile comment, lockfile refresh; fresh-clone verify + image
   build + embedded-server smoke. Merge.
4. **Post-merge:** fresh-clone verify of both repos (the exit criterion); IW-1 and IW-3
   are unblocked.

Rollback: step 3 is a single revertable commit; npm publishes are additive (deprecate,
never unpublish) so no registry rollback is needed.

## Open Questions

(Mirrors PRD; recommendations restated as the plan's defaults.)

1. Catalog fallback upstreamed verbatim (D1) — flag to owner, default **yes**.
2. Reconciled version 0.1.1 (D2) — default **patch**.
3. `@aprovan/runtime` published rather than early-deleting playground code (D3/D5) —
   default **publish**; IW-4 removes the dependency later.
