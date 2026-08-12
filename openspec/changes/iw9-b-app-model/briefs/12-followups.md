# Brief: B closeout follow-ups

## Mission

Close gaps left by Wave 1 B client/server streams so sharing and install UX
actually work end-to-end: register `vfs.shares.received` (or equivalent),
mount `ShareLandingPage` on `/share/:key` in the web app, wire InstallDialog
into the Apps empty CTA / management entry, and scrub leftover derived
`paths` / legacy install fields where safe (grep 7.4 intent).

## Read first

1. `openspec/changes/iw9-b-app-model/briefs/04-report.md` (shares.received note)
2. `openspec/changes/iw9-b-app-model/briefs/06-report.md` / `10-report.md`
3. `openspec/changes/iw9-b-app-model/briefs/07-report.md` (grep 7.4 debt)
4. `openspec/changes/iw9-b-app-model/briefs/09-report.md` (export-only dialogs)
5. `server/workspace/src/vfs/shares.ts` (`listSharesReceivedBy`)
6. `client/web/src/components/sharing/**`, `components/apps/**`
7. `client/web/src/main.tsx` / router / `App` entry for route mount

## Tasks

- [x] F1 Register `vfs.shares.received` (or `shares.list` with `received:true`)
      in tools + native-dispatch / service, delegating to `listSharesReceivedBy`.
- [x] F2 Mount anonymous/authenticated client route for `/share/:key` (and
      optional `/*subpath`) rendering `ShareLandingPage` / `ShareLandingView`.
      Server already serves `GET /share/:key` — client needs the SPA route for
      in-app navigation if used; at minimum document + wire if the web app
      owns that path under `/workspace`.
- [x] F3 Wire `InstallDialog` / promote entry points into Apps empty CTA and
      `native://apps` management surface (stream 8 left these export-only).
- [x] F4 Grep-gate progress: remove or clearly quarantine remaining
      `.paths` / `resolvedRelease` / `editing` / `prefix` operational uses
      outside migration scripts where stream 7 noted debt — do not break
      derived projections required for typecheck; prefer deleting dead
      fields/call sites. Document residual in `briefs/followups-report.md`.

## Verify

```bash
pnpm --filter @aprovan/workspace typecheck
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/workspace test -- vfs-shares
```

## Constraints

- Prefer minimal Touches: `routes/tools.ts`, `native-dispatch.ts`,
  `apps/service.ts` (if needed), `vfs/shares.ts`, client sharing/apps/
  sidebar/router files, and only the install/store lines needed for F4.
- Do not reopen B streams 1–11 scope.
- Open one PR; write `openspec/changes/iw9-b-app-model/briefs/followups-report.md`.

## Report back

PR URL, verify results, remaining debt list.
