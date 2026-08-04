## Problem

Widget and workflow code reaches Aprovan services through ~20 bare global names (`vfs`, `keyvalue`, `github`, …) and matching bare import specifiers. Three of those names — `vfs`, `events`, `agents` — are real, unrelated npm packages that resolve `200` on esm.sh, so the only thing preventing a published app from silently loading a stranger's code is esbuild plugin ordering. The flat namespace also forces a reserved-name list, forces an exact compiler version pin on every published app shell, and gives a generating model no single anchor to discover capabilities from — the reported failure (`import vfs from '@utdk/vfs'` → "does not provide an export named 'default'", `import vfs from 'vfs'` → "Service namespace \"vfs\" is not available in this runtime") is the symptom.

## Users & Jobs

- **The generating model** (primary author of widget and workflow code) — needs one discoverable root it cannot misspell into a different package, and no import bookkeeping to forget.
- **Widget authors editing by hand** — need to know what is callable without reading the gateway source.
- **App publishers** — need their published app to keep working when the runtime is upgraded, without a version pin whose only job is to prevent an npm collision.
- **The platform itself** — needs a machine-readable list of what a widget touches, to compute an app's blast radius.

## Goals

- A single global root `tools` is the documented and primary way to reach every namespace; `tools.<ns>.<op>(args)` maps 1:1 to `POST /tools/<ns>/<op>`.
- Zero reserved operation names: a provider operation named `client` is reachable.
- Zero bare service globals and zero bare service import specifiers remain in the compiler, the workflow sandbox, or any seeded content.
- Exactly one definition of the injected namespace set exists in the codebase (today: three, with two different values).
- A widget's service dependencies are derived by static scan of `tools.` accesses, with no authored declaration.
- The widget authoring prompt exists once, in this repo, and teaches only the `tools` convention.
- A published app shell no longer requires an exact runtime version pin to avoid CDN collisions.

## Non-Goals

- Does **not** change how profiles or interface instances are addressed — that is `profiles-unified`.
- Does **not** change which namespaces exist, what they return, or the core-service/interface routing precedence — that is `interfaces-native-provider`.
- Does **not** add TypeScript checking or editor language services — that is `editor-consolidation`.
- Does **not** provide backwards compatibility. Bare namespaces stop resolving; existing workspace content is snapshotted, not migrated.
- Does **not** rename `patchwork:*` localStorage keys (would sign every user out for no benefit here).

## Capabilities

### New Capabilities

- `tools-namespace-root`: the single `tools` global, callable namespace nodes, how the host assembles it, and what a sandbox may and may not see.
- `namespace-plugins`: host-registered middleware and namespace overrides, wrap-with-delegate semantics, and plugin-carried type declarations.
- `widget-dependency-scan`: deriving a widget's or script's service dependency list from `tools.` accesses instead of authored imports or a `uses=` attribute.
- `widget-authoring-prompt`: single-source ownership of the widget authoring prompt and its relationship to the PostHog-managed override.

### Modified Capabilities

None — `openspec/specs/` is empty.

## Constraints & Assumptions

- **Hard**: a widget in a production sandbox has no base URL, no token, and a `null` origin. Any package it imports cannot self-configure; the host must hand it a transport. Verified across all five reach paths.
- **Hard**: plugin registration must be a host capability established before the sandbox exists. If widget code could register an override on `tools.github`, it would see every subsequent call's arguments.
- **Hard**: the app shell regenerates its HTML per request, so published apps pick up the new runtime immediately. There is no window in which old and new coexist.
- **Assumption (confirmed)**: the product is in a trial stage; breaking deployed apps and workspace content is acceptable. A reference snapshot of 1,153 workspace files was taken to `~/aprovan-snapshots/workspace-2026-08-03/`.
- **Assumption (unconfirmed)**: `data/prompts/chat-patchwork-widget.md` has drifted from whatever PostHog currently serves. The seeder has been broken since the `apps/` → `server/` rename (`scripts/seed-prompts.ts:25` imports a nonexistent path), so the repo copy may never have reached a live workspace.
- **Assumption (unconfirmed)**: no consumer outside these two repos depends on `@aprovan/patchwork-compiler` or `@aprovan/patchwork-editor` by name.

## Open Questions

> Settled 2026-08-03.

- **Should the deprecation of bare globals emit a runtime warning for one release rather than failing outright?** **No.** Hard cutover; content is reseeded.
- **Does the PostHog-managed prompt need to be reconciled before or after the repo rewrite?** **Rip out PostHog-managed prompts in favor of repo-managed early** (before/with the rewrite). `resolveStoredPrompt` becomes workspace-FS-only; do not keep a divergence CI check. PostHog `chat-patchwork-widget` must stop being the production source.
