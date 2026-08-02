# fs-metadata-store

Evolution of `IFsStore` (`registry/apps/workspace/src/fs-store.ts`): stop version-logging
service writes, paginate `list`, add a DSQL metadata backend, and bound S3 blob growth.
S3 keeps content blobs in every cloud backend; SQLite stays the local backend.

## ADDED Requirements

### Requirement: Unversioned service-path writes

FS writes to service paths (`isServicePath`, i.e. `.services/**` and staged-session
shadow trees under `.services/chat/sessions/<id>/files/**`) SHALL update only the
latest-pointer row and SHALL NOT create a version row. `listVersions` on a service path
SHALL return at most the latest entry. Non-service (authored) paths keep full version
logging unchanged. The write API SHALL express this as an explicit option
(`write(..., { versioned: false })`) defaulted by the service-path check, so callers can
reason about it and tests can assert it.

#### Scenario: Service write leaves no version trail

- **WHEN** the same `.services/**` path is written 50 times with distinct content
- **THEN** the store contains one latest-pointer row for the path and zero
  accumulated version rows beyond it, and a plain read returns the last content

#### Scenario: Authored write still versions

- **WHEN** an authored path (e.g. `widgets/a/index.ts`) is written twice
- **THEN** `listVersions` returns both versions newest-first and reading by the older
  hash returns the older content

### Requirement: Cursor-paginated list

`IFsStore.list` SHALL accept an optional `{ cursor?, limit? }` argument and return
`{ entries, cursor? }`, where a returned `cursor` means more entries exist and feeding
it back resumes the listing with no gaps or duplicates. All backends (SQLite, DynamoDB,
DSQL) SHALL implement the same contract; call sites that want everything use a shared
drain helper. The legacy unpaginated shape SHALL be removed (no dual signatures).

#### Scenario: Two-page listing round-trips

- **WHEN** a workspace has 150 files under a prefix and `list` is called with
  `limit: 100`, then again with the returned cursor
- **THEN** the two result sets are disjoint, ordered, and together contain exactly the
  150 entries

### Requirement: DSQL FS metadata backend

A `FsStoreDsql` backend SHALL implement `IFsStore` against Aurora DSQL, storing
latest-pointer and version rows relationally while content blobs stay in S3 (same
`blobs/<workspaceId>/<hash>` layout and presigned upload flow as `FsStoreS3`). The
implementation SHALL operate within DSQL's documented limits: no foreign keys, key
size ≤ 1 KiB (path length is validated at write time), ≤3,000 rows / 10 MiB modified
per transaction (bulk deletes chunk), and OCC serialization failures (SQLSTATE 40001)
are retried with bounded backoff. Backend selection SHALL extend the existing
`runtime/config.ts` switch to three values (`local` sqlite | `aws` dynamo | `dsql`)
without loading the AWS SDK or a Postgres driver in modes that don't use them.

#### Scenario: DSQL backend passes the FS store contract suite

- **WHEN** the existing FS store test suite (write/read/list/listVersions/remove/
  removePrefix/upload round-trips) runs against `FsStoreDsql`
- **THEN** all contract assertions pass identically to the SQLite and Dynamo backends

#### Scenario: Large prefix removal stays within transaction limits

- **WHEN** `removePrefix` targets a subtree with 10,000 index rows
- **THEN** the operation completes by chunking deletes into transactions of at most
  3,000 rows each and reports the removed count

#### Scenario: Serialization conflict is retried

- **WHEN** two concurrent writers hit an OCC conflict (SQLSTATE 40001) on the same path
- **THEN** the losing write is retried transparently and both writes eventually
  succeed, with the newest write winning the latest pointer

### Requirement: S3 blob garbage collection

Content blobs SHALL be garbage-collected: a sweep (runnable as a script and as a
leader-leased scheduled job) SHALL delete blobs under `blobs/<workspaceId>/` that are
referenced by no latest-pointer or version row and are older than a safety age
(default 7 days, protecting in-flight presigned uploads and concurrent writes). The
sweep SHALL be idempotent and report counts (scanned, live, deleted).

#### Scenario: Orphaned blob is reclaimed

- **WHEN** a file is overwritten (unversioned service path) so its old blob has no
  referencing row, the blob is older than the safety age, and the GC sweep runs
- **THEN** the old blob is deleted and the currently referenced blob is retained

#### Scenario: Fresh unreferenced blob survives

- **WHEN** a blob was uploaded via a presigned ticket minutes ago and not yet
  registered with `completeUpload`
- **THEN** the GC sweep does not delete it
