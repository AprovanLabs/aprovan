# Brief: Native Runtime / VCS / LLM

## Mission
Agent hosting, git hosting, and LLM appear as first-class native surfaces titled Runtime / VCS / LLM — not only buried under Interfaces.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,ux,tech-plan,tasks}.md` (D3)
- `client/web/src/lib/native-surfaces.tsx`
- `client/web/src/components/panels/InterfacesPanel.tsx`
- `client/web/src/components/ServicesMenu.tsx`
- `client/web/src/lib/namespaces.ts`

## Tasks
- [ ] 6.1 Add native surfaces Runtime / VCS / LLM; thin panels may filter Interfaces data to `agent` / `vcs` / `llm`.
- [ ] 6.2 Adjust ServicesMenu / namespace labels so these read as natives.

## Acceptance criteria
#### Scenario: Sidebar lists natives
- WHEN the workspace sidebar Workspace group renders
- THEN entries for Runtime, VCS, and LLM exist with human titles

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web build
```

## Constraints
- Branch: `pux/native-runtime-modules`
- Touches only paths in tasks stream 6
- Keep Interfaces panel for binding power users
- Open PR

## Report back
PR + how panels reuse Interfaces logic.
