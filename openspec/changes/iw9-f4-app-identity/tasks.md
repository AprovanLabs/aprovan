# Tasks — iw9-f4-app-identity

External dependencies (declare before any stream starts):
- `yaml` npm package — new dependency of `@aprovan/workspace` (T1; parse with positions). Added in stream 1.
- No registry-repo work and no package publishes: every stream below is `Repo: aprovan` (IW-9 Cross-repo coordination table: F4 has no registry column entry). Per rule 4, deletion/leak grep-gates still run in BOTH checkouts.
- Verify commands run from the aprovan repo root (`/Users/jacob/Documents/Code/AprovanLabs/aprovan`); the registry checkout is at `/Users/jacob/Documents/Code/AprovanLabs/registry`.
- New tests go in new files (never appended to existing test files).

## 1. app.yaml loader/validator (Zod-over-YAML)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/manifest.ts, aprovan/server/workspace/tests/app-manifest.test.ts, aprovan/server/workspace/package.json | Verify: pnpm --filter @aprovan/workspace test -- tests/app-manifest.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 1.1 Add the `yaml` package to `@aprovan/workspace` dependencies (tech-plan T1).
- [ ] 1.2 Create `server/workspace/src/apps/manifest.ts`: `AppYamlSchema` per tech-plan Interfaces (slug?, title?, description?, icon?, capabilities?, requires? reusing the `AppRequirement` shape from `apps/store.ts:142-146`, hostModes with default `["managed"]`), `.strict()` so unknown top-level keys fail naming the key (spec app-manifest "unknown key rejected").
- [ ] 1.3 Add the platform-field rejection: superRefine rejecting `appId`, `createdAt`, `updatedAt`, `createdBy`, `channels`, `paths`, `entry` with an "identity is platform-assigned; never appears in app.yaml" message (spec app-manifest "appId in file rejected", "derived timestamp rejected"; D3).
- [ ] 1.4 Implement `loadAppYaml(content)` returning `{ ok: true, value } | { ok: false, issues: [{ path, message }] }`; YAML parse failures carry the parse position and produce no partial manifest (spec "malformed YAML rejected with position").
- [ ] 1.5 Validate `icon` when present: named identifier or app-root-relative path; reject traversal and absolute paths (spec app-icon "escaping icon path rejected").
- [ ] 1.6 New test file `tests/app-manifest.test.ts` covering every app-manifest and app-icon validation scenario (valid parse, unknown key, each platform field, malformed YAML position, icon traversal, hostModes default).

## 2. Slug rules and slug registries

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/slugs.ts, aprovan/server/workspace/tests/app-slugs.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-slugs.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 2.1 Create `server/workspace/src/apps/slugs.ts` with `assertValidSlug`: existing `NAME_RE` shape (`apps/store.ts:167`) AND NOT `isAppId(slug)` from `apps/identity.ts:36-38` — one ULID definition, no second regex (tech-plan T4; spec app-slug "ULID-shaped slug rejected", "26-char non-base32 slug accepted").
- [ ] 2.2 Implement the global slug claim registry on `svc#slugs/<globalSlug>` under `DEPLOYMENT_TENANT` (pattern of `svc#apps/byId`, `identity.ts:90-91`): `claimGlobalSlug` (409 naming the holder when taken), `releaseGlobalSlug` (holder-only), `resolveGlobalSlug` (tech-plan T6; spec app-slug "claim granted once").
- [ ] 2.3 Implement `resolveWorkspaceSlug(wsSlug)` reading `svc#wsSlugs/<wsSlug>` under `DEPLOYMENT_TENANT`; resolver only — nothing in F4 writes entries, unresolved returns undefined (tech-plan T6; PRD assumption: no ws-slug exists today).
- [ ] 2.4 New test file `tests/app-slugs.test.ts`: shape rules incl. ULID-shape fixtures (a real `ulid()` output rejected; 26-char strings with `u`/`i`/`l`/`o`/hyphen accepted), claim/409/release lifecycle, holder-only release, unresolved wsSlug.

## 3. Reconcile entry point and record projection

> Depends-on: 1, 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/reconcile.ts, aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/src/apps/identity.ts, aprovan/server/workspace/src/apps/directory.ts, aprovan/server/workspace/tests/app-reconcile.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-reconcile.test.ts tests/app-identity.test.ts tests/app-directory.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 3.1 Extend the `svc#apps/<appId>` record shape additively in `apps/store.ts`: `slug`, `root` (binding key), `declared` (last-reconciled `AppYaml` snapshot); keep every existing `AppManifest` operational field — F4 adds, never removes (tech-plan T3; iw9-b rebases on this shape).
- [ ] 3.2 Create `server/workspace/src/apps/reconcile.ts` exporting `reconcileApp(input: ReconcileInput): Promise<ReconcileResult>` exactly per the tech-plan contract, subsuming the four-write fan-out (`saveApp` at `store.ts:371-377` → record + `setAlias` + `indexAppLocation` + `syncDirectoryEntry`) behind the one entry point.
- [ ] 3.3 First-sight behavior: no record bound to `root` → `mintAppId()` + create record/alias/location/directory (spec app-manifest "first sight mints ULID"); unchanged input → `changed: false`, zero writes (spec "idempotent re-reconcile").
- [ ] 3.4 Guards: `expectedAppId` mismatch or a root binding to an `appId` owned by another root → 400 naming root + id, never re-mint/adopt (spec "foreign id rejected", "duplicated root binding rejected"); `yaml.slug` present and ≠ basename(root) → 400 stating directory name is authoritative (tech-plan T2; spec app-slug "mismatched explicit slug rejected"); slug fails `assertValidSlug` → 400; slug held by a different app in the workspace → 409 naming the holder, both bindings unchanged (spec "slug collision rejected").
- [ ] 3.5 Rename-as-mv: reconcile of the same `root`'s parent with a new basename (or a moved root carrying the same bound record) rebinds the alias to the same `appId` and drops the old binding — no storage-key rewrites (spec "rename preserves identity"; existing `setAlias`/`dropAlias` semantics, `identity.ts:65-83`).
- [ ] 3.6 Directory projection: `DirectoryEntry` (`apps/directory.ts:24-33`) gains `icon?` and `slug` fields (additive; `name` retained) so launchers render icons without reading `app.yaml` (spec app-icon "directory exposes icon").
- [ ] 3.7 Wire global-claim release into unpublish/remove paths (`syncDirectoryEntry` visibility drop, `removeApp`) so an unpublished/removed app's global slug frees (spec app-slug "unpublish releases claim").
- [ ] 3.8 New test file `tests/app-reconcile.test.ts` covering every scenario in 3.3-3.7, plus: existing `tests/app-identity.test.ts` and `tests/app-directory.test.ts` pass unmodified.

## 4. Icon fallback shared function

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/ui/src/apps/app-icon.ts, aprovan/packages/ui/src/apps/__tests__/app-icon.test.ts | Verify: pnpm --filter @aprovan/ui test -- app-icon && pnpm --filter @aprovan/ui typecheck

- [ ] 4.1 Create `packages/ui/src/apps/app-icon.ts` as a dependency-free leaf module: `APP_ICON_PALETTE` (12 fixed hex values) and `appIconFallback(slug)` → `{ letter, color }` with letter = first grapheme uppercased, color = `PALETTE[fnv1a32(utf8(slug)) % 12]` (tech-plan T7; D6).
- [ ] 4.2 New test file with golden fixtures: determinism (same slug twice → identical output), distinct slugs map per the normative algorithm (hand-computed FNV-1a fixtures so a second implementation is verifiable against them), rename re-derivation (`recipes` → `cookbook` changes letter and color per spec app-icon "rename changes fallback").

## 5. URL scheme — canonical, vanity, 302 convenience

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/routes/app-urls.ts, aprovan/server/workspace/src/routes/live-apps.ts, aprovan/server/workspace/src/server.ts, aprovan/server/workspace/tests/app-urls.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-urls.test.ts tests/live-apps.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 5.1 Create `routes/app-urls.ts` serving the full live surface (page, `__project__`, `__sdk__.js`, `__sdk__.d.ts`, static + SPA fallback — reusing live-apps.ts handler internals) under `/a/:ref` and `/w/:wsRef/a/:ref`; mount at domain root in `server.ts` beside the existing `/apps` mount (`server.ts:44`) (tech-plan T5; D5).
- [ ] 5.2 Resolution: segment is an id iff `isAppId(segment)`, else slug — `/a/` slugs via `resolveGlobalSlug`, `/w/` wsRef via `resolveWorkspaceSlug` then app slug via `resolveAppRef`; unresolvable → 404; ws/install mismatch → 404 (spec app-url-scheme "id/slug disambiguation", "install surface is workspace-scoped").
- [ ] 5.3 Convert every legacy route in `routes/live-apps.ts` (`/apps/:workspaceId/:name`, `/apps/id/:appId`, and their sub-resources) plus new `/apps/:slug` to resolve-then-302 shims targeting canonical URLs; convenience never serves content (spec "convenience redirect", "legacy permalink redirects", "legacy leak closed").
- [ ] 5.4 Rewrite `buildAppShell` config (`live-apps.ts:411-423`): `liveBase`/`permalinkBase` become canonical (`/a/<appId>` or `/w/<wsId>/a/<installId>`); public app shells embed no workspace id anywhere, incl. the auth-return round-trip; `appBase` for public apps becomes appId-keyed (spec "public shell carries no workspace id").
- [ ] 5.5 Ensure visibility gating (`requireViewer`), channel pinning (`resolvePin`), and install/fork resolution behave identically under canonical prefixes — port, don't reimplement (`live-apps.ts:103-213`).
- [ ] 5.6 New test file `tests/app-urls.test.ts`: redirect matrix (all legacy/convenience forms → 302 with canonical Location), canonical stability across a rename, vanity resolution, 404 paths, and a shell-leak assertion (rendered public shell HTML contains no workspace id).

## 6. Leak gates, full suite, artifact validation

> Depends-on: 1, 2, 3, 4, 5 | Repo: aprovan | Touches: aprovan/openspec/changes/iw9-f4-app-identity/tasks.md | Verify: pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/ui test && ! grep -rn 'apps/${workspaceId}' server/workspace/src/routes/ && ! grep -rn '/apps/id/' server/workspace/src/routes/app-urls.ts && ! grep -rn 'apps/${workspaceId}' /Users/jacob/Documents/Code/AprovanLabs/registry/packages --include='*.ts'

- [ ] 6.1 Grep gate (MIGRATION-DEBT definition of done, run in BOTH repos per Cross-repo rule 4): no route or shell template emits a `/apps/<workspaceId>/…` link — `grep -rn 'apps/${workspaceId}' server/workspace/src/routes/` returns nothing in aprovan, and the same pattern returns nothing under `registry/packages`.
- [ ] 6.2 Region gate: `grep -rn 'region' server/workspace/src/routes/app-urls.ts` shows no region path segment construction (D5/D21: no region in URLs).
- [ ] 6.3 Run the full `@aprovan/workspace` and `@aprovan/ui` suites; fix any regression introduced by streams 1-5 in the stream that owns the touched path.
- [ ] 6.4 Run `openspec validate iw9-f4-app-identity` (if the installed CLI provides it) and resolve any artifact issues; tick all boxes.
