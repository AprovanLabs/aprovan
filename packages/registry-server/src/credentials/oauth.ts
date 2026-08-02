/**
 * OAuth2 token service — turns stored OAuth credentials into live access
 * tokens.
 *
 * This is the "gateway pre-resolves OAuth2 tokens" step the isolate bridge
 * has always assumed:
 *
 *   - `oauth2_authcode`: the one-time authorization code is exchanged at
 *     credential-creation time (codes expire in minutes); the resulting
 *     access/refresh tokens are persisted back onto the payload. At call time
 *     an expired access token is refreshed with the refresh token.
 *   - `oauth2_client`: a client-credentials grant runs at call time, cached
 *     in memory until expiry.
 *
 * Providers disagree on how token endpoints authenticate (form-body
 * client_id/client_secret vs HTTP Basic — Figma, for example, requires
 * Basic). We try form-body first and retry with Basic on a 4xx.
 */

import type {
  CredentialPayload,
  InjectableCredential,
  OAuth2AuthCodePayload,
  OAuth2ClientPayload,
} from "./types.js";

export interface OAuthTokenSet {
  accessToken: string;
  refreshToken?: string;
  /** Epoch ms; undefined when the provider returns no expiry. */
  expiresAt?: number;
}

/** Extra fields persisted on OAuth payloads once tokens are obtained. */
export interface ResolvedOAuthFields {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

export class OAuthExchangeError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "OAuthExchangeError";
  }
}

interface TokenEndpointResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

/** Safety margin so we refresh before the provider-side expiry. */
const EXPIRY_SKEW_MS = 60_000;

async function postTokenRequest(
  tokenUrl: string,
  params: Record<string, string>,
  clientId: string,
  clientSecret: string,
): Promise<OAuthTokenSet> {
  const attempt = async (useBasicAuth: boolean): Promise<Response> => {
    const body = new URLSearchParams(params);
    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    if (useBasicAuth) {
      headers["Authorization"] = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
    } else {
      body.set("client_id", clientId);
      body.set("client_secret", clientSecret);
    }
    return fetch(tokenUrl, { method: "POST", headers, body });
  };

  let response = await attempt(false);
  if (!response.ok && response.status >= 400 && response.status < 500) {
    response = await attempt(true);
  }

  let parsed: TokenEndpointResponse;
  const raw = await response.text();
  try {
    parsed = JSON.parse(raw) as TokenEndpointResponse;
  } catch {
    parsed = {};
  }

  if (!response.ok || !parsed.access_token) {
    const detail =
      parsed.error_description ??
      parsed.error ??
      (raw.length > 0 ? raw.slice(0, 300) : response.statusText);
    throw new OAuthExchangeError(
      `Token endpoint ${tokenUrl} rejected the request (${response.status}): ${detail}`,
      response.status,
    );
  }

  return {
    accessToken: parsed.access_token,
    refreshToken: parsed.refresh_token,
    expiresAt:
      typeof parsed.expires_in === "number"
        ? Date.now() + parsed.expires_in * 1000
        : undefined,
  };
}

/** Exchange a one-time authorization code. Call at credential creation. */
export function exchangeAuthorizationCode(
  payload: OAuth2AuthCodePayload,
): Promise<OAuthTokenSet> {
  const params: Record<string, string> = {
    grant_type: "authorization_code",
    code: payload.code,
    redirect_uri: payload.redirectUri,
  };
  if (payload.codeVerifier) params["code_verifier"] = payload.codeVerifier;
  return postTokenRequest(payload.tokenUrl, params, payload.clientId, payload.clientSecret);
}

/** Refresh an expired access token. */
export function refreshAccessToken(
  payload: OAuth2AuthCodePayload & ResolvedOAuthFields,
): Promise<OAuthTokenSet> {
  if (!payload.refreshToken) {
    return Promise.reject(
      new OAuthExchangeError("Access token expired and no refresh token is stored — re-authorize the provider."),
    );
  }
  return postTokenRequest(
    payload.tokenUrl,
    { grant_type: "refresh_token", refresh_token: payload.refreshToken },
    payload.clientId,
    payload.clientSecret,
  );
}

/** Run a client-credentials grant. */
export function clientCredentialsGrant(
  payload: OAuth2ClientPayload,
): Promise<OAuthTokenSet> {
  const params: Record<string, string> = { grant_type: "client_credentials" };
  if (payload.scopes && payload.scopes.length > 0) {
    params["scope"] = payload.scopes.join(" ");
  }
  return postTokenRequest(payload.tokenUrl, params, payload.clientId, payload.clientSecret);
}

// ---------------------------------------------------------------------------
// Call-time resolution
// ---------------------------------------------------------------------------

function isFresh(expiresAt: number | undefined): boolean {
  return expiresAt === undefined || Date.now() < expiresAt - EXPIRY_SKEW_MS;
}

/**
 * In-memory client-credentials token cache. Keys are
 * `tenant:provider:credentialId` — tenant-scoped by construction
 * (multi-tenancy spec "Caches are tenant-keyed"). Instance-scoped: each
 * server owns its own cache; the module default exists for direct callers.
 */
export type OAuthTokenCache = Map<string, OAuthTokenSet>;

export function createOAuthTokenCache(): OAuthTokenCache {
  return new Map();
}

const defaultTokenCache: OAuthTokenCache = createOAuthTokenCache();

/** Clear the default client-credentials cache (used in tests). */
export function resetOAuthTokenCache(): void {
  defaultTokenCache.clear();
}

export interface ResolveOAuthOptions {
  /** `tenant:provider:credentialId`. */
  cacheKey: string;
  /** Persist updated tokens back to the credential store. */
  persist?: (payload: CredentialPayload) => Promise<void>;
  /** Server-instance cache; defaults to a module-level map. */
  cache?: OAuthTokenCache;
}

/**
 * Resolve any credential payload into one the executor can inject directly.
 * Non-OAuth payloads pass through; OAuth payloads become bearer tokens,
 * refreshing/exchanging as needed.
 */
export async function resolveToInjectable(
  payload: CredentialPayload,
  options: ResolveOAuthOptions,
): Promise<InjectableCredential> {
  if (payload.type === "bearer_token" || payload.type === "api_key") {
    return payload;
  }

  if (payload.type === "oauth2_client") {
    const cache = options.cache ?? defaultTokenCache;
    const cached = cache.get(options.cacheKey);
    if (cached && isFresh(cached.expiresAt)) {
      return { type: "bearer_token", token: cached.accessToken };
    }
    const tokens = await clientCredentialsGrant(payload);
    cache.set(options.cacheKey, tokens);
    return { type: "bearer_token", token: tokens.accessToken };
  }

  // oauth2_authcode — tokens live on the stored payload.
  const resolved = payload as OAuth2AuthCodePayload & ResolvedOAuthFields;
  if (resolved.accessToken && isFresh(resolved.expiresAt)) {
    return { type: "bearer_token", token: resolved.accessToken };
  }

  const tokens = resolved.accessToken
    ? await refreshAccessToken(resolved)
    : // Legacy record that still carries an (expired) one-time code — the
      // exchange will fail with the provider's error, which is clearer than
      // calling the API unauthenticated.
      await exchangeAuthorizationCode(resolved);

  const updated: CredentialPayload = {
    ...resolved,
    code: "", // one-time code is spent; never reuse it
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken ?? resolved.refreshToken,
    expiresAt: tokens.expiresAt,
  } as CredentialPayload;
  await options.persist?.(updated);

  return { type: "bearer_token", token: tokens.accessToken };
}
