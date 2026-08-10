# Brief: Bug fixes — script privacy claim, share identity, discarded commit changes

## Mission

Three independent, already-diagnosed bugs, fixed together under one stream
(not because they share files — they don't — but because they're this
change's Goal-6 bundle): (1) a workflow-visibility doc comment falsely
claims unbundled scripts are creator-private when any member can `vfs.read`
them; (2) workspace shares key on a mutable app `name`, so renaming an app
silently breaks every share pointed at it; (3) the client's commit-detail
fetcher requests the server's `changes` payload and then drops it before
returning it to callers.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 4 ("Access follows the
   principal") and Decision **D4** (slug/rename semantics)
2. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 6, Non-Goals ("No
   new privacy mechanism", "No app identity work")
3. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Decisions **D4**
   and **D5**, and "Interfaces & Data" → `shareAllows`/`appFsAllowed`
   contract
4. `openspec/changes/iw9-f6-cleanup-rename/specs/workflow-script-visibility/spec.md`
   (full text — reproduced in Acceptance criteria below)
5. `openspec/changes/iw9-f6-cleanup-rename/specs/app-share-identity/spec.md`
   (full text — reproduced in Acceptance criteria below)
6. `openspec/changes/iw9-f6-cleanup-rename/specs/commit-detail-fidelity/spec.md`
   (full text — reproduced in Acceptance criteria below)
7. `server/workspace/src/workflows/store.ts:207-217` (`workflowVisibleTo`,
   `listVisibleRegistrations`)
8. `server/workspace/src/apps/store.ts:207-211,370-374,493` (`AppPaths`,
   `saveApp`'s alias index, `shareAllows`/`appFsAllowed`)
9. `server/workspace/scripts/migrate-app-records.ts` (structural pattern to
   model the new migration script on)
10. `client/web/src/lib/vfs-commits.ts:41-55` (`fetchCommitDetail`,
    `CommitDetail`)
11. Cross-reference only, **do not edit**: `apps/store.ts`'s
    `partitionAccess` region (~lines 276-310) belongs to the concurrent
    `iw9-f2-shared-partition` change — this stream's footprint in that file
    is confined to `WorkspaceShare`/`shareAllows`/`appFsAllowed`
    (~lines 154-167, 473-500). Re-read the live file rather than trusting
    only the cited line numbers, since another change may be editing it
    concurrently.

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §7)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/workflows/store.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/scripts/migrate-shares-to-appid.ts, aprovan/server/workspace/tests/app-share-identity.test.ts, aprovan/client/web/src/lib/vfs-commits.ts, aprovan/client/web/src/lib/__tests__/vfs-commits.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-share-identity.test.ts && pnpm --filter @aprovan/patchwork-web test -- src/lib/__tests__/vfs-commits.test.ts

- [ ] 7.1 `server/workspace/src/workflows/store.ts`: rewrite
      `workflowVisibleTo`'s doc comment (lines 207-211) and
      `listVisibleRegistrations`' doc comment to state the filter is a
      listing convenience only — never claim "creator-private" — per
      tech-plan D4. No behavior change to the filtering logic itself.
- [ ] 7.2 `server/workspace/src/apps/store.ts`: change `shareAllows`'s
      `app` parameter to take an `appId` and match against it; change
      `appFsAllowed`'s call site (line ~499) to pass `app.id` instead of
      `app.name`; add a read-time fallback that resolves any
      `WorkspaceShare.apps` entry that isn't a live `appId` through the
      existing name→appId alias index before comparing (tech-plan D5).
      Update the `WorkspaceShare.apps` doc comment to say "app ids," not
      "app names."
- [ ] 7.3 New script `server/workspace/scripts/migrate-shares-to-appid.ts`
      (model on `migrate-app-records.ts`'s structure): for every workspace's
      `WorkspaceConfig`, rewrite each `shares[].apps` entry from name to
      `appId` via the alias index; supports a dry-run flag that logs
      intended rewrites without writing (tech-plan D5, Risks).
- [ ] 7.4 New test `server/workspace/tests/app-share-identity.test.ts`:
      grant a share to an app, rename the app, assert `appFsAllowed`/
      `shareAllows` still allow the same path for the same app after the
      rename (spec `app-share-identity`, scenario "Renaming an app does not
      change what its shares allow"); also assert a pre-existing name-keyed
      `WorkspaceConfig.shares` entry still resolves via the fallback (spec
      scenario "An existing share keeps working after upgrade").
- [ ] 7.5 `client/web/src/lib/vfs-commits.ts`: add `changes?: unknown` to
      the `CommitDetail` interface and include `raw.changes` in
      `fetchCommitDetail`'s return object (tech-plan "Interfaces & Data").
- [ ] 7.6 New test `client/web/src/lib/__tests__/vfs-commits.test.ts`:
      mock `invokeNamespaceTool` to return a `show` response with a
      `changes` payload; assert `fetchCommitDetail` includes it in the
      resolved `CommitDetail` (spec `commit-detail-fidelity`, both
      scenarios — with and without a `changes` payload present).
- [ ] 7.7 Grep gate: `grep -n "creator-private" server/workspace/src/workflows/store.ts`
      returns nothing; `grep -n "app.name" server/workspace/src/apps/store.ts | grep shareAllows`
      returns nothing.

## Acceptance criteria

Full text of all three specs this stream implements:

### `workflow-script-visibility` (full)

```
## ADDED Requirements

### Requirement: Unexported workflow registration visibility is a listing convenience, not an access boundary
`workflowVisibleTo` and `listVisibleRegistrations`
(`server/workspace/src/workflows/store.ts`) filter which registrations a
listing surface shows a caller. No code comment, doc, or UI string SHALL
describe this filter as making a workflow's script "creator-private" or
otherwise access-controlled: the script itself lives at an ordinary
workspace path, readable by any workspace member through `vfs.read`/`vfs.list`
regardless of registration visibility.

#### Scenario: A non-creator member can read an unexported workflow's script
- **WHEN** a workspace member who is not the registration's `createdBy` and
  is not covered by any `exportedBy` app calls `vfs.read` on the workflow's
  `scriptPath`
- **THEN** the read succeeds — visibility filtering never gates file access

#### Scenario: No surface claims privacy for a member-readable script
- **WHEN** the registrations listing, its API response, or its client
  rendering describes an unexported registration
- **THEN** nothing in that surface asserts the script is private or hidden
  from other members — the filter is documented only as decluttering one's
  own registration list

### Requirement: Real script privacy remains explicitly deferred
This change SHALL NOT introduce a guarded-prefix mechanism or any other new
access-control boundary for workflow scripts. Genuine per-script privacy is
deferred to the partition and grant work owned by other IW-9 streams (F2,
C); this change only removes the false claim.

#### Scenario: No new storage prefix or ACL is introduced
- **WHEN** this change ships
- **THEN** `scriptPath` resolution and storage are unchanged — no new
  guarded/private prefix exists for workflow scripts
```

### `app-share-identity` (full)

```
## ADDED Requirements

### Requirement: Workspace shares grant by durable app identity
`WorkspaceShare.apps` and `shareAllows` (`server/workspace/src/apps/store.ts`)
SHALL key on an app's durable `appId`, never on its mutable `name`. Renaming
an app (`mv` of its directory, per D4) SHALL NOT change which shares apply to
it, and SHALL NOT require a workspace admin to re-enter any
`WorkspaceConfig.shares` entry.

#### Scenario: Renaming an app does not change what its shares allow
- **WHEN** an app with an active share grant is renamed
- **THEN** `shareAllows`/`appFsAllowed` evaluated for that app (by its
  unchanged `appId`) returns the same result before and after the rename

#### Scenario: A share still resolves after the app is renamed twice
- **WHEN** an app is renamed more than once after a share was granted to it
- **THEN** the share continues to resolve correctly by `appId` at every point,
  with no re-grant required

### Requirement: Pre-existing name-keyed shares continue to work without manual migration
`WorkspaceConfig.shares` entries written before this change stored an app's
`name` in the `apps` field. This change SHALL NOT strand those entries: they
SHALL keep granting the same effective access after the change ships,
resolved transparently (e.g. via the existing name→appId alias index) rather
than requiring every workspace to re-save its share configuration.

#### Scenario: An existing share keeps working after upgrade
- **WHEN** a `WorkspaceConfig.shares` entry written under the old (name-keyed)
  scheme is evaluated by the upgraded `shareAllows`
- **THEN** it grants access to the same app it granted before, without an
  admin having edited the share

### Requirement: `appFsAllowed` resolves by durable identity end-to-end
The call path from an app session's filesystem access check
(`appFsAllowed`) down to `shareAllows` SHALL carry the app's `appId`, not its
`name`, as the identity used for the share-list membership check.

#### Scenario: A share scoped to one app does not leak to a same-named future app
- **WHEN** app A is deleted and a new, unrelated app is later given the same
  `name` A used to have
- **THEN** shares originally granted to A's `appId` do not apply to the new
  app, because membership is keyed on the old `appId`, which the new app does
  not have
```

### `commit-detail-fidelity` (full)

```
## ADDED Requirements

### Requirement: The client commit-detail accessor returns the change summary it fetches
`fetchCommitDetail` (`client/web/src/lib/vfs-commits.ts`) calls the gateway's
`vcs.show`, which already returns a `changes` payload (added/modified/removed,
per `vcs-diff-wire-fidelity`). `fetchCommitDetail` SHALL include that payload
in its return value instead of discarding it after fetching it.

#### Scenario: fetchCommitDetail surfaces the server's change summary
- **WHEN** `fetchCommitDetail(commit)` resolves for a commit that has a
  parent
- **THEN** the resolved `CommitDetail` includes the `changes` the server
  returned for that commit, available to callers without a second fetch

#### Scenario: A root commit with no changes payload degrades cleanly
- **WHEN** `fetchCommitDetail` is called for a commit whose server response
  omits `changes` (e.g. no comparable parent)
- **THEN** the resolved `CommitDetail` reflects that absence (e.g. an empty
  or undefined `changes`) rather than throwing
```

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/workspace test -- tests/app-share-identity.test.ts
pnpm --filter @aprovan/patchwork-web test -- src/lib/__tests__/vfs-commits.test.ts
grep -n "creator-private" server/workspace/src/workflows/store.ts
grep -n "app.name" server/workspace/src/apps/store.ts | grep shareAllows
```

Both new test files must pass. Both grep commands must produce no output.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  ("Interfaces & Data" → `shareAllows`/`appFsAllowed`, `CommitDetail`) are
  fixed — if one seems wrong, stop and report instead of changing it.
- Do not route unexported scripts under a guarded/private prefix —
  explicitly rejected in D4 (real access-control surface belongs to F2/C,
  not a same-file bugfix).
- The share-identity migration must be a **read-time fallback + one-time
  migration script**, not a hard cutover — a hard cutover risks silently
  revoking access already granted (D5's explicit rejection).
- `changes` on `CommitDetail` is typed `unknown` deliberately — its concrete
  shape is F1's contract to pin, not this stream's.
- `apps/store.ts` is shared with the concurrent `iw9-f2-shared-partition`
  change's `partitionAccess` work — confine edits to `WorkspaceShare`/
  `shareAllows`/`appFsAllowed` only; do not touch `partitionAccess`.
- Do not modify files outside: `server/workspace/src/workflows/store.ts`,
  `server/workspace/src/apps/store.ts`,
  `server/workspace/scripts/migrate-shares-to-appid.ts`,
  `server/workspace/tests/app-share-identity.test.ts`,
  `client/web/src/lib/vfs-commits.ts`,
  `client/web/src/lib/__tests__/vfs-commits.test.ts`.

## Model

**Sonnet.** This stream is not named in `IW-9-EXECUTION-OVERVIEW.md`'s Haiku
tier — it involves a real re-keying migration with a read-time compatibility
bridge (D5) and a false-claim doc-comment fix that requires reading the
actual access-control behavior correctly (D4). Run on Sonnet as the default
tier, not a Haiku fallback.

## Report back

When done: check off tasks 7.1–7.7 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/07-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything the next wave needs to know.
