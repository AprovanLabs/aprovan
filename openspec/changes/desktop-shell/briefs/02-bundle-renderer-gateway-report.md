# Report: Bundle the renderer and the gateway build

## What was built

`@aprovan/desktop` `build` now compiles main/preload via tsup, then runs `scripts/prepare-resources.sh`:

1. **Renderer (2.1)** — `bundle-renderer.sh` builds `@aprovan/patchwork-web` with `APROVAN_ENV=off` (no fork) and stages the Vite dist under `build/bundles/<version>/chat/` and `resources/bundle/chat/`, matching production's `/chat/` base. The window loads `app://bundle/chat/index.html`.
2. **Gateway + Node (2.2)** — `vendor-gateway.sh` runs the same `pnpm --filter @aprovan/workspace --prod deploy` + schema copy as the Dockerfile, and downloads stock Node `22.12.0` (Dockerfile `ARG NODE_VERSION`) for darwin-arm64 into `build/runtime/`.
3. **Parity assert (2.3)** — `assert-gateway.sh` locks recipe constants to the Dockerfile and compares `package.json` identity + `dist/**` hashes. With Docker: builds via `scripts/image.sh`, extracts `/srv/workspace` (`extract-gateway`), and diffs. Without Docker: compares against a fresh local deploy of the same recipe.
4. **Application Support (2.4)** — `ensureAppSupportLayout` creates `bundles/` and `gateway-data/` under `app.getPath("userData")` (app name set to `Aprovan`) on launch.

## Verification

1. `pnpm --filter @aprovan/desktop build` — passed (renderer staged, gateway vendored, local deploy assert matched; Docker daemon was down so container extract was skipped).
2. `pnpm --filter @aprovan/desktop test` — 17 tests passed (including Application Support layout).
3. `pnpm --filter @aprovan/desktop check-types` — passed.

## Deviations

- Container extract assert requires a running Docker daemon; when unavailable the build still asserts against an independent local `pnpm deploy` plus Dockerfile recipe lockstep. Full image parity runs automatically when Docker is up.
- Native `node_modules` binaries are intentionally excluded from the artifact compare (host vs linux).
