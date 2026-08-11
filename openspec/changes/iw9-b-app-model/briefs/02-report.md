# Report: Server — Personal app + promote-out

## What was built

- **`apps/personal.ts`**: `ensurePersonalApp(workspaceId, actor)` lazily mints
  an ordinary app row (slug `personal`, root `apps/personal`) recognized only
  at this creation site — no special manifest flags. `promoteApp({workspaceId,
  source, slug, actor})` runs `assertRootAvailable` → VFS subtree copy to
  `apps/<slug>` → mint via `saveApp` → delete source last. Failure before
  source delete rolls back the copy and any minted row (`__beforeDelete` test
  seam). Promoted apps carry no `originAppId` / Personal back-link.
- **`tests/apps-personal.test.ts`**: All four personal-app scenarios (lazy
  create, promote move/mint/re-point, atomic failure, independence).

## How verified

```bash
pnpm --filter @aprovan/workspace test -- apps-personal.test.ts
# ✓ 4 tests passed

# Special-casing gate (src clean; no helpers/literals reintroduced):
grep -rn 'isPersonalApp\|PERSONAL_APP_NAME\|PERSONAL_PREFIX\|\.personal' \
  server/workspace/src --exclude-dir=node_modules
# (no matches)
```

## Deviations

1. **F4 `reconcileApp` is not on main.** Same as stream 1: first-sight mint
   uses `saveApp` + `hydrateAppRecord`. Documented swap sites in
   `ensurePersonalApp` and `promoteApp` (both comment-tagged). When F4-3
   merges, replace those `saveApp` calls with
   `reconcileApp({ workspaceId, root, yaml, expectedAppId, actor })`.
2. **FS path casing is `apps/<slug>`** (existing convention), not the
   capital-`Apps/` product spelling in the spec — matches stream 1.
3. **`__beforeDelete` test seam** on `promoteApp` for the atomicity scenario
   (inject failure after mint, before source delete). Not part of the
   procedure surface; stream 6 should not expose it.

## Notes for stream 6

- Register `apps.promote {source, slug} → {appId, root}` by delegating to
  `promoteApp({ workspaceId, source, slug, actor: ctx.userId })`.
- Call `ensurePersonalApp(ctx.workspaceId, ctx.userId)` from whatever
  one-off-save path lands widgets under Personal (not from promote).
- Do not reintroduce special-casing helpers; Personal is an ordinary slug.
- Prefer `reconcileApp` once F4-3 lands at the two swap sites in
  `apps/personal.ts`.
