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
