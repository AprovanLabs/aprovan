## 1. Injected checker seam

> Depends-on: - | Touches: packages/compiler/src/types.ts, packages/compiler/src/compiler.ts, packages/compiler/src/schemas.ts, packages/compiler/src/__tests__/** | Verify: `pnpm --filter @aprovan/patchwork-compiler test`

- [ ] 1.1 Add the `Checker` and `Diagnostic` interfaces from the tech plan; accept an optional `checker` on the compile options.
- [ ] 1.2 Run the checker when supplied and format diagnostics into the existing error-telemetry shape, so the logs panel, problem digest, and self-heal loop pick them up unchanged.
- [ ] 1.3 Make `CompileOptions.typescript` drive the checker instead of being read by nothing — two call sites pass it today.
- [ ] 1.4 Add a test asserting compilation with no checker is byte-identical in behaviour to today.
- [ ] 1.5 Add a dependency assertion: no typechecker in the widget runtime's dependency graph.

## 2. Highlighter and editable code surface

> Depends-on: - | Touches: packages/editor/src/components/edit/CodeBlockView.tsx, packages/editor/src/components/**, registry/apps/registry/src/components/CodeEditor.tsx, registry/apps/registry/src/lib/highlight.tsx | Verify: `pnpm --filter @aprovan/patchwork-editor typecheck`

- [ ] 2.1 Enumerate both transparent-textarea implementations side by side — one has indentation handling and auto-resize, the other scroll synchronisation; record the union before merging.
- [ ] 2.2 Produce one editable code surface carrying that union.
- [ ] 2.3 Produce one highlighter usable both in the app and in the registry site's static pages; delete the ~120-line regex tokenizer.
- [ ] 2.4 Delete the registry site's separate textarea editor once the shared surface serves its lazy-load fallback.
- [ ] 2.5 Add tests for the streaming-code-view scenario, including an unterminated fence.

## 3. Composition and save affordance

> Depends-on: 2 | Touches: packages/editor/src/components/CodePreview.tsx, packages/editor/src/components/edit/**, client/web/src/features/editing/FileEditorPane.tsx, client/web/src/features/tabs/TabContent.tsx | Verify: `pnpm --filter @aprovan/patchwork-web typecheck`

- [ ] 3.1 Enumerate both compositions; re-derive the read-only path from the editable one, which carries the write policies and stale-file handling the other lacks.
- [ ] 3.2 Delete the surviving duplicate (~400 lines of composition and view-state).
- [ ] 3.3 Consolidate the three save affordances into one, preserving direct, staged-with-debounce-and-flush, and read-only behaviour.
- [ ] 3.4 Preserve the four host-extension seams unchanged: storage adapter, custom-preview hook, logs source, composer-controls slot.
- [ ] 3.5 Add tests for the write-policy and stale-file scenarios in `unified-code-editor`.

## 4. Markdown pipeline

> Depends-on: 2 | Touches: packages/editor/src/components/{MarkdownEditor,MarkdownPreview,CodeBlockExtension}.tsx, packages/editor/src/components/markdownRoundTrip.ts, packages/editor/src/components/edit/EditHistory.tsx, client/web/src/features/chat/MessageParts.tsx | Verify: `pnpm --filter @aprovan/patchwork-editor typecheck`

- [ ] 4.1 Standardise on one pipeline; remove the second renderer's two call sites and their hand-copied class strings.
- [ ] 4.2 Preserve the frontmatter split into its own field and the serialized-comparison external resync.
- [ ] 4.3 Preserve the editable language field on fenced blocks.
- [ ] 4.4 Preserve the round-trip fidelity probe that decides rich versus source view; add a test for the `unified-code-editor` fidelity scenario.
- [ ] 4.5 Replace the unhighlighted patch rendering with the shared highlighter, keeping the incremental hunk counter and the visibly-unapplied-hunk behaviour.

## 5. Per-project type environment

> Depends-on: - | Touches: packages/registry-ui/src/editor.tsx | Verify: `pnpm --filter @aprovan/registry-ui typecheck`

- [ ] 5.1 Replace the page-wide singleton environment with one per project.
- [ ] 5.2 Make the root-file list a parameter — a declaration that introduces a global cannot apply while the list is a hardcoded constant.
- [ ] 5.3 Release each environment and its mounted files on teardown.
- [ ] 5.4 Add tests for both `widget-typecheck` environment scenarios: no cross-contamination between two projects, and teardown.
- [ ] 5.5 Add a test asserting a global declaration resolves in project source.

## 6. One type-bundle generator

> Depends-on: 5 | Touches: packages/compiler/src/transforms/namespace-types.ts, registry/apps/registry/src/pages/catalog/types/[...provider].json.ts, registry/apps/registry/src/lib/** | Verify: `pnpm --filter @aprovan/patchwork-compiler test`

- [ ] 6.1 Merge the two generators into one, with a single package-name derivation (each currently has its own).
- [ ] 6.2 Emit the service root as a global declaration rather than as module declarations.
- [ ] 6.3 Incorporate plugin-carried declarations as a second input alongside the gateway's namespace list.
- [ ] 6.4 Mount provider declarations on demand from what the source references; add a test that the full catalogue is not fetched ahead of time.

## 7. Package move and coordinated release

> Depends-on: 3, 4, 5, 6 | Touches: packages/editor/package.json, packages/registry-ui/package.json, tsup configs, registry/apps/registry/src/components/ScriptPlayground.tsx | Verify: `pnpm build && cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web build`

- [ ] 7.1 Move the language-service editor into the consolidated package as a separate entry point, so consumers that never render it do not pull the typechecker into their graph.
- [ ] 7.2 Publish the consolidated package with both entry points.
- [ ] 7.3 Switch the registry playground to the new package, preserving its lazy-import boundary and its service-worker chunk-ignore rule.
- [ ] 7.4 Remove the old entry point only after the consuming site builds green against the new one.
- [ ] 7.5 Add a bundle assertion that the app-shell path loads zero typechecker bytes.

## 8. Wire the checker

> Depends-on: 1, 5, 6, 7 | Touches: client/web/src/features/edit-modal/EditModalHost.tsx, client/web/src/features/editing/FileEditorPane.tsx, packages/editor/src/** | Verify: `pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-compiler test`

- [ ] 8.1 Implement `Checker` over the per-project environment.
- [ ] 8.2 Supply it to the widget runtime from the edit pane and the file pane.
- [ ] 8.3 Verify a type error reaches the logs panel attributed to the source path, and appears in the problem digest sent with an automatic fix.
- [ ] 8.4 Run the checker on the compile that precedes a preview, not per keystroke; record a latency measurement to inform whether that changes.
