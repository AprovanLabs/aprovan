# vcs-ref-enumeration

History listing over an arbitrary ref and branch listing that enumerates all
refs, replacing the hardcoded `main` in the `vcs.log`/`vcs.branches` backends.

## ADDED Requirements

### Requirement: Ref-scoped history

`vcs.log` SHALL accept an optional `ref` argument (default `main`), validated
against the ref grammar, and SHALL walk the first-parent chain from that
ref's head, newest first, honoring `limit`. The tool's discovery entry input
schema SHALL declare the `ref` property.

#### Scenario: Log walks the requested ref

- **WHEN** a workspace has commits on `main` and a separate root commit on
  `app/x`, and `vcs.log` is called with `ref: "app/x"`
- **THEN** the result contains only the `app/x` chain and none of `main`'s
  commits

#### Scenario: Default ref remains main

- **WHEN** `vcs.log` is called without a `ref` argument
- **THEN** the result is the `main` history, identical to pre-change behavior

#### Scenario: Unknown ref yields an empty history

- **WHEN** `vcs.log` is called with a well-formed ref name that has no ref
  record
- **THEN** the result is `{ commits: [] }` and no error is raised

### Requirement: Branch listing enumerates all refs

`vcs.branches` SHALL return every ref in the workspace as
`{name, commit}` pairs, sorted by name (the `listRefs` ordering). It SHALL
NOT special-case or hardcode `main`.

#### Scenario: All refs are returned

- **WHEN** a workspace has refs `main`, `session/s1`, and `app/x` and
  `vcs.branches` is called
- **THEN** the result contains exactly three branches, sorted by name, each
  carrying its head commit id

#### Scenario: No refs yields an empty list

- **WHEN** `vcs.branches` is called in a workspace with no ref records
- **THEN** the result is `{ branches: [] }`
