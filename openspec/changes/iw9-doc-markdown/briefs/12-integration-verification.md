# Brief: Integration verification — quiesce/read purity, compaction, anonymous share

**Depends-on: 4, 9** | Repo: aprovan | Wave 4 (parallel with 8)

## Mission

When you are done, one integration test file proves: quiesce keeps
`vfs.read` as plain Markdown within max-interval staleness; compaction
bounds durable size; anonymous `GET /share/<key>` returns materialized
Markdown only with no doc-namespace/awareness leakage. Full workspace +
client suites stay green; scoped `git diff --stat` confirms no out-of-scope
files.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — Wave 3 exit gate
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariant 9
3. `openspec/changes/iw9-doc-markdown/prd.md` — Goals 4, 5, 7
4. `openspec/changes/iw9-doc-markdown/specs/document-materialization/spec.md`
5. `openspec/changes/iw9-doc-markdown/specs/document-persistence/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 12
7. Streams 2–4 server surfaces; iw9-b share route (unmodified)

## Tasks

- [x] 12.1 End-to-end integration test (real server, no mocks beyond
      timers): open a live session, edit, let it quiesce, `vfs.read` the
      path with no session-specific parameter and confirm plain Markdown,
      no CRDT bytes, staleness within `DOC_QUIESCE_MAX_INTERVAL_MS` (PRD
      Goal 4 validation bar; spec "Files stay the truth agents read").
- [x] 12.2 Persisted-size test: drive a doc past `DOC_COMPACT_SIZE_BYTES`
      with synthetic updates, assert compaction ran and stored size is
      snapshot-plus-bounded-tail, not an unbounded log (PRD Goal 5
      validation bar; spec "Compaction bounds stored size and log age").
- [x] 12.3 Anonymous link-share read against a live-session document: an
      anonymous `GET /share/<key>` (iw9-b's route) returns the materialized
      Markdown only, with no live updates, cursors, or participant info
      leaking through any Document-added code path (PRD Goal 7; spec
      "Anonymous reader sees materialized content only" — assert the
      response contains no doc-namespace or awareness references at all).
- [x] 12.4 Full workspace suite (`pnpm --filter @aprovan/workspace test`)
      and client suite stay green; confirm no file outside
      `server/workspace/src/doc/`, `server/workspace/src/realtime/`
      (streams 3-4 only), `services.ts`/`routes/fs.ts` (stream 5's two
      hook sites), `packages/editor/src/components/CollabMarkdownEditor.tsx`
      + `packages/editor/src/lib/yjs-cm6.ts`, and
      `client/web/src/features/document/` changed outside this change's
      scope (`git diff --stat` scoped review).

## Acceptance criteria

From `specs/document-materialization/spec.md`:

#### Scenario: Agent reads mid-session / Files stay the truth agents read

- **WHEN** an agent calls `vfs.read` on a document that has a live session
- **THEN** it receives plain Markdown no older than the quiesce staleness
  bound, with no session-specific call or parameter required

#### Scenario: Anonymous reader sees materialized content only

- **WHEN** an anonymous user opens a valid document share link during a live
  session
- **THEN** they receive the latest materialized Markdown (bounded-stale per
  quiesce), and no live updates, cursors, or participant information

From `specs/document-persistence/spec.md`:

#### Scenario: Long-lived doc stays bounded / Compaction bounds stored size and log age

- **WHEN** a document accumulates edits past the size threshold
- **THEN** compaction runs, the update log shrinks to entries newer than
  the new snapshot, and reconstructed content is identical before and
  after compaction

## Verify

```bash
pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/patchwork-web test
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `server/workspace/tests/doc-integration.test.ts`
- Do not add Document-specific anonymous share routes — consume iw9-b only.
- 12.4 is audit + suite green; fix out-of-scope drift by reverting, not by
  expanding Touches.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/12-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know. Include `git diff --stat` evidence for 12.4.
