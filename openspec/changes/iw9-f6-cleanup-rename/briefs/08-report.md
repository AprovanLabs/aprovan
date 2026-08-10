# Report: Brief 08 — Client base-path rename (/chat → /workspace)

## What was built

Renamed the `@aprovan/patchwork-web` client canonical base path from `/chat`
to `/workspace` across Vite config, PWA manifest/service-worker fallback,
`index.html`, auth callback wiring, and OAuth credential-panel callback paths.

### Files changed

| File | Change |
|---|---|
| `client/web/vite.config.ts` | `base`, PWA `start_url`/`scope`, `navigateFallback`, plus companion `navigateFallbackAllowlist` / `navigateFallbackDenylist` (and their comment) → `/workspace` |
| `client/web/index.html` | `apple-touch-icon` → `/workspace/apple-touch-icon.png` |
| `client/web/src/main.tsx` | `AuthCallback` `fallbackPath` → `/workspace/` |
| `client/web/src/lib/auth.ts` | Cognito `basePath` → `/workspace` (new sign-ins hit `/workspace/auth/callback`) |
| `client/web/src/components/panels/CredentialsPanel.tsx` | `OAUTH_REDIRECT_PATH` → `/workspace/account/oauth-callback` |
| `client/web/src/pages/OAuthCallbackPage.tsx` | `replaceState` path + both "Back to workspace" links → `/workspace` |
| `openspec/changes/iw9-f6-cleanup-rename/tasks.md` | Checked off tasks 8.1–8.7 |
| `openspec/changes/iw9-f6-cleanup-rename/briefs/08-report.md` | This report |

Tasks 8.1–8.7 in `tasks.md` are checked off.

## How verified

From the worktree root (deps built via
`pnpm turbo run build --filter=@aprovan/patchwork-web...` with
`APROVAN_ENV=off`; then the brief's Verify commands):

```bash
pnpm --filter @aprovan/patchwork-web build
grep -q '"/chat' client/web/dist/index.html && echo FAIL || echo PASS
grep -rn '"/chat\|'"'"'/chat\|/chat/'"'"'' client/web/src client/web/index.html client/web/vite.config.ts
```

Results:

| Check | Result |
|---|---|
| Build | Success (after workspace `^build` deps) |
| `dist/index.html` contains `"/chat` | **PASS** (none) |
| Grep gate over src / index.html / vite.config.ts | **PASS** (no output) |
| Emitted asset URLs | All prefixed `/workspace/` (`/workspace/assets/...`, manifest, SW) |
| `manifest.webmanifest` | `start_url` and `scope` both `/workspace/` |

## Deviations

1. **Workbox allowlist/denylist (in-scope file, beyond task 8.1 wording).**
   Task 8.1 only named `base`, `start_url`/`scope`, and `navigateFallback`.
   Leaving `navigateFallbackAllowlist: [/^\/chat\//]` and the denylist
   `/chat/api` entry would leave the SPA fallback scoped to the old path
   after `navigateFallback` moved to `/workspace/index.html`. Updated those
   regexes (and the adjacent comment) inside the same Touches file so the
   PWA fallback actually applies under `/workspace/`.

2. **Additional hardcoded `/chat` URL surfaces found but NOT changed**
   (per Constraints: stop and report; do not expand scope). These do **not**
   fail the brief's grep gate (absolute `"/chat` / `'/chat` literals), but
   they still point at the old product URL and should be a follow-up or
   folded into a later brief if intentional:

   - `client/web/src/pages/ChatPage.tsx` — `homeHref="https://aprovan.com/chat"`
   - `client/web/src/lib/registry.ts` — origin `/chat` and `https://aprovan.com/chat`
   - `client/web/src/components/SessionControls.tsx` — `APROVAN_SITE_CHAT = "https://aprovan.com/chat/"`
   - `client/web/src/features/panel/session.test.ts` — `http://localhost/chat/`

   Identifier / module paths under `features/chat/*`, gateway `/llm/.../chat`,
   and similar were left alone per PRD Non-Goals.

3. **Verify prerequisite.** A bare
   `pnpm --filter @aprovan/patchwork-web build` in a fresh worktree fails
   until workspace packages are built (`@aprovan/ui`, `@aprovan/editor`,
   etc.). Used `pnpm turbo run build --filter=@aprovan/patchwork-web...`
   once; subsequent filter builds succeed.

## Deploy note for brief 09

**This stream's rebuild is ready and must not ship alone.**

CDK / deploy-pipeline work in brief 09 (CloudFront `/chat` → `/workspace`
301, S3 `workspace/` prefix, Cognito callback URL additions) should land
**before-or-with** this client's deploy. Shipping this build against a
distribution still serving only `/chat/` will 404 every `/workspace/...`
asset URL. Stale bookmarks to `/chat/auth/callback?code=...` also depend on
brief 09's redirect carrying the query string through so this stream's
client-side handler can complete the exchange.
