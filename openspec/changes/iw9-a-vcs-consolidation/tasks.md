# Tasks — iw9-a-vcs-consolidation

**External dependencies (do not start gated streams before these land):**
- `iw9-f1-vcs-scoping-params` MUST be merged first — this change consumes
  `commitTree` `prefix?`/`ref?`, prefix-salted snapshot ids, un-hardcoded
  `main` + wired `listRefs`, scope args in `vcs.*` tool schemas, and hashes
  retained in `vcs.diff` wire output. Streams 1, 2, 3 are gated on it.
- `iw9-f6-cleanup-rename`'s test repair (22 failing `vfs/*`→`vcs/*` suites)
  MUST land before editing legacy VCS test files (streams 1–3 touch
  `tests/chat-sessions.test.ts` and vcs suites).
- **Sequencing we impose on siblings:** stream 2's `routes/tools.ts` schema
  changes land BEFORE iw9-c's grant-visibility work in that file; stream 3's
  release-as-tag interface is what iw9-b consumes for install-as-copy — B
  never edits release/version code (tech-plan Context).
- Cross-repo note: all edited code lives in the `aprovan` repo; the
  `registry` repo participates only in deletion grep gates and holds the
  stale doc (`registry/docs/vcs-and-sessions.md`) that F6 owns.

## 1. Server: app-scoped commits, tags, two-parent merges

> Repo: aprovan | Depends-on: - | Touches: aprovan/server/workspace/src/vcs/**, aprovan/server/workspace/src/native-dispatch.ts, aprovan/server/workspace/tests/vcs*.test.ts, aprovan/server/workspace/tests/chat-sessions.test.ts | Verify: cd aprovan/server/workspace && pnpm typecheck && pnpm vitest run tests/vcs.test.ts tests/vcs-interface.test.ts tests/vcs-mount-lineage.test.ts tests/chat-sessions.test.ts

- [x] 1.1 (F1-gated) Add app-scope mapping in `native-dispatch.ts`'s
      `vcsBackend`: a `scope: { app }` argument on all six verbs resolves to
      `prefix = <app root>`, `ref = app/<appId>`, threaded into F1's
      `commitTree`/`logCommits`/`listRefs` params (spec app-scoped-commits
      "Commits scope to an app root", "All six vcs verbs accept scope").
- [x] 1.2 Filter mount lineage/provenance to the commit's prefix in the
      scoped-commit path (`collectMountLineage` results filtered before
      `buildSnapshot`), workspace commits unchanged; test with one in-scope
      and one out-of-scope mount (scenario "Foreign mounts excluded").
- [x] 1.3 Add `writeTag`/`moveChannel` over the existing ref machinery in
      `vcs/store.ts` with names `tag/app/<appId>/<releaseId>` and
      `channel/app/<appId>/<channel>`; `listRefs` prefix-filters them
      (tech-plan D1, Interfaces).
- [x] 1.4 `commitTree` options gain `parents?: string[]` override (default
      remains `[head]`); `closeSession` in `vcs/chat-sessions.ts` passes
      `[mainHead, sessionHead]`, single parent when the session has no
      commits; first parent stays `mainHead` so first-parent log walks are
      unchanged (tech-plan D2; scenario "Two-parent merge commit").
- [x] 1.5 `changeSummary` branches on mode: staged → overlay walk (as
      today), auto → `diff(baseCommit, mainHead)` filtered to
      session-touched paths, with full-diff fallback + flag when the touched
      set is absent (tech-plan D4; scenarios under "Auto sessions answer
      'what changed?'"). Record touched paths on auto-session writes.
- [x] 1.6 Tests: scoped commit lands on `app/<id>` and leaves `main`
      untouched; identical subtrees in two scopes → distinct snapshot ids;
      scoped restore cannot write outside the app root; branches lists app
      refs; two-parent merge; auto changeSummary excludes a concurrent
      foreign edit.

## 2. Server: vcs.* tool schemas + wire surface (lands before iw9-c)

> Repo: aprovan | Depends-on: 1 | Touches: aprovan/server/workspace/src/routes/tools.ts, aprovan/server/workspace/src/platform-output-schemas.ts, aprovan/packages/native/src/dispatch.ts | Verify: cd aprovan/server/workspace && pnpm typecheck && pnpm vitest run tests/tools-discovery.test.ts && cd ../../packages/native && pnpm typecheck

- [x] 2.1 Extend `nativeVcsDiscoveryEntries` (routes/tools.ts) input/output
      schemas: `scope` argument on all six verbs, `parents` in commit
      output, tag/channel refs in `vcs.branches` output. THIS LANDS BEFORE
      IW9-C touches routes/tools.ts.
- [x] 2.2 Thread `scope` through `packages/native/src/dispatch.ts:66-92`'s
      vcs case (client-side native dispatch mirrors the server mapping).
- [x] 2.3 Verify (do not re-implement) F1's wire behaviors this change relies
      on: hashes present in `vcs.diff`/`vcs.show` responses; `vcs.branches`
      not hardcoding main. Add discovery-shape assertions to
      tests/tools-discovery.test.ts (or nearest discovery suite).

## 3. Server: release-as-tag layer + releases.ts deletion

> Repo: aprovan | Depends-on: 1 | Touches: aprovan/server/workspace/src/apps/releases.ts, aprovan/server/workspace/src/apps/release-tags.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/src/apps/install.ts, aprovan/server/workspace/src/apps/directory.ts, aprovan/server/workspace/src/routes/live-apps.ts, aprovan/server/workspace/src/notifications/service.ts, aprovan/server/workspace/tests/apps.test.ts, aprovan/server/workspace/tests/app-install.test.ts | Verify: cd aprovan/server/workspace && pnpm typecheck && pnpm vitest run tests/apps.test.ts tests/app-install.test.ts tests/app-directory.test.ts && grep -rn "listEntryVersions\|readEntryVersion\|restoreEntryVersion\|apps/releases" /Users/jacob/Documents/Code/AprovanLabs/aprovan/server /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages /Users/jacob/Documents/Code/AprovanLabs/aprovan/client /Users/jacob/Documents/Code/AprovanLabs/registry --include='*.ts' --include='*.tsx' | grep -v node_modules; test $? -ne 0

- [ ] 3.1 New `apps/release-tags.ts` implementing the tech-plan interface:
      `cutRelease` (commit app scope if dirty → write immutable tag → point
      channel), `resolveRelease`, `listReleases`; channel-name validation
      kept (`^[a-z][a-z0-9-]{0,31}$`). This is the interface iw9-b consumes
      for install-as-copy (spec app-release-tags).
- [ ] 3.2 Re-point consumers off `releases.ts`: `apps/install.ts`,
      `routes/live-apps.ts` (serve pinned content from the release commit's
      snapshot, replacing `readEntryVersion(entry, release.entryHash)` at
      :209), `apps/directory.ts`, `notifications/service.ts`,
      `platform-output-schemas.ts` release shapes.
- [ ] 3.3 One-time cut-over: re-tag every `svc#apps#releases#<appId>` record
      as an app-scoped commit + tag BEFORE dropping records; assert no
      install resolves to a dangling release (scenario "Old release ids do
      not silently dangle"). Tags written before records dropped (tech-plan
      Rollout 4).
- [ ] 3.4 Replace the `apps.release`/`apps.releases`/`apps.channel` tool
      operations in `apps/service.ts` with the tag-backed implementations;
      DELETE the `apps.versions`/`apps.version`/`apps.restore` operations
      and the per-file helpers at `apps/store.ts:422-452`.
- [ ] 3.5 DELETE `apps/releases.ts`. Grep gate (in Verify) must return
      nothing across BOTH repos (aprovan + registry), per MIGRATION-DEBT
      rule. Do this task last in the stream.

## 4. Client: diff stack (DiffViewer + ChangeList) — no F1 dependency, can start immediately

> Repo: aprovan | Depends-on: - | Touches: aprovan/packages/editor/package.json, aprovan/packages/editor/src/components/DiffViewer.tsx, aprovan/packages/editor/src/components/SaveAffordance.tsx, aprovan/client/web/src/components/ChangeList.tsx | Verify: cd aprovan/packages/editor && pnpm typecheck && pnpm test && cd ../../client/web && pnpm typecheck

- [x] 4.1 Add `@codemirror/merge` to `packages/editor` (NOT currently
      installed; CM6 stack verified present) and build `DiffViewer`:
      props per tech-plan Interfaces; split/unified modes; added/removed/
      binary/oversize/error-per-side states per ux.md "Diff view".
- [x] 4.2 Build shared `ChangeList` in `client/web/src/components/` with the
      new/edited/removed word-chip vocabulary (no `+/~/−` glyphs), tooltip,
      collapse-behind-"Show all N", host-provided `onOpen` (ux.md
      "ChangeList").
- [x] 4.3 Convert `SaveAffordance.tsx:301-307` to accept change rows via
      render prop/slot (packages/editor must not import client/web;
      tech-plan D5).

## 5. Client: history view, undo, all six verbs wired

> Repo: aprovan | Depends-on: 2, 4 | Touches: aprovan/client/web/src/components/panels/VcsPanel.tsx, aprovan/client/web/src/components/panels/HistoryPanel.tsx, aprovan/client/web/src/lib/vfs-commits.ts, aprovan/client/web/src/components/CommitMountedContent.tsx, aprovan/packages/registry-ui/src/apps/versions.tsx | Verify: cd aprovan/client/web && pnpm typecheck && pnpm test && for v in commit log show diff restore branches; do grep -rq "\"$v\"\|vcs\.$v" src --include='*.ts' --include='*.tsx' || exit 1; done && grep -rn "hash.slice\|shortToken" src/components/CommitMountedContent.tsx | grep -v node_modules; test $? -ne 0

- [ ] 5.1 Fix `lib/vfs-commits.ts` to return the `changes` payload it
      fetches and discards (:42-55), typed with per-path hashes for the diff
      viewer (scenario "Change data no longer discarded"; also listed as an
      F6 bug — coordinate: whoever lands first wins, the other rebases).
- [ ] 5.2 Build History view (workspace + app scope) per ux.md: timeline
      over `vcs.log`/`vcs.branches`, entry expand → ChangeList →
      DiffViewer via `vcs.show`/`vcs.diff` hashes; merge entries render
      chat-title lineage from two-parent commits (scenario "History renders
      true lineage").
- [ ] 5.3 One-click "Restore this version" via `vcs.restore` with the
      non-destructive confirmation copy from ux.md; workspace and app
      scopes; toast + new timeline entry.
- [ ] 5.4 Add `vcs.commit` caller: manual "Save a version now" action in the
      History view header (scoped), completing six-of-six verb coverage
      (scenario "No orphan verbs"; Verify greps all six).
- [ ] 5.5 Retitle/rename `VcsPanel` → "Code host" for its provider-config
      role; user-facing history moves to the History view. Kill hash
      renderings: `CommitMountedContent.tsx:58` short token → time-based
      label ("version from <when>"); `packages/registry-ui/src/apps/versions.tsx`
      is deleted with stream 3's surface (its `hash.slice(0, 10)` at :148
      goes with it) — confirm no import remains.

## 6. Client: sessions answerable + MergeDialog on sessions.resolve

> Repo: aprovan | Depends-on: 1, 4 | Touches: aprovan/client/web/src/components/MergeDialog.tsx, aprovan/client/web/src/components/SessionBar.tsx, aprovan/client/web/src/features/chat/ChatDock.tsx, aprovan/client/web/src/components/panels/SessionsPanel.tsx, aprovan/client/web/src/components/panels/SandboxesPanel.tsx | Verify: cd aprovan/client/web && pnpm typecheck && pnpm test && grep -rn "GitBranch\|uncommitted\|[Ss]taged" src/components/panels/SessionsPanel.tsx src/components/panels/SandboxesPanel.tsx | grep -v node_modules; test $? -ne 0

- [x] 6.1 Rewire `MergeDialog.tsx:220-282`: per-conflict embedded
      DiffViewer ("Workspace version" vs "This draft's version"), choices
      submitted through `sessions.resolve` (server applies atomically,
      `vcs/sessions-service.ts:175`), stale-conflict refresh banner, per-row
      AI states (spec session-answerability "Merge conflicts resolved with
      eyes open"; ux.md flow).
- [x] 6.2 Replace the five change-list renderings (`SessionBar.tsx:151-158`,
      `ChatDock.tsx:216-222`, `SaveAffordance.tsx:301-307` via stream 4's
      render prop, `SessionsPanel.tsx:119-148`,
      `SandboxesPanel.tsx:201-217`) with the shared ChangeList; delete the
      local row-mapping logic in each (scenario "Single implementation").
- [x] 6.3 Show the change strip on auto chats in SessionBar/ChatDock (was
      draft-only) fed by the now-populated `changeSummary`, plus the "Undo
      these changes" action calling `vcs.restore` for the listed paths
      (scenario "Auto session undo"; ux.md flow).
- [x] 6.4 Vocabulary sweep per ux.md table: SessionsPanel drops `GitBranch`
      (History/Clock icon), "staged" copy, and Open/Merged/Closed tabs →
      Active/Applied/Archived; SandboxesPanel "uncommitted" → "unsaved
      changes". Verify greps gate the jargon.

## 7. Integration verification + doc touch-up

> Repo: aprovan | Depends-on: 3, 5, 6 | Touches: aprovan/server/workspace/tests/app-integration.test.ts, aprovan/docs/** | Verify: cd aprovan/server/workspace && pnpm test && cd ../../client/web && pnpm typecheck && pnpm test && grep -rn "apps\.versions\|apps\.version\b\|apps\.restore" /Users/jacob/Documents/Code/AprovanLabs/aprovan/server /Users/jacob/Documents/Code/AprovanLabs/aprovan/client /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages /Users/jacob/Documents/Code/AprovanLabs/registry --include='*.ts' --include='*.tsx' | grep -v node_modules | grep -v openspec; test $? -ne 0

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
