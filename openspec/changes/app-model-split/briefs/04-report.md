# Stream 4 report — app-model client packages (apps-store + registry-ui)

**Branch:** `iw1/apps-client`  
**Worktree:** `/tmp/iw1-apps-client`  
**Status:** implemented; tasks 4.1–4.5 checked off

## What landed

- **`@aprovan/ui/apps-store`**: deleted Personal synthesis (`PERSONAL_APP_NAME` /
  `isPersonalApp` / `synthesizePersonalApp` / `builtin`). Wire parses `appId`,
  `originAppId`, `permalink`, `requires`, installs (`installId`, pin, bindings,
  editing, available), and directory entries. Catalog groups published apps,
  installations, and unbundled workflows under `Your flows (private)` —
  empty input yields an empty list (no synthesized card).
- **`registry-ui` `AppsPanel`**: new `variant="pane"` for in-pane list↔detail
  navigation (native surface host); Directory browse + install sheet; full
  variant keeps master/detail and adds directory section.
- **`app-detail`**: removed all Personal/`builtin` branches; header shows id
  permalink + lineage; Access tab gains Dependencies section; installations
  get Install settings (pin/update, bindings, config, editing toggle with
  overwrite warning).
- **`apps/directory.tsx`**: directory cards with dependency chips; install
  sheet with pin selector and per-contract profile rows (Install disabled
  until non-optional requirements are bound via `installBindingsReady`).
- **Tests**: wire round-trips for id/lineage/requires/install/directory;
  empty lists stay empty; install binding readiness.

## Verify

```
pnpm --dir packages/ui typecheck                    # pass
pnpm --dir packages/registry-ui typecheck           # pass
pnpm --dir packages/registry-ui test                # 29 passed
! grep -rn "PERSONAL_APP_NAME\|personalApp\|builtin" \
  packages/ui/src/apps-store packages/registry-ui/src   # pass
```

## Owner constraints honored

- Stream 4 globs only (`packages/ui/src/apps-store/**`,
  `packages/registry-ui/src/apps-panel.tsx`, `packages/registry-ui/src/apps/**`).
- Admin capabilities from #26 untouched (`packages/registry-ui/src/admin/**`).
- Buildable against tech-plan wire contract; server install/directory
  procedures land in stream 3; client degrades when missing.

## Follow-ons (not this stream)

- Stream 5: native `apps` surface in client/web, delete SidebarApps, re-root
  private partition mapping.
- Stream 6: integration asserts against live install/directory procedures.
