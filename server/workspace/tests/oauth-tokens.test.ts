import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { OAuth2AuthCodePayload, OAuth2ClientPayload } from "../src/credentials.js";
import {
  exchangeAuthorizationCode,
  resetOAuthTokenCache,
  resolveToInjectable,
} from "../src/oauthTokens.js";

const AUTHCODE_PAYLOAD: OAuth2AuthCodePayload = {
  type: "oauth2_authcode",
  clientId: "client-id",
  clientSecret: "client-secret",
  tokenUrl: "https://provider.test/oauth/token",
  code: "one-time-code",
  redirectUri: "https://app.test/callback",
};

const CLIENT_PAYLOAD: OAuth2ClientPayload = {
  type: "oauth2_client",
  clientId: "client-id",
  clientSecret: "client-secret",
  tokenUrl: "https://provider.test/oauth/token",
};

function tokenResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("oauthTokens", () => {
  beforeEach(() => {
    resetOAuthTokenCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exchanges an authorization code with form-body credentials", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      tokenResponse({ access_token: "at-1", refresh_token: "rt-1", expires_in: 3600 }),
    );

    const tokens = await exchangeAuthorizationCode(AUTHCODE_PAYLOAD);

    expect(tokens.accessToken).toBe("at-1");
    expect(tokens.refreshToken).toBe("rt-1");
    expect(tokens.expiresAt).toBeGreaterThan(Date.now());

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe(AUTHCODE_PAYLOAD.tokenUrl);
    const body = (init!.body as URLSearchParams).toString();
    expect(body).toContain("grant_type=authorization_code");
    expect(body).toContain("code=one-time-code");
    expect(body).toContain("client_secret=client-secret");
  });

  it("retries with HTTP Basic when the form-body attempt is rejected (Figma-style)", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(tokenResponse({ error: "invalid_client" }, 401))
      .mockResolvedValueOnce(tokenResponse({ access_token: "at-basic" }));

    const tokens = await exchangeAuthorizationCode(AUTHCODE_PAYLOAD);
    expect(tokens.accessToken).toBe("at-basic");

    const [, secondInit] = fetchMock.mock.calls[1]!;
    const headers = secondInit!.headers as Record<string, string>;
    expect(headers["Authorization"]).toMatch(/^Basic /);
    const secondBody = (secondInit!.body as URLSearchParams).toString();
    expect(secondBody).not.toContain("client_secret");
  });

  it("surfaces the provider's error message on failed exchange", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      tokenResponse({ error: "invalid_grant", error_description: "Code expired" }, 400),
    );

    await expect(exchangeAuthorizationCode(AUTHCODE_PAYLOAD)).rejects.toThrow(
      /Code expired/,
    );
  });

  it("passes bearer/api-key payloads through untouched", async () => {
    const bearer = { type: "bearer_token" as const, token: "t" };
    expect(await resolveToInjectable(bearer, { cacheKey: "k" })).toBe(bearer);
  });

  it("resolves client-credentials payloads and caches the token", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      tokenResponse({ access_token: "cc-token", expires_in: 3600 }),
    );

    const first = await resolveToInjectable(CLIENT_PAYLOAD, { cacheKey: "ws:p:1" });
    const second = await resolveToInjectable(CLIENT_PAYLOAD, { cacheKey: "ws:p:1" });

    expect(first).toEqual({ type: "bearer_token", token: "cc-token" });
    expect(second).toEqual({ type: "bearer_token", token: "cc-token" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("uses a stored fresh access token without a network call", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const payload: OAuth2AuthCodePayload = {
      ...AUTHCODE_PAYLOAD,
      code: "",
      accessToken: "stored-at",
      expiresAt: Date.now() + 3_600_000,
    };

    const injectable = await resolveToInjectable(payload, { cacheKey: "k" });
    expect(injectable).toEqual({ type: "bearer_token", token: "stored-at" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("refreshes an expired access token and persists the update", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      tokenResponse({ access_token: "at-2", refresh_token: "rt-2", expires_in: 3600 }),
    );
    const persist = vi.fn().mockResolvedValue(undefined);
    const payload: OAuth2AuthCodePayload = {
      ...AUTHCODE_PAYLOAD,
      code: "",
      accessToken: "at-1",
      refreshToken: "rt-1",
      expiresAt: Date.now() - 1000,
    };

    const injectable = await resolveToInjectable(payload, { cacheKey: "k", persist });

    expect(injectable).toEqual({ type: "bearer_token", token: "at-2" });
    expect(persist).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: "at-2", refreshToken: "rt-2", code: "" }),
    );
  });

  it("rejects clearly when expired with no refresh token", async () => {
    const payload: OAuth2AuthCodePayload = {
      ...AUTHCODE_PAYLOAD,
      code: "",
      accessToken: "at-1",
      expiresAt: Date.now() - 1000,
    };

    await expect(resolveToInjectable(payload, { cacheKey: "k" })).rejects.toThrow(
      /re-authorize/,
    );
  });
});
