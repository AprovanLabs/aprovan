# Tasks — app-model-split (IW-1)

Repo root: `/Users/jacob/Documents/Code/AprovanLabs/aprovan`. Two parallel lanes:
**server** (streams 1 → 2 → 3, sequential — they share `apps/service.ts` and
`apps/store.ts`) and **client** (streams 4 → 5, buildable against the tech-plan wire
contract from day one). Stream 6 integrates. Stream 3's profile-binding tasks additionally
require IW-0 `execution-plane-unfork` merged (registry-server consumed from npm); everything
else in this change is IW-0-independent. Nuke-and-reseed: no task migrates name-keyed data.

## 1. Server: identity, ID-keyed storage, Personal deletion

> Depends-on: - | Touches: server/workspace/src/apps/identity.ts, server/workspace/src/apps/store.ts, server/workspace/src/apps/releases.ts, server/workspace/src/apps/personal.ts, server/workspace/src/apps/service.ts, server/workspace/src/apps/sdk.ts, server/workspace/src/apps/usage.ts, server/workspace/src/routes/live-apps.ts, server/workspace/src/routes/apps.ts, server/workspace/scripts/reseed-apps.ts, server/workspace/tests/app-identity.test.ts, server/workspace/tests/apps*.test.ts, server/workspace/package.json | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test && ! grep -rn "PERSONAL_APP_NAME\|isPersonalApp\|\.personal" /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace/src

- [x] 1.1 Create `apps/identity.ts` per the tech-plan interface: `mintAppId`/`mintInstallId`
      (add the `ulid` dependency), alias records `svc#apps#alias / <name> → {appId}`,
      `resolveAppRef` (ULID passthrough or alias lookup, 404 on miss), `setAlias` (409 on
      collision), `dropAlias`. Unit tests: mint uniqueness/sortability, alias round-trip,
      collision 409 (spec app-identity "mutable alias"; tech-plan D1).
- [x] 1.2 Re-key `apps/store.ts`: `AppManifest` gains `appId` + `originAppId?`, loses
      `dataScope`; manifests stored at `svc#apps / <appId>`; `saveApp` writes manifest +
      alias; `readApp(workspaceId, appId)`; `listApps` unchanged shape but id-keyed; delete
      the legacy folder-shape rebinding in `readApp` (spec app-identity "Nothing name-keyed
      remains"). Releases: scope `svc#apps#releases#<appId>`, `AppRelease` gains embedded
      `manifest` snapshot (tech-plan D2).
- [x] 1.3 Re-key per-user data derivation: `appDataDir(id, sub)` → `.apps/<id>/data/<sub>`,
      record scopes `app#<appId>#u#<sub>`; `apps/usage.ts` counters and `apps/sdk.ts`
      generation take ids (tech-plan D3 — guard re-root itself is stream 2; here only the
      writers move).
- [x] 1.4 Delete `apps/personal.ts` and every `isPersonalApp`/`PERSONAL_APP_NAME` branch and
      Personal composition in `apps/service.ts` (`describePersonal`, list/summary/get/
      capabilities/data/publish/remove special cases). `apps.list` returns only real apps
      (spec per-user-space "The Personal pseudo-app is deleted").
- [x] 1.5 Rewire `apps/service.ts` to ids: every procedure resolves `args.app` via
      `resolveAppRef` at the top; add `apps.rename {app, name}` (alias move, 409, keeps
      storage — spec scenario "Rename moves no storage"); publish reuses `appId` on update,
      mints on create; wire shapes gain `appId` (and keep `name`).
- [x] 1.6 Routes: `routes/live-apps.ts` resolves `/:workspaceId/:name` through the alias
      index and adds `/apps/id/:appId` permalink for page, `__project__`, and `__sdk__.*`;
      `routes/apps.ts` (public consumption surface) same treatment (spec app-identity "Live
      URLs keep the alias form").
- [x] 1.7 Write `scripts/reseed-apps.ts`: drop name-keyed scopes (`svc#apps` name keys,
      `svc#apps#releases#<name>`, `svc#apps#installed`, `app#<name>#u#*`) for a workspace
      and reseed fixtures with minted ids; wire into `bootstrap:local` (tech-plan Rollout 1).
- [x] 1.8 Tests (`app-identity.test.ts` + updates to `apps.test.ts`/`app-domain.test.ts`/
      `live-apps.test.ts`; delete `apps-personal.test.ts`): publish mints ULID; republish
      keeps it; rename keeps releases + per-user data readable and installs resolvable
      (seed an install record directly); alias collision 409; old alias URL 404s, new alias
      + permalink serve; no name-keyed key written (assert on record-store keys).

## 2. Server: per-user space and workflow ownership

> Depends-on: 1 | Touches: server/workspace/src/apps/store.ts, server/workspace/src/apps/service.ts, server/workspace/src/services.ts, server/workspace/src/svc-records.ts, server/workspace/src/routes/fs.ts, server/workspace/src/workflows/store.ts, server/workspace/src/workflows/service.ts, server/workspace/tests/partition-access.test.ts, server/workspace/tests/user-space.test.ts, server/workspace/tests/workflow-visibility.test.ts | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test

- [x] 2.1 Re-root the partition guard in `apps/store.ts`: constants `APP_DATA_ROOT =
      ".apps"`, `USER_SPACE_ROOT = ".users"`; `hiddenDataPrefixes`/`partitionAccess` match
      the two roots structurally (owner = `<sub>` segment: `.apps/<id>/data/<sub>/…`,
      `.users/<sub>/…`) — delete the manifest-listing cache from the guard path (tech-plan
      D3). Keep signatures and 404 semantics from data-auth-model (spec per-user-space
      "Foreign partition stays unprobeable").
- [x] 2.2 Private space plumbing: `userSpaceDir(sub)`; record scope `user#<sub>` with
      `assertCallerScope` extended so `user#` is only ever self-addressed; listings
      (`services.ts` vfs list, `routes/fs.ts` GET /fs) include the caller's own `.users`
      space and hide all foreign partitions under both roots (spec "Every member has a
      private per-user space"). No admin override: verify `apps.data` cannot address
      `.users/**` and no other procedure serves it.
- [x] 2.3 Re-key `apps.data` in `apps/service.ts` to `appId` (scope prefix
      `app#<appId>#u#`, file partitions `.apps/<appId>/data/<user>`), keeping the
      admin-gate + audit behavior; the personal rejection branch is gone with stream 1.
- [x] 2.4 Workflow ownership: `workflows/store.ts` listing filters to
      `createdBy === caller` unless the workflow is exported by some app (compute the
      exported set from `listApps`); running another member's unexported workflow by name is
      not-found; `workflows.list` annotates `exportedBy: appId[]` (spec "Unpublished
      workflows live in their creator's private space"; tech-plan D8 + risk note).
- [x] 2.5 Tests: foreign 404 on both planes under both new roots incl. version-pinned reads;
      own `.users` space listed, foreign never; snapshots/restore exclude both roots;
      `user#` scope self-only; workflow visibility per 2.4 scenarios (owner sees + runs,
      non-owner not-found, exporting flips visibility).

## 3. Server: dependencies, install lifecycle, directory

> Depends-on: 2; profile-binding tasks (3.2, 3.3) also require IW-0 execution-plane-unfork merged | Touches: server/workspace/src/apps/capabilities.ts, server/workspace/src/apps/install.ts, server/workspace/src/apps/directory.ts, server/workspace/src/apps/service.ts, server/workspace/src/routes/live-apps.ts, server/workspace/src/profile-grants.ts, server/workspace/tests/app-dependencies.test.ts, server/workspace/tests/app-install.test.ts, server/workspace/tests/app-directory.test.ts | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test

- [x] 3.1 Dependencies in `apps/capabilities.ts`: parse/validate `requires` at publish
      (contract must exist in the interface catalog; 400 otherwise); extend
      `assertAllowedTools` to accept exact `contract.procedure` entries for declared
      contracts (wildcards stay rejected with the tier message); `apps.capabilities` gains
      the `dependencies` section (contract, optional, boundProfile?, fulfilled) (spec
      app-dependencies; tech-plan D4).
- [x] 3.2 Rewrite `apps/install.ts` to the `AppInstallation` record (tech-plan Interfaces):
      ULID-keyed `svc#installs / <installId>`, `originAppId`/`originWorkspaceId`, pin
      (channel default `live` | release), `resolvedRelease`, `bindings`, `config`,
      `editing: false`, delete `assertInstallable`/`installKey`/`dataScope` gating.
      Binding resolution at install: explicit profile or the contract's tenant `default`
      profile; unfulfilled non-optional requirement → 400 naming the contract (spec
      app-dependencies "Installation binds each interface requirement").
- [x] 3.3 Grant mirroring: bind writes `grants.grant(tenant, profileId, {kind: "app", id:
      installId})` via registry-storage, unbind revokes; app-session dispatch on a declared
      contract resolves the binding and executes through the profile, denied when the grant
      is revoked; degrade path when `profileGrantsAvailable()` is false: install-side-only
      binding + `fulfilled: "ungated"` in capabilities (tech-plan D5 + risk).
- [x] 3.4 Lifecycle procedures in `apps/service.ts`: `apps.install` (any public app, or own
      workspace's app; private-elsewhere → 404), `apps.update {install, release?, force?}`
      re-resolving the pin with old→new report and origin-unavailable error, `apps.configure`
      (bindings/config/editing), `apps.uninstall {install, purgeData?}`, `apps.installed`
      with `available` flag (specs app-install-lifecycle; tech-plan D2/D6).
- [x] 3.5 Serve-from-origin + fork: default installs serve the pinned release's content from
      the origin workspace's FS (extend `routes/live-apps.ts` resolution; cache immutable
      release lookups); `editing: true` materializes the release's files under the chosen
      prefix and flips serving local; post-edit origin update requires `force` (spec
      "Installs are forks with editing off by default").
- [x] 3.6 `apps/directory.ts`: write-through index `svc#directory / <appId>` in the
      `__deployment__` tenant, synced from `saveApp`/`removeApp`/`setChannel`/visibility
      changes; `apps.directory` merges index + caller's own apps; `__deployment__` rejected
      as a caller workspace id (tech-plan D7).
- [x] 3.7 Tests: publish/validate requires; install with default/explicit/missing profile;
      rebind without reinstall; revoke cuts execution; channel update old→new; config
      survives update; private-app install 404; fork materialization + force semantics;
      directory add/remove on visibility flip; two installs distinct (spec scenarios across
      app-dependencies + app-install-lifecycle).

## 4. Client packages: apps-store wire and shared panels

> Depends-on: - (build against the tech-plan wire contract; integration asserts in stream 6) | Touches: packages/ui/src/apps-store/**, packages/registry-ui/src/apps-panel.tsx, packages/registry-ui/src/apps/** | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/ui typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-ui typecheck && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-ui test && ! grep -rn "PERSONAL_APP_NAME\|personalApp\|builtin" /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/ui/src/apps-store /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-ui/src

- [x] 4.1 `packages/ui/src/apps-store/wire.ts` + `catalog.tsx`: delete the Personal
      synthesis/fallback and `builtin` handling; parse `appId`, `installId`,
      `originAppId`, `requires`, and pin fields from the new wire shapes (spec
      per-user-space grep gate; tech-plan Interfaces).
- [x] 4.2 `registry-ui` `apps-panel.tsx`: pane variant — opens on the grouped list (Your
      apps / Installed / Your flows (private) / Directory), in-pane list↔detail navigation,
      props confined to injected transports (`NativePanelProps`-compatible) (spec
      apps-native-surface "App selection lives inside the pane"; ux.md Apps pane).
- [x] 4.3 `registry-ui` `apps/app-detail.tsx`: remove all `builtin` branches; add the
      Dependencies section to the Access tab (contract, optional, bound profile,
      unfulfilled warning + re-bind CTA); add Install settings section for installations
      (pin chip + update, bindings pickers, config editor, editing toggle with the
      overwrite warning); header gains id permalink + lineage line (ux.md detail screen).
- [x] 4.4 Directory + install sheet components in `registry-ui`: entry cards with
      dependency chips, install sheet with pin selector and per-contract profile rows
      (disabled-until-bound, "Create profile" link when unresolvable) (ux.md install flow).
- [x] 4.5 Package tests: wire parsing round-trips id/lineage/requires; list has no
      synthesized entries on empty input; install sheet disables until non-optional
      requirements bound.

## 5. Client web: apps surface, sidebar, private section

> Depends-on: 4 | Touches: client/web/src/lib/native-surfaces.tsx, client/web/src/components/SidebarApps.tsx, client/web/src/components/ChatPage.tsx, client/web/src/lib/private-partition.ts, client/web/src/lib/tools.ts, client/web/src/components/panels/** | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web build && ! grep -rn "SidebarApps\|patchwork:sidebar-apps\|\.personal" /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web/src

- [x] 5.1 Add the `apps` surface: new `components/panels/AppsPanel.tsx` thin wrapper (the
      credentials-panel pattern — inject transports, host the registry-ui pane variant) and
      the `{id: "apps", title: "Apps", icon: LayoutGrid, Panel: AppsPanel}` entry first in
      `NATIVE_SURFACES` (spec apps-native-surface "apps is a native surface"; tech-plan D9).
- [x] 5.2 Delete `SidebarApps.tsx`; keep the plain surface rows (relocate
      `WorkspaceSurfaces` into the sidebar host), drop the split-pane geometry, drag
      handle, persisted `patchwork:sidebar-apps` layout, and the ChatPage props that only
      fed it (selection mirroring, `onOpenScript` into the sidebar) (spec "The SidebarApps
      sub-group is deleted").
- [x] 5.3 Re-root `lib/private-partition.ts` to `.users/<sub>` (constant + detection +
      display mapping unchanged otherwise); confirm tree rendering and raw-path round-trip
      (spec per-user-space "Client private-section mapping follows the new root").
- [x] 5.4 Publish-funnel copy: the "share a flow" affordance in the apps pane's Your-flows
      group prefills an `apps.publish` chat prompt (ux.md private-space flow step 3).

## 6. Integration, reseed verification, docs

> Depends-on: 3, 5 | Touches: server/workspace/tests/app-integration.test.ts, docs/**, openspec/changes/app-model-split/** | Verify: pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test && pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web build && ! grep -rn "PERSONAL_APP_NAME\|PERSONAL_PREFIX\|isPersonalApp\|\.personal" /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace/src /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web/src /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/ui/src /Users/jacob/Documents/Code/AprovanLabs/aprovan/packages/registry-ui/src

- [x] 6.1 End-to-end integration test: workspace A publishes a public app with `requires:
      [{contract: "sql"}]` + a provider grant → B sees it in the directory → installs with
      the default profile → app session reads/writes land in `.apps/<installId>/data/<sub>`
      and `app#<installId>#u#<sub>` → A renames the app → B's install still resolves,
      updates, and serves (the full spec chain across all four server capabilities).
- [x] 6.2 Run the reseed script against a seeded legacy-shaped workspace fixture and assert
      a clean boot with zero name-keyed keys remaining (tech-plan Rollout 1).
- [x] 6.3 Registry-boundary test: assert the only registry-server calls made by app flows
      are profile/grant operations with opaque `{kind: "app", id}` subjects — no manifest,
      name, or app schema crosses (spec app-identity "Registry stays app-ignorant").
- [x] 6.4 Docs: update the app-data / native-surfaces docs sections that describe Personal,
      `(workspace, name)` identity, `dataScope`, and the sidebar apps group to the shipped
      model; note the inert-bundle export/import as explicit future direction (PRD
      Non-Goals).
