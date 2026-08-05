import { defineConfig } from "tsup";

export default defineConfig({
  // `ts` is a separate entry so consumers that never render a typed editor
  // don't pull `typescript` + CodeMirror into their module graph.
  entry: {
    index: "src/index.ts",
    ts: "src/ts/index.tsx",
  },
  format: ["esm"],
  dts: false,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@aprovan/patchwork",
    "@aprovan/patchwork/namespace-types",
    "@utdk/remote",
  ],
  treeshake: true,
});
