import { describe, expect, it } from "vitest";
import {
  LLM_APPLE_BASE_URL_ENV,
  appleLlmBaseUrlFromHelperOrigin,
  appleLlmEnvFromHelperOrigin,
} from "../apple-helper-env.js";

describe("appleLlmEnvFromHelperOrigin", () => {
  it("maps a helper origin to LLM_APPLE_BASE_URL …/v1", () => {
    expect(appleLlmBaseUrlFromHelperOrigin("http://127.0.0.1:54321")).toBe(
      "http://127.0.0.1:54321/v1",
    );
    expect(appleLlmEnvFromHelperOrigin("http://127.0.0.1:54321")).toEqual({
      [LLM_APPLE_BASE_URL_ENV]: "http://127.0.0.1:54321/v1",
    });
  });

  it("strips a trailing slash on the origin", () => {
    expect(appleLlmBaseUrlFromHelperOrigin("http://127.0.0.1:9/")).toBe(
      "http://127.0.0.1:9/v1",
    );
  });

  it("returns an empty env when the helper is not ready", () => {
    expect(appleLlmEnvFromHelperOrigin(null)).toEqual({});
    expect(appleLlmEnvFromHelperOrigin(undefined)).toEqual({});
    expect(appleLlmEnvFromHelperOrigin("")).toEqual({});
  });
});
