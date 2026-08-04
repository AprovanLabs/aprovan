## Problem

Code editing and viewing is implemented six times over. Four syntax highlighters are in play (a Shiki singleton, a second Shiki instance inside the file-tree dependency, CodeMirror's Lezer, and a hand-rolled regex tokenizer), the transparent-textarea-over-highlighted-`<pre>` trick is implemented twice with disjoint bug sets, four markdown pipelines coexist, two near-copy compositions of the same four primitives differ only in which host renders them, three save affordances serve the same three write policies, and two type-bundle generators feed the same virtual-file API with two independent PascalCase implementations. Meanwhile the product's editor is a `<textarea>` with no language service, and `CompileOptions.typescript` — passed on every compile — is never read by anything.

## Users & Jobs

- **Widget authors** — need diagnostics before running, and completions over what is actually callable.
- **The generating model** — iterates on compile errors, not on hover tooltips; it needs type errors surfaced into the loop that already carries runtime errors back to it.
- **Platform maintainers** — need one editor to fix, not six near-copies whose bugs are not shared.
- **The registry playground** — already has the only real language service in either repository and must keep working through the consolidation.

## Goals

- One syntax highlighter, one editable-code component, one markdown pipeline, one editor composition, one save affordance, one type-bundle generator.
- The product editor has TypeScript diagnostics, completions, and hover.
- A failed typecheck surfaces through the same path as a failed compile, so it reaches the logs panel, the problem digest, and the self-heal loop without new plumbing.
- The widget runtime gains typechecking without gaining a TypeScript dependency.
- A published app page loads zero TypeScript compiler bytes.
- Each open editor has its own type environment; declarations from one project cannot leak into another.

## Non-Goals

- Does **not** change the `tools` root, plugin semantics, or the dependency scan — those come from `tools-global`, which also performs the package renames and removes the `uses=` parser.
- Does **not** author output schemas or platform return types — those are `utdk-output-schemas` and `interfaces-native-provider`.
- Does **not** move TypeScript off the main thread. The injected interface is designed so a worker can be swapped in later without redesign.
- Does **not** rewrite the file tree. Its shadow-root theming and portaled context menu are load-bearing and untested; it moves last or not at all.

## Capabilities

### New Capabilities

- `unified-code-editor`: one editor package, what it absorbs, what it deletes, and the host-extension seams that must survive unchanged.
- `widget-typecheck`: typechecking as an injected capability of the widget runtime, its per-project environment, and how diagnostics reach the existing error paths.

### Modified Capabilities

None.

## Constraints & Assumptions

- **Hard**: the TypeScript language service currently lives in a package consumed *cross-repo through npm* by the public registry playground, pinned by exact version, with a service-worker rule keyed on its chunk filename. Any move or rename is a breaking release requiring coordination, not a local refactor.
- **Hard**: `typescript` is ~23 MB installed and ~4 MB shipped. It must stay behind a lazy boundary and out of the app-shell path.
- **Hard**: the widget runtime's dependencies are `esbuild-wasm` and a schema validator. Adding a typechecker as a direct dependency would put it on every published app page.
- **Hard**: the logs source is consumed *structurally* by the host, deliberately without importing the type. Changing its shape breaks the decoupling silently.
- **Assumption (unconfirmed)**: replacing the `<textarea>` with a real editor is acceptable in the chat edit pane and file pane. It changes text-entry behaviour users may have adapted to.
- **Assumption (unconfirmed)**: the fidelity probe that decides whether a markdown file opens in rich or source view can be preserved. It works by round-tripping through a headless rich-text instance, so it couples view selection to that dependency.

## Open Questions

- **Does the consolidated editor keep the rich-text markdown dependency, or standardise on the lighter renderer?** Recommendation: keep it. The frontmatter split, the editable language field on fenced blocks, and the fidelity probe all depend on it, and the lighter renderer cannot express any of the three.
- **Which of the two near-copy compositions survives?** Recommendation: the one behind the editable path, since it carries the write policies and stale-file handling the other lacks; the read-only path is the smaller of the two to re-derive.
