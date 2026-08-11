# Report: Server — Install-as-copy + hosting mode

## What was built

- **`apps/install.ts`**: Rebuilt `AppInstallation` around copy-model
  `pin: {tag?, commit}`, F2 `hosting` / `hostingWorkspaceId`, local `root` +
  remapped `manifest`, and `contentFingerprint` for the local-edits guard.
  Added `copyArchivePaths` (named helper for stream 7), `installAsCopy`,
  `updateCheck`, `applyUpdate`, and hosting pick helpers that collapse F4's
  3-way `hostModes` into F2's managed/hosted bucket. Deleted
  request-time origin release cache. `saveInstall` rejects hosting flips
  with 400.
- **`routes/live-apps.ts` / `routes/apps.ts`**: Install-id addressing serves
  only the local copy (`installServingManifest` + installer workspace FS);
  origin is never read at serve time. Manifest JSON exposes `root` /
  `pin` / `hosting` instead of `prefix` / `resolvedRelease` / `editing`.
- **`tests/apps-install-copy.test.ts`**: All stream-owned scenarios
  (archive copy, origin deletion survival, explicit update, local-edits
  guard, single/multi hosting pick, hosting immutability).

## How verified

```bash
pnpm --filter @aprovan/workspace test -- apps-install-copy.test.ts
# ✓ 12 tests passed

grep -rn "cachedOriginRelease" server/workspace/src "$REG"
# (clean)

pnpm --filter @aprovan/workspace typecheck
# ✓ exit 0
```

## Deviations

1. **Legacy fields retained as optional** (`resolvedRelease?`, `editing?`,
   `prefix?`) plus legacy channel/release pin union members so
   `apps/service.ts` (outside Touches; stream 6 owns procedure rewiring)
   still typechecks. New installs set the copy-model fields; `mintNewInstall`
   defaults `hosting` to `"managed"`.
2. **`root` + remapped `manifest` stored on the install record.** Tech-plan's
   abbreviated install shape omitted them, but serving-by-installId needs a
   local binding without an origin read. Stream 6/7 can later promote the
   copy into a first-class local `AppRecord` via `saveApp`/`reconcileApp`.
3. **`updateCheck` / `applyUpdate` are exported functions, not registered
   procedures** — stream 6 owns procedure registration. Call them from
   `apps/service.ts` when wiring.
4. **Pin floor without iw9-a**: prefers dynamic `resolveReleaseTag` when
   present; else VCS `main` head; else release id/manifestHash; else
   content fingerprint of the origin root (so update-check sees archive
   changes before release-as-tag lands).
5. **Slug collision maps `assertRootAvailable`'s 409 → 400** per task 3.2
   (explicit slug choice). Overlap against other installs' roots is also
   checked.
6. **FS path casing remains `apps/<slug>`** (existing convention), not
   capital-`Apps/` product spelling.

## Notes for streams 6 / 7

- **Stream 6 (procedure wiring):** Register `apps.install` → `installAsCopy`,
  `apps.updateCheck` → `updateCheck`, `apps.applyUpdate` → `applyUpdate`
  (with `confirmOverwrite`). Retire serve-from-origin / `editing` fork paths
  in `completeInstall` / `configure` / `update`. Drop legacy pin helpers
  once no callers remain.
- **Stream 7 (migration):** Import `copyArchivePaths` (or `materializeFork`)
  from `install.ts` — do not re-copy the loop. For each legacy install:
  materialize into `apps/<slug>`, set `pin` from `resolvedRelease` →
  commit floor, set `hosting` (default managed), drop
  `editing`/`prefix`/`resolvedRelease`. Broken installs (origin gone, never
  materialized) → flag in install list, do not silently drop.
