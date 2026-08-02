/**
 * Built-in auth adapters (tech-plan D7): `none` (implicit admin, single
 * tenant), `oidc` (ANY compliant issuer via OIDC discovery + remote JWKS —
 * no issuer-URL-pattern parsing, Cognito is just configuration), and
 * `api-key` (tenant-scoped keys, SHA-256 digest at rest).
 */

import { createHash, randomBytes } from "node:crypto";
import { AuthError, type Authn, type AuthAdapter } from "./types.js";
import type { ApiKeyRow, ApiKeyStore } from "../storage/types.js";

function readBearer(req: { header(name: string): string | undefined }): string | null {
  const raw = req.header("Authorization");
  if (!raw?.startsWith("Bearer ")) return null;
  return raw.slice("Bearer ".length).trim();
}

// ---------------------------------------------------------------------------
// none
// ---------------------------------------------------------------------------

/** Implicit admin principal; local-single-tenant only (auth-adapters spec). */
export class NoneAuthAdapter implements AuthAdapter {
  readonly mode = "none" as const;

  async init(): Promise<void> {}

  async authenticate(): Promise<Authn> {
    return { sub: "local", claims: { role: "admin" } };
  }
}

// ---------------------------------------------------------------------------
// oidc
// ---------------------------------------------------------------------------

export interface OidcConfig {
  issuer: string;
  audience: string;
}

interface DiscoveryDocument {
  issuer?: string;
  jwks_uri?: string;
}

/**
 * Generic OIDC bearer verification: discovery (`/.well-known/
 * openid-configuration`) → remote JWKS (jose) → `jwtVerify` with the
 * configured issuer + audience. Nothing here knows what a Cognito is.
 */
export class OidcAuthAdapter implements AuthAdapter {
  readonly mode = "oidc" as const;
  private jwks: ReturnType<typeof import("jose").createRemoteJWKSet> | undefined;
  private jose: typeof import("jose") | undefined;

  constructor(private readonly config: OidcConfig) {}

  async init(): Promise<void> {
    const jose = await import("jose");
    const discoveryUrl = `${this.config.issuer.replace(/\/$/u, "")}/.well-known/openid-configuration`;
    const response = await fetch(discoveryUrl);
    if (!response.ok) {
      throw new Error(
        `OIDC discovery failed for ${this.config.issuer}: ${response.status} from ${discoveryUrl}`,
      );
    }
    const discovery = (await response.json()) as DiscoveryDocument;
    if (!discovery.jwks_uri) {
      throw new Error(`OIDC discovery document from ${discoveryUrl} carries no jwks_uri`);
    }
    this.jose = jose;
    this.jwks = jose.createRemoteJWKSet(new URL(discovery.jwks_uri));
  }

  async authenticate(req: { header(name: string): string | undefined }): Promise<Authn> {
    if (!this.jwks || !this.jose) {
      throw new Error("OIDC adapter used before init()");
    }
    const token = readBearer(req);
    if (!token) throw new AuthError("Missing bearer token", 401);
    try {
      const { payload } = await this.jose.jwtVerify(token, this.jwks, {
        issuer: this.config.issuer,
        audience: this.config.audience,
      });
      const sub = payload.sub;
      if (typeof sub !== "string" || !sub) throw new AuthError("Invalid token subject", 401);
      return { sub, claims: payload as Record<string, unknown> };
    } catch (err) {
      if (err instanceof AuthError) throw err;
      throw new AuthError(
        `Invalid or expired token: ${err instanceof Error ? err.message : String(err)}`,
        401,
      );
    }
  }
}

// ---------------------------------------------------------------------------
// api-key
// ---------------------------------------------------------------------------

export const API_KEY_PREFIX = "apr_";

export function digestApiKey(plaintext: string): string {
  return createHash("sha256").update(plaintext).digest("hex");
}

/** Mint a key: plaintext returned exactly ONCE; only the digest is stored. */
export async function mintApiKey(
  store: ApiKeyStore,
  tenantId: string,
  input: { label?: string; createdBy: string },
): Promise<{ plaintext: string; row: ApiKeyRow }> {
  const plaintext = `${API_KEY_PREFIX}${randomBytes(24).toString("base64url")}`;
  const row = await store.create(tenantId, {
    digest: digestApiKey(plaintext),
    ...(input.label !== undefined ? { label: input.label } : {}),
    createdBy: input.createdBy,
  });
  return { plaintext, row };
}

/**
 * Bearer `apr_…` keys resolve to their tenant with no tenant header (the
 * claims carry `tenantId`, which the tenant resolution layer honors).
 */
export class ApiKeyAuthAdapter implements AuthAdapter {
  readonly mode = "api-key" as const;

  constructor(private readonly store: ApiKeyStore) {}

  async init(): Promise<void> {}

  async authenticate(req: { header(name: string): string | undefined }): Promise<Authn> {
    const token = readBearer(req);
    if (!token) throw new AuthError("Missing bearer token", 401);
    if (!token.startsWith(API_KEY_PREFIX)) {
      throw new AuthError(`API keys carry the ${API_KEY_PREFIX} prefix`, 401);
    }
    const row = await this.store.findByDigest(digestApiKey(token));
    if (!row) throw new AuthError("Unknown API key", 401);
    if (row.revokedAt) throw new AuthError("API key has been revoked", 401);
    return {
      sub: `key:${row.id}`,
      claims: {
        tenantId: row.tenantId,
        keyId: row.id,
        ...(row.label !== undefined ? { label: row.label } : {}),
        // Standalone has no membership model; a minted key acts for its
        // tenant with admin reach. Grants still govern member-role callers
        // an embedded host resolves through its own TenantResolver.
        role: "admin",
      },
    };
  }
}

// ---------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------

export function isAuthAdapter(value: unknown): value is AuthAdapter {
  return (
    typeof value === "object" &&
    value !== null &&
    "authenticate" in value &&
    typeof (value as AuthAdapter).authenticate === "function"
  );
}

export function createAuthAdapter(
  option:
    | { mode: "oidc"; issuer: string; audience: string }
    | { mode: "api-key" }
    | { mode: "none" }
    | AuthAdapter,
  apiKeys: ApiKeyStore,
): AuthAdapter {
  if (isAuthAdapter(option)) return option;
  switch (option.mode) {
    case "none":
      return new NoneAuthAdapter();
    case "oidc":
      return new OidcAuthAdapter({ issuer: option.issuer, audience: option.audience });
    case "api-key":
      return new ApiKeyAuthAdapter(apiKeys);
  }
}
