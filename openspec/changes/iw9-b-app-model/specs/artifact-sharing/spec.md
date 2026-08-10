# artifact-sharing

D20: `visibility` (is this app installable?) is split from artifact sharing
(can this person/link view this file?). `vfs` grows person-shares and
link-shares over workspace files. Share keys are stored HMAC-hashed; expiry
and revocation exist from day one. Anonymous access is exactly invariant 9:
**anonymous may read link-shared files — nothing else, ever** (no records, no
writes, no workflow calls, no partitions). Today the only sharing primitive
is the workspace→app `shares` config (`apps/store.ts:154-165`); nothing
person- or link-scoped exists. This capability rebases on iw9-f6's fix keying
app shares on `appId` (today's `shareAllows` keys on mutable `app.name`,
`apps/store.ts:499`).

## ADDED Requirements

### Requirement: Visibility and sharing are independent axes

An app's `visibility` SHALL control only installability/directory listing. A
file share SHALL control only viewability of the shared artifact. Neither
SHALL imply the other: sharing a file inside a private app's root makes that
file viewable without making the app installable, and a public app's files
are not thereby person- or link-shared.

#### Scenario: Shared file, private app

- **WHEN** a file under a `visibility: private` app's root is link-shared and
  the link is opened
- **THEN** the file renders, and the app remains uninstallable and absent
  from the directory

### Requirement: Person-shares grant a named user read access to an artifact

`vfs` SHALL support sharing a file or directory subtree with a named platform
user for reading. The recipient SHALL see shared artifacts in a dedicated
"Shared with me" listing, and reads SHALL pass tenant-scoped access checks on
every request (invariant: shares are checked at read time, not snapshotted).
Removing the share SHALL immediately end access.

#### Scenario: Recipient reads, others cannot

- **WHEN** member A shares `Apps/tasks/report.md` with user B
- **THEN** B can read it (and sees it under "Shared with me"); any other
  non-member user's read answers 404

#### Scenario: Revocation is immediate

- **WHEN** A revokes B's share and B reads again
- **THEN** the read answers 404 on the next request — no grace, no cache

### Requirement: Link-shares carry HMAC-hashed keys with expiry and revocation

A link-share SHALL mint a high-entropy key returned exactly once to the
sharer; the system SHALL store only an HMAC of the key (a leaked store cannot
mint working links) and SHALL look links up by recomputing the HMAC. Every
link SHALL carry an expiry chosen at creation and SHALL be revocable
individually; expired or revoked links answer 404 indistinguishably from
never-existed.

#### Scenario: Store holds no usable key

- **WHEN** the share records are read directly from storage
- **THEN** no stored value allows constructing a working share URL (only
  HMAC digests are present)

#### Scenario: Expiry and revocation both kill the link

- **WHEN** a link passes its expiry, or the sharer revokes it
- **THEN** subsequent fetches answer 404, identical to a link that never
  existed

### Requirement: Anonymous access is read of link-shared files only

An unauthenticated request bearing a valid link key SHALL be able to read the
shared artifact and nothing else. The system SHALL NOT allow anonymous
writes, record operations, workflow/tool calls, listings beyond the shared
subtree, or partition access of any kind — regardless of any share
configuration (invariant 9 admits no override).

#### Scenario: Anonymous read succeeds, everything else fails

- **WHEN** an anonymous holder of a valid link reads the shared file, then
  attempts a write, a keyvalue call, and a workflow call with the same link
- **THEN** the read succeeds and every other attempt fails with 401/404 —
  there is no code path that accepts a link key for a non-read operation

#### Scenario: Link does not leak siblings

- **WHEN** an anonymous holder of a file link requests the file's sibling or
  parent listing
- **THEN** the response is 404 — the link scopes exactly the shared artifact
  (or subtree, when a directory was shared)
