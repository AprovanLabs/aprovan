# Brief: Server — live-doc registry + durable persistence

**Depends-on: 1** | Repo: aprovan | Wave 1 (parallel with 6)

## Mission

When you are done, `server/workspace/src/doc/` has a process-local live-doc
registry (`getOrLoadDoc` / `releaseDoc` / `hasLiveDoc`) and durable
snapshot+update-log persistence with required compaction — no realtime
handler yet. This is the in-memory + durable substrate streams 3–5 call.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-doc-markdown/prd.md`
4. `openspec/changes/iw9-doc-markdown/tech-plan.md` — D2, D4, D6; Interfaces
   (`LiveDoc`, `loadDurable`, `appendUpdate`, `compactIfDue`)
5. `openspec/changes/iw9-doc-markdown/specs/document-persistence/spec.md`
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 2
7. `server/workspace/src/svc-records.ts` — `svcScope` / `writeSvcRecord` /
   `readSvcRecord` / `listSvcRecords` / `seqKey`
8. `packages/editor` after stream 1 — `yjs` available for imports

## Tasks

- [ ] 2.1 `doc/registry.ts`: `docKey(workspaceId, path)`, `LiveDoc` type,
      `getOrLoadDoc`/`releaseDoc`/`hasLiveDoc` per tech-plan "Interfaces &
      Data" — private module-level `Map`, not layered on iw9-f5's
      `NamespaceStore` (tech-plan D2). `getOrLoadDoc` on a cache miss calls
      `persistence.loadDurable`.
- [ ] 2.2 `doc/persistence.ts`: `svc#doc#snapshot` / `svc#doc#updates#<docKey>`
      scopes via `svc-records.ts`'s `svcScope`/`writeSvcRecord`/
      `readSvcRecord`/`listSvcRecords`/`seqKey` (tech-plan D4); `loadDurable`
      (snapshot then replay log in seq order → fresh `Y.Doc` if none exists,
      per `document-persistence` "First open of an existing file" —
      initialize from current file content via `getFsStore().read`);
      `appendUpdate` (one svc-record per update, batched if the caller
      passes multiple).
- [ ] 2.3 Compaction (`compactIfDue`, tech-plan D6): `DOC_COMPACT_SIZE_BYTES`
      (256 KiB) / `DOC_COMPACT_AGE_MS` (24h) constants, both overridable for
      tests; write new snapshot + delete covered log entries atomically
      w.r.t. readers (spec document-persistence "Compaction bounds stored
      size and log age" — both size- and age-triggered scenarios).
- [ ] 2.4 Tests: restart-reconstructs-doc (snapshot+log replay reproduces
      content, spec "Restart reconstructs the doc"); compaction shrinks log
      and preserves content identity before/after (spec "Long-lived doc
      stays bounded"); age-triggered compaction with size threshold never
      reached (spec "Idle doc compacts by age"); `vcs.restore` changing file
      content while no live session is active is reflected on next load
      (spec "Restore wins over stale doc state" — `loadDurable` must compare
      the current file hash against what the durable state was initialized
      from and re-initialize on mismatch).

## Acceptance criteria

From `specs/document-persistence/spec.md`:

#### Scenario: Restart reconstructs the doc

- **WHEN** the server restarts while a document has durable snapshot and
  log entries
- **THEN** the next session load reproduces the pre-restart doc content,
  and reconnecting clients converge to it via sync

#### Scenario: Long-lived doc stays bounded

- **WHEN** a document accumulates edits past the size threshold
- **THEN** compaction runs, the update log shrinks to entries newer than
  the new snapshot, and reconstructed content is identical before and
  after compaction

#### Scenario: Idle doc compacts by age

- **WHEN** a doc's oldest un-compacted update exceeds the age threshold
- **THEN** the next compaction pass snapshots and prunes it even though the
  size threshold was never reached

#### Scenario: First open of an existing file

- **WHEN** a user opens a Markdown file that predates the Document app and
  has no CRDT state
- **THEN** a fresh doc initializes from the file content and collaboration
  proceeds; the file content is unchanged by the initialization

#### Scenario: Restore wins over stale doc state

- **WHEN** `vcs.restore` changes a document's file content while no live
  session is active
- **THEN** the next session load reflects the restored file content, not
  the pre-restore CRDT state

## Verify

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/doc-registry.test.ts tests/doc-persistence.test.ts && pnpm --filter @aprovan/workspace typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `server/workspace/src/doc/registry.ts`, `server/workspace/src/doc/persistence.ts`, `server/workspace/tests/doc-registry.test.ts`, `server/workspace/tests/doc-persistence.test.ts`
- Do **not** layer on `broker.storeFor()` / `NamespaceStore` (D2).
- Do not register a realtime namespace (stream 3).

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/02-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (esp. `docKey` / `hasLiveDoc` export paths for streams 3 and 5).
