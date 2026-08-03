# Brief: Editor dark theme + markdown default + Edit label

## Mission
Code/raw editors must not be bright white in dark mode. Markdown defaults to rich preview. Workspace tree action says “Edit”.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,ux,tech-plan,tasks}.md`
- `packages/editor/src/components/edit/CodeBlockView.tsx` (currently `github-light` only)
- `packages/editor/src/components/edit/fileTypes.ts`
- `packages/editor/src/components/CodePreview.tsx`, `MarkdownPreview.tsx`
- `packages/editor/src/components/edit/WorkspaceTree.tsx` (`openInEditorTitle` default)
- In-flight `openspec/changes/editor-direct-edit` — reuse if `defaultView` already exists; don’t regress it

## Tasks
- [ ] 5.1 Theme-aware shiki (dark → github-dark; light → github-light); CodePreview must not force light canvas.
- [ ] 5.2 Ensure `.md` `defaultView: "rich"` (finish gaps only).
- [ ] 5.3 Default `openInEditorTitle` to `"Edit"`.

## Acceptance criteria
#### Scenario: Dark code canvas / Markdown rich default / Edit label — as in specs/product-ux-feedback/spec.md

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-editor build
rg -n "github-dark|defaultView" packages/editor/src
! rg -n "Open in editor" packages/editor/src/components/edit/WorkspaceTree.tsx
```

## Constraints
- Branch: `pux/editor-theme` from latest main (or origin/main)
- Touches only packages/editor paths listed in tasks stream 5
- Open PR

## Report back
PR URL + notes on theme detection approach.
