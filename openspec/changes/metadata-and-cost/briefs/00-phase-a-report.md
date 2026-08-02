# Phase A report — metadata-and-cost

Executed streams 1, 3, 4 (registry) and stream 2 (aprovan client) per
`briefs/00-phase-a.md`. Phases B–D untouched. Task checkboxes 1.x–4.x in
`tasks.md` (main checkout) are marked done; 5.x onward remain unchecked.

## Per-stream status

### Stream 1 — Change-feed server (registry) — DONE

- `apps/workspace/src/change-journal.ts` (new): per-workspace monotonic
  cursor + bounded ring (1,000 entries), `scope` field so staged-session
  shadow writes are visible only to that session's poll.
- `apps/workspace/src/routes/fs.ts`: `GET /fs/changes?since=&session=` with
  an `ETag`/`If-None-Match` 304 fast path (checked before any session
  resolution or store read); `recordChange(...)` calls added at every
  mutation point (PUT, DELETE single/recursive, `/fs-uploads/complete`, and
  both the live-tree and staged-session branches).
- No changes needed outside `routes/fs.ts` to cover staged-session shadow
  writes — `sessionWrite`/`sessionDelete` are already called from
  `routes/fs.ts`, so the journal-recording call site could stay there
  without touching `vcs/chat-sessions.ts`.
- Tests: `tests/change-feed.test.ts` (new, 7 tests) — cursor advance per
  mutation kind, 304 with a store-method spy asserting zero reads,
  incremental delta correctness, ring-overflow reset, restart reset,
  `.services/**` invisibility, staged-session scoping.

### Stream 3 — Request caches (registry) — DONE

- `apps/workspace/src/auth-cache.ts` (new): principal cache keyed by
  (SHA-256 of the bearer token, requested-workspace header), TTL 60s
  (`AUTH_CACHE_TTL_MS`). `middleware/auth.ts`'s `oidcPrincipal` checks the
  cache before touching Sessions/Memberships/UserGroups; a hit also skips
  token re-verification (documented trade-off, consistent with the TTL
  being an accepted staleness bound).
- `invalidatePrincipal(sub | workspaceId)` wired into every mutation that
  changes the answer: `memberships.ts` (`putMembership`, `removeMember`),
  `groups.ts` (`addUserToGroup`, `removeUserFromGroup`), `sessions.ts`
  (`setCurrentWorkspace`). **Deviation**: these three files are outside
  stream 3's listed Touches globs, but wiring the invalidation hook is
  required by task 3.1 and the "Revocation takes effect" spec scenario —
  none of the three are owned by another named parallel stream (the
  brief's exclusion list is packages/utdk, packages/contracts,
  packages/utdk-e2e, and unspecified "purge targets"), so this was judged
  in-scope. Full suite (432 tests) still passes.
- `vcs/mounts.ts`: `readMounts` cached per workspace, TTL 30s, invalidated
  synchronously in `saveMounts` (used by both `addMount`/`removeMount`).
- Tests: `tests/auth-cache.test.ts` (new, 6 tests) — principal-cache hit
  count, revocation, workspace-switch keying, TTL expiry, plus a "mounts
  cache" describe block (hot-path zero-read assertion, add/remove
  invalidation).

### Stream 4 — FS write versioning + blob GC (registry) — DONE

- `apps/workspace/src/fs-store.ts`: `IFsStore.write` gains
  `opts?: FsWriteOptions` (`{ versioned?: boolean }`), defaulted by
  `!isServicePath(path)` in both backends. SQLite: unversioned writes
  delete every other-hash row for the path before inserting, so exactly
  one row survives. S3+DynamoDB: unversioned writes skip the `V#` index
  row entirely (only `P#` is written); `completeUpload` gets the same
  default treatment.
- `apps/workspace/scripts/gc-blobs.ts` (new): mark-and-sweep — a
  strongly-consistent `Scan` of `FsFiles` builds the live-hash set,
  `ListObjectsV2` over `blobs/` finds candidates, anything unreferenced and
  older than the 7-day safety age is deleted (`--dry-run` supported;
  reports `{ scanned, live, deleted }`). Also exports
  `startGcBlobsSchedule()`, a leader-leased daily interval built on the
  existing `LeaderLease` primitive. **Deviation**: wiring that schedule
  into `server.ts` startup (the way `startCronScheduler` is wired) was left
  undone — `server.ts` is outside this stream's Touches globs and no Verify
  test depends on it running in production; the hook is implemented and
  importable but inert until a follow-up change calls it.
- Tests: added to `tests/fs.test.ts` (SQLite: 50 service writes → ≤1
  surviving row, explicit `versioned: true`/`false` overrides) and
  `tests/fs-s3.test.ts` (S3+Dynamo: same + a new `blob garbage collection`
  describe block — orphan reclaimed, live blob spared, fresh
  not-yet-completed upload spared, dry-run doesn't delete). One iteration
  of debugging was needed: MinIO's `LastModified` has whole-second
  resolution (millisecond-scale safety ages were indistinguishable from
  "now"), and a first draft's test content literally collided
  (content-addressed) with an unrelated pre-existing fixture's literal
  string — both fixed; the suite is stable across repeat runs.

### Stream 2 — Change-feed client (aprovan) — DONE

- `client/web/src/lib/workspace-vfs.ts`: `startLiveWorkspaceSync` rewritten
  to poll `GET /fs/changes` with `since`/`If-None-Match` instead of the
  full unprefixed `/fs` listing. 304 → no-op; 200 → per-path watcher events
  for the reported deltas; `reset: true` (first poll, scope switch, or
  server journal loss) → silent rebaseline, matching the prior
  hash-diff baseline's "observe, don't announce" behavior. The full
  listing no longer appears anywhere in the tick path. 8s visibility-gated
  cadence unchanged.
- Compatibility scenario: verified by code inspection, not an automated
  test — `client/web` has no wired test runner (`package.json` has no
  `test` script, no `vitest.config`; three `*.test.ts` files exist under
  `src/lib/` but appear orphaned from any runner). A 404/network failure
  from an old server hits the existing `if (!response.ok) return` /
  `catch` and simply no-ops until the next tick, so deploy ordering is a
  recommendation, not a hard requirement. Noted explicitly in the PR body.

## Verify results

Registry (`docker compose up -d` for dynamodb-local + MinIO):

```
pnpm --filter @aprovan/workspace test tests/change-feed.test.ts tests/auth-cache.test.ts tests/vfs-mounts.test.ts tests/fs.test.ts tests/fs-s3.test.ts
→ 5 files, 41/41 passed

pnpm --filter @aprovan/workspace typecheck
→ clean
```

Also ran the full workspace suite as a regression check (not required by
the brief, done for confidence given the memberships/groups/sessions
edits): `pnpm --filter @aprovan/workspace test` → **47 files, 432/432
passed**.

Aprovan:

```
pnpm --filter @aprovan/patchwork-web build
→ clean (tsc + vite build)
```

(First attempt in each fresh worktree failed on missing built workspace
dependencies — `@utdk/agent`, `@aprovan/patchwork-compiler`,
`@aprovan/patchwork-editor`, etc. Not a pristine-main issue with my code;
resolved with `pnpm turbo run build --filter=<pkg>^...` before running the
package's own Verify command, standard for a fresh worktree checkout.)

`@aprovan/registry-web typecheck` was not run — out of scope per the brief.

## PR URLs

- Registry: **https://github.com/AprovanLabs/registry/pull/75** (branch
  `metadata-cost-phase-a`)
- Aprovan: **https://github.com/AprovanLabs/aprovan/pull/2** (branch
  `metadata-cost-phase-a`, body states the dependency on the registry PR)

## Deviations (summary)

1. `invalidatePrincipal` wiring touches `memberships.ts`, `groups.ts`,
   `sessions.ts` — outside stream 3's listed Touches globs but required by
   the acceptance criteria and not owned by another named parallel stream.
2. `startGcBlobsSchedule()` is implemented but not wired into `server.ts`
   startup (that file is outside stream 4's Touches globs); it's a
   dead-until-called export, safe and inert.
3. Stream 2's "compatibility scenario" is verified by code review rather
   than an automated test, because `client/web` has no wired test runner.

No interface in tech-plan.md was found unimplementable; nothing here
required stopping.

## Estimated read-op reduction

From the tests' own assertions (not extrapolated beyond what's directly
observed):

- **Change feed (idle tab)**: the full-partition Dynamo `Query` every 8s
  per visible tab → **0 store reads** on an unchanged workspace (304 path
  asserted via a store-method spy in `change-feed.test.ts`). This was
  explicitly the largest single item in the tech-plan's cost breakdown.
- **Auth cache**: 3 sequential reads (Sessions, Memberships, UserGroups)
  per request → at most 3 reads per (token, workspace) per 60s TTL window,
  regardless of request volume. The 20-repeat-request test observed **1
  read of each** instead of 20 — a 95% reduction in that window; the
  reduction approaches 100% as request volume within a TTL window grows.
- **Mounts cache**: 1 read per FS operation (every list/read/write/delete
  calls `readMounts` via `assertNotMounted`/`mountEntries`/`mountRead`) →
  at most 1 read per workspace per 30s TTL window. The 10-repeat-read test
  observed **0 additional reads** after the first (warm) read.
- **FS write versioning**: 50 rewrites of the same `.services/**` path
  previously minted 50 version rows (and 50 permanent S3 blobs, never
  GC'd) → the test observed **≤1 surviving row** (SQLite) / **0 version
  rows** (S3+Dynamo) after 50 writes — a ≥98% reduction in accumulated
  index rows for hot service-state paths, with the GC sweep now able to
  reclaim the orphaned blobs after the 7-day safety age instead of them
  living forever.

These four numbers roughly track the tech-plan's cost breakdown
("Key investigation findings"), which attributed the bulk of the current
~$5/user/month to exactly these four pathologies.
