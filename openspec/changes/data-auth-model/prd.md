# PRD — data-auth-model (WS-6)

> Workstream WS-6 of the platform refactor ([decision record](../../../docs/tasks/refactor-decisions.md)).
> Decisions 7 (Profiles) and 8 (Groups) are settled and are not relitigated here.
> **Depends on WS-3 `registry-server-extraction`**: the unified Profile primitive and the
> group→profile membership schema land there; this change wires them into the product and UI.

## Problem

Three trust promises the product implies are not actually kept:

1. **"Private" per-user data is only hidden, not protected.** The synthesized Personal app
   (`.personal/data/<sub>/…`) and every app's `<appRoot>/data/<sub>/…` partition are hidden from
   *listings* only — any workspace member who knows (or guesses) an exact path can `vfs.read`,
   overwrite, or delete another member's private data.
2. **The group-grant admin surface lies.** `GroupPrefixGrants` can be written via the admin API
   and UI but is enforced by nothing (`listGrantedPrefixes()` has zero callers) — an admin who
   configures a prefix grant gets a no-op that looks like security. `GroupToolGrants` works but
   is being replaced by group→profile membership (decision 8).
3. **History cannot say where mounted content came from.** Commits exclude mounted prefixes
   ("a commit can't pin what it doesn't own") and `config.ref` defaults to the moving `main`,
   so a commit made over `vendor/charts` is unreproducible and provenance-free.

## Users & Jobs

- **Workspace member** — keeps genuinely private files and records ("my data is mine, even from
  other members"); trusts that what history shows is what existed.
- **Workspace admin** — grants capability by attaching profiles to groups; audits app data through
  explicit, logged procedures instead of ambient file browsing; sees only controls that do something.
- **App user / app publisher** — reads the Access pane and gets the truth about where app data
  lives, who can reach it, and which profile executes provider calls.
- **Auditor / future-self** — opens a commit and can answer "which version of the mounted repo /
  bucket was this built against, fetched from where, when?"

## Goals

1. **Read enforcement, not list hiding.** A member reading, writing, or deleting an exact path
   inside another user's data partition gets 404 — on the tool plane (`vfs.*`) and the HTTP file
   plane (`/fs/*`), including version-pinned (`hash=`) reads. Verified by tests.
2. **Zero dead admin surface.** `GroupPrefixGrants` (table, data layer, routes, admin UI) is gone.
   Every remaining group control is enforced.
3. **Groups grant profiles.** Group capability is administered as group→profile membership
   (schema from WS-3); tool authorization resolves through the WS-3 single auth-time join, and the
   admin UI manages it end to end.
4. **Lineage-complete commits.** Every new commit records, for each mount: a deterministic version
   token (git commit SHA; S3 listing-manifest hash over ETags) and a provenance record
   (`{source, originDomain, retrievedAt}`, mirroring the bundler's provenance manifest shape).
5. **The Access pane stays truthful** through all of the above: partition strings say
   "read-enforced" only once it is, and provider grants name the profile that executes them.

## Non-Goals

- **No general prefix-ACL system.** Path-level grants for arbitrary prefixes died with
  `GroupPrefixGrants` (decision 8); the only file-plane authorization added here is the per-user
  data-partition boundary. (Agent path grants, `ctx.grants.paths`, are unchanged.)
- **No Profiles schema design** — that is WS-3. This change consumes it.
- **No mount-time content mirroring.** Commits record version tokens and provenance for mounted
  content; they do not copy mounted bytes into the FS store, and `vfs.restore` does not restore
  mounted views.
- **No readwrite-git mounts, no CRDT provider** (unchanged v1 mount scope).
- **No retroactive lineage.** Existing commits are not backfilled (nuke-and-reseed posture,
  decision 3).
- **No change to `dataScope: "workspace"` semantics** — installed-app data is workspace-shared by
  design ("the workspace is the user").

## Capabilities

### New Capabilities

- `per-user-data`: per-user private data partitions (Personal + app data) with READ/WRITE/DELETE
  authorization on the file plane; audited admin access; own-partition visibility.
- `group-profile-grants`: groups administer capability as profile membership; GroupPrefixGrants
  deleted; tool authorization via the profile join; admin UI.
- `mount-lineage`: commits/snapshots record mount version tokens, ref resolution, and provenance
  records; surfaced in history.

### Modified Capabilities

None — `openspec/specs/` is empty; all specs in this change are new.

## Constraints & Assumptions

- **Depends on WS-3**: Profile records, group→profile membership storage, and the auth-time
  resolver are WS-3 deliverables. Work stream 3 of tasks.md is blocked until they exist; the rest
  of this change is independent.
- **Paths are given as today's `registry/apps/workspace` locations.** WS-4 moves the product plane
  into the aprovan repo; if WS-4 lands first, the same edits apply at the moved paths. (Assumption:
  WS-6 may execute before, during, or after WS-4 — the design is location-independent.)
- No backwards compatibility required (repo convention). Grant data is not migrated: admins
  recreate group capability as profile memberships (nuke-and-reseed, decision 3).
- The FS store interface (`IFsStore`) is being reworked by WS-5; authorization therefore hooks
  *above* the store interface, never inside a backend.
- Assumption (unconfirmed): denying foreign-partition access with **404** (not 403) is acceptable —
  it closes the existence oracle that list-hiding already tries to close.
- Assumption (unconfirmed): a user's **own** partition becomes visible to them in listings (today
  even your own private files are hidden from you). Flagged in Open Questions.

## Open Questions

1. **Should your own partition appear in file listings?** Today `.personal/data/<you>` is hidden
   from everyone including you. Recommendation: **yes** — surface the caller's own partition in
   `vfs.list`/`GET /fs` (and the chat file tree) so "my private files" is a place, not a secret;
   others' partitions stay invisible. (Spec'd this way; flip one requirement if declined.)
2. **Can workspace admins read app users' *file* partitions through the audited procedure?**
   Records already have `apps.data` (app-admin-gated, audited). Recommendation: extend `apps.data`
   to file partitions with the same gating; **Personal partitions get no admin override at all** —
   private means private. (Spec'd this way.)
3. **S3 mount version token cost:** computing the listing-manifest hash costs one S3 LIST per
   mount per commit. Recommendation: accept it (commits are explicit, low-frequency); degrade to
   `versionToken: null` + provenance-only if the LIST fails. (Spec'd this way.)
