# Stream 5 report: lazy type acquisition by alias

## Status
**DONE** — PR open (not merged).

## Built
- Added `packages/editor/src/ts/lazy-types.ts`:
  - `buildAliasMapFromCatalog` — builds `globalAlias → name` from `GET /tools/namespaces` rows (§2 catalog; no derivation).
  - `resolveScannedAliasesForTypes` — resolves scanned aliases to canonical providers; unknown aliases omitted (cache miss, never throws).
  - `mountLazyProviderTypes` — scans source via `@utdk/remote/tools-scan`, resolves through catalog, mounts `.d.ts` via `resolveOnDemandProviderMounts` for referenced providers only.
- Re-exported from `@aprovan/editor/ts` (`packages/editor/src/ts/index.tsx`).
- Tests in `packages/editor/src/ts/__tests__/type-environment.test.ts` (§5.3 + cache-miss + no full-catalog prefetch).

## Verified
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-ta05
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm turbo run build --filter=@aprovan/patchwork --filter=@aprovan/editor
pnpm --filter @aprovan/editor test -- type-environment
pnpm --filter @aprovan/editor typecheck
```

```
> @aprovan/editor@0.2.0 test
 ✓ src/ts/__tests__/type-environment.test.ts (8 tests) 42ms

> @aprovan/editor@0.2.0 typecheck
 (no errors)
```

## Design notes
- **Alias resolution is type-loading only** — unlike `@utdk/remote`'s `parseScriptDependencies` (which throws `AliasResolutionError` for unknown aliases when a map is supplied), the editor path skips unresolvable aliases per D3.
- **Fetch keyed by scan, not catalog** — `fetchBundle` runs only for canonical names derived from aliases found in source; the catalog map is never iterated to prefetch types.
- **Host wiring** — registry playground can adopt `mountLazyProviderTypes` + `buildAliasMapFromCatalog` in a follow-up; this PR delivers the shared editor primitive.

## Files touched
- `packages/editor/src/ts/lazy-types.ts` (new)
- `packages/editor/src/ts/index.tsx` — re-exports
- `packages/editor/src/ts/__tests__/type-environment.test.ts` — §5 tests
- `openspec/changes/tools-addressing/tasks.md` — §5 checked off

## Branch / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-ta05`
- Branch: `iw8/tools-addressing-05-types`
