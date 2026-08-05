# Report: tools-addressing §3 — Bind full registry into tools

## PR
- Registry: https://github.com/AprovanLabs/registry/pull/129
- Branch: `iw8/tools-addressing-03-bind`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta03`

## Verify

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta03
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm install   # required in fresh worktree
pnpm --filter @utdk/remote test
```

```
> @utdk/remote@0.1.2 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta03/packages/remote
> vitest run


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta03/packages/remote

 ✓ __tests__/remote.test.ts (22 tests) 10ms

 Test Files  1 passed (1)
      Tests  22 passed (22)
   Start at  21:37:55
   Duration  642ms (transform 365ms, setup 0ms, collect 367ms, tests 10ms, environment 0ms, prepare 50ms)
```

## Deviations
- **`deriveGlobalAlias` duplicated in `@utdk/remote`** — the package cannot depend on `@aprovan/utdk-bundler` (asserted by its own `package constraints` test). `buildProviderAliasMap` mirrors the bundler algorithm so hosts can build a map from provider names until TA §2 publishes aliases from the catalog.
- **`parseScriptDependencies(source, aliases?)`** — alias resolution is opt-in via `ProviderAliasMap`; without a map, behavior is unchanged (identity passthrough). When a map is supplied, unknown scanned aliases throw `AliasResolutionError`.
- **`createToolsGlobal(aliases, transport)`** added alongside existing `createRuntimeGlobals` — the latter keys bindings by script identifier from parsed dependencies; the former builds the full ambient `tools` root for hosts that install every namespace (tools-global D3).

## Wave 1 notes
- TA §2 can publish `globalAlias` from `GET /tools/namespaces`; clients build `ProviderAliasMap` from that response instead of calling `buildProviderAliasMap`.
- GE §2 will edit `imports.ts` for bracket-access errors — changes are localized to `parseScriptDependencies` / `tools-scan.ts`; alias resolution in `namespacesToDependencies` and `createToolsGlobal` should rebase cleanly.
- Registry playground `sandbox.ts` still keys the iframe `tools` object by `dependency.provider` rather than `dependency.identifier`; wiring `createToolsGlobal` (or fixing the bootstrap) is a follow-up once the catalog alias map is available.
