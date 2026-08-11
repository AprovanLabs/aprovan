# Report: Server — Mounts procedures (validation over the existing engine)

## What was built

- **`vcs/mounts-procedures.ts`**: `listMounts` / `addMount` / `removeMount`
  validate then delegate to the unmodified engine. Validation covers prefix
  shape (`workspacePath`), `crdt` → 501, app-root workspace-path backends →
  400, and root overlap via `assertRootAvailable` (with `exceptAppId` when
  the prefix is strictly under an app root — app-scoped). Mount-vs-mount
  overlap stays in the engine (no forked containment logic).
- **App-scoped mounts**: `findAppScopedOwner` + `appScopedMountPathAllowed`
  — same `svc#vcs#mounts` store; reads authorized through narrowed
  `appPathAllowed`.
- **`tests/vcs-mounts-procedures.test.ts`**: six cases covering the
  vfs-mounts scenarios owned by this stream.

## How verified

```bash
pnpm --filter @aprovan/workspace test -- vcs-mounts-procedures.test.ts
# ✓ 6 tests passed

pnpm --filter @aprovan/workspace typecheck
# ✓ exit 0

git diff origin/main -- server/workspace/src/vcs/mounts.ts | wc -l
# 0
```

## Deviations

1. **App-root target detection** uses explicit workspace-path config keys
   (`workspacePath`, `localPath`, `source`, `target`, or bare `path` without
   git/s3 anchors). Git `config.path` (repo subpath) and s3 `bucket` mounts
   are not scanned — those are external backends, not workspace app roots.
2. **Mount-vs-mount overlap** is left to the engine's existing 409 rather
   than re-implemented in the procedure layer (constraint: do not fork
   overlap logic; `assertRootAvailable` is the reused root check).
3. **`crdt` status is 501** (matches engine reserved semantics), not 400.
