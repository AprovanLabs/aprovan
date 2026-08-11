# Report: Client — Mounts management UI

## What was built

- **`client/web/src/components/mounts/**`**: Mounts panel (table + add form +
  remove confirmation) over `POST /tools/vcs/mounts.list|add|remove`. Shared
  `mountsStore` keeps list and tree badges in sync without a page reload.
  Distinct inline alerts for overlap (409) vs backend-unreachable (400).
  `MountReadOnlyBadge` + `useMountTreeTitles` for tree decoration.
- **Tree badge wiring**: `WorkspaceTree` gained a `mountTitles` prop (◌ glyph,
  "Mounted — read-only"); `WorkspaceSidebar` feeds it from the mounts store and
  refreshes the path list when prefixes change.
- **Native surface**: `native://mounts` registered so the panel is reachable
  under Workspace.

## How verified

```bash
pnpm --filter @aprovan/editor build
pnpm --filter @aprovan/patchwork-web typecheck
# ✓ exit 0
```

PR: https://github.com/AprovanLabs/aprovan/pull/201

Engine untouched: no edits under `server/workspace/src/vcs/mounts.ts`.

## Deviations

1. **`packages/editor/src/components/edit/WorkspaceTree.tsx`** — added
   `mountTitles` prop (pierre trees only support text decorations; badge
   lives in mounts package, tree only renders the glyph). Allowed by brief.
2. **`client/web/src/features/sidebar/WorkspaceSidebar.tsx`** — wires
   `useMountTreeTitles` + refreshes paths on mount-store changes (needed for
   11.2/11.3 without reload).
3. **`client/web/src/lib/native-surfaces.tsx`** — registered Mounts panel so
   the UI is operable (`native://mounts`). Outside strict Touches.
4. **Pre-submit backend reachability** (ux.md: disable Add until git ref / s3
   prefix resolves) — no validate-only procedure exists; Add stays enabled when
   the form is client-valid, and 400s surface as the unreachable/validation
   inline alert after submit.

## Notes

- Write-policy still sources mounts from path-keyed profiles; after mutations
  we call `invalidateStagedPrefixes()` so the next policy load refreshes. A
  follow-up should switch that loader to `vcs.mounts.list`.
