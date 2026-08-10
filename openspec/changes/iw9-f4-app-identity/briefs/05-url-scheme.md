# Brief: URL scheme — canonical, vanity, 302 convenience

## Mission

Create `server/workspace/src/routes/app-urls.ts` — the new home of the
entire live-app serving surface under canonical (`/a/<appId>`,
`/w/<wsId>/a/<installId>`) and vanity (`/a/<globalSlug>`,
`/w/<wsSlug>/a/<slug>`) URLs (IW-9 decision D5), and convert
`routes/live-apps.ts`'s legacy routes into resolve-then-302 shims that never
serve content again. When you are done, no public app surface's URL,
generated link, or embedded shell config contains a workspace id, and every
old link (`/apps/<workspaceId>/<name>`, `/apps/id/<appId>`, `/apps/<slug>`)
still works via a redirect.

**This is a MOVE, not a copy.** `live-apps.ts`'s serving logic
(`resolveLiveApp`, `viewerSub`, `requireViewer`, `resolvePin`, `readPinned`,
`servableTargets`, the `handleLive*` handlers, `buildAppShell`) relocates
into `app-urls.ts` verbatim — port the code, don't reimplement it, and don't
leave it duplicated in both files. `live-apps.ts` ends this stream
containing only redirect shims. This was an ambiguity in the original plan
("reusing live-apps.ts handler internals") that was resolved before this
brief was written — see `briefs/deviations.md` §5 for why.

**A second gap was found and closed while preparing this brief**: the
existing `tests/live-apps.test.ts` calls the legacy routes directly and
asserts they serve content (status 200) — behavior task 5.3 deliberately
removes. That file is now in this stream's `Touches` and must be rewritten,
not left in its current form (`briefs/deviations.md` §6; tasks 5.3/5.3a
below).

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — decisions D5, D21 (no region
   segments)
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f4-app-identity/prd.md` — "Problem" (the workspace-id
   leak), "Goals"
4. `openspec/changes/iw9-f4-app-identity/tech-plan.md` — Context (the leak,
   `live-apps.ts:44` mount), T5 (read this in full — it now spells out the
   exact `/w/<wsRef>/a/<ref>` resolution algorithm and why the vanity form
   can never address an install), T6, and the "URL grammar" table and
   "Slug + claims" block under "Interfaces & Data"
5. `openspec/changes/iw9-f4-app-identity/specs/app-url-scheme/spec.md` —
   full spec, all four requirements (reproduced under Acceptance criteria
   below)
6. `openspec/changes/iw9-f4-app-identity/ux.md` — app link flows
7. `server/workspace/src/routes/live-apps.ts` — the **entire file** (538
   lines). You are moving essentially everything below the imports into
   `app-urls.ts`: `resolveLiveApp` (103-155, the install-then-alias dual
   resolution — port unchanged), `viewerSub`/`requireViewer` (157-181),
   `resolvePin` (183-200), `readPinned` (202-213), `servableTargets`
   (215-234), every `handleLive*` function and its route registrations
   (244-393), and `buildAppShell` (399-538, note `liveBase`/`permalinkBase`/
   `appBase` at lines 411-423 — these become appId-keyed for public apps)
8. `server/workspace/src/apps/install.ts` — full file: `AppInstallation`
   (33-50, no name/slug field anywhere — this is *why* the vanity form can
   never address an install), `readInstall` (68-75)
9. `server/workspace/src/apps/identity.ts` — `isAppId` (36-38),
   `resolveAppRef` (used by `resolveLiveApp`'s fallback branch — read its
   definition in full)
10. `server/workspace/src/server.ts` — the mount table (lines 41-44); you add
    a new `app.route(...)` line here beside the existing `/apps` mount
11. `server/workspace/tests/live-apps.test.ts` — the **entire file** (290+
    lines). Note every place it calls `liveAppsRouter.request(...)` directly
    and asserts 200-with-content (lines 120, 139, 149, 181, 186, 211, 216,
    221, 231, 236, 362) — these are the scenarios task 5.3a ports into
    `tests/app-urls.test.ts`, and task 5.3 retargets this file's own
    assertions from "serves content" to "redirects."
12. `server/workspace/src/apps/slugs.ts` (stream 2's output — depend on it
    for `resolveGlobalSlug`/`resolveWorkspaceSlug`)

## Tasks

(Verbatim from `openspec/changes/iw9-f4-app-identity/tasks.md` §5, as
repaired in the pre-dispatch pass — see `briefs/deviations.md` §4-§6)

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/routes/app-urls.ts, aprovan/server/workspace/src/routes/live-apps.ts, aprovan/server/workspace/src/server.ts, aprovan/server/workspace/tests/app-urls.test.ts, aprovan/server/workspace/tests/live-apps.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/app-urls.test.ts tests/live-apps.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 5.1 Create `routes/app-urls.ts` as the new home of the full live surface (page, `__project__`, `__sdk__.js`, `__sdk__.d.ts`, static + SPA fallback) under `/a/:ref` and `/w/:wsRef/a/:ref`; this is a MOVE — relocate `resolveLiveApp`, `viewerSub`, `requireViewer`, `resolvePin`, `readPinned`, `servableTargets`, the `handleLive*` handlers, and `buildAppShell` (`live-apps.ts:79-538`) into this file verbatim (port, don't reimplement); `live-apps.ts` ends this stream containing only 302 shims (task 5.3), no serving logic. Mount at domain root in `server.ts` beside the existing `/apps` mount (`server.ts:44`) (tech-plan T5; D5).
- [ ] 5.2 Resolution: segment is an id iff `isAppId(segment)`, else slug — `/a/` slugs via `resolveGlobalSlug`. `/w/:wsRef/a/:ref`: resolve `wsRef` via `resolveWorkspaceSlug` (or passthrough when it's already a workspace id), then resolve `ref` by PORTING today's `resolveLiveApp` dual lookup UNCHANGED (`live-apps.ts:103-155`): try `readInstall(wsId, ref)` first when `isAppId(ref)` (the existing pre-IW9 origin-pinned install model, `apps/install.ts` — NOT D8 install-as-copy, which iw9-b has not built); on a miss or a non-ULID `ref`, fall through to `resolveAppRef(wsId, ref)` (ULID passthrough = the workspace's own app by appId, else alias/slug lookup = the workspace's own app by name). Installs are never slug-addressable (no name/slug field anywhere in `apps/install.ts` — the vanity form `/w/<wsSlug>/a/<slug>` can only ever resolve a workspace's own authored app, never an install). Unresolvable → 404; ws/install mismatch → 404 (spec app-url-scheme "id/slug disambiguation", "install surface is workspace-scoped").
- [ ] 5.3 Convert every legacy route in `routes/live-apps.ts` (`/apps/:workspaceId/:name`, `/apps/id/:appId`, and their sub-resources) plus new `/apps/:slug` to resolve-then-302 shims targeting canonical URLs; convenience never serves content, and after this task `live-apps.ts` contains no serving logic at all (spec "convenience redirect", "legacy permalink redirects", "legacy leak closed"). **Existing `tests/live-apps.test.ts` gap (found inspecting the file — it currently calls `liveAppsRouter.request("/local/site")` etc. and asserts 200-with-content, e.g. lines 120,139,149,181,186,211,216,221,231,236,362): those assertions describe behavior that no longer exists once this task lands (the route now 302s). REWRITE this existing file in place (not a new file — its current scenarios are moving, not being added to) so it asserts ONLY that each exercised legacy path returns a 302 whose `Location` is the correct canonical URL; do not delete its scenario coverage, retarget each one from "serves 200 content" to "redirects to the URL that serves this content" (5.6 covers the "does the canonical URL actually serve it" half in the new file).
- [ ] 5.3a Port every serving-behavior scenario `tests/live-apps.test.ts` currently covers (path binding/entry resolution, channel pinning, visibility/private-app 401 and 403, static asset serving, SPA fallback, `__project__`/`__sdk__` gating, the pinned-content case at line 362) into `tests/app-urls.test.ts` (5.6) against the new canonical routes — this is where the serving logic now lives (5.1), so this is where its test coverage belongs.
- [ ] 5.4 Rewrite `buildAppShell` config (moved to `app-urls.ts` by 5.1; was `live-apps.ts:411-423`): `liveBase`/`permalinkBase` become canonical (`/a/<appId>` or `/w/<wsId>/a/<installId>`); public app shells embed no workspace id anywhere, incl. the auth-return round-trip; `appBase` for public apps becomes appId-keyed (spec "public shell carries no workspace id").
- [ ] 5.5 Ensure visibility gating (`requireViewer`), channel pinning (`resolvePin`), and install/fork resolution behave identically under canonical prefixes — port, don't reimplement (moved to `app-urls.ts` by 5.1; was `live-apps.ts:103-213`).
- [ ] 5.6 New test file `tests/app-urls.test.ts`: redirect matrix (all legacy/convenience forms → 302 with canonical Location), canonical stability across a rename, vanity resolution, 404 paths, a shell-leak assertion (rendered public shell HTML contains no workspace id), the install-then-alias dual resolution at `/w/<wsId>/a/<ref>` (5.2), AND every serving-behavior scenario ported from `tests/live-apps.test.ts` per 5.3a (path binding, channels, visibility, static/SPA fallback, pinned content) re-targeted at the canonical `/a/...` and `/w/.../a/...` routes.

## Acceptance criteria

Verbatim from `specs/app-url-scheme/spec.md` (full spec):

### Requirement: Canonical app URLs
The platform SHALL serve apps at canonical URLs `/a/<appId>` (public/global app surface) and `/w/<wsId>/a/<installId>` (workspace-scoped install surface), where `<appId>`/`<installId>` are ULIDs. Canonical URLs SHALL be stable across slug renames. All sub-resources of today's live surface (`__project__`, `__sdk__.js`, `__sdk__.d.ts`, static files with SPA fallback) SHALL be reachable under the canonical prefixes with unchanged visibility gating.

#### Scenario: canonical URL survives rename
- **WHEN** an app is renamed and its canonical URL `/a/<appId>` is requested
- **THEN** the app page serves exactly as before the rename

#### Scenario: install surface is workspace-scoped
- **WHEN** `/w/<wsId>/a/<installId>` is requested for a valid install in that workspace
- **THEN** the install's app surface serves; a `<wsId>`/`<installId>` mismatch is 404

### Requirement: Vanity URLs resolve through slug indexes
The platform SHALL serve vanity URLs `/a/<globalSlug>` (resolved via the global slug claim registry) and `/w/<wsSlug>/a/<slug>` (resolved via a workspace-slug resolver plus the workspace alias index). A path segment that is a well-formed ULID SHALL be treated as an id; otherwise as a slug (the disjointness is guaranteed by app-slug's ULID-shape rejection). An unresolvable slug SHALL 404.

#### Scenario: global vanity resolves
- **WHEN** `/a/<globalSlug>` is requested for a claimed global slug
- **THEN** the surface of the claiming app serves (equivalent to its canonical URL)

#### Scenario: id/slug disambiguation
- **WHEN** the segment after `/a/` is a well-formed ULID
- **THEN** it is resolved as an appId and never consulted against slug indexes

### Requirement: Convenience path always 302s to canonical
`GET /apps/<slug>` (and every legacy `/apps/…` app-addressing form, including today's `/apps/<workspaceId>/<name>` and `/apps/id/<appId>` from `routes/live-apps.ts`) SHALL respond with a 302 redirect to the corresponding canonical URL. The convenience path SHALL never serve app content directly.

#### Scenario: convenience redirect
- **WHEN** `/apps/<slug>` is requested and the slug resolves
- **THEN** the response is a 302 whose Location is the canonical `/a/<appId>` (or `/w/<wsId>/a/<installId>`) URL

#### Scenario: legacy permalink redirects
- **WHEN** `/apps/id/<appId>` is requested
- **THEN** the response is a 302 to `/a/<appId>`

### Requirement: No workspace ids in public app URLs; no region segments
No route, generated link, shell config, or redirect target for a **public** app surface SHALL contain a workspace id (today `routes/live-apps.ts` serves `/apps/<workspaceId>/<name>` and bakes `liveBase`/`appBase` workspace-id URLs into the page shell — both leak). Workspace ids MAY appear only under the workspace-scoped `/w/<wsId>/…` form. No app URL SHALL contain a region segment (D21: region is an edge lookup, never an address).

#### Scenario: public shell carries no workspace id
- **WHEN** the HTML shell for `/a/<appId>` is rendered for a public app
- **THEN** no URL embedded in the page (bases, links, redirects) contains the hosting workspace id

#### Scenario: legacy leak closed
- **WHEN** the legacy `/apps/<workspaceId>/<name>` form is requested
- **THEN** the response is a 302 to a canonical URL that does not contain the workspace id

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/app-urls.test.ts tests/live-apps.test.ts
pnpm --filter @aprovan/workspace typecheck
```

The first line is a correction over `tasks.md`'s literal `Verify:` string
(see `briefs/deviations.md` §9). All commands must exit 0 — including
`tests/live-apps.test.ts`, which you are rewriting (5.3), not deleting.

## Constraints

- Implement only what the tasks say; the URL grammar table and the
  `/w/<wsRef>/a/<ref>` resolution algorithm in `tech-plan.md` T5 are fixed —
  if either seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not build any install-as-copy machinery. `readInstall` is ported
  as-is; its contract does not change in this stream. If a scenario seems
  to need "install by slug," stop — installs have no slug anywhere in the
  codebase, and inventing one here would be building `iw9-b`'s D8 model
  early.
- After task 5.3, `live-apps.ts` must contain zero content-serving logic —
  only resolve-then-redirect. If you find yourself keeping a
  `handleLive*`-style function in `live-apps.ts` "just to be safe," stop;
  that violates the architecture's stated end state and will fail the
  MIGRATION-DEBT grep-gate in stream 6.
- Do not append new scenarios to `tests/live-apps.test.ts` beyond what task
  5.3 requires (retargeting existing assertions to redirects) — new
  serving-behavior coverage belongs in the new `tests/app-urls.test.ts`
  (5.3a/5.6).
- Do not modify files outside: `server/workspace/src/routes/app-urls.ts`,
  `server/workspace/src/routes/live-apps.ts`,
  `server/workspace/src/server.ts`,
  `server/workspace/tests/app-urls.test.ts`,
  `server/workspace/tests/live-apps.test.ts`.

## Model

**Sonnet** — the default tier for every `iw9-f4` stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F4 does not appear in that table's Opus-escalation row. This stream
moves and re-targets a large amount of existing code and tests, which makes
it the highest line-count stream in the change, but the resolution
algorithm, the move-not-copy end state, and the test-migration plan are all
now fully specified in `tech-plan.md`/this brief after the pre-dispatch
repair pass — mechanical relocation against a frozen contract, not novel
design. Haiku is not used in this fleet (unavailable); do not downgrade
below Sonnet regardless. Do not escalate to Opus.

## Report back

When done: check off tasks 5.1–5.6 in
`openspec/changes/iw9-f4-app-identity/tasks.md`, and open a PR (or write
`briefs/05-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and confirmation that `live-apps.ts`
contains no remaining serving logic (paste the file's final line count and a
one-line description of what each remaining route does) — stream 6's
grep-gates depend on this being true.
