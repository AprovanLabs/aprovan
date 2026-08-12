# Brief: Client — conflict banner into iw9-a's merge surface

**Depends-on: 5, 7** | Repo: aprovan | Wave 4 (parallel with 12)

## Mission

When you are done, a staged document session shows a persistent
`DraftBanner`; Review opens iw9-a's `MergeDialog` with live vs draft sides;
resolve applies one live transaction + `forceMaterializeAndCommit`; discard
clears the banner without mutating the live doc.

**Hard gate:** `iw9-a-vcs-consolidation` must be on main for `MergeDialog` /
`DiffViewer` / per-file `sessions.resolve`. If missing, stop and report —
do not build Document-specific conflict UI.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-doc-markdown/ux.md` — "An agent edit conflicts —
   resolve the draft"
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — Context (iw9-a target
   `sessions.resolve`); `forceMaterializeAndCommit`
4. `openspec/changes/iw9-doc-markdown/specs/document-agent-reconciliation/spec.md`
   — draft resolve / discard scenarios
5. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 8 + A external note
6. Stream 7's `useDocumentSession.ts`; stream 5 conflict `sessionId` shape
7. iw9-a merge surface imports once landed

## Tasks

- [ ] 8.1 `DraftBanner.tsx`: persistent banner shown when the document's
      session is `staged` (poll or push via `sessions.get`/existing
      notification surface), "Review" opens iw9-a's `MergeDialog` with the
      live doc text and the draft session's staged content as the two sides
      (ux.md "An agent edit conflicts — resolve the draft").
- [ ] 8.2 Wire `MergeDialog`'s resolution (iw9-a's `sessions.resolve`) to
      apply the chosen content to the live doc as one transaction (so
      remote participants see it as a normal live edit) and trigger
      `forceMaterializeAndCommit` (tech-plan "Interfaces & Data") for the
      attributable commit (spec "Manual save resolves the draft").
- [ ] 8.3 Discard path calls the existing discard-session flow and clears
      the banner without touching the live doc (spec "Discarding the draft
      SHALL restore `auto`").
- [ ] 8.4 Tests: banner appears/disappears with session mode transitions;
      resolve path calls the expected `sessions.resolve` shape with the two
      versions; discard clears the banner without a doc mutation.

## Acceptance criteria

From `specs/document-agent-reconciliation/spec.md`:

#### Scenario: Manual save resolves the draft

- **WHEN** a user saves a document whose session is a conflict draft
- **THEN** the merge surface presents live and draft versions, the chosen
  resolution lands in the live doc and as a commit, and the session returns
  to `auto`

Also: discarding the draft restores `auto` without applying draft content
(requirement text in the same spec).

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `client/web/src/features/document/DraftBanner.tsx`, `client/web/src/features/document/useDocumentSession.ts`
- Zero new conflict-resolution UI — import iw9-a's `MergeDialog`/`DiffViewer` only.
- Do not redesign `sessions.resolve`; consume iw9-a's frozen target shape.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/08-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (selectors / test hooks for stream 11).
