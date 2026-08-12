# Stream 12 report — Integration verification

**PR:** (filled after `gh pr create`)
**Branch:** `feat/iw9-doc-integration`
**Base:** `origin/main` @ `780e76e` (stream 4 quiesce)

## What was built

| Path | Role |
|---|---|
| `server/workspace/tests/doc-integration.test.ts` | End-to-end proofs for Goals 4 / 5 / 7 |

### Coverage

| Task | Assertion |
|---|---|
| **12.1** | Live `getOrLoadDoc` → edit → idle / max-interval quiesce → `POST /tools/vfs/read` with `{ path }` only returns plain Markdown (no `\0`, not CRDT bytes); continuous edits still materialize within max-interval (`≤ DOC_QUIESCE_MAX_INTERVAL_MS`) |
| **12.2** | Synthetic updates past `DOC_COMPACT.SIZE_BYTES` (threshold lowered; constant name asserted) → `compactIfDue` clears update log; content identical before/after cold reload |
| **12.3** | Live session with awareness (`user` / `cursor`) + materialize → anonymous `GET /share/<key>` (iw9-b `shareRouter`) returns file JSON only; no `awareness` / `doc:` / sync frames / participant fields |
| **12.4** | Scoped `git diff --stat`; doc suite + client green; full workspace failure count unchanged vs main |

No Document-specific share routes added — consumes `createLinkShare` + `routes/share.ts` only.

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-
# ✓ 7 files / 37 tests (incl. 4 new integration)

APROVAN_ENV=off pnpm --filter @aprovan/patchwork-web test
# ✓ 22 files / 162 tests (after ^build of web deps)
```

### 12.4 suite / scope audit

```text
# This branch (code + report)
git diff --stat origin/main...HEAD
 server/workspace/tests/doc-integration.test.ts | … +
 openspec/changes/iw9-doc-markdown/briefs/12-report.md | …
 openspec/changes/iw9-doc-markdown/tasks.md | 12.x [x]
```

Implementation Touches list: **only** `server/workspace/tests/doc-integration.test.ts`.
No edits under `src/doc/`, `realtime/`, editor, or `client/web/src/features/document/`.

Full `pnpm --filter @aprovan/workspace test` on this tip:

| Checkout | Failed tests | Passed tests |
|---|---|---|
| `origin/main` (quiesce WT, no stream 12) | **72** | 770 |
| `feat/iw9-doc-integration` | **72** | **774** (+4) |

Same 72 pre-existing failures (interfaces / agent-run / get-client / vcs-interface, etc. — `Unknown interface: llm` / tool 404). Not introduced by this stream; failure count unchanged, pass count +4.

## Deviations

1. **Full workspace suite not fully green on `origin/main`** — 72 failures pre-exist on the same commit without this change (verified on `aprovan-iw9-doc-quiesce` worktree). Stream 12 did not expand Touches to “fix” them. Documented with the baseline table above.
2. **`DOC_COMPACT.SIZE_BYTES` mutated for 12.2** — same pattern as `doc-persistence.test.ts`; frozen `DOC_COMPACT_SIZE_BYTES` remains the tech-plan default name and is asserted `> ` the test threshold.
3. **Report + tasks.md** committed alongside the test file (brief “Report back” / check-off), outside the code Touches list.

## Notes for next wave

- Integration tests use workspace id `local` so `createApp()` `vfs/read` hits the same FS as `getOrLoadDoc`.
- Share leak assertions are structural (response keys + JSON string scan). Live awareness remains on the in-memory `LiveDoc` — isolation is the HTTP surface, not clearing awareness.
- Wave-3 exit gate can treat Goals 4 / 5 / 7 as covered by this file once the PR lands.
