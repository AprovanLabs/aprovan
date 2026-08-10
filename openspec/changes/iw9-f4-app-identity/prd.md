# PRD — iw9-f4-app-identity (Wave 0, F4)

_Elaborates F4 of `openspec/changes/IW-9-APP-FIRST.md` (settled authority; decisions D3, D4, D5, D6). Wave-1 `iw9-b-app-model` builds root-per-app trees, promote-out, and install-as-copy **on top of** the manifest format and reconcile contract defined here._

## Problem

Apps have no authored identity artifact: the manifest is a hand-invisible platform record (`AppManifest` in `server/workspace/src/apps/store.ts`) that mixes human-authored fields (title, description, requires) with platform-derived state (appId, timestamps) in one blob, so agents and humans cannot author, diff, or merge an app declaration as a file. Public app URLs leak workspace ids (`/apps/<workspaceId>/<name>`, served by `routes/live-apps.ts`), and apps have no icon, so the launcher IA planned in Wave 1 has nothing to render. Wave 1 (B) cannot start until the `app.yaml` format and the reconcile contract exist.

## Users & Jobs

- **App authors (humans and agents)**: declare an app — slug, title, icon, description, capability ceiling, requires, host modes — by writing one comment-able, merge-friendly YAML file, and rename an app with `mv`.
- **The platform (reconciler, Wave-1 consumer)**: assign durable identity (ULID) on first sight of a new app root; keep identity and derived state in a record no one hand-writes; reject forged or duplicated identity.
- **App viewers / link recipients**: open an app at a stable public URL that names the app, not the hosting workspace.
- **Launcher / directory UI (Wave 1)**: render every app with an icon — custom when provided, deterministic letter+color fallback otherwise.

## Goals

- `app.yaml` is the single authored source of app declaratives, validated by a Zod-over-YAML schema with actionable errors (path + message per issue). `appId` never appears in `app.yaml`; a file containing `appId` (or any platform-owned field) fails validation (D3).
- Reconcile contract (interface consumed by Wave-1 B): first sight of a new app root mints a ULID and creates `svc#apps/<appId>`; a hand-written duplicate or foreign id is rejected at reconcile, never silently adopted (D3).
- Slug rules enforced at one choke point: workspace-unique, directory name = vanity slug, rename = `mv` (alias move, no storage-key rewrite); slugs shaped like ULIDs (26 Crockford base32 chars) rejected; optional global claim registry for published apps (D4).
- URL scheme live (D5): canonical `/a/<appId>` and `/w/<wsId>/a/<installId>`; vanity `/a/<globalSlug>` and `/w/<wsSlug>/a/<slug>`; convenience `/apps/<slug>` **always 302** to canonical; no region segment anywhere; zero public app URLs containing a workspace id (grep-verifiable: no route emits `/apps/<workspaceId>/…` links).
- Every app renders an icon: custom from `app.yaml`, else first letter + color deterministically hashed from the slug — same slug, same color, everywhere (D6).

## Non-Goals

- **No app tree layout, promote-out, install-as-copy, or sharing** — Wave-1 `iw9-b-app-model` scope. F4 defines the manifest format and reconcile contract as interfaces only.
- **No capability enforcement** — F4 defines the manifest fields (capability ceiling, requires, host modes); enforcement is `iw9-c` (Wave 2).
- **No changes to `apps/releases.ts`** — owned by `iw9-a`.
- **No partition/records changes** — `iw9-f2` scope.
- **No region routing** — D21/edge lookup is out of scope; this change only guarantees URLs stay region-free.
- **No organizations, no multi-region, no app→app calls.**

## Capabilities

### New Capabilities
- `app-manifest`: the `app.yaml` file format (Zod-over-YAML), the authored/derived split against `svc#apps/<appId>`, and the reconcile contract (first-sight ULID minting; duplicate/foreign-id rejection).
- `app-slug`: slug shape and uniqueness rules, rename-as-alias-move, ULID-shape rejection, and the global slug claim registry for published apps.
- `app-url-scheme`: canonical, vanity, and convenience URL routing for apps; 302 behavior; workspace-id leak prohibition.
- `app-icon`: the icon manifest field and the deterministic letter+color fallback.

### Modified Capabilities
None — `openspec/specs/` holds desktop/gateway/voice capabilities; nothing app-identity-shaped exists yet.

## Constraints & Assumptions

- Settled by IW-9 (not re-litigated): YAML as the manifest format, ULID identity, slug/URL/icon rules — D3/D4/D5/D6.
- ULID machinery already exists (`ulid` package, `mintAppId`/`isAppId` in `apps/identity.ts`) and is reused, not replaced.
- The existing alias index (`svc#apps/alias`), deployment-wide location index (`svc#apps/byId`), and directory (`svc#directory`) remain the storage substrate; F4 re-specifies their contracts, it does not migrate storage engines.
- `saveApp` today fans out four writes (record, alias, location index, directory — `apps/store.ts:371-377`); reconcile keeps that fan-out behind one entry point.
- Assumption (unconfirmed): no workspace slug (`wsSlug`) exists today (verified by grep); F4 defines the resolver interface for vanity `/w/<wsSlug>/…` and a minimal workspace-slug source, with full workspace-slug management out of scope.
- Serialization: F4 touches `apps/identity.ts`, `apps/store.ts` (manifest shape), and routes; Wave-1 B rebases `apps/store.ts`/`service.ts` on F4's landed shapes.

## Open Questions

None material — D3–D6 settle format, identity, slugs, URLs, and icons. One resolved-in-plan tension recorded for visibility: D3 lists `slug` as an `app.yaml` field while D4 makes the directory name the vanity slug; the tech-plan resolves this deterministically (directory basename is authoritative; an explicit `slug` field, when present, must equal it or reconcile rejects) rather than reopening the decision.
