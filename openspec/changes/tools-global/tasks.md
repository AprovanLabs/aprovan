## 1. Single namespace-set definition

> Depends-on: - | Touches: packages/compiler/src/namespace-core.ts, server/workspace/src/apps/capabilities.ts, packages/ui/src/apps-store/wire.ts, packages/registry-ui/src/apps/**, packages/registry-ui/src/apps-panel.tsx | Verify: `pnpm --filter @aprovan/patchwork-compiler test && pnpm check-types`

- [x] 1.1 Make `packages/compiler/src/namespace-core.ts` the sole definition of the installed namespace set; export it from the dependency-free subpath so Node consumers can reach it without esbuild-wasm.
- [x] 1.2 Delete the duplicate list in `server/workspace/src/apps/capabilities.ts:40` and import from 1.1.
- [x] 1.3 Delete the third, divergent list in `packages/ui/src/apps-store/wire.ts:798` (3 names vs 6) and import from 1.1; update its consumers in `packages/registry-ui`.
- [x] 1.4 Add a test asserting no other module declares a hardcoded first-party namespace list (satisfies `widget-dependency-scan` / "Single definition of the namespace set").

## 2. `tools` assembly and callable nodes

> Depends-on: 1 | Touches: packages/compiler/src/mount/**, packages/compiler/src/transforms/namespaces.ts, packages/compiler/src/index.ts, packages/compiler/src/__tests__/namespaces.test.ts | Verify: `pnpm --filter @aprovan/patchwork-compiler test`

- [x] 2.1 Add `assembleTools({ namespaces, plugins, transport })` as the single constructor of namespace proxies; make it the only place a proxy is built in this package.
- [x] 2.2 Make each namespace node callable at depth 0 (configure → return node) and dispatching at depth ≥ 1, per tech-plan D2. Depth-0 invocation currently throws; replace that behavior.
- [x] 2.3 Change `generateIframeBridgeScript` to install a single `globalThis.tools` instead of one global per namespace.
- [x] 2.4 Change `mountEmbedded` to install and tear down `tools` only; delete `injectNamespaceGlobals` / `removeNamespaceGlobals` per-namespace paths.
- [x] 2.5 Delete `namespaceImportPlugin`, `generateNamespaceModule`, and `NAMESPACE_MODULE_NAMESPACE`; remove their registration from the esbuild plugin list.
- [x] 2.6 Rewrite `__tests__/namespaces.test.ts` against `tools` (8 existing fixtures assert bare-specifier compilation and must be replaced, not adapted).
- [x] 2.7 Add tests for the three `tools-namespace-root` scenarios that are compiler-observable: root-anchored dispatch, bare global absent, bare specifier not intercepted.

## 3. Workflow sandbox installs `tools`

> Depends-on: 1 | Touches: server/workspace/src/workflows/runner.ts, server/workspace/src/workflows/sandbox.ts, server/workspace/src/sync.ts, server/workspace/tests/{workflows,sandbox,agents,agent-run,webhooks,telemetry,apps,app-domain}.test.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [x] 3.1 Replace the per-namespace `globalThis[ns]` installation in the QuickJS prelude with a single `tools` root built from the same namespace set (tech-plan open question resolved: prelude, not `__boot`).
- [x] 3.2 Delete `RESERVED_SCRIPT_GLOBALS` — with one root there is nothing left to reserve.
- [x] 3.3 Delete `transformWorkflowModule`'s import-rewrite regex in the registry-server sandbox; workflow scripts reach services through `tools` only. Keep the `export default` → `__workflowMain` rewrite.
- [x] 3.4 Remove the second namespace-set construction in `sync.ts:203-210`; use the shared assembly.
- [x] 3.5 Update the inline script fixtures in the eight named test files to `tools.` form.

## 4. Plugin registry

> Depends-on: 2 | Touches: packages/compiler/src/plugins/**, packages/compiler/src/mount/**, client/web/src/lib/telemetry.ts, client/web/src/features/widgets/NotificationPathWidget.tsx | Verify: `pnpm --filter @aprovan/patchwork-compiler test && pnpm --filter @aprovan/patchwork-web typecheck`

- [x] 4.1 Implement `registerMiddleware` and `registerOverride` per the tech plan's interface block; `registerOverride` throws on duplicate namespace.
- [x] 4.2 Wire the registry into `assembleTools()` so overrides receive the node they shadow (wrap-with-delegate) and may provide namespaces absent from the gateway list.
- [x] 4.3 Accept an optional `types` declaration string per override and expose it to the type generator.
- [x] 4.4 Convert `widgetTelemetrySdk` in `client/web/src/lib/telemetry.ts` from an ad-hoc facade into a registered `telemetry` override that delegates to `telemetry.export`.
- [x] 4.5 Convert the notification payload binding into a plugin-provided `notification` namespace; delete `NOTIFICATION_IMPORT_RE` and the source-rewriting in `NotificationPathWidget.tsx`.
- [x] 4.6 Add tests for the `namespace-plugins` scenarios: chained middleware, delegate-receiving override, plugin-provided namespace, duplicate-registration error, and that sandboxed code cannot register.

## 5. Dependency scan replaces `uses=`

> Depends-on: 1 | Touches: packages/editor/src/lib/code-extractor.ts, packages/editor/src/index.ts, client/web/src/features/chat/MessageParts.tsx, client/web/src/features/widgets/ChatWidgetArtifact.tsx, packages/registry-ui/src/dependency-panel.tsx, registry/packages/runtime/src/imports.ts | Verify: `pnpm --filter @aprovan/patchwork-editor typecheck && pnpm --filter @aprovan/patchwork-web typecheck`

- [x] 5.1 Implement the `tools.`-access scanner returning `{ namespaces, unresolved }`; retarget `parseScriptDependencies` in `registry/packages/runtime/src/imports.ts` from import specifiers to `tools.` accesses.
- [x] 5.2 Handle shadowing — a local binding named `tools` in an inner scope must not be attributed as a service access.
- [x] 5.3 Set `unresolved: true` for computed access (`tools[expr]`) and surface it to consumers rather than reporting a complete list.
- [x] 5.4 Delete `parseUsesAttribute` and `WidgetDependency` and their re-exports; remove `uses` threading from `MessageParts.tsx` and `ChatWidgetArtifact.tsx`.
- [x] 5.5 Repoint the dependency panel to the scanner's output, rendering the incomplete-list indicator when `unresolved`.
- [x] 5.6 Add tests for the five `widget-dependency-scan` scenarios.

## 6. Prompt single-source and reseed

> Depends-on: 2, 3 | Touches: data/prompts/**, scripts/seed-prompts.ts, server/workspace/examples/**, server/workspace/scripts/seed-example-{app,workflows}.ts, server/workspace/scripts/seed-tasks-app.ts, .github/workflows/** | Verify: `pnpm --filter @aprovan/workspace test`

- [x] 6.1 Fix `scripts/seed-prompts.ts:25` — it imports `../apps/workspace/src/fs-store.js`, a path that has not existed since the `apps/` → `server/` rename.
- [x] 6.2 Rewrite `data/prompts/chat-patchwork-widget.md` to teach `tools` only: remove the `uses=` fence example, the bare-globals API catalogue, and the bare-import examples.
- [x] 6.3 Delete the duplicate prompt in the registry repo and reconcile the two known divergences (`workflows.trace({ runId })` vs `{ run: runId }` — determine which is correct against `workflows/service.ts`).
- [x] 6.4 Rip out PostHog-managed prompt resolution: `resolveStoredPrompt` reads workspace FS only; remove PostHog fetch/cache from `promptStore.ts`. Archive or stub the PostHog `chat-patchwork-widget` prompt so it cannot silently override the repo.
- [x] 6.5 Rewrite the seeded example content to `tools.` form: `examples/tasks/**` (6 files), `examples/liift4/index.tsx`, and the `GITHUB_STATUS_SCRIPT` in `seed-example-workflows.ts`.
- [x] 6.6 Reseed the example app, example workflows, tasks app, and prompts.

## 7. Package renames

> Depends-on: 2, 3, 4, 5 | Touches: packages/compiler/package.json, packages/editor/package.json, all importers across client/web, server/workspace, packages/** | Verify: `pnpm check-types && pnpm build`

- [x] 7.1 Rename `@aprovan/patchwork-compiler` → `@aprovan/patchwork` and update every importer. Land as its own commit.
- [x] 7.2 Rename `@aprovan/patchwork-editor` → `@aprovan/editor` and update every importer. Land as its own commit.
- [x] 7.3 Update the esm.sh specifier and version constant in `server/workspace/src/routes/live-apps.ts` and the duplicate image pin in `client/web/src/features/widgets/useCompilerBootstrap.ts`.
- [x] 7.4 Leave all `patchwork:*` and `patchwork_access_token` localStorage keys unchanged; add a comment recording that this is deliberate.
- [x] 7.5 Update the publish workflow's package list.

## 8. Retire the collision pin

> Depends-on: 7 | Touches: server/workspace/src/routes/live-apps.ts, server/workspace/tests/live-apps.test.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [x] 8.1 Rewrite the `APP_SHELL_COMPILER_VERSION` comment block (lines 64-79): the hazard it documents — `vfs`, `events`, and `agents` resolving to unrelated npm packages — no longer exists once no bare specifier is claimed.
- [x] 8.2 Update `live-apps.test.ts:343`, which asserts that bare `keyvalue`/`vfs` specifiers must not reach esm.sh, to assert the new invariant instead.
- [x] 8.3 Decide and document whether the exact pin is still warranted for reproducibility alone, now that correctness no longer depends on it.
