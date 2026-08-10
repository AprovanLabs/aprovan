# PRD — iw9-doc-markdown (Wave 3 DOC flagship)

_Elaborates the Wave-3 `document-markdown` stream of
`openspec/changes/IW-9-APP-FIRST.md` (settled authority; D11, D17, D18,
invariants 8 and 9). Slides/sheets are explicitly deferred there and are not
absorbed here._

## Problem

Editing a Markdown file in the workspace today is single-writer: two people
(or a person and an agent) editing the same file clobber each other with
whole-file writes, and there is no shared cursor presence, so real-time
co-authoring happens in Google Docs instead of the workspace. IW-9 makes apps
the product, and Document is the second flagship (after Chat) that has to
prove the platform can replace enterprise software — it exercises CRDT
collaboration, agent/human reconciliation, and the D11 conflict-to-draft path
end to end.

## Users & Jobs

- **Workspace members co-authoring a doc** — open the same `.md`, type
  simultaneously, see each other's named cursors and selections, never lose a
  keystroke to someone else's save.
- **Agents (e.g. a `doc/fix-typos` profile)** — read the current document as
  a plain file from the VFS, propose a whole-file rewrite via `vfs.write`,
  and have it land as fine-grained edits that merge with in-flight human
  typing instead of clobbering it.
- **A user reviewing a conflicted agent edit** — when reconciliation cannot
  merge safely, the session becomes a draft; the user resolves it in the
  diff/merge surface (iw9-a) on manual save, with a visible undo path.
- **Anonymous link recipients** — read the last materialized `.md` of a
  link-shared document (invariant 9: read only; joining the live session
  requires an account).
- **Every other agent and tool in the platform** — keep treating the
  document as an ordinary file: `vfs.read` returns current truth without
  knowing a CRDT exists.

## Goals

Validation bar (each is a demoable/E2E-testable outcome):

1. Two users in the same document see each other's live cursors, selections,
   and display names; a character typed by one appears for the other without
   reload.
2. An agent `vfs.write` to a document a human has open lands as merged edits:
   the human's concurrent typing survives (no clobber), and the agent's
   change is visible in the live doc.
3. An unresolvable agent/CRDT write conflict flips the session to a draft
   (staged); the user resolves it through the iw9-a merge surface on manual
   save, and the resolution lands as one commit (D11).
4. The `.md` on disk is materialized on quiesce and stays readable by
   ordinary `vfs.*`/agents throughout a live session — `vfs.read` never
   returns stale-beyond-quiesce or CRDT-encoded content.
5. Persisted doc state stays bounded: after compaction, stored size is a
   snapshot plus a bounded update tail, not an unbounded update log
   (thresholds specified, enforced, and covered by a test).
6. Document ships as a real app (`app.yaml` per iw9-f4/iw9-b, managed-mode)
   with a bundled agent profile (`doc/fix-typos`-style, D15) that runs on the
   iw9-d server loop.
7. A link-shared document is readable anonymously as its materialized file
   (via iw9-b `vfs` sharing); anonymous users can never join the live
   session, write, or see presence (invariant 9).

## Non-Goals

- **Slides and sheets** — deferred with their own plan in the IW-9 brief
  ("Deferred" section owns it; nothing here designs cell maps, element
  trees, or LibreOffice conversion).
- **Actor-per-doc runtime** — doc authority is a server-side singleton now;
  the runtime-interface future is noted, not designed (IW-9 Deferred).
- **Offline-first / local-first persistence of client Yjs state** — clients
  recover by resync, not by durable local replicas.
- **A block-based WYSIWYG editor** — Markdown-first in CodeMirror 6 (D17,
  D18); no Notion-style block model.
- **Rich embeds, comments/annotations, suggestions mode** — future Document
  iterations, not this change.
- **Cross-app document embedding or app→app calls** (IW-9 Deferred).
- **Anonymous participation of any kind beyond reading a link-shared
  materialized file** (invariant 9).
- **Broker sharding or new realtime backends** — presence rides the iw9-f5
  broker contract as-is (D16).

## Capabilities

### New Capabilities

- `document-collab`: live collaborative session over a Yjs doc per document
  — server-side doc authority, sync protocol, awareness (cursors,
  selections, names) riding the realtime broker, account-required
  participation.
- `document-materialization`: quiesce-triggered materialization of the live
  doc to its `.md` in the workspace VFS; files remain the truth agents and
  ordinary tools read; link-share read path for anonymous users.
- `document-agent-reconciliation`: agent/tool `vfs.write` against a live doc
  is reconciled as diff → CRDT transaction (SEARCH/REPLACE machinery from
  `packages/editor`); unresolvable conflict escalates the session to a draft
  resolved via the iw9-a merge surface (D11).
- `document-persistence`: durable doc state as periodic
  `Y.encodeStateAsUpdate` snapshot + pruned update log, with explicit size
  and age thresholds (compaction is REQUIRED by D17/D18, not an
  optimization).
- `document-app`: the Document flagship as an installable managed-mode app —
  `app.yaml` (iw9-f4 manifest), icon, URLs, bundled `doc/fix-typos` agent
  profile bounded by app grants (D15) on the iw9-d loop.

### Modified Capabilities

None in `openspec/specs/` (existing main specs are desktop/gateway-scoped).
This change *consumes* sibling-change capabilities without modifying them:
`realtime-broker` (iw9-f5), app manifest/slug (iw9-f4), app model + vfs
sharing (iw9-b), merge surface + diff viewer (iw9-a), server agent loop
(iw9-d).

## Constraints & Assumptions

Constraints (settled by IW-9, not re-litigated):

- CRDT is **Yjs**; awareness protocol carries cursors/selections/names;
  editor binding is `y-codemirror.next` on CodeMirror 6 (D17). CM6 is
  already a dependency of `packages/editor` (verified:
  `packages/editor/package.json`).
- Markdown-first; Yjs doc is live truth; `.md` materialized on quiesce;
  agent whole-file writes reconciled as diff→CRDT; unresolvable conflict →
  draft session (D18, D11).
- Search/indexes never the access boundary (invariant 8): any doc listing or
  lookup returns ids re-fetched through tenant-scoped access checks.
- Anonymous: link-shared file read only (invariant 9).
- Doc authority is server-side in the existing workspace server (single task
  now); the actor-per-doc future is recorded as a note, not designed.
- New runtime dependencies (`yjs`, `y-codemirror.next`, `y-protocols`) enter
  via an explicit dependency task with lockfile verification.
- External sibling dependencies: iw9-a (merge surface), iw9-b (app model +
  sharing), iw9-d (agent loop), iw9-f5 (broker contract). iw9-chat is
  precedent for realtime patterns only — no shared files.

Assumptions (unconfirmed by user; flagged):

- The Document editing surface is CodeMirror 6, not the TipTap/ProseMirror
  stack also present in `packages/editor` — D17 names `y-codemirror.next`,
  so CM6 is taken as decided; TipTap remains for its existing widget uses.
- Any workspace `.md` can be opened as a live document (doc keyed by
  workspace + path), not only files under the Document app's root — see Open
  Questions.
- The reconciliation diff machinery in `packages/editor/src/lib/diff.ts`
  (verified exports: `parseDiffs`, `applyDiffs`, fuzzy whitespace-tolerant
  matching) is reusable server-side as a plain library.

## Open Questions

Near-empty by design — the IW-9 brief settles the substantive decisions
(D11, D17, D18).

1. **Which files are collab-eligible?** Recommended: any `.md` in the
   workspace can be opened as a live document (doc identity = workspace +
   path), with the Document app as the surface — rather than restricting
   live collaboration to files under the Document app's own root. The
   file-tree-is-the-product stance and the `doc/fix-typos` agent (which
   edits arbitrary docs) both point this way.
