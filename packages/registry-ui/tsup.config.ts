import { defineConfig } from "tsup";

export default defineConfig({
  // `editor` is a separate entry so consumers that never render the TS editor
  // don't pull `typescript` + CodeMirror into their module graph.
  entry: [
    "src/index.tsx",
    "src/editor.tsx",
    "src/dependency-panel.tsx",
    "src/workflows-panel.tsx",
    "src/apps-panel.tsx",
    "src/run-view.tsx",
    "src/tailor.tsx",
    "src/renderers.tsx",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react", "@aprovan/editor", "@aprovan/editor/ts"],
  // CSS imports become their text: tailor.tsx bundles the React Flow base
  // stylesheet (and its own tailor.css) to self-inject at runtime, so the
  // graph stays usable on hosts that never imported the stylesheets. The
  // published `./tailor.css` asset is still the copy from onSuccess below.
  loader: { ".css": "text" },
  // Dependencies are external by default, which would leave the base.css
  // import as a bare specifier for the consumer's bundler to guess at —
  // always inline stylesheets instead, the loader above makes them strings.
  noExternal: [/\.css$/],
  onSuccess:
    "cp src/tailor.css dist/tailor.css && " +
    "cp node_modules/web-tree-sitter/tree-sitter.wasm dist/ && " +
    "cp node_modules/tree-sitter-javascript/tree-sitter-javascript.wasm dist/",
});
