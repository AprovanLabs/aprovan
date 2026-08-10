# Brief: Client base-path rename (/chat → /workspace)

## Mission

The product is now Aprovan Workspace but the client still builds and links
everything under `/chat`. Rename every hardcoded `/chat` reference in the
Vite config, PWA manifest, service-worker fallback, and client source to
`/workspace`, so the built app's asset URLs, install scope, and internal
links all agree with the new canonical path. This stream owns the
client-side half of the rename; the CDK redirect and deploy-pipeline half is
brief 09.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — Mission statement ("Aprovan
   Workspace... `/chat` is renamed with a permanent redirect")
2. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 7
3. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Context bullet on
   `client/web/vite.config.ts` etc., Decision **D8** (context on the paired
   CloudFront redirect, built in brief 09), Rollout §4 (deploy-order note
   with brief 09)
4. `openspec/changes/iw9-f6-cleanup-rename/specs/workspace-base-path/spec.md`
   (full text — reproduced in Acceptance criteria below; this stream owns
   the "canonical base path" and the client half of the "OAuth sign-in"
   requirements)
5. `client/web/vite.config.ts:14,32-33,66`
6. `client/web/index.html:11`
7. `client/web/src/main.tsx:18`
8. `client/web/src/lib/auth.ts:19`
9. `client/web/src/components/panels/CredentialsPanel.tsx:12`
10. `client/web/src/pages/OAuthCallbackPage.tsx:69,103,119`

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §8)

> Depends-on: - | Repo: aprovan | Touches: aprovan/client/web/vite.config.ts, aprovan/client/web/index.html, aprovan/client/web/src/main.tsx, aprovan/client/web/src/lib/auth.ts, aprovan/client/web/src/components/panels/CredentialsPanel.tsx, aprovan/client/web/src/pages/OAuthCallbackPage.tsx | Verify: pnpm --filter @aprovan/patchwork-web build && ! grep -q '"/chat' client/web/dist/index.html

- [ ] 8.1 `client/web/vite.config.ts`: `base: "/chat/"` → `"/workspace/"`;
      PWA `manifest.start_url`/`scope` → `"/workspace/"`; `workbox.navigateFallback`
      → `"/workspace/index.html"`.
- [ ] 8.2 `client/web/index.html`: `apple-touch-icon` href → `/workspace/apple-touch-icon.png`.
- [ ] 8.3 `client/web/src/main.tsx`: `fallbackPath="/chat/"` → `"/workspace/"`.
- [ ] 8.4 `client/web/src/lib/auth.ts`: `basePath: "/chat"` → `"/workspace"`.
- [ ] 8.5 `client/web/src/components/panels/CredentialsPanel.tsx`:
      `OAUTH_REDIRECT_PATH = "/chat/account/oauth-callback"` → `"/workspace/account/oauth-callback"`.
- [ ] 8.6 `client/web/src/pages/OAuthCallbackPage.tsx`: the
      `window.history.replaceState` path (line 69) and both `<a href="/chat">`
      links (lines 103, 119) → `/workspace` equivalents.
- [ ] 8.7 Grep gate: `grep -rn '"/chat\|'"'"'/chat\|/chat/'"'"'' client/web/src client/web/index.html client/web/vite.config.ts`
      returns nothing; build output (`dist/index.html`) contains no `/chat`
      asset reference.

## Acceptance criteria

Full text of the `workspace-base-path` spec (this stream owns the "canonical
base path" requirement in full, and the client-side half of "OAuth sign-in
resolves..." — the redirect-serving half of that requirement, and the
deploy-pipeline requirement, belong to brief 09):

```
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
[Full requirement and its three scenarios are brief 09's ownership — the
CloudFront Function that serves the redirect. Reproduced there, not here,
since this stream builds no part of it.]

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

_(This scenario is this stream's to satisfy: `auth.ts`'s `basePath` change in
task 8.4 is what makes the client request `/workspace/auth/callback`.)_

#### Scenario: A stale /chat/auth/callback link still completes sign-in
- **WHEN** a request reaches `/chat/auth/callback?code=abc&state=xyz`
- **THEN** it redirects to `/workspace/auth/callback?code=abc&state=xyz` and
  the client-side OAuth callback handler completes the exchange normally

_(Split ownership: brief 09's CloudFront Function delivers the redirect half;
this stream's `OAuthCallbackPage.tsx` (task 8.6) is what completes the
exchange once redirected there — this stream cannot independently satisfy
this scenario end-to-end, and neither can brief 09 alone.)_

### Requirement: The deploy pipeline targets the `workspace/` S3 prefix
[Full requirement and its three scenarios are brief 09's ownership.]
```

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/patchwork-web build
grep -q '"/chat' client/web/dist/index.html && echo FAIL || echo PASS
grep -rn '"/chat\|'"'"'/chat\|/chat/'"'"'' client/web/src client/web/index.html client/web/vite.config.ts
```

The build must succeed. The first grep must find nothing (echo PASS). The
second grep must produce no output.

## Constraints

- Implement only what the tasks say; if any hardcoded path is missed or a
  new one is found that the tech-plan didn't enumerate, stop and report it
  rather than silently expanding scope.
- This is URL/deploy-surface only — do not rename client code identifiers
  (`ChatPage`, `features/chat/*` stay as-is per PRD Non-Goals).
- Coordinate the **deploy order** with brief 09 (not the code review): CDK
  deploy (brief 09) should land before-or-with this stream's deploy, or
  built `/workspace/...` asset URLs will 404 against a distribution not yet
  aware of the new path (tech-plan Rollout §4). This stream's own Verify
  (a local build) does not exercise that ordering — it's a rollout note for
  whoever deploys, not a gate this brief can self-check.
- Do not modify files outside: `client/web/vite.config.ts`,
  `client/web/index.html`, `client/web/src/main.tsx`,
  `client/web/src/lib/auth.ts`,
  `client/web/src/components/panels/CredentialsPanel.tsx`,
  `client/web/src/pages/OAuthCallbackPage.tsx`.

## Model

**Sonnet.** Not named in `IW-9-EXECUTION-OVERVIEW.md`'s Haiku tier. Run on
Sonnet as the default tier, not a Haiku fallback.

## Report back

When done: check off tasks 8.1–8.7 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/08-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and — critically — a note to whoever
runs brief 09's deploy that this stream's rebuild is ready and depends on
the CDK redirect deploying first-or-together (see Constraints).
