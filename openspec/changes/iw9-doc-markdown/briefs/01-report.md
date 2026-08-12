# Report: Dependencies — yjs, y-protocols, y-codemirror.next (Stream 1)

## What was built

Added CRDT / CM6 binding packages to `@aprovan/editor` `dependencies` only —
no application imports:

| Package | Range in manifest | Resolved |
| --- | --- | --- |
| `yjs` | `^13.6.32` | **13.6.32** |
| `y-protocols` | `^1.0.7` | **1.0.7** |
| `y-codemirror.next` | `^0.3.5` | **0.3.5** |

Existing CM6 peers that satisfy `y-codemirror.next` (`@codemirror/state@^6.0.0`,
`@codemirror/view@^6.0.0`, `yjs@^13.5.6`):

| Peer | Resolved |
| --- | --- |
| `@codemirror/state` | **6.7.1** |
| `@codemirror/view` | **6.43.6** |

Touched files: `packages/editor/package.json`, `pnpm-lock.yaml`.

## Verify

```bash
cd "$(git rev-parse --show-toplevel)" && pnpm install --frozen-lockfile && pnpm --filter @aprovan/editor typecheck
```

- `pnpm install --frozen-lockfile` — lockfile up to date, exit 0.
- `pnpm --filter @aprovan/editor typecheck` — exit 0 after building
  `@aprovan/patchwork` (`pnpm turbo run build --filter=@aprovan/editor^...`;
  turbo cache hit). Fresh worktrees need that dep build first (repo AGENTS.md).
- Peer resolution: `pnpm install` reported **no** peer warnings for
  `y-codemirror.next` / CM6 / yjs. Only pre-existing unrelated warning:
  `server/workspace` `@vitest/coverage-v8` vs `vitest@2.1.5`.

## Deviations

None from the brief. Manifest ranges use caret (`^`) to match the rest of
`@aprovan/editor` dependencies; lockfile pins the exact versions above.

## Notes for next wave

- Streams 2 (server live-doc registry) and 6 (CollabMarkdownEditor) can import
  `yjs` / `y-protocols` / `y-codemirror.next` from `@aprovan/editor`’s
  dependency graph once this lands.
- `y-codemirror.next@0.3.5` also pulls `lib0` as a transitive dependency.
- No registry-side work; packages are app-local deps, not published UTDK clients.
