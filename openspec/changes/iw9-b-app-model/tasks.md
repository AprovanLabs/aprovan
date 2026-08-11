# iw9-b-app-model — Tasks

External dependencies (both complete, Wave 0): **iw9-f2 `shared-partition`**
(consume `apps/instances.ts`, `AppInstallation.hosting` field +
`saveInstall`'s immutability guard — frozen contract, tech-plan.md D5) and
**iw9-f4 `app-identity`** (consume `loadAppYaml`, `reconcileApp`,
`AppYaml.hostModes`, `appIconFallback`, the `/a`/`/w` URL routers — frozen
contract, tech-plan.md throughout). No stream below re-implements or stubs
either; both are landed.

Hard constraints (repeat of PRD/tech-plan Non-Goals, restated because they
are cross-stream trip hazards):

- **Never touch** `server/workspace/src/apps/releases.ts` or the
  entry-version helpers at `apps/store.ts:422-451` (`listEntryVersions`/
  `readEntryVersion`/`restoreEntryVersion`) — owned and deleted by iw9-a.
- **Never touch** `packages/registry-ui/src/apps/versions.tsx` — iw9-a's.
- Capability/grant fields are stored (via F4's `capabilities`/`requires` on
  `AppYaml`) but never enforced here — iw9-c (Wave 2) enforces them.
- All work is `Repo: aprovan`; every deletion task's Verify command still
  greps the **registry** checkout too, per IW-9's cross-repo hard rule 4
  (grep-gates run in both repos regardless of which repo the deletion
  happens in). `AAP` = `/Users/jacob/Documents/Code/AprovanLabs/aprovan`,
  `REG` = `/Users/jacob/Documents/Code/AprovanLabs/registry` in Verify
  commands below.

Ordering mirrors tech-plan.md's Rollout: server model (1) → domain modules
(2-5, parallel) → wiring (6) → migration (7) → client (8-11, parallel).

## 1. Server — App roots + overlap validation

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/src/apps/roots.ts, aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/tests/apps-roots.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-roots.test.ts

- [x] 1.1 In `apps/store.ts`, delete the `entry: string` and `paths: string[]`
      fields from the manifest's operational shape (`store.ts:90-105`);
      derive the single binding from F4's `AppRecord.root` instead
      (`app-roots` — "Every app occupies exactly one root under Apps/").
- [x] 1.2 Narrow `appPathAllowed`/`appPathServable` (`store.ts:328-338`) to
      check containment against the one `root` string instead of iterating a
      `paths[]` array.
- [x] 1.3 Create `apps/roots.ts` exporting
      `assertRootAvailable(workspaceId, root): Promise<void>` — 409 when
      `root` equals, is contained by, or contains any existing app's root in
      the workspace (tech-plan D2's both-directions containment check).
- [x] 1.4 Wire `assertRootAvailable` into the publish path in
      `apps/service.ts` (the `resolveBinding`-adjacent call site,
      `service.ts:~474`); reject (400) any publish/update request that still
      supplies extra `paths[]` entries, pointing the error at mounts
      (`app-roots` — "Publish with extra paths rejected").
- [x] 1.5 Delete `resolveBinding`'s dedupe-only paths merge
      (`apps/service.ts:460-491`) now that binding = root only; publish calls
      F4's `reconcileApp` for identity/derived-state instead.
- [x] 1.6 Add `tests/apps-roots.test.ts`: single-root binding on publish;
      nested-publish 409 (both containment directions); extra-paths 400;
      invalid `app.yaml` keeps last-good derived state without throwing at
      app users (`app-roots` scenarios, all four).

## 2. Server — Personal app + promote-out

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/personal.ts, aprovan/server/workspace/tests/apps-personal.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-personal.test.ts

- [x] 2.1 Create `apps/personal.ts` exporting
      `ensurePersonalApp(workspaceId, actor): Promise<AppRecord>` — lazy
      create only (slug `personal`, root `Apps/personal`), no special flag on
      the manifest, recognized by slug at this one creation site only
      (tech-plan D3).
- [x] 2.2 Export `promoteApp({workspaceId, source, slug, actor})` — (1)
      `assertRootAvailable` (from stream 1), (2) copy the VFS subtree to
      `Apps/<slug>`, (3) call F4's `reconcileApp` to mint the new appId
      (first-sight flow), (4) delete the source subtree last — copy-then-
      delete-last is the atomicity strategy (tech-plan D3; no VFS move
      primitive exists).
- [x] 2.3 Grep-confirm no `isPersonalApp`/`PERSONAL_APP_NAME`/
      `PERSONAL_PREFIX`/`.personal` special-casing was reintroduced (baseline
      is already clean — keep it that way; do not add any).
- [x] 2.4 Add `tests/apps-personal.test.ts`: lazy creation on first one-off
      (`personal-app` scenario 1); promote moves/mints/re-points (scenario);
      promote is atomic under a simulated failure before the delete step
      (source subtree intact, no orphan row); promoted app has no back-link
      to Personal and behaves like any independently-authored app.

## 3. Server — Install-as-copy + hosting mode

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/install.ts, aprovan/server/workspace/src/routes/live-apps.ts, aprovan/server/workspace/src/routes/apps.ts, aprovan/server/workspace/tests/apps-install-copy.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-install-copy.test.ts && grep -rn "cachedOriginRelease" AAP/server/workspace/src REG 2>/dev/null

- [x] 3.1 Rebuild `AppInstallation` in `install.ts` (`install.ts:33-50`):
      drop `resolvedRelease`, `editing`, `prefix`; add `pin: {tag?: string,
      commit: string}` (commit always present; consumes iw9-a's
      release-as-tag `resolveReleaseTag`, falling back to the app root's VCS
      head commit when a tag interface is unavailable), and F2's `hosting:
      "managed" | "hosted"` field plus a new `hostingWorkspaceId?: string`
      (tech-plan D4/D5 — field names match F2's landed contract verbatim,
      never `hostingMode`).
- [x] 3.2 Rebuild install creation on `materializeFork`'s copy loop
      (`install.ts:262-285` is the seed): copy `app.yaml` + the origin root
      into `Apps/<slug>` in the installer's workspace, validated via
      `assertRootAvailable` (stream 1); on slug collision, fail with 400
      naming the conflict (no auto-suffix — PRD Open Q2 pending; ux.md
      recommends auto-suggest but the API contract stays explicit-choice
      until that question is answered).
- [x] 3.3 Delete the request-time origin reads: `cachedOriginRelease` and the
      origin-read branches in `routes/live-apps.ts:119-126` and
      `routes/apps.ts:115-120,169-171`; serving reads only the local copy.
- [x] 3.4 Implement the update-check/apply pair: `apps.updateCheck` compares
      the pin against the origin's current release/commit and reports
      "v(N) available"; `apps.applyUpdate` re-copies the archive, requiring
      explicit confirmation when the install has local edits, and is never
      triggered implicitly (`app-install-lifecycle` — "Update is an explicit
      re-copy", "Local edits guard the update").
- [x] 3.5 Confirm hosting-mode enforcement: reject an install naming a mode
      the app's `hostModes` doesn't cover any flavor of; when >1 hosted
      flavor and/or managed is declared, require an explicit mode in the
      request (400 listing options) — no server-side default guess
      (`app-data-hosting` — "Multi-mode requires the pick").
- [x] 3.6 Add `tests/apps-install-copy.test.ts`: install copies the archive
      and origin is never read at serve time; origin deletion doesn't break
      an existing install (only update-check reports it); update is an
      explicit re-copy with old→new reported; local-edit guard on update;
      single-mode skip vs multi-mode 400-with-options; hosting field
      immutable post-creation (attempt to flip via configure → 400).

## 4. Server — Artifact sharing (person/link) + anonymous read route

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/vfs/shares.ts, aprovan/server/workspace/src/routes/share.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/tests/vfs-shares.test.ts | Verify: pnpm --filter @aprovan/workspace test -- vfs-shares.test.ts

- [x] 4.1 Create `vfs/shares.ts`: share record type + store under
      `svc#vfs#shares/<shareId>` (`{shareId, path, kind: "person" | "link",
      grantee?: sub, keyHmac?, expiresAt, createdBy, revokedAt?}`, tech-plan
      D6); `createPersonShare`, `createLinkShare` (mints a 256-bit key,
      returns it once, stores only `HMAC-SHA256(serverSecret, key)`),
      `resolveLinkShare(key)` (recompute-and-constant-time-compare lookup,
      checks expiry/revocation), `revokeShare`, `listSharesCreatedBy`,
      `listSharesReceivedBy`.
- [x] 4.2 Wire person-share reads into the existing authenticated vfs read
      path: a share check at the same choke point as partition access
      (`apps/store.ts`'s `assertPartitionAccess` family), deny-as-404 on no
      share/expired/revoked (`artifact-sharing` — "Recipient reads, others
      cannot", "Revocation is immediate").
- [x] 4.3 Create `routes/share.ts`: `GET /share/:key/*subpath?` — anonymous,
      resolves the link, serves file bytes read-only. This module SHALL
      import no record/workflow/tool modules (invariant 9 made structural,
      per tech-plan D6) — enforce by keeping its only internal import as
      `vfs/shares.ts` + the raw FS read primitive, never `apps/service.ts`,
      `records.ts`, or any workflow module.
- [x] 4.4 Confirm `visibility` (installability) and share records are read
      from entirely independent code paths — no function computes one from
      the other (`artifact-sharing` — "Shared file, private app").
- [x] 4.5 Add `tests/vfs-shares.test.ts`: store holds no usable key (HMAC
      only); expiry and revocation both 404 indistinguishably from
      never-existed; anonymous read succeeds while write/keyvalue/workflow
      attempts with the same link key all fail 401/404; link doesn't leak
      sibling/parent listing; `routes/share.ts` module graph contains no
      import from `records.ts`, `apps/service.ts`, or any `workflows/*`
      module (a static import-check test, not a runtime one).

## 5. Server — Mounts procedures (validation over the existing engine)

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/vcs/mounts-procedures.ts, aprovan/server/workspace/tests/vcs-mounts-procedures.test.ts | Verify: pnpm --filter @aprovan/workspace test -- vcs-mounts-procedures.test.ts

- [x] 5.1 Create `vcs/mounts-procedures.ts` calling the existing
      `readMounts`/`addMount`/`removeMount` (`vcs/mounts.ts`, unmodified per
      tech-plan D7) with procedure-side validation added: prefix shape,
      overlap against app roots (reuse `assertRootAvailable` from stream 1
      applied to the mount's prefix — tech-plan D7) and against other
      mounts, reject `crdt` backend (engine-reserved), reject a target that
      is another app's root (`vfs-mounts` — "App-root targets are
      rejected").
- [x] 5.2 Support app-scoped mounts: a mount whose prefix lies under an app's
      root is recognized as app-scoped (no second mount store — tech-plan
      D7); confirm such mounts are readable through the app's ordinary path
      authorization (stream 1's narrowed `appPathAllowed`).
- [x] 5.3 Add `tests/vcs-mounts-procedures.test.ts`: add-then-read-through;
      overlapping mount (vs. app root, vs. another mount) rejected 409;
      `crdt` backend rejected; app-root-as-mount-target rejected 400;
      app-scoped mount reads succeed via the app's own path authorization.

## 6. Server — Procedure/tool wiring

> Depends-on: 2, 3, 4, 5 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/src/native-dispatch.ts | Verify: pnpm --filter @aprovan/workspace typecheck && pnpm --filter @aprovan/workspace test -- apps-roots apps-personal apps-install-copy vfs-shares vcs-mounts-procedures

- [x] 6.1 Register `apps.promote {source, slug} → {appId, root}` in
      `apps/service.ts`, delegating to stream 2's `promoteApp`.
- [x] 6.2 Register `apps.install {appId | directoryRef, mode?, slug?,
      bindings?, config?} → AppInstallation`, `apps.updateCheck {installId}`,
      `apps.applyUpdate {installId, confirmOverwrite?}` in `apps/service.ts`,
      delegating to stream 3's install module.
- [x] 6.3 Register `vfs.share {path, person? | link?, expiresAt}`,
      `vfs.shares.list`, `vfs.shares.revoke` in `apps/service.ts` (or the vfs
      procedure surface it already extends), delegating to stream 4's
      `vfs/shares.ts`.
- [x] 6.4 Register `vcs.mounts.list/add/remove` tool schemas in
      `routes/tools.ts` alongside the existing `vcs.*` verbs
      (`nativeVcsDiscoveryEntries`, `routes/tools.ts:272`) and dispatch in
      `native-dispatch.ts`, delegating to stream 5's
      `vcs/mounts-procedures.ts`.
- [x] 6.5 Confirm `routes/tools.ts`'s VCS scope-arg schema additions from
      iw9-a (`vcs.commit/log/diff` scope args) are untouched by this stream's
      edits — additive registration only, no edits inside iw9-a's schema
      blocks (serialization rule: "A's VCS schema changes land before C's
      grant-visibility work" — B's edits here must not collide either).

## 7. Server — Migration (paths[] extras → mounts; installs → copy semantics)

> Depends-on: 1, 3, 5 | Repo: aprovan | Touches: aprovan/server/workspace/scripts/migrate-app-roots.ts, aprovan/server/workspace/scripts/migrate-installs-to-copy.ts, aprovan/server/workspace/tests/migrate-app-model.test.ts | Verify: pnpm --filter @aprovan/workspace test -- migrate-app-model.test.ts

- [ ] 7.1 Write `scripts/migrate-app-roots.ts`: for every existing manifest,
      set `root = paths[0]`; for each remaining `paths[]` entry, call
      stream 5's mount-add logic to create an equivalent mount under the
      app's root; write `app.yaml` at the root if absent (via F4's
      `reconcileApp`, first-sight semantics). Idempotent — re-running a
      completed migration is a no-op (compare current state before writing).
      Snapshot the pre-migration store state before mutating (rollback
      artifact, tech-plan Rollout step 5).
- [ ] 7.2 Write `scripts/migrate-installs-to-copy.ts`: for every install
      record, materialize a copy of the resolved release's content into the
      installer's workspace (seed: the deleted `materializeFork` logic,
      preserved here before stream 3 deletes it from `install.ts`), set
      `pin` from `resolvedRelease` → commit id, set `hosting: "managed"`
      (matches F2's TD4 default-absent-reads-as-managed), drop
      `editing`/`prefix`. Installs whose origin is already gone and never
      materialized are flagged broken in the install list, not silently
      dropped (`app-install-lifecycle` REMOVED-requirement migration note).
- [ ] 7.3 Add `tests/migrate-app-model.test.ts`: a manifest with
      `["Apps/tasks", "shared/lib"]` migrates to root `Apps/tasks` +
      a mount at `shared/lib`, and reads of `shared/lib/**` still succeed
      post-migration (`app-roots` — "Migrated app keeps reading its
      extras"); running the script twice produces no duplicate mounts or
      double-writes; an install with a dead origin migrates to a flagged
      broken state rather than being dropped; a pre-migration snapshot file
      is written before any mutation.
- [ ] 7.4 Grep-gate: confirm no `paths` binding remains in app-model server
      code and `editing`/`prefix`/`resolvedRelease`/`cachedOriginRelease` are
      gone — run in both repos (MIGRATION-DEBT rule): `grep -rn
      "\.paths\b" AAP/server/workspace/src/apps REG/packages 2>/dev/null`
      and `grep -rn "resolvedRelease\|cachedOriginRelease" AAP/server
      REG 2>/dev/null` both return nothing outside historical
      migration-script references.

## 8. Client — Sidebar IA (Files + Apps launcher, native surfaces demoted)

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/features/sidebar/**, aprovan/client/web/src/lib/native-surfaces.tsx | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 8.1 In `WorkspaceSidebar.tsx`, add an **Apps** section between Files
      (`:144`) and the native-surfaces block (`:200-213`): one row per
      `apps.list` entry (own, Personal, installed, indistinguishable in
      kind), each rendering an `AppIconTile` — custom icon from `app.yaml`
      when present, else F4's `appIconFallback(slug)` letter+color
      (`app-launcher` — "Every launcher row has an icon").
- [ ] 8.2 Row click opens the app's pane/tab directly (never a management
      view); the Apps section header carries the sole affordance into
      `native://apps` management (`app-launcher` — "Launcher opens the
      app").
- [ ] 8.3 Move the `NATIVE_SURFACES.map` block (`:200-213`) behind a
      secondary/collapsed **Workspace** affordance — placement per
      ux.md Open Question 3 (recommended: collapsed section). Every
      `native://<id>` tab key keeps resolving through the unchanged
      `NATIVE_SURFACES` registry (`apps-native-surface` — "Surface registry
      is the single projection"; no changes to `native-surfaces.tsx`'s
      registry entries, only to where `WorkspaceSidebar` renders them).
- [ ] 8.4 Handle sidebar loading/empty/error states per ux.md's Sidebar
      screen: row skeletons while `apps.list` resolves; "No apps yet" row
      plus create/install entry point on an empty workspace; inline retry
      row on `apps.list` failure without blocking Files/Workspace; a warning
      glyph (not a broken pane) on a row whose app has a reconcile error.

## 9. Client — Install flow + hosting picker + promote-out UI

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/components/apps/** | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 9.1 Build the install dialog: reads the target app's declared
      `hostModes`; no picker when exactly one bucket (managed-only or
      hosted-only) is available; when both managed and a hosted flavor are
      declared, render the two-option picker with the exact copy from
      ux.md/PRD invariant 5 — managed: *"Data lives in your own space..."*;
      hosted: loud disclosure naming the host, visually secondary, never a
      plain radio row (`app-data-hosting` — "Multi-mode requires the pick").
- [ ] 9.2 Wire the 400-with-declared-modes response into the picker (a
      mode-less API call surfaces the accepted options inline, per
      tech-plan's owned `apps.install` contract) and the explicit-slug-on-
      collision 400 into a field-scoped error (no auto-suffix client
      behavior yet — PRD Open Q2 unresolved, ux.md flow step 3 documents the
      explicit-choice fallback).
- [ ] 9.3 Build the promote-out dialog: source path (read-only), editable
      slug field pre-filled from the source folder name, live preview URL;
      collision shows a field-scoped error, any other failure shows a
      retry-safe banner leaving the source subtree untouched (ux.md
      Promote-out dialog states).
- [ ] 9.4 Build the update-available affordance in the apps management
      surface: "v(N) available → Copy again", explicit local-edits-overwrite
      confirmation when the install has local edits, never an automatic
      trigger (`app-install-lifecycle` — "Update is an explicit re-copy").

## 10. Client — Sharing UI

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/components/sharing/** | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 10.1 Build the Share dialog (Person / Link tabs) per ux.md: Person tab
      is a workspace-member combobox; Link tab has an expiry `Select`
      (default per ux.md Open Question 2, recommended 7 days with an
      explicit "No expiry" opt-in) and a one-time key reveal (monospace,
      copy button, persistent "won't be shown again" caption).
- [ ] 10.2 Build the **Shared with me** listing (flat list, sharer identity,
      shared date, empty state "Nothing shared with you yet").
- [ ] 10.3 Build the **Manage shares** table (kind, recipient/label, created,
      expiry, status, revoke action via `AlertDialog` confirmation); a failed
      revoke leaves the row in a distinct "revoke failed, retry" state, never
      silently reverting to "active".
- [ ] 10.4 Build the anonymous link-landing view: read-only file render, no
      sibling/parent navigation, no edit affordance; expired/revoked links
      render a generic "This link isn't available" page indistinguishable
      from a never-existed link.

## 11. Client — Mounts management UI

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/components/mounts/** | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 11.1 Build the mounts table (prefix, type, backend, pinned ref/version,
      creator, remove action) and the add-mount form (git repo + ref +
      optional subpath, or s3 bucket/prefix), backed by stream 6's
      `vcs.mounts.*` procedures.
- [ ] 11.2 Mark mounted subtrees in the file tree with a read-only badge
      (`vfs-mounts` — "Mounted subtree is marked"); overlap (409) and
      backend-unreachable (400) errors render as visually distinct inline
      messages per ux.md's Mounts panel states.
- [ ] 11.3 Confirm add/remove reflect in the list and tree without a reload
      (`vfs-mounts` — "Add via UI").
