# PRD — metadata-and-cost (WS-5)

## Problem

Cloud metadata costs ~$5/user/month and the money is workload shape, not backend: every
open tab runs an unprefixed full-workspace listing poll every 8 seconds, every chat
message is a full-transcript read-modify-write that mints a permanent DynamoDB version
row plus a never-GC'd S3 blob, and every authenticated request re-reads Sessions +
Memberships + UserGroups. On top of that, ~18 subsystems store accumulated state as
versioned VFS files under `.services/**`, violating the platform's own rule ("files are
authored; records are accumulated"), and the identity/authz layer is Dynamo-only with
relational data crammed into composite keys. Decision 3 of the refactor decision record
(docs/tasks/refactor-decisions.md) settles the endpoint: all cloud metadata moves to
Aurora DSQL in one design pass, via nuke-and-reseed — this change fixes the workload
first, then executes the move.

## Users & Jobs

- **Workspace end users** — hire the platform for chat/apps/workflows; they get faster
  live-sync (no 8s full-list lag), snappier authenticated requests, and no risk of the
  operator throttling features to control cost.
- **The deployment operator (owner)** — hires this change to cut the per-user metadata
  bill to near-noise and to end up with one relational metadata backend (DSQL cloud,
  SQLite/libSQL local) instead of 15 Dynamo tables with bespoke key schemes.
- **Refactor implementers (WS-3/WS-4/WS-6 agents)** — hire this change for clean
  `IXStore` seams: WS-3's registry server takes the same store interfaces; WS-6's
  data/auth work builds on the relational identity schema defined here.

## Goals

- **G1 — idle tab costs ~nothing:** a visible tab with no workspace changes performs
  zero DynamoDB/DSQL read work per poll tick at steady state (HTTP 304 fast path);
  today it is a full-partition Query every 8s per tab.
- **G2 — O(1) message appends:** appending one chat message writes O(1) store rows and
  zero new permanent version artifacts; today it rewrites the whole transcript and
  permanently adds one `V#` row + one S3 blob per message.
- **G3 — amortized auth:** the Sessions + Memberships + UserGroups triple-read runs at
  most once per token per cache window (target ≥90% fewer identity-table reads per
  active user), not once per request.
- **G4 — `.services/**` off the file plane:** zero subsystems persist accumulated state
  as versioned VFS files; `listVersions` on any `.services/**` path returns nothing new
  after the change.
- **G5 — one metadata backend in the cloud:** FS metadata, records, credentials, audit,
  and identity/authz all served by Aurora DSQL behind the existing `IXStore` interfaces;
  the DynamoDB tables are deleted from CDK. Local mode still runs SQLite with zero AWS
  SDK loaded.
- **G6 — provable snapshot before cutover:** the pre-cutover snapshot boots a working
  workspace in `WORKSPACE_MODE=local` from the SQLite mirror (verified by a scripted
  smoke check), before anything is nuked.
- **G7 — orphaned blobs stop accumulating:** S3 blob growth is bounded by live content;
  a GC pass reclaims unreferenced blobs.

## Non-Goals

- **No dual-read/dual-write migration machinery.** Nuke-and-reseed is decided (decision
  record, decision 3). No Dynamo compatibility layer survives the cutover.
- **No version-history carryover.** `V#` rows, audit history, and login sessions are
  dropped at cutover by design.
- **No Profiles product work.** The credential schema gains the user-dimension column
  here (coordinating with WS-3), but Profiles resolution/UI is WS-3/WS-6.
- **No per-user read authorization on the file plane** — that is WS-6.
- **No queryable collections, counters, or new record-store query features** — the
  record store keeps its existing surface (docs/app-data.md's "out of scope" holds).
- **No change to blob storage.** S3 keeps the content blobs; DSQL holds metadata only.
  Local mode keeps SQLite/libSQL — no local DSQL emulation.
- **No realtime push transport (SSE/WebSocket).** The change feed stays poll-shaped;
  push is a possible follow-up, not this change.
- **No server-loop tuning** (sandbox queue 500ms / relay 250ms / leader 30s / LLM 1s
  polls) — those are in-process loops, not per-request store traffic, and stay as-is.

## Capabilities

### New Capabilities

- `change-feed`: ETag/`?since=` workspace change endpoint replacing the 8s unprefixed
  full-listing poll, plus the client consumption in `workspace-vfs.ts`.
- `fs-metadata-store`: `IFsStore` evolution — unversioned service writes, cursor-based
  `list`, S3 blob GC policy, and the DSQL metadata backend.
- `record-store`: the `.services/**` subsystem migration onto `IRecordStore` (extending
  app-data.md's normative rule to platform subsystems) and the DSQL record backend.
- `identity-store`: interface extraction over the ~58 raw Dynamo call sites
  (users/workspaces/memberships/sessions/invites/groups/userGroups/permissions/apiKeys),
  the per-token auth-resolution cache, and the from-scratch relational identity/authz
  schema (including the credential user-dimension column).
- `storage-cutover`: snapshot runbook (S3 + Dynamo → local SQLite mirror + verified
  local boot), nuke-and-reseed cutover, and CDK table/PITR cleanup.

### Modified Capabilities

_None — `openspec/specs/` is empty; this is the first change to establish these specs._

## Constraints & Assumptions

- **Aurora DSQL is decided** (decision record #3) and its real limits bound the design
  (verified against AWS docs, 2026-08): PostgreSQL-compatible with **no foreign keys**,
  **optimistic concurrency control** (commit-time conflicts return SQLSTATE 40001 and
  must be retried), **3,000 rows / 10 MiB modified per transaction**, 5-minute max
  transaction, 60-minute max connection, 10,000 connections per cluster at ≤100/s,
  1 KiB max combined primary-key size, IAM-token authentication, DPU + storage pricing
  with a permanent free tier (100K DPUs + 1 GB storage/month).
- Implementation lives in the **registry repo** (`registry/apps/workspace`) until WS-4
  moves the product plane; only the change-feed client half lives in the aprovan repo.
  Store interface shapes must be coordinated with WS-3 (registry server takes them).
- The existing vitest suites + repo-root docker-compose (dynamodb-local + MinIO) are the
  verification harness for store work; DSQL backends additionally get integration tests
  that run against a real DSQL cluster (no local emulator exists).
- Single-writer topology assumption: one ECS task serves a deployment (two only briefly
  during rolling deploys), which is what makes in-process caches + the change journal
  sound with short TTL bounds.
- Assumption (unconfirmed): the ~30 days of audit history and active login sessions are
  acceptable losses at cutover — the decision record says drop them; flagging that this
  logs users out once.
- Assumption (unconfirmed): a maintenance window (minutes-to-low-hours of read-only or
  downtime) is acceptable for the nuke-and-reseed cutover on the single-task deployment.

## Open Questions

1. **Cache TTLs:** per-token auth cache TTL — recommend 60s (bounds staleness of role /
   group revocation to one minute; mutations in-process invalidate immediately).
   Acceptable?
2. **Cutover window:** recommend a scheduled window with the service in read-only for
   the reseed (enforced by an env flag), announced to the (currently small) user base.
   OK, or must cutover be fully online?
3. **DSQL cluster count:** recommend one single-region cluster per environment (dev,
   prd) — multi-region active-active is not worth it at this scale. Confirm?
4. **Sessions table disposition:** `Sessions` holds only "current workspace" per user.
   Recommend reseeding it is *not* done (users re-pick a workspace on next login),
   matching "drop sessions". Confirm?
