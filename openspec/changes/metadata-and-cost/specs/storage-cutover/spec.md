# storage-cutover

The runbook'd snapshot, the nuke-and-reseed cutover to DSQL, and the CDK cleanup.
Migration posture is decided (refactor decision record #3): no dual-read paths, no
version-history carryover.

## ADDED Requirements

### Requirement: Snapshot to a bootable SQLite mirror

A snapshot script SHALL pull, for every workspace, every latest-pointer row from the
Dynamo `FsFiles` table plus its referenced S3 blob content, and write them into a local
SQLite database in the exact `FsStoreSqlite` shape (`fs_files` table, content inline),
alongside dumps of the records, credentials (encrypted payloads as stored), and
identity tables into their local-backend shapes. The script SHALL be resumable
(re-running skips already-mirrored content by hash) and SHALL report per-table row
counts. Version rows (`V#`), audit entries, and login sessions are deliberately not
snapshotted (dropped by decision).

#### Scenario: Snapshot captures the live tree

- **WHEN** the snapshot script runs against a deployment
- **THEN** the mirror's `fs_files` rows equal the set of Dynamo `P#` rows (count and
  per-path hash), and every row's inline content hashes to its recorded hash

#### Scenario: Snapshot is resumable

- **WHEN** the script is interrupted and re-run
- **THEN** already-mirrored blobs are not re-downloaded and the final mirror is
  identical to an uninterrupted run

### Requirement: Snapshot verification by local boot

The runbook SHALL include a scripted verification step that boots the workspace with
`WORKSPACE_MODE=local` pointed at the mirror (`WORKSPACE_DATA_DIR`) and asserts a smoke
set: health endpoint, file listing matches mirror counts, a known file reads back, and
records are readable. Cutover SHALL NOT proceed until this verification passes — the
mirror is the rollback-of-last-resort.

#### Scenario: Verified boot gates the cutover

- **WHEN** the verification script runs against a snapshot mirror
- **THEN** it exits non-zero if any smoke assertion fails, and the runbook directs the
  operator to stop at any non-zero exit

### Requirement: Nuke-and-reseed cutover

The cutover SHALL: (1) place the service read-only, (2) take the final snapshot +
verification, (3) reseed DSQL from the snapshot — latest file metadata (pointing at the
existing S3 blobs, which are not copied or moved), record rows, credentials (with
sentinel `created_by` where unknown), and identity data (users, workspaces,
memberships, invites, groups, group memberships, tool grants, API keys) — in
transaction chunks within DSQL's 3,000-row/10 MiB limits, (4) regenerate `.services`
registrations from authored sources (apps/workflows/agents/sandboxes/webhooks
re-register; webhook HMAC secrets rotate), and (5) flip the deployment's backend
switch to `dsql`. Version history, audit history, and login sessions are NOT reseeded.
The reseed SHALL be idempotent (re-runnable into an emptied cluster).

#### Scenario: Reseeded deployment serves the same tree

- **WHEN** the cutover completes and a user loads their workspace
- **THEN** the file tree, latest file contents, records/app data, credentials, and
  memberships match the pre-cutover state, while version history is empty and prior
  audit entries are gone

#### Scenario: Registrations are regenerated, not copied

- **WHEN** the post-reseed regeneration pass runs
- **THEN** every app/workflow/agent/sandbox/webhook that was registered before cutover
  is registered again from its authored source, and webhook endpoints carry fresh
  secrets

### Requirement: CDK cleanup of retired tables

After the cutover is verified, the CDK stacks SHALL remove the retired DynamoDB tables
(FsFiles, Records, Credentials, Permissions, ApiKeys, Sessions, Groups,
GroupPrefixGrants, GroupToolGrants, UserGroups, Audit — and the core
Users/Workspaces/Memberships/Invites tables once nothing reads them), including their
PITR configuration, deletion protection, and IAM grants; the DSQL cluster, its IAM
connect grants, and new env wiring replace them. The FS bucket and KMS credentials key
are retained. Removal SHALL be a separate deploy from the cutover flip so rollback to
Dynamo remains possible until the operator confirms.

#### Scenario: Post-cleanup synth has no Dynamo metadata tables

- **WHEN** `cdk synth` runs after the cleanup change
- **THEN** the template contains no DynamoDB table resources for the retired stores
  and no PITR specifications for them, while the FS bucket, KMS key, and DSQL cluster
  remain

#### Scenario: Cleanup is deferred until confirmation

- **WHEN** the cutover flip deploy completes
- **THEN** the Dynamo tables still exist (read-only, unreferenced) until the separate
  cleanup deploy is explicitly executed
