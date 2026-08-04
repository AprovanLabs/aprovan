# tools-global — streams 4–8 report

Branch: `iw7/tools-global` (both repos)

## Pull requests

| Repo | PR |
|------|-----|
| aprovan | https://github.com/AprovanLabs/aprovan/pull/82 |
| registry | https://github.com/AprovanLabs/registry/pull/114 |

## Stream 4 — Plugin registry

- `PluginRegistry` with `registerMiddleware` / `registerOverride` (duplicate throws)
- Wired into `assembleTools()`, iframe mount, and `WidgetPreview`
- Telemetry SDK → `registerTelemetryOverride`; notification → `registerNotificationOverride`
- Deleted `NOTIFICATION_IMPORT_RE` source rewriting in `NotificationPathWidget`
- 6 plugin tests + 52 compiler tests pass

**Commits:** `3b3442d`

## Stream 5 — Dependency scan

- `scanToolsAccess()` in editor + registry runtime (`tools-scan.ts`)
- `parseScriptDependencies` derives deps from `tools.*` access; `unresolved` flag for `tools[expr]`
- Removed `parseUsesAttribute` / `uses=` threading from chat artifacts
- `DependencyPanel` shows incomplete-list indicator
- 5 editor scan tests

**Commits:** aprovan `8630ef7`, registry `38d6fbc`

## Stream 6 — Prompt single-source and reseed

- Fixed `scripts/seed-prompts.ts` import → `server/workspace/src/fs-store.js`
- Rewrote `data/prompts/chat-patchwork-widget.md` for `tools` only (`workflows.trace({ name, run_id })`)
- `resolveStoredPrompt` is workspace-FS-only (PostHog rip-out)
- Migrated examples: tasks (6 files), liift4, `GITHUB_STATUS_SCRIPT`
- Deleted duplicate prompt from registry repo

**Commits:** aprovan `a21ffd3`, registry `bd7848a`

## Stream 7 — Package renames (two commits)

1. `@aprovan/patchwork-compiler` → `@aprovan/patchwork` — `d6cca0e`
2. `@aprovan/patchwork-editor` → `@aprovan/editor` — `38e13cf`
- Publish workflow updated; `patchwork:*` localStorage keys unchanged (comment in `useTabs.ts`)

## Stream 8 — Retire collision pin

- Rewrote `APP_SHELL_COMPILER_VERSION` comment in `live-apps.ts`
- Updated `live-apps.test.ts` pin rationale
- Included in `38e13cf`

## Verification run locally

| Check | Result |
|-------|--------|
| `@aprovan/patchwork test` | 52 passed |
| `@aprovan/editor test` (scan-tools) | 5 passed |
| `@aprovan/runtime test` | Not run (registry worktree lacks install; tsconfig deps) |
| `@aprovan/workspace test` | Not run (full suite needs build graph) |

## Notes

- Registry `@aprovan/registry-server` sandbox change (stream 3) still needs publish/link for aprovan CI to pick up the prelude `tools` install against published `@aprovan/registry-server@0.2.2`.
- PostHog `chat-patchwork-widget` prompt should be archived/stubbed in PostHog itself (out of repo scope).
