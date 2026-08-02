# Brief 02 report — Aprovan repo purge (purge-dead-code stream 2)

## What was done

All source-level work for tasks 2.1–2.18 is complete in the isolated worktree
(`/Users/jacob/Documents/Code/AprovanLabs/aprovan/.claude/worktrees/agent-ac582d358177c50e8`,
branch `worktree-agent-ac582d358177c50e8`) and is fully staged (`git add`) but
**could not be committed** — see "Blocker" below.

- 2.1 Deleted `packages/bobbin` in its entirety (`git rm -r`).
- 2.2 `packages/editor/src/components/edit/EditModal.tsx`: removed the `Bobbin`
  import/component, `bobbinChanges` state, `handleBobbinChanges`, the "N visual
  changes will be included" pill, and the YAML-serialization branch in
  `handleSubmit`. Also removed `previewContainer`/`setPreviewContainer` state and
  its `ref={setPreviewContainer}` — that state existed solely to feed Bobbin's
  `container` prop and would otherwise have been an unused local under this
  repo's `noUnusedLocals: true`. The AI text-edit loop (`editInput`,
  `session.isApplying`, `session.submitEdit`) is intact.
- 2.3 Removed `@aprovan/bobbin` from `packages/editor/package.json`,
  `client/web/package.json`, and `packages/editor/tsup.config.ts`'s `external` list.
- 2.4 Deleted `packages/mcp-app-server` in its entirety.
- 2.5 Deleted `packages/patchwork` in its entirety.
- 2.6 Removed `@aprovan/patchwork` from `client/web/package.json`.
- 2.7 Deleted `packages/compiler/src/vfs/store.ts`,
  `packages/compiler/src/vfs/backends/{http,indexeddb}.ts`,
  `packages/compiler/src/vfs/sync/{differ,engine,resolver}.ts`. Kept
  `vfs/project.ts`, `vfs/types.ts`, `vfs/core/**`, `vfs/backends/memory.ts`.
- 2.8 Trimmed `packages/compiler/src/vfs/index.ts` to drop the sync-engine and
  HTTP/IndexedDB backend re-exports; kept `core/types.js`/`core/utils.js`,
  `VirtualFS`, `MemoryBackend`, `project.js` exports.
- 2.9 Trimmed `packages/compiler/src/index.ts`'s `// VFS` export block to drop
  `VFSStore`, `IndexedDBBackend`, `HttpBackend`, `HttpBackendConfig`,
  `VFSStoreOptions`; kept the rest.
- 2.10 Trimmed `packages/compiler/src/__tests__/vfs-core.test.ts`: removed the
  `vfs/sync/differ` and `vfs/sync/resolver` `describe` blocks and their imports;
  kept `vfs/core/types` and `vfs/core/utils` coverage (21 tests remain, all pass).
- 2.11 Trimmed `packages/editor/src/lib/vfs.ts` down to nothing worth keeping and
  deleted the file. `WidgetVfs` was relocated into
  `packages/editor/src/components/CodePreview.tsx` (chose the "inline in
  CodePreview.tsx" option over a new `types.ts`, since it's the file's only
  consumer and the interface is small).
- 2.12 `CodePreview.tsx`: dropped the `httpWidgetVfs`/`WidgetVfs` import from
  `../lib/vfs`, dropped the `vfs = httpWidgetVfs` default, `vfs: WidgetVfs` is now
  a required prop.
- 2.13 `packages/editor/src/index.ts`: removed the `./lib/vfs` export block;
  `CodePreview` now co-exports `type WidgetVfs` from its new home; removed the
  `CodeBlockExtension` re-export (file untouched); `ServicesInspector` component
  export removed, `type ServiceInfo` re-export kept.
- 2.14 `packages/editor/src/components/ServicesInspector.tsx`: file now contains
  only the `ServiceInfo` interface; the component, its props interface, and the
  default sub-components were all deleted.
- 2.15 Deleted `packages/images/ink` and `packages/images/vanilla` **in the main
  checkout** (`/Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/images/`),
  no git involvement, as instructed — `packages/images/shadcn` is untouched.
- 2.16 Deleted `client/web/.utcp_config.json` and `docs/temp.md` (both were
  git-tracked, removed via `git rm`).
- 2.17 Removed `@aprovan/devtools` from `client/web/package.json`.
- 2.18 Straggler grep is clean (see Verify below). Confirmed `CodeBlockExtension`
  is gone from `packages/editor/src/index.ts` but still used internally in
  `MarkdownEditor.tsx`/`MarkdownPreview.tsx`; confirmed the `ServicesInspector`
  component string appears nowhere in the repo (grep), while `ServiceInfo`
  still appears in `packages/editor/src/index.ts`,
  `packages/editor/src/components/ServicesInspector.tsx`,
  `client/web/src/components/ServicesMenu.tsx`, and `client/web/src/pages/ChatPage.tsx`
  (the latter file was **not modified** — per the brief, its uncommitted
  modification in the main checkout is out of scope and it was never touched
  in the worktree either).

`pnpm-lock.yaml` was also updated (via `pnpm install` after the `package.json`
edits) and is staged alongside the source changes.

Total staged diff: 110 files changed, 24 insertions(+), 12,991 deletions(-).

## Verify — all green

Ran in the worktree, in this order (see deviation note below on ordering):

```
pnpm install                                            # OK
pnpm -r build                                             # exit 0, all packages built
pnpm -r typecheck                                          # exit 0 (compiler, editor, images/shadcn)
pnpm --filter @aprovan/patchwork-compiler test              # exit 0, 3 files / 45 tests passed
```

Straggler grep (task 2.18), run from the worktree root:

```
grep -rn '@aprovan/bobbin\|@aprovan/patchwork-mcp\|@aprovan/patchwork"\|VFSStore\|IndexedDBBackend\|HttpBackend\|SyncEngineImpl\|ServicesInspectorProps' . --include='*.ts' --include='*.tsx' --include='*.json' | grep -v node_modules | grep -v dist/
```

→ zero matches.

## Deviation: Verify command ordering

The brief's Verify line and `tasks.md`'s stream-2 header both read
`pnpm -r typecheck && pnpm -r build && ...` (typecheck before build). Running it
literally in that order fails: `packages/editor`'s typecheck can't resolve
`@aprovan/patchwork-compiler`'s types because `packages/compiler/dist/` doesn't
exist yet (plain `pnpm -r typecheck` doesn't run turbo's `dependsOn: ["^build"]`
graph — that only kicks in via `pnpm run typecheck`/`pnpm run build`, i.e. the
turbo-wrapped root scripts, not `pnpm -r <script>`). `specs/codebase-hygiene/spec.md`'s
own acceptance scenario ("Every touched repo still builds, typechecks, and tests
clean") lists `pnpm -r build` *before* `pnpm -r typecheck`, which is the order
that actually works and is what I ran. Recommend fixing the Verify line order in
`tasks.md`/the brief template for future streams to match the spec.

## Blocker: local git commit could not complete (signing hangs indefinitely)

**I was unable to commit, push, or open a PR.** This is not a push/auth failure
(the brief's anticipated fallback) — the local `git commit` itself never
completes.

- The repo has `commit.gpgsign=true`, `gpg.format=ssh`,
  `user.signingkey=~/.ssh/identity.pub`.
- The matching private key (`~/.ssh/identity`) is passphrase-protected and is
  **not** loaded in the reachable ssh-agent (`ssh-add -l` → "The agent has no
  identities", returns immediately). I do not have and should not obtain that
  passphrase.
- `git commit` in this non-interactive worktree session hangs indefinitely
  (confirmed twice, killed after 2–5 minutes each; a sibling agent's `git
  commit` in the parallel `registry` worktree has been hung for 12+ minutes as
  of this writing) rather than failing fast — it appears to block on a
  passphrase/approval prompt that has no interactive terminal to answer it and
  no automatic approver in this session.
- Per the git safety rules I operate under, I will **not** bypass signing
  (`--no-gpg-sign`, `commit.gpgsign=false`, etc.) without your explicit
  instruction, and I have not done so.

**Current state**: all task 2.1–2.18 changes are applied and `git add`-staged in
the worktree at
`/Users/jacob/Documents/Code/AprovanLabs/aprovan/.claude/worktrees/agent-ac582d358177c50e8`
(branch `worktree-agent-ac582d358177c50e8`), verified green, but there is no
commit, no push, and no PR.

**To unblock**, one of:
1. Run `git commit` yourself in that worktree (interactively, so you can answer
   the SSH signing passphrase/approval prompt), then `git push -u origin HEAD`
   and open the PR — the staged changes are ready to go as-is.
2. Explicitly authorize disabling signing for this commit (e.g. tell me to run
   with `--no-gpg-sign` or set `commit.gpgsign=false` for this repo/session) and
   I'll commit, push, and open the PR immediately.
3. Load the signing key into the reachable ssh-agent yourself
   (`ssh-add ~/.ssh/identity`, entering the passphrase) before re-running me or
   handing this back — then a plain `git commit` should succeed without hanging.

## Notes for stream 4 (npm deprecations)

Stream 4 depends on streams 1 and 2 landing first (task 4.1: confirm npm
publish auth). Since nothing here is committed/merged yet, stream 4 should not
start until a human confirms the PR (once opened) is merged. The packages it
needs to deprecate from this stream are `@aprovan/bobbin`,
`@aprovan/patchwork-mcp`, `@aprovan/patchwork` — all three are fully deleted
from the tree here, ready for `npm deprecate` once publish auth is available.

## Notes for wave 2 / later streams

- `packages/editor`'s public barrel (`src/index.ts`) shape changed: `WidgetVfs`
  now comes from `./components/CodePreview` instead of `./lib/vfs` (which no
  longer exists), and `CodeBlockExtension`/`ServicesInspector` are no longer
  exported. Any later stream that touches the editor's public API should be
  aware `lib/vfs.ts` is gone.
- `packages/compiler`'s VFS surface is now single-path: `MemoryBackend` only,
  no `HttpBackend`/`IndexedDBBackend`/`VFSStore`/sync engine. If a future stream
  wants to rebuild an HTTP or IndexedDB VFS backend, it needs to be written from
  scratch or restored from git history (`packages/compiler/src/vfs/{store.ts,
  backends/http.ts,backends/indexeddb.ts,sync/**}`), per tech-plan D2's "Revisit
  if" note.
- The registry-repo sibling stream (stream 1) appears to have completed its own
  source edits and checked off tasks 1.1–1.9 in `tasks.md` already, but its
  commit is very likely hung on the exact same signing issue (observed still
  running after 12+ minutes at
  `/private/tmp/claude-501/.../scratchpad/wt-purge-registry`) — worth checking
  whether that stream's worktree also needs a manual/interactive commit.
