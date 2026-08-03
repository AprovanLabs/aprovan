# Stream 1 report — app-model server identity + Personal deletion

**Branch:** `iw1/app-identity`  
**Worktree:** `/tmp/iw1-app-identity`  
**Status:** implemented; tasks 1.1–1.8 checked off

## What landed

- **`apps/identity.ts`**: ULID mint (`mintAppId` / `mintInstallId`), alias index
  `svc#apps#alias / <name> → {appId}`, `resolveAppRef`, `setAlias` (409),
  `dropAlias`, plus a deployment reverse index (`__deployment__` /
  `svc#apps#byId`) so `/apps/id/:appId` permalinks resolve.
- **`apps/store.ts`**: `AppManifest` gains `appId` (+ optional `originAppId`),
  **`dataScope` deleted**; manifests keyed `svc#apps / <appId>`; legacy
  folder-shape rebinding removed; writers use `.apps/<id>/data/<sub>`.
- **`apps/releases.ts`**: scopes `svc#apps#releases#<appId>`; releases embed a
  `manifest` snapshot.
- **`apps/usage.ts` / session scopes**: counters and keyvalue scopes use
  `appId` (`svc#apps#usage#<appId>`, `app#<appId>#u#<sub>`).
- **`apps/personal.ts` deleted**; all Personal / `isPersonalApp` /
  `PERSONAL_APP_NAME` / `.personal` branches removed from server `src`.
- **`apps/service.ts`**: procedures resolve `app`/`name` via `resolveAppRef`;
  publish mints/reuses `appId`; new `apps.rename`; wire shapes carry `appId` +
  `permalink`; `apps.list` returns only real apps.
- **Routes**: alias resolution at the edge; `/apps/id/:appId` (+ project/sdk/
  tools) permalinks on live + API surfaces.
- **`scripts/reseed-apps.ts`**: drops name-keyed scopes and optional fixture
  reseed; wired from `bootstrap:local`.
- **`ulid` dependency** added to `server/workspace`.

## Verify

```
pnpm --dir server/workspace typecheck   # pass
pnpm --dir server/workspace test        # 500 passed, 7 skipped
! grep -rn "PERSONAL_APP_NAME\|isPersonalApp\|\.personal" server/workspace/src  # pass
```

## Owner constraints honored

- `dataScope` removed from the manifest and session model.
- Personal pseudo-app gone (server source grep gate clean).
- Partition writers: `.apps/<id>/data/<sub>` (guard structural re-root remains stream 2).

## Follow-ons (not this stream)

- Stream 2: structural partition guard (`.apps` / `.users`), private user space.
- Stream 3: ULID installs, bindings, directory write-through beyond byId index.
