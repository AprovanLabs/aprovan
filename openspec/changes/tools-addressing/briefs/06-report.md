# Report: tools-addressing §6 — Documentation

## PR
- Registry: https://github.com/AprovanLabs/registry/pull/131
- Branch: `iw8/tools-addressing-06-docs`
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta06`

## Verify

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta06
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm install   # required in fresh worktree
pnpm --filter @utdk/remote typecheck
```

```
> @utdk/remote@0.1.4 typecheck /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ta06/packages/remote
> tsc --noEmit
```

## Changes
- **`packages/remote/src/imports.ts`** — module docstring expanded per D3: scan is a type-loading hint (dynamic `tools[expr]` may leave the list incomplete); enforcement at `resolveProfile`. Transport segments `gql`/`mcp` noted as considered and rejected.

## Deviations
- None — docstring-only change; no runtime behavior modified.
