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
      // Vite 5.4.x does not resolve wildcard subpath exports with directory separators;
      // alias the deep import directly to the dist file.
      "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js": new URL(
        "node_modules/@modelcontextprotocol/sdk/dist/esm/server/webStandardStreamableHttp.js",
        import.meta.url,
      ).pathname,
    },
  }),
};
