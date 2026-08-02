/**
 * Credential domain tests: cipher envelope round-trip, OAuth resolution with
 * the tenant-keyed token cache, and refresh-persist behavior
 * (provider-execution spec "OAuth pre-resolution").
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCredentialCipher, resetCredentialCipher } from "../src/credentials/cipher.js";
import {
  createOAuthTokenCache,
  resolveToInjectable,
} from "../src/credentials/oauth.js";
import { makeEnv, type TestEnv } from "./helpers.js";
import type { OAuth2AuthCodePayload, OAuth2ClientPayload } from "../src/credentials/types.js";

let env: TestEnv;

beforeEach(async () => {
  resetCredentialCipher();
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  env = await makeEnv();
});

afterEach(async () => {
  await env.close();
  resetCredentialCipher();
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  vi.restoreAllMocks();
});

describe("credential cipher", () => {
  it("local backend seals and opens the envelope; plaintext legacy reads pass through", async () => {
    process.env["CREDENTIALS_CIPHER_SECRET"] = "test-secret";
    resetCredentialCipher();
    const cipher = getCredentialCipher();
    expect(cipher.backend).toBe("local");
    const sealed = await cipher.encrypt('{"type":"bearer_token","token":"x"}');
    expect(sealed.startsWith("enc:v1:local:")).toBe(true);
    expect(await cipher.decrypt(sealed)).toBe('{"type":"bearer_token","token":"x"}');
    // Legacy plaintext decrypts as itself.
    expect(await cipher.decrypt('{"plain":true}')).toBe('{"plain":true}');
  });

  it("service round-trips payloads through the cipher", async () => {
    process.env["CREDENTIALS_CIPHER_SECRET"] = "test-secret";
    resetCredentialCipher();
    const row = await env.credentials.create("t1", "u", {
      provider: "github",
      payload: { type: "bearer_token", token: "tok" },
    });
    // Raw storage holds the envelope, not the token.
    const raw = await env.storage.credentials.getWithPayload("t1", row.id);
    expect(raw?.payload.startsWith("enc:v1:local:")).toBe(true);
    expect(raw?.payload).not.toContain("tok");
    // The service decrypts.
    expect(await env.credentials.getPayload("t1", row.id)).toEqual({
      type: "bearer_token",
      token: "tok",
    });
  });
});

describe("oauth resolution", () => {
  it("client-credentials tokens cache per key until expiry; distinct tenants get distinct entries", async () => {
    const payload: OAuth2ClientPayload = {
      type: "oauth2_client",
      clientId: "id",
      clientSecret: "secret",
      tokenUrl: "https://issuer.example/token",
    };
    let calls = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        calls += 1;
        return new Response(
          JSON.stringify({ access_token: `tok-${calls}`, expires_in: 3600 }),
          { status: 200 },
        );
      }),
    );
    const cache = createOAuthTokenCache();
    const a1 = await resolveToInjectable(payload, { cacheKey: "tenant-a:svc:c1", cache });
    const a2 = await resolveToInjectable(payload, { cacheKey: "tenant-a:svc:c1", cache });
    expect(a1).toEqual({ type: "bearer_token", token: "tok-1" });
    expect(a2).toEqual({ type: "bearer_token", token: "tok-1" }); // cache hit
    expect(calls).toBe(1);
    const b1 = await resolveToInjectable(payload, { cacheKey: "tenant-b:svc:c1", cache });
    expect(b1).toEqual({ type: "bearer_token", token: "tok-2" }); // no cross-tenant reuse
    expect(calls).toBe(2);
    vi.unstubAllGlobals();
  });

  it("expired authcode token refreshes once and persists the updated payload", async () => {
    const payload: OAuth2AuthCodePayload = {
      type: "oauth2_authcode",
      clientId: "id",
      clientSecret: "secret",
      tokenUrl: "https://issuer.example/token",
      code: "",
      redirectUri: "https://app.example/cb",
      accessToken: "stale",
      refreshToken: "refresh-1",
      expiresAt: Date.now() - 1000,
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({ access_token: "fresh", refresh_token: "refresh-2", expires_in: 3600 }),
          { status: 200 },
        ),
      ),
    );
    const persisted: unknown[] = [];
    const result = await resolveToInjectable(payload, {
      cacheKey: "t:x:c",
      persist: async (p) => {
        persisted.push(p);
      },
    });
    expect(result).toEqual({ type: "bearer_token", token: "fresh" });
    expect(persisted).toHaveLength(1);
    const stored = persisted[0] as OAuth2AuthCodePayload;
    expect(stored.accessToken).toBe("fresh");
    expect(stored.refreshToken).toBe("refresh-2");
    vi.unstubAllGlobals();
  });

  it("bearer and api-key payloads pass through untouched", async () => {
    expect(
      await resolveToInjectable({ type: "bearer_token", token: "t" }, { cacheKey: "k" }),
    ).toEqual({ type: "bearer_token", token: "t" });
    expect(
      await resolveToInjectable(
        { type: "api_key", value: "v", headerName: "X-K" },
        { cacheKey: "k" },
      ),
    ).toEqual({ type: "api_key", value: "v", headerName: "X-K" });
  });
});
