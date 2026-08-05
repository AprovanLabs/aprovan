# Stream 4b report: editor scanner consolidation

## Status
**DONE** — PR open (not merged).

## Built
- Repointed `packages/editor/src/lib/code-extractor.ts` to re-export from `@utdk/remote/tools-scan`.
- Added `@utdk/remote@0.1.3` dependency to `@aprovan/editor`.
- Added `@utdk/remote` to editor `tsup.config.ts` `external` array.
- Deleted `packages/editor/src/lib/scan-tools-access.ts` and `packages/editor/src/lib/__tests__/scan-tools-access.test.ts`.
- Public API unchanged: `scanToolsAccess` and `ToolsAccessScan` still export from `packages/editor/src/index.ts`.

## Verified
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-ta04b
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm turbo run build --filter=@aprovan/patchwork --filter=@aprovan/editor
pnpm --filter @aprovan/editor test
pnpm --filter @aprovan/editor typecheck
```

```
> @aprovan/editor@0.2.0 test
 ✓ 7 test files, 22 tests passed

> @aprovan/editor@0.2.0 typecheck
 (no errors)
```

`@utdk/remote` test (registry sibling — not in aprovan repo):
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @utdk/remote test
```

```
> @utdk/remote@0.1.3 test
 ✓ __tests__/remote.test.ts (21 tests) 10ms
```

## Grep: single scanner definition
```bash
# aprovan worktree — no implementation
rg 'function scanToolsAccess|export function scanToolsAccess' packages/ client/

# registry — exactly one
rg 'function scanToolsAccess|export function scanToolsAccess' packages/
```

**aprovan:** no matches (editor re-exports only).  
**registry:** `packages/remote/src/tools-scan.ts:92` — sole implementation.

## tsup external
Built `dist/index.js` re-exports without bundling:
```
export { scanToolsAccess } from '@utdk/remote/tools-scan';
```

## Files touched
- `packages/editor/package.json` — `@utdk/remote@0.1.3`
- `packages/editor/src/lib/code-extractor.ts` — import from `@utdk/remote/tools-scan`
- `packages/editor/tsup.config.ts` — `@utdk/remote` external
- `pnpm-lock.yaml` — lock update
- Deleted: `scan-tools-access.ts`, `__tests__/scan-tools-access.test.ts`

## Branch / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw8-ta04b`
- Branch: `iw8/tools-addressing-04b-editor`
- PR: (filled after `gh pr create`)
