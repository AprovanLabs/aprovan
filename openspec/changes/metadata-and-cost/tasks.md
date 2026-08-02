# Tasks — metadata-and-cost (WS-5)

Paths are relative to the aprovan repo root; `../registry/**` is the sibling registry
repo checkout (implementation home until WS-4). Store-suite Verify commands assume the
registry root docker-compose backends are up: `docker compose -f ../registry/docker-compose.yml up -d`
(dynamodb-local :8000 + MinIO :9000 — the stack the `*-dynamodb` and `fs-s3` suites use).

## 1. Change-feed server (Phase A)

> Depends-on: - | Touches: ../registry/apps/workspace/src/change-journal.ts, ../registry/apps/workspace/src/routes/fs.ts, ../registry/apps/workspace/tests/change-feed.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/change-feed.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 1.1 Implement the per-workspace change journal (monotonic cursor, ≥1,000-entry
      ring, reset semantics) in `src/change-journal.ts`, recording mutations via a
      store-wrapping facade the FS routes/service layer register (spec: change-feed /
      "Workspace change journal"; tech-plan D2).
- [ ] 1.2 Add `GET /fs/changes?since=` with ETag/`If-None-Match` 304 fast path,
      session-scope support, and `.services/**` exclusion (spec: "Change endpoint with
      ETag fast path").
- [ ] 1.3 Tests: cursor advance on every mutation kind (write/remove/removePrefix/
      completeUpload/staged shadow), 304 issues zero store reads (assert via store
      spy), delta correctness, ring-overflow → `reset: true` full listing, service-path
      invisibility.

## 2. Change-feed client (Phase A)

> Depends-on: 1 | Touches: client/web/src/lib/workspace-vfs.ts | Verify: pnpm --filter @aprovan/patchwork-web build

- [ ] 2.1 Rewrite `startLiveWorkspaceSync` to poll `/fs/changes` with
      `If-None-Match`/`since`: 304 → no-op, delta → per-path watcher events, `reset`
      or scope switch → silent rebaseline; keep the 8s visibility-gated cadence (spec:
      change-feed / "Client live-sync consumes the change feed").
- [ ] 2.2 Remove the full unprefixed `/fs` listing from the tick path entirely (the
      full listing remains only behind `reset` handling and explicit list calls).

## 3. Request caches (Phase A)

> Depends-on: - | Touches: ../registry/apps/workspace/src/middleware/auth.ts, ../registry/apps/workspace/src/auth-cache.ts, ../registry/apps/workspace/src/vcs/mounts.ts, ../registry/apps/workspace/tests/auth-cache.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/auth-cache.test.ts tests/vfs-mounts.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 3.1 Per-(token, workspace) principal cache (TTL 60s, configurable) in front of
      the `oidcPrincipal` triple-read, with `invalidatePrincipal(sub | workspaceId)`
      exported and called from membership/group-membership/current-workspace mutation
      paths (spec: identity-store / "Per-token auth resolution cache"; tech-plan D6).
- [ ] 3.2 Per-workspace `readMounts` cache (TTL 30s) invalidated synchronously by
      `addMount`/mount removal (spec: record-store / "Cached mounts read" — cache now,
      record-backed storage lands in stream 5).
- [ ] 3.3 Tests: cache hit performs zero identity reads (store spy), revocation
      invalidates immediately, workspace-switch keying, mounts hot path ≤1 backing
      read per TTL window.

## 4. FS write versioning + blob GC (Phase A)

> Depends-on: - | Touches: ../registry/apps/workspace/src/fs-store.ts, ../registry/apps/workspace/scripts/gc-blobs.ts, ../registry/apps/workspace/tests/fs.test.ts, ../registry/apps/workspace/tests/fs-s3.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/fs.test.ts tests/fs-s3.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 4.1 Add `FsWriteOptions { versioned?: boolean }` to `IFsStore.write`, defaulted
      by `isServicePath`; unversioned writes update only the latest pointer in both
      backends (spec: fs-metadata-store / "Unversioned service-path writes").
- [ ] 4.2 `scripts/gc-blobs.ts` mark-and-sweep (live-hash set from latest+version
      rows, 7-day safety age, `--dry-run`, counts report) plus a leader-leased
      schedule hook (spec: "S3 blob garbage collection"; tech-plan D7).
- [ ] 4.3 Tests: 50 service writes leave one pointer row and no version accumulation;
      authored writes still version; GC deletes an aged orphan, spares referenced and
      fresh-unregistered blobs (MinIO-backed).

## 5. Record moves — chat, transcripts, VCS (Phase B)

> Depends-on: 3, 4 | Touches: ../registry/apps/workspace/src/records.ts, ../registry/apps/workspace/src/vcs/**, ../registry/apps/workspace/src/routes/chat*.ts, ../registry/apps/workspace/tests/chat-sessions.test.ts, ../registry/apps/workspace/tests/vcs*.test.ts, ../registry/apps/workspace/scripts/migrate-services-to-records.ts | Verify: pnpm --filter @aprovan/workspace test tests/chat-sessions.test.ts tests/vcs.test.ts tests/vcs-interface.test.ts tests/vfs-mounts.test.ts tests/records.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 5.1 Reserve the `svc#` scope namespace: reject caller-supplied `svc#` scopes at
      the keyvalue/records service surface; add shared scope-builder helpers (spec:
      record-store / "The record rule covers platform subsystems").
- [ ] 5.2 Chat sessions + transcripts onto records: session records under
      `svc#chat#sessions`, one record per message under `svc#chat#session#<id>` with
      `seq10#messageId` keys; `appendMessages` writes only appended/replaced rows;
      shadow content stays on the FS store unversioned (spec: "Transcripts append as
      per-message records"; tech-plan D3).
- [ ] 5.3 VCS refs/commits/snapshots onto records (snapshots use the existing >350KB
      S3 spill); mounts onto `svc#vcs#mounts` behind the stream-3 cache.
- [ ] 5.4 One-shot migration sweep in `scripts/migrate-services-to-records.ts`
      (per-subsystem flags): read legacy `.services` files → write records → delete
      files; chat/vcs subsystems wired here.
- [ ] 5.5 Tests: append cost O(appended) (write-count spy on a 500-message session),
      idempotent re-send replaces in place, session delete removes message records +
      shadow content, VCS commit/snapshot round-trip, mount CRUD via records.

## 6. Record moves — registrations, runs, jobs (Phase B)

> Depends-on: 5 | Touches: ../registry/apps/workspace/src/apps/**, ../registry/apps/workspace/src/app.ts, ../registry/apps/workspace/src/agents/**, ../registry/apps/workspace/src/sandboxes/**, ../registry/apps/workspace/src/workflows/**, ../registry/apps/workspace/src/webhooks/**, ../registry/apps/workspace/src/sync.ts, ../registry/apps/workspace/src/llm-jobs.ts, ../registry/apps/workspace/src/services.ts, ../registry/apps/workspace/src/interfaces-service.ts | Verify: pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/workspace typecheck

- [ ] 6.1 Apps (registrations + installs), agents (definitions + runs), sandboxes
      (registrations/hosts/runs/defaults) onto their `svc#` scopes.
- [ ] 6.2 Workflows (registrations + cron cursors), webhooks (registrations + HMAC
      secrets), sync state, events append-logs (record-per-entry, seq keys), LLM
      jobs, workspace settings onto their `svc#` scopes.
- [ ] 6.3 Legacy `.services/keyvalue/*` sweep into existing record scopes;
      `.services/bindings` gets a tombstone read path only (dies with WS-3 Profiles —
      do not build it a record home).
- [ ] 6.4 Extend the stream-5 migration script to these subsystems; assert via test
      that a full-suite run creates no new `.services/**` files except staged shadow
      content (spec: record-store / "No subsystem writes service files").

## 7. DSQL foundation + store backends (Phase C)

> Depends-on: 4, 5, 6 | Touches: ../registry/apps/workspace/src/db/dsql.ts, ../registry/apps/workspace/src/db/dsql-schema.sql, ../registry/apps/workspace/src/fs-store.ts, ../registry/apps/workspace/src/records.ts, ../registry/apps/workspace/src/credentials.ts, ../registry/apps/workspace/src/audit.ts, ../registry/apps/workspace/src/runtime/config.ts, ../registry/infra/src/**, ../registry/apps/workspace/tests/dsql-*.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/fs.test.ts tests/records.test.ts tests/credentials-dynamodb.test.ts tests/audit-dynamodb.test.ts && pnpm --filter @aprovan/workspace typecheck && pnpm --filter @aprovan/registry-infra typecheck

- [ ] 7.1 `STORE_BACKEND` three-way switch (`sqlite`|`dynamo`|`dsql`) in
      runtime/config.ts replacing `isAwsMode()` at the store factories; lazy loading
      preserved per backend (tech-plan §6).
- [ ] 7.2 `db/dsql.ts`: lazy `pg` pool, IAM token auth, TLS, connection recycling
      under the 60-min cap, `withOccRetry` (SQLSTATE 40001, jittered, bounded) and a
      ≤3,000-row/≤10 MiB transaction chunker (tech-plan D4).
- [ ] 7.3 CDK: `AWS::DSQL::Cluster` per env in `../registry/infra`, IAM
      `dsql:DbConnect*` grant to the task role, `DSQL_ENDPOINT` env wiring; dev
      cluster first.
- [ ] 7.4 `IFsStore.list` → cursor-paginated `{entries, cursor}` across all backends
      + `listAll` drain helper + call-site sweep; enforce ≤900-byte paths in
      `normalizeFsPath` (spec: fs-metadata-store / "Cursor-paginated list").
- [ ] 7.5 `FsStoreDsql` (metadata in DSQL, blobs/presigned flow unchanged on S3;
      chunked `removePrefix`), `RecordStoreDsql` (indexed `listScopes`, expiry sweep),
      `CredentialStoreDsql` (+`created_by` column — flag schema to WS-3 as the frozen
      Profiles seam), `AuditStoreDsql` (30-day sweep). DDL in `db/dsql-schema.sql`
      (tech-plan §5).
- [ ] 7.6 Run the existing FS/record/credential/audit contract suites against the DSQL
      backends (dev cluster; suites parameterized over `STORE_BACKEND`), plus
      DSQL-specific tests: OCC retry, chunked large-prefix delete, listScopes without
      scan.

## 8. Identity store extraction + relational schema (Phase C)

> Depends-on: 3, 7 | Touches: ../registry/apps/workspace/src/identity/**, ../registry/apps/workspace/src/users.ts, ../registry/apps/workspace/src/workspaces.ts, ../registry/apps/workspace/src/memberships.ts, ../registry/apps/workspace/src/sessions.ts, ../registry/apps/workspace/src/invites.ts, ../registry/apps/workspace/src/groups.ts, ../registry/apps/workspace/src/userGroups.ts, ../registry/apps/workspace/src/permissions.ts, ../registry/apps/workspace/tests/identity-*.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/groups-dynamodb.test.ts tests/permissions-dynamodb.test.ts tests/session.test.ts tests/security.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 8.1 Define `IIdentityStore` + `getIdentityStore()` (tech-plan §4); Dynamo
      backend as a mechanical wrap of the existing module code; rewrite the ~58 raw
      call sites across the 13 identity/authz files to go through it (spec:
      identity-store / "Identity store interface").
- [ ] 8.2 Relational schema (SQLite + DSQL): users/workspaces/memberships/
      user_sessions/invites/groups/group_members/group_tool_grants/permissions/
      api_keys; real columns for today's composite keys; `GroupPrefixGrants` not
      carried; app-layer integrity (spec: "Relational identity schema").
- [ ] 8.3 Wire the stream-3 principal cache invalidation into the identity store's
      mutation methods (single choke point instead of per-module hooks).
- [ ] 8.4 Grep-gate test: no `dynamo()` usage for identity entities outside
      `src/identity/`; run auth/membership/group/invite/permission suites against
      Dynamo and SQLite backends; DSQL identity suite against the dev cluster.

## 9. Cutover tooling + runbook (Phase D)

> Depends-on: 7, 8 | Touches: ../registry/apps/workspace/scripts/snapshot-to-sqlite.ts, ../registry/apps/workspace/scripts/verify-snapshot.ts, ../registry/apps/workspace/scripts/reseed-dsql.ts, ../registry/apps/workspace/scripts/regenerate-registrations.ts, ../registry/docs/cutover-runbook.md, ../registry/apps/workspace/tests/cutover-*.test.ts | Verify: pnpm --filter @aprovan/workspace test tests/cutover-snapshot.test.ts tests/cutover-reseed.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 9.1 `snapshot-to-sqlite.ts`: Dynamo latest pointers + S3 blobs + records/
      credentials/identity → `FsStoreSqlite`-shaped mirror; resumable by hash;
      per-table counts (spec: storage-cutover / "Snapshot to a bootable SQLite
      mirror").
- [ ] 9.2 `verify-snapshot.ts`: boot `WORKSPACE_MODE=local` against the mirror; smoke
      set (health, listing counts, known-file read, records read); non-zero exit on
      any failure (spec: "Snapshot verification by local boot").
- [ ] 9.3 `reseed-dsql.ts`: idempotent chunked reseed (≤3,000 rows/txn) of latest FS
      metadata (existing S3 blobs untouched), records, credentials (sentinel
      `created_by`), identity; pre-scan for >900-byte paths.
      `regenerate-registrations.ts`: re-register apps/workflows/agents/sandboxes/
      webhooks from authored sources, emit webhook secret-rotation report (spec:
      "Nuke-and-reseed cutover").
- [ ] 9.4 Write `cutover-runbook.md` (read-only flag → snapshot → verify → reseed →
      regenerate → flip `STORE_BACKEND=dsql` → observe → rollback paths) and test the
      snapshot/reseed pair end-to-end against dynamodb-local + MinIO → dev DSQL.

## 10. Cutover execution + CDK cleanup (Phase D)

> Depends-on: 9 | Touches: ../registry/infra/src/stack.ts, ../registry/infra/src/workspace-service.ts | Verify: pnpm --filter @aprovan/registry-infra typecheck && (cd ../registry/infra && pnpm cdk synth --quiet)

- [ ] 10.1 Rehearse the full runbook on dev (snapshot → verify → reseed → flip);
      record timings to size the prod read-only window.
- [ ] 10.2 Execute the prod cutover per runbook; flip `STORE_BACKEND=dsql`; Dynamo
      tables left in place untouched as rollback (spec: storage-cutover / "Cleanup is
      deferred until confirmation").
- [ ] 10.3 After operator confirmation, separate deploy: remove the retired DynamoDB
      tables (FsFiles, Records, Credentials, Permissions, ApiKeys, Sessions, Groups,
      GroupPrefixGrants, GroupToolGrants, UserGroups, Audit, and core identity tables
      once unreferenced), their PITR specs, deletion protection, env vars, and IAM
      grants; retain FS bucket + KMS key; `cdk synth` asserts no Dynamo store tables
      remain (spec: "CDK cleanup of retired tables").
