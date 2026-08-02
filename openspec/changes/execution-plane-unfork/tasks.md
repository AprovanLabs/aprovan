# execution-plane-unfork — Tasks

_Repo roots: `aprovan` = /Users/jacob/Documents/Code/AprovanLabs/aprovan,
`registry` = /Users/jacob/Documents/Code/AprovanLabs/registry. Streams 1–3 run in the
registry repo and MUST land and publish before streams 4 and 6 start (tech-plan Rollout).
Fresh-clone verifies MUST use a real fresh clone (or `git clean -fdx` worktree) — developer
checkouts contain untracked husk dirs that mask failures._

## 1. Registry: reconcile the fork's registry-server deltas

> Depends-on: - | Touches: registry/packages/registry-server/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server build && pnpm --filter @aprovan/registry-server typecheck && pnpm --filter @aprovan/registry-server test

- [ ] 1.1 Port the `executorInstance?: ProviderExecutor` option from
      `aprovan/packages/registry-server/src/config/types.ts` into
      `registry/packages/registry-server/src/config/types.ts`, and the
      `options.executorInstance ?? new ProviderExecutor(options.executor ?? {})` wiring
      into `src/server.ts` — verbatim per tech-plan D1 (spec: registry-publish-integrity /
      "Embedding host can share its executor").
- [ ] 1.2 Port the monorepo-contracts fallback (`existsSync`-guarded
      `import.meta.dirname → ../../../../packages/contracts`) from
      `aprovan/packages/registry-server/src/catalog/default.ts` into the registry copy,
      verbatim (tech-plan D1).
- [ ] 1.3 Bump `registry/packages/registry-server/package.json` to `0.1.1` (tech-plan D2).
- [ ] 1.4 Confirm reconciliation is a superset:
      `diff -r aprovan/packages/registry-server/src registry/packages/registry-server/src`
      shows `catalog/default.ts`, `config/types.ts`, and `server.ts` byte-identical (spec:
      registry-publish-integrity / "Reconciled files match the fork's behavior").
      Verify: `diff -q aprovan/packages/registry-server/src/server.ts registry/packages/registry-server/src/server.ts && diff -q aprovan/packages/registry-server/src/config/types.ts registry/packages/registry-server/src/config/types.ts && diff -q aprovan/packages/registry-server/src/catalog/default.ts registry/packages/registry-server/src/catalog/default.ts`

## 2. Registry: manifest scrub, publish list, workspace/lockfile hygiene

> Depends-on: - | Touches: registry/packages/utdk/*/package.json, registry/pnpm-workspace.yaml, registry/pnpm-lock.yaml, registry/.github/workflows/publish.yml | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && grep -rn "/Users/" packages/utdk --include=package.json | grep -v node_modules | grep -v /dist/ | wc -l | grep -qx 0 && pnpm install --frozen-lockfile

- [ ] 2.1 Rewrite `utdk.docs.{manifestPath,indexPath,docsPath}` in
      `registry/packages/utdk/{anthropic,figma,gemini,github,posthog}/package.json` to
      repo-relative form (`.registry/<p>/manifest.json`, `.registry/<p>/index.md`,
      `packages/utdk/<p>/docs`) per tech-plan D4 (spec: registry-publish-integrity /
      "Repo grep is clean").
- [ ] 2.2 Fix `registry/.github/workflows/publish.yml` per tech-plan D3: ensure `utdk` is
      built in the workflow's build step (add `--filter utdk` with adequate
      `NODE_OPTIONS`), add `@aprovan/runtime` to the build filters and stable list, remove
      the stale `@aprovan/sandbox-image-node` entry (spec: registry-publish-integrity /
      "@aprovan/runtime is published", "utdk meta-package is on npm").
- [ ] 2.3 Remove the dead `infra` glob from `registry/pnpm-workspace.yaml`; run
      `pnpm install` and commit the refreshed `pnpm-lock.yaml`, reviewing the diff to
      confirm it only removes stale importers (`apps/workspace`, `infra`,
      `packages/{aprovan-cli,registry-main,registry-ui,sandbox-bashkit,sandbox-host,sandbox-image-node,utdk-isolate}`,
      `packages/utdk/{agent,llm,sql,sandbox,vcs}`) plus intended dependency changes (spec:
      registry-publish-integrity / "No stale importers").
      Verify: `git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree add /tmp/reg-fresh HEAD && cd /tmp/reg-fresh && pnpm install --frozen-lockfile; rc=$?; git -C /Users/jacob/Documents/Code/AprovanLabs/registry worktree remove --force /tmp/reg-fresh; exit $rc`
- [ ] 2.4 Dry-run tarball leak check: `pnpm --filter utdk exec npm pack --dry-run 2>&1 |
      grep -c "/Users/"` returns 0, and repeat for `@aprovan/registry-server` (spec:
      registry-publish-integrity / "Tarball grep is clean").

## 3. Registry: publish and gate on npm installability

> Depends-on: 1, 2 | Touches: (no source — CI run + npm state) | Verify: T=$(mktemp -d) && cd $T && npm init -y >/dev/null && npm install @aprovan/registry-server@^0.1.1 @aprovan/runtime utdk && node -e "require.resolve('utdk/registry.json'); console.log('ok')"

- [ ] 3.1 Merge streams 1–2 to registry `main`; run the publish workflow
      (`gh workflow run publish.yml -R AprovanLabs/registry` or via the push trigger) and
      confirm it exits green with `utdk@0.1.0`, `@aprovan/runtime@0.1.0`, and
      `@aprovan/registry-server@0.1.1` published. If `utdk` fails in CI, apply tech-plan
      D3's contingency (manual publish from a clean checkout, then fix CI before closing).
      Verify: `npm view utdk version && npm view @aprovan/runtime version && npm view @aprovan/registry-server version | grep -qx 0.1.1`
- [ ] 3.2 Clean-room installability gate (spec: registry-publish-integrity / "Clean-room
      install"): in a fresh temp dir, `npm install @aprovan/registry-server` succeeds and
      the package loads. Streams 4 and 6 are blocked until this passes.
- [ ] 3.3 Fresh-clone registry exit criterion (spec: registry-publish-integrity / "Fresh
      registry clone is green").
      Verify: `T=$(mktemp -d) && git clone https://github.com/AprovanLabs/registry $T/registry && cd $T/registry && pnpm install && pnpm build && pnpm typecheck && pnpm test`

## 4. Aprovan: switch to npm and delete the fork

> Depends-on: 3 | Touches: aprovan/packages/{utdk,contracts,runtime,bundler,mcp,mcp-core,registry-server}/**, aprovan/server/workspace/package.json, aprovan/server/workspace/Dockerfile, aprovan/client/web/package.json, aprovan/package.json, aprovan/pnpm-workspace.yaml, aprovan/pnpm-lock.yaml | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm install && pnpm build && pnpm typecheck && pnpm test

- [ ] 4.1 Repoint dependencies to npm semver (tech-plan D5): in
      `server/workspace/package.json` set `@utdk/agent ^0.2.0`, `@utdk/llm ^0.2.0`,
      `@utdk/sandbox ^0.2.0`, `@utdk/common ^0.1.0`, `@utdk/mcp-core ^0.1.0`,
      `utdk ^0.1.0`, `@aprovan/registry-server ^0.1.1`; in `client/web/package.json` set
      `@aprovan/runtime ^0.1.0` (spec: execution-plane-consumption / "Execution-plane
      dependencies resolve from npm only").
- [ ] 4.2 Remove the root `package.json` `pnpm.overrides` entries for `@utdk/common` and
      `@utdk/mcp-core` (tech-plan D5).
- [ ] 4.3 Delete `packages/utdk`, `packages/contracts`, `packages/runtime`,
      `packages/bundler`, `packages/mcp`, `packages/mcp-core`,
      `packages/registry-server`; remove the `!packages/utdk/dist/**` glob from
      `pnpm-workspace.yaml` (tech-plan D6; spec: execution-plane-consumption / "Forked
      directories are gone").
- [ ] 4.4 Update the vendoring rationale comment at the top of
      `server/workspace/Dockerfile` to state execution-plane packages come from npm via
      the committed lockfile; no build-instruction changes expected (spec:
      execution-plane-consumption / "Workspace image builds").
- [ ] 4.5 Run `pnpm install` and commit the refreshed `aprovan/pnpm-lock.yaml`; confirm
      via `grep` that no `workspace:*` reference to `utdk`, `@utdk/*`,
      `@aprovan/registry-server`, or `@aprovan/runtime` remains (spec:
      execution-plane-consumption / "No workspace links to the execution plane").
      Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && ! git grep -n "workspace:\*" -- "**/package.json" | grep -E "utdk|registry-server|@aprovan/runtime"`
- [ ] 4.6 Embedded-server smoke against npm packages (spec: execution-plane-consumption /
      "Embedded registry server still works"): start the local gateway and dispatch one
      tool call through the embedded registry server, exercising `utdk/registry.json`
      resolution and `executorInstance` sharing.
      Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- --run src/registry-embed` (or the repo's equivalent embed test suite; at minimum `APROVAN_ENV=off WORKSPACE_MODE=local WORKSPACE_PORT=4010 WORKSPACE_DATA_DIR=$(mktemp -d) timeout 30 pnpm --filter @aprovan/workspace exec tsx src/cli.ts start & sleep 8 && curl -fsS http://localhost:4010/health`)

## 5. Aprovan: launch configuration

> Depends-on: - | Touches: aprovan/.claude/launch.json | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && ! grep -n "AprovanLabs/registry" .claude/launch.json && python3 -m json.tool .claude/launch.json >/dev/null

- [ ] 5.1 Rewrite the `gateway-local-scratch` configuration to launch aprovan's own
      server per tech-plan D7: `env APROVAN_ENV=off WORKSPACE_MODE=local
      WORKSPACE_PORT=4010 WORKSPACE_DATA_DIR=/tmp/patchwork-gateway-scratch pnpm --filter
      @aprovan/workspace exec tsx src/cli.ts start`, port 4010 unchanged (spec:
      execution-plane-consumption / "Scratch gateway launches from aprovan").

## 6. Exit criteria: fresh-clone verification of both repos

> Depends-on: 3, 4, 5 | Touches: (no source — verification only) | Verify: see 6.1–6.3

- [ ] 6.1 Fresh aprovan clone with no sibling checkout is green (spec:
      execution-plane-consumption / "Fresh aprovan clone is green").
      Verify: `T=$(mktemp -d) && git clone https://github.com/AprovanLabs/aprovan $T/aprovan && cd $T/aprovan && pnpm install && pnpm build && pnpm typecheck && pnpm test`
- [ ] 6.2 Workspace image builds from the fresh clone (spec:
      execution-plane-consumption / "Workspace image builds").
      Verify: `cd $T/aprovan && docker build -f server/workspace/Dockerfile .`
- [ ] 6.3 No absolute checkout paths remain in either repo (specs: both / grep scenarios).
      Verify: `cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && ! git grep -n "/Users/" && cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! git grep -n "/Users/" -- "packages/utdk"`
