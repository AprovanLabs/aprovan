/**
 * Host `runAvailabilityProbe` for catalog entries that declare
 * `availabilityProbe: "helper:llm"` — GETs the macOS helper `/availability`
 * and returns `capabilities.llm`.
 *
 * Helper origin is derived from `LLM_APPLE_BASE_URL` (desktop sets that to
 * `http://127.0.0.1:<helperPort>/v1` when the helper is ready), so the probe
 * and the OpenAI-compat base URL always target the same loopback instance.
 */

import type {
  AvailabilityProbeResult,
  AvailabilityProbeRunner,
} from "@aprovan/registry-server";

export const LLM_APPLE_BASE_URL_ENV = "LLM_APPLE_BASE_URL";

/** Strip `/v1` from the catalog OpenAI root to get the helper origin. */
export function helperOriginFromAppleBaseUrl(
  baseUrl: string | undefined | null,
): string | undefined {
  if (!baseUrl) return undefined;
  const trimmed = baseUrl.trim().replace(/\/+$/u, "");
  if (!trimmed) return undefined;
  const withoutV1 = trimmed.replace(/\/v1$/u, "");
  return withoutV1 || undefined;
}

type JsonCapability = {
  state?: string;
  reason?: string;
  remedy?: string;
};

type AvailabilityJson = {
  capabilities?: Record<string, JsonCapability>;
};

function mapCapability(cap: JsonCapability | undefined): AvailabilityProbeResult {
  if (!cap || typeof cap.state !== "string") {
    return {
      state: "unavailable",
      reason: "Helper availability report is missing capabilities.llm",
    };
  }
  switch (cap.state) {
    case "available":
      return { state: "available" };
    case "unsupported":
      return {
        state: "unsupported",
        reason:
          typeof cap.reason === "string" && cap.reason
            ? cap.reason
            : "On-device model is unsupported on this Mac",
      };
    case "disabled":
      return {
        state: "disabled",
        reason:
          typeof cap.reason === "string" && cap.reason
            ? cap.reason
            : "On-device model is disabled",
        ...(typeof cap.remedy === "string" && cap.remedy
          ? { remedy: cap.remedy }
          : {}),
      };
    default:
      return {
        state: "unavailable",
        reason: `Helper reported unknown llm capability state "${cap.state}"`,
      };
  }
}

export type HelperAvailabilityProbeOptions = {
  /** Defaults to `process.env.LLM_APPLE_BASE_URL`. */
  getAppleBaseUrl?: () => string | undefined;
  fetch?: typeof fetch;
};

/** Build the host probe runner passed to `createRegistryServer`. */
export function createHelperAvailabilityProbe(
  options: HelperAvailabilityProbeOptions = {},
): AvailabilityProbeRunner {
  const getAppleBaseUrl =
    options.getAppleBaseUrl ??
    (() => process.env[LLM_APPLE_BASE_URL_ENV] || undefined);
  const fetchImpl = options.fetch ?? fetch;

  return async (id) => {
    if (id !== "helper:llm") {
      return {
        state: "unavailable",
        reason: `Unknown availability probe "${id}"`,
      };
    }

    const origin = helperOriginFromAppleBaseUrl(getAppleBaseUrl());
    if (!origin) {
      return {
        state: "unavailable",
        reason: "macOS helper is not available",
      };
    }

    try {
      const res = await fetchImpl(`${origin}/availability`);
      if (!res.ok) {
        return {
          state: "unavailable",
          reason: `Helper availability returned HTTP ${res.status}`,
        };
      }
      const body = (await res.json()) as AvailabilityJson;
      return mapCapability(body.capabilities?.["llm"]);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        state: "unavailable",
        reason: `Helper availability probe failed: ${message}`,
      };
    }
  };
}
