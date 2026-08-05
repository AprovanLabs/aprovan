# Report: tools-addressing §2 — Publish alias in catalog

## PR
- Registry: https://github.com/AprovanLabs/registry/pull/130
- Branch: `iw8/tools-addressing-02-catalog`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta02`

## Verify

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta02
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm install   # required in fresh worktree
pnpm turbo run build --filter=@aprovan/registry-server^...
pnpm --filter @aprovan/registry-server test -- catalog
```

```
> @aprovan/registry-server@0.2.2 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta02/packages/registry-server
> vitest run catalog


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta02/packages/registry-server

 ✓ tests/catalog.test.ts (7 tests) 204ms

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  21:38:33
   Duration  996ms (transform 214ms, setup 0ms, collect 548ms, tests 204ms, environment 0ms, prepare 39ms)
```

**§2.2 grep:** `globalAlias` appears only in `catalog/global-alias.ts` and `http/discovery.ts` (read-only derivation). No matches in `profiles/`, `storage/` (grants), `credentials/`, or `dispatch/`.

## Deviations
- **`routes/tools.ts` → `http/discovery.ts`:** Namespace catalog logic lives in `DiscoveryService.namespaces()` (ported from the old `routes/tools.ts` path cited in tasks). No separate `routes/tools.ts` file exists.
- **`name` field added:** `NamespaceInfo` already used `id` as the stable key; added explicit `name` (same value as `id`) per tech-plan alongside `globalAlias` without removing `id` (existing clients).
- **Bundler export:** Added `@aprovan/utdk-bundler/naming` subpath export so registry-server imports `deriveGlobalAlias` from the single naming authority rather than duplicating logic.
- **Fresh worktree** required `pnpm install` and `pnpm turbo run build --filter=@aprovan/registry-server^...` before verify.

## Wave 1 notes (TA §3/§5)
- `GET /tools/namespaces` now returns `{ id, name, globalAlias, kind, … }` for every visible namespace (core, interface, provider, llm-alias).
- Clients can build `globalAlias → name` from one catalog response for connected namespaces; §3 (`@utdk/remote`) still needs alias resolution at dependency-build time for the full registry.
- LLM alias ids with dots (e.g. `synthetic.new`) derive via the same `deriveGlobalAlias` — dots are not slash segments, so alias may differ from sandbox underscore fallback (`synthetic_new`); provider slash names are the primary case.
