/**
 * Standalone environment surface → `RegistryServerOptions`. This is the ONLY
 * code path that exists solely for standalone mode (registry-server spec
 * "Library-first construction"): everything downstream of the parsed options
 * is the same constructor the embedded host calls.
 */

import { homedir } from "node:os";
import { join } from "node:path";
import { defaultCatalog } from "../catalog/default.js";
import type { RegistryServerOptions } from "./types.js";

const num = (raw: string | undefined): number | undefined => {
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : undefined;
};

export interface StandaloneConfig {
  port: number;
  options: RegistryServerOptions;
}

export function optionsFromEnv(env: NodeJS.ProcessEnv = process.env): StandaloneConfig {
  const dataDir = env["REGISTRY_DATA_DIR"] ?? join(homedir(), ".aprovan-registry");

  const driver = (env["REGISTRY_STORAGE_DRIVER"] ?? "sqlite") as "sqlite" | "libsql" | "dsql";
  const storageUrl = env["REGISTRY_STORAGE_URL"];
  const storage: RegistryServerOptions["storage"] =
    driver === "dsql"
      ? (() => {
          if (!storageUrl) {
            throw new Error("REGISTRY_STORAGE_DRIVER=dsql requires REGISTRY_STORAGE_URL");
          }
          return { driver: "dsql" as const, url: storageUrl };
        })()
      : { driver, ...(storageUrl ? { url: storageUrl } : {}), dir: dataDir };

  const authMode = env["REGISTRY_AUTH"] ?? "none";
  let auth: RegistryServerOptions["auth"];
  if (authMode === "oidc") {
    const issuer = env["OIDC_ISSUER"];
    const audience = env["OIDC_AUDIENCE"] ?? env["OIDCAUDIENCE"];
    if (!issuer || !audience) {
      throw new Error("REGISTRY_AUTH=oidc requires OIDC_ISSUER and OIDC_AUDIENCE");
    }
    auth = { mode: "oidc", issuer, audience };
  } else if (authMode === "api-key") {
    auth = { mode: "api-key" };
  } else if (authMode === "none") {
    auth = { mode: "none" };
  } else {
    throw new Error(`REGISTRY_AUTH must be "none", "oidc", or "api-key" (got "${authMode}")`);
  }

  const otlpEndpoint =
    env["REGISTRY_OTLP_ENDPOINT"] ?? env["OTEL_EXPORTER_OTLP_ENDPOINT"] ?? undefined;

  const defaultRps = num(env["REGISTRY_DEFAULT_RPS"]);
  const defaultBurst = num(env["REGISTRY_DEFAULT_BURST"]);

  return {
    port: num(env["REGISTRY_PORT"] ?? env["PORT"]) ?? 4000,
    options: {
      storage,
      auth,
      tenancy: { mode: "single" },
      catalog: defaultCatalog(),
      ...(otlpEndpoint
        ? {
            telemetry: {
              otlpEndpoint,
              serviceName: env["OTEL_SERVICE_NAME"] ?? "aprovan-registry",
            },
          }
        : {}),
      executor: {
        ...(num(env["REGISTRY_EXECUTOR_CACHE_SIZE"] ?? env["PROVIDER_CACHE_SIZE"])
          ? { cacheSize: num(env["REGISTRY_EXECUTOR_CACHE_SIZE"] ?? env["PROVIDER_CACHE_SIZE"]) }
          : {}),
      },
      sandbox: {
        ...(num(env["SANDBOX_MEMORY_LIMIT_MB"])
          ? { memoryLimitMb: num(env["SANDBOX_MEMORY_LIMIT_MB"]) }
          : {}),
        ...(num(env["SANDBOX_POOL_MAX"]) ? { concurrency: num(env["SANDBOX_POOL_MAX"]) } : {}),
      },
      ...(defaultRps || defaultBurst
        ? {
            limits: {
              ...(defaultRps ? { defaultRps } : {}),
              ...(defaultBurst ? { defaultBurst } : {}),
            },
          }
        : {}),
      ...(env["REGISTRY_ALLOW_INSECURE"] === "1" ? { allowInsecure: true } : {}),
    },
  };
}
