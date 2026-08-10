# iw9-b-app-model — PRD

_Wave 1 stream B of IW-9 (`openspec/changes/IW-9-APP-FIRST.md`, the settled
authority — decisions D1, D2, D6, D7, D8, D19, D20; invariants 4, 5, 9, 10).
Builds on the current model documented in
`openspec/changes/app-model-split/specs/` — this change extends that model, it
does not revert it._

## Problem

Apps are supposed to be the product, but today they are path bindings: a
manifest binds an `entry` file plus arbitrary workspace prefixes
(`apps/store.ts:95-100`), with no validation that two apps' prefixes overlap
(none exists — verified in `apps/service.ts:468-491`, which only dedupes). An
install is "a reference + pin (never a manifest copy)" (`apps/install.ts:4-5`)
served from the origin workspace at request time
(`routes/live-apps.ts:119-126`, `routes/apps.ts:115-120`), so an installed app
dies when its origin does and the installer owns nothing. There is no place
for a user's one-off widgets to live and grow into apps, no way to share a
file with a person or a link (only workspace→app shares exist,
`apps/store.ts:154-165`), and the 721-line mounts module
(`vcs/mounts.ts`) has zero non-test callers. The sidebar leads with 14 native
service rows instead of the user's apps.

## Users & Jobs

- **Workspace members** — launch their apps from the front door; keep one-off
  widgets in a Personal app; promote a grown widget into a real app.
- **App authors/publishers** — declare an app in one folder + `app.yaml`;
  declare which data-hosting modes the app supports; share source via mounts
  instead of overlapping path claims.
- **App installers** — install a copy they own, pick where its data lives
  (hosted vs managed), and see updates as an explicit "copy again" choice.
- **File owners** — share a single artifact with a person or a link (with
  expiry/revocation) without making anything installable or public.
- **Anonymous visitors** — read link-shared files. Nothing else, ever
  (invariant 9).

## Goals

1. Every app occupies exactly one root under the `Apps/` tree; publishing a
   root that overlaps any other app's root fails with 409 (validation that
   does not exist today).
2. `app.yaml` (loader owned by iw9-f4) is the manifest source of truth for
   authored fields; `paths[]` extras are gone — extra content arrives via
   mounts (D19), enforced by a grep gate on `paths` in app code.
3. Personal is a real app row with real storage, and promote-out is one
   operation: VFS subtree moves, platform assigns a new appId, slug re-points
   — user-visible as "make this its own app" (D7).
4. Install produces a copy (manifest + folder) in the installer's workspace,
   pinned; deleting the origin does not break an existing install; updates
   surface as "v(N) available → copy again" (D8).
5. Apps declaring >1 hosting mode prompt an install-time pick; single-mode
   apps skip the prompt; the chosen mode is immutable on the install record
   (D2, invariant 10; storage on iw9-f2's shared partition).
6. `vfs` supports person-shares and link-shares with HMAC-hashed keys, expiry,
   and revocation from day one; `visibility` (installable) and artifact
   sharing (viewable) are independent (D20). Anonymous access is read-only,
   link-shared files only (invariant 9).
7. Mounts are reachable: procedures + UI over `addMount`/`removeMount`
   (`vcs/mounts.ts`, 721 LOC, zero non-test callers today — verified).
8. The sidebar leads with FILES + an Apps launcher (icons required, D6);
   native surfaces are demoted from the front door.
9. Migration: every existing app with `paths[]` extras is converted to
   root + mounts; every existing install is converted to copy semantics; both
   with explicit validation tasks.

## Non-Goals

- **No `releases.ts` / version-history changes** — iw9-a owns and deletes
  them. Our install pin references A's release-as-tag interface (or commit
  ids, which exist regardless of sequencing).
- **No grant/capability enforcement** — we define and store capability fields
  (via F4's schema); iw9-c (Wave 2) enforces them. No install-card capability
  UI (the card itself is C's).
- **No app→app calls** — mounts are the code-sharing answer (D19: apps never
  mount apps).
- **No `app.yaml` loader/validator, slug rules, URL scheme, or icon-fallback
  renderer implementation** — iw9-f4 owns those; we consume them.
- **No shared-partition storage machinery, metering, or caps** — iw9-f2 owns
  it; we record the install-time pick against its interface.
- **No anonymous records, writes, workflow calls, or partitions** (invariant
  9 — restated here because sharing is where it would leak).
- **No organizations, multi-region, cross-deployment app export.**

## Capabilities

### New Capabilities

- `app-roots`: root-per-app `Apps/` tree; the root is the app's whole path
  binding; overlap validation; `paths[]` extras retired in favor of mounts.
- `personal-app`: Personal as a real app row with real storage; first-class
  promote-out (move subtree, assign id, re-point slug).
- `app-data-hosting`: hosted/managed mode declaration (manifest) +
  install-time pick + immutable recording; loud publisher-hosted disclosure.
- `artifact-sharing`: vfs person- and link-sharing; HMAC-hashed share keys;
  expiry + revocation; anonymous = read link-shared files only; split from
  `visibility`.
- `vfs-mounts`: mount procedures + management UI over the existing
  `vcs/mounts.ts` engine.
- `app-launcher`: sidebar IA — FILES + Apps launcher with icons; native
  surfaces demoted.

### Modified Capabilities

_(Defined in `openspec/changes/app-model-split/specs/` — the current model,
not yet synced to `openspec/specs/`; deltas below modify those requirements.)_

- `app-install-lifecycle`: install-as-copy replaces reference-and-pin +
  serve-from-origin; update = explicit re-copy; origin-deletion tolerance.
- `apps-native-surface`: the apps surface remains, but the launcher (not the
  surface list) becomes the sidebar's primary projection.

## Constraints & Assumptions

- **External deps**: iw9-f2 `shared-partition` (hosting-mode storage +
  install-record immutability hooks), iw9-f4 `app-identity` (app.yaml
  loader, ULID minting, slug rules, icon fallback). Interfaces are pinned in
  the tech plan; if F2/F4 have not landed, our tasks stub against their
  documented shapes.
- **Serialization**: do not touch `apps/releases.ts` or entry-version helpers
  (`apps/store.ts:422-451`) — iw9-a deletes them. `apps/store.ts`,
  `apps/service.ts`, `apps/capabilities.ts` are ours in Wave 1; iw9-c rebases
  on our landed manifest shapes.
- **Rebase note**: `shareAllows` keying on mutable `app.name`
  (`apps/store.ts:499`) is fixed by iw9-f6 — we rebase on appId-keyed shares
  and must not re-introduce name keying.
- Assumption (unconfirmed): one Personal app per workspace (not per member) —
  per-member private files already live in `.users/<sub>` (per-user-space
  spec); Personal-the-app owns shared one-off widgets/flows.
- Assumption (unconfirmed): the `Apps/` tree name is literally `Apps/`
  (capitalized) in the VFS; slug = directory name under it (D4 is F4's).
- Assumption (unconfirmed): migration runs as a one-shot script at deploy
  (the codebase's established nuke-and-reseed posture per app-model-split),
  not a lazy per-request shim.

## Open Questions

1. **Personal app cardinality** — one per workspace (recommended: yes; the
   per-member private space already exists as `.users/<sub>`, and a
   per-member Personal would recreate the N-manifest problem app-model-split
   rejected) or one per member?
2. **Copy-install collision** — when `Apps/<slug>` already exists in the
   installing workspace at install time, auto-suffix the slug (recommended)
   or fail and ask?
3. **Share-link TTL default** — links require an expiry from day one; default
   7 days with a "no expiry" explicit choice (recommended), or mandatory
   expiry always?
