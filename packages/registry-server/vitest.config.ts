import { defineConfig } from "@aprovan/vitest-config";

export default {
  test: defineConfig("node", {
    include: ["tests/**/*.test.ts"],
    testTimeout: 120_000,
    alias: {
      "@utdk/common/compat": new URL("../utdk/common/compat.ts", import.meta.url).pathname,
      "@utdk/common/auth": new URL("../utdk/common/auth.ts", import.meta.url).pathname,
      "@utdk/common": new URL("../utdk/common/index.ts", import.meta.url).pathname,
      "@utdk/mcp-core": new URL("../mcp-core/src/index.ts", import.meta.url).pathname,
      "utdk/registry.json": new URL("../utdk/registry.json", import.meta.url).pathname,
      // Vite 5.4.x does not resolve wildcard subpath exports with directory separators;
      // alias the deep import directly to the dist file.
      "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js": new URL(
        "node_modules/@modelcontextprotocol/sdk/dist/esm/server/webStandardStreamableHttp.js",
        import.meta.url,
      ).pathname,
    },
  }),
};
