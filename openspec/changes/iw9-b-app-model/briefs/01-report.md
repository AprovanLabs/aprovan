# Report: Server — App roots + overlap validation

## What was built

- **`apps/store.ts`**: `AppManifest` / `AppRecord` now carry authoritative
  `root` (plus optional F4 fields `slug`, `declared`, `reconcile`).
  `appPathAllowed` / `appPathServable` authorize against the single root
  (`root ?? paths[0]`), not a multi-prefix loop. `hydrateAppRecord` fills
  `root` and keeps `entry` / `paths: [root]` as derived projections so
  iw9-a `releases.ts` and live-apps keep typechecking.
- **`apps/roots.ts`**: `assertRootAvailable(workspaceId, root, exceptAppId?)`
  — 409 on equal/contain/contained vs any other app root (D2).
- **`apps/service.ts`**: Deleted `resolveBinding`. Publish resolves one root,
  rejects extra `paths[]` (400 → mounts), calls `assertRootAvailable`, loads
  `app.yaml` via `loadAppYaml`, and writes via `saveApp`. Invalid yaml keeps
  last-good derived state and sets `reconcile: { status: "error", issues }`.
- **`tests/apps-roots.test.ts`**: All four app-roots scenarios.

## How verified

```bash
pnpm --filter @aprovan/workspace test -- apps-roots.test.ts
# ✓ 5 tests passed

pnpm --filter @aprovan/workspace typecheck
# ✓ exit 0
```

## Deviations

1. **F4 `reconcileApp` is not on main.** Only F4 streams 1 (manifest
   loader), 2 (slugs), and 4 (icon fallback) have landed. Stream 3
   (`apps/reconcile.ts`) is still unchecked. Per "do not stub", publish
   uses `saveApp` for the identity fan-out and documents the swap site.
   When F4-3 merges, replace the `saveApp` call after `loadRootYaml` with
   `reconcileApp({ workspaceId, root, yaml, expectedAppId, actor })`.
2. **`entry` / `paths` TypeScript fields retained as derived projections.**
   Literal deletion would break `releases.ts` (forbidden Touches / iw9-a)
   and `live-apps.ts` (outside Touches). Operational binding is `root`
   only; `paths` is always `[root]` after hydrate; extras are rejected at
   publish. Full field deletion belongs with iw9-a + consumer migration.
3. **`assertRootAvailable` takes optional `exceptAppId`.** Required so an
   update of the same app at the same root does not 409 itself. Two-arg
   call sites (streams 2/3/5) remain valid.
4. **FS path casing is `apps/<slug>`** (existing convention), not the
   capital-`Apps/` product spelling in the spec.

## Notes for streams 2 / 3 / 5

- **Stream 2 (Personal / promote):** Call
  `assertRootAvailable(workspaceId, root)` before copying to `Apps/<slug>`.
  Import `AppRecord` from `./store.js`. Prefer `reconcileApp` once F4-3
  lands; until then `saveApp` + `hydrateAppRecord` is the identity write.
- **Stream 3 (install-as-copy):** Same overlap check on materialization
  target root; collision → explicit-slug 400 path per tech-plan.
- **Stream 5 (mounts):** Mount prefixes should run through the same
  containment check against roots (and later other mounts). Do not
  reintroduce multi-prefix `paths[]` on publish — extras are already 400.
