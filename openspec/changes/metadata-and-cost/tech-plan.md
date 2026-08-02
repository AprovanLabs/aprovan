# Tech Plan — metadata-and-cost (WS-5)

## Context

All cloud metadata today lives in 15 DynamoDB tables plus an S3 blob bucket, fronted by
a clean store-interface pattern for four stores — `IFsStore` (fs-store.ts, `P#<path>` /
`V#<path>#<hash>` key scheme), `IRecordStore` (records.ts), `ICredentialStore`
(credentials.ts), `IAuditStore` (audit.ts) — each with Dynamo + SQLite backends behind
a `getXStore()` singleton switched by `isAwsMode()` (runtime/config.ts). Identity/authz
(users, workspaces, memberships, sessions, invites, groups, userGroups, permissions,
API keys) has **no** interface: ~58 raw Dynamo call sites across 13 files, with
relational data encoded as composite keys (`workspaceId#groupId`) and SK-prefix pointer
rows.

The ~$5/user/mo cost is workload shape (decision record, "Key investigation findings"):

- `startLiveWorkspaceSync` (aprovan `client/web/src/lib/workspace-vfs.ts`) fetches the
  **full unprefixed `/fs` listing every 8s per visible tab** — a full-partition Dynamo
  Query each tick.
- `.services/**` state for ~20 subsystems is stored as **versioned VFS files**; chat is
  worst: `appendMessages` (vcs/chat-sessions.ts) rewrites the entire
  `messages.json` per message, permanently minting a `V#` row + an S3 blob each time.
  Deletes drop index rows only — blobs are never GC'd.
- `middleware/auth.ts` `oidcPrincipal` does an **uncached triple-read** (Sessions →
  Memberships → UserGroups) on every authenticated request; `readMounts`
  (vcs/mounts.ts) re-reads `.services/vcs/mounts.json` on every FS op.

Settled decisions this plan implements, not revisits: all cloud metadata → **Aurora
DSQL** in one design pass; local stays SQLite/libSQL; migration is **nuke-and-reseed**
preceded by a runbook'd snapshot to a bootable SQLite mirror (decision record #3).
Coordination: WS-3's registry server consumes these same store interfaces; WS-3's
Profiles schema references the credential `created_by` column added here. Implementation
lives in `registry/apps/workspace` until WS-4 moves the product plane.

**Verified DSQL constraints the design must fit** (AWS docs + current coverage, checked
2026-08): PostgreSQL-compatible; **no foreign keys**; **OCC** — no locks, commit-time
conflicts fail with SQLSTATE 40001 and must be retried; **≤3,000 rows and ≤10 MiB
modified per transaction**; 5-min max transaction; 60-min max connection; 10,000
connections/cluster at ≤100 conn/s; ≤1 KiB combined PK size; ≤8 key columns; ≤24
indexes/table; IAM-token auth over TLS; billing in DPUs + storage with a permanent free
tier (100K DPUs + 1 GB/month, ~$8/M DPUs). Sources:
[cluster quotas & database limits](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/CHAP_quotas.html),
[concurrency control](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/working-with-concurrency-control.html),
[pricing](https://aws.amazon.com/rds/aurora/dsql/pricing/).

## Goals / Non-Goals

**Goals:**

- Kill the four workload pathologies **backend-agnostically first** (change feed, auth
  cache, mounts cache, unversioned service writes) so wins land before any migration.
- Move accumulated `.services/**` state to the record store; transcripts become
  per-message rows.
- One relational cloud backend (DSQL) behind the existing interfaces + a new identity
  interface; `IFsStore.list` gains a cursor during the swap.
- A rehearsed, verifiable snapshot → reseed → cleanup path.

**Non-Goals:**

- No push transport (SSE/WS), no dual-read migration, no Dynamo post-cutover, no
  Profiles resolution logic (WS-3), no file-plane read authz (WS-6), no server-loop
  tuning, no local DSQL emulator.

## Architecture

```mermaid
flowchart TB
  subgraph client [aprovan client]
    LS[startLiveWorkspaceSync\npolls /fs/changes with ETag]
  end
  subgraph ws [workspace server (registry repo)]
    CF[change journal + /fs/changes\nper-ws cursor, ring buffer]
    AC[auth cache\nper token+ws, TTL 60s]
    MC[mounts cache\nper ws, TTL 30s]
    subgraph stores [store interfaces]
      FS[IFsStore v2\ncursor list, unversioned svc writes]
      RS[IRecordStore\n+ svc# scopes]
      CS[ICredentialStore\n+ created_by]
      AS[IAuditStore]
      IS[IIdentityStore (new)]
    end
    GC[blob GC sweep\nleader-leased]
  end
  subgraph backends [backends by STORE_BACKEND]
    SQ[(SQLite\nlocal)]
    DY[(DynamoDB\nlegacy, dies at cutover)]
    DS[(Aurora DSQL\ncloud target)]
    S3[(S3 blobs\nunchanged)]
  end
  LS --> CF
  CF --> FS
  AC --> IS
  MC --> RS
  FS --> SQ & DY & DS
  FS --> S3
  RS --> SQ & DY & DS
  CS --> SQ & DY & DS
  AS --> SQ & DY & DS
  IS --> SQ & DY & DS
  GC --> S3
```

Component responsibilities: the **change journal** is the only source of `/fs/changes`
answers (stores are consulted only on reset); the three **caches** are in-process,
single-writer-topology artifacts with TTL bounds for deploy overlap; the **store
interfaces** are the WS-3 coordination seam; the **blob GC sweep** is the only thing
that deletes from S3.

## Decisions

### D1: Fix the workload before the backend (phase ordering A→B→C→D)

- **Choice**: Ship backend-agnostic quick wins first (change feed, auth cache, mounts
  cache, unversioned service writes + GC), then the record-store moves, then DSQL
  backends, then cutover. Each phase is independently shippable and pays for itself on
  Dynamo immediately.
- **Alternatives**: *Big-bang: design DSQL and move everything at once* — rejected: the
  cost pathologies would be faithfully ported (an 8s full-list poll is DPU burn on DSQL
  too), and nothing lands until everything lands. *Backend first, workload later* —
  rejected for the same reason plus it couples the quick wins to migration risk.
- **Revisit if**: a hard deadline forces collapsing C into B (acceptable: B's record
  moves are the only prerequisite C shares).

### D2: Change feed = in-process journal with ETag 304, still poll-shaped

- **Choice**: Per-workspace monotonic cursor + bounded in-memory ring of mutations,
  populated by an `IFsStore` write-path hook. `GET /fs/changes?since=` returns deltas;
  `If-None-Match` on the current cursor short-circuits to 304 with **zero store
  reads**. Journal loss (restart, ring overflow) degrades to one full listing with
  `reset: true`. Client keeps its 8s visibility-gated cadence.
- **Alternatives**: *SSE/WebSocket push* — rejected for this change: new connection
  management through the Cloudflare tunnel, client reconnect states, and the 8s poll
  cadence is already fine once idle ticks are free; the journal is the prerequisite for
  push anyway, so this is forward-compatible. *Client-side diffing (hash the listing)* —
  rejected: the server still pays the full Query per tick; that's the cost being
  killed. *Persistent journal table* — rejected: single-writer topology makes the
  in-memory ring sufficient; a restart costs one full listing per tab, which is today's
  every-tick behaviour.
- **Revisit if**: the deployment moves to >1 steady-state task (journal must move to a
  shared store or sticky routing) or sub-second latency is demanded (add SSE on top).

### D3: Transcripts become per-message records; service JSON state becomes records

- **Choice**: Every `.services/**` accumulated-state subsystem moves to `IRecordStore`
  under reserved `svc#<subsystem>` scopes (disjoint from `ws`/`app#` — app sessions are
  denied `svc#` addressing). Transcripts: one record per message, key = zero-padded
  sequence + client message id; appends write only new rows. Staged shadow *content*
  stays on the FS store (it is hash-addressed file content the overlay points into),
  unversioned. `vcs` commits/snapshots/refs are records (snapshots use the existing
  >350KB S3 spill). `bindings.json` gets no new home — it dies with WS-3 Profiles.
- **Alternatives**: *A bespoke transcript/append-log store* — rejected: the record
  store's shape (partition + ordered keys + spill) already fits; a third store is
  speculative flexibility. *Leave read-mostly registrations on the FS but unversioned* —
  rejected: they'd still surface in file APIs and keep the `.services` carve-outs
  (`isServicePath`) alive forever; one rule ("files are authored") beats two
  exceptions. *Move shadow content to records too* — rejected: overlays reference
  content hashes and reuse FS read-by-hash; records are keyed, not content-addressed.
- **Revisit if**: transcript reads at O(1000s of messages) need pagination the ordered
  key listing can't serve (add cursor listing to `IRecordStore` then).

### D4: One DSQL cluster per environment, accessed via `pg` pool with OCC retry

- **Choice**: One single-region DSQL cluster per env (dev, prd); one database, one
  schema, ~16 tables (well under the 10-schema/1,000-table limits). A thin
  `db/dsql.ts` client module mirrors `db/client.ts`: lazy-loaded `pg` Pool, IAM token
  generation on connect (tokens refresh per new connection; connections recycled well
  under the 60-min cap), TLS required, and a `withOccRetry(fn)` helper retrying
  SQLSTATE 40001 with jittered backoff (bounded attempts). All multi-row writes chunk
  to ≤3,000 rows / ≤10 MiB per transaction.
- **Alternatives**: *Aurora Serverless v2 Postgres* — relitigates decision #3 (DSQL is
  decided; also min-capacity pricing beats the DSQL free tier only at scale this
  deployment doesn't have). *Drizzle/Prisma ORM* — rejected: the stores are
  hand-written SQL today (SQLite) and stay small; an ORM adds a migration-tooling
  dependency that must special-case DSQL's DDL restrictions. *RDS Proxy / connection
  broker* — unnecessary: one task, small pool, 10K-connection ceiling is far away.
- **Revisit if**: multi-region active-active becomes a requirement (DSQL supports it;
  add a second linked cluster) or OCC retry rates exceed ~1% of writes (reshape hot
  rows).

### D5: Identity gets an interface + from-scratch relational schema; credentials gain `created_by` here

- **Choice**: Extract `IIdentityStore` (per-entity method groups, one factory) over the
  ~58 call sites; backends: Dynamo (mechanical wrap of existing code, retired at
  cutover), SQLite, DSQL. The relational schema is designed fresh — real columns for
  today's composite keys, app-layer referential integrity (no FKs in DSQL),
  `GroupPrefixGrants` dropped (decision #8). `credentials.created_by` lands in this
  schema pass as the user-dimension column WS-3's Profiles reference — schema here,
  Profiles semantics there.
- **Alternatives**: *Port the Dynamo key scheme into DSQL rows* (`workspaceId#groupId`
  columns) — rejected: the schemas are relational-in-disguise; keeping composite keys
  buys nothing and poisons WS-6's joins. *Skip interfaces, rewrite call sites straight
  to SQL* — rejected: local mode needs SQLite and the interim period needs Dynamo, so
  an interface is mandatory anyway; also it's the WS-3 seam. *Defer `created_by` to
  WS-3* — rejected: it's a column on a table this change owns; making WS-3 alter it
  creates a cross-stream schema race.
- **Revisit if**: WS-3's Profiles design needs credential ownership richer than a
  single `created_by` sub (e.g. team ownership) — then the column becomes a
  `owner_kind/owner_id` pair before cutover.

### D6: Caches are in-process with synchronous invalidation + short TTL

- **Choice**: Auth principal cache keyed `(tokenHash, workspaceId)`, TTL 60s;
  mounts cache keyed `workspaceId`, TTL 30s. Same-process mutations invalidate
  synchronously (membership/group/current-workspace changes; mount add/remove). TTL is
  the staleness bound for the brief two-task overlap during rolling deploys.
- **Alternatives**: *Shared cache (Redis/Dynamo DAX)* — rejected: new infra for a
  single-task deployment; the TTL bound is acceptable. *Cache only the group read* —
  rejected: the Sessions and Memberships reads are the same shape of waste; caching the
  assembled principal kills all three.
- **Revisit if**: steady-state multi-task arrives (move invalidation to the change
  journal / a pub-sub) or a security review demands sub-TTL revocation across tasks.

### D7: Blob GC is mark-and-sweep with a safety age, not refcounting

- **Choice**: A leader-leased sweep (also runnable as a script) lists
  `blobs/<ws>/`, builds the live-hash set from latest+version rows, and deletes
  unreferenced blobs older than 7 days. Unversioned service writes (Phase A) stop the
  bleeding; the sweep reclaims what still orphans (overwrites, deletes, abandoned
  presigned uploads). The nuke-and-reseed drops the historical bulk wholesale.
- **Alternatives**: *Refcount blobs on write/delete* — rejected: content-addressed
  blobs are shared across paths/versions; correct refcounting under concurrent writes
  is exactly the fiddly bookkeeping content-addressing avoids. *S3 lifecycle rules* —
  rejected: lifecycle can't see referencedness. *GC only at cutover* — rejected: G7
  requires bounded growth afterwards too.
- **Revisit if**: blob listings get large enough that the sweep needs an inventory
  manifest (S3 Inventory) instead of live LIST calls.

### D8: Cutover is read-only-window reseed with deferred table deletion

- **Choice**: Read-only flag → final snapshot → verify local boot → reseed DSQL
  (chunked) → regenerate registrations from authored sources (webhook secrets rotate)
  → flip `STORE_BACKEND=dsql` → observe → separate later deploy removes Dynamo tables
  + PITR. Rollback before table deletion = flip the env var back; rollback of last
  resort = the verified SQLite mirror.
- **Alternatives**: *Online dual-write cutover* — explicitly rejected by decision #3.
  *Delete tables in the same deploy* — rejected: keeps rollback alive for the cost of
  one more deploy.
- **Revisit if**: never for posture (settled); window length if the reseed rehearsal on
  dev shows unacceptable duration.

## Interfaces & Data

These are the delegation seams. Anything not listed keeps its current signature.

### 1. `IFsStore` v2 (fs-store.ts)

```ts
export interface FsListPage { entries: FsEntry[]; cursor?: string }
export interface FsWriteOptions { versioned?: boolean }   // default: !isServicePath(path)
export interface FsChange { path: string; kind: "update" | "delete"; cursor: number }

export interface IFsStore {
  list(workspaceId: string, prefix?: string,
       opts?: { cursor?: string; limit?: number }): Promise<FsListPage>;
  listVersions(workspaceId: string, path: string): Promise<FsEntry[]>;
  read(workspaceId: string, path: string, hash?: string): Promise<FsFile | undefined>;
  write(workspaceId: string, path: string, content: string,
        mimeType?: string, opts?: FsWriteOptions): Promise<FsFile>;
  remove(workspaceId: string, path: string): Promise<boolean>;
  removePrefix(workspaceId: string, prefix: string): Promise<number>;
  createUpload?(...): Promise<FsUploadTicket>;       // unchanged
  completeUpload?(...): Promise<FsEntry | undefined>; // unchanged
}
// drain helper for call sites that want everything:
export async function listAll(store, ws, prefix): Promise<FsEntry[]>;
```

Change-journal hook: the FS service layer (not each backend) emits
`changeJournal.record(workspaceId, scopeKey, path, kind)` after every successful
mutation, including staged shadow writes (recorded under the session scope).

### 2. Change endpoint (routes/fs)

```
GET /fs/changes?since=<cursor>[&session=<id>]
  If-None-Match: "<cursor>"           → 304 (no body, no store read)
  200 { cursor: string, reset: boolean, changes: [{ path, kind }] }
  ETag: "<cursor>"
```
Cursor tokens are opaque strings scoped per (workspace, session-scope); `.services/**`
never appears. Client contract (workspace-vfs.ts): 304 → no-op; delta → watcher events;
`reset` or scope switch → silent rebaseline.

### 3. Record scopes for platform subsystems (records.ts consumers)

```
scope = "svc#<subsystem>[#<qualifier>]"     tenant = workspaceId
  svc#chat#sessions            key = <sessionId>                 → session record
  svc#chat#session#<id>        key = <seq10>#<messageId>         → one message
  svc#vcs#refs / #commits / #snapshots / #mounts
  svc#apps, svc#apps#installed, svc#agents, svc#agents#runs,
  svc#sandboxes(#hosts|#runs|#defaults), svc#workflows(#cron),
  svc#events#<log>, svc#webhooks, svc#sync, svc#llm-jobs, svc#workspace
```
Guard: the keyvalue/records service surface rejects caller-supplied scopes matching
`/^svc#/`. `seq10` = zero-padded message ordinal so lexical key order is transcript
order; re-sent message ids resolve to their existing seq.

### 4. `IIdentityStore` (new module, e.g. src/identity/store.ts)

```ts
interface IIdentityStore {
  users:       { get(sub); getByEmail(email); upsert(user); }
  workspaces:  { get(id); create(ws); update(ws); }
  memberships: { get(wsId, sub); listByUser(sub); listByWorkspace(wsId);
                 put(m); remove(wsId, sub); }
  sessions:    { getCurrentWorkspace(sub); setCurrentWorkspace(sub, wsId); }
  invites:     { get(token); listByWorkspace(wsId); findByEmail(email, wsId);
                 create(i); remove(token); }
  groups:      { get(wsId, gId); list(wsId); put(g); remove(wsId, gId);
                 members: { list(wsId, gId); listGroupIdsForUser(wsId, sub);
                            add(...); remove(...); }
                 toolGrants: { list(wsId, gId); put(...); remove(...); } }
  permissions: { check(wsId, callerId, provider, op); list(wsId);
                 grant(...); revoke(wsId, permId); }
  apiKeys:     { create(...); list(wsId); verify(secret); revoke(wsId, keyId); }
}
getIdentityStore(): IIdentityStore   // backend by STORE_BACKEND
```
Auth cache sits above this: `resolveCachedPrincipal(tokenHash, wsId)` with
`invalidatePrincipal(sub | wsId)` called by membership/group/session mutations.

### 5. DSQL schema sketch (one database, one schema; no FKs — app-level integrity)

```sql
-- file plane metadata (blobs stay in S3)
fs_files    (workspace_id, path, hash, mime_type, size bigint, updated_at,
             is_latest bool, PRIMARY KEY (workspace_id, path, hash));
             INDEX fs_latest ON (workspace_id, path) WHERE is_latest;  -- or latest table
fs_latest   (workspace_id, path, hash, mime_type, size, updated_at,
             PRIMARY KEY (workspace_id, path));   -- chosen shape: mirrors P#/V# split
-- records
records     (tenant, scope, key, value jsonb NULL, spilled bool, updated_at,
             updated_by, expires_at bigint NULL, PRIMARY KEY (tenant, scope, key));
             INDEX records_scopes ON (tenant, scope);
-- credentials / audit
credentials (workspace_id, id, provider, label, payload_ciphertext, created_by,
             created_at, updated_at, PRIMARY KEY (workspace_id, id));
             INDEX creds_provider ON (workspace_id, provider);
audit_log   (workspace_id, ts, id, request_id, caller_id, provider, operation,
             status int, duration_ms int NULL, result, mcp_tool_name NULL,
             PRIMARY KEY (workspace_id, ts, id));
-- identity/authz
users (sub PK, email, ...); INDEX ON (email);
workspaces (workspace_id PK, ...);
memberships (workspace_id, user_id, role, PRIMARY KEY (workspace_id, user_id));
             INDEX ON (user_id);
user_sessions (user_id PK, current_workspace_id, expires_at);
invites (invite_token PK, email, workspace_id, ...); INDEX ON (email, workspace_id);
             INDEX ON (workspace_id);
groups (workspace_id, group_id, name, ..., PRIMARY KEY (workspace_id, group_id));
group_members (workspace_id, group_id, user_id,
             PRIMARY KEY (workspace_id, group_id, user_id));
             INDEX ON (workspace_id, user_id);
group_tool_grants (workspace_id, group_id, provider, operation,
             PRIMARY KEY (workspace_id, group_id, provider, operation));
permissions (workspace_id, caller_id, provider, operation, perm_id, ...,
             PRIMARY KEY (workspace_id, caller_id, provider, operation));
             INDEX ON (workspace_id, perm_id);
api_keys (workspace_id, key_id, name, caller_id, secret_hash, expires_at, ...,
             PRIMARY KEY (workspace_id, key_id)); INDEX ON (secret_hash);
```
Constraints honored: all PKs ≪ 1 KiB (path capped at 900 bytes at write time, matching
`normalizeFsPath` validation); ≤8 key columns; jsonb values >350KB spill to S3 as today.
TTL semantics (records `expires_at`, audit 30-day, api-key expiry) enforced by
read-filters + a leader-leased sweep.

### 6. Backend selection (runtime/config.ts)

```
STORE_BACKEND = "sqlite" | "dynamo" | "dsql"
  default: sqlite when WORKSPACE_MODE=local; dynamo when WORKSPACE_MODE=aws (interim);
  dsql set explicitly at cutover. isAwsMode() is replaced by storeBackend() at the
  five getXStore() factories + getIdentityStore(). Lazy module loading preserved:
  sqlite loads no AWS SDK / pg; dsql loads pg only.
DSQL env: DSQL_ENDPOINT, DSQL_DATABASE (default postgres), AWS_REGION (IAM token).
```

### 7. Cutover tooling (registry/apps/workspace/scripts/)

```
snapshot-to-sqlite.ts   --out <dir>            # Dynamo latest + S3 blobs + records/
                                               # creds/identity → FsStoreSqlite-shaped db
verify-snapshot.ts      --data <dir>           # boots WORKSPACE_MODE=local, smoke set,
                                               # non-zero exit on any failure
reseed-dsql.ts          --from <dir>           # chunked inserts (≤3,000 rows/txn),
                                               # idempotent, sentinel created_by
regenerate-registrations.ts                    # re-register apps/workflows/agents/
                                               # sandboxes/webhooks from authored sources
gc-blobs.ts             [--dry-run]            # D7 sweep
```

## Risks / Trade-offs

- [OCC retry storms on hot rows (e.g. session record updated per message)] → Keep
  transactions single-row where possible; `withOccRetry` with jittered backoff and a
  retry-rate metric; transcript design already removes the hottest RMW.
- [In-memory journal lost on deploy → thundering full listings] → `reset` responses are
  staggered by client jitter; a full listing per tab once per deploy equals today's
  *every-8s* cost, so worst case is still strictly better.
- [Cache staleness window (≤60s) lets a revoked member act briefly from the *other*
  task during deploy overlap] → Accepted and documented; synchronous invalidation
  covers the steady-state single task; WS-6 can tighten if needed.
- [DSQL 1 KiB PK cap vs long paths] → enforce ≤900-byte paths at `normalizeFsPath`
  (existing traversal validation site); reseed pre-scans for violations before cutover.
- [Reseed exceeds the read-only window] → rehearse on dev with prod-sized data; the
  snapshot is resumable and the reseed idempotent, so the window can be re-run.
- [Webhook secret rotation breaks external callers at cutover] → regeneration output
  lists every webhook + new secret; runbook includes notifying/reconfiguring callers.
- [No local DSQL emulator → DSQL-only bugs] → contract test suites run identically over
  all three backends; a dev-env DSQL cluster (free tier) is the CI/integration target.
- [WS-3 lands Profiles against a moving credentials schema] → the `created_by` column
  + schema file land early in Phase C and are flagged to WS-3 as the frozen seam.

## Rollout

1. **Phase A (quick wins, backend-agnostic, ship immediately on Dynamo):** change
   feed server+client; auth principal cache; mounts cache; unversioned `.services/**`
   writes; blob GC script+schedule. Deploy per item — no migration, no data change.
2. **Phase B (record moves):** subsystem-by-subsystem cutover to `svc#` record scopes
   with one-shot migration sweeps per subsystem (read old file → write records →
   delete file), chat/transcripts first (worst offender). Each subsystem deploys
   independently; no cross-subsystem coupling.
3. **Phase C (DSQL backends, dark):** DSQL cluster in CDK (dev first); `db/dsql.ts`;
   `FsStoreDsql`/`RecordStoreDsql`/`CredentialStoreDsql`/`AuditStoreDsql`; identity
   interface extraction + SQLite/DSQL backends; `IFsStore.list` cursor everywhere.
   Prod keeps `STORE_BACKEND=dynamo`; DSQL is exercised by tests + dev env only.
4. **Phase D (cutover):** rehearse on dev; then prod: read-only → snapshot → verify
   boot → reseed → regenerate registrations → flip `STORE_BACKEND=dsql` → observe.
   Rollback: flip back to dynamo (tables untouched). After confirmation: separate CDK
   deploy deletes Dynamo tables + PITR + grants; keep bucket, KMS key, mirror archive.

## Open Questions

1. **`fs_latest` as its own table vs partial-index on `fs_files`** — recommend the
   two-table shape (mirrors today's P#/V# split, keeps the hot latest-read narrow);
   confirm during Phase C if DSQL's partial-index support changes the calculus.
2. **Dev DSQL cluster always-on for CI?** Recommend yes (free tier covers it); the
   alternative is DSQL integration tests running only pre-release.
3. **Events append-logs** (`svc#events#<log>`): record-per-entry like transcripts, or
   chunked pages? Recommend record-per-entry with the same seq-key shape; revisit only
   if an event log's row count dwarfs transcripts.
