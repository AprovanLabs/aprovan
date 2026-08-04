import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.tsx",
    "auth/index": "src/auth/index.ts",
    "gateway/index": "src/gateway/index.ts",
    "shell/index": "src/shell/index.tsx",
    "apps-store/index": "src/apps-store/index.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom", "@aprovan/patchwork", "@aprovan/patchwork/namespace-core"],
});
