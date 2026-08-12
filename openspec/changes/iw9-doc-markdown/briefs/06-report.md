# Report: Client — CollabMarkdownEditor (Stream 6)

## What was built

New CM6 host in `@aprovan/editor` bound to `Y.Text("content")` + awareness
via `y-codemirror.next`'s `yCollab`. TipTap `MarkdownEditor` and Shiki
`CodeBlockView` were not modified.

| File | Role |
| --- | --- |
| `packages/editor/src/lib/yjs-cm6.ts` | `YJS_CONTENT_KEY`, seed/awareness helpers, `createCollabEditorView`, `syncDocsLoopback` |
| `packages/editor/src/components/CollabMarkdownEditor.tsx` | CM6 host (`basicSetup`/`EditorView`/`EditorState`/`Compartment`); `readOnly` → `MarkdownPreview` only |
| `packages/editor/src/index.ts` | Public exports for stream 7 |
| `packages/editor/src/__tests__/collab-markdown-editor.test.ts` | Local CM6→Yjs round-trip, two-doc loopback convergence, readOnly never mounts CM6 |

### Export path for stream 7

```ts
import {
  CollabMarkdownEditor,
  type CollabMarkdownEditorProps,
  YJS_CONTENT_KEY,       // "content"
  getContentText,        // doc.getText("content")
  type CollabUserInfo,
} from "@aprovan/editor";
```

Props: `{ doc, awareness, userInfo: { name, color }, initialContent, readOnly?, className?, minHeight?, ariaLabel? }`.

## Verify

```bash
pnpm --filter @aprovan/editor test && pnpm --filter @aprovan/editor typecheck
```

- `pnpm --filter @aprovan/editor test` — **29/29 passed** (incl. 3 new collab tests).
- `pnpm --filter @aprovan/editor typecheck` — exit 0.
- Fresh worktree: build `@aprovan/patchwork` first (`pnpm turbo run build --filter=@aprovan/editor^...`), then `pnpm --filter @aprovan/editor build` so `entry-separation` can read `dist/index.js`.

## Deviations

None material from the brief.

- Extra optional props `className` / `minHeight` / `ariaLabel` mirror `TsScriptEditor` for host chrome; core props match the brief.
- Also exported `YJS_CONTENT_KEY` + `getContentText` so stream 7 does not re-hardcode `"content"`.

## Notes for next wave

- Stream 7 should import `CollabMarkdownEditor` from `@aprovan/editor` (main entry, not `./ts`).
- Live mode seeds empty `Y.Text("content")` from `initialContent` once; if the server already seeded, client seed is a no-op (`length === 0` guard).
- `readOnly` still accepts `doc`/`awareness`/`userInfo` (brief prop shape) but ignores them and never mounts CM6 — anonymous share can pass stubs or stream 7 can gate construction.
- Cursor/awareness CSS from `y-codemirror.next` is not bundled here; stream 7/web may need the package's remote-selection styles for visible remote cursors (stream 11 E2E).
