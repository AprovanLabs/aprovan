# Brief: Workspaces pane collapse

## Mission
Make the workspaces pane collapsible with persisted preference (user feedback). `SidebarApps` may already collapse “workspace” height — ensure the control the user means (workspaces switcher / tree region) actually collapses.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,ux,tasks}.md`
- `client/web/src/components/SidebarApps.tsx`
- `client/web/src/features/sidebar/WorkspaceSidebar.tsx`

## Tasks
- [ ] 8.1 Ensure workspaces region is collapsible with persisted state.

## Acceptance criteria
#### Scenario: Collapse persists
- WHEN the user collapses the workspaces pane and reloads
- THEN the pane remains collapsed until they expand it

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web typecheck
rg -n "collapsed|Collapse workspace" client/web/src/components/SidebarApps.tsx client/web/src/features/sidebar
```

## Constraints
- Branch: `pux/workspaces-collapse`
- Touches only stream 8 paths
- Open PR

## Report back
PR + which UI element was made collapsible.
