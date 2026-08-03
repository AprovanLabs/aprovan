# Brief: Apps native surface + sidebar cleanup (stream 5)

## Mission
Add `apps` native surface (thin AppsPanel wrapper), delete SidebarApps / split-pane geometry,
re-root private-partition to `.users/<sub>`, publish-funnel copy for Your-flows.

## Gate
Stream 4 merged (#32) — registry-ui pane variant exists.

## Read first
1. `briefs/04-report.md`
2. `ux.md` Apps pane
3. `tasks.md` stream 5
4. Specs: `apps-native-surface`, `per-user-space` client mapping

## Tasks
5.1–5.4 verbatim.

## Verify
```
pnpm --dir client/web build
! grep -rn "SidebarApps\|patchwork:sidebar-apps\|\.personal" client/web/src
```

## Git
`/tmp/iw1-apps-surface` branch `iw1/apps-surface` from latest origin/main.
Rebase carefully vs native-panel changes to `native-surfaces.tsx`.

## Constraints
Touches stream 5 globs. Keep plain surface rows; apps entry first in NATIVE_SURFACES.
