/**
 * Smoke test harness.
 *
 * Guarded by the UTDK_SMOKE_TESTS=1 environment variable.
 * Each provider may declare a read-only endpoint to call in its package.json
 * under the key `utdk.smokeTest.endpoint`.  If the endpoint is not declared or
 * the guard env var is not set, the test is skipped (not failed).
 *
 * Smoke tests intentionally make real HTTP requests and are expected to run
 * only in environments where valid credentials are present.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { resolveProviderOutputDir } from "../provider.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SmokeTestStatus = "passed" | "failed" | "skipped";

export type SmokeTestResult = {
  provider: string;
  status: SmokeTestStatus;
  endpoint: string | null;
  statusCode?: number;
  message: string;
};

export type RunSmokeTestOptions = {
  provider: string;
  outputRoot: string;
  /**
   * Override the fetch implementation — useful in tests to avoid real HTTP calls.
   * Defaults to the global `fetch`.
   */
  fetcher?: (url: string, init?: RequestInit) => Promise<Response>;
};

// ---------------------------------------------------------------------------
// Package.json shape
// ---------------------------------------------------------------------------

type PackageJsonUtdk = {
  smokeTest?: {
    endpoint?: string;
  };
};

type PackageJsonShape = {
  utdk?: PackageJsonUtdk;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function readFileSafe(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

function readSmokeEndpoint(packageJson: string): string | null {
  try {
    const parsed = JSON.parse(packageJson) as PackageJsonShape;
    return parsed.utdk?.smokeTest?.endpoint ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns true if smoke tests are enabled (UTDK_SMOKE_TESTS=1).
 */
export function isSmokeTestEnabled(): boolean {
  return process.env["UTDK_SMOKE_TESTS"] === "1";
}

/**
 * Run the smoke test for a single provider.
 *
 * - Returns `{ status: "skipped" }` if `UTDK_SMOKE_TESTS` is not set to `"1"`.
 * - Returns `{ status: "skipped" }` if the provider has no `utdk.smokeTest.endpoint`.
 * - Returns `{ status: "passed" }` if the endpoint returns a 2xx response.
 * - Returns `{ status: "failed" }` for non-2xx responses or network errors.
 */
export async function runSmokeTest(options: RunSmokeTestOptions): Promise<SmokeTestResult> {
  const { provider, outputRoot } = options;
  const fetcher = options.fetcher ?? fetch;

  if (!isSmokeTestEnabled()) {
    return {
      provider,
      status: "skipped",
      endpoint: null,
      message: "Smoke tests are disabled. Set UTDK_SMOKE_TESTS=1 to enable.",
    };
  }

  const providerDir = resolveProviderOutputDir(provider, outputRoot);
  const packageJsonContent = await readFileSafe(path.join(providerDir, "package.json"));

  if (!packageJsonContent) {
    return {
      provider,
      status: "skipped",
      endpoint: null,
      message: "package.json not found — smoke test skipped.",
    };
  }

  const endpoint = readSmokeEndpoint(packageJsonContent);

  if (!endpoint) {
    return {
      provider,
      status: "skipped",
      endpoint: null,
      message: "No utdk.smokeTest.endpoint declared in package.json — smoke test skipped.",
    };
  }

  try {
    const response = await fetcher(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      return {
        provider,
        status: "passed",
        endpoint,
        statusCode: response.status,
        message: `GET ${endpoint} → ${response.status} OK`,
      };
    }

    return {
      provider,
      status: "failed",
      endpoint,
      statusCode: response.status,
      message: `GET ${endpoint} → ${response.status} (expected 2xx)`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      provider,
      status: "failed",
      endpoint,
      message: `GET ${endpoint} → network error: ${message}`,
    };
  }
}

/**
 * Run smoke tests for multiple providers.
 * Results with `status: "failed"` are still returned (not thrown).
 */
export async function runSmokeTests(
  providers: string[],
  outputRoot: string,
  fetcher?: RunSmokeTestOptions["fetcher"],
): Promise<SmokeTestResult[]> {
  return Promise.all(
    providers.map((provider) => runSmokeTest({ provider, outputRoot, fetcher })),
  );
}
