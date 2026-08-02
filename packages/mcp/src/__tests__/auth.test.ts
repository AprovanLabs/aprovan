import { describe, expect, it, afterEach, vi } from "vitest";
import { buildAuthProvider } from "../auth.js";
import type { UtdkAuthConfig } from "../auth.js";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("buildAuthProvider", () => {
  it("returns a BearerToken when GITHUB_TOKEN is set", async () => {
    vi.stubEnv("GITHUB_TOKEN", "ghp_test123");

    const provider = buildAuthProvider("github", []);
    expect(provider).not.toBeNull();
    expect(provider).not.toBeUndefined();

    const headers: Record<string, string> = {};
    await provider!.authenticate(headers);
    expect(headers["Authorization"]).toBe("Bearer ghp_test123");
  });

  it("resolves api_key auth from environment variables", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_abc");

    const authConfigs: UtdkAuthConfig[] = [
      {
        auth_type: "api_key",
        api_key: "Bearer ${STRIPE_SECRET_KEY}",
        var_name: "Authorization",
        location: "header",
      },
    ];

    const provider = buildAuthProvider("stripe", authConfigs);
    expect(provider).not.toBeUndefined();

    const headers: Record<string, string> = {};
    await provider!.authenticate(headers);
    expect(headers["Authorization"]).toBe("Bearer sk_test_abc");
  });

  it("returns undefined when no credentials are available", () => {
    vi.unstubAllEnvs();

    const authConfigs: UtdkAuthConfig[] = [
      {
        auth_type: "api_key",
        api_key: "Bearer ${GITHUB_TOKEN}",
        var_name: "Authorization",
        location: "header",
      },
    ];

    const provider = buildAuthProvider("github", authConfigs);
    expect(provider).toBeUndefined();
  });

  it("prefers PROVIDER_TOKEN over utdk.auth config", async () => {
    vi.stubEnv("GITHUB_TOKEN", "ghp_from_env");
    vi.stubEnv("SOME_OTHER_TOKEN", "other_token");

    const authConfigs: UtdkAuthConfig[] = [
      {
        auth_type: "api_key",
        api_key: "Bearer ${SOME_OTHER_TOKEN}",
        var_name: "Authorization",
        location: "header",
      },
    ];

    const provider = buildAuthProvider("github", authConfigs);
    const headers: Record<string, string> = {};
    await provider!.authenticate(headers);

    // GITHUB_TOKEN takes priority
    expect(headers["Authorization"]).toBe("Bearer ghp_from_env");
  });
});
