# Report: 05 — History view + all six vcs verbs

## PR

https://github.com/AprovanLabs/aprovan/pull/212

## Verify

```bash
cd client/web && pnpm typecheck && pnpm test
for v in commit log show diff restore branches; do
  grep -rq "\"$v\"\|vcs\.$v" src --include='*.ts' --include='*.tsx' || exit 1
done
grep -rn "hash.slice\|shortToken" src/components/CommitMountedContent.tsx \
  | grep -v node_modules; test $? -ne 0
```

| Check | Result |
| --- | --- |
| `pnpm typecheck` | pass |
| `pnpm test` | 100/100 pass |
| six-verb grep | all six present |
| `shortToken` / `hash.slice` gate | clean (no matches) |

## What landed

1. **5.1 `vfs-commits.ts`** — typed `VcsChangeSummary` with per-path hashes;
   helpers for all six verbs (`log`/`show`/`diff`/`branches`/`commit`/
   `restore`), plus `readFileAtHash`, merge-title parsing, ChangeList bag
   mapping. (Passthrough of `changes` was already on main from F6/#207;
   this stream typed + extended it.)
2. **5.2 `HistoryPanel`** — workspace + app-scoped timeline; expand →
   ChangeList → DiffViewer sheet (content by hash via `vcs.diff`/`show`);
   two-parent merges show "From draft chat: …".
3. **5.3 Restore** — confirmation copy from ux.md; `vcs.restore` then
   `vcs.commit` ("Restored to …") so history gains a new entry; toast +
   retry on failure ("Nothing was changed").
4. **5.4** — "Save a version now" header action (`vcs.commit`).
5. **5.5** — `VcsPanel` / native surface retitled "Code host"; new History
   native surface (`appTab`); `CommitMountedContent` uses time-based
   "version from …" labels (no short tokens).

## Deviations

1. **`native-surfaces.tsx`** — not on the brief Touches list, but required to
   register the History native surface (and retitle the VCS row).
2. **`DiffViewer` export** — already on `main` via stream 6 (#209); this
   stream did not need to touch `packages/editor/src/index.ts`.
3. **`versions.tsx` not deleted** — still imported by `app-detail.tsx` and
   `workflow-detail.tsx`; left for stream 3 per brief.
4. **No sonner** — client/web has no toast library; restore/save feedback is
   an in-panel ephemeral banner.
5. **Restore = restore + commit** — server `vcs.restore` only writes the
   tree; client snapshots afterward so the timeline matches ux.md
   ("adds a new entry to history").

## Owner constraints honored

- Primary repo not edited; work in
  `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-a-history`.
- Stream 6 surfaces (MergeDialog / SessionBar / SessionsPanel jargon) left alone.
