# Brief: E2E — two-user cursors, agent merge, conflict-to-draft (Playwright)

**Depends-on: 6, 7, 8** | Repo: aprovan | Wave 5

## Mission

When you are done, three Playwright specs validate the PRD bars: two users
see live cursors/characters; agent (or vfs.write) merge with concurrent
typing; forced conflict → draft banner → MergeDialog resolve → commit +
`auto`. Anonymous never appears on a `doc:<path>` subscriber set.

**Hard gate:** `iw9-chat-flagship` stream 9 Playwright harness
(`e2e/fixtures/two-users.ts`) must be on main. Reuse it — do not
re-bootstrap Playwright.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — Wave 3 exit gate
2. `openspec/changes/iw9-doc-markdown/prd.md` — Goals 1–3 validation bars
3. `openspec/changes/iw9-doc-markdown/ux.md` — flows under test
4. `openspec/changes/iw9-doc-markdown/specs/document-collab/spec.md`
5. `openspec/changes/iw9-doc-markdown/specs/document-agent-reconciliation/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 11
7. `client/web/e2e/fixtures/two-users.ts` (chat stream 9)
8. Optional: `e2e/fixtures/ws-capture.ts` if landed with chat

## Tasks

- [ ] 11.1 (iw9-chat-flagship-gated) Reuse `e2e/fixtures/two-users.ts`
      (do not re-bootstrap Playwright — external dependency note above);
      `doc-live-cursors.spec.ts`: two browser contexts open the same
      document, user A types, user B sees the character appear without
      reload and sees A's named cursor move (PRD Goal 1 validation bar;
      spec document-collab "Two users see each other's cursors" +
      "Concurrent joiners share one doc").
- [ ] 11.2 `doc-agent-merge.spec.ts`: a user has the document open and
      typing in one region while a triggered `doc/fix-typos` run (or a
      direct `vfs.write` against the test fixture, if stream 10 hasn't
      landed yet — call out which in the test) edits another region; assert
      both edits are present and the user's session never shows a
      disconnect/clobber (PRD Goal 2 validation bar).
- [ ] 11.3 `doc-conflict-draft.spec.ts`: force a conflict (rewrite the exact
      region a queued agent write targets, beyond fuzzy tolerance, before
      the write lands), assert the draft banner appears, resolve through
      the `MergeDialog`, assert the resolution lands as one commit and the
      session returns to `auto` (PRD Goal 3 validation bar; spec "Manual
      save resolves the draft").
- [ ] 11.4 Raw WebSocket frame capture (reuse `e2e/fixtures/ws-capture.ts`
      from iw9-chat-flagship if landed, else `page.on("websocket")`
      directly) on the live-cursors spec: assert no anonymous connection
      ever appears in a `doc:<path>` topic's subscriber set (invariant 9
      spot-check at the E2E layer, complementing 4.1's unit coverage).

## Acceptance criteria

PRD Goals 1–3 plus:

#### Scenario: Two users see each other's cursors

- **WHEN** two authenticated users have the same document open and one
  moves their cursor or changes their selection
- **THEN** the other sees the updated cursor/selection decorated with the
  first user's display name, without any document content change

#### Scenario: Concurrent joiners share one doc

- **WHEN** two clients join a session for the same workspace path at the
  same time
- **THEN** both converge to a single server-held doc, and a character typed
  by either client appears in the other's editor without reload

#### Scenario: Manual save resolves the draft

- **WHEN** a user saves a document whose session is a conflict draft
- **THEN** the merge surface presents live and draft versions, the chosen
  resolution lands in the live doc and as a commit, and the session returns
  to `auto`

Invariant 9: no anonymous `doc:<path>` subscriber.

## Verify

```bash
pnpm --filter @aprovan/patchwork-web exec playwright test e2e/doc-live-cursors.spec.ts e2e/doc-agent-merge.spec.ts e2e/doc-conflict-draft.spec.ts --retries=0
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `client/web/e2e/doc-live-cursors.spec.ts`, `client/web/e2e/doc-agent-merge.spec.ts`, `client/web/e2e/doc-conflict-draft.spec.ts`
- Do not re-bootstrap Playwright or edit package.json.
- If stream 10 is missing, use direct `vfs.write` in 11.2 and say so in the report.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/11-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know.
