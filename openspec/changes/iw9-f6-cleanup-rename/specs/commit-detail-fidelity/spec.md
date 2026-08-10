## ADDED Requirements

### Requirement: The client commit-detail accessor returns the change summary it fetches
`fetchCommitDetail` (`client/web/src/lib/vfs-commits.ts`) calls the gateway's
`vcs.show`, which already returns a `changes` payload (added/modified/removed,
per `vcs-diff-wire-fidelity`). `fetchCommitDetail` SHALL include that payload
in its return value instead of discarding it after fetching it.

#### Scenario: fetchCommitDetail surfaces the server's change summary
- **WHEN** `fetchCommitDetail(commit)` resolves for a commit that has a
  parent
- **THEN** the resolved `CommitDetail` includes the `changes` the server
  returned for that commit, available to callers without a second fetch

#### Scenario: A root commit with no changes payload degrades cleanly
- **WHEN** `fetchCommitDetail` is called for a commit whose server response
  omits `changes` (e.g. no comparable parent)
- **THEN** the resolved `CommitDetail` reflects that absence (e.g. an empty
  or undefined `changes`) rather than throwing
