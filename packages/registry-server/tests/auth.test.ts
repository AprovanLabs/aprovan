/**
 * Auth adapter tests (specs/auth-adapters): generic OIDC against a LOCAL mock
 * issuer (discovery + JWKS served over loopback http — no Cognito, proving
 * any compliant issuer works), api-key mint/verify/revoke, and auth-none.
 */

import { createServer, type Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import {
  ApiKeyAuthAdapter,
  API_KEY_PREFIX,
  mintApiKey,
  NoneAuthAdapter,
  OidcAuthAdapter,
} from "../src/auth/adapters.js";
import { AuthError } from "../src/auth/types.js";
import { createStorage } from "../src/storage/index.js";

const header = (token?: string) => ({
  header: (name: string) =>
    name === "Authorization" && token ? `Bearer ${token}` : undefined,
});

describe("oidc adapter (any issuer via discovery)", () => {
  let server: Server;
  let issuer: string;
  let privateKey: CryptoKey;

  beforeAll(async () => {
    const pair = await generateKeyPair("RS256");
    privateKey = pair.privateKey as CryptoKey;
    const jwk = { ...(await exportJWK(pair.publicKey)), kid: "test-key", alg: "RS256", use: "sig" };

    server = createServer((req, res) => {
      if (req.url === "/.well-known/openid-configuration") {
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ issuer, jwks_uri: `${issuer}/jwks` }));
        return;
      }
      if (req.url === "/jwks") {
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ keys: [jwk] }));
        return;
      }
      res.statusCode = 404;
      res.end();
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (typeof address === "object" && address) issuer = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  const sign = (claims: {
    sub?: string;
    aud?: string;
    iss?: string;
    expired?: boolean;
  }): Promise<string> => {
    const jwt = new SignJWT({ scope: "all" })
      .setProtectedHeader({ alg: "RS256", kid: "test-key" })
      .setSubject(claims.sub ?? "user-42")
      .setAudience(claims.aud ?? "registry-api")
      .setIssuer(claims.iss ?? issuer)
      .setIssuedAt();
    return claims.expired
      ? jwt.setExpirationTime(Math.floor(Date.now() / 1000) - 60).sign(privateKey)
      : jwt.setExpirationTime("5m").sign(privateKey);
  };

  it("accepts a valid token from a non-Cognito issuer with the configured audience", async () => {
    const adapter = new OidcAuthAdapter({ issuer, audience: "registry-api" });
    await adapter.init();
    const authn = await adapter.authenticate(header(await sign({})));
    expect(authn.sub).toBe("user-42");
    expect(authn.claims["aud"]).toBe("registry-api");
  });

  it("rejects the wrong audience with 401", async () => {
    const adapter = new OidcAuthAdapter({ issuer, audience: "registry-api" });
    await adapter.init();
    const error = await adapter
      .authenticate(header(await sign({ aud: "someone-else" })))
      .catch((e) => e);
    expect(error).toBeInstanceOf(AuthError);
    expect(error.status).toBe(401);
  });

  it("rejects an expired token", async () => {
    const adapter = new OidcAuthAdapter({ issuer, audience: "registry-api" });
    await adapter.init();
    const error = await adapter
      .authenticate(header(await sign({ expired: true })))
      .catch((e) => e);
    expect(error).toBeInstanceOf(AuthError);
    expect(error.status).toBe(401);
  });

  it("rejects a wrong issuer claim", async () => {
    const adapter = new OidcAuthAdapter({ issuer, audience: "registry-api" });
    await adapter.init();
    const error = await adapter
      .authenticate(header(await sign({ iss: "https://evil.example" })))
      .catch((e) => e);
    expect(error).toBeInstanceOf(AuthError);
    expect(error.status).toBe(401);
  });

  it("rejects a missing token", async () => {
    const adapter = new OidcAuthAdapter({ issuer, audience: "registry-api" });
    await adapter.init();
    const error = await adapter.authenticate(header()).catch((e) => e);
    expect(error).toBeInstanceOf(AuthError);
  });
});

describe("api-key adapter", () => {
  it("minted key authenticates its tenant; plaintext is never stored", async () => {
    const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
    try {
      const { plaintext, row } = await mintApiKey(storage.apiKeys, "tenant-x", {
        label: "ci",
        createdBy: "admin",
      });
      expect(plaintext.startsWith(API_KEY_PREFIX)).toBe(true);
      expect(row.digest).not.toContain(plaintext);

      const adapter = new ApiKeyAuthAdapter(storage.apiKeys);
      const authn = await adapter.authenticate(header(plaintext));
      expect(authn.claims["tenantId"]).toBe("tenant-x");
      expect(authn.sub).toBe(`key:${row.id}`);
    } finally {
      await storage.close();
    }
  });

  it("revoked key stops working and the record shows the revocation", async () => {
    const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
    try {
      const { plaintext, row } = await mintApiKey(storage.apiKeys, "tenant-x", {
        createdBy: "admin",
      });
      await storage.apiKeys.revoke("tenant-x", row.id);
      const adapter = new ApiKeyAuthAdapter(storage.apiKeys);
      const error = await adapter.authenticate(header(plaintext)).catch((e) => e);
      expect(error).toBeInstanceOf(AuthError);
      expect(error.status).toBe(401);
      expect((await storage.apiKeys.list("tenant-x"))[0]?.revokedAt).toBeDefined();
    } finally {
      await storage.close();
    }
  });

  it("unknown and unprefixed keys are refused", async () => {
    const storage = await createStorage({ driver: "sqlite", url: "file::memory:" });
    try {
      const adapter = new ApiKeyAuthAdapter(storage.apiKeys);
      await expect(adapter.authenticate(header("apr_nope"))).rejects.toThrow(/Unknown API key/u);
      await expect(adapter.authenticate(header("sometoken"))).rejects.toThrow(/apr_ prefix/u);
    } finally {
      await storage.close();
    }
  });
});

describe("none adapter", () => {
  it("resolves the implicit admin principal", async () => {
    const adapter = new NoneAuthAdapter();
    const authn = await adapter.authenticate();
    expect(authn.sub).toBe("local");
    expect(authn.claims["role"]).toBe("admin");
  });
});
