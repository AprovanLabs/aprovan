# Brief: Editor foundations (editor-direct-edit streams 1–3)

## Mission
Land the three mutually independent foundations for file-first editing with no user-visible
default-path change yet (wiring is stream 4): (1) per-type `defaultView` / `canToggleView`
policy in `fileTypes.ts` + EditModal consumption + markdown round-trip guard; (2) renderer
`sizing: "fill" | "inline"` host contract and removal of hardcoded `vh` caps; (3) write-policy
+ `useDirectSave` + `useLazyDraft` + `publishConflictNotification`. When done, builds pass
and stream 4 can compose `FileEditorPane` against these seams.

Owner decisions settled: mounted repos stay read-only v1 ("staged" is future-proofing);
EditModal is demoted later, not deleted here.

## Read first
1. `openspec/changes/editor-direct-edit/prd.md`
2. `openspec/changes/editor-direct-edit/ux.md`
3. `openspec/changes/editor-direct-edit/tech-plan.md` (D1, D2, D4, D6, D7 + Interfaces & Data)
4. `openspec/changes/editor-direct-edit/tasks.md` (streams 1–3)
5. Specs: `file-renderer-defaults`, `renderer-host-sizing`, `direct-file-editing`,
   `session-history-simplification` (conflict helper scenario only)
6. Key sources under `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:
   - `packages/editor/src/components/edit/fileTypes.ts`
   - `packages/editor/src/components/edit/EditModal.tsx`
   - `packages/registry-ui/src/renderers.tsx`
   - `client/web/src/features/sessions/useEditDraft.ts` (reference for draft sync semantics)
   - `client/web/src/lib/workspace-vfs.ts`

## Tasks
Streams **1**, **2**, and **3** from `tasks.md` (1.1–1.3, 2.1–2.4, 3.1–3.4). Execute
verbatim; check off as completed.

Note: stream 1 removes `showPreview` from `EditModalProps.initialState` — the host compile
break at `EditModalHost` is intentionally deferred to stream 4. If the web package fails
typecheck because of that, keep the editor/registry-ui packages green and note the expected
break for stream 4 (or leave a minimal cast only if the monorepo CI requires web build —
prefer documenting; do not reintroduce `showPreview`).

## Acceptance criteria
From the specs (full WHEN/THEN in those files):

**file-renderer-defaults**
- Per-type default views owned by `fileTypes.ts`
- Policy consulted, not host state / Hosts share one policy
- Markdown opens rich by default; source toggle round-trips; non-round-trippable falls back

**renderer-host-sizing**
- Fill mode in a tab pane / Inline mode in chat
- Grep gate (no `min-h-[Nvh]` / `max-h-[Nvh]` in listed files)
- Small widget not inflated / tall widget not arbitrarily capped

**direct-file-editing** (foundation portions)
- Write policy derived from path (plain→direct, app source→staged, mount→staged/readonly)
- Direct edits write through VFS (online + offline journal)
- Staged targets get lazily created draft (read no draft; first save creates; failure no write)

**session-history-simplification**
- One code path builds conflict notifications (`publishConflictNotification`)

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-editor build
grep -q "defaultView" packages/editor/src/components/edit/fileTypes.ts
pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test
! grep -nE "min-h-\[[0-9]+vh\]|max-h-\[[0-9]+vh\]" packages/editor/src/components/CodePreview.tsx packages/editor/src/components/edit/MediaPreview.tsx packages/registry-ui/src/apps-panel.tsx
pnpm --filter @aprovan/patchwork-web build   # may fail on showPreview host site — note it
test -f client/web/src/features/editing/write-policy.ts
test -f client/web/src/features/editing/useDirectSave.ts
test -f client/web/src/features/editing/useLazyDraft.ts
test -f client/web/src/features/sessions/conflict-notify.ts
```

## Git workflow
- Repo: `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- Branch: `iw2/editor-foundations` from latest `origin/main`
- Isolated worktree; rebase before PR; merge to `main` when green.
- Do not touch `SessionBar.tsx` (presence + later editor streams claim it).
- Coordination: do not edit `client/web/src/components/panels/**` (native-panel) or
  `server/workspace/src/realtime/**` (presence).

## Constraints
- Interfaces in tech-plan are fixed; stop if wrong.
- Surgical; karpathy-guidelines.
- Touches only the stream Touches globs in tasks.md. Stream 2.4 may touch
  `client/web/src/features/widgets/ChatArtifactBlock.tsx` as listed in the task body.
- Mounts: non-writable ⇒ `"readonly"` (not writable staged).

## Report back
Check off 1.1–3.4; write `briefs/01-report.md` with PR URL, verify results, any web
typecheck break deferred to stream 4, and notes for streams 4–6.
