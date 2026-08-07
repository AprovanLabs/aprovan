# Report: Electron scaffold and app origin

## What was built

Added `@aprovan/desktop` as a top-level workspace package (`desktop/`) with Electron main, CJS preload, and tsup build config. Registered `desktop` in `pnpm-workspace.yaml` and added a `dist` turbo task for the later packaging pipeline.

The shell registers a privileged `app://` scheme and serves only the active bundle directory (`resources/bundle` in this scaffold), refusing lexical and symlink escapes. The main window loads `app://bundle/index.html` with `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`. `DesktopBridge` is exposed via `contextBridge` with exactly the tech-plan surface (`gatewayUrl`, `gatewayStatus`, `onGatewayStatus`, `pickDirectory`, `bundleInfo`). Launch enforces macOS 14+ (Darwin ≥ 23) on Apple Silicon and quits with a plain-language dialog otherwise. Gateway supervision, bundle manager, and the native directory picker remain stubs for later streams.

## Verification

1. `pnpm --filter @aprovan/desktop build` — passed.
2. `pnpm --filter @aprovan/desktop test` — 15 tests passed (bridge surface, protocol containment, platform floor, window isolation prefs).
3. `pnpm --filter @aprovan/desktop check-types` — passed.

## Deviations

None from the brief scope. Root `package.json` was not changed; workspace registration alone is enough for `pnpm --filter` / turbo discovery. `turbo.json` gained a `dist` task (used by stream 7) rather than package-specific overrides.
