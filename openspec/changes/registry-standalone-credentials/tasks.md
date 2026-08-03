# registry-standalone-credentials — Tasks

_Gate: IW-0 `execution-plane-unfork` must be complete before stream 4 publishes and
stream 5 consumes — the standalone target is the **published** `@aprovan/registry-server`.
Repos: registry = `/Users/jacob/Documents/Code/AprovanLabs/registry`, aprovan =
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`._

## 1. Registry-server auth discovery

> Depends-on: - | Touches: registry:packages/registry-server/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server typecheck && pnpm --filter @aprovan/registry-server test

- [ ] 1.1 Add `browserClientId?: string` to the OIDC member of the `auth` config union in
  `packages/registry-server/src/config/types.ts` and thread it through server construction
  (advertising only — token verification untouched; spec: Browser OIDC client
  configuration).
- [ ] 1.2 Add public `GET /auth/config` to `src/http/router.ts`: exempt it (with
  `/healthz`) from the auth middleware; respond
  `{ mode, oidc?: { issuer, audience, browserClientId? } }`; assert no secret material in
  the response (spec: Public auth configuration endpoint).
- [ ] 1.3 Add authenticated `GET /whoami` returning
  `{ principal, tenantId, role, groupIds, mode }` from the resolved `CallContext`
  (spec: Authenticated identity endpoint).
- [ ] 1.4 Vitest coverage: `/auth/config` shape per mode (none / api-key / oidc with and
  without `browserClientId`); `/whoami` happy path per adapter mode and 401 on bad
  credential; both endpoints present on the embedded router as well as standalone.

## 2. registry-main transport parameterization

> Depends-on: - | Touches: aprovan:packages/registry-main/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-main typecheck && pnpm --filter @aprovan/registry-main build

- [ ] 2.1 Extend `GatewayClientOptions` with `authHeader?` (default `"Authorization"`) and
  `scopeHeader?` (default `"X-Aprovan-Workspace"`); use them in the private `fetch`
  (tech-plan D4). Defaults preserve current behavior byte-for-byte.
- [ ] 2.2 Doc-comment the CloudFront OAC rationale on `authHeader` (mirroring
  `@aprovan/ui/gateway`'s `DEFAULT_AUTH_HEADER` note).

## 3. registry-ui admin capabilities and standalone sections

> Depends-on: - | Touches: aprovan:packages/registry-ui/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui typecheck && pnpm --filter @aprovan/registry-ui test

- [x] 3.1 Add `capabilities?: ReadonlyArray<AdminCapability>` to `AdminPanelProps`
  defaulting to `["members","groups","permissions"]`; render sections strictly from the
  list, no endpoint probing (tech-plan D5; spec scenario: Standalone admin scope).
- [x] 3.2 Build `ApiKeysSection` against `GET/POST /api-keys` + `DELETE /api-keys/:id`:
  list, mint with one-time plaintext reveal, revoke confirm (ux: Admin page).
- [x] 3.3 Build `ProfilesSection` against `/profiles` CRUD + `/profiles/:id/grants`:
  list/create/edit, grants sub-list; 501 from grant endpoints renders the "not supported
  by this storage backend" notice, not an error toast.
- [x] 3.4 Build `AuditSection` against `GET /audit` (read-only, paged, empty state).
- [x] 3.5 Tests: default capability set renders the exact current hosted sections (the
  workspace app passes no prop — regression guard); standalone set issues no `/members` or
  `/groups` requests.

## 4. Publish package minors

> Depends-on: 1, 2, 3 | Touches: registry:packages/registry-server/package.json, aprovan:packages/registry-main/package.json, aprovan:packages/registry-ui/package.json | Verify: npm view @aprovan/registry-server version && npm view @aprovan/registry-main version && npm view @aprovan/registry-ui version

- [x] 4.1 Version and publish `@aprovan/registry-server` (minor: discovery endpoints)
  through the registry repo's existing publish workflow. Requires IW-0 landed so the
  published package is the single source (spec: Shipped in the published package).
- [x] 4.2 Version and publish `@aprovan/registry-main` (minor: header options) and
  `@aprovan/registry-ui` (minor: admin capabilities/sections) through the aprovan publish
  pipeline.

## 5. Catalog session layer and surface un-forking

> Depends-on: 4 | Touches: registry:apps/registry/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web typecheck && pnpm --filter @aprovan/registry-web build && ! grep -rn "PUBLIC_ACCOUNT_HOST\|MovedNotice\|moved to the Aprovan product app" apps/registry/src

- [x] 5.1 Bump `apps/registry` deps to the published `@aprovan/registry-main` /
  `@aprovan/registry-ui` minors; add the session module skeleton
  `src/lib/session/{types,hosted,standalone}.ts` per tech-plan interface 5.
- [x] 5.2 Replace `PUBLIC_ACCOUNT_HOST` with `PUBLIC_SESSION_MODE` (D1): update
  `env.d.ts`, `.env.example`, `lib/gateway-session.ts` (`isStandaloneCatalogHost` becomes
  mode resolution); delete `lib/account-host.ts`, `components/MovedNotice.astro`, and
  every moved-notice branch in `pages/account/credentials.astro`,
  `pages/account/oauth-callback.astro`, `pages/admin/permissions.astro`,
  `pages/auth/callback.astro` (spec scenarios: Legacy variable retired, Moved notice
  eradicated).
- [x] 5.3 Implement `StandaloneSession`: `/auth/config` discovery, none auto-advance,
  api-key/token entry, optional PKCE when `browserClientId` advertised, `/whoami`
  identity, widget client with `{ scopeHeader: "X-Registry-Tenant" }` (spec: Standalone
  session — registry-server pluggable auth).
- [x] 5.4 Implement `HostedSession`: restore Cognito PKCE via published `@aprovan/ui/auth`
  (shape from registry git history `51e9ab1:apps/registry/src/lib/auth.ts`), live
  `pages/auth/callback.astro`, `useGatewaySession` workspace resolution, widget client
  with `{ authHeader: "X-Aprovan-Authorization" }` (spec: Hosted session — shared Cognito
  pool and product gateway).
- [x] 5.5 Rework `SessionGate` over the `CatalogSession` state machine (D2): signin card
  variants, scope picker (hosted), identity strip + sign-out, unreachable/retry; hosts
  (`CredentialsHost`, `AdminHost`, `OAuthCallbackHost`) stay mode-agnostic one-liners
  except `AdminHost` passing the mode's capability list (spec: Unified session gate
  contract; Admin page composes to backend capability).
- [x] 5.6 Verify OAuth callback in both modes uses `${base}/account/oauth-callback` and
  posts through the gate's client (D7); adjust `CredentialsHost`'s
  `oauthRedirectPath` only if the base-path handling moved.
- [x] 5.7 Standalone e2e smoke (script or vitest + preview server): boot
  `@aprovan/registry-server` in auth-none, build catalog with
  `PUBLIC_SESSION_MODE=standalone PUBLIC_GATEWAY_URL=http://localhost:PORT`, assert
  `/account/credentials` serves the live host bundle and a credential add/list/revoke
  round-trip succeeds against the server (spec scenario: Auth-none server).

## 6. Hosted deployment flip

> Depends-on: 5 | Touches: registry:.github/workflows/registry-deploy.yml | Verify: grep -q "PUBLIC_SESSION_MODE" /Users/jacob/Documents/Code/AprovanLabs/registry/.github/workflows/registry-deploy.yml && ! grep -q "PUBLIC_ACCOUNT_HOST" /Users/jacob/Documents/Code/AprovanLabs/registry/.github/workflows/registry-deploy.yml

- [x] 6.1 Set `PUBLIC_SESSION_MODE=hosted` in `registry-deploy.yml` (drop any
  `PUBLIC_ACCOUNT_HOST` reference); confirm `PUBLIC_COGNITO_AUTHORITY/CLIENT_ID` repo vars
  are still wired and the Cognito app client still lists
  `https://aprovan.com/registry/auth/callback` (aprovan
  `infra/aws/aws/src/stacks/main.ts:171` — read-only check, no infra change expected).
- [x] 6.2 Post-deploy smoke (owner-run, documented in the PR): silent SSO from a live
  product session, credential added on the catalog appears in the workspace app's native
  panel, authenticated call traverses CloudFront via `X-Aprovan-Authorization` (spec
  scenarios: Silent SSO, Hosted user sees the shared store, Transport headers under
  CloudFront).

## 7. product-plane-removal disposition

> Depends-on: 5 | Touches: - | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! git worktree list | grep -q registry-product-plane-split && ! git branch -a | grep -q product-plane-removal

- [x] 7.1 Salvage audit (D6): `git log main..product-plane-removal` + diff review
  confirming no unique fixes beyond deletions this change supersedes; record the result in
  the PR description.
- [x] 7.2 Close the branch's PR as superseded by this change; remove the worktree
  (`git worktree remove /private/tmp/registry-product-plane-split`), delete local and
  remote `product-plane-removal`.
