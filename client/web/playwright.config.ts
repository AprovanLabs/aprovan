import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** Dedicated ports so E2E does not collide with a developer’s `:4000` / `:5173`. */
const gatewayPort = Number(process.env["E2E_GATEWAY_PORT"] ?? 4010);
const webPort = Number(process.env["E2E_WEB_PORT"] ?? 5174);

/**
 * Suite-scoped SQLite dir — never `~/.aprovan`. Per-test freshness is the
 * two-users fixture’s job (cleanup hooks + isolated browser contexts).
 */
const dataDir =
  process.env["E2E_WORKSPACE_DATA_DIR"] ?? join(tmpdir(), "aprovan-playwright-e2e");
mkdirSync(dataDir, { recursive: true });

const gatewayOrigin = `http://127.0.0.1:${gatewayPort}`;
/** Must include `/api/gateway` — Vite strips `/gateway` and proxies to this. */
const gatewayUrl = `${gatewayOrigin}/api/gateway`;

export default defineConfig({
  testDir: "./e2e",
  // Streams 10–12 own flow specs; harness bootstrap must `--list` cleanly with zero tests.
  passWithNoTests: true,
  fullyParallel: false,
  forbidOnly: !!process.env["CI"],
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${webPort}/workspace/`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: `pnpm --filter @aprovan/workspace exec tsx src/cli.ts start --mode local --port ${gatewayPort} --data-dir ${JSON.stringify(dataDir)} --no-cron`,
      cwd: rootDir,
      url: `${gatewayOrigin}/health`,
      reuseExistingServer: !process.env["CI"],
      timeout: 120_000,
      env: {
        ...process.env,
        WORKSPACE_MODE: "local",
        WORKSPACE_PORT: String(gatewayPort),
        WORKSPACE_DATA_DIR: dataDir,
        WORKSPACE_CRON: "0",
      },
    },
    {
      command: `pnpm --filter @aprovan/patchwork-web exec vite --host 127.0.0.1 --port ${webPort} --strictPort`,
      cwd: rootDir,
      url: `http://127.0.0.1:${webPort}/workspace/`,
      reuseExistingServer: !process.env["CI"],
      timeout: 120_000,
      env: {
        ...process.env,
        // Skip AWS SSM `/aprovan/prd/env` (required for local vite).
        APROVAN_ENV: "off",
        GATEWAY_URL: gatewayUrl,
      },
    },
  ],
});
