# improve.md — Exploration Findings

_Digest of [improve.md](improve.md) against ground truth (4-agent sweep, 2026-08-02), framed by
the settled boundary in [refactor-decisions.md](refactor-decisions.md): **registry repo =
execution plane** (registry-server, utdk, catalog), **aprovan repo = product plane** (workspace
server, client, infra). npm one-way: aprovan → registry._

## 0. Boundary hygiene — the prerequisite nobody asked for

The improve work assumes the WS-4 boundary; it is not actually finished:

- aprovan carries a **forked byte-copy** of the entire execution plane
  (`packages/{utdk,contracts/*,runtime,bundler,mcp,mcp-core,registry-server}`) instead of
  consuming published `@aprovan/registry-server` (3 files diverged already:
  `registry-server/src/{catalog/default.ts,config/types.ts,server.ts}`).
- ~40 provider `package.json` files in `aprovan/packages/utdk/*` embed **absolute paths into
  the registry checkout** (e.g. `utdk/github/package.json:29` →
  `/Users/.../registry/.registry/github/manifest.json`). Fresh clone does not build.
- `aprovan/.claude/launch.json:36` still launches the gateway from the gutted
  `registry/apps/workspace`; registry `pnpm-lock.yaml` still carries importers for moved
  packages.
- The registry branch `product-plane-removal` (worktree `/private/tmp/registry-product-plane-split`)
  deletes the catalog's credential/admin hosts — **merging it as-is contradicts the Registry
  Credentials item below.** `main` deliberately restored those hosts.

Any app-refactor or credentials work built on the fork deepens the split-brain. Reconcile the
fork → published-package edge first (or in the same change).

## 1. App Refactor — the two-entity model

**Ground truth** (`server/workspace/src/apps/`):

- App = manifest record in the *owning workspace's* record store (`store.ts:86`, scope
  `svc#apps`). Identity is workspace-scoped name; the de-facto global handle is the URL tuple
  `/apps/:workspaceId/:name` (`routes/live-apps.ts`). Collisions across workspaces are possible.
- The **capability model is already strong** (`apps/capabilities.ts:1-26`): three tiers —
  native auto-partitioned namespaces (`vfs, keyvalue, events, notifications, telemetry, agents`),
  exact-procedure provider grants, exported workflows. Validated at publish and call time,
  rendered verbatim by the Access tab.
- `apps.install` exists but is a data-scope escape hatch (`apps/install.ts`): only
  `dataScope:"workspace"` apps, no UI, no deps, no update flow.
- Releases/channels exist (`apps/releases.ts`). Partition enforcement is one rule
  (`appPathAllowed`, `store.ts:346`).
- `.personal` is a synthesized never-stored app (`apps/personal.ts`) whose prefix literal is
  triplicated (`personal.ts:36`, `store.ts:250`, `client/web/src/lib/private-partition.ts:17`);
  it conflates "per-user private partition" with "bucket for unbundled workflows."

**Proposed shape** — split the noun:

```
App (installable unit)                    AppInstallation (workspace binding)
─────────────────────                     ──────────────────────────────────
global id  (origin workspace + name,      { appRef, release|channel pin,
  or registry-issued id)                    vfs prefix (partition),
manifest + releases/channels                profile bindings per declared dep,
declared dependencies:                      per-user opt-in partitions,
  - interface contracts (sql, llm, …)       editing: off by default (fork) }
  - provider requirements
  - native capability tiers
```

- **Dependency fulfillment = Profiles** (decision 7, already schema'd in
  `registry-server/src/storage/types.ts:45-75`). An app declares
  `requires: [{contract, profileName?}]`; installation binds each requirement to a tenant
  profile — native-backed by default, 3rd-party/enterprise API by configuration. No new
  mechanism; this is the enterprise-isolation story from improve.md for free.
- **Origin = owning workspace** (the "open-source installation" framing): the origin instance
  is source of truth for releases; installs are forks pinned to a release/channel, editing
  disabled by default. `install.ts` is the seed; drop its `dataScope` restriction and add
  profile binding + update flow.
- **Per-user data**: generalize the `.personal` partition rule to
  `<appPrefix>/data/<userSub>` (already the shape, `store.ts:225`) as *the* opaque per-user
  partition, SDK-managed. WS-6 (`data-auth-model`) already generalizes Personal into real
  per-user partitions — this rides that. Retire "Personal" as a brand: personal *flows* remain
  per-user; everything published must live in an app.
- **Distribution**: private-to-workspace by default; `visibility: public` makes it installable.
  v1 directory = deployment-wide listing served by the workspace server. Publishing app
  packages to the registry catalog (like providers) is a later, separate step — app semantics
  (roles, channels, VFS) are product-plane; the registry should only ever see them as inert
  artifacts.

**Client side**: `apps` is a `CoreService` with **no** `NativeSurfaceDef` — the exact hole
(`native-surfaces.tsx:64` has 12 surfaces, no `apps`). Add `{id:"apps", Panel: AppsPanel}`,
select-app-on-open inside the pane, and delete the bespoke `SidebarApps` sub-group (344 LOC of
one-off geometry). Restores the "namespace = surface" invariant from
`registry/docs/native-surfaces.md:75`.

## 2. Editor & Chat History — three seams

(Full map from the editor agent; the brief's complaints are all traceable to three lines.)

1. **`useEditDraft.beginEditDraft` (`useEditDraft.ts:93`)** — opening any file to edit mints a
   staged chat session server-side. This single coupling is the whole "we save ephemeral chats
   too much" complaint. Fix: direct edits write through the VFS (it already has OPFS
   write-ahead + offline journal, `lib/workspace-vfs.ts:394-472`); a session/draft is created
   only when (a) chat is invoked or (b) the target is an app/repo where staged VCS is wanted.
2. **`EditModal` is `fixed inset-0 z-50` (`EditModal.tsx:253`)** — browse and edit are two
   apps. Fix: editable in-tab pane (the tree, tabs, `CodePreview`, TipTap, and VFS all exist;
   what's missing is only the non-modal composition). Chat becomes an opt-in side dock on the
   file, not the host of the file.
3. **Markdown regression**: `.md` opens as raw `<textarea>` because
   `EditModalHost.tsx:77` forces `showPreview:false` and the WYSIWYG branch requires it
   (`EditModal.tsx:402`). Default per-type renderer policy belongs in `fileTypes.ts`
   (md → TipTap WYSIWYG with a source toggle), not in host initial-state.

Chat history: fully server-persisted per-message records; `SessionBar` packs ~10 controls +
2 drawers into 24px; conflicts surface in 3 different UIs. Once #1 lands, most ephemeral
sessions never exist, and the versioning/merge UI can be scoped to apps/repos only (explicit,
as improve.md wants) and consolidated to one surface.

Renderer sizing: `resolveRenderer` (`renderers.tsx:104`) is the right abstraction; the defect
is per-renderer hardcoded `vh` floors/caps (`CodePreview.tsx:424` `min-h-[50vh]`, etc.).
Sizing policy should be negotiated with the host pane (extend the `fill` contract to registry
renderers) — one fix, every renderer benefits.

## 3. Native tools — disposition table

| Surface | Ground truth | Disposition |
|---|---|---|
| `playground` | Near-duplicate of registry's `/playground` (aprovan `lib/playground.ts:3` literally says "Mirrors registry/...") | Delete from `native-surfaces.tsx`; registry catalog keeps it (ephemeral creds; matches WS-4 D3) |
| `agents` | 1360-LOC panel; solid dispatch chain via `agents` namespace → profiles → `llm` interface | Keep; UX rebuild. Backend integration is fine — the pane, not the plumbing, is the problem |
| `credentials` | 37-LOC wrapper over shared `@aprovan/registry-ui` `CredentialManager` | Add **profiles** UI (see §4); keep wrapper thin |
| `admin` | Wrapper over shared `AdminPanel`; server already exposes `GET/POST/DELETE /groups/:id/profiles` but the UI has **zero** profile references | Close the gap: group→profile membership UI (this *is* WS-6 product wiring) |
| `apps` | No surface (see §1) | Add |

Copy/professionalism pass fans out per-panel; the panel contract (`panels/shell.tsx`,
`NativePanelProps`) is stable so this parallelizes cleanly.

## 4. Registry Credentials — config + auth problem, not code

The moved-notice is a **runtime fork, not a stub**: `credentials.astro:12` renders the real
`CredentialsHost` when `PUBLIC_ACCOUNT_HOST=local`, else `MovedNotice`
(`lib/gateway-session.ts:86-90`). The UI is host-agnostic `@aprovan/registry-ui` (injected
`GatewayClient`), and `@aprovan/registry-server` already serves `/credentials` CRUD +
`/profiles`.

Standalone plan: catalog (or a small page served by registry-server itself) points at a
standalone registry-server; the only genuine gap is **standalone auth** — `SessionGate`
currently assumes `auth: none` local gateways. registry-server's pluggable auth
(OIDC/API-key/none, decision 4) is the answer; the catalog needs a thin session against it.
Boundary stays clean: the sanctioned reverse edge (aprovan-published UI consumed by catalog)
already covers this. **Do not merge `product-plane-removal` until this lands.**

Credential **profiles**: the structured model exists (`ProfileRow` with limits/grants,
`profiles/{service,resolve}.ts`); the workspace still has two older "profile" notions
(credential labels in `credentials.ts:106`, named interface instances in `interfaces.ts`).
Decision 7 says Profiles replace both — the credentials-page "profiles" ask is that migration
plus UI, not a new feature. Note `profileGrantsAvailable()` returns 501 on the dynamo backend —
profile UX is gated on WS-5 storage.

## 5. Telemetry — promote the native service into the contract

`@utdk/telemetry` is deliberately export-only (single `export` op, OTLP-JSON subset,
metrics reserved → 501, no read surface — `contracts/telemetry/index.ts:12-14`). Zero
providers implement it. Meanwhile the rich thing improve.md asks for already exists natively:
workspace `telemetry` service (`emit/query/traces`, auto-instrumented dispatch, 3-day TTL) +
registry-server telemetry with `{tenant, principal, source}` attribution.

Ask = **make the contract cover the three OTel signals** (logs/metrics/traces — lift the
metrics 501) with an app-facing SDK (`log/metric/span` helpers over the OTLP shapes), keep
`export` as the egress op, and register the native service as the default implementation.
Read/query can stay native (the contract comment's reasoning holds). This slots into
decision 9's three-plane pipeline unchanged.

## 6. Presence — nothing to salvage, clean seam to build on

Today: 10s HTTP heartbeat → record store TTL rows, peer = `{userId, window, sessionId}` — no
file, no cursor. Zero CRDT/WebSocket/WebRTC anywhere ("ECS" = the one Fargate service).
`sessions-service.ts:62` already anticipates: "a CRDT transport can replace the polling
without changing the surface."

Target: presence keyed by **open file**, not workspace; tiny avatar chip on the file only.
Build order: (1) WS signalling route on the workspace server, (2) file-scoped presence over
it, (3) CRDT (Yjs or Loro) for main-area (non-staged) co-editing with cursors, P2P via
WebRTC with the server as signalling/fallback. Depends on the editor refactor (§2) — CRDT on
the main area only makes sense once direct in-tab editing exists.

## 7. Desktop app — later, but constrained by §1/§2 choices

Tauri over Electron given the low-memory requirement (aligns with transcribe.cpp being
native/Rust-friendly). The widget-plugin model ("small isolated widgets in sandboxed windows")
is the same App abstraction as §1 — a desktop host for installed apps/widgets, with extra
capability tiers (local FS, on-device transcription). Design §1's capability declarations so
`host: desktop` capabilities are just additional entries in the same three-tier model, not a
parallel system.

## Sequencing sketch

```
0. boundary hygiene (fork → npm, path leaks)          ── unblocks everything, small
1. app model: App vs AppInstallation + profiles dep   ── the center of gravity
   └ apps native surface, drawer removal
2. editor: decouple beginEditDraft, in-tab edit, md   ── independent of 1
   └ chat-history simplification, renderer sizing
3. registry standalone creds (auth + config)          ── independent; blocks removal branch
4. panel UX fan-out (agents/admin/credentials copy)   ── after 1 (apps pane) else free
5. telemetry contract v2                              ── independent, small
6. presence/CRDT                                      ── after 2
7. desktop                                            ── after 1 (capability model), 2
```

Open questions for the owner:

1. App global identity: is `(originWorkspaceId, name)` sufficient v1, or mint registry-style
   IDs now? (Collision risk exists today.)
2. Cross-deployment app distribution via the registry catalog — v1 or explicitly later?
3. Registry standalone auth: which pluggable-auth mode does the hosted catalog use (OIDC
   against the same Cognito? API keys?) — decides how much of `SessionGate` survives.
4. Presence P2P: is WebRTC actually required v1, or is server-relayed WS acceptable until
   scale demands P2P?
