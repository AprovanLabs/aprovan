## ADDED Requirements

### Requirement: Confirmed-dead packages and files are absent from the tree
Each package, directory, and file identified as dead in `docs/tasks/refactor-decisions.md`
WS-1 (and the stray consumers found while authoring this change — `packages/patchwork` and the
`editor/src/lib/vfs.ts` HTTP-VFS client) SHALL NOT exist, and no source file in `aprovan`,
`registry`, or `core` SHALL import from them, after this change is applied.

#### Scenario: Registry repo dead code is gone
- **WHEN** the `registry` repo tree is inspected after this change
- **THEN** `infra/cdk.out`, `packages/fn`, `apps/tailor`, `experiments/`, `packages/utdk-isolate`,
  `temp.md`, `tasks.md`, `utcp_config.json`, `uv.toml`, `.python-version`, and `.registry/` do not
  exist, and a repo-wide grep for `@utdk/fn`, `apps/tailor`, `@utdk/isolate`, and `utdk-isolate`
  returns no matches outside `.git` history

#### Scenario: Aprovan repo dead code is gone
- **WHEN** the `aprovan` repo tree is inspected after this change
- **THEN** `packages/bobbin`, `packages/mcp-app-server`, `packages/patchwork`,
  `packages/compiler/src/vfs/{store.ts,backends/http.ts,backends/indexeddb.ts,sync/**}`,
  `packages/images/{ink,vanilla}`, `client/web/.utcp_config.json`, and `docs/temp.md` do not
  exist; the `ServicesInspector` React component (but not the `ServiceInfo` type it shares a file
  with) is deleted from `packages/editor`, and the HTTP-backed VFS store functions
  (`getVFSStore`, `saveProject`, `loadProject`, `listProjects`, `saveFile`, `loadFile`,
  `subscribeToChanges`, `httpWidgetVfs`, `isVFSAvailable`, `getVFSConfig`) are gone entirely;
  `CodeBlockExtension` is no longer exported from `packages/editor/src/index.ts`'s public barrel
  but its component file is untouched (it remains a live internal dependency of
  `MarkdownEditor.tsx`/`MarkdownPreview.tsx`); and `client/web/package.json` no longer declares
  `@aprovan/devtools` or `@aprovan/patchwork` as dependencies

#### Scenario: Core repo dead infra is gone
- **WHEN** the `core` repo tree is inspected after this change
- **THEN** `infra/aws/dist/` and `infra/cloudflare/tunnel.tf` do not exist, and no `.tf` file
  references the resources they defined (`cloudflare_tunnel.tunnel`,
  `cloudflare_tunnel_config.example_config`)

#### Scenario: Every touched repo still builds, typechecks, and tests clean
- **WHEN** `pnpm -r build` and `pnpm -r typecheck` (or `check-types`) run in `aprovan` and
  `registry`, and `pnpm -r build && pnpm -r typecheck` runs in `core`, after this change
- **THEN** every command exits 0, and the `test` script of every package that has one (including
  `@aprovan/workspace`, `@aprovan/patchwork-compiler`, `@aprovan/patchwork-editor`) exits 0

### Requirement: The in-process provider executor is the sole execution path
`registry/apps/workspace/src/isolate.ts` SHALL execute `@utdk/*` provider modules through exactly
one code path: the direct in-process executor (previously named the "fallback"), with lazy
`import('utdk/<provider>')` and the existing LRU cache. No code path SHALL attempt to dynamically
import a `@utdk/isolate` package.

#### Scenario: No dead dynamic-import branch remains
- **WHEN** `registry/apps/workspace/src/isolate.ts` is read after this change
- **THEN** it contains no `tryLoadIsolate` function, no `import("@utdk/isolate")` call, and no
  `@ts-ignore` comment referencing APR-15; the direct executor is exported under its own name
  (not "fallback") and is the only `IsolateExecutor` implementation in the file

#### Scenario: Existing gateway callers are unaffected
- **WHEN** any caller in `apps/workspace` invokes provider execution through `isolate.ts`'s public
  interface (`getProviderModule`, the executor's `execute`) after this change
- **THEN** the call succeeds with the same request/response shape as before the rename — only the
  internal dead branch and its name are gone, not the public interface

### Requirement: Deleted-but-published npm packages are deprecated, never unpublished
Every package removed from a repo by this change that was previously published to npm SHALL be
marked deprecated via `npm deprecate`, and SHALL NOT be unpublished.

#### Scenario: Deprecated packages remain resolvable
- **WHEN** `npm view <package>` is run for `@aprovan/bobbin`, `@aprovan/patchwork-mcp`,
  `@aprovan/patchwork`, `@utdk/fn`, or `@utdk/isolate` after this change
- **THEN** the command returns existing published versions (no 404) and the package's
  `deprecated` field is set to a non-empty message
