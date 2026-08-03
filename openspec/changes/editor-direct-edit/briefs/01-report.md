# Report: Editor foundations (streams 1–3)

## PR
https://github.com/AprovanLabs/aprovan/pull/20

## Verify results

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/patchwork-editor build` | Pass |
| `grep -q "defaultView" …/fileTypes.ts` | Pass |
| `pnpm --filter @aprovan/registry-ui build` | Pass |
| `pnpm --filter @aprovan/registry-ui test` | Pass (9 tests) |
| vh grep gate (`CodePreview` / `MediaPreview` / `apps-panel`) | Pass |
| stream-3 files exist | Pass |
| `pnpm --filter @aprovan/patchwork-web build` | Pass (after host `showPreview` removal) |

## Host fix (task 4.5, applied on PR branch)

Removed `showPreview` from `EditModalHost` `initialState` while keeping `showTree: true`
(`initialState={{ showTree: true }}`). Rest of stream 4 left for a follow-up PR.

Merged via: https://github.com/AprovanLabs/aprovan/pull/20

## What landed

**Stream 1** — `fileTypes.ts` owns `defaultView` / `canToggleView`; `EditModal` derives
view from policy; TipTap serialize-compare via `markdownRoundTrips()` falls back to source
with a notice.

**Stream 2** — `RendererSizing` (`fill` \| `inline`) on `RendererDef` / `RenderedView`; all
`registerRenderer` sites updated; vh floors/caps removed from `CodePreview`,
`MediaPreview`, `apps-panel`; chat host supplies `max-h` (`MessageParts` `className`,
`ChatArtifactBlock` already bounded).

**Stream 3** — `write-policy.ts` (non-writable mounts → `readonly`), `useDirectSave`,
`useLazyDraft`, `publishConflictNotification`. Unused until stream 4 wires `FileEditorPane`.

## Notes for streams 4–6

- **4**: Task 4.5 (`EditModalHost` `showPreview`) done on this PR; remaining stream-4 work:
  compose `FileEditorPane` + `SaveStateChip`; delete `beginEditDraft`-on-open; route tab content through policy hooks.
- **5**: Chat dock; AI edits always staged; proposal conflicts → `publishConflictNotification`.
- **6**: Migrate `useDraftSync` / remaining conflict blobs; declutter `SessionBar`
  (do not touch it in 1–3); delete `keepEditDrafts`.
- Mounts stay read-only in v1 (`writable: false` ⇒ `readonly`, not staged).
- Do not edit `SessionBar.tsx`, `panels/**`, or `realtime/**` from this wave’s other agents.
