# instance-storage — delta spec (iw9-f2-shared-partition)

Per-instance storage economics for shared partitions (IW-9 D22): the host
pays for storage, so the host sees per-instance size, sets a cap, and may
delete an instance. The host is the hosting workspace's controlling
principal — its admins (workspace-managed) or the instance creator in their
own space (hosted, D1).

## ADDED Requirements

### Requirement: Per-instance storage metering

The platform SHALL track the storage footprint of each shared instance —
bytes of record values in its record scope plus bytes of files in its file
partition — and expose it to the host on demand. The metered figure MAY be
maintained as an eventually consistent counter, but a recount operation SHALL
exist that recomputes the figure from the stores and corrects the counter,
and the counter SHALL converge to the true footprint after recount.

#### Scenario: Host reads instance size

- **WHEN** the host requests usage for an instance holding records and files
- **THEN** the response reports the instance's byte footprint and the cap, if
  one is set

#### Scenario: Recount corrects drift

- **WHEN** the stored counter disagrees with actual store contents and a
  recount is invoked
- **THEN** the counter is rewritten to the recomputed footprint and the
  recomputed value is returned

### Requirement: Host-set storage cap

The host SHALL be able to set, change, or clear a per-instance storage cap in
bytes. When a write (record set or shared-file write) would raise the
instance's metered footprint above its cap, the write SHALL fail with a
client-distinguishable over-quota error (HTTP 413) and store nothing. Deletes
and reads SHALL always be permitted regardless of cap state, so an over-cap
instance can be shrunk. Only the host SHALL mutate the cap; participants
cannot raise their own quota (grants intersect, never union — invariant 2).

#### Scenario: Over-cap write rejected

- **WHEN** an instance's footprint is at or near its cap and a participant
  writes a value that would exceed it
- **THEN** the write fails with 413, the record/file is not stored, and the
  footprint is unchanged

#### Scenario: Delete permitted while over cap

- **WHEN** an instance is over its cap (cap lowered after writes) and a
  participant deletes a record
- **THEN** the delete succeeds and the footprint decreases

#### Scenario: Non-host cannot change the cap

- **WHEN** a participant who is not the host attempts to set or clear the cap
- **THEN** the call fails with 403 and the cap is unchanged

### Requirement: Host-initiated instance deletion

The host SHALL be able to delete a shared instance outright. Deletion SHALL
remove every record in the instance's record scope (including spilled S3
blobs), every file under its file partition, and the instance record itself,
and SHALL append an audit row naming the caller and the instance. After
deletion, all access to the former scope fails closed (404 — the orphan-scope
rule). Deletion SHALL NOT require participant consent (D22: the host pays and
may delete; hosted-mode participants hold a promise, not an enforcement —
invariant 5).

#### Scenario: Delete removes both planes and audits

- **WHEN** the host deletes an instance that holds records (some spilled) and
  files
- **THEN** the record scope lists empty, the file partition is gone, the
  instance record is gone, and an audit row records the deletion

#### Scenario: Non-host cannot delete

- **WHEN** a non-host participant attempts instance deletion
- **THEN** the call fails with 403 and the instance is intact
