# Brief 09 report — Apps pane conformance

## PR
https://github.com/AprovanLabs/aprovan/pull/42

## Done
- **9.1 Preflight:** `NATIVE_SURFACES` has `{id: "apps", Panel: AppsPanel}`; panel path is
  `client/web/src/components/panels/AppsPanel.tsx` (IW-1 thin wrapper).
- **9.2 Conventions:** wrapped the native Apps pane in `PanelShell`; registry-ui pane gets
  loading / empty / error+retry / apps-unavailable calm note; install “enable editing”
  uses armed `ConfirmButton` (no `window.confirm`); empty/error copy to ux.md tone.
  IW-1 data contracts (transports, selection, installs) unchanged.

## Verify
| Check | Result |
| --- | --- |
| `git grep -n '"apps"' …/native-surfaces.tsx` | pass (`id: "apps"`) |
| `! grep confirm( …/apps/app-detail.tsx` | pass |
| registry-ui `tsc --noEmit` | pass |
| registry-ui vitest | pass (29) |
| patchwork-web `tsc && vite build` | pass |

## Notes
- Destructive delete/uninstall already used registry-ui `ConfirmDeleteButton` / `ConfirmButton`.
- Surface description in `native-surfaces.tsx` already matched ux.md; left as-is.
