# PRD — iw9-f1-vcs-scoping-params

_Wave 0 foundation stream F1 of IW-9 (openspec/changes/IW-9-APP-FIRST.md). All
product decisions are settled there; this PRD elaborates scope, not policy._

## Problem

Every VCS commit path hardcodes whole-workspace scope and the `main` ref:
`commitTree` snapshots the entire visible tree onto `MAIN_REF`, `vcs.log` and
`vcs.branches` only ever read `main`, and snapshot identity omits the scope
prefix — so two snapshots of identical subtrees under different scopes collide
on the same id (a correctness bug today, a data-corruption bug the moment
scoped commits exist). Per D10, app-level VCS (commits scoped to an app root
on `app/<id>` refs) is the foundation the Wave-1 `iw9-a-vcs-consolidation`
stream builds on, so the scoping parameters must land first. Separately, the
`vcs.diff` wire format strips content hashes down to bare path strings, which
starves the client diff viewer Wave 1 builds.

## Users & Jobs

- **Wave-1 stream A (`iw9-a-vcs-consolidation`)** — the primary consumer.
  Hires this change for `prefix`/`ref` parameters it can point at app roots
  and `app/<id>` refs, and for hash-bearing diffs its diff viewer renders.
- **Agents and users calling `vcs.*` tools** — hire `vcs.commit/log/diff` to
  version and inspect a subtree, not only the whole workspace, and
  `vcs.branches` to see every ref that exists (session refs today, app refs
  tomorrow).
- **Chat sessions / sandboxes** (existing `commitTree` callers) — must keep
  working unchanged with default arguments.

## Goals

All verifiable by the new test suite (`server/workspace/tests/vcs-scoping.test.ts`):

1. `commitTree` accepts `prefix?` and `ref?`; defaults (`""`, `main`)
   reproduce today's behavior bit-for-bit — an unscoped snapshot of a
   workspace without mounts hashes to exactly the same id as before this
   change (no history discontinuity).
2. Two snapshots with identical entries but different non-empty prefixes have
   **different** snapshot ids; re-snapshotting the same prefix+content is
   still idempotent (same id, unchanged-head short-circuit).
3. `vcs.log` takes a `ref` argument and walks that ref's history;
   `vcs.branches` returns **every** ref (via the currently-dead `listRefs`),
   not a hardcoded `main` singleton.
4. `vcs.commit` accepts `prefix`/`ref`; `vcs.diff` accepts a `prefix` filter;
   argument shapes mirror `vcs.restore`'s existing `path?`/`prefix?` pattern.
5. `vcs.diff` (and `vcs.show`'s `changes`, which shares the wire type) carry
   content hashes: `added/removed` entries are `{path, hash}`, `modified`
   entries are `{path, from, to}`.
6. Grep gates hold: no `MAIN_REF`/`"main"` literal inside `commitTree`'s
   body or the `log`/`branches` backends; `listRefs` has a caller.

## Non-Goals

- **No `app/<id>` ref conventions, tags/releases, or `releases.ts` deletion**
  — owned by `iw9-a-vcs-consolidation` (Wave 1, per serialization rules).
- **No mount-lineage filtering to scope** — the brief assigns "mount lineage
  filtered to scope" to stream A; F1 passes lineage through unchanged.
- **No client work** — no diff viewer, no `vcs.*` UI wiring (stream A).
- **No repair of the 22 failing VCS test suites** (`vfs/*` → `vcs/*` drift) —
  owned by `iw9-f6-cleanup-rename`. This change does not edit those files.
- **No session/`chat-sessions.ts` behavior changes** — existing callers keep
  default (whole-workspace, `main`) semantics.
- **No new access control** — visibility filtering (`visibleEntries`) is
  unchanged; scoping narrows what is snapshotted, never what is readable.

## Capabilities

### New Capabilities

(Checked `openspec/specs/` — no existing VCS capability specs; all three are new.)

- `vcs-scoped-commits`: commit creation scoped by subtree prefix and target
  ref; prefix-aware snapshot identity; idempotent scoped re-commit.
- `vcs-ref-enumeration`: history listing over an arbitrary ref; branch
  listing that enumerates all refs.
- `vcs-diff-wire-fidelity`: content hashes preserved end-to-end in diff and
  show wire output.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Backward-compatible snapshot ids**: the prefix hash line is emitted only
  for non-empty prefixes (same additive pattern the mount lines already use,
  store.ts:149-155), so existing whole-workspace snapshot/commit ids and the
  unchanged-head comparison are untouched.
- **Shared wire type ripple**: `NativeVcsDiff` (packages/native/src/vcs.ts:31)
  is the type that enforces hash-stripping; changing it touches the memory
  backend and two assertions in `packages/native/__tests__/conformance.test.ts`.
  That file is *not* among the F6-owned failing server suites and no other
  stream touches `packages/native`; see tech-plan for the containment argument.
- **Soft ordering vs F6**: the legacy server VCS suites fail on main for
  unrelated reasons; full-suite verification of this change is only green
  after F6's test repair lands. New coverage lives in a new file that passes
  independently.
- **Interface contract for stream A**: the exact new signatures in the
  tech-plan are a published contract; A consumes them for `app/<id>` refs.
  Changing them after F1 lands requires updating A's plan.
- Assumption (verified against source 2026-08-09): all brief file:line claims
  hold; two additions discovered — `packages/native/src/dispatch.ts:69-83`
  allowlists args and must thread the new ones, and the hash-stripping lives
  in the shared contract type, not only `native-dispatch.ts:349-353`.

## Open Questions

None — scope, ordering, and semantics are fixed by IW-9 F1/D10; the one
underdetermined default (first commit on a fresh ref has no parent) is decided
and documented in the tech-plan where stream A can see it.
