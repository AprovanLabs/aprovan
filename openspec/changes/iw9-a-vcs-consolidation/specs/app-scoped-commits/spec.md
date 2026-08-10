## ADDED Requirements

### Requirement: Commits scope to an app root on app refs
The VCS SHALL support committing a subtree scoped to an app root, recorded on
the ref `app/<appId>`, using the `prefix`/`ref` parameters `commitTree` gained
in iw9-f1. A workspace-level commit (empty prefix, `main` ref) SHALL remain
the default when no scope is given. The commit record SHALL carry its `prefix`
so any consumer can tell an app-scoped commit from a workspace commit.

#### Scenario: App-scoped commit lands on the app ref
- **WHEN** `vcs.commit` is invoked with an app scope for app `X`
- **THEN** a commit is created whose snapshot covers only paths under app X's
  root, the ref `app/<X-id>` advances to it, and `main` is unchanged

#### Scenario: Unscoped commit behaves as today
- **WHEN** `vcs.commit` is invoked with no scope argument
- **THEN** the commit covers the whole visible workspace tree and advances
  `main`

#### Scenario: Identical subtrees in different scopes are distinct snapshots
- **WHEN** two apps have byte-identical subtrees and each is committed on its
  own app ref
- **THEN** the two commits reference different snapshot ids (prefix is part of
  snapshot identity, per iw9-f1)

### Requirement: All six vcs verbs accept scope
`vcs.commit`, `vcs.log`, `vcs.show`, `vcs.diff`, `vcs.restore`, and
`vcs.branches` SHALL each operate correctly against an app scope: `log`
walks the app ref, `show`/`diff` return paths relative to the scope with
content hashes preserved on the wire (iw9-f1 stopped stripping them),
`restore` restores only paths under the scope, and `branches` lists `main`
plus every `app/<id>` ref with its head. The tool input schemas in
`routes/tools.ts` (`nativeVcsDiscoveryEntries`) SHALL declare the scope
arguments so agents can discover them.

#### Scenario: Scoped log walks the app ref only
- **WHEN** `vcs.log` is invoked with app scope `X` after commits on `main`,
  `app/X`, and `app/Y`
- **THEN** only the `app/X` history is returned

#### Scenario: Branches lists app refs
- **WHEN** `vcs.branches` is invoked in a workspace with `main` and two app
  refs
- **THEN** the response lists all three named refs with their head commit ids

#### Scenario: Scoped restore cannot escape the app root
- **WHEN** `vcs.restore` is invoked with app scope `X` and a commit that
  predates a file outside app X's root
- **THEN** no path outside app X's root is modified

### Requirement: Mount lineage is filtered to the commit's scope
An app-scoped commit's snapshot lineage and commit provenance SHALL contain
only mount entries whose prefix falls under the commit's scope. Workspace
commits SHALL keep full lineage.

#### Scenario: Foreign mounts excluded from app commit
- **WHEN** the workspace has a mount under app X's root and another mount
  elsewhere, and an app-scoped commit is made for X
- **THEN** the commit's lineage/provenance contains the X mount and not the
  other

### Requirement: Session merge commits record both parents
A commit produced by applying (staging) a chat session SHALL record parents
`[mainHead, sessionHead]` — the workspace head it merged into and the
session's own head — instead of the single parent emitted today
(`closeSession`, `vcs/chat-sessions.ts`). If the session has no commits of
its own, the merge commit MAY carry the single `mainHead` parent.

#### Scenario: Two-parent merge commit
- **WHEN** a staged session with at least one session commit is applied to the
  workspace
- **THEN** the resulting merge commit's `parents` is
  `[mainHead, sessionHead]` in that order and carries the `sessionId`

#### Scenario: History renders true lineage
- **WHEN** the history view renders a two-parent merge commit
- **THEN** it is presented as a merge of the session line into the workspace
  line (not as a linear commit)
