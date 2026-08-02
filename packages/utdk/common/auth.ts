/**
 * Auth abstraction for @utdk provider packages.
 *
 * Auth is resolved in order: explicit options → environment variable → gateway proxy.
 * Provider packages declare their AuthProvider type in `package.json` `utdk.auth`
 * but contain no auth logic directly.
 */

export interface AuthProvider {
  authenticate(headers: Record<string, string>): Promise<void>;
}

// ---------------------------------------------------------------------------
// Credential-type vocabulary
// ---------------------------------------------------------------------------

/**
 * The gateway credential-type vocabulary — the single source of truth shared
 * by the workspace credential store and the bundler's auth-intel phase
 * (which derives its LLM output-schema enum from this runtime tuple, so the
 * two can never diverge).
 */
export const CREDENTIAL_TYPES = [
  "bearer_token",
  "api_key",
  "oauth2_client",
  "oauth2_authcode",
] as const;

export type CredentialType = (typeof CREDENTIAL_TYPES)[number];

// ---------------------------------------------------------------------------
// BearerToken
// ---------------------------------------------------------------------------

export class BearerToken implements AuthProvider {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  async authenticate(headers: Record<string, string>): Promise<void> {
    headers["Authorization"] = `Bearer ${this.token}`;
  }
}

// ---------------------------------------------------------------------------
// ApiKey
// ---------------------------------------------------------------------------

export interface ApiKeyOptions {
  /** Header name to use (default: "X-Api-Key") */
  headerName?: string;
  value: string;
}

export class ApiKey implements AuthProvider {
  private readonly headerName: string;
  private readonly value: string;

  constructor(options: ApiKeyOptions) {
    this.headerName = options.headerName ?? "X-Api-Key";
    this.value = options.value;
  }

  async authenticate(headers: Record<string, string>): Promise<void> {
    headers[this.headerName] = this.value;
  }
}

// ---------------------------------------------------------------------------
// TokenStore — pluggable persistence adapter
// ---------------------------------------------------------------------------

export interface StoredToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

/**
 * Pluggable persistence adapter for OAuth2 tokens.
 * The default in-process cache satisfies most use cases; implement this
 * interface for persistent storage (disk, Redis, OS keychain, etc.).
 */
export interface TokenStore {
  get(key: string): Promise<StoredToken | undefined>;
  set(key: string, token: StoredToken): Promise<void>;
  delete(key: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// PKCE utilities
// ---------------------------------------------------------------------------

export interface PKCEPair {
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: "S256";
}

function base64urlEncode(bytes: Uint8Array): string {
  // btoa requires a binary string
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i] as number);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Generate a cryptographically random PKCE code verifier + S256 challenge pair.
 * Use the returned `codeVerifier` when constructing `OAuth2AuthCode` and the
 * `codeChallenge`/`codeChallengeMethod` values when building the authorization URL.
 */
export async function generatePKCE(): Promise<PKCEPair> {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  const codeVerifier = base64urlEncode(bytes);

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = base64urlEncode(new Uint8Array(hashBuffer));

  return { codeVerifier, codeChallenge, codeChallengeMethod: "S256" };
}

// ---------------------------------------------------------------------------
// buildAuthorizationUrl
// ---------------------------------------------------------------------------

export interface AuthorizationUrlOptions {
  /** Authorization endpoint (e.g. https://accounts.spotify.com/authorize) */
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scopes?: string[];
  /** Opaque value to prevent CSRF; callers should verify on callback */
  state?: string;
  /** PKCE challenge (from generatePKCE()) */
  codeChallenge?: string;
  codeChallengeMethod?: "S256" | "plain";
}

/**
 * Build an OAuth2 authorization URL, optionally with PKCE parameters.
 */
export function buildAuthorizationUrl(options: AuthorizationUrlOptions): string {
  const url = new URL(options.authUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", options.clientId);
  url.searchParams.set("redirect_uri", options.redirectUri);

  if (options.scopes && options.scopes.length > 0) {
    url.searchParams.set("scope", options.scopes.join(" "));
  }
  if (options.state) {
    url.searchParams.set("state", options.state);
  }
  if (options.codeChallenge) {
    url.searchParams.set("code_challenge", options.codeChallenge);
    url.searchParams.set("code_challenge_method", options.codeChallengeMethod ?? "S256");
  }

  return url.toString();
}

// ---------------------------------------------------------------------------
// OAuth2ClientCredentials
// ---------------------------------------------------------------------------

export interface OAuth2ClientCredentialsOptions {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  /** Additional scopes to request */
  scopes?: string[];
  /** Optional persistent token store */
  tokenStore?: TokenStore;
  /** Key used when reading/writing to the token store (default: tokenUrl) */
  storeKey?: string;
}

interface TokenResponse {
  access_token: string;
  expires_in?: number;
  token_type?: string;
}

export class OAuth2ClientCredentials implements AuthProvider {
  private readonly options: OAuth2ClientCredentialsOptions;
  private accessToken: string | undefined;
  private expiresAt: number | undefined;

  constructor(options: OAuth2ClientCredentialsOptions) {
    this.options = options;
  }

  private isExpired(): boolean {
    if (this.expiresAt === undefined) return true;
    // Refresh 60 seconds before actual expiry
    return Date.now() >= this.expiresAt - 60_000;
  }

  private storeKey(): string {
    return this.options.storeKey ?? this.options.tokenUrl;
  }

  private async loadFromStore(): Promise<void> {
    const store = this.options.tokenStore;
    if (!store) return;
    const stored = await store.get(this.storeKey());
    if (stored) {
      this.accessToken = stored.accessToken;
      this.expiresAt = stored.expiresAt;
    }
  }

  private async saveToStore(): Promise<void> {
    const store = this.options.tokenStore;
    if (!store || !this.accessToken) return;
    await store.set(this.storeKey(), {
      accessToken: this.accessToken,
      expiresAt: this.expiresAt,
    });
  }

  private async fetchToken(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
    });

    if (this.options.scopes && this.options.scopes.length > 0) {
      params.set("scope", this.options.scopes.join(" "));
    }

    const response = await fetch(this.options.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OAuth2 token request failed: ${response.status} ${response.statusText}\n${body}`);
    }

    const data = (await response.json()) as TokenResponse;
    this.accessToken = data.access_token;
    this.expiresAt = data.expires_in !== undefined ? Date.now() + data.expires_in * 1_000 : undefined;
    await this.saveToStore();
  }

  async authenticate(headers: Record<string, string>): Promise<void> {
    if (!this.accessToken) {
      await this.loadFromStore();
    }

    if (!this.accessToken || this.isExpired()) {
      await this.fetchToken();
    }

    headers["Authorization"] = `Bearer ${this.accessToken}`;
  }
}

// ---------------------------------------------------------------------------
// OAuth2AuthCode
// ---------------------------------------------------------------------------

export interface OAuth2AuthCodeOptions {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  /** The authorization code obtained from the redirect */
  code: string;
  redirectUri: string;
  /** Additional scopes to request */
  scopes?: string[];
  /**
   * PKCE code verifier (from generatePKCE()).
   * When provided, it is sent with the token request as required by RFC 7636.
   */
  codeVerifier?: string;
  /** Optional persistent token store */
  tokenStore?: TokenStore;
  /** Key used when reading/writing to the token store (default: tokenUrl) */
  storeKey?: string;
}

export class OAuth2AuthCode implements AuthProvider {
  private readonly options: OAuth2AuthCodeOptions;
  private accessToken: string | undefined;
  private refreshToken: string | undefined;
  private expiresAt: number | undefined;

  constructor(options: OAuth2AuthCodeOptions) {
    this.options = options;
  }

  private isExpired(): boolean {
    if (this.expiresAt === undefined) return false;
    // Refresh 60 seconds before actual expiry
    return Date.now() >= this.expiresAt - 60_000;
  }

  private storeKey(): string {
    return this.options.storeKey ?? this.options.tokenUrl;
  }

  private async loadFromStore(): Promise<void> {
    const store = this.options.tokenStore;
    if (!store) return;
    const stored = await store.get(this.storeKey());
    if (stored) {
      this.accessToken = stored.accessToken;
      this.refreshToken = stored.refreshToken;
      this.expiresAt = stored.expiresAt;
    }
  }

  private async saveToStore(): Promise<void> {
    const store = this.options.tokenStore;
    if (!store || !this.accessToken) return;
    await store.set(this.storeKey(), {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      expiresAt: this.expiresAt,
    });
  }

  private async exchangeCode(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      code: this.options.code,
      redirect_uri: this.options.redirectUri,
    });

    if (this.options.codeVerifier) {
      params.set("code_verifier", this.options.codeVerifier);
    }

    const response = await fetch(this.options.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OAuth2 code exchange failed: ${response.status} ${response.statusText}\n${body}`);
    }

    const data = (await response.json()) as TokenResponse & { refresh_token?: string };
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.expiresAt = data.expires_in !== undefined ? Date.now() + data.expires_in * 1_000 : undefined;
    await this.saveToStore();
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      await this.exchangeCode();
      return;
    }

    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      refresh_token: this.refreshToken,
    });

    const response = await fetch(this.options.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      // Fall back to code exchange on refresh failure
      await this.exchangeCode();
      return;
    }

    const data = (await response.json()) as TokenResponse & { refresh_token?: string };
    this.accessToken = data.access_token;
    if (data.refresh_token) {
      this.refreshToken = data.refresh_token;
    }
    this.expiresAt = data.expires_in !== undefined ? Date.now() + data.expires_in * 1_000 : undefined;
    await this.saveToStore();
  }

  async authenticate(headers: Record<string, string>): Promise<void> {
    if (!this.accessToken) {
      await this.loadFromStore();
    }

    if (!this.accessToken) {
      await this.exchangeCode();
    } else if (this.isExpired()) {
      await this.refreshAccessToken();
    }

    headers["Authorization"] = `Bearer ${this.accessToken}`;
  }
}
