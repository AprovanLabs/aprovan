# Stream 2 report — per-user space + workflow ownership

**Branch:** `iw1/user-space`  
**Worktree:** `/tmp/iw1-user-space`  
**Status:** implemented; tasks 2.1–2.5 checked off

## What landed

- **Partition guard re-rooted** (`apps/store.ts`): `APP_DATA_ROOT = ".apps"`,
  `USER_SPACE_ROOT = ".users"`; `hiddenDataPrefixes` returns those structural
  roots (no manifest listing / cache); `partitionAccess` matches
  `.apps/<id>/data/<sub>/…` and `.users/<sub>/…` by shape; `userSpaceDir(sub)`.
- **Private space**: `userRecordScope` + `assertCallerScope` keeps `user#`
  self-addressed only; vfs/`/fs` listings include the caller's `.users` and
  hide foreign partitions under both roots (existing `partitionAccess !==
  "foreign"` filter); snapshots exclude both roots; `apps.data` stays
  app-partition-only (no `.users` admin path).
- **`apps.data`**: already id-keyed from stream 1 (`app#<appId>#u#`,
  `.apps/<appId>/data/<user>`); tests cover `app` ULID arg + path-escape
  rejection of `.users`.
- **Workflow ownership** (`workflows/store.ts` + `service.ts`): list/get/run/
  remove/… filter to `createdBy === caller` unless some app exports the
  workflow; `workflows.list` annotates `exportedBy: appId[]`; foreign
  unexported run/get → 404.
- **Tests**: `user-space.test.ts`, `workflow-visibility.test.ts`; extended
  `partition-access.test.ts` + `records.test.ts`.

## Verify

```
pnpm --dir server/workspace typecheck   # pass
pnpm --dir server/workspace test        # 506 passed, 7 skipped
```

## Owner constraints honored

- Unbundled workflows are creator-private; export flips visibility.
- No stream 3 profile-binding / install lifecycle work.

## Follow-ons (not this stream)

- Stream 3: dependencies, ULID installs, bindings, directory write-through.
