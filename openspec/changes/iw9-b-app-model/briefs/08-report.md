# Report: 08 — Sidebar IA (Files + Apps launcher)

## What was built

Sidebar IA for iw9-b: **Files → Apps launcher → demoted Workspace**.

- **`AppsLauncher`** between Files and Workspace: one row per `apps.list`
  entry with `AppIconTile` (custom icon when projected, else F4
  `appIconFallback(slug)` letter+color).
- Row click → `openAppsTab({ kind: "app", … })` (app pane, never management).
- Apps header / settings affordance → `openNativeTab("apps")` (`native://apps`).
- **Workspace** section (existing `NATIVE_SURFACES.map`) defaults to
  **collapsed**; registry entries in `native-surfaces.tsx` unchanged
  (comment-only placement notes).
- States: skeletons while listing; "No apps yet" + create/install →
  management; inline retry on list failure; amber warning glyph on
  `reconcile.status === "error"`.

## Files

- `client/web/src/features/sidebar/AppIconTile.tsx` (new)
- `client/web/src/features/sidebar/AppsLauncher.tsx` (new)
- `client/web/src/features/sidebar/useAppsLauncher.ts` (new)
- `client/web/src/features/sidebar/WorkspaceSidebar.tsx`
- `client/web/src/lib/native-surfaces.tsx` (comments only)
- `client/web/src/pages/ChatPage.tsx` (minimal `openAppTab` / `activeAppKey` wire)
- `openspec/changes/iw9-b-app-model/tasks.md` (8.1–8.4 checked)

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck   # exit 0
```

No UI screenshots (headless agent; no interactive browser run).

## Deviations

1. **`ChatPage.tsx` prop wire** — outside the brief's Touches, but required
   so row click can call `openAppsTab` and highlight the active app. Two
   props only: `activeAppKey`, `openAppTab`.
2. **`appIconFallback` import** — F4 never added a package `exports`
   subpath; import is a relative path into
   `packages/ui/src/apps/app-icon.ts` (per F4-04 report guidance).
3. **Custom icon / reconcile on the wire** — `apps.list` already returns
   `reconcile`; `icon` / `declared.icon` are read when present but
   `describeApp` does not yet project `icon` (directory does). Launcher
   always has a fallback tile; custom icons light up when the gateway
   starts projecting them. Empty-state create/install opens management
   (`native://apps`); install/promote dialogs are streams 9–11.

## Next wave

- Stream 9 can hang install/promote entry points off the launcher empty
  CTA / context menus without reshaping this section.
- Prefer adding `@aprovan/ui/apps` (or apps-store) export for
  `appIconFallback` so consumers drop the relative import.
- Project `icon` on `apps.list` / `normalizeApp` so custom icons reach the
  launcher without raw parsing.
