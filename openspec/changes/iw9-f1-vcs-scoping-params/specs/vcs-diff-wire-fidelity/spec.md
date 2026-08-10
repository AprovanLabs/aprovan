# vcs-diff-wire-fidelity

Content hashes preserved end-to-end in `vcs.diff` and `vcs.show` wire output
(the client diff viewer built by `iw9-a-vcs-consolidation` needs them), plus a
subtree filter on `vcs.diff` mirroring `vcs.restore`'s shape.

## ADDED Requirements

### Requirement: Hash-bearing diff wire output

The `vcs.diff` result SHALL carry content hashes: `added` and `removed`
entries as `{path, hash}` objects and `modified` entries as
`{path, from, to}` objects, matching the store-layer `VcsDiff` shape.
`vcs.show`'s `changes` field, which shares the wire diff type, SHALL carry
the same shape. Tool discovery output schemas SHALL reflect the object
entries.

#### Scenario: Modified entries expose both hashes

- **WHEN** a file's content hash changes from H1 to H2 between commits A and
  B and `vcs.diff` is called with `from: A, to: B`
- **THEN** the result's `modified` contains `{path, from: H1, to: H2}`

#### Scenario: Added and removed entries expose their hash

- **WHEN** commit B adds `new.md` (hash HN) and removes `old.md` (hash HO)
  relative to commit A and `vcs.diff` is called with `from: A, to: B`
- **THEN** `added` contains `{path: "new.md", hash: HN}` and `removed`
  contains `{path: "old.md", hash: HO}`

#### Scenario: Show changes carry hashes

- **WHEN** `vcs.show` is called for a commit that modified a file
- **THEN** the `changes.modified` entry for that file is a `{path, from, to}`
  object

### Requirement: Diff subtree filter

`vcs.diff` SHALL accept an optional `prefix` argument. When present, every
entry in `added`/`modified`/`removed` SHALL have a path equal to `prefix` or
under `prefix/` (the same containment rule `vcs.restore` applies). The tool's
discovery entry input schema SHALL declare the `prefix` property.

#### Scenario: Prefix filter excludes outside paths

- **WHEN** commits A and B differ in `Apps/a/f.md` and `other/g.md` and
  `vcs.diff` is called with `from: A, to: B, prefix: "Apps/a"`
- **THEN** the result mentions `Apps/a/f.md` and does not mention
  `other/g.md`

#### Scenario: No prefix returns the full diff

- **WHEN** `vcs.diff` is called without `prefix`
- **THEN** all changed paths between the two commits are returned
