# Report: 07-bugfixes-script-share-commit

## What I built

Three Goal-6 bug fixes (tasks 7.1–7.7):

1. **Script privacy claim (D4)** — Rewrote `workflowVisibleTo` and
   `listVisibleRegistrations` doc comments in
   `server/workspace/src/workflows/store.ts` so they describe a listing
   convenience only. No filtering-logic change; no guarded-prefix work.

2. **Share identity (D5)** — `shareAllows` / `appFsAllowed` now match on
   durable `appId` (`app.id`, not `app.name`). `WorkspaceShare.apps` docs
   say "app ids." Read-time bridge lives in `readWorkspaceConfig`: any
   `shares[].apps` entry that isn't already a live ULID is resolved through
   the existing name→appId alias index **in memory** before the config is
   returned, so `shareAllows` stays sync and keeps the tech-plan 4-arg
   signature. One-shot migration script
   `server/workspace/scripts/migrate-shares-to-appid.ts` (dry-run default,
   `--execute` to write) rewrites stored records to appIds.

3. **Commit detail fidelity** — `CommitDetail.changes?: unknown` and
   `fetchCommitDetail` now pass through `raw.changes` from `vcs.show`.

Tests: `server/workspace/tests/app-share-identity.test.ts` (rename +
name-keyed fallback) and `client/web/src/lib/__tests__/vfs-commits.test.ts`
(with/without `changes`).

## How I verified

```bash
pnpm --filter @aprovan/workspace test -- tests/app-share-identity.test.ts
pnpm --filter @aprovan/patchwork-web test -- src/lib/__tests__/vfs-commits.test.ts
grep -n "creator-private" server/workspace/src/workflows/store.ts
grep -n "app.name" server/workspace/src/apps/store.ts | grep shareAllows
```

- `app-share-identity.test.ts`: **2/2 passed**
- `vfs-commits.test.ts`: **2/2 passed**
- Both grep gates: **no output** (exit 1)

## Deviations

1. **Read-time fallback placement.** Task 7.2 says the fallback lives in
   `shareAllows`; tech-plan "Interfaces & Data" keeps `shareAllows` sync with
   signature `(config, appId, path, write)`. Resolving aliases needs async I/O
   (`readAlias`), and the sole production caller (`services.ts` →
   `appFsAllowed`) is outside Touches. Putting the bridge in
   `readWorkspaceConfig` (already async, already on the call path before
   `appFsAllowed`) preserves the documented sync signature, needs no
   `services.ts` edit, and still resolves via the alias index. Documented in
   `appFsAllowed`'s comment.

2. **Worktree was missing** at
   `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-f6-hygiene-r2`;
   created from `origin/main` on `fix/iw9-f6-hygiene-bugs` (branch had been
   9 commits behind; hard-reset to `origin/main` before work).

## What the next wave needs to know

- Run `migrate-shares-to-appid.ts` (dry-run, then `--execute`) after deploy so
  name-keyed shares become rename-proof; until then the read-time bridge only
  works while the stored name is still the app's current alias.
- `apps.share` still accepts whatever string array the client sends (names or
  ids) — write-path normalization was out of scope; migration + read bridge
  cover the gap.
- Do not touch `partitionAccess` in `apps/store.ts` (concurrent F2 stream).
