# registry-standalone-credentials — PRD

_IW-3 of the improve wave. Zero-context sources of truth:
[docs/tasks/improve-findings.md](../../../docs/tasks/improve-findings.md) §4 + "Settled
decisions" #3, and [docs/tasks/refactor-decisions.md](../../../docs/tasks/refactor-decisions.md)
decision 4 (pluggable auth). Owner decision (2026-08-02): **one UI, config decides issuer +
gateway** — hosted catalog = shared Cognito pool + product gateway (one credential store);
standalone = the same UI over registry-server's pluggable auth. This change AMENDS
`product-plane-move` tech-plan D3 ("retired routes get a static moved-notice page"): the
catalog keeps live credential/admin surfaces in both modes._

## Problem

Self-hosted registry users who open the catalog's credentials page hit "Credential management
has moved to the Aprovan product app" — a build-time fork (`PUBLIC_ACCOUNT_HOST`) that stubs
out surfaces their own registry-server fully backs (`/credentials` CRUD, `/profiles`,
`/api-keys` already exist). Hosted visitors on aprovan.com/registry get the same dead stub even
though they have a Cognito session one origin away. Meanwhile a live registry branch
(`product-plane-removal`, HEAD c4faba8) would delete these surfaces outright — merging it
as-is forecloses the settled decision.

## Users & Jobs

- **Standalone / self-hosters** — run the published `@aprovan/registry-server` with their own
  auth (OIDC / API key / none) and hire the catalog to manage provider credentials, API keys,
  and profile grants without ever learning the aprovan product exists.
- **Hosted registry visitors** (aprovan.com/registry) — hire the catalog to view and edit the
  *same* credentials their workspace app uses, signed in with their existing Cognito session.
- **Owner/maintainer** — hires this change to keep exactly one credential UI
  (`@aprovan/registry-ui`) across product app, hosted catalog, and standalone catalog, and to
  retire the contradictory `product-plane-removal` branch safely.

## Goals

- A standalone catalog pointed at any registry-server (each of the three auth modes) renders
  live `/account/credentials`, `/admin/permissions`, and `/account/oauth-callback` pages; the
  string "moved to the Aprovan product app" appears nowhere in the built site.
- The hosted catalog renders the same pages against the product gateway with Cognito PKCE
  sign-in (silent SSO when a product session exists); a credential added there is immediately
  visible in the workspace app's native credentials panel (one store, zero sync).
- OAuth authorization-code credential flows complete end-to-end in both modes via the
  catalog-owned callback route.
- One component source: catalog hosts remain thin wrappers (session gate + composition only,
  no credential/admin logic) over published `@aprovan/registry-ui` / `@aprovan/registry-main`
  — the sanctioned reverse npm edge. The registry repo never depends on an aprovan checkout.
- `product-plane-removal` is dispositioned: never merged, branch and worktree removed, its
  intent recorded as superseded by this change.

## Non-Goals

- **No new credential backend.** registry-server owns storage, crypto, and OAuth token
  exchange; the product gateway owns its own store. This change only routes the UI.
- **No profile-model changes.** Decision 7's `ProfileRow` schema stands; profile *UX* beyond
  what registry-server already serves is IW-4/WS-6 (and gated on WS-5 storage).
- **No catalog redesign.** Pages, layout, and the `SessionGate`-style UX pattern stay; only
  the session layer underneath and the fork removal change.
- **No member/group management for standalone.** registry-server has no member store; the
  standalone admin surface is scoped to what the server serves (API keys, profiles + grants,
  audit).
- **No workspace-app changes.** Native panels are IW-4.

## Capabilities

### New Capabilities

- `catalog-session`: the configurable session layer — mode selection
  (hosted | standalone), sign-in per issuer (Cognito PKCE / pluggable OIDC / API key / none),
  scope selection (workspace vs tenant), and transport (base URL + auth/scope headers).
- `catalog-account-surfaces`: the live credential, admin, and OAuth-callback pages composed
  from `@aprovan/registry-ui` in both modes; moved-notice retirement; capability-driven admin
  composition.
- `registry-server-auth-discovery`: small additions to the published registry-server HTTP
  surface so a browser UI can discover how to authenticate (`GET /auth/config`) and who it is
  (`GET /whoami`).

### Modified Capabilities

None in `openspec/specs/` (still empty — prior waves are unarchived). Narratively this amends
`product-plane-move` `repo-topology` ("retired catalog routes SHALL serve a static
moved-notice page") — that requirement is reversed here for account/admin routes.

## Constraints & Assumptions

**Constraints (settled):**

- **Gated on IW-0 (`execution-plane-unfork`).** The standalone target is the *published*
  `@aprovan/registry-server`; discovery endpoints must ship in a published version, and
  aprovan must consume it from npm, not the fork.
- Cross-repo edges are npm-only: aprovan → registry for execution plane;
  `@aprovan/{ui,registry-ui,registry-main}` published from aprovan and consumed by the catalog
  via semver is the sanctioned reverse edge. The registry repo stays app-ignorant.
- The catalog site stays in the registry repo (build-time `packages/utdk` disk walk).
- Hosted deploy facts already in place: catalog served at `aprovan.com/registry` same-origin
  with the product gateway (`/api/gateway`); Cognito redirect URI
  `https://aprovan.com/registry/auth/callback` is registered on the app client;
  `registry-deploy.yml` already passes `PUBLIC_COGNITO_AUTHORITY/CLIENT_ID`.

**Assumptions (flagged, not owner-confirmed):**

- Standalone OIDC browser sign-in is only offered when the server operator configures a
  public (PKCE) client id; otherwise the catalog falls back to paste-a-bearer-token. Full
  PKCE against arbitrary issuers with no client registration is not assumed possible.
- The hosted admin page keeps its current product-gateway scope (members/groups/permissions);
  adding profile UI there is IW-4's job.
- Nothing on `product-plane-removal` needs salvage (its "consume published UI packages"
  commit is already independently on `main`).

## Open Questions

1. **Standalone OIDC sign-in shape** — PKCE redirect when the operator configures a browser
   client id, with paste-a-token as universal fallback? _Recommendation: yes — ship the
   fallback in all modes, PKCE only when `GET /auth/config` advertises a `browserClientId`._
2. **Branch disposition** — abandon `product-plane-removal` outright (delete branch +
   worktree, PR closed as superseded) vs. rework it into a post-cutover cleanup?
   _Recommendation: abandon; nothing on it survives this change's direction._
3. **Hosted deep link** — keep a secondary "Open in workspace app" link on hosted account
   pages after the moved-notice dies? _Recommendation: yes, as a quiet header link; delete
   the `MovedNotice` component itself._
