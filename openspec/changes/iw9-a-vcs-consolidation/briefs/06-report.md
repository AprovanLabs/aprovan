# Stream 6 report — sessions answerable + MergeDialog on sessions.resolve

**Branch:** `feat/iw9-a-sessions-merge`  
**Worktree:** `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-a-sessions-r2`  
**Status:** implemented; tasks 6.1–6.4 checked off

## What landed

- **MergeDialog**: per-conflict embedded `DiffViewer` ("Workspace version" vs
  "This draft's version" / combined); stale-conflict banner on re-sync drift;
  per-row AI busy/error; confirm via `sessions.resolve` (after overlay prep
  for mixed/AI choices).
- **ChangeList** adopted at SessionBar, ChatDock, SessionsPanel,
  SandboxesPanel, and SaveAffordance (host `renderChangeList` in
  `FileEditorPane`).
- **Auto change strip** on SessionBar + ChatDock; `includesOtherActivity`
  label; "Undo these changes" → `vcs.restore` per listed path at session base.
- **Vocabulary**: SessionsPanel `History` icon, Active/Applied/Archived tabs,
  no glyph change summary; SandboxesPanel "unsaved changes".
- **`DiffViewer` (+ SaveAffordance render types)** exported from
  `@aprovan/editor` index (missing on main after stream 4).

## Verify

```bash
cd client/web && pnpm typecheck && pnpm test
grep -rn "GitBranch\|uncommitted\|[Ss]taged" \
  src/components/panels/SessionsPanel.tsx \
  src/components/panels/SandboxesPanel.tsx | grep -v node_modules
# expect no matches (gate: test $? -ne 0)
```

| Check | Result |
| --- | --- |
| `pnpm typecheck` | pass |
| `pnpm test` | 97/97 pass |
| jargon grep gate | pass (no matches) |

## Deviations

1. **`recordSessionTouch` still unwired in `routes/fs.ts`** — outside Touches
   (stream 1 deviation). Auto HTTP writes still may surface
   `includesOtherActivity` until a follow-up wires touches.
2. **`sessions.resolve` remains bulk-strategy** (`keep-draft` /
   `keep-workspace`). Per-file/AI choices prepare the overlay client-side
   (write AI / discard workspace), then call resolve. Full per-file wire from
   tech-plan Interfaces needs a server follow-up (outside Touches).
3. **Touches expanded slightly** (required for wiring):
   - `packages/editor/src/index.ts` — DiffViewer export (brief-allowed)
   - `client/web/src/lib/chat-sessions.ts` — `resolveChatSession` +
     `includesOtherActivity` on changes
   - `useSessionOrchestration.ts` — merge completion no longer re-applies
   - `FileEditorPane.tsx` — injects ChangeList into SaveAffordance

## Owner constraints honored

- No server FS route edits for `recordSessionTouch`.
- Stream 4 DiffViewer/ChangeList consumed as-is from main (#203).
