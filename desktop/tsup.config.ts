import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      main: "src/main.ts",
      bridge: "src/bridge.ts",
      protocol: "src/protocol.ts",
      platform: "src/platform.ts",
    },
    format: ["esm"],
    platform: "node",
    target: "node20",
    sourcemap: true,
    dts: true,
    clean: true,
    external: ["electron"],
  },
  {
    entry: {
      preload: "src/preload.ts",
    },
    format: ["cjs"],
    platform: "node",
    target: "node20",
    sourcemap: true,
    dts: false,
    clean: false,
    external: ["electron"],
    outExtension() {
      return { js: ".cjs" };
    },
  },
]);
