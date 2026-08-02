# Tasks — data-auth-model (WS-6)

Paths are today's locations (registry repo); if WS-4 has moved `apps/workspace` into the aprovan
repo, apply the same edits at the moved paths and adjust `--dir` in Verify accordingly.
Streams 1, 2, 3 are independent and parallel-safe (disjoint paths). Stream 4 additionally
requires WS-3 (`registry-server-extraction`) to have shipped Profiles, group→profile membership
storage, and the auth-time grant resolver.

## 1. Per-user partition enforcement (server)

> Depends-on: - | Touches: registry/apps/workspace/src/apps/store.ts, registry/apps/workspace/src/apps/service.ts, registry/apps/workspace/src/services.ts, registry/apps/workspace/src/routes/fs.ts, registry/apps/workspace/tests/partition-access.test.ts, registry/docs/app-data.md | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace test

- [x] 1.1 Add `partitionAccess(path, callerSub, hiddenPrefixes)` and
      `assertPartitionAccess(workspaceId, callerSub, path)` to `apps/store.ts` per the tech-plan
      interface (tech-plan D1/D2; owner = segment after `.personal/data/` or `<appRoot>/data/`);
      unit-test the pure function including edge paths (`.personal/data`, `<root>/data` with no
      sub segment, nested subs).
- [x] 1.2 Call `assertPartitionAccess` in `services.ts` vfs `read`, `write`, `delete` (after
      `resolveVfsPath`, before store access; skip when `ctx.appScope` is set) — covers
      version-pinned (`hash`) reads (spec per-user-data "Foreign partition access is denied").
- [x] 1.3 Call the guard in `routes/fs.ts` `GET/PUT/DELETE /fs/:path` (spec scenario: HTTP plane
      404s; response shape identical to a nonexistent path).
- [x] 1.4 Change both listing filters (`services.ts` vfs `list`, `routes/fs.ts` `GET /fs`) to
      hide only `"foreign"` partitions, surfacing the caller's own (spec "Listings include the
      caller's own partition"; tech-plan D2). Leave `vcs/store.ts` `visibleEntries` untouched —
      snapshots keep excluding all partitions.
- [x] 1.5 Extend the audited `apps.data` procedure to file partitions (`path?` arg per tech-plan
      Open Question 1), keeping the app-admin gate + audit entry; reject `name: "personal"` with
      the no-admin-override error (spec "Admin access ... explicit and audited"; tech-plan D3).
- [x] 1.6 Integration tests: foreign read/write/delete 404 on both planes; hash-pinned read 404;
      owner full access; own partition listed, foreign not; snapshot/commit/restore never touch
      partitions; `apps.data` file access audited, personal rejected.
- [x] 1.7 Update `registry/docs/app-data.md` "file plane forgets app data" section: hiding is now
      enforcement; document the 404 semantics and the personal no-override rule.

## 2. GroupPrefixGrants excision

> Depends-on: - | Touches: registry/apps/workspace/src/groups.ts, registry/apps/workspace/src/routes/groups.ts, registry/apps/workspace/src/db/schema.ts, registry/apps/workspace/tests/groups-dynamodb.test.ts, registry/infra/src/stack.ts, registry/apps/registry/src/components/AdminPanel.tsx | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace test && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/registry typecheck && ! grep -rn "GroupPrefixGrants\|listGrantedPrefixes\|prefix-grants\|PrefixGrant" /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace/src /Users/jacob/Documents/Code/AprovanLabs/registry/infra/src /Users/jacob/Documents/Code/AprovanLabs/registry/apps/registry/src

- [x] 2.1 Delete from `groups.ts`: `PrefixGrantRecord`, `addPrefixGrant`, `removePrefixGrant`,
      `listPrefixGrants`, `deleteAllPrefixGrants`, `listGrantedPrefixes`, the
      `GROUP_PREFIX_GRANTS_TABLE` helper; drop the prefix-grant cleanup from `deleteGroup`
      (spec group-profile-grants "GroupPrefixGrants is deleted outright").
- [x] 2.2 Delete the three `/groups/:id/prefix-grants` routes and `prefixGrantSchema` from
      `routes/groups.ts`.
- [x] 2.3 Remove the `GroupPrefixGrants` table from `db/schema.ts` and `infra/src/stack.ts`;
      update `tests/groups-dynamodb.test.ts` accordingly.
- [x] 2.4 Remove the "Prefix grants" section, `PrefixGrant` type, and related state/handlers from
      `AdminPanel.tsx` GroupsTab/GroupDetail (ux.md Groups screen).

## 3. Mount lineage (server)

> Depends-on: - | Touches: registry/apps/workspace/src/vcs/mounts.ts, registry/apps/workspace/src/vcs/store.ts, registry/apps/workspace/tests/vcs-mount-lineage.test.ts, registry/docs/vcs-and-sessions.md | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace test

- [x] 3.1 Implement `collectMountLineage(workspaceId)` in `vcs/mounts.ts` per the tech-plan
      interface: git → resolve `config.ref` to a commit SHA (one commits-API call, reusing
      `githubFetch`); s3 → token = sha256 over sorted `"<etag> <path>"` lines of the existing
      listing walk; failure → `versionToken: null` with provenance still populated (spec
      mount-lineage "degrades without blocking commits"; tech-plan D4/D5).
- [x] 3.2 Extend `VcsSnapshot` with `mounts?` (sorted, inside the canonical identity hash) and
      `VcsCommit` with `provenance?`; `commitTree` calls `collectMountLineage`, includes tokens
      in the unchanged-head comparison, and stamps provenance on the commit (spec scenarios:
      pinned SHA, upstream movement forces a new snapshot, deterministic s3 token).
- [x] 3.3 Tests: commit records git SHA and s3 manifest hash; identical tree + moved mount →
      new snapshot id; identical tree + identical mounts → short-circuit unchanged; resolution
      failure → commit succeeds with null token; pre-change commit JSON (no `mounts`/
      `provenance`) still parses via `readCommit`/`readSnapshot`.
- [x] 3.4 Update `registry/docs/vcs-and-sessions.md`: replace the "recording mount version tokens
      is the v2 follow-up" deltas with the shipped shape; document ref-tracking vs tag/SHA
      pinning (tech-plan D5).

## 4. Groups→profiles wiring (server + admin UI)

> Depends-on: 2, WS-3 registry-server-extraction (Profiles schema, group→profile membership storage, auth-time grant resolver) | Touches: registry/apps/workspace/src/groups.ts, registry/apps/workspace/src/routes/groups.ts, registry/apps/workspace/src/authorize.ts, registry/apps/workspace/src/db/schema.ts, registry/apps/workspace/tests/groups-profiles.test.ts, registry/infra/src/stack.ts, registry/apps/registry/src/components/AdminPanel.tsx | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace test && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/registry typecheck && ! grep -rn "GroupToolGrants\|checkToolGrant\|tool-grants" /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace/src /Users/jacob/Documents/Code/AprovanLabs/registry/apps/registry/src

- [x] 4.1 Add `GET/POST/DELETE /groups/:id/profiles` routes (admin-gated) over WS-3 membership
      storage per the tech-plan API shape: idempotent attach, 404 on unknown profile (spec
      "Group capability is profile membership").
- [x] 4.2 Rewire `authorize.ts` `mayInvokeTool`: admin → direct Permissions → WS-3
      `resolveProfileGrants` single join; delete `checkToolGrant` usage (spec "Tool authorization
      resolves through the profile join"; tech-plan D6).
- [x] 4.3 Delete `GroupToolGrants`: `groups.ts` functions (`addToolGrant`, `removeToolGrant`,
      `listToolGrants`, `deleteAllToolGrants`, `checkToolGrant`), `/groups/:id/tool-grants`
      routes, `db/schema.ts` + `infra/src/stack.ts` table, related tests. No data migration
      (nuke-and-reseed; announce that admins re-attach capability as profiles).
- [x] 4.4 AdminPanel GroupsTab: add the Profiles section (list/attach/detach with target +
      credential label; empty states per ux.md), remove the Tool grants section.
- [x] 4.5 Tests: attach/detach lifecycle; member of granted group authorized, detach revokes on
      next call; single-join resolution (assert query count or resolver call shape); non-admin
      403 on the admin routes.

## 5. Access pane & capabilities truthfulness

> Depends-on: 1, 4 | Touches: registry/apps/workspace/src/apps/capabilities.ts, registry/apps/workspace/src/apps/personal.ts, registry/packages/registry-ui/src/apps/app-detail.tsx | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/apps/workspace test && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/registry/packages/registry-ui typecheck

- [x] 5.1 Update `NATIVE_SPECS` partition notes (`vfs`, `keyvalue`) in `capabilities.ts` to
      owner-only + audited-admin language, and the Personal manifest description in
      `personal.ts`, matching the enforced behavior from stream 1 (spec per-user-data "Access
      pane partition language reflects enforcement").
- [x] 5.2 Add `profile?: string` to `ProviderGrantCapability` and populate it from the WS-3
      profile resolution for each granted provider (spec group-profile-grants "Access pane names
      the executing profile").
- [x] 5.3 Render the profile name in the Access tab's provider-grant rows in `app-detail.tsx`,
      falling back to the existing credential string when absent (old gateways — ux.md Access
      screen partial state).

## 6. Client UX: Private section + mounted-content history

> Depends-on: 1, 3 | Touches: aprovan/client/web/src/** | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web build

- [x] 6.1 Chat file tree: render the caller's own `.personal/data/<sub>` listing entries as a
      top-level "Private" section (display-name translation only; raw paths keep working);
      empty-partition hint; section absent when the gateway returns no own-partition entries
      (feature detection — ux.md file-tree screen).
- [x] 6.2 Commit/history detail: render the commit's `provenance` (+ snapshot `mounts` tokens)
      as a read-only "Mounted content" section — prefix, source origin, ref → short token,
      relative retrieved-at; "version unavailable at commit time" badge for null tokens; section
      absent for commits without lineage (ux.md commit-detail screen).
