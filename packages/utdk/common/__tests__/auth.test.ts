import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  BearerToken,
  ApiKey,
  OAuth2ClientCredentials,
  OAuth2AuthCode,
  generatePKCE,
  buildAuthorizationUrl,
} from "../auth.js";
import type { TokenStore, StoredToken } from "../auth.js";

describe("BearerToken", () => {
  it("sets Authorization header with Bearer prefix", async () => {
    const auth = new BearerToken("my-secret-token");
    const headers: Record<string, string> = {};
    await auth.authenticate(headers);
    expect(headers["Authorization"]).toBe("Bearer my-secret-token");
  });
});

describe("ApiKey", () => {
  it("uses X-Api-Key header by default", async () => {
    const auth = new ApiKey({ value: "key123" });
    const headers: Record<string, string> = {};
    await auth.authenticate(headers);
    expect(headers["X-Api-Key"]).toBe("key123");
  });

  it("uses custom header name when specified", async () => {
    const auth = new ApiKey({ headerName: "X-Custom-Key", value: "secret" });
    const headers: Record<string, string> = {};
    await auth.authenticate(headers);
    expect(headers["X-Custom-Key"]).toBe("secret");
    expect(headers["X-Api-Key"]).toBeUndefined();
  });
});

describe("OAuth2ClientCredentials", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches a token and applies it to the Authorization header", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: "access-abc",
        expires_in: 3600,
        token_type: "Bearer",
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2ClientCredentials({
      clientId: "client1",
      clientSecret: "secret1",
      tokenUrl: "https://auth.example.com/token",
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(headers["Authorization"]).toBe("Bearer access-abc");
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(
      "https://auth.example.com/token",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("caches the token and does not refetch while still valid", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: "token-xyz", expires_in: 3600 }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2ClientCredentials({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
    });

    const headers1: Record<string, string> = {};
    await auth.authenticate(headers1);

    const headers2: Record<string, string> = {};
    await auth.authenticate(headers2);

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(headers2["Authorization"]).toBe("Bearer token-xyz");
  });

  it("sends scopes when configured", async () => {
    let capturedBody = "";
    const mockFetch = vi.fn().mockImplementation(async (_url: string, init: RequestInit) => {
      capturedBody = String(init.body ?? "");
      return {
        ok: true,
        json: async () => ({ access_token: "scoped-token", expires_in: 3600 }),
      };
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2ClientCredentials({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      scopes: ["read", "write"],
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(capturedBody).toContain("scope=read+write");
  });

  it("throws on non-ok token response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "invalid_client",
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2ClientCredentials({
      clientId: "bad",
      clientSecret: "bad",
      tokenUrl: "https://auth.example.com/token",
    });

    await expect(auth.authenticate({})).rejects.toThrow("OAuth2 token request failed");
  });

  it("refreshes the token 60 seconds before expiry", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: "refreshed-token", expires_in: 3600 }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const now = Date.now();
    vi.spyOn(Date, "now")
      // First call: token is not yet loaded
      .mockReturnValueOnce(now)
      // Second call isExpired() check: pretend 60s before expiry (token expires in 3600s, so at now+3600000; 60s before = now+3540000; current time = now+3540000)
      .mockReturnValue(now + 3_540_000);

    const auth = new OAuth2ClientCredentials({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
    });

    // First request fetches token
    await auth.authenticate({});
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second request: simulated time is exactly at the 60s-before-expiry threshold → should refresh
    await auth.authenticate({});
    expect(mockFetch).toHaveBeenCalledTimes(2);

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);
    expect(headers["Authorization"]).toBe("Bearer refreshed-token");
  });

  it("reads from the token store before fetching", async () => {
    const store: TokenStore = {
      get: vi.fn().mockResolvedValue({
        accessToken: "stored-token",
        expiresAt: Date.now() + 3_600_000,
      } satisfies StoredToken),
      set: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2ClientCredentials({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      tokenStore: store,
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(headers["Authorization"]).toBe("Bearer stored-token");
    expect(store.get).toHaveBeenCalledWith("https://auth.example.com/token");
  });

  it("writes a fetched token to the store", async () => {
    const store: TokenStore = {
      get: vi.fn().mockResolvedValue(undefined),
      set: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: "fresh-token", expires_in: 3600 }),
    }));

    const auth = new OAuth2ClientCredentials({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      tokenStore: store,
    });

    await auth.authenticate({});

    expect(store.set).toHaveBeenCalledWith(
      "https://auth.example.com/token",
      expect.objectContaining({ accessToken: "fresh-token" }),
    );
  });
});

describe("OAuth2AuthCode", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("exchanges authorization code for a token", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: "auth-code-token",
        refresh_token: "refresh-xyz",
        expires_in: 3600,
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2AuthCode({
      clientId: "client1",
      clientSecret: "secret1",
      tokenUrl: "https://auth.example.com/token",
      code: "auth-code-123",
      redirectUri: "https://myapp.com/callback",
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(headers["Authorization"]).toBe("Bearer auth-code-token");
    expect(mockFetch).toHaveBeenCalledOnce();

    const callArgs = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(callArgs[1].body).toContain("grant_type=authorization_code");
    expect(callArgs[1].body).toContain("code=auth-code-123");
  });

  it("reuses the cached token on subsequent calls", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: "cached-token",
        refresh_token: "refresh-abc",
        expires_in: 3600,
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2AuthCode({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      code: "code-abc",
      redirectUri: "https://app.com/cb",
    });

    await auth.authenticate({});
    await auth.authenticate({});

    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it("includes PKCE code_verifier in the token exchange request", async () => {
    let capturedBody = "";
    const mockFetch = vi.fn().mockImplementation(async (_url: string, init: RequestInit) => {
      capturedBody = String(init.body ?? "");
      return {
        ok: true,
        json: async () => ({
          access_token: "pkce-token",
          refresh_token: "pkce-refresh",
          expires_in: 3600,
        }),
      };
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2AuthCode({
      clientId: "client1",
      clientSecret: "secret1",
      tokenUrl: "https://auth.example.com/token",
      code: "pkce-code-123",
      redirectUri: "https://myapp.com/callback",
      codeVerifier: "my-code-verifier",
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(headers["Authorization"]).toBe("Bearer pkce-token");
    expect(capturedBody).toContain("code_verifier=my-code-verifier");
    expect(capturedBody).toContain("grant_type=authorization_code");
  });

  it("does not include code_verifier when PKCE is not used", async () => {
    let capturedBody = "";
    const mockFetch = vi.fn().mockImplementation(async (_url: string, init: RequestInit) => {
      capturedBody = String(init.body ?? "");
      return {
        ok: true,
        json: async () => ({ access_token: "no-pkce-token", expires_in: 3600 }),
      };
    });
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2AuthCode({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      code: "some-code",
      redirectUri: "https://app.com/cb",
    });

    await auth.authenticate({});

    expect(capturedBody).not.toContain("code_verifier");
  });

  it("refreshes token 60 seconds before expiry", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: "refreshed-auth-token",
        refresh_token: "new-refresh",
        expires_in: 3600,
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const now = Date.now();
    vi.spyOn(Date, "now")
      .mockReturnValueOnce(now)
      .mockReturnValue(now + 3_540_000);

    const auth = new OAuth2AuthCode({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      code: "code-abc",
      redirectUri: "https://app.com/cb",
    });

    await auth.authenticate({});
    expect(mockFetch).toHaveBeenCalledTimes(1);

    await auth.authenticate({});
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("reads from and writes to the token store", async () => {
    const store: TokenStore = {
      get: vi.fn().mockResolvedValue({
        accessToken: "stored-auth-token",
        refreshToken: "stored-refresh",
        expiresAt: Date.now() + 3_600_000,
      } satisfies StoredToken),
      set: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
    };

    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const auth = new OAuth2AuthCode({
      clientId: "c",
      clientSecret: "s",
      tokenUrl: "https://auth.example.com/token",
      code: "code-abc",
      redirectUri: "https://app.com/cb",
      tokenStore: store,
    });

    const headers: Record<string, string> = {};
    await auth.authenticate(headers);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(headers["Authorization"]).toBe("Bearer stored-auth-token");
  });
});

describe("generatePKCE", () => {
  it("returns a code verifier, challenge, and S256 method", async () => {
    const pkce = await generatePKCE();

    expect(pkce.codeChallengeMethod).toBe("S256");
    expect(typeof pkce.codeVerifier).toBe("string");
    expect(typeof pkce.codeChallenge).toBe("string");
    expect(pkce.codeVerifier.length).toBeGreaterThan(40);
    expect(pkce.codeChallenge.length).toBeGreaterThan(40);
  });

  it("generates unique verifiers on each call", async () => {
    const pkce1 = await generatePKCE();
    const pkce2 = await generatePKCE();

    expect(pkce1.codeVerifier).not.toBe(pkce2.codeVerifier);
    expect(pkce1.codeChallenge).not.toBe(pkce2.codeChallenge);
  });

  it("produces a base64url-safe challenge (no +, /, or =)", async () => {
    for (let i = 0; i < 5; i++) {
      const { codeChallenge, codeVerifier } = await generatePKCE();
      expect(codeChallenge).not.toMatch(/[+/=]/);
      expect(codeVerifier).not.toMatch(/[+/=]/);
    }
  });

  it("challenge is a valid SHA-256/base64url of the verifier", async () => {
    const { codeVerifier, codeChallenge } = await generatePKCE();

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashBytes = new Uint8Array(hashBuffer);
    let binary = "";
    for (let i = 0; i < hashBytes.length; i++) binary += String.fromCharCode(hashBytes[i] as number);
    const expected = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

    expect(codeChallenge).toBe(expected);
  });
});

describe("buildAuthorizationUrl", () => {
  it("builds a basic authorization URL", () => {
    const url = buildAuthorizationUrl({
      authUrl: "https://accounts.spotify.com/authorize",
      clientId: "my-client",
      redirectUri: "https://app.com/callback",
    });

    expect(url).toContain("response_type=code");
    expect(url).toContain("client_id=my-client");
    expect(url).toContain("redirect_uri=https%3A%2F%2Fapp.com%2Fcallback");
  });

  it("includes scopes when provided", () => {
    const url = buildAuthorizationUrl({
      authUrl: "https://accounts.spotify.com/authorize",
      clientId: "my-client",
      redirectUri: "https://app.com/callback",
      scopes: ["user-read-private", "playlist-read-private"],
    });

    expect(url).toContain("scope=user-read-private+playlist-read-private");
  });

  it("includes state parameter when provided", () => {
    const url = buildAuthorizationUrl({
      authUrl: "https://accounts.spotify.com/authorize",
      clientId: "my-client",
      redirectUri: "https://app.com/callback",
      state: "random-state-xyz",
    });

    expect(url).toContain("state=random-state-xyz");
  });

  it("includes PKCE code_challenge parameters", () => {
    const url = buildAuthorizationUrl({
      authUrl: "https://accounts.spotify.com/authorize",
      clientId: "my-client",
      redirectUri: "https://app.com/callback",
      codeChallenge: "abc123def456",
      codeChallengeMethod: "S256",
    });

    expect(url).toContain("code_challenge=abc123def456");
    expect(url).toContain("code_challenge_method=S256");
  });

  it("defaults code_challenge_method to S256", () => {
    const url = buildAuthorizationUrl({
      authUrl: "https://accounts.spotify.com/authorize",
      clientId: "my-client",
      redirectUri: "https://app.com/callback",
      codeChallenge: "somechallenge",
    });

    expect(url).toContain("code_challenge_method=S256");
  });
});
