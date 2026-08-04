# Report: editor-consolidation (streams 1–8)

**Date:** 2026-08-04  
**Aprovan PR:** https://github.com/AprovanLabs/aprovan/pull/84  
**Registry PR:** https://github.com/AprovanLabs/registry/pull/122

## Stream checklist

| Stream | Status | Notes |
|--------|--------|-------|
| 1 Injected Checker seam | Done | `Checker`/`Diagnostic` on `@aprovan/patchwork`; `runTypecheck` before esbuild; tests in `checker-seam.test.ts` |
| 2 Highlighter + editable surface | Done | Shared Shiki `highlighter` + unified `CodeBlockView`/`CodeEditor` in `@aprovan/editor`; registry regex tokenizer + local `CodeEditor` deleted |
| 3 Composition + save | Done | `UnifiedCodeEditor` + `SaveAffordance`; `FileEditorPane`/`CodePreview` thinned; `SaveStateChip` removed |
| 4 Markdown pipeline | Done | TipTap only; `MessageParts`/`EditHistory` drop react-markdown; patches via `HighlightedCode` (diff) |
| 5 Per-project type env | Done | Moved to `@aprovan/editor/ts`; configurable `rootFiles`; dispose on teardown |
| 6 One type-bundle generator | Done | Shared `toPascalCase` + emit helpers; global `declare const tools`; on-demand provider mounts; registry mirrors helpers (cross-repo) |
| 7 Package move / release | Done | `@aprovan/editor` `./ts` entry; playground lazy-imports `@aprovan/editor/ts`; SW ignores `ts*.js`; `registry-ui/editor` thin re-export; entry-separation bundle assert |
| 8 Wire Checker | Done | `createChecker`/`createProjectChecker`; `useCompileChecker` → EditModalHost + TabContent/FileEditorPane; compile-before-preview only; `console.debug` latency |

## Verify

- `pnpm --filter @aprovan/patchwork test` — 73 passed
- `pnpm --filter @aprovan/editor test` — 26 passed
- `pnpm --filter @aprovan/patchwork-web typecheck` — green
- `pnpm --filter @aprovan/editor build` — green
- Registry: playground + highlighter consumers switched; `astro check` still reports pre-existing errors unrelated to this change

## Coordinated release note

Registry `apps/registry` depends on `@aprovan/editor` via a local `file:` path for sibling-worktree development. Before merging the registry PR, publish `@aprovan/editor@0.2.0` (with `./ts`) from the aprovan PR and pin that version (drop `file:`).

## Commits (aprovan)

- `bce5100` / `a4e7a40` — streams 1, 2 (aprovan), 5
- Follow-ups — streams 3, 4, 6, 7, 8 + this report
