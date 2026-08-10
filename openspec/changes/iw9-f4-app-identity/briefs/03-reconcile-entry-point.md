# Brief: Reconcile entry point and record projection

## Mission

Create `server/workspace/src/apps/reconcile.ts` — the single entry point that
subsumes today's four-write `saveApp` fan-out (`apps/store.ts:371-377`) and
adds the identity guards D3/D4 require: first-sight minting, foreign/
duplicate-id rejection, slug-collision 409, and rename-as-`mv`. This is the
frozen seam `iw9-b-app-model` builds trees, promote-out, and install on top
of — get every guard and the rename algorithm exactly right, because nobody
downstream re-derives them.

**This brief closes a real gap found while preparing it, not just an
elaboration exercise**: the original tech-plan named `root` as reconcile's
binding key but described no storage for a `root → appId` lookup anywhere in
`apps/identity.ts`. Task 3.0 below (new) adds that storage — a small,
workspace-scoped index, not a list scan — before task 3.2 can be written
against it. Read `briefs/deviations.md` §1-§3 before starting; they explain
why this stream now owns a small addition to `apps/identity.ts` in addition
to the reconcile module itself.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — decisions D3, D4
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f4-app-identity/prd.md` — "Problem", "Goals"
4. `openspec/changes/iw9-f4-app-identity/tech-plan.md` — Context, T2, T3, T8
   (new — the root-binding index), the `AppRecord` block (including the
   `name`/`slug` projection paragraph immediately after it), the full
   `reconcileApp` algorithm in its code comment, and the "Root binding
   index" block, all under "Interfaces & Data" — every one of these is
   frozen shape for this stream to implement exactly
5. `openspec/changes/iw9-f4-app-identity/specs/app-manifest/spec.md` —
   Requirements "Platform record holds identity and derived state",
   "Reconcile assigns identity on first sight", "Duplicate and foreign
   identity rejected at reconcile" (full text under Acceptance criteria)
6. `openspec/changes/iw9-f4-app-identity/specs/app-slug/spec.md` —
   Requirements "Directory name is the vanity slug", "Workspace-unique
   slugs with rename as alias move", and the "unpublish releases claim"
   scenario (full text under Acceptance criteria)
7. `openspec/changes/iw9-f4-app-identity/specs/app-icon/spec.md` —
   Requirement "Directory rows carry icon data" (full text under Acceptance
   criteria)
8. `server/workspace/src/apps/store.ts` — full file, especially `AppManifest`
   (82-146), `saveApp` (371-377, the four-write fan-out you are subsuming),
   `removeApp` (397-414)
9. `server/workspace/src/apps/identity.ts` — full file (122 lines): `isAppId`
   (36-38), `setAlias`/`dropAlias` (65-83, the exact 409/holder-only
   semantics `assertValidSlug`-collision reuses), `indexAppLocation`/
   `dropAppLocation`/`resolveAppLocation` (93-121, the pattern task 3.0's new
   `readRootBinding`/`bindRoot`/`dropRootBinding` copies verbatim), and
   `DEPLOYMENT_TENANT` (90)
10. `server/workspace/src/apps/directory.ts` — full file: `DirectoryEntry`
    (24-33), `toEntry`, `syncDirectoryEntry`
11. `server/workspace/src/apps/slugs.ts` (stream 2's output — depend on it
    for `assertValidSlug`, `releaseGlobalSlug`)
12. `server/workspace/src/apps/manifest.ts` (stream 1's output — depend on it
    for the `AppYaml` type)

## Tasks

(Verbatim from `openspec/changes/iw9-f4-app-identity/tasks.md` §3, as
repaired in the pre-dispatch pass — see `briefs/deviations.md` §1-§3)

> Depends-on: 1, 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/reconcile.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/src/apps/identity.ts, aprovan/server/workspace/src/apps/directory.ts, aprovan/server/workspace/tests/app-reconcile.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-reconcile.test.ts tests/app-identity.test.ts tests/app-directory.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 3.0 Add the root-binding index to `apps/identity.ts` (tech-plan T8, new — closes the gap where the original plan named `root` as a binding key with no storage): `ROOT_SCOPE = svcScope("apps", "root")` (workspace-scoped, pattern of `AppLocationRecord`/`indexAppLocation`/`dropAppLocation` — unconditional read/write/delete, no self-guard); `AppRootBinding = { appId: AppId }`; `readRootBinding(workspaceId, root)`, `bindRoot(workspaceId, root, appId)`, `dropRootBinding(workspaceId, root)`. No list scan anywhere in this stream — every lookup this stream needs (forward root→appId via this index; reverse appId→root via existing `resolveAppLocation` + `readApp`) is a single keyed point-read.
- [ ] 3.1 Extend the `svc#apps/<appId>` record shape additively in `apps/store.ts`: `slug?`, `root?` (binding key), `declared?` (last-reconciled `AppYaml` snapshot) — all THREE optional (the pre-F4 `saveApp` fan-out in `apps/service.ts` is not rewired by F4 and keeps writing records with none of these set); keep every existing `AppManifest` operational field — F4 adds, never removes (tech-plan T3; iw9-b rebases on this shape). Reconcile-created records always set `name === slug` (see tech-plan's `name`/`slug` projection note) so existing name-keyed callers are unaffected.
- [ ] 3.2 Create `server/workspace/src/apps/reconcile.ts` exporting `reconcileApp(input: ReconcileInput): Promise<ReconcileResult>` exactly per the tech-plan contract (including its now-fully-specified algorithm), subsuming the four-write fan-out (`saveApp` at `store.ts:371-377` → record + `setAlias` + `indexAppLocation` + `syncDirectoryEntry`) behind the one entry point, using `readRootBinding`/`bindRoot`/`dropRootBinding` (3.0) for the root lookup.
- [ ] 3.3 First-sight behavior: `readRootBinding(workspaceId, root)` returns undefined and no `expectedAppId` → `mintAppId()` + create record/alias/location/directory/root-binding (spec app-manifest "first sight mints ULID"); unchanged input (declared yaml deep-equals stored `declared`, slug unchanged) → `changed: false`, zero writes (spec "idempotent re-reconcile").
- [ ] 3.4 Guards: `expectedAppId` mismatch (root already bound to a different appId, checked via `readRootBinding`) or a root binding to an `appId` owned by another root (checked via `resolveAppLocation(expectedAppId)` + reading that record's `root`) → 400 naming root + id, never re-mint/adopt (spec "foreign id rejected", "duplicated root binding rejected"); `yaml.slug` present and ≠ basename(root) → 400 stating directory name is authoritative (tech-plan T2; spec app-slug "mismatched explicit slug rejected"); slug fails `assertValidSlug` → 400; slug held by a different app in the workspace → 409 naming the holder, both bindings unchanged (spec "slug collision rejected").
- [ ] 3.5 Rename-as-mv: reconcile called with a new `root` (no existing binding there) AND `expectedAppId` set to an appId that resolves (via `resolveAppLocation` + `readApp`) to an existing record in the SAME workspace bound to a DIFFERENT root → this is a rename, not a fresh app: `bindRoot` the new root, `dropRootBinding` the old root, `setAlias` the new slug, `dropAlias` the old slug, to the same `appId` — `appId`/`createdAt` unchanged, `updatedAt` bumped, no storage-key rewrites (spec "rename preserves identity"; existing `setAlias`/`dropAlias` semantics, `identity.ts:65-83`; full algorithm in tech-plan's reconcile-contract code block).
- [ ] 3.6 Directory projection: `DirectoryEntry` (`apps/directory.ts:24-33`) gains `icon?` field and a `slug` field populated as `manifest.slug ?? manifest.name` (so every row has a slug whether or not its source record went through `reconcileApp`); `icon: manifest.declared?.icon` (`undefined` for pre-F4 records — the fallback renders); `name` retained, unchanged (spec app-icon "directory exposes icon"; tech-plan `name`/`slug` projection note).
- [ ] 3.7 Wire global-claim release into unpublish/remove paths (`syncDirectoryEntry` visibility drop, `removeApp`) so an unpublished/removed app's global slug frees (spec app-slug "unpublish releases claim").
- [ ] 3.8 New test file `tests/app-reconcile.test.ts` covering every scenario in 3.0, 3.3-3.7, plus: existing `tests/app-identity.test.ts` and `tests/app-directory.test.ts` pass unmodified.

## Acceptance criteria

Verbatim from `specs/app-manifest/spec.md`:

### Requirement: Platform record holds identity and derived state
Identity and derived state SHALL live only in the platform-owned record `svc#apps/<appId>`: `appId` (ULID), current alias/slug binding, directory-row projection inputs, timestamps, and creator. The record SHALL never be hand-written; the only writers are the reconcile entry point and existing platform mutations funneled through it.

#### Scenario: record is the identity source
- **WHEN** any consumer needs an app's `appId`, timestamps, or alias
- **THEN** it reads `svc#apps/<appId>` (or the alias/location indexes derived from it), never `app.yaml`

### Requirement: Reconcile assigns identity on first sight
The reconcile contract (the interface Wave-1 `iw9-b-app-model` builds on) SHALL be: given an app root containing a valid `app.yaml` with no existing `svc#apps` record bound to that root, the platform mints a new ULID via the existing minting path and creates the record, alias binding, deployment location index, and directory row in one entry point (successor of the four-write fan-out in `apps/store.ts saveApp`). Reconcile SHALL be idempotent: re-reconciling an unchanged root performs no writes.

#### Scenario: first sight mints ULID
- **WHEN** reconcile runs against an app root that has a valid `app.yaml` and no bound record
- **THEN** a new ULID is minted, `svc#apps/<appId>` is created, and the alias, location index, and directory row reflect it

#### Scenario: idempotent re-reconcile
- **WHEN** reconcile runs twice against the same unchanged app root
- **THEN** the second run performs no record writes and reports no changes

### Requirement: Duplicate and foreign identity rejected at reconcile
Reconcile SHALL reject, with a non-retriable validation error: (a) any `app.yaml` claiming identity (already covered above), (b) two app roots resolving to the same identity binding, and (c) any attempt to bind a root to an `appId` minted for a different root or workspace (foreign id). Rejection SHALL never silently re-mint or adopt; the error names the conflicting root and id.

#### Scenario: duplicated root binding rejected
- **WHEN** reconcile encounters a second app root whose resolution would bind to an `appId` already bound to another root
- **THEN** reconcile fails for that root with an error naming both roots and the contested `appId`, and the existing binding is unchanged

#### Scenario: foreign id rejected
- **WHEN** a caller attempts to reconcile a root against an explicit `appId` that the platform minted for a different root
- **THEN** the call fails with a validation error and no record is written

Verbatim from `specs/app-slug/spec.md` (the requirements this stream owns —
shape rules and the global claim registry are stream 2's, already built):

### Requirement: Directory name is the vanity slug
An app's vanity slug SHALL be its app-root directory basename. An explicit `slug` field in `app.yaml`, when present, MUST equal the directory basename; a mismatch SHALL be rejected at reconcile with an error stating that the directory name is authoritative (resolves the D3/D4 field-vs-directory tension deterministically; not re-litigated).

#### Scenario: slug derived from directory
- **WHEN** an app root `…/recipes/` with an `app.yaml` lacking a `slug` field is reconciled
- **THEN** the app's slug is `recipes`

#### Scenario: mismatched explicit slug rejected
- **WHEN** an app root `…/recipes/` carries `slug: cookbook` in `app.yaml`
- **THEN** reconcile fails with an error naming both values and stating the directory basename is authoritative

### Requirement: Workspace-unique slugs with rename as alias move
Slugs SHALL be unique per workspace. Rename SHALL be a directory `mv` reconciled as an alias move: the alias index rebinds the new slug to the same `appId`, the old binding is dropped, and no storage keys are rewritten. Binding a slug already held by a different app in the same workspace SHALL fail with a conflict (409) naming the holder.

#### Scenario: rename preserves identity
- **WHEN** an app root is renamed (`mv recipes cookbook`) and reconciled
- **THEN** the app keeps its `appId`, `cookbook` resolves to it, and `recipes` no longer resolves

#### Scenario: slug collision rejected
- **WHEN** a reconcile would bind a slug already held by a different app in the workspace
- **THEN** the operation fails with 409 naming the holding `appId`, and both apps' bindings are unchanged

#### Scenario: unpublish releases claim
- **WHEN** an app holding a global slug claim is unpublished or removed
- **THEN** the claim is released and the slug becomes claimable

Verbatim from `specs/app-icon/spec.md` (the requirement this stream owns):

### Requirement: Directory rows carry icon data
The deployment directory row and workspace app listings SHALL carry the resolved icon reference (custom) or the fallback inputs (slug), so launcher and directory UIs (Wave 1) can render icons without reading `app.yaml`.

#### Scenario: directory exposes icon
- **WHEN** a published app's directory entry is listed
- **THEN** the entry includes either the custom icon reference or enough data (slug) to render the fallback

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/app-reconcile.test.ts tests/app-identity.test.ts tests/app-directory.test.ts
pnpm --filter @aprovan/workspace typecheck
```

The first line is a correction over `tasks.md`'s literal `Verify:` string
(see `briefs/deviations.md` §9). The middle line intentionally runs the
*existing* `tests/app-identity.test.ts` and `tests/app-directory.test.ts`
alongside your new file — task 3.8 requires both to keep passing unmodified,
since this stream edits both `identity.ts` (task 3.0) and `directory.ts`
(task 3.6). All commands must exit 0.

## Constraints

- Implement only what the tasks say; the `AppRecord`, `reconcileApp`
  algorithm, and root-binding-index shapes in `tech-plan.md`'s "Interfaces &
  Data" are fixed (including the rename/move algorithm spelled out in the
  `reconcileApp` code comment) — if one seems wrong, stop and report instead
  of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- No list scan anywhere in `reconcile.ts` or the new `identity.ts` functions
  — every lookup is a single keyed point-read (`readRootBinding`,
  `resolveAppLocation` + `readApp`). If you find yourself calling
  `listApps`/`listSvcRecords` to find a binding, stop; that means a guard is
  missing an index, not that a scan is acceptable.
- `slug`/`root`/`declared` on `AppRecord` are optional — do not make them
  required or assume every existing record has them populated.
- Do not touch `apps/slugs.ts` (stream 2, already landed — import
  `assertValidSlug`/`releaseGlobalSlug` from it) or `apps/manifest.ts`
  (stream 1, already landed — import `AppYaml` from it).
- Do not modify files outside: `server/workspace/src/apps/reconcile.ts`,
  `server/workspace/src/apps/store.ts`,
  `server/workspace/src/apps/identity.ts`,
  `server/workspace/src/apps/directory.ts`,
  `server/workspace/tests/app-reconcile.test.ts`.

## Model

**Sonnet** — the default tier for every `iw9-f4` stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F4 does not appear in that table's Opus-escalation row (which names
only specific D/C/B/Doc streams by name — this stream is not among them),
and every guard, index, and the rename algorithm are now fully specified in
`tech-plan.md` after the pre-dispatch repair pass — this is elaboration
against a frozen contract, exactly the case the overview reserves Sonnet
for. Haiku is not used in this fleet (unavailable); do not downgrade below
Sonnet regardless. Do not escalate to Opus even though this stream is the
most guard-heavy of the six — the guards are fully specified, not novel.

## Report back

When done: check off tasks 3.0–3.8 in
`openspec/changes/iw9-f4-app-identity/tasks.md`, and open a PR (or write
`briefs/03-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything stream 5 (which will read
`AppRecord.slug`/`declared` and the alias index this stream writes) needs to
know.
