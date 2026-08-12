# Brief: App — `doc/fix-typos` bundled agent profile

**Depends-on: 5, 9** | Repo: aprovan | Wave 3 (parallel with 4, 7)

## Mission

When you are done, `Apps/document/app.yaml` declares `doc/fix-typos`
under the CF-5 `agents:` grammar; the profile reads/writes via `vfs.*`
within app grants and exercises stream 5 reconciliation when the target is
live. Integration tests cover live merge and non-live ordinary write.

**CF-5 status:** Already on main — do not rebuild app-profile declaration
infrastructure. Before coding, verify `agents/service.ts` no longer 403s
`ctx.appScope` for manifest-declared profiles and that `app.yaml` accepts
`agents:`. If that gate is somehow missing, stop and report (no local
workaround — tech-plan Findings).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 2
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — Findings (CF-5);
   D15 note
4. `openspec/changes/iw9-doc-markdown/specs/document-app/spec.md` —
   "Profile runs within app grants"
5. `openspec/changes/iw9-doc-markdown/specs/document-agent-reconciliation/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 10 (incl. 10.0 gate)
7. iw9-d `specs/app-scoped-agent-profiles/spec.md` (grammar owner)
8. Stream 9's `Apps/document/app.yaml`; stream 5 reconcile path

## Tasks

- [ ] 10.0 **Do not start until `iw9-d-agent-loop-server` stream 10
      ("App-scoped agent profiles (CF-5)") has landed** — that stream is the
      assigned owner of the CF-5 finding (`IW-9-EXECUTION-OVERVIEW.md`
      finding 1) and covers declaration, resolution, and execution together.
      Verify `agents/service.ts`'s `ctx.appScope` block no longer 403s a
      manifest-declared profile, and that `app.yaml` accepts the `agents:`
      block, before writing any code in this stream (mirrors
      `iw9-chat-flagship`'s identical stream-5 gate on the same finding; the
      contract is D's `specs/app-scoped-agent-profiles/spec.md`).
- [ ] 10.1 Declare `doc/fix-typos` in `Apps/document/app.yaml`'s `agents:`
      block per iw9-d task 10.1's grammar — grants: `vfs.read`/
      `vfs.write` scoped to the invoker's accessible paths, no wider ceiling
      (spec document-app "Profile runs within app grants"; invariant 2).
- [ ] 10.2 Prompt: read the target document via `vfs.read`, propose a
      typo-corrected version, write back via `vfs.write` — exercising
      stream 5's reconciliation path end to end when the target is a live
      document (spec "Profile runs within app grants": "its `vfs.write`
      lands through reconciliation without clobbering concurrent human
      edits").
- [ ] 10.3 Tests: run against a live document with a concurrent human edit
      elsewhere in the file — both survive (integration-level repeat of
      5.5's unit case, this time through the real `agents.run` path);
      run against a document with no live session — ordinary `vfs.write`,
      no reconciliation invoked (spec "Write to a doc without a live
      session is ordinary").

## Acceptance criteria

From `specs/document-app/spec.md`:

#### Scenario: Profile runs within app grants

- **WHEN** a user invokes doc/fix-typos on a document
- **THEN** the run executes on the server loop under the intersection of
  the invoker's authority and the app's grants, and its `vfs.write` lands
  through reconciliation without clobbering concurrent human edits

From `specs/document-agent-reconciliation/spec.md`:

#### Scenario: Write to a doc without a live session is ordinary

- **WHEN** `vfs.write` targets a Markdown path with no live doc loaded
- **THEN** the write proceeds through the normal VFS path unchanged, with
  no reconciliation machinery involved

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-fix-typos.test.ts
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `Apps/document/**`, `server/workspace/tests/doc-fix-typos.test.ts`
- Do not rebuild CF-5 / `agents/service.ts` gate — consume what is on main.
- Grants intersect only (invariant 2); no widened ceiling.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/10-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (how stream 11 can trigger the profile).
