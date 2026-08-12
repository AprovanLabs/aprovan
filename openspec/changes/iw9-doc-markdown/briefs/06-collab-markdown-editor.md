# Brief: Client — CollabMarkdownEditor (CM6 + y-codemirror.next)

**Depends-on: 1** | Repo: aprovan | Wave 1 (parallel with 2)

## Mission

When you are done, `packages/editor` exports a new `CollabMarkdownEditor`
that binds CM6 to `Y.Text("content")` + awareness via `y-codemirror.next`.
TipTap `MarkdownEditor` and Shiki `CodeBlockView` are untouched. Unit tests
prove two loopback `Y.Doc`s converge through the binding.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-doc-markdown/ux.md` — CollabMarkdownEditor states;
   read-only share view
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — Client interface note;
   Context (model on `ts/index.tsx`, not TipTap)
4. `openspec/changes/iw9-doc-markdown/prd.md` — D17/D18 Markdown-first
5. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 6
6. `packages/editor/src/ts/index.tsx` — CM6 host pattern
7. `packages/editor/src/components/MarkdownPreview.tsx` — readOnly path

## Tasks

- [ ] 6.1 `CollabMarkdownEditor.tsx`: new CM6 host modeled on
      `packages/editor/src/ts/index.tsx`'s pattern (`basicSetup`/
      `EditorView` from `"codemirror"`, `EditorState`/`Compartment` from
      `"@codemirror/state"`, `ts/index.tsx:9,24-25`) — NOT a modification of
      `MarkdownEditor.tsx` (TipTap) or `CodeBlockView.tsx` (Shiki, read-only)
      per tech-plan Context. Props: `{ doc: Y.Doc, awareness: Awareness,
      userInfo: {name, color}, initialContent: string, readOnly?: boolean }`.
- [ ] 6.2 Bind `y-codemirror.next`'s `yCollab` extension to
      `doc.getText("content")` + `awareness`; local edits flow through CM6's
      normal transaction path (no manual diffing on the client, tech-plan
      "Client" interface note).
- [ ] 6.3 `readOnly` mode renders `MarkdownPreview.tsx` instead of mounting
      CM6 at all (ux.md "Read-only share view" — used for the anonymous
      link-share flow, no live doc object is ever constructed for it).
- [ ] 6.4 Tests: two independent `Y.Doc` instances wired through a
      loopback (no network) converge after applying each other's
      `Y.encodeStateAsUpdate` — proves the binding round-trips text through
      CM6 correctly (unit-level substitute for a full E2E; the two-browser
      case is stream 11).

## Acceptance criteria

Editor binding quality bar (E2E cursor scenarios owned by stream 11):

- Local edits apply through CM6 → Yjs without client-side SEARCH/REPLACE.
- `readOnly` never mounts CM6 (MarkdownPreview only).
- Loopback two-doc convergence test passes.

## Verify

```bash
pnpm --filter @aprovan/editor test && pnpm --filter @aprovan/editor typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `packages/editor/src/components/CollabMarkdownEditor.tsx`, `packages/editor/src/lib/yjs-cm6.ts`, `packages/editor/src/index.ts`, `packages/editor/src/__tests__/collab-markdown-editor.test.ts`
- Do not modify TipTap `MarkdownEditor.tsx` or `CodeBlockView.tsx`.
- Export the component for stream 7 / web to import.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/06-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (exact export path for stream 7).
