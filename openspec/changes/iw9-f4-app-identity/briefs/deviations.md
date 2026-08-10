# Deviations — iw9-f4-app-identity

Findings recorded during brief preparation, per the IW-9 execution protocol
(`openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` §6) and the pattern
`IW-9-EXECUTION-OVERVIEW.md` itself uses for pre-dispatch elaboration
findings ("Findings the elaboration surfaced" — corrected directly in the
owning tech-plan rather than left for an implementer to rediscover). Unlike
a mid-implementation deviation, everything below was found and **fixed
directly in `tech-plan.md`/`tasks.md`** before any stream was dispatched;
this file is the record of what changed and why, so implementers and
reviewers don't have to diff the git history to find it.

## 1. `root → appId` binding had no storage (blocking — repaired)

**Problem**: the original tech-plan's reconcile contract said "resolve
existing binding by `root`" (T3) and the `AppRecord` interface added a
`root: string` field, but `apps/identity.ts` — read in full — has no scope
keyed by `root`: `ALIAS_SCOPE` (`svc#apps/alias`) is keyed by name/slug,
`BY_ID_SCOPE` (`svc#apps/byId`) is keyed by `appId`. There was no described
mechanism for "is there already a record bound to this root" other than an
implied list-scan, which the instruction that produced this repair pass
explicitly forbade ("no list scan if it creates ambiguity or races") — a
scan is also genuinely racy (two concurrent reconciles of different new
roots could both observe "no match" and both mint).

**Repair**: added **tech-plan T8** and a new "Root binding index" interface
block: one workspace-scoped svc-record scope, `ROOT_SCOPE =
svcScope("apps", "root")`, following the exact unconditional-write pattern
of the existing `AppLocationRecord`/`indexAppLocation`/`dropAppLocation`
trio (no self-guard — `reconcileApp` owns guards). Three functions:
`readRootBinding`, `bindRoot`, `dropRootBinding`. The reverse direction
(appId → root, needed for the foreign/duplicate-id guard) needs no second
index: `resolveAppLocation(appId)` (existing, deployment-wide) plus
`readApp` on the resulting workspace already answers it, since
`AppRecord.root` carries the fact. Added as **task 3.0** in `tasks.md`
(new subtask, stream 3), referenced from 3.2-3.5.

## 2. `AppRecord.slug`/`root`/`declared` shown as required, contradicting "additive-only" (blocking — repaired)

**Problem**: tech-plan's `AppRecord` interface block showed `slug: string`
(required) and `declared: AppYaml` (required, no `?`), but the PRD/tech-plan
both state F4 does not rewire the existing `saveApp` fan-out
(`apps/service.ts`'s create/publish flow) to call `reconcileApp` — that
rewiring is `iw9-b`'s job ("No app tree layout... F4 defines the manifest
format and reconcile contract as interfaces only"). A required field that
only one of two live writers populates is not additive; it would either
break every record `saveApp` still writes or require F4 to secretly rewire
callers it explicitly disclaims touching.

**Repair**: marked `slug`, `root`, and `declared` **optional** on
`AppRecord` in `tech-plan.md`, and added a "`name` vs `slug` projection"
paragraph: `reconcileApp`-written records always set `name === slug` (so
every existing name-keyed caller — aliasing, live-apps resolution,
`allowedTools` namespace derivation — is unaffected); records from the
legacy path simply have `slug`/`root`/`declared` undefined. Consumers added
by F4 (directory projection, task 3.6) read `manifest.slug ?? manifest.name`
so a directory row always has a usable slug regardless of which path wrote
the record. Updated task 3.1 and 3.6 to state this explicitly.

## 3. Reconcile's rename/move algorithm was named but not specified (blocking — repaired)

**Problem**: task 3.5 said reconcile of "the same root's parent with a new
basename... rebinds the alias" but the `ReconcileInput`/guard description
gave no way to tell a rename apart from a fresh app claiming a new root —
both present as "no binding at this root." `expectedAppId`'s stated purpose
("callers that think they know; mismatch = 400, never adopt") reads as pure
verification, not as the signal that should trigger a rebind.

**Repair**: wrote out the full algorithm in the tech-plan's reconcile
contract code block (case 2a: no binding at the new root, but
`expectedAppId` resolves — via `resolveAppLocation` + `readApp` — to an
existing record in the **same workspace** bound to a *different* root ⇒
rebind, don't mint) and mirrored it in tasks 3.4/3.5. Cross-workspace moves
are explicitly out of scope (foreign id, 400) — F4 does not need to solve
cross-workspace app portability.

## 4. `/w/<wsRef>/a/<ref>` resolution was underspecified relative to `iw9-b`'s (not-yet-built) install model (blocking — repaired)

**Problem**: the URL grammar table labeled `/w/<wsId>/a/<installId>` "canonical
install," which reads as depending on D8's install-as-copy model —
something `iw9-b` (Wave 1) has not built yet, and F4's PRD explicitly
excludes ("No install-as-copy — Wave-1 `iw9-b-app-model` scope"). Without a
concrete resolution rule, an implementer could either (a) invent new
install-as-copy machinery F4 doesn't own, or (b) leave `ref` resolution
underspecified.

**Repair**: inspected `apps/install.ts` and `live-apps.ts`'s existing
`resolveLiveApp` (`live-apps.ts:103-155`) directly. It already implements
exactly the dual lookup F4 needs and has needed no D8 model to do it: try
`readInstall(wsId, ref)` when `ref` is a ULID (the pre-existing, pre-IW9
origin-pinned install record), fall through to `resolveAppRef(wsId, ref)`
(ULID passthrough or alias) otherwise. Pinned this as tech-plan T5's
resolution rule and tasks 5.1/5.2: F4 **moves** this existing lookup under
the canonical prefix, it does not build a new one. Also confirmed by grep
(`apps/install.ts`, `apps/service.ts`) that installs have no name/slug
field anywhere — the vanity form `/w/<wsSlug>/a/<slug>` can therefore never
resolve an install, only a workspace's own authored app; documented
explicitly so this isn't reinvented.

## 5. `live-apps.ts` extraction end-state was ambiguous ("reuse internals" vs. move) (blocking — repaired)

**Problem**: task 5.1 said `app-urls.ts` serves the live surface "reusing
live-apps.ts handler internals," which reads as import-and-share, but the
tech-plan's own architecture diagram states `live-apps.ts` "retains only
redirect shims" post-migration — the two descriptions are only consistent
if the serving logic *moves*, since a shim-only file can't also still own
the internals something else imports.

**Repair**: resolved as a **move** — `resolveLiveApp`, `viewerSub`,
`requireViewer`, `resolvePin`, `readPinned`, `servableTargets`, the
`handleLive*` handlers, and `buildAppShell` (`live-apps.ts:79-538`)
relocate into `app-urls.ts` verbatim; `live-apps.ts` ends the stream
containing only resolve-then-302 shims. Reworded tech-plan T5 and tasks
5.1/5.4/5.5 accordingly.

## 6. `tests/live-apps.test.ts` asserts behavior the change deliberately removes (blocking — repaired)

**Problem**: inspected `server/workspace/tests/live-apps.test.ts` in full.
It calls `liveAppsRouter.request("/local/site")` and similar paths
directly and asserts **200-with-content** (lines 120, 139, 149, 181, 186,
211, 216, 221, 231, 236, 362 — path binding, channel pinning, visibility,
static assets, SPA fallback, pinned content). Task 5.3 converts every one
of those routes to a 302 shim. Left unmodified, this existing test file
would fail the moment 5.3 lands — directly contradicting stream 5's own
`Verify:` line, which lists `tests/live-apps.test.ts` as a file that must
pass. The file was also missing from stream 5's `Touches` list, which
would have made editing it a scope violation under the brief's own
constraints.

**Repair**: added `aprovan/server/workspace/tests/live-apps.test.ts` to
stream 5's `Touches`. Split the fix into two tasks: **5.3** now says to
*rewrite* the existing file (not append/create new — its current scenarios
are moving, not being added to) so it asserts only that each legacy path
302s to the correct canonical URL; **5.3a** (new) ports every
serving-behavior scenario it currently covers into the new
`tests/app-urls.test.ts` (5.6), which is where that logic now lives. This
preserves 100% of the existing scenario coverage, just retargeted to where
the code moved.

## 7. `capabilities` grammar and icon-traversal validation scope were stated ambiguously (non-blocking — clarified)

**Problem**: the `AppYaml` schema's `capabilities` comment named the
`"ns.proc" | "ns.*"` grammar inline without saying F4 must not enforce it
(only iw9-c does, Wave 2) — an implementer could reasonably add a regex "to
be helpful." Separately, "reject traversal" for `icon` reads naturally as
requiring real filesystem path resolution, which contradicts the
architecture's own statement that `manifest.ts` has "no IO beyond the given
bytes."

**Disposition**: non-blocking (no behavior gap, just a scope-creep risk) —
added explicit call-outs in `tech-plan.md`'s `AppYaml` block and tasks
1.2/1.5: `capabilities` accepts any `string[]`, no grammar validation;
`icon` traversal rejection is a **string-pattern check only** (reject a
leading `/` and any `..` segment), never a real path resolution.

## 8. FNV-1a-32 constants were named but not pinned (non-blocking — clarified)

**Problem**: `fnv1a32(utf8(slug))` names an algorithm family, not a
concrete function — FNV-1a has several bit-width variants and the exact
offset-basis/prime pair matters for the "normative, cross-implementation
verifiable" property the tech-plan itself asks for (Risk: "Two icon-fallback
implementations could drift").

**Disposition**: non-blocking (doesn't block writing code, but would have
let two implementations pick different constants silently) — pinned the
standard 32-bit FNV-1a constants (offset basis `0x811c9dc5`, prime
`0x01000193`, unsigned 32-bit arithmetic) in tech-plan T7 and task 4.1. Also
noted slugs are `NAME_RE`-constrained to ASCII, so "first grapheme" is
`slug[0]` — no Unicode grapheme-cluster segmentation is needed or expected.

## 9. Every stream's checked-in `Verify:` command skips the turbo build step (blocking — adapted per-brief, not rewritten in `tasks.md`)

**Problem**: every stream's metadata line in `tasks.md` runs
`pnpm --filter @aprovan/workspace test -- ...` / `pnpm --filter
@aprovan/workspace typecheck` (or the `@aprovan/ui` equivalents) directly,
bypassing `pnpm turbo run ...`. Verified from source (same class of issue
already recorded independently in `iw9-f1-vcs-scoping-params/briefs/
deviations.md` §1 and `iw9-f2-shared-partition/briefs/*.md` "Verify"
sections — this is a repo-wide sharp edge, not specific to F4):

- `server/workspace/package.json` depends on `@aprovan/native`,
  `@aprovan/node`, and `@aprovan/patchwork` as `workspace:*`, each resolved
  through its `exports` map to `./dist/*` only (no source fallback).
- `packages/ui/package.json` depends on `@aprovan/patchwork` the same way.
- Root `turbo.json` declares `build`, `typecheck`, and `test` all
  `dependsOn: ["^build"]` — but `pnpm --filter <pkg> test`/`typecheck`
  invokes the package's own script directly, which does **not** go through
  turbo and therefore does not trigger that dependency.

**Adaptation**: kept every stream's checked-in `Verify:` line in `tasks.md`
verbatim (the historical record is not silently rewritten), but each
brief's `## Verify` section below prefixes the checked-in command with
`pnpm turbo run build --filter=@aprovan/workspace` (streams 1, 2, 3, 5, 6)
or `pnpm turbo run build --filter=@aprovan/ui` (stream 4) — cached and
cheap when nothing changed, and turbo pulls in every `^build` dependency
transitively. Stream 6's suite-wide Verify gets both build prefixes since
it runs both packages' test suites.

## 10. No spec-level (`specs/*/spec.md`) changes were needed

Every gap above is implementation-level (storage index, field optionality,
an algorithm's concrete steps, which existing function a route calls) —
none of it changes what a WHEN/THEN scenario asserts. All four spec files
(`app-manifest`, `app-slug`, `app-url-scheme`, `app-icon`) were re-read
after the tech-plan/tasks repairs above and remain accurate as written; no
edits were made to `specs/`.
