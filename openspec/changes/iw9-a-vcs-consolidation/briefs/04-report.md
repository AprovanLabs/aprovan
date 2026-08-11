# Stream 4 report — DiffViewer + ChangeList stack

**Branch:** `feat/iw9-a-diff-stack`  
**Worktree:** `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-a-diff`  
**Status:** implemented; tasks 4.1–4.3 checked off

## What landed

- **`@codemirror/merge`** added to `packages/editor` only (not root).
- **`DiffViewer`** (`packages/editor/src/components/DiffViewer.tsx`):
  before/after panes with plain-language labels; split / unified / auto
  (narrow viewport); loading skeletons; added/removed one-side states;
  binary/oversize copy; per-side error + retry; optional Open file.
- **`ChangeList`** (`client/web/src/components/ChangeList.tsx`): shared
  new/edited/removed word-chip vocabulary (no `+/~/−`), full-path
  `title` tooltip, collapse behind “Show all N”, host `onOpen`.
- **`SaveAffordance`**: draft review dialog accepts `renderChangeList`
  render prop/slot (D5 — editor does not import client/web). Path-only
  fallback until stream 6 injects `ChangeList`.

## Verify

```
cd packages/editor && pnpm typecheck && pnpm test   # pass (26 tests)
cd ../../client/web && pnpm typecheck               # pass
```

## Deviations

- **`pnpm-lock.yaml`** updated (required by `pnpm add @codemirror/merge`).
- **`DiffViewer` not re-exported** from `packages/editor/src/index.ts`
  (outside Touches list). Streams 5–6 should add the export when wiring
  History / MergeDialog consumers.
- **Five former ChangeList call sites** (SessionBar, ChatDock,
  SessionsPanel, SandboxesPanel, SaveAffordance host) not migrated —
  stream 6 ownership. SaveAffordance seam is ready.

## Owner constraints honored

- No HistoryPanel / MergeDialog work.
- Touches limited to package.json, DiffViewer, SaveAffordance,
  ChangeList, tasks.md, brief/report (+ lockfile).
