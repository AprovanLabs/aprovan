## 1. Registry repo purge

> Depends-on: - | Touches: registry/infra/cdk.out/**, registry/packages/fn/**, registry/apps/tailor/**, registry/experiments/**, registry/packages/utdk-isolate/**, registry/apps/workspace/src/isolate.ts, registry/apps/workspace/src/**/*.test.ts, registry/temp.md, registry/tasks.md, registry/utcp_config.json, registry/uv.toml, registry/.python-version, registry/.registry/** | Verify: cd registry && pnpm -r typecheck && pnpm -r build && pnpm --filter @aprovan/workspace test

- [ ] 1.1 `rm -rf registry/infra/cdk.out` (6.7 GB gitignored build artifact; not git-tracked, local
      cleanup only)
- [ ] 1.2 Delete `registry/packages/fn` (`@utdk/fn`, 945 LOC, fully orphaned — confirmed zero
      importers of `@utdk/fn` across all three repos)
- [ ] 1.3 Delete `registry/apps/tailor` (`@aprovan/tailor`, 1,456 LOC, duplicated into
      `registry-ui/src/tailor/`; confirmed `registry-ui/src/apps/workflow-detail.tsx` imports the
      `registry-ui/src/tailor/` copy, not `apps/tailor`)
- [ ] 1.4 Delete `registry/experiments/` (1,610 LOC, last touched 2026-03, no importers)
- [ ] 1.5 Delete `registry/packages/utdk-isolate` (`@utdk/isolate` package) in its entirety
- [ ] 1.6 In `registry/apps/workspace/src/isolate.ts`: remove `tryLoadIsolate`, the
      `import("@utdk/isolate")` dynamic import, its surrounding try/catch, and the
      `@ts-ignore`/APR-15 comments. Rename the direct executor (currently documented as
      "Fallback executor — direct execution for development... no sandboxing") to be the intended
      primary executor — update its name/doc comments to drop "fallback"/"for development"
      framing. Keep `getProviderModule`, `IsolateExecuteOptions`, `IsolateResult`,
      `IsolateExecutor`, and all LRU cache functions (`putProviderModule`,
      `setProviderModuleForTesting`, `isProviderCached`, `invalidateProvider`,
      `resetProviderCache`) with unchanged signatures (tech-plan D4)
- [ ] 1.7 Update the module-level doc comment at the top of `isolate.ts` (currently describes the
      "When `packages/utdk-isolate` (APR-15) is available..." two-path design) to describe the
      single-path design
- [ ] 1.8 Delete `registry/temp.md`, `registry/tasks.md`, `registry/utcp_config.json`,
      `registry/uv.toml`, `registry/.python-version`, `registry/.registry/`
- [ ] 1.9 Grep the repo for stragglers: `grep -rn '@utdk/fn\|@utdk/isolate\|utdk-isolate\|apps/tailor' registry --include=*.ts --include=*.tsx --include=*.json | grep -v node_modules` must return nothing outside `.turbo` cache dirs

## 2. Aprovan repo purge

> Depends-on: - | Touches: aprovan/packages/bobbin/**, aprovan/packages/mcp-app-server/**, aprovan/packages/patchwork/**, aprovan/packages/compiler/src/vfs/**, aprovan/packages/compiler/src/index.ts, aprovan/packages/compiler/src/__tests__/vfs-core.test.ts, aprovan/packages/editor/**, aprovan/packages/images/**, aprovan/client/web/.utcp_config.json, aprovan/client/web/package.json, aprovan/docs/temp.md | Verify: cd aprovan && pnpm -r typecheck && pnpm -r build && pnpm --filter @aprovan/patchwork-compiler test

- [ ] 2.1 Delete `packages/bobbin` (`@aprovan/bobbin`, 5,971 LOC) in its entirety
- [ ] 2.2 In `packages/editor/src/components/edit/EditModal.tsx`: remove the `Bobbin` import and
      component usage (the `<Bobbin ... onChanges={handleBobbinChanges} .../>` overlay), the
      `bobbinChanges` state, `handleBobbinChanges`, the "visual changes will be included" pill UI,
      and the YAML-serialization branch that folds `bobbinChanges` into the prompt
      (`serializeChangesToYAML`). Keep the AI text-edit loop (`editInput`, `session.isApplying`,
      the submit handler minus the bobbin-YAML branch) intact — this is the confirmed scope from
      decision record item 2 ("accepting loss of the visual-edit panel in EditModal")
- [ ] 2.3 Remove `@aprovan/bobbin` from `packages/editor/package.json` and
      `client/web/package.json` dependencies, and from `packages/editor/tsup.config.ts` if
      referenced there
- [ ] 2.4 Delete `packages/mcp-app-server` (`@aprovan/patchwork-mcp`, 4,112 LOC) in its entirety
- [ ] 2.5 Delete `packages/patchwork` in its entirety (`@aprovan/patchwork`) — confirmed its only
      real source consumer was `mcp-app-server/src/registry-backend.ts` (deleted in 2.4);
      `client/web/package.json`'s dependency on it has no source import (tech-plan D1). This
      supersedes the decision record's narrower "delete `types.ts`, shrink to `mcp.ts` if still
      consumed" instruction — nothing consumes it after 2.4
- [ ] 2.6 Remove `@aprovan/patchwork` from `client/web/package.json` dependencies
- [ ] 2.7 Delete `packages/compiler/src/vfs/store.ts`, `packages/compiler/src/vfs/backends/http.ts`,
      `packages/compiler/src/vfs/backends/indexeddb.ts`, `packages/compiler/src/vfs/sync/` (all of
      `resolver.ts`, `engine.ts`, `differ.ts`). Keep `vfs/project.ts`, `vfs/types.ts`,
      `vfs/core/**`, `vfs/backends/memory.ts`
- [ ] 2.8 Update `packages/compiler/src/vfs/index.ts` to drop the re-exports of `VFSStore`,
      `SyncEngineImpl`/`SyncEngineConfig`, `hashContent`/`readChecksum`/`readChecksums`,
      `resolveConflict`/`ConflictResolutionInput`, `IndexedDBBackend`, `HttpBackend`/
      `HttpBackendConfig`. Keep the `core/types.js` and `core/utils.js` re-exports, `VirtualFS`,
      `MemoryBackend`, and the `project.js` exports
- [ ] 2.9 Update `packages/compiler/src/index.ts`'s `// VFS` export block (currently exports
      `VFSStore, createProjectFromFiles, createSingleFileProject, resolveEntry, detectMainFile,
      IndexedDBBackend, HttpBackend` and types `VirtualFile, VirtualProject, ChangeRecord,
      HttpBackendConfig, VFSStoreOptions, WatchCallback, WatchEventType`) to drop `VFSStore`,
      `IndexedDBBackend`, `HttpBackend`, `HttpBackendConfig`, `VFSStoreOptions`; keep
      `createProjectFromFiles`, `createSingleFileProject`, `resolveEntry`, `detectMainFile`,
      `VirtualFile`, `VirtualProject`, `ChangeRecord`, `WatchCallback`, `WatchEventType`
- [ ] 2.10 Trim `packages/compiler/src/__tests__/vfs-core.test.ts`: remove the `describe("vfs/sync/differ")`
      block (imports `hashContent` from `../vfs/sync/differ.js`) and the
      `describe("vfs/sync/resolver")` block (imports `resolveConflict`,
      `ConflictResolutionInput` from `../vfs/sync/resolver.js`), and their now-unused imports.
      Keep `describe("vfs/core/types")` and `describe("vfs/core/utils")` (tech-plan D3)
- [ ] 2.11 In `packages/editor/src/lib/vfs.ts`: delete `getVFSStore`, `saveProject`, `loadProject`,
      `listProjects`, `saveFile`, `loadFile`, `subscribeToChanges`, `httpWidgetVfs`,
      `isVFSAvailable`, `getVFSConfig`, `vfsConfigCache`, `storeInstance`, `VFS_BASE_URL`, and the
      `VFSStore`/`HttpBackend` import from `@aprovan/patchwork-compiler`. Keep (move into
      `packages/editor/src/components/CodePreview.tsx` or a new small `types.ts` in the same
      directory) the `WidgetVfs` interface — it's the real contract `client/web`'s
      `workspaceWidgetVfs` implements. Delete `packages/editor/src/lib/vfs.ts` itself once
      `WidgetVfs` is relocated, if nothing else remains in it (tech-plan D2)
- [ ] 2.12 In `packages/editor/src/components/CodePreview.tsx`: remove the `import {
      httpWidgetVfs, type WidgetVfs } from '../lib/vfs'` (update the `WidgetVfs` import path per
      2.11), remove the `vfs = httpWidgetVfs` default, make `vfs: WidgetVfs` a required prop
- [ ] 2.13 Update `packages/editor/src/index.ts`: remove the `getVFSConfig, getVFSStore,
      saveProject, loadProject, listProjects, saveFile, isVFSAvailable, httpWidgetVfs, type
      WidgetVfs` export block (from `./lib/vfs`); add a `type WidgetVfs` export from its new
      location (2.11); remove `export { CodeBlockExtension } from "./components/CodeBlockExtension"`
      (confirmed used internally by `MarkdownEditor.tsx` and `MarkdownPreview.tsx` as a Tiptap
      extension — do NOT delete the file, only stop re-exporting it from the public barrel) and
      `export { ServicesInspector, ... }` from `./components/ServicesInspector` — keep exporting
      `type ServiceInfo` from the same file (confirmed `client/web/src/components/ServicesMenu.tsx`
      imports `type ServiceInfo`; it does not import the `ServicesInspector` component)
- [ ] 2.14 In `packages/editor/src/components/ServicesInspector.tsx`: delete the `ServicesInspector`
      component and its `ServicesInspectorProps` interface (confirmed zero renders anywhere,
      including internally within `packages/editor`); keep the `ServiceInfo` interface (and its
      imports) in this file since `ServiceInfo` is still exported and consumed externally. Leave
      `packages/editor/src/components/CodeBlockExtension.tsx` untouched — it's a live internal
      dependency of `MarkdownEditor.tsx`/`MarkdownPreview.tsx`, only its public re-export is dead
- [ ] 2.15 Delete `packages/images/ink` and `packages/images/vanilla` (untracked dist litter);
      leave `packages/images/shadcn` untouched
- [ ] 2.16 Delete `client/web/.utcp_config.json` and `docs/temp.md`
- [ ] 2.17 Remove `@aprovan/devtools` from `client/web/package.json` dependencies (declared, never
      imported — confirmed by repo-wide grep for `devtools` under `client/web/src`)
- [ ] 2.18 Grep the repo for stragglers: `grep -rn '@aprovan/bobbin\|@aprovan/patchwork-mcp\|@aprovan/patchwork"\|VFSStore\|IndexedDBBackend\|HttpBackend\|SyncEngineImpl\|ServicesInspectorProps' aprovan --include=*.ts --include=*.tsx --include=*.json | grep -v node_modules | grep -v dist/` must return nothing outside `.turbo` cache dirs. Separately confirm `CodeBlockExtension` no longer appears in `packages/editor/src/index.ts` (public barrel) while it still appears in `MarkdownEditor.tsx`/`MarkdownPreview.tsx` (internal use, expected) — and confirm `ServicesInspector` (the component) no longer appears anywhere, while `ServiceInfo` still does

## 3. Core repo purge

> Depends-on: - | Touches: core/infra/aws/dist/**, core/infra/cloudflare/tunnel.tf | Verify: cd core/infra/aws && pnpm run build && pnpm run typecheck; cd core/infra/cloudflare && make validate

- [ ] 3.1 `rm -rf core/infra/aws/dist/` (confirmed untracked by git — `git ls-files` returns zero
      results — local working-tree cleanup only, no diff expected)
- [ ] 3.2 Delete `core/infra/cloudflare/tunnel.tf` (confirmed standalone: defines
      `random_password.tunnel_secret`, `cloudflare_tunnel.tunnel`,
      `cloudflare_tunnel_config.example_config` with placeholder values — `"foobar"`,
      `10.0.0.2/3`; no other `.tf` file in `infra/cloudflare/` references these resource names;
      fully superseded by `workspace-tunnel.tf`, which stays)
- [ ] 3.3 `cd core/infra/aws && pnpm run build` to confirm `dist/` regenerates clean from source
      after deletion

## 4. npm deprecations

> Depends-on: 1, 2 | Touches: (none — npm registry state only, no repo files) | Verify: npm view <package> --json | grep -q '"deprecated"' for each package listed below

- [ ] 4.1 Confirm npm publish auth for the `@aprovan` scope is available to the executing agent;
      if not, stop here and leave 4.2–4.5 unchecked rather than skipping silently (PRD constraint)
- [ ] 4.2 `npm deprecate @aprovan/bobbin "Deleted in purge-dead-code (WS-1); the visual-edit panel is discontinued. See git history for the source."`
- [ ] 4.3 `npm deprecate @aprovan/patchwork-mcp "Deleted in purge-dead-code (WS-1); MCP-Apps distribution is rebuild-later-if-ever. See git history for the source."`
- [ ] 4.4 `npm deprecate @aprovan/patchwork "Deleted in purge-dead-code (WS-1); its only consumer (@aprovan/patchwork-mcp) was removed. See git history for the source."`
- [ ] 4.5 Confirm npm publish auth for the `@utdk` scope is available; if not, stop here and leave
      4.6–4.7 unchecked
- [ ] 4.6 `npm deprecate @utdk/fn "Deleted in purge-dead-code (WS-1); fully orphaned. See git history in the registry repo."`
- [ ] 4.7 `npm deprecate @utdk/isolate "Deleted in purge-dead-code (WS-1); the gateway's direct in-process executor is now the sole execution path (registry/apps/workspace/src/isolate.ts). See git history in the registry repo."`
- [ ] 4.8 Verify none of the above were unpublished: `npm view <package> versions --json` still
      lists all prior published versions for each package
