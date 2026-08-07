import { describe, expect, it, vi } from "vitest";
import {
  createHelperAvailabilityProbe,
  helperOriginFromAppleBaseUrl,
} from "../src/helper-availability-probe.js";

describe("helperOriginFromAppleBaseUrl", () => {
  it("strips the OpenAI /v1 suffix", () => {
    expect(helperOriginFromAppleBaseUrl("http://127.0.0.1:61234/v1")).toBe(
      "http://127.0.0.1:61234",
    );
    expect(helperOriginFromAppleBaseUrl("http://127.0.0.1:9/v1/")).toBe(
      "http://127.0.0.1:9",
    );
  });

  it("returns undefined when unset", () => {
    expect(helperOriginFromAppleBaseUrl(undefined)).toBeUndefined();
    expect(helperOriginFromAppleBaseUrl(null)).toBeUndefined();
    expect(helperOriginFromAppleBaseUrl("")).toBeUndefined();
  });
});

describe("createHelperAvailabilityProbe", () => {
  it("reports unavailable when LLM_APPLE_BASE_URL is missing", async () => {
    const probe = createHelperAvailabilityProbe({
      getAppleBaseUrl: () => undefined,
    });
    await expect(probe("helper:llm")).resolves.toEqual({
      state: "unavailable",
      reason: "macOS helper is not available",
    });
  });

  it("GETs helper /availability and returns capabilities.llm", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe("http://127.0.0.1:61234/availability");
      return new Response(
        JSON.stringify({
          helperVersion: "test",
          capabilities: {
            llm: {
              state: "disabled",
              reason: "Apple Intelligence is turned off",
              remedy: "Enable Apple Intelligence in System Settings",
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    });

    const probe = createHelperAvailabilityProbe({
      getAppleBaseUrl: () => "http://127.0.0.1:61234/v1",
      fetch: fetchMock as unknown as typeof fetch,
    });

    await expect(probe("helper:llm")).resolves.toEqual({
      state: "disabled",
      reason: "Apple Intelligence is turned off",
      remedy: "Enable Apple Intelligence in System Settings",
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("returns available when the helper reports llm available", async () => {
    const probe = createHelperAvailabilityProbe({
      getAppleBaseUrl: () => "http://127.0.0.1:1/v1",
      fetch: (async () =>
        new Response(
          JSON.stringify({
            helperVersion: "t",
            capabilities: { llm: { state: "available" } },
          }),
          { status: 200 },
        )) as unknown as typeof fetch,
    });
    await expect(probe("helper:llm")).resolves.toEqual({ state: "available" });
  });

  it("rejects unknown probe ids", async () => {
    const probe = createHelperAvailabilityProbe({
      getAppleBaseUrl: () => "http://127.0.0.1:1/v1",
    });
    await expect(probe("helper:esm" as "helper:llm")).resolves.toMatchObject({
      state: "unavailable",
    });
  });
});
