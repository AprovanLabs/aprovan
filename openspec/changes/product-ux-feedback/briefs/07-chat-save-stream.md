# Brief: Chat save / stream / staging / chrome dedupe

## Mission
Chat must not silently overwrite root `main.tsx`. Widget generation streams visibly (not only under Thinking). Save is opt-in with suggested path. Staging→Apply copy is clear. Fix broken chat code renderer host. Dedupe double chat icon and redundant filename in file pane.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,ux,tech-plan,tasks}.md` (D4, D5)
- `client/web/src/features/chat/MessageParts.tsx`
- `client/web/src/features/chat/chat-transport.ts`
- `client/web/src/features/widgets/**`
- `client/web/src/components/SessionBar.tsx`
- `client/web/src/features/tabs/TabContent.tsx`
- `packages/compiler` entry path defaults (understand main.tsx pressure — don’t change compiler unless required; fix chat host)

## Tasks
- [ ] 7.1 Stop default writes to root `main.tsx`; Save offer with suggested `widgets/<slug>/main.tsx`.
- [ ] 7.2 Stream widget/code fences into visible artifact UI.
- [ ] 7.3 Fix ChatArtifactBlock blank render (editor themes are stream 5 — don’t restyle shiki here).
- [ ] 7.4 Clarify SessionBar staged → Apply copy.
- [ ] 7.5 Dedupe chat icon / redundant in-pane filename.

## Acceptance criteria
Scenarios under chat-artifact-save, chat-stream-visibility, code renderer, chrome-dedupe, staging clarity in `specs/product-ux-feedback/spec.md`.

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web exec vitest run src/features/chat
```

## Constraints
- Branch: `pux/chat-save-stream`
- Touches only stream 7 paths
- Open PR

## Report back
PR + how save offer works + streaming approach.
