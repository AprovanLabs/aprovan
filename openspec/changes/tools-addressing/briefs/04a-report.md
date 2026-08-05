# Stream 4a report: scanner export from @utdk/remote

## Status
**DONE** — PR open (not merged).

## Built
- Added `"./tools-scan"` subpath export to `@utdk/remote` with `types` + `import` conditions pointing at `dist/tools-scan.{d.ts,js}`.
- Set `"sideEffects": false` on the package.
- Added `src/tools-scan.ts` as a separate `tsup` entry so the subpath is built independently of the main bundle.
- Ported missing `scanToolsAccess` test cases into `packages/remote/__tests__/remote.test.ts`:
  - `uses="…"` comment semantics (only source matters)
  - string-literal immunity (`"tools.github"` inside a string is ignored)
  - sort/dedup order (`["vfs", "zfs"]` from duplicates + reverse alpha)

## Verified
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta04a
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @utdk/remote test
```

```
> @utdk/remote@0.1.2 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta04a/packages/remote
> vitest run


 RUN  v2.1.5 /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta04a/packages/remote

 ✓ __tests__/remote.test.ts (21 tests) 9ms

 Test Files  1 passed (1)
      Tests  21 passed (21)
   Start at  21:36:44
   Duration  595ms (transform 312ms, setup 0ms, collect 320ms, tests 9ms, environment 0ms, prepare 36ms)
```

## Files touched
- `packages/remote/package.json` — `./tools-scan` export + `sideEffects: false`
- `packages/remote/tsup.config.ts` — `src/tools-scan.ts` entry
- `packages/remote/__tests__/remote.test.ts` — three `scanToolsAccess` cases

## Version / publish
- Current package version: **0.1.2** (unchanged in this PR).
- **Version bump required before npm publish:** `publish.yml` only publishes when `package.json` version is not already on npm. Merge alone will not ship the new export — bump to `0.1.3` (or next patch) on merge so Step B can `pnpm add @utdk/remote@<new>`.

## For §4 Step B
- Import path: `@utdk/remote/tools-scan`
- Exports: `scanToolsAccess`, `ToolsAccessScan`
- Wait for published `@utdk/remote@0.1.3+` before repointing editor.

## Branch / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta04a`
- Branch: `iw8/tools-addressing-04a-remote`
- PR: https://github.com/AprovanLabs/registry/pull/128
