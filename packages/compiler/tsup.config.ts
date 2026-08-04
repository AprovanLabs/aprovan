import { defineConfig } from "tsup";

export default defineConfig({
  // `namespace-types` is a second entry, not a re-export of the first: the
  // gateway imports it from Node to generate an app's `__sdk__.d.ts`, and that
  // path must never pull esbuild-wasm or DOM code in with it.
  entry: {
    index: "src/index.ts",
    "namespace-core": "src/namespace-core.ts",
    "namespace-types": "src/transforms/namespace-types.ts",
  },
  format: ["esm", "cjs"],
  target: "node20",
  clean: true,
  dts: true,
  splitting: false,
  sourcemap: true,
  shims: true,
  external: ["react", "react-dom", "ink"],
  skipNodeModulesBundle: true,
});
