# Report: 01 — Server app-scoped commits

## PR

https://github.com/AprovanLabs/aprovan/pull/205

## Verify

```bash
cd server/workspace && pnpm typecheck && pnpm vitest run \
  tests/vcs.test.ts tests/vcs-interface.test.ts \
  tests/vcs-mount-lineage.test.ts tests/chat-sessions.test.ts
```

| Suite | Result |
| --- | --- |
| `pnpm typecheck` | pass |
| `tests/vcs.test.ts` | 8/8 pass |
| `tests/vcs-mount-lineage.test.ts` | 5/5 pass |
| `tests/chat-sessions.test.ts` | 19/19 pass |
| `tests/vcs-interface.test.ts` | 1 pass / 3 fail (pre-existing; see deviations) |
| `tests/vcs-mounts-procedures.test.ts` (sanity, B) | 6/6 pass |

## What landed

1. **1.1 Scope mapping** — `dispatchAprovanNativeOp` maps `scope: { app }` →
   `prefix = appRoot`, `ref = app/<appId>` for all six vcs verbs before the
   native wire strip (packages/native still only forwards prefix/ref).
2. **1.2 Mount lineage filter** — `commitTree` filters
   `collectMountLineage` entries/provenance to the commit prefix before
   `buildSnapshot`; unscoped commits unchanged.
3. **1.3 Tags/channels** — `writeTag` (immutable), `moveChannel` (movable),
   `listRefs(ws, prefix?)`, plus `tagRefName` / `channelRefName` /
   `appRefName` helpers.
4. **1.4 Two-parent merges** — `commitTree({ parents? })`; `closeSession`
   creates `session/<id>` head then merges with `[mainHead, sessionHead]`
   when the overlay was non-empty; empty overlay stays single-parent.
5. **1.5 Auto changeSummary** — staged keeps overlay walk; auto diffs live
   tree vs base, filtered to `touchedPaths`, with
   `includesOtherActivity` when the set is absent. New auto sessions start
   with `touchedPaths: []`. `recordSessionTouch` exported for write-path
   wiring.
6. **1.6 Tests** covering scoped commit/main untouched, salted snapshot ids,
   scoped restore, branches/tags, foreign-mount exclusion, two-parent merge,
   auto summary excluding foreign edits.

## Deviations

1. **`recordSessionTouch` not wired into `routes/fs.ts` / `services.ts`** —
   both are outside Touches. Auto HTTP writes with `?session=<auto-id>` still
   write through without recording touches. Tests call `recordSessionTouch`
   directly. **Stream 6** (or a tiny follow-up) must call it from the FS/tool
   write path after live-tree mutations when the session is open + auto.
2. **`tests/vcs-interface.test.ts` (3 failures)** — Git-hosting catalog
   tests assume github zero-config; aprovan credentialless native is now the
   default `vcs` binding. Outside this stream's behavior; not caused by
   store/session changes. Do not expand Touches to rewrite the hosting
   interface catalog.
3. **Auto summary uses live-tree snapshot**, not a forced main-head commit —
   write-through edits may not yet be on `main`; ephemeral
   `buildSnapshot(visibleEntries)` answers "what changed" without polluting
   history. Semantically matches D4 intent.
4. **Legacy `vcs.test.ts` assertions** updated to F1 native wire (`files`
   not `entries`; stats read from store record, not wire). Within Touches.

## Notes for sibling streams

### Stream 2 (`routes/tools.ts` + packages/native)
- Add `scope` to all six discovery schemas; thread `scope` through
  `packages/native/src/dispatch.ts` (server already maps it if it arrives).
- Optionally surface `includesOtherActivity` / tag+channel refs in branches
  output schemas.
- `parents` already on commit records; ensure commit output schema lists them.

### Stream 3 (`release-tags.ts` / delete `releases.ts`)
- Consume `writeTag` / `moveChannel` / `tagRefName` / `channelRefName` /
  `appRefName` / scoped `commitTree({ prefix, ref: app/<id> })`.
- Do not reimplement ref writes.

### Stream 6 (sessions UI / MergeDialog)
- Wire `recordSessionTouch` on auto-session FS writes (see deviation 1) so
  SessionBar/ChatDock get filtered summaries without the fallback flag.
- Two-parent merges are live: History can render lineage from
  `commit.parents` (`[mainHead, sessionHead]`).
- `includesOtherActivity` flags the UX "may include other activity" label.
