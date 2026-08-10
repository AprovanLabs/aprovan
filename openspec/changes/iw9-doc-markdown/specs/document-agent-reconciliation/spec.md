# document-agent-reconciliation

Agents write whole files (`vfs.write`); humans edit live CRDT state. This
capability defines how a whole-file write against a document with a live
session is reconciled as diff → CRDT transaction (D18, ADR 0003), and how an
unresolvable conflict escalates to a draft session resolved via the iw9-a
merge surface (D11).

## ADDED Requirements

### Requirement: Whole-file writes to a live doc reconcile as CRDT transactions

When `vfs.write` targets a path with a live doc, the write SHALL NOT
overwrite the file or the doc wholesale. The server SHALL compute the edits
between the writer's submitted content and the writer's base (the
materialized content the writer read), producing SEARCH/REPLACE blocks via
the machinery of `packages/editor/src/lib/diff.ts` (`parseDiffs`/
`applyDiffs`, including its whitespace-tolerant fuzzy match), and apply the
successful blocks to the live `Y.Text` as one Yjs transaction. Concurrent
human edits outside the replaced regions SHALL survive; the transaction
SHALL propagate to all connected participants like any human edit.

#### Scenario: Agent edit merges with concurrent typing

- **WHEN** an agent rewrites a document to fix a typo in paragraph 2 while
  a human is concurrently typing in paragraph 5
- **THEN** the live doc contains both the typo fix and the human's new
  text; neither party's edit is lost, and the human sees the agent's edit
  appear live

#### Scenario: Write to a doc without a live session is ordinary

- **WHEN** `vfs.write` targets a Markdown path with no live doc loaded
- **THEN** the write proceeds through the normal VFS path unchanged, with
  no reconciliation machinery involved

### Requirement: Reconciled transactions are attributed

Each reconciled transaction SHALL carry the writing principal (user, agent
profile, app) as its Yjs transaction origin, and the write SHALL produce
the same audit trail an ordinary `vfs.write` produces. Access checks for
the write SHALL be the standard VFS checks — reconciliation never widens
authority (IW-9 invariant 2).

#### Scenario: Audit names the agent

- **WHEN** a `doc/fix-typos` agent run reconciles a write into a live doc
- **THEN** the audit row for the write names the invoking user, the agent
  profile, and the app, identically to a non-live `vfs.write`

### Requirement: Unresolvable conflict flips the session to a draft

If any SEARCH block fails to apply against the current doc (exact and
fuzzy match both fail — the region was concurrently rewritten), the server
SHALL NOT apply a partial guess for the failed blocks. The conflicting
write SHALL be captured intact, and the document's session SHALL flip from
`auto` to `staged` (a draft), per the D11 conflict-escalation trigger.
Successfully matched blocks MAY still apply to the live doc; the failed
blocks land only in the draft. Participants SHALL be notified in-surface
that the document has a pending draft.

#### Scenario: Conflict produces a draft, not a clobber

- **WHEN** an agent's write contains a SEARCH block over a paragraph a
  human has meanwhile rewritten beyond fuzzy tolerance
- **THEN** the live doc is not overwritten with the agent's version, the
  session becomes `staged` holding the agent's intended content for that
  region, and the editor surfaces the draft state

### Requirement: Drafts resolve through the merge surface on manual save

A document session in the draft state SHALL be resolved through the iw9-a
merge surface at manual save: the user sees both versions (live doc vs.
draft content) in the diff viewer, chooses or edits a resolution, and the
resolution SHALL be applied to the live doc as a transaction and committed
via materialization. Resolution SHALL return the session to `auto`.
Discarding the draft SHALL restore `auto` without applying the draft
content.

#### Scenario: Manual save resolves the draft

- **WHEN** a user saves a document whose session is a conflict draft
- **THEN** the merge surface presents live and draft versions, the chosen
  resolution lands in the live doc and as a commit, and the session returns
  to `auto`
