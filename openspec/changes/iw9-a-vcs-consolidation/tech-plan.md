## Context

Two version systems coexist in `server/workspace/src`: the commit-store VCS
(`vcs/store.ts` — snapshots, refs, mount lineage; `VcsCommit` already carries
`prefix` and `parents: string[]`) and a parallel release/per-file layer:
`apps/releases.ts` (184 LOC: release records in `svc#apps#releases#<appId>`,
channels on the manifest) plus per-file entrypoint versioning
(`apps/store.ts:422-452` `listEntryVersions`/`readEntryVersion`/
`restoreEntryVersion`, surfaced as `apps.versions/version/restore` in
`apps/service.ts:877+`, rendered by `packages/registry-ui/src/apps/versions.tsx`)
— roughly 350 LOC in total across those sites. Consumers of the release layer:
`apps/install.ts`, `routes/live-apps.ts` (`:209` reads pinned entry via
`release.entryHash`), `apps/directory.ts`, `notifications/service.ts`,
`platform-output-schemas.ts`.

Client-side, VCS is nearly invisible: of the six verbs advertised in
`routes/tools.ts` (`nativeVcsDiscoveryEntries`, ~:270-390) and dispatched in
`server/workspace/src/native-dispatch.ts` (`vcsBackend`) and
`packages/native/src/dispatch.ts:66-92`, only `vcs.show` has a caller
(`client/web/src/lib/vfs-commits.ts`), which fetches `changes` and discards
it (:42-55). Merge conflicts are resolved blind (`MergeDialog.tsx:220-282`
shows only paths; the server's `sessions.resolve` at
`vcs/sessions-service.ts:175` → `resolveSessionMerge` is unused by it).
`changeSummary` (`vcs/chat-sessions.ts:423-443`) iterates the overlay, so
auto sessions return empty. `closeSession` (`:531-570`) commits the merge via
`commitTree` with an implicit single parent. Five near-duplicate change-list
renderings exist with two symbol vocabularies (`new/edited/removed` vs
`+/~/−`).

External dependencies (serialize, do not duplicate):
- **iw9-f1 `vcs-scoping-params` must land first.** We consume: `commitTree`
  `prefix?`/`ref?` params, prefix in snapshot-id hash lines, un-hardcoded
  `main` in log/branches + wired `listRefs`, scope args in the `vcs.*` tool
  schemas, and hashes retained in `vcs.diff` wire output.
- **iw9-f6's test repair** (22 failing `vfs/*`→`vcs/*` suites) lands before we
  touch legacy VCS suites; we only add/modify tests for code we change.
- **We own `apps/releases.ts` and all release/version code** — sibling iw9-b
  (`app-model-app-centric`) consumes the release-as-tag interface below and
  NEVER edits release/version code, including the version-history lines in
  `apps/store.ts`. B's manifest-path work in `apps/store.ts` is disjoint by
  construction (we delete the version helpers; B does not touch them).
- **Our `routes/tools.ts` schema changes land BEFORE Wave-2 iw9-c's
  grant-visibility work** in the same file.
- iw9-doc consumes our merge surface (Wave 3); design the conflict-resolution
  contract so a CRDT-backed producer can feed it later without UI changes.

## Goals / Non-Goals

**Goals:**
- One version system: commits + refs + tags. Release layer deleted with grep
  gates in both repos.
- App-scoped commits on `app/<id>` refs with scope-filtered mount lineage.
- Two-parent session merge commits.
- A reusable client diff stack (`@codemirror/merge`) + one change-list
  component consumed by every surface.
- `sessions.resolve` as the single conflict-resolution path.

**Non-Goals:**
- No `commitTree` parameter plumbing (F1's). No app-model/manifest changes
  (B's). No grant work (C's). No CRDT merge (DOC's). No arbitrary
  user-branch management.

## Architecture

```mermaid
graph LR
  subgraph client [client/web + packages/editor]
    HV[HistoryView] --> DV[DiffViewer<br/>@codemirror/merge]
    CL[ChangeList - single component] --> DV
    MD[MergeDialog] --> DV
    HV --> UNDO[Restore action]
  end
  subgraph gateway [tools proxy]
    T[routes/tools.ts vcs.* schemas]
  end
  subgraph server [server/workspace/src]
    ND[native-dispatch vcsBackend] --> VS[vcs/store.ts<br/>commits, refs, tags]
    REL[apps/release-tags<br/>thin tag layer] --> VS
    CS[vcs/chat-sessions.ts<br/>changeSummary, closeSession] --> VS
    SR[sessions-service resolve] --> CS
    LA[routes/live-apps.ts] --> REL
    INST[apps/install.ts - iw9-b] --> REL
  end
  HV -->|vcs.log/show/branches| T --> ND
  UNDO -->|vcs.restore| T
  MD -->|sessions.resolve| SR
```

Component responsibilities:
- **vcs/store.ts**: commits, snapshots, refs (`main`, `app/<id>`), and — new —
  tag refs. Only place that writes refs.
- **release-tags layer** (new, small, lives with app service code): maps
  "release/channel" domain words onto tags; owns cut-over from
  `svc#apps#releases` records. Replaces `apps/releases.ts`.
- **vcs/chat-sessions.ts**: session overlay, `changeSummary` (now
  diff-based for auto), `closeSession` (now two-parent).
- **DiffViewer** (client, in `packages/editor` next to the CM6 stack): renders
  before/after given two content payloads; no fetching.
- **ChangeList** (client, shared): the one changed-paths renderer; rows link
  into DiffViewer.
- **HistoryView**: replaces/renames `VcsPanel`; log + restore, workspace and
  app scopes.

## Decisions

### D1: Releases become tag refs in the VCS store (per IW-9 D10)
- **Choice**: Add lightweight tag refs (`tag/app/<appId>/<release>`, plus
  movable channel refs `channel/app/<appId>/<channel>`) to `vcs/store.ts`'s
  existing ref machinery; the release layer becomes a thin domain wrapper
  that cuts an app-scoped commit and writes tags. `releases.ts` and per-file
  versioning are deleted.
- **Alternatives**: (a) Keep `releases.ts` as records pointing at commits —
  rejected: preserves the duplicate store IW-9 exists to kill, and B would
  have to consume two shapes. (b) Encode releases in `app.yaml` channels only
  — rejected: manifest is human-authored (D3); pointers must be
  platform-owned and atomic with the commit.
- **Revisit if**: a third-party `vcs` provider (Git hosting) must host app
  releases, at which point tags map 1:1 onto Git tags anyway.

### D2: Session merge commits get real second parents
- **Choice**: `commitTree` options gain `parents?: string[]` (an override for
  the default single-head parent); `closeSession` passes
  `[mainHead, sessionHead]` where `sessionHead` is the session's ref head.
  Falls back to single parent when the session has no commits. This is the
  decision the brief delegated to this stream — decided YES.
- **Alternatives**: (a) Keep single parent + `sessionId` breadcrumb —
  rejected: history cannot render lineage; "what the accepted state came
  from" stays unanswerable, violating the legibility mission. (b) Synthesize
  lineage in the UI from `sessionId` — rejected: fabricated graph data,
  breaks the moment any consumer walks `parents`.
- **Revisit if**: sessions stop maintaining their own refs/commits entirely.

### D3: Diff viewer is `@codemirror/merge` in packages/editor
- **Choice**: Add `@codemirror/merge` (same major/maintainer as the installed
  `codemirror@^6.0.2` stack — note: NOT yet a dependency, must be added) and
  build `DiffViewer` in `packages/editor`, exported for client/web. Unified
  view on narrow viewports, side-by-side otherwise.
- **Alternatives**: (a) Hand-rolled line diff rendering — rejected: this is
  exactly the wheel CM6 ships, and editor theming/highlighting already lives
  in packages/editor. (b) Monaco diff editor — rejected: second editor
  runtime in the bundle. (c) Server-rendered diffs — rejected: client
  already has content-by-hash access; server rendering kills interactivity
  (per-file choices in MergeDialog).
- **Revisit if**: diffs must render where CM6 cannot load (emails, native
  notifications).

### D4: Auto-session answerability = server-side path-filtered diff
- **Choice**: `changeSummary` branches on `session.mode`: staged → overlay
  walk (unchanged); auto → `diff(baseCommit, mainHead)` restricted to the
  session's touched-path set, which chat-sessions records as writes flow
  through it. Computed server-side so SessionBar/ChatDock/SessionsPanel get
  it from the same field they read today.
- **Alternatives**: (a) Client computes diff via `vcs.diff` — rejected: five
  consumers read `session.changes` from the server today; moving computation
  client-side duplicates it per surface. (b) Give auto sessions an overlay
  too — rejected: re-introduces staging for the no-friction path, against
  D11.
- **Revisit if**: touched-path tracking proves unreliable for agent bulk
  writes (then diff against base and attribute by author instead).

### D5: One ChangeList component, hash-free vocabulary enforced by lint-ish grep gates
- **Choice**: `ChangeList` lives in `client/web/src/components/` (SessionBar's
  `new/edited/removed` vocabulary wins; `+/~/−` glyphs die).
  `SaveAffordance` (packages/editor) receives rows via an injected render
  prop/slot rather than importing client/web. Vocabulary compliance is
  verified by grep gates in tasks, not by a custom lint rule.
- **Alternatives**: (a) Put ChangeList in packages/ui — rejected: only
  client/web + one editor overlay consume it; a package boundary now is
  speculative. (b) ESLint rule banning jargon strings — rejected for this
  change: high setup cost, grep gates give the same doneness check.
- **Revisit if**: a third package needs the component.

## Interfaces & Data

**Scope argument (wire, all six `vcs.*` verbs)** — from iw9-f1's schema work;
this change specifies the app-flavored value:
```ts
{ scope?: { app: string } }        // app id or slug; absent = workspace/main
// server maps: prefix = appRoot(app), ref = `app/<appId>`
```

**Tag/channel refs (vcs/store.ts)**:
```ts
writeTag(ws, name: string, commit: string): Promise<void>       // immutable
moveChannel(ws, name: string, commit: string): Promise<void>    // movable
listRefs(ws, prefix?: string)                                   // from F1
// names: `tag/app/<appId>/<releaseId>`, `channel/app/<appId>/<channel>`
```

**Release-as-tag interface (consumed by iw9-b — the contract we leave
behind)**:
```ts
cutRelease(ws, appId, { channel = "live", notes? })
  → { releaseId, commitId, snapshotId }
resolveRelease(ws, appId, channelOrReleaseId)
  → { releaseId, commitId, snapshotId } | undefined
listReleases(ws, appId) → Array<{ releaseId, commitId, channels: string[], createdAt, notes? }>
```
B's install-as-copy pins `{ appId, releaseId, commitId }` and copies the
snapshot's subtree. `live-apps.ts` serves pinned content by reading the
snapshot at `commitId` (replacing `release.entryHash` per-file reads).

**Two-parent merge (`commitTree` options)**:
```ts
{ message, author, sessionId?, parents?: string[] }  // parents overrides [head]
```

**`changeSummary` result (unchanged shape, new semantics)**:
`{ added: string[], modified: string[], removed: string[] }` — now non-empty
for auto sessions; every consumer keeps working.

**`sessions.resolve` (existing wire, MergeDialog adopts it)**:
per-file choices `{ path, choice: "session" | "workspace" | "content",
content? }` → server applies via `resolveSessionMerge`, returns
`{ session, resolved, commit? }`.

**DiffViewer (client)**:
```ts
<DiffViewer before={{content, label}} after={{content, label}} mode="unified"|"split" />
<ChangeList changes={{added,modified,removed}} onOpen={(path) => …} />
```

## Risks / Trade-offs

- [Migration breaks pinned installs when old release records disappear] →
  cut-over task re-tags every existing release record before deletion;
  grep-gated deletion is the last task; `live-apps.ts` keeps serving during
  migration because tags are written before records are dropped.
- [F1 slips and this stream stalls] → server tasks 1–2 are strictly F1-gated;
  client diff-stack tasks (DiffViewer, ChangeList, vocabulary) have no F1
  dependency and can start immediately — ordering in tasks.md reflects this.
- [Two-parent commits confuse existing log walkers] → `logCommits` walks
  first-parent today; keep first-parent = mainHead so linear views are
  unchanged; add tests.
- [Touched-path tracking misses writes that bypass chat-sessions] → auto
  summary falls back to full `diff(base, main)` when the touched set is
  absent (marked "includes other activity" in UX).
- [SaveAffordance lives in packages/editor and cannot import client/web] →
  render-prop seam (D5); no new package dependency edges.
- [tools.ts contention with iw9-c] → schema block lands early in this
  stream's first server task; c rebases on it (stated in both briefs).

## Rollout

1. **Server, F1-gated**: tags/channels in store → release-tags layer +
   consumer re-pointing (`install.ts`, `live-apps.ts`, `directory.ts`,
   `notifications`, output schemas) → migration (re-tag existing releases) →
   two-parent `closeSession` → auto `changeSummary`.
2. **Client, parallel-safe**: DiffViewer + ChangeList → HistoryView/undo →
   MergeDialog on `sessions.resolve` → vocabulary sweep.
3. **Deletion last**: `releases.ts`, per-file versions, `versions.tsx`,
   `vfs-commits.ts` discard fix folded in earlier; grep gates in BOTH repos.
4. Rollback: pre-deletion, both systems run (tags are additive); post-deletion
   rollback is `git revert` of the deletion commit — no data is destroyed
   (release records are only dropped after re-tagging is verified).

## Open Questions

(none — D8/D10/D11 settled by IW-9; the delegated second-parents decision is
made in D2 above)
