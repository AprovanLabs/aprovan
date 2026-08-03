# Stream 6 report — integration, reseed, docs

**Branch:** `iw1/integration`  
**Worktree:** `/tmp/iw1-integration`  
**Status:** implemented; tasks 6.1–6.4 checked off

## What landed

- **`server/workspace/tests/app-integration.test.ts`**
  - **6.1** Cross-workspace chain via `appsService.call` (auth-none tools are
    always `local`): A publishes public app with `requires: [{contract:"sql"}]`,
    B sees it in `apps.directory`, installs with default sql profile (opaque
    grant), keyvalue lands in `app#<installId>#u#<sub>`, file partition path is
    `.apps/<installId>/data/<sub>/…`, A renames + releases, B update + live
    serve still work.
  - **6.2** Seeds legacy name-keyed scopes/files, runs `scripts/reseed-apps.ts`
    with `RESEED_APPS_FIXTURE=1`, asserts zero non-ULID app/release/app# scopes.
  - **6.3** Spies `storage.grants.grant` during install + configure; every
    subject is `{kind:"app", id:<ulid>}` with no extra fields.
- **Docs (shipped model)**
  - New `docs/app-data.md` and `docs/native-surfaces.md` (no Personal /
    dataScope / name identity / SidebarApps; inert-bundle noted as future).
  - `docs/index.md` links; historical banners on improve-findings +
    refactor-decisions.

## Verify

```
pnpm --dir server/workspace test     # 519 passed, 7 skipped
pnpm --dir client/web build          # pass (via turbo deps build)
! grep -rn "PERSONAL_APP_NAME|PERSONAL_PREFIX|isPersonalApp|\.personal" \
  server/workspace/src client/web/src packages/ui/src packages/registry-ui/src
```

## Deviations

- Cross-workspace manage HTTP is unavailable under auth-none (`resolvePrincipal`
  hardcodes `local`); the e2e uses `appsService.call` with explicit A/B
  contexts. Live/app-session HTTP still exercises `/apps/:ws/:installId`.
- File-plane partition for installs is asserted via path formula + FS write
  (app-session vfs still authors under `paths[]`; keyvalue is the record plane).

## Wave-close / archive notes

- Streams 1–6 complete the IW-1 server+client flip. Archive can sync
  app-identity / install-lifecycle / per-user-space / apps-native-surface
  deltas and drop Personal/dataScope language from main specs.
- Reseed script remains the only wipe path (no migration).
