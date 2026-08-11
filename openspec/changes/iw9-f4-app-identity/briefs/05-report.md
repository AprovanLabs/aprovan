# Report: 05-url-scheme

## What was built

- **`server/workspace/src/routes/app-urls.ts`** (543 lines) — new home of
  the full live surface under `/a/:ref` and `/w/:wsRef/a/:ref` (page,
  `__project__`, `__sdk__.js` / `__sdk__.d.ts`, static + SPA fallback).
  Serving helpers moved from `live-apps.ts` (`resolveLiveApp` dual lookup,
  `viewerSub` / `requireViewer`, `resolvePin`, `readPinned`,
  `servableTargets`, `handleLive*`, `buildAppShell`).
- **`server/workspace/src/routes/live-apps.ts`** (113 lines) — **shim-only**:
  every legacy/convenience route resolve-then-302s to a canonical URL; no
  content serving remains.
  - `GET /id/:appId[/*]` → `/a/<appId>[/…]`
  - `GET /:workspaceId/:name[/*]` → `/a/<appId>` or `/w/<wsId>/a/<installId>`
  - `GET /:slug` → `/a/<appId>` via `resolveGlobalSlug`
- **`server/workspace/src/server.ts`** — mounts `appUrlsRouter` at `/`
  beside `/apps` → `liveAppsRouter`.
- **`tests/app-urls.test.ts`** — serving + redirect matrix + vanity +
  rename stability + shell-leak + install dual-resolution.
- **`tests/live-apps.test.ts`** — retargeted so legacy live paths assert
  302 → canonical `Location` (publish/API scenarios kept).

### `live-apps.ts` end state (stream 6 grep-gate)

**113 lines.** Remaining routes (all 302 shims, no serving):

| Route | Behavior |
|---|---|
| `/id/:appId`, `/id/:appId/*` | Resolve app → 302 `/a/<appId>[/rest]` |
| `/:workspaceId/:name`, `/:workspaceId/:name/*` | Install dual-lookup or alias → 302 canonical |
| `/:slug` | Global slug claim → 302 `/a/<appId>` |

## How it was verified

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/app-urls.test.ts tests/live-apps.test.ts
pnpm --filter @aprovan/workspace typecheck
```

All exit 0 (35 tests passed).

## Deviations from the brief

1. **Install resolution already is D8 install-as-copy** (iw9-b landed on
   `origin/main` before this stream). Ported **current** `resolveLiveApp`
   (uses `installRoot` / `installServingManifest` / `localFork`), not the
   brief’s pre-B “origin-pinned / editing fork” wording. Dual-lookup shape
   is unchanged: ULID → `readInstall` first, else `resolveAppRef`. Installs
   still have no slug — vanity `/w/<wsSlug>/a/<slug>` only addresses owned
   apps.
2. **Public shell `appBase`** is `/api/gateway/apps/id/<appId>` (existing
   gateway permalink); install shells keep
   `/api/gateway/apps/<wsId>/<installId>`. Public config omits `workspaceId`.
3. **Convenience `/apps/:slug` is bare-path only** — sub-resources would
   collide with the two-segment legacy grammar; grammar table lists bare
   `/apps/<slug>`.
4. **Shim suffix parsing** uses the request pathname (not Hono `*`), because
   exact `/:workspaceId/:name` was matching longer paths and dropping the
   rest when relying on `param("*")`.
5. **Publish scenarios adapted to post–iw9-b single-root publish**
   (ambiguous/hollow no longer 400; extra `paths[]` rejected). URL-scheme
   assertions unchanged.
6. **`APP_SHELL_COMPILER_VERSION` bumped to `0.2.1`** to match current
   `@aprovan/patchwork` workspace version (was `0.2.0` in the moved file).
7. **Out-of-Touches regressions (stream 6):** `app-domain.test.ts`,
   `apps-install-copy.test.ts`, and `app-identity.test.ts` still call
   `liveAppsRouter` expecting 200-with-content — they will need retargeting
   to `appUrlsRouter` / follow-redirects. Not edited here (Touches constraint).
