import { defineConfig } from "../../config/vitest-config/src/index.ts";

export default {
  test: defineConfig("node", {
    include: ["tests/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
    env: {
      DYNAMO_ENDPOINT: "http://localhost:8000",
      AWS_REGION: "us-east-1",
      AWS_ACCESS_KEY_ID: "local",
      AWS_SECRET_ACCESS_KEY: "local",
    },
    alias: {
      "@utdk/common/telemetry": new URL("../../packages/utdk/common/telemetry.ts", import.meta.url).pathname,
      "@utdk/common/rateLimit": new URL("../../packages/utdk/common/rateLimit.ts", import.meta.url).pathname,
      "@utdk/common/auth": new URL("../../packages/utdk/common/auth.ts", import.meta.url).pathname,
      "@utdk/common/compat": new URL("../../packages/utdk/common/compat.ts", import.meta.url).pathname,
      "@utdk/common/webhooks": new URL("../../packages/utdk/common/webhooks.ts", import.meta.url).pathname,
      "@utdk/common": new URL("../../packages/utdk/common/index.ts", import.meta.url).pathname,
      "@utdk/mcp-core": new URL("../../packages/mcp-core/src/index.ts", import.meta.url).pathname,
      "utdk/registry.json": new URL("../../packages/utdk/registry.json", import.meta.url).pathname,
      // Vite 5.4.x does not resolve wildcard subpath exports with directory separators;
      // alias the deep import directly to the dist file.
      "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js": new URL(
        "node_modules/@modelcontextprotocol/sdk/dist/esm/server/webStandardStreamableHttp.js",
        import.meta.url,
      ).pathname,
    },
  }),
};
