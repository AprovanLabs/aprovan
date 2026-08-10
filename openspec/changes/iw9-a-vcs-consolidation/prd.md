## Problem

The platform has two overlapping version systems — workspace VCS commits and a
parallel per-file/releases layer (`apps/releases.ts` + `apps.versions/version/restore`)
— and almost none of it is visible to users: five of the six `vcs.*` verbs have
zero client callers, `vcs.show`'s change data is fetched and discarded, merge
conflicts are resolved blind (MergeDialog shows neither version), and `auto`
sessions cannot answer "what changed?". IW-9 (D8/D10/D11) settles the direction:
one commit-scoped VCS with app-level refs, releases as tags, and a legible
diff/history/undo surface — and Wave-1 sibling B (`app-model-app-centric`) is
blocked on the release-as-tag interface this change leaves behind.

## Users & Jobs

- **Workspace members** — see what a chat or their own edits changed, compare
  versions, and undo a bad change in one click, without learning Git.
- **App authors** — view an app's history on its own timeline, cut a release
  ("publish this version"), and roll back — scoped to the app, not the whole
  workspace.
- **Session reviewers** — when a draft chat conflicts with the workspace,
  see both versions side by side and pick with eyes open.
- **Agents** — commit, diff, and restore programmatically through the same six
  `vcs.*` verbs, scoped to an app root.
- **Sibling stream iw9-b** — consumes the release-as-tag interface for
  install-as-copy pinning (D8).

## Goals

- App-scoped commits: `vcs.commit/log/diff/show/restore/branches` all accept an
  app scope and operate on `app/<id>` refs; mount lineage in an app-scoped
  commit contains only mounts under that scope.
- `apps/releases.ts` and the per-file `apps.versions/version/restore` surface
  are deleted; grep gates for their symbols return nothing in both repos; a
  release is a tag pointing at a commit and install resolution still works.
- All six `vcs.*` verbs have at least one real client caller (today: one).
- A user can open a diff for any commit, session, or conflict — rendered as a
  side-by-side/unified merge view, not a path list.
- One-click undo: restore to any commit from the history view via
  `vcs.restore`, non-destructively (undo is itself a new commit).
- `auto` sessions answer "what changed?" via `diff(base, main)` filtered to
  session-touched paths — `changeSummary` no longer returns empty for them.
- MergeDialog resolves through server-side `sessions.resolve` and shows both
  versions of every conflicted file.
- Exactly one change-list component renders changed-path lists everywhere
  (today: five near-duplicate renderings, three symbol sets).
- Zero Git jargon or raw hashes in user-facing surfaces (the SessionBar
  vocabulary rule, enforced project-wide).
- Session merge commits carry real parents `[mainHead, sessionHead]` so
  history renders true lineage.

## Non-Goals

- No app-model changes: `Apps/` tree, `app.yaml`, install-as-copy, promote-out
  are sibling B's scope. We only delete the release/version code we own in
  `apps/store.ts` / `apps/service.ts`; B never edits release/version code.
- No changes to `commitTree`'s `prefix`/`ref` parameter plumbing itself — that
  is F1 (`iw9-f1-vcs-scoping-params`), an external dependency.
- No grant/approval work on `routes/tools.ts` (Wave-2 C) — but our schema
  changes there land first.
- No mounts revival UI (`addMount`/`removeMount` procedures + UI are B's, D19).
- No CRDT/document merge machinery (Wave-3 DOC); the merge surface we build is
  file-level.
- No repair of legacy test suites beyond those touching files we change —
  broad `vfs/*`→`vcs/*` test repair is F6.
- No branch management UI beyond what sessions and app refs need (no arbitrary
  user-created branches).

## Capabilities

### New Capabilities
- `app-scoped-commits`: commits, logs, diffs, and restores scoped to an app
  root on `app/<id>` refs; scope-filtered mount lineage; the wire contract of
  the six `vcs.*` verbs with scope arguments.
- `app-release-tags`: a release is a tag ref pointing at an app-scoped commit;
  creation, listing, resolution for install pinning; the replacement contract
  for the deleted `releases.ts`/per-file-version surface (interface consumed
  by iw9-b).
- `change-review-surface`: the client diff viewer, commit history view,
  one-click undo, the single unified change-list component and symbol set, and
  the no-jargon vocabulary rules.
- `session-answerability`: `diff(base, main)` for auto sessions, two-parent
  merge commits, and conflict resolution through `sessions.resolve` with both
  versions visible (D11).

### Modified Capabilities

(none — existing `openspec/specs/` entries are desktop/gateway/native
capabilities; no requirement overlap)

## Constraints & Assumptions

- **Depends on F1** (`iw9-f1-vcs-scoping-params`): `commitTree` `prefix`/`ref`
  params, snapshot-id prefix hashing, un-hardcoded `main` in log/branches,
  scope args in tool schemas, hashes kept in `vcs.diff` wire output. This
  change consumes all five.
- **Depends on F6's test repair** before touching legacy VCS suites
  (tests/vcs.test.ts et al. currently failing on `vfs/*`→`vcs/*` renames).
- **Serialization**: we own `apps/releases.ts` (delete it); B consumes the
  release-as-tag interface and never edits release/version code. Our
  `routes/tools.ts` schema changes land before Wave-2 C's grant-visibility
  work.
- CodeMirror 6 is already in `packages/editor` (verified: `codemirror@^6.0.2`,
  `@codemirror/state/view/autocomplete`); `@codemirror/merge` is NOT yet
  installed — adding it is assumed acceptable (same major, same maintainer).
- Assumption: `VcsCommit.parents: string[]` already exists (verified,
  vcs/store.ts), so two-parent merges are a write-path change, not a schema
  migration; pre-existing single-parent merge commits stay as-is.
- Assumption: releases currently in `svc#apps#releases#<appId>` records are
  few enough to migrate by re-tagging or to drop with a one-time cut-over;
  no long-lived external consumers of release ids exist outside this codebase.

## Open Questions

(Per the IW-9 brief, decisions D8/D10/D11 are settled; the one decision
delegated to this stream — real second parents on session merge commits — is
decided **yes** in tech-plan.md. No user decisions remain.)
