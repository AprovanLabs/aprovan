# Brief: Integration verification + doc touch-up (stream 7)

**Depends-on: streams 3, 5, 6 (all merged on main).** Final A wave.

## Mission

Prove the consolidated VCS surface end-to-end: app-scoped commit → release
tag → live serve → restore → history lineage, plus staged/auto session
round-trips through `sessions.resolve`. Sweep both repos for deleted symbols
and leave F6's doc convention alone when the stale registry doc remains.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` — stream 7
3. `openspec/changes/iw9-a-vcs-consolidation/tech-plan.md` / specs as needed
4. Stream 3 on main: `apps/release-tags.ts` (`cutRelease`, `resolveReleaseTag`)
5. Stream 5: History panel + six verbs
6. Stream 6: MergeDialog + `sessions.resolve` (bulk strategy; mixed/AI overlay
   may be client-prepped — do not re-litigate; test the wire that exists)
7. Carryovers: `recordSessionTouch` may still be unwired in `routes/fs.ts`
   (outside this Touches) — do not expand scope to wire it; note if tests
   need the touch set and skip/adjust accordingly

## Tasks

Copy 7.1–7.3 from `tasks.md` verbatim:

- [ ] 7.1 End-to-end integration test: create app → edit → app-scoped
      commit → cut release (tag) → serve pinned via live-apps → restore →
      history shows both, `main` untouched.
- [ ] 7.2 Session round-trip test: staged session with conflict → resolve
      via `sessions.resolve` wire → two-parent merge commit → history
      lineage; auto session → summary → one-click restore.
- [ ] 7.3 Final grep gates across BOTH repos (aprovan + registry) for every
      deleted symbol (`apps/releases`, `listEntryVersions`,
      `readEntryVersion`, `restoreEntryVersion`, `apps.versions` tool
      names); if `registry/docs/vcs-and-sessions.md` still describes the
      per-file/release surface and F6 has not yet stamped it, add the
      DEPRECATED pointer per F6's convention rather than rewriting (F6 owns
      the doc).

## Acceptance criteria

Streams 1–6 behaviors compose without resurrecting deleted version/release
APIs. Grep gates clean in both repos (DEPRECATED pointer only for the F6-owned
doc if still stale).

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace && pnpm test
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web && pnpm typecheck && pnpm test
# Deleted-symbol gates (must exit ≠ 0 / no matches):
grep -rn "apps\.versions\|apps\.version\b\|apps\.restore" \
  /Users/jacob/Documents/Code/AprovanLabs/aprovan/server \
  /Users/jacob/Documents/Code/AprovanLabs/aprovan/client \
  /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages \
  /Users/jacob/Documents/Code/AprovanLabs/registry \
  --include='*.ts' --include='*.tsx' | grep -v node_modules | grep -v openspec
test $? -ne 0
# Plus the stream-3 deletion greps from tasks.md Verify line.
```

Baseline rule: if full `server/workspace` suite has pre-existing failures on
main, capture the count first; pass = your new/updated integration coverage
green and no *additional* failures. State both numbers in the report.

## Constraints

- Touches ONLY: `aprovan/server/workspace/tests/app-integration.test.ts`,
  `aprovan/docs/**`, plus `openspec/changes/iw9-a-vcs-consolidation/tasks.md`
  and `briefs/07-report.md`. Registry doc DEPRECATED pointer only if required
  by 7.3 (`registry/docs/vcs-and-sessions.md`).
- Do not revive `releases.ts` / per-file version APIs.
- Do not wire `recordSessionTouch` in `fs.ts` here.
- Open a PR; write `briefs/07-report.md`.

## Report back

PR URL, verify numbers, deviations, anything Wave 2 (C/Chat) needs to know.
