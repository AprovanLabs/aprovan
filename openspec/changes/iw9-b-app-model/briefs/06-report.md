# Report: Server — Procedure/tool wiring

## What was built

- **`apps/service.ts`**: Registered Personal promote-out on `apps.promote
  {source, slug} → {appId, root}` (delegates to `promoteApp`); kept channel
  promote `{from, to}` as a fallback when source/slug are absent. Rewired
  `apps.install` to `installAsCopy` (accepts `app` | `directoryRef`, `mode`/
  `hosting`, `slug`, `bindings`, `config`). Added `apps.updateCheck` and
  `apps.applyUpdate` (with `confirmOverwrite`). Install summary now surfaces
  copy-model fields (`root`, `hosting`, `contentFingerprint`).
- **`routes/tools.ts`**: Additive `vcs.mounts.list/add/remove` discovery
  entries after the existing commit-store ops (iw9-a commit/log/diff schemas
  untouched). Additive `vfs.share` / `shares.list` / `shares.revoke` discovery
  alongside the vfs contract entries.
- **`native-dispatch.ts`**: Dispatches vfs share ops to `vfs/shares.ts` and
  vcs mounts ops to `vcs/mounts-procedures.ts` before the contract backends.

## How verified

```bash
pnpm --filter @aprovan/workspace typecheck
# ✓ exit 0

pnpm --filter @aprovan/workspace test -- apps-roots apps-personal \
  apps-install-copy vfs-shares vcs-mounts-procedures
# ✓ 5 files / 34 tests passed
```

## Deviations

1. **`vfs.share*` lives on the vfs interface** (tools discovery +
   native-dispatch), not on `apps/service.ts`. VFS is not a platform plugin
   and `services.ts` is outside Touches; task 6.3's parenthetical allows the
   vfs procedure surface.
2. **`apps.promote` dual-dispatch**: `{source, slug}` → Personal promote-out;
   `{from, to}` → legacy channel promote. Channel promote remains for release
   flows until a later rename.
3. **Legacy `apps.update` / `configure` fork paths retained** — stream 3 asked
   to retire them eventually; this stream only adds `updateCheck` /
   `applyUpdate` and rewires install. Full retirement is a follow-up.
4. **F4 `reconcileApp` swap sites are in `personal.ts` / `install.ts`**, not
   in Touches (`service.ts`). Left for a follow-up on those modules — no
   saveApp→reconcileApp swap in this PR.
5. **`apps.updateCheck` / `apps.applyUpdate` declare `outputSchema` inline**
   on the tool entries (platform-output-schemas.ts is outside Touches).

## Notes for client streams 8–11

- **Stream 8 (sidebar IA)**: `apps.list` / directory unchanged; install rows
  now include `root` + `hosting` when summarized.
- **Stream 9 (install/promote UI)**: Call `apps.promote {source, slug}`;
  `apps.install {app|directoryRef, mode?, slug?, bindings?, config?}` —
  multi-hosting apps 400 with options until `mode` is supplied. Updates:
  `apps.updateCheck` then `apps.applyUpdate` (pass `confirmOverwrite` on
  local edits).
- **Stream 10 (sharing UI)**: `POST /tools/vfs/share` with
  `{path, expiresAt, person}` or `{path, expiresAt, link:true}`; list via
  `vfs/shares.list`; revoke via `vfs/shares.revoke {shareId}`. Link key is
  returned once — never re-fetch. Share URLs: `/share/<key>[/subpath]`.
- **Stream 11 (mounts UI)**: `POST /tools/vcs/mounts.list|add|remove` —
  add needs `{prefix, type, config, mode?}`.
