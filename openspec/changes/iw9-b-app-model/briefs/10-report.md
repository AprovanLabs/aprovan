# Report: Client — Sharing UI

## What was built

Under `client/web/src/components/sharing/**`:

- **`ShareDialog`** — Person / Link tabs. Person tab: workspace-member
  combobox + existing person-shares list. Link tab: expiry select (default
  7 days, explicit "No expiry" opt-in → far-future ISO), Create link, one-time
  URL reveal (monospace + copy + persistent "won't be shown again" caption).
- **`SharedWithMe`** — flat recipient listing (path, sharer, date); empty
  "Nothing shared with you yet."; load-failure + retry.
- **`ManageShares`** — table (kind, path, recipient/label, created, expiry,
  status, revoke). Revoke via confirm dialog. Failed revoke sticks as
  "Revoke failed — retry" until retry or reload.
- **`ShareLandingView` / `ShareLandingPage` / `ShareUnavailablePage`** —
  anonymous read-only render via `GET ${GATEWAY_BASE}/share/:key`. Unavailable
  page is identical for expired / revoked / never-existed. No sibling/parent
  nav, no edit affordance.
- **`api.ts`** — `vfs.share` / `shares.list` / `shares.revoke` (+ provisional
  `shares.received` for Shared with me).

## How verified

```bash
pnpm --filter @aprovan/patchwork-web typecheck
# ✓ exit 0
```

## Deviations

1. **`vfs.shares.received` is not registered on the server yet** (stream 6
   only wired `share` / `shares.list` / `shares.revoke`). `listSharesReceivedBy`
   exists in `vfs/shares.ts`. SharedWithMe calls `shares.received` and surfaces
   error+retry until the server adds the op; `loadShares` prop can inject a
   loader in the meantime.
2. **Anonymous landing route not wired in `App.tsx` / `main.tsx`.** Components
   live under `sharing/**` (`ShareLandingPage`). Host must mount when
   `pathname` matches `/share/:key` (outside this stream's Touches). Without
   that mount, copied `/share/<key>` URLs hit ChatPage.
3. **No shadcn `Command` / `Select` / `AlertDialog` / `Table` packages** in
   patchwork-web. Implemented equivalent shapes with existing `Dialog` /
   `Button` / `Input` / native `<select>` / `<table>` so Touches stay inside
   `sharing/**`.
4. **`/members` is admin-only.** Person combobox soft-loads members and allows
   typing a sub when the directory is empty/unavailable.

## Notes for integrators

- Mount: `import { ShareDialog, SharedWithMe, ManageShares, ShareLandingPage } from "@/components/sharing"`.
- Share create: `POST /tools/vfs/share` with `{path, expiresAt, person}` or
  `{path, expiresAt, link:true}`; key returned once.
- List/revoke: `shares.list` / `shares.revoke {shareId}`.
- URLs: `/share/<key>` (product path); bytes fetched via gateway
  `/share/<key>`.
