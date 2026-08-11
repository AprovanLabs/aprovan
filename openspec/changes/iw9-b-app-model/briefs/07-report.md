# Report: Server — Migration (paths[] → mounts; installs → copy)

## What was built

- **`scripts/migrate-app-roots.ts`**: Reads raw app records (bypasses
  `hydrateAppRecord` so multi-prefix `paths[]` extras are still visible),
  sets `root = paths[0]`, calls stream 5 `addMount` for each extra under
  the app root (s3 mount with `migratedFrom` / `workspacePath` lineage),
  folds local extra bytes under the root via `copyArchivePaths` so app
  sessions keep reading them, writes `app.yaml` when absent, then
  `reconcileApp` + `bindRoot`. Idempotent; writes a JSON snapshot before
  mutate.
- **`scripts/migrate-installs-to-copy.ts`**: Materializes via
  `materializeFork` / `copyArchivePaths` (stream 3 helpers — no loop
  re-copy), pins from `resolvedRelease` → `{tag?, commit}`, sets
  `hosting: "managed"`, drops `editing`/`prefix`/`resolvedRelease`. Dead
  origins with no local materialization are flagged `broken: true` and
  kept in the install list.
- **`tests/migrate-app-model.test.ts`**: extras → root + mount/fold +
  idempotency + snapshot; dead-origin install → broken not dropped.

## How verified

```bash
pnpm --filter @aprovan/workspace test -- migrate-app-model.test.ts
# ✓ 2 tests passed

# Grep gates (both repos):
# - cachedOriginRelease: clean (AAP + REG)
# - resolvedRelease: remains in install.ts / service.ts (stream 6 Touches)
#   and historical migration-script / test refs — expected until stream 6
# - .paths: remains as derived `[root]` projection (stream 1 deviation;
#   full deletion blocked by iw9-a / releases.ts). REG OpenAPI `.paths`
#   hits are unrelated.
```

## Deviations

1. **Local path extras use s3 mount + native fold.** The mounts engine only
   accepts `git`/`s3` (no workspace-path backend). Migration registers an
   app-scoped s3 mount under `${root}/${extra}` via stream 5 `addMount`,
   then copies local extra bytes under that prefix so app sessions (which
   skip `mountRead` and read the FS store) still succeed. Spec spelling
   `Apps/tasks` → codebase `apps/tasks`.
2. **`broken` is a migration-written field** on the install record (not yet
   on the `AppInstallation` TypeScript type — stream 6 can promote it).
   Written via `writeSvcRecord` so we do not expand Touches into
   `install.ts`.
3. **Grep gate 7.4 is not fully green** outside migration scripts:
   `paths` remains as a derived projection; `resolvedRelease`/`editing`/
   `prefix` remain optional on `install.ts` + `service.ts` until stream 6
   rewires procedures (explicitly noted in stream 3's report).
   `cachedOriginRelease` is already gone. REG has no install-model hits.

## Notes for stream 6

- After procedure rewiring deletes legacy install fields, re-run the 7.4
  greps — they should clear to migration-script + test refs only.
- Consider promoting `broken?: boolean` onto `AppInstallation` and surfacing
  it in the install list UI.
