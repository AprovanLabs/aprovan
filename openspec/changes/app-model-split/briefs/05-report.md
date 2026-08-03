# Stream 5 report — apps native surface + sidebar cleanup

**Branch:** `iw1/apps-surface`  
**Worktree:** `/tmp/iw1-apps-surface`  
**Status:** implemented; tasks 5.1–5.4 checked off

## What landed

- **`apps` native surface**: `components/panels/AppsPanel.tsx` thin wrapper hosts
  registry-ui `AppsPanel` with `variant="pane"`; transports + host callbacks via
  `PanelHostActions`. Entry `{id: "apps", title: "Apps", icon: LayoutGrid}` is
  first in `NATIVE_SURFACES`.
- **Sidebar cleanup**: deleted `SidebarApps.tsx` (split pane, drag handle,
  `patchwork:sidebar-apps` persistence, embedded explorer). `WorkspaceSurfaces`
  relocated into `WorkspaceSidebar` as plain rows; ChatPage no longer mirrors
  apps selection into the sidebar.
- **Private section**: `lib/private-partition.ts` re-rooted from
  `.personal/data/<sub>` to `.users/<sub>` (`USER_SPACE_PREFIX`); display ↔ raw
  round-trip unchanged.
- **Publish funnel**: `publishFlowInChat` prefills an `apps.publish` composer
  prompt; wired through `PanelHostActions.onPublishFlow` and the apps pane
  Your-flows CTA (also leftover `apps://` full panel).

## Verify

```
pnpm --dir client/web build                    # pass
! grep -rn "SidebarApps\|patchwork:sidebar-apps\|\.personal" \
  client/web/src                               # pass
```

## Owner constraints honored

- Stream 5 globs only (`client/web/src/**` + tasks checkoff).
- Plain surface rows; apps entry first in `NATIVE_SURFACES`.
- No registry-ui / apps-store package edits (consumed stream 4 pane variant).

## Follow-ons (not this stream)

- Stream 6: integration asserts + docs; live install/directory procedures.
