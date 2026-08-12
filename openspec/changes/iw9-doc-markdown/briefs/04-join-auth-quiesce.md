# Brief: Server — join authorization and quiesce materialization

**Depends-on: 2, 3** | Repo: aprovan | Wave 3 (parallel with 7, 10)

## Mission

When you are done, `doc` joins re-check tenant-scoped file access (and refuse
anonymous), and each live doc materializes plain Markdown to the VFS on idle
quiesce, max-interval, and last-leave release. Agents reading mid-session
get UTF-8 Markdown, never CRDT bytes.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 7, 8, 9
3. `openspec/changes/iw9-doc-markdown/tech-plan.md` — D5; Interfaces
   (`materialize`, `DOC_QUIESCE_*`)
4. `openspec/changes/iw9-doc-markdown/specs/document-materialization/spec.md`
5. `openspec/changes/iw9-doc-markdown/specs/document-collab/spec.md` —
   join/auth scenarios
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 4
7. `server/workspace/src/services.ts` — `assertPathGranted` /
   `assertPartitionAccess` (`:574-579`)
8. Stream 3's `doc-namespace.ts` + stream 2's `registry.ts`

## Tasks

- [x] 4.1 `onSubscribe` re-checks tenant-scoped file access
      (`assertPathGranted`/`assertPartitionAccess`, same functions
      `services.ts:574-579` uses for `vfs.read`) before returning the sync
      frame — join is refused for a caller without current read access,
      independent of any previously known topic (spec "Access revocation is
      honored at join"); anonymous connections are refused unconditionally
      at the same check (spec "Anonymous link recipient cannot join" —
      `Conn.userId` absent/anonymous never reaches `onSubscribe`, refused at
      the socket-auth layer per existing `attachRealtime` behavior).
- [x] 4.2 `doc/quiesce.ts`: per-`LiveDoc` idle timer (`DOC_QUIESCE_IDLE_MS`,
      5s default, reset on every applied update) and a hard max-interval
      timer (`DOC_QUIESCE_MAX_INTERVAL_MS`, 30s default, independent of the
      idle timer) — both call `materialize()` (tech-plan D5: plain
      `getFsStore().write`, no session, no commit).
- [x] 4.3 `releaseDoc` (registry.ts, wired from 3.2's zero-participant path)
      calls `materialize()` then `persistence.appendUpdate`/snapshot flush
      before dropping the `LiveDoc` from the map, satisfying "Last leave
      releases the doc" together with 3.4.
- [x] 4.4 Tests: idle quiesce writes the file (spec "Idle quiesce writes the
      file" — fake timers); continuous edits still bound staleness within
      the max interval (spec "Continuous typing still bounds staleness");
      `vfs.read` mid-session returns plain Markdown, never CRDT bytes (spec
      document-materialization "Agent reads mid-session" — read the raw FS
      content and assert it round-trips as plain UTF-8 text with no binary
      markers).

## Acceptance criteria

From `specs/document-collab/spec.md`:

#### Scenario: Anonymous link recipient cannot join

- **WHEN** an anonymous holder of a valid link-share key attempts to open
  the live collaborative session for the shared document
- **THEN** the join is refused; the holder can only read the materialized
  `.md` via the share's file read path

#### Scenario: Access revocation is honored at join

- **WHEN** a user whose access to the document's path has been removed
  attempts to join (or rejoin) the session
- **THEN** the join is refused by the tenant-scoped access check regardless
  of any previously known topic or doc id

From `specs/document-materialization/spec.md`:

#### Scenario: Idle quiesce writes the file

- **WHEN** a live doc receives edits and then no edits for the idle
  threshold
- **THEN** the `.md` at the document's path contains the current doc text,
  readable as plain Markdown

#### Scenario: Continuous typing still bounds staleness

- **WHEN** participants edit continuously for longer than the maximum
  interval
- **THEN** at least one materialization has occurred within that interval —
  the file on disk is never older than the maximum interval while the
  session lives

#### Scenario: Agent reads mid-session

- **WHEN** an agent calls `vfs.read` on a document that has a live session
- **THEN** it receives plain Markdown no older than the quiesce staleness
  bound, with no session-specific call or parameter required

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-quiesce.test.ts tests/doc-namespace.test.ts
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `server/workspace/src/doc/doc-namespace.ts`, `server/workspace/src/doc/quiesce.ts`, `server/workspace/tests/doc-quiesce.test.ts`, `server/workspace/tests/doc-namespace.test.ts`
- Note: `releaseDoc` lives in `registry.ts` (stream 2 Touches). If you must
  edit `registry.ts` to call `materialize` on release, record it in
  `briefs/deviations.md` and keep the change minimal — do not expand scope.
- Quiesce writes: no session, no VCS commit (D5).

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/04-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know.
