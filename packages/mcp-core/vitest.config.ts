import { defineConfig } from "@aprovan/vitest-config";

export default {
  test: defineConfig("node", {
    include: ["src/**/*.test.ts"],
    testTimeout: 30000,
  }),
};
