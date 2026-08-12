# Tasks — iw9-doc-markdown

**External dependencies (do not start gated streams before these land):**

- **iw9-f5-broker-spec** MUST land first for stream 3 (and anything that
  registers the `doc` realtime namespace) — this change consumes the async
  `NamespaceHandler.onSubscribe(): Promise<{body?}>` contract (tech-plan D1);
  today's `broker.ts:24` is synchronous and cannot support a doc join's
  durable-state load. Streams 1, 2, 4, 5, 6 (client editor build-out) are
  not F5-gated and can start immediately.
- **iw9-a-vcs-consolidation** MUST land before stream 8 — the conflict
  banner wires directly into iw9-a's `MergeDialog`/`DiffViewer` and the
  target per-file `sessions.resolve` shape (tech-plan Context); this change
  builds no conflict-resolution UI of its own.
- **iw9-b-app-model** and **iw9-f4-app-identity** MUST land before stream 9
  — `app.yaml` reconcile, install-as-copy, and managed-only host mode are
  iw9-b/iw9-f4 surfaces this change only consumes.
- **iw9-d-agent-loop-server** MUST land before stream 10 (`agents.run`
  rendering, `RunEvent` stream) — and specifically **iw9-d stream 10**, the
  assigned owner of the **CF-5 finding** (tech-plan "Findings"): today
  `agents/service.ts:642-660` unconditionally 403s any `ctx.appScope` call
  to `agents.create`/`update`/`run`, so app-shipped profiles (D15) have no
  declaration/registration surface yet. iw9-d stream 10 adds the `app.yaml`
  `agents:` grammar, manifest-derived resolution, and the narrowed gate.
  This is the same blocker `iw9-chat-flagship`'s stream 5
  (`chat/summarize`) is gated on — raise
  against iw9-b/iw9-d before starting stream 10, do not build a local
  workaround (tech-plan Findings: "Interim: none").
- **iw9-chat-flagship** stream 9 (Playwright harness bootstrap) MUST land
  before stream 11 — this change reuses its `client/web/e2e/fixtures/two-users.ts`
  two-browser-context fixture rather than re-bootstrapping Playwright.
- Cross-repo note: all work is in the **aprovan** repo (brief's table: "Doc
  — app code + client + `packages/editor`"); no registry-side work, no
  publishes.

## 1. Dependencies: yjs, y-protocols, y-codemirror.next

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/editor/package.json, aprovan/pnpm-lock.yaml | Verify: cd aprovan && pnpm install --frozen-lockfile && pnpm --filter @aprovan/editor typecheck

- [ ] 1.1 Add `yjs`, `y-protocols`, and `y-codemirror.next` to
      `packages/editor/package.json` `dependencies` (tech-plan Context:
      verified absent from both repos today; `@codemirror/state@^6.7.1` and
      `@codemirror/view@^6.43.6` are already present and satisfy
      `y-codemirror.next`'s CM6 peer requirement — confirm the installed
      versions resolve without a peer-dep warning).
- [ ] 1.2 Run `pnpm install` at the repo root to regenerate
      `pnpm-lock.yaml`; commit the lockfile diff. Verify command re-installs
      with `--frozen-lockfile` (fails if the lockfile and manifest disagree)
      and typechecks `packages/editor` with the new imports available
      (no code uses them yet — this task only proves resolution).

## 2. Server: live-doc registry + durable persistence

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/doc/registry.ts, aprovan/server/workspace/src/doc/persistence.ts, aprovan/server/workspace/tests/doc-registry.test.ts, aprovan/server/workspace/tests/doc-persistence.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/doc-registry.test.ts tests/doc-persistence.test.ts && pnpm --filter @aprovan/workspace typecheck

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

## 3. Server: `doc` realtime namespace (F5-gated)

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/realtime/protocol.ts, aprovan/server/workspace/src/doc/doc-namespace.ts, aprovan/server/workspace/src/realtime/socket.ts, aprovan/server/workspace/tests/doc-namespace.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/doc-namespace.test.ts realtime-broker.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 3.1 (F5-gated) Remove `"doc"` from `RESERVED_NAMESPACES`
      (`protocol.ts:15,24-27`) — the reservation comment names exactly this
      change as its consumer.
- [ ] 3.2 `doc/doc-namespace.ts`: `createDocHandler(broker)` returning a
      `NamespaceHandler` modeled on `presence.ts:69-195`'s shape —
      `onSubscribe` (async: `getOrLoadDoc`, reply with a `DocSyncFrame` per
      tech-plan "Interfaces & Data", then a second `event` frame carrying
      the current awareness snapshot), `onPublish` (parse `DocSyncFrame` /
      `DocAwarenessFrame`, apply via `syncProtocol.readSyncMessage` /
      `awarenessProtocol.applyAwarenessUpdate`, re-broadcast to other
      subscribers via `broker.publishToTopic`), `onDisconnect`
      (`awarenessProtocol.removeAwarenessStates` for the conn's clientID,
      broadcast the removal, decrement `LiveDoc.participants`, schedule
      release when it hits zero per D2's ordered teardown).
- [ ] 3.3 Register the handler in `attachRealtime`
      (`socket.ts:154-157`, beside `createPresenceHandler`).
- [ ] 3.4 Tests: two connections joining the same `(workspaceId, path)`
      converge to one `LiveDoc` (spec document-collab "Concurrent joiners
      share one doc"); reconnect syncs against live state, not a fresh file
      read (spec "Doc identity survives reconnect"); awareness join/update/
      leave deltas match the "Two users see each other's cursors" /
      "Departure clears presence" scenarios; last-leave releases the doc and
      a subsequent join reconstructs identical content (spec "Last leave
      releases the doc") — assert `hasLiveDoc` is false in between.

## 4. Server: join authorization and quiesce materialization

> Depends-on: 2, 3 | Repo: aprovan | Touches: aprovan/server/workspace/src/doc/doc-namespace.ts, aprovan/server/workspace/src/doc/quiesce.ts, aprovan/server/workspace/tests/doc-quiesce.test.ts, aprovan/server/workspace/tests/doc-namespace.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/doc-quiesce.test.ts tests/doc-namespace.test.ts

- [ ] 4.1 `onSubscribe` re-checks tenant-scoped file access
      (`assertPathGranted`/`assertPartitionAccess`, same functions
      `services.ts:574-579` uses for `vfs.read`) before returning the sync
      frame — join is refused for a caller without current read access,
      independent of any previously known topic (spec "Access revocation is
      honored at join"); anonymous connections are refused unconditionally
      at the same check (spec "Anonymous link recipient cannot join" —
      `Conn.userId` absent/anonymous never reaches `onSubscribe`, refused at
      the socket-auth layer per existing `attachRealtime` behavior).
- [ ] 4.2 `doc/quiesce.ts`: per-`LiveDoc` idle timer (`DOC_QUIESCE_IDLE_MS`,
      5s default, reset on every applied update) and a hard max-interval
      timer (`DOC_QUIESCE_MAX_INTERVAL_MS`, 30s default, independent of the
      idle timer) — both call `materialize()` (tech-plan D5: plain
      `getFsStore().write`, no session, no commit).
- [ ] 4.3 `releaseDoc` (registry.ts, wired from 3.2's zero-participant path)
      calls `materialize()` then `persistence.appendUpdate`/snapshot flush
      before dropping the `LiveDoc` from the map, satisfying "Last leave
      releases the doc" together with 3.4.
- [ ] 4.4 Tests: idle quiesce writes the file (spec "Idle quiesce writes the
      file" — fake timers); continuous edits still bound staleness within
      the max interval (spec "Continuous typing still bounds staleness");
      `vfs.read` mid-session returns plain Markdown, never CRDT bytes (spec
      document-materialization "Agent reads mid-session" — read the raw FS
      content and assert it round-trips as plain UTF-8 text with no binary
      markers).

## 5. Server: agent-write reconciliation and conflict escalation

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/doc/reconcile.ts, aprovan/server/workspace/src/services.ts, aprovan/server/workspace/src/routes/fs.ts, aprovan/server/workspace/tests/doc-reconcile.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/doc-reconcile.test.ts tests/vfs.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 5.1 `doc/reconcile.ts`: `reconcileOrPassThrough` per tech-plan
      "Interfaces & Data" — `{kind: "not-live"}` when `hasLiveDoc` is false
      (no behavior change, spec "Write to a doc without a live session is
      ordinary"); otherwise derive SEARCH/REPLACE blocks between `base` and
      `content` (reusing `packages/editor/src/lib/diff.ts`'s block shape —
      verified exports `parseDiffs`/`applyDiffs`, `diff.ts:220,321`), apply
      matched blocks to the live `Y.Text` in one `Y.Doc.transact(fn, origin)`
      call with `origin` carrying the writing principal (spec
      document-agent-reconciliation "Audit names the agent").
- [ ] 5.2 Conflict path (tech-plan D3): unmatched blocks → resolve a staged
      session (caller-supplied `explicitSessionId` if present and staged,
      else `createSession(ws, actor.userId, {mode: "staged"})`), stage the
      failed content via `sessionWrite` (`chat-sessions.ts:335-353`), return
      `{kind: "conflict", sessionId, ...}` — never a partial guess for
      failed blocks (spec "Unresolvable conflict flips the session to a
      draft"); if the resolved session was `auto`, flip it via
      `updateSession(ws, id, {mode: "staged"})`
      (`chat-sessions.ts:158-182`).
- [ ] 5.3 Wire `reconcileOrPassThrough` into `services.ts`'s `vfs` write
      case (`services.ts:607-627`, before the existing `staged`/`store.write`
      branch — tech-plan D7) and `routes/fs.ts`'s `PUT` handler
      (`routes/fs.ts:261-288`, same position); both fall through to today's
      exact code when the result is `{kind: "not-live"}` (regression guard:
      existing `tests/vfs.test.ts` must stay green unmodified).
- [ ] 5.4 Standard access checks apply before reconciliation runs — no
      widened authority (spec "Reconciled transactions are attributed":
      "reconciliation never widens authority", invariant 2); reuse the same
      grant/partition checks already present at both call sites.
- [ ] 5.5 Tests: agent edit merges with concurrent typing (spec "Agent edit
      merges with concurrent typing" — apply a matched block via reconcile
      while a separate `Y.Doc.transact` simulates concurrent human typing
      elsewhere in the text; assert both survive); conflict produces a
      draft not a clobber (spec "Conflict produces a draft, not a clobber" —
      a SEARCH block over content rewritten beyond fuzzy tolerance leaves
      the live doc untouched for that region and lands in the draft
      session's overlay); audit row names the agent profile/app (spec
      "Audit names the agent").

## 6. Client: CollabMarkdownEditor (CM6 + y-codemirror.next)

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/packages/editor/src/components/CollabMarkdownEditor.tsx, aprovan/packages/editor/src/lib/yjs-cm6.ts, aprovan/packages/editor/src/index.ts, aprovan/packages/editor/src/__tests__/collab-markdown-editor.test.ts | Verify: pnpm --filter @aprovan/editor test && pnpm --filter @aprovan/editor typecheck

- [ ] 6.1 `CollabMarkdownEditor.tsx`: new CM6 host modeled on
      `packages/editor/src/ts/index.tsx`'s pattern (`basicSetup`/
      `EditorView` from `"codemirror"`, `EditorState`/`Compartment` from
      `"@codemirror/state"`, `ts/index.tsx:9,24-25`) — NOT a modification of
      `MarkdownEditor.tsx` (TipTap) or `CodeBlockView.tsx` (Shiki, read-only)
      per tech-plan Context. Props: `{ doc: Y.Doc, awareness: Awareness,
      userInfo: {name, color}, initialContent: string, readOnly?: boolean }`.
- [ ] 6.2 Bind `y-codemirror.next`'s `yCollab` extension to
      `doc.getText("content")` + `awareness`; local edits flow through CM6's
      normal transaction path (no manual diffing on the client, tech-plan
      "Client" interface note).
- [ ] 6.3 `readOnly` mode renders `MarkdownPreview.tsx` instead of mounting
      CM6 at all (ux.md "Read-only share view" — used for the anonymous
      link-share flow, no live doc object is ever constructed for it).
- [ ] 6.4 Tests: two independent `Y.Doc` instances wired through a
      loopback (no network) converge after applying each other's
      `Y.encodeStateAsUpdate` — proves the binding round-trips text through
      CM6 correctly (unit-level substitute for a full E2E; the two-browser
      case is stream 11).

## 7. Client: realtime doc store + presence UI

> Depends-on: 1, 3, 6 | Repo: aprovan | Touches: aprovan/client/web/src/features/document/store.ts, aprovan/client/web/src/features/document/useDocumentSession.ts, aprovan/client/web/src/features/document/DocPresenceCluster.tsx, aprovan/client/web/src/features/document/index.ts, aprovan/client/web/src/features/tabs/**, aprovan/client/web/src/features/document/__tests__/store.test.ts | Verify: pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 7.1 `features/document/store.ts`: WS client modeled on
      `features/presence/store.ts` — subscribe `doc:<path>`, decode
      `DocSyncFrame`/`DocAwarenessFrame` (base64 ↔ Yjs binary, tech-plan D1),
      apply to a local `Y.Doc`/`Awareness`, publish local update/awareness
      changes back over the same connection.
- [ ] 7.2 `useDocumentSession.ts`: hook wiring `store.ts` to
      `CollabMarkdownEditor` (stream 6) for a given path — reconnect state
      exposed for the UI (ux.md "reconnecting…" indicator).
- [ ] 7.3 `DocPresenceCluster.tsx`: avatar cluster modeled visually on
      `features/presence/PresenceAvatars.tsx` (shadcn `Avatar`, `Tooltip`)
      but sourced from doc awareness state, not the file-presence roster;
      empty state hides the cluster entirely (ux.md "Presence cluster").
- [ ] 7.4 Wire `.md` file tabs (`features/tabs`) to open
      `CollabMarkdownEditor` instead of the plain file editor for any
      workspace `.md` path (PRD Open Question 1 resolution; existing
      non-`.md` file types unchanged).
- [ ] 7.5 Tests: store applies an incoming sync frame and updates the local
      `Y.Doc`; awareness join/leave deltas update the exposed peer list;
      reconnect-after-drop resyncs without replaying individual missed
      events (spec "Client recovers by resync" — mock the WS reconnect and
      assert only a fresh subscribe/sync round-trip occurs).

## 8. Client: conflict banner into iw9-a's merge surface

> Depends-on: 5, 7 | Repo: aprovan | Touches: aprovan/client/web/src/features/document/DraftBanner.tsx, aprovan/client/web/src/features/document/useDocumentSession.ts | Verify: pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 8.1 `DraftBanner.tsx`: persistent banner shown when the document's
      session is `staged` (poll or push via `sessions.get`/existing
      notification surface), "Review" opens iw9-a's `MergeDialog` with the
      live doc text and the draft session's staged content as the two sides
      (ux.md "An agent edit conflicts — resolve the draft").
- [ ] 8.2 Wire `MergeDialog`'s resolution (iw9-a's `sessions.resolve`) to
      apply the chosen content to the live doc as one transaction (so
      remote participants see it as a normal live edit) and trigger
      `forceMaterializeAndCommit` (tech-plan "Interfaces & Data") for the
      attributable commit (spec "Manual save resolves the draft").
- [ ] 8.3 Discard path calls the existing discard-session flow and clears
      the banner without touching the live doc (spec "Discarding the draft
      SHALL restore `auto`").
- [ ] 8.4 Tests: banner appears/disappears with session mode transitions;
      resolve path calls the expected `sessions.resolve` shape with the two
      versions; discard clears the banner without a doc mutation.

## 9. App: Document app manifest and install surface

> Depends-on: - | Repo: aprovan | Touches: aprovan/Apps/document/app.yaml, aprovan/client/web/src/features/document/DocumentAppTile.tsx | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/app-directory.test.ts --grep document && pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 9.1 (iw9-f4/iw9-b-gated) `Apps/document/app.yaml` per tech-plan
      "Interfaces & Data" App manifest block: `title`, `description`,
      `icon`, `capabilities: ["vfs.*", "sessions.*", "agents.run"]`,
      `hostModes: ["managed"]` — single mode so iw9-b's install flow skips
      the hosting prompt (spec document-app "Install skips the hosting
      prompt"; D2).
- [ ] 9.2 Confirm reconcile (iw9-f4's `reconcileApp`) accepts the manifest
      with no hand-written `appId` (spec "Manifest validates") — this task
      is verification against the landed iw9-f4 surface, not new reconcile
      code.
- [ ] 9.3 Document's app tile uses the manifest's declared icon or the D6
      fallback via the shared `packages/ui/src/apps/app-icon.ts` (iw9-f4) —
      no Document-specific icon rendering code.
- [ ] 9.4 Sharing: confirm a file under `Apps/document/`'s root link-shares
      and person-shares through iw9-b's existing `vfs.share`/
      `GET /share/<key>` surface with zero Document-specific code (spec
      "Share management is platform-native") — verification task, add a
      Document-scoped case to iw9-b's existing share test suite rather than
      duplicating share tests here.

## 10. App: `doc/fix-typos` bundled agent profile (gated on iw9-d stream 10 / CF-5)

> Depends-on: 5, 9 | Repo: aprovan | Touches: aprovan/Apps/document/**, aprovan/server/workspace/tests/doc-fix-typos.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/doc-fix-typos.test.ts

- [ ] 10.0 **Do not start until `iw9-d-agent-loop-server` stream 10
      ("App-scoped agent profiles (CF-5)") has landed** — that stream is the
      assigned owner of the CF-5 finding (`IW-9-EXECUTION-OVERVIEW.md`
      finding 1) and covers declaration, resolution, and execution together.
      Verify `agents/service.ts`'s `ctx.appScope` block no longer 403s a
      manifest-declared profile, and that `app.yaml` accepts the `agents:`
      block, before writing any code in this stream (mirrors
      `iw9-chat-flagship`'s identical stream-5 gate on the same finding; the
      contract is D's `specs/app-scoped-agent-profiles/spec.md`).
- [ ] 10.1 Declare `doc/fix-typos` in `Apps/document/app.yaml`'s `agents:`
      block per iw9-d task 10.1's grammar — grants: `vfs.read`/
      `vfs.write` scoped to the invoker's accessible paths, no wider ceiling
      (spec document-app "Profile runs within app grants"; invariant 2).
- [ ] 10.2 Prompt: read the target document via `vfs.read`, propose a
      typo-corrected version, write back via `vfs.write` — exercising
      stream 5's reconciliation path end to end when the target is a live
      document (spec "Profile runs within app grants": "its `vfs.write`
      lands through reconciliation without clobbering concurrent human
      edits").
- [ ] 10.3 Tests: run against a live document with a concurrent human edit
      elsewhere in the file — both survive (integration-level repeat of
      5.5's unit case, this time through the real `agents.run` path);
      run against a document with no live session — ordinary `vfs.write`,
      no reconciliation invoked (spec "Write to a doc without a live
      session is ordinary").

## 11. E2E: two-user cursors, agent merge, conflict-to-draft (Playwright)

> Depends-on: 6, 7, 8 | Repo: aprovan | Touches: aprovan/client/web/e2e/doc-live-cursors.spec.ts, aprovan/client/web/e2e/doc-agent-merge.spec.ts, aprovan/client/web/e2e/doc-conflict-draft.spec.ts | Verify: pnpm --filter @aprovan/patchwork-web exec playwright test e2e/doc-live-cursors.spec.ts e2e/doc-agent-merge.spec.ts e2e/doc-conflict-draft.spec.ts --retries=0

- [ ] 11.1 (iw9-chat-flagship-gated) Reuse `e2e/fixtures/two-users.ts`
      (do not re-bootstrap Playwright — external dependency note above);
      `doc-live-cursors.spec.ts`: two browser contexts open the same
      document, user A types, user B sees the character appear without
      reload and sees A's named cursor move (PRD Goal 1 validation bar;
      spec document-collab "Two users see each other's cursors" +
      "Concurrent joiners share one doc").
- [ ] 11.2 `doc-agent-merge.spec.ts`: a user has the document open and
      typing in one region while a triggered `doc/fix-typos` run (or a
      direct `vfs.write` against the test fixture, if stream 10 hasn't
      landed yet — call out which in the test) edits another region; assert
      both edits are present and the user's session never shows a
      disconnect/clobber (PRD Goal 2 validation bar).
- [ ] 11.3 `doc-conflict-draft.spec.ts`: force a conflict (rewrite the exact
      region a queued agent write targets, beyond fuzzy tolerance, before
      the write lands), assert the draft banner appears, resolve through
      the `MergeDialog`, assert the resolution lands as one commit and the
      session returns to `auto` (PRD Goal 3 validation bar; spec "Manual
      save resolves the draft").
- [ ] 11.4 Raw WebSocket frame capture (reuse `e2e/fixtures/ws-capture.ts`
      from iw9-chat-flagship if landed, else `page.on("websocket")`
      directly) on the live-cursors spec: assert no anonymous connection
      ever appears in a `doc:<path>` topic's subscriber set (invariant 9
      spot-check at the E2E layer, complementing 4.1's unit coverage).

## 12. Integration verification: quiesce/read purity, compaction, anonymous share

> Depends-on: 4, 9 | Repo: aprovan | Touches: aprovan/server/workspace/tests/doc-integration.test.ts | Verify: pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/patchwork-web test

- [ ] 12.1 End-to-end integration test (real server, no mocks beyond
      timers): open a live session, edit, let it quiesce, `vfs.read` the
      path with no session-specific parameter and confirm plain Markdown,
      no CRDT bytes, staleness within `DOC_QUIESCE_MAX_INTERVAL_MS` (PRD
      Goal 4 validation bar; spec "Files stay the truth agents read").
- [ ] 12.2 Persisted-size test: drive a doc past `DOC_COMPACT_SIZE_BYTES`
      with synthetic updates, assert compaction ran and stored size is
      snapshot-plus-bounded-tail, not an unbounded log (PRD Goal 5
      validation bar; spec "Compaction bounds stored size and log age").
- [ ] 12.3 Anonymous link-share read against a live-session document: an
      anonymous `GET /share/<key>` (iw9-b's route) returns the materialized
      Markdown only, with no live updates, cursors, or participant info
      leaking through any Document-added code path (PRD Goal 7; spec
      "Anonymous reader sees materialized content only" — assert the
      response contains no doc-namespace or awareness references at all).
- [ ] 12.4 Full workspace suite (`pnpm --filter @aprovan/workspace test`)
      and client suite stay green; confirm no file outside
      `server/workspace/src/doc/`, `server/workspace/src/realtime/`
      (streams 3-4 only), `services.ts`/`routes/fs.ts` (stream 5's two
      hook sites), `packages/editor/src/components/CollabMarkdownEditor.tsx`
      + `packages/editor/src/lib/yjs-cm6.ts`, and
      `client/web/src/features/document/` changed outside this change's
      scope (`git diff --stat` scoped review).
