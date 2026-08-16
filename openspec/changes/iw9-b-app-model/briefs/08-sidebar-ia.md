# Brief: Client — Sidebar IA (Files + Apps launcher)

## Mission

Sidebar shows an **Apps** launcher (icon tiles via custom icon or F4
`appIconFallback`) between Files and demoted native surfaces. Row click opens
the app pane; management lives under the Apps header affordance →
`native://apps`. Native surfaces move behind a collapsed **Workspace**
section. Loading/empty/error states per ux.md.

## Read first

1. `openspec/changes/iw9-b-app-model/ux.md` (Sidebar)
2. `openspec/changes/iw9-b-app-model/specs/app-launcher/spec.md`
3. `openspec/changes/iw9-b-app-model/specs/apps-native-surface/spec.md`
4. `client/web/src/features/sidebar/**` (`WorkspaceSidebar.tsx`)
5. `client/web/src/lib/native-surfaces.tsx` (registry — do not change entries)
6. F4 `appIconFallback` in `packages/ui`

## Tasks

Copy 8.1–8.4 from `tasks.md` verbatim.

> Depends-on: 6 | Touches: features/sidebar/**, lib/native-surfaces.tsx
> (placement only — no registry entry changes)

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Do not change `NATIVE_SURFACES` registry entries — only where sidebar renders them.
- No install/share/mount dialogs (streams 9–11).

## Report back

PR or `briefs/08-report.md`.
