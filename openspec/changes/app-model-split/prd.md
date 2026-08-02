# PRD — app-model-split (IW-1)

> IW-1 of the improve wave. Zero-context sources of truth:
> [docs/tasks/improve-findings.md](../../../docs/tasks/improve-findings.md) §1 (the two-entity
> model and the settled decisions 1, 2, and 5 are owner-confirmed — this change implements
> them, it does not reopen them) and [docs/tasks/refactor-decisions.md](../../../docs/tasks/refactor-decisions.md)
> decision 7 (Profiles). **Requires IW-0 `execution-plane-unfork` complete** (this change
> consumes `@aprovan/registry-server` Profiles/grants from npm, not the fork). Gates IW-4
> `native-panel-polish` (the `apps` surface must exist before the panel pass).

## Problem

An "app" today is one workspace-scoped manifest record doing three jobs at once: identity is
the collision-prone mutable tuple `(workspaceId, name)`, installation is a data-scope escape
hatch (`apps.install` accepts only `dataScope: "workspace"` apps, with no UI, no dependencies,
no update flow), and per-user data hides behind a synthesized `Personal` pseudo-app whose
`.personal` prefix literal is triplicated across three files. Renaming an app would strand its
storage, nothing declares what an app needs to run, there is no way to discover or install
another workspace's app, and the client has no `apps` surface — a bespoke 344-LOC sidebar
sub-group breaks the namespace = surface invariant instead.

## Users & Jobs

- **App publishers** hire apps to be real installable units: durable identity that survives
  renames, declared dependencies, releases/channels that installs pin, and a public listing
  other workspaces can install from.
- **Workspace members installing an app** hire the install flow to answer "what does this app
  need, and which of my Profiles fulfills each need" — then get a working app whose data lives
  in their workspace, pinned to a release, updatable on their schedule.
- **Enterprise admins** hire declared dependencies + Profile binding as the isolation story:
  an app declaring `sql` runs against *their* database profile; granting a profile IS the
  credential grant, in one place.
- **Individual members** hire the private per-user space for unpublished workflows and files —
  "mine, visible only to me" — without a fake "Personal app" brand around it.
- **The owner/maintainer** hires this change to restore two invariants: storage is ID-keyed
  everywhere (no rename migrations, ever), and every native namespace is a native surface.

## Goals

1. **Two entities.** `App` (installable unit) and `AppInstallation` (workspace binding) are
   distinct records with distinct lifecycles. Every app gets a ULID at creation; forks and
   installs mint their own ULID with an `originAppId` lineage pointer. `(workspaceId, name)`
   is a mutable alias: renaming an app changes zero storage keys and breaks zero installs.
2. **ID-keyed storage everywhere.** Record scopes (`app#<appId>#…`), install keys, and VFS
   data-partition roots derive from the ULID, not the name. Verified by tests that rename an
   app and assert its data, installs, and releases are untouched.
3. **Declared dependencies, Profile-fulfilled.** An app declares interface-contract
   requirements, provider requirements, and native capability tiers (the existing three-tier
   `capabilities.ts` model, extended not replaced). Installation binds each interface
   requirement to a tenant Profile — native-backed by default — and granting the profile is
   the credential grant. No new grant mechanism.
4. **A real install lifecycle.** Any installable app can be installed regardless of data
   scope; installs pin a release or channel, carry per-install config, update explicitly, and
   are forks with editing off by default.
5. **Personal is deleted.** The pseudo-app, its synthesis, and the triplicated prefix literal
   are gone (`! grep -rn "PERSONAL_APP_NAME"` across server + client + packages passes). Two
   primitives replace it: per-app per-user opaque partitions, and a private per-user space
   for unpublished workflows/files. Publishing anything requires an app.
6. **Deployment-wide directory.** The workspace server serves a directory of every
   `visibility: public` app in the deployment; public = installable. The registry never
   learns about apps — grant subjects remain opaque IDs.
7. **`apps` is a native surface.** `native-surfaces.tsx` gains `{id: "apps", Panel: AppsPanel}`
   with select-app-on-open inside the pane; the bespoke `SidebarApps` apps sub-group is
   deleted. Namespace = surface holds for every core service with a UI.

## Non-Goals

- **No cross-deployment sharing.** If ever wanted, it is export/import of an inert app bundle
  (files + manifest, versioned archive) between deployments — file transport, no registry.
  Mentioned as future direction only; not specified or built here.
- **No registry-side app awareness.** No catalog publishing, no app schema in
  `@aprovan/registry-server` — `GrantSubjectKind: "app"` consumes ULIDs as opaque principals.
- **No Profile schema or resolver work** — WS-3 delivered it; IW-0 delivers it as a published
  package. This change consumes.
- **No back-compat, no rename migrations.** Nuke-and-reseed posture (decision 3): existing
  name-keyed records are not migrated; workspaces are reseeded.
- **No panel UX rebuild** beyond the new `apps` surface wiring — copy/polish across panels is
  IW-4.
- **No editor/staging changes** (IW-2), **no desktop host** (post-IW-1; the capability model
  is designed so `host: desktop` tiers are additional entries, not a parallel system).
- **No change to the app tool proxy's three-tier enforcement semantics** — call-time checks
  keep working as today, re-keyed by ID.

## Capabilities

### New Capabilities

- `app-identity`: the App/AppInstallation split — ULID minted at creation, `(workspaceId,
  name)` as mutable alias, fork/install lineage (`originAppId`), and ID-keyed storage (record
  scopes, install keys, VFS partition roots) under nuke-and-reseed.
- `app-dependencies`: declared dependencies (interface contracts, provider requirements,
  native capability tiers extending the existing three-tier model) and their fulfillment by
  binding tenant Profiles at install time; capability reporting stays truthful.
- `app-install-lifecycle`: install/uninstall/update/configure/fork — release/channel pin,
  per-install config, editing off by default — plus the deployment-wide directory
  (`visibility: public` = installable) served by the workspace server.
- `per-user-space`: Personal pseudo-app deletion; per-app per-user opaque partitions
  (generalized `<appDataRoot>/<sub>`); the private per-user space for unpublished
  workflows/files; publishing requires an app.
- `apps-native-surface`: the `apps` NativeSurfaceDef, select-app-on-open, SidebarApps
  sub-group deletion, and the restored namespace = surface invariant.

### Modified Capabilities

None — `openspec/specs/` is empty; all specs in this change are new. (The
`data-auth-model` change's `per-user-data` delta spec is still unsynced in its change folder;
`per-user-space` here supersedes its Personal-specific language — reconcile at sync time.)

## Constraints & Assumptions

**Constraints (settled, owner-confirmed):**

- Identity: ULID per app minted at creation; alias mutable; forks/installs mint their own
  ULID + `originAppId`; storage ID-keyed everywhere; nuke-and-reseed (settled decision 1).
- Distribution: registry never knows about apps; deployment-scoped directory v1 (settled
  decision 2).
- Personal: deleted; opaque per-app per-user partitions + private per-user space; publishing
  requires an app (settled decision 5).
- Hard dependency: IW-0 complete — `@aprovan/registry-server` (Profiles, grants,
  `GrantSubjectKind: "app"`) consumed from npm; a fresh clone builds.
- IW-4 is gated on this change's `apps` surface; keep the surface's panel contract
  (`NativePanelProps`) unchanged so IW-4 stays pure UX.

**Assumptions (flagged, not owner-confirmed):**

- Live-app URLs keep the alias tuple (`/apps/:workspaceId/:name`) as the human-facing form,
  with an ID permalink added; alias resolution happens at the route edge only.
- Per-user *file* enforcement semantics (deny-as-404, own-partition visibility, audited
  `apps.data`, no personal override) carry over from `data-auth-model` unchanged — this
  change re-keys and re-homes the partitions without reopening those decisions.
- The existing `AppsPanel` in `@aprovan/registry-ui` is the pane for the new surface
  (variant work stays inside the package); no new panel is written from scratch.
- Existing workspaces are reseeded (dev/preview-scale deployments only); no production
  tenant requires data carry-over.

## Open Questions

1. **Does `dataScope: "owner" | "workspace"` survive as a manifest field?** The install split
   subsumes its meaning (use-in-place vs install-into-your-workspace). _Recommendation:_
   delete the field; "owner-hosted" is simply an app you use without installing, and
   installation is available for any installable app. Spec'd this way.
2. **Where do unpublished workflows land when Personal dies?** They stop being
   workspace-visible: each registration belongs to its creator's private space until an app
   exports it. Members lose ambient sight of each other's unbundled workflows.
   _Recommendation:_ accept — "publishing requires an app" is the settled posture, and the
   old behavior was the conflation being deleted. Spec'd this way.
3. **Data-partition root shape**: ID-keyed root `.apps/<appId>/…` (decoupled from authored
   source paths) vs today's `<paths[0]>/data`. _Recommendation:_ ID-keyed `.apps/<appId>/…` —
   it is what makes renames and source moves storage-neutral; source paths stay human.
   Spec'd this way; tech-plan D3 carries the alternatives.
4. **Should the directory require admin approval to list a public app deployment-wide?**
   _Recommendation:_ no for v1 — `visibility: public` is already an explicit publisher act;
   revisit when deployments have untrusted workspaces.
