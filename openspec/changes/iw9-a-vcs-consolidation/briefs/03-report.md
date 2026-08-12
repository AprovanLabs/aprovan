# Report: 03 — Server release-as-tag + delete releases.ts

## PR

https://github.com/AprovanLabs/aprovan/pull/213

## Verify

```bash
cd server/workspace && pnpm typecheck && pnpm vitest run \
  tests/apps.test.ts tests/app-install.test.ts tests/app-directory.test.ts

# Cross-repo grep gate (tasks.md)
rg -n "listEntryVersions|readEntryVersion|restoreEntryVersion|apps/releases" \
  server packages client \
  /Users/jacob/Documents/Code/AprovanLabs/registry \
  -g '*.ts' -g '*.tsx' -g '!**/node_modules/**' -g '!**/dist/**'
# expect: no matches (exit ≠ 0)
```

| Check | Result |
| --- | --- |
| `pnpm typecheck` | pass |
| `tests/apps.test.ts` | 10/10 pass |
| `tests/app-install.test.ts` | 3/3 pass |
| `tests/app-directory.test.ts` | 3/3 pass |
| Grep gate (both repos) | clean |

## What landed

1. **3.1 `apps/release-tags.ts`** — `cutRelease` (scoped `commitTree` →
   `writeTag` → `moveChannel` + manifest dual-write), `resolveRelease`,
   `listReleases`, `pointChannel`, `previousRelease`, `resolveReleaseTag`
   (B install hook), `readReleasePath`. Channel validation unchanged
   (`^[a-z][a-z0-9-]{0,31}$`).
2. **3.2 Consumers re-pointed** — `install.ts` (materialize from commit
   snapshot; `resolveCommitPin` → `resolveReleaseTag`), `routes/app-urls.ts`
   (pinned serve from release snapshot — #206 moved serving here;
   `live-apps.ts` stays 302-shim), `directory.ts`, `notifications` comment,
   `platform-output-schemas.ts` release shapes; dropped versions schemas.
3. **3.3 Legacy cut-over** — `migrateLegacyReleasesIfNeeded` re-tags every
   `svc#apps#releases#<appId>` record (entry hash must still be readable) then
   `deleteSvcScope`. Tags before drop. Unreadable pins are skipped (no silent
   wrong tag) so resolve surfaces explicit miss / re-release-needed.
4. **3.4 Tool surface** — `apps.release`/`releases`/`channels`/`promote`/
   `rollback` tag-backed; deleted `apps.versions`/`version`/`restore` and
   `listEntryVersions`/`readEntryVersion`/`restoreEntryVersion` in `store.ts`.
5. **3.5** — deleted `apps/releases.ts` and `packages/registry-ui/.../versions.tsx`
   (imports stripped from app-detail / workflow-detail).

## Deviations

1. **`routes/app-urls.ts` edited** (not in Touches) — #206 moved serving out of
   `live-apps.ts`; brief called this out. `live-apps.ts` untouched (shim only).
2. **Also touched** `platform-output-schemas.ts`, `migrate-installs-to-copy.ts`,
   `app-identity`/`app-domain` tests, `registry-ui` versions UI — required for
   compile/grep/spec deletion; outside the metadata Touches line.
3. **Manifest dual-write kept** — `pointChannel` still writes
   `manifest.channels[channel]=releaseId` alongside VCS channel refs so
   directory/UI keep working without a larger IA change.
4. **`apps/update` for copy installs** delegates to `applyUpdate` (re-resolve
   live + rematerialize). Install tests use explicit `slug` so same-workspace
   copy does not collide with the origin app root.
5. **Keyvalue list assertion** in `apps.test.ts` updated to `{ key }` objects
   (pre-existing shape drift; unblocked the verify suite).

## Notes for B pin consumers

- Install pin interface: `{ tag?: string; commit: string }` via
  `resolveReleaseTag` / `resolveCommitPin`.
- `materializeFork(ws, origin, ResolvedRelease, dest)` copies the release
  **commit snapshot** (not per-file `entryHash`). Prefer `materializeCommit`
  when you already have a commit id.
- `copyArchivePaths` remains for live-tree / fingerprint fallbacks.
- Old `AppRelease` / `readRelease` / `releases.ts` are gone — import from
  `release-tags.js`.
- Lazy migration runs on first `cutRelease`/`resolveRelease`/`listReleases`/
  `resolveReleaseTag` per app; installs that referenced unreadable legacy
  hashes get an explicit 404 (“re-release required”), never a silent serve miss.
