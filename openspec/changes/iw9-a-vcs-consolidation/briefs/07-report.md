# Report: 07 — Integration verification + doc touch-up

## PR

https://github.com/AprovanLabs/aprovan/pull/217

## Verify

```bash
cd server/workspace && pnpm test
# baseline (origin/main tip, no stream-7 edits): 66 failed | 647 passed | 63 skipped
# with stream-7:                               66 failed | 650 passed | 63 skipped
# → +3 passes (7.1 + 7.2×2); no additional failures

cd client/web && pnpm typecheck && pnpm test
# typecheck pass; 100/100 pass

# Deleted-symbol gates (both repos; expect no matches / exit ≠ 0):
grep -rn "apps\.versions\|apps\.version\b\|apps\.restore" \
  server client packages \
  /Users/jacob/Documents/Code/AprovanLabs/registry \
  --include='*.ts' --include='*.tsx' | grep -v node_modules | grep -v openspec
# exit ≠ 0 after comment reword in apps.test.ts

grep -rn "listEntryVersions\|readEntryVersion\|restoreEntryVersion\|apps/releases" \
  server packages client \
  /Users/jacob/Documents/Code/AprovanLabs/registry \
  --include='*.ts' --include='*.tsx' | grep -v node_modules | grep -v openspec
# exit ≠ 0 (clean)
```

| Check | Result |
| --- | --- |
| workspace suite failures | 66 → 66 (unchanged) |
| workspace suite passes | 647 → 650 (+3 stream-7) |
| `app-integration` 7.1–7.2 | 3/3 pass |
| `app-integration` 6.1 | pre-existing fail (`resolvedRelease` undefined) |
| client `typecheck` | pass |
| client `pnpm test` | 100/100 pass |
| Grep gate (versions/restore) | clean |
| Grep gate (stream-3 deletions) | clean |
| Registry `vcs-and-sessions.md` | F6 already stamped; no DEPRECATED pointer |

## What landed

1. **7.1** — `tests/app-integration.test.ts` e2e: publish → edit →
   `vcs.commit` with `scope:{app}` → `apps.release` (tag) → dirty live tree →
   live-apps 302 + `/a/…/__project__` serves pinned release bytes →
   `vcs.restore` scoped → `vcs.log` scoped shows both commits; `main` tip
   unchanged.
2. **7.2** — staged conflict → `sessions.resolve` (`keep-draft`) → two-parent
   merge on main with `sessionId` + `session/<id>` second parent in history;
   auto session → explicit `recordSessionTouch` (fs.ts still unwired) →
   change summary → path restores to session base.
3. **7.3** — cross-repo deletion greps clean; F6 already rewrote
   `registry/docs/vcs-and-sessions.md` Surface (no DEPRECATED stamp needed).
   Stale `apps/releases.ts` mention updated in `docs/tasks/improve-findings.md`.

## Deviations

1. **Touches +1 file** — reworded the stream-3 smoke comment in
   `tests/apps.test.ts` so the literal `apps.versions|apps.restore` grep gate
   does not false-positive on a comment. No behavior change.
2. **`recordSessionTouch` still unwired in `routes/fs.ts`** — outside Touches
   (carryover from streams 1/6). Auto restore test records touches explicitly.
3. **`sessions.resolve` bulk strategy** — tested as shipped (`keep-draft` /
   `keep-workspace`); did not re-litigate mixed/AI overlay prep.
4. **Pre-existing `app-integration` 6.1** — `install.resolvedRelease` is
   `undefined` vs release id (present on main before this stream).

## Notes for Wave 2 (C / Chat)

- App history + release pins compose on the tag surface; install pin consumers
  should keep using `resolveReleaseTag` / commit snapshots (stream 3).
- Auto session answerability still depends on explicit touch recording until
  someone wires `recordSessionTouch` in `fs.ts`.
- Client History / MergeDialog were not re-tested here beyond server wire
  coverage; client suite stayed green (100/100).
