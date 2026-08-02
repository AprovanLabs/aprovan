## Problem

All three repos (`aprovan`, `registry`, `core`) carry confirmed dead code, orphaned packages, and
build litter — 5,971 LOC of unused visual-edit tooling, a 4,112 LOC MCP-Apps package with zero
consumers, a 6.7 GB gitignored CDK build artifact, ~1,100 LOC of a second dead VFS, and several
smaller orphans. This raises the maintenance surface and confuses navigation for every downstream
workstream (WS-2 through WS-8) that touches these repos next. It is free to do now: everything
here has zero live consumers, confirmed by import-graph checks across all three repos.

## Users & Jobs

- **Implementers of WS-2..WS-8**: need a clean baseline so their diffs aren't polluted by unrelated
  dead files and so grep/search results in these repos return only live code.
- **Repo maintainer (the owner)**: wants git history as the archive for deleted code, not a
  parallel "dead but present" branch of the tree, and wants published npm packages deprecated
  (not unpublished) so no downstream break occurs silently.

## Goals

- Zero remaining references to the deleted packages/files anywhere in `aprovan`, `registry`, or
  `core` (verified by grep + full typecheck/build/test per repo).
- Each touched repo's build, typecheck, and test suite pass after the purge (`pnpm -r build`,
  `pnpm -r typecheck`/`check-types`, and each affected package's `test` script).
- Every deleted package that was published to npm (`@aprovan/bobbin`, `@aprovan/patchwork-mcp`,
  `@aprovan/patchwork`, `@utdk/fn`, `@utdk/isolate`) is `npm deprecate`d, never unpublished.
- `registry/apps/workspace/src/isolate.ts` has exactly one executor path (the direct in-process
  executor, renamed from "fallback" to be the intended path) with no dead dynamic-import branch.

## Non-Goals

- No new features, no behavior changes to any surviving code path.
- No contract/package promotion work (WS-2), no registry-server extraction (WS-3), no storage
  migration (WS-5), no data/auth model changes (WS-6) — those are separate workstreams.
- No decomposition of `ChatPage.tsx` or component-library consolidation (WS-8) beyond removing the
  dead imports this purge directly causes.
- No rebuild of MCP-Apps distribution or the visual bobbin edit panel — both are confirmed
  deletions per the decision record, not deferred features.
- Not relitigating any of the 10 confirmed decisions in `docs/tasks/refactor-decisions.md`.

## Capabilities

### New Capabilities
- `codebase-hygiene`: the set of behavioral guarantees that hold after dead code is purged — no
  dangling imports, no broken builds, deprecated (not unpublished) npm packages, single isolate
  executor path. Framed as REMOVED requirements (dead capabilities going away) plus one ADDED
  requirement for the isolate executor rename, since that is a behavior change (fallback becomes
  primary), not a pure deletion.

### Modified Capabilities
(none — no existing `openspec/specs/` capabilities are touched by this change)

## Constraints & Assumptions

- **Constraint**: cross-repo consumption is npm-only; nothing in `registry` or `core` may end up
  importing repo-relative paths into `aprovan` or vice versa as a side effect of this cleanup.
- **Constraint**: `npm deprecate` requires npm publish auth for the `@aprovan` and `@utdk` scopes.
  The agent executing that work stream needs those credentials; if it doesn't have them, the task
  is left checked off as blocked, not silently skipped.
- **Assumption**: git history is the archive — no soft-delete, no `.bak` files, no commented-out
  code left behind.
- **Assumption (new, found during investigation, not in the decision record)**: after
  `packages/mcp-app-server` is deleted, `packages/patchwork` (`@aprovan/patchwork`) has zero
  remaining source consumers (its only real importer was
  `mcp-app-server/src/registry-backend.ts`) and `client/web/package.json`'s dependency on it is
  already stale (no source import). Per decision #2's "shrink to `mcp.ts` if still consumed, else
  delete package" — since nothing consumes it after this change, the whole package is deleted, not
  shrunk.
- **Assumption (new)**: `packages/editor/src/lib/vfs.ts` is a stray consumer of the compiler's dead
  VFS (`VFSStore`, `HttpBackend`) — it implements an HTTP client for `/vfs` dev-server routes that
  no longer exist anywhere in the codebase (confirmed by repo-wide grep). It must be cut down
  alongside the compiler deletion or the editor package will fail to build. See tech-plan D2.
  `packages/compiler/src/__tests__/vfs-core.test.ts` also has `describe` blocks that directly test
  the dead `sync/differ.ts` and `sync/resolver.ts` modules and must be trimmed, not just the
  `index.ts` re-exports.
- **Assumption**: `core/infra/aws/dist/` is already git-ignored and untracked (confirmed: `git
  ls-files` returns zero files) — deleting it locally is a no-op for the repo's history; it's
  listed as a task anyway since the decision record names it explicitly and a stale local
  checkout would otherwise carry it.

## Open Questions

None outstanding. The investigation (repo-wide grep for every deletion target's consumers) turned
up two items not spelled out verbatim in the decision record — the `packages/patchwork` full
deletion and the `editor/src/lib/vfs.ts` cleanup — but both follow directly from applying already-
confirmed decisions (#2's shrink-or-delete rule; the dead-VFS deletion itself), so they are
resolved in this proposal rather than escalated.
