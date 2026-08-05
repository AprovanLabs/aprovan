# Report: tools-addressing §1 — Naming authority

## PR
- Registry: https://github.com/AprovanLabs/registry/pull/127
- Branch: `iw8/tools-addressing-01-naming`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta01`

## Verify

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta01
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm install   # required in fresh worktree
pnpm --filter @utdk/common build   # required for index.test.ts
pnpm --filter @aprovan/utdk-bundler test
```

```
> @aprovan/utdk-bundler@0.1.1 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta01/packages/bundler
> vitest run


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta01/packages/bundler

 ✓ src/verification/scorecard.test.ts (34 tests) 35ms
 ✓ src/render.test.ts (28 tests) 20ms
 ✓ src/client-api.test.ts (13 tests) 6ms
 ✓ src/phases/enrich.test.ts (23 tests) 150ms
 ✓ src/phases/ship.test.ts (18 tests) 218ms
 ✓ src/openapi.test.ts (9 tests) 18ms
 ✓ src/utcp.test.ts (17 tests) 5ms
 ✓ src/phases/review.test.ts (7 tests) 85ms
 ✓ src/naming.test.ts (22 tests) 55ms
 ✓ src/provider-output-schemas.test.ts (1 test) 34159ms
   ✓ provider-output-schemas > does not declare return types sourced from non-2xx response bodies 34159ms
 ✓ src/phases/research.test.ts (7 tests) 95ms
 ✓ src/docs/load.test.ts (1 test) 32ms
 ✓ src/index.test.ts (3 tests) 89ms
 ❯ src/catalog.test.ts (2 tests | 1 failed) 23ms
   × provider catalogue > advertises every provider that exists 8ms
     → expected [ 'dynamodb-kv', 'sqs' ] to deeply equal []
 ✓ src/docs/augment.test.ts (2 tests) 7ms
 ✓ src/provider.test.ts (5 tests) 2ms
 ✓ src/docs/manifest.test.ts (3 tests) 5ms
 ✓ src/docs/discover.test.ts (1 test) 2ms
 ✓ src/docs/hash.test.ts (3 tests) 7ms
 ✓ src/docs/validate.test.ts (1 test) 9ms
 ✓ src/docs/grouping.test.ts (1 test) 7ms
 ✓ src/docs/prompt.test.ts (1 test) 1ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/catalog.test.ts > provider catalogue > advertises every provider that exists
AssertionError: expected [ 'dynamodb-kv', 'sqs' ] to deeply equal []

- Expected
+ Received

- Array []
+ Array [
+   "dynamodb-kv",
+   "sqs",
+ ]

 ❯ src/catalog.test.ts:99:21
     97|       (name) => !catalogued.has(name) && !DELIBERATELY_UNCATALOGUED.ha…
     98|     );
     99|     expect(missing).toEqual([]);
       |                     ^
    100|   });
    101| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed | 21 passed (22)
      Tests  1 failed | 201 passed (202)
   Start at  21:33:03
   Duration  38.44s (transform 215ms, setup 0ms, collect 690ms, tests 35.03s, environment 2ms, prepare 665ms)

/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta01/packages/bundler:
 ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  @aprovan/utdk-bundler@0.1.1 test: `vitest run`
Exit status 1
```

**§1 status:** PASS — all 22 `naming.test.ts` tests green; `loadRegistryProviders` loads 2566 providers with unique valid aliases. One pre-existing `catalog.test.ts` failure is unrelated to this stream.

## Deviations
- **Registry data fix (separate commit):** Two alias collisions surfaced at load time and were resolved by renaming the less-canonical entry in each pair:
  - `azure/recoveryservices-backup` → `azure/recoveryservices-backup-rs` (collided with `azure/recoveryservicesbackup`)
  - `vtex/master-data-api` → `vtex/master-data-api-v2` (collided with `vtex/masterdata-api`)
- **`deriveGlobalAlias` exported** (not in tech-plan interface block) so tests and Wave 1 streams can derive aliases without hostname resolution.
- **Fresh worktree** required `pnpm install` and `pnpm --filter @utdk/common build` before the full verify command succeeded.

## Wave 1 notes (TA §2/§3)
- Import `deriveGlobalAlias` from `@aprovan/utdk-bundler` / `packages/bundler/src/naming.ts` to build alias→canonical maps.
- `ResolvedProviderName.globalAlias` is populated in `resolveProviderNameFromHostname`; registry load validates uniqueness via `assertUniqueGlobalAliases` on canonical `name` strings only — alias is never stored.
- Renamed providers (`azure/recoveryservices-backup-rs`, `vtex/master-data-api-v2`) are canonical registry keys; any existing references to the old names need updating if they exist outside generated clients.
