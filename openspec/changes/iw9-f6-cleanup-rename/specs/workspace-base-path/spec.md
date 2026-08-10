## ADDED Requirements

### Requirement: The web app's canonical base path is `/workspace`
The `@aprovan/patchwork-web` build SHALL treat `/workspace` as its base path:
the Vite `base`, the PWA manifest `start_url`/`scope`, the service-worker
`navigateFallback`, and every hardcoded asset/link path in `index.html` and
client source (auth redirect paths, "back to workspace" links) SHALL read
`/workspace` where they read `/chat` today.

#### Scenario: Built asset URLs resolve under /workspace
- **WHEN** the production build runs (`pnpm --filter @aprovan/patchwork-web build`)
- **THEN** every emitted `<script>`/`<link>` URL in `dist/index.html` is
  prefixed `/workspace/`, and none is prefixed `/chat/`

#### Scenario: PWA installs scope to /workspace
- **WHEN** a browser reads the built `manifest.webmanifest`
- **THEN** `start_url` and `scope` are both `/workspace/`

### Requirement: `/chat` and `/chat/*` permanently redirect to `/workspace`
Any request whose path is `/chat` or starts with `/chat/` SHALL receive a
permanent redirect (301 or CloudFront-function-equivalent) to the same path
with the `/chat` segment replaced by `/workspace`, preserving the remainder
of the path and the query string. The redirect SHALL be served at the edge
(CloudFront), not by the SPA, so it also covers non-HTML asset requests and
clients that never load the app shell.

#### Scenario: Root chat path redirects
- **WHEN** a client requests `https://aprovan.com/chat` or `https://aprovan.com/chat/`
- **THEN** the response is a permanent redirect to `https://aprovan.com/workspace/`

#### Scenario: Deep chat link preserves path and query
- **WHEN** a client requests `https://aprovan.com/chat/some/deep/path?x=1`
- **THEN** the response is a permanent redirect to
  `https://aprovan.com/workspace/some/deep/path?x=1`

#### Scenario: Redirect is cacheable as permanent
- **WHEN** a browser or intermediary caches the redirect
- **THEN** the response status is a permanent-redirect code (301 or 308), not
  a temporary one (302/307)

### Requirement: OAuth sign-in resolves under the new base path without breaking in-flight or bookmarked callbacks
New sign-ins SHALL redirect through `/workspace/auth/callback`. A stale
bookmark or in-flight browser tab that still lands on
`/chat/auth/callback?code=...` SHALL still complete sign-in (via the `/chat`
→ `/workspace` redirect carrying the query string through, per the
requirement above) rather than 404ing or losing the OAuth `code`/`state`.

#### Scenario: New sign-in lands on the renamed callback path
- **WHEN** a user completes the Cognito hosted-UI flow after this change ships
- **THEN** the browser is redirected to `/workspace/auth/callback` with the
  `code` and `state` query parameters intact

#### Scenario: A stale /chat/auth/callback link still completes sign-in
- **WHEN** a request reaches `/chat/auth/callback?code=abc&state=xyz`
- **THEN** it redirects to `/workspace/auth/callback?code=abc&state=xyz` and
  the client-side OAuth callback handler completes the exchange normally

### Requirement: The deploy pipeline targets the `workspace/` S3 prefix
`scripts/deploy-web.sh` SHALL sync the build output to `s3://$WEB_BUCKET/workspace/`,
invalidate CloudFront paths under `/workspace/*`, and publish the SPA shell
at `workspace/auth/callback/index.html` (mirroring the existing `chat/auth/callback/`
publish) so the CloudFront rewrite function resolves that path to the app
shell instead of a 404.

#### Scenario: Deploy syncs to the workspace prefix
- **WHEN** `scripts/deploy-web.sh` runs against a built `client/web/dist`
- **THEN** every synced object key is rooted at `workspace/`, and no object
  is written under `chat/`

#### Scenario: Deploy invalidates the workspace path
- **WHEN** `scripts/deploy-web.sh` completes its sync
- **THEN** it invalidates CloudFront path `/workspace/*`

#### Scenario: SPA shell exists at the callback path
- **WHEN** a fresh deploy finishes
- **THEN** `s3://$WEB_BUCKET/workspace/auth/callback/index.html` exists and
  is byte-identical to `workspace/index.html`
