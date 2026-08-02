# mount-lineage

Commits and snapshots record what mounted content the workspace was looking at: a deterministic
version token per mount (git commit SHA; S3 listing-manifest hash over ETags) in the snapshot,
and a provenance record (`{source, originDomain, retrievedAt}`, mirroring the bundler's
`ProvenanceManifest.source` shape) on the commit. Mounted bytes still never enter the FS store.

## ADDED Requirements

### Requirement: Snapshots record deterministic mount version tokens

`vfs.commit` (and the session auto-snapshot path through `commitTree`) SHALL record, in the
snapshot, one entry per active mount: `{prefix, type, configHash, versionToken}` where
`configHash` is a sha256 over the mount's canonical config and `versionToken` is: for `git`, the
commit SHA the mount's ref resolved to at snapshot time; for `s3`, a sha256 over the sorted
`<etag> <path>` lines of the mount's current listing. Entries MUST be deterministic (no
timestamps) so identical trees over identical mount states keep producing identical snapshots,
and two snapshots whose native entries match but whose mount tokens differ MUST have different
snapshot identities.

#### Scenario: Git mount pinned at commit time

- **WHEN** a member commits while `vendor/charts` is mounted from `org/charts` at ref `main`
- **THEN** the snapshot's mount entry for `vendor/charts` carries the commit SHA that `main`
  resolved to at that moment

#### Scenario: Upstream movement changes snapshot identity

- **WHEN** the mounted repo's `main` advances and a member commits again with no native file
  changed
- **THEN** a new snapshot (and commit) is created whose mount entry carries the new SHA, rather
  than the commit being skipped as unchanged

#### Scenario: S3 mount token is a listing-manifest hash

- **WHEN** a member commits while an `s3` mount is active
- **THEN** the snapshot's mount entry carries a sha256 computed over the sorted `<etag> <path>`
  lines of the mount's listing, and re-committing with an unchanged bucket yields the same token

### Requirement: Commits carry provenance records

Each commit SHALL carry, per mount, a provenance record shaped after the bundler's provenance
manifest: `{prefix, source: {type, ...locator, ref?}, originDomain, retrievedAt}` — where the
locator is `repo` (+ optional `path`) for git and `bucket` (+ optional `prefix`, `region`) for
s3, `originDomain` is the fetch origin (e.g. `api.github.com`, `<bucket>.s3.<region>.amazonaws.com`),
and `retrievedAt` is the resolution time. Provenance (which includes timestamps) lives on the
commit, not the snapshot, so snapshot identity stays deterministic.

#### Scenario: Commit provenance for a git mount

- **WHEN** a commit is created over a workspace with a git mount
- **THEN** the commit's provenance lists the mount's prefix, `source.type: "git"`, the repo and
  ref, the origin domain, and an ISO `retrievedAt`

#### Scenario: History surfaces lineage

- **WHEN** a client requests `vfs.show` (or renders the commit in the history UI) for a commit
  carrying mount lineage
- **THEN** the mounted-content information (prefix, source, ref → resolved token, retrieved-at)
  is present in the response and rendered; commits predating this change render with no mounted-
  content section and no error

### Requirement: Ref resolution is recorded at commit time, not frozen at mount time

Mount reads SHALL continue to track the configured ref live (a mount whose `config.ref` is a
branch keeps following it); the resolved SHA is captured per commit. A user who wants a frozen
view SHALL get it by configuring `config.ref` as a tag or commit SHA — `addMount` MUST accept and
store such refs unchanged, and the recorded `versionToken` will then equal (or resolve from) the
pinned ref.

#### Scenario: Branch-ref mount keeps tracking between commits

- **WHEN** a mount configured at ref `main` is read after upstream `main` advances, with no new
  commit taken
- **THEN** reads serve the new upstream content (live tracking), while previously recorded
  commits retain the SHAs they captured

#### Scenario: SHA-pinned mount

- **WHEN** a mount is added with `config.ref` set to a full commit SHA
- **THEN** reads serve that SHA's content regardless of upstream movement, and every subsequent
  commit records that same SHA as the mount's version token

### Requirement: Lineage capture degrades without blocking commits

When a mount's backing store is unreachable or resolution fails at commit time, the commit SHALL
still succeed: the mount's snapshot entry records `versionToken: null` and the commit's
provenance records the attempt (`retrievedAt` of the failure, source as configured). Lineage
capture MUST NOT introduce a hard dependency of committing on external availability.

#### Scenario: Commit while GitHub is down

- **WHEN** a member commits while the git mount's ref resolution fails
- **THEN** the commit is created; the mount entry's version token is null; provenance still names
  the source; and the history UI shows "version unavailable at commit time" for that mount
