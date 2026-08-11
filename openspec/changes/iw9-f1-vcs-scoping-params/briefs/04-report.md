# Report: Stream 4 — Scoping test coverage

## What was built

New `server/workspace/tests/vcs-scoping.test.ts` — the acceptance gate for
`iw9-f1-vcs-scoping-params`. It exercises every scenario in
`vcs-scoped-commits`, `vcs-ref-enumeration`, and `vcs-diff-wire-fidelity`
end-to-end through the real `/tools/vcs/*` dispatch path (plus store helpers
only where the scenario is about snapshot identity math), and embeds the two
MIGRATION-DEBT grep gates as tests.

Coverage map:

| Task | Scenarios covered |
|---|---|
| 4.1 | Default whole-workspace/`main` commit; scoped `prefix: "Apps/a"` snapshot entries + `prefix` field; named-ref advance leaving `main` untouched; invalid ref → 400 with no writes; `buildSnapshot` cross-scope id divergence; same-scope idempotence (`created: false`); empty-prefix id = precomputed sha256 of sorted `<hash> <path>` lines; fresh-ref root commit (`parents: []`) |
| 4.2 | Empty workspace `{ branches: [] }`; ref-scoped log excludes `main` commits; default/`main` log parity; unknown well-formed ref → `{ commits: [] }`; branches lists `main` + `session/s1` + `app/x` sorted |
| 4.3 | Hash-bearing `diff`/`show.changes` for modified/added/removed; `prefix` filter inclusion/exclusion; no-prefix full diff; `GET /tools` discovery schemas for `vcs.commit`/`log`/`diff`/`show` advertise `prefix`/`ref` and object-shaped diff entries |
| 4.4 | `listRefs` has a non-test caller in `native-dispatch.ts`; no `readRef(workspaceId, "main")` in `native-dispatch.ts` |

No production code changed. F6-owned legacy suites were not edited.

## How it was verified

Corrected brief Verify (see `briefs/deviations.md` — turbo build first so
`@aprovan/native` `dist/` is current):

```bash
pnpm turbo run build --filter=@aprovan/native --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts
# → Test Files 1 passed (1); Tests 17 passed (17)

grep -rn 'listRefs' server/workspace/src --include='*.ts' | grep -v vcs/store.ts
# → native-dispatch.ts import + branches call (non-empty)

! grep -n 'readRef(workspaceId, "main")' server/workspace/src/native-dispatch.ts
# → pass (no matches)
```

## Deviations

1. Worktree path created fresh via
   `git worktree add -b feat/iw9-f1-scoping-tests … origin/main` (as
   instructed). Subagent could not re-root the Cursor workspace; all edits
   used absolute worktree paths.
2. Rate-limit hygiene: suite sets `GATEWAY_RATE_LIMIT_RPS/BURST` and calls
   `resetRateLimiters()` in `beforeEach`, matching other high-call-count
   suites. Without this, cumulative `/tools` calls hit the default burst (20)
   and return 429 mid-suite. Not a product deviation — test harness only.
3. Diff/show scenarios are grouped into two tests (hash-bearing shapes;
   prefix filter vs full diff) rather than one `it` per scenario bullet, to
   keep tool-call count down. Every acceptance assertion is still present.
4. Discovery asserted via `GET /tools` (the public surface of
   `nativeVcsDiscoveryEntries`) rather than importing the private function —
   same schemas, no Touches expansion.

## Notes for `iw9-a-vcs-consolidation`

- This suite is the F1 acceptance gate; Wave A consumers can treat
  `prefix`/`ref` on commit/log/diff and hash-bearing diff wire as locked.
- Unknown ref on `vcs.log` is empty history (`{ commits: [] }`), not 404 —
  do not "fix" that in Wave A.
- Fresh `app/<id>` refs still start as root commits (`parents: []`); seeding
  from `main` remains Wave A's job.
- `branches` returns `{ branches: [...] }` (not `{ refs: [...] }`). F6 still
  owns repairing the legacy `vcs.test.ts` expectation drift.
- Snapshot identity for empty prefix remains byte-identical to the
  pre-change algorithm; scoped ids append a final `prefix <prefix>` line.
