# Brief: Server — agent-write reconciliation and conflict escalation

**Depends-on: 2** | Repo: aprovan | Wave 2 (parallel with 3)

## Mission

When you are done, whole-file `vfs.write` against a live doc reconciles via
SEARCH/REPLACE → one Yjs transaction; unmatched blocks escalate to a staged
session (D11) instead of clobbering. Both tool and HTTP write choke points
call `reconcileOrPassThrough` and fall through unchanged when no live doc
exists (`vfs.test.ts` stays green unmodified).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 2
3. `openspec/changes/iw9-doc-markdown/prd.md` — Goals 2–3
4. `openspec/changes/iw9-doc-markdown/tech-plan.md` — D3, D7; Interfaces
   (`ReconcileWriteArgs`, `reconcileOrPassThrough`)
5. `openspec/changes/iw9-doc-markdown/specs/document-agent-reconciliation/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 5
7. `packages/editor/src/lib/diff.ts` — `parseDiffs` / `applyDiffs` (consume as-is)
8. `server/workspace/src/services.ts` (`:607-627`), `routes/fs.ts` (`:261-288`)
9. `server/workspace/src/vcs/chat-sessions.ts` — `createSession`,
   `sessionWrite`, `updateSession`
10. Stream 2's `hasLiveDoc` / registry

## Tasks

- [ ] 5.1 `doc/reconcile.ts`: `reconcileOrPassThrough` per tech-plan
      "Interfaces & Data" — `{kind: "not-live"}` when `hasLiveDoc` is false
      (no behavior change, spec "Write to a doc without a live session is
      ordinary"); otherwise derive SEARCH/REPLACE blocks between `base` and
      `content` (reusing `packages/editor/src/lib/diff.ts`'s block shape —
      verified exports `parseDiffs`/`applyDiffs`, `diff.ts:220,321`), apply
      matched blocks to the live `Y.Text` in one `Y.Doc.transact(fn, origin)`
      call with `origin` carrying the writing principal (spec
      document-agent-reconciliation "Audit names the agent").
- [ ] 5.2 Conflict path (tech-plan D3): unmatched blocks → resolve a staged
      session (caller-supplied `explicitSessionId` if present and staged,
      else `createSession(ws, actor.userId, {mode: "staged"})`), stage the
      failed content via `sessionWrite` (`chat-sessions.ts:335-353`), return
      `{kind: "conflict", sessionId, ...}` — never a partial guess for
      failed blocks (spec "Unresolvable conflict flips the session to a
      draft"); if the resolved session was `auto`, flip it via
      `updateSession(ws, id, {mode: "staged"})`
      (`chat-sessions.ts:158-182`).
- [ ] 5.3 Wire `reconcileOrPassThrough` into `services.ts`'s `vfs` write
      case (`services.ts:607-627`, before the existing `staged`/`store.write`
      branch — tech-plan D7) and `routes/fs.ts`'s `PUT` handler
      (`routes/fs.ts:261-288`, same position); both fall through to today's
      exact code when the result is `{kind: "not-live"}` (regression guard:
      existing `tests/vfs.test.ts` must stay green unmodified).
- [ ] 5.4 Standard access checks apply before reconciliation runs — no
      widened authority (spec "Reconciled transactions are attributed":
      "reconciliation never widens authority", invariant 2); reuse the same
      grant/partition checks already present at both call sites.
- [ ] 5.5 Tests: agent edit merges with concurrent typing (spec "Agent edit
      merges with concurrent typing" — apply a matched block via reconcile
      while a separate `Y.Doc.transact` simulates concurrent human typing
      elsewhere in the text; assert both survive); conflict produces a
      draft not a clobber (spec "Conflict produces a draft, not a clobber" —
      a SEARCH block over content rewritten beyond fuzzy tolerance leaves
      the live doc untouched for that region and lands in the draft
      session's overlay); audit row names the agent profile/app (spec
      "Audit names the agent").

## Acceptance criteria

From `specs/document-agent-reconciliation/spec.md`:

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

#### Scenario: Audit names the agent

- **WHEN** a `doc/fix-typos` agent run reconciles a write into a live doc
- **THEN** the audit row for the write names the invoking user, the agent
  profile, and the app, identically to a non-live `vfs.write`

#### Scenario: Conflict produces a draft, not a clobber

- **WHEN** an agent's write contains a SEARCH block over a paragraph a
  human has meanwhile rewritten beyond fuzzy tolerance
- **THEN** the live doc is not overwritten with the agent's version, the
  session becomes `staged` holding the agent's intended content for that
  region, and the editor surfaces the draft state

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-reconcile.test.ts tests/vfs.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `server/workspace/src/doc/reconcile.ts`, `server/workspace/src/services.ts`, `server/workspace/src/routes/fs.ts`, `server/workspace/tests/doc-reconcile.test.ts`
- Do **not** change `packages/editor/src/lib/diff.ts` matching algorithm.
- Do **not** hook `native-dispatch.ts` (D7 documented gap).
- Do not invent new draft machinery — use existing session/overlay primitives.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/05-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (conflict `sessionId` shape for stream 8 / 10).
